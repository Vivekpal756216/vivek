/* ═══════════════════════════════════════════════════════════════
   lab-config.js — Vivek Pal | Labs Order Config
   Path: java/labs/lab-config.js

   ✅ SIRF YEH FILE EDIT KARO — order change karne ke liye
   ✅ Jis number pe jo lab ho, woh position pe wahi card aayega
   ✅ HTML/CSS chhuna nahi padega kabhi
═══════════════════════════════════════════════════════════════ */

const LAB_ORDER = [
  'ccna-lab',
  'palo-alto',
  'checkpoint-lab',
  'ceh-lab',
  'python-ai-lab',
  'forensic-lab',
  'oscp-lab',
  // azure-lab — hata diya ✅
];
/*
  ── HOW TO REORDER ──────────────────────────────────────────
  Bas array mein naam ki jagah badlo. Example:

  Agar CEH ko pehle dikhana ho:
  const LAB_ORDER = [
    'ceh-lab',
    'palo-alto',
    'ccna-lab',
    'checkpoint-lab',
    'python-ai-lab',
    'forensic-lab',
    'oscp-lab',
  ];

  Available IDs (sab yahan hain, koi miss mat karna):
  • palo-alto
  • ccna-lab
  • checkpoint-lab
  • ceh-lab
  • python-ai-lab
  • forensic-lab
  • oscp-lab
  ────────────────────────────────────────────────────────── */