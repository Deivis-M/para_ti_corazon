/* ============================================================
   CONFIGURA AQUÍ TUS TEXTOS Y ARCHIVOS
   ============================================================ */

const FRASES_MOTIVADORAS = [
  "Cada día es una oportunidad para recordar lo bueno que vivimos. 💗",
  "Las mejores historias dejan huellas, no se olvidan. ✨",
  "A veces el corazón recuerda lo que la mente quiere olvidar. ❤",
  "Lo bonito de un amor real es que deja lecciones, no heridas. 🌷",
  "Recuerda las risas, los abrazos, los momentos que nos hicieron sonreír. 💫"
];

/* Frases que aparecen junto al botón "No" para hacerla cambiar de opinión */
const FRASES_TAUNT_NO = [
  "Espera... ¿segura? 🥺",
  "Dale una oportunidad más",
  "El botón 'Sí' se ve mejor, ¿no crees?",
  "Piénsalo un poquito más",
  "Sé que en el fondo quieres decir que sí",
  "No te vas a arrepentir, lo prometo",
  "Una oportunidad es todo lo que pido",
  "Ese botón 'No' no tiene futuro jaja",
  "Ven, inténtalo conmigo otra vez",
  "El 'Sí' te está esperando ahí mismo 👉"
];

/* Mensajes grandes que aparecen uno por uno ANTES de que se arme el rompecabezas */
const MENSAJES_FINALES = [
  "Sé que hemos pasado por momentos difíciles.",
  "Pero si hay algo que aprendí, es que juntos podemos resolver cualquier problema.",
  "Quiero volver a construir contigo, pieza por pieza.",
  "Si tienes miedo, yo también lo tengo, pero prefiero enfrentarlo contigo que sin ti.",
  "Gracias por llegar hasta aquí. Te quiero."
];

/* Frase única y grande que se muestra ARRIBA del corazón mientras se arma */
const FRASE_ROMPECABEZAS = "De todas las historias que podía vivir ,elegirte a ti fue mi parte favorita ,volvamos a armar juntos";

const MENSAJE_FIN_CANCION = "Fin ❤";

/* Nombres de fotos: EXACTAMENTE 10 (5 se usan de vista previa en las frases,
   las 10 se usan para armar el corazón final).
   Deben estar dentro de una carpeta llamada "imagenes" junto a index.html.
   Si tus fotos no son .jpg (por ejemplo .jpeg o .png), cambia la extensión aquí. */
const FOTOS = [
  "imagenes/foto1.jpeg",
  "imagenes/foto2.jpeg",
  "imagenes/foto3.jpeg",
  "imagenes/foto4.jpeg",
  "imagenes/foto5.jpeg",
  "imagenes/foto6.jpeg",
  "imagenes/foto7.jpeg",
  "imagenes/foto8.jpeg",
  "imagenes/foto9.jpeg",
  "imagenes/foto10.jpeg"
];

/* Posición (izquierda%, arriba%) de cada una de las 10 fotos, calculada
   matemáticamente sobre la curva de un corazón y repartida en distancias
   IGUALES a lo largo de ese contorno (no solo por ángulo), para que las
   10 fotos se vean parejas y el corazón se reconozca bien, con el centro
   hueco como en la imagen de referencia. */
const POSICIONES_CORAZON = [
  { left: 50.0, top: 31.1 }, // hueco superior, entre los dos "lóbulos"
  { left: 65.8, top: 14.0 }, // lóbulo derecho, pico
  { left: 86.0, top: 25.1 }, // lado derecho, arriba
  { left: 82.3, top: 48.8 }, // lado derecho, medio
  { left: 64.7, top: 66.3 }, // lado derecho, bajando a la punta
  { left: 50.0, top: 86.0 }, // punta inferior del corazón
  { left: 35.2, top: 66.3 }, // lado izquierdo, bajando a la punta
  { left: 17.6, top: 48.7 }, // lado izquierdo, medio
  { left: 14.0, top: 25.0 }, // lado izquierdo, arriba
  { left: 34.2, top: 14.0 }  // lóbulo izquierdo, pico
];

/* Segundo exacto del mp3 en el que quieres que empiece a sonar */
const SEGUNDO_INICIO_MUSICA = 33;

/* ============================================================
   PARTÍCULAS DE FONDO (corazones flotando siempre)
   ============================================================ */
const fondoParticulas = document.getElementById('fondo-particulas');
const EMOJIS_PARTICULAS = ['❤','💗','✨','💕','🌸','💫'];

function crearParticula(){
  const p = document.createElement('span');
  p.className = 'particula';
  p.textContent = EMOJIS_PARTICULAS[Math.floor(Math.random()*EMOJIS_PARTICULAS.length)];
  const size = 0.8 + Math.random()*1.6;
  p.style.fontSize = size + 'rem';
  p.style.left = Math.random()*100 + 'vw';
  p.style.setProperty('--drift', (Math.random()*160 - 80) + 'px');
  const dur = 7 + Math.random()*7;
  p.style.animationDuration = dur + 's';
  fondoParticulas.appendChild(p);
  setTimeout(()=> p.remove(), dur*1000 + 200);
}
setInterval(crearParticula, 650);
// ráfaga inicial más llamativa en la pantalla principal
for(let i=0;i<10;i++) setTimeout(crearParticula, i*160);

/* ============================================================
   BARRA DE PROGRESO
   ============================================================ */
const barraFill = document.getElementById('barra-progreso-fill');
function setProgreso(pct){ barraFill.style.width = pct + '%'; }

/* ============================================================
   RIPPLE EN BOTONES
   ============================================================ */
function agregarRipple(boton){
  boton.addEventListener('click', function(e){
    const rect = boton.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top  = (e.clientY - rect.top  - size/2) + 'px';
    boton.appendChild(ripple);
    setTimeout(()=> ripple.remove(), 650);
  });
}

/* ============================================================
   PÁGINA 1: EFECTO DE ESCRITURA (TYPEWRITER)
   ============================================================ */
const fraseTexto = document.getElementById('frase-texto');
let idxFrase = 0;

function escribir(texto, cb){
  let i = 0;
  fraseTexto.textContent = '';
  (function tick(){
    if(i <= texto.length){
      fraseTexto.textContent = texto.slice(0, i);
      i++;
      setTimeout(tick, 32);
    } else {
      setTimeout(cb, 1700);
    }
  })();
}
function borrar(cb){
  let texto = fraseTexto.textContent;
  (function tick(){
    if(texto.length > 0){
      texto = texto.slice(0, -1);
      fraseTexto.textContent = texto;
      setTimeout(tick, 14);
    } else {
      cb();
    }
  })();
}
function cicloFrases(){
  const texto = FRASES_MOTIVADORAS[idxFrase % FRASES_MOTIVADORAS.length];
  idxFrase++;
  escribir(texto, ()=> borrar(cicloFrases));
}
cicloFrases();

/* ============================================================
   LIGHTBOX: tocar cualquier foto para verla completa
   ============================================================ */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function abrirLightbox(src){
  lightboxImg.src = src;
  lightbox.classList.add('show');
}
function cerrarLightbox(){
  lightbox.classList.remove('show');
}
lightboxClose.addEventListener('click', cerrarLightbox);
// tocar el fondo oscuro (fuera de la foto) también cierra
lightbox.addEventListener('click', (e)=>{
  if(e.target === lightbox) cerrarLightbox();
});

/* ============================================================
   NAVEGACIÓN ENTRE PÁGINAS
   ============================================================ */
function irAPagina(idActual, idNueva, progreso){
  const actual = document.getElementById(idActual);
  const nueva  = document.getElementById(idNueva);
  actual.style.transition = 'opacity .4s ease, transform .4s ease';
  actual.style.opacity = '0';
  actual.style.transform = 'translateY(-20px)';
  setTimeout(()=>{
    actual.classList.remove('active');
    actual.style.opacity = '';
    actual.style.transform = '';
    actual.style.transition = '';
    nueva.classList.add('active');
    setProgreso(progreso);
  }, 400);
}

document.getElementById('btnContinuar').addEventListener('click', ()=>{
  irAPagina('page1','page2', 66);
});
agregarRipple(document.getElementById('btnContinuar'));

/* ============================================================
   PÁGINA 2: BOTÓN "NO" QUE ESCAPA + CONFETI EN "SÍ"
   ============================================================ */
const zona = document.getElementById('zona-botones');
const btnNo = document.getElementById('btnNo');
const btnSi = document.getElementById('btnSi');
const globo = document.getElementById('globo-no');
const contadorEl = document.getElementById('contador-intentos');
let intentos = 0;

function escaparBoton(){
  intentos++;
  zona.classList.add('libre');

  const maxX = zona.clientWidth - btnNo.offsetWidth;
  const maxY = zona.clientHeight - btnNo.offsetHeight;
  const nuevoX = Math.max(0, Math.random() * maxX);
  const nuevoY = Math.max(0, Math.random() * maxY);

  btnNo.style.left = nuevoX + 'px';
  btnNo.style.top  = nuevoY + 'px';

  globo.textContent = FRASES_TAUNT_NO[intentos % FRASES_TAUNT_NO.length];
  globo.classList.add('show');
  setTimeout(()=> globo.classList.remove('show'), 1500);

  zona.classList.add('shake');
  setTimeout(()=> zona.classList.remove('shake'), 350);

  /* el botón "Sí" crece cada vez más con cada intento */
  const escala = Math.min(1 + intentos * 0.09, 2.6);
  btnSi.style.transform = `scale(${escala})`;

  if(intentos === 3){
    contadorEl.textContent = 'psst... el botón "Sí" está justo ahí 👉';
  } else if(intentos === 6){
    contadorEl.textContent = 'de verdad que no se deja atrapar jeje';
  } else if(intentos === 9){
    contadorEl.textContent = 'mira cómo crece el botón "Sí"... tómalo como una señal 😌';
  }
}
btnNo.addEventListener('mouseenter', escaparBoton);
btnNo.addEventListener('click', (e)=>{ e.preventDefault(); escaparBoton(); });
btnNo.addEventListener('touchstart', (e)=>{ e.preventDefault(); escaparBoton(); });

function lanzarConfeti(origenEl){
  const rect = origenEl.getBoundingClientRect();
  const emojis = ['❤','💗','✨','💖','💕'];
  for(let i=0; i<26; i++){
    const c = document.createElement('span');
    c.className = 'confeti';
    c.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    c.style.left = (rect.left + rect.width/2) + 'px';
    c.style.top  = (rect.top + rect.height/2) + 'px';
    const angulo = Math.random()*Math.PI*2;
    const distancia = 120 + Math.random()*180;
    c.style.setProperty('--dx', Math.cos(angulo)*distancia + 'px');
    c.style.setProperty('--dy', Math.sin(angulo)*distancia + 'px');
    c.style.setProperty('--rot', (Math.random()*360-180) + 'deg');
    c.style.fontSize = (1 + Math.random()*1.2) + 'rem';
    document.body.appendChild(c);
    setTimeout(()=> c.remove(), 1200);
  }
}

/* ============================================================
   MÚSICA: empieza a sonar desde SEGUNDO_INICIO_MUSICA
   ============================================================ */
const audioEl = document.getElementById('bgMusic');

/* Pausar la música sola cuando cambian de pestaña, minimizan o cierran,
   y que retome justo donde iba al volver (solo si ya estaba sonando). */
let musicaSonabaAntes = false;
document.addEventListener('visibilitychange', ()=>{
  if(document.hidden){
    musicaSonabaAntes = !audioEl.paused;
    audioEl.pause();
  } else if(musicaSonabaAntes){
    audioEl.play().catch(()=>{});
  }
});

function reproducirDesdeMinuto(){
  const fijarTiempo = ()=>{
    try{ audioEl.currentTime = SEGUNDO_INICIO_MUSICA; }catch(e){}
  };
  if(audioEl.readyState >= 1){
    fijarTiempo();
  } else {
    audioEl.addEventListener('loadedmetadata', fijarTiempo, {once:true});
  }
  audioEl.volume = 0.9;
  audioEl.play().catch(()=>{});
}

btnSi.addEventListener('click', ()=>{
  lanzarConfeti(btnSi);
  reproducirDesdeMinuto();
  setTimeout(()=>{
    irAPagina('page2','page3', 100);
    setTimeout(()=>{
      mostrarFaseMensajes(()=>{
        mostrarFaseRompecabezas();
      });
    }, 500);
  }, 500);
});
agregarRipple(btnSi);

/* ============================================================
   PÁGINA 3 · FASE 1: mensajes grandes, uno a uno
   ============================================================ */
const faseMensajes = document.getElementById('fase-mensajes');
const mensajeGrandeEl = document.getElementById('mensaje-grande');
const fotoMensajeEl = document.getElementById('foto-mensaje');

// tocar la foto de cada mensaje también la muestra completa
fotoMensajeEl.addEventListener('click', ()=>{
  if(fotoMensajeEl.src) abrirLightbox(fotoMensajeEl.src);
});

function mostrarFaseMensajes(cb){
  let i = 0;

  function siguienteMensaje(){
    if(i >= MENSAJES_FINALES.length){
      // se acabaron los mensajes: se desvanecen y desaparecen
      faseMensajes.style.transition = 'opacity .7s ease';
      faseMensajes.style.opacity = '0';
      setTimeout(()=>{
        faseMensajes.style.display = 'none';
        cb();
      }, 700);
      return;
    }
    const texto = MENSAJES_FINALES[i];
    const foto = FOTOS[i % FOTOS.length];
    i++;

    mensajeGrandeEl.style.transition = 'opacity .6s ease, transform .6s ease';
    mensajeGrandeEl.style.opacity = '0';
    mensajeGrandeEl.style.transform = 'translateY(12px)';
    fotoMensajeEl.classList.remove('show');

    setTimeout(()=>{
      fotoMensajeEl.src = foto;
      mensajeGrandeEl.textContent = texto;
      mensajeGrandeEl.style.opacity = '1';
      mensajeGrandeEl.style.transform = 'translateY(0)';
      requestAnimationFrame(()=> fotoMensajeEl.classList.add('show'));
      setTimeout(siguienteMensaje, 2900);
    }, 350);
  }

  siguienteMensaje();
}

/* ============================================================
   PÁGINA 3 · FASE 2: ARMAR EL CORAZÓN DE 10 MINI-FOTOS
   ============================================================ */

function mostrarFaseRompecabezas(){
  const faseRompecabezas = document.getElementById('fase-rompecabezas');
  document.getElementById('titulo-final').textContent = FRASE_ROMPECABEZAS;
  faseRompecabezas.classList.remove('oculto');
  faseRompecabezas.style.opacity = '0';
  faseRompecabezas.style.transition = 'opacity .8s ease';
  void faseRompecabezas.getBoundingClientRect();
  faseRompecabezas.style.opacity = '1';
  setTimeout(construirRompecabezas, 400);
}

function crearChispas(x, y){
  for(let i=0; i<6; i++){
    const s = document.createElement('span');
    s.className = 'chispa';
    s.style.left = x + (Math.random()*34-17) + 'px';
    s.style.top  = y + (Math.random()*34-17) + 'px';
    document.body.appendChild(s);
    setTimeout(()=> s.remove(), 650);
  }
}

function construirRompecabezas(){
  const cont = document.getElementById('corazonMosaico');
  cont.innerHTML = '';

  // crear las 10 fotos con forma de corazón, ya ubicadas en su posición final
  // (sobre el contorno del corazón grande, dejando el centro hueco)
  const piezas = POSICIONES_CORAZON.map((pos, i)=>{
    const pieza = document.createElement('div');
    pieza.className = 'mini-corazon';
    pieza.style.left = pos.left + '%';
    pieza.style.top  = pos.top + '%';

    const img = document.createElement('img');
    img.src = FOTOS[i % FOTOS.length];
    img.alt = '';
    pieza.appendChild(img);

    // tocar la foto la muestra completa y en su tamaño original
    pieza.addEventListener('click', ()=> abrirLightbox(img.src));

    cont.appendChild(pieza);
    return pieza;
  });

  // dispersar cada foto a una posición aleatoria fuera de su lugar
  piezas.forEach(p=>{
    const dx = (Math.random()*220 - 110);
    const dy = (Math.random()*220 - 110);
    const rot = (Math.random()*140 - 70);
    p.classList.remove('en-lugar');
    p.style.transition = 'none';
    p.style.transform = `translate(-50%,-50%) translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(0.6)`;
    p.style.opacity = '0';
    // forzar reflow para que la siguiente transición se note
    void p.getBoundingClientRect();
  });

  // aparecen y empiezan a "flotar" desordenadas
  setTimeout(()=>{
    piezas.forEach((p)=>{
      p.style.transition = 'opacity .5s ease';
      p.style.opacity = '1';
    });
  }, 80);

  // luego de un momento, cada mini-corazón vuela a su lugar (con un pequeño retraso escalonado)
  piezas.forEach((p, i)=>{
    setTimeout(()=>{
      p.style.transition = 'transform 1.3s cubic-bezier(.34,1.56,.64,1), opacity .4s ease';
      p.style.transform = 'translate(-50%,-50%) translate(0px,0px) rotate(0deg) scale(1)';

      setTimeout(()=>{
        p.classList.add('en-lugar');
        // cada foto flota a su propio ritmo, para que el movimiento se vea
        // natural y no como si todas se movieran sincronizadas
        const img = p.querySelector('img');
        const duracion = 2.6 + Math.random()*2.2; // entre 2.6s y 4.8s
        const retraso = -Math.random()*duracion;   // negativo = ya viene "en marcha"
        img.style.animationDuration = duracion + 's';
        img.style.animationDelay = retraso + 's';
        const rect = p.getBoundingClientRect();
        crearChispas(rect.left + rect.width/2, rect.top + rect.height/2);
      }, 1300);
    }, 500 + i * 220);
  });

  const tiempoTotal = 500 + piezas.length * 220 + 1700;
  setTimeout(()=>{
    audioEl.addEventListener('ended', ()=>{
      const finEl = document.getElementById('mensaje-fin');
      finEl.textContent = MENSAJE_FIN_CANCION;
      finEl.classList.add('show');
    }, { once:true });
  }, tiempoTotal);
}

/* ============================================================
   MUTE / UNMUTE MÚSICA
   ============================================================ */
const btnMute = document.getElementById('btnMute');
let muteado = false;
btnMute.addEventListener('click', ()=>{
  muteado = !muteado;
  audioEl.muted = muteado;
  btnMute.textContent = muteado ? '🔇' : '🔊';
  if(!muteado && audioEl.paused){
    audioEl.play().catch(()=>{});
  }
});