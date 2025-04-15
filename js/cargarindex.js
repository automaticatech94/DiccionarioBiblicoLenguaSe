let todosLosVideos = [];

async function cargarDatos() {
  try {
    const response = await fetch('https://7c5dektstg.execute-api.us-east-1.amazonaws.com/test/videos');
    const data = await response.json();

    todosLosVideos = data;
    cargarCategorias(todosLosVideos);
    configurarBusqueda(); // activamos búsqueda

    // Mostrar mensaje por defecto (ya viene en el HTML)
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    document.getElementById('video-section').innerHTML = '<p>No se pudieron cargar los títulos.</p>';
  }
}

function cargarVideos(data) {
  const contenedor = document.getElementById('video-section');
  contenedor.innerHTML = ''; // limpia todo

  if (data.length === 0) {
    contenedor.innerHTML = '<p>No hay videos disponibles para esta búsqueda.</p>';
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
  listaContenedor.innerHTML = '';

  const categoriasUnicas = new Set();
  data.forEach(video => {
    if (video.category) {
      categoriasUnicas.add(video.category);
    }
  });

  const botonTodos = document.createElement('div');
  botonTodos.textContent = 'Todos';
  botonTodos.classList.add('categoria-item');
  botonTodos.style.cursor = 'pointer';
  botonTodos.style.margin = '5px 0';
  botonTodos.style.fontWeight = 'bold';
  botonTodos.addEventListener('click', () => mostrarTodos());
  listaContenedor.appendChild(botonTodos);

  categoriasUnicas.forEach(book => {
    const div = document.createElement('div');
    div.textContent = book;
    div.classList.add('categoria-item');
    div.style.cursor = 'pointer';
    div.style.margin = '5px 0';

    div.addEventListener('click', () => {
      const filtrados = todosLosVideos.filter(video => video.category === book);
      cargarVideos(filtrados);
    });

    listaContenedor.appendChild(div);
  });
}

function configurarBusqueda() {
  const inputBusqueda = document.getElementById('search-input');

  inputBusqueda.addEventListener('input', () => {
    const termino = inputBusqueda.value.trim().toLowerCase();

    if (termino === '') {
      mostrarBienvenida();
      return;
    }

    const filtrados = todosLosVideos.filter(video =>
      video.titleOfficial.toLowerCase().includes(termino)
    );

    cargarVideos(filtrados);
  });
}

function mostrarBienvenida() {
  const contenedor = document.getElementById('video-section');
  contenedor.innerHTML = `
    <div id="mensaje-bienvenida">
      <p><strong>¡Bienvenido al Diccionario Bíblico LESDOM!</strong></p>
      <p>En LESDOM hemos recopilado y organizado términos bíblicos expresados en lengua de señas, con el propósito de facilitar el acceso al conocimiento de las Escrituras de forma inclusiva y visual.</p>
      <p>Solo tienes que escribir en el cuadro de búsqueda el término que deseas explorar, o navegar por los libros disponibles para descubrir las señas relacionadas.</p>
      <p>Este proyecto está en constante desarrollo. Si deseas colaborar o apoyar, contáctanos en <strong>contacto@lesdom.org</strong>.</p>
      <p><em>El contenido es solo para uso personal o educativo. Para usos comerciales o de investigación, solicita permiso previamente.</em></p>
    </div>
  `;
}

function mostrarTodos() {
  cargarVideos(todosLosVideos);
}

window.addEventListener('DOMContentLoaded', cargarDatos);
