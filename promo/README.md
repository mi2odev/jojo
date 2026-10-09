# Promo video ad

A 30-second vertical (1080×1920) motion-graphics ad for the quiz: `out/jojo-quiz-ad.mp4`.

It is styled after the site: purple/gold/magenta palette, Anton and Bodoni Moda type, speed lines, halftone, ゴゴゴ "menacing" text, a gold-framed "Awaken your Stand" CTA and a "To Be Continued" ending. It uses the character art in `public/images`.

| Time | Scene |
| --- | --- |
| 0–5s | ゴゴゴ intro: "Every bizarre adventure… begins with one question." |
| 5–8s | Logo slam: "Which Joestar are you?" (lands on the music drop) |
| 8–17.6s | Character montage: 8 Joestars, one cut per 1.2s on the beat |
| 17.6–23.6s | "20 questions · 8 legendary Stands · 1 destiny" |
| 23.6–28.4s | Call to action: jojomi2o.netlify.app |
| 28.4–30.5s | Sepia freeze + "To Be Continued" |

Audio (music, voiceover, sound effects) was generated with ElevenLabs and mixed with ffmpeg.

## Re-render

- `ad.html`: the animation. `window.render(t)` draws the frame at `t` seconds.
- `timeline.json`: scene timings, synced to the voiceover and the music drop.
- `node render.mjs stills <dir> 2 6.8 12`: preview stills.
- `node render.mjs frames <dir> 30 <worker> <workers>`: every frame as JPEG. Run 4 workers in parallel.
- Encode: `ffmpeg -framerate 30 -i <dir>/f%05d.jpg -i mix.wav -c:v libx264 -crf 19 -pix_fmt yuv420p -c:a aac out.mp4`
