# Shed Storage Design Brief and AI Instruction Prompt

You are an experienced **small-space storage designer**, **practical shed-fitout planner**, and **DIY workshop storage designer**.

Your task is to design a **highly practical custom storage layout** for the shed described in the design brief below.

The shed structure has already been decided.

**Do NOT redesign the shed itself.**  
**Do NOT move the door or windows.**  
**Do NOT change the overall shed dimensions.**  
Focus only on the **internal storage design, layout strategy, construction approach, and visualisation**.

---

## Run variables

Set these values at the start of each run and use them consistently for all repository output paths:

- `domain_slug`: `shed`
- `collection_slug`: `storage`
- `candidate_slug`: `design-1`

For this run, the expected output paths are:

```text
designs/shed/content/storage/design-1/design.md
designs/shed/assets/storage/design-1/top-down-plan.png
designs/shed/assets/storage/design-1/view-from-door.png
designs/shed/assets/storage/design-1/side-bay-workbench-view.png
designs/shed/assets/storage/design-1/back-wall-elevation.png
designs/shed/assets/storage/design-1/left-wall-elevation.png
designs/shed/assets/storage/design-1/right-wall-elevation.png
```

When reusing this prompt for another run, update only these variable values and the corresponding example paths above.

---

## What you must do

1. Briefly confirm your understanding of the key constraints and usable storage zones.
2. Explore **2–3 possible layout concepts** briefly.
3. Compare those layout concepts in a table.
4. Select **one final recommended design**.
5. Fully develop **only the final recommended design** in detail.
6. Provide both:
   - a **written Markdown design document**
   - and a **separate visualisation package** for the final selected design

---

## Design direction (critical)

The final design must:

- Maximize **practical storage capacity**
- Keep the **central floor area as open as possible**
- Be grounded in the **actual shed dimensions**
- Be based on **realistic, buildable DIY construction**
- Use **custom-built timber + sheet-material storage**
- Avoid generic storage advice
- Tie every recommendation back to:
  - shed dimensions
  - roof shape
  - door/window constraints
  - item list
  - box sizes
  - access priorities
  - mixed-depth storage requirement
  - the possible inclusion of a workbench / under-bench storage zone

---

## Important design rules

- Do **not** place storage on the front wall with the door and windows.
- Treat the front wall as a **non-storage wall**.
- Use only the **three usable walls**:
  - back long wall
  - left short wall
  - right short wall
- Account for the **apex roof shape**:
  - highest point in the middle
  - lower height at both side walls
- The design must use **mixed storage depths**:
  - at least one **60 cm deep zone**
  - other storage zones should generally be around **40 cm deep**
- Preserve as much **clear movement / standing space** as possible.
- Avoid making the shed feel like a narrow corridor.
- Assume the shed walls are relatively thin and need sensible reinforcement.
- Do **not** recommend metal or plastic shelving systems.
- Use **timber framing + plywood / OSB / similar sheet material**.
- The design may combine:
  - full-height storage
  - bench-height storage
  - wall-hung storage
  - under-bench storage
- The design should consider whether a **workbench + storage hybrid** is better than only floor-to-ceiling shelving.

---

## Exploration requirement

Before choosing the final design, briefly explore **2–3 layout concepts** such as:

- a layout dominated by back-wall shelving
- a layout with a deep side bay + workbench
- a layout optimized for maximum clear central floor space

These concept options should be **brief but real**, not vague.  
They should show genuine trade-offs and demonstrate design thinking.

Then compare them and choose **one final recommended design**.

Only the **final selected design** needs to be fully detailed with measurements, calculations, materials, diagrams, and visuals.

---

## Output requirements

Please structure the output in the following order.

---

### 1. Summary of constraints

Provide a concise summary of:

- shed dimensions
- usable walls
- front wall limitation
- window constraints
- roof constraints
- storage requirements
- item categories
- build preferences
- access priorities

---

### 2. Overall storage strategy

Explain:

- how the design uses the three storage walls
- why the mixed-depth approach is appropriate
- how central floor space is preserved
- whether a workbench / under-bench zone is included
- how the design balances access, storage capacity, and usability

---

### 3. Layout concept options

Provide **2–3 brief layout concepts**, each with:

- concept name
- short description
- key strengths
- key weaknesses

---

### 4. Comparison table for layout concepts

Include:

- concept name
- main storage idea
- strengths
- trade-offs
- suitability for this shed

---

### 5. Final recommended layout

Select the best concept and explain clearly why it is the best solution.

---

### 6. Top-down plan

Provide:

- a **dimensioned top-down plan**
- a **simple wireframe / schematic**
- and a **clear labeled plan layout**

This should show:

- shed outline
- front wall with central outward-opening door
- windows on both sides of the door
- back wall storage
- short wall storage
- the 60 cm deep zone
- 40 cm deep shelving zones
- workbench area if included
- central clear floor area

---

### 7. Wall-by-wall elevation diagrams

Provide simple elevation drawings / diagrams for:

- back wall
- left short wall
- right short wall

These should show:

- approximate heights
- shelf levels
- workbench level if included
- open under-bench storage if included
- storage zones for tools, boxes, ladders, paints, etc.

---

### 8. Storage zone table

For each storage zone, provide:

- zone name
- wall location
- width
- depth
- height
- intended use
- notes

---

### 9. Shelf-level schedule

Provide a table showing:

- shelf or level name
- height from floor
- depth
- approximate width
- intended contents

---

### 10. Item allocation table

Assign the listed items to storage zones.

Include:

- item
- recommended location
- access priority
- reason for placement

---

### 11. Box-fit calculation

Use the known box sizes and estimate:

- how many boxes fit per shelf run
- how they should be oriented
- whether 40 cm depth is sufficient
- what shelf spacing is needed
- how many of the known boxes can be stored efficiently

Allow sensible clearance rather than assuming exact zero-gap fitting.

---

### 12. Workbench / under-bench storage proposal

If included, specify:

- location
- width
- depth
- height
- what is stored underneath
- what is stored above
- whether it is the best place for the tile-storage bay

---

### 13. Construction approach

Recommend a practical DIY approach using:

- timber framing
- plywood / OSB / sheet material
- battens / uprights / supports
- wall fixing only where appropriate

Assume the shed walls are too thin to carry heavy shelving by themselves.

Explain:

- whether the storage should be freestanding, wall-supported, or hybrid
- how to reinforce the structure sensibly
- how to keep it strong without overengineering it

---

### 14. Materials recommendation

Compare and recommend:

- plywood
- OSB
- any other sensible sheet material if relevant

Explain:

- pros and cons
- strength
- cost
- suitability for shelves
- suitability for workbench tops
- best use cases within this design

Also recommend likely timber section sizes for framing, where possible.

---

### 15. Preliminary cut list and materials estimate

Provide a practical **design-stage estimate** for:

- timber lengths
- sheet materials
- number of sheets
- fixings
- screws
- brackets if needed
- hooks / rails for tools
- approximate waste allowance (around 10–15%)

Do **not** present this as a builder-certified final bill of materials.  
Present it as a **working estimate** that must be checked before purchase.

---

### 16. Practical build sequence

Provide a logical sequence for building the storage.

---

### 17. Safety / access / usability checklist

Check that:

- heavy items are not stored dangerously high
- tiles are stored low and sensibly
- the door swing is not obstructed
- the windows are not blocked unnecessarily
- tall storage on short walls does not extend too far toward the front
- the central floor area remains usable
- ladders are stored securely
- frequently used items remain easy to reach

---

### 18. Visualisation package

In addition to the written design, provide visual outputs for the **final selected design**.

Please include:

- one **dimensioned top-down visual plan**
- **two or three interior perspective views**
- **simple wall elevation visuals** if possible

The visuals should show:

- overall layout
- back wall shelving
- short wall storage
- the 60 cm deep bay
- workbench / under-bench zone if included
- ladder / tool storage
- central clear floor space
- relationship to door and windows

The visual outputs must:

- be based on the **actual shed dimensions**
- match the written storage layout
- match the shelf depths and key measurements
- help visualize the final design
- **not** introduce a different arrangement from the written plan

If there is any conflict between visuals and written dimensions, the **written dimensioned plan is the source of truth**.

---

### 19. Final recommendation

Conclude with:

- the final chosen design
- why it is the best option
- any practical notes or caveats

---

## Repository output requirement

The final deliverable is intended to be saved in a project repository.

Assume the repository stores outputs using this hierarchy:

- `domain_slug` — top-level design area, for example `shed`
- `collection_slug` — sub-area within that domain, for example `storage`
- `candidate_slug` — one specific design candidate, for example `design-1`, `chatgpt-1`, or `claude-2`

Use those placeholders consistently in the output paths.

Please produce the output in **two separate parts**:

### Part A — Markdown document

Generate the full written design as a Markdown document suitable for saving as:

```text
designs/{domain_slug}/content/{collection_slug}/{candidate_slug}/design.md
```

Example:

```text
designs/shed/content/storage/design-1/design.md
```

This Markdown document should contain:

- title
- date if helpful
- design brief summary
- constraints
- explored layout concepts
- final selected design
- dimensioned plans in text / wireframe form
- tables
- construction notes
- materials estimate
- build sequence
- safety checklist
- a section listing the visual assets that belong with the design

### Part B — Visual assets

Generate the visuals separately as named assets, suitable for saving under:

```text
designs/{domain_slug}/assets/{collection_slug}/{candidate_slug}/
```

Example:

```text
designs/shed/assets/storage/design-1/
```

Use clear, stable filenames such as:

```text
designs/{domain_slug}/assets/{collection_slug}/{candidate_slug}/top-down-plan.png
designs/{domain_slug}/assets/{collection_slug}/{candidate_slug}/view-from-door.png
designs/{domain_slug}/assets/{collection_slug}/{candidate_slug}/side-bay-workbench-view.png
designs/{domain_slug}/assets/{collection_slug}/{candidate_slug}/back-wall-elevation.png
designs/{domain_slug}/assets/{collection_slug}/{candidate_slug}/left-wall-elevation.png
designs/{domain_slug}/assets/{collection_slug}/{candidate_slug}/right-wall-elevation.png
```

Example:

```text
designs/shed/assets/storage/design-1/top-down-plan.png
designs/shed/assets/storage/design-1/view-from-door.png
designs/shed/assets/storage/design-1/side-bay-workbench-view.png
designs/shed/assets/storage/design-1/back-wall-elevation.png
designs/shed/assets/storage/design-1/left-wall-elevation.png
designs/shed/assets/storage/design-1/right-wall-elevation.png
```

If direct file creation is not supported, still provide:

1. the complete Markdown document content
2. the full list of expected visual asset filenames
3. the visual outputs separately, each clearly labeled with its intended filename

### Important note on asset linking

Do **not** rely on complex automatic embedding of images into Markdown if that is likely to fail.

Instead:

- generate the Markdown document cleanly as one output
- generate the visual assets separately as another output
- include in the Markdown document a simple section titled **Visual Assets** listing the expected filenames and short descriptions

Example format for that section:

```markdown
## Visual Assets

- `designs/{domain_slug}/assets/{collection_slug}/{candidate_slug}/top-down-plan.png` — Dimensioned top-down plan
- `designs/{domain_slug}/assets/{collection_slug}/{candidate_slug}/view-from-door.png` — Perspective view looking into the shed from the door
- `designs/{domain_slug}/assets/{collection_slug}/{candidate_slug}/side-bay-workbench-view.png` — Perspective view showing the deep bay and workbench area
- `designs/{domain_slug}/assets/{collection_slug}/{candidate_slug}/back-wall-elevation.png` — Back wall elevation
- `designs/{domain_slug}/assets/{collection_slug}/{candidate_slug}/left-wall-elevation.png` — Left wall elevation
- `designs/{domain_slug}/assets/{collection_slug}/{candidate_slug}/right-wall-elevation.png` — Right wall elevation
```

Do **not** use absolute local paths.
Do **not** use temporary URLs.
Use repository-relative filenames only.

---

# Design brief

All details below should be treated as constraints unless explicitly stated otherwise.

The goal is to design an internal shed storage layout that is:

- highly practical
- buildable by a DIY enthusiast
- space-efficient
- visually understandable
- grounded in real measurements
- suitable for storing a mix of tools, boxes, bulky items, and occasional-use materials

---

## 1. Property context

- Residential garden shed
- Storage / workshop-type use
- DIY practical fit-out required

---

## 2. Shed geometry

### Shed footprint

- **298 cm × 175 cm**

### Interpretation

- One long dimension: **298 cm**
- One short dimension: **175 cm**

### Roof

- **Apex roof**
- Highest point is in the **middle**
- Height at highest point: **2.179 m**
- Height at both side walls: **1.9 m**

Implication:

- taller storage fits best where roof geometry allows
- side-wall storage must respect lower eaves height

---

## 3. Door and windows

### Front wall

- The **door is central** on the **298 cm front wall**
- There are **windows on both sides of the door**
- The door opens **outward**

### Implication

- The front wall should be treated as a **non-storage wall**
- No meaningful storage should be placed on this wall
- The usable storage walls are:
  - **back long wall** (298 cm)
  - **left short wall** (175 cm)
  - **right short wall** (175 cm)

---

## 4. Window-related constraint on the short walls

Tall storage on a short wall may visually block the front-side window area if it runs fully from back to front.

Therefore:

- if tall / full-height storage is used on a short wall, it should extend only about **1.2 m from the back wall**
- the remaining front portion near the window should be kept more open, lower, or shallower
- this is to preserve light and avoid the storage visually blocking the windows

### Important dimensional note

- maximum length for tall storage on a short wall from the back wall: **approximately 1.2 m**
- remaining front section: keep lower / shallower / more open

Additional context:

- when standing at the front looking into the shed, the **right short wall** is the side closer to the house
- either short wall may be used for the 60 cm deep storage bay

---

## 5. Storage philosophy

The design should:

- maximize usable storage
- keep the middle space as open as possible
- minimize random floor clutter
- allow practical storage of boxes, tools, and bulky items
- support occasional use as a small working area
- consider a **workbench + under-bench storage concept**
- avoid designing only floor-to-ceiling shelving if a mixed arrangement works better

---

## 6. Mixed-depth storage requirement

This is a critical requirement.

### Deep storage zone

Some tiles measuring **60 cm × 120 cm** need to be stored.

The expectation is that:

- they can be stored low, ideally near floor level
- at least one storage bay should be **60 cm deep**
- this deeper zone is preferably on **one short wall**
- the deeper zone may be combined with a **workbench / under-bench storage** concept

### Standard storage depth

Elsewhere, a depth of around **40 cm** is preferred.

### Design implication

The storage should likely use:

- one **60 cm deep zone**
- most other shelving around **40 cm deep**

This helps preserve more central free space.

---

## 7. Workbench / under-bench concept

A workbench is desirable if it improves usability.

The design should consider:

- whether part of the shed should be a **bench-height storage zone**
- whether some storage should begin at **bench height**
- whether items can be tucked underneath the bench

Possible under-bench items:

- tiles
- bulky tools
- Kärcher
- BBQ
- other awkward or occasional-use items

If a workbench is included, it should:

- remain practical
- not make the shed feel cramped
- support storage above and/or below where useful

---

## 8. Construction preference

The storage should be **custom-built**.

### Preferred construction

- timber framing
- plywood / OSB / similar sheet material

### Do not recommend

- metal shelving systems
- plastic shelving systems

### Fixing preference

- battens / brackets / supports can be fixed to the shed structure
- but the walls are relatively thin, so the design should not assume the wall cladding alone can carry heavy shelving
- recommend a sensible support strategy

---

## 9. Items to store

### Bulky / awkward / larger items

- 2 ladders
- paints
- tiles
- Kärcher / pressure washer
- BBQ
- tool box
- garden tools
- heavy tools

### Smaller / medium items

- extension cord
- garden fertiliser (jars, bottles, etc.)
- various tools
- various storage boxes

---

## 10. Ladders

There are 2 ladders:

1. **Foldable ladder**
   - approximately **1.5 m folded**

2. **Non-foldable ladder**
   - approximately **2.0 m**

Both are shorter than the full shed height.

The design may consider:

- vertical storage
- high-level horizontal storage
- wall brackets
- side-wall dedicated ladder storage

They should be stored securely and not obstruct access.

---

## 11. BBQ

- Small portable kettle BBQ
- Small to medium size
- Does not need a very large dedicated footprint
- Can likely be stored low or under-bench

---

## 12. Storage boxes

The design should account for these approximate box groups:

### Known box quantities

- **60 × 40 × 26 cm boxes** — **9**
- **IKEA Samla medium** — **3**
- **Small boxes** — **4**
- **IKEA green and pink boxes** — **2**
- **Dunelm medium** — **6**
- **Dunelm small** — **2**

The design should account for:

- repeated shelf bays where helpful
- stackability
- visibility
- ease of retrieval

---

## 13. Access priorities

### Frequently used

These should be easy to access:

- garden tools
- extension cord
- fertiliser
- commonly used tools

### Occasionally used

These should be reasonably accessible:

- tool box
- heavy tools
- Kärcher
- BBQ

### Infrequently used

These may be stored higher, deeper, or in less convenient locations:

- tiles
- spare paints
- some boxes
- long-term stored items

---

## 14. Functional intent

The storage should support:

- efficient use of limited shed space
- good organization
- practical day-to-day access
- some working ability inside the shed
- realistic DIY construction
- a tidy result that feels intentional and usable

---

## 15. Grounding requirement

Do **not** provide generic storage advice.

Every recommendation must be tied back to the actual:

- dimensions
- roof shape
- door/window arrangement
- wall usability
- storage item list
- box sizes
- access priorities
- material preferences
- desire to preserve clear central floor space

Where dimensions are estimated, state the assumptions clearly.

Where calculations are approximate, say so clearly.

The final design should feel like a **real, buildable, measured solution**, not a conceptual moodboard.
