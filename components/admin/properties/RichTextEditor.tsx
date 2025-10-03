"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
	ssr: false,
	loading: () => (
		<div className="h-64 bg-zinc-100 dark:bg-zinc-700 animate-pulse rounded-lg" />
	),
});

interface RichTextEditorProps {
	value: string;
	onChange: (value: string) => void;
}

export default function RichTextEditor({
	value,
	onChange,
}: RichTextEditorProps) {
	const modules = useMemo(
		() => ({
			toolbar: [
				[{ header: [1, 2, 3, false] }],
				["bold", "italic", "underline"],
				[{ list: "ordered" }, { list: "bullet" }], // ✅ Quill understands "bullet" as part of "list"
				["link"],
				["clean"],
			],
		}),
		[]
	);

	const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"list", // ✅ keep only "list", don't add "bullet" separately
		"link",
	];

	return (
		<div className="rich-text-editor">
			<ReactQuill
				theme="snow"
				value={value}
				onChange={onChange}
				modules={modules}
				formats={formats}
				placeholder="Describe las características principales de la propiedad..."
				className="bg-white dark:bg-zinc-700 rounded-lg"
			/>
		</div>
	);
}
