/* ═══════════════════════════════════════════════════════════════
   projects.js — Vivek Pal | Labs Console
   Path: java/labs/projects.js

   ⚠️  Order change karne ke liye yeh file mat chhuo —
       sirf lab-config.js mein LAB_ORDER array edit karo
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────
   PROJECT ROUTES — sirf URLs yahan hain
────────────────────────────────────────── */
const PROJECT_ROUTES = {
  'palo-alto':      '../../html-file/lab-html/palo-alto-lab.html',
  'ccna-lab':       '../../html-file/lab-html/ccna-lab.html',
  'checkpoint-lab': '../../html-file/lab-html/checkpoint-lab.html',
  'ceh-lab':        '../../html-file/lab-html/ceh-lab.html',
  'python-ai-lab':  '../../html-file/lab-html/python-ai-lab.html',
  'forensic-lab':   null,
  'oscp-lab':       null,
};

/* ══════════════════════════════════════════════════════════════
   REORDER CARDS — lab-config.js ke LAB_ORDER se cards sort karo
══════════════════════════════════════════════════════════════ */
function applyLabOrder() {
  if (typeof LAB_ORDER === 'undefined' || !Array.isArray(LAB_ORDER)) {
    console.warn('lab-config.js load nahi hua ya LAB_ORDER missing hai');
    return;
  }
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  LAB_ORDER.forEach(id => {
    const card = document.getElementById(id);
    if (card) {
      const wrap = card.closest('.card-wrap');
      if (wrap) grid.appendChild(wrap);
      else console.warn(`card-wrap nahi mila: #${id}`);
    } else {
      console.warn(`Card not found: #${id} — lab-config.js mein ID check karo`);
    }
  });
}

/* ──────────────────────────────────────────
   TOAST
────────────────────────────────────────── */
function showToast(msg) {
  const toast = document.getElementById('toastNotif');
  const msgEl = document.getElementById('toastMsg');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ──────────────────────────────────────────
   OPEN PROJECT
────────────────────────────────────────── */
function openProject(projectId) {
  const route = PROJECT_ROUTES[projectId];
  if (!route) {
    const messages = {
      'forensic-lab': '🔍 Digital Forensics lab coming soon — stay tuned!',
      'oscp-lab':     '⚔️ OSCP Prep lab launching after CEH — coming soon!',
    };
    showToast(messages[projectId] || '🚧 This lab is under construction!');
    return;
  }
  document.body.style.transition = 'opacity 0.35s ease';
  document.body.style.opacity = '0';
  setTimeout(() => { window.location.href = route; }, 340);
}

/* ──────────────────────────────────────────
   SCROLL TO CARD
   search.js bhi yahi function use karta hai
────────────────────────────────────────── */
function scrollToCard(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('card-highlight');
  setTimeout(() => card.classList.remove('card-highlight'), 2000);
}

/* ──────────────────────────────────────────
   CARD HOVER GLOW
────────────────────────────────────────── */
function initMouseGlow() {
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    });
  });
}

/* ──────────────────────────────────────────
   PAGE ENTRY
────────────────────────────────────────── */
function initPageEntry() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  }));
}

/* ──────────────────────────────────────────
   INIT
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyLabOrder();
  initPageEntry();
  initMouseGlow();
  // ✅ initSuggestions() hata diya — search.js handle karta hai ab
});