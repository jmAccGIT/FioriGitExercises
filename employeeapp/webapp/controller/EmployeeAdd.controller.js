sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, MessageBox, UIComponent,JSONModel) {
        "use strict";

        return Controller.extend("sapips.training.employeeapp.controller.EmployeeAdd", {
            onInit: function () {

            },
            onSavePress:function(){
                
            },
            onCancelPress:function(){
                MessageBox.show(
                        "Unsaved data will be lost. Do you want to continue?", {
                        icon: MessageBox.Icon.WARNING,
                        title: "Cancel record creation",
                        styleClass: "sapUiSizeCompact",
                        actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                        emphasizedAction: MessageBox.Action.YES,
                        onClose: function (sAction) {
                            if(sAction=="YES"){
                                this.onNavBack();
                            }
                         }.bind(this)
                    }
                );
            },
            //When triggered, when back button is pressed. 
            //Triggers navigation back to previous page.
            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash && sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteEmployeeList");
                }
            }
        });
    });
