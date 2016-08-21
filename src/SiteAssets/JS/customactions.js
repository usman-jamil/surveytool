$(document).ready(function(){
	var operation = Emirates.GetParameterByName('OP');
	if(operation) {
		if(operation.toLowerCase() == 'register') {
			customActionViewModel = new Emirates.CustomActionViewModel();
			ko.applyBindings(customActionViewModel);	
			customActionViewModel.initiateRegister();
		} else if(operation.toLowerCase() == 'unregister') {
			customActionViewModel = new Emirates.CustomActionViewModel();
			ko.applyBindings(customActionViewModel);	
			customActionViewModel.initiateUnRegister();
		} else if(operation.toLowerCase() == 'view') {
			customActionViewModel = new Emirates.CustomActionViewModel();
			ko.applyBindings(customActionViewModel);	
			customActionViewModel.viewCustomActions();
		} else {
			customActionViewModel = new Emirates.CustomActionViewModel();
			ko.applyBindings(customActionViewModel);
			customActionViewModel.showUnSupportedOperation();
		}
	} else {
		customActionViewModel = new Emirates.CustomActionViewModel();
		ko.applyBindings(customActionViewModel);
		customActionViewModel.showUnSupportedOperation();
	}
});

var Emirates = window.Emirates || {};
var customActionViewModel = null;
var operationsIndex = 0;
var operationsBatch = [];

Emirates.CustomActionViewModel = function (op) {
    var self = this;

    self.operation = ko.observable('');	
	self.progressLog = ko.observableArray([]);
	self.initiateRegister = function() {
		self.operation('Custom Action Register Operation');
		/*Emirates.RegisterSiteCustomActions('JQuery Custom Action', '~SiteCollection/SiteAssets/JS/jquery-1.11.3.min.js', 1000, function(sender, args) {
			Emirates.RegisterSiteCustomActions('Dialog Custom Action', '~SiteCollection/SiteAssets/JS/dialog.js', 1001, function(sender, args) {});
		});*/
		/*Emirates.RegisterSiteCustomActions('SPServices Custom Action', '~SiteCollection/SiteAssets/JS/jquery.SPServices-2014.02.min.js', 1002, function(sender, args) {
			self.showProgress('List Action Registered!');
		});*/
		//Emirates.RegisterListCustomActions('Edit Sub-Domains', 'Domains', 100, function(sender, args) {
			//self.showProgress('List Action Registered!');
		//});
	};
	
	self.initiateUnRegister = function() {
		self.operation('Custom Action Un-Register Operation');
		self.showProgress('Removing...');
		//Emirates.UnRegisterSiteCustomActions('Dialog Custom Action');
		//Emirates.UnRegisterSiteCustomActions('JQuery Custom Action');
		
		Emirates.UnRegisterListCustomActions('Edit Sub-Domains', 'Domains');
	};
	
	self.viewCustomActions = function() {
		self.operation('Custom Actions Currently Registered');
		Emirates.ViewSiteCustomActions();
	};
	
	self.showUnSupportedOperation = function() {
		self.operation('Un-Supported Operation');
	};	
	
	self.showUnSupportedOperation = function() {
		self.operation('No Such Operation');
	};
	
	self.showProgress = function (logMessage) {
		var row = {
			title: logMessage
		};
		
		self.progressLog.push(row);					
	};
};

Emirates.GetParameterByName = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

Emirates.UnRegisterSiteCustomActions = function (title) {
	var clientContext = new SP.ClientContext();
    var oWebsite = clientContext.get_web();
    var collUserCustomAction = oWebsite.get_userCustomActions();
       
    clientContext.load(collUserCustomAction);

    clientContext.executeQueryAsync(Function.createDelegate(this, function() {
		var customActionEnumerator = collUserCustomAction.getEnumerator();
		var actionID = null;

		while (actionID == null && customActionEnumerator.moveNext()) 
		{
			var oUserCustomAction = customActionEnumerator.get_current();

			if (oUserCustomAction.get_title() == title) 
			{
				actionID = oUserCustomAction.get_id();
			}
		}
		
		var customActionToDelete = collUserCustomAction.getById(actionID);
		customActionToDelete.deleteObject();         
		clientContext.load(customActionToDelete);

		clientContext.executeQueryAsync(Function.createDelegate(this, function(){
			customActionViewModel.showProgress('Custom action removed');
		}), Function.createDelegate(this, function(sender, args) {
			customActionViewModel.showProgress('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
		}));
	}), Function.createDelegate(this, function(sender, args) {
		customActionViewModel.showProgress('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
	}));
}

Emirates.UnRegisterListCustomActions = function (title, listTitle) {
	var clientContext = new SP.ClientContext();
    var oWebsite = clientContext.get_web();
	var list = oWebsite.get_lists().getByTitle(listTitle);
	var userCustomActions = list.get_userCustomActions();
       
    clientContext.load(userCustomActions);

    clientContext.executeQueryAsync(Function.createDelegate(this, function() {
		var customActionEnumerator = userCustomActions.getEnumerator();
		var actionID = null;

		while (actionID == null && customActionEnumerator.moveNext()) 
		{
			var oUserCustomAction = customActionEnumerator.get_current();

			if (oUserCustomAction.get_title() == title) 
			{
				actionID = oUserCustomAction.get_id();
			}
		}
		
		var customActionToDelete = userCustomActions.getById(actionID);
		customActionToDelete.deleteObject();         
		clientContext.load(customActionToDelete);

		clientContext.executeQueryAsync(Function.createDelegate(this, function(){
			customActionViewModel.showProgress('Custom action removed');
		}), Function.createDelegate(this, function(sender, args) {
			customActionViewModel.showProgress('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
		}));
	}), Function.createDelegate(this, function(sender, args) {
		customActionViewModel.showProgress('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
	}));
}

Emirates.RegisterSiteCustomActions = function (title, lnk, sequence, callbackSuccess) {
	var clientContext = new SP.ClientContext();
	var site = clientContext.get_web();
	var userCustomActions = site.get_userCustomActions();

	var newUserCustomAction = userCustomActions.add();
	newUserCustomAction.set_location('ScriptLink');
	newUserCustomAction.set_sequence(sequence);
	newUserCustomAction.set_scriptSrc(lnk);
	newUserCustomAction.set_title(title);
	newUserCustomAction.update();
	customActionViewModel.showProgress('Adding: ' + title);
			
	clientContext.executeQueryAsync(Function.createDelegate(this, function(sender, args) {
		//alert('New menu item added to Site Actions menu.\n\nTo view the new menu item, refresh the page.');
		callbackSuccess();
	}), Function.createDelegate(this, function(sender, args) {
		//alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
		customActionViewModel.showProgress('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
	}));
}

Emirates.RegisterListCustomActions = function (title, listTitle, sequence, callbackSuccess) {
	var clientContext = new SP.ClientContext();
	var site = clientContext.get_web();
	var list = site.get_lists().getByTitle(listTitle);
	var userCustomActions = list.get_userCustomActions();
	
	var newUserCustomAction = userCustomActions.add();
	newUserCustomAction.set_location('EditControlBlock');
	newUserCustomAction.set_sequence(sequence);
	newUserCustomAction.set_title(title);
	newUserCustomAction.set_url('javascript:OpenSubDomainDialog({ItemId});');
	newUserCustomAction.update();
	
	clientContext.load(list, 'Title' ,'UserCustomActions');
			
	clientContext.executeQueryAsync(Function.createDelegate(this, function(sender, args) {
		//alert('New menu item added to Site Actions menu.\n\nTo view the new menu item, refresh the page.');
		callbackSuccess();
	}), Function.createDelegate(this, function(sender, args) {
		//alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
		customActionViewModel.showProgress('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
	}));
}

Emirates.ViewSiteCustomActions = function () {
	var userActionsCall = Emirates.GetUserActions(),
	userListsCall = Emirates.GetLists();
	$.when(userActionsCall, userListsCall).then(function(userActionsInfo, userListsInfo) {
		$.each(userActionsInfo[0].d.results, function(index, item){
			customActionViewModel.showProgress('Title: ' + item.Title + ', Location: ' + item.Location);
		});
		
		operationsIndex = 0;
		operationsBatch = [];
		$.each(userListsInfo[0].d.results, function(index, item){
			var lnk = item.UserCustomActions.__deferred.uri;
			var openCall = Emirates.GetListCustomActions(lnk);
			var networkRequest = {
				call: openCall,
				listTitle: item.Title
			};
			operationsBatch.push(networkRequest);
		});	
		
		Emirates.PerformNext(function (successData, listTitle) {
			//success
			var actions = successData.d.results;
			if(actions.length > 0){
				$.each(actions, function(index, actionItem){
					customActionViewModel.showProgress('List: ' + listTitle + ', Action: ' + actionItem.Title);
				});
			}
		}, function() {
			//complete
		});	
	}).fail(function (jqXHR, textStatus, errorThrown) {
		Emirates.FailHandler(jqXHR, textStatus, errorThrown);
	});
}

Emirates.PerformNext = function (successCallback, complete) {
	if (operationsIndex < operationsBatch.length) {
		// Do the next, increment the call index
		var operation = operationsBatch[operationsIndex++];
		var httpRequest = operation['call'];
		var listTitle = operation['listTitle'];
		httpRequest.done(function(data) {
			successCallback(data, listTitle);
			Emirates.PerformNext(successCallback, complete);	
		}).fail(function (jqXHR, textStatus, errorThrown) {
			Emirates.FailHandler(jqXHR, textStatus, errorThrown);
			complete();
		});
	} else {
		complete();
	}
}

Emirates.GetUserActions = function () {
	var address = _spPageContextInfo.webAbsoluteUrl + "/_api/web/UserCustomActions";
	var call = jQuery.ajax({
	url: address,
		method: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
		}
	});
	
	return call;
}

Emirates.GetLists = function () {
	var address = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists";
	var call = jQuery.ajax({
	url: address,
		method: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
		}
	});
	
	return call;
}

Emirates.GetListCustomActions = function (lnk) {
	var address = lnk;
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