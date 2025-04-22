// ResumeGenerator.jsx
import { PDFDownloadLink } from '@react-pdf/renderer';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateResume } from '../../store/resume-slice';
import ResumeDocument from './../reusable/ResumeDocument';
import Modal from "../reusable/EditModal";
import toast, { Toaster } from "react-hot-toast";
import { BlobProvider } from '@react-pdf/renderer';

function AiResumeModal({ isOpen, onClose, profile }) {
  const [isGenerating, setIsGenerating] = useState(false);
  // const [resumeUrl, setResumeUrl] = useState(null);
  const dispatch = useDispatch();
  const [resumeData, setResumeData] = useState();

  const handleGenerate = async () => {
    setIsGenerating(true);
    dispatch(generateResume())
    .unwrap()
    .then((result) => {
      setResumeData(result);
    })
    .catch(() => {
      toast('CV could not be generated. Please try again');
    })
    .finally(() => {
      setIsGenerating(false);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center space-y-4">
        <p className="text-lg text-black md:text-xl dark:text-gray-400 mr-4">
          DevCanvas allows you to create a personalized CV through its integrated AI.
        </p>

        {!resumeData && (
          <>
            <p className="text-black dark:text-gray-400 py-4">
              Disclaimer: By clicking the button below, you agree to share data with third-party large language models.
            </p>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium
          rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700
          ease-linear duration-200"
            >
              {isGenerating ? 'Generating...' : 'Generate CV'}
            </button>
          </>
        )}

        {resumeData && (
          <BlobProvider
            document={
              <ResumeDocument
                userData={profile}
                data={resumeData}
              />
            }
          >
            {({ url, loading }) =>
              loading ? (
                <p>Preparing your CV...</p>
              ) : (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                   className="text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium
                            rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Open CV in New Tab
                </a>
              )
            }
            {/* {({ url, loading }) =>
              loading ? (
                <p>Generating preview...</p>
              ) : (
                <>
                  <iframe
                    src={url}
                    width="100%"
                    height="600px"
                    className="mt-4 border rounded"
                    title="Resume Preview"
                  />
                  <a
                    href={url}
                    download="resume.pdf"
                    className="text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium
                              rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Download CV
                  </a>
                </>
              )
            } */}
          </BlobProvider>
        )}
      </div>
    </Modal>
  );
}

export default AiResumeModal;
