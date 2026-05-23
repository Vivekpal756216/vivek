// ════════════════════════════════════════════════════════════════
// 1. LAB DATABASE ENGINE (Yahan tum khud apne Devices aur Tasks jodoge)
// ════════════════════════════════════════════════════════════════
const labDatabase = {
  
  'PaloAltoLab': {
    title: "Palo Alto Security Lab",
    topology: "../../img/palo-alto/topology/project1.png", 
    description: "Perimeter deployment engine handling edge zone assets and core network translations.",
    
    // 🖥️ DEVICES SECTION: Ek-ek karke devices add karo
    devices: {
      'PA-Firewall-Primary': { 
        type: 'paloalto', 
        ext: 'xml', 
        code: `<config>\n  <security-policy>\n    <rule name="Allow-SSH"/>\n  </security-policy>\n</config>` 
      }
      // ➕ Naya device jodne ke liye upar comma (,) lagao aur yahan likho:
      // 'Router-R1': { type: 'router', ext: 'txt', code: `! Configuration code` }
    },
    
    // 📝 TASKS SECTION: Ek-ek karke tasks add karo
    tasks: [
      {
        id: 1,
        title: "Task 01: Configuration Audit Protocol",
        question: "Verify packet stream filters and zone validation routing configurations for interface group #5000.",
        screenshot: "../../img/palo-alto/task/project1.png"
      }
      // ➕ Naya task jodne ke liye upar comma (,) lagao aur yahan likho:
      // { id: 2, title: "Task 02...", question: "...", screenshot: "..." }
    ]
  },

  'ActiveActive': {
    title: "Active-Active Failover Cluster",
    topology: "../../img/palo-alto/topology/", // Image chhipane ke liye adhoora path
    description: "Multi-cluster synchronization layer supporting real-time backup links.",
    
    devices: {
      'FW-Node-A': { 
        type: 'paloalto', 
        ext: 'xml', 
        code: `<high-availability>\n  <mode>active-active</mode>\n</high-availability>` 
      }
    },
    
    tasks: [
      {
        id: 1,
        title: "Task 01: HA State Verification",
        question: "Analyze clustering synchronization routines over physical link interfaces for high availability pool cluster.",
        screenshot: "../../img/screenshots/ha_task_1.png"
      }
    ]
  },

  'CaptivePortal': {
    title: "Branded Captive Portal Design",
    topology: "../../img/palo-alto/topology/", 
    description: "Enterprise deployment profile overriding system login redirection links.",
    
    devices: {
      'Portal-GW': { 
        type: 'paloalto', 
        ext: 'xml', 
        code: `<captive-portal>\n  <redirect>auth.vivekpal.local</redirect>\n</captive-portal>` 
      }
    },
    
    tasks: [
      {
        id: 1,
        title: "Task 01: Web Redirection Framework",
        question: "Test captive engine validation bounds across client access nets for identity tracking registry #700.",
        screenshot: "../../img/screenshots/portal_task_1.png"
      }
    ]
  },

  'CoreNetLab': {
    title: "Core Enterprise Layout",
    topology: "../../img/palo-alto/topology/", 
    description: "Core routing topologies handling multi-area production networks.",
    
    devices: {
      'Switch-SW1': { 
        type: 'switch', 
        ext: 'txt', 
        code: `! Switch Core Setup\nvlan 10\n name Production` 
      }
    },
    
    tasks: [
      {
        id: 1,
        title: "Task 01: VLAN Inter-Connect Routing",
        question: "Audit transit parameters inside backbone area segments to confirm core routing stability on network path.",
        screenshot: "../../img/screenshots/core_task_1.png"
      }
    ]
  }
};

// State Management Controls
let currentSelectedProject = 'PaloAltoLab';
let currentActiveTaskIdx = 0;
let currentActiveDeviceKey = '';

// ════════════════════════════════════════════════════════════════
// 2. LAUNCHER CORE ENGINE (Pure HTML UI Controllers)
// ════════════════════════════════════════════════════════════════
function launchLabDashboard() {
  const lab = labDatabase[currentSelectedProject];
  
  // Project Text Updates
  document.getElementById('project-title-display').innerText = lab.title;
  document.getElementById('project-desc-display').innerText = lab.description;
  
  const topologyImg = document.getElementById('project-topology-display');
  
  if (topologyImg) {
    topologyImg.onerror = null; 
    
    // Strict Verification: Agar path sirf folder ka naam hai ya empty hai toh image chhipao
    if (!lab.topology || lab.topology === "../../img/" || lab.topology === "../../img/palo-alto/topology/" || lab.topology.endsWith('/')) {
      topologyImg.style.display = 'none';
    } else {
      topologyImg.style.display = 'block';
      topologyImg.src = lab.topology;
      
      topologyImg.onerror = function() {
        this.src = "../../img/PROJECT.png"; 
      };
    }
  }
  
  generateTaskGridUI();
  generateDeviceChipsUI();
}

function generateTaskGridUI() {
  const gridContainer = document.getElementById('task-grid-buttons');
  gridContainer.innerHTML = '';
  const lab = labDatabase[currentSelectedProject];
  
  // Agar tasks array empty ho toh safe exit
  if (!lab.tasks || lab.tasks.length === 0) {
    document.getElementById('active-task-title').innerText = "No Tasks Available";
    document.getElementById('task-text-content').innerText = "Please add tasks to this project database section.";
    const imgElement = document.getElementById('task-screenshot-display');
    if (imgElement) imgElement.style.display = 'none';
    return;
  }

  lab.tasks.forEach((task, idx) => {
    const btn = document.createElement('button');
    btn.className = `grid-task-btn ${idx === currentActiveTaskIdx ? 'active' : ''}`;
    btn.innerText = `T${String(task.id).padStart(2, '0')}`;
    
    btn.onclick = () => {
      document.querySelectorAll('.grid-task-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentActiveTaskIdx = idx;
      loadSelectedTaskDetails(task);
    };
    gridContainer.appendChild(btn);
  });

  if (currentActiveTaskIdx >= lab.tasks.length) {
    currentActiveTaskIdx = 0;
  }
  loadSelectedTaskDetails(lab.tasks[currentActiveTaskIdx]);
}

function loadSelectedTaskDetails(taskObj) {
  if (!taskObj) return;
  document.getElementById('active-task-title').innerText = taskObj.title;
  document.getElementById('task-text-content').innerText = taskObj.question;
  
  const imgElement = document.getElementById('task-screenshot-display');
  if (imgElement) {
    imgElement.style.display = 'block';
    imgElement.src = taskObj.screenshot;
    
    imgElement.onerror = function() {
      this.src = "https://placehold.co/800x400/11131a/98c379?text=Screenshot+Not+Found+(" + taskObj.screenshot.split('/').pop() + ")";
    };
  }
}

function generateDeviceChipsUI() {
  const container = document.getElementById('device-chips-container');
  container.innerHTML = '';
  const devices = Object.keys(labDatabase[currentSelectedProject].devices);
  
  if (devices.length === 0) {
    document.getElementById('current-device-title').innerText = "No Devices Profile Configured";
    document.getElementById('config-code-block').innerText = "// Append device data arrays under current root block";
    return;
  }
  
  devices.forEach((dev, idx) => {
    const chip = document.createElement('div');
    chip.className = `chip ${idx === 0 ? 'active' : ''}`;
    chip.innerHTML = `<i class="fa-solid fa-microchip"></i> ${dev}`;
    
    chip.onclick = () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderConsoleCodeView(dev);
    };
    container.appendChild(chip);
  });

  renderConsoleCodeView(devices[0]);
}

function renderConsoleCodeView(deviceName) {
  if (!deviceName) return;
  currentActiveDeviceKey = deviceName;
  const devData = labDatabase[currentSelectedProject].devices[deviceName];
  document.getElementById('current-device-title').innerText = `Device Terminal Profile: ${deviceName} (${devData.type.toUpperCase()})`;
  document.getElementById('config-code-block').innerText = devData.code;
}

function switchProject(projKey) {
  currentSelectedProject = projKey;
  currentActiveTaskIdx = 0;
  
  document.querySelectorAll('.project-item').forEach(item => item.classList.remove('active'));
  
  if (window.event && window.event.currentTarget) {
    window.event.currentTarget.classList.add('active');
  }
  
  launchLabDashboard();
  showTaskSectionOnly(); 
}

function showTaskSectionOnly() {
  document.getElementById('task-view-container').classList.remove('hidden-panel');
  document.getElementById('config-view-container').classList.add('hidden-panel');
  document.getElementById('btn-task').classList.add('panel-active');
  document.getElementById('btn-config').classList.remove('panel-active');
}

function showConfigSectionOnly() {
  document.getElementById('task-view-container').classList.add('hidden-panel');
  document.getElementById('config-view-container').classList.remove('hidden-panel');
  document.getElementById('btn-task').classList.remove('panel-active');
  document.getElementById('btn-config').classList.add('panel-active');
}

function copyConfig() {
  const devices = labDatabase[currentSelectedProject].devices;
  if (!devices[currentActiveDeviceKey]) return;
  
  const code = devices[currentActiveDeviceKey].code;
  navigator.clipboard.writeText(code).then(() => {
    alert(`Console payload configuration successfully copied: ${currentActiveDeviceKey}`);
  });
}

function downloadConfig() {
  const devices = labDatabase[currentSelectedProject].devices;
  if (!devices[currentActiveDeviceKey]) return;
  
  const dev = devices[currentActiveDeviceKey];
  const blob = new Blob([dev.code], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${currentActiveDeviceKey}_running_config.${dev.ext}`;
  a.click();
  URL.revokeObjectURL(a.href);
}

window.onload = launchLabDashboard;