# Performance Monitor - Gen 2 v1.0.0

Gen 2-only port of Performance Monitor for Pokémon Recomp.

## Compatibility

- Loads only for `gen2` games (Gold / Silver / Crystal when supported by the host).
- Uses the unique mod id `pokemonmod_gen2_performance_monitor`.
- Uses its own `mod.storage` directory, so reports do not overwrite the original `performance_monitor` exports.
- Internal profiler markers are namespaced for this Gen 2 port.
- No manifest conflict is declared with the original mod, so both packages may remain installed; the engine only loads this build for Gen 2.

## Controls

- **F3** — show / hide overlay
- **F4** — compact / detailed view
- **F6** — reset rolling samples
- **F8** — start/stop the 10-second diagnostic capture
- **F9** — re-export the last completed diagnostic report

## Diagnostic reports

Reports are written through the public `mod.storage` API under this mod's own storage namespace:

`mod_storage/<game>/<playthrough-id>/pokemonmod_gen2_performance_monitor/exports/`

Main files:

- `performance_report_latest_json.bin`
- `performance_report_latest_txt.bin`

The JSON `.bin` file is plain UTF-8 JSON and can be shared for analysis.

## Notes

The monitor profiles engine/mod runtime hooks and events, slow frames, renderer counters, memory usage and mod-attributed callbacks. Optional deep Lua sampling is used only when the host exposes the Lua debug API.
