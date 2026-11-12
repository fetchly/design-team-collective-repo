---
name: eod-client-leads
description: End of day triage of today's external (client and prospect) email in the user's Gmail. Decides which threads are real leads and creates one Pulse effort per new lead. Use when the user asks for their client lead sweep, EOD lead triage, or when a scheduled routine runs it.
---

# EOD Client Leads

Reads today's external email, picks out real leads, and logs each one as a Pulse effort. Works for whoever runs it: "me" is the signed in Gmail and Pulse user.

## Requirements

- Gmail MCP connected (tools `search_threads`, `get_thread`)
- Pulse MCP connected (tools `efforts_index`, `efforts_create`, `projects_index`, `organizations_index`)

If either is missing, stop and tell the user which connector to add. Never fall back to guessing.

## Steps

1. **Find the user's domain.** Read it from the signed in Gmail address (the part after `@`). Every sender outside that domain is external.
2. **Pull today's mail.** `search_threads` with query `in:inbox newer_than:1d -from:me -category:promotions -category:social -category:updates`. Keep only threads whose latest inbound sender is external.
3. **Read each thread.** `get_thread`. Read the newest inbound message plus enough history to know the context.
4. **Classify.** A thread is a lead when an external person:
   - asks about new work, pricing, a proposal, availability, or a call
   - is an existing client asking for scope beyond the current project
   - replies positively to outreach

   Not a lead: newsletters, receipts, invoices, tool notifications, recruiters, vendors selling to us, cold sales pitches, routine replies on work already in progress.
5. **Skip duplicates.** `efforts_index` and search for the sender's company or email in open efforts from the last 30 days. If a matching effort exists, do not create another one; note it in the summary instead.
6. **Create the effort.** `efforts_create`, assigned to `me`:
   - Title: `Lead: <Company or sender name>: <one line ask>`
   - Body: sender name and email, company, date received, what they asked for in two or three plain sentences, suggested next step, Gmail thread link.
   - Project: use the leads or sales project if `projects_index` shows one; otherwise leave unset.
7. **Report.** End with a short summary:
   - Leads created (title + link)
   - Possible leads skipped as duplicates
   - Threads you were unsure about, one line each, so the user can decide

## Rules

- Read only. Never reply to, label, archive, or delete email.
- Never paste full email bodies into Pulse. Summarize.
- When unsure whether something is a lead, list it as unsure. Do not create the effort.
- Zero leads is a valid result. Say so in one line.
