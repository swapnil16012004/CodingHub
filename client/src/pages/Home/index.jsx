import { useContext, useEffect } from "react";
import ConceptsPage from "../ConceptsPage";
import { MyContext } from "../../App";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import ConceptSidebar from "../../components/ConceptSidebar";
import axios from "axios";

const Home = () => {
  const context = useContext(MyContext);
  const { language, concept } = useParams();
  useEffect(() => {
    if (context) {
      context.setShowNavbar(true);
    }
  });

  useEffect(() => {
    axios
      .get("https://codinghub-9t1d.onrender.com/api/")
      .then(() => console.log("Backend pinged"))
      .catch((err) => console.error("Backend not responding:", err));
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get("/");
        context.setData(response.data.Data);
      } catch (err) {
        console.error(err);
      }
    }
    setTimeout(() => {
      fetchData();
    }, 2500);
  }, [context.setData]);

  if (!context.Data || !Array.isArray(context.Data))
    return <div>Loading...</div>;

  return (
    <div className="home d-flex mt-3 mb-3">
      <div className="conceptsidebar">
        <ConceptSidebar language={language} />
      </div>
      <div className="conceptpage p-3">
        <ConceptsPage language={language} concept={concept} />
      </div>
    </div>
  );
};

export default Home;
