// ResumeGenerator.jsx
import { useState } from 'react';
// import api from '../api';
import Modal from "../reusable/EditModal";

function ResumeGenerator({ isOpen, onClose }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResumeUrl("https://res.cloudinary.com/dng8erffi/image/upload/v1744131072/resumes/1744131071556-Feroz%20Khan%27s%20Resume-3.pdf.pdf")
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center space-y-4">
        <p className="text-lg text-black md:text-xl dark:text-gray-400">
          DevCanvas allows you to create a personalized CV through its integrated AI.
        </p>

        <p className="text-black dark:text-gray-400 py-4">
          Disclaimer: By clicking the button below, you agree to share data with third-party large language models.
        </p>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="md:block text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium
          rounded-md text-sm px-7 py-3 md:px-9 md:py-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700
          ease-linear duration-200"
        >
          {isGenerating ? 'Generating...' : 'Generate CV'}
        </button>

        {resumeUrl && (
          <iframe
            src={resumeUrl}
            title="Generated Resume"
            width="100%"
            height="600px"
            className="mt-4"
          />
        )}
      </div>
    </Modal>
  );
}

export default ResumeGenerator
