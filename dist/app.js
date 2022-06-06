"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const express = require('express');
const mongodb_1 = require("mongodb");
const ejs = require('ejs');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const morgan = require('morgan');
require('dotenv').config();
const index_router_1 = require("./api/index/index.router");
async function start() {
    const port = process.env.PORT;
    const app = express();
    app.use(morgan('short'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(__dirname + '/../src/public'));
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/../src/views');
    app.use(methodOverride("_method"));
    app.use(flash());
    const client = new mongodb_1.MongoClient(process.env.MONGODB_CONN);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    app.use('/', await new index_router_1.IndexRouter(db).getRouter());
    app.listen(process.env.PORT, () => {
        console.log(`The server is running on port ${port}...`);
    });
    process.on('SIGINT', async () => {
        await client.close();
        console.log('Closed MongoDB connections.');
        process.exit();
    });
}
start();
//# sourceMappingURL=app.js.map