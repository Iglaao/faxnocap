export function returnConvertedBattleboard(data) {
  let bb = {
    Title: "",
    Id: data.id,
    StartTime: data.startTime,
    TotalPlayers: Object.keys(data.players).length,
    TotalKills: data.totalKills,
    Players: Object.entries(data.players).map((player) => {
      var playerData = {
        Name: player[1].name,
        GuildName: player[1].guildName,
        AllianceName: player[1].allianceName,
        Kills: player[1].kills,
        Deaths: player[1].deaths,
        KillFame: player[1].killFame,
      };
      return playerData;
    }),
    Guilds: Object.entries(data.guilds).map((guild) => {
      var guildData = {
        Name: guild[1].name,
        Alliance: guild[1].alliance,
        Players: Object.entries(data.players).filter(
          (player) => player[1].guildName === guild[1].name
        ).length,
        Kills: guild[1].kills,
        Deaths: guild[1].deaths,
        KillFame: guild[1].killFame,
      };
      return guildData;
    }),
    Alliances: Object.entries(data.alliances).map((alliance) => {
      var allianceData = {
        Name: alliance[1].name,
        Players: Object.entries(data.players).filter(
          (player) => player[1].allianceName === alliance[1].name
        ).length,
        Kills: alliance[1].kills,
        Deaths: alliance[1].deaths,
        KillFame: alliance[1].killFame,
      };
      return allianceData;
    }),
  };
  return bb;
}

function mergeData(source, target) {
  source.forEach((item) => {
    const matchingItem = target.find(
      (targetItem) => targetItem.Name === item.Name
    );
    if (matchingItem) {
      const index = target.findIndex(
        (targetItem) => targetItem.Name === item.Name
      );
      target[index].Kills += item.Kills;
      target[index].Deaths += item.Deaths;
      target[index].KillFame += item.KillFame;
    } else {
      target.push(item);
    }
  });
}

export function combineBattleboards(data) {
  var combined = data.pop();
  for (var i = 0; i < data.length; i++) {
    data.forEach((item) => {
      combined.Id = combined.Id + "," + item.Id;
      mergeData(item.Players, combined.Players);
      mergeData(item.Guilds, combined.Guilds);
      mergeData(item.Alliances, combined.Alliances);
    });
    combined.Guilds.forEach((guild) => {
      guild.Players = combined.Players.reduce(
        (count, player) =>
          player.GuildName === guild.Name ? count + 1 : count,
        0
      );
    });
    combined.Alliances.forEach((alliance) => {
      alliance.Players = combined.Players.reduce(
        (count, player) =>
          player.AllianceName === alliance.Name ? count + 1 : count,
        0
      );
    });
    return combined;
  }
}
