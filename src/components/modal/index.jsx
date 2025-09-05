import IconClose from "@/components/icons/close";

const Modal = ({ children, isOpen, onClose, maxWidth = 500 }) => {
  return isOpen ? (
    <div className="fixed top-0 left-0 w-[100dvw] h-[100dvh] bg-black/10 z-[1000] flex flex-col justify-center">
      <div className="dimmer" onClick={onClose ? onClose : null} />
      <div
        className="relative w-full mx-auto px-6 z-[1050]"
        style={{ maxWidth: `${maxWidth}px` }}
      >
        <div className="bg-back border border-amber-600/30 rounded-lg p-6 shadow-[0_5px_20px_rgba(0,0,0,0.5)] relative">
          <button
            className="absolute top-0 right-0 p-2 text-xl bg-back rounded-full cursor-pointer hover:opacity-50"
            onClick={onClose ? onClose : null}
          >
            <IconClose />
          </button>
          <div className="max-h-[80vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
