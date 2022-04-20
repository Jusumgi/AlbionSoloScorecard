const LOCAL_STORAGE_KEY = [
    "scorecard",
    "achievement",
    "ratio",
    "might",
    "fp"
];
const defaultValues = {
    resourceNode: 0, // button
    upgradedMobs: 0, // button
    killedPlayers: 0, // button
    bankedLoot: 0, // button
    openWorldChests: 0, // button
    escapedGank: 0, // button
    deadCount: 0, // button
    //mightProgression: 0, // Starting Might vs Ending Might, user entered
    //factionPoints: 0, // Starting FP vs Ending FP, user entered
};

const values = { ...defaultValues };

let kpiDeathRatio = 0;
    kpiDeathRatio = kpiDeathRatio.toFixed(2); // Page loads initally with floating number.

function sum( obj ) { // function that makes an array of values and adds them together.
    var sum = 0;
    for( var el in obj ) {
      if( obj.hasOwnProperty( el ) ) {
        sum += parseFloat( obj[el] );
      }
    }
    return sum;
  }
let totalAchievements = sum(values) - values.deadCount;

function renderAllValues() { // updates all elements with the current values.
    document.getElementById("resource-int").value = values.resourceNode;
    document.getElementById("upgradedMobs-int").value = values.upgradedMobs;
    document.getElementById("killedPlayers-int").value = values.killedPlayers;
    document.getElementById("bankedLoot-int").value = values.bankedLoot;
    document.getElementById("openWorldChests-int").value = values.openWorldChests;
    document.getElementById("escapedGank-int").value = values.escapedGank;
    document.getElementById("deadCount-int").value = values.deadCount;
    document.getElementById("achievements-int").innerHTML = totalAchievements;
    document.getElementById("kpidRatio-int").innerHTML = kpiDeathRatio.toFixed(2);
}

function hydrateValues() { // fetches values from local storage
    try {
        let storedScorecard = localStorage.getItem("scorecard");
        let storedAchievement = localStorage.getItem("achievement");
        let storedRatio = localStorage.getItem("ratio");
        console.log(storedScorecard);
        if (!storedScorecard) return;
        Object.assign(values, JSON.parse(storedScorecard));
        totalAchievements = JSON.parse(storedAchievement);
        kpiDeathRatio = JSON.parse(storedRatio);
        renderAllValues();
    } catch {}
}

function storeValues() { // preserves values to local storage
    localStorage.setItem("scorecard", JSON.stringify(values));
    localStorage.setItem("achievement", JSON.stringify(totalAchievements));
    localStorage.setItem("ratio", JSON.stringify(kpiDeathRatio));
}

function resetValues() { // zeroes out the scorecard
    Object.assign(values, defaultValues);
    console.log(values);
    totalAchievements = 0;
    kpiDeathRatio = 0;
    renderAllValues();
    storeValues();
}

function userEnteredValue(enteredValue, propertyChanged){ // using parameters from processUserInput, makes the value changes to values object
    console.log("value: " + propertyChanged)
    values[propertyChanged] = enteredValue;
    console.log(values[propertyChanged]);
    console.log(values);
    totalAchievements = sum(values) - values.deadCount;
    ach2deathRatio();
    storeValues();
}

function processUserInput(callback, id){ // function that collects parameters then callsback to userEnteredValue
    console.log(id);
    var enteredValue = parseInt(document.getElementById(id).value, 10);
    var propertyChanged = document.getElementById(id).name;
    callback(enteredValue, propertyChanged);
}

function buttonIncremented(btn, int){ // increments respective button based on btn parameter, then increments totalAchievement if the btn was not deadCount
    values[btn]++;
    document.getElementById(int).value = values[btn];
    if (btn != 'deadCount') {
        totalAchievements++;
        }
    ach2deathRatio();
    storeValues();
}

function ach2deathRatio() { // updates the Total KPI and Ratio elements
    if (values.deadCount == 0) {
        document.getElementById("achievements-int").innerHTML = totalAchievements;
        document.getElementById("kpidRatio-int").innerHTML = totalAchievements.toFixed(2);
        } else {
        document.getElementById("achievements-int").innerHTML = totalAchievements;
        kpiDeathRatio = totalAchievements / values.deadCount;
        document.getElementById("kpidRatio-int").innerHTML = kpiDeathRatio.toFixed(2);
        }
    storeValues();
}

window.addEventListener('load', hydrateValues);
