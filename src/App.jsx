import { useContext } from "react";
import AppContext from "@/context";
import StartView from "@/views/start";
import CreateNewGame from "@/views/createNewGame";
import Game from "@/views/game";
import About from "@/components/about";
import ShareGame from "@/components/shareGame";
import ModalLang from "./components/lang-ops";

const App = () => {
  const { view } = useContext(AppContext);
  return (
    <>
      <main className="mx-auto h-[100dvh] bg-back text-amber-100 overflow-hidden flex flex-col justify-center mw-app">
        {view === "start" && <StartView />}
        {view === "createNewGame" && <CreateNewGame />}
        {view === "game" && <Game />}
      </main>
      <About />
      <ShareGame />
      <ModalLang />
    </>
  );
};

export default App;
