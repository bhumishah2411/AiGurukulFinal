import { state, actions } from '../hooks/useGurukul.js';

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
      <div class="auth-master-container">
        <!-- 🏛️ The Background Wisdom Wheel -->
        <div class="auth-bg-wheel">
          ${MANDALA}
        </div>

        <!-- 📜 The Central Auth Scroll -->
        <div class="auth-master-card anim-fade-up">
          <div class="auth-brand-section">
            <div class="auth-logo-icon">🪔</div>
            <h1 class="brand-title-v4">AI GURUKUL</h1>
            <div class="brand-divider"></div>
            <p class="brand-tagline-v4">${isLogin ? 'RESUME YOUR QUEST' : 'START YOUR LEGACY'}</p>
          </div>

          <form id="auth-form-master" class="auth-main-form">
            <div class="auth-input-group-v4">
              <label>SEEKER USERNAME</label>
              <div class="auth-input-rel">
                <input type="text" id="username" value="${username}" placeholder="Ex: seeker_arjun" required />
                <span class="auth-field-icon">👤</span>
              </div>
            </div>

            <div class="auth-input-group-v4">
              <label>SECRET PASSWORD</label>
              <div class="auth-input-rel">
                <input type="${showPass ? 'text' : 'password'}" id="password" value="${password}" placeholder="••••••••" required />
                <span class="auth-field-icon">🔑</span>
                <button type="button" id="toggle-password-v4" class="auth-eye-btn">
                  ${showPass ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            ${error ? `<div class="auth-feedback-error anim-shake">${error}</div>` : ''}

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
    `;

    // Events
    container.querySelector('#auth-form-master').onsubmit = async (e) => {
      e.preventDefault();
      username = container.querySelector('#username').value;
      password = container.querySelector('#password').value;
      error = '';
      
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
      update();
    };

    container.querySelector('#toggle-password-v4').onclick = () => {
      showPass = !showPass;
      username = container.querySelector('#username').value;
      password = container.querySelector('#password').value;
      update();
    };
  }

  update();
}
