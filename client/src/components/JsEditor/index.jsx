import React, { useContext, useEffect, useMemo, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import * as CodeMirror from "codemirror";
import { useLocation, useParams } from "react-router-dom";
import { MyContext } from "../../App";
import { html as beautifyHtml } from "js-beautify";
import axios from "axios";

const JsEditor = () => {
  const editorContainerRef = useRef(null);
  const iframeRef = useRef(null);
  const editorInstance = useRef(null);
  const location = useLocation();
  const { code } = location.state || {};
  const context = useContext(MyContext);

  const formattedCode = beautifyHtml(code?.replace(/></g, ">\n<") || "", {
    indent_size: 2,
    wrap_line_length: 80,
  });

  const { subtopic } = useParams();
  const subtopicfrompath = useMemo(() => {
    const parts = location.pathname.split("/");
    return parts[parts.length - 2] || "";
  }, [location.pathname]);
  console.log(subtopicfrompath);

  useEffect(() => {
    if (!subtopicfrompath) return;

    const fetchHeaders = async () => {
      try {
        const response = await axios.get("/headers.json");
        const headersForSubtopic = response.data[subtopicfrompath] || "";
        console.log(headersForSubtopic);
        context.setHeadElements(headersForSubtopic);

        const htmlCode = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Live Preview</title>
          <link rel="stylesheet" href="/style.css"/>
          ${context.headElements}
        </head>
        <body class="${subtopic}">
        ${formattedCode}
        </body>
        </html>`;

        context.setFullHtmlCode(htmlCode);
      } catch (error) {
        console.error("Failed to fetch headers.json", error);
      }
    };

    fetchHeaders();
  }, [
    subtopicfrompath,
    formattedCode,
    context.setHeadElements,
    context.headElements,
  ]);

  useEffect(() => {
    if (context) {
      context.setShowNavbar(false);
    }
  });

  useEffect(() => {
    if (editorContainerRef.current) {
      const textarea = document.createElement("textarea");
      editorContainerRef.current.innerHTML = "";
      editorContainerRef.current.appendChild(textarea);

      editorInstance.current = CodeMirror.fromTextArea(textarea, {
        mode: "htmlmixed",
        lineNumbers: true,
      });

      editorInstance.current.setValue(context.fullHtmlCode);

      editorInstance.current.on("change", () => {
        const code = editorInstance.current.getValue();
        if (iframeRef.current) {
          iframeRef.current.srcdoc = code;
        }
      });

      if (iframeRef.current) {
        iframeRef.current.srcdoc = context.fullHtmlCode;
      }
    }
  }, [context.fullHtmlCode]);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          height: "100%",
        }}
      >
        <div
          ref={editorContainerRef}
          style={{
            flex: 1,
            border: "1px solid #ccc",
            height: "100%",
            overflow: "auto",
          }}
        ></div>

        <iframe
          ref={iframeRef}
          title="Live Output"
          style={{
            flex: 1,
            border: "1px solid #aaa",
            backgroundColor: "white",
            height: "100%",
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default JsEditor;
