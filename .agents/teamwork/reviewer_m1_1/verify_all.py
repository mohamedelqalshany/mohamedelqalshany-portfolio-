"""
Independent Comprehensive Review Verification Script for Milestone 1
Run by reviewer_m1_1
"""
import glob
import re
import os

def check_hex_tokens():
    print("=== 1. CHECKING EXACT HEX VALUES IN TOKENS.CSS ===")
    tokens_path = "src/styles/tokens.css"
    if not os.path.exists(tokens_path):
        print("FAIL: tokens.css not found")
        return False
    
    with open(tokens_path, "r", encoding="utf-8") as f:
        content = f.read()

    expected_light = {
        "Primary (#1E3A2B)": r"#1E3A2B",
        "Accent (#E07A5F)": r"#E07A5F",
        "Secondary (#F4A261)": r"#F4A261",
        "Background (#FAEDCD)": r"#FAEDCD",
        "Primary Text (#1C1C1E)": r"#1C1C1E",
        "Link Color (#2A9D8F)": r"#2A9D8F",
    }

    expected_dark = {
        "Dark Canvas (#0E1912)": r"#0E1912",
        "Dark Surface (#16261C)": r"#16261C",
        "Dark Card (#1C2E23)": r"#1C2E23",
        "Dark Text (#FAF3E0)": r"#FAF3E0",
        "Dark Accent (#E07A5F)": r"#E07A5F",
        "Dark Mustard (#F4A261)": r"#F4A261",
        "Dark Link (#52B788)": r"#52B788",
    }

    all_found = True
    print("-- Light Theme Tokens --")
    for name, hex_code in expected_light.items():
        matches = re.findall(hex_code, content, re.IGNORECASE)
        if matches:
            print(f"  [PASS] {name}: found {len(matches)} occurrence(s)")
        else:
            print(f"  [FAIL] {name}: NOT found")
            all_found = False

    print("-- Dark Theme Tokens --")
    for name, hex_code in expected_dark.items():
        matches = re.findall(hex_code, content, re.IGNORECASE)
        if matches:
            print(f"  [PASS] {name}: found {len(matches)} occurrence(s)")
        else:
            print(f"  [FAIL] {name}: NOT found")
            all_found = False

    return all_found

def check_zero_cdn():
    print("\n=== 2. CHECKING FOR EXTERNAL CDN REFERENCES ===")
    cdn_patterns = [
        re.compile(r'fonts\.googleapis\.com', re.I),
        re.compile(r'fonts\.gstatic\.com', re.I),
        re.compile(r'cdnjs\.cloudflare\.com', re.I),
        re.compile(r'cdn\.jsdelivr\.net', re.I),
        re.compile(r'unpkg\.com', re.I),
    ]

    files_to_check = glob.glob("src/**/*.*", recursive=True) + glob.glob("dist/**/*.html", recursive=True)
    violations = []

    for fpath in files_to_check:
        try:
            with open(fpath, "r", encoding="utf-8") as f:
                content = f.read()
                for pat in cdn_patterns:
                    matches = pat.findall(content)
                    if matches:
                        violations.append((fpath, matches))
        except Exception:
            pass

    if violations:
        print(f"FAIL: Found {len(violations)} files with external CDN links:")
        for f, m in violations:
            print(f"  - {f}: {m}")
        return False
    else:
        print("PASS: Zero external CDN references found across src/ and dist/.")
        return True

def check_fonts():
    print("\n=== 3. CHECKING LOCAL FONT FILES AND PRELOADING ===")
    font_files = os.listdir("public/fonts") if os.path.exists("public/fonts") else []
    print(f"Found {len(font_files)} font files in public/fonts/")
    
    critical_fonts = [
        "readex-pro-arabic-wght-normal.woff2",
        "aref-ruqaa-arabic-700-normal.woff2"
    ]
    all_present = True
    for cf in critical_fonts:
        if cf in font_files:
            size_kb = os.path.getsize(os.path.join("public/fonts", cf)) / 1024
            print(f"  [PASS] Critical font {cf} present ({size_kb:.1f} KB)")
        else:
            print(f"  [FAIL] Critical font {cf} MISSING")
            all_present = False

    # Check BaseLayout preload tags
    with open("src/layouts/BaseLayout.astro", "r", encoding="utf-8") as f:
        bl_content = f.read()
    
    if 'rel="preload"' in bl_content and 'readex-pro' in bl_content and 'aref-ruqaa' in bl_content:
        print("  [PASS] BaseLayout.astro contains preload link tags for local fonts")
    else:
        print("  [FAIL] BaseLayout.astro missing local font preload tags")
        all_present = False

    return all_present

def rel_lum(hex_code):
    h = hex_code.strip().lstrip('#')
    if len(h) == 3:
        h = ''.join([c*2 for c in h])
    r = int(h[0:2], 16) / 255.0
    g = int(h[2:4], 16) / 255.0
    b = int(h[4:6], 16) / 255.0

    def lin(c):
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

def contrast(c1, c2):
    l1 = rel_lum(c1)
    l2 = rel_lum(c2)
    return (max(l1, l2) + 0.05) / (min(l1, l2) + 0.05)

def check_contrasts():
    print("\n=== 4. WCAG 2.2 CONTRAST CALCULATIONS (ADVERSARIAL STRESS TEST) ===")
    pairs = [
        # Normal text pairs (need >= 4.5:1)
        ("Light: Ink #1C1C1E on Oat Canvas #FAEDCD", "#1C1C1E", "#FAEDCD", 4.5, "Normal Text"),
        ("Light: Ink #1C1C1E on Card Surface #FFFDF6", "#1C1C1E", "#FFFDF6", 4.5, "Normal Text"),
        ("Light: Secondary Ink #38383B on Oat Canvas #FAEDCD", "#38383B", "#FAEDCD", 4.5, "Normal Text"),
        ("Light: Muted Ink #5E615F on Oat Canvas #FAEDCD", "#5E615F", "#FAEDCD", 4.5, "Normal Text"),
        ("Light: Adjusted Link #1D7368 on Oat Canvas #FAEDCD", "#1D7368", "#FAEDCD", 4.5, "Normal Text"),
        ("Light: Adjusted Link #1D7368 on Card #FFFDF6", "#1D7368", "#FFFDF6", 4.5, "Normal Text"),
        ("Light: Raw Brand Link #2A9D8F on Oat Canvas #FAEDCD", "#2A9D8F", "#FAEDCD", 4.5, "Normal Text"),
        ("Light: White #FFFFFF on Forest Green #1E3A2B", "#FFFFFF", "#1E3A2B", 4.5, "Normal Text"),
        ("Light: Oat #FAEDCD on Forest Green #1E3A2B", "#FAEDCD", "#1E3A2B", 4.5, "Normal Text"),
        ("Light: Dark Ink #1C1C1E on Mustard #F4A261", "#1C1C1E", "#F4A261", 4.5, "Normal Text"),
        ("Light: White #FFFFFF on Terracotta #E07A5F", "#FFFFFF", "#E07A5F", 4.5, "Normal Text"),
        ("Light: Dark Ink #1C1C1E on Terracotta #E07A5F", "#1C1C1E", "#E07A5F", 4.5, "Normal Text"),
        ("Light: Terracotta #E07A5F on Oat Canvas #FAEDCD", "#E07A5F", "#FAEDCD", 4.5, "Normal Text"),
        ("Light: Terracotta #E07A5F on Card #FFFDF6", "#E07A5F", "#FFFDF6", 4.5, "Normal Text"),
        
        # Dark Theme pairs
        ("Dark: Light Ink #FAF3E0 on Dark Canvas #0E1912", "#FAF3E0", "#0E1912", 4.5, "Normal Text"),
        ("Dark: Light Ink #FAF3E0 on Dark Surface #16261C", "#FAF3E0", "#16261C", 4.5, "Normal Text"),
        ("Dark: Light Ink #FAF3E0 on Dark Card #1C2E23", "#FAF3E0", "#1C2E23", 4.5, "Normal Text"),
        ("Dark: Link #52B788 on Dark Canvas #0E1912", "#52B788", "#0E1912", 4.5, "Normal Text"),
        ("Dark: Link #52B788 on Dark Card #1C2E23", "#52B788", "#1C2E23", 4.5, "Normal Text"),
        ("Dark: Accent #E07A5F on Dark Canvas #0E1912", "#E07A5F", "#0E1912", 4.5, "Normal Text"),
        ("Dark: Accent #E07A5F on Dark Card #1C2E23", "#E07A5F", "#1C2E23", 4.5, "Normal Text"),
        ("Dark: Mustard #F4A261 on Dark Canvas #0E1912", "#F4A261", "#0E1912", 4.5, "Normal Text"),
        ("Dark: Mustard #F4A261 on Dark Card #1C2E23", "#F4A261", "#1C2E23", 4.5, "Normal Text"),
    ]

    for desc, c1, c2, thresh, role in pairs:
        cr = contrast(c1, c2)
        passed = cr >= thresh
        status = "PASS (AA)" if passed else "FAIL (UNDER 4.5:1)"
        if cr >= 7.0:
            status = "PASS (AAA)"
        print(f"  {status:<18} | {cr:5.2f}:1 (min {thresh}:1) | {desc}")

if __name__ == "__main__":
    check_hex_tokens()
    check_zero_cdn()
    check_fonts()
    check_contrasts()
