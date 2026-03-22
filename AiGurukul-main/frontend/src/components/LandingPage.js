/**
 * LandingPage.js
 * Renders the #screen-landing element.
 * Called once on init; re-renders when state.screen === 'landing'.
 */

import { actions } from '../hooks/useGurukul.js';

const MANDALA_SVG = `
<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="mandala-svg">
  <circle cx="60" cy="60" r="56" stroke="#D4AF37" stroke-width="0.5" opacity="0.4"/>
  <circle cx="60" cy="60" r="44" stroke="#D4AF37" stroke-width="0.5" opacity="0.3"/>
  <circle cx="60" cy="60" r="32" stroke="#D4AF37" stroke-width="0.5" opacity="0.3"/>
  <circle cx="60" cy="60" r="6" fill="#D4AF37" opacity="0.6"/>
  <g stroke="#D4AF37" stroke-width="0.6" opacity="0.5">
    <line x1="60" y1="4"  x2="60" y2="28"/>
    <line x1="60" y1="92" x2="60" y2="116"/>
    <line x1="4"  y1="60" x2="28" y2="60"/>
    <line x1="92" y1="60" x2="116" y2="60"/>
    <line x1="19.4" y1="19.4" x2="36.5" y2="36.5"/>
    <line x1="83.5" y1="83.5" x2="100.6" y2="100.6"/>
    <line x1="100.6" y1="19.4" x2="83.5" y2="36.5"/>
    <line x1="36.5"  y1="83.5" x2="19.4" y2="100.6"/>
  </g>
  <polygon points="60,20 68,48 96,48 73,64 81,92 60,76 39,92 47,64 24,48 52,48"
    fill="#D4AF37" opacity="0.06"/>
</svg>`;

export function renderLanding(container) {
  container.innerHTML = `
    <div class="landing-inner">
      <div class="landing-mandala anim-drift">${MANDALA_SVG}</div>

      <p class="landing-eyebrow">AI Gurukul</p>
      <h1 class="landing-title">Stuck in life?<br>Ask 5000 years<br>of wisdom.</h1>
      <p class="landing-subtitle">Ancient knowledge · Modern solutions</p>

      <div class="gold-divider" style="width:80px;margin:2rem auto"></div>

      <p class="landing-tagline">
        Not just learning —
        <em>solving real-life problems</em>
        using the timeless wisdom of India.
      </p>

      <div class="mode-grid">
        <button class="mode-card" id="btn-learn">
          <span class="mode-icon">📖</span>
          <span class="mode-title">Learn Concepts</span>
          <span class="mode-desc">Explore Gita, Panchatantra, and Ayurveda with stories and real-life meaning.</span>
        </button>

        <button class="mode-card featured" id="btn-solve">
          <span class="featured-tag">Core Feature</span>
          <span class="mode-icon">🧠</span>
          <span class="mode-title">Solve My Problem</span>
          <span class="mode-desc">Tell us what's bothering you. Get ancient wisdom + modern action steps.</span>
        </button>

        <button class="mode-card" id="btn-chat">
          <span class="mode-icon">💬</span>
          <span class="mode-title">Chat with Guru</span>
          <span class="mode-desc">Have a conversation with a wise persona and get personalised guidance.</span>
        </button>
      </div>
    </div>
  `;

  container.querySelector('#btn-solve').addEventListener('click', () => actions.goTo('problem'));
  container.querySelector('#btn-chat').addEventListener('click',  () => actions.goTo('problem'));
  container.querySelector('#btn-learn').addEventListener('click', () => actions.goTo('learn'));
}
