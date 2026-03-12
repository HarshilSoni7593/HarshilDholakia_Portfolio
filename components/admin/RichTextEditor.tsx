"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import {
	Bold,
	Italic,
	List,
	ListOrdered,
	Code,
	Heading2,
	Quote,
	Undo,
	Redo,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
	content: string;
	onChange: (content: string) => void;
	placeholder?: string;
}

export function RichTextEditor({
	content,
	onChange,
	placeholder = "Start writing your lesson content...",
}: RichTextEditorProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3],
				},
			}),
			Placeholder.configure({
				placeholder,
			}),
		],
		content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class:
					"prose prose-sm dark:prose-invert max-w-none min-h-[300px] p-4 focus:outline-none",
			},
		},
		immediatelyRender: false, // FIX: Prevents SSR hydration mismatch
	});

	// Don't render editor until client-side
	if (!isMounted) {
		return (
			<div className="border rounded-lg overflow-hidden">
				<div className="border-b bg-muted/50 p-2 h-[42px]" />
				<div className="min-h-[300px] p-4 text-muted-foreground">
					Loading editor...
				</div>
			</div>
		);
	}

	if (!editor) {
		return null;
	}

	return (
		<div className="border rounded-lg overflow-hidden">
			{/* Toolbar */}
			<div className="border-b bg-muted/50 p-2 flex flex-wrap gap-1">
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={cn(editor.isActive("bold") && "bg-accent")}>
					<Bold className="h-4 w-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={cn(editor.isActive("italic") && "bg-accent")}>
					<Italic className="h-4 w-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().toggleCode().run()}
					className={cn(editor.isActive("code") && "bg-accent")}>
					<Code className="h-4 w-4" />
				</Button>

				<div className="w-px h-6 bg-border mx-1" />

				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={cn(
						editor.isActive("heading", { level: 2 }) && "bg-accent",
					)}>
					<Heading2 className="h-4 w-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={cn(editor.isActive("bulletList") && "bg-accent")}>
					<List className="h-4 w-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={cn(editor.isActive("orderedList") && "bg-accent")}>
					<ListOrdered className="h-4 w-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={cn(editor.isActive("blockquote") && "bg-accent")}>
					<Quote className="h-4 w-4" />
				</Button>

				<div className="w-px h-6 bg-border mx-1" />

				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={() => editor.chain().focus().toggleCodeBlock().run()}
					className={cn(editor.isActive("codeBlock") && "bg-accent")}>
					<Code className="h-4 w-4" />
					<span className="ml-1 text-xs">Block</span>
				</Button>

				<div className="ml-auto flex gap-1">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().undo()}>
						<Undo className="h-4 w-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().redo()}>
						<Redo className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* Editor */}
			<EditorContent editor={editor} />
		</div>
	);
}
