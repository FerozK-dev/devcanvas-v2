import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicProfile } from "./../../store/public-profile-slice";
import AboutMe from "../portfolio/AboutMe";
import Projects from "../portfolio/Projects";
import Education from "../portfolio/Education";
import Experience from "../portfolio/Experience";
import { useNavigate, useParams } from "react-router-dom";

function PublicPortfolio() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { portfolioData, status } = useSelector((state) => state.publicProfile);

  useEffect(() => {
    dispatch(fetchPublicProfile(userId));
  }, [dispatch]);

  if (status === "failed") {
    navigate("/notfound");
  }

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      {portfolioData && (
        <>
          <AboutMe data={portfolioData} isPublic={true}/>
          <Education data={portfolioData?.educations} isPublic={true}/>
          <Experience data={portfolioData?.experiences} isPublic={true}/>
          <Projects data={portfolioData?.projects} isPublic={true}/>
        </>
      )}
    </div>
  );
}

export default PublicPortfolio;
