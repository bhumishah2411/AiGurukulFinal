const fs = require('fs');
const indexFile = 'c:\\Users\\Neel_Patel\\OneDrive\\Desktop\\project\\AiGurukul\\frontend\\index.html';
const dataFile = 'c:\\Users\\Neel_Patel\\OneDrive\\Desktop\\project\\AiGurukul\\frontend\\learning_data.js';

let html = fs.readFileSync(indexFile, 'utf8');
let jsCode = fs.readFileSync(dataFile, 'utf8');

// 1. Replace CSS
const newCSS = `/* Learn screen */
    #screen-learn {
      background: var(--bg);
      overflow-y: auto;
    }
    
    .topic-tabs{display:flex;gap:0;border-bottom:1px solid var(--gold-border);padding:0 28px;overflow-x:auto}
    .tab-btn{background:none;border:none;border-bottom:2px solid transparent;padding:14px 24px;font-family:'Cinzel',serif;font-size:13px;color:var(--text-dim);cursor:pointer;transition:all .2s;white-space:nowrap;margin-bottom:-1px}
    .tab-btn:hover{color:var(--text-muted)}
    .tab-btn.active{color:var(--gold);border-bottom-color:var(--gold)}

    .topic-header{padding:32px 28px 24px;max-width:900px;margin:0 auto}
    .topic-eyebrow{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--gold-dim);margin-bottom:8px}
    .topic-name{font-family:'Cinzel',serif;font-size:32px;color:var(--gold);margin-bottom:10px}
    .topic-meta{display:flex;gap:20px;flex-wrap:wrap;margin-bottom:16px}
    .meta-pill{font-size:12px;color:var(--text-dim);background:var(--surface);border:1px solid var(--gold-border);border-radius:20px;padding:4px 14px}
    .topic-desc{font-size:15px;color:var(--text-muted);line-height:1.8;max-width:680px}

    .section-title{font-family:'Cinzel',serif;font-size:14px;letter-spacing:2px;text-transform:uppercase;color:var(--gold-dim);padding:0 28px;margin-bottom:16px;max-width:900px;margin-left:auto;margin-right:auto}
    .cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;padding:0 28px 40px;max-width:900px;margin:0 auto}

    .learn-card{background:var(--surface);border:1px solid var(--gold-border);border-radius:var(--r-lg);padding:22px;cursor:pointer;transition:all .3s;position:relative;overflow:hidden;text-align:left;}
    .learn-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--gold-dim);border-radius:3px 0 0 3px;transition:background .2s}
    .learn-card:hover{border-color:var(--gold-border-hi);transform:translateY(-3px)}
    .learn-card:hover::before{background:var(--gold)}

    .card-num{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--text-dim);margin-bottom:6px}
    .card-sanskrit{font-family:'Noto Sans Devanagari','Cinzel',serif;font-size:17px;color:var(--gold);line-height:1.5;margin-bottom:4px}
    .card-roman{font-size:12px;color:var(--text-dim);font-style:italic;margin-bottom:10px}
    .card-divider{height:1px;background:linear-gradient(90deg,var(--gold-dim),transparent);opacity:.3;margin:10px 0}
    .card-english{font-size:14px;color:var(--text-muted);line-height:1.7;margin-bottom:10px}
    .card-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
    .card-tag{font-size:11px;padding:3px 10px;border-radius:20px;background:var(--gold-faint);border:1px solid rgba(212,175,55,0.2);color:var(--gold-dim)}

    .card-detail{display:none;margin-top:14px;padding-top:14px;border-top:1px solid var(--gold-border);text-align:left;}
    .card-detail.open{display:block}
    .detail-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--text-dim);margin-bottom:4px}
    .detail-text{font-size:13px;color:var(--text-muted);line-height:1.75;margin-bottom:12px}
    .detail-shloka{font-family:'Noto Sans Devanagari',serif;font-size:15px;color:var(--gold);line-height:1.8;background:var(--gold-faint);border-left:3px solid var(--gold-dim);padding:12px 16px;border-radius:0 var(--r-sm) var(--r-sm) 0;margin-bottom:8px;text-align:left;}
    .detail-shloka-trans{font-size:12px;color:var(--text-dim);font-style:italic;line-height:1.6;margin-bottom:12px}

    .toggle-btn{font-size:12px;color:var(--gold-dim);background:none;border:none;cursor:pointer;font-family:'Lato',sans-serif;padding:4px 0;transition:color .2s;display:block;margin-top:10px;}
    .toggle-btn:hover{color:var(--gold)}

    .herb-card .learn-card::before{background:#3A9B8C}
    .herb-rating{display:flex;gap:3px;margin-bottom:8px}
    .herb-dot{width:8px;height:8px;border-radius:50%;background:var(--gold-dim)}
    .herb-dot.active{background:var(--gold)}

    .story-num{font-family:'Cinzel',serif;font-size:28px;color:var(--gold-dim);opacity:.4;position:absolute;top:16px;right:20px}

    .info-banner{margin:0 28px 24px;max-width:900px;margin-left:auto;margin-right:auto;background:var(--gold-faint);border:1px solid var(--gold-border);border-radius:var(--r-md);padding:14px 20px;font-size:13px;color:var(--text-muted);line-height:1.6;text-align:left;}
    .info-banner strong{color:var(--gold)}

    .topic-panel{display:none}
    .topic-panel.active{display:block}

    @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    .learn-card{animation:fadeUp .4s ease both}`;

html = html.replace(/(\/\* Learn screen \*\/)[\s\S]*?(?=\/\* XP Toast \*\/)/, '$1\n' + newCSS + '\n\n    ');

// 2. Replace HTML
const refHTML = `<!-- ── Learn ─────────────────────────────────────────── -->
  <div id="screen-learn" class="screen" style="flex-direction:column; overflow-y:auto; display:none;">
    <div class="screen-header" style="position:sticky; top:0; z-index:10; background:var(--bg);">
      <button class="btn btn-ghost" id="learn-back-btn">← Back</button>
      <span class="screen-header-title">Ancient Knowledge</span>
    </div>

    <div class="topic-tabs">
      <button class="tab-btn active" onclick="window.showTopic('gita',this)">🪷 Bhagavad Gita</button>
      <button class="tab-btn" onclick="window.showTopic('panchatantra',this)">🐘 Panchatantra</button>
      <button class="tab-btn" onclick="window.showTopic('ayurveda',this)">🌿 Ayurveda</button>
      <button class="tab-btn" onclick="window.showTopic('arthashastra',this)">⚖️ Arthashastra</button>
    </div>

    <!-- BHAGAVAD GITA -->
    <div class="topic-panel active" id="panel-gita">
      <div class="topic-header">
        <div class="topic-eyebrow">Sacred Scripture</div>
        <div class="topic-name">Bhagavad Gita</div>
        <div class="topic-meta">
          <span class="meta-pill">✍️ Vyasa (Krishna–Arjuna dialogue)</span>
          <span class="meta-pill">📅 ~500 BCE – 200 BCE</span>
          <span class="meta-pill">📖 18 Chapters · 700 Shlokas</span>
          <span class="meta-pill">🌐 Part of Mahabharata</span>
        </div>
        <div class="topic-desc">The Bhagavad Gita is a 700-verse dialogue between Prince Arjuna and Lord Krishna on the battlefield of Kurukshetra. It covers duty (dharma), action (karma), devotion (bhakti), and the nature of the self (atman). Each of the 18 chapters (adhyayas) focuses on a different path to liberation.</div>
      </div>
      <div class="section-title">All 18 Chapters (Adhyayas)</div>
      <div class="cards-grid" id="gita-cards"></div>
    </div>

    <!-- PANCHATANTRA -->
    <div class="topic-panel" id="panel-panchatantra">
      <div class="topic-header">
        <div class="topic-eyebrow">Ancient Fables</div>
        <div class="topic-name">Panchatantra</div>
        <div class="topic-meta">
          <span class="meta-pill">✍️ Vishnu Sharma</span>
          <span class="meta-pill">📅 ~300 BCE</span>
          <span class="meta-pill">📖 5 Books · 84 Stories</span>
          <span class="meta-pill">🌐 Translated into 50+ languages</span>
        </div>
        <div class="topic-desc">Panchatantra means "Five Treatises." Written by the scholar Vishnu Sharma to teach political wisdom, diplomacy, and practical life skills to young princes — using animal stories as vehicles for deep human truths. It is one of the most widely translated books in history after the Bible.</div>
      </div>
      <div class="info-banner">
        <strong>Pancha = Five &nbsp;·&nbsp; Tantra = Treatise.</strong> &nbsp; Each of the 5 books (Tantras) has a frame story with smaller stories nested inside — like a story within a story.
      </div>
      <div class="section-title">5 Books (Tantras) with Key Stories</div>
      <div class="cards-grid" id="pancha-cards"></div>
    </div>

    <!-- AYURVEDA -->
    <div class="topic-panel" id="panel-ayurveda">
      <div class="topic-header">
        <div class="topic-eyebrow">Ancient Medicine</div>
        <div class="topic-name">Ayurveda</div>
        <div class="topic-meta">
          <span class="meta-pill">✍️ Charaka, Sushruta, Vagbhata</span>
          <span class="meta-pill">📅 ~1500 BCE</span>
          <span class="meta-pill">📖 Science of Life</span>
          <span class="meta-pill">🌐 WHO-recognized traditional medicine</span>
        </div>
        <div class="topic-desc">Ayurveda (आयुर्वेद) means "Science of Life" — Ayu (life) + Veda (knowledge). It is the world's oldest holistic healing system, built on the balance of three bio-energies: Vata (air+space), Pitta (fire+water), Kapha (earth+water). Each herb has a specific rasa (taste), guna (quality), and karma (action on the body).</div>
      </div>
      <div class="info-banner">
        <strong>How to read these cards:</strong> &nbsp; Sanskrit name → what it is → when to use it → how to use it → modern science connection.
      </div>
      <div class="section-title">Key Herbs & Medicines</div>
      <div class="cards-grid" id="ayur-cards"></div>
    </div>

    <!-- ARTHASHASTRA -->
    <div class="topic-panel" id="panel-arthashastra">
      <div class="topic-header">
        <div class="topic-eyebrow">Political Science</div>
        <div class="topic-name">Arthashastra</div>
        <div class="topic-meta">
          <span class="meta-pill">✍️ Chanakya (Kautilya)</span>
          <span class="meta-pill">📅 ~300 BCE</span>
          <span class="meta-pill">📖 15 Books · 6000 Sutras</span>
          <span class="meta-pill">🌐 Rediscovered 1905 CE</span>
        </div>
        <div class="topic-desc">The Arthashastra is Chanakya's masterwork on statecraft, economic policy, military strategy, and governance. Written for rulers but applicable to any leader. It was lost for over 1000 years and rediscovered in 1905 by scholar R. Shamasastry. Each of its 15 books covers a different domain of power.</div>
      </div>
      <div class="section-title">15 Books (Adhikaranas)</div>
      <div class="cards-grid" id="artha-cards"></div>
    </div>
  </div>`;

html = html.replace(/<!-- ── Learn ─────────────────────────────────────────── -->[\s\S]*?(?=<script type="module">)/, refHTML + '\n\n  ');

// 3. Replace JS wiring
const extractedJS = "// ── Learn screen wiring ────────────────────────────────────\n" +
  jsCode;

html = html.replace(/\/\/ ── Learn screen wiring ────────────────────────────────────[\s\S]*?(?=\/\/ ── Init ───────────────────────────────────────────────────)/, extractedJS + '\n    ');

fs.writeFileSync(indexFile, html);
console.log("Updated index.html directly from file!");
