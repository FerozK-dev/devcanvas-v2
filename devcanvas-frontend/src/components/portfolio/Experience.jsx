import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExperience, fetchExperiences } from "../../store/experience-slice"
import AddExpereience from "./AddExperienceModal";
import EditExpereience from "./EditExperienceModal";
import toast, {Toaster} from "react-hot-toast";

function Experience({ data, isPublic }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const dispatch = useDispatch();

  const [experiences, setExperiences] = useState(
    // useSelector((state) => state?.experiences?.allExperiences)
  );

  useEffect(() => {
    if (isPublic && data) {
      setExperiences(data || []);
    } else if (!isPublic) {
        dispatch(fetchExperiences())
        .unwrap()
        .then((result) => {
          setExperiences(result);
        });
    }
  }, [dispatch, isPublic, data]);

  const deleteHandler = (experience) => {
    dispatch(
      deleteExperience({
        id: experience.id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        toast("Experience Removed")
        setExperiences(experiences.filter((m) => m !== experience));
      })
      .catch((rejectedValueOrSerializedError) => {
        toast(rejectedValueOrSerializedError);
      });
  };

  const openEditModal = (experience) => {
    setSelectedExperience(experience);
    setEditModalOpen(true);
  };

  const renderExperience = experiences?.map((experience) => {
    const { id, title, description, employment_type, company, location, industry, start_date, end_date, headline } = experience;
    return (
      <div
        key={id}
        // className="flex flex-col lg:flex-row justify-between mb-8 grid grid-cols-4 gap-4"
        className="mb-8 grid grid-cols-5 gap-4"
      >
        {/* Company */}
        <div className="space-y-2 md:space-y-4">
          <h6 className="font-medium text-gray-400 text-base uppercase">
            Company
          </h6>
          <p className="font-semibold text-gray-600 text-base">
            {company}{" "}
            <span className="font-normal text-gray-300">/ {location}</span>
          </p>
        </div>

        {/* Position */}
        <div className="space-y-2 md:space-y-4">
          <h6 className="font-medium text-gray-400 text-base uppercase">
            Position
          </h6>
          <p className="font-normal text-gray-400 text-base">
            {title}
          </p>
        </div>

        {/* Year */}
        <div className="space-y-2 md:space-y-4">
          <h6 className="font-medium text-gray-400 text-base uppercase">
            Year
          </h6>
          <p className="font-normal text-gray-400 text-base">{start_date} - {end_date}</p>
        </div>
        {!isPublic && (
          <div className="justify-items-end mt-10">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => openEditModal(experience)}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => deleteHandler(experience)}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    )
  });

  return (
    <section className="py-10 md:py-16  bg-gray-50">
      <div className="container max-w-screen-xl mx-auto px-4">

        <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Experience</h1>

        <p className="font-normal text-gray-500 text-xs md:text-base mb-20">Below is a summary of the places I studied</p>
        {renderExperience}

        {!isPublic && (
          <>
            <button
              onClick={() => setModalOpen(true)}
              className="text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Add Experience
            </button>
            <AddExpereience
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              setExperiences={setExperiences}
            />
            {selectedExperience && (
              <EditExpereience
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                experience={selectedExperience}
                setExperiences={setExperiences}
                experiences={experiences}
                dispatch={dispatch}
              />
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default Experience;