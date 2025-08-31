

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: string;
  color: string;
  description: string;
  image_path: string;
  score: number; 
}

export default function HeroSection() {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [backendMessage, setBackendMessage] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(0); // new

  const API_BASE = "http://127.0.0.1:8000";

  const handleFileUpload = (file: File) => {
    setPreview(URL.createObjectURL(file));
    setFile(file);
  };

  const searchWithFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");
    setBackendMessage("");
    try {
      const res = await fetch(`${API_BASE}/search/file`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResults(data.results || []);
      setBackendMessage(data.message || "");
    } catch (err) {
      setError("Upload failed. Try again.");
    }
    setLoading(false);
  };

  const handleUrlSubmit = async () => {
    if (!urlInput) return;
    setLoading(true);
    setError("");
    setBackendMessage("");
    try {
      const res = await fetch(`${API_BASE}/search/url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput }),
      });
      const data = await res.json();
      setResults(data.results || []);
      setBackendMessage(data.message || "");
      setPreview(urlInput);
      setFile(null);
    } catch (err) {
      setError("Fetching failed. Try again.");
    }
    setLoading(false);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const filteredResults = results.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      (selectedBrand === "All" || p.brand === selectedBrand) &&
      (selectedColor === "All" || p.color === selectedColor) &&
      p.score * 100 >= similarityThreshold
  );

  return (
    <section className="pt-24 pb-16 bg-[#DAE3E5]">
      <div className="max-w-3xl mx-auto text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl font-extrabold text-[#04080F]"
        >
          Empower Your Search with{" "}
          <span className="text-[#507DBC]">AI-Powered Matching</span>
        </motion.h1>

        {/* Mode Toggle */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setMode("upload")}
            className={`px-4 py-2 rounded-lg ${
              mode === "upload"
                ? "bg-[#A1C6EA] text-white"
                : "bg-[#BBD1EA] text-[#04080F]"
            }`}
          >
            Upload Image
          </button>
          <button
            onClick={() => setMode("url")}
            className={`px-4 py-2 rounded-lg ${
              mode === "url"
                ? "bg-[#A1C6EA] text-white"
                : "bg-[#BBD1EA] text-[#04080F]"
            }`}
          >
            Image URL
          </button>
        </div>

        {/* Upload / URL Input */}
        <div className="mt-10">
          {mode === "upload" ? (
            preview && file ? (
              <div className="bg-[#BBD1EA] border rounded-xl p-4">
                <div className="relative rounded overflow-hidden flex justify-center items-center max-h-[400px]">
                  <img
                    src={preview}
                    alt="Uploaded"
                    className="max-w-full max-h-full object-contain rounded"
                  />
                  <button
                    onClick={() => {
                      setPreview(null);
                      setFile(null);
                      setResults([]);
                      setBackendMessage("");
                    }}
                    className="absolute top-2 right-2 bg-[#507DBC] text-white rounded-full px-2 py-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-[#04080F] mt-2">
                  Image uploaded successfully! Ready to find similar products.
                </p>
                <button
                  onClick={searchWithFile}
                  className="mt-4 px-6 py-2 bg-[#A1C6EA] text-white font-semibold rounded-lg hover:bg-[#507DBC] transition"
                >
                  🔍 Find Similar Products
                </button>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-xl p-10 transition ${
                  dragActive
                    ? "border-[#A1C6EA] bg-[#BBD1EA]"
                    : "border-[#BBD1EA] hover:border-[#A1C6EA] bg-white"
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto text-[#A1C6EA] mb-4" size={40} />
                <p className="text-[#04080F] font-medium">
                  Drag & drop your image here
                </p>
                <p className="text-sm text-[#04080F] mt-1">
                  Supports JPG, PNG, GIF up to 10MB
                </p>
                <label className="mt-4 inline-block px-5 py-2 bg-[#A1C6EA] text-white rounded-lg hover:bg-[#507DBC] cursor-pointer">
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0])
                        handleFileUpload(e.target.files[0]);
                    }}
                  />
                </label>
              </div>
            )
          ) : (
            <div className="bg-[#BBD1EA] p-6 border rounded-xl">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Paste image URL here..."
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A1C6EA]"
              />
              <button
                onClick={handleUrlSubmit}
                className="mt-4 w-full px-5 py-2 bg-[#A1C6EA] text-white rounded-lg hover:bg-[#507DBC] transition"
              >
                Fetch Image
              </button>
            </div>
          )}
        </div>

        {/* Preview for URL fetch */}
        {preview && !file && (
          <div className="mt-6 bg-[#BBD1EA] border rounded-xl p-4">
            <div className="relative rounded overflow-hidden flex justify-center items-center max-h-[400px]">
              <img
                src={preview}
                alt="URL Preview"
                className="max-w-full max-h-full object-contain rounded"
              />
              <button
                onClick={() => setPreview(null)}
                className="absolute top-2 right-2 bg-[#507DBC] text-white rounded-full px-2 py-1 text-xs"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-[#04080F] mt-2">
              Image fetched from URL. Similar products are displayed below.
            </p>
          </div>
        )}

        {/* Filters */}
        {results.length > 0 && (
          <div className="flex flex-col items-center gap-6 mt-10">
            <div className="flex flex-wrap gap-4 justify-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="All">All Categories</option>
                {[...new Set(results.map((p) => p.category))].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="All">All Brands</option>
                {[...new Set(results.map((p) => p.brand))].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Similarity Slider */}
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Similarity: {similarityThreshold}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={similarityThreshold}
                onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
                className="w-full accent-[#507DBC] cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mt-10">
          {loading && <p className="text-[#A1C6EA]">Loading...</p>}
          {error && <p className="text-[#507DBC]">{error}</p>}

          {!loading && results.length === 0 && backendMessage && (
            <p className="text-[#507DBC] mt-4">{backendMessage}</p>
          )}

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {filteredResults.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                  <span className="absolute top-2 left-2 bg-[#A1C6EA] text-white text-xs font-semibold px-2 py-1 rounded z-20">
                    {(p.score * 100).toFixed(0)}%
                  </span>
                  <img
                    src={`${API_BASE}${p.image_path}`}
                    alt={p.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{p.category}</p>
                  <p className="text-xl font-bold text-[#507DBC] mt-2">${p.price}</p>
                  {p.description && (
                    <p className="text-sm text-gray-400 mt-2 line-clamp-3">{p.description}</p>
                  )}
                  <button className="mt-auto mt-4 w-full py-2 bg-[#A1C6EA] text-white font-semibold rounded-lg hover:bg-[#507DBC] transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
