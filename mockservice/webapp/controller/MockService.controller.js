sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "../model/formatter" 
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast, formatter) {
        "use strict";

        return Controller.extend("sapips.training.mockservice.controller.MockService", {
            formatter:formatter,
            onInit: function () {

            },
            onSelectProduct: function(oEvent){
                //Get the control list.
                var oList = oEvent.getSource();
                
                //Get selected item
                var oSelItem = oList.getSelectedItem();

                //Get the binding path
                var sSelItemPath = oSelItem.getBindingContextPath();

                //Bind selected item in form
                var oForm = this.getView().byId("idProductDetails")
                oForm.bindElement({
                    path: sSelItemPath,
                    model: "ProductsModel"});
            },
            onCreate:function(){
                //Get Model
                var oModel = this.getView().getModel("ProductsModel");  
                
                //Prepare New Data
                var oData = {
                    ProductID: 999,
                    ProductName: "myProduct"
                    };
                
                //create data
                oModel.create("/Products", oData, {});                  
            }            
        });
    });
