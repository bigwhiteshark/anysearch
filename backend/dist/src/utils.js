"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const request = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const { method = 'GET', url, headers, data, query, timeout = 10 * 60 * 5000, } = config;
    const controller = new AbortController();
    const signal = controller.signal;
    const timer = setTimeout(() => controller.abort(), timeout);
    const fullUrl = new URL(url);
    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            fullUrl.searchParams.append(key, value);
        });
    }
    const res = yield fetch(fullUrl.toString(), {
        method,
        headers,
        body: data,
        signal,
    }).finally(() => clearTimeout(timer));
    return res;
});
exports.request = request;
