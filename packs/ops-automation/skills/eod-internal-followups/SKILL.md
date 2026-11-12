---
name: eod-internal-followups
description: End of day check of today's internal (same company domain) email in the user's Gmail. Finds messages the user has not answered and sends a short bullet list of who to touch base with. Use when the user asks who they owe a reply, their EOD internal check, or when a scheduled routine runs it.
---

# EOD Internal Follow-ups

Finds internal email the user missed today and returns a bullet list of who to get back to. Works for whoever runs it: "me" is the signed in Gmail user.

## Requirements

- Gmail MCP connected (tools `search_threads`, `get_thread`)

If it is missing, stop and tell the user to connect Gmail.

## Steps

1. **Find the user's domain.** Read it from the signed in Gmail address. Senders on that domain are internal.
2. **Pull today's internal mail.** `search_threads` with query `newer_than:1d from:*@<domain> -from:me`.
3. **Check each thread.** `get_thread`. Keep it only when:
   - the newest message is from a colleague, not the user, and
   - it asks the user something, needs a decision, or mentions them by name, and
   - the user has not replied after it.

   Drop calendar invites and replies, automated notices, FYI blasts to large lists, and threads where someone else already answered the question.
4. **Group by person.** One bullet per colleague, even if they sent several threads.
5. **Notify.** Return the list as the final message (a scheduled routine delivers it as the notification). Format:

   ```
   Touch base today:
   • <Name>: <what they need, under 12 words> (<thread link>)
   • <Name>: ...
   ```

   Order by urgency: direct questions and deadlines first.

## Rules

- Read only. Never reply, label, archive, or mark as read.
- No email bodies in the output. One short line per person.
- Nothing missed? Return "All caught up on internal email today."
