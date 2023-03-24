sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/m/ColumnListItem",
     "sap/m/Text",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, MessageBox, UIComponent,JSONModel,ColumnListItem,Text) {
        "use strict";

        return Controller.extend("sapips.training.employeeapp.controller.EmployeeEdit", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteEdit").attachPatternMatched(this._onObjectMatched, this);
            },
            _onObjectMatched: function (oEvent) {                
                var sEmployee = oEvent.getParameter("arguments").EmployeeID1;
                var oView = this.getView();
                oView.bindElement("/Employee('" + sEmployee + "')");

                //bind skill data to skill tab
                var oSkillView = this.getView().byId("skillsTab");
                oSkillView.bindElement("/Skill('" + sEmployee + "')");                
            },

            onUpdPress:function(){
                var oModel = this.getOwnerComponent().getModel();
                var sEmpID = this.getView().byId("idEID").getValue();
                var sFirstName = this.getView().byId("idFirstName").getValue();      
                var sLastName = this.getView().byId("idLastName").getValue(); 
                var sAge = this.getView().byId("idAge").getValue(); 
                var sDateHire = this.getView().byId("idDateHire").getValue(); 
                var sCareelLvl = this.getView().byId("idCl").getSelectedKey(); 
                var sCurrProj = this.getView().byId("idPf").getSelectedKey(); 
                var oModel = this.getOwnerComponent().getModel();

                var oUpdData = {
                    "EmployeeID":sEmpID,
                    "FirstName":sFirstName,
                    "LastName":sLastName,
                    "Age":sAge,
                    "DateHire":sDateHire,
                    "CareerLevel":sCareelLvl,
                    "CurrentProject":sCurrProj
                };
                oModel.update("/Employee(EmployeeID='" + sEmpID + "')", oUpdData,{
                    sucess: MessageBox.show(
                        "Employee Record has been updated.", {
                        icon: MessageBox.Icon.SUCCESS,
                        title: "Record Update",
                        styleClass: "sapUiSizeCompact",
                        actions: [MessageBox.Action.OK],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {
                            if(sAction=="OK"){
                                this.onNavBack();
                            }
                         }.bind(this)
                    } )
                });
            },
            onCancelPress:function(){
                MessageBox.show(
                        "Unsaved data will be lost. Do you want to continue?", {
                        icon: MessageBox.Icon.WARNING,
                        title: "Cancel update",
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
            onAddSkillPress:function(oEvent){
                var oSkillVal = this.getView().byId("idSelSkill");
                var sSkillID =oSkillVal.getSelectedKey();

                var oProficiencyVal = this.getView().byId("idSelProficiency");
                var sProficiencyID =oProficiencyVal.getSelectedKey();

                var oView = this.getView().byId("skillsTab");
                var columnListItemNewLine = new ColumnListItem({
                    cells: [
                      new Text({
                        text: sSkillID
                      }),   
                      new Text({
                        text: sProficiencyID
                      }) 
                    ]});  


                // var oSkillData = new JSONModel();
                // var oSkill = {
                //    "EmployeeID": "dUmmY",
                //    "SkillID": sSkillID,
                //    "ProficiencyID": sProficiencyID     
                // };
                // oSkillData.setData("oSkill");
                // oView.setModel(oSkillData);
            },

            //When triggered, when back button is pressed.Triggers navigation back to previous page.
            onNavBack: function (sMain) {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash && sPreviousHash !== undefined) {
                    window.history.go(-2);
                } else {
                    var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteEmployeeList");
                }
            }
        });
    });
