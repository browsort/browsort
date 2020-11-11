/// <amd-module name="browsort" />
import {LogContract} from 'logger/LogContract';

export interface LoggerContract {
    /**
     * Log a debug message
     * @param {string} message
     * @param {object} extra
     */
    debug(message: string, extra?: object): void;

    /**
     * Log an info message
     * @param {string} message
     * @param {object} extra
     */
    info(message: string, extra?: object): void;

    /**
     * Log a warning message
     * @param {string} message
     * @param {object} extra
     */
    warning(message: string, extra?: object): void;

    /**
     * Log an error message
     * @param {string} message
     * @param {object} extra
     */
    error(message: string, extra?: object): void;

    /**
     * Log a validation message
     * @param {string} message
     * @param {object} extra
     */
    validation(message: string, extra?: object): void;

    /**
     * Set up a function that will be called when a new log is written
     * @param {(log: LogContract) => void} callback
     */
    on(callback: (log: LogContract) => void): void;

    /** Destroy the logger */
    destroy(): void;
}
