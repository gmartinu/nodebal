"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalancaPadraoGrama = exports.BalancaPadraoKilo = void 0;
var base_1 = require("./base");
var BalancaPadraoKilo = /** @class */ (function (_super) {
    __extends(BalancaPadraoKilo, _super);
    function BalancaPadraoKilo() {
        /**
         * Balança padrão para leitura de peso em kilogramas
         * Ex: 0,045
         **/
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultConfig = {
            baudRate: 9600,
            dataBits: 8,
            stopBits: 1,
            parity: "none"
        };
        _this.enqCommand = Buffer.from([0x05]);
        return _this;
    }
    BalancaPadraoKilo.prototype.escreverPreco = function (preco) {
        var formattedPrice = preco.toFixed(2).replace(".", "").padStart(6, "0");
        var priceMessage = Buffer.from(__spreadArray(__spreadArray([
            0x02
        ], formattedPrice.split("").map(function (char) { return char.charCodeAt(0); }), true), [
            0x03
        ], false));
        return priceMessage;
    };
    BalancaPadraoKilo.prototype.processaPeso = function (data) {
        var response = data.toString();
        if (response.startsWith("\x02") && response.endsWith("\x03")) {
            // Processar a resposta do peso
            var weight = response.slice(1, -1); // Remover STX e ETX
            var numericWeight = parseFloat(weight.replace(",", ".")); // Converter para número
            return numericWeight;
        }
        var chars = response.split("").map(function (char) { return char.charCodeAt(0); });
        throw new Error("Invalid weight response: " + response + " " + chars.join(","));
    };
    return BalancaPadraoKilo;
}(base_1.BalancaBase));
exports.BalancaPadraoKilo = BalancaPadraoKilo;
var BalancaPadraoGrama = /** @class */ (function (_super) {
    __extends(BalancaPadraoGrama, _super);
    function BalancaPadraoGrama() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Balança padrão para leitura de peso em gramas
     * Ex: 45 -> 0,045
     **/
    BalancaPadraoGrama.prototype.processaPeso = function (data) {
        // Extamente igual, mas divide por 1000
        // para converter de gramas para kilogramas
        return _super.prototype.processaPeso.call(this, data) / 1000;
    };
    return BalancaPadraoGrama;
}(BalancaPadraoKilo));
exports.BalancaPadraoGrama = BalancaPadraoGrama;
