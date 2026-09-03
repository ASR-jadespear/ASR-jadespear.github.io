# ASR — Developer & Creative Technologist Portfolio

[![GitHub Pages](https://img.shields.io/badge/Live-Demo-48e5c2?style=for-the-badge&logo=github&logoColor=black)](https://asr-jadespear.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-86B9B0?style=for-the-badge)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Engine-Vanilla%20ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Payload](https://img.shields.io/badge/HTML%20Payload-59%20KB-brightgreen?style=for-the-badge)](index.html)
[![Bandwidth Saved](https://img.shields.io/badge/Media%20Optimization-93%25%20Reduced-teal?style=for-the-badge)](#performance-engineering--optimization-milestones)

> *"Struggling is a Constant. Efforts matter... Quitters can't be Achievers."*  
> — **Abu Sayeem Rafi (ASR / jadespear)**

Welcome to the official repository of my personal portfolio. This website is engineered from scratch without bulky frontend frameworks or UI libraries, emphasizing pure vanilla web technologies (HTML5, modern CSS3, ES6+ JavaScript, Canvas 2D, and Web Audio API) combined with bespoke cyberpunk and noir mechanical aesthetics.

---

## 🧭 Table of Contents

1. [Overview & Core Philosophy](#-overview--core-philosophy)
2. [Design Thinking Behind Each Element](#-design-thinking-behind-each-element)
   - [Atmospheric Background & Storm Palette](#1-atmospheric-background--storm-palette)
   - [Interactive 3D Matrix Cyber Rain](#2-interactive-3d-matrix-cyber-rain)
   - [Top Navigation & Branding Pulse](#3-top-navigation--branding-pulse)
   - [Hero Section & Dynamic Typing Motto](#4-hero-section--dynamic-typing-motto)
   - [About Me & Education Timeline](#5-about-me--education-timeline)
   - [Alternating Scroll-Synced Mechanical Gears](#6-alternating-scroll-synced-mechanical-gears)
   - [Featured Projects Showcase](#7-featured-projects-showcase)
   - [Creative Studio (Audio Synth & Mandala Canvas)](#8-creative-studio-audio-synth--mandala-canvas)
   - [Honors & Mathematical Olympiads](#9-honors--mathematical-olympiads)
   - [Hobbies & Cinematic Screenshot Slider](#10-hobbies--cinematic-screenshot-slider)
   - [Vibe Coding Interactive Terminal Console](#11-vibe-coding-interactive-terminal-console)
   - [Contact Section & Email Copy Feedback](#12-contact-section--email-copy-feedback)
3. [Performance Engineering & Optimization](#-performance-engineering--optimization)
4. [File Structure](#-file-structure)
5. [Local Development & Setup](#-local-development--setup)
6. [Connect with Me](#-connect-with-me)

---

## 🌌 Overview & Core Philosophy

As a Computer Science and Engineering student at the **Islamic University of Technology (IUT)** and an aspiring game developer/systems engineer, I wanted my portfolio to feel like an interactive piece of software rather than a static resume.

### Guiding Principles

1. **Zero Framework Bloat**: No React, Vue, jQuery, or Tailwind. Pure hand-crafted semantic HTML5, modern CSS variables, and optimized vanilla ES6+.
2. **Atmospheric Cyber Noir**: A restrained, cinematic color scheme ("Storm Teal") paired with deep space obsidian and glowing neon accents.
3. **Tactile Interaction**: Elements respond to the user's cursor, scroll velocity, keyboard inputs, and audio feedback.
4. **Ruthless Performance**: Fast First Contentful Paint (FCP), lazy-loaded heavy assets, asynchronous background multi-threading, and zero idle CPU drain.

---

## 🎨 Design Thinking Behind Each Element

### 1. Atmospheric Background & Storm Palette

* **What it looks like**: A dark, moody, mountainous photo overlay darkened to 32% brightness with subtle radial vignettes and cyan chromatic glow.
- **The Thought Process**: Standard dark-mode websites are often just solid flat `#121212` or pitch black `#000000`. Flat black feels dead, while busy wallpapers ruin readability. By taking a high-resolution atmospheric landscape, compressing it to 2560px WebP, darkening it with CSS `brightness(0.32) contrast(1.2)`, and overlaying frosted glassmorphism containers, the page gains cinematic depth while keeping all text razor-sharp.
- **Palette Tokens**:
  - `Obsidian Abyss`: `#030E17`, `#041421`
  - `Storm Teal`: `#86B9B0`
  - `Cyber Mint & Green`: `#48e5c2`, `#38ef7d`
  - `Storm Slate`: `#78909c`, `#a0b2c6`
  - `Clean White / Text`: `#ffffff`, `#D1D5D6`

### 2. Interactive 3D Matrix Cyber Rain

* **What it looks like**: Dual-stream katakana, numeric, and symbolic glyphs flowing down the viewport with 3D parallax depth, glowing white-cyan lead glyphs, and mouse proximity interaction.
- **The Thought Process**: Matrix rain is iconic, but 2D vertical lines often feel flat. I wanted a rain system with true **three-dimensional perspective**:
  - Distant particles fall slowly with smaller fonts and lower opacity.
  - Foreground particles fall faster with larger fonts and neon green-teal trails.
  - Moving the mouse tilts and pushes the rain via interactive parallax math.
  - When the cursor gets close to a particle, it lights up into pure electric white.
- **Engine Optimizations**:
  - Caches `ctx.font` strings to eliminate thousands of expensive browser layout parses per second.
  - Pauses execution (`cancelAnimationFrame`) when the browser tab is hidden to save mobile battery life.

### 3. Top Navigation & Branding Pulse

* **What it looks like**: A floating glassmorphic bar featuring an "ASR" logo with a cyan breathing neon pulse orb and smooth scrollspy navigation links.
- **The Thought Process**: Top bars often suffer from awkward gaps between logos and menus. I reduced the horizontal spacing and added a rhythmic cyber status pulse dot next to the `ASR` brand text to communicate that the portfolio is "live and active."

### 4. Hero Section & Dynamic Typing Motto

* **What it looks like**: An eye-catching introduction with status tags ("Available for Game Dev & Internships"), location badge, and a bold glowing typewriter animation cycling through three personal philosophies.
- **The Thought Process**: Instead of just saying *"Hi, I'm a developer"*, the hero states my identity: *"Engineering Interactive Worlds & Systems"*. The typewriter animation below it cycles through:
  - `"Struggling is a Constant"`
  - `"Efforts matters..."`
  - `"Quitters can't be Achievers"`
  Styled with neon cyan drop-shadows and a blinking underscore cursor, it immediately sets a gritty, determined tone.

### 5. About Me & Education Timeline

* **What it looks like**: Two strictly equal-height grid cards. The left card outlines my journey, toolset, and software philosophy. The right card displays a vertical glowing timeline of my academic path (IUT CSE, Rajshahi College, Rajshahi Collegiate School).
- **The Thought Process**: Portfolios often look lopsided when "About Me" and "Education" have mismatched heights. Using flexbox column layouts with internal card stretch ensures both cards remain perfectly aligned across desktop resolutions.

### 6. Alternating Scroll-Synced Mechanical Gears

* **What it looks like**: Giant mechanical gears peeking halfway out of the viewport edges that spin smoothly in real time as you scroll down the page:
  - **About Me**: Left Edge (counter-clockwise)
  - **Creative Studio**: Right Edge (clockwise)
  - **Game Screenshots**: Left Edge (counter-clockwise)
  - **Contact**: Right Edge (clockwise)
- **The Thought Process**: I originally had a massive 7-gear transmission box in the middle of the screen. While cool, it broke the visual reading flow and weighed down the layout. Moving to **alternating side gears**:
  - Creates the feeling that an enormous mechanical clockwork chassis powers the entire website.
  - Half of each 400px gear is tucked off-screen, creating a framing border on left and right margins.
  - Counter-rotating physics (left spins negative, right spins positive) creates an authentic interlocking illusion.
- **Architecture**: Defined once in SVG `<symbol id="gear-mesh">` and instantiated via `<use>`. Controlled by an `IntersectionObserver` that only animates the specific gear on screen, dropping idle CPU/GPU usage to 0%.

### 7. Featured Projects Showcase

* **What it looks like**: Six detailed project cards categorized with status pills ("Completed", "In Development") and interactive detail modals:
  1. **React-O-Ball**: Unity/C# arcade physics game with elemental chemistry reaction systems.
  2. **Restoration**: 2.5D physics platformer with dynamic grappling hooks and gravity inversion.
  3. **Nightmare**: Retro top-down psychological survival horror with dynamic raycast field-of-view.
  4. **Acadence**: Full academic workflow manager and collaborative study ecosystem.
  5. **Finite State Machine Cache**: Memory-efficient C++ cache engine with stateful eviction heuristics.
  6. **SDG 4 Education Research**: Statistical data analysis exploring inequality in digital education access.
- **The Thought Process**: I deliberately removed generic project screenshot mockups from the card headers to eliminate visual clutter and keep cards compact and readable. The cards highlight technical implementation details, architecture, and technology tag pills. Clicking any card triggers an accessible `<dialog>` modal with full deep-dive descriptions.

### 8. Creative Studio (Audio Synth & Mandala Canvas)

* **What it looks like**: Two interactive creative micro-apps:
  1. **Web Audio Synth Piano**: A functional octave keyboard (`C4` to `C5`) playable with mouse clicks or keyboard keys (`A`, `S`, `D`, `F`, `G`, `H`, `J`, `K`). Generates warm sine-wave frequencies live using the browser's native Web Audio API — zero audio files required!
  2. **Interactive Mandala Studio**: A canvas widget allowing visitors to draw with mouse or touch, mirroring strokes into 8-fold radial sacred geometry. Includes an "Auto Animate" mode and an art toggle overlay showing my original digital mandala illustration.
- **The Thought Process**: Game development requires both technical discipline and artistic sensibility. This section proves both: real-time procedural audio synthesis alongside visual symmetry algorithms.

### 9. Honors & Mathematical Olympiads

* **What it looks like**: High-contrast achievement cards commemorating national and global honors:
  - **2019 Bangladesh Mathematical Olympiad (BdMO)**: National 2nd Runner-up.
  - **2020 International Youth Math Challenge (IYMC)**: Silver Honour (Top 7% globally).
- **The Thought Process**: Game physics, graphics shaders, and game logic all depend on combinatorial mathematics and discrete logic. Showcasing my mathematical foundation provides context for why I approach game architecture and optimization so rigorously.

### 10. Hobbies & Cinematic Screenshot Slider

* **What it looks like**: A cinematic screenshot gallery showcasing in-game captures from games that inspire my art style (Genshin Impact, God of War, Resident Evil, Stellar Blade, Control, Silent Hill f, The Last of Us, A Plague Tale, Pragmata, Black Myth: Wukong, Hellblade, MGS Delta, Tomb Raider, Dead Space, Cronos). Includes navigation arrows, slide indicators, a 1080p Lightbox modal, and interactive game chip selectors.
- **The Thought Process**: Capturing games with photo-mode cameras trains the eye for composition, color grading, lighting, and environmental storytelling. Below the slider, four pixel-art styled floating boxes highlight my offline hobbies: *Story-Driven Games*, *Story Books & World-building*, *Psycho-Thriller Cinema*, and *Visual Mandala Editing*.

### 11. Vibe Coding Interactive Terminal Console

* **What it looks like**: A 4:3 aspect ratio retro-futuristic terminal window styled like an embedded Linux CLI (`asr@iut:~$`).
- **Supported Commands**:
  - `help`: Lists all valid terminal commands.
  - `about`: Outputs personal background, degree, and focus.
  - `projects`: Summarizes key software and game engines.
  - `games`: Lists influential games and aesthetic inspirations.
  - `skills`: Prints categorized programming languages and engines.
  - `achievements`: Displays Olympiad honors.
  - `contact`: Prints active communication channels.
  - `music`: Plays a live synthesized 5-note melodic chord progression (`C4 -> E4 -> G4 -> B4 -> C5`) through the Web Audio synthesizer!
  - `clear`: Purges the terminal scrollback buffer.
- **The Thought Process**: A terminal is the quintessential developer environment. Providing both keyboard command entry and clickable quick-chip suggestions gives power users a fun easter-egg while keeping mobile and casual visitors engaged.

### 12. Contact Section & Email Copy Feedback

* **What it looks like**: Clean direct connection channels (Email, GitHub, LinkedIn, Instagram, Facebook) featuring a one-click clipboard copy bar: `📧 abusayeemrafi@gmail.com`.
- **The Thought Process**: Visitors shouldn't be forced to open their default OS email client just to grab an address. Clicking the bar copies the address to the system clipboard via `navigator.clipboard.writeText()` and displays an animated teal checkmark confirmation: `"Copied: abusayeemrafi@gmail.com ✓"`.

---

## ⚡ Performance Engineering & Optimization

A visually rich portfolio often risks becoming sluggish. I applied aggressive web performance optimizations to ensure immediate loading and buttery 60 FPS animation:

### 1. Payload & Bandwidth Optimization

| Asset | Before Optimization | After Optimization | Bandwidth Saved |
| :--- | :--- | :--- | :--- |
| **`index.html`** | 332.0 KB *(273 KB inline SVG)* | **61.1 KB** *(SVG symbol + clean DOM)* | **~82% reduction** |
| **15 Game Screenshots** | 58.35 MB *(uncompressed PNG)* | **4.07 MB** *(optimized WebP @ 84%)* | **-93.0% (54.3 MB saved)** |
| **Unsplash Background** | 3.69 MB *(6000px raw photo)* | **413 KB** *(2560px WebP)* | **-89.1% (3.3 MB saved)** |
| **Total Media Weight** | **62.04 MB** | **4.48 MB** | **57.56 MB saved** |

### 2. Multi-Threaded Asynchronous Background Preloader

- **Priority 1**: The active first screenshot (`Genshin Impact`) loads instantly with `fetchpriority="high"` and `decoding="async"`.
- **Parallel Background Pool**: Once the browser reaches `requestIdleCallback`, a background worker downloads the remaining 14 screenshots in concurrent batches of 3 images without freezing the main thread.
- **Hover Microtask**: Hovering over "Next", "Prev", or any game chip immediately pre-warms the target image into browser memory, delivering **0 ms switching latency**.

### 3. CPU & GPU Frame-Rate Guards

- **IntersectionObserver**: Both the Matrix Rain canvas and the 4 mechanical side gears are wrapped in `IntersectionObserver` instances. If an element is off-screen, its `requestAnimationFrame` loop pauses completely (`cancelAnimationFrame`), consuming **0% idle CPU and battery**.
- **Font String Caching**: Caches `ctx.font` to avoid re-parsing font strings across 90+ particles 60 times per second (preventing ~13,000 font layout checks per second).
- **Reduced Particle Footprint**: Tuned particle counts and trail lengths, cutting `ctx.fillText` draw calls by over 80% with identical visual density.

---

## 📂 File Structure

```text
ASR-jadespear.github.io/
├── index.html                  # Semantic, accessible single-page layout (~61 KB)
├── README.md                   # Comprehensive documentation, architecture & design log
├── css/
│   └── style.css               # Unified styling, CSS variables, glassmorphism, responsive queries
├── js/
│   └── script.js               # Matrix rain, audio synth, mandala canvas, terminal, slider & gears
└── assets/
    ├── images/
    │   ├── profile-avatar.jpg  # Profile portrait photo
    │   ├── mandala-art.jpg     # Original sacred mandala artwork
    │   ├── unsplash-bg.webp    # Web-optimized 2560px atmospheric background
    │   └── single-gear.svg     # Standalone precision mechanical gear asset
    └── game screenshots/       # 15 high-fidelity in-game captures in WebP format
        ├── Genshin Impact Screenshot ... .webp
        ├── God of War Ragnarok ScreenShot ... .webp
        ├── Resident Evil Requiem Screenshot ... .webp
        └── ... (12 other WebP captures)
```

Right-click `index.html` inside VS Code and select **"Open with Live Server"**.

---

## 📬 Connect with Me

- **Email**: [abusayeemrafi@gmail.com](mailto:abusayeemrafi@gmail.com)
- **GitHub**: [@ASR-jadespear](https://github.com/ASR-jadespear)
- **LinkedIn**: [Abu Sayeem Rafi](https://www.linkedin.com/in/abu-sayeem-rafi-28a465393/)
- **Instagram**: [@asr_jadespear](https://instagram.com/asr_jadespear)
- **Facebook**: [Abu Sayeem Rafi](https://facebook.com/abusayeem.rafi.1)

---

*Designed and engineered with passion, precision, and combinatorial logic by Abu Sayeem Rafi.*
