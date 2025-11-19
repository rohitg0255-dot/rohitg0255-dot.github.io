const opencomponent = (name) => {
  if (name === "b") e.stopPropagation();
  let p, e;
  if (name === "d") {
    p = document.querySelector("#introduction");
    e = document.querySelector("#flower");
  } else if (name === "e") {
    p = document.querySelector("#server");
    e = document.querySelector("#index");
  } else if (name === "f") {
    p = document.querySelector("#javascript");
    e = document.querySelector("#block");
  } else {
    p = document.querySelector("#component");
    e = document.querySelector("#element");
  }

  if (p.classList.contains("opacity-100")) {
    p.classList.remove("opacity-100", "max-h-96");
    p.classList.add("opacity-0", "max-h-0", "absolute", "-z-10");
    e.classList.remove("opacity-0", "max-h-0", "absolute", "-z-10");
    e.classList.add("opacity-100", "max-h-96");
  } else {
    p.classList.remove("opacity-0", "max-h-0", "absolute", "-z-10");
    p.classList.add("opacity-100", "max-h-96");
    e.classList.remove("opacity-100", "max-h-96", "absolute", "-z-10");
    e.classList.add("opacity-0", "max-h-0");
  }
};

const updatecomponent = (name, e) => {
  e.stopPropagation(); // Prevent event from bubbling up
  const p = document.querySelector("#update");
  const a = document.querySelector("#a");
  const b = document.querySelector("#b");
  const c = document.querySelector("#c");

  a.classList.remove("border-blue-500", "border-b-2");
  b.classList.remove("border-blue-500", "border-b-2");
  c.classList.remove("border-blue-500", "border-b-2");

  switch (name) {
    case "a": {
      p.innerText = "3000";
      a.classList.add("border-blue-500", "border-b-2");
      break;
    }
    case "b":
      p.innerText = "2000";
      b.classList.add("border-blue-500", "border-b-2");
      break;
    case "c":
      p.innerText = "4";
      c.classList.add("border-blue-500", "border-b-2");
      break;
    default:
      p.innerText = "Unknown status";
  }
};

window.onload = () => {
  // Animate "moveDiv" if it exists
  const div = document.getElementById("moveDiv");
  if (div) {
    div.classList.remove("translate-y-5", "opacity-0");
    div.classList.add("translate-y-0", "opacity-100");
  }

  // Animate all slide buttons
  document.querySelectorAll(".slide-btn").forEach((btn) => {
    btn.classList.remove("-translate-x-5", "opacity-0");
    btn.classList.add("translate-x-0", "opacity-100");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("openBtn");
  const menu = document.getElementById("menu");
  const closeBtn = document.getElementById("closeBtn");
  const div = document.getElementById("slideDiv");

  function openPanel() {
    div.classList.remove("max-h-0", "opacity-0", "-translate-y-10");
    div.classList.add(
      "md:max-h-120",
      "max-h-160",
      "opacity-100",
      "translate-y-0"
    );
    menu.classList.add("translate-x-0", "opacity-100");
    menu.classList.remove("-translate-x-5", "opacity-0");
  }

  function closePanel() {
    div.classList.add("max-h-0", "opacity-0", "-translate-y-10");
    div.classList.remove(
      "md:max-h-120",
      "max-h-160",
      "opacity-100",
      "translate-y-0"
    );
    menu.classList.add("-translate-x-5", "opacity-0");
    menu.classList.remove("translate-x-0", "opacity-100");
  }

  btn.addEventListener("click", openPanel);
  closeBtn.addEventListener("click", closePanel);
  // document.getElementById("openBtn").click();

  const instance = document.getElementById("instance");
  if (!instance) return;
  for (let i = 0; i < 50; i++) {
    const newDiv = document.createElement("div");

    // Set random opacity between 0 and 1
    const opacity = Math.random();

    // Apply styles to the new div
    newDiv.classList.add(
      "w-4",
      "h-4",
      "bg-yellow-500",
      "rounded",
      "transition-opacity",
      "duration-1000"
    );
    newDiv.style.opacity = opacity;

    // Append the new div to the instance container
    instance.appendChild(newDiv);
  }

  setInterval(() => {
    // Clear all child elements
    instance.innerHTML = "";
    for (let i = 0; i < 50; i++) {
      const newDiv = document.createElement("div");

      // Set random opacity between 0 and 1
      const opacity = Math.random();

      // Apply styles to the new div
      newDiv.classList.add(
        "w-4",
        "h-4",
        "bg-yellow-500",
        "rounded",
        "transition-opacity",
        "duration-1000"
      );
      newDiv.style.opacity = opacity;

      // Append the new div to the instance container
      instance.appendChild(newDiv);
    }
  }, 2100);
});
