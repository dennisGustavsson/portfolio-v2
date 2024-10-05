import GitHubProjectsComponent from "../components/GitHubProjectsComponent";
import ModalComponent from "../components/ModalComponent";
import useEmail from "../assets/hooks/useEmailHook";
import { useRef, useState } from "react";

const TitleSection = () => {
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const encodedEmail = "ZGVubmlzZ3VzdGF2c3Nvbjg3QGdtYWlsLmNvbQ==";
  const email = useEmail(encodedEmail);

  const handleClick = () => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="container">
      <div className="text-container">
        {/* PROJECTS SECTION */}

        <section className="text-box topbox">
          <h3>
            <button onClick={handleClick} className="btn projectsBtn">
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
          <div>
            <button className="btn" onClick={() => setShowModal(true)}>
              Contact
            </button>
          </div>
          <ModalComponent
            shouldShow={showModal}
            onRequestClose={() => setShowModal(false)}
          >
            <div>
              <a className="contact" id="contact" href={`mailto:${email}`}>
                email me
              </a>
            </div>
          </ModalComponent>
        </section>
      </div>
    </section>
  );
};

export default TitleSection;
