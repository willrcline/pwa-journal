let deferredPrompt; // variable to hold the beforeinstallprompt event

// Grab the install button
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault(); // Prevent the mini info bar from appearing on mobile
    deferredPrompt = event; // Stash the event so it can be triggered later.
    butInstall.style.display = 'block'; // Update the install button visibility
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if(!deferredPrompt) { // if there's no deferredPrompt, exit the function.
        return;
    }
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // We've used the prompt, and can't use it again, so remove it
    deferredPrompt = null;
    // Log the install response
    console.log(`User response to install prompt: ${outcome}`);
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed');
});
