---
name: api-guard
description: Rate-limiting and request-minimization guard for external API calls. MUST trigger alongside ANY skill or tool call that touches Webflow, Figma, Google APIs (Gmail, Google Calendar, Google Docs, Google Sheets), Notion, or any other external connector/MCP service. Enforces small payloads, timeouts, deduplication, and quota-aware behavior to prevent running out of API calls.
version: 1.0.0
---

# API Guard — Request Minimization & Rate-Limiting Rules

This skill is a **companion guard** that activates alongside any other skill or tool that makes external API requests. It does NOT replace other skills — it layers on top of them.

## When This Applies

Every time you are about to call ANY of these tools or services:

- **Webflow**: `mcp__b1f6ce70-*` tools (element_builder, data_cms_tool, style_tool, etc.)
- **Figma**: `mcp__Figma__*`, `mcp__f9e6999d-*` tools (get_design_context, get_screenshot, use_figma, etc.)
- **Google Calendar**: `mcp__f48a8f41-*` tools (gcal_list_events, gcal_create_event, etc.)
- **Gmail**: `mcp__a23961a3-*` tools (gmail_search_messages, gmail_read_message, etc.)
- **Notion**: `mcp__bce75e4a-*` tools (notion-search, notion-fetch, notion-update-page, etc.)
- **Supabase**: `mcp__90a6f6d4-*` tools (execute_sql, list_tables, etc.)
- **Netlify**: `mcp__410191e1-*` tools
- **Any other MCP connector** that calls an external API

## Mandatory Rules

### 1. Minimize Request Count

- **Never make exploratory/speculative calls.** Know what you need before calling.
- **Never re-fetch data you already have** in the current conversation. Cache all responses mentally and reuse them.
- **Batch when possible.** If you need data from 3 pages, check if a single list/search call can return all of them before making 3 individual calls.
- **Ask the user first** if you're unsure what to fetch — don't browse/explore the API to figure it out.
- **One call per purpose.** Never call the same endpoint twice with the same or overlapping parameters.

### 2. Minimize Payload Size

- **Request only the fields you need.** If the tool supports field selection, filtering, or projections — use them.
- **Use the smallest page size** that satisfies the request. If you need 5 items, don't request 100.
- **Limit date ranges.** For calendar/email queries, use the tightest date window possible (e.g., don't fetch "all events" when the user asked about "this week").
- **Avoid fetching full objects** when a summary/list endpoint exists.
- **For Figma screenshots**: request the smallest node scope possible — a single component, not an entire page.

### 3. Timeout & Error Awareness

- **If a request times out or fails**, do NOT immediately retry the same call. Instead:
  1. Inform the user the call failed.
  2. Ask if they want you to retry, or if there's a simpler alternative.
  3. If retrying, try a smaller/simpler version of the request.
- **Never retry more than once** without user confirmation.
- **If you hit a rate limit (429 or equivalent)**, stop all calls to that service immediately and inform the user. Do not attempt to work around it.

### 4. Quota Awareness

- **Track your call count** mentally during the conversation. After every 5 external API calls to the same service, pause and inform the user: "I've made N calls to [service] so far. Want me to continue or take a different approach?"
- **Prefer read-only calls** over write calls. Never create/update/delete unless explicitly asked.
- **Prefer local alternatives** when available. If the user has files locally that contain the same data, read the files instead of calling the API.

### 5. Pre-Call Checklist (apply before EVERY external call)

Before each external API tool call, verify:

- [ ] Is this data already available from a previous call in this conversation?
- [ ] Is there a local file or git history that has this info?
- [ ] Am I requesting the minimum scope/fields/date range?
- [ ] Is this a single focused call, not a broad exploratory one?
- [ ] Has the user actually asked for this, or am I assuming they want it?

If any answer is "no" — adjust before calling.

### 6. Transparency

- Before making any external API call, briefly state what you're about to call and why (one line).
- Example: "Fetching your Google Calendar events for this week to find the meeting."
- This lets the user stop you before a wasteful call.

## Examples

**Bad**: Calling `gmail_search_messages` with no filters, then `gmail_read_message` on each result to find the right one.
**Good**: Calling `gmail_search_messages` with a specific subject/sender filter so only relevant messages return.

**Bad**: Calling `gcal_list_events` for the entire year to find one meeting.
**Good**: Calling `gcal_list_events` with `timeMin` and `timeMax` set to the specific week.

**Bad**: Getting a Figma screenshot of an entire file to see one component.
**Good**: Getting the screenshot of just the specific node/component.

**Bad**: Fetching a Notion page, then fetching it again 2 messages later.
**Good**: Remembering the first fetch and referencing it.

**Bad**: Retrying a timed-out Webflow call 3 times in a row automatically.
**Good**: Telling the user it timed out and asking how to proceed.
