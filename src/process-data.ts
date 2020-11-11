import {MdnDataProcessor} from 'data/MdnDataProcessor';
import {CanIUseDataProcessor} from 'data/CanIUseDataProcessor';
import {LoggerContract} from 'logger/LoggerContract';
import {Logger} from 'logger/Logger';
import {asyncForEach} from 'tool/helpers';

const logger: LoggerContract = new Logger({displayOnConsole: true});
asyncForEach([{name: 'MDN', processor: new MdnDataProcessor(logger)}, {name: 'CanIuse', processor: new CanIUseDataProcessor(logger)}], async (dataProcessor) => {
    try {
        logger.info('start ' + dataProcessor.name);
        await dataProcessor.processor.process();
        logger.info('successfully processed data');
    } catch (error) {
        logger.error(error.message, {trace: error.stack});
    }
});
