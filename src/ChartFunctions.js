export function getValueFromData(data, path) {
  var keys = path.split(".");
  let value = data;
  for (const key of keys) {
    if (value[key] !== undefined) {
      value = value[key];
    } else {
      return undefined;
    }
  }
  return value;
}

export function getDataMap(data, paths) {
  var dataArr = [];
  var pathsArr = Array.from(paths);
  var name = "";
  pathsArr.forEach((path) => {
    var dataSerie = [];
    Object.keys(data).forEach((dataKey) => {
      const [day, month, year] = dataKey.split(".");
      var date = new Date(`${month}/${day}/${year}`);
      date.setHours(2);
      var dataValue = getValueFromData(data[dataKey], path);
      name = data[dataKey].Name;
      dataSerie.push({
        key: date,
        value: typeof dataValue !== "undefined" ? dataValue : 0,
      });
    });
    dataSerie.sort(function (a, b) {
      return new Date(a.key) - new Date(b.key);
    });
    dataArr.push({
      label:
        name +
        "'s " +
        path
          .replace("LifetimeStatistics", "")
          .replace("Gathering", "")
          .replace("Total", "")
          .replace("Fame", "")
          .replaceAll(".", ""),
      data: dataSerie,
    });
  });
  return dataArr;
}

export function getAggregatedData(data, path) {
  var dataToAggregate = getDataMap(data, path);
  dataToAggregate.forEach((aggregatedData) => {
    aggregatedData.data = aggregatedData.data.reduce(
      (accumulator, currentValue) => {
        const sum =
          accumulator.length > 0
            ? accumulator[accumulator.length - 1].value + currentValue.value
            : currentValue.value;
        accumulator.push({ key: currentValue.key, value: sum });
        return accumulator;
      },
      []
    );
  });
  return dataToAggregate;
}
