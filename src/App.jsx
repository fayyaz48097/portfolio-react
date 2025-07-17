import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// Main App component
const App = () => {
  // State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State for projects data
  const [projects, setProjects] = useState([
    {
      title: "CV-Builder - Web-based",
      year: 2024,
      description:
        "A web-based CV/resume builder application with dynamic data handling.",
      technologies: ["React", "JavaScript", "Firebase"],
      type: "University",
    },
    {
      title: "Crockery Management System",
      year: 2024,
      description:
        "A desktop application to manage product inventory, sales, and reporting for a crockery store.",
      technologies: ["C#"],
      type: "University",
    },
    {
      title: "Elementor Tab Development",
      year: 2023,
      description:
        "Developed custom, fully-featured Elementor tabs and other components for WordPress.",
      technologies: ["WordPress", "PHP"],
      type: "Work",
    },
    {
      title: "Online Crockery Store",
      year: 2023,
      description:
        "Built a full-featured e-commerce web store for a crockery business.",
      technologies: ["PHP", "MySQL"],
      link: "https://onlinecrockerystore.com/",
      type: "Work",
    },
    {
      title: "CMS App",
      year: 2023,
      description:
        "A comprehensive Content Management System for managing blog posts with user authentication.",
      technologies: ["PHP", "MySQL"],
      type: "Work",
    },
    {
      title: "Forkify App",
      year: 2023,
      description:
        "A recipe search application featuring favorites and bookmarking functionality.",
      technologies: ["JavaScript"],
      type: "Work",
    },
    {
      title: "Feedbear App Clone",
      year: 2023,
      description:
        "A clone of the Feedbear application, built to master Tailwind CSS and modern tooling.",
      technologies: ["Tailwind CSS", "JavaScript"],
      type: "Work",
    },
    {
      title: "Natours App Clone",
      year: 2023,
      description:
        "A single-page application clone with a focus on advanced CSS animations and transitions.",
      technologies: ["SASS", "CSS"],
      type: "Work",
    },
  ]);
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
      // Ensure initial hidden state for animation
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
      // Ensure initial hidden state for animation
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
          // For experience items, remove the specific translate-x classes
          if (entry.target.classList.contains("experience-item")) {
            entry.target.classList.remove(
              "opacity-0",
              "-translate-x-20",
              "translate-x-20"
            );
            entry.target.classList.add("opacity-100", "translate-x-0");
          }
          // For project cards, remove the translate-y class
          else if (entry.target.classList.contains("project-card")) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
          itemObserver.unobserve(entry.target);
        }
      });
    }, itemObserverOptions);

    animatedElements.forEach((element) => {
      // Add initial hidden classes based on type/position
      if (element.classList.contains("experience-item")) {
        const isLeftAligned = element.classList.contains("ml-[calc(50%+2rem)]"); // Check for left-aligned class
        // Apply initial transform for slide-in
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
            "JavaScript",
            "React.js",
            "React Hooks",
            "HTML5",
            "CSS3",
            "SASS",
            "Tailwind CSS",
            "PHP",
            "MySQL",
            "Firebase",
            "C#",
            "C++",
          ],
          datasets: [
            {
              label: "Frontend",
              data: [90, 85, 80, 95, 95, 88, 90, 0, 0, 0, 0, 0],
              backgroundColor: "rgba(79, 70, 229, 0.7)",
              borderColor: "rgba(79, 70, 229, 1)",
              borderWidth: 1,
            },
            {
              label: "Backend & Databases",
              data: [0, 0, 0, 0, 0, 0, 0, 75, 70, 78, 65, 60],
              backgroundColor: "rgba(30, 64, 175, 0.7)",
              borderColor: "rgba(30, 64, 175, 1)",
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
            },
            title: {
              display: true,
              text: "Skill Proficiency (Self-Assessed)",
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
            },
            y: {
              stacked: true,
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
        className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50"
      >
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-slate-800">
            Fayyaz Ali
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="nav-link text-slate-600 hover:text-slate-900 border-b-2 border-transparent hover:border-slate-900"
            >
              About
            </a>
            <a
              href="#experience"
              className="nav-link text-slate-600 hover:text-slate-900 border-b-2 border-transparent hover:border-slate-900"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="nav-link text-slate-600 hover:text-slate-900 border-b-2 border-transparent hover:border-slate-900"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="nav-link text-slate-600 hover:text-slate-900 border-b-2 border-transparent hover:border-slate-900"
            >
              Skills
            </a>
          </div>
          <a
            href="mailto:iam.fayyazali@gmail.com"
            className="hidden md:block bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Contact Me
          </a>
          <button
            id="mobile-menu-button"
            className="md:hidden text-slate-800 focus:outline-none"
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
            className="block py-2 text-slate-600 hover:text-slate-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#experience"
            className="block py-2 text-slate-600 hover:text-slate-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Experience
          </a>
          <a
            href="#projects"
            className="block py-2 text-slate-600 hover:text-slate-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Projects
          </a>
          <a
            href="#skills"
            className="block py-2 text-slate-600 hover:text-slate-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Skills
          </a>
          <a
            href="mailto:iam.fayyazali@gmail.com"
            className="block mt-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-center"
          >
            Contact Me
          </a>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* About Section */}
        <section id="about" className="mb-24">
          {/* Initial opacity and transform for page load animation */}
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 opacity-0 translate-y-10">
            Software Engineer
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-600 mt-2 opacity-0 translate-y-10">
            Frontend Developer | Full Stack Aspirant
          </h2>

          <div className="mt-8 text-lg text-slate-700 max-w-4xl space-y-4">
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
          <div className="mt-8 flex items-center space-x-4">
            <a
              href="https://www.linkedin.com/in/fayyaz-ali-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://portfolio-fayyaz-ali.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900"
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
          <h3 className="text-4xl font-bold text-slate-800 mb-12 text-center">
            Career Journey
          </h3>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-300"></div>
            {/* Experience Item 1 */}
            <div className="relative mb-12 experience-item ml-[calc(50%+2rem)]">
              {/* <div className="absolute w-6 h-6 bg-slate-800 rounded-full left-1/2 -translate-x-1/2 mt-1.5 border-4 border-white"></div> */}
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h4 className="font-bold text-xl text-slate-800">
                  Web Developer Intern
                </h4>
                <p className="text-slate-600">Zaions | Lahore, Pakistan</p>
                <p className="text-sm text-slate-500 mt-1 mb-3">
                  2024 (2 months)
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>
                    Developed responsive user interfaces with modern JavaScript
                    frameworks.
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
            {/* Experience Item 2 */}
            <div className="relative mb-12 experience-item mr-[calc(50%+2rem)]">
              {/* <div className="absolute w-6 h-6 bg-slate-800 rounded-full left-1/2 -translate-x-1/2 mt-1.5 border-4 border-white"></div> */}
              <div className="p-6 bg-white rounded-lg shadow-md text-right">
                <h4 className="font-bold text-xl text-slate-800">
                  Web Developer
                </h4>
                <p className="text-slate-600">IGO Pvt | Lahore, Pakistan</p>
                <p className="text-sm text-slate-500 mt-1 mb-3">
                  2023 (2 months)
                </p>
                <ul className="list-disc list-outside text-slate-700 space-y-1 text-left inline-block">
                  <li>
                    Developed and maintained user interfaces with WordPress
                    themes.
                  </li>
                  <li>Customized themes to meet client requirements.</li>
                </ul>
              </div>
            </div>
            {/* Experience Item 3 */}
            <div className="relative mb-12 experience-item ml-[calc(50%+2rem)]">
              {/* <div className="absolute w-6 h-6 bg-slate-800 rounded-full left-1/2 -translate-x-1/2 mt-1.5 border-4 border-white"></div> */}
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h4 className="font-bold text-xl text-slate-800">
                  Web Developer Intern
                </h4>
                <p className="text-slate-600">Invobyte | Lahore, Pakistan</p>
                <p className="text-sm text-slate-500 mt-1 mb-3">
                  2023 (2 months)
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
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
          <h3 className="text-4xl font-bold text-slate-800 mb-4 text-center">
            Project Showcase
          </h3>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
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
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => setFilter(tech)}
              >
                {tech}
              </button>
            ))}
          </div>

          <div
            id="project-gallery"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="project-card bg-white rounded-lg shadow-md overflow-hidden p-6 flex flex-col border border-gray-200"
              >
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-xl text-slate-800">
                      {project.title}
                    </h4>
                    <span className="text-sm font-medium text-slate-500">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-4">{project.description}</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full"
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
                      className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
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
          <h3 className="text-4xl font-bold text-slate-800 mb-4 text-center">
            Technical Skills
          </h3>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            My technical abilities span across frontend and backend development.
            This chart provides a high-level overview of my core competencies,
            showcasing my versatility as a developer.
          </p>
          <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md">
            <div className="chart-container relative w-full h-96 max-w-4xl mx-auto">
              <canvas ref={chartRef} id="skillsChart"></canvas>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
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
