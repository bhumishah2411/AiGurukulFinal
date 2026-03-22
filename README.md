# AI Gurukul — Project Structure

```
ai-gurukul/
├── frontend/                    ← Person 1
│   ├── index.html               Main entry
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.js   Landing screen
│   │   │   ├── ProblemInput.js  Problem entry
│   │   │   ├── PersonaSelect.js Persona cards
│   │   │   ├── ResponseCards.js 5-card response
│   │   │   ├── ChatSidebar.js   Sidebar chat
│   │   │   ├── ReflectionQuiz.js Quiz widget
│   │   │   └── XPSystem.js      Level + XP bar
│   │   ├── hooks/
│   │   │   └── useGurukul.js    State + API calls
│   │   ├── utils/
│   │   │   └── api.js           All fetch helpers
│   │   └── styles/
│   │       └── main.css         Global dark-gold theme
│   └── package.json
│
└── backend/                     ← Person 2
    ├── server.js                Express entry
    ├── routes/
    │   ├── wisdom.js            POST /api/wisdom
    │   ├── persona.js           POST /api/persona
    │   ├── chat.js              POST /api/chat
    │   └── quiz.js              POST /api/quiz
    ├── prompts/
    │   ├── wisdomEngine.js      Core 5-section prompt
    │   ├── personaSwitch.js     Switch persona prompt
    │   ├── chatContinuation.js  Sidebar chat prompt
    │   ├── personaMeta.js       UI metadata prompt
    │   └── reflectionQuiz.js   Quiz generator prompt
    ├── middleware/
    │   └── validate.js          Input validation
    ├── utils/
    │   └── anthropic.js         Claude API wrapper
    ├── .env.example
    └── package.json
```

## Quick Start

### Backend (Person 2 runs first)
```bash
cd backend
npm install
cp .env.example .env        # add your ANTHROPIC_API_KEY
node server.js              # runs on :3001
```

### Frontend (Person 1)
```bash
cd frontend
npm install
npm start                   # runs on :3000
```
