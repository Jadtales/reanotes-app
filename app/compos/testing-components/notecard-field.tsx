import Editor from './editor';
import Quill from 'quill';
import { useRef, useState } from 'react';

const Delta = Quill.import('delta');

export default function cardField() {
  const [range, setRange] = useState<string>();
  const [lastChange, setLastChange] = useState<string>();
  const [readOnly, setReadonly] = useState<boolean>(false);

  const quillRef = useRef(null);

  return (
    <div>
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta()}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />
    </div>
  );
}
