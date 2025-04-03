import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEducation, fetchEducations } from "../../store/education-slice"
import AddEducationModal from "./AddEducationModal";
import EditEducationModal from "./EditEducationModal";
import toast, {Toaster} from "react-hot-toast";

function Education({ data, isPublic }){
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  const [educations, setEducations] = useState(
    // useSelector((state) => state?.educations?.allEducations)
  );

  useEffect(() => {
    if (isPublic && data) {
      setEducations(data || []);
    } else if (!isPublic) {
        dispatch(fetchEducations())
        .unwrap()
        .then((result) => {
          setEducations(result);
        });
    }
  }, [dispatch, isPublic, data]);

  const deleteHandler = (education) => {
    dispatch(
      deleteEducation({
        id: education.id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        toast("Education Removed")
        setEducations(educations.filter((m) => m !== education));
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError);
      });
  };

  const openEditModal = (education) => {
    setSelectedEducation(education);
    setEditModalOpen(true);
  };

  const renderEducation = educations?.map((education) => {
    const { id, description, start_year, end_year, school, degree, field, grade, activities} = education;
    return (
      <div className="bg-gray-50 px-8 py-10 rounded-md" key={id}>
        <h4 className="font-medium text-gray-700 text-lg mb-4">{school}</h4>
        <p className="font-small text-gray-700 text-lg mb-4">{start_year} - {end_year} {degree} {field}</p>
        <p className="font-normal text-gray-500 text-md mb-4">{description}</p>

        <div className="relative">
          <h6 className="font-semibold text-gray-500 text-md z-10">Grade: {grade}</h6>
          {/* <span className="w-32 h-1 bg-blue-200 absolute bottom-1 left-0 z-0"></span> */}
        </div>
        {!isPublic && (
          <div className="justify-items-end mt-10">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => openEditModal(education)}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => deleteHandler(education)}
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

  return(
    <section className="py-10 md:py-16">

      <div className="container max-w-screen-xl mx-auto px-4">

        <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Education</h1>

        <p className="font-normal text-gray-500 text-xs md:text-base mb-20">Below is a summary of the places I studied</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderEducation}
        </div>
        {!isPublic && (
          <div className="mt-10 grid justify-items-end">
            <button
              onClick={() => setModalOpen(true)}
              className="text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Add
            </button>
            <AddEducationModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              setEducations={setEducations}
            />
            {selectedEducation && (
              <EditEducationModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                education={selectedEducation}
                setEducations={setEducations}
                educations={educations}
              />
            )}
          </div>
        )}
      </div>
    </section>

  )
}

export default Education;