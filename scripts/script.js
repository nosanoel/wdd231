const courses = [
  { code: "CSE 110", name: "Introduction to Programming", credits: 2, type: "CSE", completed: false },
  { code: "WDD 130", name: "Web Fundamentals", credits: 2, type: "WDD", completed: true },
  { code: "CSE 111", name: "Programming with Functions", credits: 2, type: "CSE", completed: false },
  { code: "CSE 210", name: "Programming with Classes", credits: 2, type: "CSE", completed: false },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, type: "WDD", completed: false },
  { code: "WDD 231", name: "Frontend Web Development I", credits: 2, type: "WDD", completed: true }
];

document.addEventListener("DOMContentLoaded", () => {
  const courseList = document.getElementById("course-list");
  const totalCreditsElement = document.getElementById("total-credits");
  const hamburger = document.getElementById("hamburger");

  // Display courses dynamically
  function displayCourses(courseArray) {
    courseList.innerHTML = courseArray
      .map(course => `
        <div class="course-card ${course.completed ? 'completed' : ''}">
          <h3>${course.name} (${course.code})</h3>
          <p><strong>Credits:</strong> ${course.credits}</p>
        </div>
      `)
      .join('');
  }

  // Filter courses
  function filterCourses(category) {
    const filtered = category === 'all' ? courses : courses.filter(c => c.code.startsWith(category));
    displayCourses(filtered);
    updateCredits(filtered);
  }

  // Update total credits
  function updateCredits(courseArray) {
    const total = courseArray.reduce((sum, c) => sum + c.credits, 0);
    totalCreditsElement.textContent = `Total Credits: ${total}`;
  }

  // Responsive menu toggle
  function toggleMenu() {
    document.getElementById("menu").classList.toggle("open");
  }

  // Footer info
  function updateYearAndLastModified() {
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
  }

  // Event listeners
  hamburger.addEventListener("click", toggleMenu);
  document.getElementById("all-btn").addEventListener("click", () => filterCourses("all"));
  document.getElementById("wdd-btn").addEventListener("click", () => filterCourses("WDD"));
  document.getElementById("cse-btn").addEventListener("click", () => filterCourses("CSE"));

  // Initialize page
  displayCourses(courses);
  updateCredits(courses);
  updateYearAndLastModified();
});
document.addEventListener("DOMContentLoaded", () => {
  const allBtn = document.getElementById("all-btn");
  const wddBtn = document.getElementById("wdd-btn");
  const cseBtn = document.getElementById("cse-btn");

  allBtn.addEventListener("click", () => filterCourses("all"));
  wddBtn.addEventListener("click", () => filterCourses("WDD"));
  cseBtn.addEventListener("click", () => filterCourses("CSE"));
});
