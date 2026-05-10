const searchInput = document.getElementById('searchInput');
const suggestionBox = document.getElementById('suggestion-box');

// Tera Real Project Data
const data = [
    "Palo Alto Active-Active Configuration",
    "NAT Policy Setup Firewall",
    "CCNA Networking Labs",
    "CEH Ethical Hacking Tools",
    "PNETLab Topology Design",
    "Kali Linux Customization",
    "VMware Network Adapter Fix"
];

searchInput.addEventListener('input', () => {
    let input = searchInput.value.toLowerCase();
    let result = input.length ? data.filter(key => key.toLowerCase().includes(input)) : [];
    
    if (result.length) {
        suggestionBox.innerHTML = result.map(item => 
            `<div class="suggestion-item" onclick="selectInput('${item}')">${item}</div>`
        ).join('');
        suggestionBox.classList.add('active');
    } else {
        suggestionBox.classList.remove('active');
    }
});

function selectInput(item) {
    searchInput.value = item;
    suggestionBox.classList.remove('active');
}

// Click bahar karne par dropdown band
document.addEventListener('click', (e) => {
    if (!suggestionBox.contains(e.target) && e.target !== searchInput) {
        suggestionBox.classList.remove('active');
    }
});