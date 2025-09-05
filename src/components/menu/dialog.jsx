import IconClose from "@/components/icons/close";

const Dialog = ({ children, isOpen, onClose }) => {
  return isOpen ? (
    <div className="fixed top-0 left-0 w-[100dvw] h-[100dvh] bg-black/10 z-10 flex flex-col justify-center">
      <div className="dimmer" />
      <div className="relative w-full mx-auto px-6 z-40 max-w-[300px] fade-from-bottom">
        <div className="max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  ) : null;
};

export default Dialog;
