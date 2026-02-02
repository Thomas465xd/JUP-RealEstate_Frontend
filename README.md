# JUP Real Estate Frontend 🏠

<div align="center">

![JUP Propiedades Logo](./public/logo-color.png)

**Your trusted broker - Modern and professional real estate platform**

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red.svg)](#-license)

[Website](https://www.jup.cl) • [Report Bug](https://github.com/Thomas465xd/JUP-RealEstate_Frontend/issues) • [Request Feature](https://github.com/Thomas465xd/JUP-RealEstate_Frontend/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Technologies](#️-technologies)
- [Project Structure](#-project-structure)
- [Usage](#-usage)
- [License](#-license)

---

## 🏠 About the Project

**JUP Propiedades** is a modern real estate web platform designed to facilitate the search, visualization, and management of properties in Chile. The project offers an intuitive and professional user experience for both clients looking for properties and administrators managing the content.

### Purpose

This frontend project provides:
- **For Clients**: A modern interface to search and explore properties, view complete details, contact agents, and access real estate services
- **For Administrators**: Complete control panel to manage properties, testimonials, and site content
- **For the Business**: Professional digital presence with optimized SEO, integrated analytics, and direct communication via WhatsApp

---

## ✨ Features

### 🔍 For Users
- **Advanced Search**: Filters by property type, location, price, and features
- **Featured Properties**: Visualization of the best available offers
- **Image Gallery**: Professional display of property photos with Cloudinary integration
- **Detailed Information**: Complete listings with description, specifications, and location
- **Direct Contact**: Contact forms and floating WhatsApp button
- **Services Section**: Information about real estate services offered
- **Testimonials**: Reviews from satisfied clients
- **FAQ**: Frequently asked questions section
- **Light/Dark Theme**: Support for user display preferences

### 🔐 For Administrators
- **Administration Panel**: Complete dashboard for content management
- **Property CRUD**: Create, edit, delete, and manage properties
- **Rich Editor**: Quill editor for detailed descriptions
- **Secure Authentication**: Clerk integration for user management
- **Image Upload**: Upload multiple images with Cloudinary

### 🚀 Technical Features
- **SSR and SSG**: Server-side rendering with Next.js 15
- **Optimized SEO**: Meta tags, Open Graph, and structured data
- **Responsive Design**: Adapted to all devices
- **Performance**: Image optimization and lazy loading
- **Analytics**: Vercel Analytics integration
- **Type Safety**: TypeScript for robust and maintainable code

---

## 🛠️ Technologies

### Core Framework
- **[Next.js 15.4](https://nextjs.org/)** - React framework with SSR and SSG
- **[React 19.1](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI components
- **[Lucide React](https://lucide.dev/)** - Modern icons
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme system

### State Management & Data Fetching
- **[TanStack Query (React Query)](https://tanstack.com/query)** - Data fetching and caching
- **[Axios](https://axios-http.com/)** - HTTP client
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation

### Authentication & Security
- **[Clerk](https://clerk.com/)** - Authentication and user management
- **[DOMPurify](https://github.com/cure53/DOMPurify)** - HTML sanitization

### Media & Content
- **[Cloudinary](https://cloudinary.com/)** - Image management and optimization
- **[React Quill](https://github.com/zenoamaro/react-quill)** - Rich text editor

### UI/UX Enhancements
- **[SweetAlert2](https://sweetalert2.github.io/)** - Elegant modals and alerts
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Toast notifications
- **[React Floating WhatsApp](https://github.com/awran5/react-floating-whatsapp)** - Floating WhatsApp widget

### Analytics & Monitoring
- **[Vercel Analytics](https://vercel.com/analytics)** - Traffic and performance analytics

### Development Tools
- **[ESLint](https://eslint.org/)** - Linting
- **[PostCSS](https://postcss.org/)** - CSS processing

---

## 📁 Project Structure

```
JUP-RealEstate_Frontend/
├── app/                          # Next.js 15 App Router
│   ├── admin/                   # Admin panel routes
│   ├── home/                    # Main page routes
│   ├── sign-in/                 # Sign-in page
│   ├── sign-up/                 # Sign-up page
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   └── not-found.tsx            # 404 page
│
├── components/                   # Reusable React components
│   ├── about/                   # About section components
│   ├── admin/                   # Admin panel components
│   ├── auth/                    # Authentication components
│   ├── contact/                 # Contact components
│   ├── featured/                # Featured properties components
│   ├── home/                    # Home page components
│   ├── properties/              # Property components
│   ├── providers/               # Context providers (Theme, Query, Toast, etc.)
│   ├── questions/               # FAQ components
│   ├── services/                # Services components
│   ├── skeletons/               # Loading skeletons
│   └── utility/                 # Utility components (WhatsApp, BackToTop)
│
├── src/
│   ├── api/                     # API services (Axios)
│   │   ├── FeaturedAPI.ts       # Featured properties API
│   │   ├── PropertyAPI.ts       # Properties API
│   │   └── SearchAPI.ts         # Search API
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # TypeScript type definitions
│   └── utils/                   # Utility functions
│
├── lib/                         # Libraries and configurations
├── public/                      # Static assets
│   ├── logo-color.png           # JUP logo
│   ├── hero-image-*.jpg         # Hero images
│   └── ...                      # Other images
│
├── middleware.ts                # Next.js middleware
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
├── postcss.config.mjs           # PostCSS configuration
├── components.json              # UI components configuration
└── package.json                 # Dependencies and scripts
```

---

## 💻 Usage

### Development

```bash
# Start development server (with Turbopack)
npm run dev

# Server will be available at http://localhost:3000
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Linting

```bash
# Run ESLint
npm run lint
```

---

## 📄 License

This project is **private** and belongs to **JUP Propiedades**. All rights reserved.

For use, distribution, or modification of this code, please contact the owner directly.

---

<div align="center">

**Made with ❤️ for JUP Propiedades**

*Your trusted broker - We accompany you from the search until you receive your new home*

</div>
