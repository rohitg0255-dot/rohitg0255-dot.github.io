// =========================
// GENERATOR FUNCTION
// =========================

function loadSections(sections, relate) {
  const container = document.getElementById("container");
  const articles = document.getElementById("relate");

  sections
    .slice()
    .reverse()
    .forEach((sec, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = " flex gap-8 items-center";

      wrapper.innerHTML = sec.svg;

      const btn = document.createElement("button");

      const mapKey = Object.keys(sec.componentMap)[0];
      const idPrimary = mapKey;
      const idSecondary = mapKey + "-content";

      btn.id = idPrimary;
      btn.className =
        "transition-all hover:text-blue-500 w-full bg-green-400  p-8  duration-300 ";
      btn.innerText = sec.name;

      const sectionBox = document.createElement("section");
      sectionBox.id = idSecondary;
      sectionBox.className =
        "p-4 space-y-1 shadodw-md  transition-all duration-300 opacity-100 ";
      sectionBox.style = "scrollbar-width: none";

      const title = document.createElement("p");
      title.className = "text-3xl";
      title.innerText = sec.name;

      const hr = document.createElement("hr");
      const contentText = document.createElement("p");
      contentText.className = "text-sm";
      contentText.innerHTML = sec.content.join("<br><br>");

      sectionBox.appendChild(title);
      sectionBox.appendChild(hr);
      sectionBox.appendChild(contentText);

      wrapper.appendChild(btn);

      container.prepend(sectionBox);
      container.prepend(wrapper);
    });

  relate.forEach((rel, index) => {
    const a = document.createElement("a");
    a.className = "text-center block p-2 shadow-md bg-white text-gray-600";
    a.innerText = rel;
    articles.append(a);
  });
}

window.onload = () => {
  // Animate "moveDiv" if it exists
  fetch("components.json")
    .then((res) => res.json())
    .then((data) => loadSections(data.page[0].section, data.page[0].relate));

  // Animate all slide buttons
  document.querySelectorAll(".moveDiv").forEach((div) => {
    div.classList.remove("translate-y-5", "opacity-0");
    div.classList.add("translate-y-0", "opacity-100");
  });
};

function opencomponent(id) {
  const img = document.getElementById("flower");
  const btn = document.getElementById("introduction");

  // If currently visible → hide it
  if (img.classList.contains("opacity-100")) {
    img.classList.add("opacity-0", "max-h-0");
    img.classList.remove("opacity-100", "max-h-96");
    btn.classList.add("opacity-0", "max-h-0");
    btn.classList.remove("opacity-100", "max-h-96");
  }
  // If currently hidden → show it
  else {
    img.classList.remove("opacity-0", "max-h-0");
    img.classList.add("opacity-100", "max-h-96");
    btn.classList.remove("opacity-0", "max-h-0");
    btn.classList.add("opacity-100", "max-h-96");
  }
}

function toggleText() {
  const p = document.getElementById("myText");

  if (p.style.display === "none") {
    // show
    p.style.display = "block";

    // ensure animation starts AFTER display change
    requestAnimationFrame(() => {
      p.classList.remove("opacity-0", "translate-y-5");
      p.classList.add("opacity-100", "translate-y-0");
    });
  } else {
    // hide animation
    p.classList.add("opacity-0", "translate-y-5");
    p.classList.remove("opacity-100", "translate-y-0");

    // hide after animation ends
    setTimeout(() => {
      p.style.display = "none";
    }, 300); // match duration-300
  }
}

const updatecomponent = (name, event) => {
  event.stopPropagation();

  const p = document.querySelector("#update");
  const tabs = {
    a: { el: "#a", value: "3000" },
    b: { el: "#b", value: "2000" },
    c: { el: "#c", value: "4" },
  };

  // Remove active border from all
  Object.values(tabs).forEach((t) => {
    document
      .querySelector(t.el)
      ?.classList.remove("border-blue-500", "border-b-2");
  });

  const selected = tabs[name];
  if (!selected) return (p.innerText = "Unknown status");

  p.innerText = selected.value;
  document
    .querySelector(selected.el)
    ?.classList.add("border-blue-500", "border-b-2");
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

  const moveOn = document.getElementById("moveOn");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          moveOn.classList.remove("opacity-0", "translate-y-5");
          moveOn.classList.add("opacity-100", "translate-y-0");
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(moveOn);

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
