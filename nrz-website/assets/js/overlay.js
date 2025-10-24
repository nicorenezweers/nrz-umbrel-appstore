      // ==========================
      // Overlay-Menü
      // ==========================
      const messageInput = document.getElementById('messageInput');
      const overlayMenu = document.getElementById('overlayMenu');
      const overlayBackdrop = document.getElementById('overlayBackdrop');
      const btnSend = document.getElementById('btnSend');
      const btnEmail = document.getElementById('btnEmail');
      const btnCancel = document.getElementById('btnCancel');

      function openOverlay() {
        overlayMenu.style.display = 'block';
        overlayBackdrop.style.display = 'block';
      }
      function closeOverlay() {
        overlayMenu.style.display = 'none';
        overlayBackdrop.style.display = 'none';
      }
      messageInput.addEventListener('click', (e) => {
        e.stopPropagation();
        openOverlay();
      });
      overlayBackdrop.addEventListener('click', closeOverlay);
      btnCancel.addEventListener('click', closeOverlay);
      btnSend.addEventListener('click', () => {
        const message = messageInput.value;
        if (message.trim()) {
          alert('Nachricht gesendet: ' + message);
          messageInput.value = '';
          closeOverlay();
        } else {
          alert('Bitte eine Nachricht eingeben!');
        }
      });
      btnEmail.addEventListener('click', () => {
        const message = messageInput.value;
        if (message.trim()) {
          window.location.href = `mailto:contact@nicorenezweers.com?subject=Nachricht&body=${encodeURIComponent(message)}`;
          messageInput.value = '';
          closeOverlay();
        } else {
          alert('Bitte eine Nachricht eingeben!');
        }
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeOverlay();
      });