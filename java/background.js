/* --- script.js --- */
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let dots = [];
const mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dots = [];
    // Number of dots density ke hisaab se
    for (let i = 0; i < 100; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 2
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Wall bounce
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        // Mouse connection
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            ctx.strokeStyle = `rgba(0, 242, 255, ${1 - distance/mouse.radius})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }

        // Draw dot
        ctx.fillStyle = '#00f2ff';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();



