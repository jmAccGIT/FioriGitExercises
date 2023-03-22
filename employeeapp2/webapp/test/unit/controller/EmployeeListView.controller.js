/*global QUnit*/

sap.ui.define([
	"sapipstraining/employeeapp2/controller/EmployeeListView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("EmployeeListView Controller");

	QUnit.test("I should test the EmployeeListView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
