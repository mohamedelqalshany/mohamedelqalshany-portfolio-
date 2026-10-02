"""
WCAG 2.2 Level AA / AAA Contrast Verification Script for Mohamed El-Qalshany Portfolio
Mathematical implementation of W3C relative luminance & contrast ratio specifications.
"""

def relative_luminance(hex_code: str) -> float:
    hex_code = hex_code.strip().lstrip('#')
    if len(hex_code) == 3:
        hex_code = ''.join([c*2 for c in hex_code])
    r = int(hex_code[0:2], 16) / 255.0
    g = int(hex_code[2:4], 16) / 255.0
    b = int(hex_code[4:6], 16) / 255.0

    def channel_linear(c):
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    r_lin = channel_linear(r)
    g_lin = channel_linear(g)
    b_lin = channel_linear(b)

    return 0.2126 * r_lin + 0.7152 * g_lin + 0.0722 * b_lin

def contrast_ratio(hex1: str, hex2: str) -> float:
    l1 = relative_luminance(hex1)
    l2 = relative_luminance(hex2)
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

def evaluate_wcag(ratio: float, is_large_text: bool = False):
    if is_large_text:
        aa_pass = ratio >= 3.0
        aaa_pass = ratio >= 4.5
    else:
        aa_pass = ratio >= 4.5
        aaa_pass = ratio >= 7.0

    if aaa_pass:
        return "PASS (AAA)"
    elif aa_pass:
        return "PASS (AA)"
    elif is_large_text:
        return "FAIL (Large text requires 3.0:1)"
    else:
        return "FAIL (Normal text requires 4.5:1)"

tokens = {
    "light": {
        "bg_canvas": "#FAEDCD",
        "bg_soft": "#F4E4BD",
        "surface": "#FFFDF6",
        "ink_primary": "#1C1C1E",
        "ink_secondary": "#38383B",
        "brand_primary": "#1E3A2B",
        "link_text": "#1D7368",
        "accent": "#E07A5F",
        "secondary_mustard": "#F4A261",
        "on_secondary": "#1C1C1E",
        "on_primary": "#FAEDCD",
        "white": "#FFFFFF",
    },
    "dark": {
        "bg_canvas": "#0E1912",
        "bg_surface": "#16261C",
        "card_surface": "#1C2E23",
        "ink_primary": "#FAF3E0",
        "ink_secondary": "#D8D0C2",
        "link_color": "#52B788",
        "accent": "#E07A5F",
        "secondary_mustard": "#F4A261",
        "on_secondary": "#0E1912",
        "on_primary": "#FAF3E0",
        "white": "#FFFFFF",
    }
}

checks = [
    # Light Theme Checks
    ("Light: Primary Text on Canvas", tokens["light"]["ink_primary"], tokens["light"]["bg_canvas"], False),
    ("Light: Primary Text on Card Surface", tokens["light"]["ink_primary"], tokens["light"]["surface"], False),
    ("Light: Forest Green Primary on Canvas", tokens["light"]["brand_primary"], tokens["light"]["bg_canvas"], False),
    ("Light: Inline Link Text on Canvas", tokens["light"]["link_text"], tokens["light"]["bg_canvas"], False),
    ("Light: Inline Link Text on Card", tokens["light"]["link_text"], tokens["light"]["surface"], False),
    ("Light: Dark Ink on Mustard Button", tokens["light"]["on_secondary"], tokens["light"]["secondary_mustard"], False),
    ("Light: Dark Ink on Terracotta Accent", tokens["light"]["ink_primary"], tokens["light"]["accent"], False),
    ("Light: Oat text on Forest Button", tokens["light"]["on_primary"], tokens["light"]["brand_primary"], False),
    ("Light: White text on Forest Button", tokens["light"]["white"], tokens["light"]["brand_primary"], False),

    # Dark Theme Checks
    ("Dark: Primary Text on Canvas", tokens["dark"]["ink_primary"], tokens["dark"]["bg_canvas"], False),
    ("Dark: Primary Text on Surface", tokens["dark"]["ink_primary"], tokens["dark"]["bg_surface"], False),
    ("Dark: Primary Text on Card", tokens["dark"]["ink_primary"], tokens["dark"]["card_surface"], False),
    ("Dark: Link Color on Canvas", tokens["dark"]["link_color"], tokens["dark"]["bg_canvas"], False),
    ("Dark: Link Color on Surface", tokens["dark"]["link_color"], tokens["dark"]["bg_surface"], False),
    ("Dark: Link Color on Card", tokens["dark"]["link_color"], tokens["dark"]["card_surface"], False),
    ("Dark: Mustard Accent on Canvas", tokens["dark"]["secondary_mustard"], tokens["dark"]["bg_canvas"], False),
    ("Dark: Mustard Accent on Card", tokens["dark"]["secondary_mustard"], tokens["dark"]["card_surface"], False),
    ("Dark: Terracotta Accent on Canvas", tokens["dark"]["accent"], tokens["dark"]["bg_canvas"], False),
    ("Dark: Terracotta Accent on Card", tokens["dark"]["accent"], tokens["dark"]["card_surface"], False),
    ("Dark: Dark Ink on Mustard Button", tokens["dark"]["on_secondary"], tokens["dark"]["secondary_mustard"], False),
]

def run_audit():
    print("=" * 78)
    print("WCAG 2.2 AA / AAA COLOR CONTRAST AUDIT REPORT")
    print("Mohamed El-Qalshany Portfolio — Earthy Warmth Palette")
    print("=" * 78)
    print(f"{'Check Description':<42} | {'Foreground':<10} | {'Background':<10} | {'Ratio':<8} | {'Status'}")
    print("-" * 78)
    
    all_passed = True
    for desc, fg, bg, is_large in checks:
        ratio = contrast_ratio(fg, bg)
        status = evaluate_wcag(ratio, is_large)
        if "FAIL" in status:
            all_passed = False
        print(f"{desc:<42} | {fg:<10} | {bg:<10} | {ratio:5.2f}:1  | {status}")
        
    print("=" * 78)
    if all_passed:
        print("ALL AUDIT CHECKS PASSED WCAG 2.2 LEVEL AA CONFORMANCE.")
    else:
        print("SOME CHECKS FAILED.")
    print("=" * 78)
    return all_passed

if __name__ == "__main__":
    run_audit()
