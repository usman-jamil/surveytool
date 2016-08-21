$(document).ready(function(){
	var QuestionsViewModel = new Emirates.QuestionsViewModel();
	ko.applyBindings(QuestionsViewModel, document.getElementById('survey-questions'));
	QuestionsViewModel.loadQuestions();
	
	var OptionsViewModel = new Emirates.OptionsViewModel();
	ko.applyBindings(OptionsViewModel, document.getElementById('survey-options'));
	OptionsViewModel.loadoptions();
});

var Emirates = window.Emirates || {};


Emirates.QuestionsViewModel = function () {
    var self = this;
    self.surveyquestions = ko.observableArray([]);
    
	
		
	self.loadQuestions = function() {
		Emirates.QuestionQuery.execute().promise().then(
			//success
			function (data) {
				var output = [];

			    $.each(data.d.results, function (index, item) {
			        

			        var row = {
			            QuestionID: item.QuestionID
			            };

			        self.surveyquestions.push(row)
			    });

			    //var tableRows = [];
			  
			},

			//failure
			function(err) {
				//alert(JSON.stringify(err));
			}
		);
	};
};


Emirates.QuestionQuery = function () {

    var deferred = $.Deferred(),

	execute = function () {
	    var address =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Questions')/items?$select=*,QuestionID/QuestionID";

	   var call = jQuery.ajax({
	url: address,
		method: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
		}
	});

	return call;
	};

    return {
        execute: execute
    }
}();


Emirates.OptionsViewModel = function () {
    var self = this;
    self.surveyoptions = ko.observableArray([]);
    
	
		
	self.loadoptions = function() {
		Emirates.OptionsQuery.execute().promise().then(
			//success
			function (data) {
				var output = [];

			    $.each(data.d.results, function (index, item) {
			        

			        var row = {
			            Title: item.Title
			            };

			        self.surveyoptions.push(row)
			    });

			    //var tableRows = [];
			  
			},

			//failure
			function(err) {
				//alert(JSON.stringify(err));
			}
		);
	};
};


Emirates.OptionsQuery = function () {

    var deferred = $.Deferred(),

	execute = function () {
	    var address =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Answers')/items?$select=*,Title";

	   var call = jQuery.ajax({
	url: address,
		method: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
		}
	});

	return call;
	};

    return {
        execute: execute
    }
}();