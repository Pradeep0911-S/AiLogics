"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const notfound_1 = require("./middleware/notfound");
const cors_1 = __importDefault(require("cors"));
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(notfound_1.notFound);
    app.use(errorHandler_1.errorHandler);
    return app;
}
