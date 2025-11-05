"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { uploadEditorImage } from "@/lib/actions/upload";

interface CKEditorWrapperProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Custom upload adapter
class UploadAdapter {
  loader: {
    file: Promise<File>;
  };

  constructor(loader: { file: Promise<File> }) {
    this.loader = loader;
  }

  async upload() {
    const file = await this.loader.file;
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadEditorImage(formData);

    if (result.error) {
      throw new Error(result.error);
    }

    return {
      default: result.url,
    };
  }

  abort() {
    // Handle abort
  }
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
            "|",
            "imageUpload",
            "mediaEmbed",
            "|",
            "undo",
            "redo",
          ],
        }}
        onReady={(editor: never) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (editor as any).plugins.get("FileRepository").createUploadAdapter = (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            loader: any
          ) => {
            return new UploadAdapter(loader);
          };
        }}
        onChange={(_event: unknown, editor: { getData: () => string }) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}
