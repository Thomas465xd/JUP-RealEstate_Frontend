"use client";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import LogoImage from "@/public/logo-fondo.jpg"; // now it's a static import
import { useTheme } from 'next-themes';

export default function WhatsappButton() {
    const { theme } = useTheme();

    return (
        <FloatingWhatsApp
            phoneNumber="+56 9 9212 8901" 
            accountName="JUP Propiedades"
            statusMessage="Tiempo de Respuesta de 1 hora normalmente"
            chatMessage="Bienvenido a JUP Propiedades 🤝"
            placeholder="Hola, quería preguntar si..."
            allowClickAway={true}
            allowEsc={true}
            darkMode={theme === "dark"}
            avatar={LogoImage.src}
        />
    )
}
