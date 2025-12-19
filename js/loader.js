// loader.js
// Fetches HTML partials (nav/footer) and injects them into placeholders.
// After injecting, it dynamically imports the main JS module.

async function insertPartial(name, placeholderId) {
  try {
    const res = await fetch(`partials/${name}.html`);
    if (!res.ok) throw new Error(`Failed to fetch partial: ${name}`);
    const html = await res.text();
    const container = document.getElementById(placeholderId);
    if (container) container.innerHTML = html;
  } catch (e) {
    console.error(e);
  }
}

async function load() {
  // insert nav and footer
  await Promise.all([
    insertPartial('nav', 'nav-placeholder'),
    insertPartial('footer', 'footer-placeholder')
  ]);

  // After DOM injection, import the main module
  try {
    await import('./main.js');
  } catch (e) {
    console.error('Failed to load main module', e);
  }
}

// Start loader once DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', load);
} else {
  load();
}
