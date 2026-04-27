// ============================================================
// GABM Mobility Curve — Town Background Mode
// Stripped version of town.js for use as a hero background.
// No UI DOM dependencies. Auto-cycles through infection levels.
// ============================================================

'use strict';

// ─── Background constants ────────────────────────────────────
const VIEW_W = 960;
const VIEW_H = 640;
const DEFAULT_ZOOM = 0.45;
const MIN_ZOOM = Math.max(VIEW_W / MAP_PX_W, VIEW_H / MAP_PX_H);
const BG_PLAY_SPEED = 2;

// ─── State ───────────────────────────────────────────────────
let agentDecisions    = {};
let agentVoteCount    = {};
let agentReasoning    = {};
let agentAllReasoning = {};
let agentsInfo        = {};
let allModelsMacro    = {};

let maxStep        = 39;
let currentStep    = 0;
let currentSubStep = 0;
let currentModelIndex = 0;

let isPlaying = false;
let playSpeed = BG_PLAY_SPEED;
let playTimer = null;

let scene;

// ─── Stub UI functions that reference missing DOM ────────────
function showBioPanel(id) {}
function updateChartPlayheads() {}
function onCanvasMouseMove() {}

// ─── Phaser boot ─────────────────────────────────────────────
const game = window.__townBgGame = new Phaser.Game({
  type:            Phaser.WEBGL,
  width:           VIEW_W,
  height:          VIEW_H,
  backgroundColor: '#6AAF4A',
  parent:          'town-bg-container',
  render: { antialias: false, roundPixels: false, pixelArt: true },
  scene: { preload, create, update },
});

// ─── Phaser lifecycle ─────────────────────────────────────────

function preload() {
  this.load.setBaseURL('/town/');

  CHAR_NAMES.forEach(name => {
    this.load.atlas(name, `assets/characters/${name}.png`, 'assets/characters/atlas.json');
  });

  const loaded = new Set();
  HOME_HOUSES.forEach(h => {
    const key = `house_${h.folder}_${h.sprite}`;
    if (!loaded.has(key)) {
      loaded.add(key);
      this.load.image(key, `assets/dewberry/houses/${h.folder}/${h.sprite}.png`);
    }
  });

  const natAssets = {
    nat_tree_oak_1: 'assets/dewberry/trees/tree_oak_1.png',
    nat_tree_oak_2: 'assets/dewberry/trees/tree_oak_2.png',
    nat_tree_oak_3: 'assets/dewberry/trees/tree_oak_3.png',
    nat_pine_1: 'assets/dewberry/nature/pine_tree_1.png',
    nat_pine_2: 'assets/dewberry/nature/pine_tree_2.png',
    nat_pine_3: 'assets/dewberry/nature/pine_tree_3.png',
    nat_dew_1: 'assets/dewberry/nature/dewberry_bush_1.png',
    nat_dew_2: 'assets/dewberry/nature/dewberry_bush_2.png',
    nat_dew_3: 'assets/dewberry/nature/dewberry_bush_3.png',
    nat_lily: 'assets/dewberry/nature/lily_pads.png',
    nat_cattails: 'assets/dewberry/nature/cattails.png',
    nat_cabin: 'assets/dewberry/nature/cabin.png',
    nat_campfire: 'assets/dewberry/nature/campfire.png',
    nat_log_seat_1: 'assets/dewberry/nature/log_seat_1.png',
    nat_log_seat_2: 'assets/dewberry/nature/log_seat_2.png',
    nat_woodpile: 'assets/dewberry/nature/woodpile.png',
    nat_boulder_l: 'assets/dewberry/nature/boulder_large.png',
    nat_boulder_m: 'assets/dewberry/nature/boulder_medium.png',
    nat_boulder_s: 'assets/dewberry/nature/boulder_small.png',
    nat_berry_basket: 'assets/dewberry/nature/berry_basket.png',
    nat_mushroom: 'assets/dewberry/nature/mushroom_cluster.png',
    nat_fallen_log: 'assets/dewberry/nature/fallen_log.png',
    nat_sign: 'assets/dewberry/decorations/sign.png',
    nat_bush_1: 'assets/dewberry/decorations/bush_1.png',
    nat_bush_2: 'assets/dewberry/decorations/bush_2.png',
    nat_flowers_1: 'assets/dewberry/decorations/flowers_1.png',
    nat_flowers_2: 'assets/dewberry/decorations/flowers_2.png',
    nat_flowers_3: 'assets/dewberry/decorations/flowers_3.png',
  };
  for (const [key, path] of Object.entries(natAssets)) this.load.image(key, path);

  const intAssets = [
    'desk_student', 'chair_wooden', 'blackboard', 'podium_teacher', 'desk_teacher',
    'bookshelf_tall', 'bookshelf_wide', 'reading_table', 'globe',
    'table_round', 'table_long', 'chair_cushioned', 'sofa', 'potted_plant_indoor',
    'rug_ornate', 'counter_shop', 'cabinet_medicine', 'bed_single', 'bed_hospital',
    'stove_kitchen', 'barrel', 'crate_wooden', 'fireplace', 'piano', 'pulpit', 'pew_church', 'altar',
    'coffee_machine', 'pastry_display', 'cafe_menu_board', 'coffee_cups',
    'cafe_table_set', 'sink_kitchen', 'shelf_bottles',
    'market_shelf', 'produce_basket', 'cash_register',
    'workbench', 'tool_rack',
    'hay_bale', 'water_trough', 'pitchfork_rack', 'sack_grain', 'milk_pail',
  ];
  intAssets.forEach(name => this.load.image('int_' + name, `assets/dewberry/interiors/${name}.png`));
  this.load.image('int_potted_plant', 'assets/dewberry/interiors/potted_plant_indoor.png');

  const decoAssets = [
    'garden_plot', 'garden_arch', 'watering_can', 'scarecrow',
    'pond_water', 'duck', 'picnic_blanket',
    'swing_set', 'picnic_table', 'gazebo',
    'bench_1', 'bench_2', 'flowers_1', 'flowers_2', 'flowers_3',
    'fountain', 'bush_1', 'bush_2', 'lamp_1',
  ];
  decoAssets.forEach(name => this.load.image('ext_' + name, `assets/dewberry/decorations/${name}.png`));
  const natDecoAssets = ['lily_pads', 'boulder_small', 'log_seat_1'];
  natDecoAssets.forEach(name => this.load.image('ext_' + name, `assets/dewberry/nature/${name}.png`));
}

function create() {
  scene = this;

  const terrainGrid = buildTerrainGrid();
  renderTerrain(scene, terrainGrid);
  renderBuildings(scene);
  renderFurniture(scene);
  renderTownDecorations(scene);
  placeDecorations(scene, terrainGrid);
  renderHomes(scene);
  drawLocationLabels(scene);

  collisionGrid = buildCollisionGrid(terrainGrid);

  createAnimations(scene);
  buildAgentContainers(scene);

  const cam = scene.cameras.main;
  cam.setBounds(0, 0, MAP_PX_W, MAP_PX_H);
  cam.setZoom(DEFAULT_ZOOM);
  // Start centered on the town
  cam.setScroll(MAP_PX_W / 2 - VIEW_W / 2, MAP_PX_H / 2 - VIEW_H / 2);

  loadBgData();
}

function update() {
  // Slow camera drift for background ambiance
  if (scene) {
    const cam = scene.cameras.main;
    const t = Date.now() * 0.00008;
    const driftX = Math.sin(t) * 0.3;
    const driftY = Math.cos(t * 0.7) * 0.2;
    cam.setScroll(
      cam.scrollX + driftX,
      cam.scrollY + driftY
    );
  }
}

// ─── Data loading ─────────────────────────────────────────────

function loadBgData() {
  Promise.all([
    fetch('/town/agents/agents.json').then(r => r.json()),
    fetch('/town/bg_decisions.json').then(r => r.json()),
  ])
  .then(([agents, rawDecisions]) => {
    agents.forEach(a => { agentsInfo[a.agent_id] = a; });

    // Convert string keys to integer keys
    for (const [levelIdx, agentMap] of Object.entries(rawDecisions)) {
      const li = parseInt(levelIdx);
      agentDecisions[li] = {};
      for (const [agentId, decision] of Object.entries(agentMap)) {
        agentDecisions[li][parseInt(agentId)] = decision;
      }
    }

    initBg();
  })
  .catch(err => {
    console.warn('Town background: failed to load data', err);
  });
}

// ─── Background init ──────────────────────────────────────────

function initBg() {
  placeAgentsAtHome();
  currentStep    = 0;
  currentSubStep = 0;
  startPlay();
}

function placeAgentsAtHome() {
  for (let id = 0; id < agentContainers.length; id++) {
    const homePos = getHomePosT(id);
    agentContainers[id].x = homePos.x;
    agentContainers[id].y = homePos.y;
    agentLocKey[id]  = 'home';
    agentDestPos[id] = homePos;
    agentSettled[id] = true;
    agentSprites[id].anims.play(`${agentCharNames[id]}_down`, false);
    agentContainers[id].setVisible(false);
    setHomeLit(id, true);

    const decision = agentDecisions[currentStep]?.[id] ?? 'no';
    updateDecisionBadge(id, decision);
    updateDecisionGlow(id, decision);
    updateNameLabelColor(id, decision);

    const info = agentsInfo[id];
    if (info && agentNameLabels[id]) {
      agentNameLabels[id].setText(info.name);
      agentInitials[id] = info.name.slice(0, 2).toUpperCase();
    }
  }
}

// ─── Step navigation ──────────────────────────────────────────

function goToStep(step, subStep, animate) {
  currentStep    = Math.max(0, Math.min(step, maxStep));
  currentSubStep = Math.max(0, Math.min(subStep || 0, 1));
  if (animate === 'home') {
    killAgentTweens();
    placeAgentsAtHome();
  } else {
    moveAgents(animate !== false);
  }
}

function updateInfoDisplay() {
  // No-op in background mode — no DOM to update
}

function stepBy(delta) {
  let newSub  = currentSubStep + delta;
  let newStep = currentStep;
  if (newSub < 0) { newStep = Math.max(0, newStep - 1); newSub = 1; }
  else if (newSub > 1) { newStep = Math.min(maxStep, newStep + 1); newSub = 0; }
  goToStep(newStep, newSub, true);
}

// ─── Playback ─────────────────────────────────────────────────

function togglePlay() { isPlaying ? pausePlay() : startPlay(); }

function startPlay() {
  isPlaying = true;
  scheduleNextSubStep();
}

function pausePlay() {
  isPlaying = false;
  if (playTimer) { clearTimeout(playTimer); playTimer = null; }
  killAgentTweens();
}

function scheduleNextSubStep() {
  if (!isPlaying) return;
  moveAgents(true);
  const subStepMs = Math.max(200, Math.round(10000 / playSpeed));
  const holdMs    = Math.max(30,  Math.round(2000  / playSpeed));
  playTimer = setTimeout(() => { if (isPlaying) advanceSubStep(); }, subStepMs + holdMs);
}

function advanceSubStep() {
  if (currentSubStep < 1) {
    currentSubStep++;
    scheduleNextSubStep();
  } else if (currentStep < maxStep) {
    currentStep++;
    currentSubStep = 0;
    scheduleNextSubStep();
  } else {
    // Loop back to start
    currentStep    = 0;
    currentSubStep = 0;
    goToStep(0, 0, 'home');
    setTimeout(() => { if (isPlaying) scheduleNextSubStep(); }, 1500);
  }
}
