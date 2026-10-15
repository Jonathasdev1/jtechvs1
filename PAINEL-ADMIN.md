# Painel de produtos

Execute npm run admin (no PowerShell: npm.cmd run admin) e abra http://127.0.0.1:3001/admin.html.

Novo produto adiciona o proximo card (16 para o catalogo original). Editar preserva numero e categoria. Excluir pede confirmacao. Novos cards usam Casa, Mais vendido e Ver oferta.

No modo local, as alteracoes sao gravadas no index.html. Atualize a vitrine para conferir. index.html.admin-backup guarda a versao anterior a ultima gravacao. Edicoes externas no HTML exigem recarregar o painel antes de salvar.

Execute npm run build e republique para atualizar o site publico. O servidor administrativo escuta somente em 127.0.0.1 e deve permanecer local.

Na hospedagem estatica, /admin.html permite editar e baixar o index.html atualizado. As alteracoes ficam apenas na sessao ate o download. Substitua o HTML do projeto e republique. Nao existe gravacao remota ou login nesse modo; visitantes nao podem modificar o catalogo publicado. Administracao remota compartilhada exige um backend autenticado.
