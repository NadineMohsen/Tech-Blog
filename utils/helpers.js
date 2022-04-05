module.exports = {
      // the helper method 'format_time' will take in a timestamp and return a string with only the time
    format_date: date => {
      //format date
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
      },

}