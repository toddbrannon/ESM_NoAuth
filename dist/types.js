"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaleSectionConfig = void 0;
const getSaleSectionConfig = () => {
    return [
        {
            "name": "Client Info",
            "fields": [
                "jobName",
                "market",
                "services",
                "clientName",
                "clientEmail",
                "saleDate",
                "clientMailingAddress1",
                "clientMailingAddress2",
                "clientMailingCity",
                "clientMailingState",
                "clientPostalCode",
                "checkPayableTo",
                "paymentDueDate",
                "salesPerson",
                "hoursStagingBudget",
                "hoursEstateSaleBudget",
                "grossSalesBudget",
                "splitFee",
                "minimumBase",
                "minimumActual",
                "minimumDiscount"
            ]
        },
        {
            "name": "Sale Setup",
            "fields": [
                "hoursStagingActual",
                "hoursEstateSaleActual",
                "grossSalesActualClover",
                "cashier",
                "openingDay",
                "posId",
                "trailerNumber",
                "adView",
                "emailsSent"
            ]
        },
        {
            "name": "Sale Results",
            "fields": [
                "transactionsOpeningDay",
                "transactions8To10",
                "transactionTotal",
                "cashOutsideClover",
                "grossSalesOpeningDay",
                "grossSales8To10",
                "grossSalesCreditDebit",
                "grossSalesCash",
                "commissionRate",
                "taxesFees"
            ]
        },
        {
            "name": "Post Sale",
            "fields": [
                "disposalFee",
                "disposalLoadCount",
                "disposalVendorCost",
                "additionalDonationLoanCost",
                "courtesyDiscount",
                "postSaleHours"
            ]
        }
    ];
};
exports.getSaleSectionConfig = getSaleSectionConfig;
//# sourceMappingURL=types.js.map