"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var padrao_1 = require("./classes/padrao");
var balanca = new padrao_1.BalancaPadraoKilo("/dev/tty.usbserial-2130");
balanca
    .lerPeso(300)
    .then(function (peso) {
    console.log("Peso lido: ".concat(peso));
})
    .catch(function (err) {
    console.error(err);
});
