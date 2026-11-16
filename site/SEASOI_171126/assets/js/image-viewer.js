    const viewer = document.getElementById('image-viewer');
    const enlargedImage = viewer.querySelector('img');
    document.querySelector('.slides').addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      const image = link?.querySelector('img');
      if (!image || !/\.(png|jpe?g|gif|webp|svg)$/i.test(new URL(link.href).pathname) ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      event.stopPropagation();
      enlargedImage.src = link.href;
      enlargedImage.alt = image.alt;
      viewer.showModal();
    }, true);
    viewer.querySelector('button').addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', event => {
      if (event.target === viewer) viewer.close();
    });
    document.addEventListener('keydown', event => {
      if (viewer.open) event.stopImmediatePropagation();
    }, true);
  
