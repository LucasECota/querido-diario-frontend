# Requisitos — Querido Diário

## MVP (Produto Mínimo Viável)

### Definição

**Nome do MVP:** Tratamento de rotas inválidas com página 404 customizada

O MVP consiste em garantir que qualquer URL inexistente no site do
Querido Diário (frontend) resulte em uma experiência clara para o
usuário e em um sinal técnico correto para buscadores — ao invés do
comportamento atual, em que uma URL inválida carrega uma página em
branco e retorna status HTTP 200 (soft 404).

### O que o MVP entrega

1. Um componente de página 404 visível ao usuário, com mensagem clara
   e um botão de retorno à página inicial
2. Aplicação dinâmica da meta tag `<meta name="robots" content="noindex,
   nofollow">`, resolvendo o problema de indexação incorreta por
   buscadores (já que, sendo uma SPA, não é possível alterar o status
   HTTP retornado pelo servidor)
3. Uma rota coringa (`**`) que captura qualquer URL não mapeada nas
   rotas existentes da aplicação

### O que fica fora do escopo do MVP

- Redirecionamento automático por tempo — decisão consciente, já
  justificada na etapa de design thinking: prioriza dar controle ao
  usuário sobre a navegação, ao invés de forçar um redirecionamento
  sem explicação
- Sugestão de páginas relacionadas ou busca embutida na própria página
  404 — seria uma evolução futura, não essencial para resolver o
  problema central identificado
- Tratamento de erros de API ou falhas de rede — fora do escopo da
  issue tratada, que é especificamente sobre rotas inexistentes do
  frontend (não sobre falhas de backend)

### Justificativa de valor

- **Para o usuário** (conforme mapa de empatia, ver `/discovery/personas.md`):
  resolve diretamente a ambiguidade entre "não há resultado" e "erro
  técnico", e a falta de orientação sobre o que fazer a seguir
- **Para o projeto**: evita que buscadores indexem páginas quebradas
  como conteúdo válido, protegendo a qualidade dos resultados de busca
  do próprio site no Google
- **Para a comunidade open source**: resolve uma dívida técnica já
  identificada há tempo (issue #258, retomada na #369), demonstrando
  intenção ativa de contribuir com o projeto

### Justificativa de viabilidade

- Escopo pequeno e isolado: um componente novo + uma rota coringa, sem
  alterar nenhuma funcionalidade existente da aplicação
- Já validado tecnicamente: implementado, testado (5 testes unitários
  cobrindo criação do componente, aplicação da meta tag, definição do
  título da página, navegação e conteúdo visual) e comparado
  visualmente entre "antes" (produção) e "depois" (ambiente local)
- Não depende de mudanças em outros repositórios do ecossistema do
  Querido Diário (API, raspadores) — é uma solução inteiramente de
  frontend

## Backlog de Histórias de Usuário

### [1] Tratamento de rotas inválidas com página 404 (IMPLEMENTADA)

**Como** usuário do Querido Diário,
**quero** ser avisado claramente quando acesso uma URL inválida,
**para que** eu não fique confuso ou preso em uma página quebrada.

**Critério de aceite:**
> Dado que acesso uma URL que não existe no site
> Quando a página carrega
> Então vejo uma página de erro 404 clara, com a tag robots noindex/nofollow aplicada

**Cenários de teste:**
- URL inexistente → exibe página 404 customizada
- Meta tag `robots noindex, nofollow` presente no `<head>` da página 404
- Botão "Voltar para a página inicial" navega corretamente para `/`
- URLs válidas continuam funcionando normalmente (rota coringa não interfere nas demais rotas)

---

### [2] Padronização de banners do blog por categoria

**Como** leitor do blog do Querido Diário,
**quero** ver banners visuais consistentes e relacionados à categoria de cada postagem,
**para que** eu identifique rapidamente o tema do conteúdo antes de abrir o post.

**Critério de aceite:**
> Dado que acesso a listagem de postagens do blog
> Quando uma postagem pertence a uma categoria específica (ex: "Diário do Clima", "Comunidade e Tecnologia")
> Então vejo um banner padronizado e visualmente distinto para aquela categoria, ao invés da imagem genérica atual

**Cenários de teste:**
- Postagem com categoria definida → exibe banner específico da categoria
- Postagem sem categoria definida → exibe banner padrão/genérico
- Banners mantêm proporção e dimensão consistente entre categorias diferentes (não distorcem o layout)

---

### [3] Indicador de carregamento durante a busca

**Como** usuário realizando uma busca de diários oficiais,
**quero** ver um indicador visual enquanto os resultados carregam,
**para que** eu saiba que o sistema está processando minha busca e não travou.

**Critério de aceite:**
> Dado que realizo uma busca por um termo
> Quando a requisição à API ainda está em andamento
> Então vejo um indicador de carregamento (loading state) visível na área de resultados

**Cenários de teste:**
- Busca com resposta rápida → indicador aparece e desaparece de forma fluida, sem "piscar"
- Busca com resposta lenta (simulada) → indicador permanece visível durante toda a espera
- Erro na requisição → indicador é substituído por mensagem de erro, não fica travado indefinidamente

---

### [4] Mensagem clara para busca sem resultados

**Como** usuário realizando uma busca de diários oficiais,
**quero** ver uma mensagem explicativa quando minha busca não retorna nenhum resultado,
**para que** eu entenda que não há publicações correspondentes, e não ache que é um erro do sistema.

**Critério de aceite:**
> Dado que realizo uma busca por um termo
> Quando a API retorna zero resultados
> Então vejo uma mensagem clara informando que nenhuma publicação foi encontrada, com sugestão de ajustar os filtros de busca

**Cenários de teste:**
- Busca sem resultados → exibe mensagem específica de "nenhum resultado encontrado"
- Busca com resultados → mensagem de "sem resultados" não aparece
- Mensagem inclui sugestão acionável (ex: "tente termos diferentes" ou link para limpar filtros)

---

### [5] Filtro de busca por período (data inicial e final)

**Como** jornalista pesquisando publicações históricas,
**quero** filtrar os resultados de busca por um intervalo de datas,
**para que** eu encontre publicações de um período específico sem precisar revisar manualmente resultados irrelevantes.

**Critério de aceite:**
> Dado que estou na página de busca
> Quando seleciono uma data inicial e uma data final e realizo a busca
> Então os resultados exibidos pertencem exclusivamente ao intervalo selecionado

**Cenários de teste:**
- Intervalo de datas válido → resultados filtrados corretamente
- Data inicial posterior à data final → sistema exibe erro de validação e não realiza a busca
- Nenhuma data selecionada → busca funciona normalmente, sem filtro de período aplicado

## Priorização do MVP

[1] Tratamento de rotas inválidas com página 404 (IMPLEMENTADA)
[2] Padronização de banners do blog por categoria
[3] Indicador de carregamento durante a busca
[4] Mensagem clara para busca sem resultados
[5] Filtro de busca por período

**Justificativa da priorização:**

A história [1] foi escolhida para implementação no PR por ser a de maior impacto técnico com menor esforço de implementação: resolve simultaneamente um problema de experiência do usuário (confirmado pelo mapa de empatia) e um problema técnico de SEO (soft 404), afetando diretamente a confiabilidade da plataforma para buscadores e usuários que chegam por links externos.

As histórias [3] e [4] seriam as próximas candidatas naturais, por também tratarem de clareza de feedback ao usuário (tema recorrente identificado no discovery), mas exigem mudanças mais amplas na tela de busca, com maior superfície de teste e risco de regressão.

As histórias [2] e [5] dependem de decisões de design (banners) ou de mudanças na integração com a API (filtro de datas), exigindo alinhamento adicional com a equipe mantenedora antes de uma implementação completa.
