const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center mx-auto shadow-xl rounded-md bg-gray-200 max-w-fit">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full sm:w-1/2 lg:w-4/5 relative" onClick={(e) => e.stopPropagation()}>
          <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={onClose}
          >
            <b>X</b>
          </button>
          {children}
        </div>
      </div>
    );
};

export default Modal;
