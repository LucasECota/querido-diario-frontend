(function (window) {
  window.__env = window.__env || {};

  // Override the default value to make sure it was loaded.
  window.__env.envFileLoaded = true;

  // URL base da API do Querido Diário
  if (typeof window.__env.apiUrl === 'undefined') {
    window.__env.apiUrl = 'https://api.queridodiario.ok.org.br';
  }

  // Max size of Querido Diário API results (THEMED_EXCERPT_FRAGMENT_SIZE)
  window.__env.qdApiSearchResultMaxSize = 10000;
}(this));
