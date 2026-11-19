# Container Alliance · Quote Builder

A quote card with a live 3D container that updates as options change: size (20 ft, 40 ft, custom length), quantity, conditions, modifications, paint color, and add-ons you can drag on the container. Camera views (3/4, side, doors, rear, top) and a cut view show the interior.

| File | What it is |
|---|---|
| [`index.html`](index.html) | Quote card UI and state; loads the 3D viewer |
| [`container3d.js`](container3d.js) | three.js scene, `createContainer3D(el).update(state)` |
| `models/` | OBJ models and textures: container, AC unit, steel casement window |

## Run

ES modules need a server:

```bash
python3 -m http.server 5178
```

Then open http://localhost:5178.

## Notes

- three.js 0.160.0 from jsDelivr via import map; Google Fonts (Open Sans, Titillium Web).
- Container Alliance's own brand tokens (navy `#174984`), not Fetchly's brand.
- Partner name, location and option lists are sample content; no pricing logic.
- Source: claude.ai artifact https://claude.ai/artifact/TC5RShzgj29rvSdWX7jpfj (version 1793132472-b49e). Earlier code history in `fetchly/container-alliance-quote-builder`.
