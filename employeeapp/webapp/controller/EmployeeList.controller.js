sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/UIComponent",
        "sap/m/MessageBox",

    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, MessageBox, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("sapips.training.employeeapp.controller.EmployeeList", {
            onInit: function () {},
            onDelItemPress: function () {
                var iCount = this.getView().byId("employeeListTab").getSelectedItems().length;
                if (iCount == 0) {
                    MessageBox.show(
                        "No Item(s) selected for deletion. Please choose atleast one item from the list.", {
                            icon: MessageBox.Icon.WARNING,
                            title: "Delete Record",
                            styleClass: "sapUiSizeCompact",
                            emphasizedAction: MessageBox.Action.YES
                        });
                } else {
                    MessageBox.show(
                        "Are you sure you want to delete (" + iCount + ") records?", {
                            icon: MessageBox.Icon.WARNING,
                            title: "Delete Record",
                            styleClass: "sapUiSizeCompact",
                            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                            emphasizedAction: MessageBox.Action.YES,
                            onClose: function (sAction) {
                                if (sAction == "YES") {
                                    this.fnDeleteRecord(iCount);
                                }
                            }.bind(this)
                        });
                }
            },
            onAddItemPress: function () {
                this.fnNavigateTo("RouteAdd");
            },
            onListItemPress: function (oEvent) {
                //Get the control list.
                var oList = oEvent.getSource();
                //Get the binding path
                var sPath = oList.getBindingContext().getObject().EmployeeID;
                this.fnNavigateTo("RouteDetail", sPath);
            },
            fnNavigateTo: function (sPage, sEmpId) {
                var oRouter = this.getOwnerComponent().getRouter();
                if (sPage == "RouteDetail") {
                    oRouter.navTo(sPage, {
                        EmployeeID1: sEmpId
                    });
                } else if (sPage == "RouteAdd") {
                    oRouter.navTo(sPage);
                } else {

                }
            },
            fnDeleteRecord(iLength) {
                //Get Model
                var oModel = this.getOwnerComponent().getModel();
                //Get Selected Item from Table with ID = employeeListTab
                var oItems = this.getView().byId("employeeListTab").getSelectedItems();
                for (var i = 0; i < iLength; i++) {
                    //Get Employee ID
                    var sKey = oItems[i].getBindingContext().getObject().EmployeeID;

                    //Using employee ID delete entry from Employee EntitySet
                    oModel.remove("/Employee(EmployeeID='" + sKey + "')", {});
                }
            }
        });
    });