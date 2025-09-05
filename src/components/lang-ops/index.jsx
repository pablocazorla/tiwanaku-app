import { useContext } from "react";
import AppContext from "@/context";

import Modal from "@/components/modal";
import { languagesList } from "@/i18n";
import Button from "@/components/button";

const ModalLang = () => {
  const { setOptions, showLang, setShowLang } = useContext(AppContext);
  return (
    <Modal isOpen={showLang} onClose={() => setShowLang(false)} maxWidth={300}>
      <nav className=" flex flex-col gap-4 px-4">
        {languagesList.map((language) => {
          return (
            <Button
              key={language.id}
              variant="secondary-outline"
              size="sm"
              onClick={() => {
                setOptions({ lang: language.id });
                setShowLang(false);
              }}
            >
              {language.name}
            </Button>
          );
        })}
      </nav>
    </Modal>
  );
};

export default ModalLang;
