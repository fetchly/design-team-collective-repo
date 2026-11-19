# Neufert clearances for container conversions

Dimensional rules from Ernst Neufert, *Arte de projetar em arquitetura* (Portuguese edition, translated from the 21st German edition, Gustavo Gili), picked for small modular spaces: a container box is about 2.35 m wide and 2.39 m tall inside.

- Every rule is paraphrased. No text, drawings or scans from the book are reproduced here, and the PDF is not in the repo.
- **Book p.** is the printed page number. In the 450-page scan, the PDF page is the book page + 17.
- **Confidence** says how clearly the value reads on the scanned page: high means printed as a number, medium means read off a drawing, low means inferred from a sketch.
- Machine-readable copy: [`neufert-clearances.json`](neufert-clearances.json). `calc/clearances.js` imports it.
- These are design references from a 20th-century German handbook, not building code. Check local codes (accessibility, egress, ventilation) before building.

## Used by the quote builder

| Rule | Used for |
|---|---|
| `circulation.single_person` | interior passage width (×1.1 when walking), window standing zone |
| `stair.landing_depth` | landing outside doors and roll-up openings |
| `door.clear_opening_wood_frame` | warning when a personnel door is narrower than the standard 825 mm clear opening |
| `window.sill_height_low_view` | advisory when a sill is below the 500 mm low-view sill (check fall guarding) |
| `circulation.moving_allowance` | the ×1.1 walking factor |
| `air.room_volume_per_adult` | adults supported by air volume, using the conservative 24 m³ end (value set in clearances.js) |
| `daylight.window_to_floor_basic` | window area for coarse-work daylight, 1/8 of floor, about 45 lux (value set in clearances.js) |

Structural steel margins (corner posts, spacing between cuts, edge rails) and the AC unit service space are engineering and manufacturer assumptions, not Neufert. They are declared in `calc/clearances.js`.

## Human dimensions

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `body.reference_height_modulor` | 1.829 m | The Le Corbusier Modulor uses a 1.829 m standing figure, with navel height at 1.130 m. | 19 | high |
| `body.arm_outstretched_one_side` | 1.125 m | With one arm stretched out sideways, a standing person needs about 1.125 m of width. | 20 | high |
| `body.bending_forward_footprint` | 0.875 m | Bending forward from the waist takes about 0.875 m of floor depth, and the top of the bent back is about 1.375 m above the floor. | 20 | medium |
| `body.shoulder_width` | 0.5 m | Plan for about 0.50 m across the shoulders of a standing adult. | 20 | high |
| `body.standing_depth_profile` | 0.3 m | Seen from the side, a standing body is about 0.30 m deep. | 20 | medium |
| `body.standing_height_reach_horizontal` | 1.75 m | A standing adult is shown as 1.75 m tall, with the arm held level at about 1.50 m and needing 0.875 m of depth. | 20 | high |
| `lying.bed_length` | 2.0 m | A person lying flat needs 2.00 m of length; the body itself measures about 1.875 m. | 20 | high |
| `lying.sitting_up_in_bed_headroom` | 0.875 m | Sitting upright on a mattress takes about 0.875 m of headroom above the mattress and about 1.25 m of length. | 20 | medium |
| `sitting.armchair_depth` | 1.25 m | A lounge armchair with its user needs about 1.25 m of depth, with the seat at 0.25 to 0.35 m and a side table about 0.625 m high. | 20 | medium |
| `sitting.dining_table_height` | 0.75 m | A dining table stands about 0.75 m high, with the seat at 0.40 to 0.45 m and a footprint about 0.875 m deep. | 20 | high |
| `sitting.seated_head_height` | 1.35 m | A person seated at a work chair reaches about 1.35 m to the top of the head. | 20 | medium |
| `sitting.work_table_height` | 0.75-0.80 m | A desk for seated work stands 0.75 to 0.80 m high, with the chair seat at 0.45 to 0.48 m and a total depth of about 0.875 m. | 20 | high |
| `reach.arms_spread` | 1.75 m | Arms spread fully sideways span about 1.75 m, which is less than the 2.35 m inside width of a container. | 21 | high |
| `reach.overhead_vertical` | 2.25 m | With the arm raised straight up, a standing person reaches about 2.25 m. A finished container interior is often below 2.39 m once floor and ceiling build-up is added, so overhead storage and fixtures may sit within reach or bring the ceiling close to the head. | 21 | high |
| `reach.working_at_counter` | 1.125 m | Leaning over a counter to work takes about 1.125 m of floor depth, with the outstretched hand at about 1.50 m. Reaching up over a 0.50 m deep counter reaches about 2.0 m, in a total depth of about 0.875 m. | 21 | medium |

## Circulation

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `circulation.moving_allowance` | >=10% extra width | For people who are walking rather than standing, add at least 10% to these widths. | 21 | high |
| `circulation.single_person` | 0.625 m | One person standing face-on between two walls needs about 0.625 m of width. | 21 | high |
| `circulation.single_person_arms_akimbo` | 0.875 m | One person with elbows out or legs apart needs about 0.875 m between walls. | 21 | high |
| `circulation.single_person_sideways` | 0.375 m | The absolute minimum gap a person can turn sideways and squeeze through is about 0.375 m. | 21 | high |
| `circulation.step_length` | 0.75 m | A normal walking step is about 0.75 m long, and a marching step about 0.875 m. | 21 | high |
| `circulation.three_people` | 1.7 m | Three people abreast need about 1.70 m, and four need about 2.25 m. | 21 | high |
| `circulation.two_people` | 1.0 m | Two people side by side need about 1.00 m between walls, or about 1.15 m if one carries a bag. | 21 | high |
| `circulation.with_two_suitcases` | 1.0 m | A person carrying a bag in each hand needs about 1.00 m of width; with one bag, about 0.80 m. | 21 | high |
| `occupancy.max_density` | 6 persons/m2 | The tightest crowding possible is about 6 standing people per square metre, as in a cable car. | 21 | high |

## Compact interiors (vehicles)

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `vehicle.aisle_width` | 0.6 m | Aisles in compact coach interiors are drawn about 0.60 to 0.70 m wide. | 22 | medium |
| `vehicle.compact_seat_area` | 0.45 m2/seat | A dense rail-bus layout gives about 0.45 m2 of floor per seat; a 2nd-class express coach gives about 1.05 m2. | 22 | high |
| `vehicle.door_height_width` | 1.8-2.0 m high, 0.60-0.70 m wide | Train compartment doors are 1.8 to 2.0 m high and 0.60 to 0.70 m wide, a workable minimum for tight interiors. | 22 | high |

## Doors

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `door.clear_opening_wood_frame` | 575/700/825/950 × 1850/1975 mm | Inside a wood frame, the clear opening is about 50 mm less than the rough size, e.g. 825 × 1975 mm for an 875 × 2000 mm opening. | 117 | high |
| `door.double_leaf_widths` | 1250/1500/1750 mm | Double-leaf door openings are 1250, 1500 or 1750 mm wide. | 117 | high |
| `door.floor_gap` | 7.5 mm | Leave about 7.5 mm between the floor and the bottom of the door leaf. | 117 | high |
| `door.handle_height` | 1050 mm | Put the door handle centre 1.05 m above the floor. | 117 | high |
| `door.hinge_positions` | 250 mm below head, 300 mm above floor | Centre the top hinge 250 mm below the frame head and the bottom hinge 300 mm above the floor. | 117 | high |
| `door.interior_single_leaf` | 750–1000 × 2000 mm rough | Single-leaf interior doors are drawn at 750, 875 or 1000 mm wide by 2000 mm high; cellar and secondary doors use 625–875 × 1875 mm. | 117 | high |
| `door.module_heights` | 1875 / 2000 mm (also 2125, 2250) | Doors in the main rooms take a 2000 mm high rough opening; cellar and secondary doors can use 1875 mm. | 117 | high |
| `door.module_widths` | single-leaf rough openings 625/750/875/1000 mm | Single-leaf door rough openings come in 125 mm steps: 625, 750, 875 or 1000 mm wide. | 117 | high |
| `door.overhead_folding_recess` | 25–30 cm lintel recess; 32 cm ceiling track | In tight spots with no room to slide sideways, a door that folds up into the lintel needs about 25–30 cm of space above the opening. | 119 | medium |

## Windows

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `window.head_to_ceiling` | 20–50 cm | In the sketches, the window head sits about 20 to 50 cm below the ceiling. | 110 | medium |
| `window.sill_height_desk` | 78 cm sill, top 1.57 m | In living rooms and studies, set the sill at desk height of about 78 cm. | 110 | high |
| `window.sill_height_kitchen` | 1.25 m sill, 1.25 m glazing | In kitchens, the window is drawn above the worktop backsplash with a sill of about 1.25 m. | 110 | medium |
| `window.sill_height_low_view` | 50 cm | A low sill of about 50 cm suits rooms that sit high with a good view, so seated people can see out. It is a low option, not a minimum sill height. Below standard sill height, check guarding and fall-protection rules. | 110 | high |
| `window.sill_height_office` | 1.00 m sill, 1.50 m glazing | In offices, the sketch shows a 1.00 m sill with about 1.50 m of glazing above it. | 110 | medium |

## Stairs, ramps and ladders

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `ramp.comfortable_slope` | 1:10 to 1:8 | Walking ramps feel comfortable at gradients between 1:10 and 1:8. | 120 | high |
| `stair.going_minus_rise` | G − R = 12 cm | The most comfortable steps have a tread about 12 cm deeper than the riser is tall. | 120 | high |
| `stair.handrail_walkline_narrow` | 35–40 cm | On narrow or curved stairs, put the walking line 35–40 cm in from the handrail. | 120 | high |
| `stair.handrail_walkline_straight` | 55 cm | On comfortable straight flights, the walking line runs about 55 cm from the handrail. | 120 | high |
| `stair.nosing_overhang` | 2–5 cm | Each tread's nosing should stick out 2 to 5 cm past the riser below. | 120 | medium |
| `stair.optimal_step` | 17 × 29 cm | The best step is a 17 cm riser with a 29 cm tread. | 120 | high |
| `stair.rise_going_alt_formula` | R + G = 48 cm | A less common check is that one riser plus one tread equals about 48 cm. | 120 | high |
| `stair.rise_going_formula` | 2R + G = 61–64 cm (avg 62.5 cm) | Size steps so that two risers plus one tread fall between 61 and 64 cm, ideally about 62.5 cm. | 120 | high |
| `stair.ship_ladder_max_pitch` | 21/15 without rail; 25/10 with rail | Ship-type stairs can be as steep as a 21/15 riser/tread with no rail, or 25/10 if they have a handrail. | 120 | medium |
| `stair.spiral_min_tread` | ≥10 cm at 15 cm from the narrow end | On spiral stairs, measured 15 cm from the narrow end, the tread must still be at least 10 cm deep. | 120 | high |
| `stair.step_normal_range` | R 16–17 cm, G 29–30 cm | Standard steps for homes and offices use 16–17 cm risers and 29–30 cm treads. | 120 | high |
| `stair.width_three_persons` | 1.875 m | Three people walking side by side need about 1.875 m of stair width. | 120 | high |
| `stair.width_two_pass` | ≥110 cm (125 cm shown) | For two people to pass each other, the stair needs at least about 1.10 m of width; the drawing shows 1.25 m. | 120 | medium |
| `ramp.slope_classes` | flat ≤1:10 (≤6°); gentle 1:10–1:6; steep 1:6–1:2.5 | Up to 6° (1:10) a ramp counts as flat, 1:10 to 1:6 as gentle, and 1:6 to 1:2.5 as steep. | 121 | high |
| `stair.compact_1m_plan_area` | ≈4.2–5.2 m² for 2.75 m storey, 1.0 m wide | A 1.0 m wide flight with no landing covering a 2.75 m storey (16 steps of about 17/29) takes roughly 4.2 to 5.2 m² of floor area. | 121 | medium |
| `stair.flight_step_count` | ≥3 and ≤18 steps | A single flight should have at least 3 and no more than 18 steps. | 121 | high |
| `stair.headroom_attic_drawing` | ≥1.95 m | The section drawings show at least 1.95 m of clear headroom at the base of the stair and under an attic roof. | 121 | medium |
| `stair.headroom_dwelling_min` | >1.80 m | In homes, headroom over a stair must be more than 1.80 m. | 121 | high |
| `stair.headroom_general` | 2.1 m | Headroom over a stair is usually 2.1 m. | 121 | high |
| `stair.landing_depth` | n × 63 + 29 cm (e.g. 92 cm or 1.55 m) | Make a landing a whole number of 63 cm strides plus one tread deep, e.g. 92 cm, or 1.55 m for two strides. | 121 | high |
| `stair.landing_door_swing` | no encroachment | A door that opens onto a landing must not swing into the landing's area. | 121 | high |
| `stair.landing_width` | ≥ stair width | A landing must be at least as wide as the stair itself. | 121 | high |
| `stair.max_pitch_multi_family` | 20/23 max | Stairs in multi-storey housing should be no steeper than about a 20/23 riser/tread. | 121 | medium |
| `stair.max_pitch_single_family` | 20/20 max | In single-family homes, a stair can be as steep as a 20 cm riser over a 20 cm tread. | 121 | medium |
| `stair.width_attic_cellar_rental` | 70 cm, up to 45° | Cellar and attic stairs in rented houses can be 70 cm wide with a pitch of up to 45°. | 121 | high |
| `stair.width_multi_family` | ≥1.0 m | In multi-family housing, stairs are generally at least 1.0 m wide. The footnote applies this to buildings with more than two full storeys. | 121 | high |
| `stair.width_single_family` | ≥90 cm | In single-family homes, stairs need at least 90 cm clear between the handrail and the wall. | 121 | high |
| `ladder.attic_folding_hatch` | hatch 0.85–1.45 m long; at 2.10 m ceiling needs 1.30–1.90 m swing space | With a 2.10 m ceiling, a folding attic ladder needs a hatch 0.85 to 1.45 m long and 1.30 to 1.90 m of space in the loft for the fold. | 122 | high |
| `ladder.fixed_rung_spacing` | 31 cm rungs, ~1.00 m clear | The fixed ladder drawing shows rungs about 31 cm apart and about 1.00 m of clear space in front. | 122 | medium |
| `stair.furniture_transport` | 1.40 m landing, 2.00 × 0.70 item | To carry furniture of about 2.00 × 0.70 m up a stair, the landing needs about 1.40 m. | 122 | medium |
| `stair.well_gap_min` | ≥12 cm | Between two parallel flights, leave a gap of at least 12 cm to fix the balustrade. | 122 | high |

## Kitchen

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `kitchen.width_min` | 1.875 m | Plan a kitchen no narrower than 1.875 m; the Frankfurt kitchen uses this as its minimum width. | 162 | high |
| `kitchen.auxiliary_counter.depth` | 0.45 m | Secondary or auxiliary work surfaces can be just 45 cm deep. | 163 | high |
| `kitchen.counter.depth` | 0.55-0.65 m | Kitchen worktops should be 55 to 65 cm deep. | 163 | high |
| `kitchen.counter.height` | 0.85 m | The usual worktop height is 85 cm, which suits both kneading and dishwashing. | 163 | high |
| `kitchen.counter.height_range` | 0.75-0.90 m | Section drawings show worktops from 75 cm to 90 cm high. 85 cm is the height recommended for both kneading and washing up. | 163 | medium |
| `kitchen.extract_duct.diameter` | 275 mm | Where there is no flue, an extractor duct of about 275 mm diameter can take fumes out. | 163 | medium |
| `kitchen.hood.height_above_hob` | >=0.65 m | Mount the extractor hood at least 65 cm above the cooking surface. | 163 | medium |
| `kitchen.oven.clear_front` | 1.1 m | An oven or pull-out grill under the range needs about 1.10 m clear in front for bending and handling. | 163 | high |
| `kitchen.room_height` | 2.1 m | Kitchen sections draw tall units and shelving up to about 2.10 m. This is the height of the cabinetry, not a minimum ceiling height. | 163 | medium |
| `kitchen.seated_work.height` | 0.65 m | Provide a pull-out board at about 65 cm under the 85 cm counter for working seated. | 163 | high |
| `kitchen.swing_door.width` | 1.0 m | A swing door between kitchen and dining is shown about 1.00 m wide, with a kick plate up to 40 cm. | 163 | medium |
| `kitchen.two_line.aisle_small` | 1.00-1.10 m | In a small two-line kitchen 2.25 m wide, leave 1.00 to 1.10 m between the 75 cm and 50 cm deep runs so a second person can help. | 163 | high |
| `kitchen.two_line.width_small` | 2.25 m | A small kitchen with counters on both walls can work at 2.25 m wide overall. | 163 | high |
| `kitchen.two_person.width` | 2.5 m | A two-person kitchen section is 2.50 m wide: 45 and 45 cm units, an 85 cm aisle, and a 75 cm range on the opposite wall. | 163 | high |
| `kitchen.wall_cabinet.clear_above_counter` | 0.5 m | Leave about 50 cm between the 85 cm worktop and the underside of wall cabinets. | 163 | medium |
| `kitchen.wall_cabinet.depth` | 0.30 m | Wall cabinets over a worktop are drawn about 30 cm deep. The 45 cm unit shown is a pass-through cupboard over a serving hatch. | 163 | medium |
| `kitchen.wall_cabinet.top_reach` | <=1.85 m | Keep the top shelf of wall cabinets at or below about 1.85 m so it stays reachable. | 163 | high |
| `kitchen.sink.bowl_size` | 43x43x22 cm | A standard sink bowl is about 43 by 43 cm and 22 cm deep. | 164 | high |
| `kitchen.sink.height` | 0.85-0.90 m standing; 0.75 m seated | Set the sink at 85 to 90 cm for standing work, or 75 cm with a forward-tilted basin for seated work. | 164 | high |
| `kitchen.stove.footprint` | 55-60 x 55-65 cm, h 80-85 | Freestanding ranges take about 55 to 65 cm depth and 55 to 110 cm width, at 80 to 85 cm high. | 164 | medium |
| `kitchen.frankfurt.aisle` | 0.86 m | In the Frankfurt kitchen the clear aisle between the two runs is about 86 cm, and later testing found the room should have been slightly wider. | 165 | medium |
| `kitchen.frankfurt.length` | 3.44 m | The reference Frankfurt kitchen is 1.875 m wide by about 3.44 m long, a galley with counters on both sides. | 165 | high |
| `kitchen.interior_kitchenette` | 1.875 x 1.25 m | An interior kitchenette with forced ventilation can fit in 1.875 m by 1.25 m. | 165 | medium |
| `kitchen.kitchenette.one_person` | 90 x 60 cm, h 2.00 | A one-person apartment kitchenette cabinet fits in a 90 cm wide, 60 cm deep, 2.00 m tall unit. | 165 | high |
| `kitchen.fridge.small` | 50-100 L: 55 x 55-65 cm, h 80-90 | Small refrigerators of 50 to 100 L take about 55 cm width and 55 to 65 cm depth, at 80 to 90 cm high. | 166 | high |
| `kitchen.base_cabinet.dims` | H 80-90, D 45-60 cm | Base cabinets are 80 to 90 cm high (85 preferred) and 45 to 60 cm deep. | 167 | high |
| `kitchen.sink_top.depth` | 0.55-0.60 m | Sink tops over built-in cabinets are 55 to 60 cm deep, with 16 to 18 cm deep bowls. | 167 | medium |
| `kitchen.tall_cabinet.dims` | H 1.70-2.20, W 50-60, D 35-55 cm | Tall broom or pantry cabinets are 1.70 to 2.20 m high, 50 to 60 cm wide and 35 to 55 cm deep. | 167 | high |
| `kitchen.toe_kick.height` | >=8 cm | Give base cabinets a recessed plinth at least 8 cm high, set back 6 to 10 cm, for toes and cleaning. | 167 | high |

## Bathroom

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `bath.compact_wc_bath.depth` | 1.46 m | A compact apartment WC with bathtub fits in about 1.46 m depth, using a 76 cm tub width and a 70 cm WC zone. | 161 | medium |
| `bath.tub.width` | 0.76 m | Compact bathroom plans use a bathtub about 76 cm wide. | 161 | medium |
| `bath.wc_plus_basin.width` | 1.0 m | A separate WC with basin is shown in a 1.00 by 1.25 m cell. | 163 | low |
| `bath.wet_core.width` | 1.875 m | Bathrooms sharing a plumbing wall with the kitchen are planned at 1.875 m wide by about 2.37 to 2.75 m long. | 163 | medium |

## Sleeping

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `bed.child_sizes` | 60x125 / 70x140 cm | Children's beds come in 60x125 and 70x140 cm interior sizes. | 177 | high |
| `bed.double_mattress_std` | 150x200 cm interior | The standardized double bed is 150 cm wide and 200 cm long inside the frame. | 177 | high |
| `bed.exterior_allowance` | +6 cm width, +10 cm length | To get a metal bed's outer footprint, add 6 cm to the inner width and 10 cm to the inner length. | 177 | high |
| `bed.mattress_top_height` | 0.4 m | The top edge of the bed's wooden mattress frame sits about 40 cm above the floor. | 177 | high |
| `bed.niche_with_overhead_storage` | 3.26 m wall; bed niche 1.50 m high; seat 30–35 cm | A small-room scheme puts the bed in a niche with cupboards above and beside it, taking up a 3.26 m wall. | 177 | medium |
| `bed.single_mattress_std` | 90x190 cm interior | The standard adult single bed frame is 90 by 190 cm inside; 80x180 and 100x200 are the adult alternatives. | 177 | high |
| `bunk.alcove_with_wardrobe` | 2.00 m bunk + 1.25 m wardrobe; bunk height 1.50 m; ceiling 2.60 m | A 2.00 m bunk alcove sits beside a 1.25 m wardrobe. The bunk stack is about 1.50 m high and the drawing assumes a 2.60 m ceiling, so a standard 2.39 m container interior needs a lower stack or a high-cube box. | 177 | medium |
| `bed.double_drawn_length` | 1.50 x 2.00 m | A double bed is drawn at 1.50 m wide by 2.00 m long overall. | 178 | high |
| `bed.gap_between_singles` | 0.5 m | Two parallel 90 cm single beds are drawn with a 50 cm gap between them. | 178 | medium |
| `bed.gap_between_singles_alt` | 0.8 m | A more generous layout for two single beds leaves an 80 cm walkway between them. | 178 | medium |
| `bed.separate_doubles_layout` | 1.40 + 0.80 + 0.90 m | In one shown layout, two beds placed head to foot in a room fit a 1.40 m bed, an 80 cm aisle and a 90 cm bed across the width. | 178 | low |
| `bed.twin_pushed_together` | 1.80 x 1.90 m | Two single beds pushed together take up about 1.80 m by 1.90 m. | 178 | medium |
| `bunk.tier_spacing` | ~0.90 m between tiers, upper ~1.40 m | Bunks are drawn with about 90 cm between the levels and the upper bunk at roughly 1.40 m. | 178 | low |

## Storage

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `wardrobe.depth_built_in` | 0.6 m | Built-in bedroom wardrobes are drawn 60 cm deep. | 177 | high |
| `wardrobe.depth_shallow_corridor` | 55 cm | Wardrobe units that divide two rooms are drawn about 55 cm deep. | 177 | medium |
| `wardrobe.partition_thickness` | 3–10 cm | Partitions between wardrobe compartments are 3 to 10 cm thick, depending on how they are built. | 177 | high |
| `wardrobe.walkin_width` | 2.80 x 1.80 m | A walk-in dressing room for a large house is drawn about 2.80 m by 1.80 m. | 177 | medium |
| `aisle.between_shelving` | 72–77 cm typical, 85 cm heavy use | Aisles between shelving units are usually 72 to 77 cm wide, or 85 cm where use is heavy. | 245 | high |
| `shelf.depth_range` | 20–35 cm | Standard shelf depths are 20, 25, 30 or 35 cm, with 15 and 40 cm as exceptions. | 245 | high |
| `shelf.top_reach` | top shelf 1.90 m; unit 2.25 m | The highest shelf you can comfortably reach is at about 1.90 m, on a shelving unit 2.25 m tall. | 245 | high |
| `wardrobe.office_hanging` | 1.22 m wide, 0.47–0.50 m deep, 2.10 m tall | An office cupboard with a hanging-clothes section is 1.22 m wide, 47 to 50 cm deep and 2.10 m tall. | 246 | high |
| `wardrobe.staff_locker` | 1.20 m wide, 0.42–0.50 m deep, 2.00–2.10 m tall | A clothes locker for staff is about 1.20 m wide, 42 to 50 cm deep and 2.0 to 2.1 m tall. | 246 | high |

## Dining

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `dining.table_height` | 0.78 m | Standard dining table height is 78 cm. | 168 | high |
| `dining.table_min_rect` | 70x100 cm | The smallest standard rectangular dining top is 70 by 100 cm. | 168 | high |
| `dining.booth_min` | 1.70 x 1.27 m; table 60 cm | The tightest eating nook, a railway-carriage style booth with fold-down seats, needs about 1.70 by 1.27 m around a 60 cm table. | 169 | high |
| `dining.corner_bench` | 1.85 x (1.35+0.60) m | A corner bench with side cupboards seats a small group compactly in about 1.85 m by 1.95 m. | 169 | medium |
| `dining.min_room_6` | 3.20 x 3.70 m | A minimum dining room for six around a central table is about 3.20 by 3.70 m, with no sideboards. | 169 | high |
| `dining.nook_loose_chairs` | 1.80 x 1.00 m | The same nook with loose chairs needs slightly more width, about 1.80 by 1.00 m. | 169 | high |
| `dining.round_table_formula` | diameter = place width x seats / 3.14 | To size a round table, multiply place width by number of seats and divide by pi; six 60 cm places need about 1.04 m. | 169 | high |
| `dining.seat_depth_zone` | ~0.50 m | When service passes behind the chairs, the seated diner takes about 50 cm from the table edge, and the passage starts after that. | 169 | medium |
| `dining.table_width` | 55–110 cm | Dining tables run 55 to 110 cm wide, with 10 to 20 cm extra at each end seat. | 169 | high |
| `dining.wall_clearance_no_service` | 0.45-0.55 m | If no one serves at the table, allow 45 to 55 cm from the table edge to the wall. This covers the seated diner, not extra space behind the chair. | 169 | medium |
| `dining.wall_clearance_served` | 0.90–1.00 m | When someone serves from behind the chairs, keep 90 cm to 1.00 m clear between the seat zone and the wall. | 169 | medium |
| `dining.width_per_place` | 55–70 cm | Give each diner 55 to 70 cm of table edge. | 169 | high |

## Office

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `desk.study_carrel` | 1.00 x 0.65 m | A desk built into shelving is about 1.00 m wide and 65 cm deep. | 245 | medium |
| `counter.service` | 62.5 cm deep, ~90 cm high | Public service counters are about 62.5 cm deep and 90 cm high, rising to 1 m when only 30 cm deep. | 246 | high |
| `desk.chair_zone` | 45–70 cm (area ~1.05–1.33 m²) | Allow 45 to 70 cm behind the desk for a swivel chair, which takes up roughly 1.05 to 1.33 m². | 246 | high |
| `desk.compact` | 140x70 cm, 76 cm high | A compact office desk of 140 by 70 cm, 76 cm high, saves about 0.5 m² over the standard desk. | 246 | high |
| `desk.standard` | 156x78 cm, 78 cm high | The standard office desk measures 156 by 78 cm and stands 78 cm high. | 246 | high |

## Laundry and storage

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `cleaning_cabinet.depth` | 0.375 m | A broom or cleaning cupboard is about 37.5 cm deep and 1.80 m tall, from 37.5 cm wide upward. | 158 | high |
| `laundry.ironing.board_size` | 1.70 x 0.30-0.42 m | An ironing board is about 1.70 m long, 30 to 42 cm wide, at roughly 85 cm high. | 158 | high |
| `laundry.foldaway_ironing.cabinet` | 45 x 15 cm, h 2.25 | A fold-down ironing table recessed in the wall needs a cabinet about 45 cm wide, 15 cm deep and 2.25 m tall. | 159 | medium |
| `laundry.ironing.height_standing` | 0.9 m | Ironing standing needs a board about 90 cm high; seated ironing works at about 65 cm. | 159 | high |
| `pantry.headroom` | >=1.90 m, 2.00 preferred | Pantries and storerooms may be under 2.50 m high but need at least 1.90 m standing height, ideally 2.00 m. | 161 | high |

## Air and ventilation

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `air.co2_per_person` | 0.020 m3/h CO2 and 40 g/h water vapour | An average person gives off about 0.020 m3 of CO2 and 40 g of water vapour per hour. | 24 | high |
| `air.natural_change_rate` | 1.5-2 air changes/h | In detached buildings, natural infiltration gives roughly 1.5 to 2 air changes per hour even with the windows shut. | 24 | high |
| `air.reduced_volume_high_ventilation` | 7.5 m3/person (10 m3 in bedrooms) | With strong ventilation, such as open windows or mechanical air, the volume per person can drop to 7.5 m3, or 10 m3 in bedrooms. | 24 | high |
| `air.room_volume_per_adult` | 16-24 m3/adult (8-12 m3/child) | Natural air changes of 1.5 to 2 per hour are enough when each adult has 16 to 24 m3 of room volume, or each child 8 to 12 m3. | 24 | high |
| `air.volume_assumed_ceiling_height` | 2.5 m | The 16 to 24 m3 per adult figure assumes a clear height of at least 2.5 m, which works out to 6.4 to 9.6 m2 of floor per adult. At 2.39 m inside, a container needs more floor per person to reach the same volume. | 24 | high |
| `air.volume_per_adult_one_change` | 32 m3/adult/h (14 m3/child) | To keep CO2 below 1 part per thousand, each adult needs 32 m3 of fresh air per hour, and each child 14 m3. | 24 | high |
| `ventilation.opening_geometry` |  | For the same area, tall narrow openings move more air than low wide ones. An inlet near the floor paired with an outlet near the ceiling is more effective. | 77 | high |
| `ventilation.room_humidity_table` | living 20 C/65%, bedroom 18 C/55%, kitchen 20 C/75%, bath 22 C/80% | Design conditions by room: living rooms 20 C at 65% RH, bedrooms 18 C at 55%, kitchens 20 C at 75%, bathrooms 22 C at 80%. | 77 | high |
| `ventilation.stack_height` |  | Stack-driven airflow depends on the height difference between the inlet and outlet openings, not on the length of the duct. | 77 | high |
| `ventilation.windows_sufficient_dwellings` |  | Ventilating through windows is generally enough for living spaces; sash windows work best, letting air in low and out high. | 77 | high |

## Daylight

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `daylight.design_outdoor_lux` | 3000 lux (CIE 5000 lux) | Size windows against a minimum outdoor level of 3000 lux on the horizontal; the CIE suggests 5000 lux. | 103 | high |
| `daylight.room_efficiency` | 30-50%, typical 40% | Rooms with vertical windows deliver 30 to 50% of the entering light to the work plane; use 40% as the default. | 103 | high |
| `daylight.window_to_floor_basic` | 1/8 of floor area | Window area equal to 1/8 of the floor gives only about 45 lux on average, which is enough just for coarse work. | 103 | high |
| `daylight.window_to_floor_drawing` | 0.417 of floor area | Fine work needing 150 lux calls for window area of about 42% of the floor, assuming 3000 lux outside, a window factor of 0.3 and 40% efficiency. | 103 | high |
| `daylight.work_plane_height` | 1.0 m | Daylight calculations measure light on a horizontal work plane 1 m above the floor. | 103 | high |

## Artificial light

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `lighting.cove_gap_to_ceiling` | >= 1/8 of room width | For indirect cove lighting, keep the gap between the cove and the ceiling at least 1/8 of the room width so the ceiling is lit evenly. | 95 | high |
| `lighting.wall_reflectance` | white plaster ~86%, white oil paint 76%, light yellow 55% | Light finishes reflect much more light than dark ones: white plaster about 86%, white oil paint 76%, light yellow 55%, against roughly 4 to 13% for black and saturated reds. Our inference: this favours light finishes in a small interior. | 95 | high |

## Thermal comfort

| Key | Value | Rule | Book p. | Confidence |
|---|---|---|---|---|
| `climate.heat_per_adult` | 96-140 kcal/h per adult | An adult gives off about 96 kcal/h at rest, 118 kcal/h in normal work and 140 kcal/h in heavy work, which matters for cooling a small box. | 24 | high |
| `climate.relative_humidity` | 50-60% ideal, 40-70% limits | Keep indoor relative humidity near 50 to 60%, and always between 40 and 70%. | 24 | high |
| `climate.room_temperature` | 18-20 C at rest, 15-18 C working | Aim for 18 to 20 C for people at rest and 15 to 18 C for active work. | 24 | high |
| `climate.summer_indoor_temp` | e.g. 25 C inside at 30 C outside | In summer, the most comfortable indoor temperature rises with the outdoor one, from 20 C at 20 C outside to 28 C at 36 C outside. | 76 | high |
