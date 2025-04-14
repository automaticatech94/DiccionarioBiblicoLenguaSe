// js/verVideo.js

async function cargarVideoIndividual() {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('videoId');

  if (!videoId) {
    document.getElementById('term-title').textContent = 'Video no encontrado.';
    return;
  }

  try {
    const response = await fetch('https://7c5dektstg.execute-api.us-east-1.amazonaws.com/test/videos');
    const data = await response.json();

    const video = data.find(v => v.videoId === videoId);

    if (!video) {
      document.getElementById('term-title').textContent = 'Video no encontrado.';
      return;
    }

    document.getElementById('term-title').textContent = video.titleOfficial;
    document.getElementById('term-description').innerHTML = `<p><strong>Descripción:</strong> ${video.description}</p>`;

    document.getElementById('video-container').innerHTML = `
      <video controls style="width: 100%; border-radius: 12px; margin-bottom: 25px;">
        <source src="${video.videoUrl}" type="video/mp4">
        Tu navegador no soporta video.
      </video>
    `;
  } catch (error) {
    console.error('Error al cargar el video:', error);
    document.getElementById('term-title').textContent = 'Error al cargar el video.';
  }
}

window.addEventListener('DOMContentLoaded', cargarVideoIndividual);
