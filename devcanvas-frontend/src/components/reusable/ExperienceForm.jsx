import FormInput from "./FormInput";
import Button from "./Button";

const ExperienceForm = ({
  title,
  company,
  location,
  description,
  startDate,
  endDate,
  setTitle,
  setCompany,
  setLocation,
  setDescription,
  setStartDate,
  setEndDate,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          inputLabel="Title"
          labelFor="title"
          inputType="text"
          inputId="title"
          inputName="title"
          placeholderText="Your title"
          ariaLabelName="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormInput
          inputLabel="Company"
          labelFor="company"
          inputType="text"
          inputId="company"
          inputName="company"
          placeholderText="Company name"
          ariaLabelName="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <FormInput
          inputLabel="Location"
          labelFor="location"
          inputType="text"
          inputId="location"
          inputName="location"
          placeholderText="Company location"
          ariaLabelName="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <FormInput
          inputLabel="Description"
          labelFor="description"
          inputType="text"
          inputId="description"
          inputName="description"
          placeholderText="Your experience description"
          ariaLabelName="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          customClass="col-span-2"
        />
        <FormInput
          inputLabel="Start date"
          labelFor="start_date"
          inputType="date"
          inputId="start_date"
          inputName="start_date"
          ariaLabelName="start date"
          value={startDate ? new Date(startDate).toISOString().split("T")[0] : ""}
          onChange={(e) => setStartDate(new Date(e.target.value).toISOString())}

        />
        <FormInput
          inputLabel="End date"
          labelFor="end_date"
          inputType="date"
          inputId="end_date"
          inputName="end_date"
          ariaLabelName="end date"
          value={endDate ? new Date(endDate).toISOString().split("T")[0] : ""}
          onChange={(e) => setEndDate(new Date(e.target.value).toISOString())}
        />
      </div>
      <Button title="Save" />
    </form>
  );
};

export default ExperienceForm;
