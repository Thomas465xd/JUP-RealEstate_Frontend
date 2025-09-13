import NotFound from '@/components/utility/NotFound'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Página no Encontrada"
}

export default function Error() {
    return (
        <section className=''>
            <NotFound />
        </section>
    )
}
