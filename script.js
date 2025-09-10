// =============================
// Task Management App - script.js
// =============================

// Grab DOM elements
const addTask = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const taskDesc = document.getElementById("taskDesc");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");

// =============================
// Add New Task
// =============================
addTask.addEventListener("click", () => {
    // Get input values
    const title = taskInput.value.trim();
    const desc = taskDesc.value.trim();
    const date = taskDate.value;

    if (title) {
        // Create list item
        const listItem = document.createElement("li");
        listItem.className =
            "list-group-item d-flex justify-content-between align-items-start";

        // Task item template
        listItem.innerHTML = `
      <div class="task-box bg-light p-3 w-100 rounded">
        <div class="d-flex justify-content-between align-items-center">
          <span class="fw-bold">${title}</span>
          <div>
            <button class="btn btn-warning btn-sm" onclick="editTask(this)">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="removeTask(this)">Remove</button>
          </div>
        </div>
        <p class="text-muted mb-1">${desc || "No description"}</p>
        <small class="text-secondary">Due: ${date || "No due date"}</small>
      </div>
    `;

        // Append to task list
        taskList.appendChild(listItem);

        // Reset input fields
        taskInput.value = "";
        taskDesc.value = "";
        taskDate.value = "";

        // Refresh numbering
        giveNumber();
    } else {
        alert("Please enter a task title.");
    }
});

// =============================
// Numbering for tasks
// =============================
function giveNumber() {
    const items = taskList.querySelectorAll("li");

    items.forEach((item, index) => {
        const span = item.querySelector("span");

        if (span) {
            // Remove old numbering (if any)
            span.textContent = span.textContent.replace(/^\d+\.\s*/, "");

            // Add fresh numbering
            span.textContent = `${index + 1}. ${span.textContent}`;
        }
    });
}

// =============================
// Edit Task
// =============================
function editTask(button) {
    const listItem = button.closest("li");
    const span = listItem.querySelector("span");
    const desc = listItem.querySelector("p");
    const date = listItem.querySelector("small");

    if (span && desc && date) {
        // Load existing values back into input fields
        taskInput.value = span.textContent.replace(/^\d+\.\s*/, "");
        taskDesc.value = desc.textContent !== "No description" ? desc.textContent : "";
        taskDate.value =
            date.textContent.replace("Due: ", "") !== "No due date"
                ? date.textContent.replace("Due: ", "")
                : "";

        // Remove old item while editing
        listItem.remove();
        giveNumber();
    }
}

// =============================
// Remove Task
// =============================
function removeTask(button) {
    const listItem = button.closest("li");

    if (listItem) {
        listItem.remove();
        giveNumber();
    }
}