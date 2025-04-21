import Modal from "../reusable/EditModal";

import { useState } from 'react';

function ResumeModal({ isOpen, onClose, resumeFile }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">My CV</h2>
      {resumeFile && (
        <div className="overflow-auto max-h-[80vh]">
          <iframe
            src={resumeFile}
            style={{ width: '100%', height: '600px' }}
          />
        </div>
      )}
      {!resumeFile && (
        <p className="text-black dark:text-gray-400 py-4">
          You can upload your CV in the user profile and view it here.
        </p>
      )}
    </Modal>
  );
}

export default ResumeModal
