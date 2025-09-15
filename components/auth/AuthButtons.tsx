import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

export default function AuthButtons() {
    return (
        <div className="flex-center space-x-2">
            <SignedOut>
                <Link href="/sign-in">
                    <button
                        className={`
                            rounded-full font-medium 
                            text-xs sm:text-sm lg:text-base
                            h-8 sm:h-10 lg:h-11
                            px-3
                            transition-all duration-200 hover:scale-101
                            dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600
                            bg-zinc-900 text-white hover:bg-zinc-800
                            text-nowrap
                        `}
                    >
                        Iniciar Sesión
                    </button>
                </Link>
                <Link href="/sign-up">
                    <button
                        className={`
                            bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                            rounded-full font-medium
                            text-xs sm:text-sm lg:text-base
                            h-8 sm:h-10 lg:h-11
                            px-3 sm:px-4 lg:px-6
                            transition-all duration-200 hover:scale-101
                            hover:from-blue-600 hover:to-blue-700
                        `}
                    >
                        Registrarse
                    </button>
                </Link>
            </SignedOut>
            <SignedIn>
                <div className="scale-100 sm:scale-110">
                    <UserButton />
                </div>
            </SignedIn>
        </div>
    )
}
