const getSimpleDateFormat = (date) => {
  function getTimezoneOffset(dada) {
    function z(n) {
      return (n < 10 ? "0" : "") + n;
    }
    let offset = dada.getTimezoneOffset();
    let sign = offset < 0 ? "+" : "-";
    offset = Math.abs(offset);
    let result = sign + z((offset / 60) | 0) + z(offset % 60);
    return `${result.slice(0, 3)}:${result.slice(3)}`;
  }

  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}T${
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  }${getTimezoneOffset(date)}`;
};

export default getSimpleDateFormat;
