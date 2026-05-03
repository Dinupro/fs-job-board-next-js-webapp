# 🚀 Easy Job Board - Next.js Premium WebApp

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.8.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Neon](https://img.shields.io/badge/Database-Neon_PostgreSQL-00E599?style=for-the-badge&logo=postgresql)](https://neon.tech/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

A high-performance, premium job board application built with the latest **Next.js App Router**, **Prisma 7**, and **Neon PostgreSQL**. Designed with a focus on rich aesthetics, smooth user experience, and secure backend workflows.

🔗 **Repository:** [github.com/Dinupro/fs-job-board-next-js-webapp](https://github.com/Dinupro/fs-job-board-next-js-webapp)

---

## ✨ Key Features

### 💎 Premium UI/UX
- **Modern Glassmorphism**: Stunning visual design using transparent layers and background blurs.
- **Dynamic Animations**: Smooth transitions and entry effects using custom CSS keyframes.
- **Micro-interactions**: Responsive hover effects, active states, and focus indicators.
- **Loading Skeletons**: Professional shimmering skeleton states for content initialization.

### 📝 Advanced Application Workflow
- **Apply Now Modal**: A high-end, multi-step inspired form for job seekers.
- **Secure File Uploads**: Support for PDF, PNG, and JPG resumes with server-side validation.
- **Instant Validation**: Real-time feedback and server-side Zod validation for all form fields.
- **Optimized Feedback**: Verified storage flow ensuring users only see a success message after data is safely persisted.

### 🛠️ Robust Backend
- **Prisma 7 Architecture**: Implementation of the new **Neon Driver Adapter** (WebSocket-based) for serverless reliability.
- **Secure Storage**: Resumes are stored in a private directory outside the public web path.
- **API Rate Limiting**: Built-in protection for application submission endpoints.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS 4 |
| **Icons** | Lucide React |
| **Database** | Neon PostgreSQL (Serverless) |
| **ORM** | Prisma 7.8.0 (with Neon Adapter) |
| **Validation** | Zod |
| **Auth** | NextAuth.js (Integrated) |
| **Mailing** | Nodemailer |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- A Neon PostgreSQL account and database URL

### 1. Clone the Repository
```bash
git clone https://github.com/Dinupro/fs-job-board-next-js-webapp.git
cd fs-job-board-next-js-webapp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@ep-host.region.aws.neon.tech/neondb?sslmode=require"
```

### 4. Database Sync
Push the schema to your Neon database and generate the Prisma client:
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Pages & API)
│   ├── api/              # Backend API Endpoints (Applications, Jobs)
│   ├── jobs/             # Job Listing and Details Pages
│   └── globals.css       # Global Styles & Tailwind Config
├── components/           # Reusable UI Components (Modals, Nav, Skeletons)
├── lib/                  # Shared Logic (Prisma Singleton, Helper Functions)
├── prisma/               # Database Schema (User, Application models)
├── public/               # Static Assets (Images, Logos)
└── uploads/              # (Private) Secure Resume Storage Folder
```

---

## 🔒 Security Best Practices
- **Server-Side Validation**: All data is parsed and validated using Zod before database entry.
- **Private File Paths**: Resume files are stored outside the `public/` directory to prevent direct URL access.
- **Sanitized Filenames**: Uploaded files are renamed with timestamps and sanitized to prevent path injection.
- **Prisma Singleton**: Efficient connection pooling to prevent database exhaustion in development.

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License
This project is licensed under the MIT License.

---

Developed with ❤️ by [Dinupro](https://github.com/Dinupro)
