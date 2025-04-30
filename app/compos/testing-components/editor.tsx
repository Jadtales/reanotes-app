'use client';

import Quill from 'quill';
import { useCallback, useEffect, useRef } from 'react';
import './notecard-field-styling.css';
import { ClickedEditingToolsInterface } from '../notes-creation-components/notes-creation-interfaces/editing-tools-interface';

interface ComponentProps {
  editingTools: ClickedEditingToolsInterface;
}

export default function Editor({ editingTools }: ComponentProps) {
  const tools = editingTools;
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (!quillInstance.current) return;
    const quill = quillInstance.current;
    const range = quill.getSelection();

    if (!range) return;

    if (tools.isClicked && tools.clickedButton === 'background') {
      quill.format('background', '#ae5630');
      quill.format('color', '#f0f0f0');
    } else if (!tools.isClicked && tools.clickedButton === 'background') {
      quill.format('background', false);
      quill.format('color', 'black');
    }

    if (
      tools.isClicked &&
      (tools.clickedButton === 'bullet' || tools.clickedButton === 'ordered')
    ) {
      const listType = tools.clickedButton === 'bullet' ? 'bullet' : 'ordered';
      quill.format('list', listType);
    } else if (
      !tools.isClicked &&
      (tools.clickedButton === 'bullet' || tools.clickedButton === 'ordered')
    ) {
      quill.format('list', false);
    }

    quill.format(tools.clickedButton, tools.isClicked);
  }, [tools]);

  const quillRef = useCallback((wrapper: HTMLDivElement) => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const quill = new Quill(editor, { modules: { toolbar: false } });
    quillInstance.current = quill;
  }, []);

  return (
    <div
      id='container'
      ref={quillRef}
      data-placeholder={'Chapter number/name'}
    ></div>
  );
}
