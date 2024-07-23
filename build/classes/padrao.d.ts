/// <reference types="node" />
import { BalancaBase } from "./base";
export declare class BalancaPadraoKilo extends BalancaBase {
    /**
     * Balança padrão para leitura de peso em kilogramas
     * Ex: 0,045
     **/
    defaultConfig: {
        baudRate: 9600;
        dataBits: 8;
        stopBits: 1;
        parity: "none";
    };
    enqCommand: Buffer;
    escreverPreco(preco: number): Buffer;
    processaPeso(data: Buffer): number;
}
export declare class BalancaPadraoGrama extends BalancaPadraoKilo {
    /**
     * Balança padrão para leitura de peso em gramas
     * Ex: 45 -> 0,045
     **/
    processaPeso(data: Buffer): number;
}
