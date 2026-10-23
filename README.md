# Protocolos Institucionales – Clínica de las Américas

Sitio estático (GitHub Pages) con el menú de protocolos y pathways institucionales.
Cada protocolo se puede ver en HTML y descargar en su PDF oficial.

## Estructura

```
index.html                 Menú con buscador y filtros
assets/estilos.css         Estilos compartidos
assets/protocolos.js       Catálogo de protocolos (aquí se agregan nuevos)
protocolos/                Páginas HTML de cada protocolo
protocolos/_plantilla.html Plantilla para nuevos protocolos
pdf/                       PDFs descargables
```

## Agregar un protocolo

1. Copiar `protocolos/_plantilla.html` con un nombre nuevo (sin espacios ni tildes) y completar el contenido.
2. Copiar el PDF en `pdf/` (sin espacios ni tildes) y apuntar el botón **Descargar PDF** a ese archivo.
3. Agregar una entrada en `assets/protocolos.js`.
4. `git add . && git commit -m "Agrega protocolo X" && git push`
