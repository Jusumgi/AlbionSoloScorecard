const LOCAL_STORAGE_KEY = "scorecard";

const defaultValues = {
    resourceNode: 0, // button
    upgradedMobs: 0, // button
    killedPlayers: 0, // button
    bankedLoot: 0, // button
    openWorldChests: 0, // button
    escapedGank: 0, // button
    deathCount: 0, // button
    mightProgression: 0, // Starting Might vs Ending Might, user entered
    factionPoints: 0, // Starting FP vs Ending FP, user entered
    totalAchievements: 0,
    kpiDeathRatio: 0, // Calculated from total achievements divided by deaths
};

const values = { ...defaultValues };

function renderAllValues() {
    document.getElementById("resource-int").innerHTML = values.resourceNode;
    document.getElementById("upgradedMobs-int").innerHTML = values.upgradedMobs;
    document.getElementById("pk-int").innerHTML = values.killedPlayers;
    document.getElementById("lootbank-int").innerHTML = values.bankedLoot;
    document.getElementById("chests-int").innerHTML = values.openWorldChests;
    document.getElementById("gankesc-int").innerHTML = values.escapedGank;
    document.getElementById("deaths-int").innerHTML = values.deathCount;
    document.getElementById("achievements-int").innerHTML = values.totalAchievements;

    if (values.deathCount == 0) {
        document.getElementById("kpidRatio-int").innerHTML = values.totalAchievements;
    } else {
        document.getElementById("kpidRatio-int").innerHTML = values.kpiDeathRatio;
    }
}

function hydrateValues() {
    try {
        let storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!storedData) return;
        Object.assign(values, JSON.parse(storedData));
        renderAllValues();
    } catch {}
}

function storeValues() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
}

// TODO: Add button to call resetValues()
function resetValues() {
    Object.assign(values, defaultValues);
    storeValues();
    renderAllValues();
}

function resNodeEarned() {
    values.resourceNode++;
    values.totalAchievements++;
    //console.log("Resources " + resourceNode);
    //console.log("Total KPI: " + totalAchievements)
    document.getElementById("resource-int").innerHTML = values.resourceNode;
    document.getElementById("achievements-int").innerHTML = values.totalAchievements;
    ach2deathRatio();
    storeValues();
}

function upgradedMobsKilled() {
    values.upgradedMobs++;
    values.totalAchievements++;
    //console.log("Upgraded Mobs: " + upgradedMobs);
    //console.log("Total KPI: " + totalAchievements)
    document.getElementById("upgradedMobs-int").innerHTML = values.upgradedMobs;
    document.getElementById("achievements-int").innerHTML = values.totalAchievements;
    ach2deathRatio();
    storeValues();
}

function playerKill() {
    values.killedPlayers++;
    values.totalAchievements++;
    //console.log("Players Killed: " + killedPlayers);
    //console.log("Total KPI: " + totalAchievements)
    document.getElementById("pk-int").innerHTML = values.killedPlayers;
    document.getElementById("achievements-int").innerHTML = values.totalAchievements;
    ach2deathRatio();
    storeValues();
}

function bankLoot() {
    values.bankedLoot++;
    values.totalAchievements++;
    //console.log("Upgraded Mobs: " + upgradedMobs);
    //console.log("Total KPI:  " + totalAchievements)
    document.getElementById("lootbank-int").innerHTML = values.bankedLoot;
    document.getElementById("achievements-int").innerHTML = values.totalAchievements;
    ach2deathRatio();
    storeValues();
}

function worldChest() {
    values.openWorldChests++;
    values.totalAchievements++;
    //console.log("Open World Chests: " + upgradedMobs);
    //console.log("Total KPI:  " + totalAchievements)
    document.getElementById("chests-int").innerHTML = values.openWorldChests;
    document.getElementById("achievements-int").innerHTML = values.totalAchievements;
    ach2deathRatio();
    storeValues();
}

function gankEscape() {
    values.escapedGank++;
    values.totalAchievements++;
    //console.log("Ganks Escaped: " + upgradedMobs);
    //console.log("Total KPI:  " + totalAchievements)
    document.getElementById("gankesc-int").innerHTML = values.escapedGank;
    document.getElementById("achievements-int").innerHTML = values.totalAchievements;
    ach2deathRatio();
    storeValues();
}

function youDie() {
    values.deathCount++;
    //console.log("Deaths: " + deathCount);
    document.getElementById("deaths-int").innerHTML = values.deathCount;
    ach2deathRatio();
    storeValues();
}

function ach2deathRatio() {
    if (values.deathCount == 0) {
        document.getElementById("kpidRatio-int").innerHTML = values.totalAchievements;
        //console.log("IF IS TRUE");
    } else {
        values.kpiDeathRatio = values.totalAchievements / values.deathCount;
        values.kpiDeathRatio = values.kpiDeathRatio.toFixed(2);
        document.getElementById("kpidRatio-int").innerHTML = values.kpiDeathRatio;
        //console.log("IF IS FALSE");
    }
    storeValues();

    //console.log(kpiDeathRatio)
}

window.addEventListener('load', hydrateValues);
