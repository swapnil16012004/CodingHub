import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../App";

const ConceptSidebar = ({ language }) => {
  const { Data } = useContext(MyContext);
  if (!Data || !Array.isArray(Data)) return <div>Loading...</div>;
  const langData = Data.find((item) => item.language === language);

  if (!langData) return <div>All concepts will be awailable soon...</div>;

  return (
    <div className="conceptsidebarContainer">
      {langData.topics.map((topic) => (
        <div key={topic.name} className="conceptsidebarItem">
          <h4>
            <span style={{ textTransform: "uppercase" }}>{language}</span>
            &nbsp;{topic.name}
          </h4>
          <div className="d-flex flex-column gap-2">
            {topic.concepts.map((concept) => (
              <NavLink
                key={concept.name}
                className={({ isActive }) =>
                  isActive
                    ? "conceptsidebarLink active pl-3"
                    : "conceptsidebarLink pl-3"
                }
                to={`/${language}/${concept.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {concept.title}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConceptSidebar;
