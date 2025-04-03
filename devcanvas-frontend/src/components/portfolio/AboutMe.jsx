import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, togglePublish } from "../../store/user-slice"
import EditUserModal from "./EditUserModal"
import toast, { Toaster } from "react-hot-toast";

function AboutMe({ data, isPublic }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [portfolioPublished, setPortfolioPublished] = useState(true);

  const [profileData, setProfileData] = useState(
    // useSelector((state) => state.profile)
  );

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    if (isPublic) {
      setProfileData(data);
    } else if (!isPublic) {
        dispatch(fetchUser())
        .unwrap()
        .then((result) => {
          setProfileData(result);
          setPortfolioPublished(result?.publish_portfolio)
        });
    }
  }, [dispatch, isPublic, data, portfolioPublished]);

  const updatePortfolioStatus = () => {
    dispatch(
      togglePublish())
      .unwrap()
      .then((originalPromiseResult) => {
        toast(`${portfolioPublished ? "Un-Published" : "Published"  } Portfolio`)
        setPortfolioPublished(!profileData?.publish_portfolio)
        if (!profileData?.publish_portfolio) { window.open(`/portfolio/${profileData.id}`,'_blank', 'rel=noopener noreferrer')}
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.message);
      });
  };

  return (
    <section className="py-8 md:py-10 bg-gray-100">
      <div className="container max-w-screen-xl mx-auto px-4">

        {/* <div className="flex items-center justify-between mb-40">
          <button className="px-7 py-5 mt-5 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-500 hover:text-gray-700 transition ease-linear duration-500">Get my CV</button>
        </div> */}

        <div className="text-center">
          <div className="flex justify-center my-16">
            <img
              src={profileData?.profile_picture}
              alt="Profile"
              className="w-64 h-64 rounded-full"
            />
          </div>

          <h6 className="font-medium text-gray-600 text-lg md:text-5xl uppercase mb-8">{profileData?.first_name} {profileData?.last_name}</h6>

          <p className="font-normal text-gray-900 text-3xl md:text-4xl leading-none mb-8">{profileData?.title}</p>

          <p className="font-bold text-gray-600 text-md md:text-xl mb-16">{profileData?.headline}</p>
          <p className="font-normal text-gray-600 text-md md:text-xl mb-16">{profileData?.about_me}</p>

          {!isPublic && (
            <div className="justify-items-center">
              <div className="mt-10">
                <div className="inline-flex rounded-md shadow-sm relative" role="group">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    Edit
                  </button>
                  <button
                    data-tooltip-target="tooltip-default"
                    type="button"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => updatePortfolioStatus(true)}
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    {portfolioPublished ? "Un-Publish" : "Publish"  } Portfolio
                  </button>
                  {isHovered && (
                    <div
                      id="tooltip-default"
                      role="tooltip"
                      className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-100 transition-opacity duration-300 tooltip dark:bg-gray-700"
                      style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }}
                    >
                      Copy the link of your published portfolio to share.
                    </div>
                  )}
                </div>
              </div>
              <EditUserModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                profile={profileData}
                setProfileData={setProfileData}
              />
            </div>
          )}

          {/* <a href="#" className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-50 hover:text-gray-700 transition ease-linear duration-500">Hire me</a> */}
        </div>
      </div>
    </section>
  )
}

export default AboutMe;
