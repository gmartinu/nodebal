"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalancaBase = void 0;
var serialport_1 = require("serialport");
var utils_1 = require("../utils");
var BalancaBase = /** @class */ (function () {
    function BalancaBase(port, serialConfig, timeout) {
        this.serialStatus = "closed";
        this.defaultConfig = {
            baudRate: 9600,
            dataBits: 8,
            stopBits: 1,
            parity: "none"
        };
        this.enqCommand = Buffer.from([0x05]);
        this.timeout = 5000;
        this.port = new serialport_1.SerialPort(__assign(__assign({ path: port, autoOpen: false }, this.defaultConfig), serialConfig));
        this.timeout = timeout !== null && timeout !== void 0 ? timeout : this.timeout;
    }
    BalancaBase.prototype.processaPeso = function (data) {
        throw new Error("Method not implemented.");
    };
    BalancaBase.prototype.escreverPreco = function (preco) {
        throw new Error("Method not implemented.");
    };
    BalancaBase.prototype.writeCommand = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            _this.port.write(command, function (err) {
                                if (err != null) {
                                    reject(err);
                                    return;
                                }
                                resolve(true);
                            });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BalancaBase.prototype.abrirPorta = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            if (_this.serialStatus === "open") {
                                resolve(true);
                                return;
                            }
                            _this.port.open(function (err) {
                                if (err != null) {
                                    reject(err);
                                    return;
                                }
                                _this.serialStatus = "open";
                                resolve(true);
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BalancaBase.prototype.fecharPorta = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            if (_this.serialStatus === "closed") {
                                resolve(true);
                                return;
                            }
                            _this.port.close(function (err) {
                                if (err != null) {
                                    reject(err);
                                    return;
                                }
                                _this.serialStatus = "closed";
                                resolve(true);
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BalancaBase.prototype.readPeso = function (preco) {
        return __awaiter(this, void 0, void 0, function () {
            var pesoLido;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pesoLido = 0;
                        _a.label = 1;
                    case 1:
                        if (!(pesoLido === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.writeCommand(_this.enqCommand).catch(reject);
                                var parser = _this.port.pipe(new serialport_1.InterByteTimeoutParser({ interval: 80 }));
                                parser.once("data", function (data) { return __awaiter(_this, void 0, void 0, function () {
                                    var pesoEscrever, weight, err_1;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                _a.trys.push([0, 3, , 4]);
                                                if (!(preco != null)) return [3 /*break*/, 2];
                                                pesoEscrever = this.escreverPreco(preco);
                                                return [4 /*yield*/, this.writeCommand(pesoEscrever)];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2:
                                                weight = this.processaPeso(data);
                                                if (weight > 0) {
                                                    resolve(weight);
                                                    return [2 /*return*/];
                                                }
                                                return [3 /*break*/, 4];
                                            case 3:
                                                err_1 = _a.sent();
                                                reject(err_1);
                                                return [2 /*return*/];
                                            case 4:
                                                resolve(0);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            })];
                    case 2:
                        pesoLido = _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, pesoLido];
                }
            });
        });
    };
    /**
     * Lê o peso da balança
     * @param preco Preço a ser escrito na balança
     * @returns Peso lido
     * @throws {Error} Se ocorrer um erro ao ler o peso
     *
     * @example
     * const balanca = new ToledoUS312POP5("/dev/tty.usbserial-2130");
     *
     * balanca
     *  .lerPeso(300)
     * .then((peso) => {
     *   console.log(`Peso lido: ${peso}`);
     * })
     * */
    BalancaBase.prototype.lerPeso = function (preco) {
        return __awaiter(this, void 0, void 0, function () {
            var pesoPromise_1, result, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 6]);
                        return [4 /*yield*/, this.abrirPorta()];
                    case 1:
                        _a.sent();
                        pesoPromise_1 = this.readPeso(preco);
                        return [4 /*yield*/, (0, utils_1.callWithTimeout)(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, pesoPromise_1];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }, this.timeout, "Timeout ao ler peso")];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, this.fecharPorta()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, result];
                    case 4:
                        err_2 = _a.sent();
                        return [4 /*yield*/, this.fecharPorta()];
                    case 5:
                        _a.sent();
                        throw err_2;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return BalancaBase;
}());
exports.BalancaBase = BalancaBase;
