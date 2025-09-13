import { MessageSquare } from "lucide-react";
import Link from "next/link";

type ServiceProps  = {
	icon: React.ReactNode;
	title: string;
	description: string;
	buttonText: string;
    contactMessage?: string;
}

export default function({ icon, title, description, buttonText, contactMessage = "Hola, me gustaría realizar una consulta sobre su servicio de..." } : ServiceProps) {
	return (
		<div className="group group card">
			<div className="flex flex-col items-center text-center h-full">
				<div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors duration-300 mb-6">
					<div className="text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
						{icon}
					</div>
				</div>

				<div className="flex-grow flex flex-col justify-between">
					<div className="space-y-4 mb-6">
						<h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
							{title}
						</h3>

						<p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
							{description}
						</p>
					</div>

                    <Link
                        href={`/home/contact?service=${title}
                        )}&message=${encodeURIComponent(contactMessage)}`}
                        className="w-full bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-900 dark:hover:bg-zinc-600 text-white text-sm font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                    >
                        { buttonText }
                    </Link>
				</div>
			</div>
		</div>
	);
};
