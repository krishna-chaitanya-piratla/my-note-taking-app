// src/Toolbar.tsx

import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
  $isTextNode
} from 'lexical';
import './Toolbar.css';

const Toolbar: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const toggleFormat = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const isFormatActive = (format: TextFormatType): boolean => {
    let active = false;
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes(); // Correct method to retrieve nodes
        for (const node of nodes) {
          if ($isTextNode(node)) {
            const textNode = node;
            if (textNode.hasFormat(format)) {
              active = true;
              break;
            }
          }
        }
      }
    });
    return active;
  };
  

  return (
    <div className="toolbar">
      <button
        className={`toolbar-button ${isFormatActive('bold') ? 'active' : ''}`}
        onClick={() => toggleFormat('bold')}
        title="Bold (Ctrl+B)"
      >
        <b>B</b>
      </button>
      <button
        className={`toolbar-button ${isFormatActive('italic') ? 'active' : ''}`}
        onClick={() => toggleFormat('italic')}
        title="Italic (Ctrl+I)"
      >
        <i>I</i>
      </button>
      <button
        className={`toolbar-button ${isFormatActive('underline') ? 'active' : ''}`}
        onClick={() => toggleFormat('underline')}
        title="Underline (Ctrl+U)"
      >
        <u>U</u>
      </button>
      <button
        className={`toolbar-button ${isFormatActive('strikethrough') ? 'active' : ''}`}
        onClick={() => toggleFormat('strikethrough')}
        title="Strikethrough (Ctrl+Shift+S)"
      >
        <s>S</s>
      </button>
      {/* Add more formatting buttons as needed */}
    </div>
  );
};

export default Toolbar;
