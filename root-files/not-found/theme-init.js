/* Sets the colour mode before the first paint. Same storage key as the documentation sites ('theme'),
 * so a choice made there carries over to this page and back. Falls back to the OS setting. */
(function () {
  var theme = null;
  try {
    theme = window.localStorage.getItem('theme');
  } catch (e) {
    /* storage unavailable: use the OS setting */
  }
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
})();
