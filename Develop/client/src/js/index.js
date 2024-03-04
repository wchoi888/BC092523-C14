// Import Workbox from workbox-window library for service worker management
import { Workbox } from "workbox-window";
// Import Editor class from editor.js
import Editor from "./editor";
// Import database.js to ensure IndexedDB initialization
import "./database";
import "../css/style.css";
// Select the main element from the DOM
const main = document.querySelector("#main");
// Clear any existing content in the main element
main.innerHTML = "";
// Function to display a loading spinner while the editor is loading
const loadSpinner = () => {
  // Create a spinner element
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  // Append the spinner to the main element
  main.appendChild(spinner);
};
// Initialize the editor
const editor = new Editor();

// If the editor is not initialized, display a loading spinner
if (typeof editor === "undefined") {
  loadSpinner();
}

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  // Create a new instance of Workbox for service worker management
  const workboxSW = new Workbox("./src-sw.js");
  // Register the Workbox service worker
  workboxSW.register();
} else {
  // Display an error message if service workers are not supported
  console.error("Service workers are not supported in this browser.");
}
