console.log("Hello world!");

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("open");
}
document.getElementById("menuButton").addEventListener("click", toggleMenu);
(function () {
  const slider = document.getElementById("slider");
  const track = document.getElementById("track");
  const slides = track.children;
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsBox = document.getElementById("dots");

  const total = slides.length;
  let current = 0;

  // Drag state
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let dragDelta = 0;
  const SWIPE_THRESHOLD = 50; // px needed to change slide

  // --- Navigation dots ---
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.className = "slider__dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", "Slide " + (i + 1));
    dot.addEventListener("click", () => goTo(i));
    dotsBox.appendChild(dot);
  }
  const dots = dotsBox.children;

  // --- Go to slide ---
  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    for (let i = 0; i < total; i++) {
      dots[i].classList.toggle("is-active", i === current);
    }
  }

  // --- Buttons ---
  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  // --- Unified handlers (touch + mouse) ---
  function getX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }

  function dragStart(e) {
    isDragging = true;
    startX = getX(e);
    currentX = startX;
    dragDelta = 0;
    track.classList.add("is-dragging");
  }

  function dragMove(e) {
    if (!isDragging) return;
    currentX = getX(e);
    dragDelta = currentX - startX;
    const slideWidth = slider.offsetWidth;
    const offsetPercent = (dragDelta / slideWidth) * 100;
    track.style.transform = `translateX(calc(-${current * 100}% + ${offsetPercent}%))`;

    // Prevent page scroll during horizontal swipe
    if (e.cancelable && Math.abs(dragDelta) > 10) {
      e.preventDefault();
    }
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove("is-dragging");

    if (Math.abs(dragDelta) > SWIPE_THRESHOLD) {
      goTo(dragDelta < 0 ? current + 1 : current - 1);
    } else {
      goTo(current); // snap back
    }
    dragDelta = 0;
  }

  // Touch events
  track.addEventListener("touchstart", dragStart, { passive: true });
  track.addEventListener("touchmove", dragMove, { passive: false });
  track.addEventListener("touchend", dragEnd);
  track.addEventListener("touchcancel", dragEnd);

  // Mouse (desktop drag)
  track.addEventListener("mousedown", (e) => {
    e.preventDefault();
    dragStart(e);
  });
  window.addEventListener("mousemove", dragMove);
  window.addEventListener("mouseup", dragEnd);

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });

  // Recalculate on resize
  window.addEventListener("resize", () => goTo(current));
})();
