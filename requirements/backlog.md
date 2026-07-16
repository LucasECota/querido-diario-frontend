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
