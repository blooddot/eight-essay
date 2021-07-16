import * as log4js from 'log4js';

export class Logger extends log4js.Logger {
    public log(level: log4js.Level, ...args: unknown[]): void;
}