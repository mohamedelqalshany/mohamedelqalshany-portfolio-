import os, subprocess, shutil

media_dir = r"C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\public\media"

# Map prefixes to target names
target_map = {
    "educational_13": ("educational_13_explainer_fusha.mp3", True),
    "educational_14": ("educational_14_explainer_ammiya.mp3", False),
    "educational_15": ("educational_15_audiobook_fusha.mp3", True),
    "reflections_16": ("reflections_16_after_thirty.mp4", False),
    "reflections_17": ("reflections_17_wisdom_reflections.mp3", True),
    "documentary_19": ("documentary_19_Al_Azhar.mp3", True),
}

files = os.listdir(media_dir)
for f in files:
    full_path = os.path.join(media_dir, f)
    for prefix, (target_name, is_wav) in target_map.items():
        if f.startswith(prefix):
            target_path = os.path.join(media_dir, target_name)
            if is_wav:
                # Convert to MP3
                cmd = f'ffmpeg -y -i "{full_path}" -vn -c:a libmp3lame -b:a 192k "{target_path}"'
                res = subprocess.run(cmd, shell=True)
                if res.returncode == 0:
                    if full_path != target_path and os.path.exists(full_path):
                        os.remove(full_path)
            else:
                if full_path != target_path:
                    shutil.move(full_path, target_path)
            break

print("All remaining media files processed successfully.")
