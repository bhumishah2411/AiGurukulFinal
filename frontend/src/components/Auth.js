import { state, actions } from '../hooks/useGurukul.js';
import { GOOGLE_CLIENT_ID } from '../config.js';

export function renderAuth(container) {
  let isLogin = true;
  let username = '';
  let password = '';
  let error = '';
  let showPass = false;

  const MANDALA = `
  <svg viewBox="0 0 200 200" class="auth-master-bg-mandala">
    <circle cx="100" cy="100" r="98" stroke="var(--gold-border)" stroke-width="0.1" fill="none" opacity="0.3" />
    <circle cx="100" cy="100" r="85" stroke="var(--gold-border)" stroke-width="0.1" fill="none" class="auth-spin-slow" />
    <circle cx="100" cy="100" r="70" stroke="var(--gold-border)" stroke-width="0.1" fill="none" class="auth-spin-fast" />
    <path d="M 100,0 L 100,200 M 0,100 L 200,100" stroke="var(--gold-border)" stroke-width="0.05" opacity="0.2" />
  </svg>`;

  function update() {
    container.innerHTML = `
      <div class="auth-split-container">
        <!-- 🏛️ Left Pane: Authentication Interface -->
        <div class="auth-left-pane">
          <div class="auth-left-content">
            <div class="auth-brand-section">
              <div class="auth-logo-icon">🪔</div>
              <h1 class="brand-title-v4">AI GURUKUL</h1>
              <div class="brand-divider"></div>
              <p class="brand-tagline-v4">Seeker Portal</p>
            </div>

            <div class="auth-box-v4">
              <h2 class="auth-title">${isLogin ? 'Log in to your account' : 'Create an account'}</h2>
              <p class="auth-subtitle">${isLogin ? 'Continue your quest for ancient wisdom' : 'Start your legacy and unlock ancient knowledge'}</p>

              <!-- Google Authentication Button -->
              <div id="google-signin-btn-wrapper">
                <div id="google-signin-btn"></div>
              </div>

              <div class="auth-divider-v4">
                <span>or with username and password</span>
              </div>

              <form id="auth-form-master" class="auth-main-form">
                <div class="auth-input-group-v4">
                  <label>SEEKER USERNAME</label>
                  <div class="auth-input-rel">
                    <input type="text" id="username" value="${username}" placeholder="Enter Name" required />
                    <span class="auth-field-icon">👤</span>
                  </div>
                </div>

                <div class="auth-input-group-v4">
                  <label>SECRET PASSWORD</label>
                  <div class="auth-input-rel">
                    <input type="${showPass ? 'text' : 'password'}" id="password" value="${password}" placeholder="Enter Password" required />
                    <span class="auth-field-icon">🔑</span>
                    <button type="button" id="toggle-password-v4" class="auth-eye-btn">
                      ${showPass ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>

                ${state.error || error ? `<div class="auth-feedback-error anim-shake">${state.error || error}</div>` : ''}

                <button type="submit" class="auth-primary-btn-v4">
                  ${isLogin ? 'ENTER THE GURUKUL' : 'CLAIM YOUR CITIZENSHIP'}
                </button>
              </form>

              <div class="auth-footer-v4">
                <p>${isLogin ? 'FIRST TIME HERE?' : 'ALREADY A SEEKER?'}</p>
                <button id="auth-switch-btn-v4" class="auth-ghost-link">
                  ${isLogin ? 'CREATE NEW ACCOUNT' : 'LOG IN TO ACCOUNT'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ☸️ Right Pane: Artistic Showcase -->
        <div class="auth-right-pane">
          <div class="auth-bg-wheel">
            ${MANDALA}
          </div>

          <div class="auth-showcase-content anim-fade-up">
            <h2 class="showcase-heading">Explore Upcoming Events & Ancient Knowledge</h2>
            <p class="showcase-desc">Connect with history's greatest teachers and philosophers to acquire the skills and wisdom needed for a modern generation of seekers.</p>
            
            <div class="auth-features-list">
              <div class="feature-item-v4">
                <span class="feature-icon-v4">🏛️</span>
                <div class="feature-text-v4">
                  <h4>Philosophical Wisdom</h4>
                  <p>Seek advice grounded in the teachings of the Ramayana, Mahabharata, and Gita.</p>
                </div>
              </div>

              <div class="feature-item-v4">
                <span class="feature-icon-v4">🧩</span>
                <div class="feature-text-v4">
                  <h4>Quests & Challenges</h4>
                  <p>Embark on gamified quests, answer daily quizzes, and grow your learner status.</p>
                </div>
              </div>

              <div class="feature-item-v4">
                <span class="feature-icon-v4">🌿</span>
                <div class="feature-text-v4">
                  <h4>Ayurveda & Health</h4>
                  <p>Unlock traditional insights to build a balanced, healthy mind and body.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Events
    container.querySelector('#auth-form-master').onsubmit = async (e) => {
      e.preventDefault();
      username = container.querySelector('#username').value;
      password = container.querySelector('#password').value;
      error = '';
      actions.clearError();
      
      const btn = container.querySelector('.auth-primary-btn-v4');
      btn.innerHTML = '<span class="guru-loader"></span>';
      btn.disabled = true;

      const res = isLogin 
        ? await actions.login(username, password)
        : await actions.signup(username, password);
      
      if (!res.success) {
        error = res.message;
        update();
      }
    };

    container.querySelector('#auth-switch-btn-v4').onclick = () => {
      isLogin = !isLogin;
      error = '';
      actions.clearError();
      update();
    };

    container.querySelector('#toggle-password-v4').onclick = () => {
      showPass = !showPass;
      username = container.querySelector('#username').value;
      password = container.querySelector('#password').value;
      update();
    };

    // Initialize and Render Google Sign-in Button
    setTimeout(() => {
      const btnWrapper = container.querySelector('#google-signin-btn');
      if (btnWrapper && window.google) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: async (response) => {
              btnWrapper.innerHTML = '<span class="guru-loader"></span>';
              const result = await actions.loginWithGoogle(response.credential);
              if (!result.success) {
                update();
              }
            }
          });
          
          window.google.accounts.id.renderButton(
            btnWrapper,
            { 
              theme: 'outline', 
              size: 'large', 
              text: 'continue_with',
              shape: 'rectangular'
            }
          );
        } catch (err) {
          console.error("Google Sign-In initialization failed:", err);
        }
      }
    }, 150);
  }

  update();
}
