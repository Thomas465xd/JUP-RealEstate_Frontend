import { Linkedin, Mail, Phone, Star } from 'lucide-react';
import React from 'react'

type FounderCardProps = {
	name: string;
	role: string;
	image: string;
	description: string;
	experience: string;
	specialties: string[];
}

export default function FounderCard({
    name,
    role, 
    image, 
    description, 
    experience, 
    specialties
} : FounderCardProps) {
    return (
        <div className="group relative bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-zinc-200 dark:border-zinc-700 h-full flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/5 dark:to-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative p-8 flex flex-col h-full">
                <div className="flex flex-col items-center text-center flex-grow">
                    {/* Profile Image and Header - Fixed Height */}
                    <div className="relative mb-6">
                        <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg ring-4 ring-white dark:ring-zinc-800">
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                            <Star className="w-4 h-4" />
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                        {name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
                        {role}
                    </p>

                    <div className="bg-zinc-50 dark:bg-zinc-700/50 rounded-lg px-4 py-2 mb-4">
                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                            {experience}
                        </span>
                    </div>

                    {/* Description - Flexible Height */}
                    <div className="flex-grow flex items-start mb-6">
                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Bottom Section - Always at Bottom */}
                <div className="mt-auto space-y-4">
                    {/* Specialties */}
                    <div className="w-full">
                        <h4 className="text-sm text-center font-semibold text-zinc-900 dark:text-white mb-3">
                            Especialidades:
                        </h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {specialties.map((specialty, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full"
                                >
                                    {specialty}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Contact Buttons */}
                    <div className="flex gap-3 justify-center pt-2">
                        <button className="p-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-300">
                            <Phone className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                        </button>
                        <button className="p-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-300">
                            <Mail className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                        </button>
                        <button className="p-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-300">
                            <Linkedin className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}