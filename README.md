# JUP Real Estate Frontend 🏠

<div align="center">

![JUP Propiedades Logo](./public/logo-color.png)

**Tu broker de confianza - Plataforma de bienes raíces moderna y profesional**

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Sitio Web](https://www.jup.cl) • [Reportar Bug](https://github.com/Thomas465xd/JUP-RealEstate_Frontend/issues) • [Solicitar Feature](https://github.com/Thomas465xd/JUP-RealEstate_Frontend/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Uso](#-uso)
- [Scripts Disponibles](#-scripts-disponibles)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 🏠 Acerca del Proyecto

**JUP Propiedades** es una plataforma web moderna de bienes raíces diseñada para facilitar la búsqueda, visualización y gestión de propiedades en Chile. El proyecto ofrece una experiencia de usuario intuitiva y profesional tanto para clientes que buscan propiedades como para administradores que gestionan el contenido.

### Propósito

Este proyecto frontend proporciona:
- **Para Clientes**: Una interfaz moderna para buscar y explorar propiedades, ver detalles completos, contactar a agentes, y acceder a servicios inmobiliarios
- **Para Administradores**: Panel de control completo para gestionar propiedades, testimonios, y contenido del sitio
- **Para el Negocio**: Presencia digital profesional con SEO optimizado, análisis integrado, y comunicación directa vía WhatsApp

---

## ✨ Características

### 🔍 Para Usuarios
- **Búsqueda Avanzada**: Filtros por tipo de propiedad, ubicación, precio, y características
- **Propiedades Destacadas**: Visualización de las mejores ofertas disponibles
- **Galería de Imágenes**: Visualización profesional de fotos de propiedades con integración de Cloudinary
- **Información Detallada**: Fichas completas con descripción, especificaciones, y ubicación
- **Contacto Directo**: Formularios de contacto y botón flotante de WhatsApp
- **Sección de Servicios**: Información sobre servicios inmobiliarios ofrecidos
- **Testimonios**: Reseñas de clientes satisfechos
- **FAQ**: Sección de preguntas frecuentes
- **Tema Claro/Oscuro**: Soporte para preferencias de visualización del usuario

### 🔐 Para Administradores
- **Panel de Administración**: Dashboard completo para gestión de contenido
- **CRUD de Propiedades**: Crear, editar, eliminar y gestionar propiedades
- **Editor Enriquecido**: Quill editor para descripciones detalladas
- **Autenticación Segura**: Integración con Clerk para gestión de usuarios
- **Carga de Imágenes**: Upload de múltiples imágenes con Cloudinary

### 🚀 Características Técnicas
- **SSR y SSG**: Renderizado del lado del servidor con Next.js 15
- **SEO Optimizado**: Meta tags, Open Graph, y structured data
- **Responsive Design**: Adaptado a todos los dispositivos
- **Performance**: Optimización de imágenes y carga diferida
- **Analytics**: Integración con Vercel Analytics
- **Type Safety**: TypeScript para código robusto y mantenible

---

## 🛠️ Tecnologías

### Core Framework
- **[Next.js 15.4](https://nextjs.org/)** - Framework React con SSR y SSG
- **[React 19.1](https://react.dev/)** - Librería UI
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Radix UI](https://www.radix-ui.com/)** - Componentes UI accesibles
- **[Lucide React](https://lucide.dev/)** - Iconos modernos
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Sistema de temas

### State Management & Data Fetching
- **[TanStack Query (React Query)](https://tanstack.com/query)** - Data fetching y caching
- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[React Hook Form](https://react-hook-form.com/)** - Gestión de formularios
- **[Zod](https://zod.dev/)** - Validación de schemas

### Authentication & Security
- **[Clerk](https://clerk.com/)** - Autenticación y gestión de usuarios
- **[DOMPurify](https://github.com/cure53/DOMPurify)** - Sanitización de HTML

### Media & Content
- **[Cloudinary](https://cloudinary.com/)** - Gestión y optimización de imágenes
- **[React Quill](https://github.com/zenoamaro/react-quill)** - Editor de texto enriquecido

### UI/UX Enhancements
- **[SweetAlert2](https://sweetalert2.github.io/)** - Modales y alertas elegantes
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Notificaciones toast
- **[React Floating WhatsApp](https://github.com/awran5/react-floating-whatsapp)** - Widget de WhatsApp flotante

### Analytics & Monitoring
- **[Vercel Analytics](https://vercel.com/analytics)** - Análisis de tráfico y performance

### Development Tools
- **[ESLint](https://eslint.org/)** - Linting
- **[PostCSS](https://postcss.org/)** - Procesamiento CSS

---

## 📁 Estructura del Proyecto

```
JUP-RealEstate_Frontend/
├── app/                          # App Router de Next.js 15
│   ├── admin/                   # Rutas del panel de administración
│   ├── home/                    # Rutas de páginas principales
│   ├── sign-in/                 # Página de inicio de sesión
│   ├── sign-up/                 # Página de registro
│   ├── layout.tsx               # Layout raíz con providers
│   ├── page.tsx                 # Página principal (Home)
│   ├── globals.css              # Estilos globales
│   └── not-found.tsx            # Página 404
│
├── components/                   # Componentes React reutilizables
│   ├── about/                   # Componentes de sección "Acerca de"
│   ├── admin/                   # Componentes del panel admin
│   ├── auth/                    # Componentes de autenticación
│   ├── contact/                 # Componentes de contacto
│   ├── featured/                # Componentes de propiedades destacadas
│   ├── home/                    # Componentes de la página principal
│   ├── properties/              # Componentes de propiedades
│   ├── providers/               # Context providers (Theme, Query, Toast, etc.)
│   ├── questions/               # Componentes de FAQ
│   ├── services/                # Componentes de servicios
│   ├── skeletons/               # Loading skeletons
│   └── utility/                 # Componentes utilitarios (WhatsApp, BackToTop)
│
├── src/
│   ├── api/                     # Servicios API (Axios)
│   │   ├── FeaturedAPI.ts       # API de propiedades destacadas
│   │   ├── PropertyAPI.ts       # API de propiedades
│   │   └── SearchAPI.ts         # API de búsqueda
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # Definiciones de tipos TypeScript
│   └── utils/                   # Funciones utilitarias
│
├── lib/                         # Librerías y configuraciones
├── public/                      # Assets estáticos
│   ├── logo-color.png           # Logo de JUP
│   ├── hero-image-*.jpg         # Imágenes hero
│   └── ...                      # Otras imágenes
│
├── middleware.ts                # Middleware de Next.js
├── next.config.ts               # Configuración de Next.js
├── tailwind.config.ts           # Configuración de Tailwind
├── tsconfig.json                # Configuración de TypeScript
├── eslint.config.mjs            # Configuración de ESLint
├── postcss.config.mjs           # Configuración de PostCSS
├── components.json              # Configuración de componentes UI
└── package.json                 # Dependencias y scripts
```

---

## 🚀 Instalación

### Prerrequisitos

- **Node.js** 20.x o superior
- **npm** o **yarn** o **pnpm**
- Cuenta en [Clerk](https://clerk.com/) para autenticación
- Cuenta en [Cloudinary](https://cloudinary.com/) para gestión de imágenes
- (Opcional) Cuenta en [EmailJS](https://www.emailjs.com/) para formularios de contacto

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Thomas465xd/JUP-RealEstate_Frontend.git
   cd JUP-RealEstate_Frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env.local` en la raíz del proyecto:
   ```env
   # Ver sección de Configuración para detalles completos
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clerk_publishable_key
   CLERK_SECRET_KEY=tu_clerk_secret_key
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloudinary_cloud_name
   # ... (ver sección de Configuración)
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   
   Navega a [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configuración

### Variables de Entorno

Crear un archivo `.env.local` con las siguientes variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Cloudinary (Image Management)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# API Backend (si aplica)
NEXT_PUBLIC_API_URL=https://api.jup.cl
# o para desarrollo local
# NEXT_PUBLIC_API_URL=http://localhost:8080

# EmailJS (Contact Forms)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=+56982192688

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.jup.cl
```

### Configuración de Clerk

1. Crear una cuenta en [Clerk](https://clerk.com/)
2. Crear una nueva aplicación
3. Copiar las API keys al archivo `.env.local`
4. Configurar rutas de sign-in y sign-up en el dashboard de Clerk

### Configuración de Cloudinary

1. Crear una cuenta en [Cloudinary](https://cloudinary.com/)
2. Obtener Cloud Name y API credentials
3. Agregar las credenciales al archivo `.env.local`

---

## 💻 Uso

### Desarrollo

```bash
# Iniciar servidor de desarrollo (con Turbopack)
npm run dev

# El servidor estará disponible en http://localhost:3000
```

### Producción

```bash
# Build para producción
npm run build

# Iniciar servidor de producción
npm run start
```

### Linting

```bash
# Ejecutar ESLint
npm run lint
```

---

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con Turbopack |
| `npm run build` | Construye la aplicación para producción |
| `npm run start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta ESLint para verificar el código |

---

## 📄 Licencia

Este proyecto es **privado** y pertenece a **JUP Propiedades**. Todos los derechos reservados.

Para uso, distribución o modificación de este código, contactar directamente con el propietario.

---

## 📞 Contacto

**JUP Propiedades**

- 🌐 Sitio Web: [www.jup.cl](https://www.jup.cl)
- 📧 Email: contacto@jup.cl
- 📱 WhatsApp: [+56 9 8219 2688](https://wa.me/56982192688)
- 📍 Dirección: San Carlos de Apoquindo #2991, Las Condes, Santiago, Chile

**Desarrollador**

- GitHub: [@Thomas465xd](https://github.com/Thomas465xd)
- Repositorio: [JUP-RealEstate_Frontend](https://github.com/Thomas465xd/JUP-RealEstate_Frontend)

---

<div align="center">

**Hecho con ❤️ para JUP Propiedades**

*Tu broker de confianza - Te acompañamos desde la búsqueda hasta que recibes tu nuevo hogar*

</div>
