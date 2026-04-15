import React, { forwardRef } from "react";

const ProjectCard = forwardRef(({ project, index, isMobile }, ref) => {
  const handleClick = () => {
    window.open(project.deployedLink, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      ref={ref}
      className={`pw-card project-card project-card-grid interactive`}
      data-cursor-text="View Project"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="project-card-image">
        <div
          className="bg-img"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="project-image-overlay" />
        <div className="big-number">{String(index + 1).padStart(2, "0")}</div>
      </div>

      <div className="pw-card-body project-card-body">
        <div>
          <p className="project-domain">{project.domain}</p>
          <h2 className="project-title">{project.title}</h2>
          <div className="project-divider" />
          <p className="project-desc">{project.description}</p>

          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="project-contributors-header">
            <span>Contributors</span>
            <div className="line" />
            <span className="count">{project.members.length} members</span>
          </div>

          <div className="project-members">
            {project.members.map((name) => (
              <span key={name} className="project-member">
                {name}
              </span>
            ))}
          </div>

          <div className="project-footer">
            <a
              href={project.deployedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              VIEW PROJECT <span style={{ fontSize: 15 }}>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
});

export default ProjectCard;
