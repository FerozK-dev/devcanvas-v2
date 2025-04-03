import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../store/user-slice";
import FormInput from "../reusable/FormInput";
import Modal from "../reusable/EditModal";
import Button from "../reusable/Button";
import toast, { Toaster } from "react-hot-toast";

function EditUserModal({ isOpen, onClose, profile, setProfileData }) {
  const [title, setTitle] = useState("")
  const [lastName, setLName] = useState("");
  const [firstName, setFName] = useState("");
  const [location, setLocation] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [contact, setContact] = useState("")
  const [headline, setHeadline] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedUrl, setLinkedUrl] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [resume, setResume] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && profile) {
      setTitle(profile.title || "");
      setLName(profile.last_name || "");
      setFName(profile.first_name || "");
      setLocation(profile.location || "");
      setAboutMe(profile.about_me || "");
      setContact(profile.contact || "");
      setHeadline(profile.headline || "");
      setGithubUrl(profile.github_url || "");
      setLinkedUrl(profile.linked_url || "");
      setWorkEmail(profile.work_email || "");
      // setProfilePic(profile?.profile_picture);
      // setResume(profile?.resume);
    }
  }, [isOpen, profile]);
  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("title", title);
    formData.append("location", location);
    formData.append("about_me", aboutMe);
    formData.append("contact", contact);
    formData.append("headline", headline);
    // formData.append("github_url", githubUrl);
    // formData.append("linked_url", linkedUrl);
    // formData.append("work_email", workEmail);
    // formData.append("resume", resume);

    if (profilePic) {
      formData.append("profile_picture", profilePic);
    }

    dispatch(editUser(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        toast("Profile Updated")
        onClose()
        setProfileData(originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        toast(rejectedValueOrSerializedError)
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Edit Details</h2>
      <form
        onSubmit={(e) => {
          console.log("Form submission event triggered"); // Debugging
          handleSubmit(e); // Pass the event to handleSubmit
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            inputLabel="First Name"
            labelFor="firstName"
            inputType="text"
            inputId="firstName"
            inputName="firstName"
            placeholderText="Your first name"
            ariaLabelName="firstName"
            value={firstName || ""}
            onChange={(e) => setFName(e.target.value)}
          />
          <FormInput
            inputLabel="Last Name"
            labelFor="lastName"
            inputType="text"
            inputId="lastName"
            inputName="lastName"
            placeholderText="Your last name"
            ariaLabelName="lastName"
            value={lastName || ""}
            onChange={(e) => setLName(e.target.value)}
          />
          <FormInput
            inputLabel="Title"
            labelFor="title"
            inputType="text"
            inputId="title"
            inputName="title"
            placeholderText="Your title"
            ariaLabelName="title"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormInput
            inputLabel="Location"
            labelFor="location"
            inputType="text"
            inputId="location"
            inputName="location"
            placeholderText="Enter your location"
            ariaLabelName="location"
            value={location || ""}
            onChange={(e) => setLocation(e.target.value)}
          />

          <FormInput
            inputLabel="About Me"
            labelFor="about_me"
            inputType="text"
            inputId="about_me"
            inputName="about_me"
            placeholderText="Tell us about yourself"
            ariaLabelName="about_me"
            value={aboutMe || ""}
            onChange={(e) => setAboutMe(e.target.value)}
            customClass="col-span-2"
          />

          <FormInput
            inputLabel="Headline"
            labelFor="headline"
            inputType="text"
            inputId="headline"
            inputName="headline"
            placeholderText="Enter your headline"
            ariaLabelName="headline"
            value={headline || ""}
            onChange={(e) => setHeadline(e.target.value)}
            customClass="col-span-2"
          />
          <FormInput
            inputLabel="Contact"
            labelFor="contact"
            inputType="text"
            inputId="contact"
            inputName="contact"
            placeholderText="Enter your contact information"
            ariaLabelName="contact"
            value={contact || ""}
            onChange={(e) => setContact(e.target.value)}
          />


          {/* <FormInput
            inputLabel="GitHub URL"
            labelFor="github_url"
            inputType="text"
            inputId="github_url"
            inputName="github_url"
            placeholderText="Enter your GitHub URL"
            ariaLabelName="github_url"
            value={githubUrl || ""}
            onChange={(e) => setGithubUrl(e.target.value)}
          />

          <FormInput
            inputLabel="LinkedIn URL"
            labelFor="linked_url"
            inputType="text"
            inputId="linked_url"
            inputName="linked_url"
            placeholderText="Enter your LinkedIn URL"
            ariaLabelName="linked_url"
            value={linkedUrl || ""}
            onChange={(e) => setLinkedUrl(e.target.value)}
          /> */}

          {/* <FormInput
            inputLabel="Work Email"
            labelFor="work_email"
            inputType="text"
            inputId="work_email"
            inputName="work_email"
            placeholderText="Enter your work email"
            ariaLabelName="work_email"
            value={workEmail || ""}
            onChange={(e) => setWorkEmail(e.target.value)}
          /> */}

          <FormInput
            inputLabel="Profile Picture"
            labelFor="profile_pic"
            inputType="file"
            inputId="work_email"
            inputName="profile_picture"
            ariaLabelName="picture"
            onChange={(e) => setProfilePic(e.target.files[0])}
            required={false}
          />
          {/* <FormInput
            inputLabel="CV"
            labelFor="CV"
            inputType="file"
            inputId="cv"
            inputName="CV"
            ariaLabelName="file"
            onChange={(e) => setResume(e.target.files[0])}
          /> */}
        </div>
        <Button title="Save"/>
      </form>
    </Modal>
  );
}

export default EditUserModal;
