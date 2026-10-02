import os, subprocess

media_dir = r"C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\public\media"
large_videos = [
    "acting_11_Short_movie.mp4",
    "commercial_03_Pioneers_1_Voice_Ove.mp4",
    "demo_18_VO.mp4",
    "marketing_demo_saad_zaghawa.mp4",
    "commercial_05_x_Car_2_.mp4",
    "acting_09_Cottonil_1.mp4",
    "reflections_16_after_thirty.mp4"
]

for v in large_videos:
    src = os.path.join(media_dir, v)
    tmp = os.path.join(media_dir, f"opt_{v}")
    if os.path.exists(src):
        old_size = os.path.getsize(src)
        cmd = f'ffmpeg -y -i "{src}" -vcodec libx264 -crf 26 -preset fast -acodec aac -b:a 128k "{tmp}"'
        res = subprocess.run(cmd, shell=True)
        if res.returncode == 0 and os.path.exists(tmp):
            new_size = os.path.getsize(tmp)
            if new_size < old_size:
                os.remove(src)
                os.rename(tmp, src)
                print(f"Compressed {v}: {old_size // 1024 // 1024}MB -> {new_size // 1024 // 1024}MB")
            else:
                os.remove(tmp)

print("Video compression complete!")
