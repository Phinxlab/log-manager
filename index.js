const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const Moment=require('moment');

const myFormat = printf(info => {
    return `${Moment(info.timestamp).format('DD-MM-YYYY HH:mm:ss')} [${info.label}] ${info.level}: ${info.message}`;
});

class Logger {

    constructor(name="DEFAULT") {
        this.logger = createLogger({
            format: combine(
                label({ label: name }),
                timestamp(),
                myFormat
            ),
            transports: [new transports.Console()]
        });
        this.log=this.logger.log.bind(this.logger);
        this.error=this.logger.log.bind(this.logger,'error');
        this.info=this.logger.log.bind(this.logger,'info');
        this.warn=this.logger.log.bind(this.logger,'warn');
        this.verbose=this.logger.log.bind(this.logger,'verbose');
        this.debug=this.logger.log.bind(this.logger,'debug');
        this.silly=this.logger.log.bind(this.logger,'silly');
    }

};

module.exports=Logger;
