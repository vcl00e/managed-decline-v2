# Art kit

`source/blender/generate_art_kit.py` is the intended Blender-side source generator. It creates the modular prototype kit, saves a `.blend` source file, and exports one embedded `.gltf` per reusable asset.

`export/*.gltf` are committed so the Godot prototype can be opened immediately without requiring Blender to regenerate assets first.

## Regenerate in Blender

From the prototype directory with Blender installed:

```bash
blender --background --factory-startup --python assets/source/blender/generate_art_kit.py
```

The script writes:

- `assets/source/blender/managed_decline_art_kit.blend`
- refreshed embedded glTF assets under `assets/export/`

The committed embedded glTF assets in the initial PR were generated in an environment without Blender using a schema-matched geometry surrogate, so the first successful Blender regeneration is part of the pipeline verification. Do not treat those initial assets as proof that Blender itself has already round-tripped here.
