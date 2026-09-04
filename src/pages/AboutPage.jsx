import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/" aria-label="Back home">
          <img src="/assets/images/arrow_left_alt.svg" className="btn_back d-inline-block align-top" alt="back" />
        </Link>
      </nav>

      <div className="container-fluid frame_holder project-page">
        <div className="row mx-auto justify-content-center">
          <div className="col-lg-6 col-sm-10 mx-auto-sm text-left">
            <img src="/assets/images/sw_about.jpg" className="sun_home" alt="Stephen" />
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row mx-auto justify-content-center">
          <div className="col-lg-6 col-sm-10 mx-auto-sm text-left">
            <p>
              I&apos;m a Senior Product Designer with over 20 years of experience crafting intuitive, scalable digital experiences. I specialize in design systems, front-end collaboration, and solving complex UX challenges with clarity and creativity. I&apos;ve worked with brands like Disney, Hershey, and McDonald&apos;s to deliver solutions that balance business goals with user needs. Whether I&apos;m designing in Figma or partnering with developers, I focus on building products that are thoughtful, efficient, and a pleasure to use.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
