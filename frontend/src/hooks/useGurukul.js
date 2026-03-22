/**
 * useGurukul.js — Central application state manager
 *
 * Manages all state: current screen, problem, persona, wisdom response,
 * chat history, XP system, and loading/error states.
 *
 * Usage (vanilla JS module pattern):
 *   import { state, actions } from './hooks/useGurukul.js';
 *   actions.submitProblem('I cannot focus');
 */

import { fetchWisdom, switchPersona, fetchChat, fetchQuiz, fetchPersonas } from '../utils/api.js';

// ── State ──────────────────────────────────────────────────────────────────
export const state = {
  screen: 'landing',          // 'landing' | 'problem' | 'persona' | 'response' | 'learn'
  problem: '',
  persona: '',
  previousPersona: '',
  personas: {},               // metadata from /api/persona
  wisdom: null,               // { story, lesson, advice, science, actionPlan }
  wisdomSummary: '',          // 1-line summary passed to chat
  chatHistory: [],            // [{ role, content }]
  quizData: null,             // { question, options, feedback, tradition_reference }
  loading: false,
  error: null,
  xp: 0,
  level: 0,
  comingFromKnowledgeGraph: false,
  listeners: [],
};

const LEVELS = ['Seeker', 'Learner', 'Thinker', 'Philosopher', 'Acharya'];

// ── Notify listeners on state change ──────────────────────────────────────
function notify() {
  state.listeners.forEach(fn => fn({ ...state }));
}

export function subscribe(fn) {
  state.listeners.push(fn);
  return () => { state.listeners = state.listeners.filter(l => l !== fn); };
}

// ── XP System ─────────────────────────────────────────────────────────────
function addXP(amount) {
  state.xp += amount;
  if (state.xp >= 100) {
    state.xp = state.xp - 100;
    state.level = Math.min(LEVELS.length - 1, state.level + 1);
  }
  notify();
}

export function getLevelName() { return LEVELS[state.level]; }

// ── Actions ────────────────────────────────────────────────────────────────
export const actions = {

  /** Navigate to a named screen */
  goTo(screen) {
    state.screen = screen;
    state.error = null;
    if (screen === 'landing') {
      state.comingFromKnowledgeGraph = false;
    }
    notify();
  },

  setFromKnowledgeGraph(val) {
    state.comingFromKnowledgeGraph = val;
    notify();
  },

  /** Set the problem text */
  setProblem(text) {
    state.problem = text;
    notify();
  },

  /** Load all persona metadata from backend (call once on app init) */
  async loadPersonas() {
    try {
      const data = await fetchPersonas();
      state.personas = data.personas;
      notify();
    } catch (err) {
      // Non-fatal: UI falls back to hardcoded values
      console.warn('[loadPersonas] Failed:', err.message);
    }
  },

  /** Select a persona and fetch wisdom */
  async selectPersona(persona) {
    if (!state.problem.trim()) {
      state.error = 'Please enter your problem first.';
      notify();
      return;
    }

    state.persona = persona;
    state.previousPersona = '';
    state.chatHistory = [];
    state.quizData = null;
    state.loading = true;
    state.error = null;
    state.screen = 'response';
    notify();

    try {
      const data = await fetchWisdom(state.problem, persona);
      state.wisdom = data.wisdom;
      state.wisdomSummary = buildSummary(data.wisdom);
      state.loading = false;
      addXP(20);
    } catch (err) {
      state.loading = false;
      state.error = err.message;
      notify();
    }
  },

  /** Switch to a different persona — contrasting perspective */
  async switchPersona(newPersona) {
    if (newPersona === state.persona) return;

    state.previousPersona = state.persona;
    state.persona = newPersona;
    state.chatHistory = [];
    state.loading = true;
    state.error = null;
    notify();

    try {
      const data = await switchPersona(state.problem, state.previousPersona, newPersona);
      state.wisdom = data.wisdom;
      state.wisdomSummary = buildSummary(data.wisdom);
      state.loading = false;
      addXP(10);
    } catch (err) {
      state.loading = false;
      state.error = err.message;
      notify();
    }
  },

  /** Send a chat message in the sidebar */
  async sendChat(message) {
    if (!message.trim()) return;

    const userMsg = { role: 'user', content: message };
    state.chatHistory.push(userMsg);
    state.loading = true;
    notify();

    try {
      const data = await fetchChat(
        state.persona,
        message,
        state.chatHistory.slice(-10),
        state.wisdomSummary
      );
      state.chatHistory.push({ role: 'assistant', content: data.reply });
      state.loading = false;
      addXP(5);
    } catch (err) {
      state.chatHistory.push({
        role: 'assistant',
        content: 'My words failed to reach you just now. Please ask again.'
      });
      state.loading = false;
      notify();
    }
  },

  /** Load reflection quiz */
  async loadQuiz() {
    state.loading = true;
    state.error = null;
    notify();

    try {
      const data = await fetchQuiz(state.problem, state.persona);
      state.quizData = data.quiz;
      state.loading = false;
      notify();
    } catch (err) {
      state.loading = false;
      state.error = err.message;
      notify();
    }
  },

  /** Award XP for completing reflection */
  completeReflection() {
    addXP(30);
  },

  clearError() {
    state.error = null;
    notify();
  },
};

// ── Helper: build a short summary string from wisdom for chat context ──────
function buildSummary(wisdom) {
  if (!wisdom) return '';
  return `Lesson: "${wisdom.lesson}". Advice: Do — ${wisdom.advice?.do}. Avoid — ${wisdom.advice?.avoid}.`;
}
