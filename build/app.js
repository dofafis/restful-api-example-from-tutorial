"use strict";
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var db_1 = require('./config/db');
var routes_1 = require('./modules/user/routes');
var App = (function () {
    function App() {
        this.app = express();
        this.middleware();
        this.routes();
        this.database = new db_1.default();
        this.dataBaseConnection();
    }
    App.prototype.dataBaseConnection = function () {
        this.database.createConnection();
    };
    App.prototype.closeDataBaseConnection = function (message, callback) {
        this.database.closeConnection(message, function () { return callback(); });
    };
    App.prototype.middleware = function () {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    };
    App.prototype.routes = function () {
        this.app.get('/', function (req, res) { return res.status(200).json({ 'message': 'Hello world!' }); });
        this.app.get('/api/v1/users', routes_1.default.getAll);
        this.app.get('/api/v1/users/:id', routes_1.default.getById);
        this.app.post('/api/v1/users', routes_1.default.create);
        this.app.put('/api/v1/users/:id', routes_1.default.update);
        this.app.delete('/api/v1/users/:id', routes_1.default.delete);
    };
    return App;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App();
