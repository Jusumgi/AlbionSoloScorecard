let date = new Date();
const day = date.getDate();
const month = date.getMonth()+1;
const year = date.getFullYear().toString().substring(2);
const today = String(day+''+month+''+year);

const defaultScorecard = {
  values: {
    bankedLoot: 0, // button
    deadCount: 0, // button
    escapedGank: 0, // button
    killedPlayers: 0, // button
    openWorldChests: 0, // button
    resourceNode: 0, // button
    upgradedMobs: 0, // button
  },
  ranges: {
    fpEnd: 0,
    fpStart: 0,
    mightEnd: 0,
    mightStart: 0,
  },
  kpi: 0,
  kpiratio: 0,
}
const scorecard = { ...defaultScorecard}

// const LOCAL_STORAGE_KEYS = {
//   ACHIEVEMENT: 'achievement',
//   RANGES: 'ranges',
//   RATIO: 'ratio',
//   SCORECARD: 'scorecard',
// };

// const defaultValues = {
//   bankedLoot: 0, // button
//   deadCount: 0, // button
//   escapedGank: 0, // button
//   killedPlayers: 0, // button
//   openWorldChests: 0, // button
//   resourceNode: 0, // button
//   upgradedMobs: 0, // button
// };

// const defaultRanges = {
//   fpEnd: 0,
//   fpStart: 0,
//   mightEnd: 0,
//   mightStart: 0,
// };

// const values = { ...defaultValues };
// const ranges = { ...defaultRanges };

/**
 * Takes an object of key:number pairs and sums its values.
 * @param {{ [key: string]: number }} obj
 * @returns number
 */
function sumObjectValues(obj) {
  return Object.values(obj).reduce((t, v) => t + v, 0);
}

scorecard.kpi = sumObjectValues(scorecard.values) - scorecard.values.deadCount;
console.log(scorecard.kpi)

/**
 * Updates all elements with the current values.
 */
function renderAllValues() {
  document.getElementById('resource-int').innerHTML = scorecard.values.resourceNode;
  document.getElementById('upgradedMobs-int').innerHTML = scorecard.values.upgradedMobs;
  document.getElementById('killedPlayers-int').innerHTML = scorecard.values.killedPlayers;
  document.getElementById('bankedLoot-int').innerHTML = scorecard.values.bankedLoot;
  document.getElementById('openWorldChests-int').innerHTML = scorecard.values.openWorldChests;
  document.getElementById('escapedGank-int').innerHTML = scorecard.values.escapedGank;
  document.getElementById('deadCount-int').innerHTML = scorecard.values.deadCount;
  document.getElementById('deadCount-int-2').innerHTML = scorecard.values.deadCount;
  document.getElementById('achievements-int').innerHTML = scorecard.kpi;
  document.getElementById('kpidRatio-int').innerHTML = scorecard.kpiratio.toFixed(2);
  document.getElementById('mightStart-sm').value = scorecard.ranges.mightStart;
  document.getElementById('mightStart-md').value = scorecard.ranges.mightStart;
  document.getElementById('mightEnd-sm').value = scorecard.ranges.mightEnd;
  document.getElementById('mightEnd-md').value = scorecard.ranges.mightEnd;
  document.getElementById('might-int').value = scorecard.ranges.mightEnd - scorecard.ranges.mightStart;
  document.getElementById('fpStart-sm').value = scorecard.ranges.fpStart;
  document.getElementById('fpStart-md').value = scorecard.ranges.fpStart;
  document.getElementById('fpEnd-sm').value = scorecard.ranges.fpEnd;
  document.getElementById('fpEnd-md').value = scorecard.ranges.fpEnd;
  document.getElementById('fp-int').value = scorecard.ranges.fpEnd - scorecard.ranges.fpStart;
}

/**
 * fetches values from local storage.
 */
function hydrateValues() {
  try {
    let storedScorecard = localStorage.getItem(LOCAL_STORAGE_KEYS.SCORECARD);
    let storedAchievement = localStorage.getItem(LOCAL_STORAGE_KEYS.ACHIEVEMENT);
    let storedRatio = localStorage.getItem(LOCAL_STORAGE_KEYS.RATIO);
    let storedRanges = localStorage.getItem(LOCAL_STORAGE_KEYS.RANGES);

    if (!storedScorecard) return;

    Object.assign(values, JSON.parse(storedScorecard));
    Object.assign(ranges, JSON.parse(storedRanges));
    scorecard.kpi = JSON.parse(storedAchievement);
    scorecard.kpiratio = JSON.parse(storedRatio);
    ach2deathRatio();
    renderAllValues();
  } catch {}
}

/**
 * Preserves values to local storage.
 */
function storeValues() {
  Object.assign(LOCAL_STORAGE_KEYS.SCORECARD, scorecard.values);
  Object.assign(LOCAL_STORAGE_KEYS.RANGES, scorecard.ranges);
	localStorage.setItem(today, JSON.stringify(LOCAL_STORAGE_KEYS));
  console.log(localStorage);
  // localStorage.setItem(LOCAL_STORAGE_KEYS.SCORECARD, JSON.stringify(values));
  // localStorage.setItem(LOCAL_STORAGE_KEYS.RANGES, JSON.stringify(ranges));
  // localStorage.setItem(LOCAL_STORAGE_KEYS.ACHIEVEMENT, JSON.stringify(scorecard.kpi));
  // localStorage.setItem(LOCAL_STORAGE_KEYS.RATIO, JSON.stringify(scorecard.kpiratio));
}

/**
 * Zeroes out the scorecard.
 */
function resetValues() {
  if (confirm('Are you sure you want to reset?')) {
    Object.assign(scorecard.values, defaultScorecard.values);
    Object.assign(scorecard.ranges, defaultScorecard.ranges);
    scorecard.kpi = 0;
    scorecard.kpiratio = 0;
    renderAllValues('reset');
    storeValues();
  }
}

/**
 * @param {number} enteredValue
 * @param {keyof ranges} propertyChanged
 */
function rangeDifference(enteredValue, propertyChanged) {
  ranges[propertyChanged] = enteredValue;
  console.log((document.getElementById('might-int').value = scorecard.ranges.mightEnd - scorecard.ranges.mightStart));
  console.log((document.getElementById('fp-int').value = scorecard.ranges.fpEnd - scorecard.ranges.fpStart));
  document.getElementById('might-int').innerHTML = scorecard.ranges.mightEnd - scorecard.ranges.mightStart;
  document.getElementById('fp-int').innerHTML = scorecard.ranges.fpEnd - scorecard.ranges.fpStart;
  renderAllValues();
  storeValues();
}
/**
 * Makes the value changes to values object using parameters from processUserInput.
 * @param {number} enteredValue
 * @param {keyof values} propertyChanged
 */
// function userEnteredValue(enteredValue, propertyChanged) {
//   values[propertyChanged] = enteredValue;

//   scorecard.kpi = sumObjectValues(values) - values.deadCount;

//   ach2deathRatio();
//   renderAllValues();
//   storeValues();
// }

/**
 * Collects parameters and passes them to callback function.
 * @param {function} callback
 * @param {string} id
 */
function processUserInput(callback, id) {
  console.log(id);
  let enteredValue = parseInt(document.getElementById(id).value, 10);
  let propertyChanged = document.getElementById(id).name;
  console.log(propertyChanged);
  callback(enteredValue, propertyChanged);
}

/**
 * Increments respective button based on btn parameter, then increments totalAchievement if the btn was not deadCount.
 * @param {integer} buttonkey
 * @param {string} id
 * @param {string} name
 */
function buttonPress(buttonkey, id, name) {
  scorecard.values[name] += buttonkey;
  if (name !== 'deadCount') {
    scorecard.kpi += buttonkey;
  }
  document.getElementById(id).innerHTML = scorecard.values[name];

  ach2deathRatio();
  renderAllValues();
  storeValues();
}

/**
 * Updates the Total KPI and Ratio elements.
 */
function ach2deathRatio() {
  scorecard.kpiratio = scorecard.kpi / 1;
  storeValues();
  if (scorecard.values.deadCount < 1) return;
  scorecard.kpiratio = scorecard.kpi / values.deadCount;
}

window.addEventListener('load', hydrateValues);
