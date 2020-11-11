import {EventEmitter} from 'events';
import * as colors from 'colors';
import {LoggerContract} from 'logger/LoggerContract';
import {LogContract} from 'logger/LogContract';
import {LoggerConfigurationContract} from 'logger/LoggerConfigurationContract';

export class Logger implements LoggerContract {
    private eventEmitter: EventEmitter;
    private configuration: LoggerConfigurationContract;

    public constructor(configuration: LoggerConfigurationContract) {
        this.configuration = configuration;
        this.eventEmitter = new EventEmitter();
        this.eventEmitter.setMaxListeners(10);
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
        if (this.configuration.displayOnConsole) {
            colors.setTheme({
                debug: 'gray',
                info: 'blue',
                warning: 'yellow',
                error: 'red',
                validation: 'green'
            });
            this.eventEmitter.on('log', (log) => {
                let message: string = log.message;

                if (Object.keys(log.extra).length > 0) {
                    message += ': ' + JSON.stringify(log.extra);
                }

                if (typeof (colors as any)[log.level] === 'function') {
                    console.log((colors as any)[log.level](message)); // eslint-disable-line no-console
                } else {
                    console.log(message); // eslint-disable-line no-console
                }
            });
        }
    }

}
