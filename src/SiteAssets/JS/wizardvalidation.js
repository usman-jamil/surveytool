var Emirates = window.Emirates || {};
var waitDialog;

function leaveAStepCallback(obj, context){
	var step_num= obj.attr('rel'); // get the current step number
	return validateSteps(context.fromStep, context.toStep); // return false to stay on step and true to continue navigation
}

function onFinishCallback(){
	if(wizardViewModel.alreadySubmitted) {
		SP.UI.Notify.addNotification("<strong>Survey already completed</strong>", false);
		return;
	}
	
	if(validateAllSteps()) {
		waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose("Loading Survey...");
		Emirates.GetGenericCall(function (selectSubDomains) {
			Emirates.GetUserQuestionsCall(selectSubDomains, function (questionData) {
				Emirates.GetUser(function (userId, userName) {
					var requestData = {
						digest: $("#__REQUESTDIGEST").val(),
						domains: wizardViewModel.selectecDomainItems(),
						subdomains: wizardViewModel.selectedSubDomainItems(),
						user: userName
					};

					var row = {
						questions: questionData,
						submissionData: requestData
					};

					waitDialog.close(SP.UI.DialogResult.OK);
					var sData = JSON.stringify(row);
					var options = SP.UI.$create_DialogOptions();
					options.url = _spPageContextInfo.webAbsoluteUrl + '/SitePages/Survey.aspx';
					options.title = "Survey Form";
					options.args = sData;
					options.width = 1024;
					options.height = 768;
					options.dialogReturnValueCallback = Function.createDelegate(null, CloseCallbackIdea);
					SP.UI.ModalDialog.showModalDialog(options);
				});
			});
		});
	}
}

// Dialog callback
function CloseCallbackIdea(result, target) {
    if (result == SP.UI.DialogResult.cancel) {
		SP.UI.Notify.addNotification("<strong>Survey not completed</strong>", false);
    } else if (result == SP.UI.DialogResult.OK) {
		SP.UI.ModalDialog.RefreshPage(SP.UI.DialogResult.OK);
	}
}

Emirates.GetUser = function (callBack) {
	var getUserInfo = Emirates.GetCurrentUserId();	
	getUserInfo.done(function(userIdentity) {
		var discussionCall = Emirates.GetUserInformation(userIdentity.d.Id);
		discussionCall.done(function(data) {										
			var userName = data.d.Name;
			var firstName = data.d.FirstName;
			var lastName = data.d.LastName;
			var userId = userIdentity.d.Id;
			callBack(userId, firstName + ' ' + lastName);

		}).fail(function (jqXHR, textStatus, errorThrown) {
			Emirates.FailHandler(jqXHR, textStatus, errorThrown);
		});
	}).fail(function (jqXHR, textStatus, errorThrown) {
		Emirates.FailHandler(jqXHR, textStatus, errorThrown);
	});
};

Emirates.GetExistingSubmission = function (userId, callBack) {
	var getSubmission = Emirates.GetSubmissionForUserRequest(userId);	
	getSubmission.done(function(data) {
		var alreadyExists = data.d.results.length > 0;
		callBack(alreadyExists);
	}).fail(function (jqXHR, textStatus, errorThrown) {
		Emirates.FailHandler(jqXHR, textStatus, errorThrown);
	});
};

Emirates.GetGenericCall = function (callBack) {
	var genericId = Emirates.GetGenericSubdomainId();	
	genericId.done(function(itemData) {
		var output = [];
		var selectedSubDomains = wizardViewModel.selectedSubDomainItems();
		$.each(itemData.d.results, function(index, item){
			var index = Emirates.IndexOfArray(selectedSubDomains, item.Id, 0);
			if (index < 0 || index >= selectedSubDomains.length) {
				output.push(item.Id);
			}
		});
		
		$.each(selectedSubDomains, function(index, subDomain){
			output.push(subDomain);
		});
		
		callBack(output);
	}).fail(function (jqXHR, textStatus, errorThrown) {
		Emirates.FailHandler(jqXHR, textStatus, errorThrown);
	});
};

Emirates.GetUserQuestionsCall = function (selectedSubDomains, callBack) {
	var userQuestions = Emirates.GetQuestions();	
	userQuestions.done(function(questionData) {
		var output = [];
		$.each(questionData.d.results, function(index, item){
			var row = {
				questionType: item.ContentType.Name,
				originalItem: item,
				questionTitle: item.Question,
				questionId: item.Id,
				domainId: item.DomainId,
				subDomainId: item.Sub_x002d_DomainId,
				isRequired: item.Required
			};
			
			var index = Emirates.IndexOfArray(selectedSubDomains, item.Sub_x002d_DomainId, 0);
			if (index >= 0 && index < selectedSubDomains.length) {
				output.push(row);
			}
		});
		//comment line
		callBack(output);
	}).fail(function (jqXHR, textStatus, errorThrown) {
		Emirates.FailHandler(jqXHR, textStatus, errorThrown);
	});
};

// Your Step validation logic
function validateSteps(stepnumber, targetStep){
	var isStepValid = true;
	// validate step 1
	if(stepnumber == 1){
		// Your step validation logic
		// set isStepValid = false if has errors
		var selectedItems = [];
		selectedItems = wizardViewModel.selectecDomainItems();
		if(selectedItems.length < 1) {
			isStepValid = false;
			$("#wizard").smartWizard('showMessage', 'Please select one or more domains');
			$("#wizard").smartWizard('showError', 1);
			SP.UI.Notify.addNotification("Please select one or more domains", false);
		} else {
			$("#wizard").smartWizard('hideError', 1);
			$("#wizard").smartWizard('hideMessage');
		}
	} else if(stepnumber == 2 && targetStep == 3){
		// Your step validation logic
		// set isStepValid = false if has errors
		var selectedItems = [];
		selectedItems = wizardViewModel.selectedSubDomainItems();
		if(selectedItems.length < 1) {
			isStepValid = false;
			$("#wizard").smartWizard('showMessage', 'Please select one or more sub-domains');
			$("#wizard").smartWizard('showError', 2);
			SP.UI.Notify.addNotification("Please select one or more sub-domains", false);
		} else {
			$("#wizard").smartWizard('hideError', 2);
			$("#wizard").smartWizard('hideMessage');
		}
	}
	
	return isStepValid;
}

function validateAllSteps(){
	var isStepValid = true;
	isStepValid = wizardViewModel.selectecDomainItems().length > 0 && wizardViewModel.selectedSubDomainItems().length > 0;
	// all step validation logic    
	return isStepValid;
}      

Emirates.GetCurrentUserId = function () {
	var address = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/CurrentUser?$select=Id";
	var call = jQuery.ajax({
	url: address,
		method: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
		}
	});

	return call;
};

Emirates.GetSubmissionForUserRequest = function (userId) {
	var address = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Survey Submissions')/items?$select=Author/Id&$expand=Author/Id&$filter=Author/Id eq " + userId + "&$top=1";
	var call = jQuery.ajax({
	url: address,
		method: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
		}
	});

	return call;
};

Emirates.GetUserInformation = function (userId) {
	var address = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/SiteUserInfoList/Items(" + userId + ")?$select=FirstName,LastName,Name";
	var call = jQuery.ajax({
	url: address,
		method: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
		}
	});

	return call;
};

Emirates.GetQuestions = function () {
	var address = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Survey Questions')/items?$select=*,ContentType&$expand=ContentType&$OrderBy=Order1 asc&$top=5000";
	var call = jQuery.ajax({
	url: address,
		method: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
		}
	});

	return call;
};

Emirates.GetGenericSubdomainId = function () {
	var address = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Sub-Domains')/items?$select=Id&$filter=Title eq 'Generic'&$top=1";
	var call = jQuery.ajax({
	url: address,
		method: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
		}
	});

	return call;
};