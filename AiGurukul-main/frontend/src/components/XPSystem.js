/**
 * XPSystem.js
 * Renders and updates the XP bar in the screen header.
 * Also handles level-up toast notification.
 */

import { state, getLevelName } from '../hooks/useGurukul.js';

export function renderXPBar(container) {
  container.innerHTML = `
    <div class="xp-wrap">
      <span class="xp-label">XP</span>
      <div class="xp-track">
        <div class="xp-fill" id="xp-fill" style="width:${state.xp}%"></div>
      </div>
      <span class="xp-level" id="xp-level">${getLevelName()}</span>
    </div>
  `;
}

export function updateXPBar() {
  const fill  = document.getElementById('xp-fill');
  const label = document.getElementById('xp-level');
  if (fill)  fill.style.width  = state.xp + '%';
  if (label) label.textContent = getLevelName();
}

export function showLevelUpToast(levelName) {
  const existing = document.getElementById('level-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'level-toast';
  toast.className = 'level-toast anim-fade-up';
  toast.innerHTML = `
    <span class="toast-icon">🎉</span>
    <div>
      <strong>Level Up!</strong>
      <p>You are now a <em>${levelName}</em></p>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('hiding'), 3000);
  setTimeout(() => toast.remove(), 3600);
}
