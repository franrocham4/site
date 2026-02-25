/**
 * UsecoelhoBr – app.js
 * Lógica de catálogo, carrinho (localStorage) e checkout (WhatsApp)
 */

/* =============================================
   CATÁLOGO DE PRODUTOS
   ============================================= */
const CATALOG = [
  {
    id: 'camiseta-basic',
    name: 'Camiseta Basic',
    price: 55.00,
    colors: [
      { name: 'Preto',     hex: '#1a1a1a', img: 'assets/products/camiseta-basic/preto.png'    },
      { name: 'Off-white', hex: '#f0ece0', img: 'assets/products/camiseta-basic/offwhite.png' },
      { name: 'Chumbo',    hex: '#6b6b6b', img: 'assets/products/camiseta-basic/chumbo.png'   },
      { name: 'Verde',     hex: '#3a5a40', img: 'assets/products/camiseta-basic/verde.png'     },
    ],
    sizes: ['P', 'M', 'G', 'GG'],
  },
];

/* =============================================
   CARRINHO (localStorage)
   ============================================= */
const CART_KEY = 'usecoelho_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(
    c => c.productId === item.productId && c.color === item.color && c.size === item.size
  );
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart(cart);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function updateQty(index, delta) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
}

function cartTotal(cart) {
  return cart.reduce((sum, c) => sum + c.price * c.qty, 0);
}

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* =============================================
   RENDERIZAR CATÁLOGO (index.html)
   ============================================= */
function renderCatalog() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  CATALOG.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;

    const defaultColor = product.colors[0];
    const defaultSize  = product.sizes[0];

    card.innerHTML = `
      <div class="product-image">
        <img
          src="${defaultColor.img}"
          alt="${product.name} – ${defaultColor.name}"
          class="product-img"
          onerror="this.src='assets/placeholder.png'"
          loading="lazy"
        />
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${formatBRL(product.price)}</div>

        <div class="color-selector">
          <div class="selector-label">Cor: <span class="selected-color-label">${defaultColor.name}</span></div>
          <div class="color-options">
            ${product.colors.map((c, i) => `
              <button
                class="color-swatch ${i === 0 ? 'active' : ''}"
                style="background:${c.hex}"
                data-color="${c.name}"
                data-img="${c.img}"
                title="${c.name}"
                aria-label="${c.name}"
              ></button>
            `).join('')}
          </div>
        </div>

        <div class="size-selector">
          <div class="selector-label">Tamanho: <span class="selected-size-label">${defaultSize}</span></div>
          <div class="size-options">
            ${product.sizes.map((s, i) => `
              <button class="size-btn ${i === 0 ? 'active' : ''}" data-size="${s}">${s}</button>
            `).join('')}
          </div>
        </div>

        <button class="add-to-cart-btn">Adicionar ao Carrinho</button>
      </div>
    `;

    /* ---- Event listeners do card ---- */
    // Cores
    card.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        card.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        card.querySelector('.selected-color-label').textContent = swatch.dataset.color;
        const img = card.querySelector('.product-img');
        img.src = swatch.dataset.img;
        img.alt = `${product.name} – ${swatch.dataset.color}`;
      });
    });

    // Tamanhos
    card.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        card.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        card.querySelector('.selected-size-label').textContent = btn.dataset.size;
      });
    });

    // Adicionar ao carrinho
    card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      const activeColor = card.querySelector('.color-swatch.active');
      const activeSize  = card.querySelector('.size-btn.active');

      if (!activeColor || !activeSize) {
        showToast('Selecione cor e tamanho.');
        return;
      }

      addToCart({
        productId: product.id,
        name:      product.name,
        price:     product.price,
        color:     activeColor.dataset.color,
        colorHex:  activeColor.style.background,
        colorImg:  activeColor.dataset.img,
        size:      activeSize.dataset.size,
      });

      showToast('✓ Adicionado ao carrinho!');
      renderCartDrawer();
      updateCartCount();
    });

    grid.appendChild(card);
  });
}

/* =============================================
   DRAWER DO CARRINHO
   ============================================= */
function renderCartDrawer() {
  const itemsEl = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('cart-subtotal-value');
  if (!itemsEl) return;

  const cart = getCart();

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
    if (subtotalEl) subtotalEl.textContent = formatBRL(0);
    return;
  }

  itemsEl.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <img
        class="cart-item-img"
        src="${item.colorImg || 'assets/placeholder.png'}"
        alt="${item.name}"
        onerror="this.src='assets/placeholder.png'"
      />
      <div class="cart-item-details">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-variant">${item.color} · ${item.size}</span>
        <span class="cart-item-price">${formatBRL(item.price)}</span>
        <div class="qty-control">
          <button class="qty-btn" data-action="dec" data-index="${i}">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-index="${i}">+</button>
        </div>
      </div>
      <button class="remove-item-btn" data-index="${i}" title="Remover">✕</button>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = formatBRL(cartTotal(cart));

  // Qty buttons
  itemsEl.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx   = parseInt(btn.dataset.index);
      const delta = btn.dataset.action === 'inc' ? 1 : -1;
      updateQty(idx, delta);
      renderCartDrawer();
      updateCartCount();
    });
  });

  // Remove buttons
  itemsEl.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(parseInt(btn.dataset.index));
      renderCartDrawer();
      updateCartCount();
    });
  });
}

function updateCartCount() {
  const cart  = getCart();
  const total = cart.reduce((sum, c) => sum + c.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
  });
}

function openCartDrawer() {
  document.getElementById('cart-overlay')?.classList.add('open');
  document.getElementById('cart-drawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

/* =============================================
   TOAST
   ============================================= */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

/* =============================================
   FAQ
   ============================================= */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* =============================================
   HAMBURGER MENU
   ============================================= */
function initHamburger() {
  const ham  = document.querySelector('.hamburger');
  const nav  = document.querySelector('.nav-links');
  if (!ham || !nav) return;
  ham.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

/* =============================================
   CHECKOUT PAGE
   ============================================= */
function renderOrderSummary() {
  const container = document.getElementById('summary-items');
  const totalEl   = document.getElementById('summary-total-value');
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-cart-message">Nenhum item no carrinho.<br><a href="index.html">Voltar à loja</a></p>';
    if (totalEl) totalEl.textContent = formatBRL(0);
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="summary-item">
      <div class="summary-item-name">
        ${item.name}<br>
        <span class="summary-item-qty">${item.color} · ${item.size} · Qtd: ${item.qty}</span>
      </div>
      <span class="summary-item-price">${formatBRL(item.price * item.qty)}</span>
    </div>
  `).join('');

  if (totalEl) totalEl.textContent = formatBRL(cartTotal(cart));
}

function generateOrderId() {
  const ts   = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `UCB-${ts}-${rand}`;
}

function saveOrderHistory(order) {
  const KEY = 'usecoelho_orders';
  const orders = JSON.parse(localStorage.getItem(KEY) || '[]');
  orders.unshift(order);
  localStorage.setItem(KEY, JSON.stringify(orders.slice(0, 50)));
}

function buildWhatsAppMessage(order) {
  const lines = [
    `🛒 *Novo Pedido UsecoelhoBr*`,
    `*ID:* ${order.id}`,
    ``,
    `*Cliente:* ${order.name}`,
    `*WhatsApp:* ${order.whatsapp}`,
    `*CEP:* ${order.cep}`,
    `*Cidade/UF:* ${order.cidade}`,
    `*Endereço:* ${order.endereco}`,
    order.obs ? `*Obs:* ${order.obs}` : null,
    ``,
    `*Itens:*`,
    ...order.items.map(i => `• ${i.name} – ${i.color} / ${i.size} x${i.qty} – ${formatBRL(i.price * i.qty)}`),
    ``,
    `*Total: ${formatBRL(order.total)}*`,
  ].filter(l => l !== null);

  return encodeURIComponent(lines.join('\n'));
}

function validateField(input) {
  const val = input.value.trim();
  const errorEl = input.parentElement.querySelector('.field-error');
  if (!val) {
    input.classList.add('error');
    if (errorEl) errorEl.textContent = 'Campo obrigatório.';
    return false;
  }
  input.classList.remove('error');
  if (errorEl) errorEl.textContent = '';
  return true;
}

function initCheckout() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  renderOrderSummary();

  // Máscara CEP
  const cepInput = document.getElementById('cep');
  if (cepInput) {
    cepInput.addEventListener('input', () => {
      cepInput.value = cepInput.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').substring(0, 9);
    });
  }

  // Máscara WhatsApp
  const waInput = document.getElementById('whatsapp');
  if (waInput) {
    waInput.addEventListener('input', () => {
      let v = waInput.value.replace(/\D/g, '');
      if (v.length > 11) v = v.substring(0, 11);
      if (v.length > 6) v = `(${v.substring(0,2)}) ${v.substring(2,7)}-${v.substring(7)}`;
      else if (v.length > 2) v = `(${v.substring(0,2)}) ${v.substring(2)}`;
      else if (v.length > 0) v = `(${v}`;
      waInput.value = v;
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const fields = form.querySelectorAll('input[required], textarea[required]');
    let valid = true;
    fields.forEach(f => { if (!validateField(f)) valid = false; });
    if (!valid) return;

    const cart = getCart();
    if (cart.length === 0) {
      showToast('Carrinho vazio!');
      return;
    }

    const order = {
      id:       generateOrderId(),
      name:     document.getElementById('nome').value.trim(),
      whatsapp: document.getElementById('whatsapp').value.trim(),
      cep:      document.getElementById('cep').value.trim(),
      cidade:   document.getElementById('cidade').value.trim(),
      endereco: document.getElementById('endereco').value.trim(),
      obs:      document.getElementById('obs').value.trim(),
      items:    [...cart],
      total:    cartTotal(cart),
      date:     new Date().toISOString(),
    };

    saveOrderHistory(order);
    clearCart();
    updateCartCount();

    // Exibir confirmação
    const formSection = document.querySelector('.checkout-form-section');
    const confirmation = document.getElementById('order-confirmation');
    if (formSection) formSection.style.display = 'none';
    if (confirmation) {
      document.getElementById('confirmed-order-id').textContent = order.id;
      confirmation.classList.add('visible');
    }

    // Botão WhatsApp
    const waBtn = document.getElementById('whatsapp-btn');
    if (waBtn) {
      const msg = buildWhatsAppMessage(order);
      waBtn.href = `https://wa.me/5511956852081?text=${msg}`;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  // Catálogo
  renderCatalog();
  updateCartCount();
  renderCartDrawer();

  // Carrinho – botão abrir
  document.getElementById('open-cart-btn')?.addEventListener('click', () => {
    renderCartDrawer();
    openCartDrawer();
  });

  // Carrinho – fechar
  document.getElementById('close-cart-btn')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCartDrawer);

  // FAQ
  initFAQ();

  // Hamburger
  initHamburger();

  // Checkout
  initCheckout();
});
