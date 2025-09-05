import { useContext } from "react";
import AppContext from "@/context";
import I18n from "@/i18n";
import Button from "@/components/button";
import Modal from "@/components/modal";

const About = () => {
  const { showAbout, setShowAbout } = useContext(AppContext);
  return (
    <Modal isOpen={showAbout} onClose={() => setShowAbout(false)}>
      <div className="text-center text-amber-100">
        <p className="mb-4">
          <I18n id="about.p1" />
        </p>
        <nav className="flex flex-col gap-6 items-center pb-2">
          <Button
            variant="secondary-outline"
            onClick={() => setShowAbout(false)}
            className="shadow-[0_2px_10px_rgba(0,0,0,1)]"
          >
            <I18n id="btn.close" />
          </Button>
        </nav>
      </div>
    </Modal>
  );
};

export default About;
