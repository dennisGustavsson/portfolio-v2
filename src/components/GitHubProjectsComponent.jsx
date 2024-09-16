import { useEffect, useState } from "react";

const GitHubProjectsComponent = () => {
  const specificRepos = [
    "BackEndProjectWebappTS",
    "ASPNET_Assignment_DG",
    "CMS_Assignment_DG",
  ];

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repoPromises = specificRepos.map((repo) =>
          fetch(`https://api.github.com/repos/dennisGustavsson/${repo}`).then(
            (response) => response.json()
          )
        );

        const repoData = await Promise.all(repoPromises);
        setProjects(repoData);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      }
    };

    fetchRepos();
  }, []);

  return (
    <>
      <ul className="gh-list">
        {projects.map((project) => (
          <li key={project.id}>
            <a href={project.html_url} target="_blank">
              {project.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
export default GitHubProjectsComponent;
