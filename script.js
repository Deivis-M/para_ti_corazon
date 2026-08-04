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
const FRASE_ROMPECABEZAS = "Pieza por pieza, como este corazón";

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

/* Posición (izquierda%, arriba%) de cada una de las 10 fotos, calculada para
   que, en conjunto, tracen el CONTORNO de un corazón grande (como en la
   imagen de referencia: corazoncitos alrededor del borde, con el centro
   hueco), en vez de rellenar todo el interior. */
const POSICIONES_CORAZON = [
  { left: 50, top: 25 },  // hueco superior, entre los dos "lóbulos"
  { left: 61, top: 9  },  // lóbulo derecho, pico interno
  { left: 90, top: 12 },  // lóbulo derecho, pico externo
  { left: 90, top: 45 },  // lado derecho, bajando
  { left: 61, top: 75 },  // lado derecho, cerca de la punta
  { left: 50, top: 92 },  // punta inferior del corazón
  { left: 39, top: 75 },  // lado izquierdo, cerca de la punta
  { left: 10, top: 45 },  // lado izquierdo, bajando
  { left: 10, top: 12 },  // lóbulo izquierdo, pico externo
  { left: 39, top: 9  }   // lóbulo izquierdo, pico interno
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