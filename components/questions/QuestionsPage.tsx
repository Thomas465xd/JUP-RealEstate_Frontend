"use client";
import { useState } from "react";

export default function QuestionsPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const faqsData = [
        {
            question: "¿Qué servicios ofrece un corredor de propiedades y qué beneficios tengo al contratar uno?",
            answer: "El corredor de propiedades te ayuda a encontrar la propiedad adecuada, realiza una correcta asesoría legal y financiera, gestiona la negociación, verifica cargas y antecedentes, coordina visitas y te acompaña en todo el proceso de compra. Además, se encarga de asegurar que toda la operación se realice conforme a la ley, protegiendo tus intereses y ahorrándote tiempo y posibles complicaciones.",
        },
        {
            question: "¿Qué es la Carta Oferta en un proceso de Compra y cuál es su utilidad?",
            answer: "La carta oferta o propuesta de compra en el corretaje inmobiliario es un documento formal que un comprador potencial presenta al vendedor de un inmueble, expresando su intención de comprar la propiedad bajo ciertos términos y condiciones. Esta carta sirve como un paso preliminar en el proceso de compra, estableciendo las bases para la negociación y detallando los términos que el comprador está dispuesto a aceptar.",
        },
        {
            question: "¿Qué es la Promesa de Compraventa y cuál es su importancia?",
            answer: "Es un contrato de promesa de compraventa de un bien inmueble es un acuerdo preliminar entre el comprador y el vendedor en el que ambas partes se comprometen a celebrar un contrato de compraventa definitivo en el futuro, cumpliendo ciertas condiciones establecidas en el contrato de promesa. Este documento es fundamental en el ámbito inmobiliario, ya que garantiza que las partes se comprometen a la transacción y establecen las condiciones y plazos para su ejecución.",
        },
        {
            question: "¿Qué es el Estudio de Títulos y cuál es su importancia? ",
            answer: "Un estudio de títulos es un análisis exhaustivo de los antecedentes legales de una propiedad inmobiliaria para verificar que el vendedor es el legítimo propietario y que la propiedad está libre de cargas o gravámenes que puedan afectar su transferencia. Este proceso es esencial para garantizar la seguridad jurídica en la compra de bienes raíces, evitando futuros problemas legales para el comprador.",
        },
        {
            question: "¿En qué fijarse antes de firmar un contrato de arriendo?",
            answer: "Se debe revisar que estén claramente especificados: monto del arriendo, duración del contrato, condiciones de devolución de la garantía, obligaciones del arrendatario y arrendador, normas de convivencia y posibles penalizaciones.",
        },
    ];
    return (
        <div className="flex flex-col items-center min-h-screen bg-zinc-100 dark:bg-zinc-900/40 py-8 text-center text-zinc-800 dark:text-zinc-200 px-3">
            <p className="text-base font-medium text-blue-600 dark:text-blue-500">FAQ</p>
            <h1 className="text-3xl md:text-4xl font-semibold mt-2">
                Preguntas Frecuentes JUP
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 max-w-sm">
                Proactively answering FAQs boosts user confidence and cuts down on support tickets.
            </p>

            <div className="max-w-xl w-full mt-6 flex flex-col gap-4 items-start text-left">
                {faqsData.map((faq, index) => (
                    <div key={index} className="flex flex-col items-start w-full">
                        <div
                            className="flex items-center justify-between w-full cursor-pointer 
                            bg-gradient-to-r from-indigo-50 to-white 
                            dark:from-zinc-950 dark:to-zinc-900
                            border border-indigo-100 dark:border-zinc-700
                            p-4 rounded-lg"
                            onClick={() =>
                                setOpenIndex(openIndex === index ? null : index)
                            }
                        >
                            <h2 className="text-sm">{faq.question}</h2>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${
                                    openIndex === index ? "rotate-180" : ""
                                } transition-all duration-500 ease-in-out`}
                            >
                                <path
                                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <p
                            className={`text-sm text-zinc-500 dark:text-zinc-400 px-4 transition-all duration-500 ease-in-out ${
                                openIndex === index
                                    ? "opacity-100 max-h-[300px] tranzinc-y-0 pt-4"
                                    : "opacity-0 max-h-0 -tranzinc-y-2"
                            }`}
                        >
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
