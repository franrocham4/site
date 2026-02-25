# UsecoelhoBr – Site Institucional

Site institucional/landing page para a marca **UsecoelhoBr** (moda masculina minimalista), integrado à plataforma **Nuvemshop**.  
Construído com HTML, CSS e JavaScript puros — sem frameworks ou dependências externas.

---

## ⚙️ Como Configurar o Link da Nuvemshop

1. Abra o arquivo `js/config.js`.
2. Altere o valor de `NUVEMSHOP_URL` para o endereço da sua loja:

```js
const NUVEMSHOP_URL = 'https://usecoelhobr.nuvemshop.com.br';
```

> Todos os botões "Ir para a Loja" e CTAs da página serão atualizados automaticamente.

---

## 📁 Estrutura de Arquivos

```
site/
├── index.html              ← Landing page institucional
├── css/
│   └── styles.css          ← Tema minimal premium, responsivo
├── js/
│   ├── config.js           ← ⭐ Configure NUVEMSHOP_URL aqui
│   └── app.js              ← FAQ accordion, menu mobile, links da loja
├── assets/
│   ├── placeholder.png     ← Imagem de fallback
│   ├── hero.svg            ← Banner do hero (substitua por hero.jpg real)
│   ├── collection-1.svg    ← Card coleção Básicos (substitua por imagem real)
│   ├── collection-2.svg    ← Card coleção Minimalista (substitua por imagem real)
│   ├── collection-3.svg    ← Card coleção Premium (substitua por imagem real)
│   ├── sobre.svg           ← Imagem seção Sobre (substitua por imagem real)
│   └── products/
│       └── camiseta-basic/
│           ├── preto.png
│           ├── offwhite.png
│           ├── chumbo.png
│           └── verde.png
└── README.md
```

---

## 🖼️ Onde Colocar as Imagens

| Imagem           | Caminho                                  | Tamanho recomendado |
|------------------|------------------------------------------|---------------------|
| Banner hero      | `assets/hero.jpg`                        | 1200 × 600 px       |
| Coleção Básicos  | `assets/collection-1.jpg`               | 600 × 750 px        |
| Coleção Minimalista | `assets/collection-2.jpg`            | 600 × 750 px        |
| Coleção Premium  | `assets/collection-3.jpg`               | 600 × 750 px        |
| Seção Sobre      | `assets/sobre.jpg`                       | 800 × 900 px        |
| Destaque 1       | `assets/products/camiseta-basic/preto.png`    | 800 × 1000 px  |
| Destaque 2       | `assets/products/camiseta-basic/offwhite.png` | 800 × 1000 px  |
| Destaque 3       | `assets/products/camiseta-basic/verde.png`    | 800 × 1000 px  |

> Substitua os arquivos `.svg` pelos `.jpg` correspondentes e atualize os atributos `src` no `index.html`.

---

## 🚀 Como Publicar na Hostinger

### Opção 1 – Gerenciador de Arquivos (hPanel)

1. Acesse o **hPanel** da Hostinger: [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Vá em **Sites** → selecione seu domínio → **Gerenciar**.
3. Abra o **Gerenciador de Arquivos**.
4. Navegue até a pasta **`public_html`**.
5. Faça upload de **todos os arquivos e pastas** do projeto:
   - `index.html`
   - `css/`
   - `js/`
   - `assets/`
6. Acesse seu domínio no navegador — o site já estará no ar!

### Opção 2 – FTP (FileZilla ou similar)

| Campo  | Valor                      |
|--------|----------------------------|
| Host   | `ftp.seudominio.com.br`    |
| Usuário| (fornecido pela Hostinger) |
| Senha  | (fornecida pela Hostinger) |
| Porta  | `21`                       |

1. Conecte-se via FTP.
2. Navegue até `/public_html/`.
3. Faça upload de todos os arquivos do projeto.

---

## ✏️ Personalização Rápida

| O que mudar                   | Onde                                         |
|-------------------------------|----------------------------------------------|
| URL da loja Nuvemshop         | `js/config.js` → `NUVEMSHOP_URL`            |
| Número do WhatsApp            | `js/config.js` → `WA_NUMBER`                |
| URL do Instagram              | `js/config.js` → `IG_URL`                   |
| Cores/fontes do tema          | `css/styles.css` → variáveis CSS (`:root`)   |
| Textos (hero, FAQ, seções)    | `index.html`                                 |
| Imagens de coleções           | `assets/collection-*.svg` → `.jpg`           |

---

## 🛒 Integração com Nuvemshop

Este site é uma **landing page institucional** — o carrinho e o checkout são gerenciados diretamente pela plataforma Nuvemshop.

Os botões "Ir para a Loja", "Ver Coleção" e "Ver na Loja" direcionam o cliente para a URL configurada em `js/config.js`.

---

## 📬 Contato

- WhatsApp: [wa.me/5511956852081](https://wa.me/5511956852081)
- Instagram: [@usecoelhobr](https://instagram.com/usecoelhobr)

