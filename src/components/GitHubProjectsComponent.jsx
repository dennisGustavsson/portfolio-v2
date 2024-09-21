import { useEffect, useState } from "react";
import { githubProjects } from "../assets/githubprojects";
import { q } from "framer-motion/client";

const GitHubProjectsComponent = () => {
  // const specificRepos = [
  //   "reactspeech",
  //   "BackEndProjectWebappTS",
  //   "ASPNET_Assignment_DG",
  //   "CMS_Assignment_DG",
  // ];

  const [projects, setProjects] = useState(githubProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(selectedProjectId === projectId ? null : projectId);
  };

  // useEffect(() => {
  //   const fetchRepos = async () => {
  //     try {
  //       const repoPromises = specificRepos.map((repo) =>
  //         fetch(`https://api.github.com/repos/dennisGustavsson/${repo}`).then(
  //           (response) => response.json()
  //         )
  //       );

  //       const repoData = await Promise.all(repoPromises);
  //       setProjects(repoData);
  //     } catch (error) {
  //       console.error("Error fetching GitHub repos:", error);
  //     }
  //   };

  //   fetchRepos();
  // }, []);

  return (
    <>
      <ul className="gh-list">
        {projects.map((project) => (
          <li key={project.id}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default link behavior
                handleProjectClick(project.id);
              }}
            >
              {project.name}
            </a>
            {selectedProjectId === project.id && (
              <>
                <div className="description">
                  {project.description}
                  <a className="ghBtn" href={project.url} target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
export default GitHubProjectsComponent;
