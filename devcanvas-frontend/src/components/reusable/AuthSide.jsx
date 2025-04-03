import { Link } from "react-router-dom";

function AuthSide({link}) {

  return (
    <section className="py-10 md:py-16 w-1/5 sm:w-1/5 md:w-3/5">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="justify-items-center">
          <h2 className="font-normal text-white text-4xl md:text-7xl leading-none mb-4 md:mb-8 hidden md:block">Welcome To DevCanvas</h2>
          {/* className="font-normal text-white text-4xl md:text-7xl leading-none mb-8" */}
          <h4 className="font-medium text-white text-lg md:text-4xl uppercase mb-4 md:mb-8 hidden md:block">Build Your Dream Portfolio! </h4>

          <p className="font-normal text-white text-md md:text-xl mb-6 md:mb-16 hidden md:block">Are you a passionate web developer but dont have time to build a portfolio website. Let us help you</p>

          <Link to={link}>
            <button className="hidden md:block text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {link.replace("/", "")}
            </button>
          </Link>

          <p className="font-bold text-white text-md md:text-xl mb-6 md:mb-16">Note: Backend server turns of after inactivity. It might take time to respond or start please be patient or try again. ITS THE FREE ONE!</p>
        </div>
      </div>
    </section>
  );
}

export default AuthSide
