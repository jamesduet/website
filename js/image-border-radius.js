const updateBorderRadius = (el) => {
  const height = el.offsetHeight;
  const radius = height * 0.13;
  el.style.borderRadius = `${radius}px`;
};

const images = document.querySelectorAll('.image-corner');

const imageObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    updateBorderRadius(entry.target);
  }
});

images.forEach((div) => {
  updateBorderRadius(div);
  imageObserver.observe(div);
});
