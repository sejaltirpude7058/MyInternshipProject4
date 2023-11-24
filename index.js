window.onload = function () {
  var backgroundImg = ["bg5.png", "bg2.jpg", "bg7.png", "bg4.jpg", "bg6.png"];
  var currentIndex = 0;

  //  default background image
  document.body.style.backgroundImage = "url('" + backgroundImg[0] + "')";

  // Preload images
  preloadImages(backgroundImg, function () {
    setInterval(changeImage, 10000);
  });

  function preloadImages(images, callback) {
    var loadedImages = 0;
    var totalImages = images.length;

    function imageLoaded() {
      loadedImages++;
      if (loadedImages === totalImages) {
        callback();
      }
    }

    images.forEach(function (imgSrc, index) {
      var img = new Image();
      img.onload = function () {
        imageLoaded();
        //background image after the first image is loaded
        if (index === 0) {
          changeImage();
        }
      };
      img.src = imgSrc;
    });
  }

  function changeImage() {
    currentIndex = (currentIndex + 1) % backgroundImg.length;
    document.body.style.backgroundImage =
      "url('" + backgroundImg[currentIndex] + "')";
  }
};

window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_element = document.querySelector("#tasks");

  // localStorage
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    createTaskElement(task);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value.trim();

    if (task !== "") {
      // Save the task to localStorage
      saveTaskToLocalStorage(task);

      createTaskElement(task);

      input.value = "";
    } else {
      alert("Task cannot be empty!");
    }
  });

  // Function to create a task element
  function createTaskElement(taskText) {
    const task_element = document.createElement("div");
    task_element.classList.add("task");

    const task_content_element = document.createElement("div");
    task_content_element.classList.add("content");

    task_element.appendChild(task_content_element);

    const task_input_element = document.createElement("input");
    task_input_element.classList.add("text");
    task_input_element.type = "text";
    task_input_element.value = taskText;

    task_content_element.appendChild(task_input_element);

    const task_actions_element = document.createElement("div");
    task_actions_element.classList.add("actions");

    const task_markDone_element = document.createElement("button");
    task_markDone_element.classList.add("markDone");
    task_markDone_element.innerHTML = "DONE";
    task_markDone_element.addEventListener("click", function () {
      task_input_element.classList.toggle("line-through");
    });

    task_actions_element.appendChild(task_markDone_element);

    const task_delete_element = document.createElement("button");
    task_delete_element.classList.add("delete");
    task_delete_element.innerText = "Delete";

    task_actions_element.appendChild(task_markDone_element);
    task_actions_element.appendChild(task_delete_element);

    task_element.appendChild(task_actions_element);

    list_element.appendChild(task_element);

    // Delete task when the delete button is clicked
    task_delete_element.addEventListener("click", () => {
      list_element.removeChild(task_element);
      removeTaskFromLocalStorage(taskText);
    });
  }

  // Function to save a task to localStorage
  function saveTaskToLocalStorage(task) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }

  // Function to remove a task from localStorage
  function removeTaskFromLocalStorage(task) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = savedTasks.filter((savedTask) => savedTask !== task);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
});
