import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExperience } from "../../store/experience-slice";
import Modal from "../reusable/EditModal";
import ExperienceForm from "../reusable/ExperienceForm";

function AddExpereience({ isOpen, onClose, setExperiences }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDescription("");
      setCompany("");
      setStartDate("");
      setEndDate("");
      setLocation("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addExperience({
      title: title,
      description: description,
      company: company,
      endDate: endDate,
      startDate: startDate,
      location: location
    }))
      .unwrap()
      .then((originalPromiseResult) => {
        onClose()
        setExperiences(experiences => [...experiences, originalPromiseResult]);
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Add Experience</h2>
      <ExperienceForm
        title={title}
        company={company}
        location={location}
        description={description}
        startDate={startDate}
        endDate={endDate}
        setTitle={setTitle}
        setCompany={setCompany}
        setLocation={setLocation}
        setDescription={setDescription}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        onSubmit={handleSubmit}
      />

    </Modal>
  );
}

export default AddExpereience;
