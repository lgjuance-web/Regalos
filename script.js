document.addEventListener('DOMContentLoaded', () => {
    const skins = [
        'images/1.png', 'images/2.png', 'images/3.png',
        'images/4.png', 'images/5.png', 'images/6.png',
        'images/7.png', 'images/skin8.jpg', 'images/skin9.jpg',
        'images/skin10.jpg', 'images/skin11.jpg', 'images/skin12.jpg',
        'images/skin13.jpg', 'images/skin14.jpg', 'images/skin15.jpg',
        'images/skin16.jpg', 'images/17.png', 'images/18.png',
        'images/19.png', 'images/skin20.jpg'
    ];

    let skinSeleccionada = '';

    const skinsContainer = document.getElementById('skins');
    const popupID = document.getElementById('popup-id');
    const popupFinal = document.getElementById('popup-final');
    const skinContenedor = document.getElementById('skin-seleccionada');
    const verificadoText = document.getElementById('verificado-text');

    // Crea y añade todas las skins al contenedor principal
    skins.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Skin ${index + 1}`;
        img.style.width = '100px'; // Ajusta el tamaño como necesites
        img.style.margin = '5px';
        img.style.cursor = 'pointer';
        img.style.borderRadius = '8px';
        img.onclick = () => seleccionarSkin(src);

        if (src.includes('skin20.jpg')) {
            img.style.border = '3px solid gold'; // Estilo para la skin exclusiva
        }
        
        skinsContainer.appendChild(img);
    });

    window.seleccionarSkin = function(src) {
        skinSeleccionada = src;
        popupID.style.display = 'flex';
    }

    window.verificarID = function() {
        const playerId = document.getElementById('player-id').value;
        if (playerId.length < 5) {
            alert('Por favor ingresa un ID válido');
            return;
        }

        verificadoText.innerHTML = `<span class="spinner"></span> Conectando con el servidor...`;
        skinContenedor.innerHTML = '';
        popupID.style.display = 'none';
        popupFinal.style.display = 'flex';

        setTimeout(() => {
            skinContenedor.innerHTML = `<img src="${skinSeleccionada}" alt="Skin seleccionada" style="width:100px; border:3px solid red; border-radius:8px;">`;
            
            // Simular sonido y conexión
            const audio = new Audio('audio/skin.wav'); // Asegúrate que la carpeta 'audio' exista
            audio.play();

            setTimeout(() => {
                const spinner = verificadoText.querySelector('.spinner');
                if (spinner) spinner.style.display = 'none';
                verificadoText.innerText = `ID: ${playerId} Tu regalo llegará en 48 horas.`;
            }, 1000);
        }, 1000);
    }

    window.cerrarPopupID = function() {
        popupID.style.display = 'none';
    }

    window.cerrarPopupFinal = function() {
        popupFinal.style.display = 'none';
        document.getElementById('player-id').value = '';
    }

    window.regresar = function() {
        alert('Regresando...');
    }
});