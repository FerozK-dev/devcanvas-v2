import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../store/projects-slice";
import FormInput from "../reusable/FormInput";
import Modal from "../reusable/EditModal";
import Button from "../reusable/Button";
import ProjectForm from "../reusable/ProjectForm";

function AddProjects({ isOpen, onClose, setProjects }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (picture) {
      formData.append("display_image", picture);
    }

    dispatch(addProject(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        onClose()
        setProjects(projects => [...projects, originalPromiseResult])
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Add Project</h2>
      <ProjectForm
        title={title}
        description={description}
        picture={picture}
        setTitle={setTitle}
        setDescription={setDescription}
        setPicture={setPicture}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}

export default AddProjects;
