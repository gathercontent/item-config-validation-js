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
			    "name": "tab2",
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
						"selected": true
					},{
					    "name": "op12",
						"label": "Option 1",
						"selected": true
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


	exports.samples = [sample1, sample2, sample3];
}(this));