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

// Generic function to load a component
function loadComponent(id, file, callback) {
  fetch(file)
    .then((res) => res.text())
    .then((html) => {
      const container = document.getElementById(id);
      container.innerHTML = html;

      // Callback after component is loaded
      if (callback) callback();
    })
    .catch((err) => console.error(`Failed to load ${file}:`, err));
}

// Wait until window fully loads
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
  // Load Header
  loadComponent("header", "/components/header.html");

  // Load Nav and attach event listeners
  loadComponent("nav", "/components/nav.html", () => {
    const btn = document.getElementById("openBtn");
    const menu = document.getElementById("menu");
    const div = document.getElementById("slideDiv");
    const closeBtn = document.getElementById("closeBtn");

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
  });

  // Load Footer and attach its script (e.g., toggle privacy policy)
  loadComponent("footer", "/components/footer.html", () => {
    const toggleBtn = document.getElementById("myTextToggleBtn"); // Optional: assign an ID to your button
    const text = document.getElementById("myText");

    if (toggleBtn && text) {
      toggleBtn.addEventListener("click", () => {
        if (text.style.display === "none" || text.style.display === "") {
          text.style.display = "block";
          requestAnimationFrame(() => {
            text.classList.remove("opacity-0", "translate-y-5");
            text.classList.add("opacity-100", "translate-y-0");
          });
        } else {
          text.classList.add("opacity-0", "translate-y-5");
          text.classList.remove("opacity-100", "translate-y-0");
          setTimeout(() => (text.style.display = "none"), 300);
        }
      });
    }
  });
};

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
    { threshold: 0.7 }
  );

  observer.observe(moveOn);

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
