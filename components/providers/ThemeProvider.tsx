"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"

export function Theme({ children } : { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            {children}
        </ThemeProvider>
    )
}