import { configure, getLogger } from 'log4js';
import * as fse from "fs-extra";
import { Logger } from '../typings/logger';

const path = `${process.cwd()}/essays.log`;
if (fse.existsSync(path)) {
    fse.unlinkSync(path);
}

const logger = getLogger("essays");
configure({
    appenders: {
        essays: { type: "file", filename: "essays.log" },
        console: { type: "console" }
    },
    categories: {
        default: { appenders: ["console"], level: "all" },
        essays: { appenders: ["console", "essays"], level: "all" }
    },
});

export default logger as Logger;