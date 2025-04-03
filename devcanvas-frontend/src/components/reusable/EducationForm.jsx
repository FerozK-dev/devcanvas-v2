import FormInput from "./FormInput";
import Button from "./Button";

const EducationForm = ({
  description, 
  startYear, 
  endYear, 
  school, 
  degree, 
  field, 
  grade, 
  activities,
  setStartYear,
  setEndYear,
  setDegree,
  setSchool,
  setField,
  setGrade,
  setActivities,
  setDescription,
  onSubmit
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
          inputLabel="School"
          labelFor="school"
          inputType="text"
          inputId="school"
          inputName="school"
          placeholderText="Your school"
          ariaLabelName="school"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
        <FormInput
          inputLabel="Degree"
          labelFor="degree"
          inputType="text"
          inputId="degree"
          inputName="degree"
          placeholderText="Your degree"
          ariaLabelName="degree"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />
        <FormInput
          inputLabel="Field"
          labelFor="Field"
          inputType="text"
          inputId="Field"
          inputName="Field"
          placeholderText="Your Field"
          ariaLabelName="Field"
          value={field}
          onChange={(e) => setField(e.target.value)}
        />
        <FormInput
          inputLabel="Description"
          labelFor="description"
          inputType="text"
          inputId="description"
          inputName="description"
          placeholderText="study description"
          ariaLabelName="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          customClass="col-span-2"
        />
        <FormInput
          inputLabel="Start Year"
          labelFor="start_Year"
          inputType="date"
          inputId="start_Year"
          inputName="start_Year"
          ariaLabelName="start Year"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
        />
        <FormInput
          inputLabel="End Year"
          labelFor="end_Year"
          inputType="date"
          inputId="end_Year"
          inputName="end_Year"
          ariaLabelName="end Year"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
        />
        <FormInput
          inputLabel="grade"
          labelFor="grade"
          inputType="number"
          inputId="grade"
          inputName="Grade"
          ariaLabelName="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </div>
      <Button title="Save" />
    </form>
  );
};

export default EducationForm;
