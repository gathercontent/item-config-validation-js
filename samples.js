/**
 * Several examples of validations to test against.
 */

;(function(exports) {
	var sample1 = [{
			    "label": "Content",
			    "name": "tab1",
			    "hidden": false,
			    "elements": [{
			        "type": "text",
			        "name": "el1",
			        "required": false,
			        "label": "Blog post",
			        "value": "<p>Hello world</p>",
			        "microcopy": "",
			        "limit_type": "words",
			        "limit": 1000,
			        "plain_text": false
			      },{
					"type": "choice_checkbox",
					"name": "el4",
					"required": false,
					"label": "Label",
					"microcopy": "",
					"options": [{
					    "name": "op1",
						"label": "Option 1",
						"selected": false,
						"value": ""
					},{
					    "name": "op2",
						"label": "Option 3",
						"selected": true
					}]
				},{
					"type": "choice_radio",
					"name": "el14",
					"required": false,
					"label": "Label",
					"other_option": false,
					"microcopy": "",
					"options": [{
					    "name": "op98",
						"label": "Option 1",
						"selected": true
					}]
				}]
			  },{
			    "label": "Meta",
			    "name": "tab1",
			    "hidden": false,
			    "elements": [{
			        "type": "text",
			        "name": "el1",
			        "required": false,
			        "label": "Blog post",
			        "value": "<p>Hello world</p>",
			        "microcopy": "",
			        "limit_type": "words",
			        "limit": 50,
			        "plain_text": false
			      }]
			  }];

	var sample2 = [{
			    "label": "Content",
			    "name": "tab1",
			    "hidden": false,
			    "elements": [{
			        "type": "text",
			        "name": "el1",
			        "required": false,
			        "label": "Blog post",
			        "value": "<p>Hello world</p>",
			        "microcopy": "",
			        "limit_type": "words",
			        "limit": 1000,
			        "plain_text": false
			      },{
					"type": "choice_radio",
					"name": "el4",
					"required": true,
					"label": "Label",
					"other_option": true,
					"microcopy": "",
					"options": [{
					    "name": "op98",
						"label": "Option 1",
						"selected": false
					},{
					    "name": "op12",
						"label": "Option 1",
						"selected": true,
						"value": ""
					}]
				}]
			  }];

	var sample3 = [{
			    "label": "Content",
			    "name": "tab1",
			    "hidden": false,
			    "elements": [{
			        "type": "text",
			        "name": "el1",
			        "required": false,
			        "label": "Blog post",
			        "value": "<p>Hello world</p>",
			        "microcopy": "",
			        "limit_type": "words",
			        "limit": 1000,
			        "plain_text": false
			      }]
			  }];

		var sample4 = [{
			    "label": "",
			    "name": "tab1",
			    "hidden": false,
			    "elements": [{
			        "type": "text",
			        "name": "el1",
			        "required": false,
			        "label": "Blog post",
			        "value": "<p>Hello world</p>",
			        "microcopy": "",
			        "limit_type": "words",
			        "limit": 1000,
			        "plain_text": false
			      },{
					"type": "choice_radio",
					"name": "el2",
					"required": true,
					"label": "Label",
					"other_option": false,
					"microcopy": "",
					"options": [{
					    "name": "i should be here",
						"label": "Option 121",
						"selected": true,
						"lol": 'lol'
					}, {
					    "name": "first option should be i should be here",
						"label": "Option 1",
						"selected": false,
						"ishoulnot": 'be here'
					},{
					    "name": "first option should be i should be here",
						"label": "Option 14",
						"selected": false,
						"ishoulnot": 'be here'
					}]
				}]
			  }];

var sample5 = [{
			    "label": "Content",
			    "name": "tab1",
			    "hidden": false,
			    "elements": [{
			        "type": "text",
			        "name": "el1",
			        "required": false,
			        "label": "Blog post",
			        "value": "<p>Hello world</p>",
			        "microcopy": "",
			        "limit_type": "words",
			        "limit": 1000,
			        "plain_text": false
			      },{
					"type": "choice_checkbox",
					"name": "el4",
					"required": false,
					"label": "Label",
					"microcopy": "",
					"options": [{
					    "name": "op1",
						"label": "Option 1",
						"selected": false
					},{
					    "name": "op2",
						"label": "Option 3",
						"selected": true
					}]
				},{
					"type": "choice_radio",
					"name": "el14",
					"required": false,
					"label": "Label",
					"other_option": true,
					"microcopy": "",
					"options": [{
					    "name": "op98",
						"label": "Option 1",
						"selected": true
					}]
				}]
			  },{
			    "label": "Meta",
			    "name": "tab1",
			    "hidden": false,
			    "elements": [{
			        "type": "text",
			        "name": "el1",
			        "required": false,
			        "label": "Blog post",
			        "microcopy": "",
			        "limit_type": "words",
			        "limit": 50,
			        "plain_text": false
			      }]
			  }];

		var sample6 = [{
			    "label": "Content",
			    "name": "tab1",
			    "hidden": true,
			    "elements": [{
			        "type": "section",
			        "name": "el134534432",
			        "title": "",
			        "subtitle": "subtitle"
			      },{
			        "type": "section",
			        "name": "el134534432s",
			        "title": "given title",
			        "subtitle": "sub2title"
			      },{
					"type": "choice_radio",
					"name": "el4",
					"required": true,
					"label": "Label",
					"other_option": true,
					"microcopy": "",
					"options": [{
					    "name": "",
						"label": "Chicken 12",
						"selected": true,
						"extra": 'field'
					},{
					    "name": 23423,
						"label": "Cow 1",
						"selected": true,
						"value": ""
					}]
				}]
			  }];

	var sample7 = [{
			    "label": "Label",
			    "name": "tab1",
			    "hidden": false,
			    "elements": [{
			        "type": "text",
			        "name": "el1",
			        "required": false,
			        "label": "Blog post",
			        "value": "<p>Hello world</p>",
			        "microcopy": "",
			        "limit_type": "words",
			        "limit": 1000,
			        "plain_text": false
			      },{
					"type": "choice_radio",
					"name": "el4",
					"required": true,
					"label": "Label",
					"other_option": false,
					"microcopy": "",
					"options": []
				}]
			  }];

	var sample8 = [{
			    "label": "Label",
			    "name": "tab1",
			    "hidden": false,
			    "elements": [{
			        "type": "text",
			        "name": "el1",
			        "required": false,
			        "label": "I have an extra field",
			        "value": "that i should not have",
			        "microcopy": "",
			        "limit_type": "words",
			        "limit": 2000,
			        "plain_text": false,
			        "remove_me": 'remove me'
			      },{
					"type": "choice_radio",
					"name": "el4",
					"required": true,
					"label": "Label",
					"other_option": true,
					"microcopy": "",
					"options": [{
					    "name": "opt9482837263",
						"label": "Hello is it me you are looking for",
						"selected": true
					},{
					    "name": 23423,
						"label": "Cow 1",
						"selected": false,
						"value": "I should not have a value"
					}]
				}]
			  }];


	//exports.samples = [sample4];
	exports.samples = [sample1, sample2, sample3, sample4, sample5, sample6, sample7, sample8];
}(this));