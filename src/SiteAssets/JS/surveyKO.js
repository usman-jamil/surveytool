var Emirates = window.Emirates || {};
var surveyViewModel = null;

jQuery(document).ready(function () {
	var surveyData = JSON.parse(window.frameElement.dialogArgs);
	
	surveyViewModel = new Emirates.SurveyViewModel(surveyData.questions, surveyData.submissionData);
	ko.applyBindings(surveyViewModel);
	surveyViewModel.loadData();	
});

Emirates.Question = function (row) {
    var self = this;

	self.questionId = ko.observable(row.questionId);
    self.template = ko.observable(row.template);
    self.questionTitle = ko.observable(row.questionTitle);
    self.questionOptions = ko.observable(row.questionOptions);
	self.isRequired = ko.observable(row.isRequired);
};

Emirates.QuestionBlock = function (questionData, isFinal) {
    var self = this;
	
	self.questions = ko.observableArray(questionData);
	self.finalBlock = ko.observable(isFinal);
	
	self.templateToUse = function(item) {
		return item.template();
	};
};

Emirates.SurveyViewModel = function (questions, submissionData) {
    var self = this;

	self.surveyQuestions = questions;
	self.submissionData = submissionData;
    self.blocks = ko.observableArray([]);
	self.blockSize = 2;
	
	self.loadData = function() {
		var questionArray = self.createQuestions();
		for (i = 0; i < questionArray.length; i+=self.blockSize) { 
			var questionBlock = [];
			var finish = false;
			for (j = 0; j < self.blockSize; j++) { 
				if(i + j < questionArray.length) {
					var item = questionArray[i + j];
					var blockData = {
						template: item.questionType,
						questionId: item.questionId,
						questionTitle: item.questionTitle,
						questionOptions: item.questionOptions,
						isRequired: item.isRequired
					};

					var finish = (i + j + 1 == questionArray.length);
					questionBlock.push(new Emirates.Question(blockData));
				}
			}
			
			self.blocks.push(new Emirates.QuestionBlock(questionBlock, finish));
		}
		
		loadWizard();
		loadRemaining();
	};
	
	self.finalSubmit = function(formElement) {
		var qBlocks = self.blocks();
		var submitData = [];
		$.each(qBlocks, function(index, qBlock){
			$.each(qBlock.questions(), function(index, question){
				var userResponse = null;
				if(question.template() == 'numericTemplate') {
					userResponse = $(formElement).find('input[name="' + question.questionId() + '"]').val();
				} else if(question.template() == 'radioTemplate') {
					var inputVals = $(formElement).find('input[name="' + question.questionId() + '"]');
					$.each(inputVals, function(index, input){
						if($(input).prop("checked")) {
							userResponse = $(input).val();
						}
					});
				} else if(question.template() == 'selectTemplate') {
					var inputVals = $(formElement).find('select[name="' + question.questionId() + '"]');
					userResponse = $(inputVals).val();
				} else if(question.template() == 'checkboxTemplate') {
					var inputVals = $(formElement).find('input[name="' + question.questionId() + '"]');
					$.each(inputVals, function(index, input){
						if($(input).prop("checked")) {
							var prefix = '';
							if(userResponse != null) {
								prefix = '\n';
							} else {
								userResponse = '';
							}
							
							userResponse += prefix + $(input).val();
						}
					});
				} else if(question.template() == 'booleanTemplate') {
					userResponse = $(formElement).find('input[name="' + question.questionId() + '"]').prop("checked");					
					userResponse = userResponse ? 'Yes' : 'No';
				}

				var row = {
					question: question.questionTitle(),
					response: userResponse
				};
				
				submitData.push(row);
			});
		});
		
		formSubmission = new Emirates.FormDataSubmission(submitData, self.submissionData);
		formSubmission.SubmitForm();	
	};
	
	self.createQuestions = function() {
		var questions = [];
		var cTypeMapping = {
				"Single-Choice Question": ['radioTemplate', 'selectTemplate'],
				"Yes-No Question": ['booleanTemplate'],
				"Multi-Choice Question": ['checkboxTemplate'],
				"Numeric Question": ['numericTemplate']
			};
		$.each(self.surveyQuestions, function(index, item){
			var questionData = {
				questionType: '',
				questionId: item.questionId,
				questionTitle: item.questionTitle,
				questionOptions: [],
				isRequired: item.isRequired
			};
			
			var originalItem = item.originalItem;
			if(item.questionType == 'Single-Choice Question') {
				var renderType = originalItem.Single_x002d_Choice_x0020_Type;
				if(renderType != null && renderType != ''){
					if(renderType == 'Radio Buttons') {
						questionData.questionType = cTypeMapping['Single-Choice Question'][0];
					} else if(renderType == 'Drop Down') {
						questionData.questionType = cTypeMapping['Single-Choice Question'][1];
					}
				} else {
					questionData.questionType = cTypeMapping['Single-Choice Question'][0];
				}
			} else {
				questionData.questionType = cTypeMapping[item.questionType][0];
			}

			if(item.questionType != 'Numeric Question' && item.questionType != 'Yes-No Question') {
				var choices = originalItem.Choices != null ? originalItem.Choices.split("\n") : null;
				if(choices) {
					questionData.questionOptions = choices;
				}
			}
			
			questions.push(questionData);
		});
		
		return questions;
	};
	
	self.renderSubmitTemplate = function(item) {
		return item.finalBlock() ? 'submitTemplate' : 'blockTemplate';
	};
};