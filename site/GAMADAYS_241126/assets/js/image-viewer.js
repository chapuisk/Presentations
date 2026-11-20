const viewer = document.getElementById('image-viewer');
const enlargedImage = viewer.querySelector('img');
document.getElementById('future-work').addEventListener('click', event => {
  const link = event.target.closest('a[data-expand-image]');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  event.stopPropagation();
  enlargedImage.src = link.href;
  enlargedImage.alt = link.querySelector('img').alt;
  viewer.showModal();
}, true);
viewer.querySelector('button').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  if (event.target === viewer) viewer.close();
});
document.addEventListener('keydown', event => {
  if (viewer.open) event.stopImmediatePropagation();
}, true);
