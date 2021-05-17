const { DateTime } = require('luxon')

module.exports = function dateToFormat(date, format) {
	String(date)
	return DateTime.fromISO(date, {
		zone: 'utc',
	}).toFormat(String(format))
}