# 🔍 Visual Product Matcher

AI-powered web application that helps users find *visually similar products* based on an uploaded image or image URL.  
Built with *FastAPI + CLIP (backend)* and *Next.js + TailwindCSS (frontend)*.

---

## 🚀 Features
- 📤 Upload images or provide image URLs  
- 🔎 Find visually similar products using *CLIP embeddings*  
- 🏷 Filter results by *category, brand, color, similarity score*  
- 📱 Mobile-responsive, clean UI  
- ⏳ Loading states & error handling for smooth UX  
- 📂 Product dataset with *50+ items (metadata + images)*  

---

## 🛠 Tech Stack

*Backend (AI + API)*  
- [FastAPI](https://fastapi.tiangolo.com/) – Python web framework  
- [CLIP (ViT-B/32)](https://huggingface.co/openai/clip-vit-base-patch32) – Image embeddings  
- torch, transformers, numpy, pillow, requests  
- JSON-based product database + embeddings  

*Frontend (UI)*  
- [Next.js](https://nextjs.org/) with TypeScript  
- [TailwindCSS](https://tailwindcss.com/) for styling  
- [Framer Motion](https://www.framer.com/motion/) for animations  
- [Lucide React](https://lucide.dev/) icons  

---

## 📂 Project Structure
