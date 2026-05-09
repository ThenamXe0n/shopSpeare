## Multer setup and instruction guide for file upload 

Here’s a *complete multer setup guide for uploading files in backend* including:

* Multer backend setup
* Dynamic file storage
* React upload form
* Full working flow

You can copy this into a file like: `multer-react-upload.md`

---

# 📁 Multer + React File Upload Tutorial

##  Overview

This tutorial covers:

* 📦 Multer setup (Node.js + Express)
* 📂 Dynamic folder creation (student-based)
* 🌐 API for file upload
* ⚛️ React frontend form
* 🗄️ Storing file path in DB

---

# 🖥️ Backend (Node.js + Express + Multer)

## 📦 Install Dependencies

```bash
npm init -y
npm install express multer cors
```

---

## 📂 Folder Structure

```
backend/
│
├── uploads/
│   └── students/
│
├── multerConfig.js
├── server.js
```

---

## ⚙️ Multer Configuration (`multerConfig.js`)

```js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const studentId = req.body.studentId || "general";
    const dir = `uploads/students/${studentId}`;

    // Create folder dynamically
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// File filter (only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
```

---

## 🌐 Express Server (`server.js`)

```js
const express = require("express");
const cors = require("cors");
const upload = require("./multerConfig");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Upload route
app.post("/upload", upload.single("profile"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    // Example DB object
    const studentData = {
      name: req.body.name,
      studentId: req.body.studentId,
      profileImage: filePath,
    };

    res.json({
      message: "Upload successful",
      data: studentData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
```

---

# ⚛️ Frontend (React)

## 📦 Create React App

```bash
npx create-react-app frontend
cd frontend
npm install axios
```

---

## 📂 React Component (`UploadForm.js`)

```jsx
import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("profile", file);
    formData.append("name", name);
    formData.append("studentId", studentId);

    try {
      const res = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      alert("Upload successful!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Upload</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        required
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
```

---

## 🧩 Use in `App.js`

```jsx
import React from "react";
import UploadForm from "./UploadForm";

function App() {
  return (
    <div>
      <UploadForm />
    </div>
  );
}

export default App;
```

---

# 🧪 How It Works

### 📤 Upload Flow

1. User fills form in React
2. File + data sent using `FormData`
3. Multer processes file
4. File stored in:

```
uploads/students/{studentId}/filename.png
```

5. File path returned & stored in DB

---

# 🗄️ Example Stored Data

```json
{
  "name": "Rahul",
  "studentId": "123",
  "profileImage": "uploads/students/123/169999999.png"
}
```

---

# 🌐 Access Uploaded File

```
http://localhost:3000/uploads/students/123/file.png
```

---

# ⚠️ Best Practices

* ✅ Validate file size
* ✅ Use cloud storage (AWS S3) in production
* ✅ Sanitize inputs
* ✅ Limit file types
* ✅ Use environment variables

---

# 🎯 Summary

| Feature      | Description                |
| ------------ | -------------------------- |
| Multer       | Handles file upload        |
| Dynamic Path | Organizes files by student |
| React Form   | Sends file via FormData    |
| Express API  | Receives & stores file     |
| DB Storage   | Save only file path        |

---

## 💡 Bonus

### Multiple Files Upload

```js
upload.array("documents", 5);
```

---

Just tell me 👍
