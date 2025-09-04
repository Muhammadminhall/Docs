```markdown
# 📂 Draggable Docs Manager

A mini React project to manage documents like Google Drive.  
Users can **add files with descriptions**, view previews, and **drag cards around**.

---

## 🚀 Features

- Add one or multiple files per card
- File previews: images, PDFs, and generic icons
- Draggable cards using Framer Motion
- Download button for files
- Persistent storage with LocalStorage
- Styled with Tailwind CSS

---

## 🛠️ Tech Stack

- React
- Framer Motion
- Tailwind CSS
- React Icons

---

## 📂 How It Works

1. Click **+** to open the input box.
2. Enter a description and select files.
3. Click **ADD** → a card is created.
4. Drag the card anywhere inside the container.
5. Cards remain after page refresh thanks to LocalStorage.

---

## ⚡ Notes

- Cards show file preview or icon based on type.
- Each card has a **download button** for the first file.
- Drag is constrained inside the container to prevent scroll.

---

## 💻 Project Structure
```

src/
├── components/
│ ├── ForeBackGround.jsx # Main layout + input
│ └── Cards.jsx # Draggable file cards
├── App.jsx
├── main.jsx
└── index.css

````

---

## 📦 Usage
```bash
npm install
npm run dev
````

Open `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA)

```

This version **fits in a single file**, highlights that cards are draggable, and explains the main functionality.

```
