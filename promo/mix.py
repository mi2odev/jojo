"""Mix the ad soundtrack: music (ducked under the voiceover) + voiceover + SFX.

    python3 mix.py <audio_dir> [music_offset_seconds] [music_volume]

<audio_dir> must contain: music.mp3, vo1.mp3, vo2.mp3, vo3.mp3, impact.mp3,
whoosh.mp3, swap.mp3, sparkle.mp3, rumble.mp3, and name1.mp3 … name8.mp3
(the narrator calling each character as they appear). Writes <audio_dir>/mix.wav.
music_offset shifts the music so its drop lands on the "ARE YOU?" slam.
Event times match timeline.json.
"""
import json
import subprocess
import sys
from pathlib import Path

here = Path(__file__).parent
T = json.loads((here / 'timeline.json').read_text())
d = Path(sys.argv[1])
music_offset = float(sys.argv[2]) if len(sys.argv) > 2 else 0.0
music_volume = float(sys.argv[3]) if len(sys.argv) > 3 else 0.6
dur = T['DUR']

ins = []


def add(name):
    ins.extend(['-i', str(d / name)])
    return len(ins) // 2 - 1


mus = add('music.mp3')
vo = [(add('vo1.mp3'), 0.67), (add('vo2.mp3'), T['s4hits'][0]), (add('vo3.mp3'), T['s5'][0] + 0.37)]
imp, wh, swap, sp, rum = (add(n) for n in ('impact.mp3', 'whoosh.mp3', 'swap.mp3', 'sparkle.mp3', 'rumble.mp3'))

s3a, s3b = T['s3']
per = (s3b - s3a) / 8
SWAP_PEAK = 0.45  # the punch in swap.mp3 lands ~0.45s in; align it to each cut

ev = [(rum, 0.15, 0.9), (rum, 2.1, 0.9), (wh, 4.85, 0.6), (imp, T['s2'][0], 0.9), (imp, T['s2slam'] + 0.06, 1.0), (sp, 5.1, 0.35)]
ev += [(swap, s3a + per * i - SWAP_PEAK, 0.8) for i in range(8)]
ev += [(imp, t, 0.75) for t in T['s4hits']]
ev += [(wh, T['s5'][0] - 0.09, 0.6), (imp, T['s5'][0], 0.7), (sp, T['s5'][0] + 1.56, 0.8), (sp, T['s5'][0] + 2.4, 0.4),
       (imp, T['s6'][0], 0.6), (wh, T['s6'][0] + 0.06, 0.5)]

fmt = 'aformat=sample_rates=44100:channel_layouts=stereo'
f, labels, vl = [], [], []
for k, (i, t, v) in enumerate(ev):
    ms = max(0, int(t * 1000))
    f.append(f'[{i}:a]{fmt},volume={v},adelay={ms}|{ms}[e{k}]')
    labels.append(f'[e{k}]')
for k, (i, t) in enumerate(vo):
    ms = int(t * 1000)
    f.append(f'[{i}:a]{fmt},volume=1.6,adelay={ms}|{ms}[v{k}]')
    vl.append(f'[v{k}]')
NAME_LEAD = 0.03  # start each name just after its cut
for k in range(8):
    i = add(f'name{k + 1}.mp3')
    ms = int((s3a + per * k + NAME_LEAD) * 1000)
    f.append(f'[{i}:a]{fmt},volume=1.6,adelay={ms}|{ms}[n{k}]')
    vl.append(f'[n{k}]')
f.append(''.join(vl) + f'amix=inputs={len(vl)}:normalize=0,apad=whole_dur={dur},asplit=2[vo][vosc]')
if music_offset >= 0:
    ms = int(music_offset * 1000)
    shift = f'adelay={ms}|{ms}'
else:
    shift = f'atrim=start={-music_offset},asetpts=PTS-STARTPTS'
f.append(f'[{mus}:a]{fmt},{shift},volume={music_volume},afade=t=out:st={dur - 1.2}:d=1.2[m]')
f.append('[m][vosc]sidechaincompress=threshold=0.04:ratio=6:attack=20:release=350[md]')
f.append('[md][vo]' + ''.join(labels) + f'amix=inputs={2 + len(labels)}:normalize=0,alimiter=limit=0.89,'
         f'atrim=0:{dur},apad=whole_dur={dur}[out]')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(f), '-map', '[out]',
                '-ar', '48000', '-c:a', 'pcm_s16le', str(d / 'mix.wav')], check=True)
print('wrote', d / 'mix.wav')
