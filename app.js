const STORAGE_KEY = "dnd-command-sheet.v1";
const STORAGE_KEY_V2 = "dnd-command-sheet.v2";
const SECURE_STORAGE_KEY = "dnd-command-sheet.secure.v1";
const SESSION_STORAGE_KEY = "dnd-command-sheet.session.v1";
const PLAINTEXT_STORAGE_KEY = "dnd-command-sheet.plain.v1";
const INSTALL_NOTE_KEY = "dnd-command-sheet.install-note.dismissed";
const ONBOARDING_KEY = "dnd-command-sheet.onboarding.dismissed";
const SECURITY_ITERATIONS = 250000;
const MAX_FORMULA_LENGTH = 60;
const MAX_FORMULA_TERMS = 20;
const MAX_DICE_COUNT = 200;
const MAX_DIE_SIDES = 1000;
const MAX_FLAT_BONUS = 100000;
const MAX_PORTRAIT_FILE_BYTES = 2 * 1024 * 1024;

const ABILITIES = [
  { key: "strength", label: "Strength", short: "STR" },
  { key: "dexterity", label: "Dexterity", short: "DEX" },
  { key: "constitution", label: "Constitution", short: "CON" },
  { key: "intelligence", label: "Intelligence", short: "INT" },
  { key: "wisdom", label: "Wisdom", short: "WIS" },
  { key: "charisma", label: "Charisma", short: "CHA" },
];

const SKILLS = [
  { key: "acrobatics", label: "Acrobatics", ability: "dexterity" },
  { key: "animalHandling", label: "Animal Handling", ability: "wisdom" },
  { key: "arcana", label: "Arcana", ability: "intelligence" },
  { key: "athletics", label: "Athletics", ability: "strength" },
  { key: "deception", label: "Deception", ability: "charisma" },
  { key: "history", label: "History", ability: "intelligence" },
  { key: "insight", label: "Insight", ability: "wisdom" },
  { key: "intimidation", label: "Intimidation", ability: "charisma" },
  { key: "investigation", label: "Investigation", ability: "intelligence" },
  { key: "medicine", label: "Medicine", ability: "wisdom" },
  { key: "nature", label: "Nature", ability: "intelligence" },
  { key: "perception", label: "Perception", ability: "wisdom" },
  { key: "performance", label: "Performance", ability: "charisma" },
  { key: "persuasion", label: "Persuasion", ability: "charisma" },
  { key: "religion", label: "Religion", ability: "intelligence" },
  { key: "sleightOfHand", label: "Sleight of Hand", ability: "dexterity" },
  { key: "stealth", label: "Stealth", ability: "dexterity" },
  { key: "survival", label: "Survival", ability: "wisdom" },
];

const PROFICIENCY_LEVELS = [
  { value: 0, label: "None" },
  { value: 1, label: "Proficient" },
  { value: 2, label: "Expertise" },
];

const SECTION_LABELS = [
  { key: "basics", label: "Basics" },
  { key: "abilities", label: "Abilities" },
  { key: "combat", label: "Combat" },
  { key: "skills", label: "Skills" },
  { key: "attacks", label: "Attacks" },
  { key: "spells", label: "Spells" },
  { key: "inventory", label: "Inventory" },
  { key: "personality", label: "Roleplay" },
  { key: "proficiencies", label: "Proficiencies" },
  { key: "features", label: "Features" },
  { key: "rolls", label: "Roller" },
];

const THEME_PRESETS = {
  parchment: {
    label: "Parchment Court",
    accentColor: "#7d2d38",
    panelColor: "#f4ecdb",
    bg: "#dfd4bf",
    bgDeep: "#c7b79c",
    ink: "#201915",
    muted: "#6d6358",
  },
  moonlit: {
    label: "Moonlit Archive",
    accentColor: "#577fa1",
    panelColor: "#ebf1f7",
    bg: "#1f2a37",
    bgDeep: "#0f1824",
    ink: "#1f2933",
    muted: "#627486",
  },
  verdant: {
    label: "Verdant Lodge",
    accentColor: "#37664b",
    panelColor: "#edf3e7",
    bg: "#cdd7c4",
    bgDeep: "#a3b393",
    ink: "#172018",
    muted: "#56655b",
  },
  ember: {
    label: "Ember Banner",
    accentColor: "#973f1f",
    panelColor: "#f7ebe1",
    bg: "#e1c3a7",
    bgDeep: "#bf9069",
    ink: "#25150f",
    muted: "#6f5546",
  },
};

const ENCUMBRANCE_OPTIONS = [
  { value: "variant", label: "Variant 5e" },
  { value: "simple", label: "Simple Capacity" },
  { value: "off", label: "Disabled" },
];

const HELP_TOOLTIPS = {
  "save-protection": "Locks your saved characters behind a passphrase so nobody else who uses this browser can read them. Without it, your data is saved but not locked.",
  "encumbrance-mode": "Variant 5e uses three weight tiers (encumbered, heavily, over-capacity). Simple Capacity just checks if you exceed your carry limit. Disabled turns off weight tracking entirely.",
  "proficiency-bonus": "Auto-calculated from your level: +2 at levels 1\u20134, going up to +6 at level 17+. You can override it in the Basics section if your DM uses custom values.",
  "short-rest": "Resets any custom resources you marked as per-short-rest. Does not change HP, spell slots, or death saves \u2014 adjust those yourself as your class rules allow.",
  "long-rest": "Restores HP to max, clears temp HP, resets death saves, restores all spell slots, recovers half your total hit dice (round down, min 1), and resets all custom resources.",
  "death-saves": "Click the dots to track successes and failures. Three successes = stabilized, three failures = death. Long Rest resets both rows.",
  "spell-attack": "Your spell attack roll bonus. Calculated from: your spellcasting ability modifier + proficiency bonus + any extra spell attack bonus you entered above.",
  "spell-save-dc": "The DC enemies roll against for your spells. Calculated from: 8 + your spellcasting ability modifier + proficiency bonus + any extra DC bonus you entered above.",
  "hit-dice": "Your hit dice pool (e.g. 5d10 for a level 5 Fighter). Track how many you have used. Short rests let you spend hit dice to heal; Long Rest recovers half of them.",
  "custom-resources": "Track class features with limited uses like Ki Points, Rage, Channel Divinity, or Bardic Inspiration. Set a max and mark how many you have used. Rests reset them automatically.",
  "spellcasting-ability": "The ability score your class uses for spellcasting (e.g. Wisdom for Clerics, Charisma for Sorcerers). This drives your Spell Attack and Spell Save DC calculations.",
  "global-attack-mod": "A bonus added to all attack rolls \u2014 useful for effects like Bless, magic items, or other situational bonuses that apply to every attack.",
};

const HELP_FAQ = [
  { q: "Where is my data stored?", a: "Everything is saved inside your browser on this device \u2014 nothing is sent to the internet. If you clear your browser\u2019s saved data, your characters will be lost, so always keep a backup." },
  { q: "How do I back up my characters?", a: "Click Export JSON in the header to download a backup file. To restore it, click Import JSON and pick that file. This also lets you move characters between devices." },
  { q: "What happens if I clear my browser?", a: "All character data is erased. Always export a backup before clearing your browser data or switching to a new browser." },
  { q: "What auto-calculates and what do I enter?", a: "You enter ability scores, level, and class details. The sheet auto-calculates: ability modifiers, proficiency bonus, saving throw totals, skill bonuses, spell attack, spell save DC, passive perception, and encumbrance. Combat stats like AC, HP, and speed are entered manually since they depend on your equipment and class features." },
  { q: "How do Short and Long Rest work?", a: "Short Rest resets custom resources you marked as per-short-rest. Long Rest fully heals you, restores spell slots, resets death saves, recovers half your hit dice, and resets all custom resources. Adjust anything else manually as your class allows." },
  { q: "Can multiple people use this?", a: "Yes! Each person can use their own browser or device. You can also manage multiple characters in one browser using Character Slots in the header." },
  { q: "How does the passphrase protection work?", a: "Setting a passphrase scrambles your saved data so nobody else using this browser can read it. You will need to enter the passphrase each time you open the app. The passphrase itself is never saved anywhere." },
  { q: "Can I install this on my phone?", a: "Yes! On iPhone, tap Share then Add to Home Screen. On Android, tap the browser menu and select Install App or Add to Home Screen. Once installed, it works without internet." },
  { q: "How do dice rolls work?", a: "Use the Roller section at the bottom of the page. Type a formula like 2d6+3 or tap the quick-roll buttons (d20, d8, etc.). You can also click any Check, Save, or Attack button to auto-roll with that character\u2019s modifier." },
];

const ONBOARDING_STEPS = [
  { title: "Welcome to DnD Command Sheet", body: "A private character sheet that lives entirely in your browser. No accounts, no sign-ups, no servers \u2014 your data stays on your device and works even without internet." },
  { title: "What It Does For You", body: "Auto-calculates modifiers, saving throws, skill bonuses, and spell DCs \u2022 Tracks multiple characters with separate slots \u2022 Handles Short & Long Rest resets automatically \u2022 Built-in dice roller for checks, saves, and attacks \u2022 Customizable themes and layout \u2022 Optional passphrase lock for privacy \u2022 Works offline on your phone" },
  { title: "Managing Characters", body: "Use Character Slot in the header to switch between characters. Duplicate, rename, or delete from the Customize panel. Always use Export JSON to save a backup file you can restore later with Import JSON." },
  { title: "Getting Started", body: "Fill in your character\u2019s name, class, and level in the Basics section. Set your six ability scores and everything else auto-calculates. Look for the ? icons throughout the sheet for tips on specific features." },
];

const PROFICIENCY_TYPES = ["Armor", "Weapon", "Tool", "Language", "Other"];
const SPELL_LEVEL_OPTIONS = Array.from({ length: 10 }, (_, index) => index);
const SPELL_SLOT_LEVELS = Array.from({ length: 9 }, (_, index) => index + 1);

const dom = {};
let securityState = {
  mode: "plain",
  panelMode: null,
  passphrase: "",
};
let saveIndicatorTimer = null;
let appState = loadAppState();
let state = getCurrentProfileState();
let saveTimer = null;
let settingsOpen = false;
let settingsReturnFocus = null;
let helpOpen = false;
let helpReturnFocus = null;
let onboardingStep = 0;
let activeTooltip = null;
let deferredInstallPrompt = null;

init();

function init() {
  cacheDom();
  populateStaticSelects();
  bindEvents();
  renderAll();
  renderSecurityUi();
  setupPwa();
  renderHelpPanel();
  checkOnboarding();
}

function cacheDom() {
  dom.abilitiesGrid = document.getElementById("abilities-grid");
  dom.skillsList = document.getElementById("skills-list");
  dom.resourcesList = document.getElementById("resources-list");
  dom.attacksList = document.getElementById("attacks-list");
  dom.spellSlots = document.getElementById("spell-slots");
  dom.spellsList = document.getElementById("spells-list");
  dom.inventoryList = document.getElementById("inventory-list");
  dom.customChecksList = document.getElementById("custom-checks-list");
  dom.proficienciesList = document.getElementById("proficiencies-list");
  dom.featuresList = document.getElementById("features-list");
  dom.deathSuccesses = document.getElementById("death-successes");
  dom.deathFailures = document.getElementById("death-failures");
  dom.featureFilter = document.getElementById("feature-filter");
  dom.rollFormula = document.getElementById("roll-formula");
  dom.rollLog = document.getElementById("roll-log");
  dom.settingsDrawer = document.getElementById("settings-drawer");
  dom.heroBackdrop = document.getElementById("hero-backdrop");
  dom.importFile = document.getElementById("import-file");
  dom.portraitFile = document.getElementById("portrait-file");
  dom.sectionToggles = document.getElementById("section-toggles");
  dom.installApp = document.getElementById("install-app");
  dom.installNote = document.getElementById("install-note");
  dom.installNoteTitle = document.getElementById("install-note-title");
  dom.installNoteBody = document.getElementById("install-note-body");
  dom.profileSelect = document.getElementById("profile-select");
  dom.securityNote = document.getElementById("security-note");
  dom.securityNoteTitle = document.getElementById("security-note-title");
  dom.securityNoteBody = document.getElementById("security-note-body");
  dom.securityPassphrase = document.getElementById("security-passphrase");
  dom.securityPassphraseConfirm = document.getElementById("security-passphrase-confirm");
  dom.securityPassphraseLabel = document.getElementById("security-passphrase-label");
  dom.securityConfirmLabel = document.getElementById("security-confirm-label");
  dom.securityPrimary = document.getElementById("security-primary");
  dom.securitySecondary = document.getElementById("security-secondary");
  dom.securitySettingsStatus = document.getElementById("security-settings-status");
  dom.manageSecurity = document.getElementById("manage-security");
  dom.lockApp = document.getElementById("lock-app");
  dom.helpDrawer = document.getElementById("help-drawer");
  dom.helpFaqList = document.getElementById("help-faq-list");
  dom.helpFab = document.getElementById("help-fab");
  dom.onboardingOverlay = document.getElementById("onboarding-overlay");
  dom.onboardingModal = document.getElementById("onboarding-modal");
  dom.onboardingContent = document.getElementById("onboarding-content");
  dom.onboardingDots = document.getElementById("onboarding-dots");
  dom.onboardingNext = document.getElementById("onboarding-next");
  dom.onboardingBack = document.getElementById("onboarding-back");
  dom.saveIndicator = document.getElementById("save-indicator");
  dom.appModalOverlay = document.getElementById("app-modal-overlay");
  dom.appModal = document.getElementById("app-modal");
  dom.appModalTitle = document.getElementById("app-modal-title");
  dom.appModalMessage = document.getElementById("app-modal-message");
  dom.appModalInput = document.getElementById("app-modal-input");
  dom.appModalCancel = document.getElementById("app-modal-cancel");
  dom.appModalConfirm = document.getElementById("app-modal-confirm");
}

function populateStaticSelects() {
  const spellAbility = document.getElementById("spellcasting-ability");
  const themePreset = document.getElementById("theme-preset");
  const encumbranceMode = document.getElementById("encumbrance-mode");

  spellAbility.innerHTML = ABILITIES.map(
    (ability) =>
      `<option value="${ability.key}">${escapeHtml(ability.label)}</option>`
  ).join("");

  themePreset.innerHTML = [
    ...Object.entries(THEME_PRESETS).map(
      ([key, preset]) =>
        `<option value="${key}">${escapeHtml(preset.label)}</option>`
    ),
    `<option value="custom">Custom Mix</option>`,
  ].join("");

  encumbranceMode.innerHTML = ENCUMBRANCE_OPTIONS.map(
    (option) =>
      `<option value="${option.value}">${escapeHtml(option.label)}</option>`
  ).join("");
}

function bindEvents() {
  document.addEventListener("input", handleInputEvent);
  document.addEventListener("change", handleInputEvent);
  document.addEventListener("click", handleClickEvent);

  dom.featureFilter.addEventListener("input", (event) => {
    state.ui.featureFilter = event.target.value;
    renderFeatures();
    scheduleSave();
  });

  dom.importFile.addEventListener("change", importFromFile);
  dom.portraitFile.addEventListener("change", importPortrait);

  dom.rollFormula.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      rollFromFormulaInput();
    }
  });

  dom.profileSelect.addEventListener("change", (event) => {
    switchProfile(event.target.value);
  });

  dom.securityPassphrase.addEventListener("keydown", handleSecurityKeydown);
  dom.securityPassphraseConfirm.addEventListener("keydown", handleSecurityKeydown);

  document.addEventListener("focusin", (event) => {
    const trigger = event.target.closest("[data-tooltip]");
    if (trigger) toggleTooltip(trigger);
  });
  document.addEventListener("focusout", (event) => {
    if (event.target.closest("[data-tooltip]")) dismissActiveTooltip();
  });
  document.addEventListener("pointerenter", (event) => {
    const trigger = event.target.closest("[data-tooltip]");
    if (trigger && window.matchMedia("(hover: hover)").matches) toggleTooltip(trigger);
  }, true);
  document.addEventListener("pointerleave", (event) => {
    if (event.target.closest("[data-tooltip]") && window.matchMedia("(hover: hover)").matches) dismissActiveTooltip();
  }, true);

  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    dismissActiveTooltip();
    if (!dom.appModal.classList.contains("is-hidden")) {
      dom.appModalCancel.click();
      return;
    }
    if (!dom.onboardingModal.classList.contains("is-hidden")) {
      dismissOnboarding();
      return;
    }
    if (helpOpen) {
      toggleHelp(false);
      return;
    }
    if (settingsOpen) {
      toggleSettings(false);
    }
  });
}

function handleInputEvent(event) {
  const boundField = event.target.closest("[data-path]");
  if (boundField) {
    const path = boundField.dataset.path;
    const value = readInputValue(boundField);
    setPath(state, path, value);

    if (path === "basics.name" && String(value).trim()) {
      getCurrentProfile().name = String(value).trim();
      renderProfileSelect();
    }

    if (path === "ui.themePreset") {
      applyThemePreset(value);
      syncBoundInputs();
    }

    if (path === "ui.accentColor" || path === "ui.panelColor") {
      state.ui.themePreset = "custom";
      syncBoundInputs();
    }

    applyTheme();
    updateDisplays();
    scheduleSave();
    return;
  }

  const skillField = event.target.closest("[data-skill]");
  if (skillField) {
    const skillKey = skillField.dataset.skill;
    const field = skillField.dataset.field;
    state.skills[skillKey][field] = readInputValue(skillField);
    updateDisplays();
    scheduleSave();
    return;
  }

  const collectionField = event.target.closest("[data-collection]");
  if (collectionField) {
    updateCollectionField(
      collectionField.dataset.collection,
      collectionField.dataset.id,
      collectionField.dataset.field,
      readInputValue(collectionField)
    );

    if (collectionField.dataset.collection === "spells.slots") {
      renderSpellSlots();
    }

    updateDisplays();
    scheduleSave();
    return;
  }

  const sectionToggle = event.target.closest("[data-section-toggle]");
  if (sectionToggle) {
    state.ui.sections[sectionToggle.dataset.sectionToggle] = sectionToggle.checked;
    syncSectionVisibility();
    scheduleSave();
  }
}

function handleClickEvent(event) {
  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    addCollectionItem(addButton.dataset.add);
    return;
  }

  const removeButton = event.target.closest("[data-remove]");
  if (removeButton) {
    removeCollectionItem(removeButton.dataset.remove, removeButton.dataset.id);
    return;
  }

  const dot = event.target.closest("[data-death-type]");
  if (dot) {
    toggleDeathSave(dot.dataset.deathType, Number(dot.dataset.index));
    return;
  }

  const slotOrb = event.target.closest("[data-slot-level]");
  if (slotOrb) {
    toggleSpellSlot(Number(slotOrb.dataset.slotLevel), Number(slotOrb.dataset.slotIndex));
    return;
  }

  if (event.target.closest("#toggle-settings")) {
    toggleSettings(true);
    return;
  }

  if (event.target.closest("#close-settings")) {
    toggleSettings(false);
    return;
  }

  if (event.target.closest("#short-rest")) {
    applyShortRest();
    return;
  }

  if (event.target.closest("#long-rest")) {
    applyLongRest();
    return;
  }

  if (event.target.closest("#load-demo")) {
    showConfirmModal("Load Demo", "Replace the current character with the Theron demo sheet?").then((ok) => {
      if (ok) replaceCurrentProfile(buildDemoState());
    });
    return;
  }

  if (event.target.closest("#export-sheet")) {
    exportSheet();
    return;
  }

  if (event.target.closest("#import-sheet")) {
    dom.importFile.click();
    return;
  }

  if (event.target.closest("#print-sheet")) {
    window.print();
    return;
  }

  if (event.target.closest("#roll-submit")) {
    rollFromFormulaInput();
    return;
  }

  if (event.target.closest("#save-portrait")) {
    dom.portraitFile.click();
    return;
  }

  if (event.target.closest("#save-portrait-inline")) {
    dom.portraitFile.click();
    return;
  }

  if (event.target.closest("#clear-sheet")) {
    showConfirmModal("Reset Sheet", "Reset to a blank character? This cannot be undone.").then((ok) => {
      if (ok) replaceCurrentProfile(createDefaultState());
    });
    return;
  }

  if (event.target.closest("#new-profile")) {
    createProfile();
    return;
  }

  if (event.target.closest("#duplicate-profile")) {
    duplicateCurrentProfile();
    return;
  }

  if (event.target.closest("#delete-profile")) {
    deleteCurrentProfile();
    return;
  }

  if (event.target.closest("#rename-profile")) {
    renameCurrentProfile();
    return;
  }

  if (event.target.closest("#manage-security")) {
    openSecurityPanel(securityState.mode === "unlocked" ? "change" : "setup");
    return;
  }

  if (event.target.closest("#lock-app")) {
    lockProtectedSaves();
    return;
  }

  if (event.target.closest("#security-primary")) {
    handleSecurityPrimaryAction();
    return;
  }

  if (event.target.closest("#security-secondary")) {
    handleSecuritySecondaryAction();
    return;
  }

  if (event.target.closest("#install-app")) {
    triggerInstallPrompt();
    return;
  }

  if (event.target.closest("#dismiss-install-note")) {
    dismissInstallNote();
    return;
  }

  if (event.target.closest("#help-fab")) {
    toggleHelp(true);
    return;
  }

  if (event.target.closest("#close-help")) {
    toggleHelp(false);
    return;
  }

  if (event.target.closest("#replay-onboarding")) {
    toggleHelp(false);
    showOnboarding();
    return;
  }

  if (event.target.closest("#onboarding-next")) {
    advanceOnboarding();
    return;
  }

  if (event.target.closest("#onboarding-back")) {
    retreatOnboarding();
    return;
  }

  if (event.target.closest("#onboarding-skip") || event.target.closest("#onboarding-overlay")) {
    dismissOnboarding();
    return;
  }

  const faqQuestion = event.target.closest(".faq-question");
  if (faqQuestion) {
    faqQuestion.closest(".faq-item").classList.toggle("open");
    return;
  }

  const tooltipTrigger = event.target.closest("[data-tooltip]");
  if (tooltipTrigger) {
    toggleTooltip(tooltipTrigger);
    return;
  }

  if (event.target.closest("#clear-roll-log")) {
    state.rollLog = [];
    renderRollLog();
    scheduleSave();
    return;
  }

  if (event.target.closest("#export-all")) {
    exportAll();
    return;
  }

  if (event.target.closest("#clear-feature-filter")) {
    state.ui.featureFilter = "";
    dom.featureFilter.value = "";
    renderFeatures();
    scheduleSave();
    return;
  }

  const resourceAdjust = event.target.closest("[data-resource-adjust]");
  if (resourceAdjust) {
    const id = resourceAdjust.dataset.resourceAdjust;
    const delta = Number(resourceAdjust.dataset.delta);
    const resource = findCollectionItem("resources", id);
    if (resource) {
      resource.current = clamp(numberValue(resource.current) + delta, 0, numberValue(resource.max));
      renderResources();
      updateDisplays();
      scheduleSave();
    }
    return;
  }

  const damageRoll = event.target.closest("[data-roll-damage]");
  if (damageRoll) {
    const entry = findCollectionItem("attacks", damageRoll.dataset.rollDamage);
    if (entry && /^\d*d\d+/.test(entry.damage.trim())) {
      const dmgFormula = entry.damage.trim().split(/\s+/)[0];
      performRoll(dmgFormula, (entry.name || "Attack") + " Damage");
    } else {
      showAlertModal("No Damage Formula", "Enter a dice formula in the Damage field (e.g. 1d8+3).");
    }
    return;
  }

  if (activeTooltip && !event.target.closest(".tooltip-bubble")) {
    dismissActiveTooltip();
  }

  const quickRoll = event.target.closest("[data-roll]");
  if (quickRoll) {
    const formula = quickRoll.dataset.roll;
    dom.rollFormula.value = formula;
    performRoll(formula, `Quick Roll ${formula}`);
    return;
  }

  const abilityRoll = event.target.closest("[data-roll-kind]");
  if (abilityRoll) {
    const key = abilityRoll.dataset.key;
    const kind = abilityRoll.dataset.rollKind;
    if (kind === "ability") {
      const modifier = getAbilityModifier(key);
      performRoll(buildD20Formula(modifier), `${getAbilityLabel(key)} Check`);
    }
    if (kind === "save") {
      const modifier = getSavingThrowTotal(key);
      performRoll(buildD20Formula(modifier), `${getAbilityLabel(key)} Save`);
    }
    return;
  }

  const skillRoll = event.target.closest("[data-roll-skill]");
  if (skillRoll) {
    const skill = getSkillDefinition(skillRoll.dataset.rollSkill);
    if (!skill) return;
    performRoll(
      buildD20Formula(getSkillTotal(skill.key)),
      `${skill.label} (${getAbilityLabel(skill.ability)})`
    );
    return;
  }

  const checkRoll = event.target.closest("[data-roll-check]");
  if (checkRoll) {
    const entry = findCollectionItem("customChecks", checkRoll.dataset.rollCheck);
    if (!entry) {
      return;
    }
    performRoll(
      buildD20Formula(getCustomCheckTotal(entry)),
      entry.name || "Custom Check"
    );
    return;
  }

  const attackRoll = event.target.closest("[data-roll-attack]");
  if (attackRoll) {
    const entry = findCollectionItem("attacks", attackRoll.dataset.rollAttack);
    if (!entry) {
      return;
    }
    performRoll(
      buildD20Formula(getAttackTotal(entry)),
      entry.name || "Attack"
    );
  }
}

function renderAll() {
  renderProfileSelect();
  renderAbilityCards();
  renderSkills();
  renderResources();
  renderAttacks();
  renderSpellSlots();
  renderSpells();
  renderInventory();
  renderCustomChecks();
  renderProficiencies();
  renderFeatures();
  renderDeathSaves();
  renderSectionToggles();
  syncBoundInputs();
  syncSectionVisibility();
  applyTheme();
  updateDisplays();
  renderSecurityUi();
}

function renderAbilityCards() {
  dom.abilitiesGrid.innerHTML = ABILITIES.map((ability) => {
    const current = state.abilities[ability.key];
    return `
      <article class="ability-card">
        <div class="ability-score">
          <small>${escapeHtml(ability.short)}</small>
          <strong data-ability-score="${ability.key}">${escapeHtml(String(current.score))}</strong>
          <small>Score</small>
        </div>
        <div class="ability-meta">
          <div class="ability-header">
            <h3>${escapeHtml(ability.label)}</h3>
            <span class="mod" data-ability-mod="${ability.key}">${displaySigned(
              getAbilityModifier(ability.key)
            )}</span>
          </div>
          <div class="ability-controls">
            <label>
              <span>Score</span>
              <input type="number" min="1" max="30" data-path="abilities.${ability.key}.score" />
            </label>
            <label>
              <span>Save Training</span>
              <select data-path="abilities.${ability.key}.saveProf">
                ${buildOptions(PROFICIENCY_LEVELS, current.saveProf)}
              </select>
            </label>
            <label>
              <span>Save Bonus</span>
              <input type="number" data-path="abilities.${ability.key}.saveBonus" />
            </label>
          </div>
          <div class="inline-actions">
            <button type="button" class="btn subtle" data-roll-kind="ability" data-key="${ability.key}">
              Check
            </button>
            <button type="button" class="btn subtle" data-roll-kind="save" data-key="${ability.key}">
              Save <span data-save-total="${ability.key}">${displaySigned(
                getSavingThrowTotal(ability.key)
              )}</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderSkills() {
  dom.skillsList.innerHTML = SKILLS.map((skill) => {
    const current = state.skills[skill.key];
    return `
      <div class="list-row skill-row">
        <div class="row-meta">
          <span>${escapeHtml(getAbilityLabel(skill.ability))}</span>
          <strong>${escapeHtml(skill.label)}</strong>
        </div>
        <label>
          <span>Training</span>
          <select data-skill="${skill.key}" data-field="prof">
            ${buildOptions(PROFICIENCY_LEVELS, current.prof)}
          </select>
        </label>
        <label>
          <span>Misc</span>
          <input type="number" data-skill="${skill.key}" data-field="bonus" value="${escapeHtml(
            String(current.bonus)
          )}" />
        </label>
        <div class="row-meta">
          <span>Total</span>
          <strong class="roll-badge" data-skill-total="${skill.key}">${displaySigned(
            getSkillTotal(skill.key)
          )}</strong>
        </div>
        <button type="button" class="btn subtle" data-roll-skill="${skill.key}">Roll</button>
      </div>
    `;
  }).join("");
}

function renderResources() {
  dom.resourcesList.innerHTML = getCollection("resources")
    .map(
      (resource) => `
        <div class="resource-card">
          <label>
            <span>Name</span>
            <input
              type="text"
              data-collection="resources"
              data-id="${resource.id}"
              data-field="name"
              value="${escapeHtml(resource.name)}"
            />
          </label>
          <label>
            <span>Current</span>
            <div class="resource-adjust">
              <button type="button" class="btn subtle resource-btn" data-resource-adjust="${resource.id}" data-delta="-1">&minus;</button>
              <input
                type="number"
                data-collection="resources"
                data-id="${resource.id}"
                data-field="current"
                value="${escapeHtml(String(resource.current))}"
              />
              <button type="button" class="btn subtle resource-btn" data-resource-adjust="${resource.id}" data-delta="1">+</button>
            </div>
          </label>
          <label>
            <span>Max</span>
            <input
              type="number"
              data-collection="resources"
              data-id="${resource.id}"
              data-field="max"
              value="${escapeHtml(String(resource.max))}"
            />
          </label>
          <label>
            <span>Reset</span>
            <select data-collection="resources" data-id="${resource.id}" data-field="resetOn">
              ${buildOptions(
                [
                  { value: "manual", label: "Manual" },
                  { value: "short", label: "Short Rest" },
                  { value: "long", label: "Long Rest" },
                ],
                resource.resetOn
              )}
            </select>
          </label>
          <button type="button" class="btn subtle" data-remove="resources" data-id="${resource.id}">
            Remove
          </button>
        </div>
      `
    )
    .join("");
}

function renderAttacks() {
  dom.attacksList.innerHTML = getCollection("attacks")
    .map(
      (attack) => `
        <div class="list-row attack-row">
          <label>
            <span>Name</span>
            <input
              type="text"
              data-collection="attacks"
              data-id="${attack.id}"
              data-field="name"
              value="${escapeHtml(attack.name)}"
            />
          </label>
          <label>
            <span>Ability</span>
            <select
              data-collection="attacks"
              data-id="${attack.id}"
              data-field="ability"
            >
              ${buildOptions(
                [
                  { value: "strength", label: "Strength" },
                  { value: "dexterity", label: "Dexterity" },
                  { value: "constitution", label: "Constitution" },
                  { value: "intelligence", label: "Intelligence" },
                  { value: "wisdom", label: "Wisdom" },
                  { value: "charisma", label: "Charisma" },
                ],
                attack.ability
              )}
            </select>
          </label>
          <label>
            <span>Attack Bonus Extra</span>
            <input
              type="number"
              data-collection="attacks"
              data-id="${attack.id}"
              data-field="attackBonus"
              value="${escapeHtml(String(attack.attackBonus))}"
            />
          </label>
          <label>
            <span>Damage / Type</span>
            <input
              type="text"
              data-collection="attacks"
              data-id="${attack.id}"
              data-field="damage"
              value="${escapeHtml(attack.damage)}"
            />
          </label>
          <label>
            <span>Notes</span>
            <input
              type="text"
              data-collection="attacks"
              data-id="${attack.id}"
              data-field="notes"
              value="${escapeHtml(attack.notes)}"
            />
          </label>
          <label class="checkbox">
            <input
              type="checkbox"
              data-collection="attacks"
              data-id="${attack.id}"
              data-field="proficient"
              ${attack.proficient ? "checked" : ""}
            />
            <span>Add proficiency</span>
          </label>
          <button type="button" class="btn subtle" data-roll-attack="${attack.id}">
            Hit <span data-attack-total="${attack.id}">${displaySigned(getAttackTotal(attack))}</span>
          </button>
          <button type="button" class="btn subtle" data-roll-damage="${attack.id}">
            Dmg
          </button>
          <button type="button" class="btn subtle" data-remove="attacks" data-id="${attack.id}">
            Remove
          </button>
        </div>
      `
    )
    .join("");
}

function renderProfileSelect() {
  dom.profileSelect.innerHTML = appState.profiles
    .map(
      (profile) => `
        <option value="${profile.id}" ${profile.id === appState.currentProfileId ? "selected" : ""}>
          ${escapeHtml(profile.name)}
        </option>
      `
    )
    .join("");
}

function renderSecurityUi() {
  const status = getSecurityStatus();
  const showPanel = securityState.mode === "locked" || securityState.panelMode !== null;

  dom.securitySettingsStatus.textContent = status.settings;
  dom.lockApp.classList.toggle("is-hidden", securityState.mode !== "unlocked");
  dom.securityNote.classList.toggle("is-hidden", !showPanel);
  document.body.classList.toggle("storage-locked", securityState.mode === "locked");

  if (!showPanel) {
    return;
  }

  dom.securityNoteTitle.textContent = status.title;
  dom.securityNoteBody.textContent = status.body;
  dom.securityPassphraseLabel.classList.remove("is-hidden");
  dom.securityConfirmLabel.classList.toggle(
    "is-hidden",
    securityState.panelMode !== "setup" && securityState.panelMode !== "change"
  );
  dom.securitySecondary.classList.toggle(
    "is-hidden",
    securityState.panelMode === "unlock"
  );

  if (securityState.panelMode === "unlock") {
    dom.securityPrimary.textContent = "Unlock Saves";
    dom.securityConfirmLabel.classList.add("is-hidden");
    dom.securityPassphraseConfirm.value = "";
    dom.securityPassphrase.setAttribute("autocomplete", "current-password");
  } else if (securityState.panelMode === "change") {
    dom.securityPrimary.textContent = "Update Passphrase";
    dom.securitySecondary.textContent = "Cancel";
    dom.securityPassphrase.setAttribute("autocomplete", "new-password");
  } else {
    dom.securityPrimary.textContent = "Protect Saves";
    dom.securitySecondary.textContent = "Close";
    dom.securityConfirmLabel.classList.remove("is-hidden");
    dom.securityPassphrase.setAttribute("autocomplete", "new-password");
  }
}

function getSecurityStatus() {
  if (securityState.mode === "locked") {
    return {
      title: "Protected saves are locked",
      body: "Enter your passphrase to load saved characters. Without it, this app cannot read your saved data.",
      settings: "Protected saves are locked until you unlock them.",
    };
  }

  if (securityState.panelMode === "change") {
    return {
      title: "Change save passphrase",
      body: "Enter a new passphrase. Saved characters stay encrypted at rest in this browser.",
      settings: "Protected saves are active.",
    };
  }

  if (securityState.mode === "unlocked") {
    return {
      title: "Protected saves are active",
      body: "Your saved characters are encrypted in this browser. If you forget the passphrase, the data cannot be recovered.",
      settings: "Protected saves are active in this browser.",
    };
  }

  if (securityState.mode === "plain") {
    return {
      title: "Save protection",
      body: "Your characters are saved in this browser. For extra privacy on shared devices, set a passphrase.",
      settings: "Saved in this browser. Set a passphrase for extra privacy.",
    };
  }

  return {
    title: "Session-only storage",
    body: "Changes only last for this browser session. Set a passphrase to keep characters encrypted between visits.",
    settings: "Session-only until you set a passphrase.",
  };
}

function openSecurityPanel(mode = "setup") {
  securityState.panelMode = mode || "setup";
  renderSecurityUi();
  dom.securityPassphrase.focus();
}

function closeSecurityPanel() {
  if (securityState.mode === "locked") {
    return;
  }
  securityState.panelMode = null;
  clearSecurityInputs();
  renderSecurityUi();
}

function clearSecurityInputs() {
  dom.securityPassphrase.value = "";
  dom.securityPassphraseConfirm.value = "";
}

function handleSecurityKeydown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSecurityPrimaryAction();
  }
}

async function handleSecurityPrimaryAction() {
  if (securityState.panelMode === "unlock") {
    await unlockProtectedSaves();
    return;
  }

  if (securityState.panelMode === "change") {
    await changeSavePassphrase();
    return;
  }

  await enableSaveProtection();
}

function handleSecuritySecondaryAction() {
  if (securityState.panelMode === "change" || securityState.panelMode === "setup") {
    closeSecurityPanel();
  }
}

function renderSpellSlots() {
  dom.spellSlots.innerHTML = getCollection("spells.slots")
    .map((slot) => {
      const orbs =
        slot.max > 0
          ? Array.from({ length: slot.max }, (_, index) => {
              const used = index < slot.used ? "used" : "";
              return `
                <button
                  type="button"
                  class="slot-orb ${used}"
                  data-slot-level="${slot.level}"
                  data-slot-index="${index}"
                  aria-label="Toggle level ${slot.level} spell slot ${index + 1}"
                ></button>
              `;
            }).join("")
          : `<span class="label">No slots tracked</span>`;

      return `
        <article class="slot-card">
          <header>
            <div>
              <span class="label">Level ${slot.level}</span>
              <strong>${slot.used} used / ${slot.max} max</strong>
            </div>
          </header>
          <label>
            <span>Max Slots</span>
            <input
              type="number"
              min="0"
              data-collection="spells.slots"
              data-id="${slot.id}"
              data-field="max"
              value="${escapeHtml(String(slot.max))}"
            />
          </label>
          <div class="slot-orbs">${orbs}</div>
        </article>
      `;
    })
    .join("");
}

function renderSpells() {
  dom.spellsList.innerHTML = getCollection("spells.list")
    .map(
      (spell) => `
        <div class="list-row spell-row">
          <label>
            <span>Name</span>
            <input
              type="text"
              data-collection="spells.list"
              data-id="${spell.id}"
              data-field="name"
              value="${escapeHtml(spell.name)}"
            />
          </label>
          <label>
            <span>Level</span>
            <select data-collection="spells.list" data-id="${spell.id}" data-field="level">
              ${buildOptions(
                SPELL_LEVEL_OPTIONS.map((value) => ({
                  value,
                  label: value === 0 ? "Cantrip" : `Level ${value}`,
                })),
                spell.level
              )}
            </select>
          </label>
          <label>
            <span>School</span>
            <input
              type="text"
              data-collection="spells.list"
              data-id="${spell.id}"
              data-field="school"
              value="${escapeHtml(spell.school)}"
            />
          </label>
          <label class="checkbox">
            <input
              type="checkbox"
              data-collection="spells.list"
              data-id="${spell.id}"
              data-field="prepared"
              ${spell.prepared ? "checked" : ""}
            />
            <span>Prepared</span>
          </label>
          <label>
            <span>Notes</span>
            <input
              type="text"
              data-collection="spells.list"
              data-id="${spell.id}"
              data-field="notes"
              value="${escapeHtml(spell.notes)}"
            />
          </label>
          <button type="button" class="btn subtle" data-remove="spells.list" data-id="${spell.id}">
            Remove
          </button>
        </div>
      `
    )
    .join("");
}

function renderInventory() {
  dom.inventoryList.innerHTML = getCollection("inventory")
    .map(
      (item) => `
        <div class="list-row inventory-row">
          <label class="checkbox">
            <input
              type="checkbox"
              data-collection="inventory"
              data-id="${item.id}"
              data-field="carried"
              ${item.carried ? "checked" : ""}
            />
            <span>Carry</span>
          </label>
          <label>
            <span>Qty</span>
            <input
              type="number"
              min="0"
              data-collection="inventory"
              data-id="${item.id}"
              data-field="qty"
              value="${escapeHtml(String(item.qty))}"
            />
          </label>
          <label>
            <span>Item</span>
            <input
              type="text"
              data-collection="inventory"
              data-id="${item.id}"
              data-field="name"
              value="${escapeHtml(item.name)}"
            />
          </label>
          <label>
            <span>Weight Each</span>
            <input
              type="number"
              step="0.1"
              min="0"
              data-collection="inventory"
              data-id="${item.id}"
              data-field="weight"
              value="${escapeHtml(String(item.weight))}"
            />
          </label>
          <label>
            <span>Notes</span>
            <input
              type="text"
              data-collection="inventory"
              data-id="${item.id}"
              data-field="notes"
              value="${escapeHtml(item.notes)}"
            />
          </label>
          <button type="button" class="btn subtle" data-remove="inventory" data-id="${item.id}">
            Remove
          </button>
        </div>
      `
    )
    .join("");
}

function renderCustomChecks() {
  dom.customChecksList.innerHTML = getCollection("customChecks")
    .map(
      (check) => `
        <div class="list-row compact-row">
          <label>
            <span>Name</span>
            <input
              type="text"
              data-collection="customChecks"
              data-id="${check.id}"
              data-field="name"
              value="${escapeHtml(check.name)}"
            />
          </label>
          <label>
            <span>Ability</span>
            <select data-collection="customChecks" data-id="${check.id}" data-field="ability">
              ${buildOptions(
                ABILITIES.map((ability) => ({ value: ability.key, label: ability.label })),
                check.ability
              )}
            </select>
          </label>
          <label>
            <span>Training</span>
            <select data-collection="customChecks" data-id="${check.id}" data-field="prof">
              ${buildOptions(PROFICIENCY_LEVELS, check.prof)}
            </select>
          </label>
          <label>
            <span>Bonus</span>
            <input
              type="number"
              data-collection="customChecks"
              data-id="${check.id}"
              data-field="bonus"
              value="${escapeHtml(String(check.bonus))}"
            />
          </label>
          <div class="row-meta">
            <span>Total</span>
            <strong class="roll-badge" data-custom-total="${check.id}">${displaySigned(
              getCustomCheckTotal(check)
            )}</strong>
          </div>
          <button type="button" class="btn subtle" data-roll-check="${check.id}">Roll</button>
          <button type="button" class="btn subtle" data-remove="customChecks" data-id="${check.id}">
            Remove
          </button>
        </div>
      `
    )
    .join("");
}

function renderProficiencies() {
  dom.proficienciesList.innerHTML = getCollection("proficiencies")
    .map(
      (entry) => `
        <div class="list-row prof-row">
          <label>
            <span>Type</span>
            <select data-collection="proficiencies" data-id="${entry.id}" data-field="type">
              ${buildOptions(
                PROFICIENCY_TYPES.map((value) => ({ value, label: value })),
                entry.type
              )}
            </select>
          </label>
          <label>
            <span>Name</span>
            <input
              type="text"
              data-collection="proficiencies"
              data-id="${entry.id}"
              data-field="name"
              value="${escapeHtml(entry.name)}"
            />
          </label>
          <label>
            <span>Notes</span>
            <input
              type="text"
              data-collection="proficiencies"
              data-id="${entry.id}"
              data-field="notes"
              value="${escapeHtml(entry.notes)}"
            />
          </label>
          <button
            type="button"
            class="btn subtle"
            data-remove="proficiencies"
            data-id="${entry.id}"
          >
            Remove
          </button>
        </div>
      `
    )
    .join("");
}

function renderFeatures() {
  const query = state.ui.featureFilter.trim().toLowerCase();
  const all = getCollection("features");
  const filtered = all.filter((feature) => {
    if (!query) {
      return true;
    }
    const haystack = `${feature.name} ${feature.source} ${feature.summary}`.toLowerCase();
    return haystack.includes(query);
  });

  const filterStatus = query
    ? `<div class="filter-status"><span>Showing ${filtered.length} of ${all.length} features</span><a id="clear-feature-filter">Clear filter</a></div>`
    : "";

  dom.featuresList.innerHTML = filterStatus + filtered
    .map(
      (feature) => `
        <article class="feature-card">
          <div class="feature-copy">
            <div class="feature-header">
              <input
                type="text"
                data-collection="features"
                data-id="${feature.id}"
                data-field="name"
                value="${escapeHtml(feature.name)}"
                placeholder="Feature name"
                aria-label="Feature name"
              />
              <span class="tag">${escapeHtml(feature.source || "Custom")}</span>
            </div>
            <label>
              <span>Source</span>
              <input
                type="text"
                data-collection="features"
                data-id="${feature.id}"
                data-field="source"
                value="${escapeHtml(feature.source)}"
              />
            </label>
            <label>
              <span>Summary</span>
              <textarea rows="3" data-collection="features" data-id="${feature.id}" data-field="summary">${escapeHtml(feature.summary)}</textarea>
            </label>
          </div>
          <div class="inline-actions">
            <button type="button" class="btn subtle" data-remove="features" data-id="${feature.id}">
              Remove
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderDeathSaves() {
  dom.deathSuccesses.innerHTML = buildDeathDots("success", state.combat.deathSuccesses);
  dom.deathFailures.innerHTML = buildDeathDots("failure", state.combat.deathFailures);
}

function renderSectionToggles() {
  dom.sectionToggles.innerHTML = SECTION_LABELS.map(
    (section) => `
      <label class="checkbox">
        <input
          type="checkbox"
          data-section-toggle="${section.key}"
          ${state.ui.sections[section.key] ? "checked" : ""}
        />
        <span>${escapeHtml(section.label)}</span>
      </label>
    `
  ).join("");
}

function updateDisplays() {
  updateDisplayBindings();
  updateInlineComputed();
  updateHeroBackdrop();
  renderRollLog();
}

function updateDisplayBindings() {
  const derived = getDerived();
  const values = {
    "basics.name": state.basics.name || "Unnamed Adventurer",
    "basics.className": state.basics.className || "Wanderer",
    "basics.level": state.basics.level || 1,
    "basics.race": state.basics.race || "Unknown Lineage",
    "derived.ac": derived.ac,
    "derived.passivePerception": derived.passivePerception,
    "derived.spellSaveDc": derived.spellSaveDc,
    "derived.proficiencyBonus": displaySigned(derived.proficiencyBonus),
    "derived.initiative": displaySigned(derived.initiative),
    "derived.deathSaves": `${state.combat.deathSuccesses} / ${state.combat.deathFailures}`,
    "derived.hitDiceRemaining": derived.hitDiceRemaining,
    "derived.spellAttack": displaySigned(derived.spellAttack),
    "derived.totalWeight": `${formatNumber(derived.totalWeight)} lb`,
    "derived.encumbrance": derived.encumbrance,
    "derived.capacity": `${formatNumber(derived.capacity)} lb`,
  };

  document.querySelectorAll("[data-display]").forEach((element) => {
    const key = element.dataset.display;
    element.textContent = key in values ? values[key] : "";
  });
}

function updateInlineComputed() {
  ABILITIES.forEach((ability) => {
    const scoreElement = document.querySelector(`[data-ability-score="${ability.key}"]`);
    const modElement = document.querySelector(`[data-ability-mod="${ability.key}"]`);
    const saveElement = document.querySelector(`[data-save-total="${ability.key}"]`);
    if (scoreElement) {
      scoreElement.textContent = numberValue(state.abilities[ability.key].score, 10);
    }
    if (modElement) {
      modElement.textContent = displaySigned(getAbilityModifier(ability.key));
    }
    if (saveElement) {
      saveElement.textContent = displaySigned(getSavingThrowTotal(ability.key));
    }
  });

  SKILLS.forEach((skill) => {
    const totalElement = document.querySelector(`[data-skill-total="${skill.key}"]`);
    if (totalElement) {
      totalElement.textContent = displaySigned(getSkillTotal(skill.key));
    }
  });

  getCollection("customChecks").forEach((check) => {
    const totalElement = document.querySelector(`[data-custom-total="${check.id}"]`);
    if (totalElement) {
      totalElement.textContent = displaySigned(getCustomCheckTotal(check));
    }
  });

  getCollection("attacks").forEach((attack) => {
    const totalElement = document.querySelector(`[data-attack-total="${attack.id}"]`);
    if (totalElement) {
      totalElement.textContent = displaySigned(getAttackTotal(attack));
    }
  });
}

function updateHeroBackdrop() {
  const portraitUrl = sanitizePortraitUrl(state.basics.portraitUrl);
  if (portraitUrl) {
    dom.heroBackdrop.style.backgroundImage = `url("${escapeCssUrl(portraitUrl)}")`;
  } else {
    dom.heroBackdrop.style.backgroundImage = "none";
  }
}

function renderRollLog() {
  if (!state.rollLog.length) {
    dom.rollLog.innerHTML = `<div class="roll-entry"><div><span class="label">No rolls yet</span></div></div>`;
    return;
  }
  dom.rollLog.innerHTML = state.rollLog
    .map((entry) => {
      const time = entry.timestamp ? formatTime(entry.timestamp) : "";
      return `
        <div class="roll-entry">
          <div>
            <span class="label">${escapeHtml(entry.label)}${time ? ` <time>${escapeHtml(time)}</time>` : ""}</span>
            <div>${escapeHtml(entry.formula)} • ${escapeHtml(entry.breakdown)}</div>
          </div>
          <strong>${escapeHtml(String(entry.total))}</strong>
        </div>
      `;
    })
    .join("");
}

function formatTime(ms) {
  const d = new Date(ms);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function syncBoundInputs() {
  document.querySelectorAll("[data-path]").forEach((element) => {
    setInputValue(element, getPath(state, element.dataset.path));
  });
  dom.featureFilter.value = state.ui.featureFilter;
}

function syncSectionVisibility() {
  document.querySelectorAll("[data-section]").forEach((section) => {
    const key = section.dataset.section;
    section.hidden = !state.ui.sections[key];
  });
}

function applyTheme() {
  const preset = THEME_PRESETS[state.ui.themePreset] || THEME_PRESETS.parchment;
  const accent = state.ui.accentColor || preset.accentColor;
  const panelColor = state.ui.panelColor || preset.panelColor;
  const bg = preset.bg;
  const bgDeep = preset.bgDeep;
  const ink = preset.ink;
  const muted = preset.muted;

  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--accent-strong", adjustColor(accent, -34));
  document.documentElement.style.setProperty("--panel", hexToRgba(panelColor, 0.84));
  document.documentElement.style.setProperty("--panel-strong", hexToRgba(panelColor, 0.96));
  document.documentElement.style.setProperty("--bg", bg);
  document.documentElement.style.setProperty("--bg-deep", bgDeep);
  document.documentElement.style.setProperty("--ink", ink);
  document.documentElement.style.setProperty("--muted", muted);
  document.documentElement.style.setProperty("--border", adjustColor(panelColor, -54));
  document.documentElement.style.setProperty(
    "--font-scale",
    `${Number(state.ui.fontScale) || 100}%`
  );
  document.body.classList.toggle("compact", Boolean(state.ui.compactMode));
}

function applyThemePreset(key) {
  if (key === "custom") {
    return;
  }
  const preset = THEME_PRESETS[key];
  if (!preset) {
    return;
  }
  state.ui.accentColor = preset.accentColor;
  state.ui.panelColor = preset.panelColor;
}

function toggleSettings(open) {
  if (open && helpOpen) toggleHelp(false);
  settingsOpen = open;
  dom.settingsDrawer.classList.toggle("open", open);
  dom.settingsDrawer.setAttribute("aria-hidden", String(!open));
  if (open) {
    settingsReturnFocus = document.activeElement;
    const firstInput = dom.settingsDrawer.querySelector("input, select, button");
    if (firstInput) firstInput.focus();
  } else if (settingsReturnFocus) {
    settingsReturnFocus.focus();
    settingsReturnFocus = null;
  }
}

function toggleHelp(open) {
  if (open && settingsOpen) toggleSettings(false);
  helpOpen = open;
  dom.helpDrawer.classList.toggle("open", open);
  dom.helpDrawer.setAttribute("aria-hidden", String(!open));
  if (open) {
    helpReturnFocus = document.activeElement;
    const firstBtn = dom.helpDrawer.querySelector("button");
    if (firstBtn) firstBtn.focus();
  } else if (helpReturnFocus) {
    helpReturnFocus.focus();
    helpReturnFocus = null;
  }
}

function renderHelpPanel() {
  dom.helpFaqList.innerHTML = HELP_FAQ.map(
    (entry) =>
      `<div class="faq-item">
        <button type="button" class="faq-question">${escapeHtml(entry.q)}</button>
        <div class="faq-answer">${escapeHtml(entry.a)}</div>
      </div>`
  ).join("");
}

function checkOnboarding() {
  try {
    if (!localStorage.getItem(ONBOARDING_KEY)) {
      showOnboarding();
    }
  } catch (_) {}
}

function showOnboarding() {
  onboardingStep = 0;
  dom.onboardingOverlay.classList.remove("is-hidden");
  dom.onboardingModal.classList.remove("is-hidden");
  renderOnboardingStep();
}

function dismissOnboarding() {
  dom.onboardingOverlay.classList.add("is-hidden");
  dom.onboardingModal.classList.add("is-hidden");
  try {
    localStorage.setItem(ONBOARDING_KEY, "1");
  } catch (_) {}
}

function advanceOnboarding() {
  if (onboardingStep < ONBOARDING_STEPS.length - 1) {
    onboardingStep++;
    renderOnboardingStep();
  } else {
    dismissOnboarding();
  }
}

function retreatOnboarding() {
  if (onboardingStep > 0) {
    onboardingStep--;
    renderOnboardingStep();
  }
}

function renderOnboardingStep() {
  const step = ONBOARDING_STEPS[onboardingStep];
  dom.onboardingContent.innerHTML =
    `<h2>${escapeHtml(step.title)}</h2><p>${escapeHtml(step.body)}</p>`;
  dom.onboardingDots.innerHTML = ONBOARDING_STEPS.map(
    (_, i) => `<span class="onboarding-dot${i === onboardingStep ? " active" : ""}"></span>`
  ).join("");
  const isLast = onboardingStep === ONBOARDING_STEPS.length - 1;
  dom.onboardingNext.textContent = isLast ? "Get Started" : "Next";
  dom.onboardingBack.classList.toggle("is-hidden", onboardingStep === 0);
}

function toggleTooltip(trigger) {
  if (activeTooltip && activeTooltip.trigger === trigger) {
    dismissActiveTooltip();
    return;
  }
  dismissActiveTooltip();
  const key = trigger.dataset.tooltip;
  const text = HELP_TOOLTIPS[key];
  if (!text) return;

  trigger.style.position = trigger.style.position || "relative";
  const wrapper = trigger.parentElement;
  if (wrapper && getComputedStyle(wrapper).position === "static") {
    wrapper.style.position = "relative";
  }

  const bubble = document.createElement("div");
  bubble.className = "tooltip-bubble";
  bubble.textContent = text;
  trigger.parentElement.appendChild(bubble);

  const rect = bubble.getBoundingClientRect();
  if (rect.top < 8) {
    bubble.classList.add("flip-up");
  }
  const overflowRight = rect.right - window.innerWidth + 8;
  const overflowLeft = 8 - rect.left;
  if (overflowRight > 0) {
    bubble.style.transform = `translateX(calc(-50% - ${overflowRight}px))`;
  } else if (overflowLeft > 0) {
    bubble.style.transform = `translateX(calc(-50% + ${overflowLeft}px))`;
  }

  activeTooltip = { trigger, bubble };
}

function dismissActiveTooltip() {
  if (!activeTooltip) return;
  activeTooltip.bubble.remove();
  activeTooltip = null;
}

function openAppModal(options) {
  return new Promise((resolve) => {
    dom.appModalTitle.textContent = options.title || "";
    dom.appModalMessage.textContent = options.message || "";

    if (options.input) {
      dom.appModalInput.classList.remove("is-hidden");
      dom.appModalInput.value = options.defaultValue || "";
      dom.appModalInput.placeholder = options.placeholder || "";
    } else {
      dom.appModalInput.classList.add("is-hidden");
    }

    if (options.showCancel === false) {
      dom.appModalCancel.classList.add("is-hidden");
    } else {
      dom.appModalCancel.classList.remove("is-hidden");
    }

    dom.appModalConfirm.textContent = options.confirmLabel || "OK";
    dom.appModalOverlay.classList.remove("is-hidden");
    dom.appModal.classList.remove("is-hidden");

    function cleanup() {
      dom.appModalOverlay.classList.add("is-hidden");
      dom.appModal.classList.add("is-hidden");
      dom.appModalConfirm.removeEventListener("click", onConfirm);
      dom.appModalCancel.removeEventListener("click", onCancel);
      dom.appModalOverlay.removeEventListener("click", onCancel);
      dom.appModalInput.removeEventListener("keydown", onInputKey);
    }

    function onConfirm() {
      cleanup();
      if (options.input) {
        resolve(dom.appModalInput.value);
      } else if (options.confirm) {
        resolve(true);
      } else {
        resolve(undefined);
      }
    }

    function onCancel() {
      cleanup();
      if (options.input) {
        resolve(null);
      } else if (options.confirm) {
        resolve(false);
      } else {
        resolve(undefined);
      }
    }

    function onInputKey(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        onConfirm();
      }
    }

    dom.appModalConfirm.addEventListener("click", onConfirm);
    dom.appModalCancel.addEventListener("click", onCancel);
    dom.appModalOverlay.addEventListener("click", onCancel);
    if (options.input) {
      dom.appModalInput.addEventListener("keydown", onInputKey);
      requestAnimationFrame(() => dom.appModalInput.focus());
    } else {
      requestAnimationFrame(() => dom.appModalConfirm.focus());
    }
  });
}

function showConfirmModal(title, message) {
  return openAppModal({ title, message, confirm: true, confirmLabel: "Confirm" });
}

function showPromptModal(title, message, defaultValue, placeholder) {
  return openAppModal({ title, message, input: true, defaultValue, placeholder, confirmLabel: "OK" });
}

function showAlertModal(title, message) {
  return openAppModal({ title, message, showCancel: false, confirmLabel: "OK" });
}

function setupPwa() {
  if ("serviceWorker" in navigator && isInstallContext()) {
    window.addEventListener("load", async () => {
      try {
        await navigator.serviceWorker.register("service-worker.js");
      } catch (error) {
        console.error("Service worker registration failed.", error);
      }
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    showInstallButton(true);
    showInstallNote(
      "Install this sheet on your device",
      "Tap Install App to add it to your home screen and keep it available offline."
    );
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    showInstallButton(false);
    hideInstallNote();
    localStorage.setItem(INSTALL_NOTE_KEY, "true");
  });

  if (!isInstallContext() && !isStandalone() && !wasInstallNoteDismissed()) {
    showInstallNote(
      "Install requires HTTPS or localhost",
      "Serve this sheet from a secure site or localhost to enable mobile installation and offline caching."
    );
    return;
  }

  if (!isStandalone() && !wasInstallNoteDismissed()) {
    if (isIosSafari()) {
      showInstallNote(
        "Add this sheet to your iPhone or iPad",
        "Open this page in Safari, tap Share, then choose Add to Home Screen."
      );
    } else if (isMobileDevice()) {
      showInstallNote(
        "Install this sheet on your device",
        "Use your browser menu or install flow to pin this character sheet to your home screen."
      );
    }
  }
}

async function triggerInstallPrompt() {
  if (!deferredInstallPrompt) {
    showInstallNote(
      "Install is browser-controlled",
      "If the install button is unavailable, use your browser menu and choose Install App or Add to Home Screen."
    );
    return;
  }

  deferredInstallPrompt.prompt();
  const result = await deferredInstallPrompt.userChoice;
  if (result.outcome !== "accepted") {
    showInstallButton(true);
  }
  deferredInstallPrompt = null;
}

function showInstallButton(show) {
  dom.installApp.classList.toggle("is-hidden", !show);
}

function showInstallNote(title, body) {
  if (isStandalone()) {
    return;
  }
  dom.installNoteTitle.textContent = title;
  dom.installNoteBody.textContent = body;
  dom.installNote.classList.remove("is-hidden");
}

function hideInstallNote() {
  dom.installNote.classList.add("is-hidden");
}

function dismissInstallNote() {
  localStorage.setItem(INSTALL_NOTE_KEY, "true");
  hideInstallNote();
}

function wasInstallNoteDismissed() {
  return localStorage.getItem(INSTALL_NOTE_KEY) === "true";
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function isIosSafari() {
  const userAgent = window.navigator.userAgent;
  return /iphone|ipad|ipod/i.test(userAgent) && /safari/i.test(userAgent) && !/crios|fxios|edgios/i.test(userAgent);
}

function isMobileDevice() {
  return /android|iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isInstallContext() {
  return window.isSecureContext || ["localhost", "127.0.0.1"].includes(window.location.hostname);
}

function addCollectionItem(path) {
  const collection = getCollection(path);
  collection.push(createCollectionEntry(path));
  setPath(state, path, collection);

  rerenderCollection(path);
  updateDisplays();
  scheduleSave();
}

function removeCollectionItem(path, id) {
  setPath(
    state,
    path,
    getCollection(path).filter((entry) => entry.id !== id)
  );
  rerenderCollection(path);
  updateDisplays();
  scheduleSave();
}

function updateCollectionField(path, id, field, value) {
  const item = findCollectionItem(path, id);
  if (!item) {
    return;
  }
  item[field] = value;
}

function findCollectionItem(path, id) {
  return getCollection(path).find((entry) => entry.id === id);
}

function rerenderCollection(path) {
  if (path === "resources") {
    renderResources();
  }
  if (path === "attacks") {
    renderAttacks();
  }
  if (path === "spells.slots") {
    renderSpellSlots();
  }
  if (path === "spells.list") {
    renderSpells();
  }
  if (path === "inventory") {
    renderInventory();
  }
  if (path === "customChecks") {
    renderCustomChecks();
  }
  if (path === "proficiencies") {
    renderProficiencies();
  }
  if (path === "features") {
    renderFeatures();
  }
}

function toggleDeathSave(type, index) {
  const field = type === "success" ? "deathSuccesses" : "deathFailures";
  const current = Number(state.combat[field]) || 0;
  state.combat[field] = current === index + 1 ? index : index + 1;
  renderDeathSaves();
  updateDisplays();
  scheduleSave();
}

function toggleSpellSlot(level, index) {
  const slot = getCollection("spells.slots").find((entry) => entry.level === level);
  if (!slot) {
    return;
  }
  slot.used = slot.used === index + 1 ? index : index + 1;
  slot.used = clamp(slot.used, 0, slot.max);
  renderSpellSlots();
  updateDisplays();
  scheduleSave();
}

function applyShortRest() {
  state.resources.forEach((resource) => {
    if (resource.resetOn === "short") {
      resource.current = resource.max;
    }
  });
  renderResources();
  updateDisplays();
  scheduleSave();
}

function applyLongRest() {
  state.resources.forEach((resource) => {
    if (resource.resetOn === "short" || resource.resetOn === "long") {
      resource.current = resource.max;
    }
  });
  state.combat.hpCurrent = state.combat.hpMax;
  state.combat.hpTemp = 0;
  state.combat.deathSuccesses = 0;
  state.combat.deathFailures = 0;
  state.combat.hitDiceUsed = Math.max(
    0,
    numberValue(state.combat.hitDiceUsed) - Math.floor(numberValue(state.basics.level, 1) / 2)
  );
  state.spells.slots.forEach((slot) => {
    slot.used = 0;
  });

  renderResources();
  renderSpellSlots();
  renderDeathSaves();
  syncBoundInputs();
  updateDisplays();
  scheduleSave();
}

function rollFromFormulaInput() {
  const formula = dom.rollFormula.value.trim();
  if (!formula) {
    return;
  }
  performRoll(formula, "Manual Roll");
}

function performRoll(formula, label) {
  try {
    const result = rollFormula(formula);
    state.rollLog.unshift({
      id: createId(),
      label,
      formula,
      breakdown: result.breakdown,
      total: result.total,
      timestamp: Date.now(),
    });
    state.rollLog = state.rollLog.slice(0, 14);
    renderRollLog();
    scheduleSave();
  } catch (error) {
    showAlertModal("Roll Error", error.message);
  }
}

function exportSheet() {
  const currentProfile = getCurrentProfile();
  const fileName = `${slugify(currentProfile.name || state.basics.name || "dnd-sheet")}.json`;
  const payload = JSON.stringify(currentProfile, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function exportAll() {
  const payload = JSON.stringify(snapshotAppState(), null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "dnd-characters-all.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importFromFile(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      importProfile(parsed);
    } catch (error) {
      showAlertModal("Import Error", "Could not read that JSON file.");
    } finally {
      dom.importFile.value = "";
    }
  };
  reader.onerror = () => {
    showAlertModal("Import Error", "Could not read that file.");
    dom.importFile.value = "";
  };
  reader.readAsText(file);
}

function importPortrait(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }
  if (file.size > MAX_PORTRAIT_FILE_BYTES) {
    showAlertModal("File Too Large", "Use a portrait image smaller than 2 MB.");
    dom.portraitFile.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    state.basics.portraitUrl = sanitizePortraitUrl(String(reader.result));
    syncBoundInputs();
    updateHeroBackdrop();
    scheduleSave();
    dom.portraitFile.value = "";
  };
  reader.onerror = () => {
    showAlertModal("Import Error", "Could not read that image.");
    dom.portraitFile.value = "";
  };
  reader.readAsDataURL(file);
}

async function encryptSecureState(passphrase, data) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveEncryptionKey(passphrase, salt, ["encrypt"]);
  const plaintext = new TextEncoder().encode(JSON.stringify(data));
  const cipherBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    plaintext
  );

  return {
    version: 1,
    iterations: SECURITY_ITERATIONS,
    salt: bytesToBase64(salt),
    iv: bytesToBase64(iv),
    cipherText: bytesToBase64(new Uint8Array(cipherBuffer)),
  };
}

async function decryptSecureState(passphrase, envelope) {
  if (!envelope?.salt || !envelope?.iv || !envelope?.cipherText) {
    throw new Error("Invalid secure save envelope.");
  }

  const salt = base64ToBytes(envelope.salt);
  const iv = base64ToBytes(envelope.iv);
  const cipherText = base64ToBytes(envelope.cipherText);
  const key = await deriveEncryptionKey(passphrase, salt, ["decrypt"], envelope.iterations || SECURITY_ITERATIONS);
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    cipherText
  );
  return JSON.parse(new TextDecoder().decode(plaintext));
}

async function deriveEncryptionKey(passphrase, salt, usages, iterations = SECURITY_ITERATIONS) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-256",
    },
    baseKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    usages
  );
}

function scheduleSave() {
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(saveState, 140);
}

async function saveState() {
  try {
    if (securityState.mode === "locked") {
      return;
    }

    if (securityState.mode === "unlocked") {
      await persistProtectedState(securityState.passphrase);
      showSaveIndicator();
      return;
    }

    if (securityState.mode === "plain") {
      localStorage.setItem(PLAINTEXT_STORAGE_KEY, JSON.stringify(snapshotAppState()));
      clearLegacyPlaintextStorage();
      showSaveIndicator();
      return;
    }

    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(snapshotAppState()));
    clearLegacyPlaintextStorage();
    showSaveIndicator();
  } catch (error) {
    console.error("Could not save sheet state.", error);
  }
}

function showSaveIndicator() {
  if (!dom.saveIndicator) return;
  dom.saveIndicator.classList.add("visible");
  clearTimeout(saveIndicatorTimer);
  saveIndicatorTimer = setTimeout(() => {
    dom.saveIndicator.classList.remove("visible");
  }, 1500);
}

function loadAppState() {
  const defaults = createDefaultAppState();
  try {
    const secureSaved = localStorage.getItem(SECURE_STORAGE_KEY);
    if (secureSaved) {
      securityState.mode = "locked";
      securityState.panelMode = "unlock";
      return defaults;
    }

    const plainSaved = localStorage.getItem(PLAINTEXT_STORAGE_KEY);
    if (plainSaved) {
      securityState.mode = "plain";
      securityState.panelMode = null;
      return hydrateAppState(JSON.parse(plainSaved));
    }

    const sessionSaved = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (sessionSaved) {
      const migrated = hydrateAppState(JSON.parse(sessionSaved));
      localStorage.setItem(PLAINTEXT_STORAGE_KEY, JSON.stringify(migrated));
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      securityState.mode = "plain";
      securityState.panelMode = null;
      return migrated;
    }

    const saved = localStorage.getItem(STORAGE_KEY_V2);
    if (saved) {
      const migrated = hydrateAppState(JSON.parse(saved));
      localStorage.setItem(PLAINTEXT_STORAGE_KEY, JSON.stringify(migrated));
      clearLegacyPlaintextStorage();
      securityState.mode = "plain";
      securityState.panelMode = null;
      return migrated;
    }

    const legacy = localStorage.getItem(STORAGE_KEY);
    if (legacy) {
      const migrated = hydrateAppState({
        profiles: [
          createProfileWrapper(
            "My Character",
            mergeDefaults(createDefaultState(), JSON.parse(legacy))
          ),
        ],
      });
      localStorage.setItem(PLAINTEXT_STORAGE_KEY, JSON.stringify(migrated));
      clearLegacyPlaintextStorage();
      securityState.mode = "plain";
      securityState.panelMode = null;
      return migrated;
    }

    securityState.mode = "plain";
    securityState.panelMode = null;
    return defaults;
  } catch (error) {
    securityState.mode = "plain";
    securityState.panelMode = null;
    return defaults;
  }
}

async function enableSaveProtection() {
  if (!globalThis.crypto?.subtle) {
    showAlertModal("Not Supported", "This browser cannot encrypt saved data. Use Export JSON for backups.");
    return;
  }

  const passphrase = dom.securityPassphrase.value;
  const confirmation = dom.securityPassphraseConfirm.value;

  if (!validatePassphrase(passphrase, confirmation)) {
    return;
  }

  try {
    await persistProtectedState(passphrase);
    securityState.mode = "unlocked";
    securityState.panelMode = null;
    securityState.passphrase = passphrase;
    clearSecurityInputs();
    renderSecurityUi();
  } catch (error) {
    console.error("Could not protect saved characters.", error);
    showAlertModal("Error", "Could not protect saves in this browser. Try a smaller portrait image or use Export JSON.");
  }
}

async function unlockProtectedSaves() {
  const passphrase = dom.securityPassphrase.value;
  if (!passphrase) {
    showAlertModal("Passphrase Required", "Enter your passphrase to unlock saved characters.");
    return;
  }

  try {
    const envelope = readSecureEnvelope();
    if (!envelope) {
      throw new Error("No protected save found.");
    }
    appState = hydrateAppState(await decryptSecureState(passphrase, envelope));
    securityState.mode = "unlocked";
    securityState.panelMode = null;
    securityState.passphrase = passphrase;
    clearSecurityInputs();
    syncCurrentStateRef();
    renderAll();
  } catch (error) {
    showAlertModal("Unlock Failed", "Could not unlock saved characters. Check the passphrase and try again.");
  }
}

async function changeSavePassphrase() {
  const passphrase = dom.securityPassphrase.value;
  const confirmation = dom.securityPassphraseConfirm.value;

  if (!validatePassphrase(passphrase, confirmation)) {
    return;
  }

  try {
    await persistProtectedState(passphrase);
    securityState.passphrase = passphrase;
    securityState.panelMode = null;
    clearSecurityInputs();
    renderSecurityUi();
  } catch (error) {
    console.error("Could not update the save passphrase.", error);
    showAlertModal("Error", "Could not update the passphrase. Try a smaller portrait image or use Export JSON.");
  }
}

async function lockProtectedSaves() {
  if (securityState.mode !== "unlocked") {
    return;
  }
  window.clearTimeout(saveTimer);
  try {
    await persistProtectedState(securityState.passphrase);
  } catch (error) {
    console.error("Could not lock protected saves.", error);
    showAlertModal("Error", "Could not lock saves cleanly. Try again or use Export JSON first.");
    return;
  }
  securityState.mode = "locked";
  securityState.panelMode = "unlock";
  securityState.passphrase = "";
  appState = createDefaultAppState();
  syncCurrentStateRef();
  clearSecurityInputs();
  renderAll();
}

async function persistProtectedState(passphrase) {
  const envelope = await encryptSecureState(passphrase, snapshotAppState());
  localStorage.setItem(SECURE_STORAGE_KEY, JSON.stringify(envelope));
  clearAllPlaintextStorage();
}

function clearLegacyPlaintextStorage() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_KEY_V2);
}

function clearAllPlaintextStorage() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_KEY_V2);
  localStorage.removeItem(PLAINTEXT_STORAGE_KEY);
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}

function readSecureEnvelope() {
  const raw = localStorage.getItem(SECURE_STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function validatePassphrase(passphrase, confirmation) {
  if (!passphrase || passphrase.length < 8) {
    showAlertModal("Passphrase Too Short", "Use a passphrase with at least 8 characters.");
    return false;
  }
  if (passphrase !== confirmation) {
    showAlertModal("Mismatch", "The passphrase and confirmation do not match.");
    return false;
  }
  return true;
}

function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function base64ToBytes(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function snapshotAppState() {
  if (typeof structuredClone === "function") {
    return structuredClone(appState);
  }
  return JSON.parse(JSON.stringify(appState));
}

function createDefaultAppState() {
  const initial = createProfileWrapper("My Character", createDefaultState());
  return {
    profiles: [initial],
    currentProfileId: initial.id,
  };
}

function createDefaultState() {
  const abilities = Object.fromEntries(
    ABILITIES.map((ability) => [
      ability.key,
      {
        score: 10,
        saveProf: 0,
        saveBonus: 0,
      },
    ])
  );

  const skills = Object.fromEntries(
    SKILLS.map((skill) => [
      skill.key,
      {
        prof: 0,
        bonus: 0,
      },
    ])
  );

  return {
    basics: {
      name: "",
      className: "",
      level: 1,
      background: "",
      race: "",
      alignment: "",
      xp: 0,
      playerName: "",
      campaign: "",
      portraitUrl: "",
    },
    abilities,
    skills,
    combat: {
      ac: 10,
      initiativeBonus: 0,
      speed: 30,
      hpMax: 10,
      hpCurrent: 10,
      hpTemp: 0,
      hitDiceLabel: "1d8",
      hitDiceUsed: 0,
      deathSuccesses: 0,
      deathFailures: 0,
      globalAttackModifier: 0,
      proficiencyBonusOverride: "",
    },
    resources: [],
    attacks: [createAttack()],
    spells: {
      castingAbility: "wisdom",
      saveDcBonus: 0,
      attackBonusExtra: 0,
      slots: SPELL_SLOT_LEVELS.map(createSpellSlot),
      list: [],
    },
    inventory: [],
    currency: {
      cp: 0,
      sp: 0,
      ep: 0,
      gp: 0,
      pp: 0,
    },
    personality: {
      traits: "",
      ideals: "",
      bonds: "",
      flaws: "",
      notes: "",
    },
    customChecks: [],
    proficiencies: [],
    features: [],
    rollLog: [],
    ui: {
      themePreset: "parchment",
      accentColor: THEME_PRESETS.parchment.accentColor,
      panelColor: THEME_PRESETS.parchment.panelColor,
      fontScale: 100,
      compactMode: false,
      encumbranceMode: "variant",
      featureFilter: "",
      sections: Object.fromEntries(SECTION_LABELS.map((section) => [section.key, true])),
    },
  };
}

function buildDemoState() {
  const demo = createDefaultState();

  Object.assign(demo.basics, {
    name: "Theron Vaelmont",
    className: "Gloom Stalker Ranger",
    level: 3,
    background: "Noble",
    race: "Half-Elf",
    alignment: "Lawful Neutral",
    xp: 900,
    campaign: "Shadows Over Greenhollow",
    playerName: "Table Copy",
  });

  Object.assign(demo.combat, {
    ac: 14,
    initiativeBonus: 2,
    speed: 30,
    hpMax: 28,
    hpCurrent: 28,
    hpTemp: 0,
    hitDiceLabel: "3d10",
    hitDiceUsed: 0,
    globalAttackModifier: 2,
  });

  demo.abilities.strength.score = 10;
  demo.abilities.dexterity.score = 16;
  demo.abilities.constitution.score = 16;
  demo.abilities.intelligence.score = 10;
  demo.abilities.wisdom.score = 14;
  demo.abilities.charisma.score = 14;
  demo.abilities.strength.saveProf = 1;
  demo.abilities.dexterity.saveProf = 1;

  [
    "acrobatics",
    "animalHandling",
    "history",
    "insight",
    "perception",
    "persuasion",
    "stealth",
  ].forEach((skill) => {
    demo.skills[skill].prof = 1;
  });

  demo.resources = [
    { id: createId(), name: "Favored Foe", current: 2, max: 2, resetOn: "long" },
    { id: createId(), name: "Hunter's Mark Uses", current: 2, max: 2, resetOn: "long" },
  ];

  demo.attacks = [
    { id: createId(), name: "Shortsword", ability: "dexterity", attackBonus: 0, proficient: true, damage: "1d6+3 Piercing", notes: "Finesse, light" },
    { id: createId(), name: "Longbow", ability: "dexterity", attackBonus: 0, proficient: true, damage: "1d8+3 Piercing", notes: "Range 150/600" },
    { id: createId(), name: "Hail of Thorns", ability: "wisdom", attackBonus: 0, proficient: false, damage: "DC 12, 1d10 Piercing", notes: "Spell rider" },
  ];

  demo.spells.list = [
    { id: createId(), name: "Hunter's Mark", level: 1, school: "Divination", prepared: true, notes: "Bonus action" },
    { id: createId(), name: "Absorb Elements", level: 1, school: "Abjuration", prepared: true, notes: "Reaction" },
    { id: createId(), name: "Disguise Self", level: 1, school: "Illusion", prepared: true, notes: "Gloom Stalker" },
  ];
  demo.spells.slots[0].max = 3;

  demo.inventory = [
    { id: createId(), name: "Leather Armor", qty: 1, weight: 10, notes: "", carried: true },
    { id: createId(), name: "Shortsword", qty: 1, weight: 2, notes: "", carried: true },
    { id: createId(), name: "Longbow", qty: 1, weight: 2, notes: "", carried: true },
    { id: createId(), name: "Arrows", qty: 20, weight: 0.05, notes: "In quiver", carried: true },
    { id: createId(), name: "Explorer's Pack", qty: 1, weight: 10, notes: "Packed", carried: true },
    { id: createId(), name: "Fine Clothes", qty: 1, weight: 6, notes: "", carried: true },
    { id: createId(), name: "Signet Ring", qty: 1, weight: 0, notes: "Family crest", carried: true },
  ];

  demo.currency.gp = 25;

  demo.personality.traits = "Measured, observant, and slow to reveal his full intentions.";
  demo.personality.ideals = "Control and preparedness win battles before blades are drawn.";
  demo.personality.bonds = "The honor of House Vaelmont is mine to restore.";
  demo.personality.flaws = "I can mistake caution for wisdom and distance for discipline.";

  demo.customChecks = [
    {
      id: createId(),
      name: "Dice Set",
      ability: "charisma",
      prof: 1,
      bonus: 0,
    },
  ];

  demo.proficiencies = [
    { id: createId(), type: "Armor", name: "Light Armor", notes: "" },
    { id: createId(), type: "Armor", name: "Medium Armor", notes: "" },
    { id: createId(), type: "Armor", name: "Shields", notes: "" },
    { id: createId(), type: "Language", name: "Common", notes: "" },
    { id: createId(), type: "Language", name: "Elvish", notes: "" },
    { id: createId(), type: "Language", name: "Dwarvish", notes: "" },
    { id: createId(), type: "Language", name: "Orc", notes: "" },
    { id: createId(), type: "Weapon", name: "Simple Weapons", notes: "" },
    { id: createId(), type: "Weapon", name: "Martial Weapons", notes: "" },
  ];

  demo.features = [
    { id: createId(), name: "Favored Enemy: Orcs", source: "Ranger", summary: "Advantage on Survival checks to track them and Intelligence checks to recall lore." },
    { id: createId(), name: "Natural Explorer: Forest", source: "Ranger", summary: "Travel benefits in forest terrain and better overland utility." },
    { id: createId(), name: "Darkvision", source: "Half-Elf", summary: "See in dim light within 60 feet as if it were bright light." },
    { id: createId(), name: "Fey Ancestry", source: "Half-Elf", summary: "Advantage on saves against being charmed; magic can't put you to sleep." },
    { id: createId(), name: "Position of Privilege", source: "Noble", summary: "People assume the best of you in high society and local authority circles." },
    { id: createId(), name: "Dread Ambusher", source: "Gloom Stalker", summary: "Bonus to initiative, extra movement, and an extra attack on round one." },
    { id: createId(), name: "Umbral Sight", source: "Gloom Stalker", summary: "Superior darkvision and near invisibility to creatures relying on darkvision." },
  ];

  demo.rollLog = [
    {
      id: createId(),
      label: "Stealth (Dexterity)",
      formula: "1d20+5",
      breakdown: "1d20[14] +5",
      total: 19,
      timestamp: Date.now(),
    },
  ];

  return demo;
}

function createCollectionEntry(path) {
  if (path === "resources") {
    return { id: createId(), name: "", current: 0, max: 0, resetOn: "manual" };
  }
  if (path === "attacks") {
    return createAttack();
  }
  if (path === "spells.list") {
    return { id: createId(), name: "", level: 0, school: "", prepared: false, notes: "" };
  }
  if (path === "inventory") {
    return { id: createId(), name: "", qty: 1, weight: 0, notes: "", carried: true };
  }
  if (path === "customChecks") {
    return { id: createId(), name: "", ability: "wisdom", prof: 0, bonus: 0 };
  }
  if (path === "proficiencies") {
    return { id: createId(), type: "Tool", name: "", notes: "" };
  }
  if (path === "features") {
    return { id: createId(), name: "", source: "", summary: "" };
  }
  return { id: createId() };
}

function createAttack() {
  return {
    id: createId(),
    name: "",
    ability: "strength",
    attackBonus: 0,
    proficient: true,
    damage: "",
    notes: "",
  };
}

function createSpellSlot(level) {
  return { id: createId(), level, max: 0, used: 0 };
}

function getDerived() {
  const proficiencyBonus = getProficiencyBonus();
  const initiative = getInitiative();
  const hitDiceRemaining = Math.max(0, getHitDiceCount() - numberValue(state.combat.hitDiceUsed));
  const spellAttack = getSpellAttack();
  const spellSaveDc = getSpellSaveDc();
  const totalWeight = getTotalWeight();
  const capacity = getCapacity();

  return {
    ac: numberValue(state.combat.ac, 10),
    passivePerception: 10 + getSkillTotal("perception"),
    proficiencyBonus,
    initiative,
    hitDiceRemaining,
    spellAttack,
    spellSaveDc,
    totalWeight,
    capacity,
    encumbrance: getEncumbranceLabel(totalWeight, capacity),
  };
}

function getAbilityModifier(key) {
  const ability = state.abilities[key];
  if (!ability) return 0;
  return Math.floor((numberValue(ability.score, 10) - 10) / 2);
}

function getSavingThrowTotal(key) {
  const data = state.abilities[key];
  return getAbilityModifier(key) + getProficiencyBonus() * numberValue(data.saveProf) + numberValue(data.saveBonus);
}

function getSkillDefinition(key) {
  return SKILLS.find((skill) => skill.key === key);
}

function getSkillTotal(key) {
  const skill = getSkillDefinition(key);
  const data = state.skills[key];
  return getAbilityModifier(skill.ability) + getProficiencyBonus() * numberValue(data.prof) + numberValue(data.bonus);
}

function getCustomCheckTotal(entry) {
  return getAbilityModifier(entry.ability) + getProficiencyBonus() * numberValue(entry.prof) + numberValue(entry.bonus);
}

function getAttackTotal(entry) {
  const ability = getAbilityModifier(entry.ability || "strength");
  const proficiency = entry.proficient ? getProficiencyBonus() : 0;
  return ability + proficiency + numberValue(entry.attackBonus) + numberValue(state.combat.globalAttackModifier);
}

function getInitiative() {
  return getAbilityModifier("dexterity") + numberValue(state.combat.initiativeBonus);
}

function getSpellAttack() {
  return getProficiencyBonus() + getAbilityModifier(state.spells.castingAbility) + numberValue(state.spells.attackBonusExtra);
}

function getSpellSaveDc() {
  return 8 + getProficiencyBonus() + getAbilityModifier(state.spells.castingAbility) + numberValue(state.spells.saveDcBonus);
}

function getProficiencyBonus() {
  if (state.combat.proficiencyBonusOverride !== "") {
    return numberValue(state.combat.proficiencyBonusOverride);
  }
  return 2 + Math.floor((Math.max(1, numberValue(state.basics.level, 1)) - 1) / 4);
}

function getHitDiceCount() {
  const match = String(state.combat.hitDiceLabel).match(/(\d+)\s*d/i);
  return match ? Number(match[1]) : Math.max(1, numberValue(state.basics.level, 1));
}

function getTotalWeight() {
  return roundToOne(
    getCollection("inventory").reduce((total, item) => {
      if (!item.carried) {
        return total;
      }
      return total + numberValue(item.qty, 0) * numberValue(item.weight, 0);
    }, 0)
  );
}

function getCapacity() {
  const strength = numberValue(state.abilities.strength.score, 10);
  return strength * 15;
}

function getEncumbranceLabel(weight, capacity) {
  if (state.ui.encumbranceMode === "off") {
    return "Ignored";
  }

  if (state.ui.encumbranceMode === "simple") {
    return weight > capacity ? "Over Capacity" : "Ready";
  }

  const strength = numberValue(state.abilities.strength.score, 10);
  if (weight > strength * 15) {
    return "Over Capacity";
  }
  if (weight > strength * 10) {
    return "Heavily Encumbered";
  }
  if (weight > strength * 5) {
    return "Encumbered";
  }
  return "Unencumbered";
}

function getCollection(path) {
  const collection = getPath(state, path);
  return Array.isArray(collection) ? collection : [];
}

function rollFormula(formula) {
  const input = formula.toLowerCase().replace(/\s+/g, "");
  if (!input || input.length > MAX_FORMULA_LENGTH) {
    throw new Error(`Keep formulas under ${MAX_FORMULA_LENGTH} characters.`);
  }

  if (!/^[+\-0-9d]+$/.test(input)) {
    throw new Error("Use formulas like 1d20+5 or 2d6+3.");
  }

  const pattern = /([+-]?)(\d*d\d+|\d+)/g;
  let cursor = 0;
  let total = 0;
  let termCount = 0;
  let totalDice = 0;
  const breakdown = [];

  while (cursor < input.length) {
    const match = pattern.exec(input);
    if (!match || match.index !== cursor) {
      throw new Error("Use formulas like 1d20+5 or 2d6+3.");
    }
    termCount += 1;
    if (termCount > MAX_FORMULA_TERMS) {
      throw new Error(`Use no more than ${MAX_FORMULA_TERMS} terms in one formula.`);
    }

    const sign = match[1] === "-" ? -1 : 1;
    const term = match[2];

    if (term.includes("d")) {
      const [countRaw, sidesRaw] = term.split("d");
      const count = Number(countRaw || 1);
      const sides = Number(sidesRaw);
      if (!Number.isInteger(count) || count < 1 || count > MAX_DICE_COUNT) {
        throw new Error(`Each dice term must roll between 1 and ${MAX_DICE_COUNT} dice.`);
      }
      if (!Number.isInteger(sides) || sides < 1 || sides > MAX_DIE_SIDES) {
        throw new Error(`Dice can have between 1 and ${MAX_DIE_SIDES} sides.`);
      }
      totalDice += count;
      if (totalDice > MAX_DICE_COUNT) {
        throw new Error(`Roll no more than ${MAX_DICE_COUNT} dice total in one formula.`);
      }
      const rolls = Array.from({ length: count }, () => rollDie(sides));
      const subtotal = rolls.reduce((sum, value) => sum + value, 0) * sign;
      total += subtotal;
      breakdown.push(`${sign < 0 ? "-" : cursor === 0 ? "" : "+"}${count}d${sides}[${rolls.join(",")}]`);
    } else {
      const numericTerm = Number(term);
      if (!Number.isInteger(numericTerm) || numericTerm > MAX_FLAT_BONUS) {
        throw new Error(`Flat bonuses must stay at or below ${MAX_FLAT_BONUS}.`);
      }
      const value = numericTerm * sign;
      total += value;
      breakdown.push(`${sign < 0 ? "" : cursor === 0 ? "" : "+"}${value}`);
    }

    cursor = pattern.lastIndex;
  }

  return {
    total,
    breakdown: breakdown.join(" "),
  };
}

function rollDie(sides) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return (array[0] % sides) + 1;
}

function readInputValue(element) {
  if (element.type === "checkbox") {
    return element.checked;
  }
  if (element.type === "number" || element.type === "range") {
    return element.value === "" ? "" : Number(element.value);
  }
  return element.value;
}

function setInputValue(element, value) {
  if (element.type === "checkbox") {
    element.checked = Boolean(value);
    return;
  }
  element.value = value ?? "";
}

function getPath(object, path) {
  return path.split(".").reduce((result, key) => result?.[key], object);
}

function setPath(object, path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce((result, key) => result?.[key], object);
  if (target == null) return;
  target[last] = value;
}

function mergeDefaults(defaultValue, incomingValue) {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(incomingValue) ? incomingValue : defaultValue;
  }

  if (defaultValue && typeof defaultValue === "object") {
    const result = {};
    const incoming = incomingValue && typeof incomingValue === "object" ? incomingValue : {};
    Object.keys(defaultValue).forEach((key) => {
      result[key] = mergeDefaults(defaultValue[key], incoming[key]);
    });
    Object.keys(incoming).forEach((key) => {
      if (!(key in result)) {
        result[key] = incoming[key];
      }
    });
    return result;
  }

  return incomingValue !== undefined ? incomingValue : defaultValue;
}

function buildOptions(options, selectedValue) {
  return options
    .map(
      (option) =>
        `<option value="${escapeHtml(String(option.value))}" ${
          String(option.value) === String(selectedValue) ? "selected" : ""
        }>${escapeHtml(option.label)}</option>`
    )
    .join("");
}

function buildDeathDots(type, count) {
  return Array.from({ length: 3 }, (_, index) => {
    const active = index < count ? "active" : "";
    return `
      <button
        type="button"
        class="dot-toggle ${active}"
        data-death-type="${type}"
        data-index="${index}"
        aria-label="${escapeHtml(type)} ${index + 1}"
      ></button>
    `;
  }).join("");
}

function buildD20Formula(modifier) {
  return modifier >= 0 ? `1d20+${modifier}` : `1d20${modifier}`;
}

function displaySigned(value) {
  const number = numberValue(value);
  return number >= 0 ? `+${number}` : `${number}`;
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function numberValue(value, fallback = 0) {
  return Number.isFinite(Number(value)) ? Number(value) : fallback;
}

function roundToOne(value) {
  return Math.round(value * 10) / 10;
}

function createId() {
  return globalThis.crypto?.randomUUID?.() || `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function hydrateAppState(value) {
  const defaults = createDefaultAppState();
  const merged = mergeDefaults(defaults, value);
  merged.profiles = (merged.profiles || []).map((profile) => ({
    id: profile.id || createId(),
    name: profile.name || "My Character",
    data: normalizeState(mergeDefaults(createDefaultState(), profile.data)),
  }));
  if (!merged.profiles.length) {
    const fallback = createProfileWrapper("My Character", createDefaultState());
    merged.profiles = [fallback];
    merged.currentProfileId = fallback.id;
  }
  if (!merged.profiles.some((profile) => profile.id === merged.currentProfileId)) {
    merged.currentProfileId = merged.profiles[0].id;
  }
  return merged;
}

function createProfileWrapper(name, data) {
  return {
    id: createId(),
    name,
    data: normalizeState(mergeDefaults(createDefaultState(), data)),
  };
}

function getCurrentProfile() {
  return (
    appState.profiles.find((profile) => profile.id === appState.currentProfileId) ||
    appState.profiles[0]
  );
}

function getCurrentProfileState() {
  return getCurrentProfile().data;
}

function syncCurrentStateRef() {
  state = getCurrentProfileState();
}

function replaceCurrentProfile(nextState) {
  const profile = getCurrentProfile();
  profile.data = normalizeState(mergeDefaults(createDefaultState(), nextState));
  if (profile.data.basics.name) {
    profile.name = profile.data.basics.name;
  }
  syncCurrentStateRef();
  renderAll();
  scheduleSave();
}

function switchProfile(profileId) {
  if (!appState.profiles.some((profile) => profile.id === profileId)) {
    return;
  }
  appState.currentProfileId = profileId;
  syncCurrentStateRef();
  renderAll();
  scheduleSave();
}

async function createProfile() {
  const requestedName = await showPromptModal("New Character", "Enter a name:", "New Character", "Character name");
  if (requestedName === null) {
    return;
  }
  const name = requestedName.trim() || "New Character";
  const profile = createProfileWrapper(name, createDefaultState());
  profile.data.basics.name = name;
  appState.profiles.push(profile);
  appState.currentProfileId = profile.id;
  syncCurrentStateRef();
  renderAll();
  scheduleSave();
}

async function duplicateCurrentProfile() {
  const current = getCurrentProfile();
  const requestedName = await showPromptModal("Duplicate Character", "Name for the copy:", `${current.name} Copy`, "Character name");
  if (requestedName === null) {
    return;
  }
  const copy = createProfileWrapper(
    requestedName.trim() || `${current.name} Copy`,
    JSON.parse(JSON.stringify(current.data))
  );
  copy.data.basics.name = copy.name;
  appState.profiles.push(copy);
  appState.currentProfileId = copy.id;
  syncCurrentStateRef();
  renderAll();
  scheduleSave();
}

async function deleteCurrentProfile() {
  if (appState.profiles.length === 1) {
    showAlertModal("Cannot Delete", "You must keep at least one character slot.");
    return;
  }
  const current = getCurrentProfile();
  const ok = await showConfirmModal("Delete Character", `Delete character "${current.name}"?`);
  if (!ok) {
    return;
  }
  appState.profiles = appState.profiles.filter((profile) => profile.id !== current.id);
  appState.currentProfileId = appState.profiles[0].id;
  syncCurrentStateRef();
  renderAll();
  scheduleSave();
}

async function renameCurrentProfile() {
  const current = getCurrentProfile();
  const requestedName = await showPromptModal("Rename Character", "Rename current character:", current.name, "Character name");
  if (requestedName === null) {
    return;
  }
  const name = requestedName.trim() || current.name;
  current.name = name;
  state.basics.name = name;
  syncCurrentStateRef();
  renderAll();
  scheduleSave();
}

async function importProfile(parsed) {
  if (parsed && Array.isArray(parsed.profiles) && parsed.currentProfileId) {
    const ok = await showConfirmModal("Import All", "This file contains multiple characters and will replace all current slots. Continue?");
    if (!ok) {
      return;
    }
    appState = hydrateAppState(parsed);
    syncCurrentStateRef();
    renderAll();
    scheduleSave();
    return;
  }

  if (parsed && parsed.data && parsed.name) {
    const profile = createProfileWrapper(parsed.name, parsed.data);
    appState.profiles.push(profile);
    appState.currentProfileId = profile.id;
    syncCurrentStateRef();
    renderAll();
    scheduleSave();
    return;
  }

  const name = parsed?.basics?.name || "Imported Character";
  const profile = createProfileWrapper(name, parsed);
  appState.profiles.push(profile);
  appState.currentProfileId = profile.id;
  syncCurrentStateRef();
  renderAll();
  scheduleSave();
}

function normalizeState(inputState) {
  const normalized = mergeDefaults(createDefaultState(), inputState);
  const rawPortraitUrl = normalized.basics.portraitUrl;
  normalized.basics.portraitUrl = sanitizePortraitUrl(rawPortraitUrl);
  if (rawPortraitUrl && !normalized.basics.portraitUrl) {
    console.warn("Portrait URL was removed because it does not meet security requirements.");
  }
  normalized.attacks = (normalized.attacks || []).map((attack) => ({
    ...createAttack(),
    ...attack,
    proficient: attack?.proficient ?? true,
    ability: attack?.ability || "strength",
  }));
  normalized.resources = (normalized.resources || []).map((resource) => ({
    id: resource.id || createId(),
    name: resource.name || "",
    current: numberValue(resource.current),
    max: numberValue(resource.max),
    resetOn: resource.resetOn || "manual",
  }));
  normalized.spells.slots = SPELL_SLOT_LEVELS.map((level, index) => {
    const existing = normalized.spells.slots?.[index];
    return {
      id: existing?.id || createId(),
      level,
      max: numberValue(existing?.max),
      used: clamp(numberValue(existing?.used), 0, numberValue(existing?.max)),
    };
  });
  normalized.inventory = (normalized.inventory || []).map((item) => ({
    id: item.id || createId(),
    name: item.name || "",
    qty: numberValue(item.qty, 1),
    weight: numberValue(item.weight),
    notes: item.notes || "",
    carried: item.carried ?? true,
  }));
  return normalized;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function sanitizePortraitUrl(value) {
  if (!value) {
    return "";
  }

  const raw = String(value).trim();
  if (!raw) {
    return "";
  }

  if (raw.startsWith("data:image/")) {
    return raw;
  }

  try {
    const parsed = new URL(raw, window.location.href);
    if (parsed.protocol === "blob:" && parsed.origin === window.location.origin) {
      return parsed.href;
    }
    if (
      (parsed.protocol === "http:" || parsed.protocol === "https:") &&
      parsed.origin === window.location.origin
    ) {
      return parsed.href;
    }
  } catch (error) {
    return "";
  }

  return "";
}

function escapeCssUrl(value) {
  return String(value).replace(/["\\\n\r]/g, "");
}

function getAbilityLabel(key) {
  return ABILITIES.find((ability) => ability.key === key)?.label || key;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const normalized = clean.length === 3 ? clean.split("").map((char) => `${char}${char}`).join("") : clean;
  const value = Number.parseInt(normalized, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function adjustColor(hex, amount) {
  const clean = hex.replace("#", "");
  const normalized = clean.length === 3 ? clean.split("").map((char) => `${char}${char}`).join("") : clean;
  const value = Number.parseInt(normalized, 16);
  const red = clamp(((value >> 16) & 255) + amount, 0, 255);
  const green = clamp(((value >> 8) & 255) + amount, 0, 255);
  const blue = clamp((value & 255) + amount, 0, 255);
  return `#${[red, green, blue]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
