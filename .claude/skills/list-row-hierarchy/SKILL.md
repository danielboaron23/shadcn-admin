---
name: list-row-hierarchy
description: Use when designing, building or reviewing any list, table or card grid (articles, tasks, users, apps, search results). Keeps rows quiet so the title leads - nothing a filter or header above already shows is repeated on every row, and each row gets one quiet meta item plus the affordance.
---

# List row hierarchy

A list is read by scanning titles. Everything else on a row competes with the
title, and it competes once per row, so a small extra becomes a column of noise.

## The rules

1. **Never repeat on every row what a filter or header above already shows.**
   If chips, tabs, a select, a section heading or the page title already tell
   the user the topic, status, owner or type, leave it off the rows.
2. **Next to the title, keep one quiet meta item plus the affordance.**
   One short, muted piece of meta (reading time, date, count) and the thing
   that says "this opens" (chevron, or the card itself). Nothing else.

## How to apply

Before adding anything to a row, or when reviewing a list:

1. List what the controls and headings above the list already say (filter
   chips, tabs, column headers, section title, result summary).
2. For each element on the row, ask: is this already said above? If yes,
   remove it from the row. Do not restyle it smaller; remove it.
3. Of what is left besides title and summary, pick the one meta item that
   helps the user choose a row. Style it quietly: `text-xs` or `text-sm`,
   `text-muted-foreground`, no border, no fill.
4. Keep one affordance. A row that is a link gets a chevron at the end
   (`rtl:rotate-180`); a card that is a link needs no extra icon.
5. Apply the same decision to every layout of the row. If the wide row drops
   an item, the narrow card drops it too.

Badges, pills and icons with a border or fill are loud. One per row is already
a lot; one per row that repeats a filter is always wrong.

## Example: Help Center article rows

The topic chips above the list ("All", "Getting started", "Account & billing",
...) already show the topics.

Before, every row had three things at the end, competing with the title:

```
Create your workspace                  [Getting started]   2 min read   >
```

After, the topic badge is gone, on wide rows and on narrow cards:

```
Create your workspace                                      2 min read   >
```

See `src/features/help-center/components/article-list.tsx`.

The same rule covers the "Related articles" cards on the article page. Related
articles share the article's topic, and the article header already shows that
topic as a badge, so the cards show only the title, the summary and the reading
time. See `src/features/help-center/components/article-card.tsx`.

## When a repeated value may stay

- Nothing above the list shows it, and users need it to tell rows apart. Then
  it can be the one meta item. It replaces the other meta; it is not added.
- It is the point of the row, such as status in a task table with a status
  column. A table column with a header is not a per-row repeat.

If you are unsure whether an item earns its place, leave it out and say so in
the PR, so the designer can decide.
