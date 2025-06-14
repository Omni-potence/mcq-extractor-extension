// popup.js

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleSelectionMode');

  if (toggleButton) {
    toggleButton.addEventListener('click', async () => {
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        if (tabs[0]) {
          try {
            // Inject content script programmatically to ensure it's loaded
            await chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              files: ['contentScript.js']
            });
            await chrome.scripting.insertCSS({
              target: { tabId: tabs[0].id },
              files: ['ui.css']
            });
            console.log("Content script and CSS injected from popup.");
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggleSelectionMode" });
          } catch (e) {
            console.error("Failed to inject content script or send message from popup:", e);
          }
        }
      });
    });
  }
});
