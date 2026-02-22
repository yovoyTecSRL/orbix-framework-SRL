// Whiteboard simple
const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', e => {
  if (!drawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

// Erase
canvas.addEventListener('dblclick', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fetch('/live/whiteboard/event', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({event: 'erase', data: {}})
  });
});

// Chart.js demo
const chartCtx = document.getElementById('chart').getContext('2d');
const chart = new Chart(chartCtx, {
  type: 'bar',
  data: {
    labels: ['Atención', 'Progreso'],
    datasets: [{
      label: 'Métricas',
      data: [80, 60],
      backgroundColor: ['#36a2eb', '#ff6384']
    }]
  }
});

// Chat integrado
function sendChat() {
  const msg = document.getElementById('chat-input').value;
  fetch('/chat', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message: msg})
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('chat-log').innerHTML += `<div>${data.reply}</div>`;
  });
}
