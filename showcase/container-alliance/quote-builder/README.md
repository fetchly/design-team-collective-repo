# Container Alliance · Quote Builder

A quote card with a live 3D container that updates as options change: size (20 ft, 40 ft, custom length), quantity, conditions, modifications, paint color, and add-ons you can drag on the container. Camera views (3/4, side, doors, rear, top) and a cut view show the interior.

| File | What it is |
|---|---|
| [`index.html`](index.html) | Quote card UI and state; loads the 3D viewer |
| [`container3d.js`](container3d.js) | three.js scene, `createContainer3D(el).update(state)` |
| [`blueprint.js`](blueprint.js) | Placement measurements and the 2D blueprint (roof plan, front and back elevations) |
| [`calc/clearances.js`](calc/clearances.js) | Interior size, clearance zones per add-on, placement validation, free spacing. Drives the drag limits |
| [`knowledge/neufert-clearances.md`](knowledge/neufert-clearances.md) | Neufert dimensional rules for small spaces, paraphrased with page numbers (+ JSON the calc imports) |
| `models/` | OBJ models and textures: container, AC unit, steel casement window |

## Run

ES modules need a server:

```bash
python3 -m http.server 5178
```

Then open http://localhost:5178.

## Clearances

Each add-on type declares a clearance zone in `calc/clearances.js`: steel to keep between cuts, distance to the end frames and the base/roof rails, and the space it needs inside (door swing, standing room at a window) or outside (door landing, AC service). Dragging respects the steel and corner rules; the card lists every overlap or violation, and the 2D blueprint draws each zone as a dashed halo and turns offenders red. Human-scale rules come from Neufert (see the knowledge file); steel and AC margins are engineering assumptions and say so in the code.

Run the tests (Node 22+):

```bash
node --test calc/
```

## Notes

- Measurements are outside dimensions on the model body (8 ft × 8 ft 6 in section, length × 0.3048 m). Each add-on is measured from the rear end face, the door end face, the base and the roof line to its opening edges; roof add-ons also from both long edges. The **2D blueprint** button shows the drawings and prints them.

- three.js 0.160.0 from jsDelivr via import map; Google Fonts (Open Sans, Titillium Web).
- Container Alliance's own brand tokens (navy `#174984`), not Fetchly's brand.
- Partner name, location and option lists are sample content; no pricing logic.
- Source: claude.ai artifact https://claude.ai/artifact/TC5RShzgj29rvSdWX7jpfj (version 1793132472-b49e). Earlier code history in `fetchly/container-alliance-quote-builder`.
