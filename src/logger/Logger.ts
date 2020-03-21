import {EventEmitter} from 'events';
import * as colors from 'colors';
import {LoggerContract} from 'logger/LoggerContract';
import {LogContract} from 'logger/LogContract';

export class Logger implements LoggerContract {
    private eventEmitter: EventEmitter;
    private displayOnConsole: boolean;

    public constructor(displayOnConsole: boolean = true) {
        this.eventEmitter = new EventEmitter();
        this.eventEmitter.setMaxListeners(10);
        this.displayOnConsole = displayOnConsole;
        this.initDisplay();
    }

    public debug(message: string, extra: object = {}): void {
        this.eventEmitter.emit('log', {
            level: 'debug',
            message: message,
            extra: extra
        });
    }

    public info(message: string, extra: object = {}): void {
        this.eventEmitter.emit('log', {
            level: 'info',
            message: message,
            extra: extra
        });
    }

    public warning(message: string, extra: object = {}): void {
        this.eventEmitter.emit('log', {
            level: 'warning',
            message: message,
            extra: extra
        });
    }

    public error(message: string, extra: object = {}): void {
        this.eventEmitter.emit('log', {
            level: 'error',
            message: message,
            extra: extra
        });
    }

    public validation(message: string, extra: object = {}): void {
        this.eventEmitter.emit('log', {
            level: 'validation',
            message: message,
            extra: extra
        });
    }

    public on(callback: (log: LogContract) => void): void {
        this.eventEmitter.on('log', callback);
    }

    public destroy(): void {
        this.eventEmitter.removeAllListeners();
    }

    private initDisplay(): void {
        if (this.displayOnConsole) {
            colors.setTheme({
                debug: 'gray',
                info: 'blue',
                warning: 'yellow',
                error: 'red',
                validation: 'green'
            });
            this.eventEmitter.on('log', (log) => {
                if (typeof (colors as any)[log.level] === 'function') {
                    console.log((colors as any)[log.level](log.message)); // eslint-disable-line no-console
                } else {
                    console.log(log.message); // eslint-disable-line no-console
                }
            });
        }
    }

}
