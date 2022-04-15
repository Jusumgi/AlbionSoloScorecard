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
    console.log("Resources " + resourceNode);
    console.log("Total Achievements " + totalAchievements)
    document.getElementById("resource").innerHTML = "Plentiful Resource Nodes: " + resourceNode;
    document.getElementById("achievements").innerHTML = "Total Achievements " + totalAchievements;
    ach2deathRatio()
}

function upgradedMobsKilled() {
    upgradedMobs++
    totalAchievements++
    console.log("Upgraded Mobs: " + upgradedMobs);
    console.log("Total Achievements " + totalAchievements)
    document.getElementById("upgradedMobs").innerHTML = "Upgraded Mobs Killed: " + upgradedMobs;
    document.getElementById("achievements").innerHTML = "Total Achievements " + totalAchievements;
    ach2deathRatio()
}
function youDie() {
    deathCount++
    console.log("Deaths: " + deathCount);
    document.getElementById("deaths").innerHTML = "Deaths: " + deathCount;
    ach2deathRatio()
}

function ach2deathRatio() {
    if (deathCount == 0) {
        document.getElementById("kpidRatio").innerHTML = "KPI to Death Ratio: " + totalAchievements;
        console.log("IF IS TRUE");
    } else {
        kpiDeathRatio = totalAchievements / deathCount;
        document.getElementById("kpidRatio").innerHTML = "KPI to Death Ratio: " + kpiDeathRatio;
        console.log("IF IS FALSE");
    }

    console.log(kpiDeathRatio)
}