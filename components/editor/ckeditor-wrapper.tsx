"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface CKEditorWrapperProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CKEditorWrapper({
  value,
  onChange,
  placeholder,
}: CKEditorWrapperProps) {
  return (
    <div className="border border-gray-300 rounded-md">
      <CKEditor
        editor={ClassicEditor as never}
        data={value}
        config={{
          placeholder: placeholder || "Start typing...",
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "|",
            "undo",
            "redo",
          ],
        }}
        onChange={(_event: unknown, editor: { getData: () => string }) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}
