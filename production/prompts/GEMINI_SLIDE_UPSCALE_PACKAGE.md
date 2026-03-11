# CREATIVE REINVENTION PACKAGE — Davao Oriental Partnership Presentation

## MISSION FOR OPUS (THE DISPATCHER)

You are dispatching Gemini's image generation model to **creatively reinvent** 8 presentation slides. The current NotebookLM slides exist as a **starting point — a comparable, a suggestion, a rough draft**. Nano Banana's job is to look at what exists and make something genuinely better. Not upscaled. Not reproduced at higher fidelity. **Reimagined.**

The data is sacred. The numbers cannot change. The narrative arc cannot change. But everything else — layout, typography, color relationships, spatial composition, visual metaphors, emotional weight — is open for creative reinvention.

**Context:** This presentation is for a meeting with Sebastian Aboitiz (Aboitiz Construction) and Antonio Peñalver regarding a mining partnership in Davao Oriental, Philippines. It will be projected. It must feel like the most premium, executive-grade presentation these people have ever seen.

## GEMINI API DETAILS
- **Model:** `gemini-2.0-flash-preview-image-generation`
- **Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent`
- **API Key:** Read `GEMINI_IMAGE_API_KEY` from `C:\Antigravity\TQM\.env`
- **Output directory:** `C:\Antigravity\TQM\production\outputs\slides\`

## EXECUTION METHOD

```javascript
const fetch = require('node-fetch');
const fs = require('fs');
require('dotenv').config({ path: 'C:\\Antigravity\\TQM\\.env' });

const API_KEY = process.env.GEMINI_IMAGE_API_KEY;
const MODEL = 'gemini-2.0-flash-preview-image-generation';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

async function generateSlide(prompt, filename) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        temperature: 0.7,
      },
    }),
  });

  const data = await res.json();

  for (const part of data.candidates[0].content.parts) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, 'base64');
      fs.writeFileSync(`C:\\Antigravity\\TQM\\production\\outputs\\slides\\${filename}`, buffer);
      console.log(`Saved: ${filename}`);
      return;
    }
  }
  console.error(`No image returned for ${filename}`);
}
```

Run sequentially. Create output directory first:
```bash
mkdir -p C:/Antigravity/TQM/production/outputs/slides
```

**Temperature is 0.7** (not 0.4) — we want creative energy, not safe reproduction.

---

## CREATIVE DIRECTION (GLOBAL)

**What the current slides do well:** Data density, narrative arc (third person → first person plural), dark/light alternation, gold accent palette.

**What Nano Banana should improve:**
- The current slides look like AI-generated presentation decks. We need them to feel like they were designed by a world-class design firm for a $100M pitch
- More sophisticated use of whitespace and visual hierarchy
- Bolder typographic choices — the current type is safe and generic
- Richer photographic integration where backgrounds exist
- More intentional color relationships — the gold is used everywhere equally; it should be used strategically to draw the eye to what matters most
- The glassmorphism cards are a good idea but feel templated — push them further or find a better visual metaphor
- Every slide should have ONE thing your eye goes to first, then a clear reading path

**Hard constraints:**
- 1920x1080 PNG output
- All numbers and data points must be exactly as specified (these are verified assay results)
- The 8-slide narrative arc must be preserved
- Color palette anchors: gold (#C5922E), dark (#0A0E1A / #0D1117), warm cream (#F5F0E8)

---

## THE 8 SLIDES

### SLIDE 1 — slide-01-partnership.png
**Current state:** Title slide with aerial mountain background, gradient overlay, four glassmorphism metric cards at bottom.

**What must appear:**
- Title: "A Partnership Built for This Moment"
- Subtitle conveying: regulatory window is open, 18 years of evidence, polymetallic deposit in Pacific Ring of Fire, MPSA 251(A)-2007-XI is secured and compliant
- Four metrics: 5,906 Hectares (one of largest among 287 valid MPSAs) | 9 Independent laboratories | 8 Completed drill holes | 493.1 Meters aggregate drill depth

**Creative brief:** This is the first thing they see. It needs to stop the room. Think about what makes a McKinsey or Goldman Sachs cover slide feel like it cost $50,000 to design. The mountain landscape of Davao Oriental should feel real and cinematic — golden hour, mist in valleys, the kind of photo that makes you want to be there. The metrics at the bottom need to feel substantial and premium, not like Bootstrap cards. Consider whether the four metrics could be arranged in a more compelling spatial relationship than a simple horizontal row. The title typography should have presence and weight. This slide sets the visual standard for everything that follows.

```
Generate a 1920x1080 presentation slide image. This must look like it was designed by a world-class creative agency for a $100M partnership pitch, not like an AI template.

OPENING SLIDE. Cinematic aerial photograph of lush tropical mountains in Davao Oriental, Philippines — Pacific Ring of Fire landscape. Golden hour. Mist threading between ridgelines. The photograph should feel like it belongs in National Geographic. Deep, rich colors. Real atmospheric depth.

Sophisticated dark gradient overlay that preserves the beauty of the landscape while ensuring text readability. NOT a flat black overlay — use a gradient that feels natural, like the light is actually fading.

TITLE: "A Partnership Built for This Moment" — commanding serif typography, white, positioned with intentional asymmetry (not dead center). The type should have the weight and presence of a magazine cover headline.

SUBTITLE (smaller, refined): "The regulatory window is open. Eighteen years of validated evidence confirm a massive polymetallic deposit. MPSA 251(A)-2007-XI is secured, active, and strictly compliant."

FOUR KEY METRICS displayed in the lower portion — but NOT as generic cards. Design these as premium data callouts with real visual sophistication. Gold (#C5922E) for the numbers, white for descriptors. Each metric should breathe — generous spacing, clear hierarchy between number and label.

"5,906" — "Hectares — one of the largest among 287 valid MPSAs"
"9" — "Independent laboratories validating the deposit"
"8" — "Completed drill holes proving subsurface continuity"
"493.1" — "Meters of aggregate drill depth"

The overall composition should have a clear focal point and reading path: landscape captures attention → title anchors → metrics provide substance. Executive-grade. Projector-ready. No clip art, no stock photo feel, no template energy.
```

### SLIDE 2 — slide-02-minerals.png
**Current state:** Three-column layout on cream background showing Iron, Copper, Gold with hero numbers and ore specimen images.

**What must appear:**
- Iron: 67.31% Fe (lump), 64.11% Fe (fines), 16.1M MT estimated, POSCO International confirmed, Dec 2024 Ostrea DH-1-2 returned 59.86% Fe with 0.053% phosphorus and 3.61% silica. Premium shipping-grade.
- Copper: 36.58% Cu (Dec 2024 Ostrea DH-1), 21.6M MT ore resource, <9% explored, confirmed by Davao Analytical (39.5% surface) and Beijing BGRIMM (20.72% arbitration-grade)
- Gold: 13.77 g/t Au (Dec 2024, Batch B-34805, DH-10), historical high 20.35 g/t Au (Oct 2017), by-product concentrated in copper-bearing zones

**Creative brief:** The current three-column layout is functional but flat. The mineral specimens at the bottom of each column are the most visually interesting element — consider making them more prominent. The hero numbers (67.31%, 36.58%, 13.77 g/t) are the most important data on this slide and should have massive visual weight. Think about whether a three-column layout is actually the best way to present this, or whether there's a more dynamic composition. The cream background is correct for the light/dark alternation but could be richer.

```
Generate a 1920x1080 presentation slide image. World-class data visualization design, not a template.

TITLE: "What's Inside the Mountain" — elegant serif, dark text on warm cream/off-white background (#F5F0E8).

THREE MINERALS presented with bold, sophisticated data design. Each mineral section needs a photorealistic ore specimen image AND its key data. The specimens should be beautiful — these are geological treasures, present them that way.

IRON — "The Near-Term Revenue":
Hero number: "67.31%" Fe in massive gold serif type. "16.1M MT Estimated Resource."
"POSCO International (Korea) confirmed. Fines at 64.11% Fe."
"December 2024 Ostrea drill core (DH-1-2): 59.86% Fe, exceptionally low impurities (0.053% phosphorus, 3.61% silica). Premium shipping-grade."
Specimen: Dark metallic hematite/magnetite, rough crystalline texture.

COPPER — "The Strategic Backbone":
Hero number: "36.58%" Cu in massive gold serif type. "21.6M MT Ore Resource" and "<9% Explored" as accent badges.
"December 2024 Ostrea DH-1 confirms high grades at depth. Corroborated by Davao Analytical (39.5% surface) and Beijing BGRIMM (20.72% arbitration-grade)."
Specimen: Chalcopyrite/bornite, iridescent purple-gold-blue metallic crystals.

GOLD — "The By-Product Upside":
Hero number: "13.77 g/t" Au in massive gold serif type.
"Latest Ostrea fire assay (December 2024, Batch B-34805, Drill Hole DH-10). Historical high: 20.35 g/t Au (October 2017)."
"Highly lucrative by-product concentrated in copper-bearing zones."
Specimen: Native gold in white quartz matrix, visible gold flakes and veins.

The hero numbers must DOMINATE their sections — they are the first thing the eye should find. The ore specimens should feel tangible and real. Clean, warm, premium. Thin dividers between sections. The typography hierarchy must be razor sharp: number → sub-metrics → body text.
```

### SLIDE 3 — slide-03-why-this-works.png
**Current state:** Two-column layout (GMC Assets vs Partner Capabilities) with center bridge element on dark background.

**What must appear:**
- Left: "GMC Assets (What cannot be bought)" — MPSA rights and regulatory compliance, 15 years accumulated site knowledge, FPIC approved with deep community trust, 60% indigenous Lumad workforce
- Right: "Strategic Partner Capabilities (What GMC cannot build alone)" — World-class construction/engineering, mineral processing/hydrometallurgical expertise, capital for multi-phase development, institutional credibility for JORC commissioning
- Center bridge: Coral Bay THPAL reference — identical structural model built one of the most complex hydrometallurgical facilities in Southeast Asia. $1.7B facility value, 13 years maintained, 1,000 local jobs created

**Creative brief:** This is the strategic pivot slide — it's where the presentation shifts from "here's what we have" to "here's why we need each other." The two-column + bridge concept is strong but the current execution feels like a bulleted list with decoration. The Coral Bay THPAL bridge is the most important element — it's the proof that this partner has already done something comparable. Make that bridge element feel like a revelation, not an afterthought. The engineering blueprint texture in the background is a good instinct — lean into it.

```
Generate a 1920x1080 presentation slide image. Strategic partnership visualization. Premium dark design.

TITLE: "Why This Works" — bold serif, white text, on dark navy/charcoal (#0A0E1A).

TWO-COLUMN STRUCTURE with a powerful central connecting element:

LEFT — "GMC Assets (What cannot be bought)" in gold serif:
• "MPSA rights and regulatory compliance"
• "15 years of accumulated site knowledge"
• "FPIC approved with deep community trust"
• "60% indigenous Lumad workforce"

RIGHT — "Strategic Partner Capabilities (What GMC cannot build alone)" in gold serif:
• "World-class construction and engineering capability"
• "Mineral processing and hydrometallurgical expertise"
• "Capital capacity to fund multi-phase development"
• "Institutional credibility for JORC commissioning"

CENTER BRIDGE — This is the KEY element. A visually striking connection between the two columns. Inside it: "The identical structural model built the Coral Bay THPAL nickel processing plant in Palawan — one of the most complex hydrometallurgical facilities in Southeast Asia."

Three gold metrics below the bridge: "$1.7B Facility Value" | "13 Years Maintained" | "1,000 Local Jobs Created"

The bridge element should feel like an engineering marvel — structural, precise, powerful. NOT a text box. Think architectural rendering, blueprint aesthetic, or structural steel visualization. Subtle engineering grid/blueprint lines in the dark background. The golden glow from the bridge should visually connect the two columns, making the partnership feel inevitable.

The bullet points should feel clean and modern, not like a Word document list. Premium executive design.
```

### SLIDE 4 — slide-04-convergent-validation.png
**Current state:** World map with connection lines from Philippines outward, hero metrics row, and 5-row data table.

**What must appear:**
- Hero metrics: 9 Independent Labs | 5 Countries | 136 Systematic Intertek samples | 120,000 WMT commercially processed by HK Imperial
- Table rows:
  - POSCO International (Korea): 67.31% Fe (lump), 64.11% Fe (fines)
  - Beijing BGRIMM (China): 20.72% Cu (CNAS-accredited arbitration-grade)
  - Ostrea Mineral Laboratories (Philippines, Dec 2024): 36.58% Cu (DH-1), 13.77 g/t Au (DH-10), 59.86% Fe (DH-1-2)
  - HK Imperial Processing (Philippines): 18.02% Cu concentrate at industrial scale
  - CCIC / SGS / Lab Uji Kimia: Independent cross-border verification of grade ranges
- Statement: "No single result is load-bearing. The portfolio is self-corroborating, validated by the June 2025 SGECS professional geological report filed with the MGB."

**Creative brief:** This is the evidence credibility slide. The world map with convergence lines is a strong concept — multiple independent labs from multiple countries all pointing to the same conclusion. But the current execution makes it feel like a generic infographic. The MAP should be the visual centerpiece with the data radiating from it or integrated into it. The table needs to feel authoritative, not like an HTML table. Think Bloomberg terminal meets McKinsey. NOTE: The current NotebookLM slide has a typo "Laboratorics" — obviously fix that.

```
Generate a 1920x1080 presentation slide image. Data-dense credibility visualization. Dark, authoritative design.

TITLE: "Convergent Validation" — gold serif, on dark background (#0D1117).

WORLD MAP VISUALIZATION — Dark gray landmasses on darker background. Glowing gold connection lines radiating FROM a single bright point in the Philippines (Davao Oriental) OUTWARD to South Korea, China, Indonesia. Each endpoint has a glowing node. This should look like a sophisticated network visualization — think financial data terminal aesthetic, not a clip-art globe.

HERO METRICS (gold, prominent): "9 Independent Labs" | "5 Countries" | "136 Systematic Intertek samples" | "120,000 WMT commercially processed"

LABORATORY DATA — Five entries, presented with authority and clarity. Gold left-border accent on each entry. NOT a basic table — think premium data cards or a sophisticated list design:

POSCO International (Korea) → "67.31% Fe (lump), 64.11% Fe (fines)"
Beijing BGRIMM (China) → "20.72% Cu (CNAS-accredited arbitration-grade)"
Ostrea Mineral Laboratories (Philippines, Dec 2024) → "36.58% Cu (DH-1), 13.77 g/t Au (DH-10), 59.86% Fe (DH-1-2)"
HK Imperial Processing (Philippines) → "18.02% Cu concentrate at industrial scale"
CCIC / SGS / Lab Uji Kimia → "Independent cross-border verification of grade ranges"

STATEMENT (left side, smaller): "No single result is load-bearing. The portfolio is self-corroborating, validated by the June 2025 SGECS geological report filed with the MGB."

The design must feel like a military intelligence briefing or Bloomberg terminal — dense with data but impeccably organized. Every piece of information should be instantly findable. The convergence metaphor (many independent sources → one conclusion) should be visually obvious.
```

### SLIDE 5 — slide-05-roadmap.png
**Current state:** Horizontal timeline with 5 phases on cream background, financial metrics callout box.

**What must appear:**
- Phase 1 (CURRENT, highlighted): Exploration Partnership — 10-hole diamond drill targeting 480-960m, first export-ready iron ore vessel
- Phase 2: Feasibility Study — JORC-compliant resource estimate (~$250K)
- Phase 3: Permitting — ECC and LGU endorsements
- Phase 4: Plant Construction — Purpose-built mineral processing facility, downstream beneficiation
- Phase 5: Production — Commercial operations and recurring ecosystem revenue
- Decision gates between each phase (mutual agreement, no commitment extends beyond current phase)
- Financial metrics: ₱13.4B NPV | 78% IRR | ₱1.52B CapEx
- Qualifier: "DMPF Baseline Projections. Modeled on iron ore operations ONLY. Copper and gold revenue entirely excluded."

**Creative brief:** Timelines are the most overused and poorly designed element in presentations. The current horizontal timeline with circles is generic. Reinvent this. The KEY message is optionality — decision gates between every phase. The partner is never locked in beyond the current phase. That's the emotional sell. The financial metrics (₱13.4B NPV, 78% IRR) are stunning numbers and should have real visual impact. Phase 1 being highlighted as "you are here" is important — it makes the entry point feel small and safe while the endgame feels massive.

```
Generate a 1920x1080 presentation slide image. Strategic roadmap with sophisticated visual design. Light background.

TITLE: "The Development Roadmap" — bold serif, black, on warm cream (#F5F0E8).
SUBTITLE: "Structured execution. No commitment extends beyond the current phase without mutual agreement. Every phase de-risks the next."

FIVE-PHASE DEVELOPMENT TIMELINE — but NOT a generic horizontal timeline with circles. Reinvent this. Consider a stepped elevation, a building-blocks metaphor, or cascading panels. Between each phase, show DECISION GATE icons (shield or lock symbol in gold) that communicate optionality and safety.

PHASE 1 (VISUALLY PROMINENT — glowing gold border, larger, "you are here" energy):
"Phase 1: Exploration Partnership"
"10-hole diamond drill program (480-960m). First export-ready iron ore vessel."

PHASE 2: "Feasibility Study" — "JORC-compliant resource estimate (~$250K)"
PHASE 3: "Permitting" — "Environmental Compliance Certificate and LGU endorsements"
PHASE 4: "Plant Construction" — "Purpose-built mineral processing facility. Downstream beneficiation."
PHASE 5: "Production" — "Commercial operations. Recurring ecosystem revenue."

FINANCIAL CALLOUT (premium box, bottom-right area):
"₱13.4B NPV" | "78% IRR" | "₱1.52B CapEx"
Below in italic: "DMPF Baseline Projections. Modeled on iron ore operations ONLY. Copper and gold revenue entirely excluded."

The phase progression should feel like ascending — small entry point growing toward massive outcome. The decision gates must be visually clear — they communicate that the partner controls the pace. Phase 1 should feel inviting and low-risk. The financial numbers should have real presence. Clean, structured, confident design.
```

### SLIDE 6 — slide-06-already-addressed.png
**Current state:** Five rows with green/amber status circles on dark background — a risk mitigation checklist.

**What must appear:**
- GREEN (resolved): FPIC Approval — approved via NCIP, genuine partnership not transactional
- GREEN: MGB Operator Status — ORDER signed by Atty. Wilfredo G. Moncano (National Director, MGB)
- GREEN: Legal Standing — DMC-GMC dispute permanently dead, Feb 2022 Compromise Agreement, final un-reopenable court ruling
- AMBER (active/managed): Copper at Depth — sulfide minerals confirmed at 60-65m (SBF 1C), Phase 1 drilling targets 480-960m
- AMBER: Mercury Constraints — 1,245-1,429 mg/kg, disclosed proactively, Minamata Convention compliance integrated into day-one processing design

**Creative brief:** This is the objection-killer slide. It answers the questions before they're asked. The green/amber traffic light system is the right metaphor — keep it, but make it feel premium. The current version looks like a checklist. It should feel like a control room status board — everything monitored, everything managed. The three greens should radiate confidence. The two ambers should feel honest and handled, not worrying. The distinction between "resolved" and "actively managed" is important. This slide builds trust through transparency.

```
Generate a 1920x1080 presentation slide image. Risk management status board. Dark, authoritative, transparent.

TITLE: "Already Addressed" — elegant serif, gold/white, on dark background (#0D1117).

FIVE STATUS ROWS — presented like a premium operations dashboard or control room status board. NOT a simple bullet list. Each row should feel like a monitored system status.

Each row has: a glowing status indicator (circle or bar), bold label in white, description in lighter gray.

ROW 1 — BRIGHT GREEN (#22C55E) with outer glow:
"FPIC Approval" — "Approved by indigenous communities via the NCIP process. Driven by years of genuine partnership, not transactional consent."

ROW 2 — BRIGHT GREEN with outer glow:
"MGB Operator Status" — "Official ORDER signed by Atty. Wilfredo G. Moncano (National Director, Mines and Geosciences Bureau) confirming GMC as authorized operator."

ROW 3 — BRIGHT GREEN with outer glow:
"Legal Standing" — "DMC-GMC dispute permanently dead. February 2022 Compromise Agreement backed by a final, un-reopenable court ruling."

ROW 4 — WARM AMBER (#F59E0B) with outer glow:
"Copper at Depth" — "Sulfide minerals confirmed at 60-65m (SBF 1C). Phase 1 drilling precisely targets full ore body geometry at 480-960m."

ROW 5 — WARM AMBER with outer glow:
"Mercury Constraints" — "Disclosed proactively (1,245-1,429 mg/kg). Standard engineering constraint with Minamata Convention compliance integrated into day-one processing design."

The green indicators should radiate resolved confidence — these issues are DONE. The amber indicators should feel active and managed — honest, not alarming. The overall aesthetic should feel like looking at a sophisticated monitoring dashboard. Clean dark background, generous spacing between rows, clear visual hierarchy. The transparency IS the trust signal.
```

### SLIDE 7 — slide-07-build-together.png
**Current state:** Warm photograph of workers/community on mountain ridge at sunset, four metric cards overlaid.

**What must appear:**
- Title: "What We Build Together"
- Subtitle: "The mountain is patient. What we build around it defines the legacy. We are building an economy, not just a plant."
- Four metrics: 32 years remaining on MPSA (renewable to 2057) | 27M+ safe man-hours | 60% Lumad workforce already on site | 141 permanent jobs at processing facility
- Footer: "'Caring for Creation' — Progressive reclamation concurrent with operations. ISO 14001 standards from design phase."

**Creative brief:** This is the emotional climax of the presentation. After 6 slides of data, evidence, and strategy, this slide is about PEOPLE. The current NotebookLM slide has AI-generated people that look fake — this is the ONE slide where that matters most. Nano Banana should create a scene that feels genuinely human. A mountain ridge at golden hour. Workers and indigenous community members together. Hard hats mixed with traditional clothing. The mood is pride and shared purpose. If the people look AI-generated, the entire emotional beat fails. Consider whether the focus should be on faces, silhouettes, or a wider landscape shot where the human figures are part of something larger. The metrics support the human story — they are NOT the focus of this slide.

```
Generate a 1920x1080 presentation slide image. Emotional, human, cinematic. This is the heart of the presentation.

TITLE: "What We Build Together" — elegant serif, white with subtle warmth, top-left.
SUBTITLE: "The mountain is patient. What we build around it defines the legacy. We are building an economy, not just a plant."

BACKGROUND: A cinematic golden hour photograph on a mountain ridge in the Philippines. Filipino mining workers and indigenous community members TOGETHER — some in hard hats, some in traditional indigenous clothing. They are looking out over misty valleys from a high vantage point. The light is warm gold from behind/side. The mood is pride, dignity, shared purpose.

CRITICAL: The people must feel REAL. NOT plastic AI-generated faces. Consider using silhouettes against the golden sky, or a wider shot where the figures are seen from behind looking over the landscape, or a medium shot where expressions are suggested by posture rather than rendered in detail. The humanity must be convincing — this slide fails completely if the people look artificial. A powerful silhouette composition may be more effective than attempting photorealistic faces.

FOUR METRICS overlaid on the lower portion (semi-transparent dark backing for readability):
"32" — "Years remaining on MPSA, renewable to 2057"
"27M+" — "Safe man-hours — honoring the established construction track record"
"60%" — "Lumad workforce already on site"
"141" — "Permanent jobs at the processing facility"

Gold numbers, white labels. The metrics SUPPORT the human story — they are secondary to the image.

FOOTER (small, gold, italic): "'Caring for Creation' — Progressive reclamation concurrent with operations. ISO 14001 standards from design phase."

After 6 slides of data, this slide should make them FEEL something. Cinematic. Warm. Real.
```

### SLIDE 8 — slide-08-first-step.png
**Current state:** Clean cream background with three numbered items — the call to action.

**What must appear:**
- Title: "The First Step"
- Item 1: Phase 1 Exploration Partnership Agreement — joint commitment to 10-hole drilling, geological confirmation, first iron ore export vessel
- Item 2: Technical Team Introduction & Site Assessment — engineering evaluation, environmental baseline review, community engagement
- Item 3: Joint Development Planning — feasibility study scoping, timeline structuring, shared governance framework
- Footer: "Phase 1 commitment only. Decision gates protect both parties."

**Creative brief:** This is the close. After the emotional peak of slide 7, this slide returns to calm, clean, light — a deliberate contrast. It should feel like taking a breath. The simplicity IS the confidence. Only three items. Only Phase 1. The message is: "This is all we're asking for right now." The cream background returning after several dark slides signals a new chapter. Maximum whitespace. The gold numbering should feel substantial but not loud. This slide should make saying yes feel easy and natural. No images, no decoration — just pristine typography and gold accents.

```
Generate a 1920x1080 presentation slide image. Minimalist, confident, clean. The close.

TITLE: "The First Step" — bold serif, black, centered, on clean warm cream (#F5F0E8). Generous whitespace above and below.

THREE NUMBERED ITEMS, vertically stacked with ample breathing room between them. Left-aligned in the center area of the slide. Each item has:
- A large decorative gold serif numeral (1, 2, 3) — substantial, ~120pt
- A gold vertical line separator
- Bold black serif header
- Regular weight dark gray sans-serif body text

ITEM 1:
"Phase 1 Exploration Partnership Agreement"
"Joint commitment to systematic 10-hole drilling, geological confirmation, and the first iron ore export vessel."

ITEM 2:
"Technical Team Introduction & Site Assessment"
"Engineering evaluation, environmental baseline review, and community engagement."

ITEM 3:
"Joint Development Planning"
"Feasibility study scoping, timeline structuring, and shared governance framework."

FOOTER (centered, bottom, smaller dark gray text): "Phase 1 commitment only. Decision gates protect both parties."

This slide is DELIBERATELY minimal. After 7 slides of rich data and cinematic imagery, the restraint here is a power move. Maximum whitespace. Pristine typography. No images, no decorative elements, no gradients — just clean type and gold accents on cream. The simplicity after all the preceding density is itself a statement of confidence. Saying yes should feel easy.
```

---

## EXECUTION ORDER
Run slides 1 through 8 sequentially. Save each to the output directory. If any generation fails, retry once with the same prompt. If it fails twice, log the error and continue to the next slide.

After all 8 are generated, report which succeeded and which need manual attention.

## NOTES FOR OPUS
- The GEMINI_IMAGE_API_KEY in .env is the key to use (may differ from GEMINI_API_KEY)
- If `gemini-2.0-flash-preview-image-generation` is unavailable, try `imagen-3.0-generate-002` as fallback
- Output images must be PNG format
- If Gemini returns both text and image, extract only the image
- Each generation may take 15-30 seconds — do NOT parallelize, Gemini rate-limits image generation
- Temperature is set to **0.7** — we want creative output, not safe reproduction
- The creative briefs above each prompt box give Nano Banana CONTEXT about what we're trying to achieve — include them in conversation if the model supports multi-turn, otherwise the prompt boxes alone contain everything needed
