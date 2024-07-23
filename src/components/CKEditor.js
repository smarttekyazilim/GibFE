import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const TheCKEditor = ({ value, onChange, editorConfiguration }) => {
    return (
        <CKEditor
          editor={ClassicEditor}
          data={value}
          config={editorConfiguration}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      );
}      

export default TheCKEditor;
