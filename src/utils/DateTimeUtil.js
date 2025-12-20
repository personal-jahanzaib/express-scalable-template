/**
 * DateTimeUtil - Utility class for date and time formatting
 * All methods are static - no instantiation required
 */

class DateTimeUtil {
  // Time conversion constants
  // eslint-disable-next-line no-magic-numbers
  static MILLISECONDS_PER_SECOND = 1000;

  // eslint-disable-next-line no-magic-numbers
  static SECONDS_PER_MINUTE = 60;

  // eslint-disable-next-line no-magic-numbers
  static MINUTES_PER_HOUR = 60;

  // eslint-disable-next-line no-magic-numbers
  static HOURS_PER_DAY = 24;

  // eslint-disable-next-line no-magic-numbers
  static DAYS_PER_WEEK = 7;

  // eslint-disable-next-line no-magic-numbers
  static DAYS_PER_MONTH = 30;

  // eslint-disable-next-line no-magic-numbers
  static DAYS_PER_YEAR = 365;

  // eslint-disable-next-line no-magic-numbers
  static WEEKS_PER_MONTH = 4;

  // eslint-disable-next-line no-magic-numbers
  static MONTHS_PER_YEAR = 12;

  // Password strength constants
  // eslint-disable-next-line no-magic-numbers
  static HOURS_IN_12_FORMAT = 12;

  /**
     * Format date to YYYY-MM-DD
     * @param {Date} date - Date object to format
     * @returns {string} Formatted date string
     */
  static toDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
     * Format time to HH:MM:SS
     * @param {Date} date - Date object to format
     * @returns {string} Formatted time string
     */
  static toTimeString(date = new Date()) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  /**
     * Format date and time to YYYY-MM-DD HH:MM:SS
     * @param {Date} date - Date object to format
     * @returns {string} Formatted datetime string
     */
  static toDateTimeString(date = new Date()) {
    return `${DateTimeUtil.toDateString(date)} ${DateTimeUtil.toTimeString(date)}`;
  }

  /**
     * Format date to readable format (e.g., "January 15, 2025")
     * @param {Date} date - Date object to format
     * @returns {string} Formatted date string
     */
  static toReadableDate(date = new Date()) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  /**
     * Format time to 12-hour format with AM/PM
     * @param {Date} date - Date object to format
     * @returns {string} Formatted time string
     */
  static to12HourTime(date = new Date()) {
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= DateTimeUtil.HOURS_IN_12_FORMAT ? 'PM' : 'AM';
    const hour12 = hours % DateTimeUtil.HOURS_IN_12_FORMAT || DateTimeUtil.HOURS_IN_12_FORMAT;
    return `${hour12}:${minutes} ${ampm}`;
  }

  /**
     * Get relative time (e.g., "2 hours ago", "in 3 days")
     * @param {Date} date - Date object to compare
     * @returns {string} Relative time string
     */
  static toRelativeTime(date) {
    const now = new Date();
    const diffMs = date - now; // Positive if future, negative if past
    const isPast = diffMs < 0;
    const absDiffMs = Math.abs(diffMs);

    const diffSec = Math.floor(absDiffMs / DateTimeUtil.MILLISECONDS_PER_SECOND);
    const diffMin = Math.floor(diffSec / DateTimeUtil.SECONDS_PER_MINUTE);
    const diffHour = Math.floor(diffMin / DateTimeUtil.MINUTES_PER_HOUR);
    const diffDay = Math.floor(diffHour / DateTimeUtil.HOURS_PER_DAY);
    const diffWeek = Math.floor(diffDay / DateTimeUtil.DAYS_PER_WEEK);
    const diffMonth = Math.floor(diffDay / DateTimeUtil.DAYS_PER_MONTH);
    const diffYear = Math.floor(diffDay / DateTimeUtil.DAYS_PER_YEAR);

    const formatTime = (value, unit) => {
      const plural = value > 1 ? 's' : '';
      return isPast ? `${value} ${unit}${plural} ago` : `in ${value} ${unit}${plural}`;
    };

    if (diffSec < DateTimeUtil.SECONDS_PER_MINUTE) {
      return 'just now';
    }
    if (diffMin < DateTimeUtil.MINUTES_PER_HOUR) {
      return formatTime(diffMin, 'minute');
    }
    if (diffHour < DateTimeUtil.HOURS_PER_DAY) {
      return formatTime(diffHour, 'hour');
    }
    if (diffDay < DateTimeUtil.DAYS_PER_WEEK) {
      return formatTime(diffDay, 'day');
    }
    if (diffWeek < DateTimeUtil.WEEKS_PER_MONTH) {
      return formatTime(diffWeek, 'week');
    }
    if (diffMonth < DateTimeUtil.MONTHS_PER_YEAR) {
      return formatTime(diffMonth, 'month');
    }
    return formatTime(diffYear, 'year');
  }

  /**
     * Format date to ISO 8601 string
     * @param {Date} date - Date object to format
     * @returns {string} ISO 8601 formatted string
     */
  static toISOString(date = new Date()) {
    return date.toISOString();
  }

  /**
     * Get Unix timestamp (seconds since epoch)
     * @param {Date} date - Date object to convert
     * @returns {number} Unix timestamp
     */
  static toUnixTimestamp(date = new Date()) {
    return Math.floor(date.getTime() / DateTimeUtil.MILLISECONDS_PER_SECOND);
  }

  /**
     * Create Date from Unix timestamp
     * @param {number} timestamp - Unix timestamp
     * @returns {Date} Date object
     */
  static fromUnixTimestamp(timestamp) {
    return new Date(timestamp * DateTimeUtil.MILLISECONDS_PER_SECOND);
  }

  /**
     * Check if date is today
     * @param {Date} date - Date to check
     * @returns {boolean} True if date is today
     */
  static isToday(date) {
    const today = new Date();
    return DateTimeUtil.toDateString(date) === DateTimeUtil.toDateString(today);
  }

  /**
     * Check if date is in the past
     * @param {Date} date - Date to check
     * @returns {boolean} True if date is in the past
     */
  static isPast(date) {
    return date < new Date();
  }

  /**
     * Check if date is in the future
     * @param {Date} date - Date to check
     * @returns {boolean} True if date is in the future
     */
  static isFuture(date) {
    return date > new Date();
  }

  /**
     * Add days to a date
     * @param {Date} date - Starting date
     * @param {number} days - Number of days to add
     * @returns {Date} New date object
     */
  static addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
     * Add hours to a date
     * @param {Date} date - Starting date
     * @param {number} hours - Number of hours to add
     * @returns {Date} New date object
     */
  static addHours(date, hours) {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  }

  /**
     * Get difference between two dates in days
     * @param {Date} date1 - First date
     * @param {Date} date2 - Second date
     * @returns {number} Difference in days
     */
  static getDaysDifference(date1, date2) {
    const diffMs = Math.abs(date2 - date1);
    const msPerDay = DateTimeUtil.MILLISECONDS_PER_SECOND
            * DateTimeUtil.SECONDS_PER_MINUTE
            * DateTimeUtil.MINUTES_PER_HOUR
            * DateTimeUtil.HOURS_PER_DAY;
    return Math.floor(diffMs / msPerDay);
  }
}

export default DateTimeUtil;
