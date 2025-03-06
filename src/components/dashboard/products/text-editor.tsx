"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill-new/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
  isLoading: boolean;
}

export const TextEditor = ({ onChange, value, isLoading }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );

  return (
    <div className="bg-background">
      <ReactQuill theme="snow" value={value} onChange={onChange} readOnly={isLoading} />
    </div>
  );
};
