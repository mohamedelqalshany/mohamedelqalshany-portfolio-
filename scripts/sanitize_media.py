import json, os, subprocess, shutil

media_dir = r"C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\public\media"
samples_json_path = r"C:\Users\mohmad\.gemini\antigravity\scratch\MohamedEl-Qalshany\src\data\samples.json"

with open(samples_json_path, 'r', encoding='utf-8') as f:
    samples = json.load(f)

print("Starting media file sanitization & audio conversion...")

# Map of old filenames to new clean ASCII names & extensions
rename_map = {}
for s in samples:
    old_fn = s['filename']
    new_fn = old_fn
    new_ext = s['extension']
    new_type = s['type']
    
    if s['id'] == 'sample-06':
        new_fn = "commercial_06_xcar_1.mp3"
        new_ext = "mp3"
    elif s['id'] == 'sample-07':
        new_fn = "commercial_07_xcar_2.mp3"
        new_ext = "mp3"
    elif s['id'] == 'sample-08':
        new_fn = "commercial_08_travel_ad.mp4"
    elif s['id'] == 'sample-13':
        new_fn = "educational_13_explainer_fusha.mp3"
        new_ext = "mp3"
    elif s['id'] == 'sample-14':
        new_fn = "educational_14_explainer_ammiya.mp3"
    elif s['id'] == 'sample-15':
        new_fn = "educational_15_audiobook_fusha.mp3"
        new_ext = "mp3"
    elif s['id'] == 'sample-16':
        new_fn = "reflections_16_after_thirty.mp4"
    elif s['id'] == 'sample-17':
        new_fn = "reflections_17_wisdom_reflections.mp3"
        new_ext = "mp3"
    elif s['id'] == 'sample-19':
        new_fn = "documentary_19_Al_Azhar.mp3"
        new_ext = "mp3"
        
    if new_fn != old_fn:
        rename_map[old_fn] = (new_fn, new_ext, s['id'])
        s['filename'] = new_fn
        s['url'] = f"/media/{new_fn}"
        s['extension'] = new_ext

# Write updated samples.json
with open(samples_json_path, 'w', encoding='utf-8') as f:
    json.dump(samples, f, ensure_ascii=False, indent=2)

print(f"Updated samples.json with {len(rename_map)} sanitized filenames.")

# Now process actual files in public/media
for old_fn, (new_fn, new_ext, sid) in rename_map.items():
    old_path = os.path.join(media_dir, old_fn)
    new_path = os.path.join(media_dir, new_fn)
    
    # If old file doesn't exist directly (e.g. Unicode encoding on disk), find matching file
    if not os.path.exists(old_path):
        for f in os.listdir(media_dir):
            prefix = old_fn.split('_')[0] + '_' + old_fn.split('_')[1]
            if f.startswith(prefix):
                old_path = os.path.join(media_dir, f)
                break
                
    if os.path.exists(old_path):
        if old_path.lower().endswith('.wav') and new_fn.endswith('.mp3'):
            # Convert WAV to high quality MP3
            cmd = f'ffmpeg -y -i "{old_path}" -vn -c:a libmp3lame -b:a 192k "{new_path}"'
            subprocess.run(cmd, shell=True, check=True)
            if old_path != new_path and os.path.exists(old_path):
                os.remove(old_path)
            print(f"Converted WAV -> MP3: {old_fn} -> {new_fn}")
        else:
            # Just rename
            if old_path != new_path:
                shutil.move(old_path, new_path)


print("Media conversion & renaming complete!")
