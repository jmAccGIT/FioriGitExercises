sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent,History,JSONModel) {
        "use strict";

        return Controller.extend("sapips.training.employeeapp.controller.EmployeeDetail", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function (oEvent) {                
                var sEmployee = oEvent.getParameter("arguments").EmployeeID1;
                var oView = this.getView();
                oView.bindElement("/Employee('" + sEmployee + "')");
                // oView.bindElement({
                //     path: "/Employee('" + sEmployee + "')",
                //     events: {
                //         change: this._onBindingChange.bind(this),
                //         dataRequested: function(oEvent) {
                //             oView.setBusy(true);
                //         },
                //         dataReceived: function(oEvent) {
                //             oView.setBusy(false);
                //         }
                //     }
                // });

                //bind skill data to skill tab
                var oSkillView = this.getView().byId("skillsTab");
                oSkillView.bindElement("/Skill('" + sEmployee + "')");
                // oSkillView.bindElement({
                //     path: "/Skill('" + sEmployee + "')",
                //     events: {
                //         change: this._onBindingChange.bind(this),
                //         dataRequested: function(oEvent) {
                //             oSkillView.setBusy(true);
                //         },
                //         dataReceived: function(oEvent) {
                //             oSkillView.setBusy(false);
                //         }
                //     }
                // });
            },
            _onBindingChange: function(oEvent) {
                var oElementBinding = this.getView().getElementBinding();
                // No data for the binding
                if (oElementBinding && !oElementBinding.getBoundContext()) {
                    this.getRouter().getTargets().display("notFound");
                }
            },

            onEditPress:function(oEvent){
                var sEmployee = this.getView().byId("empID").getBindingContext().getObject().EmployeeID;
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteEdit",{
                    EmployeeID1: sEmployee
                });
            },

            onCancelPress:function(){
                this.onNavBack();
            },

            //When triggered, when back button is pressed. Triggers navigation back to previous page.
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
