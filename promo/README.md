# Promo video ad

A 31-second vertical (1080×1920) motion-graphics ad for the quiz: `out/jojo-quiz-ad.mp4`.

It is styled after the site: purple/gold/magenta palette, Anton and Bodoni Moda type, speed lines, halftone, ゴゴゴ "menacing" text, a gold-framed "Awaken your Stand" CTA and a "To Be Continued" ending. It uses the character art in `public/images`.

| Time | Scene |
| --- | --- |
| 0–5s | ゴゴゴ intro: "Every bizarre adventure… begins with one question." |
| 5–8.2s | Logo slam: "Which Joestar are you?" (lands on the music drop) |
| 8.2–19.2s | Character montage: 8 Joestars, one cut every 3 beats with a Stand-punch hit; the narrator calls out each name |
| 19.2–24.8s | "20 questions · 8 legendary Stands · 1 destiny" |
| 24.8–28.9s | Call to action: jojomi2o.netlify.app |
| 28.9–31s | Sepia freeze + "To Be Continued" |

Audio was generated with ElevenLabs: an original JoJo-style track (saxophone lead, slap bass, brass, 130 BPM), plus voiceover and sound effects. Official JoJo soundtrack music is copyrighted and gets ads muted or blocked, so it isn't used.

## Re-render

- `ad.html`: the animation. `window.render(t)` draws the frame at `t` seconds.
- `timeline.json`: scene timings, synced to the voiceover and the music drop.
- `node render.mjs stills <dir> 2 6.8 12`: preview stills.
- `node render.mjs frames <dir> 30 <worker> <workers>`: every frame as JPEG. Run 4 workers in parallel.
- `python3 mix.py <audio_dir> -0.145`: builds `mix.wav` from the music, voiceover and SFX files. The offset lines the music drop up with the "ARE YOU?" slam.
- Encode: `ffmpeg -framerate 30 -i <dir>/f%05d.jpg -i mix.wav -c:v libx264 -crf 19 -pix_fmt yuv420p -c:a aac out.mp4`
