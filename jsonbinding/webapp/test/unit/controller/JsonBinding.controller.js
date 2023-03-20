/*global QUnit*/

sap.ui.define([
	"sapipstraining/jsonbinding/controller/JsonBinding.controller"
], function (Controller) {
	"use strict";

	QUnit.module("JsonBinding Controller");

	QUnit.test("I should test the JsonBinding controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
