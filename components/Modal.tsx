import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  return (
    isOpen && (
      <div
        className="fixed top-0 left-0 z-50 h-full w-full overflow-y-auto bg-black bg-opacity-75"
        onClick={onClose}
      >
        <div className="relative m-auto flex flex-col items-center justify-center rounded-lg bg-white p-8">
          {children}
          <button
            className="absolute top-0 right-0 p-2 text-red-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
}
