/*
 * Descarga de PDF con marca de agua "COPIA".
 * Intercepta los enlaces <a download> que apuntan a un .pdf, agrega la marca
 * de agua en el navegador (pdf-lib) y descarga la copia. El PDF original del
 * repositorio no se modifica.
 * Requiere: https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js
 */
const MARCA_TEXTO = "COPIA NO CONTROLADA";

function fechaHoraActual() {
  const d = new Date();
  const dos = n => String(n).padStart(2, "0");
  return `${dos(d.getDate())}/${dos(d.getMonth() + 1)}/${d.getFullYear()} ${dos(d.getHours())}:${dos(d.getMinutes())}`;
}

async function pdfConMarca(url) {
  const { PDFDocument, StandardFonts, rgb, degrees } = PDFLib;
  const original = await fetch(url).then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.arrayBuffer();
  });

  const pdf = await PDFDocument.load(original);
  const negrita = await pdf.embedFont(StandardFonts.HelveticaBold);
  const normal = await pdf.embedFont(StandardFonts.Helvetica);
  const pie = `Copia descargada el ${fechaHoraActual()} – Verifique la versión vigente antes de usar.`;

  pdf.getPages().forEach(pagina => {
    const { width, height } = pagina.getSize();

    // Texto diagonal centrado en la página
    const angulo = Math.atan2(height, width);
    const tamano = Math.min(width, height) / 11;
    const ancho = negrita.widthOfTextAtSize(MARCA_TEXTO, tamano);
    const alto = negrita.heightAtSize(tamano);
    pagina.drawText(MARCA_TEXTO, {
      x: width / 2 - (ancho / 2) * Math.cos(angulo) + (alto / 2) * Math.sin(angulo),
      y: height / 2 - (ancho / 2) * Math.sin(angulo) - (alto / 2) * Math.cos(angulo),
      size: tamano,
      font: negrita,
      color: rgb(0.85, 0.15, 0.15),
      opacity: 0.18,
      rotate: degrees(angulo * 180 / Math.PI)
    });

    // Leyenda al pie
    const tamanoPie = 8;
    pagina.drawText(pie, {
      x: (width - normal.widthOfTextAtSize(pie, tamanoPie)) / 2,
      y: 12,
      size: tamanoPie,
      font: normal,
      color: rgb(0.7, 0.1, 0.1)
    });
  });

  return new Blob([await pdf.save()], { type: "application/pdf" });
}

document.addEventListener("click", async evento => {
  const enlace = evento.target.closest('a[download][href$=".pdf"]');
  if (!enlace || typeof PDFLib === "undefined") return;   // sin librería: descarga normal

  evento.preventDefault();
  const textoBoton = enlace.textContent;
  enlace.textContent = "Generando copia…";
  try {
    const blob = await pdfConMarca(enlace.href);
    const nombre = enlace.getAttribute("download") || decodeURIComponent(enlace.pathname.split("/").pop());
    const temporal = document.createElement("a");
    temporal.href = URL.createObjectURL(blob);
    temporal.download = nombre;
    document.body.appendChild(temporal);
    temporal.click();
    temporal.remove();
    setTimeout(() => URL.revokeObjectURL(temporal.href), 10000);
  } catch (error) {
    console.error(error);
    alert("No se pudo generar la copia del PDF. Intente nuevamente.");
  } finally {
    enlace.textContent = textoBoton;
  }
});
