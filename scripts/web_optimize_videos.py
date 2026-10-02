import os
import subprocess

ffmpeg = r"C:\Users\mohmad\AppData\Local\Programs\Python\Python312\Scripts\ffmpeg.exe"
media_dir = r"C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\public\media"

problem_videos = [
    ("commercial_03_Pioneers_1_Voice_Ove.mp4", "scale='min(1920,iw)':-2"),
    ("demo_18_VO.mp4", "scale='min(1080,iw)':-2"),
    ("acting_11_Short_movie.mp4", "scale='min(1280,iw)':-2")
]

for filename, scale_filter in problem_videos:
    src = os.path.join(media_dir, filename)
    opt = os.path.join(media_dir, f"fast_{filename}")
    if os.path.exists(src):
        old_size = os.path.getsize(src)
        print(f"Processing {filename} ({old_size // 1024} KB)...")
        cmd = [
            ffmpeg,
            "-y",
            "-i", src,
            "-vf", scale_filter,
            "-c:v", "libx264",
            "-pix_fmt", "yuv420p",
            "-profile:v", "main",
            "-level", "4.0",
            "-crf", "25",
            "-preset", "faster",
            "-movflags", "+faststart",
            "-c:a", "aac",
            "-b:a", "128k",
            opt
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode == 0 and os.path.exists(opt):
            new_size = os.path.getsize(opt)
            print(f"Success {filename}: {old_size // 1024} KB -> {new_size // 1024} KB")
            os.remove(src)
            os.rename(opt, src)
        else:
            print(f"Error processing {filename}:", res.stderr[-500:] if res.stderr else "Unknown error")

print("All done!")
