import { useContext } from "react";
import AppContext from "@/context";
import I18n from "@/i18n";
import Button from "@/components/button";
import Modal from "@/components/modal";
import boxImg from "@/assets/img/box.webp";

const list1 = [2, 3, 4];
const list2 = [6, 7];

const About = () => {
  const { showAbout, setShowAbout } = useContext(AppContext);
  return (
    <Modal isOpen={showAbout} onClose={() => setShowAbout(false)}>
      <div className="text-amber-100">
        <h2 className="text-center font-bold text-2xl mb-6 border-b border-amber-800 border-dotted pb-3">
          <I18n id="about.title" />
        </h2>

        <p className="mb-4 text-sm">
          <I18n id={`about.p.${1}`} />
        </p>
        <div className="max-w-[200px] mx-auto mb-3">
          <img src={boxImg} alt="" className="w-full h-full" />
        </div>
        {list1.map((n) => {
          return (
            <p className="mb-4 text-sm" key={n}>
              <I18n id={`about.p.${n}`} />
            </p>
          );
        })}
        <p className="mb-1 text-sm">
          <I18n id={`about.p.${5}`} />
        </p>
        <p className="mb-5 text-sm">
          <a
            href="https://github.com/pablocazorla/tiwanaku-app"
            className="text-amber-400 underline hover:text-amber-100"
            target="_blank"
            rel="noreferrer"
          >
            <I18n id="about.link.repo" />
          </a>
        </p>
        <p className="mb-1 text-sm">
          <I18n id={`about.p.${6}`} />
        </p>
        <p className="flex gap-2 mb-5 text-sm">
          <a
            href="mailto:pablo.david.cazorla@gmail.com"
            className="text-amber-400 underline hover:text-amber-100"
            target="_blank"
            rel="noreferrer"
          >
            <I18n id="about.link.email" />
          </a>
          /
          <a
            href="https://boardgamegeek.com/user/davicazu"
            className="text-amber-400 underline hover:text-amber-100"
            target="_blank"
            rel="noreferrer"
          >
            <I18n id="about.link.bgg" />
          </a>
        </p>
        <p className="mb-4 text-sm">
          <I18n id={`about.p.${7}`} />
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
