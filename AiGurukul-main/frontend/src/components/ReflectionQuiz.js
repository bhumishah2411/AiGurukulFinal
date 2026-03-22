/**
 * ReflectionQuiz.js
 * Renders the reflection quiz card.
 * Injected into #quiz-container on the response screen.
 */

import { state, actions } from '../hooks/useGurukul.js';

export function renderReflectionQuiz(container) {
  const quiz = state.quizData;
  if (!quiz) return;

  container.innerHTML = `
    <div class="response-card quiz-card anim-fade-up" style="border-color:var(--gold-dim)">
      <div class="card-header">
        <span class="card-icon">🪞</span>
        <span class="card-label">Reflection</span>
        <span class="tradition-tag">${quiz.tradition_reference || ''}</span>
      </div>

      <p class="quiz-question">${quiz.question}</p>

      <div class="quiz-options" id="quiz-options">
        ${quiz.options.map((opt, i) => `
          <button class="quiz-option" data-index="${i}">
            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
            <span class="option-text">${opt}</span>
          </button>
        `).join('')}
      </div>

      <div class="quiz-feedback" id="quiz-feedback" style="display:none"></div>
    </div>
  `;

  container.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);

      // Mark all options
      container.querySelectorAll('.quiz-option').forEach((b, i) => {
        b.disabled = true;
        b.classList.remove('selected');
        if (i === idx) b.classList.add('selected');
        else b.classList.add('dimmed');
      });

      // Show feedback
      const feedbackEl = container.querySelector('#quiz-feedback');
      feedbackEl.style.display = 'block';
      feedbackEl.innerHTML = `
        <div class="feedback-inner anim-fade-up">
          <span class="feedback-icon">✨</span>
          <p>${quiz.feedback[idx]}</p>
        </div>
      `;

      actions.completeReflection();
    });
  });
}
