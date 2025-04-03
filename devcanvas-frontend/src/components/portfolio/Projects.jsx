import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, fetchProjects } from "../../store/projects-slice"
import AddProjects from "./AddProjectModal";
import EditProject from "./EditProjectModal";
import Button from "../reusable/Button";
import toast from "react-hot-toast";

function Projects({ data, isPublic }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const dispatch = useDispatch();

  const [projects, setProjects] = useState(
    useSelector((state) => state?.projects?.allProjects)
  );

  useEffect(() => {
    if (isPublic && data) {
      setProjects(data || []);
    } else if (!isPublic) {
        dispatch(fetchProjects())
        .unwrap()
        .then((result) => {
          setProjects(result);
        });
    }
  }, [dispatch, isPublic, data]);


  const openEditModal = (project) => {
    setSelectedProject(project);
    setEditModalOpen(true);
  };

  const deleteHandler = (project) => {
    dispatch(
      deleteProject({
        id: project.id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        toast("Project Removed")
        setProjects(projects.filter((m) => m !== project));
      })
      .catch((rejectedValueOrSerializedError) => {
        toast(rejectedValueOrSerializedError);
      });
  };

  const renderProjects = projects?.map((project) => {
    const { id, description, title, display_image } = project;
    return (
      // <div className="flex space-x-6" key={id}>
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6" key={id}>
        <div className=" w-96">
          <img
            src={display_image}
            alt="Profile"
            className="h-40 rounded-lg object-cover"
          />
        </div>

        <span className="hidden lg:block w-0.5 bg-gray-300"></span>

        <div className="w-3/5 h-72">
          <h1 className="font-normal text-gray-700 text-3xl md:text-4xl mb-5">{title}</h1>

          <p className="font-normal text-gray-500 text-sm md:text-base">{description}</p>
          {/* <p className="font-normal text-gray-500 text-sm md:text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae dignissimos non culpa, aperiam quas facilis fuga aliquid iure, inventore, laboriosam dicta voluptatem consequatur quo. Repellendus aliquam ipsam aspernatur quo impedit.</p> */}
        </div>
        {!isPublic && (
          <div className="justify-items-end mt-10">
              <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => openEditModal(project)}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => deleteHandler(project)}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Delete
              </button>
            </div>
          </div>)
        }
      </div>
    )
  });

  return (
    <section className="py-10 md:py-16">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="mb-10 lg:mb-0 mr-24">
            <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Portfolio</h1>

            <p className="font-normal text-gray-500 text-xs md:text-base">I have brought here my biggest and favorite works <br/> as a professional.</p>
          </div>

          <div className="space-y-16 container">
            {renderProjects}
          </div>
        </div>
        {!isPublic && (
          <div className="grid justify-items-end">
            <button
              onClick={() => setModalOpen(true)}
              className="text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Add a Project
            </button>
            <AddProjects
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              setProjects={setProjects}
            />
          </div>
        )}
        {selectedProject && !isPublic && (
          <EditProject
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            project={selectedProject} // Pass the selected project to the modal
            setProjects={setProjects}
            projects={projects}
          />
        )}
      </div>
    </section>
  )
}

export default Projects;
