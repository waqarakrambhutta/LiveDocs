"use client";

import Theme from "./plugins/Theme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { liveblocksConfig, useEditorStatus } from "@liveblocks/react-lexical";
import React from "react";
import Loader from "../Loader";
import FloatingToolbar from "./plugins/FloatingToolbarPlugin";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export function Editor({
  roomId,
  currentUserType,
}: {
  roomId: string;
  currentUserType: UserType;
}) {
  const status = useEditorStatus();

  const initialConfig = liveblocksConfig({
    namespace: "Editor",
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable: currentUserType === "editor",
  });

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full">
        <div className="toolbar-wrapper flex min-w-full justify-between">
          <ToolbarPlugin />
          {/* {currentUserType == 'editor' && <DeleteModal roomId={roomId}/>} */}
        </div>
        <div className="editor-wrapper flex flex-col items-center justify-start">
          {status == "not-loaded" || status == "loading" ? (
            <Loader />
          ) : (
            <div className="editor-inner min-h-[1100px] relative mb-5 h-fit w-full max-w-[800px] shadow-md lg:mb-10">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="editor-input h-full" />
                }
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              {currentUserType === "editor" && <FloatingToolbar />}
              <HistoryPlugin />
              <AutoFocusPlugin />
            </div>
          )}
        </div>
      </div>
    </LexicalComposer>
  );
}
function liveblocksconfig(arg0: {
  namespace: string;
  nodes: (typeof HeadingNode)[];
  onError: (error: Error) => never;
  theme: {
    code: string;
    heading: { h1: string; h2: string; h3: string; h4: string; h5: string };
    image: string;
    link: string;
    list: {
      listitem: string;
      nested: { listitem: string };
      ol: string;
      ul: string;
    };
    ltr: string;
    paragraph: string;
    placeholder: string;
    quote: string;
    rtl: string;
    text: {
      bold: string;
      code: string;
      hashtag: string;
      italic: string;
      overflowed: string;
      strikethrough: string;
      underline: string;
      underlineStrikethrough: string;
    };
  };
}) {
  throw new Error("Function not implemented.");
}
