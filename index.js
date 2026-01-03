import {
  loadSections,
  loadComponent,
  domFunctionsLoad,
  domAnimate,
} from "./components/loadHtml.js";

// Wait until window fully loads
window.onload = () => {
  const mappings = {
    index: "home",
    "cloud-deployment": "cloud-deployment",
    "shell-scripting": "shell-scripting",
    "sw-eng": "sw-erng",
  };

  let file = window.location.pathname.split("/").pop(); // "shell-scripting.html"
  file = file.replace(".html", ""); // "shell-scripting"

  console.log(file);

  const page = mappings[file] || "home";

  fetch("components.json")
    .then((res) => res.json())
    .then((data) => {
      const result = data.page.find((obj) => obj.id === page);

      document.title = result.title;

      loadComponent("root", "/components/layout.html", () => {
        // Load Header
        loadComponent("header", `/components/${result.header}`, () => {
          // Animate "moveDiv" if it exists
          domFunctionsLoad(); // now works because HTML is loaded
        });

        domAnimate();

        const name = document.getElementById("name");
        const description = document.getElementById("description");
        console.log(page);
        name.textContent = result.name;
        description.textContent = result.description;

        loadSections(result.section, result.relate);
      });
    });
};

export const updatecomponent = (name, event) => {
  event.stopPropagation();

  const p = document.querySelector("#update");
  const tabs = {
    a: { el: "#a", value: "3000" },
    b: { el: "#b", value: "2639" },
    c: { el: "#c", value: "46" },
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

// expose to window so HTML inline onclick works
window.updatecomponent = updatecomponent;
