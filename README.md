# UsecoelhoBr – Site

Página de redirecionamento imediato para a loja **UsecoelhoBr** na Nuvemshop.  
Construída com HTML, CSS e JavaScript puros — sem dependências externas.

---

## ⚙️ Como Trocar a URL da Nuvemshop

1. Abra o arquivo `js/config.js`.
2. Altere o valor de `NUVEMSHOP_URL`:

```js
const NUVEMSHOP_URL = 'https://usecoelhobr.nuvemshop.com.br';
```

3. No `index.html`, atualize também a tag `<meta http-equiv="refresh">` com a mesma URL:

```html
<meta http-equiv="refresh" content="0;url=https://usecoelhobr.nuvemshop.com.br" />
```

> Isso garante dupla redundância: o JS redireciona imediatamente; o meta refresh é o fallback caso o JS esteja desabilitado.

---

## 📁 Estrutura de Arquivos

```
site/
├── index.html              ← Página de redirecionamento + fallback visual
├── css/
│   └── styles.css          ← Tema minimal premium
├── js/
│   ├── config.js           ← ⭐ Configure NUVEMSHOP_URL aqui
│   └── app.js              ← Redirecionamento via window.location.replace
├── assets/
│   └── logo-coelho.svg     ← Logo do coelho (preto/branco)
└── README.md
```

---

## 🚀 Como Publicar na Hostinger

### Opção 1 – Gerenciador de Arquivos (hPanel)

1. Acesse o **hPanel** da Hostinger: [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Vá em **Sites** → selecione seu domínio → **Gerenciar**.
3. Abra o **Gerenciador de Arquivos**.
4. Navegue até a pasta **`public_html`**.
5. Faça upload de **todos os arquivos e pastas** do projeto (usando caminhos relativos):
   - `index.html`
   - `css/`
   - `js/`
   - `assets/`
6. Acesse seu domínio no navegador — o redirecionamento já estará ativo!

### Opção 2 – FTP (FileZilla ou similar)

| Campo   | Valor                      |
|---------|----------------------------|
| Host    | `ftp.seudominio.com.br`    |
| Usuário | (fornecido pela Hostinger) |
| Senha   | (fornecida pela Hostinger) |
| Porta   | `21`                       |

1. Conecte-se via FTP.
2. Navegue até `/public_html/`.
3. Faça upload de todos os arquivos do projeto.

---

## ✏️ Personalização Rápida

| O que mudar           | Onde                                |
|-----------------------|-------------------------------------|
| URL da loja Nuvemshop | `js/config.js` → `NUVEMSHOP_URL` e `<meta http-equiv="refresh">` em `index.html` |
| Logo do coelho        | `assets/logo-coelho.svg`            |

---

## 📬 Contato

- Instagram: [@usecoelhobr](https://instagram.com/usecoelhobr)
