var Emirates = window.Emirates || {};
var rows = [];
var updatedContent = [];
var deletedContent = [];
var insertedContent = [];
var operationsIndex = 0;
var operationsBatch = [];
var waitDialog = null;

$(document).ready(function(){
	var container = document.getElementById('subdomains');
	
	var itemID = window.frameElement.dialogArgs;
	var openCall = Emirates.GetSubDomains(itemID);
	openCall.done(function(data) {
		var results = data.d.results;
		$.each(results, function(index, item){
			Emirates.AddRow(item.ID, item.Title);
		});
		
		var hot = new Handsontable(container, {
			data: rows,
			height: 500,
			undo: true,
			colHeaders: true,
			rowHeaders: true,
			stretchH: 'all',
			columnSorting: true,
			multiSelect: false,
			colHeaders: ['Sub-Domain'],
			minSpareRows: 1,
			columns: [{data: 1, type: 'text'}],
			contextMenu: ['row_above', 'row_below', 'remove_row'],
			afterChange: function (change, source) {
				if (source === 'loadData') {
					return; //don't save this change
				}
				
				var previousVal = change[0][2];
				var newVal = change[0][3];
				var rowNo = change[0][0];
				var updateItemId = rows[rowNo][0];
				var updateItem = rows[rowNo][1];

				//UPDATED CONTENT
				if(updateItemId && (previousVal != newVal)) {
					console.log('Updated: ' + updateItemId);
					
					var row = {
						id: updateItemId,
						title: newVal
					};
					updatedContent.push(row);
				}
			},
			beforeRemoveRow: function (index, amount) {
				var updateItemId = rows[index][0];
				//DELETED CONTENT
				if(updateItemId) {
					console.log('Deleted: ' + updateItemId);
					deletedContent.push(updateItemId);
					
					var index = Emirates.IndexOfId(updatedContent, updateItemId, 0);
					if(index >= 0) {
						updatedContent.splice(index, 1);
						console.log('Deleted from update log: ' + updateItemId);
					}
				}
			}
		});		
	}).fail(function (jqXHR, textStatus, errorThrown) {
		Emirates.FailHandler(jqXHR, textStatus, errorThrown);
	});		
});

function performSaveOperation() {
	waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose("Saving...");
	
	console.log(JSON.stringify(rows));
	$.each(rows, function(index, item){
		if(item.length > 1) {
			var itemId = item[0];
			var itemTitle = item[1];
			
			if(!itemId && itemTitle && itemTitle != "") {
				insertedContent.push(itemTitle);
			}
		}
	});
	
	console.log(JSON.stringify(insertedContent));
	Emirates.UpdateContent();
}

Emirates.UpdateContent = function () {
	Emirates.PerformDeletes(function (){
		Emirates.PerformUpdates(function (){
			Emirates.PerformInserts(function (){
				waitDialog.close(SP.UI.DialogResult.OK);
				SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK,'Published');
			});			
		});
	});
}

Emirates.PerformUpdates = function (complete) {
	operationsIndex = 0;
	operationsBatch = [];
	if(updatedContent.length > 0) {
		$.each(updatedContent, function(index, item){
			var updateCall = Emirates.UpdateCall(item);
			operationsBatch.push(updateCall);
		});
		
		Emirates.PerformNext(complete);	
	} else {
		complete();
	}
}

Emirates.PerformInserts = function (complete) {
	operationsIndex = 0;
	operationsBatch = [];
	if(insertedContent.length > 0) {
		$.each(insertedContent, function(index, item) {
			var itemID = window.frameElement.dialogArgs;
			var insertCall = Emirates.CreateItem({'Title': item, 'DomainId': itemID});
			operationsBatch.push(insertCall);
		});
		
		Emirates.PerformNext(complete);	
	} else {
		complete();
	}
}

Emirates.PerformDeletes = function (complete) {
	operationsIndex = 0;
	operationsBatch = [];
	if(deletedContent.length > 0) {
		$.each(deletedContent, function(index, item) {
			var deleteCall = Emirates.DeleteCall(item);
			operationsBatch.push(deleteCall);
		});
		
		Emirates.PerformNext(complete);	
	} else {
		complete();
	}
}

Emirates.PerformNext = function (complete) {
	if (operationsIndex < operationsBatch.length) {
		// Do the next, increment the call index
		operationsBatch[operationsIndex++].done(function(data) {
			Emirates.PerformNext(complete);	
		}).fail(function (jqXHR, textStatus, errorThrown) {
			Emirates.FailHandler(jqXHR, textStatus, errorThrown);
			complete();
		});
	} else {
		complete();
	}
}

Emirates.DeleteCall = function (itemId) {
	var itemInfo = Emirates.GetItem(itemId);
	var chained = itemInfo.then(function(data) {
		return Emirates.DeleteItem(data.d);		
	});
	
	return chained;
}

Emirates.UpdateCall = function (item) {
	var itemInfo = Emirates.GetItem(item.id);
	var chained = itemInfo.then(function(data) {
		return Emirates.UpdateItem(data.d, {'Title': item.title});
	});
	
	return chained;
}

Emirates.AddRow = function(id, title) {
	var data = [];
	data.push(id);
	data.push(title);

	rows.push(data);	
}

Emirates.CreateItem = function (properties) {
	var address = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Sub-Domains')/items";
	var item = $.extend({
		"__metadata": { "type": "SP.Data.SubDomainListItem"}}, 
		properties);	
	var call = jQuery.ajax({
		url: address,
		method: "POST",
		contentType: "application/json;odata=verbose",
		headers: {
			"accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val()
		},
		data: JSON.stringify(item)
	});

	return call;
}

Emirates.DeleteItem = function (item) {
	var address = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Sub-Domains')/items(" + item.Id + ")";
	var call = jQuery.ajax({
		url: address,
		method: "POST",
		contentType: "application/json;odata=verbose",
		headers: {
			"accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val(),
			"X-HTTP-Method": "DELETE",
			"If-Match": item.__metadata.etag
		}
	});

	return call;
}

Emirates.UpdateItem = function (item, properties) {
	var address = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/GetByTitle('Sub-Domains')/items(" + item.Id + ")";
	var dataToUpdate = $.extend({
			"__metadata": 
				{ 
					"type": "SP.Data.SubDomainListItem"
				}}
				, properties);
	var call = jQuery.ajax({
		url: address,
		method: "POST",
		contentType: "application/json;odata=verbose",
		headers: {
			"accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val(),
			"X-HTTP-Method": "MERGE",
			"If-Match": item.__metadata.etag
		},
		data: JSON.stringify(dataToUpdate)
	});

	return call;
}

Emirates.GetItem = function (itemId) {
	var address = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Sub-Domains')/items(" + itemId + ")";
	
	var call = jQuery.ajax({
		url: address,
		type: "GET",
		dataType: "json",
		headers: {
			Accept: "application/json;odata=verbose"
		}
	});
	
	return call;
}

Emirates.GetSubDomains = function (domainId) {
	var address = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Sub-Domains')/items?$select=*,Domain/Id&$expand=Domain/Id&$filter=Domain/Id eq " + domainId;
	var call = jQuery.ajax({
	url: address,
		method: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
		}
	});
	
	return call;
}

Emirates.FailHandler = function (jqXHR, textStatus, errorThrown) {
	waitDialog.close(SP.UI.DialogResult.OK);
	var response = JSON.parse(jqXHR.responseText);
	var message = response ? response.error.message.value : textStatus;
	alert("Call failed. Error: " + message);
}