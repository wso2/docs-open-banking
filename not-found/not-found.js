/* Behaviour of 404.html: colour mode toggle, version dropdown and search. Plain script, no dependencies.
 * Everything that comes from the network (versions.json, search results) is written with textContent and
 * checked to be an http(s) URL; nothing is ever inserted as HTML. */
(function () {
  'use strict';

  var root = document.documentElement;
  function $(selector) {
    return document.querySelector(selector);
  }
  function isHttp(url) {
    return url.protocol === 'https:' || url.protocol === 'http:';
  }

  /* ---- Colour mode ---- */
  var themeButton = $('#theme-toggle');
  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function labelThemeButton() {
    themeButton.setAttribute('aria-label', currentTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  themeButton.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      window.localStorage.setItem('theme', next);
    } catch (e) {
      /* storage unavailable: the choice lasts for this page only */
    }
    labelThemeButton();
  });
  labelThemeButton();

  /* ---- Versions dropdown (same rules as the documentation navbar) ---- */
  var versionButton = $('#version-button');
  var versionLabel = $('#version-label');
  var versionMenu = $('#version-menu');
  var ABSOLUTE = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

  function addVersionItem(text, href, newTab) {
    var item = document.createElement('li');
    var link = document.createElement('a');
    link.textContent = text;
    link.href = href;
    if (newTab) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    item.appendChild(link);
    versionMenu.insertBefore(item, $('#version-show-all'));
  }
  function renderVersions(json) {
    var origin = window.location.origin;
    var all = json && typeof json === 'object' ? json.all : null;
    if (json && typeof json.current === 'string' && json.current.length <= 20) {
      versionLabel.textContent = json.current;
    }
    if (!Array.isArray(json && json.list) || !all || typeof all !== 'object') {
      return;
    }
    json.list.forEach(function (key) {
      if (typeof key !== 'string' || !Object.prototype.hasOwnProperty.call(all, key)) {
        return;
      }
      var entry = all[key];
      if (!entry || typeof entry.doc !== 'string') {
        return;
      }
      var url;
      try {
        url = new URL(entry.doc, origin + '/en/');
      } catch (e) {
        return;
      }
      if (!isHttp(url)) {
        return;
      }
      if (!ABSOLUTE.test(entry.doc) && url.origin === origin) {
        addVersionItem(key, url.pathname + url.search + url.hash, false);
      } else {
        addVersionItem(key, url.href, true);
      }
    });
  }
  function closeVersions() {
    versionMenu.hidden = true;
    versionButton.setAttribute('aria-expanded', 'false');
  }
  versionButton.addEventListener('click', function () {
    var open = versionMenu.hidden;
    versionMenu.hidden = !open;
    versionButton.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', function (event) {
    if (!versionMenu.hidden && !$('#version-dropdown').contains(event.target)) {
      closeVersions();
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !versionMenu.hidden) {
      closeVersions();
      versionButton.focus();
    }
  });
  (function loadVersions() {
    var controller = new AbortController();
    var timer = setTimeout(function () {
      controller.abort();
    }, 5000);
    fetch('/en/versions/assets/versions.json', { credentials: 'omit', signal: controller.signal })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }
        return response.json();
      })
      .then(renderVersions)
      .catch(function () {
        /* the menu keeps just "Show all" */
      })
      .then(function () {
        clearTimeout(timer);
      });
  })();

  /* ---- Search (the site's Algolia index, public search-only key) ---- */
  var searchButton = $('#search-button');
  var dialog = $('#search-dialog');
  var input = $('#search-input');
  var results = $('#search-results');
  var statusLine = $('#search-status');
  var config = searchButton.dataset;
  var validConfig = /^[A-Za-z0-9]+$/.test(config.appId || '') && /^[A-Za-z0-9_-]+$/.test(config.index || '');
  var keyLabel = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || '') ? '\u2318' : 'Ctrl';
  $('#search-key-1').textContent = keyLabel;

  var timer = null;
  var controller = null;
  var active = -1;

  function setStatus(text) {
    statusLine.textContent = text;
  }
  function clearResults() {
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }
    active = -1;
  }
  function highlight(index) {
    var links = results.querySelectorAll('a');
    if (links.length === 0) {
      return;
    }
    active = (index + links.length) % links.length;
    links.forEach(function (link, position) {
      link.classList.toggle('active', position === active);
    });
    links[active].scrollIntoView({ block: 'nearest' });
  }
  function clip(text, max) {
    text = String(text || '').replace(/\u00B6/g, '').replace(/\s+/g, ' ').trim();
    return text.length > max ? text.slice(0, max - 1) + '\u2026' : text;
  }
  function renderHits(hits) {
    clearResults();
    hits.forEach(function (hit) {
      var url;
      try {
        url = new URL(String(hit.url), window.location.origin);
      } catch (e) {
        return;
      }
      if (!isHttp(url)) {
        return;
      }
      var levels = [];
      var hierarchy = hit.hierarchy || {};
      ['lvl0', 'lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6'].forEach(function (name) {
        if (typeof hierarchy[name] === 'string' && hierarchy[name]) {
          levels.push(clip(hierarchy[name], 80));
        }
      });
      if (levels.length === 0) {
        return;
      }
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.href = url.href;
      if (levels.length > 1) {
        var crumbs = document.createElement('span');
        crumbs.className = 'crumbs';
        crumbs.textContent = levels.slice(0, -1).join(' \u203A ');
        link.appendChild(crumbs);
      }
      var title = document.createElement('span');
      title.className = 'hit-title';
      title.textContent = levels[levels.length - 1];
      link.appendChild(title);
      if (hit.type === 'content' && typeof hit.content === 'string' && hit.content) {
        var snippet = document.createElement('span');
        snippet.className = 'snippet';
        snippet.textContent = clip(hit.content, 140);
        link.appendChild(snippet);
      }
      li.appendChild(link);
      results.appendChild(li);
    });
    if (results.children.length === 0) {
      setStatus('No results for \u201C' + clip(input.value, 60) + '\u201D.');
    } else {
      setStatus('');
      highlight(0);
    }
  }
  function runSearch() {
    var query = input.value.trim();
    if (controller) {
      controller.abort();
    }
    if (!query) {
      clearResults();
      setStatus('');
      return;
    }
    if (!validConfig) {
      setStatus('Search is not available right now.');
      return;
    }
    controller = new AbortController();
    var mine = controller;
    fetch('https://' + config.appId + '-dsn.algolia.net/1/indexes/' + encodeURIComponent(config.index) + '/query', {
      method: 'POST',
      credentials: 'omit',
      signal: mine.signal,
      headers: {
        'Content-Type': 'application/json',
        'X-Algolia-Application-Id': config.appId,
        'X-Algolia-API-Key': config.apiKey,
      },
      body: JSON.stringify({
        query: query,
        hitsPerPage: 12,
        facetFilters: ['language:en', 'version:' + config.version],
        attributesToRetrieve: ['hierarchy', 'url', 'type', 'content'],
        attributesToHighlight: [],
        attributesToSnippet: [],
      }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        if (mine === controller) {
          renderHits(Array.isArray(data && data.hits) ? data.hits : []);
        }
      })
      .catch(function (error) {
        if (error && error.name === 'AbortError') {
          return;
        }
        if (mine === controller) {
          clearResults();
          setStatus('Search is not available right now.');
        }
      });
  }
  function openSearch() {
    if (dialog.open) {
      return;
    }
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    input.value = '';
    clearResults();
    setStatus('');
    input.focus();
  }
  function closeSearch() {
    if (controller) {
      controller.abort();
    }
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }
  searchButton.addEventListener('click', openSearch);
  $('#search-close').addEventListener('click', closeSearch);
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) {
      closeSearch();
    }
  });
  input.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(runSearch, 200);
  });
  input.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      highlight(active + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      highlight(active - 1);
    } else if (event.key === 'Enter') {
      var links = results.querySelectorAll('a');
      if (links[active]) {
        event.preventDefault();
        window.location.href = links[active].href;
      }
    }
  });
  document.addEventListener('keydown', function (event) {
    var target = event.target;
    var typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
    if (event.key === 'Escape' && dialog.open) {
      event.preventDefault();
      closeSearch();
    } else if ((event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      openSearch();
    } else if (event.key === '/' && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      openSearch();
    }
  });
})();
