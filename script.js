var resourceNode = 0; // button
var upgradedMobs = 0; // button
var killedPlayers = 0; // button
var bankedLoot = 0; // button
var openWorldChests = 0; // button
var escapedGank = 0; // button
var deathCount = 0; // button
var mightProgression = 0; // Starting Might vs Ending Might, user entered
var factionPoints = 0; // Starting FP vs Ending FP, user entered
var totalAchievements = 0;
var kpiDeathRatio // Calculated from total achievements divided by deaths

function resNodeEarned() {
    resourceNode++
    totalAchievements++
    //console.log("Resources " + resourceNode);
    //console.log("Total KPI: " + totalAchievements)
    document.getElementById("resource").innerHTML = "Plentiful Resource Nodes: " + resourceNode;
    document.getElementById("achievements-int").innerHTML = totalAchievements;
    ach2deathRatio()
}

function upgradedMobsKilled() {
    upgradedMobs++
    totalAchievements++
    //console.log("Upgraded Mobs: " + upgradedMobs);
    //console.log("Total KPI: " + totalAchievements)
    document.getElementById("upgradedMobs").innerHTML = "Upgraded Mobs Killed: " + upgradedMobs;
    document.getElementById("achievements-int").innerHTML = totalAchievements;
    ach2deathRatio()
}
function playerKill() {
    killedPlayers++
    totalAchievements++
    //console.log("Players Killed: " + killedPlayers);
    //console.log("Total KPI: " + totalAchievements)
    document.getElementById("pk").innerHTML = "Kills: " + killedPlayers;
    document.getElementById("achievements-int").innerHTML = totalAchievements;
    ach2deathRatio()
}
function bankLoot() {
    bankedLoot++
    totalAchievements++
    //console.log("Upgraded Mobs: " + upgradedMobs);
    //console.log("Total KPI:  " + totalAchievements)
    document.getElementById("lootbank").innerHTML = "Banked Loot: " + bankedLoot;
    document.getElementById("achievements-int").innerHTML = totalAchievements;
    ach2deathRatio()
}
function worldChest() {
    openWorldChests++
    totalAchievements++
    //console.log("Open World Chests: " + upgradedMobs);
    //console.log("Total KPI:  " + totalAchievements)
    document.getElementById("chests").innerHTML = "World Chests: " + openWorldChests;
    document.getElementById("achievements-int").innerHTML = totalAchievements;
    ach2deathRatio()
}
function gankEscape() {
    escapedGank++
    totalAchievements++
    //console.log("Ganks Escaped: " + upgradedMobs);
    //console.log("Total KPI:  " + totalAchievements)
    document.getElementById("gankesc").innerHTML = "Ganks Escaped: " + escapedGank;
    document.getElementById("achievements-int").innerHTML = totalAchievements;
    ach2deathRatio()
}
function youDie() {
    deathCount++
    //console.log("Deaths: " + deathCount);
    document.getElementById("deaths-int").innerHTML = deathCount;
    ach2deathRatio()
}

function ach2deathRatio() {
    if (deathCount == 0) {
        document.getElementById("kpidRatio-int").innerHTML = totalAchievements;
        //console.log("IF IS TRUE");
    } else {
        kpiDeathRatio = totalAchievements / deathCount;
        kpiDeathRatio = kpiDeathRatio.toFixed(2);
        document.getElementById("kpidRatio-int").innerHTML = kpiDeathRatio;
        //console.log("IF IS FALSE");
    }

    //console.log(kpiDeathRatio)
}