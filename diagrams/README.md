# Diagramas UML — Querido Diário

Diagramas baseados no MVP implementado (correção da issue #369 —
tratamento de rotas inválidas com página 404 customizada). Feitos com
Mermaid.js.

## Diagrama de Sequência (`sequencia.mmd` / `sequencia.png`)

Mostra a interação passo a passo entre o usuário, o navegador, o Angular
Router e o `NotFoundComponent` em dois momentos:

1. **Acesso a uma URL inválida**: o Router não encontra nenhuma rota
   correspondente, ativa a rota coringa (`**`) e instancia o
   `NotFoundComponent`. O componente aplica a meta tag `robots
   noindex/nofollow` (via `Meta` service) e atualiza o título da aba
   (via `Title` service) antes de renderizar a página para o usuário.
2. **Clique no botão de retorno**: o componente chama o `Router` para
   navegar de volta à página inicial.

Esse diagrama evidencia que a correção não depende do servidor alterar
o status HTTP (impossível numa SPA) — toda a lógica de sinalização para
buscadores acontece no lado do cliente, através dos serviços do Angular.

## Diagrama de Classes (`classes.mmd` / `classes.png`)

Mostra a estrutura interna do `NotFoundComponent` e suas dependências.
O componente não possui lógica de negócio complexa: ele injeta três
serviços nativos do Angular (`Meta`, `Title`, `Router`) e os utiliza em
dois métodos:
- `ngOnInit()`: aplica a meta tag e o título assim que o componente é
  carregado
- `goHome()`: aciona a navegação de retorno quando o usuário clica no
  botão

O diagrama também mostra a relação de dependência entre o
`AppRoutingModule` e o `NotFoundComponent`, já que é o módulo de rotas
quem declara a rota coringa que ativa esse componente.

## Diagrama de Componentes (`componentes.mmd` / `componentes.png`)

Mostra onde o `NotFoundComponent` se encaixa na arquitetura geral do
frontend do Querido Diário, em três camadas:

- **Frontend**: os componentes de página da aplicação (Home, Search,
  Blog, e o novo NotFound), todos registrados no `AppModule` e
  roteados pelo `AppRoutingModule`
- **Angular Core Services**: os serviços nativos do framework
  utilizados pela correção (`Meta`, `Title`, `Router`)
- **Externo**: os atores externos ao sistema — o usuário, que acessa
  URLs, e os buscadores (Google, Bing), que são impedidos de indexar
  a página de erro através da meta tag aplicada

Esse diagrama deixa claro que a solução é isolada: o `NotFoundComponent`
só se conecta a serviços já existentes do próprio Angular, sem exigir
nenhuma mudança em outros componentes de página ou em outros
repositórios do ecossistema do Querido Diário (API, raspadores).

## Ferramenta utilizada

Todos os diagramas foram escritos em sintaxe [Mermaid](https://mermaid.js.org/)
e renderizados via [mermaid.live](https://mermaid.live). O código-fonte
de cada diagrama está versionado nos arquivos `.mmd` correspondentes,
permitindo edição e regeneração futura sem depender das imagens PNG.