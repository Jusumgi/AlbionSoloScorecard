var resourceNode = 0 // button
var upgradedMobs = 0 // button
var killedPlayers = 0 // button
var bankedLoot = 0 // button
var openWorldChests = 0 // button
var escapedGank = 0 // button
var deathCount = 0 // button
var mightProgression = 0 // Starting Might vs Ending Might, user entered
var factionPoints = 0 // Starting FP vs Ending FP, user entered
var kpiDeathRatio = 0 // Calculated from total achievements divided by deaths
// kill me
function resNodeEarned() {
    resourceNode++
    console.log(resourceNode);
    document.getElementById("resource").innerHTML = "Plentiful Resource Nodes: " + resourceNode;
}
function upgradedMobsKilled() {
    resourceNode++
    console.log(upgradedMobs);
    document.getElementById("upgradedMobs").innerHTML = "Upgraded Mobs Killed: " + upgradedMobs;
}