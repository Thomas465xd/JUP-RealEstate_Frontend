"use client";
import { useState } from "react";

export default function QuestionsSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
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
        <div className="max-w-4xl mx-auto my-12 flex flex-col md:flex-row items-start justify-center gap-8 px-4 md:px-0">
            <img
                className="max-w-md w-full rounded-xl h-auto"
                src="https://images.unsplash.com/photo-1598791294421-3fb022bd0447?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=830&h=900&auto=format&fit=crop"
                alt=""
            />
            <div>
                <p className="text-blue-600 dark:text-blue-500 text-sm font-medium">FAQ's</p>
                <h1 className="text-3xl font-semibold">¿Aún tienes Preguntas?</h1>
                <p className="text-sm text-slate-500 mt-2 pb-4">
                    Ship Beautiful Frontends Without the Overhead — Customizable, Scalable and Developer-Friendly UI Components.
                </p>
                {faqs.map((faq, index) => (
                    <div className="border-b border-slate-200 py-4 cursor-pointer" key={index} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-medium">
                                {faq.question}
                            </h3>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}>
                                <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#1D293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className={`text-sm text-slate-500 transition-all duration-500 ease-in-out max-w-md ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};