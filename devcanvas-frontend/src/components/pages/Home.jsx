import demoPic from "./../../images/demo.png"

function Home() {
  return (
    <section className="py-10 md:py-16">

      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="text-center">
          <h2 className="font-medium text-gray-600 text-lg md:text-2xl uppercase mb-8">Welcome To DevCanvas</h2>

          <h4 className="font-normal text-gray-900 text-4xl md:text-7xl leading-none mb-8">Build Your Dream Portfolio! </h4>

          <p className="font-normal text-gray-600 text-md md:text-xl mb-5">Are you a passionate web developer but dont have time to build a portfolio website. Let us help you</p>

           <img className="mx-atuo" style={{ transform: "scale(0.7)" }} src={demoPic} alt="Logo"/>
        </div>
      </div>
    </section>

  );
}

export default Home
