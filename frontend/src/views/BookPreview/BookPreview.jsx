import axios from "../../../axios.config.js";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { useLocation } from 'react-router-dom';


pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

export default function BookPreview() {

  const location = useLocation();
  const pathname = location.pathname
  console.log("URL:", pathname)

  const { id } = useParams();
  const canvasContainerRef = useRef(null);

  const loadPreview = async (filePath) => {
    try {
      const pdf = await pdfjsLib.getDocument(filePath).promise;
      const totalPages = Math.min(pdf.numPages, 5);

      const container = canvasContainerRef.current;
      container.innerHTML = "";

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.3 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", { willReadFrequently: true }); // Optimize

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.style.marginBottom = "10px";
        canvas.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
        canvas.style.borderRadius = "8px";

        container.appendChild(canvas);
        await page.render({ canvasContext: context, viewport }).promise;
      }
    } catch (err) {
      console.error("PDF render error:", err);
    }
  };

  useEffect(() => {
    const fetchFilePath = async () => {
      try {
        const res = await axios.get(`books/preview/${id}`);
        const filePath = `http://localhost:5000${res.data}`;
        loadPreview(filePath);
      } catch (err) {
        console.error("File path error:", err);
      }
    };
    fetchFilePath();
  }, [id]);

  return (
    <div
      className="book-preview container my-5"
      style={{
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <h2 className="mb-4">Preview </h2>
      <div ref={canvasContainerRef}></div>
    </div>
  );
}
