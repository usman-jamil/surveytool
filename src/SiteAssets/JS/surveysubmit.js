var Emirates = window.Emirates || {};

Emirates.FormDataSubmission = function (data, submissionData) {
    var self = this;

	self.formData = data;
	self.requestDigest = submissionData.digest;
	self.domains = submissionData.domains;
	self.subdomains = submissionData.subdomains;
	self.userName = submissionData.user;
	self.dfd = null;
	
	self.SubmitForm = function() {
		waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose("Submitting Survey...");
		
		var itemInfo = self.CreateSubmissionRequest();
		itemInfo.done(function(data) {
			var itemId = data.d.Id;
			var questions = [];
			$.each(self.formData, function(index, questionData){
				questions.push(self.CreateResponseRequest(questionData.question, itemId, questionData.response));		
			});
			
			$.when.apply(null, questions).done(function() {
				waitDialog.close(SP.UI.DialogResult.OK);
				self.Redirect('surveyconfirmation.aspx?isDlg=1');
			});
		}).fail(function (jqXHR, textStatus, errorThrown) {
			self.FailHandler(jqXHR, textStatus, errorThrown);
		});
	};

	/*self.chainedResponseCall = function (index, itemId) {
		var questionData = self.formData[index];			
		if(index == self.formData.length - 1) {
			self.CreateResponseRequest(questionData.question, itemId, questionData.response);
			self.dfd.resolve();
		} else {
			var nextCall = self.CreateResponseRequest(questionData.question, itemId, questionData.response).then(function() {
				self.chainedResponseCall(index + 1, itemId);
			});
		}
	};*/
	
	self.FailHandler = function (jqXHR, textStatus, errorThrown) {
		var response = JSON.parse(jqXHR.responseText);
		var message = response ? response.error.message.value : textStatus;
		alert("Call failed. Error: " + message);
	};

	self.Redirect = function (url) {
		window.location.replace(url);
	};

	self.CreateSubmissionRequest = function () {
		var address = "http://infospace.emirates.com/newsites/BTS-BizSolDesign/_api/web/lists/GetByTitle('Survey Submissions')/items";
		var item = $.extend({
			"__metadata": { "type": "SP.Data.Survey_x0020_SubmissionsListItem"}}, 
			{'Title': 'Submission: ' + self.userName, 
			'DomainsId': { "results": self.domains },  
			'Sub_x002d_DomainsId': { "results": self.subdomains }
			});
		var call = jQuery.ajax({
			url: address,
			method: "POST",
			contentType: "application/json;odata=verbose",
			headers: {
				"accept": "application/json;odata=verbose",
				"X-RequestDigest": self.requestDigest
			},
			data: JSON.stringify(item)
		});

		return call;
	};

	self.CreateResponseRequest = function (surveyQuestion, surveySubmission, surveyResponse) {
		var address = "http://infospace.emirates.com/newsites/BTS-BizSolDesign/_api/web/lists/GetByTitle('Survey Responses')/items";
		var item = $.extend({
			"__metadata": { "type": "SP.Data.Survey_x0020_ResponsesListItem"}}, 
			{'Title': self.TrimTolength(surveyQuestion, 230), 
			'Question': surveyQuestion, 
			'Survey_x0020_SubmissionId': surveySubmission, 
			'User_x0020_Response': surveyResponse});
		var call = jQuery.ajax({
			url: address,
			method: "POST",
			contentType: "application/json;odata=verbose",
			headers: {
				"accept": "application/json;odata=verbose",
				"X-RequestDigest": self.requestDigest
			},
			data: JSON.stringify(item)
		});

		return call;
	};
	
	self.TrimTolength = function (txt, len) {
		var charAtLen = txt.substr(len, 1);
		while (len < txt.length && !/\s/.test(charAtLen)) {
			len++;
			charAtLen = txt.substr(len, 1);
		}
		return txt.substring(0, len);
	};
};