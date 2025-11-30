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
