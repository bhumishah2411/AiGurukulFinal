// Make sure you update these when you deploy to Vercel/Netlify!
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Replace the false strings with your live URLs once you deploy your backends to Render!
export const BACKEND_URL = isLocalhost
  ? 'http://localhost:3001'
  : 'https://aigurukul-auth-1.onrender.com';

export const RAG_BACKEND_URL = isLocalhost
  ? 'http://localhost:3005'
  : 'https://aigurukul-rag.onrender.com';

// Add your Google OAuth Client ID here!
export const GOOGLE_CLIENT_ID = '60293514679-jkaco6k0flrf2sbk9ng9o04m0gi7gv3f.apps.googleusercontent.com';

