import Services from '@/components/services/ServiceList'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nuestros Servicios"
}


export default function page() {
    return (
        <Services
            title='Conoce Nuestros Servicios'
        />
    )
}
