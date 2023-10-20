import moment from 'moment';
// const moment = require('moment')

export function formatDate(date) {
    return moment(date).format("DD MM YYYY hh:mm:ss");
}

// console.log(formatDate(Date.now()))