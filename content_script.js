function processPage() {
  const blurContainer = document.querySelector("div.blur-container");
  if (blurContainer) {
    blurContainer.remove();
  }

  document.oncontextmenu = null;
  document.onselectstart = null;
  document.ondragstart = null;

  // Remove event listeners for 'mousedown' and 'mouseup'
  document.body.removeEventListener('mousedown', disableEvent);
  document.body.removeEventListener('mouseup', disableEvent);

  // Enable CSS text selection
  const style = document.createElement('style');
  style.innerHTML = `
    * {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      user-select: text !important;
    }
  `;
  document.head.appendChild(style);
}

// Function to disable event listeners
function disableEvent(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

function init() {
  processPage();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        processPage();
      }
    }
  });

  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);
}

window.addEventListener("load", init);
