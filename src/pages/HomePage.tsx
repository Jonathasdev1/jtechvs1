import { Search, ShoppingCart, Menu, ChevronDown, ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Todos', icon: '✨' },
  { name: 'Tecnologia', icon: '💻' },
  { name: 'Casa', icon: '🏠' },
  { name: 'Escritório', icon: '📚' },
  { name: 'Presentes', icon: '🎁' },
];

const products = [
  {
    id: 1,
    title: 'Mouse sem fio ultralento',
    loja: 'Amazon',
    price: 'R$ 129,90',
    oldPrice: 'R$ 179,90',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
    discount: '35% OFF',
  },
  {
    id: 2,
    title: 'Cadeira ergonômica ajustável',
    loja: 'Mercado Livre',
    price: 'R$ 499,00',
    oldPrice: 'R$ 699,00',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    discount: '28% OFF',
  },
  {
    id: 3,
    title: 'Kit de organização para mesa',
    loja: 'Shopee',
    price: 'R$ 89,90',
    oldPrice: 'R$ 129,90',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    discount: '31% OFF',
  },
  {
    id: 4,
    title: 'Luminária inteligente LED',
    loja: 'AliExpress',
    price: 'R$ 159,90',
    oldPrice: 'R$ 219,00',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
    discount: '27% OFF',
  },
];

const reviews = [
  {
    title: 'Como escolher uma cadeira ideal para home office',
    type: 'Resenha',
    summary: 'Dicas simples para melhorar postura, conforto e produtividade.',
    image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Itens que deixam a mesa mais funcional',
    type: 'Dica',
    summary: 'Veja sugestões que ajudam a manter o ambiente mais organizado e bonito.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Presentes úteis que surpreendem sem exagerar',
    type: 'Dica',
    summary: 'Ideias práticas para presentear com estilo e utilidade real.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-[#0b1d57] text-white shadow-lg shadow-slate-900/10">
        <div className="bg-[#08163c] py-1.5">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-200">
            <span>Frete grátis acima de R$ 249</span>
            <span>Pagamento seguro</span>
            <span>Atendimento rápido</span>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 lg:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-lg font-bold shadow-sm">
              J
            </div>
            <div className="min-w-0">
              <div className="text-xl font-black tracking-[-0.08em]">J-TECH</div>
              <div className="text-[9px] uppercase tracking-[0.14em] text-slate-300">Transformando dados em presença digital</div>
            </div>
          </div>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <label className="flex w-full max-w-2xl items-center gap-3 rounded-full bg-white px-4 py-2.5 text-slate-700 shadow-sm">
              <Search className="h-4 w-4" />
              <input
                type="search"
                placeholder="Buscar produtos, marcas e muito mais..."
                className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button className="rounded-full bg-[#ffb703] px-4 py-2 text-sm font-bold text-slate-900">Buscar</button>
            </label>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
            <a href="#" className="transition hover:text-[#ffcf4d]">Início</a>
            <div className="group relative">
              <button className="flex items-center gap-1 transition hover:text-[#ffcf4d]">
                Categorias <ChevronDown className="h-4 w-4" />
              </button>
              <div className="invisible absolute left-0 top-full mt-3 w-44 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-soft transition group-hover:visible group-hover:opacity-100">
                {categories.slice(1).map((item) => (
                  <a key={item.name} href="#" className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">{item.name}</a>
                ))}
              </div>
            </div>
            <a href="#" className="transition hover:text-[#ffcf4d]">Resenhas</a>
            <a href="#" className="transition hover:text-[#ffcf4d]">Ofertas</a>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 lg:hidden">
              <Search className="h-4 w-4" />
            </button>
            <button className="hidden rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold lg:inline-flex">Login</button>
            <button className="inline-flex items-center gap-2 rounded-full border border-[#ffcf4d]/50 bg-[#ffcf4d]/10 px-3 py-2 text-sm font-bold text-[#ffe7a4]">
              <ShoppingCart className="h-4 w-4" />
              <span>Carrinho</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ffb703] text-[11px] text-slate-900">2</span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 lg:hidden">
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <section className="grid gap-6 py-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <span className="mb-4 inline-block rounded-full bg-brand-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">Curadoria premium</span>
            <h1 className="max-w-xl text-4xl font-black leading-[0.96] tracking-[-0.07em] text-slate-900 md:text-5xl">
              Produtos certos para elevar sua rotina e impressionar.
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-600 md:text-lg">
              Ofertas com valor real, itens com curadoria e variedade para casa, escritório e presentes.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#vitrine" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/20 transition hover:-translate-y-0.5 hover:bg-brand-500">
                Ver vitrine <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#ofertas" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-300 hover:bg-slate-100">
                Ver ofertas
              </a>
            </div>
          </div>

          <div className="relative min-h-[300px]">
            <div className="absolute left-4 top-8 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-soft">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">⭐ 4,9</div>
              <div className="mt-1 text-sm font-bold text-slate-900">Clientes satisfeitos</div>
            </div>
            <div className="absolute bottom-8 right-3 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-soft">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">⚡ Entrega</div>
              <div className="mt-1 text-sm font-bold text-slate-900">Rápida</div>
            </div>
            <div className="mx-auto flex h-[360px] max-w-[420px] items-center justify-center overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-indigo-100 shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80"
                alt="Produto em destaque"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button key={category.name} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${category.name === 'Todos' ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100'}`}>
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </section>

        <section id="ofertas" className="mb-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">Seleção especial</div>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-slate-900">Ofertas do dia</h2>
            </div>
            <a href="#" className="text-sm font-bold text-brand-700">Ver todos</a>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['-18%', 'Kit para casa', 'Organização e praticidade para o dia a dia.', 'R$ 149,90'],
              ['-12%', 'Presentes muito amados', 'Itens úteis com design moderno e leveza.', 'R$ 89,90'],
              ['-22%', 'Escolha criativa', 'Ideias práticas para surpreender em qualquer ocasião.', 'R$ 119,00'],
              ['-9%', 'Popular agora', 'Produtos com acabamento premium e uso diário.', 'R$ 59,90'],
            ].map(([tag, title, text, price]) => (
              <article key={title} className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-50 to-white p-5 shadow-sm">
                <span className="inline-flex rounded-full bg-[#ffefc1] px-2.5 py-1 text-xs font-bold text-[#8a5d00]">{tag}</span>
                <h3 className="mt-4 text-xl font-black tracking-[-0.04em] text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
                <strong className="mt-6 block text-2xl font-black text-brand-700">{price}</strong>
              </article>
            ))}
          </div>
        </section>

        <section id="vitrine" className="mb-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">Vitrine em destaque</div>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-slate-900">Produtos para você</h2>
            </div>
            <a href="#" className="text-sm font-bold text-brand-700">Ver todos</a>
          </div>

          <div className="space-y-10">
            <div>
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-2xl font-black tracking-[-0.05em] text-slate-900">Tecnologia</h3>
                <a href="#" className="text-sm font-bold text-brand-700">Ver todos</a>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {products.map((product) => (
                  <article key={product.id} className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-soft">
                    <div className="relative">
                      <img src={product.image} alt={product.title} className="h-56 w-full object-cover" loading="lazy" />
                      <span className="absolute left-3 top-3 rounded-full bg-[#ffebbc] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#815500]">{product.discount}</span>
                      <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-slate-700">{product.loja}</span>
                    </div>
                    <div className="space-y-3 p-4">
                      <h4 className="line-clamp-2 min-h-[48px] text-base font-bold leading-6 text-slate-900">{product.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black tracking-[-0.05em] text-brand-700">{product.price}</span>
                        {product.oldPrice && <span className="text-sm text-slate-400 line-through">{product.oldPrice}</span>}
                      </div>
                      <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-500">
                        <ShoppingCart className="h-4 w-4" />
                        Comprar Agora
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">Conteúdo útil</div>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-slate-900">Resenhas &amp; Dicas</h2>
            </div>
            <a href="#" className="text-sm font-bold text-brand-700">Ver todos</a>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((article) => (
              <article key={article.title} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <img src={article.image} alt={article.title} className="h-52 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">{article.type}</span>
                  <h3 className="mt-4 text-xl font-black tracking-[-0.05em] text-slate-900">{article.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{article.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 lg:px-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-lg font-black text-white">J</div>
              <div>
                <div className="text-xl font-black tracking-[-0.08em] text-slate-900">J-TECH</div>
                <div className="text-[9px] uppercase tracking-[0.14em] text-slate-500">Transformando dados em presença digital</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-slate-700">Institucional</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#">Sobre</a></li>
              <li><a href="#">Produtos</a></li>
              <li><a href="#">Ofertas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-slate-700">Redes</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Pinterest</a></li>
              <li><a href="#">TikTok</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 py-4 text-center text-sm text-slate-600">
          Esta página contém links de afiliado. Ao comprar por eles, podemos receber uma comissão, sem custo adicional para você.
        </div>
      </footer>
    </div>
  );
}
