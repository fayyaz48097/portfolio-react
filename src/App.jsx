import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import FloatingActionButtons from "./FloatingButtons/FloatingActionButtons";

// DeployedProjects Component
const DeployedProjects = ({ projects, isDark }) => {
  const deployed = projects.filter((p) => p.type === "Deployed");

  if (deployed.length === 0) return null;

  return (
    <section id="deployed-projects" className="mb-24">
      <div className="mb-4 text-center">
        <span
          className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${
            isDark
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          Live Projects
        </span>
      </div>
      <h3
        className={`mb-4 text-4xl md:text-5xl font-bold text-center ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Live & Deployed Projects
      </h3>
      <p
        className={`max-w-3xl mx-auto mb-12 text-center ${
          isDark ? "text-gray-400" : "text-gray-600"
        } text-lg`}
      >
        Production-ready applications that are fully deployed and accessible
        online.
      </p>
      <div className="grid max-w-6xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {deployed.map((project, index) => (
          <div
            key={index}
            className={`group flex flex-col p-6 rounded-2xl transition-all duration-300 project-card border ${
              isDark
                ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800 hover:border-emerald-500/50"
                : "bg-white border-gray-200 hover:border-emerald-500 hover:shadow-xl"
            }`}
          >
            <div className="flex-grow">
              <div className="flex items-start justify-between mb-3">
                <h4
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  } group-hover:text-emerald-500 transition-colors`}
                >
                  {project.title}
                </h4>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    isDark
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {project.year}
                </span>
              </div>
              <p
                className={`mb-4 text-sm leading-relaxed ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {project.description}
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                      isDark
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-semibold flex items-center gap-1 ${
                      isDark
                        ? "text-emerald-400 hover:text-emerald-300"
                        : "text-emerald-600 hover:text-emerald-700"
                    }`}
                  >
                    View Live
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
                {project.gitUrl && (
                  <a
                    href={project.gitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-semibold flex items-center gap-1 ${
                      isDark
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Code
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// HomeView Component
const HomeView = ({
  projects,
  filter,
  setFilter,
  allTechs,
  filteredProjects,
  chartRef,
  chartInstance,
  profilePicRef,
  isDark,
}) => {
  // Section Animations
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-10");
          entry.target.classList.add("opacity-100", "translate-y-0");
          sectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      section.classList.add(
        "opacity-0",
        "translate-y-10",
        "transition-all",
        "duration-800",
        "ease-out"
      );
      sectionObserver.observe(section);
    });

    return () => {
      sections.forEach((section) => sectionObserver.unobserve(section));
    };
  }, []);

  // Removed the useEffect for H1, H2, and Profile Picture animations to ensure immediate visibility.

  // Experience Items and Project Cards animations
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
        const isLeftAligned = element.classList.contains("ml-auto");
        element.classList.add(
          "opacity-0",
          isLeftAligned ? "translate-x-20" : "-translate-x-20"
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
  }, [filter]);

  // Chart.js initialization
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const textColor = isDark ? "#9CA3AF" : "#1F2937";
      const gridColor = isDark
        ? "rgba(75, 85, 99, 0.2)"
        : "rgba(209, 213, 219, 0.3)";

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
            "React Hooks",
            "PHP",
            "Laravel",
            "MySQL",
            "Firebase Auth",
            "OOP",
            "DBMS",
            "C#",
            "C++",
          ],
          datasets: [
            {
              label: "Frontend",
              data: [95, 90, 85, 80, 90, 85, 80, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: isDark
                ? "rgba(16, 185, 129, 0.7)"
                : "rgba(59, 130, 246, 0.7)",
              borderColor: isDark
                ? "rgba(16, 185, 129, 1)"
                : "rgba(59, 130, 246, 1)",
              borderWidth: 1,
            },
            {
              label: "Backend & Concepts",
              data: [0, 0, 0, 0, 0, 0, 0, 75, 90, 70, 78, 80, 70, 65, 60],
              backgroundColor: isDark
                ? "rgba(245, 158, 11, 0.7)"
                : "rgba(249, 115, 22, 0.7)",
              borderColor: isDark
                ? "rgba(245, 158, 11, 1)"
                : "rgba(249, 115, 22, 1)",
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
                color: textColor,
                font: {
                  size: 12,
                  weight: "600",
                },
                padding: 15,
              },
            },
            title: {
              display: true,
              text: "Skill Proficiency (Self-Assessed)",
              color: textColor,
              font: {
                size: 16,
                weight: "700",
              },
              padding: {
                top: 10,
                bottom: 20,
              },
            },
          },
          scales: {
            x: {
              stacked: true,
              display: false,
              max: 100,
              grid: {
                color: gridColor,
              },
              ticks: {
                color: textColor,
              },
            },
            y: {
              stacked: true,
              grid: {
                color: gridColor,
              },
              ticks: {
                color: textColor,
                font: {
                  size: 11,
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [isDark]);

  return (
    <main
      className={`container px-4 sm:px-6 lg:px-8 py-12 mx-auto ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      {/* About Section */}
      <section
        id="about"
        className="flex flex-col items-center mb-24 text-center"
      >
        <img
          ref={profilePicRef}
          src="/auther.jpg"
          alt="Fayyaz Ali"
          // FIX: Removed opacity-0 and scale-0 to ensure the image is immediately visible.
          className={`object-cover w-32 h-32 sm:w-40 sm:h-40 mb-8 transition-all duration-700 ease-out rounded-full shadow-2xl ${
            isDark ? "border-4 border-emerald-500" : "border-4 border-blue-500"
          }`}
        />
        {/* FIX: Removed translate-y-10 and opacity-0 to ensure the H1 is immediately visible. */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Software Engineer
        </h1>
        {/* FIX: Removed translate-y-10 and opacity-0 to ensure the H2 is immediately visible. */}
        <h2
          className={`mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold px-4 ${
            isDark ? "text-emerald-400" : "text-blue-700"
          }`}
        >
          Dynamic Frontend Engineer | Building Secure, Scalable, and{" "}
          <br className="hidden md:block" />
          Responsive Web Applications
        </h2>

        <div
          className={`max-w-4xl mt-8 space-y-4 text-base sm:text-lg px-4 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <p>
            Highly motivated and detail-oriented Software Engineer with a strong
            foundation in frontend development using modern JavaScript
            frameworks, HTML5, and CSS3. Eager to leverage foundational backend
            knowledge (PHP, MySQL, Firebase) and a passion for building scalable
            and performant web applications in a challenging full-stack
            environment.
          </p>
          <p>
            Proven ability to develop responsive user interfaces, interactive
            prototypes, and manage web content effectively.
          </p>
        </div>
        <div className="flex items-center mt-8 space-x-6">
          <a
            href="https://www.linkedin.com/in/fayyaz-ali-dev"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${
              isDark
                ? "text-gray-400 hover:text-emerald-400"
                : "text-gray-600 hover:text-blue-700"
            }`}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="https://github.com/fayyaz48097/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${
              isDark
                ? "text-gray-400 hover:text-emerald-400"
                : "text-gray-600 hover:text-blue-700"
            }`}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.493.998.108-.77.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.293-1.552 3.3-1.23 3.3-1.23.652 1.652.241 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.923.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.822 24 17.321 24 12c0-6.627-5.374-12-12-12z" />
            </svg>
          </a>
        </div>
      </section>
      {/* Experience Section */}
      <section id="experience" className="mb-24">
        <div className="mb-4 text-center">
          <span
            className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${
              isDark
                ? "bg-blue-500/20 text-blue-400"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            Career Journey
          </span>
        </div>
        <h3
          className={`mb-12 text-4xl md:text-5xl font-bold text-center ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Professional Experience
        </h3>
        <div className="relative max-w-5xl mx-auto">
          <div
            className={`absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-0.5 ${
              isDark ? "bg-gray-700" : "bg-blue-200"
            }`}
          ></div>

          {/* Experience Item 1: Algo Soft Tech (Frontend Developer) */}
          <div className="relative mb-12 experience-item sm:ml-auto sm:w-[calc(50%-2rem)] pl-8 sm:pl-0 sm:pr-8">
            <div
              className={`absolute left-[7px] sm:left-auto sm:right-[-9px] top-6 w-4 h-4 rounded-full border-4 ${
                isDark
                  ? "bg-emerald-500 border-gray-900"
                  : "bg-emerald-600 border-gray-50"
              }`}
            ></div>
            <div
              className={`p-6 rounded-2xl shadow-lg border ${
                isDark
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white border-gray-200"
              }`}
            >
              <h4
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Frontend Developer
              </h4>
              <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Algo Soft Tech | Lahore, Pakistan
              </p>
              <p
                className={`mt-1 mb-3 text-sm ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                May 2025 - November 2025
              </p>
              <ul
                className={`space-y-2 list-disc list-inside ${
                  isDark ? "text-gray-400" : "text-gray-700"
                }`}
              >
                <li>
                  Developing and maintaining dynamic, high-performance frontend
                  interfaces using React.js and modern JavaScript (ES6+).
                </li>
                <li>
                  Designing and implementing responsive UI components that
                  deliver seamless user experiences across web and mobile
                  devices.
                </li>
                <li>
                  Integrating frontend applications with RESTful APIs, ensuring
                  efficient data flow, security, and reliability.
                </li>
                <li>
                  Conducting thorough UI testing and debugging to ensure optimal
                  performance, accessibility, and cross-browser compatibility.
                </li>
                <li>
                  Architecting scalable and maintainable component-based
                  frontends using modern state management libraries such as
                  Redux or Context API.
                </li>
              </ul>
            </div>
          </div>

          {/* Experience Item 2: Innvobyte (Frontend Developer) */}
          <div className="relative mb-12 experience-item sm:mr-auto sm:w-[calc(50%-2rem)] pl-8 sm:pl-8">
            <div
              className={`absolute left-[7px] sm:left-[-9px] top-6 w-4 h-4 rounded-full border-4 ${
                isDark
                  ? "bg-emerald-500 border-gray-900"
                  : "bg-emerald-600 border-gray-50"
              }`}
            ></div>
            <div
              className={`p-6 rounded-2xl shadow-lg border ${
                isDark
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white border-gray-200"
              }`}
            >
              <h4
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Frontend Developer
              </h4>
              <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Innvobyte | Lahore, Pakistan
              </p>
              <p
                className={`mt-1 mb-3 text-sm ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                February 2025 - April 2025
              </p>
              <ul
                className={`space-y-2 list-disc list-inside ${
                  isDark ? "text-gray-400" : "text-gray-700"
                }`}
              >
                <li>
                  Developed responsive and user-friendly interfaces using
                  React.js, HTML5, and CSS3.
                </li>
                <li>
                  Built interactive features and dynamic components using modern
                  JavaScript (ES6+) and React hooks.
                </li>
                <li>
                  Developed interactive prototypes for client feedback sessions
                  using HTML, CSS, JavaScript, and React.
                </li>
              </ul>
            </div>
          </div>

          {/* Experience Item 3: Zaions (Frontend Designer and Developer) */}
          <div className="relative mb-12 experience-item sm:ml-auto sm:w-[calc(50%-2rem)] pl-8 sm:pl-0 sm:pr-8">
            <div
              className={`absolute left-[7px] sm:left-auto sm:right-[-9px] top-6 w-4 h-4 rounded-full border-4 ${
                isDark
                  ? "bg-emerald-500 border-gray-900"
                  : "bg-emerald-600 border-gray-50"
              }`}
            ></div>
            <div
              className={`p-6 rounded-2xl shadow-lg border ${
                isDark
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white border-gray-200"
              }`}
            >
              <h4
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Frontend Designer and Developer
              </h4>
              <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Zaions | Lahore, Pakistan
              </p>
              <p
                className={`mt-1 mb-3 text-sm ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                April 2024 - December 2024
              </p>
              <ul
                className={`space-y-2 list-disc list-inside ${
                  isDark ? "text-gray-400" : "text-gray-700"
                }`}
              >
                <li>
                  Developed dynamic web interfaces using React.js, HTML5, and
                  CSS3 for responsive user experiences.
                </li>
                <li>
                  Built reusable React components and managed application state
                  using Hooks and Context API.
                </li>
                <li>
                  Integrated RESTful APIs and optimized component performance
                  for faster load times and scalability.
                </li>
              </ul>
            </div>
          </div>

          {/* Experience Item 4: Zaions (Web Developer Intern) - No change needed */}
          <div className="relative mb-12 experience-item sm:mr-auto sm:w-[calc(50%-2rem)] pl-8 sm:pl-8">
            <div
              className={`absolute left-[7px] sm:left-[-9px] top-6 w-4 h-4 rounded-full border-4 ${
                isDark
                  ? "bg-emerald-500 border-gray-900"
                  : "bg-emerald-600 border-gray-50"
              }`}
            ></div>
            <div
              className={`p-6 rounded-2xl shadow-lg border ${
                isDark
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white border-gray-200"
              }`}
            >
              <h4
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Web Developer Intern
              </h4>
              <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Zaions | Lahore, Pakistan
              </p>
              <p
                className={`mt-1 mb-3 text-sm ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                February 2024 - March 2024
              </p>
              <ul
                className={`space-y-2 list-disc list-inside ${
                  isDark ? "text-gray-400" : "text-gray-700"
                }`}
              >
                <li>
                  Developed user interfaces with modern JavaScript frameworks,
                  HTML5, and CSS3.
                </li>
                <li>Wrote custom HTML and JavaScript for existing websites.</li>
                <li>
                  Developed interactive prototypes using HTML, CSS, and
                  JavaScript for client presentations and feedback sessions.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Deployed Projects Section */}
      <DeployedProjects projects={projects} isDark={isDark} />
      {/* Projects Section */}
      <section id="projects" className="mb-24">
        <div className="mb-4 text-center">
          <span
            className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${
              isDark
                ? "bg-purple-500/20 text-purple-400"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            Portfolio
          </span>
        </div>
        <h3
          className={`mb-4 text-4xl md:text-5xl font-bold text-center ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Project Showcase
        </h3>
        <p
          className={`max-w-3xl mx-auto mb-12 text-center ${
            isDark ? "text-gray-400" : "text-gray-600"
          } text-lg px-4`}
        >
          A selection of my work demonstrating diverse technical skills and
          problem-solving approaches.
        </p>

        <div className="flex flex-wrap justify-center gap-2 px-4 mb-8">
          {allTechs.map((tech) => (
            <button
              key={tech}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                filter === tech
                  ? isDark
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50"
                    : "bg-blue-600 text-white shadow-lg"
                  : isDark
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                  : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
              }`}
              onClick={() => setFilter(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="grid max-w-6xl grid-cols-1 gap-6 px-4 mx-auto sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className={`group flex flex-col p-6 rounded-2xl transition-all duration-300 project-card border ${
                isDark
                  ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800 hover:border-purple-500/50"
                  : "bg-white border-gray-200 hover:border-purple-500 hover:shadow-xl"
              }`}
            >
              <div className="flex-grow">
                <div className="flex items-start justify-between mb-3">
                  <h4
                    className={`text-xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    } group-hover:text-purple-500 transition-colors`}
                  >
                    {project.title}
                  </h4>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full flex-shrink-0 ml-2 ${
                      isDark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {project.year}
                  </span>
                </div>
                <p
                  className={`mb-4 text-sm leading-relaxed ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {project.description}
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                        isDark
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : "bg-purple-50 text-purple-700 border border-purple-200"
                      }`}
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
                    className={`text-sm font-semibold flex items-center gap-1 ${
                      isDark
                        ? "text-purple-400 hover:text-purple-300"
                        : "text-purple-600 hover:text-purple-700"
                    }`}
                  >
                    View Live
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Skills Section */}
      <section id="skills" className="mb-24">
        <div className="mb-4 text-center">
          <span
            className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${
              isDark
                ? "bg-orange-500/20 text-orange-400"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            Expertise
          </span>
        </div>
        <h3
          className={`mb-4 text-4xl md:text-5xl font-bold text-center ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Tech ToolBox
        </h3>
        <p
          className={`max-w-3xl mx-auto mb-12 text-center ${
            isDark ? "text-gray-400" : "text-gray-600"
          } text-lg px-4`}
        >
          Comprehensive technical capabilities spanning modern frontend
          frameworks and robust backend systems.
        </p>
        <div
          className={`p-6 sm:p-8 rounded-2xl shadow-lg max-w-6xl mx-auto ${
            isDark ? "bg-gray-800/50" : "bg-white"
          }`}
        >
          <div className="relative w-full h-96 sm:h-[500px]">
            <canvas ref={chartRef} id="skillsChart"></canvas>
          </div>
        </div>
      </section>
      {/* Education Section */}
      <section id="education" className="mb-24">
        <div className="mb-4 text-center">
          <span
            className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${
              isDark
                ? "bg-indigo-500/20 text-indigo-400"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            Academic Background
          </span>
        </div>
        <h3
          className={`mb-12 text-4xl md:text-5xl font-bold text-center ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Education
        </h3>
        <div
          className={`max-w-3xl p-8 mx-auto rounded-2xl shadow-lg border ${
            isDark
              ? "bg-gray-800/50 border-gray-700/50"
              : "bg-white border-gray-200"
          }`}
        >
          <h4
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Bachelor of Science, Software Engineering
          </h4>
          <p
            className={`mt-2 ${isDark ? "text-emerald-400" : "text-blue-700"}`}
          >
            Minhaj University Lahore | Lahore, Pakistan
          </p>
          <p
            className={`mt-2 text-sm ${
              isDark ? "text-gray-500" : "text-gray-500"
            }`}
          >
            2021 - 2025
          </p>
          <p
            className={`mt-3 text-lg font-semibold ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            CGPA: 3.67
          </p>
        </div>
      </section>
      {/* Certifications & Courses Section */}
      <section id="certifications" className="mb-24">
        <div className="mb-4 text-center">
          <span
            className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${
              isDark
                ? "bg-pink-500/20 text-pink-400"
                : "bg-pink-100 text-pink-700"
            }`}
          >
            Learning Path
          </span>
        </div>
        <h3
          className={`mb-12 text-4xl md:text-5xl font-bold text-center ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Certifications & Courses
        </h3>
        <div
          className={`max-w-5xl p-8 mx-auto rounded-2xl shadow-lg border ${
            isDark
              ? "bg-gray-800/50 border-gray-700/50"
              : "bg-white border-gray-200"
          }`}
        >
          <ul
            className={`space-y-3 list-disc list-inside ${
              isDark ? "text-gray-400" : "text-gray-700"
            }`}
          >
            <li>
              <span className="font-semibold">
                The Complete JavaScript Course 2025: From Zero to Expert!
              </span>{" "}
              - Udemy
            </li>
            <li>
              <span className="font-semibold">
                Advanced CSS and Sass: Flexbox, Grid, Animations and More!
              </span>{" "}
              - Udemy
            </li>
            <li>
              <span className="font-semibold">
                Tailwind CSS From Scratch Learn by Building Projects
              </span>{" "}
              - Udemy
            </li>
            <li>
              <span className="font-semibold">
                PHP for Beginners Become a PHP Master CMS Project
              </span>{" "}
              - Udemy
            </li>
            <li>
              <span className="font-semibold">
                Build Responsive Real-World Websites with HTML and CSS
              </span>{" "}
              - Udemy
            </li>
            <li>
              <span className="font-semibold">Fundamental Programming</span> -
              KICKS UET, Lahore
            </li>
            <li>
              <span className="font-semibold">
                Legacy JavaScript Algorithm & Data Structures
              </span>{" "}
              - Free Code Camp (Certificate)
            </li>
            <li>
              <span className="font-semibold">Laravel MVC architecture</span> -
              YouTube channel code-step-by-step (Self-Learning)
            </li>
            <li>
              <span className="font-semibold">
                Creating WordPress Plugins The Right Way
              </span>{" "}
              - Marcelo Xavier Vieira (Udemy)
            </li>
            <li>
              <span className="font-semibold">
                Complete WordPress Theme & Plugin Development Course
              </span>{" "}
              - Zac Gordon (Udemy)
            </li>
          </ul>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="mb-24">
        <div className="mb-4 text-center">
          <span
            className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${
              isDark
                ? "bg-cyan-500/20 text-cyan-400"
                : "bg-cyan-100 text-cyan-700"
            }`}
          >
            Let's Connect
          </span>
        </div>
        <h3
          className={`mb-12 text-4xl md:text-5xl font-bold text-center ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Get In Touch
        </h3>
        <div
          className={`max-w-2xl p-8 mx-auto text-center rounded-2xl shadow-lg border ${
            isDark
              ? "bg-gray-800/50 border-gray-700/50"
              : "bg-white border-gray-200"
          }`}
        >
          <p
            className={`mb-8 text-lg ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Ready to discuss a project or opportunity?
          </p>
          <div className="space-y-6">
            <p
              className={`flex items-center justify-center space-x-3 text-lg font-semibold ${
                isDark ? "text-gray-200" : "text-gray-900"
              }`}
            >
              <svg
                className={`w-6 h-6 ${
                  isDark ? "text-emerald-400" : "text-blue-600"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href="mailto:iam.fayyazali@gmail.com"
                className={`${
                  isDark
                    ? "text-emerald-400 hover:text-emerald-300"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                iam.fayyazali@gmail.com
              </a>
            </p>
            <p
              className={`flex items-center justify-center space-x-3 text-lg font-semibold ${
                isDark ? "text-gray-200" : "text-gray-900"
              }`}
            >
              <svg
                className={`w-6 h-6 ${
                  isDark ? "text-emerald-400" : "text-blue-600"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a
                href="tel:+923216886133"
                className={`${
                  isDark
                    ? "text-gray-200 hover:text-emerald-400"
                    : "text-gray-900 hover:text-blue-800"
                }`}
              >
                +92 3216886133
              </a>
            </p>
            <p
              className={`flex items-center justify-center space-x-3 text-lg font-semibold ${
                isDark ? "text-gray-200" : "text-gray-900"
              }`}
            >
              <svg
                className={`w-6 h-6 ${
                  isDark ? "text-emerald-400" : "text-blue-600"
                }`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <a
                href="https://www.linkedin.com/in/fayyaz-ali-dev"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDark
                    ? "text-emerald-400 hover:text-emerald-300"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                LinkedIn Profile
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

// ResumeDownloadPage Component
const ResumeDownloadPage = ({ onBackToHome, isDark }) => {
  const handleDownload = () => {
    const resumeUrl = "/Fayyaz Ali-engineer.pdf";
    window.open(resumeUrl, "_blank");
  };

  return (
    <div
      className={`container flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-12 mx-auto ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <h3
        className={`mb-8 text-3xl sm:text-4xl font-bold text-center ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Resume Preview
      </h3>
      <div
        className={`p-6 rounded-2xl shadow-lg max-w-4xl w-full h-[70vh] sm:h-[80vh] flex items-center justify-center mb-8 ${
          isDark ? "bg-gray-800/50" : "bg-white"
        }`}
      >
        <iframe
          src="/Engg.Fayyaz Ali-Associate-Frontend.pdf"
          title="Fayyaz Ali Resume"
          className="w-full h-full border-none rounded-lg"
          style={{ minHeight: "400px" }}
        >
          This browser does not support PDFs. Please download the PDF to view
          it:
          <a href="/Fayyaz Ali-engineer.pdf" download>
            Download PDF
          </a>
        </iframe>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={handleDownload}
          className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 ${
            isDark
              ? "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-emerald-500/50"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Download PDF
        </button>
        <button
          onClick={onBackToHome}
          className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 ${
            isDark
              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
        >
          Back to CV
        </button>
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [isDark, setIsDark] = useState(false);

  const [projects] = useState(
    [
      {
        title: "Admin Portal (Max Auto Care)",
        year: 2025,
        description:
          "A Laravel application using MVC architecture for handling the max auto care database (order, product, and another basic setup).",
        technologies: [
          "MVC architecture",
          "Laravel",
          "PHP",
          "MySQL",
          "XAMPP Server",
        ],
        liveUrl: "https://adminportal.maxautocare.com.pk/",
        gitUrl: null,
        type: "Deployed",
      },
      {
        title: "Max Auto Care - E-commerce",
        year: 2025,
        description:
          "A Full Stack E-commerce website for selling filters and vehicle body parts. Developed during work at Algo Soft Tech.",
        technologies: ["React", "Tailwind", "Laravel", "MySQL"],
        liveUrl: "https://maxautocare.com.pk/",
        gitUrl: null,
        type: "Deployed",
      },
      {
        title: "Saraye - E-commerce",
        year: 2025,
        description:
          "A Full Stack E-commerce website for selling clothes. Developed during work at Algo Soft Tech.",
        technologies: ["React", "Tailwind", "Laravel", "MySQL"],
        liveUrl: "https://saraye-app-obpp.vercel.app/",
        gitUrl: null,
        type: "Deployed",
      },
      {
        title: "Skill Sharing App (FYP)",
        year: 2025,
        description:
          "My Final Year Project: a full-stack web app connecting users to share and learn skills.",
        technologies: [
          "React",
          "Firebase Auth",
          "Firestore",
          "Firebase Storage",
          "Vercel",
        ],
        liveUrl: "https://skill-sharing-app.vercel.app/",
        gitUrl: null,
        type: "Deployed",
      },
      {
        title: "Forecast App",
        year: 2025,
        description:
          "A web application to check real-time weather forecasts using the OpenWeatherMap API.",
        technologies: ["React", "Axios", "JavaScript", "Vercel", "HTML", "CSS"],
        liveUrl: "https://weather-app-self-three-67.vercel.app/",
        gitUrl: "https://github.com/fayyaz48097/WeatherApp.git",
        type: "Deployed",
      },
      {
        title: "Feed Bear Clone",
        year: 2023,
        description:
          "A fully responsive recommendation web page showcasing modern web design principles.",
        technologies: [
          "HTML",
          "CSS",
          "Responsive Design",
          "CSS Grid",
          "Flexbox",
        ],
        liveUrl: "https://feedbear-by-fayyaz.netlify.app/",
        gitUrl: null,
        type: "Deployed",
      },
      {
        title: "Chat System",
        year: 2024,
        description: "This project is a real-time chat application.",
        technologies: [
          "React",
          "Firebase Realtime Database",
          "Axios",
          "Tailwind",
        ],
        liveUrl: "https://chat-system-nu.vercel.app/",
        gitUrl: "https://github.com/fayyaz48097/Chat-System",
        type: "Deployed",
      },
      {
        title: "Omnifood Restaurant Landing Page",
        year: 2024,
        description:
          "A comprehensive, fully responsive restaurant landing page showcasing modern web design principles.",
        technologies: [
          "HTML",
          "CSS",
          "Responsive Design",
          "CSS Grid",
          "Flexbox",
        ],
        liveUrl: "https://omnifood-by-fayyaz.netlify.app/",
        gitUrl: null,
        type: "Deployed",
      },
      {
        title: "Student Attendance System Mobile application",
        year: 2024,
        description:
          "Developing a Student attendance management system using Flutter and Firebase (Backend).",
        technologies: ["Flutter", "Firebase (Backend)", "User Authentication"],
        type: "University",
      },
      {
        title: "Crockery Management System using C#",
        year: 2024,
        description:
          "Developed a desktop application using C# (Window form) with MySQL as the backend database system.",
        technologies: ["C#", "MySQL", "DBMS", "Window form"],
        type: "University",
      },
      {
        title: "CV-Builder - Web base",
        year: 2024,
        description:
          "Developed a CV builder clone using HTML, CSS & JavaScript.",
        technologies: ["HTML", "CSS", "JavaScript", "Local Storage"],
        type: "University",
      },
      {
        title: "Online Crockery Store (Design) using SDA",
        year: 2023,
        description:
          "Designed the architecture of an online store using UML diagrams.",
        technologies: ["Draw.io", "Visual Paradigm", "UML Diagrams"],
        type: "University",
      },
      {
        title: "Cafe Management System using C++",
        year: 2022,
        description:
          "Developed a Cafe product management and order taker system.",
        technologies: ["C++", "OOP"],
        type: "University",
      },
      {
        title: "Omni food, Hotel, Profile Template",
        year: 2024,
        description:
          "Developed landing pages using HTML & CSS, marking the start of a web developer journey.",
        technologies: ["HTML", "CSS"],
        type: "Work",
      },
      {
        title: "Online Crockery Store - Web Store",
        year: 2023,
        description: "Built a web-based online store for a crockery business.",
        technologies: ["PHP", "MySQL"],
        link: "https://onlinecrockerystore.com/",
        type: "Work",
      },
      {
        title: "CMS App using PHP",
        year: 2023,
        description:
          "A comprehensive Content Management System for managing blog posts with user authentication.",
        technologies: ["PHP", "MySQL", "XAMPP"],
        type: "Work",
      },
      {
        title: "Elementor Tab Development",
        year: 2023,
        description: "Developed custom Elementor tabs for WordPress.",
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
        description: "Built a cognera theme using Elementor.",
        technologies: ["WordPress", "Elementor"],
        type: "Work",
      },
      {
        title: "CV-Builder using SASS",
        year: 2023,
        description: "Developed a clone of a CV builder app using SASS.",
        technologies: ["SASS", "HTML", "CSS"],
        type: "Work",
      },
      {
        title: "Natours using SASS",
        year: 2023,
        description:
          "Developed a single-page application clone with advanced animations.",
        technologies: ["SASS", "HTML", "CSS"],
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
        description: "Developed an efficient to-do list app.",
        technologies: ["JavaScript"],
        type: "Work",
      },
    ].sort((a, b) => b.year - a.year)
  );

  const [filter, setFilter] = useState("All");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const profilePicRef = useRef(null);

  const allTechs = ["All", ...new Set(projects.flatMap((p) => p.technologies))];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.technologies.includes(filter));

  const goToDownloadPage = () => {
    setCurrentPage("download");
    setIsMobileMenuOpen(false);
  };

  const goToHomePage = () => {
    setCurrentPage("home");
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div
      className={`antialiased ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      {/* Header & Navigation */}
      <header
        className={`sticky top-0 z-50 shadow-lg ${
          isDark
            ? "bg-gray-800/95 backdrop-blur-md"
            : "bg-white/95 backdrop-blur-md"
        } transition-colors duration-300`}
      >
        <nav className="container flex items-center justify-between px-4 py-4 mx-auto sm:px-6">
          <a
            href="#"
            className={`text-xl sm:text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            onClick={goToHomePage}
          >
            Fayyaz Ali
          </a>
          <div className="items-center hidden space-x-6 lg:flex">
            <a
              href="#about"
              className={`text-sm border-b-2 border-transparent nav-link transition-all duration-300 ${
                isDark
                  ? "text-gray-300 hover:text-emerald-400 hover:border-emerald-400"
                  : "text-gray-700 hover:text-blue-700 hover:border-blue-700"
              }`}
              onClick={goToHomePage}
            >
              About
            </a>
            <a
              href="#experience"
              className={`text-sm border-b-2 border-transparent nav-link transition-all duration-300 ${
                isDark
                  ? "text-gray-300 hover:text-emerald-400 hover:border-emerald-400"
                  : "text-gray-700 hover:text-blue-700 hover:border-blue-700"
              }`}
              onClick={goToHomePage}
            >
              Experience
            </a>
            <a
              href="#deployed-projects"
              className={`text-sm border-b-2 border-transparent nav-link transition-all duration-300 ${
                isDark
                  ? "text-gray-300 hover:text-emerald-400 hover:border-emerald-400"
                  : "text-gray-700 hover:text-blue-700 hover:border-blue-700"
              }`}
              onClick={goToHomePage}
            >
              Live Projects
            </a>
            <a
              href="#projects"
              className={`text-sm border-b-2 border-transparent nav-link transition-all duration-300 ${
                isDark
                  ? "text-gray-300 hover:text-emerald-400 hover:border-emerald-400"
                  : "text-gray-700 hover:text-blue-700 hover:border-blue-700"
              }`}
              onClick={goToHomePage}
            >
              Projects
            </a>
            <a
              href="#skills"
              className={`text-sm border-b-2 border-transparent nav-link transition-all duration-300 ${
                isDark
                  ? "text-gray-300 hover:text-emerald-400 hover:border-emerald-400"
                  : "text-gray-700 hover:text-blue-700 hover:border-blue-700"
              }`}
              onClick={goToHomePage}
            >
              Skills
            </a>
            <a
              href="#education"
              className={`text-sm border-b-2 border-transparent nav-link transition-all duration-300 ${
                isDark
                  ? "text-gray-300 hover:text-emerald-400 hover:border-emerald-400"
                  : "text-gray-700 hover:text-blue-700 hover:border-blue-700"
              }`}
              onClick={goToHomePage}
            >
              Education
            </a>
            <a
              href="#certifications"
              className={`text-sm border-b-2 border-transparent nav-link transition-all duration-300 ${
                isDark
                  ? "text-gray-300 hover:text-emerald-400 hover:border-emerald-400"
                  : "text-gray-700 hover:text-blue-700 hover:border-blue-700"
              }`}
              onClick={goToHomePage}
            >
              Certifications
            </a>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <button
              onClick={goToDownloadPage}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                isDark
                  ? "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/50"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              Download Resume
            </button>
          </div>
          <a
            href="#contact"
            className={`hidden lg:block px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              isDark
                ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/50"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Contact Me
          </a>
          <button
            className={`lg:hidden focus:outline-none ${
              isDark ? "text-white" : "text-gray-800"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:hidden px-4 sm:px-6 pt-2 pb-4 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <a
            href="#about"
            className={`block py-2 transition-colors ${
              isDark
                ? "text-gray-300 hover:text-emerald-400"
                : "text-gray-700 hover:text-blue-700"
            }`}
            onClick={() => {
              goToHomePage();
              setIsMobileMenuOpen(false);
            }}
          >
            About
          </a>
          <a
            href="#experience"
            className={`block py-2 transition-colors ${
              isDark
                ? "text-gray-300 hover:text-emerald-400"
                : "text-gray-700 hover:text-blue-700"
            }`}
            onClick={() => {
              goToHomePage();
              setIsMobileMenuOpen(false);
            }}
          >
            Experience
          </a>
          <a
            href="#deployed-projects"
            className={`block py-2 transition-colors ${
              isDark
                ? "text-gray-300 hover:text-emerald-400"
                : "text-gray-700 hover:text-blue-700"
            }`}
            onClick={() => {
              goToHomePage();
              setIsMobileMenuOpen(false);
            }}
          >
            Live Projects
          </a>
          <a
            href="#projects"
            className={`block py-2 transition-colors ${
              isDark
                ? "text-gray-300 hover:text-emerald-400"
                : "text-gray-700 hover:text-blue-700"
            }`}
            onClick={() => {
              goToHomePage();
              setIsMobileMenuOpen(false);
            }}
          >
            Projects
          </a>
          <a
            href="#skills"
            className={`block py-2 transition-colors ${
              isDark
                ? "text-gray-300 hover:text-emerald-400"
                : "text-gray-700 hover:text-blue-700"
            }`}
            onClick={() => {
              goToHomePage();
              setIsMobileMenuOpen(false);
            }}
          >
            Skills
          </a>
          <a
            href="#education"
            className={`block py-2 transition-colors ${
              isDark
                ? "text-gray-300 hover:text-emerald-400"
                : "text-gray-700 hover:text-blue-700"
            }`}
            onClick={() => {
              goToHomePage();
              setIsMobileMenuOpen(false);
            }}
          >
            Education
          </a>
          <a
            href="#certifications"
            className={`block py-2 transition-colors ${
              isDark
                ? "text-gray-300 hover:text-emerald-400"
                : "text-gray-700 hover:text-blue-700"
            }`}
            onClick={() => {
              goToHomePage();
              setIsMobileMenuOpen(false);
            }}
          >
            Certifications
          </a>
          <button
            onClick={toggleDarkMode}
            className={`block w-full text-left py-2 transition-colors ${
              isDark
                ? "text-gray-300 hover:text-emerald-400"
                : "text-gray-700 hover:text-blue-700"
            }`}
          >
            {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button
            onClick={goToDownloadPage}
            className={`block w-full px-4 py-2 mt-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              isDark
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Download Resume
          </button>
          <a
            href="#contact"
            className={`block px-4 py-2 mt-2 text-center text-sm font-semibold rounded-lg transition-all duration-300 ${
              isDark
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Contact Me
          </a>
        </div>
      </header>

      {/* Conditional Rendering of Pages */}
      {currentPage === "home" ? (
        <HomeView
          projects={projects}
          filter={filter}
          setFilter={setFilter}
          allTechs={allTechs}
          filteredProjects={filteredProjects}
          chartRef={chartRef}
          chartInstance={chartInstance}
          profilePicRef={profilePicRef}
          isDark={isDark}
        />
      ) : (
        <ResumeDownloadPage onBackToHome={goToHomePage} isDark={isDark} />
      )}
      <FloatingActionButtons isDark={isDark} />
      <footer
        className={`py-8 ${
          isDark ? "bg-gray-800 text-gray-300" : "bg-gray-900 text-white"
        } transition-colors duration-300`}
      >
        <div className="container px-4 mx-auto text-center sm:px-6">
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
