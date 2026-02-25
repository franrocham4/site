# UsecoelhoBr – Site E-commerce

Site e-commerce estático para a marca **UsecoelhoBr** (roupa masculina).  
Construído com HTML, CSS e JavaScript puros — sem frameworks ou dependências externas.

---

## 📁 Estrutura de Arquivos

```
site/
├── index.html                        ← Home + vitrine de produtos
├── checkout.html                     ← Checkout + formulário + resumo do pedido
├── css/
│   └── styles.css                    ← Tema preto e branco, responsivo
├── js/
│   └── app.js                        ← Catálogo, carrinho (localStorage), checkout
├── assets/
│   ├── placeholder.png               ← Imagem de fallback
│   └── products/
│       └── camiseta-basic/
│           ├── preto.png             ← Substitua pela foto real
│           ├── offwhite.png          ← Substitua pela foto real
│           ├── chumbo.png            ← Substitua pela foto real
│           └── verde.png             ← Substitua pela foto real
└── README.md
```

---

## 🖼️ Como Adicionar as Imagens dos Produtos

1. Prepare as fotos da **Camiseta Basic** em cada cor (recomendado: 800×1000 px, formato JPG ou PNG).
2. Renomeie os arquivos conforme a tabela abaixo e substitua os placeholders na pasta correspondente:

| Cor       | Caminho do arquivo                                  |
|-----------|-----------------------------------------------------|
| Preto     | `assets/products/camiseta-basic/preto.png`          |
| Off-white | `assets/products/camiseta-basic/offwhite.png`       |
| Chumbo    | `assets/products/camiseta-basic/chumbo.png`         |
| Verde     | `assets/products/camiseta-basic/verde.png`          |

> Para adicionar novos produtos, edite o array `CATALOG` em `js/app.js`.

---

## 🛒 Funcionalidades

- **Vitrine** com seleção de cor (swatches) e tamanho (P/M/G/GG)
- **Carrinho** em drawer lateral com ajuste de quantidade e remoção de itens (persistido no `localStorage`)
- **Checkout** com formulário de dados do cliente (Nome, WhatsApp, CEP, Cidade/UF, Endereço, Obs.)
- **Geração de pedido** com ID único, salvo no histórico do `localStorage`
- **Link WhatsApp** formatado com todos os detalhes do pedido enviado para `+55 11 95685-2081`
- Layout **responsivo** (mobile-first), tema preto e branco

---

## 🚀 Como Subir na Hostinger

### Opção 1 – Painel de Controle (hPanel)

1. Acesse o **hPanel** da Hostinger: [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Vá em **Sites** → selecione seu domínio → **Gerenciar**.
3. Abra o **Gerenciador de Arquivos** (ou use o acesso FTP).
4. Navegue até a pasta **`public_html`**.
5. Faça upload de **todos os arquivos e pastas** do projeto:
   - `index.html`
   - `checkout.html`
   - `css/`
   - `js/`
   - `assets/`
6. Acesse seu domínio no navegador — o site já estará no ar!

### Opção 2 – FTP (FileZilla ou similar)

| Campo    | Valor                          |
|----------|--------------------------------|
| Host     | `ftp.seudominio.com.br`        |
| Usuário  | (fornecido pela Hostinger)     |
| Senha    | (fornecida pela Hostinger)     |
| Porta    | `21`                           |

1. Conecte-se via FTP.
2. Navegue até `/public_html/`.
3. Faça upload de todos os arquivos do projeto.

> **Dica:** Se quiser que o site fique em uma subpasta (ex.: `seudominio.com/loja`), crie a pasta dentro de `public_html` e faça o upload lá.

---

## ✏️ Personalização Rápida

| O que mudar                  | Onde                                          |
|------------------------------|-----------------------------------------------|
| Nome/preço/cores do produto  | `js/app.js` → array `CATALOG`                 |
| Número do WhatsApp           | `js/app.js` → `buildWhatsAppMessage` (wa.me)  |
| Cores/fontes do tema         | `css/styles.css` → variáveis CSS (`:root`)    |
| Textos (hero, FAQ, contato)  | `index.html`                                  |

---

## 📬 Contato

- WhatsApp: [wa.me/5511956852081](https://wa.me/5511956852081)
- Instagram: [@usecoelhobr](https://instagram.com/usecoelhobr)
