import AboutMe from "../portfolio/AboutMe"
import Sandbox from "../portfolio/Sandbox"
import Projects from "../portfolio/Projects";
import Education from "../portfolio/Education";
import Experience from "../portfolio/Experience";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function Portfolio() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("is_logged_in") === "true";

    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Toaster/>
      <AboutMe isPublic={false}/>
      {/* <Sandbox/> */}
      <Education/>
      <Experience/>
      <Projects/>
    </div>
  )

}

export default Portfolio;
