// Make sure you update these when you deploy to Vercel/Netlify!
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Replace the false strings with your live URLs once you deploy your backends to Render!
export const BACKEND_URL = isLocalhost
  ? 'http://localhost:3001'
  : 'https://aigurukul-auth-1.onrender.com';

export const RAG_BACKEND_URL = isLocalhost
  ? 'http://localhost:3005'
  : 'https://aigurukul-rag.onrender.com';
