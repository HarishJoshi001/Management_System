import React, { createContext, useContext, cloneElement } from "react";

const DialogContext = createContext();

export function Dialog({ open, setOpen, children }) {
  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children }) {
  const { setOpen } = useContext(DialogContext);
  return cloneElement(children, {
    onClick: () => setOpen(true),
  });
}

export function DialogContent({ children }) {
  const { open, setOpen } = useContext(DialogContext);
  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &#10005;
        </button>
        {children}
      </div>
    </div>
  );
}
