let todosLosVideos = []; // variable global para guardar todos los videos

async function cargarDatos() {
  try {
    const response = await fetch('https://7c5dektstg.execute-api.us-east-1.amazonaws.com/test/videos');
    const data = await response.json();

    todosLosVideos = data; // guardar todos los videos
    cargarVideos(todosLosVideos); // mostrar todos por defecto
    cargarCategorias(todosLosVideos); // mostrar libros únicos
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    document.getElementById('video-section').innerHTML = '<p>No se pudieron cargar los títulos.</p>';
  }
}

function cargarVideos(data) {
  const contenedor = document.getElementById('video-section');
  contenedor.innerHTML = ''; // limpia el contenido actual

  if (data.length === 0) {
    contenedor.innerHTML = '<p>No hay videos disponibles para esta categoría.</p>';
    return;
  }

  data.forEach(video => {
    const link = document.createElement('a');
    link.href = `video.html?videoId=${video.videoId}`;
    link.textContent = video.titleOfficial;
    link.style.display = 'block';
    link.style.margin = '10px 0';
    link.style.fontSize = '1.1rem';
    link.style.color = '#007bff';
    link.style.textDecoration = 'none';

    contenedor.appendChild(link);
  });
}

function cargarCategorias(data) {
  const listaContenedor = document.querySelector('.accordion .list');
  listaContenedor.innerHTML = ''; // limpia la lista

  const categoriasUnicas = new Set();
  data.forEach(video => {
    if (video.category) {
      categoriasUnicas.add(video.category);
    }
  });

  // Agrega botón para ver todos
  const botonTodos = document.createElement('div');
  botonTodos.textContent = 'Todos';
  botonTodos.classList.add('categoria-item');
  botonTodos.style.cursor = 'pointer';
  botonTodos.style.margin = '5px 0';
  botonTodos.style.fontWeight = 'bold';
  botonTodos.addEventListener('click', () => cargarVideos(todosLosVideos));
  listaContenedor.appendChild(botonTodos);

  // Agrega categorías individuales
  categoriasUnicas.forEach(book => {
    const div = document.createElement('div');
    div.textContent = book;
    div.classList.add('categoria-item');
    div.style.cursor = 'pointer';
    div.style.margin = '5px 0';

    // Evento para filtrar por categoría
    div.addEventListener('click', () => {
      const filtrados = todosLosVideos.filter(video => video.category === book);
      cargarVideos(filtrados);
    });

    listaContenedor.appendChild(div);
  });
}

window.addEventListener('DOMContentLoaded', cargarDatos);
