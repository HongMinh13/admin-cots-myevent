"use client";

import { ContentState, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React from "react";

interface MyEditorProps {
  initialValue?: string;
  onChange: (text: string) => void;
}

export const TextEditor = ({ initialValue, onChange }: MyEditorProps) => {
  useEffect(() => {
    console.log("window.innerHeight", window.innerHeight);
  }, []);

  const [editorState, setEditorState] = useState(() => {
    if (initialValue) {
      let contentBlock;
      if (typeof window !== "undefined") {
        contentBlock = htmlToDraft(initialValue);
      }
      const contentState = contentBlock
        ? ContentState.createFromBlockArray(contentBlock.contentBlocks)
        : ContentState.createFromText("");
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (initialValue && typeof window !== "undefined") {
      const contentBlock = htmlToDraft(initialValue);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [initialValue]);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const content = state.getCurrentContent();
    const html = draftToHtml(convertToRaw(content));
    onChange(html);
  };

  return (
    <div className="text-editor">
      <Editor
        wrapperClassName="wrapper-class rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background 
        file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-96"
        placeholder="Nhập nội dung chi tiết"
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
};
