"use client";

import dynamic from "next/dynamic";
import { Textarea } from "@/components/ui/textarea";
import type { ComponentType } from "react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CKEditorWrapper = dynamic<EditorProps>(
  () =>
    import("./ckeditor-wrapper") as Promise<{
      default: ComponentType<EditorProps>;
    }>,
  {
    ssr: false,
    loading: () => <Textarea placeholder="Loading editor..." disabled />,
  }
);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  return (
    <CKEditorWrapper
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
