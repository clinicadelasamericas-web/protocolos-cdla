/*
 * Catálogo de protocolos.
 * Para agregar uno nuevo:
 *   1. Copiar el HTML en /protocolos/  (usar protocolos/_plantilla.html como base)
 *   2. Copiar el PDF en /pdf/          (nombre sin espacios ni tildes)
 *   3. Agregar un objeto a esta lista.
 */
const PROTOCOLOS = [
  {
    titulo: "Código Sepsis y Shock Séptico",
    tipo: "Pathway",
    area: "Emergencia",
    version: "2026",
    descripcion: "Reconocimiento precoz, activación, bundle de primera hora, reevaluación y destino hospitalario del paciente con sepsis o shock séptico.",
    html: "protocolos/sepsis-shock-septico.html",
    pdf: "pdf/pathway-sepsis-2026.pdf"
  }
  // ,{
  //   titulo: "Nombre del protocolo",
  //   tipo: "Protocolo",
  //   area: "UTI",
  //   version: "2026",
  //   descripcion: "Breve descripción.",
  //   html: "protocolos/nombre-archivo.html",
  //   pdf: "pdf/nombre-archivo.pdf"
  // }
];
