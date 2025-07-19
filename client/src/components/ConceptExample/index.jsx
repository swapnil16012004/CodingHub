import { NavLink, useNavigate, useParams } from "react-router-dom";
import { html as beautifyHtml } from "js-beautify";

const CodeBlock = ({ code, subtopic }) => {
  const formattedSubTopic = subtopic
    ? subtopic.replace(/[\s\-<>]/g, "").toLowerCase()
    : "";
  const navigate = useNavigate();
  const formattedCode = beautifyHtml(code?.replace(/></g, ">\n<") || "", {
    indent_size: 2,
    wrap_line_length: 80,
  });

  return (
    <div className="code-preview-box">
      <h3 style={{ margin: "10px 0px" }}>Example</h3>
      <div className="code-preview">
        <pre>
          <code style={{ color: "black" }}>{formattedCode}</code>
        </pre>
      </div>

      <button
        className="btn btn-info"
        style={{ marginBottom: "16px" }}
        onClick={() =>
          formattedSubTopic
            ? navigate(`${formattedSubTopic}/editor`, {
                state: { code },
              })
            : navigate(`editor`, {
                state: { code },
              })
        }
      >
        Try it Yourself »
      </button>
    </div>
  );
};

const ConceptTable = ({ table }) => {
  if (!table) return null;
  return (
    <div className="table-container">
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            {table.headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ConceptExample = ({ title, description, code, table, subtopics }) => {
  const { language, concept } = useParams();
  return (
    <div className="concept-box">
      <h2>{title}</h2>

      {concept === "home" ? (
        <div className="home-div d-flex flex-column">
          <h2>Learn {language}</h2>
          {Array.isArray(description) && (
            <>
              {description.map((point, i) => (
                <p key={i}>{point}</p>
              ))}
            </>
          )}
          <NavLink
            className={({ isActive }) => (isActive ? " active" : " ")}
            to={`/${language}/intro`}
          >
            <button className="startLearning">
              Start Learning{" "}
              <span style={{ textTransform: "uppercase" }}>{language}</span> now
            </button>
          </NavLink>
        </div>
      ) : (
        <>
          {Array.isArray(description) && (
            <>
              {description.map((point, i) => (
                <p key={i}>{point}</p>
              ))}
            </>
          )}
        </>
      )}

      <ConceptTable table={table} />

      {code && <CodeBlock code={code} />}

      {subtopics?.length > 0 && (
        <div className="subtopics-section mt-5">
          {subtopics.map((sub, index) => (
            <div key={index} className="subtopic-box mt-4">
              <h4>{sub.title}</h4>

              {sub.description.map((desc, i) => (
                <p key={i}>{desc}</p>
              ))}

              <ConceptTable table={sub.table} />
              {sub.code && <CodeBlock code={sub.code} subtopic={sub.title} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConceptExample;
