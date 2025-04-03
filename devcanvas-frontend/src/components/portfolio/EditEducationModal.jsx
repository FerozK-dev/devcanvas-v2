import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";;
import { updateEducation } from "../../store/education-slice";
import Modal from "../reusable/EditModal";
import EducationForm from "../reusable/EducationForm";
import toast, {Toaster} from "react-hot-toast";

function EditEducationModal({ isOpen, onClose, education, setEducations, educations }) {

  const [school, setSchool] = useState("")
  const [description, setDescription] = useState("");
  const [degree, setDegree] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [field, setField] = useState("");
  const [grade, setGrade] = useState("");
  const [activities, setActivities] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEducation = {
      id: education?.id,
      description: description,
      start_year: startYear,
      end_year: endYear,
      school: school,
      degree: degree,
      field: field,
      grade: grade,
      activities: activities
    }

    dispatch(updateEducation({
      id: education?.id,
      description: description,
      start_year: startYear,
      end_year: endYear,
      school: school,
      degree: degree,
      field: field,
      grade: grade,
      activities: activities
    }))
      .unwrap()
      .then((originalPromiseResult) => {
        toast("Education Updated")
        onClose()
        setEducations(() =>
          educations?.map((exp) =>
            exp?.id === education?.id ? newEducation : exp
          )
        );
      })
      .catch((rejectedValueOrSerializedError) => {
        toast(rejectedValueOrSerializedError);
      });
  };

  useEffect(() => {
    if (isOpen && education) {
      setSchool(education?.school || "");
      setDescription(education?.description || "");
      setDegree(education?.degree || "");
      setStartYear(education?.start_year || "");
      setEndYear(education?.end_year || "");
      setField(education?.field || "");
      setGrade(education.grade || "");
      // setDescription(education.description || "");

    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Edit Education</h2>
      <EducationForm
        startYear={startYear}
        endYear={endYear}
        school={school}
        degree={degree}
        field={field}
        grade={grade}
        description={description}
        activities={activities}
        setStartYear={setStartYear}
        setEndYear={setEndYear}
        setSchool={setSchool}
        setDegree={setDegree}
        setField={setField}
        setGrade={setGrade}
        setActivities={setActivities}
        setDescription={setDescription}
        onSubmit={handleSubmit}
      />

    </Modal>
  );
}

export default EditEducationModal;
