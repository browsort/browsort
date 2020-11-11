import {LoggerContract} from 'logger/LoggerContract';
import {LogContract} from 'logger/LogContract';

export class LoggerMockup implements LoggerContract {
    public debug(_message: string, _extra?: object): void {
        // nothing
    }

    public info(_message: string, _extra?: object): void {
        // nothing
    }

    public warning(_message: string, _extra?: object): void {
        // nothing
    }

    public error(_message: string, _extra?: object): void {
        // nothing
    }

    public validation(_message: string, _extra?: object): void {
        // nothing
    }

    public on(_callback: (log: LogContract) => void): void {
        // nothing
    }

    public destroy(): void {
        // nothing
    }
}
