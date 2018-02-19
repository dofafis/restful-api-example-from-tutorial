"use strict";
var mongoose = require('mongoose');
var DataBase = (function () {
    function DataBase() {
        this.DB_URI = 'mongodb://127.0.0.1/ts-rest-api';
    }
    DataBase.prototype.createConnection = function () {
        mongoose.connect(this.DB_URI);
        this.logger(this.DB_URI);
    };
    DataBase.prototype.closeConnection = function (message, callback) {
        this.DB_CONNECTION.close(function () {
            console.log("Mongoose foi desconectado pelo: " + message);
            callback();
        });
    };
    DataBase.prototype.logger = function (uri) {
        this.DB_CONNECTION = mongoose.connection;
        this.DB_CONNECTION.on('connected', function () { return console.log("Mongoose est\u00E1 conectado ao " + uri); });
        this.DB_CONNECTION.on('error', function (error) { return console.error.bind(console, "Erro na conex\u00E3o: " + error); });
        this.DB_CONNECTION.on('disconnected', function () { return console.log("Mongoose est\u00E1 desconectado do " + uri); });
    };
    return DataBase;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataBase;
