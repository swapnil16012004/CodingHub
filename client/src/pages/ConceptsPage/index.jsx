import { useContext, useEffect } from "react";
import ConceptExample from "../../components/ConceptExample";
import { MyContext } from "../../App";

const ConceptsPage = ({ language, concept }) => {
  const { Data } = useContext(MyContext);

  const langData = Data.find((item) => item.language === language);

  const allConcepts = langData
    ? langData.topics.flatMap((topic) => topic.concepts)
    : [];

  const matchedConcept = allConcepts.find(
    (c) =>
      c.name.toLowerCase().replace(/\s+/g, "-") ===
      (concept || "").toLowerCase()
  );

  useEffect(() => {
    const element = document.querySelector(".conceptpage");
    if (element) {
      element.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [concept]);

  if (!matchedConcept) {
    return <div>This Technology will be awailable soon...</div>;
  }

  return (
    <ConceptExample
      title={matchedConcept.title}
      description={matchedConcept.description}
      code={matchedConcept.code}
      subtopics={matchedConcept.subtopics}
      table={matchedConcept.table}
    />
  );
};

export default ConceptsPage;
