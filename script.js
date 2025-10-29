// ====== Course Data ======
const courses = [
  { code: "CSE 110", name: "Introduction to Programming", credits: 2, type: "CSE", completed: false },
  { code: "WDD 130", name: "Web Fundamentals", credits: 2, type: "WDD", completed: true },
  { code: "CSE 111", name: "Programming with Functions", credits: 2, type: "CSE", completed: false },
  { code: "CSE 210", name: "Programming with Classes", credits: 2, type: "CSE", completed: false },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, type: "WDD", completed: false },
  { code: "WDD 231", name: "Frontend Web Development I", credits: 2, type: "WDD", completed: true }
];

const courseList = document.getElementById("course-list");
const totalCreditsElement = document.getElementById("total-credits");

// ====== Display Courses ======
function displayCourses(courseArray) {
  courseList.innerHTML = courseArray.map(course => `
    <div class="course-card ${course.completed ? 'completed' : ''}">
      <h3>${course.name} (${course.code})</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
    </div>
  `).join('');
}

// ====== Filter Courses ======
function filterCourses(category) {
  const filtered = category === 'all'
    ? courses
    : courses.filter(c => c.code.startsWith(category));
  displayCourses(filtered);
  updateCredits(filtered);
}

// ====== Calculate Total Credits ======
function updateCredits(courseArray) {
  const total = courseArray.reduce((sum, c) => sum + c.credits, 0);
  totalCreditsElement.textContent = `Total Credits: ${total}`;
}

// ====== Responsive Menu Toggle ======
function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

// ====== Footer Info ======
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ====== Initialize ======
displayCourses(courses);
updateCredits(courses);
