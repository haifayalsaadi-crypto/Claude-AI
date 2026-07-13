/* =====================================================================
   Ministry of Tourism — Document Engine
   ---------------------------------------------------------------------
   Two strictly separate outputs:
   - IMPROVE: edit the SAME uploaded .docx (append AI improvements to the
     original body, preserving structure/tables/formatting/branding).
     Never uses the approved template.
   - CREATE : render the CURRENT approved template, populating {{ }}
     placeholders with the project fields.
   Plus a minimal-from-scratch RTL builder for the (rare) case an improve
   upload is not a .docx.
   ===================================================================== */
(function (global) {
  "use strict";

  var DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  function xesc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]; }); }

  // One OOXML paragraph (RTL by default). opts: {heading, title, sz, color, bold}
  function paraXml(text, opts) {
    opts = opts || {};
    var sz = opts.sz || (opts.title ? 36 : (opts.heading ? 28 : 24));
    var color = opts.color || ((opts.title || opts.heading) ? "003232" : "1F2D2C");
    var bold = (opts.bold || opts.title || opts.heading) ? "<w:b/><w:bCs/>" : "";
    var pPr = "<w:pPr><w:bidi/>" + (opts.title ? '<w:jc w:val="center"/>' : "") +
      '<w:spacing w:before="' + (opts.heading || opts.title ? 200 : 0) + '" w:after="120"/></w:pPr>';
    var rPr = "<w:rPr><w:rtl/>" + bold + '<w:color w:val="' + color + '"/><w:sz w:val="' + sz + '"/><w:szCs w:val="' + sz + '"/></w:rPr>';
    var runs = String(text == null ? "" : text).split("\n").map(function (line, i) {
      return (i > 0 ? "<w:br/>" : "") + '<w:t xml:space="preserve">' + xesc(line) + "</w:t>";
    }).join("");
    return "<w:p>" + pPr + "<w:r>" + rPr + runs + "</w:r></w:p>";
  }
  function blocksToXml(blocks) {
    return (blocks || []).map(function (b) {
      return paraXml(b.text, { title: b.type === "title", heading: b.type === "heading" });
    }).join("");
  }

  /* IMPROVE — append improvement paragraphs to the uploaded document body */
  function appendToDocx(arrayBuffer, blocks) {
    var zip = new global.PizZip(arrayBuffer);
    var f = zip.file("word/document.xml");
    if (!f) throw new Error("BAD_DOCX");
    var xml = f.asText();
    var inject = blocksToXml(blocks);
    // insert before the final body-level <w:sectPr ...> (page setup), else before </w:body>
    var idx = xml.lastIndexOf("<w:sectPr");
    if (idx === -1) idx = xml.lastIndexOf("</w:body>");
    if (idx === -1) throw new Error("BAD_DOCX");
    var out = xml.slice(0, idx) + inject + xml.slice(idx);
    zip.file("word/document.xml", out);
    return zip.generate({ type: "blob", mimeType: DOCX_MIME, compression: "DEFLATE" });
  }

  /* IMPROVE fallback — build a minimal valid RTL .docx from scratch */
  function newDocx(blocks) {
    var zip = new global.PizZip();
    zip.file("[Content_Types].xml",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>');
    zip.folder("_rels").file(".rels",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
    zip.folder("word").folder("_rels").file("document.xml.rels",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>');
    zip.folder("word").file("document.xml",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' +
      blocksToXml(blocks) +
      '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/><w:bidi/></w:sectPr>' +
      "</w:body></w:document>");
    return zip.generate({ type: "blob", mimeType: DOCX_MIME, compression: "DEFLATE" });
  }

  /* CREATE — render an approved template, filling {{placeholders}} */
  function renderTemplate(arrayBuffer, data) {
    var D = global.docxtemplater || global.Docxtemplater;
    if (!D || !global.PizZip) throw new Error("LIBS_MISSING");
    var zip = new global.PizZip(arrayBuffer);
    var doc = new D(zip, { delimiters: { start: "{{", end: "}}" }, paragraphLoop: true, linebreaks: true, nullGetter: function () { return ""; } });
    doc.render(data || {});
    return doc.getZip().generate({ type: "blob", mimeType: DOCX_MIME, compression: "DEFLATE" });
  }

  global.MOTDoc = { appendToDocx: appendToDocx, newDocx: newDocx, renderTemplate: renderTemplate };
})(window);
