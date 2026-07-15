# Discovery — Querido Diário

## 1. Descrição do sistema

O **Querido Diário** é um projeto de software livre mantido pela Open
Knowledge Brasil (OKBR) que coleta, processa e disponibiliza diários
oficiais de milhares de municípios brasileiros em uma plataforma de busca
única e gratuita.

O ecossistema é dividido em múltiplos repositórios:
- **querido-diario**: raspadores (scrapers) que coletam os diários dos
  sites das prefeituras
- **querido-diario-data-processing**: extrai texto de PDFs/ODTs e indexa
  o conteúdo para busca
- **querido-diario-api**: API que serve os dados processados
- **querido-diario-frontend**: interface web de busca (repositório
  escolhido para este trabalho)

O frontend é uma aplicação Angular (TypeScript) que permite qualquer
cidadão, jornalista ou pesquisador buscar publicações oficiais por
município, período e termo, sem precisar vasculhar manualmente PDFs nos
sites de cada prefeitura.

## 2. Jobs to Be Done (JTBD)

**Qual problema o sistema resolve?**
Antes do Querido Diário, encontrar uma publicação oficial específica (uma
nomeação, uma licitação, um decreto) exigia acessar individualmente o site
de cada prefeitura — muitos deles com interfaces ruins, sem busca, ou
publicando só em PDFs escaneados. O QD centraliza, indexa e torna
pesquisável esse conteúdo.

**Qual "trabalho" o usuário deseja realizar?**
> Como cidadão/jornalista/pesquisador, quero encontrar rapidamente uma
> publicação oficial específica, para fiscalizar atos do poder público ou
> obter uma informação sem depender de burocracia ou sistemas ruins de
> cada prefeitura.

**Onde há falhas ou oportunidades?**
Durante a exploração do repositório frontend, identificamos que o
tratamento de rotas inválidas (URLs que não existem no site) era
inadequado: a aplicação, sendo uma SPA (Single Page Application),
retornava status HTTP 200 para qualquer URL, mesmo inexistente, sem exibir
nenhuma mensagem de erro ao usuário. Isso gera dois problemas:
1. **Experiência do usuário**: quem acessa um link quebrado (ex: vindo de
   uma busca desatualizada no Google, ou um link compartilhado errado) cai
   em uma página em branco, sem explicação nem caminho de volta.
2. **SEO / indexação**: por retornar status 200, buscadores podem indexar
   essas URLs inválidas como se fossem conteúdo legítimo, poluindo os
   resultados de busca do próprio site (fenômeno conhecido como "soft
   404").

Essa falha já havia sido identificada anteriormente pela comunidade na
issue #258 (fechada sem implementação) e retomada na issue #369, após uma
correção parcial de rotas feita no PR #367.

## 3. Evidências

### 3.1 Comportamento atual em produção

Ao acessar uma URL inválida no site em produção
(`queridodiario.ok.org.br/pagina-que-nao-existe-123`), a página carrega em
branco, exibindo apenas o menu de navegação e o rodapé — sem nenhum
conteúdo central ou mensagem informando o erro (ver `evidencias/producao-tela-branco.png`).

### 3.2 Confirmação técnica via DevTools (Network)

A aba Network do navegador confirma que a requisição do documento HTML
retorna **status 200 OK**, mesmo a URL sendo inválida — a evidência técnica
do "soft 404" (ver `evidencias/producao-status-200.png`).

### 3.3 Ausência da meta tag robots em produção

Inspecionando o `<head>` da página em produção, confirma-se que não existe
nenhuma tag `<meta name="robots" content="noindex, nofollow">`, ou seja,
não há qualquer sinalização para os buscadores não indexarem essa URL
inválida.

### 3.4 Comportamento após a correção (ambiente local)

Após a implementação da correção (branch `fix/pagina-404-soft-404`), a
mesma URL inválida passa a exibir uma página 404 customizada, com
mensagem clara e botão de retorno à página inicial, além da meta tag
`robots noindex, nofollow` presente no `<head>` (ver
`evidencias/local-pagina-404.png` e `evidencias/local-meta-tag.png`).

### 3.5 Issues e PRs relacionados
- Issue #258 (fechada, sem implementação): primeira menção ao problema
- PR #367 (mesclado): corrigiu parte do tratamento de status das rotas
- Issue #369 (aberta): retoma o problema específico do tratamento de
  rotas 404, escolhida como escopo deste trabalho

## 4. Critério de escolha do projeto

- **Atividade recente**: repositório com commits e PRs frequentes
- **Usuários reais**: plataforma pública usada por jornalistas,
  pesquisadores e cidadãos, cobrindo diários oficiais de milhares de
  municípios brasileiros
- **Código acessível**: stack Angular/TypeScript, compatível com o
  conhecimento da dupla