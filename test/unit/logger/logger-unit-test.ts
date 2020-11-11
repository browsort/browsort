import * as faker from 'faker';
import {LoggerContract} from 'logger/LoggerContract';
import {Logger} from 'logger/Logger';

describe('Logger', () => {
    it('log a validation message', (done) => {
        const logger: LoggerContract = new Logger({});
        logger.on((log) => {
            if (log.level === 'validation') {
                done();
            }
        });
        logger.validation('Validation: ' + faker.lorem.words(5));
    });

    it('log an error', (done) => {
        const logger: LoggerContract = new Logger({});
        logger.on((log) => {
            if (log.level === 'error') {
                done();
            }
        });
        logger.error('Error: ' + faker.lorem.words(5));
    });

    it('log a warning message', (done) => {
        const logger: LoggerContract = new Logger({});
        logger.on((log) => {
            if (log.level === 'warning') {
                done();
            }
        });
        logger.warning('Warning: ' + faker.lorem.words(5));
    });

    it('log an info message', (done) => {
        const logger: LoggerContract = new Logger({});
        logger.on((log) => {
            if (log.level === 'info') {
                done();
            }
        });
        logger.info('Info: ' + faker.lorem.words(5));
    });

    it('log a debug message', (done) => {
        const logger: LoggerContract = new Logger({});
        logger.on((log) => {
            if (log.level === 'debug') {
                done();
            }
        });
        logger.debug('Debug: ' + faker.lorem.words(5));
    });
});
