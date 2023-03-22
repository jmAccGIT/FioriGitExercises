sap.ui.define([
    "sap/m/library",
    "sap/ui/model/type/Currency"
],
function (mobileLibrary, Currency) {
    "use strict";
    return {        
        formatStockValue: function(fUnitPrice, iStockLevel, sCurrCode) {
            var oCurrency = new Currency();
                return oCurrency.formatValue([fUnitPrice * iStockLevel, sCurrCode], "string");  
            }                
    };
});