// =========================================================
// ABU SAYEEM RAFI (ASR) - PORTFOLIO JAVASCRIPT ENGINE
// 5-COLOR STORM ATMOSPHERE & REFINED INTERACTION
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    initStormCanvas();
    initNavbar();
    init3DTilt();
    initScreenshotSlider();
    initProjectsFilterAndModal();
    initAudioSynth();
    initMandalaCanvas();
    initVibeTerminal();
    initEmailCopy();
    initFooterYear();
    initScrollGears();
    initTypingSubtitle();
});

/* =========================================================
   1. INTERACTIVE 3D MATRIX CYBER RAIN (STORM TEAL)
   ========================================================= */
function initStormCanvas() {
    const canvas = document.getElementById("matrix-canvas") || document.getElementById("aurora-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const matrixCharacters =
        "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "<>[]{}/\\+=*~_λψφΔΩ#$";

    const particles = [];

    const pointer = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        screenX: -9999,
        screenY: -9999
    };

    window.addEventListener("pointermove", (e) => {
        pointer.screenX = e.clientX;
        pointer.screenY = e.clientY;
        pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener("pointerleave", () => {
        pointer.screenX = -9999;
        pointer.screenY = -9999;
        pointer.targetX = 0;
        pointer.targetY = 0;
    });

    let scrollVelocity = 0;
    let previousScroll = window.scrollY;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        scrollVelocity += (currentScroll - previousScroll) * 0.08;
        previousScroll = currentScroll;
    }, { passive: true });

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        createParticles();
    }

    function createParticles() {
        particles.length = 0;
        // Optimized density: rich atmospheric depth without burning CPU
        const particleCount = Math.min(Math.max(Math.floor((width * height) / 7500), 45), 90);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * (height + 200) - 100,
                depth: 0.25 + Math.random() * 0.75,
                speed: 0.8 + Math.random() * 1.8,
                length: 6 + Math.floor(Math.random() * 6),
                fontSize: 11 + Math.random() * 9,
                opacity: 0.45 + Math.random() * 0.55,
                characterOffset: Math.floor(Math.random() * matrixCharacters.length),
                phase: Math.random() * Math.PI * 2,
                scrambleCounter: 0,
                scrambleInterval: 4 + Math.floor(Math.random() * 8)
            });
        }
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let isTabVisible = !document.hidden;
    let animationId = null;

    function startLoop() {
        if (!animationId && isTabVisible) {
            animationId = requestAnimationFrame(loop);
        }
    }

    function stopLoop() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    // Only pause when the browser tab itself is hidden
    document.addEventListener("visibilitychange", () => {
        isTabVisible = !document.hidden;
        if (isTabVisible) startLoop();
        else stopLoop();
    });

    function updatePhysics() {
        pointer.x += (pointer.targetX - pointer.x) * 0.05;
        pointer.y += (pointer.targetY - pointer.y) * 0.05;
        scrollVelocity *= 0.91;
    }

    // Font string cache to eliminate expensive layout engine font parsing
    let activeFont = "";
    function setCanvasFont(fontStr) {
        if (activeFont !== fontStr) {
            ctx.font = fontStr;
            activeFont = fontStr;
        }
    }

    function loop() {
        if (!isTabVisible) {
            animationId = null;
            return;
        }

        ctx.clearRect(0, 0, width, height);
        updatePhysics();

        const absVelocity = Math.min(Math.abs(scrollVelocity), 8);
        const velocityMultiplier = 1 + absVelocity * 1.3;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // 3D Depth scaling
            const depthScale = 0.45 + p.depth * 1.1;

            // Interactive 3D Parallax shift from pointer
            const parallaxX = pointer.x * p.depth * 50;
            const parallaxY = pointer.y * p.depth * 28;

            // Movement with scroll inertia
            p.y += p.speed * depthScale * velocityMultiplier;

            // Subtle sinusoidal drift
            p.x += Math.sin(p.phase + p.y * 0.0035) * 0.2;

            // Wrap around bottom
            if (p.y > height + 140) {
                p.y = -140;
                p.x = Math.random() * width;
                p.depth = 0.25 + Math.random() * 0.75;
                p.speed = 0.8 + Math.random() * 1.8;
            }

            const drawX = p.x + parallaxX;
            const drawY = p.y + parallaxY;

            // Font size according to 3D perspective
            const fontSize = Math.round(p.fontSize * depthScale);
            setCanvasFont(`${fontSize}px "JetBrains Mono", monospace`);

            // Mutate characters occasionally
            p.scrambleCounter++;
            if (p.scrambleCounter >= p.scrambleInterval) {
                p.scrambleCounter = 0;
                p.characterOffset = (p.characterOffset + 1) % matrixCharacters.length;
            }

            // Interactive mouse proximity interaction
            const distToPointer = Math.hypot(drawX - pointer.screenX, drawY - pointer.screenY);
            const isNearPointer = distToPointer < 140;
            const proximityGlow = isNearPointer ? (1 - distToPointer / 140) * 0.5 : 0;

            // Render trailing glyphs
            for (let trail = 0; trail < p.length; trail++) {
                const trailY = drawY - trail * fontSize * 0.96;
                if (trailY < -60 || trailY > height + 60) continue;

                const trailRatio = trail / p.length;
                const trailAlpha = Math.min(
                    0.85,
                    Math.max(0.1, (p.opacity * (1 - trailRatio * 0.8) * (0.35 + p.depth * 0.65)) + proximityGlow)
                );

                ctx.globalAlpha = trailAlpha;

                const charIndex = (p.characterOffset + trail) % matrixCharacters.length;
                const char = matrixCharacters[charIndex];

                // Vibrant Cyber Teal & Green Spectrum
                if (trail === 0) {
                    ctx.fillStyle = isNearPointer ? "#ffffff" : "#48e5c2";
                } else if (trail < 3) {
                    ctx.fillStyle = "#38ef7d"; // Electric cyber green-teal
                } else if (trail < 7) {
                    ctx.fillStyle = "#5ce1e6"; // Vibrant cyber cyan
                } else {
                    ctx.fillStyle = "#86b9b0"; // Ambient storm teal
                }

                ctx.fillText(char, drawX, trailY);
            }

            // Render Leading "Head" Glyph (Glow & High Brightness)
            if (drawY >= -40 && drawY <= height + 40) {
                const headAlpha = Math.min(0.9, (0.8 + p.depth * 0.2) + proximityGlow);
                ctx.globalAlpha = headAlpha;

                // High-visibility electric white-cyan head character
                ctx.fillStyle = isNearPointer ? "#ffffff" : "#e8fffb";
                setCanvasFont(`bold ${fontSize + 1}px "JetBrains Mono", monospace`);

                const headCharIndex = (p.characterOffset + Math.floor(p.y * 0.05)) % matrixCharacters.length;
                const headChar = matrixCharacters[headCharIndex];

                // Soft neon bloom (only applied when noticeable)
                if (p.depth > 0.6) {
                    ctx.shadowColor = "#38ef7d";
                    ctx.shadowBlur = (4 + p.depth * 3) * depthScale;
                }

                ctx.fillText(headChar, drawX, drawY);
                if (p.depth > 0.6) ctx.shadowBlur = 0;
            }
        }

        ctx.globalAlpha = 1;
        animationId = requestAnimationFrame(loop);
    }

    startLoop();
}

/* =========================================================
   2. CLEAN NAVIGATION & SCROLLSPY
   ========================================================= */
function initNavbar() {
    const mobileBtn = document.getElementById("mobile-menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
        });
    }

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${currentSectionId}`) {
                item.classList.add("active");
            }
        });
    }, { passive: true });
}

/* =========================================================
   3. 3D CARD TILT
   ========================================================= */
function init3DTilt() {
    // Note: Studio (#creative) is strictly excluded so musical, artistic & mechanical controls remain completely stationary
    const cards = document.querySelectorAll("section:not(#creative) .project-card, section:not(#creative) .editorial-card, section:not(#creative) .anime-poster-card, section:not(#creative) .interest-float-box, section:not(#creative) .achievement-card");

    cards.forEach(card => {
        if (card.closest("#creative") || card.classList.contains("creative-card")) return;

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    });

    // Explicitly reset any residual transform on all Studio boxes
    document.querySelectorAll("#creative .creative-card, #creative .gear-studio-card, #creative .gear-transmission-box, #creative .piano-container, #creative .mandala-preview-container").forEach(box => {
        box.style.transform = "none";
    });
}

/* =========================================================
   4. HOBBIES & GAMING SCREENSHOT SLIDER & CHIPS
   ========================================================= */
const screenshotsData = [
    {
        id: "genshin-impact",
        title: "Genshin Impact",
        tag: "Regularly Played",
        screenshot: "assets/game screenshots/Genshin Impact Screenshot 2026.03.11 - 19.17.24.68.webp",
        description: "Open-world elemental exploration and combat mechanics across Teyvat."
    },
    {
        id: "god-of-war",
        title: "God of War",
        tag: "Action-Adventure",
        screenshot: "assets/game screenshots/God of War Ragnarok ScreenShot-2025-6-2_22-9-58.webp",
        description: "Epic Norse mythological combat and visceral narrative journey."
    },
    {
        id: "resident-evil",
        title: "Resident Evil",
        tag: "Survival Horror",
        screenshot: "assets/game screenshots/Resident Evil Requiem Screenshot 2026.05.19 - 16.17.54.17.webp",
        description: "Gothic survival horror tension, resource scarcity, and chilling atmosphere."
    },
    {
        id: "stellar-blade",
        title: "Stellar Blade",
        tag: "Fast-Paced Action",
        screenshot: "assets/game screenshots/Stellar Blade Screenshot 2025.07.27 - 02.29.30.89.webp",
        description: "High-speed parry combat across overgrown post-apocalyptic Earth ruins."
    },
    {
        id: "control",
        title: "Control",
        tag: "Supernatural Action",
        screenshot: "assets/game screenshots/Control Screenshot 2025.04.27 - 00.47.35.39.webp",
        description: "Telekinetic abilities and brutalist architectural mystery in the Oldest House."
    },
    {
        id: "silent-hill",
        title: "Silent Hill f",
        tag: "Psychological Horror",
        screenshot: "assets/game screenshots/SILENT HILL f Screenshot 2025.10.06 - 16.11.32.65.webp",
        description: "Eerie psychological horror set in 1960s Japan with beautiful yet terrifying floral rot."
    },
    {
        id: "the-last-of-us",
        title: "The Last of Us Part I",
        tag: "Post-Pandemic Narrative",
        screenshot: "assets/game screenshots/The Last of Us Part I Screenshot 2026.01.21 - 16.46.40.96.webp",
        description: "Joel and Ellie's visceral journey across reclaimed American landscapes."
    },
    {
        id: "a-plague-tale",
        title: "A Plague Tale: Requiem",
        tag: "Narrative Adventure",
        screenshot: "assets/game screenshots/A Plague Tale  Requiem Screenshot 2025.03.08 - 22.26.19.10.webp",
        description: "Amicia and Hugo's emotional journey through atmospheric medieval France."
    },
    {
        id: "pragmata",
        title: "Pragmata",
        tag: "Sci-Fi Adventure",
        screenshot: "assets/game screenshots/Pragmata Screenshot 2026.05.02 - 21.19.33.32.webp",
        description: "Lunar dystopian sci-fi mystery with futuristic gravity and cybernetics."
    },
    {
        id: "black-myth-wukong",
        title: "Black Myth: Wukong",
        tag: "Action RPG",
        screenshot: "assets/game screenshots/Black Myth  Wukong Screenshot 2026.06.24 - 02.19.29.45.webp",
        description: "Fluid staff martial arts combat rooted in classic Chinese mythology."
    },
    {
        id: "hellblade",
        title: "Hellblade: Senua's Sacrifice",
        tag: "Psychological Dark Fantasy",
        screenshot: "assets/game screenshots/Hellblade  Senua's Sacrifice Screenshot 2025.04.24 - 18.09.24.02.webp",
        description: "Senua's deeply atmospheric descent into Norse myth with binaural audio."
    },
    {
        id: "metal-gear-solid",
        title: "Metal Gear Solid Delta: Snake Eater",
        tag: "Tactical Espionage Action",
        screenshot: "assets/game screenshots/Metal Gear Solid Delta  Snake Eater Screenshot 2026.05.03 - 22.36.51.84.webp",
        description: "Naked Snake's survival stealth mission through dense Cold War Soviet jungle environments."
    },
    {
        id: "tomb-raider",
        title: "Rise of the Tomb Raider",
        tag: "Action-Adventure Survival",
        screenshot: "assets/game screenshots/Rise of the Tomb Raider Screenshot 2025.06.11 - 01.07.52.70.webp",
        description: "Lara Croft's expedition through harsh Siberian wilderness uncovering Kitezh's lost immortality myth."
    },
    {
        id: "dead-space",
        title: "Dead Space",
        tag: "Sci-Fi Survival Horror",
        screenshot: "assets/game screenshots/Dead Space Screenshot 2025.08.19 - 18.38.08.07.webp",
        description: "Atmospheric sci-fi survival horror on the USG Ishimura featuring strategic dismemberment."
    },
    {
        id: "cronos",
        title: "Cronos: The New Dawn",
        tag: "Survival Horror",
        screenshot: "assets/game screenshots/Cronos  The New Dawn Screenshot 2026.02.09 - 15.46.16.49.webp",
        description: "Retro-futuristic survival horror navigating temporal anomalies."
    }
];

let currentSlideIndex = 0;

function initScreenshotSlider() {
    const sliderImg = document.getElementById("slider-img");
    const sliderCounter = document.getElementById("slider-counter");
    const sliderTag = document.getElementById("slider-tag");
    const sliderTitle = document.getElementById("slider-title");
    const sliderDesc = document.getElementById("slider-desc");
    const prevBtn = document.getElementById("slider-prev-btn");
    const nextBtn = document.getElementById("slider-next-btn");
    const inspectBtn = document.getElementById("slider-inspect-btn");
    const dotsContainer = document.getElementById("slider-dots");
    const gameChips = document.querySelectorAll(".game-chip");

    const lightbox = document.getElementById("screenshot-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxMeta = document.getElementById("lightbox-meta");
    const lightboxClose = document.getElementById("lightbox-close-btn");

    if (!sliderImg || !prevBtn || !nextBtn) return;

    // Generate dots
    if (dotsContainer) {
        dotsContainer.innerHTML = "";
        screenshotsData.forEach((_, idx) => {
            const dot = document.createElement("div");
            dot.className = `sdot ${idx === 0 ? "active" : ""}`;
            dot.setAttribute("aria-label", `Slide ${idx + 1}`);
            dot.addEventListener("click", () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        if (index < 0) index = screenshotsData.length - 1;
        if (index >= screenshotsData.length) index = 0;
        currentSlideIndex = index;

        const data = screenshotsData[currentSlideIndex];
        const safeUrl = encodeURI(data.screenshot);

        sliderImg.style.opacity = "0.2";
        setTimeout(() => {
            sliderImg.src = safeUrl;
            sliderImg.alt = `${data.title} Screenshot`;
            sliderImg.style.opacity = "1";
        }, 80);

        sliderImg.onerror = function () {
            if (this.src !== data.screenshot) {
                this.src = data.screenshot;
            }
        };

        if (sliderCounter) {
            sliderCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(screenshotsData.length).padStart(2, '0')}`;
        }
        if (sliderTag) sliderTag.textContent = data.tag;
        if (sliderTitle) sliderTitle.textContent = data.title;
        if (sliderDesc) sliderDesc.textContent = data.description;

        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll(".sdot");
            dots.forEach((dot, dIdx) => {
                if (dIdx === index) dot.classList.add("active");
                else dot.classList.remove("active");
            });
        }

        // Highlight matching played game chip
        gameChips.forEach(chip => {
            const target = chip.getAttribute("data-game-target");
            const chipText = chip.textContent.trim().toLowerCase();
            if ((target && target === data.id) || chipText.includes(data.id) || data.title.toLowerCase().includes(chipText)) {
                chip.classList.add("active");
            } else {
                chip.classList.remove("active");
            }
        });
    }

    // Connect game chips to slider
    gameChips.forEach(chip => {
        chip.addEventListener("click", () => {
            const targetId = chip.getAttribute("data-game-target");
            const chipText = chip.textContent.trim().toLowerCase();
            let targetIdx = -1;

            if (targetId) {
                targetIdx = screenshotsData.findIndex(s => s.id === targetId);
            }
            if (targetIdx === -1) {
                targetIdx = screenshotsData.findIndex(s =>
                    s.title.toLowerCase().includes(chipText) ||
                    chipText.includes(s.title.toLowerCase()) ||
                    (chipText.includes("tomb") && s.id.includes("tomb")) ||
                    (chipText.includes("metal") && s.id.includes("metal")) ||
                    (chipText.includes("silent") && s.id.includes("silent"))
                );
            }

            if (targetIdx !== -1) {
                goToSlide(targetIdx);
            }
        });
    });

    prevBtn.addEventListener("click", () => goToSlide(currentSlideIndex - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentSlideIndex + 1));

    // Initialize first slide display
    goToSlide(0);

    // Keyboard navigation when user is over slider
    const sliderContainer = document.querySelector(".slider-container");
    if (sliderContainer) {
        sliderContainer.setAttribute("tabindex", "0");
        sliderContainer.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") goToSlide(currentSlideIndex - 1);
            if (e.key === "ArrowRight") goToSlide(currentSlideIndex + 1);
        });
    }

    // Inspect button opens Lightbox modal
    if (inspectBtn && lightbox) {
        inspectBtn.addEventListener("click", () => {
            const data = screenshotsData[currentSlideIndex];
            lightboxImg.src = encodeURI(data.screenshot);
            lightboxImg.alt = `${data.title} Full-Resolution Capture`;
            lightboxTitle.textContent = data.title;
            lightboxMeta.textContent = data.tag;
            lightbox.showModal();
        });
    }

    if (lightboxClose && lightbox) {
        lightboxClose.addEventListener("click", () => lightbox.close());
        lightbox.addEventListener("click", (e) => {
            const rect = lightbox.getBoundingClientRect();
            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                lightbox.close();
            }
        });
    }

    // Parallel Multi-Threaded Background Preloader (Preheats browser cache for instant transitions)
    function preloadAllScreenshots() {
        const remainingIndices = [];
        for (let i = 1; i < screenshotsData.length; i++) {
            remainingIndices.push(i);
        }

        // Parallel batch loader: downloads images concurrently without blocking main thread
        function loadBatch(items, batchSize = 3) {
            if (items.length === 0) return;
            const currentBatch = items.splice(0, batchSize);
            Promise.all(currentBatch.map(idx => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = encodeURI(screenshotsData[idx].screenshot);
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            })).then(() => {
                if ("requestIdleCallback" in window) {
                    window.requestIdleCallback(() => loadBatch(items, batchSize));
                } else {
                    setTimeout(() => loadBatch(items, batchSize), 60);
                }
            });
        }

        if ("requestIdleCallback" in window) {
            window.requestIdleCallback(() => loadBatch(remainingIndices), { timeout: 1200 });
        } else {
            setTimeout(() => loadBatch(remainingIndices), 500);
        }
    }

    preloadAllScreenshots();

    // Instant prefetch on hover/focus of navigation controls & chips
    function prefetchScreenshot(idx) {
        if (idx >= 0 && idx < screenshotsData.length) {
            const pre = new Image();
            pre.src = encodeURI(screenshotsData[idx].screenshot);
        }
    }

    prevBtn.addEventListener("mouseenter", () => {
        prefetchScreenshot((currentSlideIndex - 1 + screenshotsData.length) % screenshotsData.length);
    });
    nextBtn.addEventListener("mouseenter", () => {
        prefetchScreenshot((currentSlideIndex + 1) % screenshotsData.length);
    });
    gameChips.forEach(chip => {
        chip.addEventListener("mouseenter", () => {
            const targetId = chip.getAttribute("data-game-target");
            const chipText = chip.textContent.trim().toLowerCase();
            const targetIdx = screenshotsData.findIndex(s =>
                (targetId && s.id === targetId) ||
                s.title.toLowerCase().includes(chipText) ||
                chipText.includes(s.title.toLowerCase())
            );
            if (targetIdx !== -1) prefetchScreenshot(targetIdx);
        });
    });
}

/* =========================================================
   5. PROJECTS FILTER & MODAL
   ========================================================= */
const projectData = {
    "react-o-ball": {
        title: "React-O-Ball",
        category: "Game Development • Arcade Physics",
        image: "assets/projects/react-o-ball.jpg",
        status: "Completed",
        description: "A fast-paced arcade game combining classic brick-and-ball mechanics with pinball flippers and elemental chemistry reaction systems. Players strategically combine elements like Fire, Water, Ice, and Electricity to trigger chain reactions, break complex obstacles, and achieve high multiplier combos.",
        tags: ["Game Dev", "C# / Unity", "Physics Engine", "Elemental Reactions", "Arcade Mechanics"],
        github: "https://github.com/ASR-jadespear/React-O-Ball"
    },
    "acadence": {
        title: "Acadence",
        category: "Academic Software • Full-Stack",
        image: "assets/projects/acadence.jpg",
        status: "Completed",
        description: "An intuitive student-teacher friendly academic platform inspired by Google Classroom and modern Student Information Systems. Provides structured study modules, real-time assignment submissions, grade tracking, automated timetable schedules, and seamless student-teacher communication channels.",
        tags: ["Software Engineering", "Full-Stack", "UI/UX Design", "Academic Workflow", "Database Systems"],
        github: "https://github.com/ASR-jadespear/CSE-4302-Project"
    },
    "restoration": {
        title: "Restoration",
        category: "Educational Game • Isometric Adventure",
        image: "assets/projects/restoration.jpg",
        status: "Completed",
        description: "An isometric educational game designed to teach children environmental awareness and ecological stewardship through interactive quizzes, river restoration tasks, renewable energy mini-games, and a cooperative gameplay experience. Features charming 3D stylized art, rewarding progression loops, and gamified learning.",
        tags: ["Isometric Game", "Gamification", "Eco-Awareness", "Co-op Gameplay", "Educational Tech"],
        github: "https://github.com/mahfuzkamalsohan/visual-programming-lab-project"
    },
    "nightmare-game": {
        title: "2.5D Atmospheric Horror Game",
        category: "Game Development • In Progress",
        image: "assets/projects/nightmare-game.jpg",
        status: "Coming Soon",
        description: "A 2.5D narrative psychological horror game currently in active development. Heavily inspired by the atmospheric tension of Little Nightmares and the suspenseful exploration of Resident Evil. Incorporates dynamic real-time volumetric shadows, flashlight mechanics, environmental puzzle solving, and subtle acoustic storytelling.",
        tags: ["2.5D", "Atmospheric Horror", "Dynamic Lighting", "Unreal / Unity", "Story-driven"],
        github: "https://github.com/ASR-jadespear"
    },
    "fsm-cache-simulator": {
        title: "FSM Cache Controller Simulator",
        category: "Computer Architecture • C++ Systems",
        image: "assets/projects/fsm-cache.jpg",
        status: "Completed",
        description: "A high-performance C++ simulator modeling a Finite State Machine (FSM) cache controller. Simulates multi-level CPU cache hierarchies, cache hit/miss resolution protocols, write-through/write-back policies, tag directory lookups, and latency metrics across varied memory access workloads.",
        tags: ["C++", "Computer Architecture", "FSM", "Cache Simulation", "Systems Programming"],
        github: "https://github.com/ASR-jadespear/FSM-Cache-Controller-Simulator"
    },
    "sdg4-research": {
        title: "Learner-Centered Classroom Practices (SDG 4)",
        category: "Academic Research • Under Moderation",
        image: "assets/projects/sdg4-research.jpg",
        status: "Under Moderation",
        description: "Research Paper: \"Learner-centered Classroom Practices, Collaborative Engagement, and Perceived Learning Outcomes in Bangladeshi Universities: Evidence from Mann–Whitney U Test Analysis for SDG 4\".\n\nThis empirical research paper investigates the quantifiable impact of active, student-centric teaching methodologies versus traditional lecture environments across tertiary universities in Bangladesh. Utilizing non-parametric Mann–Whitney U statistical hypothesis testing, the study demonstrates statistically significant enhancements in collaborative engagement, critical thinking efficacy, and self-perceived academic performance in direct alignment with United Nations Sustainable Development Goal 4 (Quality Education).",
        tags: ["Research Paper", "Under Moderation", "Mann–Whitney U Test", "SDG 4", "Statistical Analysis", "Higher Education"],
        github: ""
    }
};

function initProjectsFilterAndModal() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const modal = document.getElementById("project-modal");
    const modalClose = document.getElementById("modal-close-btn");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    projectCards.forEach(card => {
        card.addEventListener("click", (e) => {
            if (e.target.closest(".btn-github")) return;

            const projKey = card.getAttribute("data-project-key");
            const data = projectData[projKey];
            if (!data) return;

            document.getElementById("modal-img").src = data.image;
            document.getElementById("modal-category").textContent = data.category;
            document.getElementById("modal-title").textContent = data.title;
            document.getElementById("modal-desc").textContent = data.description;

            const githubBtn = document.getElementById("modal-github-link");
            if (githubBtn) {
                if (data.github) {
                    githubBtn.href = data.github;
                    githubBtn.style.display = "inline-flex";
                    githubBtn.textContent = "View on GitHub ↗";
                } else {
                    githubBtn.style.display = "none";
                }
            }

            const tagsContainer = document.getElementById("modal-tags");
            tagsContainer.innerHTML = data.tags.map(t => `<span class="tag-pill">${t}</span>`).join("");

            if (modal) modal.showModal();
        });
    });

    if (modalClose && modal) {
        modalClose.addEventListener("click", () => modal.close());
        modal.addEventListener("click", (e) => {
            const rect = modal.getBoundingClientRect();
            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                modal.close();
            }
        });
    }
}

/* =========================================================
   6. WEB AUDIO API SYNTH (PIANO & HARMONIUM)
   ========================================================= */
let audioCtx = null;
let currentSynthMode = "piano";

const noteFrequencies = {
    "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13,
    "E4": 329.63, "F4": 349.23, "F#4": 369.99, "G4": 392.00,
    "G#4": 415.30, "A4": 440.00, "A#4": 466.16, "B4": 493.88, "C5": 523.25
};

const keyMapping = {
    "a": "C4", "w": "C#4", "s": "D4", "e": "D#4", "d": "E4",
    "f": "F4", "t": "F#4", "g": "G4", "y": "G#4", "h": "A4",
    "u": "A#4", "j": "B4", "k": "C5"
};

function initAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) {
            return false; // Web Audio API unsupported in this browser
        }
        try {
            audioCtx = new AudioContextClass();
        } catch (err) {
            return false;
        }
    }
    if (audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => { });
    }
    return true;
}

function playNoteTone(note) {
    if (!initAudioContext()) return;
    const freq = noteFrequencies[note];
    if (!freq) return;

    const noteDisplay = document.getElementById("active-note-display");
    if (noteDisplay) {
        noteDisplay.textContent = `Tone: ${note} (${Math.round(freq)} Hz)`;
    }

    const now = audioCtx.currentTime;

    if (currentSynthMode === "piano") {
        const osc = audioCtx.createOscillator();
        const oscHarmonic = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        oscHarmonic.type = "sine";
        oscHarmonic.frequency.setValueAtTime(freq * 2, now);

        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.linearRampToValueAtTime(0.38, now + 0.015);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gainNode);
        oscHarmonic.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start(now);
        oscHarmonic.start(now);
        osc.stop(now + 1.25);
        oscHarmonic.stop(now + 1.25);
    } else {
        const osc = audioCtx.createOscillator();
        const subOsc = audioCtx.createOscillator();
        const filter = audioCtx.createBiquadFilter();
        const gainNode = audioCtx.createGain();

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1200, now);

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now);

        subOsc.type = "triangle";
        subOsc.frequency.setValueAtTime(freq * 0.5, now);

        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.linearRampToValueAtTime(0.24, now + 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(filter);
        subOsc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start(now);
        subOsc.start(now);
        osc.stop(now + 1.85);
        subOsc.stop(now + 1.85);
    }
}

function initAudioSynth() {
    const keys = document.querySelectorAll(".piano-key");
    const modeBtns = document.querySelectorAll(".mode-btn");

    modeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            modeBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentSynthMode = btn.getAttribute("data-mode");
        });
    });

    keys.forEach(key => {
        const note = key.getAttribute("data-note");

        key.addEventListener("pointerdown", () => {
            key.classList.add("active");
            playNoteTone(note);
        });

        key.addEventListener("pointerup", () => key.classList.remove("active"));
        key.addEventListener("pointerleave", () => key.classList.remove("active"));
    });

    window.addEventListener("keydown", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
        const key = e.key.toLowerCase();
        if (keyMapping[key]) {
            const note = keyMapping[key];
            const keyEl = document.querySelector(`.piano-key[data-note="${note}"]`);
            if (keyEl && !keyEl.classList.contains("active")) {
                keyEl.classList.add("active");
                playNoteTone(note);
            }
        }
    });

    window.addEventListener("keyup", (e) => {
        const key = e.key.toLowerCase();
        if (keyMapping[key]) {
            const note = keyMapping[key];
            const keyEl = document.querySelector(`.piano-key[data-note="${note}"]`);
            if (keyEl) keyEl.classList.remove("active");
        }
    });
}

/* =========================================================
   7. MANDALA STUDIO
   ========================================================= */
function initMandalaCanvas() {
    const canvas = document.getElementById("mandala-canvas");
    const overlayImg = document.getElementById("mandala-overlay");
    const clearBtn = document.getElementById("mandala-clear-btn");
    const animateBtn = document.getElementById("mandala-animate-btn");
    const toggleImgBtn = document.getElementById("mandala-toggle-img-btn");

    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const size = canvas.parentElement.clientWidth || 400;
    canvas.width = size;
    canvas.height = size;

    const center = { x: size / 2, y: size / 2 };
    const petals = 12;

    let isDrawing = false;
    let lastX = 0, lastY = 0;
    let isAutoAnimating = false;
    let autoAnimId = null;

    function drawSegment(x1, y1, x2, y2, strokeColor) {
        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.shadowBlur = 6;
        ctx.shadowColor = strokeColor;

        const angleStep = (Math.PI * 2) / petals;

        for (let i = 0; i < petals; i++) {
            ctx.rotate(angleStep);

            ctx.beginPath();
            ctx.moveTo(x1 - center.x, y1 - center.y);
            ctx.lineTo(x2 - center.x, y2 - center.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-(x1 - center.x), y1 - center.y);
            ctx.lineTo(-(x2 - center.x), y2 - center.y);
            ctx.stroke();
        }

        ctx.restore();
    }

    function getCanvasCoords(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * (canvas.width / rect.width),
            y: (e.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    canvas.addEventListener("pointerdown", (e) => {
        if (overlayImg) overlayImg.classList.add("hidden");
        if (isAutoAnimating) stopAutoAnimate();

        isDrawing = true;
        const coords = getCanvasCoords(e);
        lastX = coords.x;
        lastY = coords.y;
    });

    canvas.addEventListener("pointermove", (e) => {
        if (!isDrawing) return;
        const coords = getCanvasCoords(e);
        const color = "#86B9B0";

        drawSegment(lastX, lastY, coords.x, coords.y, color);
        lastX = coords.x;
        lastY = coords.y;
    });

    window.addEventListener("pointerup", () => isDrawing = false);

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            stopAutoAnimate();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }

    if (toggleImgBtn && overlayImg) {
        toggleImgBtn.addEventListener("click", () => {
            stopAutoAnimate();
            overlayImg.classList.toggle("hidden");
        });
    }

    function startAutoAnimate() {
        if (overlayImg) overlayImg.classList.add("hidden");
        isAutoAnimating = true;
        if (animateBtn) animateBtn.textContent = "Stop Geometry";
        let t = 0;

        function animLoop() {
            if (!isAutoAnimating) return;
            t += 0.035;
            const r = (size * 0.35) * Math.sin(t * 1.5);
            const x = center.x + r * Math.cos(t);
            const y = center.y + r * Math.sin(t);

            const color = t % 2 < 1 ? "#86B9B0" : "#D1D5D6";

            drawSegment(center.x, center.y, x, y, color);
            autoAnimId = requestAnimationFrame(animLoop);
        }
        animLoop();
    }

    function stopAutoAnimate() {
        isAutoAnimating = false;
        if (animateBtn) animateBtn.textContent = "Auto Animate";
        cancelAnimationFrame(autoAnimId);
    }

    if (animateBtn) {
        animateBtn.addEventListener("click", () => {
            if (isAutoAnimating) stopAutoAnimate();
            else startAutoAnimate();
        });
    }
}

/* =========================================================
   8. VIBE CODING TERMINAL
   ========================================================= */
function initVibeTerminal() {
    const termInput = document.getElementById("terminal-cmd-input");
    const termBody = document.getElementById("terminal-body-content");
    const chips = document.querySelectorAll(".tchip");

    if (!termInput || !termBody) return;

    const commands = {
        help: () => `Available commands:
  - <span style="color:#86B9B0">about</span>        : Bio & engineering trajectory
  - <span style="color:#86B9B0">projects</span>     : Featured games & software
  - <span style="color:#86B9B0">hobbies</span>      : Games played & creative passions
  - <span style="color:#86B9B0">skills</span>       : Tech stack & creative tools
  - <span style="color:#86B9B0">music</span>        : Synthesize a storm chord sequence
  - <span style="color:#86B9B0">achievements</span> : Mathematical Olympiad honors
  - <span style="color:#86B9B0">contact</span>      : Direct contact channels
  - <span style="color:#86B9B0">clear</span>        : Clear console buffer`,

        about: () => `Abu Sayeem Rafi (ASR)
Undergraduate, Computer Science & Engineering @ Islamic University of Technology (IUT).
Alumnus: Rajshahi Cadet College. Origin: Rajshahi, Bangladesh.
Interests: Game Mechanics, Atmospheric Systems, Sacred Geometry Mandalas, Pinball Physics.`,

        projects: () => `Featured Works:
1. [React-O-Ball]   - Pinball + Brick-Breaker + Elemental Chemistry Reactions
2. [Acadence]       - Academic All-Rounder Management Architecture
3. [Restoration]    - Isometric Environmental Eco-Adventure Game
4. [2.5D Horror]    - Atmospheric Victorian Suspense Game (Coming Soon)`,

        hobbies: () => `Games Played:
• Resident Evil
• God of War
• Stellar Blade
• Control
• Silent Hill
• The Last of Us
• A Plague Tale
• Pragmata
• Black Myth Wukong
• Hellblade
• Metal gear solid
• Tomb Rider
• Dead Space`,

        skills: () => `Core Toolset:
• Languages    : C++, C#, Python, JavaScript, Java, SQL, HTML5/CSS3
• Game Engines : Unity, Unreal Concepts, 2.5D Physics Systems
• Creative     : Mandala Sacred Geometry, Audio Synthesizers, Image Grading`,

        achievements: () => `Competitive Honors:
★ 2019: Bangladesh Mathematical Olympiad (National Level) - 2nd Runner-up
★ 2020: International Youth Math Challenge - Silver Honour (Top 7% Globally)`,

        contact: () => `Connect:
• Email     : abusayeemrafi@gmail.com
• GitHub    : https://github.com/ASR-jadespear
• LinkedIn  : https://www.linkedin.com/in/abu-sayeem-rafi-28a465393/
• Instagram : https://instagram.com/asr_jadespear
• Facebook  : https://facebook.com/abusayeem.rafi.1`,

        music: () => {
            const notes = ["C4", "E4", "G4", "B4", "C5"];
            notes.forEach((note, idx) => {
                setTimeout(() => playNoteTone(note), idx * 170);
            });
            return "♫ Playing synthesized chord progression...";
        },

        clear: () => ""
    };

    function executeCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase();

        const userLine = document.createElement("div");
        userLine.className = "terminal-output";
        userLine.innerHTML = `<span style="color:#86B9B0">asr@iut:~$</span> ${escapeHTML(cmd)}`;
        termBody.appendChild(userLine);

        if (cleanCmd === "clear") {
            termBody.innerHTML = "";
            return;
        }

        const respLine = document.createElement("div");
        respLine.className = "terminal-output";

        const isRealCommand = Object.prototype.hasOwnProperty.call(commands, cleanCmd)
            && typeof commands[cleanCmd] === "function";

        if (isRealCommand) {
            let output;
            try {
                output = commands[cleanCmd]();
            } catch (err) {
                output = "Something went wrong running that command.";
            }
            respLine.innerHTML = String(output).replace(/\n/g, "<br>");
        } else if (cleanCmd === "") {
            // Do nothing
        } else {
            respLine.innerHTML = `Command not recognized: '<span style="color:#D1D5D6">${escapeHTML(cmd)}</span>'. Type <span style="color:#86B9B0">'help'</span> for list of commands.`;
        }

        termBody.appendChild(respLine);
        termBody.scrollTop = termBody.scrollHeight;
    }

    termInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const cmd = termInput.value;
            termInput.value = "";
            executeCommand(cmd);
        }
    });

    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            const cmd = chip.getAttribute("data-cmd");
            executeCommand(cmd);
        });
    });
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

/* =========================================================
   9. EMAIL CLIPBOARD
   ========================================================= */
function initEmailCopy() {
    const copyBar = document.getElementById("copy-email-bar");
    if (!copyBar) return;

    copyBar.addEventListener("click", () => {
        const email = "abusayeemrafi@gmail.com";

        if (!navigator.clipboard || !navigator.clipboard.writeText) {
            window.location.href = `mailto:${email}`;
            return;
        }

        navigator.clipboard.writeText(email).then(() => {
            const originalText = copyBar.innerHTML;
            copyBar.innerHTML = `<span>Copied: ${email}</span> <span style="color:var(--storm-teal)">✓</span>`;
            setTimeout(() => {
                copyBar.innerHTML = originalText;
            }, 2500);
        }).catch(() => {
            window.location.href = `mailto:${email}`;
        });
    });
}

/* =========================================================
   10. FOOTER YEAR
   ========================================================= */
function initFooterYear() {
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/* =========================================================
   11. SCROLL-SYNCED MECHANICAL GEARS (LEFT & RIGHT EDGES)
   ========================================================= */
function initScrollGears() {
    const gearNodes = document.querySelectorAll(".side-scroll-gear");
    if (!gearNodes || gearNodes.length === 0) return;

    const gears = Array.from(gearNodes).map(el => {
        const dir = parseFloat(el.getAttribute("data-dir")) || 1;
        const initialRotation = window.scrollY * 0.25 * dir;
        el.style.transform = `translateY(-50%) rotate(${initialRotation}deg)`;
        return {
            element: el,
            dir: dir,
            currentRotation: initialRotation,
            targetRotation: initialRotation,
            isVisible: false
        };
    });

    let animationId = null;
    let anyVisible = false;

    function render() {
        if (!anyVisible) {
            animationId = null;
            return;
        }

        gears.forEach(g => {
            if (g.isVisible) {
                // Smooth continuous rotation lerp synced with page scroll
                g.currentRotation += (g.targetRotation - g.currentRotation) * 0.08;
                g.element.style.transform = `translateY(-50%) rotate(${g.currentRotation}deg)`;
            }
        });

        animationId = requestAnimationFrame(render);
    }

    function startLoop() {
        if (!animationId && anyVisible) {
            animationId = requestAnimationFrame(render);
        }
    }

    function stopLoop() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    // IntersectionObserver watches parent section of each gear to pause offscreen
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const section = entry.target;
                const gear = gears.find(g => section.contains(g.element));
                if (gear) {
                    gear.isVisible = entry.isIntersecting;
                    if (gear.isVisible) {
                        const target = window.scrollY * 0.25 * gear.dir;
                        gear.targetRotation = target;
                        gear.currentRotation = target;
                        gear.element.style.transform = `translateY(-50%) rotate(${target}deg)`;
                    }
                }
            });

            anyVisible = gears.some(g => g.isVisible);
            if (anyVisible) {
                startLoop();
            } else {
                stopLoop();
            }
        }, {
            rootMargin: "250px 0px"
        });

        gears.forEach(g => {
            const parentSection = g.element.closest("section");
            if (parentSection) {
                observer.observe(parentSection);
            } else {
                g.isVisible = true;
            }
        });
    } else {
        gears.forEach(g => g.isVisible = true);
        anyVisible = true;
        startLoop();
    }

    // Scroll listener updates target rotation smoothly for all active gears
    window.addEventListener("scroll", () => {
        const currentY = window.scrollY;
        gears.forEach(g => {
            g.targetRotation = currentY * 0.25 * g.dir;
        });

        if (anyVisible && !animationId) {
            startLoop();
        }
    }, { passive: true });
}

/* =========================================================
   TYPING SUBTITLE ANIMATION (BOLD & GLOWING)
   ========================================================= */
function initTypingSubtitle() {
    const subtitleEl = document.querySelector(".Typing-subtitle, .typing-subtitle");
    if (!subtitleEl) return;

    let textEl = subtitleEl.querySelector(".typing-text");
    if (!textEl) {
        subtitleEl.innerHTML = `<span class="typing-text"></span><span class="typing-cursor" aria-hidden="true">_</span>`;
        textEl = subtitleEl.querySelector(".typing-text");
    }

    const phrases = [
        "Struggling is a Constant",
        "Efforts matters...",
        "Quitters can't be Achievers"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeStep() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
            textEl.textContent = currentPhrase.substring(0, charIndex);
            typingSpeed = 40;
        } else {
            charIndex++;
            textEl.textContent = currentPhrase.substring(0, charIndex);
            typingSpeed = 80 + Math.random() * 35;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 4200; // Hold for 4.2 seconds
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(typeStep, typingSpeed);
    }

    textEl.textContent = "";
    setTimeout(typeStep, 400);
}