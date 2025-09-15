"use client";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import LogoImage from "@/public/logo-fondo.jpg"; // now it's a static import
import { useTheme } from 'next-themes';

export default function WhatsappButton() {
    const { theme } = useTheme();

    return (
        <FloatingWhatsApp
            phoneNumber="+56 9 8219 2688" 
            accountName="JUP Propiedades"
            statusMessage="Tiempo de Respuesta de 1 hora normalmente"
            chatMessage="Bienvenido a JUP Propiedades ¿En que Podemos ayudarte Hoy? 🫡🏠"
            placeholder="Hola, quería preguntar si..."
            allowClickAway={false}
            allowEsc={true}
            darkMode={theme === "dark"}
            avatar={LogoImage.src}
        />
    )
}
