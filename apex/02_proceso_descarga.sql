-- =====================================================================
-- Shared Components > Application Items
--   Nombre: G_PROTOCOLO_ID   (Session State Protection: Checksum Required - Session Level)
--
-- Shared Components > Application Processes
--   Nombre: DESCARGAR_PDF
--   Punto:  Ajax Callback: Run this application process when requested by a page process
--   Código: el bloque de abajo
-- =====================================================================
declare
  l_blob   cdla_protocolos.pdf_blob%type;
  l_nombre cdla_protocolos.pdf_nombre%type;
  l_mime   cdla_protocolos.pdf_mimetype%type;
begin
  select pdf_blob, pdf_nombre, nvl(pdf_mimetype, 'application/pdf')
    into l_blob, l_nombre, l_mime
    from cdla_protocolos
   where id = :G_PROTOCOLO_ID
     and activo = 'S';

  sys.htp.init;
  sys.owa_util.mime_header(l_mime, false);
  sys.htp.p('Content-Length: ' || dbms_lob.getlength(l_blob));
  sys.htp.p('Content-Disposition: attachment; filename="' || l_nombre || '"');
  sys.owa_util.http_header_close;
  sys.wpg_docload.download_file(l_blob);

  apex_application.stop_apex_engine;
exception
  when apex_application.e_stop_apex_engine then
    raise;
  when no_data_found then
    sys.htp.p('Protocolo no encontrado.');
    apex_application.stop_apex_engine;
end;
