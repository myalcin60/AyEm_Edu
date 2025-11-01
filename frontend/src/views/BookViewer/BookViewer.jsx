import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../axios.config.js";
import * as pdfjsLib from "pdfjs-dist/build/pdf";

// PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

export default function BookViewer() {
  const [drawColor, setDrawColor] = useState("red");
  const [lineWidth, setLineWidth] = useState(2);

  const { id } = useParams();
  const [pdf, setPdf] = useState(null);        // PDF document
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // PDF yükleme
  useEffect(() => {
    const loadPdf = async () => {
      try {
        const response = await axios.get(`/books/view/${id}`, {
          responseType: "arraybuffer", // blob yerine arraybuffer
        });
        const loadingTask = pdfjsLib.getDocument({ data: response.data });
        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
      } catch (error) {
        console.error("PDF yükleme hatası:", error);
      }
    };
    loadPdf();
  }, [id]);

  // PDF render
  useEffect(() => {
    const renderPage = async () => {
      if (!pdf) return;

      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = canvasRef.current;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const context = canvas.getContext("2d",{ willReadFrequently: true });
      const renderContext = {
        canvasContext: context,
        viewport,
      };
      await page.render(renderContext).promise;
    };

    renderPage();
  }, [pdf, pageNumber]);

  // Sayfa numarasına git
  const goToPage = (e) => {
    let page = parseInt(e.target.value);
    if (page >= 1 && page <= numPages) setPageNumber(page);
  };

  // Canvas mouse eventleri
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const rect = canvasRef.current.getBoundingClientRect();
    lastPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

const handleMouseMove = (e) => {
  if (!isDrawing.current) return;
  const ctx = canvasRef.current.getContext("2d");
  const rect = canvasRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.strokeStyle = drawColor;   // dinamik renk
  ctx.lineWidth = lineWidth;     // dinamik kalınlık
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(lastPos.current.x, lastPos.current.y);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastPos.current = { x, y };
};


  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const clearAnnotations = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  if (!pdf)
    return <p style={{ textAlign: "center", marginTop: 40 }}>Yükleniyor...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: 10 }}>
      <div style={{ marginBottom: 10 }}>
  <label>Renk: </label>
  <input 
    type="color" 
    value={drawColor} 
    onChange={(e) => setDrawColor(e.target.value)} 
  />
  
  <label style={{ marginLeft: 10 }}>Kalınlık: </label>
  <input 
    type="number" 
    min="1" max="10" 
    value={lineWidth} 
    onChange={(e) => setLineWidth(parseInt(e.target.value))} 
    style={{ width: 50 }}
  />
</div>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}>
          ← Before
        </button>
        <input
          type="number"
          min="1"
          max={numPages}
          value={pageNumber}
          onChange={goToPage}
          style={{ width: 50, margin: "0 10px" }}
        />
        <span>/ {numPages}</span>
        <button onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}>
          After →
        </button>
        <button onClick={clearAnnotations} style={{ marginLeft: 20 }}>
          Clear Annotations
        </button>
      </div>

      <div style={{ position: "relative", display: "inline-block" }}>
        <canvas
          ref={canvasRef}
          style={{
            cursor: "crosshair",
            border: "1px solid #ccc",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
    </div>
  );
}
