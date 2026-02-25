/**
 * UsecoelhoBr – app.js
 * Redirecionamento imediato para a loja Nuvemshop.
 * A URL é definida em js/config.js (NUVEMSHOP_URL).
 */

(function () {
  var url = (typeof NUVEMSHOP_URL !== 'undefined') ? NUVEMSHOP_URL : null;

  if (url) {
    /* Atualiza o href do botão e link de meta refresh */
    var btn = document.getElementById('store-btn');
    if (btn) btn.href = url;

    /* Redirecionamento via JS – redundância com meta refresh */
    window.location.replace(url);
  }
}());
