import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// Main App component
const App = () => {
  // State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State for projects data
  const [projects, setProjects] = useState(
    [
      {
        title: "CV-Builder - Web base",
        year: 2024,
        description:
          "Developed a web-based CV builder to create resumes, with PDF export and local storage for templates.",
        technologies: [
          "HTML",
          "CSS",
          "JavaScript",
          "React JS",
          "Firebase",
          "Local Storage",
        ],
        type: "University",
      },
      {
        title: "Crockery Management System using C#",
        year: 2024,
        description:
          "Developed a desktop application for managing a crockery store, handling inventory and sales.",
        technologies: ["C#", "DBMS"],
        type: "University",
      },
      {
        title: "Web Developer Intern - Zaions",
        year: 2024, // Assuming 2024 based on the document's order for this entry
        description:
          "Developed user interfaces with modern JavaScript frameworks, HTML5, and CSS3; wrote custom HTML and JavaScript for existing websites; developed interactive prototypes.",
        technologies: ["JavaScript", "HTML5", "CSS3", "WordPress"],
        type: "Experience",
      },
      {
        title: "Omni food, Hotel, Profile Template",
        year: 2024, // Assuming 2024 based on the document's order for this entry
        description:
          "Developed landing pages using HTML & CSS, marking the start of a web developer journey.",
        technologies: ["HTML", "CSS"],
        type: "Work",
      },
      {
        title: "Online Crockery Store - Web Store",
        year: 2023,
        description:
          "Built a web-based online store for a crockery business, managing product listings and basic inventory.",
        technologies: ["PHP", "MySQL"],
        link: "https://onlinecrockerystore.com/",
        type: "Work",
      },
      {
        title: "CMS App using PHP",
        year: 2023,
        description:
          "Developed a CMS app for managing blog posts, including login, registration, image posting, and category management.",
        technologies: ["PHP", "MySQL", "XAMPP"],
        type: "Work",
      },
      {
        title: "Elementor Tab Development",
        year: 2023,
        description:
          "Developed custom Elementor tabs for WordPress, featuring full customization for inputs and headings.",
        technologies: ["WordPress", "PHP"],
        type: "Work",
      },
      {
        title: "Zaions using Wordpress Theme (Maintenance)",
        year: 2023,
        description:
          "Maintained WordPress theme templates and performed CSS corrections.",
        technologies: ["WordPress", "CSS"],
        type: "Work",
      },
      {
        title: "cognera using Wordpress Theme",
        year: 2023,
        description:
          "Built a cognera theme using Elementor, adding app images, grid views, and tabs.",
        technologies: ["WordPress", "Elementor"],
        type: "Work",
      },
      {
        title: "CV-Builder using SASS",
        year: 2023,
        description:
          "Developed a clone of a CV builder app using SASS, replicating pages and functionality.",
        technologies: ["SASS", "HTML", "CSS"],
        type: "Work",
      },
      {
        title: "Natours using SASS",
        year: 2023,
        description:
          "Developed a single-page application clone with advanced animations and transitions using SASS.",
        technologies: ["SASS", "HTML", "CSS"],
        type: "Work",
      },
      {
        title: "Feedbear App using Tailwind",
        year: 2023,
        description:
          "Developed a clone of the Feedbear app pages using Tailwind CSS.",
        technologies: ["Tailwind CSS", "HTML", "JavaScript"],
        type: "Work",
      },
      {
        title: "Forkify App using JavaScript",
        year: 2023,
        description:
          "Developed a recipe search app with features to add favorites and bookmarks.",
        technologies: ["JavaScript"],
        type: "Work",
      },
      {
        title: "To-do list App using JavaScript",
        year: 2023,
        description:
          "Developed an efficient to-do list app with features like image view and categorization.",
        technologies: ["JavaScript"],
        type: "Work",
      },
      {
        title: "Online Crockery Store (Design) using SDA",
        year: 2023,
        description:
          "Designed the architecture of an online store using UML diagrams and tools like Draw.io & Visual Paradigm.",
        technologies: ["Draw.io", "Visual Paradigm"],
        type: "University",
      },
      {
        title: "Web Developer - IGO Pvt",
        year: 2023,
        description:
          "Developed user interfaces with WordPress themes and maintained performance.",
        technologies: ["WordPress"],
        type: "Experience",
      },
      {
        title: "Web Developer Intern - Invobyte",
        year: 2023,
        description:
          "Developed responsive and user-friendly interfaces using React.js, HTML5, and CSS3; built interactive features with React hooks.",
        technologies: ["React.js", "HTML5", "CSS3", "JavaScript"],
        type: "Experience",
      },
      {
        title: "Cafe Management System using C++",
        year: 2022,
        description:
          "Developed a cafe product management, order taker, and inventory system using C++ and OOP.",
        technologies: ["C++", "OOP"],
        type: "University",
      },
    ].sort((a, b) => b.year - a.year)
  ); // Sort projects by year descending

  // State for current project filter
  const [filter, setFilter] = useState("All");

  // Ref for the Chart.js canvas element
  const chartRef = useRef(null);
  // Ref for the Chart.js instance
  const chartInstance = useRef(null);

  // Get all unique technologies for filters
  const allTechs = ["All", ...new Set(projects.flatMap((p) => p.technologies))];

  // Filter projects based on the current filter state
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.technologies.includes(filter));

  // Effect for Section Animations (fade-in from bottom)
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // Trigger when 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-10");
          entry.target.classList.add("opacity-100", "translate-y-0");
          sectionObserver.unobserve(entry.target); // Stop observing once visible
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      // Add initial hidden classes for animation
      section.classList.add(
        "opacity-0",
        "translate-y-10",
        "transition-all",
        "duration-800",
        "ease-out"
      );
      sectionObserver.observe(section);
    });

    // Cleanup observer on component unmount
    return () => {
      sections.forEach((section) => sectionObserver.unobserve(section));
    };
  }, []);

  // Effect for H1 and H2 initial animation
  useEffect(() => {
    const h1Element = document.querySelector("#about h1");
    const h2Element = document.querySelector("#about h2");

    if (h1Element) {
      h1Element.classList.add(
        "opacity-0",
        "translate-y-10",
        "transition-all",
        "duration-1000",
        "ease-out"
      );
      setTimeout(() => {
        h1Element.classList.remove("opacity-0", "translate-y-10");
        h1Element.classList.add("opacity-100", "translate-y-0");
      }, 100); // Small delay for h1
    }
    if (h2Element) {
      h2Element.classList.add(
        "opacity-0",
        "translate-y-10",
        "transition-all",
        "duration-1000",
        "ease-out"
      );
      setTimeout(() => {
        h2Element.classList.remove("opacity-0", "translate-y-10");
        h2Element.classList.add("opacity-100", "translate-y-0");
      }, 300); // Slightly longer delay for h2
    }
  }, []);

  // Effect for Experience Items and Project Cards animations
  useEffect(() => {
    const animatedElements = document.querySelectorAll(
      ".experience-item, .project-card"
    );
    const itemObserverOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("experience-item")) {
            entry.target.classList.remove(
              "opacity-0",
              "-translate-x-20",
              "translate-x-20"
            );
            entry.target.classList.add("opacity-100", "translate-x-0");
          } else if (entry.target.classList.contains("project-card")) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
          itemObserver.unobserve(entry.target);
        }
      });
    }, itemObserverOptions);

    animatedElements.forEach((element) => {
      if (element.classList.contains("experience-item")) {
        const isLeftAligned = element.classList.contains("ml-[calc(50%+2rem)]");
        element.classList.add(
          "opacity-0",
          isLeftAligned ? "-translate-x-20" : "translate-x-20"
        );
      } else if (element.classList.contains("project-card")) {
        element.classList.add("opacity-0", "translate-y-10");
      }
      element.classList.add("transition-all", "duration-700", "ease-out");
      itemObserver.observe(element);
    });

    return () => {
      animatedElements.forEach((element) => itemObserver.unobserve(element));
    };
  }, [filter]); // Re-run when filter changes to observe new cards after filtering

  // Effect for Chart.js initialization and updates
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy existing chart before creating a new one
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "HTML5",
            "CSS",
            "Tailwind CSS",
            "SASS",
            "JavaScript",
            "React JS",
            "OOP",
            "Firebase Auth",
            "MySQL & DBMS",
            "Firestore database",
          ],
          datasets: [
            {
              label: "Frontend",
              data: [95, 90, 85, 80, 90, 85, 0, 0, 0, 0], // Example proficiency scores
              backgroundColor: "rgba(59, 130, 246, 0.7)", // Blue-600
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: 1,
            },
            {
              label: "Backend & Concepts",
              data: [0, 0, 0, 0, 0, 0, 80, 75, 70, 70], // Example proficiency scores
              backgroundColor: "rgba(249, 115, 22, 0.7)", // Orange-500
              borderColor: "rgba(249, 115, 22, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: {
                color: "#1F2937", // Gray-800 text
              },
            },
            title: {
              display: true,
              text: "Skill Proficiency (Self-Assessed)",
              color: "#1F2937", // Gray-800 text
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.x !== null && context.parsed.x > 0) {
                    label += `${context.label}`;
                  }
                  return label;
                },
              },
            },
          },
          scales: {
            x: {
              stacked: true,
              display: false,
              max: 100,
              ticks: {
                color: "#1F2937", // Gray-800 text
              },
            },
            y: {
              stacked: true,
              ticks: {
                color: "#1F2937", // Gray-800 text
              },
            },
          },
        },
      });
    }

    // Cleanup chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="antialiased">
      {/* Header & Navigation */}
      <header
        id="header"
        className="sticky top-0 z-50 shadow-sm bg-white/80 backdrop-blur-md"
      >
        <nav className="container flex items-center justify-between px-6 py-4 mx-auto">
          <a href="#" className="text-2xl font-bold text-gray-900">
            Fayyaz Ali
          </a>
          <div className="items-center hidden space-x-8 md:flex">
            <a
              href="#about"
              className="text-gray-700 border-b-2 border-transparent nav-link hover:text-blue-700 hover:border-blue-700"
            >
              About
            </a>
            <a
              href="#experience"
              className="text-gray-700 border-b-2 border-transparent nav-link hover:text-blue-700 hover:border-blue-700"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-gray-700 border-b-2 border-transparent nav-link hover:text-blue-700 hover:border-blue-700"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="text-gray-700 border-b-2 border-transparent nav-link hover:text-blue-700 hover:border-blue-700"
            >
              Skills
            </a>
            <a
              href="#education"
              className="text-gray-700 border-b-2 border-transparent nav-link hover:text-blue-700 hover:border-blue-700"
            >
              Education
            </a>
            <a
              href="#certifications"
              className="text-gray-700 border-b-2 border-transparent nav-link hover:text-blue-700 hover:border-blue-700"
            >
              Certifications
            </a>
          </div>
          <a
            href="mailto:iam.fayyazali@gmail.com"
            className="hidden px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg md:block hover:bg-blue-700"
          >
            Contact Me
          </a>
          <button
            id="mobile-menu-button"
            className="text-gray-800 md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </nav>
        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden px-6 pt-2 pb-4`}
        >
          <a
            href="#about"
            className="block py-2 text-gray-700 hover:text-blue-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#experience"
            className="block py-2 text-gray-700 hover:text-blue-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Experience
          </a>
          <a
            href="#projects"
            className="block py-2 text-gray-700 hover:text-blue-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Projects
          </a>
          <a
            href="#skills"
            className="block py-2 text-gray-700 hover:text-blue-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Skills
          </a>
          <a
            href="#education"
            className="block py-2 text-gray-700 hover:text-blue-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Education
          </a>
          <a
            href="#certifications"
            className="block py-2 text-gray-700 hover:text-blue-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Certifications
          </a>
          <a
            href="mailto:iam.fayyazali@gmail.com"
            className="block px-4 py-2 mt-2 text-center text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Contact Me
          </a>
        </div>
      </header>

      <main className="container px-6 py-12 mx-auto bg-gray-50">
        {/* About Section */}
        <section id="about" className="mb-24">
          <h1 className="text-5xl font-bold text-gray-900 translate-y-10 opacity-0 md:text-6xl">
            Software Engineer
          </h1>
          <h2 className="mt-2 text-3xl font-semibold text-blue-700 translate-y-10 opacity-0 md:text-4xl">
            Frontend Developer | Building Scalable & Performant Web Applications
          </h2>

          <div className="max-w-4xl mt-8 space-y-4 text-lg text-gray-700">
            <p>
              Highly motivated and detail-oriented Software Engineer with a
              strong foundation in frontend development using modern JavaScript
              frameworks, HTML5, and CSS3. Eager to leverage foundational
              backend knowledge (PHP, MySQL, Firebase) and a passion for
              building scalable and performant web applications in a challenging
              full-stack environment.
            </p>
            <p>
              Proven ability to develop responsive user interfaces, interactive
              prototypes, and manage web content effectively.
            </p>
          </div>
          <div className="flex items-center mt-8 space-x-4">
            <a
              href="https://www.linkedin.com/in/fayyaz-ali-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://portfolio-fayyaz-ali.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700"
            >
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9 9 0 01-9-9 9 9 0 019-9m9 9a9 9 0 01-9 9m-9-9h18m-9 9a9 9 0 009-9m-9 9V3m0 18a9 9 0 01-9-9m9 9a9 9 0 00-9-9m9-9h.008v.008H12V3zm0 0h-.008v.008H12V3z"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-24">
          <h3 className="mb-12 text-4xl font-bold text-center text-gray-900">
            Professional Experience
          </h3>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-blue-200"></div>
            {/* Experience Item 1 (Left Aligned) */}
            <div className="relative mb-12 experience-item ml-[calc(50%+2rem)]">
              {/* <div className="absolute w-6 h-6 bg-blue-600 rounded-full left-1/2 -translate-x-1/2 mt-1.5 border-4 border-white"></div> */}
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h4 className="text-xl font-bold text-gray-900">
                  Web Developer Intern
                </h4>
                <p className="text-gray-700">Zaions | Lahore, Pakistan</p>
                <p className="mt-1 mb-3 text-sm text-gray-500">
                  2024 (2 months)
                </p>
                <ul className="space-y-1 text-gray-700 list-disc list-inside">
                  <li>
                    Developed user interfaces with modern JavaScript frameworks,
                    HTML5, and CSS3.
                  </li>
                  <li>
                    Enhanced existing website functionalities with custom HTML
                    and JavaScript.
                  </li>
                  <li>
                    Created interactive prototypes for client presentations.
                  </li>
                </ul>
              </div>
            </div>
            {/* Experience Item 2 (Right Aligned) */}
            <div className="relative mb-12 experience-item mr-[calc(50%+2rem)]">
              {/* <div className="absolute w-6 h-6 bg-blue-600 rounded-full left-1/2 -translate-x-1/2 mt-1.5 border-4 border-white"></div> */}
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h4 className="text-xl font-bold text-right text-gray-900">
                  Web Developer
                </h4>
                <p className="text-right text-gray-700">
                  IGO Pvt | Lahore, Pakistan
                </p>
                <p className="mt-1 mb-3 text-sm text-right text-gray-500">
                  2023 (2 months)
                </p>
                <ul className="space-y-1 text-left text-gray-700 list-disc list-outside">
                  <li>
                    Developed and maintained user interfaces with WordPress
                    themes.
                  </li>
                  <li>Customized themes to meet client requirements.</li>
                </ul>
              </div>
            </div>
            {/* Experience Item 3 (Left Aligned) */}
            <div className="relative mb-12 experience-item ml-[calc(50%+2rem)]">
              {/* <div className="absolute w-6 h-6 bg-blue-600 rounded-full left-1/2 -translate-x-1/2 mt-1.5 border-4 border-white"></div> */}
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h4 className="text-xl font-bold text-gray-900">
                  Web Developer Intern
                </h4>
                <p className="text-gray-700">Invobyte | Lahore, Pakistan</p>
                <p className="mt-1 mb-3 text-sm text-gray-500">
                  2023 (2 months)
                </p>
                <ul className="space-y-1 text-gray-700 list-disc list-inside">
                  <li>
                    Developed user-friendly interfaces using React.js, HTML5,
                    and CSS3.
                  </li>
                  <li>
                    Built interactive features using modern JavaScript (ES6+)
                    and React hooks.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <h3 className="mb-4 text-4xl font-bold text-center text-gray-900">
            Project Showcase
          </h3>
          <p className="max-w-2xl mx-auto mb-12 text-center text-gray-700">
            Here's a selection of my work. Click the buttons to filter by
            technology and see how I apply my skills to solve real-world
            problems and build engaging applications.
          </p>

          <div
            id="project-filters"
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {allTechs.map((tech) => (
              <button
                key={tech}
                className={`filter-btn px-4 py-2 text-sm font-medium rounded-full shadow-sm transition-colors ${
                  filter === tech
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-blue-50"
                }`}
                onClick={() => setFilter(tech)}
              >
                {tech}
              </button>
            ))}
          </div>

          <div
            id="project-gallery"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="flex flex-col p-6 overflow-hidden bg-white border border-blue-100 rounded-lg shadow-md project-card"
              >
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-xl font-bold text-gray-900">
                      {project.title}
                    </h4>
                    <span className="text-sm font-medium text-gray-500">
                      {project.year}
                    </span>
                  </div>
                  <p className="mb-4 text-gray-700">{project.description}</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                      View Live ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-24">
          <h3 className="mb-4 text-4xl font-bold text-center text-gray-900">
            Technical Skills
          </h3>
          <p className="max-w-2xl mx-auto mb-12 text-center text-gray-700">
            My technical abilities span across frontend and backend development.
            This chart provides a high-level overview of my core competencies,
            showcasing my versatility as a developer.
          </p>
          <div className="p-4 bg-white rounded-lg shadow-md sm:p-8">
            <div className="relative w-full max-w-4xl mx-auto chart-container h-96">
              <canvas ref={chartRef} id="skillsChart"></canvas>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-24">
          <h3 className="mb-12 text-4xl font-bold text-center text-gray-900">
            Education
          </h3>
          <div className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-md">
            <h4 className="text-2xl font-bold text-gray-900">
              Bachelor of Science, Software Engineering
            </h4>
            <p className="text-blue-700">
              Minhaj University Lahore | Lahore, Pakistan
            </p>
            <p className="mt-1 mb-3 text-sm text-gray-500">2021 - 2025</p>
            <p className="text-gray-700">GPA: 3.6</p>
          </div>
        </section>

        {/* Certifications & Courses Section */}
        <section id="certifications" className="mb-24">
          <h3 className="mb-12 text-4xl font-bold text-center text-gray-900">
            Certifications & Courses
          </h3>
          <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>
                **The Complete JavaScript Course 2025: From Zero to Expert!** -
                Jonas Schmedtmann (Udemy)
              </li>
              <li>
                **Advanced CSS and Sass: Flexbox, Grid, Animations and More!** -
                Jonas Schmedtmann (Udemy)
              </li>
              <li>
                **Tailwind CSS From Scratch Learn By Building Projects** - Brad
                Traversy (Udemy)
              </li>
              <li>
                **PHP for Beginners - Become a PHP Master - CMS Project** -
                Edwin Diaz (Udemy)
              </li>
              <li>
                **Creating WordPress Plugins The Right Way** - Marcelo Xavier
                Vieira (Udemy)
              </li>
              <li>
                **Complete WordPress Theme & Plugin Development Course** - Zac
                Gordon (Udemy)
              </li>
              <li>
                **Build Responsive Real-World Websites with HTML and CSS** -
                Jonas Schmedtmann (Udemy)
              </li>
              <li>
                **Funtamental Programming** - KICKS UET (University of
                Engineering and Technology) (2019)
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="py-8 text-white bg-gray-900">
        <div className="container px-6 mx-auto text-center">
          <p>&copy; 2024 Fayyaz Ali. All rights reserved.</p>
          <p className="mt-2">
            Designed and built to showcase my development journey.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
