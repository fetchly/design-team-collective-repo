---
name: weekly-design-report
description: Rotina semanal (terça 09:00) do DESIGN REPORT da Fetchly. Lê a alocação da equipe de Design no Pulse, sinaliza alocações suspeitas, compara com o relatório que Lucas enviou à Priscilla na semana anterior e deixa o novo relatório como RASCUNHO no Gmail. Use quando Lucas pedir o relatório semanal de design, a auditoria de alocação do Pulse, "Tuesday Reports" ou "design report".
version: 1.0.0
---

# Weekly Design Report

Rotina do Lucas Teixeira (Director of Design, Fetchly). Roda toda terça às 09:00 pela tarefa agendada `weekly-design-report` e também pode ser chamada à mão.

Regra de ouro: **nunca enviar o email**. O resultado é um rascunho no Gmail e uma auditoria local. Lucas revisa, cola o que os colegas mandaram no Slack e envia ele mesmo.

Carregue também a skill `api-guard` e mantenha as chamadas no mínimo.

## Fontes

| Fonte | Para quê | Como |
|---|---|---|
| Memória `project_weekly-design-report.md` | modelo, destinatários, regras fixas, histórico | `/Users/fetchlyuser/.claude/projects/-Users-lucasteixeira-Downloads/memory/` |
| Log offline | blocos semanais da planilha e entradas coladas | `~/Downloads/weekly-design-report/memory.md` (anexar a semana nova no fim) |
| Gmail (conector `mcp__a23961a3…`) | relatório enviado na semana anterior e lembrete da Priscilla | `search_threads`, `get_thread` com `PLAIN_TEXT`, `create_draft`, `update_draft` |
| Pulse (`mcp__pulse__*`, só leitura) | alocação atual, horas registradas, folgas, status do projeto | ver "Coleta no Pulse" |
| Planilha de alocação (Drive) | horas da Gabriela e do Rodrigo | Sheet `1zdQbkHPchGoneS4QiLZE6KqioZ1DB9x_Tn6Z57JrjwQ` via `read_file_content` |
| Allocator Wall 2.0 (Figma) | conferência cruzada | arquivo `RN01bqRlQuHG1EOgIqpFy4`, detalhes na memória |

Resultados grandes de ferramentas ficam arquivados; leia com o comando `measure.py expand <id>` que o próprio resultado indica e filtre com python ou jq, sem despejar tudo no contexto.

## Passo a passo

1. **Semana do relatório.** Segunda a sexta da semana anterior. Exemplo: terça 27/10 cobre OCTOBER 19–23.
2. **Rascunho já existe?** `list_drafts` com `subject:"Tuesday Reports" newer_than:7d` (e confira o último id de rascunho no log offline). Se houver rascunho desta semana do relatório, mesmo de uma execução de teste, atualize com `update_draft` no mesmo id. Nunca crie um segundo rascunho.
3. **Relatório anterior.** `search_threads` com `subject:"Tuesday Reports" in:sent newer_than:10d`. Pegue a mensagem mais recente cujo remetente é `lucasteixeira@fetch.ly` e leia o `plaintextBody` (corte no "On … wrote:"). Esse texto é a base: ele vence o histórico da memória.
4. **Lembrete da Priscilla.** No mesmo resultado, procure a mensagem de `priscilla@fetch.ly` para `teamreports@fetch.ly` desta terça. Às 09:00 ela normalmente ainda não chegou (costuma vir à tarde).
5. **Coleta no Pulse** (abaixo).
6. **Julgamento** (heurísticas abaixo). Gere a lista de pontos suspeitos.
7. **Comparação** com o relatório anterior: o que mudou, o que continua igual, o que o Pulse contradiz.
8. **Montar o novo relatório** no formato abaixo. Base = texto anterior. Só troque uma linha quando houver evidência (Pulse, planilha ou texto colado pelo Lucas). Pulse sozinho não remove ninguém do relatório: ele gera um ponto suspeito para o Lucas decidir.
9. **Rascunho no Gmail.**
   - Com lembrete: `create_draft` com `replyToMessageId` = mensagem da Priscilla, To `priscilla@fetch.ly`, Cc `teamreports@fetch.ly`, assunto `Re: Tuesday Reports`.
   - Sem lembrete: rascunho novo, assunto `Tuesday Reports`, To `priscilla@fetch.ly` e `huey@fetch.ly`. Diga ao Lucas que, se o lembrete chegar depois, ele pode responder no fio dela e apagar este rascunho.
   - Envie `htmlBody` (títulos em `<b>`) e `body` em texto puro.
10. **Auditoria local.** Grave `~/Downloads/weekly-design-report/audits/<AAAA-MM-DD>.md` com: tabela por pessoa, pontos suspeitos, comparação. Os pontos suspeitos NÃO entram no email da Priscilla.
11. **Log.** Anexe a semana em `~/Downloads/weekly-design-report/memory.md` (entradas usadas, ids do fio e do rascunho). Atualize a memória só com fatos novos e duradouros.
12. **Resumo final para o Lucas** (é o que a notificação mostra): link do rascunho, pontos suspeitos em uma linha cada, o que mudou, o que foi carregado sem mudança (DesignOps da Aline, Giulia, Renata, Notes).

## Coleta no Pulse

Só leitura. Nunca chame `*_create`, `*_update`, `*_destroy`, `comments_create` ou `time_logs_create`.

Equipe: quem tem departamento "Design" ou tem Lucas Teixeira como aprovador de folgas. Nomes de referência: Gabriela, Rodrigo, Renata, Giulia, Ali Sandes, Aline Aleixo, Ana, Gabriel Silva, Karolina Matias, Leo Souza, Rebeca, Vitor Machado, Camila, Juan, Gabe Kimura. Os ids resolvidos ficam na seção "IDs" no fim deste arquivo; se uma pessoa nova aparecer, resolva com `users_index query=<nome>` e acrescente.

Por pessoa:
1. `assignments_index user_id=<id> active=true`: projeto, posição, horas, datas.
2. Status de cada projeto (`projects_index q=` ou `projects_show`): proposal, fulfilment, maintenance, expert_service, inactive, archived.
3. `time_logs_index user_id=<id> since=<hoje menos 28 dias>`: horas por projeto por semana e data do último registro.
4. `days_offs_index user_id=<id> from_date=<segunda passada> to_date=<hoje mais 14 dias>`.

Se o volume for grande, delegue a coleta a um subagente com estas instruções e peça a saída em JSON e Markdown em `~/Downloads/weekly-design-report/audits/`.

## Heurísticas de julgamento

Gerentes de projeto às vezes esquecem de tirar gente de projetos. Sinalize, nunca corrija:

- **PARADO:** alocação ativa sem nenhuma hora no projeto nas últimas 3 semanas cheias, ou último registro há mais de 21 dias. Provável esquecimento do PM.
- **ENCERRADO:** projeto `inactive` ou `archived`, ou alocação com data de fim no passado que ainda aparece.
- **ACIMA DE 100%:** soma das horas alocadas acima de 40 h por semana. O Pulse só preenche `hours` em alocações `hourly`; para as demais estime pelo papel (full_time 40, part_time 20, helping/learning/unset 0). Conte só alocações com horas nas últimas 3 semanas; somas infladas por alocações paradas são efeito do PARADO, não sinal próprio.
- **ABAIXO:** soma alocada abaixo de 20 h por semana sem folga que explique.
- **SEM ALOCAÇÃO:** 4 h ou mais registradas nas últimas 2 semanas num projeto em que a pessoa não está alocada.
- **DIVERGÊNCIA COM O RELATÓRIO:** projeto no relatório anterior sem alocação nem horas no Pulse, ou o contrário.
- **FOLGA:** folga aprovada na semana do relatório ou nas próximas duas. Sugira a nota de capacidade (ex.: "(50% capacity)").

Pesos: um sinal isolado de uma semana é fraco (férias, feriado, PM que lança horas atrasado). PARADO por 3 semanas, ENCERRADO e ACIMA DE 100% são fortes. Diga o nível de confiança em cada ponto.

Regras fixas do Lucas que o Pulse não muda:
- Rodrigo fica sempre em Supplemental, nunca em Pivot.
- O bloco DesignOps é o texto da Aline; se ela não mandou, carregue o anterior.
- Giulia e Renata vêm do Slack; se não vieram, carregue o anterior e avise.
- Juan: não incluir Framebridge (Lucas, 2026-10-22) até ele pedir de novo. Bullet base: "Juan: Vast and Gray V".
- Gabriel trabalha em Gray V mesmo sem alocação no Pulse: não sinalizar como SEM ALOCAÇÃO enquanto a alocação não for criada; só lembrar.
- Vitor (sem registro desde 17/09) e Giulia (desde 29/06) não usam o Pulse para horas: 0 h deles não gera PARADO. Para ver o último registro, consulte `time_logs_index` sem `since`.
- Alocações de Tim, Lucas e Aline nunca entram na limpeza nem nas mensagens aos PMs, nem os projetos liderados por eles (Design Ops, Ecosystem, Internal (Design), Design Pods & Critique, Design leadership, Service Offering, Design + Architecture).
- Alocação sem atividade pode ser removida do Pulse (Lucas autorizou). O MCP não tem ferramenta para isso: gere a lista `audits/<data>-limpeza-pulse.md` com caixas de seleção para quem tem acesso de admin.

## Formato do relatório (email)

Copie a estrutura do último email enviado. Hoje (outubro de 2026) ela é:

```
Hi Guys! Here's this week's report.

DESIGN REPORT — <MONTH> <D>–<D>, <YEAR>

Supplemental Designer: 1.5/1.5
• Gabriela: <projetos>
• Rodrigo: <projetos>

Ecosystem Designer: 1/1
• Renata: <tarefas> (<N>% capacity)

Product Designer: 1/1
• Giulia: <projetos>

DesignOps Designers (Dedicated Designers): <X>/<Y>
• <Nome>: <projetos>   (ordem alfabética, Camila por último)

Pivot Designer: 1/1
• Juan: <projetos>

Note: <só se houver nota nova>

--
Lucas Teixeira
fetch.ly
+1 (405) 998-2606
Denver, CO | Austin, TX
```

Detalhes: travessão no título e meia risca no intervalo de datas são do modelo e ficam. Fora disso, nenhum travessão ou hífen como pontuação no texto novo, nada de frases com cara de IA. Mês repete só quando o intervalo cruza meses. Singular para 1 ("Designer"), plural para 2 ou mais. Frases do tipo "Sorry about the delay" do email anterior não são carregadas.

## Formato da auditoria (local e resumo)

```
# Auditoria de alocação Design — <data>
Semana do relatório: <MONTH D–D>

## Pontos suspeitos
- [FORTE] <Pessoa> em <Projeto>: <motivo com números>. Sugestão: <ação para o PM>.
- [FRACO] ...

## O que mudou desde o último relatório
## O que continua igual
## Tabela por pessoa
| Projeto | Status | h/sem alocadas | S-4 | S-3 | S-2 | S-1 | Último registro | Sinal |
```

## Como editar ou desativar

- Mudar o comportamento: edite este arquivo. A tarefa agendada só chama esta skill.
- Mudar horário ou pausar: app Claude, aba Code, Scheduled tasks, `weekly-design-report`; ou peça ao Claude para usar `update_scheduled_task` (`cronExpression`, `enabled: false`).
- Rodar agora: botão "Run now" da tarefa, ou peça "roda o weekly design report".
- Documentação completa: `~/Downloads/weekly-design-report/README.md`.

## Notas da API do Pulse (verificadas em 2026-10-22)

- `users_index departments=` exige um id de departamento que o Pulse não expõe. Use `query=<nome>` com os slugs abaixo; para achar gente nova de Design, pagine `users_index` (13 páginas, 25 por página) e filtre `department == "Design"`.
- `id` do usuário é um slug (`ali-fetch-ly`) e serve como `user_id` em assignments, time logs e days off.
- `assignments_index active=true` traz alocações abertas desde 2024 e 2025; algumas têm `project_id: null`.
- `project_id` da alocação é UUID; `projects_index` devolve `id` como slug e o UUID dentro de `gid` (`gid://pulse/Project/<uuid>`). Projetos `archived` aparecem com `q=`. Projeto que não aparece em nenhuma busca (ex.: "Fetchly Files") conta como ENCERRADO.
- `time_logs_index`: 25 por página, mais novo primeiro; use os 10 primeiros caracteres de `log_date`; `duration_seconds` é exato. Quem registra muito precisa de 4 a 5 páginas para 5 semanas.
- `days_offs_index` sem `user_id` traz a empresa toda na janela (cerca de 3 páginas): mais barato que uma chamada por pessoa. Case por `user_name`.
- Giulia, Vitor, Tim e Lucas não registram horas no Pulse; 0 h deles é sinal fraco.

## IDs e nomes no Pulse

| Relatório | Nome no Pulse | Observação |
|---|---|---|
| Gabriela | Gabe Kimura | mesma pessoa |
| Karolina Matias | Karolina M. Ferreira | mesma pessoa |
| Rodrigo | Rodrigo Dacenakis | há outros Rodrigos fora de Design |
| Renata | Renata Spolidoro | há uma Renata PM, ignorar |
| Giulia | Giulia Manno | |
| Rebeca | Rebeca Andrade | |
| Juan | Juan Ramirez | |
| Ali, Aline Aleixo, Ana, Gabriel Silva, Leo Souza, Vitor Machado, Camila | iguais | |
| Tim, Lucas Teixeira | Design, fora do relatório | |

Projetos: "myCevents" no Pulse = myBevents; "MyJulieApp" = myJulie; "Hive V2" = Hive; "Tabasco (GrayV)" e "Gray V (DesignOps)" = Gray V; "The Money Show" = MoneyShow; "Spyderco (Shopify Store)" = Spyderco.
