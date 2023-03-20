sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter"    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,formatter) {
        "use strict";
        
        return Controller.extend("sapips.training.jsonbinding.controller.JsonBinding", {
            formatter: formatter,
            onInit: function () {
 			  //Get the view
               var oView = this.getView();

               //get i18n
               var oI18n = this.getOwnerComponent().getModel("i18n");
               oView.setModel(oI18n,"i18n");

               //Instantiate JSON Model
               var oAddressModel = new JSONModel();

               //Define Data
               var oAddress = {
                   "EID": "jovelyn.r.margallo",
                   "enabled" : true,
                   "Address": {
                       "Street" : "Rd. 5",
                       "City"   : "City of San Jose Del Monte, Bulacan",
                       "Zip"    : 3023,
                       "Country": "Philippines"
                       }, 
                   "SalesAmount": 100,
                   "CurrencyCode": "PHP",
               };

               //Set the Data to Model
               oAddressModel.setData(oAddress);              

               //Bind Model to View
               oView.setModel(oAddressModel);                               
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
                    model: "ProductsModel"
                });
            }
        });
    });
