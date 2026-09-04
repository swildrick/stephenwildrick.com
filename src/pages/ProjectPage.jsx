import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProjectPage({ projectList }) {
  const { slug } = useParams();
  // If projectList is not passed, attempt to read from window.__PROJECTS (fallback)
  const list = projectList || (window && window.__PROJECTS) || [];
  const project = list.find((item) => item.slug === slug) ?? list[0] ?? {
    title: 'Project',
    company: '',
    summary: '',
    story: [],
    image: '/assets/images/work_sunnova.png',
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/" aria-label="Back home">
          <img src="/assets/images/arrow_left_alt.svg" className="btn_back d-inline-block align-top" alt="back" />
        </Link>
      </nav>

      <div className="container-fluid frame_holder project-page">
        <div className="row mx-auto justify-content-center">
          <div className="col-lg-8 col-sm-10 mx-auto-sm text-left">
            <img src={project.image} className="sun_home" alt={project.title} />
          </div>
        </div>
      </div>

      <div className="container-fluid project-page">
        <div className="row mx-auto justify-content-center">
          <div className="col-lg-8 col-sm-10 content">
            <h2>{project.title}</h2>
            <p>
              <strong>{project.company}</strong>
            </p>
            <p>{project.summary}</p>
            {project.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              <Link to="/">← Back to work</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
