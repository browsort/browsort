/// <amd-module name="browsort" />
export interface LogContract {
    /** log level */
    level: 'debug' | 'info' | 'warning' | 'error' | 'validation',
    /** description */
    message: string,
    /** contextual data */
    extra: object
}
