/**
 * Return the current date formatted in portuguese
 *
 * @returns {string}
 */
function currentDateFormatted() {

    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth() + 1;

    let day = current.getDate();

    if (day > 0 && day < 10) {
        day = '0' + day;
    }

    return day + '/' + month + '/' + year;
}

/**
 * Return the time in number
 *
 * @returns {number}
 */
function getTime() {
    return new Date().getTime();
}

export default {
    currentDateFormatted: currentDateFormatted,
    getTime: getTime
};
