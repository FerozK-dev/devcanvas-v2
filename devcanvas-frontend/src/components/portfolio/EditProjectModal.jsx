import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../../store/projects-slice";
import Modal from "../reusable/EditModal";
import ProjectForm from "../reusable/ProjectForm";
import toast, { Toaster } from "react-hot-toast";

function EditProject({ isOpen, onClose, project, setProjects, projects }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setPicture(project.dipslay_image || "");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      title: title,
      description: description,
      id: project.id,
      dipslay_image: picture
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("id", project.id)

    if (picture) {
      formData.append("display_image", picture);
    }

    dispatch(updateProject(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        toast("Project Updated")
        onClose()
        setProjects(() =>
          projects?.map((exp) =>
            exp?.id === project?.id ? originalPromiseResult : exp
          )
        );
      })
      .catch((rejectedValueOrSerializedError) => {
        toast(rejectedValueOrSerializedError);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Edit Project</h2>
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

export default EditProject;
