var CronJob = require('cron').CronJob;
const generateReport = require('./generateReport');

const generateReportCron = () => {
  new CronJob('00 30 17 * * 1-5', async function() {
    console.log('Cron job is about to run');
    try {
      await generateReport()
    } catch (error) {
      console.log(error.message)
    }
  }, null, true, 'America/Chicago');
}

module.exports = generateReportCron;