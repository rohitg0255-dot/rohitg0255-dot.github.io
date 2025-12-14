// =========================
// GENERATOR FUNCTION
// =========================

const pov = (program, contentText, item) => {
  if (item.code) {
    program.value += `${item.code}\n`;
  } else {
    if (program.value.length > 0) {
      const codeText = program.value; // ✅ SNAPSHOT

      const wrapper = document.createElement("div");
      wrapper.className = "relative max-w-full";

      const pre = document.createElement("pre");
      pre.className =
        "max-w-full overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100 font-mono shadow-inner";

      const code = document.createElement("code");
      code.className = "block whitespace-pre-wrap select-text break-words";
      code.textContent = codeText;

      pre.appendChild(code);

      /* Copy button */
      const copyBtn = document.createElement("button");
      copyBtn.textContent = "Copy";
      copyBtn.className =
        "absolute top-2 right-2 rounded-md bg-gray-700 px-2 py-1 text-xs text-gray-100 hover:bg-gray-600 active:scale-95 transition";

      copyBtn.addEventListener("click", async () => {
        try {
          console.log(codeText);
          await navigator.clipboard.writeText(codeText);
          copyBtn.textContent = "Copied!";
          setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
        } catch {
          copyBtn.textContent = "Failed";
        }
      });

      wrapper.appendChild(copyBtn);
      wrapper.appendChild(pre);
      contentText.appendChild(wrapper);

      program.value = ""; // reset AFTER snapshot
    }

    if (item.head) {
      const h = document.createElement("h3");
      h.className = "text-gray-500 font-semibold text-lg italic";
      h.textContent = item.head;
      contentText.appendChild(h);
    }

    if (item.line) {
      const p = document.createElement("p");
      p.textContent = item.line;
      contentText.appendChild(p);
    }

    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = "";
      img.loading = "lazy";
      img.className =
        "block mx-auto h-auto object-contain max-w-full sm:max-w-[70%] md:max-w-[55%] lg:max-w-[50%]";
      contentText.appendChild(img);
    }
  }
};

export const loadSections = (sections, relate) => {
  const container = document.getElementById("container");
  const articles = document.getElementById("relate");

  // ---------------------------------------
  // BUILD SECTIONS
  // ---------------------------------------
  [...sections].reverse().forEach((sec) => {
    const mapKey = Object.keys(sec.componentMap)[0];
    const idPrimary = mapKey;
    const idSecondary = `${mapKey}-content`;

    // WRAPPER (svg + button)
    const wrapper = document.createElement("div");
    wrapper.className = "flex gap-8 items-center";
    wrapper.innerHTML = sec.svg;

    // BUTTON
    const btn = document.createElement("button");
    btn.id = idPrimary;
    btn.className =
      "transition-all hover:text-blue-500 w-full bg-green-400 p-4 duration-300";
    btn.innerText = sec.name;
    wrapper.appendChild(btn);

    // SECTION CONTAINER
    const sectionBox = document.createElement("section");
    sectionBox.id = idSecondary;
    sectionBox.className = "space-y-1 transition-all duration-300 opacity-100";
    sectionBox.style = "scrollbar-width: none";

    // CONTENT HOLDER
    const contentText = document.createElement("div");
    contentText.className = "space-y-4 text-base text-gray-800";

    // ---------------------------------------
    // WARNING BOX
    // ---------------------------------------
    if (sec.content.warning) {
      const warnBox = document.createElement("p");
      warnBox.className = "p-1 border border-blue-500 bg-blue-200 rounded-xl";
      warnBox.innerHTML = `<strong>Warning :</strong> ${sec.content.warning}`;
      contentText.appendChild(warnBox);
    }

    // ---------------------------------------
    // EXPLAIN ARRAY
    // ---------------------------------------
    if (sec.content.explain?.text) {
      let program = { value: "" };

      sec.content.explain.text.forEach(pov.bind(null, program, contentText));
    }

    // ---------------------------------------
    // NOTE BOX
    // ---------------------------------------
    if (sec.content.note) {
      const noteBox = document.createElement("p");
      noteBox.className = "p-1 border border-green-500 bg-green-200 rounded-xl";
      noteBox.innerHTML = `<strong>Note :</strong> ${sec.content.note}`;
      contentText.appendChild(noteBox);
    }

    // ---------------------------------------
    // PLAN ARRAY
    // ---------------------------------------
    if (sec.content.plan?.text) {
      let program = { value: "" };

      sec.content.plan.text.forEach(pov.bind(null, program, contentText));
    }

    // ADD CONTENT INTO SECTION
    sectionBox.appendChild(contentText);

    //If has component to add, check header
    if (sec.content.plan?.stoner) {
      const file = sec.content.plan?.stoner;

      loadComponent(idSecondary, `/components/${file}`, () => {
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
    }

    // PREPEND BOTH IN ORDER
    container.prepend(sectionBox);
    container.prepend(wrapper);
  });

  // ---------------------------------------
  // BUILD RELATED LINKS
  // ---------------------------------------
  relate.forEach((rel) => {
    const a = document.createElement("a");
    a.className = "text-center block p-2 shadow-md bg-white text-gray-600";
    a.innerText = rel;
    articles.append(a);
  });
};

// Generic function to load a component
export const loadComponent = (id, file, callback) => {
  return fetch(file)
    .then((res) => res.text())
    .then((html) => {
      const container = document.getElementById(id);
      if (container) container.insertAdjacentHTML("beforeend", html);

      // Callback after component is loaded
      if (callback) callback();
    })
    .catch((err) => console.error(`Failed to load ${file}:`, err));
};

export const domFunctionsLoad = () => {
  // Animate all slide buttons
  const divs = document.querySelectorAll(".moveDiv");

  divs.forEach((div, i) => {
    setTimeout(() => {
      div.classList.remove("translate-y-5", "opacity-0");
      div.classList.add("translate-y-0", "opacity-100");
    }, 100 * i); // 0ms, 100ms, 200ms, 300ms... staggered
  });

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

export const domAnimate = () => {
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
};
