// Asegúrate de tener el archivo de audio en la carpeta 'audio'
const sonidoDiamantes = new Audio('audio/fxdiamantes.mp3'); // Cargar el sonido

const skins = [
  'images/d1000.png',
  'images/d2000.png',
  'images/d3000.png',
  'images/d4000.png',
  'images/d5000.png',
  'images/d1000.png'
];

let skinSeleccionada = '';

const skinsDiv = document.getElementById('skins');
const popupID = document.getElementById('popup-id');
const popupFinal = document.getElementById('popup-final');
const skinContenedor = document.getElementById('skin-seleccionada');
const verificadoText = document.getElementById('verificado-text');

skins.forEach((src, index) => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = `Skin ${index + 1}`;
  img.classList.add('skin-exclusiva'); // aplicar animación
  img.onclick = () => seleccionarSkin(src); // Solo mostrar el popup de ID cuando se selecciona una skin
  skinsDiv.appendChild(img);
});

function seleccionarSkin(src) {
  skinSeleccionada = src;
  popupID.style.display = 'flex'; // Mostrar el popup de ID solo cuando una skin es seleccionada
}

function verificarID() {
  const playerId = document.getElementById('player-id').value;
  if (playerId.length < 5) {
    alert('Por favor ingresa un ID válido');
    return;
  }

  verificadoText.innerHTML = `
    <span class="spinner" id="spinner"></span>
    Conectando con el servidor...
  `;
  skinContenedor.innerHTML = '';
  popupID.style.display = 'none';
  popupFinal.style.display = 'flex';

  setTimeout(() => {
    document.getElementById('spinner').style.display = 'none';
    verificadoText.innerText = `ID: ${playerId} Tu regalo llegará en 48 horas.`;
    skinContenedor.innerHTML = `<img src="${skinSeleccionada}" alt="Skin seleccionada" style="width:100px;border:3px solid red;border-radius:8px;">`;
    lanzarDiamantes(); // Llamar a la función para mostrar los diamantes
  }, 2000);
}

function cerrarPopupFinal() {
  popupFinal.style.display = 'none';
  document.getElementById('player-id').value = '';
  skinSeleccionada = '';
}

function cerrarPopupID() {
  popupID.style.display = 'none';
}

function regresar() {
  alert('Regresando...');
}

function lanzarDiamantes() {
  const contenedor = document.getElementById('diamantesLluvia');
  contenedor.innerHTML = '';  // Limpiar antes de lanzar más diamantes
  
  // Reproducir el sonido de diamantes
  sonidoDiamantes.play(); // Esto reproducirá el sonido al lanzar los diamantes
  
  for (let i = 0; i < 100; i++) { // Aumentamos el número de diamantes
    const diamante = document.createElement('div');
    diamante.classList.add('diamante');

    // Asignamos tamaños aleatorios
    const tamaño = Math.random();
    if (tamaño < 0.2) {
      diamante.classList.add('grande'); // 20% diamantes grandes
    } else if (tamaño > 0.8) {
      diamante.classList.add('pequeno'); // 20% diamantes pequeños
    }

    diamante.style.left = Math.random() * 100 + 'vw'; // Posición aleatoria en X
    diamante.style.animationDelay = Math.random() * 3 + 's'; // Retraso aleatorio
    diamante.textContent = '💎';
    contenedor.appendChild(diamante);
  }

  // Detener la lluvia después de 5 segundos
  setTimeout(() => contenedor.innerHTML = '', 5000);
}

document.addEventListener('DOMContentLoaded', function() {
  popupID.style.display = 'none';  // Asegurarse de que el popup no se muestre al cargar
  popupFinal.style.display = 'none';  // Asegurarse de que el popup final no se muestre al cargar
});
