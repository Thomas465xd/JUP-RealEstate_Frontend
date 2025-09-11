import Image from "next/image";
import Link from "next/link";
import LogoImage from "@/public/logo-color.png"; // now it's a static import

type LogoProps = {
    mini?: boolean;
}

export default function Logo({ mini } : LogoProps) {
    return (
        <div className="flex-shrink-0 flex items-center">
            <Link
                href="/"
                className="flex items-center space-x-2"
            >
                <Image
                    src={LogoImage}
                    alt="Company Logo"
                    width={160}       // base size for large screens
                    height={160}      // keep aspect ratio
                    priority
                    className="object-contain h-auto w-auto"
                    placeholder="empty"
                    sizes="(max-width: 640px) 100px, (max-width: 1024px) 120px, 160px"
                />
            </Link>
        </div>
    );
}

// export default function Logo() {
//     return (
//         <div className="flex-shrink-0 flex items-center">
//             <Link
//                 href="/"
//                 className="flex items-center space-x-2"
//             >
//                 <div className="w-10 h-10 lg:w-16 lg:h-16 relative">
//                     <Image
//                         src={LogoImage}
//                         alt="Company Logo"
//                         width={70}   // same as w-10 (10 * 4 = 40px)
//                         height={70}  // same as h-10
//                         priority
//                         className="object-contain"
//                         placeholder="empty" // disables blur placeholder
//                     />
//                 </div>
//                 <div className="flex flex-col">
//                     <span
//                         className={`
//                             text-xl lg:text-2xl font-bold text-gray-900 dark:text-white
//                         `}
//                     >
//                         JUP
//                     </span>
//                     <span
//                         className={`
//                             text-xs lg:text-sm font-medium dark:text-gray-300 text-gray-600 -mt-1
//                         `}
//                     >
//                         PROPIEDADES
//                     </span>
//                 </div>
//             </Link>
//         </div>
//     );
// }