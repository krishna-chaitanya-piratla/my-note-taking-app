// src/LexicalEditor.tsx

import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import './LexicalEditor.css';
import ErrorBoundary from './ErrorBoundary'; // Import the correctly implemented ErrorBoundary
import Toolbar from './Toolbar';

const editorConfig = {
    namespace: 'MyNoteTakingApp',
  
    theme: {
      // Inline text styles
      text: {
        bold: 'editor-text-bold',
        italic: 'editor-text-italic',
        underline: 'editor-text-underline',
        strikethrough: 'editor-text-strikethrough',
        // Add more text formats as needed
      },
      // You can define other theme classes here (e.g., paragraph, headings)
    },
  
    onError(error: Error) {
      console.error('Lexical Editor Error:', error);
    },
  
    nodes: [], // Add custom nodes here if needed
  };

const LexicalEditor: React.FC = () => {
  const onChange = (editorState: any) => {
    editorState.read(() => {
      const content = editorState.toJSON();
      console.log('Editor State:', content);
    });
  };

  const handleRichTextError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('RichTextPlugin Error:', error, errorInfo);
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <Toolbar />
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<div className="editor-placeholder">Start typing...</div>}
          ErrorBoundary={(props) => <ErrorBoundary {...props} onError={handleRichTextError} />}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={onChange} />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;
