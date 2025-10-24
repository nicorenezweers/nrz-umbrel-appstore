// Swipe.js: Bidirektionales Swiping mit Indikator-Punkten

document.addEventListener("DOMContentLoaded", () => {
    const bodies = Array.from(document.querySelectorAll('.swipe-body'));
    let current = 0;
    let dragging = false, startX = 0, deltaX = 0;
    const wrap = document.querySelector('.swipe-wrapper');
  
    // Indikator-Punkte aktualisieren
    function updateIndicators(index) {
      const indicators = document.querySelectorAll('.indicator');
      indicators.forEach((ind, i) => {
        if (i === index) {
          ind.classList.add('active');
        } else {
          ind.classList.remove('active');
        }
      });
    }
  
    // ALLE Profile SOFORT positionieren
    function initProfiles() {
      bodies.forEach((body, i) => {
        body.style.transition = "none";
        body.style.opacity = "1";
        body.style.pointerEvents = i === current ? "auto" : "none";
        
        if (i === current) {
          body.classList.add("active");
          body.style.transform = "translateX(0)";
          body.style.zIndex = "2";
        } else if (i < current) {
          body.style.transform = "translateX(-100%)";
          body.style.zIndex = "1";
        } else {
          body.style.transform = "translateX(100%)";
          body.style.zIndex = "1";
        }
      });
      updateIndicators(current);
    }
  
    function onStart(x) {
      dragging = true;
      startX = x;
      deltaX = 0; // Reset deltaX bei jedem Start
      bodies.forEach(body => body.style.transition = "none");
    }
  
    function onMove(x) {
      if (!dragging) return;
      deltaX = x - startX;
      
      // ALLE Profile gleichzeitig verschieben relativ zu ihrer Position
      bodies.forEach((body, i) => {
        let baseOffset = (i - current) * window.innerWidth;
        body.style.transform = `translateX(${baseOffset + deltaX}px)`;
      });
    }
  
    function onEnd() {
      if (!dragging) return;
      dragging = false;
      
      const THRESH = 80;
      let targetIdx = current;
      
      // Nach links swipen (deltaX negativ) = nächstes Profil
      if (deltaX < -THRESH && current < bodies.length - 1) {
        targetIdx = current + 1;
      } 
      // Nach rechts swipen (deltaX positiv) = vorheriges Profil
      else if (deltaX > THRESH && current > 0) {
        targetIdx = current - 1;
      }
      
      // Transition aktivieren
      bodies.forEach(body => {
        body.style.transition = "transform 0.32s cubic-bezier(0.4, 0.0, 0.2, 1)";
      });
      
      // Zu Zielposition animieren
      bodies.forEach((body, i) => {
        let offset = (i - targetIdx) * window.innerWidth;
        body.style.transform = `translateX(${offset}px)`;
        body.style.pointerEvents = i === targetIdx ? "auto" : "none";
        
        if (i === targetIdx) {
          body.classList.add("active");
          body.style.zIndex = "2";
        } else {
          body.classList.remove("active");
          body.style.zIndex = "1";
        }
      });
      
      updateIndicators(targetIdx);
      current = targetIdx;
    }
  
    // Mouse events
    wrap.addEventListener('mousedown', e => {
      e.preventDefault();
      onStart(e.clientX);
    });
    wrap.addEventListener('mousemove', e => {
      if (dragging) {
        e.preventDefault();
        onMove(e.clientX);
      }
    });
    wrap.addEventListener('mouseup', onEnd);
    wrap.addEventListener('mouseleave', onEnd);
  
    // Touch events
    wrap.addEventListener('touchstart', e => onStart(e.touches[0].clientX), { passive: true });
    wrap.addEventListener('touchmove', e => {
      if (dragging) onMove(e.touches[0].clientX);
    }, { passive: true });
    wrap.addEventListener('touchend', onEnd);
    wrap.addEventListener('touchcancel', onEnd);
  
    // Direktes Klicken auf Indikator-Punkte
    document.querySelectorAll('.indicator').forEach((indicator, idx) => {
      indicator.addEventListener('click', () => {
        if (idx === current) return;
        
        bodies.forEach(body => {
          body.style.transition = "transform 0.32s cubic-bezier(0.4, 0.0, 0.2, 1)";
        });
        
        bodies.forEach((body, i) => {
          let offset = (i - idx) * window.innerWidth;
          body.style.transform = `translateX(${offset}px)`;
          body.style.pointerEvents = i === idx ? "auto" : "none";
          
          if (i === idx) {
            body.classList.add("active");
            body.style.zIndex = "2";
          } else {
            body.classList.remove("active");
            body.style.zIndex = "1";
          }
        });
        
        updateIndicators(idx);
        current = idx;
      });
    });
  
    initProfiles();
});



