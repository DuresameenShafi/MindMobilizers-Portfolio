/* ========== CARD SLIDER ========== */
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".big-container");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstboxWidth = carousel.querySelector(".box").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;
let boxPerView = Math.round(carousel.offsetWidth / firstboxWidth);

carouselChildrens
  .slice(-boxPerView)
  .reverse()
  .forEach((box) => {
    carousel.insertAdjacentHTML("afterbegin", box.outerHTML);
  });

carouselChildrens.slice(0, boxPerView).forEach((box) => {
  carousel.insertAdjacentHTML("beforeend", box.outerHTML);
});

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstboxWidth : firstboxWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const autoPlay = () => {
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstboxWidth), 2500);
};
autoPlay();

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

/* ========== CARD SLIDER END ========== */

/* =========== VIDEO BUTTON ============ */

$(document).ready(function () {
  $(".fancybox").fancybox({
    padding: 0,
    maxHeight: 444,
    afterLoad: function () {
      $("<div>")
        .attr("class", "prefooter-btn")
        .data("ct-checkout", "vidalife.kiba-camera")
        .text("Pre-Order Now")
        .appendTo(this.wrap[0]);
    },
  });
});
/* ========== VIDEO BUTTON END ========== */
