import { useContext } from "react";
import AppContext from "@/context";
import Grid from "@/components/grid";
import I18n from "@/i18n";
import Cell from "./cell";
import Menu from "@/components/menu";

const Game = () => {
  const { game } = useContext(AppContext);

  return (
    <>
      <Menu />
      <section>
        <h3 className="text-center  text-xl mb-4 border-b border-amber-800 border-dotted pb-3">
          <I18n id="game.p1" />
        </h3>
        <Grid />
      </section>
      <Cell />
    </>
  );
};

export default Game;
