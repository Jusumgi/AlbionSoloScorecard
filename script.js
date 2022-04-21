const LOCAL_STORAGE_KEYS = {
  ACHIEVEMENT: 'achievement',
  RANGES: 'ranges',
  RATIO: 'ratio',
  SCORECARD: 'scorecard',
};

const defaultValues = {
  bankedLoot: 0, // button
  deadCount: 0, // button
  escapedGank: 0, // button
  killedPlayers: 0, // button
  openWorldChests: 0, // button
  resourceNode: 0, // button
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
function renderAllValues() {
  document.getElementById('resource-int').value = values.resourceNode;
  document.getElementById('upgradedMobs-int').value = values.upgradedMobs;
  document.getElementById('killedPlayers-int').value = values.killedPlayers;
  document.getElementById('bankedLoot-int').value = values.bankedLoot;
  document.getElementById('openWorldChests-int').value = values.openWorldChests;
  document.getElementById('escapedGank-int').value = values.escapedGank;
  document.getElementById('deadCount-int').value = values.deadCount;
  document.getElementById('achievements-int').innerHTML = totalAchievements;
  document.getElementById('kpidRatio-int').innerHTML = kpiDeathRatio.toFixed(2);
  document.getElementById('mightStart').value = ranges.mightStart;
  document.getElementById('mightEnd').value = ranges.mightEnd;
  document.getElementById('might-int').innerHTML = ranges.mightEnd - ranges.mightStart;
  document.getElementById('fpStart').value = ranges.fpStart;
  document.getElementById('fpEnd').value = ranges.fpEnd;
  document.getElementById('fp-int').innerHTML = ranges.fpEnd - ranges.fpStart;
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
  Object.assign(values, defaultValues);
  Object.assign(ranges, defaultRanges);
  totalAchievements = 0;
  kpiDeathRatio = 0;

  renderAllValues();
  storeValues();
}

/**
 * @param {number} enteredValue
 * @param {keyof ranges} propertyChanged
 */
function rangeDifference(enteredValue, propertyChanged) {
  ranges[propertyChanged] = enteredValue;

  if (propertyChanged === 'mightStart') {
    document.getElementById('might-int').innerHTML = ranges.mightEnd - ranges.mightStart;
  } else if (propertyChanged === 'mightEnd') {
    document.getElementById('might-int').innerHTML = ranges.mightEnd - ranges.mightStart;
  } else {
    document.getElementById('fp-int').innerHTML = ranges.fpEnd - ranges.fpStart;
  }
  storeValues();
}

/**
 * Makes the value changes to values object using parameters from processUserInput.
 * @param {number} enteredValue
 * @param {keyof values} propertyChanged
 */
function userEnteredValue(enteredValue, propertyChanged) {
  values[propertyChanged] = enteredValue;

  totalAchievements = sumObjectValues(values) - values.deadCount;

  ach2deathRatio();
  renderAllValues();
  storeValues();
}

/**
 * Collects parameters and passes them to callback function.
 * @param {function} callback
 * @param {string} id
 */
function processUserInput(callback, id) {
  let enteredValue = parseInt(document.getElementById(id).value, 10);
  let propertyChanged = document.getElementById(id).name;
  callback(enteredValue, propertyChanged);
}

/**
 * Increments respective button based on btn parameter, then increments totalAchievement if the btn was not deadCount.
 * @param {string} buttonkey
 * @param {string} id
 */
function buttonIncremented(buttonkey, id) {
  values[buttonkey]++;
  document.getElementById(id).value = values[buttonkey];

  if (buttonkey !== 'deadCount') {
    totalAchievements++;
  }

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

window.addEventListener('load', hydrateValues);
