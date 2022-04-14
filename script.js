var resourceNode = 0 // button
var upgradedMobs = 0 // button
var killedPlayers = 0 // button
var bankedLoot = 0 // button
var openWorldChests = 0 // button
var escapedGank = 0 // button
var deathCount = 0 // button
var mightProgression = 0 // Starting Might vs Ending Might, user entered
var factionPoints = 0 // Starting FP vs Ending FP, user entered
var totalAchievements = 0
var kpiDeathRatio // Calculated from total achievements divided by deaths

function resNodeEarned() {
    resourceNode++
    totalAchievements++
    console.log("Resources " + resourceNode);
    console.log("Total Achievements " + totalAchievements)
    document.getElementById("resource").innerHTML = "Plentiful Resource Nodes: " + resourceNode;
    document.getElementById("achievements").innerHTML = "Total Achievements " + totalAchievements;
    document.getElementById("kpidRatio").innerHTML = "KPI to Death Ratio: " + kpiDeathRatio;
}
function upgradedMobsKilled() {
    upgradedMobs++
    totalAchievements++
    //console.log(upgradedMobs);
    console.log("Total Achievements " + totalAchievements)
    document.getElementById("upgradedMobs").innerHTML = "Upgraded Mobs Killed: " + upgradedMobs;
    document.getElementById("achievements").innerHTML = "Total Achievements " + totalAchievements;
    document.getElementById("kpidRatio").innerHTML = "KPI to Death Ratio: " + kpiDeathRatio;
}
function youDie() {
    deathCount++
    //console.log("Deaths " + deathCount);
    document.getElementById("deaths").innerHTML = "Deaths: " + deathCount;
    document.getElementById("kpidRatio").innerHTML = "KPI to Death Ratio: " + kpiDeathRatio;
}
