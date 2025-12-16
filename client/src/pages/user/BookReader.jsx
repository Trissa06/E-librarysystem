import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Magic,
  X,
  ZoomIn,
  ZoomOut,
  Send
} from 'react-bootstrap-icons';
import toast from 'react-hot-toast';
import axios from 'axios';

// PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const BookReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

  // ---------- STATE ----------
  const [pdfUrl, setPdfUrl] = useState(null); // ✅ REAL PDF URL
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [showAiPanel, setShowAiPanel] = useState(false);

  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: "Hi! I'm reading this page with you. Ask me anything or click 'Summarize Page'." }
  ]);
  const [userQuestion, setUserQuestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // ---------- FETCH BOOK PDF ----------
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);

        if (!res.data.pdfUrl) {
          toast.error("PDF not available for this book");
          return;
        }

        setPdfUrl(`http://localhost:5000/api/books/stream/${id}`);

      } catch (error) {
        toast.error("Failed to load book PDF");
      }
    };

    fetchBook();
  }, [id]);

  // ---------- PDF HANDLERS ----------
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    toast.success("Book Loaded!");
  };

  const handlePrev = () => {
    if (pageNumber > 1) setPageNumber(p => p - 1);
  };

  const handleNext = () => {
    if (pageNumber < numPages) setPageNumber(p => p + 1);
  };

  // ---------- CHAT SCROLL ----------
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  // ---------- AI FEATURES ----------
  const addMessage = (role, text) => {
    setChatHistory(prev => [...prev, { role, text }]);
  };

  const simulateAiResponse = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('ai', text);
    }, 1500);
  };

  const handleSummarize = () => {
    addMessage('user', "Summarize this page for me.");
    simulateAiResponse(
      `Summary of page ${pageNumber}:\n• Key ideas explained\n• Important concepts highlighted\n• Easy-to-understand breakdown`
    );
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    const question = userQuestion;
    addMessage('user', question);
    setUserQuestion("");

    simulateAiResponse(
      `Great question about page ${pageNumber}! The author emphasizes understanding systems over goals.`
    );
  };

  // ---------- LOADING ----------
  if (!pdfUrl) {
    return <div className="p-10 text-center text-gray-500">Loading PDF...</div>;
  }

  // ---------- UI (UNCHANGED) ----------
  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col relative overflow-hidden">

      {/* TOP BAR */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 fixed top-0 w-full z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-sm font-bold text-gray-700 uppercase tracking-widest hidden md:block">
            Reading Mode • Page {pageNumber} of {numPages || '--'}
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="p-2 hover:bg-white rounded-md">
            <ZoomOut size={16} />
          </button>
          <span className="text-xs font-bold w-8 text-center">{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale(s => Math.min(2, s + 0.1))} className="p-2 hover:bg-white rounded-md">
            <ZoomIn size={16} />
          </button>
        </div>
      </div>

      {/* PDF VIEW */}
      <div className="flex-1 mt-20 mb-24 overflow-y-auto flex justify-center p-4">
        <div className="shadow-2xl border border-gray-200 bg-white">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="p-20 text-gray-400">Loading Book PDF...</div>}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 h-20 flex items-center justify-between px-6 z-20">
        <button onClick={handlePrev} disabled={pageNumber <= 1} className="flex items-center gap-2 px-4 py-2 font-bold">
          <ChevronLeft /> Prev
        </button>

        <button
          onClick={() => setShowAiPanel(true)}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold"
        >
          <Magic /> AI Assistant
        </button>

        <button onClick={handleNext} disabled={pageNumber >= numPages} className="flex items-center gap-2 px-4 py-2 font-bold">
          Next <ChevronRight />
        </button>
      </div>

      {/* AI PANEL (UNCHANGED UI) */}
      {showAiPanel && (
        <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col border-l">
          <div className="p-4 border-b flex justify-between items-center bg-gray-50">
            <h3 className="text-lg font-bold text-purple-600 flex items-center gap-2">
              <Magic /> AI Companion
            </h3>
            <button onClick={() => setShowAiPanel(false)} className="p-2 hover:bg-gray-200 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" ref={chatContainerRef}>
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-black text-white rounded-br-none'
                    : 'bg-white border rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <button onClick={handleSummarize} className="w-full mb-3 py-2 bg-purple-50 text-purple-600 text-xs font-bold rounded-lg">
              Summarize Page {pageNumber}
            </button>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="Ask about this page..."
                className="flex-1 p-3 bg-gray-100 rounded-xl text-sm"
              />
              <button type="submit" className="p-3 bg-black text-white rounded-xl flex items-center justify-center">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookReader;
