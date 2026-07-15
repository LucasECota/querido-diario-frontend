# Design Thinking com IA — Querido Diário

## 1. Personas

### Persona 1 — Mariana Costa, Jornalista Investigativa

**Idade:** 34 anos
**Ocupação:** Repórter de jornalismo de dados em veículo regional

**Objetivos:**
- Encontrar rapidamente publicações oficiais específicas (nomeações,
  licitações, contratos) usando nome, data ou termo de busca
- Cruzar informações de diários oficiais de múltiplos municípios no
  mesmo dia, sob prazo de fechamento de matéria
- Confiar que a ausência de resultado significa "não existe essa
  publicação" e não "o sistema falhou"

**Frustrações:**
- Links de busca antigos (compartilhados por fontes, ou indexados pelo
  Google) que apontam para URLs que não existem mais
- Não conseguir diferenciar visualmente entre "sem resultados" e "erro
  técnico"
- Perder tempo de apuração por causa de falhas de navegação no próprio
  site de busca

---

### Persona 2 — Roberto Almeida, Cidadão Fiscalizador

**Idade:** 58 anos
**Ocupação:** Aposentado, ex-servidor público, ativista comunitário local

**Objetivos:**
- Verificar se uma obra, contrato ou decisão prometida pela prefeitura
  foi de fato publicada oficialmente
- Compartilhar links de publicações específicas em grupos de WhatsApp da
  comunidade
- Ter confiança de que, ao clicar em um link, vai chegar a algum lugar
  compreensível — mesmo que seja um erro

**Frustrações:**
- Baixa familiaridade técnica: quando uma página não carrega direito,
  tende a assumir que o erro é dele, não do sistema
- Abandona a busca com facilidade diante de qualquer comportamento
  inesperado da interface
- Falta de orientação clara sobre o que fazer quando um link não
  funciona

## 2. Mapa de Empatia (síntese das duas personas)

**O que pensam e sentem?**
- Desconfiança quando uma página não carrega como esperado
- Ansiedade ligada a prazo (Mariana) ou insegurança técnica (Roberto)
- Incerteza: "isso é erro meu ou do site?"

**O que veem?**
- Resultados de busca do Google apontando para links que não existem
  mais no site
- Uma interface que, ao falhar, não dá nenhuma pista do que aconteceu
  (tela em branco)
- Um site que parece confiável no restante da navegação, o que torna a
  falha ainda mais confusa

**O que falam e fazem?**
- Mariana: tenta reformular a busca, testa o link de novo, e se
  persistir, entra em contato direto com a prefeitura — perdendo tempo
  de apuração
- Roberto: assume que "o site caiu" ou que ele "fez algo errado", fecha
  a aba e não tenta de novo tão cedo
- Ambos: se o link foi compartilhado por terceiros (fonte, colega, grupo
  de WhatsApp), ficam inseguros se o problema é do link ou do site

**Dores:**
- Ambiguidade entre "não há resultado para essa busca" e "erro técnico
  na página"
- Ausência de qualquer orientação sobre o que fazer a seguir
- Perda de confiança na ferramenta após um comportamento inesperado

**Ganhos desejados:**
- Clareza imediata sobre o que aconteceu (é um erro, não uma falha
  silenciosa)
- Um caminho visível de volta à busca, sem precisar fechar a aba e
  recomeçar do zero
- Confirmação de que o site continua confiável mesmo quando algo dá
  errado

## 3. Exploração de ideias de solução

Partindo das dores e ganhos desejados identificados no mapa de empatia,
avaliamos três caminhos possíveis antes de convergir para a solução
implementada:

**Ideia 1 — Página de erro 404 genérica (texto simples, sem
estilização)**
Resolveria a falta de mensagem, mas não trata o problema técnico de SEO
(a aplicação SPA continuaria retornando status 200, permitindo
indexação incorreta por buscadores). Descartada por resolver só
parcialmente o problema.

**Ideia 2 — Redirecionamento automático imediato para a home, sem
explicação**
Rápida de implementar, mas conflita diretamente com o ganho desejado
identificado no mapa de empatia: clareza imediata sobre o que aconteceu.
Para a persona Roberto, um redirecionamento silencioso reforçaria a
sensação de "não entendi o que houve". Descartada por priorizar
velocidade em detrimento da confiança do usuário.

**Ideia 3 — Página 404 customizada, com mensagem clara, botão de retorno
manual e meta tag `robots noindex/nofollow`** ✅ **Escolhida**
Atende diretamente às duas dores centrais do mapa de empatia:
ambiguidade (mensagem explica o que aconteceu) e falta de orientação
(botão dá um caminho claro de ação). Resolve também o problema técnico
de indexação, sem depender de mudança de status HTTP no servidor —
abordagem adequada para uma SPA. Dá ao usuário controle sobre a
navegação, preservando a confiança na ferramenta mesmo diante do erro.

Essa foi a solução implementada na correção da issue #369.

## 4. Prompts utilizados

> "Gere 2 personas para o Querido Diário considerando jornalistas e
> cidadãos comuns, com objetivos e frustrações"

Prompt de continuidade (solicitando o mapa de empatia a partir das
personas já geradas):
> "sim" (em resposta à pergunta "quer que eu monte o mapa de empatia
> agora com base nessas duas personas?")


## 5. Reflexão crítica

**Onde a IA ajudou bem:**
- Estruturação rápida de personas plausíveis e coerentes com o público
  real do Querido Diário (confirmado durante a fase de discovery, ao
  ler a documentação oficial do projeto)
- Conexão explícita entre as dores do mapa de empatia e a justificativa
  técnica de cada ideia de solução avaliada
- Organização do raciocínio de descarte de alternativas (idea 1 e 2),
  deixando claro o porquê da escolha final

**Onde foi necessário julgamento humano:**
- Validação de que as personas geradas correspondem à realidade do
  público do Querido Diário, e não a estereótipos genéricos de
  "usuário de sistema público" — a dupla verificou a coerência com o
  discovery já feito antes de aceitar o conteúdo
- Decisão final sobre qual ideia de solução implementar não foi
  delegada à IA: a Ideia 3 foi escolhida porque já era a solução
  tecnicamente adequada identificada durante a implementação real (via
  meta tag robots), e o exercício de design thinking serviu para
  confirmar e justificar essa escolha sob a ótica do usuário, não para
  decidir às cegas
- Revisão crítica de que a "Ideia 2" (redirecionamento automático) era
  uma alternativa genuína considerada durante a implementação.