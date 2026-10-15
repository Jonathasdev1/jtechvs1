const $ = (id) => document.getElementById(id);
const form = $('product-form');
let catalog, cards, template, editing = null, revision, token, local = false, dirty = false;
let nextId = 1;
const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const message = (text, error = false) => { $('message').textContent = text; $('message').classList.toggle('error', error); };
const number = (text) => Number(text.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.'));
const field = (name) => form.elements.namedItem(name);

function reset() {
  editing = null;
  form.reset();
  $('form-heading').textContent = `Novo produto • Card ${nextId}`;
  $('save').textContent = 'Criar produto';
}

function render() {
  $('count').textContent = `(${cards.length})`;
  const query = $('search').value.toLocaleLowerCase('pt-BR');
  $('products').replaceChildren();
  cards.filter(card => card.querySelector('h4').textContent.toLocaleLowerCase('pt-BR').includes(query)).forEach(card => {
    const row = document.createElement('div'); row.className = 'product-row';
    const id = document.createElement('small'); id.textContent = `Card ${card.dataset.productId}`;
    const title = document.createElement('p'); title.textContent = card.querySelector('h4').textContent;
    const actions = document.createElement('div'); actions.className = 'actions';
    const edit = document.createElement('button'); edit.type = 'button'; edit.textContent = 'Editar';
    edit.addEventListener('click', () => editCard(card));
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'danger'; remove.textContent = 'Excluir';
    remove.addEventListener('click', async () => {
      if (!confirm(`Excluir o card ${card.dataset.productId}: ${title.textContent}?`)) return;
      const updated = cards.filter(item => item !== card);
      await commit(updated, 'Produto excluído.');
    });
    actions.append(edit, remove); row.append(id, title, actions); $('products').append(row);
  });
  if (!$('products').childElementCount) $('products').textContent = 'Nenhum produto encontrado.';
}

function editCard(card) {
  editing = card.dataset.productId;
  const main = card.querySelector('.product-media img:not(.img-hover)');
  const hover = card.querySelector('.img-hover');
  const values = {
    title: card.querySelector('h4').textContent,
    image: main?.getAttribute('src') || '', imageAlt: main?.alt || '',
    hoverImage: hover?.getAttribute('src') || '', hoverAlt: hover?.alt || '',
    discount: Math.abs(number(card.querySelector('.discount-badge')?.textContent || '0')),
    price: number(card.querySelector('.current-price').textContent),
    oldPrice: number(card.querySelector('.old-price')?.textContent || '0'),
    affiliate: card.querySelector('.buy-button').getAttribute('href'),
  };
  Object.entries(values).forEach(([key, value]) => { field(key).value = value; });
  $('form-heading').textContent = `Editar produto • Card ${editing}`;
  $('save').textContent = 'Salvar alterações';
  field('title').focus();
  if (card.querySelector('[data-whatsapp]')) message('Este produto usa WhatsApp. Informe o link de afiliado para trocar o botão por “Ver oferta”.');
}

function serialize(updated) {
  const copy = catalog.cloneNode(true);
  const grid = copy.querySelector('.product-grid');
  grid.replaceChildren();
  updated.forEach(card => {
    grid.append(copy.createComment(` inicio card ${card.dataset.productId} `), card.cloneNode(true), copy.createComment(` final card ${card.dataset.productId} `));
  });
  grid.dataset.nextProductId = String(nextId);
  return '<!doctype html>\n' + copy.documentElement.outerHTML;
}

let saving = false;
async function commit(updated, success) {
  if (saving) return false;
  saving = true;
  document.querySelectorAll('button').forEach(button => { button.disabled = true; });
  try {
    if (local) {
      const response = await fetch('/api/catalog', { method: 'PUT', headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token }, body: JSON.stringify({ html: serialize(updated), revision }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Não foi possível salvar.');
      revision = data.revision;
    }
    cards = updated;
    dirty = !local;
    render(); reset();
    message(success + (local ? ' O index.html foi salvo. Atualize a vitrine para conferir.' : ' Baixe o index.html atualizado e publique para aplicar na vitrine.'));
    return true;
  } catch (error) { message(error.message, true); return false; }
  finally { saving = false; document.querySelectorAll('button').forEach(button => { button.disabled = false; }); }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (saving || !form.reportValidity()) return;
  const values = Object.fromEntries(new FormData(form));
  for (const key of ['image', 'hoverImage', 'affiliate']) {
    try {
      const url = new URL(values[key], location.href);
      if (!['https:', 'http:'].includes(url.protocol)) throw new Error();
    } catch { message(`Informe um endereço HTTP ou HTTPS válido no campo ${field(key).labels[0].textContent}.`, true); field(key).focus(); return; }
  }
  const card = (editing ? cards.find(item => item.dataset.productId === editing) : template).cloneNode(true);
  if (!editing) { card.dataset.category = 'casa'; card.dataset.productId = String(nextId++); }
  card.removeAttribute('hidden');
  card.querySelector('h4').textContent = values.title.trim();
  const main = card.querySelector('.product-media img:not(.img-hover)');
  main.setAttribute('src', values.image.trim()); main.alt = values.imageAlt.trim();
  let hover = card.querySelector('.img-hover');
  if (!hover) { hover = document.createElement('img'); hover.className = 'img-hover'; main.after(hover); }
  hover.setAttribute('src', values.hoverImage.trim()); hover.alt = values.hoverAlt.trim();
  for (const [selector, value, parent] of [
    ['discount-badge', `-${Number(values.discount)}%`, '.product-media'],
    ['current-price', money.format(Number(values.price)), '.price-line'],
    ['old-price', money.format(Number(values.oldPrice)), '.price-line'],
  ]) {
    let element = card.querySelector(`.${selector}`);
    if (!element) { element = document.createElement('span'); element.className = selector; card.querySelector(parent).append(element); }
    element.textContent = value;
  }
  const buy = card.querySelector('.buy-button');
  buy.href = values.affiliate.trim(); buy.removeAttribute('data-whatsapp');
  buy.target = '_blank'; buy.rel = 'noopener noreferrer';
  const icon = template.querySelector('.buy-button svg').cloneNode(true);
  buy.replaceChildren(icon, document.createTextNode(' Ver oferta'));
  const updated = editing ? cards.map(item => item.dataset.productId === editing ? card : item) : [...cards, card];
  const creating = !editing;
  if (!await commit(updated, creating ? `Card ${card.dataset.productId} criado.` : 'Produto atualizado.') && creating) nextId--;
});

$('new-product').addEventListener('click', () => { reset(); field('title').focus(); });
$('cancel').addEventListener('click', reset);
$('search').addEventListener('input', () => { if (cards) render(); });
$('download').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([serialize(cards)], { type: 'text/html;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'index.html'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  dirty = false;
  message('HTML gerado. Substitua o index.html do projeto pelo arquivo baixado e publique novamente.');
});
window.addEventListener('beforeunload', event => { if (dirty || saving) { event.preventDefault(); event.returnValue = ''; } });

async function init() {
  try {
    let html;
    try {
      const response = await fetch('/api/catalog', { cache: 'no-store' });
      if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json();
        if (data.token && data.html && data.revision) { ({ html, token, revision } = data); local = true; }
      }
    } catch { /* Hospedagem estática: exportar HTML. */ }
    if (!html) { const response = await fetch('./index.html', { cache: 'no-store' }); if (!response.ok) throw new Error('Não foi possível abrir o catálogo.'); html = await response.text(); }
    catalog = new DOMParser().parseFromString(html, 'text/html');
    cards = [...catalog.querySelectorAll('.product-grid > .product-card')];
    let reference = catalog.querySelector('#product-card-template');
    if (!cards.length && !reference) throw new Error('Nenhum modelo de card encontrado.');
    if (!reference) {
      reference = catalog.createElement('template'); reference.id = 'product-card-template';
      reference.content.append(cards[cards.length - 1].cloneNode(true));
      catalog.body.append(reference);
    }
    cards.forEach((card, index) => { card.dataset.productId ||= String(index + 1); });
    nextId = Math.max(Number(catalog.querySelector('.product-grid').dataset.nextProductId) || 1, ...cards.map(card => Number(card.dataset.productId) + 1));
    template = reference.content.querySelector('.product-card').cloneNode(true);
    $('storage-mode').textContent = local ? 'Modo local: criar, editar e excluir salva diretamente no index.html do projeto.' : 'Modo estático: alterações ficam nesta sessão. Baixe o index.html atualizado antes de sair e republique o site. Para salvar diretamente no projeto, execute npm run admin.';
    $('fields').disabled = false; $('new-product').disabled = false; $('download').disabled = false;
    render(); reset();
  } catch (error) { message(error.message + ' Abra o painel por um servidor HTTP, como npm run admin.', true); }
}
init();
