const LOCAL_STORAGE_KEYS = {
  ACHIEVEMENT: 'achievement',
  RANGES: 'ranges',
  RATIO: 'ratio',
  SCORECARD: 'scorecard',
};

const defaultValues = {
  coresSecured: 0, // button
  deadCount: 0, // button
  territoryCrystals: 0, // button
  siphonMages: 0,
  crystalSpiders: 0, // button
  arenaLoss: 0, // button
  arenaWin: 0, // button
  upgradedMobs: 0, // button
};

const defaultRanges = {
  fpEnd: 0,
  fpStart: 0,
  mightEnd: 0,
  mightStart: 0,
};

const values = { ...defaultValues };
const ranges = { ...defaultRanges };

let kpiDeathRatio = 0;

/**
 * Takes an object of key:number pairs and sums its values.
 * @param {{ [key: string]: number }} obj
 * @returns number
 */
function sumObjectValues(obj) {
  return Object.values(obj).reduce((t, v) => t + v, 0);
}

let totalAchievements = sumObjectValues(values) - values.deadCount;

let range = 0;

/**
 * Updates all elements with the current values.
 */
function renderAllValues(a) {
  document.getElementById('crystalSpiders-int').innerHTML = values.crystalSpiders;
  document.getElementById('coresSecured-int').innerHTML = values.coresSecured;
  document.getElementById('territoryCrystals-int').innerHTML = values.territoryCrystals;
  document.getElementById('siphonMages-int').innerHTML = values.siphonMages;
  document.getElementById('arenaLoss-int').innerHTML = values.arenaLoss;
  document.getElementById('arenaWin-int').innerHTML = values.arenaWin;
  document.getElementById('deadCount-int').innerHTML = values.deadCount;
  document.getElementById('deadCount-int-2').innerHTML = values.deadCount;
  document.getElementById('achievements-int').innerHTML = totalAchievements;
  document.getElementById('kpidRatio-int').innerHTML = kpiDeathRatio.toFixed(2);
  document.getElementById('mightStart-sm').value = ranges.mightStart;
  document.getElementById('mightStart-md').value = ranges.mightStart;
  document.getElementById('mightEnd-sm').value = ranges.mightEnd;
  document.getElementById('mightEnd-md').value = ranges.mightEnd;
  document.getElementById('might-int').value = ranges.mightEnd - ranges.mightStart;
  document.getElementById('fpStart-sm').value = ranges.fpStart;
  document.getElementById('fpStart-md').value = ranges.fpStart;
  document.getElementById('fpEnd-sm').value = ranges.fpEnd;
  document.getElementById('fpEnd-md').value = ranges.fpEnd;
  document.getElementById('fp-int').value = ranges.fpEnd - ranges.fpStart;
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
    totalAchievements = JSON.parse(storedAchievement);
    kpiDeathRatio = JSON.parse(storedRatio);
    ach2deathRatio();
    renderAllValues();
  } catch {}
}

/**
 * Preserves values to local storage.
 */
function storeValues() {
  localStorage.setItem(LOCAL_STORAGE_KEYS.SCORECARD, JSON.stringify(values));
  localStorage.setItem(LOCAL_STORAGE_KEYS.RANGES, JSON.stringify(ranges));
  localStorage.setItem(LOCAL_STORAGE_KEYS.ACHIEVEMENT, JSON.stringify(totalAchievements));
  localStorage.setItem(LOCAL_STORAGE_KEYS.RATIO, JSON.stringify(kpiDeathRatio));
}

/**
 * Zeroes out the scorecard.
 */
function resetValues() {
  if (confirm('Are you sure you want to reset?')) {
    Object.assign(values, defaultValues);
    Object.assign(ranges, defaultRanges);
    totalAchievements = 0;
    kpiDeathRatio = 0;
    console.log(ranges);
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
  console.log((document.getElementById('might-int').value = ranges.mightEnd - ranges.mightStart));
  console.log((document.getElementById('fp-int').value = ranges.fpEnd - ranges.fpStart));
  document.getElementById('might-int').innerHTML = ranges.mightEnd - ranges.mightStart;
  document.getElementById('fp-int').innerHTML = ranges.fpEnd - ranges.fpStart;
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

//   totalAchievements = sumObjectValues(values) - values.deadCount;

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
  values[name] += buttonkey;
  if (name !== 'deadCount') {
    totalAchievements += buttonkey;
  }
  document.getElementById(id).innerHTML = values[name];

  ach2deathRatio();
  renderAllValues();
  storeValues();
}

/**
 * Updates the Total KPI and Ratio elements.
 */
function ach2deathRatio() {
  kpiDeathRatio = totalAchievements / 1;
  storeValues();
  if (values.deadCount < 1) return;
  kpiDeathRatio = totalAchievements / values.deadCount;
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

window.addEventListener('load', hydrateValues);
