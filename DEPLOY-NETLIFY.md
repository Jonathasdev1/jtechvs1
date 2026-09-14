# Publicar a loja na Netlify

A entrada atual é index.html, com style.css, script.js e img/. O código React em src/ não é carregado por essa página. server/index.js não existe. A loja atual não faz chamadas de API; usa imagens HTTPS e links de afiliados.

## Correções aplicadas

- npm run build executa node netlify-build.mjs, que copia a loja completa para dist/ sem precisar das dependências do Vite para gerar os arquivos.
- netlify.toml publica dist/, seleciona Node 20 e ignora scripts de instalação porque o build usa apenas módulos nativos do Node.
- package-lock.json fixa versões válidas e reproduzíveis das dependências.
- Os assets locais usam /style.css, /script.js e /img/... para funcionar também em URLs internas.
- O fallback /* -> /index.html (200) já existia e foi preservado. Não é necessário duplicá-lo em _redirects. Ele não implementa as páginas React nem endpoints de API.

## Configuração no painel

1. Confirme que o projeto Netlify está conectado a Jonathasdev1/jtechvs1 e à branch que contém suas alterações.
2. Em Project configuration > Build & deploy > Continuous deployment, deixe Base directory e Package directory vazios. O projeto e o package.json ficam na raiz do repositório.
3. Build command: npm run build. Publish directory: dist.
4. Execute um novo deploy e confira no log se aparece Netlify static build completed.
5. Confirme que o deploy de produção terminou com sucesso e que o domínio jtechvs1.netlify.app pertence a esse projeto.
6. Abra /, /style.css, /script.js e /img/logo.jpeg. CSS e JS devem retornar seus próprios conteúdos, nunca o HTML da página. Teste o menu em uma tela estreita e os links de ofertas.

## Validação local e alternativa manual

Execute npm run build (no PowerShell, use npm.cmd run build se npm.ps1 estiver bloqueado). A pasta dist deve conter index.html, style.css, script.js e img/.

Para publicação manual, envie o conteúdo gerado em dist para a Netlify. O netlify.toml fica fora de dist e suas regras não acompanham um upload manual; a página inicial estática funciona sem o fallback. Prefira o deploy pelo Git para aplicar toda a configuração.

## Limites e API

As imagens externas usam HTTPS, mas a disponibilidade de cada imagem e o destino final dos links encurtados não foram validados. Não existem fetch, Axios ou chamadas à API do Mercado Livre na loja atual. Não são necessárias credenciais para renderizar essa vitrine.

vite.config.ts contém um proxy /api para localhost:3001 apenas no desenvolvimento; ele não cria um backend na Netlify. Se futuramente adicionar uma API, implemente Functions ou um backend hospedado e configure suas rotas antes do fallback geral. O script dev atual também referencia o servidor ausente; essa configuração antiga não é usada pelo build estático corrigido.

Fontes: https://docs.netlify.com/build/configure-builds/monorepos/ e https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/
