import Modal from "@/components/modal";
import { useContext, useState } from "react";
import AppContext from "@/context";
import Coordinates from "./coordinates";
import Revealed from "./revealed";
import ToRevealField from "./toRevealField";
import ToRevealFruit from "./toRevealFruit";

const ModalContent = ({ cellSelected, closeModal }) => {
  const [cell] = useState(cellSelected);

  return (
    <>
      <Coordinates cell={cell} />
      {cell.visibleField && cell.visibleFruit ? (
        <Revealed cell={cell} closeModal={closeModal} />
      ) : null}
      {!cell.visibleField ? (
        <ToRevealField cell={cell} closeModal={closeModal} />
      ) : null}
      {cell.visibleField && !cell.visibleFruit ? (
        <ToRevealFruit cell={cell} closeModal={closeModal} />
      ) : null}
    </>
  );
};

const Cell = () => {
  const { cellSelected, setCellSelected } = useContext(AppContext);

  const closeModal = () => {
    setCellSelected(null);
  };

  return (
    <Modal isOpen={cellSelected} onClose={closeModal} maxWidth={300}>
      {cellSelected ? (
        <ModalContent cellSelected={cellSelected} closeModal={closeModal} />
      ) : null}
    </Modal>
  );
};

export default Cell;
