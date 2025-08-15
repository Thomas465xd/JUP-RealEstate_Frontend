import Link from "next/link";

export default function Logo() {
    return (
        <div className="flex-shrink-0 flex items-center">
            <Link
                href="/"
                className="flex items-center space-x-2"
            >
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-bl from-zinc-400 via-zinc-700 to-zinc-600 rounded-full flex items-center justify-center">
                    <span
                        className={`
                            text-xl lg:text-2xl font-bold text-white
                        `}
                    >
                        J
                    </span>
                </div>
                <div className="flex flex-col">
                    <span
                        className={`
                            text-xl lg:text-2xl font-bold text-gray-900 dark:text-white
                        `}
                    >
                        JUP
                    </span>
                    <span
                        className={`
                            text-xs lg:text-sm font-medium dark:text-gray-300 text-gray-600 -mt-1
                        `}
                    >
                        PROPIEDADES
                    </span>
                </div>
            </Link>
        </div>
    );
}