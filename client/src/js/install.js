const installButton = document.getElementById("buttonInstall");

// Logic for installing the PWA
const handleBeforeInstallPrompt = (event) => {
  event.preventDefault(); // Prevent the default installation prompt
  installButton.style.display = "block"; // Show your custom install button
};

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

// Implement a click event handler on the `butInstall` element
installButton.addEventListener("click", async () => {
  installButton.style.display = "none"; // Hide the custom install button
  const promptEvent = window.beforeInstallPromptEvent;
  if (promptEvent) {
    promptEvent.prompt(); // Show the native installation prompt
    const choiceResult = await promptEvent.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the installation");
    } else {
      console.log("User dismissed the installation");
    }
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener("appinstalled", () => {
  console.log("App was successfully installed");
});
