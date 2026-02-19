const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const result = document.getElementById("result");

function resizeCanvas() {
  const container = canvas.parentElement;
  const size = Math.min(
    container.clientWidth,
    container.clientHeight,
    600
  );
  canvas.width = size;
  canvas.height = size;
  if (window.entries && window.entries.length > 0) {
    drawWheel();
  }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function getNamesFromURL() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("names");

  const defaultSchools = [
    "ITES Einaudi Gramsci - Padova",
    "ITET Einaudi – Bassano del Grappa",
    "Liceo Don G. Fogazzaro - Vicenza",
    "Liceo F. Corradini - Thiene",
    "Squadra arcobaleno Liceo F. Corradini, Thiene",
    "IIS GG. Trissino, Valdagno",
    "Liceo Lucrezio Caro, Cittadella",
    "IIS Newton-Pertini, Padova",
    "ISISS M. Casagrande, Pieve di Soligo",
    "Liceo Brocchi, Bassano"
  ];

  if (!raw) return defaultSchools;

  return raw
    .split("|")                       // 👈 new separator
    .map(n => decodeURIComponent(n.trim()))
    .filter(n => n.length > 0);
}


const entries = getNamesFromURL();
window.entries = entries; // save to global for resizeCanvas
const sliceAngle = (Math.PI * 2) / entries.length;

let angle = 0;
let velocity = 0;
let spinning = false;

const friction = 0.985;
const minVelocity = 0.002;

const colors = ["#e74c3c","#2ecc71","#f1c40f","#3498db"];

function drawWheel(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) / 2 - 5;

  entries.forEach((name,i)=>{

    const start = i * sliceAngle + angle;
    const end = start + sliceAngle;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, start, end);
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    ctx.save();
    ctx.translate(centerX, centerY);
    const midAngle = start + sliceAngle/2;
    ctx.rotate(midAngle);

    ctx.fillStyle="#111";
    const fontSize = Math.max(9, Math.floor(radius / 20));
    ctx.font=`bold ${fontSize}px sans-serif`;
    ctx.textAlign="right";
    
    // Se il testo è nella metà bassa della ruota, capovolgi per leggibilità
    let textRotation = 0;
    if (midAngle > Math.PI / 2 && midAngle < 3 * Math.PI / 2) {
      textRotation = Math.PI;
      ctx.rotate(textRotation);
    }
    
    ctx.fillText(name, radius - 70, 4);

    ctx.restore();
  });
}

function animate(){

  if(!spinning) return;

  angle += velocity;
  velocity *= friction;

  drawWheel();

  if(velocity < minVelocity){

    spinning = false;
    spinBtn.disabled = false;

    // Il puntatore è in cima (3π/2 radianti in canvas)
    // Calcola quale slice è in cima
    const topAngle = 3 * Math.PI / 2;
    const normalizedAngle = (topAngle - angle) % (Math.PI * 2);
    let index = Math.floor(normalizedAngle / sliceAngle) % entries.length;
    
    // Aggiustamento se il valore è negativo
    if (index < 0) index += entries.length;

    result.textContent = entries[index];
    return;
  }

  requestAnimationFrame(animate);
}

function spin(){

  if(spinning) return;

  result.textContent = "";
  spinBtn.disabled = true;
  spinning = true;

  velocity = 0.35 + Math.random()*0.25;

  animate();
}

spinBtn.onclick = spin;

/* 🎯 AUTO SPIN AL LOAD */

window.addEventListener("load", () => {

  drawWheel();     // prima disegna
  setTimeout(() => {
    spin();        // poi gira automaticamente
  }, 400);         // piccolo delay = effetto più naturale
});
