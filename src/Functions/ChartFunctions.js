const gatheringPaths = [
  "LifetimeStatistics.FishingFame",
  "LifetimeStatistics.Gathering.All.Total",
  "LifetimeStatistics.Gathering.Fiber.Total",
  "LifetimeStatistics.Gathering.Hide.Total",
  "LifetimeStatistics.Gathering.Ore.Total",
  "LifetimeStatistics.Gathering.Rock.Total",
  "LifetimeStatistics.Gathering.Wood.Total",
];
const pvePaths = [
  "LifetimeStatistics.PvE.Avalon",
  "LifetimeStatistics.PvE.CorruptedDungeon",
  "LifetimeStatistics.PvE.Hellgate",
  "LifetimeStatistics.PvE.Mists",
  "LifetimeStatistics.PvE.Outlands",
  "LifetimeStatistics.PvE.Royal",
  "LifetimeStatistics.PvE.Total",
];
const pvpPaths = ["KillFame", "DeathFame"];
const attendancePath = ["Attendance"];

function getPaths(type) {
  if (type === "pve") return pvePaths;
  else if (type === "gathering") return gatheringPaths;
  else if (type === "attendance") return attendancePath;
  else if (type === "pvp") return pvpPaths;
}

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

/**
 * Retrive specific data.
 * @param  {Object} data Players data
 * @param  {String} type pve/gathering/attendance/pvp
 * @param  {Boolean} skip Skip data without values
 * @return {}      Returns map with players data
 */
export function getDataMap(data, type, skip) {
  var dataArr = [];
  var pathsArr = Array.from(getPaths(type));
  var name = "";
  pathsArr.forEach((path) => {
    var dataSerie = [];
    Object.keys(data).forEach((dataKey) => {
      const [day, month, year] = dataKey.split(".");
      var date = new Date(`${month}/${day}/${year}`);
      date.setHours(2);
      var dataValue = getValueFromData(data[dataKey], path);
      name = data[dataKey].Name;
      if (skip && (dataValue === 0 || typeof dataValue === "undefined")) {
        return;
      }
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
          .replace("PvE", "")
          .replaceAll(".", ""),
      data: dataSerie,
    });
  });
  return dataArr;
}

export function getAggregatedData(data, path) {
  var dataToAggregate = getDataMap(data, path, false);
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
