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