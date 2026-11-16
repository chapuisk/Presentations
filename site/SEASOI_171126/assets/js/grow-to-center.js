    (function () {
      var timers = new WeakMap();
      var clones = new WeakMap();
      function geometry(img) {
        var scale = Reveal.getScale() || 1;
        var section = img.closest('section');
        var r = img.getBoundingClientRect();
        var sr = section.getBoundingClientRect();
        var box = document.querySelector('.reveal .slides').getBoundingClientRect();
        var w = r.width / scale, h = r.height / scale;
        var k = Math.min(760 / w, 520 / h);
        var tw = w * k, th = h * k;
        var tl = (box.left + box.width / 2 - sr.left) / scale - tw / 2;
        var tt = (box.top + box.height / 2 - sr.top) / scale - th / 2;
        var from = 'translate(' + ((r.left - sr.left) / scale - tl) + 'px,' + ((r.top - sr.top) / scale - tt) + 'px) scale(' + (1 / k) + ')';
        return { section: section, tw: tw, th: th, tl: tl, tt: tt, from: from };
      }
      function reset(img) {
        clearTimeout(timers.get(img));
        var clone = clones.get(img);
        if (!clone) return;
        clones.delete(img);
        var g = geometry(img);
        clone.classList.remove('is-grown');
        clone.style.transform = g.from;
        var finished = false;
        var done = function () {
          if (finished) return;
          finished = true;
          clone.remove();
          img.style.visibility = '';
        };
        clone.addEventListener('transitionend', done, { once: true });
        setTimeout(done, 1400);
      }
      function grow(img) {
        if (clones.get(img)) return;
        var g = geometry(img);
        var clone = img.cloneNode(false);
        clone.className = 'grow-to-center-clone';
        clone.setAttribute('aria-hidden', 'true');
        clone.style.cssText = 'position:absolute; margin:0; max-width:none; max-height:none; object-fit:contain; transform-origin:0 0;' +
          'left:' + g.tl + 'px; top:' + g.tt + 'px; width:' + g.tw + 'px; height:' + g.th + 'px; transform:' + g.from + ';';
        g.section.appendChild(clone);
        clones.set(img, clone);
        img.style.visibility = 'hidden';
        clone.getBoundingClientRect();
        setTimeout(function () {
          clone.classList.add('is-grown');
          clone.style.transform = 'none';
        }, 20);
      }
      function shrunk(img) {
        var slide = img.closest('section');
        return !!(slide && slide.querySelector('.fragment.shrink-grown.visible'));
      }
      function schedule(scope) {
        scope.querySelectorAll('.fragment.visible img.grow-to-center, img.grow-to-center').forEach(function (img) {
          var frag = img.closest('.fragment');
          if (frag && !frag.classList.contains('visible')) return;
          reset(img);
          if (shrunk(img)) return;
          timers.set(img, setTimeout(function () { grow(img); }, 1000));
        });
      }
      Reveal.on('fragmentshown', function (e) {
        if (e.fragment.classList.contains('shrink-grown')) {
          e.fragment.closest('section').querySelectorAll('img.grow-to-center').forEach(reset);
        } else {
          schedule(e.fragment);
        }
      });
      Reveal.on('fragmenthidden', function (e) {
        if (e.fragment.classList.contains('shrink-grown')) {
          e.fragment.closest('section').querySelectorAll('img.grow-to-center').forEach(function (img) {
            if (!shrunk(img)) grow(img);
          });
        } else {
          e.fragment.querySelectorAll('img.grow-to-center').forEach(reset);
        }
      });
      Reveal.on('slidechanged', function (e) {
        if (e.previousSlide) e.previousSlide.querySelectorAll('img.grow-to-center').forEach(reset);
        schedule(e.currentSlide);
      });
      Reveal.on('ready', function (e) { schedule(e.currentSlide); });
      if (Reveal.isReady()) schedule(Reveal.getCurrentSlide());
    })();
  
