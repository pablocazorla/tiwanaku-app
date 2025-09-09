import { languagesList } from "@/i18n";

const LangLabel = () => {
  return (
    <>
      {languagesList.map(({ id }, k) => {
        return <span key={id}>{`${k > 0 ? " / " : ""}${id}`}</span>;
      })}
    </>
  );
};

export default LangLabel;
