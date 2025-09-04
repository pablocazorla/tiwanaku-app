import { useContext } from "react";
import AppContext from "@/context";

import Logo from "@/components/logo";
import I18n from "@/i18n";
import Button from "@/components/button";

const StartView = () => {
  const { game, setView } = useContext(AppContext);

  return (
    <section>
      <Logo />
      <p className="text-center py-5">
        <I18n id="start.p1" />
      </p>
      <hr className="border-amber-800 border-dotted w-1/2 mx-auto" />
      <nav className=" flex flex-col gap-6 w-2/3 mx-auto py-6">
        <Button
          onClick={() => {
            setView("createNewGame");
          }}
        >
          <I18n id="btn.newGame" />
        </Button>
        <Button
          disabled={!game.sizeName}
          onClick={() => {
            setView("game");
          }}
        >
          <I18n id="btn.continueGame" />
        </Button>
      </nav>
      <hr className="border-amber-800 border-dotted w-1/2 mx-auto" />
      <nav className=" flex flex-col gap-8 w-1/3 mx-auto pt-5">
        <Button variant="secondary-outline" size="sm">
          <I18n id="btn.about" />
        </Button>
        <Button variant="transparent" size="sm">
          <I18n id="btn.lang" />
        </Button>
      </nav>
    </section>
  );
};

export default StartView;
