var wizardViewModel = null;

function CheckboxItem(row) {
    var self = this;

    self.id = ko.observable(row.id);
    self.Name = ko.observable(row.title);
    self.Selected = ko.observable(false);
}

function CheckboxSubItem(row) {
    var self = this;

    self.id = ko.observable(row.id);
    self.Name = ko.observable(row.title);
    self.Selected = ko.observable(false);
	self.Template = ko.observable(row.template);
}

function SubDomainItem(row) {
    var self = this;

    self.id = row.id;
    self.Name = row.title;
    self.Selected = false;
	self.domainId = row.domainId;
	self.domainName = row.domainName;
}

function Competency(row) {
    var self = this;

    self.domainName = row.domainName;
	self.subDomains = row.subDomains;
}

$(document).ready(function(){
	wizardViewModel = new Emirates.WizardViewModel();
	ko.applyBindings(wizardViewModel);
	wizardViewModel.loadData();
	wizardViewModel.checkAlreadyCompleted();
	
	$('#wizard').smartWizard({onLeaveStep:leaveAStepCallback,
                                  onFinish:onFinishCallback});
});

var Emirates = window.Emirates || {};

Emirates.WizardViewModel = function () {
    var self = this;

    self.domainItems = ko.observableArray([]);
	self.selectecDomainItems = ko.observableArray([]);
    self.subDomains = ko.observableArray([]);
	self.subDomainItems = ko.observableArray([]);
	self.selectedSubDomainItems = ko.observableArray([]);
	self.chosenCompetencies = ko.observableArray([]);
	self.alreadySubmitted = false;
	
	self.checkAlreadyCompleted = function() {
		Emirates.GetUser(function (userId, userName) {
			Emirates.GetExistingSubmission(userId, function (alreadySubmitted) {
				if(alreadySubmitted) {
					var statusId = SP.UI.Status.addStatus('Already Completed', 'You have already completed this survey and you cannot participate again!', true);
					SP.UI.Status.setStatusPriColor(statusId, 'red');
					self.alreadySubmitted = true;
				}
			});
		});
	};
	
	self.loadData = function() {
		var openDomainCall = Emirates.GetDomains(),
		openSubDomainCall = Emirates.GetSubDomains();
		$.when(openDomainCall, openSubDomainCall).then(function( domainInfo, subDomainInfo ) {
			var output = [];
				
			$.each(domainInfo[0].d.results, function(index, item){
				var row = {
					title: item.Title,
					id: item.ID
				};
				
				self.domainItems.push(new CheckboxItem(row));					
			});
			
			$.each(subDomainInfo[0].d.results, function(index, item){
				var row = {
					title: item.Title,
					id: item.ID,
					domainName: item.Domain.Title,
					domainId: item.Domain.ID
				};
				
				self.subDomains.push(new SubDomainItem(row));					
			});			
		}).fail(function (jqXHR, textStatus, errorThrown) {
			Emirates.FailHandler(jqXHR, textStatus, errorThrown);
		});
	};
	
	self.toggleAssociation = function (item) {
        item.Selected(!(item.Selected()));
	};
	
	self.toggleSubAssociation = function (item) {
        item.Selected(!(item.Selected()));
	};	
	
	self.templateToUse = function(item) {
		return item.Template();
	}
	
	self.setAssociation = function (item) {
		var selected = self.selectecDomainItems();
		var selectedSubs = self.selectedSubDomainItems();
		var filteredSubDomains = null;
		var theme = null;

		self.subDomainItems([]);
		
		//update chosen-items
		var domainName = Emirates.FilterArray(self.domainItems(), function (value) {	
			return value.id() == item.id();
		})[0].Name();
		
		var filteredChosen = Emirates.FilterArray(self.chosenCompetencies(), function (value) {	
			return value.domainName != domainName;
		});
		
		//update sub-items
		$.each(selected, function(index, selectedItem){
			filteredSubDomains = Emirates.FilterArray(self.subDomains(), function (value) {	
				return value.domainId == selectedItem;
			});
			
			if(filteredSubDomains != null && filteredSubDomains.length > 0) {
				self.subDomainItems.push(new CheckboxSubItem({id: -1, title: filteredSubDomains[0].domainName, template: 'headingTemplate'}));					
			}
			
			$.each(filteredSubDomains, function(index, subDomain){
				var row = {
					title: subDomain.Name,
					id: subDomain.id,
					domain: subDomain.domainName,
					template: 'inputTemplate'
				};
				
				self.subDomainItems.push(new CheckboxSubItem(row));
			});			
		});
		
		//update selected sub-items
		var newSelected = [];
		$.each(selectedSubs, function(index, selectedItem){
			filteredSubDomains = Emirates.FilterArray(self.subDomains(), function (value) {					
				return value.id == selectedItem;
			});
			
			subDomain = filteredSubDomains[0];
			var index = Emirates.IndexOfArray(selected, subDomain.domainId, 0);
			if(index >= 0 && index < filteredSubDomains.length) {
				newSelected.push(subDomain.id);				
			}
		});
		
		self.selectedSubDomainItems(newSelected);
		self.chosenCompetencies(filteredChosen);
		self.toggleAssociation(item);
		
        return true;
    };
	
	self.setSubAssociation = function (item) {
		var selected = self.selectedSubDomainItems();
		var filteredSubDomains = null;
		self.chosenCompetencies([]);
		var subs = [];
		var domains = [];
		$.each(selected, function(index, selectedItem){
			filteredSubDomains = Emirates.FilterArray(self.subDomains(), function (value) {					
				return value.id == selectedItem;
			});
			
			$.each(filteredSubDomains, function(index, subDomain){
				var row = {
					id: subDomain.domainId,
					domain: subDomain.domainName,
					subDomain: subDomain.Name
				};
				
				subs.push(row);
				if(Emirates.IndexOfArray(domains, subDomain.domainName, 0) < 0) {
					domains.push(subDomain.domainName);
				}
			});
		});
		
		$.each(domains, function(index, selectedItem){
			filteredByDomain = Emirates.FilterArray(subs, function (value) {			
				return value.domain == selectedItem;
			});
			
			var sDomains = '';
			$.each(filteredByDomain, function(index, selectedSub){
				if(index != 0) {
					sDomains = sDomains + ', ';
				}
				sDomains = sDomains + selectedSub.subDomain;
			});
			
			self.chosenCompetencies.push(new Competency({domainName: selectedItem, subDomains: sDomains}));
		});
	
		self.toggleSubAssociation(item);
		
        return true;
    };	
};

Emirates.GetSubDomains = function () {
	var address = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Sub-Domains')/items?$select=*,Domain/ID,Domain/Title&$expand=Domain/ID,Domain/Title&$filter=Title ne 'Generic'&$top=200";
	var call = jQuery.ajax({
	url: address,
		method: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
		}
	});

	return call;
}

Emirates.GetDomains = function () {
	var address = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Domains')/items?$select=*&$filter=Title ne 'Generic'&$top=200";
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