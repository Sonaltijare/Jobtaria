const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.title = `Switch to ${isDark ? "light" : "dark"} mode`;
  }
  if (themeColor) {
    themeColor.content = isDark ? "#0e1a29" : "#f4f8ff";
  }
  localStorage.setItem("jobtaria-theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("jobtaria-theme");
if (savedTheme === "dark") {
  document.documentElement.dataset.theme = "dark";
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", "true");
    themeToggle.title = "Switch to light mode";
  }
  if (themeColor) {
    themeColor.content = "#0e1a29";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
}

if (document.querySelector("#tracker-applications")) {
  const storageKey = "jobtaria-applications";
  const demoApplicationIds = new Set([
    "example-frontend",
    "example-analyst",
    "example-qa",
    "example-designer"
  ]);
  let applications = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (!Array.isArray(applications)) {
    applications = [];
  } else if (applications.some((application) => demoApplicationIds.has(application.id))) {
    applications = applications.filter((application) => !demoApplicationIds.has(application.id));
    localStorage.setItem(storageKey, JSON.stringify(applications));
  }

  const count = document.querySelector("#tracker-count");
  const summary = document.querySelector("#tracker-summary");
  const rows = document.querySelector("#tracker-applications");
  const emptyState = document.querySelector("#tracker-empty");
  const progress = document.querySelector("#tracker-progress");
  count.textContent = applications.length;
  summary.textContent = applications.length
    ? `${applications.length} ${applications.length === 1 ? "opportunity" : "opportunities"} in your tracker`
    : "Your job search, at a glance";
  emptyState.hidden = applications.length > 0;
  progress.hidden = applications.length === 0;

  applications.slice(0, 3).forEach((application, index) => {
    const row = document.createElement("div");
    row.className = "tracker-row";
    const avatar = document.createElement("span");
    avatar.className = `company-avatar ${["avatar-blue", "avatar-green", "avatar-orange"][index]}`;
    avatar.textContent = application.company ? application.company.charAt(0).toUpperCase() : "?";
    const job = document.createElement("span");
    job.className = "tracker-job";
    const title = document.createElement("strong");
    title.textContent = application.title;
    const company = document.createElement("small");
    company.textContent = application.company;
    job.append(title, company);
    const badge = document.createElement("span");
    badge.className = `badge badge-${application.status.toLowerCase()}`;
    badge.textContent = application.status;
    row.append(avatar, job, badge);
    rows.append(row);
  });
}

if (document.body.classList.contains("job-details-page")) {
  const jobs = {
    "frontend-developer": {
      title: "Frontend Developer", company: "Acme Labs", location: "Pune", type: "Full-time", experience: "Fresher", salary: "₹6 LPA",
      about: "Build responsive interfaces for products people love and help make everyday tasks feel simple.",
      responsibilities: ["Build accessible, responsive product interfaces.", "Work with designers and backend developers to ship features.", "Test and improve performance across browsers."],
      requirements: ["Comfortable with HTML, CSS, and JavaScript.", "Familiarity with React and responsive design.", "A willingness to learn and collaborate."]
    },
    "ui-ux-designer": {
      title: "UI/UX Designer", company: "Northwind Labs", location: "Mumbai", type: "Full-time", experience: "1–3 years", salary: "₹9 LPA",
      about: "Design clean, user-friendly product experiences that help people get things done with confidence.",
      responsibilities: ["Create user flows, wireframes, and polished interface designs.", "Partner with product and engineering through delivery.", "Use research and feedback to refine experiences."],
      requirements: ["1–3 years of product or UI/UX design experience.", "Strong Figma skills and a portfolio of shipped work.", "A good understanding of usability and accessibility."]
    },
    "backend-developer": {
      title: "Backend Developer", company: "Kitebox", location: "Bengaluru", type: "Full-time", experience: "3–5 years", salary: "₹18 LPA",
      about: "Build and scale the services behind our platform. You will work with a friendly team and grow your skills every week.",
      responsibilities: ["Use Node.js to deliver quality work on time.", "Use SQL to deliver quality work on time.", "Use APIs to deliver quality work on time.", "Share regular progress updates with your team."],
      requirements: ["Experience level: 3–5 years.", "Working knowledge of Node.js.", "Working knowledge of SQL.", "Working knowledge of APIs."]
    },
    "customer-success-associate": {
      title: "Customer Success Associate", company: "Helpdesk Pro", location: "Pune", type: "Full-time", experience: "1–3 years", salary: "₹7 LPA",
      about: "Help customers get the most from our software with thoughtful, timely support.",
      responsibilities: ["Respond to customer questions across support channels.", "Investigate issues and coordinate solutions with internal teams.", "Keep clear records and share recurring customer feedback."],
      requirements: ["Strong written and verbal communication.", "A customer-first approach and attention to detail.", "Experience with support tools or CRM software is a plus."]
    },
    "content-writer": {
      title: "Content Writer", company: "Wordcraft", location: "Remote", type: "Part-time", experience: "Fresher", salary: "₹3 LPA",
      about: "Write helpful blogs and website copy for technology clients and their audiences.",
      responsibilities: ["Research and write clear, engaging content.", "Edit drafts for accuracy, tone, and readability.", "Apply SEO best practices and meet agreed deadlines."],
      requirements: ["Strong writing and editing skills.", "Interest in technology and digital content.", "Familiarity with SEO is an advantage."]
    },
    "mobile-app-developer": {
      title: "Mobile App Developer", company: "Appify", location: "Bengaluru", type: "Full-time", experience: "3–5 years", salary: "₹22 LPA",
      about: "Ship polished Android and iOS apps that make everyday experiences easier for customers.",
      responsibilities: ["Build and maintain mobile features with Flutter.", "Integrate Firebase services and APIs.", "Test releases and work with product and design teams."],
      requirements: ["3–5 years of mobile application development.", "Hands-on Flutter and Firebase experience.", "Understanding of API integration and app release workflows."]
    },
    "hr-executive": {
      title: "HR Executive", company: "PeopleFirst", location: "Delhi", type: "Full-time", experience: "Fresher", salary: "₹4 LPA",
      about: "Support a welcoming candidate and employee experience as our team grows.",
      responsibilities: ["Coordinate interviews and candidate communication.", "Support onboarding and maintain employee records.", "Assist with recruitment reporting and HR operations."],
      requirements: ["Strong organization and communication skills.", "Comfortable with spreadsheets and basic office tools.", "An interest in recruitment and people operations."]
    },
    "python-developer": {
      title: "Python Developer", company: "Datanest", location: "Remote", type: "Full-time", experience: "3–5 years", salary: "₹18 LPA",
      about: "Develop data-driven features and internal tools for teams working with useful insights.",
      responsibilities: ["Build and maintain services using Python.", "Work with data stores and integrate APIs.", "Write reliable tests and contribute to code reviews."],
      requirements: ["3–5 years of Python development experience.", "Good understanding of backend fundamentals and SQL.", "Experience building or consuming APIs."]
    },
    "qa-engineer": {
      title: "QA Engineer", company: "Testwise", location: "Chennai", type: "Full-time", experience: "1–3 years", salary: "₹8 LPA",
      about: "Keep our releases fast, reliable, and bug-free by building confidence in every change.",
      responsibilities: ["Plan and run manual and automated tests.", "Report issues clearly and work with developers on fixes.", "Improve regression coverage for product releases."],
      requirements: ["1–3 years in quality assurance or software testing.", "Knowledge of test planning and bug tracking.", "Familiarity with test automation is a plus."]
    },
    "product-designer": {
      title: "Product Designer", company: "Brightside", location: "Mumbai", type: "Full-time", experience: "1–3 years", salary: "₹12 LPA",
      about: "Turn complex workflows into delightful experiences that feel simple and intuitive.",
      responsibilities: ["Design product flows, prototypes, and interface details.", "Collaborate with product managers and engineers.", "Use feedback and research to improve existing features."],
      requirements: ["1–3 years of product design experience.", "Strong Figma skills and a portfolio.", "Knowledge of interaction design and usability."]
    },
    "data-analyst": {
      title: "Data Analyst", company: "Northwind Labs", location: "Pune", type: "Full-time", experience: "Fresher", salary: "₹6 LPA",
      about: "Find useful patterns in data and share clear insights that help teams make better decisions.",
      responsibilities: ["Query, clean, and analyze business data.", "Build reports and communicate findings to stakeholders.", "Help maintain accurate and consistent data."],
      requirements: ["Working knowledge of SQL and Excel.", "Strong attention to detail and analytical thinking.", "Clear written and verbal communication."]
    }
  };
  const jobKey = new URLSearchParams(window.location.search).get("job");
  const job = jobKey && Object.prototype.hasOwnProperty.call(jobs, jobKey) ? jobs[jobKey] : null;
  const detail = document.querySelector("#job-detail");
  const notFound = document.querySelector("#detail-not-found");

  if (!job) {
    detail.hidden = true;
    notFound.hidden = false;
    document.title = "Job not found — Jobtaria";
  } else {
    document.title = `${job.title} — Jobtaria`;
    document.querySelector("#detail-title").textContent = job.title;
    document.querySelector("#detail-company").textContent = job.company;
    document.querySelector("#detail-location").textContent = `${job.company}, ${job.location}`;
    document.querySelector("#detail-about").textContent = job.about;
    document.querySelector("#overview-location").textContent = job.location;
    document.querySelector("#overview-type").textContent = job.type;
    document.querySelector("#overview-experience").textContent = job.experience;
    document.querySelector("#overview-salary").textContent = job.salary;
    document.querySelector("#detail-responsibilities").replaceChildren(
      ...job.responsibilities.map((item) => Object.assign(document.createElement("li"), { textContent: item }))
    );
    document.querySelector("#detail-requirements").replaceChildren(
      ...job.requirements.map((item) => Object.assign(document.createElement("li"), { textContent: item }))
    );

    const savedJobTitles = new Set(JSON.parse(localStorage.getItem("jobtaria-saved-jobs") || "[]"));
    const saveButton = document.querySelector("#detail-save");
    const applyLink = document.querySelector("#detail-apply");
    const updateSaveButton = () => {
      const isSaved = savedJobTitles.has(job.title);
      saveButton.textContent = isSaved ? "Saved (remove)" : "Save job";
      saveButton.setAttribute("aria-pressed", String(isSaved));
    };
    applyLink.href = `Apply.html?job=${encodeURIComponent(jobKey)}&role=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}`;
    updateSaveButton();
    saveButton.addEventListener("click", () => {
      if (savedJobTitles.has(job.title)) savedJobTitles.delete(job.title);
      else savedJobTitles.add(job.title);
      localStorage.setItem("jobtaria-saved-jobs", JSON.stringify([...savedJobTitles]));
      updateSaveButton();
    });
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    mainNav.classList.toggle("is-open", isOpen);
  });
}

if (document.body.classList.contains("apply-page")) {
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role");
  const company = params.get("company");
  const heading = document.querySelector("#application-heading");

  if (role && company) {
    heading.textContent = `Apply for ${role} at ${company}`;
    document.title = `Apply for ${role} — Jobtaria`;
  } else {
    heading.textContent = "Apply for a job";
  }

  const applicationForm = document.querySelector("#application-form");
  const resumeInput = document.querySelector("#applicant-resume");
  const formMessage = document.querySelector("#application-message");

  resumeInput.addEventListener("change", () => {
    const resume = resumeInput.files[0];
    if (resume && !/\.(pdf|docx?)$/i.test(resume.name)) {
      resumeInput.setCustomValidity("Please choose a PDF or Word document.");
      resumeInput.reportValidity();
      resumeInput.value = "";
    } else if (resume && resume.size > 2 * 1024 * 1024) {
      resumeInput.setCustomValidity("Please choose a file smaller than 2 MB.");
      resumeInput.reportValidity();
      resumeInput.value = "";
    } else {
      resumeInput.setCustomValidity("");
    }
  });

  applicationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const applications = JSON.parse(localStorage.getItem("jobtaria-applications") || "[]");
    const resume = resumeInput.files[0];
    applications.unshift({
      id: `${Date.now()}`,
      title: role || "New application",
      company: company || "Company not specified",
      date: new Date().toISOString().slice(0, 10),
      resume: resume ? resume.name : "",
      status: "Applied"
    });
    localStorage.setItem("jobtaria-applications", JSON.stringify(applications));
    formMessage.textContent = "Application saved. You can track its status on My applications.";
    applicationForm.reset();
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    mainNav.classList.toggle("is-open", isOpen);
  });
}

if (document.body.classList.contains("applications-page")) {
  const storageKey = "jobtaria-applications";
  const demoApplicationIds = new Set([
    "example-frontend",
    "example-analyst",
    "example-qa",
    "example-designer"
  ]);
  let applications = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (!Array.isArray(applications)) {
    applications = [];
  } else if (applications.some((application) => demoApplicationIds.has(application.id))) {
    applications = applications.filter((application) => !demoApplicationIds.has(application.id));
    localStorage.setItem(storageKey, JSON.stringify(applications));
  }

  const list = document.querySelector("#application-list");
  const emptyState = document.querySelector("#applications-empty");
  const tabs = [...document.querySelectorAll("[data-application-filter]")];
  let activeFilter = "all";

  function renderApplications() {
    const counts = {
      all: applications.length,
      Applied: applications.filter((application) => application.status === "Applied").length,
      Shortlisted: applications.filter((application) => application.status === "Shortlisted").length,
      Rejected: applications.filter((application) => application.status === "Rejected").length
    };

    Object.entries(counts).forEach(([status, count]) => {
      document.querySelector(`[data-count="${status}"]`).textContent = count;
    });

    const visibleApplications = activeFilter === "all"
      ? applications
      : applications.filter((application) => application.status === activeFilter);

    list.replaceChildren();
    visibleApplications.forEach((application) => {
      const card = document.createElement("article");
      card.className = "application-entry";

      const main = document.createElement("div");
      main.className = "application-entry-main";
      const title = document.createElement("h2");
      title.textContent = application.title;
      const meta = document.createElement("p");
      meta.className = "application-entry-meta";
      meta.textContent = `${application.company} · applied on ${new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(`${application.date}T00:00:00`))}`;
      const resume = document.createElement("p");
      resume.className = "application-entry-resume";
      resume.textContent = application.resume ? `Resume: ${application.resume}` : "Resume: Not provided";
      main.append(title, meta, resume);

      const actions = document.createElement("div");
      actions.className = "application-entry-actions";
      const badge = document.createElement("span");
      badge.className = `application-status application-status-${application.status.toLowerCase()}`;
      badge.textContent = application.status;
      badge.setAttribute("aria-label", `Status: ${application.status}`);
      const updateLabel = document.createElement("label");
      updateLabel.className = "application-update";
      updateLabel.append(document.createTextNode("Update status"));
      const statusSelect = document.createElement("select");
      statusSelect.setAttribute("aria-label", `Update status for ${application.title} at ${application.company}`);
      ["Applied", "Shortlisted", "Rejected"].forEach((status) => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        statusSelect.append(option);
      });
      statusSelect.value = application.status;
      statusSelect.addEventListener("change", () => {
        application.status = statusSelect.value;
        localStorage.setItem(storageKey, JSON.stringify(applications));
        renderApplications();
      });
      updateLabel.append(statusSelect);

      const removeButton = document.createElement("button");
      removeButton.className = "application-remove";
      removeButton.type = "button";
      removeButton.textContent = "Remove";
      removeButton.setAttribute("aria-label", `Remove ${application.title} at ${application.company}`);
      removeButton.addEventListener("click", () => {
        applications = applications.filter((item) => item.id !== application.id);
        localStorage.setItem(storageKey, JSON.stringify(applications));
        renderApplications();
      });

      actions.append(badge, updateLabel, removeButton);
      card.append(main, actions);
      list.append(card);
    });

    emptyState.hidden = visibleApplications.length > 0;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeFilter = tab.dataset.applicationFilter;
      tabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      renderApplications();
    });
  });

  renderApplications();

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    mainNav.classList.toggle("is-open", isOpen);
  });
}

if (document.body.classList.contains("saved-jobs-page")) {
  const savedJobsKey = "jobtaria-saved-jobs";
  const jobs = [
    { title: "Frontend Developer", company: "Acme Labs", location: "Pune", description: "Build responsive interfaces for our hiring products.", type: "Full-time", experience: "Fresher", salary: "₹6 LPA", skills: ["HTML", "CSS", "JavaScript"], details: "frontend-developer" },
    { title: "Backend Developer", company: "Kitebox", location: "Bengaluru", description: "Build and scale the services behind our platform.", type: "Full-time", experience: "3–5 years", salary: "₹18 LPA", skills: ["Node.js", "SQL", "APIs"], details: "backend-developer" },
    { title: "Python Developer", company: "Datanest", location: "Remote", description: "Develop data-driven features and internal tools.", type: "Contract", experience: "3–5 years", salary: "₹18 LPA", skills: ["Python", "Django", "REST"], details: "python-developer" },
    { title: "Mobile App Developer", company: "Appify", location: "Bengaluru", description: "Ship polished Android and iOS apps.", type: "Full-time", experience: "3–5 years", salary: "₹22 LPA", skills: ["Flutter", "Firebase", "APIs"], details: "mobile-app-developer" },
    { title: "Customer Success Associate", company: "Helpdesk Pro", location: "Pune", description: "Help customers get the most from our software.", type: "Full-time", experience: "1–3 years", salary: "₹7 LPA", skills: ["Support", "Communication", "CRM"], details: "customer-success-associate" },
    { title: "Content Writer", company: "Wordcraft", location: "Remote", description: "Write blogs and website copy for tech clients.", type: "Part-time", experience: "Fresher", salary: "₹3 LPA", skills: ["Writing", "SEO", "Editing"], details: "content-writer" },
    { title: "HR Executive", company: "PeopleFirst", location: "Delhi", description: "Source, screen, and onboard new team members.", type: "Full-time", experience: "Fresher", salary: "₹4 LPA", skills: ["Recruitment", "Communication", "Excel"], details: "hr-executive" },
    { title: "QA Engineer", company: "Testwise", location: "Chennai", description: "Keep our releases fast, reliable, and bug-free.", type: "Full-time", experience: "1–3 years", salary: "₹8 LPA", skills: ["Testing", "Automation", "QA"], details: "qa-engineer" },
    { title: "Product Designer", company: "Brightside", location: "Mumbai", description: "Turn complex workflows into delightful experiences.", type: "Full-time", experience: "1–3 years", salary: "₹12 LPA", skills: ["Figma", "Product", "UX"], details: "product-designer" },
    { title: "Data Analyst", company: "Northwind Labs", location: "Pune", description: "Find useful patterns and share clear insights.", type: "Full-time", experience: "Fresher", salary: "₹6 LPA", skills: ["SQL", "Excel", "Analytics"], details: "data-analyst" },
    { title: "UI/UX Designer", company: "Northwind Labs", location: "Mumbai", description: "Design clean, user-friendly product experiences people love.", type: "Full-time", experience: "1–3 years", salary: "₹9 LPA", skills: ["Figma", "UI", "UX"], details: "ui-ux-designer" }
  ];
  const demoSavedTitles = ["Frontend Developer", "Backend Developer", "Python Developer", "Mobile App Developer"];
  let savedTitles = JSON.parse(localStorage.getItem(savedJobsKey) || "[]");
  if (!Array.isArray(savedTitles)) {
    savedTitles = [];
  } else if (savedTitles.length === demoSavedTitles.length
    && demoSavedTitles.every((title) => savedTitles.includes(title))) {
    savedTitles = [];
    localStorage.setItem(savedJobsKey, JSON.stringify(savedTitles));
  }

  const grid = document.querySelector("#saved-jobs-grid");
  const emptyState = document.querySelector("#saved-jobs-empty");
  const count = document.querySelector("#saved-jobs-count");

  function renderSavedJobs() {
    grid.replaceChildren();
    const savedJobs = savedTitles.map((title) => jobs.find((job) => job.title === title)).filter(Boolean);

    savedJobs.forEach((job) => {
      const card = document.createElement("article");
      card.className = "job-card listing-card saved-job-card";

      const heading = document.createElement("div");
      heading.className = "listing-card-heading";
      const headingCopy = document.createElement("div");
      const title = document.createElement("h2");
      title.textContent = job.title;
      const company = document.createElement("p");
      company.className = "listing-company";
      company.textContent = `${job.company}, ${job.location}`;
      headingCopy.append(title, company);

      const removeButton = document.createElement("button");
      removeButton.className = "save-button";
      removeButton.type = "button";
      removeButton.setAttribute("aria-label", `Remove ${job.title} from saved jobs`);
      removeButton.setAttribute("aria-pressed", "true");
      removeButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.2 4.6 13a5 5 0 0 1 7.1-7.1l.3.3.3-.3a5 5 0 0 1 7.1 7.1z"></path></svg>';
      removeButton.addEventListener("click", () => {
        savedTitles = savedTitles.filter((savedTitle) => savedTitle !== job.title);
        localStorage.setItem(savedJobsKey, JSON.stringify(savedTitles));
        renderSavedJobs();
      });
      heading.append(headingCopy, removeButton);

      const description = document.createElement("p");
      description.className = "job-summary";
      description.textContent = job.description;
      const tags = document.createElement("div");
      tags.className = "job-tags";
      [job.type, job.experience, job.salary].forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        tags.append(element);
      });
      const skills = document.createElement("div");
      skills.className = "listing-skills";
      job.skills.forEach((skill) => {
        const element = document.createElement("span");
        element.textContent = skill;
        skills.append(element);
      });
      const details = document.createElement("a");
      details.className = "listing-details";
      details.href = `Job-details.html?job=${job.details}`;
      details.textContent = "View details";
      card.append(heading, description, tags, skills, details);
      grid.append(card);
    });

    count.textContent = `${savedJobs.length} ${savedJobs.length === 1 ? "job" : "jobs"} saved`;
    emptyState.hidden = savedJobs.length > 0;
  }

  renderSavedJobs();

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    mainNav.classList.toggle("is-open", isOpen);
  });
}

if (document.body.classList.contains("login-page")) {
  const loginForm = document.querySelector("#login-form");
  const loginMessage = document.querySelector("#login-message");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loginMessage.textContent = "This demo login is not connected to an account service yet.";
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    mainNav.classList.toggle("is-open", isOpen);
  });
}

if (document.body.classList.contains("signup-page")) {
  const signupForm = document.querySelector("#signup-form");
  const passwordInput = document.querySelector("#signup-password");
  const confirmPasswordInput = document.querySelector("#signup-confirm-password");
  const signupMessage = document.querySelector("#signup-message");

  confirmPasswordInput.addEventListener("input", () => {
    confirmPasswordInput.setCustomValidity(
      confirmPasswordInput.value && confirmPasswordInput.value !== passwordInput.value
        ? "Passwords do not match."
        : ""
    );
  });
  passwordInput.addEventListener("input", () => {
    if (confirmPasswordInput.value) {
      confirmPasswordInput.setCustomValidity(
        confirmPasswordInput.value !== passwordInput.value ? "Passwords do not match." : ""
      );
    }
  });
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    signupMessage.textContent = "This demo sign-up is not connected to an account service yet.";
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    mainNav.classList.toggle("is-open", isOpen);
  });
}

if (!document.body.classList.contains("job-details-page")) {
if (!document.body.classList.contains("apply-page") && !document.body.classList.contains("applications-page") && !document.body.classList.contains("saved-jobs-page") && !document.body.classList.contains("login-page") && !document.body.classList.contains("signup-page")) {
const searchForm = document.querySelector("#job-search");
const searchInput = document.querySelector("#job-query");
const locationSelect = document.querySelector("#job-location");
const jobCards = [...document.querySelectorAll(".job-card")];
const emptyState = document.querySelector("#empty-state");
const jobTypeSelect = document.querySelector("#job-type");
const experienceSelect = document.querySelector("#job-experience");
const salaryInput = document.querySelector("#job-salary");
const salaryValue = document.querySelector("#salary-value");
const sortSelect = document.querySelector("#job-sort");
const resultsCount = document.querySelector("#results-count");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const pageParams = new URLSearchParams(window.location.search);
let showingSavedOnly = pageParams.get("saved") === "1";
const savedJobTitles = new Set(JSON.parse(localStorage.getItem("jobtaria-saved-jobs") || "[]"));

if (document.body.classList.contains("job-page")) {
  searchInput.value = pageParams.get("query") || "";
  locationSelect.value = pageParams.get("location") || "";
}

function filterJobs() {
  const query = searchInput.value.trim().toLowerCase();
  const location = locationSelect.value.toLowerCase();
  const jobType = jobTypeSelect ? jobTypeSelect.value : "";
  const experience = experienceSelect ? experienceSelect.value : "";
  const minimumSalary = salaryInput ? Number(salaryInput.value) : 0;
  let visibleCount = 0;

  jobCards.forEach((card) => {
    const searchableText = `${card.dataset.title} ${card.dataset.tags}`.toLowerCase();
    const matchesQuery = !query || searchableText.includes(query);
    const matchesLocation = !location || card.dataset.location === location;
    const isSaved = card.querySelector(".save-button").getAttribute("aria-pressed") === "true";
    const metadata = card.querySelector(".listing-sorting-data");
    const matchesType = !jobType || !metadata || metadata.dataset.type === jobType;
    const matchesExperience = !experience || !metadata || metadata.dataset.experience === experience;
    const matchesSalary = !metadata || Number(metadata.dataset.salary) >= minimumSalary;
    const isVisible = matchesQuery && matchesLocation && matchesType && matchesExperience
      && matchesSalary && (!showingSavedOnly || isSaved);

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
  emptyState.textContent = showingSavedOnly
    ? "You haven't saved any jobs yet. Save a role to keep it close."
    : "No jobs match your search yet. Try another filter.";
  if (resultsCount) {
    resultsCount.textContent = `${visibleCount} ${visibleCount === 1 ? "job" : "jobs"} found`;
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!document.body.classList.contains("job-page")) {
    const params = new URLSearchParams();
    if (searchInput.value.trim()) params.set("query", searchInput.value.trim());
    if (locationSelect.value) params.set("location", locationSelect.value);
    window.location.href = `job.html${params.size ? `?${params}` : ""}`;
    return;
  }
  showingSavedOnly = false;
  filterJobs();
  document.querySelector("#latest-jobs").scrollIntoView({ behavior: "smooth" });
});

function sortJobs() {
  if (!sortSelect) return;
  const direction = sortSelect.value;
  const grid = document.querySelector("#job-grid");
  const sortedCards = [...jobCards].sort((first, second) => {
    const firstData = first.querySelector(".listing-sorting-data");
    const secondData = second.querySelector(".listing-sorting-data");
    if (!firstData || !secondData) return 0;
    const key = direction === "newest" ? "date" : "salary";
    const difference = Number(secondData.dataset[key]) - Number(firstData.dataset[key]);
    return direction === "salary-low" ? -difference : difference;
  });
  sortedCards.forEach((card) => grid.append(card));
}

if (jobTypeSelect) jobTypeSelect.addEventListener("change", filterJobs);
if (experienceSelect) experienceSelect.addEventListener("change", filterJobs);
if (salaryInput) {
  salaryInput.addEventListener("input", () => {
    salaryValue.textContent = `₹${salaryInput.value} LPA`;
    filterJobs();
  });
}
if (sortSelect) sortSelect.addEventListener("change", sortJobs);
searchForm.addEventListener("reset", () => {
  showingSavedOnly = false;
  window.setTimeout(() => {
    if (salaryValue) salaryValue.textContent = "₹0 LPA";
    filterJobs();
  });
});
searchInput.addEventListener("input", filterJobs);
locationSelect.addEventListener("change", filterJobs);

jobCards.forEach((card) => {
  const saveButton = card.querySelector(".save-button");
  const jobTitle = card.querySelector("h3, h2").textContent;
  const isSaved = savedJobTitles.has(jobTitle);

  saveButton.setAttribute("aria-pressed", String(isSaved));
  saveButton.setAttribute("aria-label", `${isSaved ? "Remove" : "Save"} ${jobTitle} ${isSaved ? "from" : "to"} saved jobs`);
  saveButton.addEventListener("click", () => {
    const willSave = saveButton.getAttribute("aria-pressed") !== "true";
    saveButton.setAttribute("aria-pressed", String(willSave));
    saveButton.setAttribute("aria-label", `${willSave ? "Remove" : "Save"} ${jobTitle} ${willSave ? "from" : "to"} saved jobs`);
    if (willSave) {
      savedJobTitles.add(jobTitle);
    } else {
      savedJobTitles.delete(jobTitle);
    }
    localStorage.setItem("jobtaria-saved-jobs", JSON.stringify([...savedJobTitles]));
    filterJobs();
  });
});

document.querySelectorAll("[data-show-saved]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showingSavedOnly = true;
    searchInput.value = "";
    locationSelect.value = "";
    if (jobTypeSelect) jobTypeSelect.value = "";
    if (experienceSelect) experienceSelect.value = "";
    if (salaryInput) salaryInput.value = "0";
    if (salaryValue) salaryValue.textContent = "₹0 LPA";
    filterJobs();
    document.querySelector("#latest-jobs").scrollIntoView({ behavior: "smooth" });
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

document.querySelectorAll(".nav-link:not([data-show-saved])").forEach((link) => {
  link.addEventListener("click", () => {
    showingSavedOnly = false;
    filterJobs();
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  mainNav.classList.toggle("is-open", isOpen);
});

filterJobs();
}
}