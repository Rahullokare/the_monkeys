'use client';

import React, { Suspense, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import Button from '@/components/button';
// import Editor, { EditorProps } from '@/components/editor';
import PublishModal from '@/components/modals/publish/PublishModal';
import { OutputData } from '@editorjs/editorjs';

const Editor = dynamic(() => import('@/components/editor'), {
  ssr: false,
});
const initial_data = {
  time: new Date().getTime(),
  blocks: [
    {
      type: 'header',
      data: {
        level: 1,
      },
    },
  ],
};
type EditorProps = {
  data: OutputData;
  onChange?: (data: OutputData) => void;
};
function App() {
  const [editor, setEditor] = useState<React.FC<EditorProps> | null>(null);
  const [data, setData] = useState<OutputData>(initial_data);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const loadEditor = async () => {
      const module = await import('@/components/editor');
      setEditor(() => module.default);
    };

    loadEditor();
  }, []);

  return (
    <div>
      <div className='px-5 sm:px-4 py-2 flex gap-4 items-center justify-end'>
        <div className='flex gap-4 items-center justify-between'>
          <Button
            title='Publish Blog'
            variant='primary'
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        {editor && <Editor data={data} onChange={setData} />}
      </Suspense>

      {showModal && <PublishModal setModal={setShowModal} />}
    </div>
  );
}

export default App;
