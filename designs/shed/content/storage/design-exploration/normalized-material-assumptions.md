# Normalized Material Assumptions

This file defines what the shopping-list exercise is capturing.

## Scope Of This Exercise

For each shed storage design, capture only:

1. the original timber buy list
2. the original sheet-goods buy list
3. the simplified timber buy list
4. the simplified sheet-goods buy list

This exercise is intentionally limited to:

- timber
- plywood
- OSB

It does not yet include:

- screws
- bolts
- hooks
- brackets
- rails
- finishes
- edge treatment
- mats / liners

When those categories are added later, they should follow the same structure:

- original design shopping list
- simplified design shopping list

## Simplified Common Spec

| Role | Simplified material |
| --- | --- |
| Main framing | `38 x 63 mm` CLS softwood |
| Secondary timber | `25 x 38 mm` softwood battens / cleats / ledgers / standoffs |
| Sheet goods | `18 mm` structural plywood throughout |

## What Counts As Main Framing

Map these original members into the simplified `38 x 63 mm` main framing bucket:

- shelf uprights
- main horizontal rails
- floor-bearing frame members
- workbench legs
- workbench aprons / base rails
- structural tool rails

## What Counts As Secondary Timber

Map these original members into the simplified `25 x 38 mm` secondary bucket:

- shelf cleats
- ledger strips
- battens
- tool-board standoffs
- stop strips
- front lips / nosings
- light wall rails

## What Counts As Simplified Sheet Goods

Map all original sheet-good choices into the simplified `18 mm` structural plywood bucket:

- `18 mm` structural plywood
- `18 mm` birch plywood
- `18 mm` OSB3
- `12 mm` plywood
- `12 mm` OSB / backing panels

## Calculation Rules

### Original design tables

- keep the timber sections exactly as the design specified them
- keep the original sheet types exactly as the design specified them
- if the design already gave a practical buy quantity, keep it
- if the design only gave linear metres, derive a practical buy quantity from that explicit total

### Simplified design tables

- collapse structural members into `38 x 63 mm` CLS
- collapse cleats / battens / ledgers into `25 x 38 mm`
- collapse all sheet goods into `18 mm` structural plywood

### Simplified timber buy rule

Use:

- explicit calculated linear metres
- plus `10%` waste
- rounded up to full `3.0 m` lengths

Formula:

`practical buy lengths = ceil((calculated linear metres x 1.10) / 3.0)`

### Simplified sheet-good buy rule

Use:

- the original design's total sheet requirement
- converted into one `18 mm` structural plywood total

If the original design gave a range such as `minimum` versus `safer`, keep that range.

## Working Principle

The goal is not design commentary. The goal is a shopping-oriented view:

- if I build the original design, what do I buy
- if I build the simplified version, what do I buy
