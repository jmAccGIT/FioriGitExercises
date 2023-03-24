sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/m/ColumnListItem",
    "sap/m/Text",
    "sap/ui/core/Fragment",
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/ValueState",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, MessageBox, UIComponent,JSONModel,ColumnListItem,Text
             ,Fragment,DateFormat, ValueState) {
        "use strict";

        return Controller.extend("sapips.training.employeeapp.controller.EmployeeAdd", {
            onInit: function () {
            },     
            onBeforeRendering: function(){
                var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                    format: "yMMMd"
                });
                var strDate = oDateFormat.format(new Date());
                this.getView().byId("idDateHire").setValue(strDate);
            },   

            onSavePress:function(){
                var oView = this.getView(),
                    oResourceBundle = oView.getModel("i18n").getResourceBundle(),
                    oInput1 = oView.byId("idFirstName"),
                    oInput2 = oView.byId("idLastName"),
                    oInput3 = oView.byId("idAge"),
                    oInput4 = oView.byId("idDateHire"),
                    oInput5 = oView.byId("idCl"),
                    oInput6 = oView.byId("idPf");

                    this.fnCheckEmptyVal(oInput1,oInput2,oInput3,oInput4,oInput5,oInput6);

                    if (oInput1.getValueState() === ValueState.Error || 
                        oInput2.getValueState() === ValueState.Error ||
                        oInput3.getValueState() === ValueState.Error || 
                        oInput4.getValueState() === ValueState.Error ||
                        oInput5.getValueState() === ValueState.Error || 
                        oInput6.getValueState() === ValueState.Error ) {
                        MessageBox.error(oResourceBundle.getText("ErrorMessage"));
                    } else {
                        //Get Text
                        var sFirstName  = oInput1.getValue();      
                        var sLastName   = oInput2.getValue(); 
                        var sAge        = oInput3.getValue();
                        var sDateHire   = oInput4.getValue();
                        var sCareelLvl  = oInput5.getSelectedKey(); 
                        var sCurrProj   = oInput6.getSelectedKey();  
                        
                        var sEmpID = sLastName + sFirstName + sDateHire.replace(" ","").replace(",","");  
                        this.fnCreateRec(sEmpID, sFirstName,sLastName,sAge,sDateHire,sCareelLvl,sCurrProj );
                    }

                
                // this.fnValidateRec(sFirstName,sLastName,sAge,sDateHire,sCareelLvl,sCurrProj );
                // this.fnCreateRec(sEmpID, sFirstName,sLastName,sAge,sDateHire,sCareelLvl,sCurrProj );
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
            },

            //When triggered, when back button is pressed.Triggers navigation back to previous page.
            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash && sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteEmployeeList");
                }
            },
            fnCheckEmptyVal: function(oParam1,oParam2,oParam3,oParam4,oParam5,oParam6){
                // sFirstName,sLastName,sAge,sDateHire,sCareelLvl,sCurrProj
                var sData1 = oParam1.getValue(),
                    sData2 = oParam2.getValue(),
                    sData3 = oParam3.getValue(),
                    sData4 = oParam4.getValue(),
                    sData5 = oParam5.getSelectedKey(),
                    sData6 = oParam6.getSelectedKey();               


                if (!sData1) {
                   oParam1.setValueState(ValueState.Error); 
                } else {
                   oParam1.setValueState(ValueState.None);
                }

                if (!sData2) {
                    oParam2.setValueState(ValueState.Error); 
                 } else {
                    oParam2.setValueState(ValueState.None);
                 }

                 if (!sData3) {
                    oParam3.setValueState(ValueState.Error); 
                 } else {
                    oParam3.setValueState(ValueState.None);
                 }

                 if (!sData4) {
                    oParam4.setValueState(ValueState.Error); 
                 } else {
                    oParam4.setValueState(ValueState.None);
                 }

                 if (!sData5) {
                    oParam5.setValueState(ValueState.Error); 
                 } else {
                    oParam5.setValueState(ValueState.None);
                 }

                 if (!sData6) {
                    oParam6.setValueState(ValueState.Error); 
                 } else {
                    oParam6.setValueState(ValueState.None);
                 }
            },
            fnCreateRec: function(p1,p2,p3,p4,p5,p6,p7){
                var oModel = this.getOwnerComponent().getModel();
                var oAddData = {
                    "EmployeeID":p1,
                    "FirstName":p2,
                    "LastName":p3,
                    "Age":p4,
                    "DateHire":p5,
                    "CareerLevel":p6,
                    "CurrentProject":p7
                };
                oModel.create("/Employee", oAddData,{
                    sucess: MessageBox.show(
                        "Employee Record has been addder.", {
                        icon: MessageBox.Icon.SUCCESS,
                        title: "Record Creation",
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
            }
        });
    });
