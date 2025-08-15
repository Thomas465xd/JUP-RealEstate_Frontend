import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

export default function AuthButtons() {
    return (
        <div className="flex items-center space-x-2">
            <SignedOut>
                <Link href="/sign-in">
                    <button
                        className={`
                            rounded-full font-medium text-sm h-10 px-4 transition-all duration-200 hover:scale-105 
                            dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600
                            bg-zinc-900 text-white hover:bg-zinc-800
                        `}
                    >
                        Iniciar Sesión
                    </button>
                </Link>
                <Link href="/sign-up">
                    <button className="
                        bg-gradient-to-r from-red-500 to-red-600 text-white 
                        rounded-full font-medium text-sm h-10 px-4 
                        transition-all duration-200 hover:scale-105 
                        hover:from-orange-600 hover:to-orange-700
                    ">
                        Registrarse
                    </button>
                </Link>
            </SignedOut>
            <SignedIn>
                <div className="scale-110">
                    <UserButton />
                </div>
            </SignedIn>
        </div>
    )
}
