const log4js = require('log4js');

log4js.configure({
    appenders: { cheese: { type: "file", filename: "protractor.log" } },
    categories: { default: { appenders: ["protractor"], level: "error" } }
});

export const logger = log4js.getLogger();
logger.level = "debug";

export function startTest(testName: string) {
    logger.debug(`Start Test ---- ${testName}`);
}

export function finishedTest(testName: string) {
    logger.debug(`Finished Test ---- ${testName}`);
}