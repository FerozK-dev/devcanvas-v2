import React from "react";
import FormInput from "./FormInput";
import Button from "./Button";

const ProjectForm = ({
  title,
  description,
  picture,
  setTitle,
  setDescription,
  setPicture,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e); // Call the submission handler
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          inputLabel="Title"
          labelFor="title"
          inputType="text"
          inputId="title"
          inputName="title"
          placeholderText="Project title"
          ariaLabelName="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormInput
          inputLabel="Description"
          labelFor="description"
          inputType="text"
          inputId="description"
          inputName="description"
          placeholderText="Your project description"
          ariaLabelName="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          customClass="col-span-2"
        />
        <FormInput
          inputLabel="Display Picture"
          labelFor="display_picture"
          inputType="file"
          inputId="display_picture"
          inputName="display_picture"
          ariaLabelName="picture"
          onChange={(e) => setPicture(e.target.files[0])}
        />
      </div>
      <Button title="Save" />
    </form>
  );
};

export default ProjectForm;
