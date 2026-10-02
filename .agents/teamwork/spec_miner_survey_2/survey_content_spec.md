# Comprehensive Content & Requirements Specification
**Project**: Mohamed El-Qalshany Dual-Persona Portfolio  
**Author**: `spec_miner_survey_2` (Content & Requirements Spec Miner)  
**Date**: 2026-09-30  
**Status**: Authoritative Reference Blueprint  

---

## 1. Executive Summary & Specification Scope

This document provides the authoritative content blueprint, copy dictionary, and structural requirements for the dual-persona portfolio website of **Mohamed El-Qalshany** (Voice Over Artist & Marketing / Content Creation / One-Man Crew). It integrates the requirements from `ORIGINAL_REQUEST.md` (R1 through R5) with existing codebase assets in `src/data/`, establishing a complete reference for page copy, poetic manifests, marketing frameworks, credential verifications, and bilingual localization.

---

## 2. The Poetic Manifesto ("بيان الهوية والشغف")

The gateway landing page (`/` and `/en`) centers around Mohamed El-Qalshany's 10-line poetic manifesto. This manifesto serves as the intellectual and emotional bridge between the Voice Over Studio and the Marketing / One-Man Crew production house.

### 2.1 Arabic Master Text (النص العربي الأصيل)

```text
1. الحبر يكتبُ حرفًا... والصوتُ يبعثُ فيه روحًا.
2. كلمةٌ بلا صوتٍ... حبرٌ نائمٌ على ورق.
3. وصوتٌ بلا إحساسٍ... صدىً يتلاشى في الهواء.
4. أما حين يلتقيان... تُولَدُ الرسالة، وتُفتَحُ لها القلوب.
5. أنا لا أُلقي الكلمات... أنا أمنحها نبضًا،
6. فتصيرُ صورةً تُرى،
7. وشعورًا يُعاش،
8. وقرارًا يُتَّخذ.
9. صوتٌ لا يُسمَع فقط... بل يُصدَّق، ويُتذكَّر، ويُشترى.
10. هذا صوتي.
```

### 2.2 High-Caliber English Poetic Translation

```text
1. Ink writes the letter... but voice breathes a soul into it.
2. A word without voice is sleeping ink on paper.
3. A voice without emotion is an echo fading into thin air.
4. Yet when they meet... the message is born, and hearts open to receive it.
5. I do not merely utter words — I grant them a pulse,
6. So they transform into an image seen,
7. A feeling genuinely lived,
8. And a decisive action taken.
9. A voice that isn't just heard... but believed, remembered, and chosen.
10. This is my voice.
```

### 2.3 Structural & Rhetorical Analysis

| Stanza / Line | Rhetorical Device | Thematic Purpose | Visual Styling Spec |
|:---|:---|:---|:---|
| **Lines 1–4** | Dialectic Antithesis (*Writing vs Voice*) | Establishes the necessity of voice to give life to written strategy and vice versa. Highlights that technique without soul is inert. | `font-artistic` (`Aref Ruqaa`), Line 1 rendered as `poem-line--lead` (larger scale, primary brand color). |
| **Lines 5–8** | Climactic Progression (*Pulse → Vision → Emotion → Decision*) | Directly connects vocal artistry with direct-response marketing psychology: perception leads to feeling, which triggers the conversion action. | Gradual rhythmic spacing; concise cadence per line. |
| **Line 9** | Triadic Persuasion Climax (*Believed, Remembered, Chosen*) | The business punchline: credibility (`يُصدَّق`), brand recall (`يُتذكَّر`), and commercial sale (`يُشترى`). | Rendered as `poem-line--punch` (highlighted in Warm Terracotta `#E07A5F`, bold font weight). |
| **Line 10** | Definitive Affirmation (*هذا صوتي*) | The signature close: personal accountability and vocal stamp. | Rendered as `poem-line--final` with custom signature divider line below. |

---

## 3. Client Credentials & Persona Architecture

### 3.1 Personal Profile
- **Full Legal & Stage Name**: Mohamed El-Qalshany (محمد القلشاني).
- **Core Dual Roles**:
  1. Professional Voice Over Artist (مؤدي صوتي محترف ومعتمد).
  2. Marketing Strategist, Content Creator & One-Man Video Crew (مسوّق، صانع محتوى، وفريق إنتاج متكامل).
- **Location**: Cairo, Egypt (القاهرة، مصر) — Serving clients across Egypt, the GCC (Saudi Arabia, UAE, Kuwait, Qatar), and international markets.
- **Languages**: Native Arabic (Modern Standard Arabic / فصحى معيارية + Egyptian Colloquial / عامية مصرية بيضاء ترويجية), Professional English (Bilingual delivery).

### 3.2 Academic & Professional Accreditations

1. **Digilians Presidential Initiative (2026)**
   - *Title (AR)*: مبادرة Digilians الرئاسية (2026) — وزارة الاتصالات وتكنولوجيا المعلومات
   - *Title (EN)*: Digilians Presidential Initiative (2026) — Ministry of Communications & Information Technology (MCIT)
   - *Domain*: Digital Marketing Specialist Track (تخصص التسويق الرقمي وإدارة الحملات)
   - *Competencies*: Conversion rate optimization, paid ad funnels (Meta, Google, TikTok), audience persona modeling, attribution modeling, and data-driven content strategy.

2. **Arab Academy for Science, Technology & Maritime Transport (AASTMT - 2019)**
   - *Title (AR)*: الأكاديمية العربية للعلوم والتكنولوجيا والنقل البحري (AASTMT - 2019)
   - *Title (EN)*: Arab Academy for Science, Technology & Maritime Transport (AASTMT - 2019)
   - *Domain*: Professional Digital Marketing & Strategic Campaign Planning Diploma.
   - *Competencies*: Integrated marketing communications (IMC), brand positioning, consumer behavior, market segmentation, and advertising campaign execution.

3. **Media Studies & Professional Voice Coaching**
   - *Title (AR)*: دراسة الإعلام والتدريب الصوتي التخصصي
   - *Title (EN)*: Media Studies & Professional Vocal Coaching
   - *Domain*: Advanced Broadcast Performance, Audio Engineering & Dramatic Voice Acting.
   - *Competencies*: Diaphragmatic vocal control, acoustic isolation engineering, microphone technique, commercial cadences, classical Arabic elocution (سلامة مخارج الحروف والتشكيل), and character immersion.

### 3.3 Production Gear & Acoustic Environment
- **Acoustic Environment**: Custom-treated recording booth with high-density acoustic foam and bass traps; noise floor < -60 dB FS.
- **Recording Chain**: Studio-grade large-diaphragm condenser microphone, discrete low-noise preamps, 24-bit/96kHz digital audio interface.
- **Camera & Video Gear**: 4K Cinema camera package with high-speed prime lenses (shallow depth-of-field), dual wireless lavalier microphones, gimbal stabilization, 3-point bi-color studio lighting with softboxes.
- **Monitoring & Master Standards**: Calibrated studio monitors and reference headphones; adherence to ITU-R BS.1770-4 loudness standards (-14 LUFS to -16 LUFS for online/social media, -23 LUFS / -24 LUFS for broadcast television and radio).

---

## 4. Marketing & One-Man Crew Showcase Architecture (R4)

Per requirement **R4**, the marketing hub must abandon generic agency jargon and adopt **direct-response conversion copywriting principles**. The structure consists of five tightly integrated layers:

```
[Marketing Hub Structure]
├── 1. Value Proposition Hero (The "Why One-Man Crew" Hook)
├── 2. The Three Core Pillars (Content, Strategy, One-Man Crew)
├── 3. The 5-Step Production Pipeline (Concept to Revenue)
├── 4. The 3 Structured Service Packages (Social Sprint, Ad Engine, Monthly Retainer)
├── 5. The Comparative Advantage Matrix (One-Man Crew vs Traditional Agency)
└── 6. Multi-Channel Conversion CTAs (WhatsApp, Phone, Email, LinkedIn, Interactive Form)
```

### 4.1 The Three Core Pillars

#### Pillar 1: Content Creation (صناعة المحتوى وكتابة الإعلانات البيعية)
- **Tagline (AR)**: نصوص إعلانية تفهم سيكولوجية المشتري وتوقف التمرير.
- **Tagline (EN)**: Direct-response copy engineered to halt the scroll and trigger purchases.
- **Core Elements**:
  - Psychological hook design (first 0–3 seconds) addressing consumer fear, status, or desire.
  - Storytelling blueprints using proven frameworks: Problem-Agitate-Solve (PAS) and Before-After-Bridge (BAB).
  - Scripting with 3 alternative hook variations per concept to maximize paid ad testing velocity.
  - Seamless adaptation between high-energy TikTok/Reels and authoritative LinkedIn/Corporate long-form.

#### Pillar 2: Digital Strategy (الاستراتيجية الرقمية وتخطيط الحملات)
- **Tagline (AR)**: قرارات تسويقية مبنية على الأرقام واحتياجات السوق الحقيقية.
- **Tagline (EN)**: Data-backed campaign architecture rooted in real consumer behavior.
- **Core Elements**:
  - Grounded in Digilians & AASTMT methodologies.
  - Competitor gap analysis and Angles of Appeal identification.
  - Conversion funnel mapping: Top-of-Funnel (Awareness/Hook) → Middle-of-Funnel (Product Demonstration/Social Proof) → Bottom-of-Funnel (Urgent CTA).
  - Tracking orientation: Designing visual proof points that reduce customer skepticism and lower Cost Per Acquisition (CPA).

#### Pillar 3: One-Man Crew (فريق الإنتاج المتكامل: كتابة، تصوير، صوت، مونتاج، وتوزيع)
- **Tagline (AR)**: تنفيذ مرن وسينمائي يختصر عليك 4 جهات عمل في شريك واحد.
- **Tagline (EN)**: Agile full-cycle execution replacing 4 disparate vendors with a single unified partner.
- **Core Elements**:
  - **Scriptwriting**: Direct-response copy crafted specifically for visual and vocal execution.
  - **Cinematic 4K Shooting**: On-site production with cinema camera rigs, prime glass, and studio lighting without bulky crew friction.
  - **Native Studio Voiceover**: Immediate recording in Mohamed's voice booth—eliminating external talent scheduling delays.
  - **Dynamic Post-Production**: Kinetic typography, sound design, rhythmic pacing, and color grading.
  - **Distribution Ready**: Multi-format renders (9:16 vertical, 16:9 widescreen, 1:1 feed) formatted to exact platform specs.

---

### 4.2 The 5-Step Workflow Pipeline

| Step # | Arabic Title & Description | English Title & Description | Key Deliverable / Milestone |
|:---|:---|:---|:---|
| **01** | **دراسة وفهم الهدف والجمهور**<br>تحليل المنتج، ودراسة المنافسين، وتحديد نقاط الألم، وصياغة الرسالة البيعية الفريدة. | **Discovery & Strategic Brief**<br>Analyzing customer pain points, competitor angles, and formulating the core conversion proposition. | Strategic Project Brief & Angle Sheet |
| **02** | **كتابة الإسكريبت وصناعة الهوك**<br>صياغة النصوص الإعلانية وسيناريوهات الفيديو مع 3 هوكات بديلة لاختبارها في الإعلانات. | **Scriptwriting & Hook Engineering**<br>Developing testing angles, headlines, and scene-by-scene shooting blueprints with 3 hook variants. | Two-Column Audio/Visual (AV) Script |
| **03** | **التصوير والإنتاج السينمائي**<br>يوم تصوير احترافي 4K في موقعك يغطي لقطات المنتج، والمقابلات، ولقطات الـ B-Roll الدقيقة. | **Cinematic 4K Production**<br>On-location filming capturing primary narrative, product details, macro textures, and dynamic B-roll. | 4K Raw Media & Sound Assets |
| **04** | **التعليق الصوتي والمونتاج النهائي**<br>تسجيل الفويس أوفر الاحترافي المدمج، وتركيب المونتاج الإيقاعي، وتصميم الصوت، والترجمة. | **Audio Finishing & Dynamic Edit**<br>In-house voiceover narration, kinetic typography, rhythmic cuts, sound effects, and color grading. | High-Impact Master Video Cuts |
| **05** | **الإطلاق وتجهيز المنصات**<br>تصدير الفيديوهات بالمقاسات المناسبة (Reels, TikTok, Ads)، ومراجعة مؤشرات الأداء والتحويل. | **Launch & Platform Optimization**<br>Exporting multi-aspect ratio assets ready for immediate ad spend and tracking conversion metrics. | Final Deliverable Package + Ad Renders |

---

### 4.3 Service Packages (باقات الخدمات)

#### Package 1: Social Reels Sprint (باقة سباقات الريلز المركزة)
- **Badge**: الأكثر طلباً للشركات والمؤثرين (Most Popular for Brands)
- **Target Audience**: E-commerce stores, B2B services, personal brands, clinic/consultancy owners wanting high organic and paid social visibility.
- **Core Value Proposition**: 4 to 8 high-retention short videos built with psychological hooks to stop the scroll and capture buyers.
- **Deliverables**:
  1. Discovery session analyzing target audience desires and competitor weaknesses.
  2. Scriptwriting for 4–8 short reels with 3 hook variations per video for split-testing.
  3. Cinematic on-site shooting day with 4K camera gear, prime lenses, and studio lighting.
  4. Broadcast-grade studio voiceover directly recorded and integrated in every reel.
  5. Dynamic rhythmic video editing, sound effects, motion graphics, and animated subtitles.
- **Timeline**: 5–7 Business Days (5 إلى 7 أيام عمل).
- **Direct CTA**: "طلب باقة الريلز" / "Book Video Sprint" → WhatsApp direct dispatch.

#### Package 2: Full Commercial Campaign Spot / Ad Engine (باقة الإعلان الترويجي المتكامل)
- **Badge**: لإطلاق المنتجات والحملات الممولة (For Product Launches & Paid Ads)
- **Target Audience**: Established brands launching a flagship product, running Meta/Google/TikTok paid ad campaigns, or seeking a primary brand explainer film.
- **Core Value Proposition**: A comprehensive conversion video ad addressing audience objections to maximize ROI on Meta & Google Ads.
- **Deliverables**:
  1. Strategic market angle research to uncover the single most profitable purchasing trigger.
  2. Direct-response script structured around Problem-Agitation-Solution-Social Proof-CTA.
  3. High-definition product shoot with close-up macro B-Roll and cinematic lighting.
  4. Persuasive, energetic commercial voiceover calibrated to brand archetype.
  5. Master ad cut (30–60s) + 3 tested hook variants for split-testing in paid advertising campaigns.
- **Timeline**: 7–10 Business Days (7 إلى 10 أيام عمل).
- **Direct CTA**: "طلب إعلانك التجاري" / "Book Commercial Ad" → WhatsApp direct dispatch.

#### Package 3: Monthly Content Production Partner / Retainer (المحرك الشهري المستمر)
- **Badge**: شراكة نمو شهرية مستمرة (Monthly Growth Retainer)
- **Target Audience**: Companies looking to outsource their entire media creation arm without hiring full-time in-house videographers, writers, and editors.
- **Core Value Proposition**: A dedicated creative partner replacing a full in-house team — 12 monthly videos with end-to-end production.
- **Deliverables**:
  1. Monthly editorial content plan aligned with market trends and seasonal opportunities.
  2. 2 dedicated on-location shooting days per month to capture continuous corporate activity.
  3. Continuous weekly scripting, studio voiceover recording, and rhythmic editing.
  4. Multi-aspect ratio delivery (Vertical 9:16 for Reels/TikTok, Landscape 16:9 for YouTube).
  5. VIP turnaround priority, direct Slack/WhatsApp access, and instant minor revisions.
- **Timeline**: Monthly rolling contract (تعاقد شهري متجدد).
- **Direct CTA**: "بدء الشراكة الشهرية" / "Inquire for Retainer" → WhatsApp direct consultation.

---

### 4.4 Comparative Advantage Matrix (One-Man Crew vs Traditional Agency)

| Feature / Metric | Traditional Agency (الوكالة التقليدية) | Mohamed El-Qalshany (One-Man Crew) ★ | Strategic Benefit to Client |
|:---|:---|:---|:---|
| **Parties Involved** | 4–5 separate contractors (Copywriter, Cameraman, External VO Talent, Video Editor, Account Manager) | **1 Single Unified Partner** | Zero coordination lag; no creative misunderstandings. |
| **Turnaround Time** | 3 to 5 weeks due to scheduling bottlenecks between independent freelancers | **4 to 7 Business Days** | Rapid market entry; capitalize on fleeting trends instantly. |
| **Creative Consistency** | Message gets diluted as it passes between 5 minds with conflicting artistic visions | **100% Unified Vision** from initial hook to final color grade | The same person who wrote the line delivers the voice and cuts the beat. |
| **Overhead & Cost** | Bloated agency fees, account management markups, and multiple day-rates | **Lean, High-ROI Investment** with zero unnecessary overhead | Maximum production value per invested pound/dollar. |
| **Revision Friction** | Lengthy revision tickets and renegotiated contracts for minor re-recordings | **Instant In-House Edits** and vocal re-takes | Effortless agility and rapid refinement. |

---

### 4.5 Conversion CTAs & Lead Capture Architecture

Per **R4**, conversion channels must provide instant, low-friction accessibility across three primary modalities:

1. **WhatsApp Direct API**:
   - Primary Phone: `+20 10 1703 8432` (`201017038432`)
   - Pre-filled message generator routing user intent dynamically:
     - For Voice Over: `مرحباً أستاذ محمد، أود الاستفسار عن تسجيل صوتي لمشروعي الجديد`
     - For Reels Sprint: `مرحباً أستاذ محمد، أود حجز باقة سباقات الريلز المركزة (Social Sprint)`
     - For Commercial Ad: `مرحباً أستاذ محمد، أود الاستفسار عن باقة الإعلان الترويجي المتكامل (Ad Engine)`
     - For Retainer: `مرحباً أستاذ محمد، أود مناقشة تفاصيل الشراكة الشهرية المستمرة`
2. **Direct Phone Calling**:
   - International URI: `tel:+201017038432`
   - Local Display: `010 1703 8432`
3. **Email Inquiries**:
   - Address: `Mohamedelqalshanyvo@gmail.com`
   - URI: `mailto:Mohamedelqalshanyvo@gmail.com`
4. **LinkedIn Professional Network**:
   - Required by R4: Direct conversion CTA for B2B decision makers, creative directors, and agency executives.
   - Profile link URI: `https://www.linkedin.com/in/mohamedelqalshany` (or designated LinkedIn handle).
5. **Interactive Project Inquiry Form**:
   - Input Fields: Client Name, Phone/WhatsApp, Project Type (VO / Reels / Ad / Retainer), Project Brief / Script.
   - Submission Hook: Automatically constructs a formatted multi-line WhatsApp message and dispatches it via a single click to `wa.me/201017038432`.

---

## 5. Bilingual Copy Dictionary & Terminology (AR & EN)

The following dictionary defines the authoritative translations across all layout components, ensuring 100% lexical consistency between Arabic and English.

### 5.1 Global Layout & Navigation

| Key | Arabic (`ar`) | English (`en`) |
|:---|:---|:---|
| `siteName` | محمد القلشاني | Mohamed El-Qalshany |
| `siteTitleVO` | محمد القلشاني — مؤدي صوتي محترف | Mohamed El-Qalshany — Voice Over Artist |
| `siteTitleMarketing` | محمد القلشاني — مسوّق وصانع محتوى وفريق إنتاج (One Man Crew) | Mohamed El-Qalshany — Marketer, Content Creator & One-Man Crew |
| `siteDesc` | الموقع الرسمي لمحمد القلشاني — تعليق صوتي احترافي، كتابة إعلانية، وصناعة محتوى مرئي متكامل. | Official portfolio of Mohamed El-Qalshany — Professional Voice Over, Conversion Copywriting & Full-Cycle Video Production. |
| `gatewayIntro` | البوابة الرئيسية | Gateway Intro |
| `voiceOverTrack` | التعليق الصوتي | Voice Over |
| `marketingTrack` | التسويق والإنتاج | Marketing & Production |
| `navAbout` | عن محمد | About |
| `navShowreel` | الديمو وعينات الصوت | Demo Reel & Samples |
| `navServices` | الخدمات والباقات | Services & Offers |
| `navWorkflow` | طريقة العمل | Workflow |
| `navCredentials` | الخبرة والاعتمادات | Credentials |
| `navContact` | تواصل معي | Contact |
| `ctaTalk` | لنتحدث عن مشروعك | Discuss Your Project |
| `switchModeLabel` | المسار الحالي: | Active Mode: |
| `themeLight` | الوضع النهاري | Light Mode |
| `themeDark` | الوضع الليلي | Dark Mode |
| `langSwitch` | English (in AR) / العربية (in EN) | العربية / English |

---

### 5.2 Gateway Landing Page

| Key | Arabic (`ar`) | English (`en`) |
|:---|:---|:---|
| `gatewayEyebrow` | الصوت، الفكرة، والتنفيذ المتكامل | Voice, Vision, & Full-Cycle Execution |
| `gatewayHeadline` | الحبر يكتبُ حرفًا... والصوتُ يبعثُ فيه روحًا | Ink writes the letter... Voice breathes life into it |
| `gatewaySubtext` | بين نبرة صوت تلمس القلوب وتبيع الفكرة، وبين رؤية تسويقية وتصوير احترافي ينفذ مشروعك من الصفر — اختر المسار الذي ترغب في استكشافه: | A word without voice is sleeping ink on paper. A voice without emotion is an echo fading into thin air. Between a tone that captivates audiences and full-cycle video production that takes your idea from script to screen — choose the door you wish to explore: |
| `gatewayCardVOTitle` | استوديو التعليق الصوتي | Voice Over Studio |
| `gatewayCardVOSubtitle` | Voice Over Artist | Voice Over Artist |
| `gatewayCardVODesc` | أداء صوتي يفهم السياق ويخاطب العاطفة ويقنع العقل. إعلانات، تمثيل، وثائقيات، وكتب صوتية. | A voice that grasps context, evokes emotion, and convinces buyers. Commercials, drama, documentaries, and e-learning audiobooks. |
| `gatewayCardVOAction` | دخول معرض الصوتيات ← | Enter Voice Over Studio → |
| `gatewayCardMarketingTitle` | التسويق وفريق الإنتاج المتكامل | Marketing & One-Man Crew |
| `gatewayCardMarketingSubtitle` | Marketing & One-Man Crew | Full Video Production Engine |
| `gatewayCardMarketingDesc` | من الفكرة وكتابة الإسكريبت إلى التصوير 4K والتعليق الصوتي والمونتاج — حل متكامل يختصر عليك فرق العمل. | From conversion scripts to 4K filming, pro voice narration, dynamic editing, and ad deployment — one unified creative partner. |
| `gatewayCardMarketingAction` | دخول استوديو الإنتاج والتسويق ← | Explore Marketing & Production → |

---

### 5.3 Voice Over Hub & Media Catalog

| Key | Arabic (`ar`) | English (`en`) |
|:---|:---|:---|
| `voHeroBadge` | مؤدي صوتي معتمد · القاهرة | Professional Voice Talent · Cairo |
| `voHeroHeadline` | الكلام ممكن أي حد يقوله.. الأداء الصح هو اللي بيبيع. | Anyone can speak the words. The right performance sells the message. |
| `voHeroSub` | صوت يترجم الفكرة، يلمس الجمهور، ويخلّي رسالتك تفضل حاضرة بعد آخر كلمة. بخلفية دراسية في الإعلام والتسويق، أقرأ النص بوعي وأؤديه بإحساس يخدم هدفك التجاري. | A voice that translates the core idea, connects with audiences, and lingers long after the last word. Backed by academic training in Media and Digital Marketing, I read scripts with deep context and deliver tones engineered for conversion. |
| `voListenSamples` | استمع إلى العينات الصوتية | Listen to Voice Samples |
| `voShowreelHeading` | الديمو الرئيسي الرسمي | Official Master Showreel |
| `voFilterAll` | جميع الأعمال | All Works |
| `voCategoryCommercial` | أداء إعلاني | Commercial Ads |
| `voCategoryActing` | أداء تمثيلي ودرامي | Dramatic & Acting |
| `voCategoryMotivational`| أداء حماسي شبابي | Motivational & Energetic |
| `voCategoryEducational` | تعليمي وكتب صوتية | Educational & Audiobook |
| `voCategoryReflections` | تأملات وحكم | Wisdom & Reflections |
| `voCategoryIVR` | الرد الآلي (IVR) | IVR & Telephony |
| `voCategoryDocumentary` | وثائقي ورسمي | Documentary & Formal |
| `speedLabel` | السرعة | Speed |
| `playLabel` | تشغيل | Play |
| `pauseLabel` | إيقاف مؤقت | Pause |
| `trackPlaying` | جاري الاستماع الآن | Now Playing |
| `whyVoEyebrow` | لماذا نعمل معاً؟ | Why Partner With Mohamed? |
| `whyVoTitle` | مؤدي صوتي يفهم سيكولوجية الجمهور والرسالة التسويقية | A voice artist who understands audience psychology and marketing objectives |
| `whyVo1Title` | فهم عميق للكلمة والسياق | Deep Linguistic & Contextual Insight |
| `whyVo1Desc` | دراستي للإعلام والتسويق تعني أنني لا أقرأ مجرد حروف؛ بل أحلل المشاعر والهدف التجاري وراء كل جملة. | My background in Media and Marketing ensures I do not simply read words — I dissect the emotional trigger and commercial goal behind every sentence. |
| `whyVo2Title` | مرونة صوتية وتلوين واسع | Dynamic Range & Vocal Color |
| `whyVo2Desc` | من النبرة الدافئة الهادئة، إلى الحماس الشبابي، والوقار الوثائقي، إلى الشخصيات الدرامية التي تعلق بالذاكرة. | From warm, intimate storytelling to energetic youth anthems, corporate gravitas, and memorable character voice acting. |
| `whyVo3Title` | جودة استوديو وسرعة تسليم | Studio-Grade Acoustics & Rapid Turnaround |
| `whyVo3Desc` | تسجيل احترافي معزول ومُعالج بأعلى معايير الهندسة الصوتية مع التزام تام بالمواعيد والتعديلات المطلوبة. | Broadcast-quality isolated recording, professional audio processing, and reliable SLA with revisions included. |

---

### 5.4 Marketing & One-Man Crew Hub

| Key | Arabic (`ar`) | English (`en`) |
|:---|:---|:---|
| `mktHeroBadge` | تسويق · صناعة محتوى · One-Man Crew | Marketing · Content Creation · One-Man Crew |
| `mktHeroHeadline` | فريق إنتاج وتسويق كامل في شخص واحد. بدون تشتيت الوكالات. | A complete marketing and video production team in one person. |
| `mktHeroSub` | أغلب الشركات تضيع ميزانيتها بين كاتب إعلانات، ومصور، ومؤدي صوتي، ومونتير لا يتفاهمون. أنا أجمع هذه الحلقات كاملة: أكتب الإسكريبت البيعي، أصوّره بأعلى جودة، أسجل التعليق الصوتي بنفسي، وأنتجه للنشر والإعلانات الممولة. | Most businesses waste time and budget juggling disconnected copywriters, videographers, voice actors, and editors who rarely align. I bridge the entire pipeline: writing conversion hooks, filming in 4K, voicing the narrative, and editing dynamic assets ready to generate sales. |
| `mktExplorePackages` | استكشف الباقات والخدمات | Explore Services & Packages |
| `mktWatchReel` | شاهد أسلوب العمل | See Production Workflow |
| `pillar1Title` | كتابة الإعلانات والإسكريبتات البيعية | Conversion Copywriting & Scripting |
| `pillar1Desc` | صياغة نصوص إعلانية مبنية على دراسة الجمهور، ومخاطبة دوافع الشراء، وصناعة هوك قوي يوقف التمرير في أول ثانيتين. | Direct-response scripts based on customer sentiment analysis, objection handling, and involuntary hooks designed to stop the scroll. |
| `pillar2Title` | تصوير وإخراج متكامل (One-Man Crew) | One-Man Crew 4K Production |
| `pillar2Desc` | معدات تصوير سينمائية 4K، إضاءة احترافية، وتسجيل صوت لاسلكي نقي. تنفيذ مرن في موقعك يوفر تكاليف الفرق الكبيرة. | Cinema-grade 4K camera packages, precision lighting, and wireless broadcast audio. Agile on-site filming without the overhead of massive crews. |
| `pillar3Title` | مونتاج سريع وتعليق صوتي فوري | Dynamic Video Editing & Native VO |
| `pillar3Desc` | دمج المؤثرات البصرية، وتصحيح الألوان، مع بصمتي الصوتية في التعليق، لتخرج لك المادة جاهزة تماماً للحملات الإعلانية. | Seamless color grading, kinetic typography, and immediate studio voiceover integration for ready-to-run Meta & TikTok ad campaigns. |
| `workflowEyebrow` | منهجية العمل | The Methodology |
| `workflowTitle` | 5 خطوات واضحة من الفكرة إلى العائد | 5 Simple Steps from Concept to Revenue |

---

### 5.5 Credentials & Contact

| Key | Arabic (`ar`) | English (`en`) |
|:---|:---|:---|
| `credEyebrow` | الخلفية والاعتمادات | Background & Credentials |
| `credTitle` | تعلم مستمر وتأهيل أكاديمي وعملي | Continuous Learning & Dual Academic Discipline |
| `cred1Title` | مبادرة Digilians الرئاسية (2026) | Digilians Presidential Initiative (2026) |
| `cred1Sub` | Digital Marketing Specialist — وزارة الاتصالات وتكنولوجيا المعلومات | Digital Marketing Track — Ministry of Communications & Information Technology |
| `cred2Title` | الأكاديمية العربية للعلوم والتكنولوجيا (AASTMT) | Arab Academy for Science & Technology (AASTMT) |
| `cred2Sub` | دبلوم التسويق الرقمي وتخطيط الحملات (2019) | Professional Digital Marketing & Campaign Strategy (2019) |
| `cred3Title` | دراسة الإعلام وتدريب الصوت التخصصي | Media Studies & Voice Mastery Coaching |
| `cred3Sub` | ورش متقدمة في هندسة الصوت والأداء الدرامي والإذاعي | Advanced audio engineering, dramatic acting, and voice over workshops |
| `contactEyebrow` | جاهز نبدأ؟ | Ready to Create? |
| `contactTitle` | خلّي رسالتك تتسمع وتتشاف صح. | Let your message be heard and seen the right way. |
| `contactSub` | سواء كنت بحاجة إلى تعليق صوتي لإعلانك القادم، أو تبحث عن فيديو تسويقي متكامل من الصفر، يسعدني التحدث معك. | Whether you need a compelling voice for your next ad, or a full-cycle video production partner from scratch, let’s make it happen. |
| `contactWhatsApp` | محادثة مباشرة عبر واتساب | Chat on WhatsApp |
| `contactEmail` | مراسلة عبر البريد الإلكتروني | Send an Email |
| `contactPhone` | اتصال هاتفي مباشر | Call Directly |
| `contactLinkedIn` | الملف الشخصي على لينكد إن | LinkedIn Profile |
| `contactLocation` | القاهرة، مصر (خدمات متاحة لجميع دول العالم) | Cairo, Egypt (Serving clients globally) |
| `copyright` | جميع الحقوق محفوظة © محمد القلشاني | All rights reserved © Mohamed El-Qalshany |

---

## 6. Features Discovered & Specification Catalog

The following table documents all features discovered during the probing of `ORIGINAL_REQUEST.md`, `src/data/`, and the existing Astro components.

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|:---|:---|:---|:---|:---|:---|:---|:---|
| 1 | Gateway | 10-Line Poetic Manifesto | Displays the client's dual-persona philosophy in Arabic & English with stylistic emphasis on lines 1, 9, 10. | Locale (`ar` / `en`) | Rendered calligraphic blockquote (`Aref Ruqaa`) | Falls back to default Arabic array if locale undefined | `src/data/site.json` & `GatewayHero.astro` |
| 2 | Gateway | Two-Path Portal Hub | Dual interactive cards navigating to VO Studio (`/vo`) or Marketing Engine (`/marketing`). | User click / hover | URL transition + animated arrow indicator | N/A (Standard HTML anchor tags) | `ORIGINAL_REQUEST.md` R1 |
| 3 | Voice Over | Categorized Audio/Video Catalog | Instant filtering across 7 voice genres (Commercial, Acting, Motivational, Educational, Wisdom, IVR, Doc). | Filter category click | Filtered media grid display with item counts | Shows "No tracks found" empty state if filter yields 0 items | `MediaCatalog.astro` & `samples.json` |
| 4 | Voice Over | Single-Active Media Playback | Synchronized playback engine enforcing only one active audio or video element playing at a time. | Media `play` event | Pauses all other active players across page | Graceful audio pause without UI stutter | `ORIGINAL_REQUEST.md` AC (Playback) |
| 5 | Voice Over | Multi-Speed Playback Controls | Zero-dependency speed selector (0.75x, 1x, 1.25x, 1.5x, 2x) for audio tracks. | Click on speed pill | Updates `HTMLMediaElement.playbackRate` | Resets to `1x` on error or new track load | `AudioPlayer.astro` |
| 6 | Voice Over | Master Showreel Spotlight | Dedicated hero video showcasing multi-genre vocal range. | Master showreel video (`demo_18_VO.mp4`) | Fullscreen/inline player with title overlay | Displays fallback poster card if video fails to load | `VOHero.astro` |
| 7 | Marketing | Three Core Pillars (R4) | Structural presentation of Content Creation, Digital Strategy, and One-Man Crew. | Content data | 3 feature cards with numbered badges and checklist items | Static fallback text | `ORIGINAL_REQUEST.md` R4 |
| 8 | Marketing | 5-Step Production Timeline | Visual roadmap from Brief → Scripting → Shoot → VO/Edit → Launch. | Step array | 5-step numbered cards with custom icons | Preserves semantic order in mobile column layout | `WorkflowSteps.astro` |
| 9 | Marketing | 3 Service Packages with WhatsApp CTAs | Social Sprint, Ad Engine, and Monthly Retainer with clear deliverables and timelines. | Package JSON object | Styled cards with primary/secondary CTAs linking to WhatsApp with pre-filled text | Pre-fills generic message if package title missing | `Packages.astro` & `marketing.json` |
| 10 | Marketing | Agency vs One-Man Crew Matrix | 4-row comparative breakdown highlighting speed, parties involved, creative vision, and cost overhead. | Comparison JSON array | High-contrast comparison table with highlight styling on Mohamed's column | Responsive horizontal scroll on narrow mobile screens | `Packages.astro` |
| 11 | Credentials | Dual Academic & Professional Display | Verified cards for Digilians 2026, AASTMT 2019, and Voice Coaching. | Credential strings in i18n | Year badge, institution title, and subtext description | Graceful wrapping on small screens | `CredentialsSection.astro` |
| 12 | Conversion | Direct Conversion CTAs (WhatsApp, Phone, Email, LinkedIn) | Low-friction communication channels across header, footer, and dedicated contact section. | Contact data | Clickable protocol links (`wa.me`, `tel`, `mailto`, `linkedin.com`) | Validates URL format; encodes URI parameters | `ORIGINAL_REQUEST.md` R4 |
| 13 | Conversion | Interactive WhatsApp Form Dispatcher | Form allowing client to input project details and dispatch directly to WhatsApp without server backend. | Client name, phone, project type, brief text | Formats message string and opens `window.open(url, '_blank')` | Requires name and phone before dispatch | `ContactSection.astro` |
| 14 | Localization | Dynamic RTL/LTR Direction Switching | Full layout mirroring for Arabic (`dir="rtl"`, `lang="ar"`) and English (`dir="ltr"`, `lang="en"`). | URL path (`/` vs `/en`) | Correct directional alignments, font stacks, and arrow symbols | Defaults to `rtl` and `ar` on unlocalized routes | `BaseLayout.astro` & `tokens.css` |

---

## 7. Edge Cases & Behavioral Analysis

| # | Feature | Tested Input / Scenario | Observed / Required Behavior | Mitigating Architecture |
|:---|:---|:---|:---|:---|
| 1 | Poetic Manifesto | Narrow mobile screen (360px viewport width) | Multi-line stanza text could cause awkward word breaks or line wrap overflows. | Fluid typography (`clamp(1.2rem, 3.5vw, 1.55rem)`) with `text-wrap: balance;` and adjusted padding. |
| 2 | Poetic Manifesto | English translation view on RTL base | Text direction could inherit RTL if not explicitly scoped. | Gateway card uses semantic `[dir="ltr"]` scope on English routes to ensure left-aligned poetic meter. |
| 3 | Media Players | User starts Video player while Audio sample is playing | Audio track continues playing under video, creating acoustic discordance. | Global `media-coordinator.js` listens to all `play` events and immediately triggers `.pause()` on all other audio/video instances. |
| 4 | Media Players | Network latency or slow asset buffering on 4K video | Blank screen or stalled playback spinner. | Video tags include `preload="metadata"` and lightweight poster images; loading states provide visual feedback. |
| 5 | WhatsApp Dispatch | Client inputs special characters, emojis, or Arabic diacritics in inquiry form | URL encoding could corrupt WhatsApp query string (`?text=...`). | Client-side script applies `encodeURIComponent()` to the concatenated inquiry string before calling `wa.me/`. |
| 6 | Service Packages | Client clicks WhatsApp CTA with slow connection | Pop-up blocker might intercept `window.open()`. | Direct anchor tags (`<a href="https://wa.me/..." target="_blank" rel="noopener noreferrer">`) used for package cards; form uses clean submit handler. |
| 7 | Agency Comparison | Screen width < 480px | 3-column table creates severe horizontal crushing of text cells. | Table wrapper configured with `overflow-x: auto;` and `min-width: 520px` on table element with sticky first column styling. |
| 8 | Theme Switching | Dark mode toggle during audio/video playback | Page repaint or re-render might restart media playback. | Theme switcher modifies `document.documentElement.dataset.theme` without triggering React/Astro DOM teardown; playback continues uninterrupted. |
| 9 | Direct CTAs | Client accesses site from desktop without WhatsApp Web active | `wa.me` redirect might stall or fail. | Link routes to standard `https://wa.me/201017038432`, which gracefully prompts either WhatsApp Desktop or WhatsApp Web based on OS. |
| 10 | Credentials Section | Screen reader accessibility on year badges | Screen reader might pronounce "2026" or "VO" ambiguously without context. | Year tags supplemented with semantic headings and `aria-label` descriptions for credentials. |

---

## 8. Recommendations for Downstream Builders & Test Engineers

1. **LinkedIn Integration**:
   - In `src/data/site.json`, add `"linkedinUrl": "https://www.linkedin.com/in/mohamedelqalshany"` (or active profile link).
   - In `ContactSection.astro` and `Footer.astro`, ensure a dedicated LinkedIn card or icon button is rendered alongside WhatsApp, Phone, and Email to satisfy the explicit requirement of **R4**.
2. **Pillars Alignment with R4**:
   - Ensure `MarketingPillars.astro` explicitly labels the three pillars as:
     1. **Content Creation** (صناعة المحتوى وكتابة الإعلانات)
     2. **Digital Strategy** (الاستراتيجية الرقمية وتخطيط الحملات)
     3. **One-Man Crew** (فريق الإنتاج المتكامل: كتابة، تصوير، صوت، مونتاج، وتوزيع)
   - This directly mirrors R4 wording in `ORIGINAL_REQUEST.md`.
3. **SEO Schema Metadata**:
   - In `BaseLayout.astro`, inject JSON-LD `Person` schema containing both professional titles (`Voice Over Artist`, `Digital Marketing Specialist & Video Producer`), education credentials (AASTMT, Digilians), and contact endpoints.

---
*End of Content Specification Blueprint.*
