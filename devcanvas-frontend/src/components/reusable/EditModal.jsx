const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="bg-gray-300 relative p-4 w-full max-w-md rounded-md sm:w-1/2 lg:w-4/5 relative" onClick={(e) => e.stopPropagation()}>
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
