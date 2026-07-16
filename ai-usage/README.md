# Uso de Inteligência Artificial — Querido Diário

Este documento reúne, de forma transparente, os prompts reais utilizados
pela dupla ao longo do trabalho, com apoio do assistente de IA Claude
(Anthropic), incluindo as decisões tomadas a partir das respostas
obtidas e a avaliação crítica sobre cada uso.

## 1. Uso na fase de Discovery e Design Thinking

### Personas

**Prompt utilizado:**
> "Gere 2 personas para o Querido Diário considerando jornalistas e
> cidadãos comuns, com objetivos e frustrações"

**Resultado:** duas personas (Mariana Costa, jornalista investigativa, e
Roberto Almeida, cidadão fiscalizador), com objetivos e frustrações
específicos de cada perfil.

**Avaliação crítica:** os perfis gerados foram validados pela dupla
contra o que já havia sido levantado na etapa de discovery (leitura da
documentação oficial do projeto, que descreve jornalistas e cidadãos
como público central da plataforma). Não foram aceitos sem checagem —
a dupla confirmou que os objetivos descritos fazem sentido com o
propósito real do Querido Diário antes de incorporar ao documento final.

### Mapa de empatia

**Prompt utilizado:**
> "sim" (em resposta à pergunta "quer que eu monte o mapa de empatia
> agora com base nessas duas personas?")

**Resultado:** mapa de empatia sintetizando o que as duas personas
pensam/sentem, veem, falam/fazem, suas dores e ganhos desejados.

**Avaliação crítica:** o mapa foi usado para embasar diretamente a
escolha de solução técnica (ver seção "Exploração de ideias" abaixo),
funcionando como critério objetivo de decisão, e não apenas como
exercício descritivo isolado.

### Exploração de ideias de solução

**Prompt utilizado:**
> "sim" (em resposta à pergunta "quer que eu sugira esse próximo prompt
> pra você rodar, ou prefere que eu já monte essa parte também?")

**Resultado:** três alternativas de solução avaliadas (página 404
genérica, redirecionamento automático, página 404 customizada com meta
tag), com prós e contras de cada uma.

**Avaliação crítica:** a decisão final não foi delegada à IA. A
alternativa escolhida (página 404 customizada) já era a solução
tecnicamente correta identificada durante a implementação real do
código — o exercício de design thinking serviu para confirmar e
justificar essa escolha sob a ótica das personas, não para decidir às
cegas a partir da sugestão da IA.

## 2. Uso na fase de Requisitos (Refinamento de histórias e testes)

**Prompt utilizado:**
> "Refine a história [3] (indicador de carregamento durante a busca) —
> os critérios de aceite estão genéricos demais, deixe mais específico.
> Também sugira mais 2 cenários de teste além dos que já estão lá."

**Resultado:** o critério de aceite original (genérico, sem limites de
tempo definidos) foi reescrito com valores objetivos e testáveis (limite
de 100ms para exibição do indicador, timeout de 10 segundos com
tratamento de erro). Foram sugeridos 2 cenários de teste adicionais:
requisição concluída antes do indicador aparecer, e requisição que
ultrapassa o tempo limite.

**Avaliação crítica:** o critério "genérico" original já havia sido
identificado pela dupla como insuficiente antes de pedir o refinamento
— o prompt foi direcionado propositalmente para resolver essa lacuna
específica (ausência de valores objetivos), e não uma reescrita aberta.
Os valores numéricos sugeridos (100ms, 10s) foram aceitos como
plausíveis para fins de documentação do backlog, mas ficam sinalizados
como parâmetros a validar com a equipe do Querido Diário caso a história
seja implementada de fato no futuro.

## 3. Uso na fase de Implementação (apoio técnico)

Durante a implementação da história [1] (já commitada e em PR), a IA foi
utilizada como apoio técnico para:
- Diagnóstico de erros de configuração (TypeScript, Karma/Jasmine,
  autenticação Git no ambiente WSL)
- Geração do esqueleto inicial dos testes unitários do
  `NotFoundComponent`, posteriormente executados e validados pela dupla
  (5/5 testes passando, conferido localmente antes do commit)

**Avaliação crítica:** nenhuma alteração de código gerada com apoio de
IA foi commitada sem antes ser executada e verificada pela dupla.
Configurações temporárias usadas apenas para depuração local (ex:
exclusões pontuais no `tsconfig.spec.json`, alteração temporária do
`karma.conf.js`) foram identificadas como fora do escopo da correção e
revertidas antes do commit final, evitando poluir o Pull Request com
mudanças não relacionadas à issue tratada.

## 4. Decisão humana final

Em todos os usos acima, a IA funcionou como ferramenta de apoio à
velocidade e à estruturação — nunca como decisora final. As decisões de
produto (qual issue resolver, qual solução implementar, qual critério
de aceite é aceitável) permaneceram com a dupla em todos os momentos,
com verificação prática (rodar testes, comparar comportamento antes/depois,
checar documentação oficial do projeto) antes de qualquer conteúdo
gerado ser incorporado como entrega final do trabalho.