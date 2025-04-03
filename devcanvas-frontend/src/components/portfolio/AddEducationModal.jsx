import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEducation, AddEducation } from "../../store/education-slice";
import Modal from "../reusable/EditModal";
import EducationForm from "../reusable/EducationForm";

function AddEducationModal({ isOpen, onClose, setEducations }) {
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

    dispatch(addEducation({
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
        onClose()
        setEducations(educations => [...educations, originalPromiseResult])
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Add Education</h2>
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

export default AddEducationModal;
