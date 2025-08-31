import React, { useState } from "react";

export default function UploadArea() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex justify-center">
      {!preview ? (
        // Default Upload Box
        <label
          className="border-2 border-dashed rounded-lg w-full max-w-xl h-64 flex flex-col items-center justify-center cursor-pointer 
          bg-[#DAE3E5] hover:bg-[#BBD1EA] transition-colors"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="text-[#04080F] font-medium">Drop your image here</span>
          <button className="mt-2 px-4 py-2 bg-[#A1C6EA] text-white rounded-lg hover:bg-[#507DBC] transition-colors">
            Choose Image
          </button>
        </label>
      ) : (
        // Preview
        <div className="relative w-full max-w-xl h-64">
          <img
            src={preview}
            alt="Uploaded preview"
            className="object-cover w-full h-full rounded-lg shadow"
          />
          <button
            className="absolute top-2 right-2 bg-[#507DBC] text-white rounded-full px-3 py-1 shadow hover:bg-[#A1C6EA] transition-colors"
            onClick={() => setPreview(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
