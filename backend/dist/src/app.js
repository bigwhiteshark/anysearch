"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const controllers_1 = require("./controllers");
const app = new koa_1.default();
const port = process.env.PORT || 3000;
const router = new koa_router_1.default();
app.use(router.routes()).use(router.allowedMethods());
router.get('/api/search', controllers_1.searchController);
app.listen(port, () => {
    console.log('Server listen on port 3000');
});
