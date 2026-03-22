/**
 * ProblemInput.js
 * Renders the problem entry screen.
 */

import { state, actions } from '../hooks/useGurukul.js';

const EXAMPLES = [
  { label: '📚 Can\'t focus on studies',   text: 'I can\'t focus on my studies, my mind keeps wandering.' },
  { label: '💔 Fight with a friend',        text: 'I had a serious fight with my best friend and don\'t know how to fix it.' },
  { label: '🧭 Career confusion',           text: 'I am confused about my career path and feel lost.' },
  { label: '😰 Anxiety & restlessness',     text: 'I feel anxious and restless all the time and can\'t calm down.' },
  { label: '⏰ Procrastination',            text: 'I keep procrastinating on important work and hate myself for it.' },
];

export function renderProblemInput(container) {
  // If already rendered and not switching screens, just update char count/error
  const existingTextarea = container.querySelector('#problem-textarea');
  if (existingTextarea) {
    const charCount = container.querySelector('#char-count');
    if (charCount) charCount.textContent = `${state.problem.length} / 500`;
    
    const errorMsg = container.querySelector('.error-msg');
    if (state.error) {
       if (!errorMsg) {
         const p = document.createElement('p');
         p.className = 'error-msg';
         p.textContent = state.error;
         container.querySelector('.problem-body').insertBefore(p, container.querySelector('#next-btn'));
       } else {
         errorMsg.textContent = state.error;
       }
    } else if (errorMsg) {
      errorMsg.remove();
    }
    return;
  }

  container.innerHTML = `
    <div class="screen-header">
      <button class="btn btn-ghost" id="back-btn">← Back</button>
      <span class="screen-header-title">What's bothering you?</span>
    </div>

    <div class="problem-body">
      <h2 class="anim-fade-up">Share your situation</h2>
      <p class="anim-fade-up delay-1">Be as open as you like — the guru listens without judgment.</p>

      <textarea
        class="textarea anim-fade-up delay-2"
        id="problem-textarea"
        rows="4"
        placeholder="E.g. I can't focus on my studies. My mind keeps wandering and I feel guilty but still can't stop…"
        maxlength="500"
      >${state.problem}</textarea>

      <div class="char-count" id="char-count">${state.problem.length} / 500</div>

      <div class="example-chips anim-fade-up delay-3">
        ${EXAMPLES.map((e, i) => `
          <button class="chip example-chip" data-index="${i}">${e.label}</button>
        `).join('')}
      </div>

      <div id="error-container">
        ${state.error ? `<p class="error-msg">${state.error}</p>` : ''}
      </div>

      <button class="btn btn-primary anim-fade-up delay-4" id="next-btn">
        Choose Your Guru →
      </button>
    </div>
  `;

  const textarea = container.querySelector('#problem-textarea');
  const charCount = container.querySelector('#char-count');
  const nextBtn   = container.querySelector('#next-btn');

  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    charCount.textContent = `${len} / 500`;
    actions.setProblem(textarea.value);
  });

  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) nextBtn.click();
  });

  container.querySelectorAll('.example-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const idx = parseInt(chip.dataset.index);
      textarea.value = EXAMPLES[idx].text;
      textarea.dispatchEvent(new Event('input'));
      textarea.focus();
    });
  });

  nextBtn.addEventListener('click', () => {
    const val = textarea.value.trim();
    if (val.length < 5) {
      textarea.classList.add('input-error');
      textarea.focus();
      setTimeout(() => textarea.classList.remove('input-error'), 1200);
      return;
    }
    actions.setProblem(val);
    actions.goTo('persona');
  });

  container.querySelector('#back-btn').addEventListener('click', () => actions.goTo('landing'));

  // Auto focus
  setTimeout(() => textarea.focus(), 100);
}
