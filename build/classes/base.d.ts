/// <reference types="node" />
import { SerialPort } from "serialport";
export interface ISerialConfig {
    baudRate: number;
    dataBits: 5 | 6 | 7 | 8 | undefined;
    stopBits: 1 | 1.5 | 2 | undefined;
    parity: "none" | "even" | "mark" | "odd" | "space";
}
export declare class BalancaBase {
    serialStatus: "open" | "closed";
    port: SerialPort;
    defaultConfig: ISerialConfig;
    enqCommand: Buffer;
    timeout: number;
    constructor(port: string, serialConfig?: ISerialConfig, timeout?: number);
    processaPeso(data: Buffer): number;
    escreverPreco(preco: number): Buffer;
    private writeCommand;
    private abrirPorta;
    private fecharPorta;
    private readPeso;
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
    lerPeso(preco?: number): Promise<number>;
}
