import "./style.css";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { useEffect, useRef } from "react";

function App() {
  const editorjsRef = useRef(null);

  const initEditor = () => {
    console.log("Initializing EditorJS");
    const editor = new EditorJS({
      tools: {
        header: {
          class: Header,
        },
      },
      onReady: () => {
        editorjsRef.current = editor;
      },
      onChange: async (api, event) => {
        const content = await editor.save();
        console.log(content);
      },
      holder: "editorjs",
      autofocus: true,
    });
  };

  useEffect(() => {
    console.log("Component mounted");
    if (!editorjsRef.current) {
      initEditor();
    }
    return () => {
      console.log("Cleaning up EditorJS");
      editorjsRef.current?.destroy();
      editorjsRef.current = null;
    };
  }, []);

  return (
    <div className="container">
      <div className="editorjs" id="editorjs"></div>
      <h1>hello</h1>
    </div>
  );
}

export default App;
