"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const types_1 = require("../../types");
const database_1 = require("../../config/database");
const invoice_1 = require("../../invoice");
class IndexRouter {
    constructor(db) {
        this.router = express_1.default.Router();
        this.db = db;
    }
    async getRouter() {
        this.router.get("/", (req, res) => {
            res.render("landing", {
                title: "True Legacy Homes",
            });
        });
        this.router.get('/user-info', async (req, res) => {
            const userInfo = await req['oidc'].fetchUserInfo();
            res.json(userInfo);
        });
        this.router.get("/sale/:id?", async (req, res) => {
            let sale;
            try {
                let sql = `SELECT * from market; SELECT * from service; SELECT * from cashier; 
        SELECT * from salesPerson; SELECT * from pos_id; SELECT * from trailer_number; 
        SELECT * from opening_day; SELECT * from state;`;
                if (req.params.id) {
                    sale = await this.db.collection('sales')
                        .findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
                    if (!sale) {
                        throw 'Id not found.';
                    }
                }
                sale = setStatus(sale || {});
                database_1.pool.query(sql, (err, rows, results) => {
                    if (err)
                        throw err;
                    res.render('sale', {
                        title: 'True Legacy Homes Sale Manager New Sale',
                        marketArray: rows[0],
                        serviceArray: rows[1],
                        cashierArray: rows[2],
                        salesPersonArray: rows[3],
                        posIdArray: rows[4],
                        trailerNumberArray: rows[5],
                        openingDayArray: rows[6],
                        stateArray: rows[7],
                        sale: sale
                    });
                });
            }
            catch (err) {
                console.log("Failed to insert data into input table");
                console.log(err);
                res.sendStatus(500);
                return;
            }
        });
        const setStatus = (sale) => {
            const sections = (0, types_1.getSaleSectionConfig)();
            sale.status = { section: '', index: -1, reason: '' };
            for (let i = 0; i < sections.length; ++i) {
                sale.status.index = i;
                sale.status.section = sections[i].name;
                let broken = false;
                for (let j = 0; j < sections[i].fields.length; ++j) {
                    if (!sale[sections[i].fields[j]]) {
                        sale.status.reason = sections[i].fields[j];
                        broken = true;
                        break;
                    }
                }
                if (broken) {
                    break;
                }
            }
            return sale;
        };
        this.router.get('/sales', async (req, res) => {
            let sales = await this.db.collection('sales').find().toArray();
            const sections = (0, types_1.getSaleSectionConfig)();
            const statuses = new Array();
            for (let s = 0; s < sales.length; ++s) {
                const status = { section: '', index: -1, reason: '' };
                for (let i = 0; i < sections.length; ++i) {
                    status.index = i;
                    status.section = sections[i].name;
                    let broken = false;
                    for (let j = 0; j < sections[i].fields.length; ++j) {
                        if (!sales[s][sections[i].fields[j]]) {
                            status.reason = sections[i].fields[j];
                            broken = true;
                            break;
                        }
                    }
                    if (broken) {
                        break;
                    }
                }
                statuses.push(status);
            }
            res.render('sales', {
                title: 'True Legacy Homes Sale Manager - All Sales',
                saleresults: sales,
                salestatuses: statuses,
                sectioncount: sections.length
            });
        });
        this.router.post('/sale/:id?', async (req, res) => {
            console.log("Trying to add a new sale");
            console.log("Job name is " + req.body.jobName);
            const sale = {
                jobName: req.body.jobName,
                hoursStagingBudget: req.body.hoursStagingBudget,
                market: req.body.market,
                hoursStagingActual: req.body.hoursStagingActual,
                minimumBase: req.body.minimumBase,
                services: req.body.services,
                minimumActual: req.body.minimumActual,
                saleDate: req.body.saleDate,
                hoursEstateSaleBudget: req.body.hoursEstateSaleBudget,
                minimumDiscount: req.body.minimumDiscount,
                cashier: req.body.cashier,
                hoursEstateSaleActual: req.body.hoursEstateSaleActual,
                salesPerson: req.body.salesPerson,
                disposalFee: req.body.disposalFee,
                posId: req.body.posId,
                grossSalesBudget: req.body.grossSalesBudget,
                splitFee: req.body.splitFee,
                disposalLoadCount: req.body.disposalLoadCount,
                trailerNumber: req.body.trailerNumber,
                grossSalesActualClover: req.body.grossSalesActualClover,
                disposalVendorCost: req.body.disposalVendorCost,
                openingDay: req.body.openingDay,
                adView: req.body.adView,
                grossSales8To10: req.body.grossSales8To10,
                transactions8To10: req.body.transactions8To10,
                emailsSent: req.body.emailsSent,
                grossSalesOpeningDay: req.body.grossSalesOpeningDay,
                transactionsOpeningDay: req.body.transactionsOpeningDay,
                clientName: req.body.clientName,
                checkPayableTo: req.body.checkPayableTo,
                paymentDueDate: req.body.paymentDueDate,
                clientEmail: req.body.clientEmail,
                transactionTotal: req.body.transactionTotal,
                clientMailingAddress1: req.body.clientMailingAddress1,
                clientMailingAddress2: req.body.clientMailingAddress2,
                clientMailingCity: req.body.clientMailingCity,
                grossSalesCreditDebit: req.body.grossSalesCreditDebit,
                grossSalesCash: req.body.grossSalesCash,
                cashOutsideClover: req.body.cashOutsideClover,
                commissionRate: req.body.commissionRate,
                clientMailingState: req.body.clientMailingState,
                clientPostalCode: req.body.clientPostalCode,
                taxesFees: req.body.taxesFees,
                additionalDonationLoanCost: req.body.additionalDonationLoanCost,
                courtesyDiscount: req.body.courtesyDiscount,
                postSaleHours: req.body.postSaleHours
            };
            try {
                let id = req.params.id;
                if (id) {
                    const result = await this.db.collection('sales').updateOne({ '_id': new mongodb_1.ObjectId(id) }, { $set: sale }, { upsert: true });
                    console.log("Updated a input with id: " + id);
                }
                else {
                    const result = await this.db.collection('sales').insertOne(sale);
                    console.log("Inserted a new input with id: " + id);
                    id = result.insertedId;
                }
                if (!id) {
                    throw new Error('Error while inserting or updating sale.');
                }
                console.log("market is " + sale.market);
                console.log("service is " + sale.services);
                console.log("sale date is " + sale.saleDate);
                res.json({ id: id });
                res.end();
            }
            catch (err) {
                console.log("Failed to insert data into input table");
                console.log(err);
                res.sendStatus(500);
                return;
            }
        });
        this.router.delete("/:id", async (req, res) => {
            try {
                let Sale;
                if (req.params.id) {
                    Sale = await this.db.collection('sales');
                    Sale.findOneAndDelete({ "_id": new mongodb_1.ObjectId(req.params.id) }, (error, result) => {
                        if (result.ok && result.value) {
                            res.sendStatus(200);
                        }
                        else {
                            res.sendStatus(500);
                        }
                    });
                }
            }
            catch (err) {
                console.log("Failed to delete data");
                console.log(err);
                res.sendStatus(500);
                return;
            }
        });
        this.router.get('/invoice/:id?', async (req, res) => {
            try {
                let sale;
                if (req.params.id) {
                    sale = await this.db.collection('sales')
                        .findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
                    if (!sale) {
                        throw 'Id not found.';
                    }
                }
                else {
                    sale = {};
                }
                res.render('invoice', {
                    title: 'True Legacy Homes Sale Manager New Sale',
                    invoice: (0, invoice_1.saleToInvoice)(sale),
                    sale
                });
            }
            catch (err) {
                console.log("Failed to insert data into input table");
                console.log(err);
                res.sendStatus(500);
                return;
            }
        });
        this.router.get('/admin', async (req, res) => {
            try {
                let sql = `SELECT * from market;
        SELECT * from service; SELECT * from cashier; 
         SELECT * from salesPerson; SELECT * from pos_id; SELECT * from trailer_number; 
        SELECT * from opening_day order by opening_day_id;`;
                database_1.pool.query(sql, (err, rows, results) => {
                    if (err)
                        throw err;
                    res.render('admin/dropdowns', {
                        title: 'Admin Config',
                        marketArray: rows[0],
                        serviceArray: rows[1],
                        cashierArray: rows[2],
                        salesPersonArray: rows[3],
                        posIdArray: rows[4],
                        trailerNumberArray: rows[5],
                        openingDayArray: rows[6],
                        stateArray: rows[7],
                    });
                });
            }
            catch (err) {
                console.log("Failed to insert data into input table");
                console.log(err);
                res.sendStatus(500);
                return;
            }
        });
        async function getDropdownRowsFrom(tablename, sqlWhereOrder = '') {
            return new Promise((resolve, reject) => {
                let sql = `SELECT * from ${tablename} ${sqlWhereOrder}`;
                database_1.pool.query(sql, (err, rows, results) => {
                    if (err)
                        reject();
                    resolve(JSON.stringify(rows));
                });
            });
        }
        this.router.get("/dropdown/:db", async (req, res) => {
            try {
                const rows = await getDropdownRowsFrom(req.params.db);
                res.status(200).json(JSON.parse(rows));
            }
            catch (err) {
                res.sendStatus(500);
                return;
            }
        });
        this.router.post("/dropdown", async (req, res) => {
            try {
                const { db, dbvalue, dbname, name } = req.body;
                const stringRows = await getDropdownRowsFrom(db, `order by ${dbvalue} desc limit 1`);
                const rows = JSON.parse(stringRows);
                const nextId = rows[0][dbvalue] + 1;
                let sql = `INSERT ${db} (${[dbvalue]},${[dbname]}) VALUES('${nextId}','${name}')`;
                database_1.pool.query(sql, (err, rows, results) => {
                    if (err)
                        throw err;
                    res.status(rows.affectedRows ? 200 : 500).json({ insertId: rows.insertId });
                });
            }
            catch (err) {
                console.log("Failed to insert data into input table");
                console.log(err);
                res.sendStatus(500);
                return;
            }
        });
        this.router.put("/dropdown", async (req, res) => {
            try {
                const { db, dbvalue, dbname, value, name } = req.body;
                let sql = `UPDATE ${db} SET ${[dbname]}='${name}' WHERE ${[dbvalue]}='${value}' LIMIT 1`;
                database_1.pool.query(sql, (err, rows, results) => {
                    if (err)
                        throw err;
                    res.status(rows.affectedRows ? 200 : 500).json({ insertId: rows.insertId });
                });
            }
            catch (err) {
                console.log("Failed to update data into input table");
                console.log(err);
                res.sendStatus(500);
                return;
            }
        });
        this.router.delete("/dropdown/:db/:dbvalue/:value", async (req, res) => {
            try {
                const { db, dbvalue, value } = req.params;
                if (db && dbvalue && value) {
                    let sql = `DELETE FROM ${db} WHERE ${[dbvalue]}='${value}' LIMIT 1`;
                    database_1.pool.query(sql, (err, rows, results) => {
                        if (err)
                            throw err;
                        res.status(rows.affectedRows ? 200 : 500).json();
                    });
                }
            }
            catch (err) {
                console.log("Failed to delete data into input table");
                console.log(err);
                res.sendStatus(500);
                return;
            }
        });
        return this.router;
    }
}
exports.IndexRouter = IndexRouter;
//# sourceMappingURL=index.router.js.map