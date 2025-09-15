import QuestionsPage from "@/components/questions/QuestionsPage"
import Questions from "@/components/questions/QuestionsSection"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Preguntas Frecuentes"
}

export default function page() {
    return (
        <section className="">
            <QuestionsPage />
        </section>
    )
}
