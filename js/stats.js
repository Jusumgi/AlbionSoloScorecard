const totalStats = {};
const lifetimeScorecard = {
    bankedLoot: 0,
    deadCount: 0,
    escapedGank: 0,
    killedPlayers: 0,
    openWorldChests: 0,
    resourceNode: 0,
    upgradedMobs: 0,
    kpi: 0,
    kpiratio: 0.00,
}
const averageScorecard = {
    bankedLoot: [],
    deadCount: [],
    escapedGank: [],
    killedPlayers: [],
    openWorldChests: [],
    resourceNode: [],
    upgradedMobs: [],
    kpi: [],
    kpiratio: [],
}
function sumObjectValues(obj) {
    return Object.values(obj).reduce((t, v) => t + v, 0);
};

function storeValue(key, value) {
    lifetimeScorecard[key] += value;
    averageScorecard[key].push(value);
}

function renderValues(total, avg){
    total.kpiratio = (total.kpi / total.deadCount).toFixed(2);
    console.log(total);
    for (var key in total){
        let it = document.getElementsByClassName(key);
        for (var i = 0; i < it.length; i++){
            it[i].innerHTML = total[key];
        }

    }

}

function loadScorecards() {
    for (var i = 0; i < localStorage.length; i++) {
        let parseValues = localStorage.getItem(localStorage.key(i));
        Object.assign(totalStats, JSON.parse(parseValues));

        for (var key in totalStats.values){
            storeValue(key, totalStats.values[key]);
        }
        averageScorecard.kpiratio.push(totalStats.kpiratio);
        lifetimeScorecard.kpi += sumObjectValues(totalStats.values);
        }
    renderValues(lifetimeScorecard, averageScorecard);
  }

window.addEventListener('load', loadScorecards());