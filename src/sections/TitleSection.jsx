import GitHubProjectsComponent from "../components/GitHubProjectsComponent";
import { useRef } from "react";

const TitleSection = () => {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="container">
      <div className="text-container">
        {/* PROJECTS SECTION */}

        <section className="text-box topbox">
          <h3>
            <button onClick={handleClick} className="projectsBtn">
              Projects
            </button>
          </h3>
        </section>

        {/* GITHUB LINKS SECTION */}

        <section id="gh-links" className="text-box" ref={ref}>
          <h3>GitHub Projects</h3>
          <GitHubProjectsComponent />
        </section>

        {/* ABOUT SECTION */}

        <section className="text-box">
          <h3>About Me</h3>
          <p>
            With a strong background in image post production working with
            clients like Vogue and H&M, I now focus on digital design and full
            stack development.
          </p>
        </section>
      </div>
    </section>
  );
};

export default TitleSection;
