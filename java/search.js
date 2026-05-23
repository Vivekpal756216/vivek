const searchInput   = document.getElementById('searchInput');
const suggestionBox = document.getElementById('suggestion-box');
if (!searchInput || !suggestionBox) throw new Error('Search elements missing');

/* ── UNIFIED DATA — saari site ka ek hi data ── */
const data = [
  /* General */
  { label: 'Palo Alto Active-Active Configuration',  id: 'palo-alto'      },
  { label: 'NAT Policy Setup Firewall',              id: 'palo-alto'      },
  { label: 'Enterprise Firewall Lab',                id: 'palo-alto'      },
  { label: 'Palo Alto NGFW Configuration',           id: 'palo-alto'      },
  { label: 'Captive Portal Modified',                id: 'palo-alto'      },
  { label: 'SSL Decryption GlobalProtect VPN',       id: 'palo-alto'      },

  { label: 'CCNA Networking Labs',                   id: 'ccna-lab'       },
  { label: 'Network Infrastructure Lab',             id: 'ccna-lab'       },
  { label: 'CCNA Routing & Switching',               id: 'ccna-lab'       },
  { label: 'OSPF VLAN EtherChannel NAT',             id: 'ccna-lab'       },
  { label: 'PNETLab Topology Design',                id: 'ccna-lab'       },

  { label: 'Check Point Security Lab',               id: 'checkpoint-lab' },
  { label: 'Check Point SmartConsole R81',           id: 'checkpoint-lab' },
  { label: 'IPS Blade S2S VPN',                      id: 'checkpoint-lab' },

  { label: 'CEH Ethical Hacking Tools',              id: 'ceh-lab'        },
  { label: 'Ethical Hacking Lab',                    id: 'ceh-lab'        },
  { label: 'CEH Kali Linux Metasploit',              id: 'ceh-lab'        },
  { label: 'Kali Linux Customization',               id: 'ceh-lab'        },
  { label: 'Nmap SQLmap Hashcat Wireshark',          id: 'ceh-lab'        },
  { label: 'VMware Network Adapter Fix',             id: 'ceh-lab'        },

  { label: 'AI-Powered Security Tools',              id: 'python-ai-lab'  },
  { label: 'Python Claude API ML Models',            id: 'python-ai-lab'  },
  { label: 'Log Analyzer Threat Detection',          id: 'python-ai-lab'  },

  { label: 'Digital Forensics Lab',                  id: 'forensic-lab'   },
  { label: 'Autopsy Volatility FTK Imager',          id: 'forensic-lab'   },

  { label: 'OSCP Penetration Lab',                   id: 'oscp-lab'       },
  { label: 'Buffer Overflow HackTheBox',             id: 'oscp-lab'       },
];

/* ── SCROLL TO CARD (projects page pe hi kaam karega) ── */
function scrollToCard(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('card-highlight');
  setTimeout(() => card.classList.remove('card-highlight'), 2000);
}

/* ── RENDER SUGGESTIONS ── */
searchInput.addEventListener('input', () => {
  const val = searchInput.value.trim().toLowerCase();
  suggestionBox.innerHTML = '';

  if (!val || val.length < 2) {
    suggestionBox.classList.remove('active');
    suggestionBox.style.display = 'none';
    return;
  }

  const matches = data.filter(item =>
    item.label.toLowerCase().includes(val)
  ).slice(0, 6);

  if (!matches.length) {
    suggestionBox.classList.remove('active');
    suggestionBox.style.display = 'none';
    return;
  }

  matches.forEach(item => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';

    /* matched text highlight */
    const idx   = item.label.toLowerCase().indexOf(val);
    const pre   = item.label.slice(0, idx);
    const match = item.label.slice(idx, idx + val.length);
    const post  = item.label.slice(idx + val.length);
    div.innerHTML = `${pre}<span class="s-match">${match}</span>${post}`;

    div.addEventListener('click', () => {
      searchInput.value = item.label;
      suggestionBox.classList.remove('active');
      suggestionBox.style.display = 'none';
      scrollToCard(item.id);
    });

    suggestionBox.appendChild(div);
  });

  suggestionBox.classList.add('active');
  suggestionBox.style.display = 'block';
});

/* ── ENTER key ── */
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    suggestionBox.classList.remove('active');
    suggestionBox.style.display = 'none';
    return;
  }
  if (e.key !== 'Enter') return;
  const val = searchInput.value.trim().toLowerCase();
  if (!val) return;
  suggestionBox.classList.remove('active');
  suggestionBox.style.display = 'none';
  const match = data.find(item => item.label.toLowerCase().includes(val));
  if (match) scrollToCard(match.id);
});

/* ── Bahar click karo — band ho jaye ── */
document.addEventListener('click', (e) => {
  if (!suggestionBox.contains(e.target) && e.target !== searchInput) {
    suggestionBox.classList.remove('active');
    suggestionBox.style.display = 'none';
  }
});