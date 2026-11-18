# Palette Parcel

Match an editable RGB swatch to the closest thread in a personal palette using CIE76 colour distance.

Compare a reference swatch only with threads you actually own. The two front-panel patches show the reference and the closest match side by side, with the thread code alongside them.

## Tune a reference color

1. Enter thread codes and six-digit RGB values in device settings, for example `MOS
2. 678362,INK
3. 303B47`. Use colors measured for your own materials if available.
4. Turn the wheel to change the active channel in steps of five. Click to advance from red to green to blue.
5. Watch the left patch while you edit. The right patch and short code show the nearest color in your list.

![The reference swatch shifts slightly while MOS stays the nearest thread.](media/guide/tune-the-reference.gif)

## Compare and save the choice

1. Read the rear for the reference hex value, match hex value and CIE76 distance. A smaller distance means a closer match among these entries.
2. Press **Start** to save the reference RGB. Try another channel adjustment, then hold the wheel to recall the stored reference.
3. Take the suggested physical thread to your fabric for the final comparison. The LEDs display the configured colors.

![Two green comparison patches remain visible beside the MOS code as the selected channel is adjusted.](media/guide/compare-thread-swatches.gif)

## Example from the emulator

The sample palette has six entries. In the recording the small channel edits leave MOS closest; the code need not change at every turn. If the reference exactly equals a palette entry, its calculated color distance is zero.

## Run in the emulator

Open BUSY Bar Emulator. From this repository, run:

```sh
~/.busy-emulator/bin/busy-emulator dev --once
```

Press **Back** to exit.

The GIFs are excerpts from the emulator recording. Each front-display pixel is shown at 9× its original width and height. The end frames pause for reading.

[Full recording](media/controls.mp4) · [Rear display](screenshots/back-1.png) · [Firmware test](EMULATOR-QA.md) · [MIT license](LICENSE)
