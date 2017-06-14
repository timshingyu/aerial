"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var test_1 = require("aerial-sandbox/test");
describe(__filename + "#", function () {
    var createWebpackDependencyGraph = function (mockFiles) {
        return test_1.createTestDependencyGraph({ name: "webpack" }, { mockFiles: mockFiles });
    };
    xit("can graph and evaluate a simple JavaScript file", function () { return __awaiter(_this, void 0, void 0, function () {
        var graph, entry, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    graph = createWebpackDependencyGraph({
                        "entry.js": "module.exports = \"hello\""
                    });
                    _b = (_a = graph).loadDependency;
                    return [4 /*yield*/, graph.resolve("entry.js", "")];
                case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent()])];
                case 2:
                    entry = _d.sent();
                    _c = chai_1.expect;
                    return [4 /*yield*/, test_1.evaluateDependency(entry)];
                case 3:
                    _c.apply(void 0, [_d.sent()]).to.equal("hello");
                    return [2 /*return*/];
            }
        });
    }); });
    xit("can graph with another dependency", function () { return __awaiter(_this, void 0, void 0, function () {
        var graph, entry, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    graph = createWebpackDependencyGraph({
                        "entry.js": "module.exports = require(\"b.js\")",
                        "b.js": "module.exports = 2;"
                    });
                    _b = (_a = graph).loadDependency;
                    return [4 /*yield*/, graph.resolve("entry.js", "")];
                case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent()])];
                case 2:
                    entry = _d.sent();
                    _c = chai_1.expect;
                    return [4 /*yield*/, test_1.evaluateDependency(entry)];
                case 3:
                    _c.apply(void 0, [_d.sent()]).to.equal(2);
                    return [2 /*return*/];
            }
        });
    }); });
    xit("can graph cyclical dependencies", function () { return __awaiter(_this, void 0, void 0, function () {
        var graph, entry, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    graph = createWebpackDependencyGraph({
                        "entry.js": "module.exports = require(\"a.js\")",
                        "a.js": "module.exports = [require(\"b.js\"), \"a\"];",
                        "b.js": "module.exports = [require(\"c.js\"), \"b\"];",
                        "c.js": "module.exports = [require(\"a.js\"), \"c\"];"
                    });
                    _b = (_a = graph).loadDependency;
                    return [4 /*yield*/, graph.resolve("entry.js", "")];
                case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent()])];
                case 2:
                    entry = _d.sent();
                    _c = chai_1.expect;
                    return [4 /*yield*/, test_1.evaluateDependency(entry)];
                case 3:
                    _c.apply(void 0, [_d.sent()]).to.eql([[[{}, 'c'], 'b'], 'a']);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=webpack-strategy-test.js.map