const log4js = require('log4js');
const path = require('path');
const fileName = 'protractor.log';

log4js.configure({
    appenders: { idlLog: { type: "file", filename: path.join(__dirname, './../', `results/logs/${fileName}`) } },
    categories: { default: { appenders: ["idlLog"], level: "info" } }
});

export const logger = log4js.getLogger();
logger.level = "debug";
logger.level = "info";
logger.level = "warn";
logger.level = "trace";


export function startTest(testName: string) {
    logger.info(`============================`);
    logger.info(`Start Test ---- ${testName}`);
}

export function finishedTest(testName = '') {
    logger.info(`Finished Test ---- ${testName}`);
    logger.info(`============================`);
}