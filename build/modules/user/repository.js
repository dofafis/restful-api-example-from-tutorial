"use strict";
var mongoose = require('mongoose');
var schema_1 = require('./schema');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model('User', schema_1.default);
