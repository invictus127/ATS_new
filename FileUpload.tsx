import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Eye, X, Loader2 } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onTextUpload: (text: str) => void;
  isLoading: boolean;
  error: string | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  onTextUpload,
  isLoading,
  error
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndProcessFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a valid PDF file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit.');
      return;
    }
    setSelectedFile(file);
    onFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handlePasteSubmit = () => {
    if (pastedText.trim().length < 30) {
      alert('Please paste a substantial resume text snippet (at least 30 characters).');
      return;
    }
    setShowPasteModal(false);
    onTextUpload(pastedText);
  };

  return (
    <div className="w-full">
      {/* Upload Container Box */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
          dragActive
            ? 'border-cyan-400 bg-cyan-500/10 shadow-glow-cyan scale-[1.01]'
            : 'border-slate-700 hover:border-cyan-500/50 bg-slate-900/40 hover:bg-slate-900/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 group-hover:scale-110 transition-transform duration-300">
            {isLoading ? (
              <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
            ) : selectedFile ? (
              <FileText className="w-10 h-10 text-cyan-400" />
            ) : (
              <UploadCloud className="w-10 h-10 text-cyan-400" />
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
              {isLoading
                ? 'Parsing PDF & Scoring Resume...'
                : selectedFile
                ? selectedFile.name
                : 'Upload Your Resume PDF'}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Drag & drop your file here, or <span className="text-cyan-400 font-semibold underline underline-offset-4">browse files</span>
            </p>
          </div>

          {/* Validation indicators */}
          <div className="flex items-center space-x-4 text-xs text-slate-400">
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>PDF Format</span>
            </span>
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Max 5MB Size</span>
            </span>
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant Parsing</span>
            </span>
          </div>

          {/* Action links */}
          <div className="pt-2 flex items-center space-x-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowPasteModal(true);
              }}
              className="text-xs font-semibold text-slate-400 hover:text-cyan-300 underline underline-offset-2"
            >
              Paste Text Instead
            </button>
            {selectedFile && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPreviewModal(true);
                }}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview Info</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Display Error Message */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Paste Resume Text Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>Paste Resume Plain Text</span>
              </h3>
              <button
                onClick={() => setShowPasteModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <textarea
              rows={10}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste your raw resume text content here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPasteModal(false)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handlePasteSubmit}
                className="px-5 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:brightness-110 shadow-glow-cyan"
              >
                Analyze Text
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {showPreviewModal && selectedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>Uploaded PDF Metadata</span>
              </h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-sm text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <p><strong className="text-slate-400">Filename:</strong> {selectedFile.name}</p>
              <p><strong className="text-slate-400">File Size:</strong> {(selectedFile.size / 1024).toFixed(1)} KB</p>
              <p><strong className="text-slate-400">MIME Type:</strong> {selectedFile.type || 'application/pdf'}</p>
              <p><strong className="text-slate-400">Last Modified:</strong> {new Date(selectedFile.lastModified).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 text-sm bg-slate-800 text-slate-200 rounded-xl hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
