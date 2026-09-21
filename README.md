# Duelos de sexto

Juegos gratuitos para dos jugadores en la misma pantalla, sin cuentas, publicidad ni dependencias de red durante la partida.

Web: https://rafgim2.github.io/juegodiario/

## Partidas revisadas

- Pulso Numérico (21/09/2026): ejercicios generados al azar, 12 distintos por partida.
- Acento Relámpago (18/09/2026): banco de más de 100 palabras, barajado sin reposición, pistas sobre el tipo de acentuación y explicación. Las palabras pueden volver en partidas futuras.
- Cada jugador tiene una respuesta por ronda y suma un punto si acierta. 20 segundos por ronda; se espera a ambos jugadores antes de revelar la solución. Tras 12 rondas gana la mayor puntuación; los empates son victorias compartidas.
- Controles táctiles independientes; teclado A/S/D/F y J/K/L/Ñ. En Castellano se usan tres opciones. Pausa, reinicio confirmado, silencio, pantalla completa y movimiento reducido.
- Los nombres se quedan en memoria; no se envían ni guardan. El sonido se activa con un gesto del usuario y requiere volumen del dispositivo.

## Mantenimiento

`node scripts/build.mjs` reconstruye únicamente estos dos juegos autocontenidos a partir de `src/`. No modifica los juegos que se publiquen después. `node scripts/test.mjs` valida bancos, respuestas, rondas y estados del juego.

La publicación diaria corresponde a la tarea existente «Duelo escolar lectivo», configurada a las 07:00 Europe/Madrid de lunes a viernes. Debe comprobar primero el calendario oficial de Primaria de la Comunitat Valenciana y los días no lectivos de Aldaia; no se añade un segundo programador. La ejecución futura depende de que esa tarea y la conexión GitHub sigan activas.

Para cada publicación: revisar REGISTRO.md, alternar las cuatro asignaturas y variar mecánica y diseño; crear games/YYYY-MM-DD/index.html, actualizar registro y catálogo, conservar el archivo en orden descendente sin duplicar el destacado. Generar matemáticas dinámicamente; para las otras materias consultar fuentes públicas y verificar bancos de al menos 80 elementos cuando proceda, incorporados en el propio HTML. No consultar APIs ni hacer scraping desde el navegador del alumno.

La fecha dominical de la prueba se corrigió al 18/09/2026. Su URL antigua redirige a la correcta para conservar enlaces existentes.
