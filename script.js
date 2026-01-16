document.addEventListener("DOMContentLoaded", () => {
  /*
   * PROJECT NAME CONFIGURATION:
   * To add or rename projects, update the project names in TWO places:
   * 
   * 1. HTML (index.html): Change the text inside <div class="circle-item">PROJECT NAME</div>
   * 2. JavaScript (below): Update the matching keys in these configuration objects:
   *    - projectDescriptions
   *    - projectImages
   *    - projectDetailImages
   *    - innerCirclesConfig
   * 
   * IMPORTANT: The project names must match EXACTLY (case-sensitive) across all locations.
   * The system automatically connects them by matching the text.
   */
  
  // Prevent any default navigation behavior
  window.addEventListener('beforeunload', (e) => {
    if (isDetailViewActive) {
      e.preventDefault();
      return;
    }
  });
  
  // Set initial state to prevent reload issues
  if (!window.history.state) {
    window.history.replaceState({ view: 'circles' }, '', window.location.pathname);
  }
  
  // Clear any hash on initial page load
  if (window.location.hash) {
    window.history.replaceState({ view: 'circles' }, '', window.location.pathname);
  }

  const ROOT = document.querySelector(".circles");
  if (!ROOT) return;

  const circleEls = Array.from(ROOT.querySelectorAll(".circle"));

  // default start angle for the circle (radians)
  const DEFAULT_START_ANGLE = 0;
  // rotation speed in seconds (change this to adjust animation speed: 5, 6, 7, 8, 9, or 10)
  const ROTATION_SPEED_SECONDS = 6;
  // distance between text and arrow (as fraction of viewport height: 0.03 = 3vh)
  const ARROW_TEXT_GAP = 0.04;

  // Project descriptions - customize these texts for each project
  const projectDescriptions = {
    "FASHION SHOW 2025": "VISUAL IDENTITY PROPOSAL FOR THE SHOW OF FASHION DESIGN CLASS OF THE UNIVERSITY OF APPLIED ARTS VIENNA",
    "TRUTH": "BRANDING FOR ‘DESIGN AND NARRATIVE MEDIA’S 2025 EXHIBITION\n‘TRUTH: THE LIES WE LIVE BY’",
    "VINYLS FOR BEXXX": "VINYL COVERS FOR SINGER AND SONGWRITER BEXXX",
    "PROCESS JOURNAL": "BOOK DOCUMENTING THE DEVELOPMENT OF THE COLLABORATIVE EXHIBITION PROJECT “COMMON SOIL”",
    "AXIS FESTIVAL": "VISUAL IDENTITY FOR A FICTIONAL FESTIVAL FOR CONTEMPORARY MUSIC AND DANCE",
    "DISPUTED TERRITORIES": "INTERACTIVE INCOMPLETE MAP OF THE WORLD’S DISPUTED TERRITORIES",
    "FUN STUFF": "TOO SMALL FOR A SPOT IN THE CIRCLE, TOO COOL TO HIDE",
    "GEWERBEPARK SÜD": "QUARTET GAME HONORING THE VAST SHOPPING LANDSCAPE OF LOWER AUSTRIA"
  };

  // ABOUT text - customize this
  const ABOUT_TEXT = "HELLO I’M MARIE.\nI’M STUDYING GRAPHIC DESIGN AT UNIVERSITY OF APPLIED ARTS VIENNA. \nRIGHT NOW I’M BASED IN LONDON.\nI LIKE DELICIOUS FONTS, RESEARCH AND CONCEPTUAL DESIGN.\n AND EMAILS. I LOOOOVE EMAILS :)\n\nMARIE-SCHUETZ@GMX.AT";

  // Project detail page descriptions (shown when project is opened)
  // If not specified, the main description will be used
  const projectDetailDescriptions = {
    "FASHION SHOW 2025": "THIS PROJECT – LIKE A GOOD PAIR OF BLACK CROCS – IS FUN, VERSATILE\nAND ALREADY A CLASSIC. THE PROPOSAL SADLY DIDN’T WIN ANGEWANDTES NEXT\nTOP MODEL, BUT IF YOU NEED 147 DIFFERENT DESIGN APPLICATIONS IN FORM OF MOCKUPS, HIT ME UP.",
    "TRUTH": "REAL EYES REALIZE REAL LIES.\nTHIS LOGO IS DESIGNED TO TURN HEADS. (TURN YOUR HEAD ;) (ITS AN AMBIGRAM.)",
    "VINYLS FOR BEXXX": "I LOVE MUSIC <3",
    "PROCESS JOURNAL": "EVEN THOUGH YOU WONT FIND ANY ‘DEAR DIARIES’ IN THIS JOURNAL, THIS BOOK STILL VERY MUCH COMES FROM THE HEART.\n IT'S A LONDON-VIENNA COPRODUCTION. AS IN: I’M FROM VIENNA BUT WORKED ON IT IN LONDON.",
    "AXIS FESTIVAL": "'ITS A VERY POST CLUB POST AMBIENT POST POST ELECTRONIC MIX OF JAPANESE PROGRESSIVE NOISE AND HUNGARIAN EDM WITH A TOUCH OF DECONSTRUCTED CLUB BUT ALSO JAZZ. IDK, IT’S PROBABLY TOO NICHE FOR YOU.. ANYWAYS!' :)",
    "DISPUTED TERRITORIES": "MAPS AS TOOLS OF POWER FASCINATE ME. THEY CAN BE USED BOTH FOR POLITICAL VIOLENCE AND FOR RESISTANCE. THE DRAWING OF MAPS SHAPES REALITY AS WE KNOW IT. MY ONGOING OBSESSION WITH CARTOGRAPHY HAS PRODUCED ONE PROJECT SO FAR: AN INTERACTIVE MAP SHOWING AND EDUCATING ON DISPUTED TERRITORIES AROUND THE WORLD. BECAUSE THERE ARE A LOT. LIKE … A LOT.\n\n THIS IS STILL A WORK IN PROGRESS AND I AM BUILDING AS I GO. MY GOAL IS TO COLLECT ALL MY ACCUMULATED KNOWLEDGE IN A PRINTED PUBLICATION. \n SOME DAY. MAYBE.",
    "FUN STUFF": "SOME PROJECTS ARE THE FRIENDS YOU MADE ALONG THE WAY.",
    "GEWERBEPARK SÜD": "CAUTION! THIS CARD GAME CONTAINS HAUNTING STRIPMALL MEMORIES FROM YOUR SUBURBIAN CHILDHOOD. SIDE EFFECTS\nMAY INCLUDE: COLD SWEATS, INSOMNIA AND MUSCLE SPASMS (FROM CRINGING\nTOO HARD…). "
  };

  // Project background images - add your image paths here
  const projectImages = {
    "FASHION SHOW 2025": "images/fashion-show-runway.png",
    "TRUTH": "images/truth_background.jpg",
    "VINYLS FOR BEXXX": "images/vinyls_background.jpg",
    "PROCESS JOURNAL": "images/PJ_background2.jpg",
    "AXIS FESTIVAL": "images/Axis_background.jpg",
    "DISPUTED TERRITORIES": "images/DT_background.jpg",
    "FUN STUFF": "images/funstuff_background.jpg",
    "GEWERBEPARK SÜD": "images/GS_background2.jpg"
  };

  // Project detail page images configuration
  // Add images for each project's two-column layout
  // Each image needs: src (path), size (40-100 for width percentage), alt (description)
  const projectDetailImages = {
    "FASHION SHOW 2025": {
      leftColumn: [
         { src: {
        sequence: true,
        folder: "images/modeklasse_animation",
        frameCount: 77,
        prefix: "modeklasse_animation_",
        digits: 5,
        extension: "png",
        startIndex: 0,
        fps: 24,
        loop: true,
        alt: "Modeklasse Animation"
      },
      size: 75,
      alt: "Axis Music Festival"
    },
        { src: "images/Animation_quer.mp4", size: 80, alt: "Fashion Show 2025", fullWidth: true, insertAfter: 1 },
        { src: "images/plakate_alle.png", size: 80, alt: "Fashion Show 2025", fullWidth: true, insertAfter: 1 },
        { src: "images/merch.png", size: 75, alt: "Fashion Show 2025" },
                { src: "images/modeklasse_banner1.jpg", size: 75, alt: "Fashion Show 2025" }

      ],
      rightColumn: [
                { src: "images/modeklasse_poster_mockup.jpg", size: 95, alt: "Fashion Show 2025", },

        { src: "images/modeklasse_backdrop.jpg", size: 75, alt: "Fashion Show 2025" },
              { src: "images/modeklasse_keychains.png", size: 85, alt: "Fashion Show 2025" }

      ]
    },
    "TRUTH": {
      leftColumn: [
        { src: "images/truth_leiter.jpg", size: 90, alt: "Truth" },
                { src: "images/truth_detail.jpg", size: 70, alt: "Truth", fullWidth: true, insertAfter: 1 },
        { src: "images/siebdruck_spray.jpg", size: 55, alt: "Truth" },
                { src: "images/truth_hand.jpg", size: 80, alt: "Truth" }

      ],
      rightColumn: [
        { src: "images/Some_Animation_final.mp4", size: 70, alt: "Truth" },
        { src: "images/siebdruck.mp4", size: 85, alt: "Truth", noSound: true },
                { src: "images/Poster_aufzug.mp4", size: 80, alt: "Truth", noSound: true }

      ]
    },
    "VINYLS FOR BEXXX": {
      leftColumn: [
        { src: "images/ode_vorne.jpg", size: 80, alt: "Vinyls for Rebecca" },
        { src: "images/ode_mockup.jpg", size: 70, alt: "Vinyls for Rebecca", fullWidth: true, insertAfter: 1 },
        { src: "images/techno_vorne.jpg", size: 80, alt: "Vinyls for Rebecca" },

      ],
      rightColumn: [
        { src: "images/ode_hinten.jpg", size: 80, alt: "Vinyls for Rebecca" },
        { src: "images/techno_hinten.jpg", size: 80, alt: "Vinyls for Rebecca" }
      ]
    },
    "AXIS FESTIVAL": {
      leftColumn: [
        { src: "images/Axis_Poster2.png", size: 80, alt: "Axis Music Festival" },
        { src: "images/AXIS_animation.mp4", size: 50, alt: "Axis Music Festival", fullWidth: true, insertAfter: 1 },
        { src: "images/blue-poster2.png", size: 80, alt: "Axis Music Festival", fullWidth: true,  insertAfter: 2 },
      ],
      rightColumn: [
        { src: {
        sequence: true,
        folder: "images/axis logo_ drehung",
        frameCount: 120,
        prefix: "axis logo_ drehung_",
        digits: 5,
        extension: "png",
        startIndex: 0,
        fps: 30,
        loop: true,
        alt: "Axis Logo Animation"
      },
      size: 80,
      alt: "Axis Music Festival"
    },
    ]
    },
    
    "DISPUTED TERRITORIES": {
      leftColumn: [
        { src: "images/karte.mp4", size: 80, alt: "Disputed Territories", noSound: true }
      ],
      rightColumn: [
        { src: "images/pad.mp4", size: 80, alt: "Disputed Territories", noSound: true }
      ]
    },
    "FUN STUFF": {
      leftColumn: [
        { src: "images/lettering.jpg", size: 80, alt: "Fun Stuff" },
        { src: "images/diplom.mp4", size: 80, alt: "Fun Stuff", fullWidth: true, noSound: true, insertAfter: 2 },
        { src: "images/sommer_poster.jpg", size: 70, alt: "Fun Stuff" }
      ],
      rightColumn: [
        { src: "images/CommonSoil_Poster.jpg", size: 65, alt: "Fun Stuff" },
                { src: "images/Flodo.mp4", size: 85, alt: "Fun Stuff", noSound: true},

        
      ]
    },
    "GEWERBEPARK SÜD": {
      leftColumn: [
        { src: "images/GS_Cover.png", size: 75, alt: "Card Game" },
         { src: "images/GS_2_karten.png", size: 62, alt: "Card Game" }
      ],
      rightColumn: [
        { src: "images/GS_5_karten.png", size: 80, alt: "Card Game" },
        { src: "images/gewerbepark_cards.png", size: 65, alt: "Card Game", fullWidth: true, insertAfter: 1 },
                { src: "images/GS_3_karten.png", size: 75, alt: "Card Game" },

      ]
    },
    "PROCESS JOURNAL": {
      leftColumn: [
        { src: "images/PJ_cover.jpg", size: 85, alt: "Process Journal", fullWidth: true, insertAfter: 0},
        { src: {
        sequence: true,
        folder: "images/PJ_gif",
        frameCount: 109,
        prefix: "PJ_gif",
        digits: 3,
        extension: "png",
        startIndex: 0,
        fps: 24,
        loop: true,
        alt: "Process Journal Animation"
      },
      size: 80,
      alt: "Process Journal",
      fullWidth: true, 
      insertAfter: 1
    },
            { src: "images/PJ_spine.jpg", size: 90, alt: "Process Journal" },
            { src: "images/PJ_spread.jpg", size: 80, alt: "Process Journal", fullWidth: true, insertAfter: 3},
            { src: "images/PJ_freedom.jpg", size: 120, alt: "Process Journal" },

      ],
      rightColumn: [
        { src: "images/PJ_children.jpg", size: 90, alt: "Process Journal" },
        { src: "images/PJ_ecke.jpg", size: 55, alt: "Process Journal" }
      ]
    }
  };

  // Inner circles configuration - customize for each project
  // Each project has circles with customizable radii and text parts
  // circleRadii: array of radii for each circle (as percentage of outer circle, e.g., 0.95, 1.0)
  // hangingCircles: array of circle indices that should hang from circle (text reads upside down from top)
  // textParts: array of text elements with text and position on the circle
  const innerCirclesConfig = {
    "FASHION SHOW 2025": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Concept, Design,", position: "20%", circleIndex: 0 },
        { text: "Animation", position: "22%", circleIndex: 1 },
        { text: "2025 with", position: "81%", circleIndex: 3 },
        { text: "Nora Eros and Margarethe Wirnsberger", position: "82%", circleIndex: 2 }
      ]
    },
    "VINYLS FOR BEXXX": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Concept, Design,", position: "20%", circleIndex: 0 },
        { text: "Photography", position: "17%", circleIndex: 1 },
        { text: "2024", position: "82%", circleIndex: 3 },
        { text: "Solo Project", position: "80%", circleIndex: 2 }
      ]
    },
    "AXIS FESTIVAL": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Concept, Design,", position: "20%", circleIndex: 0 },
        { text: "Animation", position: "22%", circleIndex: 1 },
        { text: "2024 with", position: "81%", circleIndex: 3 },
        { text: "Verena Müllner", position: "79%", circleIndex: 2 }
      ]
    },
    
    "DISPUTED TERRITORIES": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Research, Concept,", position: "20%", circleIndex: 0 },
        { text: "Design, Code", position: "22%", circleIndex: 1 },
        { text: "2025 — today", position: "81%", circleIndex: 3 },
        { text: "Solo Project", position: "82%", circleIndex: 2 }
      ]
    },
    "GEWERBEPARK SÜD": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Concept,", position: "20%", circleIndex: 0 },
        { text: "Design", position: "22%", circleIndex: 1 },
        { text: "2025", position: "81%", circleIndex: 3 },
        { text: "Solo Project", position: "82%", circleIndex: 2 }
      ]
    },
    "FUN STUFF": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Concept,", position: "30%", circleIndex: 0 },
        { text: "Design", position: "32%", circleIndex: 1 },
        { text: "2025", position: "67%", circleIndex: 3 },
        { text: "Solo Project", position: "69%", circleIndex: 2 }
      ]
    },
    "TRUTH": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Concept, Design,", position: "30%", circleIndex: 0 },
        { text: "Production", position: "32%", circleIndex: 1 },
        { text: "2025 with", position: "67%", circleIndex: 3 },
        { text: "Janina Maulhardt", position: "70%", circleIndex: 2 }
      ]
    },
    "PROCESS JOURNAL": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Research, Concept,", position: "30%", circleIndex: 0 },
        { text: "Design, Production", position: "32%", circleIndex: 1 },
        { text: "2025 — 2026", position: "67%", circleIndex: 3 },
        { text: "Solo Project", position: "70%", circleIndex: 2 }
      ]
    }
  };

  // Track which background layer is currently active
  let currentLayer = 1;
  
  // Function to update the background image with dynamic duration
  function updateBackgroundImage(projectName, duration = 1.5) {
    const bg1 = document.getElementById("projectBackground1");
    const bg2 = document.getElementById("projectBackground2");
    if (!bg1 || !bg2) return;
    
    const imagePath = projectImages[projectName];
    
    if (imagePath) {
      // Determine which layer to fade in and which to fade out
      const fadeInLayer = currentLayer === 1 ? bg2 : bg1;
      const fadeOutLayer = currentLayer === 1 ? bg1 : bg2;
      
      // Make fade duration slightly longer than rotation (20% longer)
      const fadeDuration = duration * 1.2;
      
      // Set the new image on the layer that will fade in
      fadeInLayer.style.backgroundImage = `url('${imagePath}')`;
      fadeInLayer.style.transition = `opacity ${fadeDuration}s ease-in-out`;
      fadeInLayer.style.opacity = '1';
      
      // Fade out the old layer
      fadeOutLayer.style.transition = `opacity ${fadeDuration}s ease-in-out`;
      fadeOutLayer.style.opacity = '0';
      
      // Switch active layer
      currentLayer = currentLayer === 1 ? 2 : 1;
    } else {
      // Fade out both layers
      bg1.style.transition = `opacity ${duration}s ease-in-out`;
      bg1.style.opacity = '0';
      bg2.style.transition = `opacity ${duration}s ease-in-out`;
      bg2.style.opacity = '0';
      setTimeout(() => {
        bg1.style.backgroundImage = '';
        bg2.style.backgroundImage = '';
        currentLayer = 1;
      }, duration * 1000);
    }
  }

  // Store currently active project name globally
  let activeProjectName = null;

  // Function to update the center text
  function updateCenterText(projectName) {
    const centerText = document.querySelector(".mono.center");
    const arrow = document.getElementById("projectArrow");
    if (!centerText) return;
    
    const description = projectDescriptions[projectName] || "WORK";
    activeProjectName = projectName; // Store the active project name
    
    // Add fade effect
    centerText.style.opacity = "0";
    if (arrow) arrow.style.opacity = "0";
    
    setTimeout(() => {
      centerText.textContent = description;
      centerText.style.opacity = "1";
      
      // Show arrow only if a project is selected (not "WORK")
      if (arrow) {
        if (projectName && projectName !== "WORK") {
          arrow.style.display = "block";
          // Position arrow below text with consistent gap
          setTimeout(() => {
            const textRect = centerText.getBoundingClientRect();
            const gap = window.innerHeight * 0.05; // 3vh gap between text and arrow
            const arrowTop = textRect.bottom + gap;
            arrow.style.top = arrowTop + 'px';
            arrow.style.opacity = "1";
          }, 50);
        } else {
          arrow.style.display = "none";
        }
      }
    }, 200);
  }

  // Function to create and animate inner circles with project details
  function updateInnerCircles(projectName, rotationDuration = 0, outerCircleRotation = 0) {
    const innerCirclesContainer = document.getElementById("innerCircles");
    if (!innerCirclesContainer) return;
    
    let config = innerCirclesConfig[projectName];
    
    // If no config exists for this project, use a default configuration
    if (!config && projectName) {
      config = {
        circleRadii: [0.935, 0.885, 0.95, 0.9],
        hangingCircles: [2, 3],
        textParts: [
          { text: "Design", position: "25%", circleIndex: 0 },
          { text: "Project", position: "25%", circleIndex: 1 },
          { text: "2025", position: "75%", circleIndex: 2 },
          { text: "Work", position: "75%", circleIndex: 3 }
        ]
      };
    }
    
    // If no project selected, fade out
    if (!projectName) {
      innerCirclesContainer.style.opacity = "0";
      setTimeout(() => {
        innerCirclesContainer.innerHTML = "";
      }, 300);
      return;
    }
    
    // Clear existing circles
    innerCirclesContainer.innerHTML = "";
    
    const rect = ROOT.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const size = Math.min(rect.width, rect.height);
    
    const { circleRadii, textParts, hangingCircles = [] } = config;
    
    // Adjust for Chrome to match Safari's rendering
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const chromeFontScale = 1; // Chrome text renders 5% smaller
    // Chrome-specific radius adjustments for each of the 4 inner circles (0-3)
    const chromeCircleScales = [1.03, 1.03, 0.96, 0.96]; // Adjust each circle independently in Chrome
    // Calculate base values, then scale for Chrome
    const baseRemSize = 0.37;
    const baseVwSize = 0.5;
    const fontSize = isChrome 
      ? `calc(${baseRemSize * chromeFontScale}rem + ${baseVwSize * chromeFontScale}vw)` 
      : `calc(${baseRemSize}rem + ${baseVwSize}vw)`;
    
    // Create SVG circles paths first (one for each radius)
    const circlePaths = {};
    circleRadii.forEach((radiusFactor, circleIndex) => {
      // Safari uses original radius, Chrome applies per-circle adjustments
      const chromeCircleScale = isChrome ? (chromeCircleScales[circleIndex] || 1.0) : 1.0;
      const radius = (size / 2) * radiusFactor * chromeCircleScale;
      
      // Create both clockwise and counter-clockwise paths for each circle
      circlePaths[circleIndex] = {
        radius,
        clockwise: `M ${cx-radius},${cy} A ${radius},${radius} 0 1,1 ${cx+radius},${cy} A ${radius},${radius} 0 1,1 ${cx-radius},${cy}`,
        counterClockwise: `M ${cx+radius},${cy} A ${radius},${radius} 0 1,0 ${cx-radius},${cy} A ${radius},${radius} 0 1,0 ${cx+radius},${cy}`
      };
    });
    
    // Create each text element
    textParts.forEach((textConfig, index) => {
      const { text, position, circleIndex } = textConfig;
      const circlePath = circlePaths[circleIndex];
      
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      // Add padding to prevent text clipping
      const padding = 50;
      svg.setAttribute('width', rect.width + padding * 2);
      svg.setAttribute('height', rect.height + padding * 2);
      svg.setAttribute('viewBox', `${-padding} ${-padding} ${rect.width + padding * 2} ${rect.height + padding * 2}`);
      svg.style.position = 'absolute';
      svg.style.left = `-${padding}px`;
      svg.style.top = `-${padding}px`;
      svg.style.overflow = 'visible';
      
      const defs = document.createElementNS(svgNS, 'defs');
      svg.appendChild(defs);
      
      const pathId = `inner-path-${index}`;
      const path = document.createElementNS(svgNS, 'path');
      
      // Check if this circle should hang (text reads upside down from top)
      const isHanging = hangingCircles.includes(circleIndex);
      const d = isHanging ? circlePath.counterClockwise : circlePath.clockwise;
      
      path.setAttribute('id', pathId);
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      defs.appendChild(path);
      
      const group = document.createElementNS(svgNS, 'g');
      svg.appendChild(group);
      
      const textEl = document.createElementNS(svgNS, 'text');
      textEl.style.fontSize = fontSize;
      textEl.setAttribute('text-anchor', 'middle');
      // Use 'hanging' for both to ensure consistent positioning across browsers
      textEl.setAttribute('dominant-baseline', 'hanging');
      
      // Add dy offset for hanging text to match standing text distance from circle
      if (isHanging) {
        textEl.setAttribute('dy', '-0.35em'); // Shift hanging text away from circle edge
      }
      
      const textPath = document.createElementNS(svgNS, 'textPath');
      textPath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${pathId}`);
      textPath.setAttribute('startOffset', position);
      textPath.textContent = text;
      
      textEl.appendChild(textPath);
      group.appendChild(textEl);
      
      innerCirclesContainer.appendChild(svg);
      
      // Calculate starting and ending rotation for counter-rotation
      const startRotation = outerCircleRotation;
      const endRotation = 0;
      const totalRotation = endRotation - startRotation;
      
      const startOpacity = 0;
      const endOpacity = 1;
      const startTime = Date.now();
      
      // Set initial rotation
      group.style.transformOrigin = `${cx}px ${cy}px`;
      group.style.transform = `rotate(${startRotation}deg)`;
      
      function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (rotationDuration * 1000), 1);
        
        // Apply ease-in-out quadratic for gentle acceleration and deceleration
        const easeProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        // Counter-rotate to meet at top with easing
        const currentRotation = startRotation + (totalRotation * easeProgress);
        group.style.transform = `rotate(${currentRotation}deg)`;
        
        // Fade in opacity starting at 40% of rotation, reaching full opacity at 100%
        // This creates a delayed fade-in that completes when rotation completes
        const opacityProgress = Math.max(0, Math.min((progress - 0.4) / 0.6, 1));
        const currentOpacity = startOpacity + (endOpacity - startOpacity) * opacityProgress;
        textEl.style.opacity = currentOpacity;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }
      
      if (rotationDuration > 0) {
        animate();
      } else {
        textEl.style.opacity = 1;
        group.style.transform = `rotate(${endRotation}deg)`;
      }
    });
    
    // Fade in container
    innerCirclesContainer.style.opacity = "1";
  }

  // state for the circle
  const circles = [];

  function degNorm(a) {
    let x = a % 360;
    if (x > 180) x -= 360;
    if (x <= -180) x += 360;
    return x;
  }

  // Split text into individual character spans for curved layout
  function splitTextIntoChars(element) {
    // Preserve child elements (like .sub). Only split direct text nodes
    const childNodes = Array.from(element.childNodes);
    const textNodes = childNodes.filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== '');
    const otherNodes = childNodes.filter(n => n.nodeType !== Node.TEXT_NODE);
    const text = textNodes.map(n => n.textContent).join('').trim();

    // Remove text nodes but keep other elements
    textNodes.forEach(n => n.remove());

    // Insert char spans before the first non-text child
    const ref = otherNodes[0] || null;
    const spans = [...text].map(char => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char;
      if (ref) element.insertBefore(span, ref);
      else element.appendChild(span);
      return span;
    });
    return spans;
  }

  function setupCircle(el) {
    // Prevent concurrent setup runs for the same element (can happen on
    // rapid resize). Use a temporary attribute as a lock.
    if (el.__setting_up) return null;
    el.__setting_up = true;
    
    // Detect Chrome for browser-specific adjustments
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    
    // SVG-based layout: each label occupies arc length proportional to its measured SVG length
    const id = el.id || "";
    const items = Array.from(el.querySelectorAll(".circle-item"));
    if (!items.length) return;

    // Gap distribution mode:
    //  - 'equal' (default): equal angular gaps between labels
    //  - 'none': no explicit gaps; sections are sized purely by text length
    const gapMode = (el.dataset.gapMode || 'equal').toLowerCase();

    function getLabelText(item) {
      const clone = item.cloneNode(true);
      const sub = clone.querySelector('.sub');
      if (sub) sub.remove();
      return clone.textContent.trim().replace(/\s+/g, ' ');
    }

    const rect = ROOT.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height);
    const factor = parseFloat(el.dataset.radiusFactor) || 0.4;
    const safariRadiusScale = 0.96; // Safari circles 4% smaller
    const chromeBigCircleScale = 1.05; // Chrome big circle 2% bigger than Safari
    const bigCircleRadiusAdjustment = isChrome ? (safariRadiusScale * chromeBigCircleScale) : safariRadiusScale;
    let outerRadius = Math.max((size / 2) * factor * bigCircleRadiusAdjustment, 150);
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', rect.width);
    svg.setAttribute('height', rect.height);
    svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
    svg.style.position = 'absolute';
    svg.style.left = '0';
    svg.style.top = '0';
    svg.style.overflow = 'visible';

    const defs = document.createElementNS(svgNS, 'defs');
    svg.appendChild(defs);

    const pathId = `path-${id || Math.random().toString(36).slice(2,9)}`;
    const path = document.createElementNS(svgNS, 'path');
    function describeCircle(cx, cy, r) {
      return `M ${cx-r},${cy} A ${r},${r} 0 1,1 ${cx+r},${cy} A ${r},${r} 0 1,1 ${cx-r},${cy}`;
    }
    // helper to create a full circle path that STARTS at a given angle (to move the seam)
    function describeCircleFromAngle(cx, cy, r, startA) {
      const x0 = cx + r * Math.cos(startA);
      const y0 = cy + r * Math.sin(startA);
      const x1 = cx + r * Math.cos(startA + Math.PI);
      const y1 = cy + r * Math.sin(startA + Math.PI);
      return `M ${x0},${y0} A ${r},${r} 0 1,1 ${x1},${y1} A ${r},${r} 0 1,1 ${x0},${y0}`;
    }
    path.setAttribute('id', pathId);
    path.setAttribute('fill', 'none');
    path.setAttribute('d', describeCircle(cx, cy, outerRadius));
    defs.appendChild(path);

  const group = document.createElementNS(svgNS, 'g');
  svg.appendChild(group);

    const labels = items.map(item => ({ element: item, text: getLabelText(item) }));

    // Measure label lengths using temporary textPaths
    const measureTexts = labels.map((l) => {
      const t = document.createElementNS(svgNS, 'text');
      const tp = document.createElementNS(svgNS, 'textPath');
      // apply identical font styles used for final text so measurement matches final render
      const cs = window.getComputedStyle(l.element);
      // CRITICAL: use the resolved px fontSize from CSS variable
      const fontSize = getComputedStyle(document.documentElement).getPropertyValue('--circle-big-char-size').trim();
      if (fontSize) {
        t.style.fontSize = fontSize;
        t.setAttribute('font-size', fontSize);
      }
      if (cs.fontFamily) {
        t.style.fontFamily = cs.fontFamily;
        t.setAttribute('font-family', cs.fontFamily);
      }
      if (cs.fontStyle) t.style.fontStyle = cs.fontStyle;
      if (cs.letterSpacing) {
        t.style.letterSpacing = cs.letterSpacing;
        t.setAttribute('letter-spacing', cs.letterSpacing);
      }
      if (cs.textTransform) t.style.textTransform = cs.textTransform;
      // insert textPath
      tp.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${pathId}`);
      tp.textContent = l.text;
      tp.setAttribute('startOffset', '0');
      t.appendChild(tp);
      svg.appendChild(t);
      return { t, tp, text: l.text };
    });

    const labelLengths = measureTexts.map(m => {
  const len = m.tp.getComputedTextLength();
      m.t.remove();
      return len;
    });
    
    // Fallback: if all measurements are 0 or suspiciously small, use character count
    const totalMeasured = labelLengths.reduce((s, v) => s + v, 0);
    if (totalMeasured < 10) {
      // measurements failed fallback (silently handled)
      const charCounts = labels.map(l => l.text.length);
      const avgCharWidth = 12; // approximate px per character
      labelLengths.length = 0;
      labelLengths.push(...charCounts.map(count => count * avgCharWidth));
  // fallback lengths computed
    }

    // circumference for current radius
    let circumference = 2 * Math.PI * outerRadius;

    // Compute total label length and decide gap handling based on mode
    const totalLabelLength = labelLengths.reduce((s, v) => s + v, 0);
    let gap = 0;
    if (gapMode === 'equal') {
      // equal gaps distributed around circle
      gap = (circumference - totalLabelLength) / labels.length;
      if (gap < 0) {
        // not enough circumference to fit text, expand radius so gaps are zero (>=0 afterwards)
        const neededCircumference = Math.max(totalLabelLength, 2 * Math.PI * outerRadius);
        outerRadius = Math.max(outerRadius, neededCircumference / (2 * Math.PI));
        circumference = 2 * Math.PI * outerRadius;
        path.setAttribute('d', describeCircle(cx, cy, outerRadius));
        gap = (circumference - totalLabelLength) / labels.length;
      }
    } else {
      // 'none': sections sized purely by text length; no explicit gaps
      // If text doesn't fit, expand radius so the total arc is >= totalLabelLength
      if (totalLabelLength > circumference) {
        outerRadius = totalLabelLength / (2 * Math.PI);
        circumference = 2 * Math.PI * outerRadius;
        path.setAttribute('d', describeCircle(cx, cy, outerRadius));
      }
      gap = 0;
    }

    // Create final textPaths: use angular placement so each label occupies arc proportional to its measured length
    // Also create rotating "sections" (wedges) so boundaries rotate together with the text
    // compute label angles (radians) from measured lengths
    let labelAngles;
    let gapAngle;
    if (gapMode === 'equal') {
      labelAngles = labelLengths.map(len => (len / circumference) * (2 * Math.PI));
      const totalLabelAngle = labelAngles.reduce((s, a) => s + a, 0);
      gapAngle = (2 * Math.PI - totalLabelAngle) / labels.length; // equal gap angle between labels
    } else {
      // 'none': each label gets equal padding on both sides, calculated so all gaps (including wrap-around) are equal
      const totalTextLength = labelLengths.reduce((s, v) => s + v, 0);
      const numGaps = labels.length * 2; // each label has left and right padding = 2 gaps per label
      const availableForPadding = circumference - totalTextLength;
      const paddingPx = availableForPadding / numGaps; // equal padding for all gaps
      const paddingAngle = (paddingPx / circumference) * (2 * Math.PI);
      
      // Each section = padding + text + padding
      labelAngles = labelLengths.map(len => (len / circumference) * (2 * Math.PI));
      gapAngle = paddingAngle * 2; // left + right padding per section
      
  // gapMode=none padding computed (debug output removed)
    }

  // Build section wedges that include each label arc plus one gap following it
    const sectionsGroup = document.createElementNS(svgNS, 'g');
    sectionsGroup.setAttribute('class', 'sections');
    // append sections behind text so text remains clickable on top
    group.appendChild(sectionsGroup);

    // inner radius for wedge (donut) – slightly smaller than outer so the sector has area for clicks
    const innerRadius = Math.max(outerRadius * 0.78, outerRadius - 40);

    // (baseline) single path is used for both sections and text. We keep the
    // original circle path (starting at Math.PI) so label distribution and
    // rotation math are unchanged.

    // Convenience to describe a donut sector path between start and end angle
    function sectorPath(cx, cy, rOuter, rInner, startA, endA) {
      const largeArc = endA - startA <= Math.PI ? 0 : 1;
      const x0 = cx + rOuter * Math.cos(startA);
      const y0 = cy + rOuter * Math.sin(startA);
      const x1 = cx + rOuter * Math.cos(endA);
      const y1 = cy + rOuter * Math.sin(endA);
      const x2 = cx + rInner * Math.cos(endA);
      const y2 = cy + rInner * Math.sin(endA);
      const x3 = cx + rInner * Math.cos(startA);
      const y3 = cy + rInner * Math.sin(startA);
      return [
        `M ${x0} ${y0}`,
        `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x1} ${y1}`,
        `L ${x2} ${y2}`,
        `A ${rInner} ${rInner} 0 ${largeArc} 0 ${x3} ${y3}`,
        'Z'
      ].join(' ');
    }

    // Describe a single arc segment path from startA to endA (both in radians).
    // If endA <= startA we treat it as wrapping and add 2*PI so the arc goes forward.
    function describeArcSegment(cx, cy, r, startA, endA) {
      let sa = startA;
      let ea = endA;
      if (ea <= sa) ea += 2 * Math.PI;
      const largeArc = (ea - sa) > Math.PI ? 1 : 0;
      const x0 = cx + r * Math.cos(sa);
      const y0 = cy + r * Math.sin(sa);
      const x1 = cx + r * Math.cos(ea);
      const y1 = cy + r * Math.sin(ea);
      return `M ${x0} ${y0} A ${r} ${r} 0 ${largeArc} 1 ${x1} ${y1}`;
    }

    // Keep track of section boundaries and text centers
  let cumAngle = gapMode === 'equal' ? gapAngle / 2 : 0; // half-gap start only for equal gaps
  let cumBoundary = 0; // absolute boundary including gapAngle if any
    const textPaths = [];
    // Compute a safe seam location: find the largest angular gap between
    // labels (using the same cumulative start the layout uses) and place
    // the path start in the middle of that gap. Then set the path to start
    // at that angle and compute seamOffset so text centering remains correct.
    const originalStart = Math.PI; // original left-most start used previously

    // compute angular boundaries in radians using the same cumAngle start
    let runRad = gapMode === 'equal' ? gapAngle / 2 : 0;
    const bounds = [];
    for (let i = 0; i < labelAngles.length; i++) {
      const s = runRad;
      const e = s + labelAngles[i];
      bounds.push({ s, e });
      runRad = e + gapAngle;
    }

    // find largest gap (consider wrap)
    let largest = { size: -1, from: 0, to: 0 };
    for (let i = 0; i < bounds.length; i++) {
      const curEnd = bounds[i].e;
      let nextStart = bounds[(i + 1) % bounds.length].s;
      if (i === bounds.length - 1) nextStart += 2 * Math.PI;
      const gapRad = nextStart - curEnd;
      if (gapRad > largest.size) largest = { size: gapRad, from: curEnd % (2 * Math.PI), to: nextStart % (2 * Math.PI) };
    }

    // Move the path seam into the largest empty gap so glyphs won't straddle
    // the path start/end. We compute a mid-angle inside that gap and then
    // create the circle path starting at that absolute angle.
    const textPathRef = pathId;
    const TWO_PI = Math.PI * 2;
    // middle of the largest gap in layout-relative radians
    const midInLayout = (largest.from + largest.size / 2) % TWO_PI;
    // absolute start angle (canvas coordinates) = originalStart + midInLayout
    const newStartAbs = (originalStart + midInLayout) % TWO_PI;
    // update the path so its geometric path starts at the chosen absolute angle
    path.setAttribute('d', describeCircleFromAngle(cx, cy, outerRadius, newStartAbs));
    // compute a pixel offset to add to text startOffsets so the text stays
    // visually identical despite the path start moving. Keep 0 <= textSeam < circumference
    const textSeam = ((originalStart - newStartAbs + TWO_PI) % TWO_PI) / TWO_PI * circumference;
    const seamOffset = 0; // reserved for any small visual buffer later
    // startAngle is the absolute rotation added to section angles when drawing wedges
    const startAngle = newStartAbs;
  // seam moved to mid gap (debug output removed)

    labels.forEach((l, i) => {
      const centerAngle = cumAngle + labelAngles[i] / 2;
      // convert centerAngle back to path-length offset (px) on full circumference
      const centerOffset = (centerAngle / (2 * Math.PI)) * circumference + textSeam;

      // Create section wedge for this label: label angle + following gap angle
      const startSection = cumBoundary;
      const endSection = startSection + labelAngles[i] + gapAngle;
      const section = document.createElementNS(svgNS, 'path');
      // sectors are absolute radians by adding startAngle
      let absStart = startSection + startAngle;
      let absEnd = endSection + startAngle;
      if (absEnd <= absStart) absEnd += 2 * Math.PI;
      section.setAttribute('d', sectorPath(cx, cy, outerRadius, innerRadius, absStart, absEnd));
      section.setAttribute('fill', 'rgba(0,0,0,0)');
      section.style.pointerEvents = 'auto';
      // Optional subtle outline for debugging; keep commented by default
      //section.setAttribute('stroke', 'rgba(255,0,0,0.3)');
      //section.setAttribute('stroke-width', '2');
  sectionsGroup.appendChild(section);

  const t = document.createElementNS(svgNS, 'text');
  t.setAttribute('text-anchor', 'middle');
  t.setAttribute('dominant-baseline', 'hanging');
      const cs = window.getComputedStyle(l.element);
      t.style.fontFamily = cs.fontFamily;
      // Get base font size from CSS variable (format: calc(0.6rem + 0.7vw))
      const cssVarValue = getComputedStyle(document.documentElement).getPropertyValue('--circle-big-char-size').trim();
      // Parse the calc values to apply Chrome scaling properly
      const chromeBigCircleFontScale = 1.04; // Chrome big circle text 5% smaller
      // Extract rem and vw values from the CSS variable
      const match = cssVarValue.match(/calc\(([\d.]+)rem\s*\+\s*([\d.]+)vw\)/);
      if (match && isChrome) {
        const remValue = parseFloat(match[1]) * chromeBigCircleFontScale;
        const vwValue = parseFloat(match[2]) * chromeBigCircleFontScale;
        t.style.fontSize = `calc(${remValue}rem + ${vwValue}vw)`;
      } else {
        t.style.fontSize = cssVarValue;
      }
      t.style.fontStyle = cs.fontStyle;
      t.style.letterSpacing = cs.letterSpacing;
      t.setAttribute('fill', '#ffffff');
      t.style.pointerEvents = 'auto';
      t.style.cursor = 'pointer';

  // Create a dedicated short arc path for this label (so the label
  // cannot straddle the global seam). Put it in <defs> and reference
  // it from a per-label <textPath> using startOffset='50%' so the
  // label is centered on its short arc.
  const labelPathId = `label-path-${id || 'c'}-${i}`;
  const labelPath = document.createElementNS(svgNS, 'path');
  labelPath.setAttribute('id', labelPathId);
  // describeArcSegment expects absolute angles; use absStart/absEnd computed above
  labelPath.setAttribute('d', describeArcSegment(cx, cy, outerRadius, absStart, absEnd));
  labelPath.setAttribute('fill', 'none');
  defs.appendChild(labelPath);

  const tp = document.createElementNS(svgNS, 'textPath');
  tp.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${labelPathId}`);
  // center text on the short arc path. Percentage startOffset centers on the arc length.
  tp.setAttribute('startOffset', '50%');
  tp.textContent = l.text;

      t.appendChild(tp);
      group.appendChild(t);
      textPaths.push({ t, tp, centerOffset });

      // hide original HTML item
      l.element.style.display = 'none';

      // advance cumulative angles
      cumAngle += labelAngles[i] + gapAngle;
      cumBoundary += labelAngles[i] + gapAngle;

      // click handler for the wedge section
      section.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Check if nothing is currently active (first selection or after reset)
        const nothingActive = !items.some(item => item.classList.contains('active'));
        
        items.forEach(s => s.classList.remove('active'));
        items[i].classList.add('active');
        // Update SVG text active state
        textPaths.forEach(tp => tp.t.classList.remove('active'));
        textPaths[i].t.classList.add('active');
        
        const rotationInfo = rotateTo(i, true);
        let duration = rotationInfo.duration;
        let rotationDelta = rotationInfo.rotationDelta;
        
        // If nothing was active and rotation is 0 (clicking top item), simulate adjacent rotation
        if (nothingActive && duration === 0) {
          const segmentAngle = 360 / items.length;
          duration = (segmentAngle / 360) * rotateSpeed;
          rotationDelta = segmentAngle; // Positive for clockwise animation
        }
        
        // Update center text with project description
        updateCenterText(l.text);
        // Update background image with matching duration
        updateBackgroundImage(l.text, duration);
        // Update inner circles with project details and rotation
        updateInnerCircles(l.text, duration, rotationDelta);
      });
    });

    // attach svg to ROOT
    ROOT.appendChild(svg);

      // rotation state
  let rotation = 0;

  // READ any per-circle override: data-rotate-speed="1.2"
  const rotateSpeed =
    parseFloat(el.dataset.rotateSpeed || '') > 0
      ? parseFloat(el.dataset.rotateSpeed)
      : ROTATION_SPEED_SECONDS;

  function rotateTo(index, animate = true) {
    // remember previous rotation so we can compute angular distance
    const prevRotation = rotation;

    // Compute the actual point on the (global) path that corresponds to the
    // label center and rotate that point to the top (12 o'clock). This is
    // robust to seam movement and per-label short arcs.
    let targetRotation = null;
    try {
      // Try to sample the per-label short arc (preferred) so we rotate the
      // *visible* label to the top. The label path id is the same we created
      // earlier: `label-path-${id || 'c'}-${i}` where i=index.
      const labelPathId = `label-path-${id || 'c'}-${index}`;
      const labelNode = defs.querySelector(`#${labelPathId}`);
      let pt = null;
      if (labelNode) {
        const L = labelNode.getTotalLength();
        pt = labelNode.getPointAtLength(L / 2);
      } else {
        const px = textPaths[index].centerOffset + (typeof seamOffset !== 'undefined' ? seamOffset : 0);
        pt = path.getPointAtLength(px);
      }
      const angleRad = Math.atan2(pt.y - cy, pt.x - cx);
      const angleDeg = angleRad * 180 / Math.PI;
      // We want the point's final angle to be -90 (top). With screen
      // coordinates (y positive down) the point's angle is angleDeg and
      // rotating the group by R (clockwise positive) yields angleDeg + R.
      // So we need angleDeg + R = -90 => R = -90 - angleDeg.
      const desired = -90 - angleDeg;

  // Take the shortest path: normalize the angular difference to [-180, 180]
      // Normalize to be within one full rotation of prevRotation
      let diff = desired - prevRotation;
      // Normalize diff to [-180, 180] range
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      targetRotation = prevRotation + diff;
    } catch (err) {
      // fallback to previous method if sampling fails
      const currentCirc = 2 * Math.PI * outerRadius;
      const px = textPaths[index].centerOffset;
      const angle = (px / currentCirc) * 360;
      const desired = -angle + 90;
      // normalize to shortest path
      let diff = desired - prevRotation;
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      targetRotation = prevRotation + diff;
    }
  // compute duration: seconds per 360deg * (abs angular distance / 360)
  const rotationDelta = targetRotation - prevRotation; // Keep sign to know direction
  const deltaDeg = Math.abs(rotationDelta);
  const duration = animate ? (deltaDeg / 360) * rotateSpeed : 0;
  group.style.transition = animate ? `transform ${duration}s cubic-bezier(0.3, 0, 0.58, 1)` : 'none';
    group.style.transformOrigin = `${cx}px ${cy}px`;
    // commit rotation
    rotation = targetRotation;
    group.style.transform = `rotate(${rotation}deg)`;
    // return duration and rotation delta (with sign) so inner circles can rotate opposite
    return { duration, rotationDelta };
  }

    // click handlers
    items.forEach((it, i) => {
      it.addEventListener('click', (e) => {
        e.stopPropagation();
        // if already active, do nothing
        if (it.classList.contains('active')) return;
        
        // Check if nothing is currently active (first selection or after reset)
        const nothingActive = !items.some(item => item.classList.contains('active'));
        
        items.forEach(s => s.classList.remove('active'));
        it.classList.add('active');
        // Update SVG text active state
        textPaths.forEach(tp => tp.t.classList.remove('active'));
        textPaths[i].t.classList.add('active');
        
        const rotationInfo = rotateTo(i, true);
        let duration = rotationInfo.duration;
        let rotationDelta = rotationInfo.rotationDelta;
        
        // If nothing was active and rotation is 0 (clicking top item), simulate adjacent rotation
        if (nothingActive && duration === 0) {
          const segmentAngle = 360 / items.length;
          duration = (segmentAngle / 360) * rotateSpeed;
          rotationDelta = segmentAngle; // Positive for clockwise animation
        }
        
        // Update center text with project description
        updateCenterText(getLabelText(it));
        // Update background image with matching duration
        updateBackgroundImage(getLabelText(it), duration);
        // Update inner circles with project details
        updateInnerCircles(getLabelText(it), duration, rotationDelta);
      });
      // also click the SVG text to rotate
      textPaths[i].t.addEventListener('click', (e) => {
        e.stopPropagation();
        // if already active, do nothing
        if (items[i].classList.contains('active')) return;
        
        // Check if nothing is currently active (first selection or after reset)
        const nothingActive = !items.some(item => item.classList.contains('active'));
        
        items.forEach(s => s.classList.remove('active'));
        items[i].classList.add('active');
        // Update SVG text active state
        textPaths.forEach(tp => tp.t.classList.remove('active'));
        textPaths[i].t.classList.add('active');
        
        const rotationInfo = rotateTo(i, true);
        let duration = rotationInfo.duration;
        let rotationDelta = rotationInfo.rotationDelta;
        
        // If nothing was active and rotation is 0 (clicking top item), simulate adjacent rotation
        if (nothingActive && duration === 0) {
          const segmentAngle = 360 / items.length;
          duration = (segmentAngle / 360) * rotateSpeed;
          rotationDelta = segmentAngle; // Positive for clockwise animation
        }
        
        // Update center text with project description
        updateCenterText(getLabelText(items[i]));
        // Update background image with matching duration
        updateBackgroundImage(getLabelText(items[i]), duration);
        // Update inner circles with project details
        updateInnerCircles(getLabelText(items[i]), duration, rotationDelta);
      });
    });

    // initial rotation none
    rotateTo(0, false);

    const result = {
      el,
      items,
      svg,
      textPaths,
      recompute: () => {
        // Store active state before recreating
        const activeIndex = items.findIndex(item => item.classList.contains('active'));
        const hadActiveItem = activeIndex >= 0;
        
        // re-create on recompute for simplicity. Remove existing svg,
        // create a fresh circle instance, and replace this entry in the
        // global `circles` array so we don't leak multiple SVGs on resize.
        try { svg.remove(); } catch (e) { /* ignore */ }
        const replacement = setupCircle(el);
        try {
          const idx = circles.findIndex(c => c && c.el === el);
          if (idx >= 0 && replacement) circles[idx] = replacement;
        } catch (err) { /* ignore */ }
        
        // Restore active state and rotation after recompute
        if (replacement && hadActiveItem && activeIndex < replacement.items.length) {
          replacement.items.forEach(s => s.classList.remove('active'));
          replacement.items[activeIndex].classList.add('active');
          // Re-rotate to the active item without animation
          if (replacement.rotateTo) {
            replacement.rotateTo(activeIndex, false);
          }
          // Also restore SVG text active state using the new textPaths
          if (replacement.textPaths && replacement.textPaths[activeIndex]) {
            replacement.textPaths.forEach(tp => tp.t.classList.remove('active'));
            replacement.textPaths[activeIndex].t.classList.add('active');
          }
        }
        
        return replacement;
      },
      setOffset: (o) => { rotation = o; group.style.transform = `rotate(${rotation}deg)`; },
      getOffset: () => rotation,
      rotateTo: (index, animate) => rotateTo(index, animate)
    };
    // release the lock after initial setup completes (allow async safety)
    setTimeout(() => { try { delete el.__setting_up; } catch (e) {} }, 0);
    return result;
  }

  // initialize all circles
  function init() {
    circles.length = 0;
    circleEls.forEach(el => {
      const c = setupCircle(el);
      if (c) circles.push(c);
    });

    // Don't mark any item as active initially - all should be at 100% opacity
  }

  // Wait for fonts to be ready so measurements match actual rendered text
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(init);
  } else {
    init();
  }

  // recompute on resize
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      circles.forEach(c => c.recompute());
      // Also update inner circles if a project is selected
      if (activeProjectName) {
        updateInnerCircles(activeProjectName, 0, 0);
      }
    }, 100);
  });

  // Click on ABOUT text in top right
  const aboutElement = document.querySelector(".mono.right");
  console.log("ABOUT element found:", aboutElement);
  if (aboutElement) {
    aboutElement.addEventListener("click", (e) => {
      console.log("ABOUT clicked!");
      if (isDetailViewActive) {
        console.log("Detail view active, returning");
        return;
      }
      
      e.stopPropagation();
      e.preventDefault();
      
      console.log("Processing ABOUT click...");
      
      // Deactivate all circles
      const big = circles.find(c => c.el.id === "bigCircle");
      if (big && big.items) {
        big.items.forEach(i => i.classList.remove("active"));
      }
      const circlesElement = document.querySelector(".circles");
      const allSvgTexts = circlesElement.querySelectorAll('svg text');
      allSvgTexts.forEach(text => text.classList.remove('active'));
      
      // Show ABOUT text directly
      const centerText = document.querySelector(".mono.center");
      if (centerText) {
        centerText.textContent = ABOUT_TEXT;
        console.log("Set center text to:", ABOUT_TEXT);
      }
      
      // Hide arrow
      const arrow = document.getElementById('projectArrow');
      if (arrow) arrow.style.display = 'none';
      
      // Clear background and inner circles
      updateBackgroundImage(null);
      updateInnerCircles(null);
    });
  } else {
    console.error("ABOUT element NOT found!");
  }

  // Click outside circle to reset to "WORK"
  document.addEventListener("click", (e) => {
    // Don't reset if clicking on arrow or if in detail view
    const arrow = document.getElementById('projectArrow');
    const isArrowClick = arrow && (arrow.contains(e.target) || e.target.closest('#projectArrow, #arrowSvg, #arrowPath'));
    
    if (isArrowClick) {
      return;
    }
    if (isDetailViewActive) {
      return;
    }
    
    // Check if click is on ABOUT
    const aboutElement = document.querySelector(".mono.right");
    if (aboutElement && aboutElement.contains(e.target)) {
      return;
    }
    
    // Check if click is outside the circles area
    const circlesElement = document.querySelector(".circles");
    if (circlesElement && !circlesElement.contains(e.target)) {
      // Remove active class from all items
      const big = circles.find(c => c.el.id === "bigCircle");
      if (big && big.items) {
        big.items.forEach(i => i.classList.remove("active"));
      }
      // Remove active class from all SVG text elements
      const allSvgTexts = circlesElement.querySelectorAll('svg text');
      allSvgTexts.forEach(text => text.classList.remove('active'));
      // Reset center text to "WORK"
      updateCenterText(null);
      // Clear background image
      updateBackgroundImage(null);
      // Hide inner circles
      updateInnerCircles(null);
    }
  });

  // Project detail page functionality
  let currentProjectName = null;
  let isDetailViewActive = false;

  // Function to convert project name to ID
  function projectNameToId(name) {
    return 'project-' + name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  // Function to update arrow direction
  function updateArrowDirection(isBack) {
    const arrowPath = document.getElementById('arrowPath');
    const arrow = document.getElementById('projectArrow');
    if (arrowPath) {
      if (isBack) {
        // Back arrow (pointing left)
        arrowPath.setAttribute('d', 'M19 12L5 12M5 12L12 5M5 12L12 19');
      } else {
        // Forward arrow (pointing right)
        arrowPath.setAttribute('d', 'M5 12L19 12M19 12L12 5M19 12L12 19');
        // Animate arrow moving down when switching to forward (opening detail)
        if (arrow && !isBack) {
          const currentTop = parseFloat(arrow.style.top) || 0;
          arrow.style.top = (currentTop + 30) + 'px';
        }
      }
    }
  }

  // Function to open project detail page
  function openProjectDetail(projectName) {
    currentProjectName = projectName;
    const projectId = projectNameToId(projectName);
    let detailSection = document.getElementById(projectId);
    const circlesElement = document.getElementById('circlesRoot');
    
    // If detail section doesn't exist, create it dynamically
    if (!detailSection) {
      if (projectDetailImages[projectName]) {
        detailSection = createProjectDetailSection(projectName, projectId);
      } else {
        // Create a placeholder detail section with a message
        const main = document.querySelector('.stage');
        detailSection = document.createElement('div');
        detailSection.className = 'project-detail';
        detailSection.id = projectId;
        detailSection.innerHTML = `
          <div class="project-columns">
            <div class="project-column" style="grid-column: 1 / -1; text-align: center; padding: 20vh 5vw;">
              <p style="font-family: 'RobotoMonoLocal', monospace; font-size: calc(0.6rem + 0.4vw);">
                NO IMAGES CONFIGURED FOR "${projectName}"<br><br>
                ADD IMAGES IN THE projectDetailImages CONFIGURATION
              </p>
            </div>
          </div>
        `;
        main.appendChild(detailSection);
      }
    }
    
    if (detailSection) {
      detailSection.classList.add('active');
      // Hide circles
      if (circlesElement) {
        circlesElement.classList.add('hide-circles');
      }
      // Change arrow to back direction
      updateArrowDirection(true);
      isDetailViewActive = true;
      // Don't modify history - just change the view
      
      // Update center text to detail description if available
      const centerText = document.querySelector('.mono.center');
      const arrow = document.getElementById('projectArrow');
      if (centerText && projectDetailDescriptions[projectName]) {
        centerText.textContent = projectDetailDescriptions[projectName];
        // Reposition arrow after text change
        if (arrow) {
          setTimeout(() => {
            const textRect = centerText.getBoundingClientRect();
            const gap = window.innerHeight * ARROW_TEXT_GAP;
            const arrowTop = textRect.bottom + gap;
            arrow.style.top = arrowTop + 'px';
          }, 50);
        }
      }
      
      // Play all videos in the opened project
      detailSection.querySelectorAll('video').forEach(video => {
        video.play().catch(err => {
          // Silently handle autoplay prevention
        });
      });
      
      // Set spacer heights for the newly opened project
      setTimeout(setSpacerHeights, 100);
    }
  }

  // Helper function to check if a file is a video
  function isVideo(src) {
    return src.toLowerCase().endsWith('.mov') || 
           src.toLowerCase().endsWith('.mp4') || 
           src.toLowerCase().endsWith('.webm');
  }

  // Helper function to generate frame paths from pattern
  function generateFramePaths(folder, frameCount, prefix = '', digits = 4, extension = 'png', startIndex = 0) {
    const frames = [];
    for (let i = startIndex; i < startIndex + frameCount; i++) {
      const frameNumber = String(i).padStart(digits, '0');
      frames.push(`${folder}/${prefix}${frameNumber}.${extension}`);
    }
    return frames;
  }

  // Helper function to check if it's a PNG sequence config
  function isPNGSequence(item) {
    return item.sequence && (Array.isArray(item.frames) || item.folder);
  }

  // Helper function to create PNG sequence player
  function createPNGSequence(config, size) {
    const container = document.createElement('div');
    container.className = 'png-sequence-container';
    container.setAttribute('data-size', size);
    
    const img = document.createElement('img');
    img.className = 'png-sequence-frame';
    
    // Generate frames if folder pattern is used
    const frames = config.frames || generateFramePaths(
      config.folder,
      config.frameCount,
      config.prefix || '',
      config.digits || 4,
      config.extension || 'png',
      config.startIndex || 0
    );
    
    img.src = frames[0];
    img.alt = config.alt || 'Animation';
    
    container.appendChild(img);
    
    // Animation settings
    const fps = config.fps || 24;
    const loop = config.loop !== false; // default true
    const frameDelay = 1000 / fps;
    
    let currentFrame = 0;
    let animationInterval;
    let preloadedImages = [];
    let isPreloaded = false;
    
    // Preload all images
    function preloadImages() {
      let loadedCount = 0;
      frames.forEach((frameSrc, index) => {
        const preloadImg = new Image();
        preloadImg.src = frameSrc;
        preloadedImages[index] = preloadImg;
        preloadImg.onload = () => {
          loadedCount++;
          if (loadedCount === frames.length) {
            isPreloaded = true;
            playSequence();
          }
        };
      });
    }
    
    function playSequence() {
      if (!isPreloaded) return;
      
      animationInterval = setInterval(() => {
        currentFrame++;
        if (currentFrame >= frames.length) {
          if (loop) {
            currentFrame = 0;
          } else {
            clearInterval(animationInterval);
            return;
          }
        }
        img.src = frames[currentFrame];
      }, frameDelay);
    }
    
    // Start preloading
    preloadImages();
    
    // Store interval ID for cleanup if needed
    container._animationInterval = animationInterval;
    
    return container;
  }

  // Helper function to create media element (img or video)
  function createMediaElement(src, alt, size, isFullWidth = false, noSound = false) {
    // Check if it's a PNG sequence object
    if (typeof src === 'object' && isPNGSequence(src)) {
      return createPNGSequence(src, size);
    }
    
    if (typeof src === 'string' && isVideo(src)) {
      console.log('Creating video element for:', src);
      const video = document.createElement('video');
      video.className = 'video-element';
      video.src = src;
      video.alt = alt;
      video.setAttribute('data-size', size);
      video.autoplay = false;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.controls = false;
      video.preload = 'auto';
      
      // For full-width videos, use video-container; for column videos, use video-wrapper
      if (isFullWidth) {
        const container = document.createElement('div');
        container.className = 'video-container';
        container.setAttribute('data-size', size);
        container.appendChild(video);
        
        // Only add sound button if video has sound
        if (!noSound) {
          // Create sound toggle button
          const soundButton = document.createElement('button');
          soundButton.textContent = 'SOUND OFF';
          soundButton.setAttribute('aria-label', 'Toggle sound');
          
          soundButton.addEventListener('click', (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
            soundButton.textContent = video.muted ? 'SOUND OFF' : 'SOUND ON';
          });
          
          soundButton.addEventListener('mouseenter', () => {
            soundButton.style.background = '#111';
            soundButton.style.color = '#f7f7f7';
          });
          
          soundButton.addEventListener('mouseleave', () => {
            soundButton.style.background = 'none';
            soundButton.style.color = '#111';
          });
          
          // Create button wrapper for centering below video
          const buttonWrapper = document.createElement('div');
          buttonWrapper.className = 'sound-button-wrapper';
          
          // Update button to be non-absolute positioned
          soundButton.style.position = 'relative';
          soundButton.className = 'sound-toggle-button';
          soundButton.style.cssText = '';
          
          buttonWrapper.appendChild(soundButton);
          container.appendChild(buttonWrapper);
        }
        return container;
      } else {
        const wrapper = document.createElement('div');
        wrapper.className = 'video-wrapper';
        wrapper.setAttribute('data-size', size);
        wrapper.appendChild(video);
        
        // Only add sound button if video has sound
        if (!noSound) {
          // Create sound toggle button
          const soundButton = document.createElement('button');
          soundButton.textContent = 'SOUND OFF';
          soundButton.setAttribute('aria-label', 'Toggle sound');
          
          soundButton.addEventListener('click', (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
            soundButton.textContent = video.muted ? 'SOUND OFF' : 'SOUND ON';
          });
          
          soundButton.addEventListener('mouseenter', () => {
            soundButton.style.background = '#111';
            soundButton.style.color = '#f7f7f7';
          });
          
          soundButton.addEventListener('mouseleave', () => {
            soundButton.style.background = 'none';
            soundButton.style.color = '#111';
          });
          
          // Create button wrapper for centering below video
          const buttonWrapper = document.createElement('div');
          buttonWrapper.className = 'sound-button-wrapper';
          
          // Remove inline styles, use the CSS class styling
          soundButton.className = 'sound-toggle-button';
          
          buttonWrapper.appendChild(soundButton);
          wrapper.appendChild(buttonWrapper);
        }
        return wrapper;
      }
    } else {
      console.log('Creating image element for:', src);
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      img.setAttribute('data-size', size);
      return img;
    }
  }

  // Function to create project detail section dynamically from configuration
  function createProjectDetailSection(projectName, projectId) {
    const config = projectDetailImages[projectName];
    if (!config) return null;
    
    const main = document.querySelector('.stage');
    if (!main) return null;
    
    // Create detail section
    const detailSection = document.createElement('div');
    detailSection.className = 'project-detail';
    detailSection.id = projectId;
    
    // Create columns container (grid)
    const columnsDiv = document.createElement('div');
    columnsDiv.className = 'project-columns';
    
    // Separate regular images from full-width images
    let leftImages = config.leftColumn.filter(img => !img.fullWidth);
    let rightImages = config.rightColumn.filter(img => !img.fullWidth);
    let fullWidthImages = [];
    
    // Collect full-width images with their absolute position in the sequence
    config.leftColumn.forEach((img, idx) => {
      if (img.fullWidth) {
        fullWidthImages.push({ ...img, originalIndex: idx, source: 'left' });
      }
    });
    config.rightColumn.forEach((img, idx) => {
      if (img.fullWidth) {
        fullWidthImages.push({ ...img, originalIndex: idx, source: 'right' });
      }
    });
    
    // Sort by insertAfter position (now represents absolute position counting all images)
    fullWidthImages.sort((a, b) => {
      const insertDiff = (a.insertAfter || 999) - (b.insertAfter || 999);
      if (insertDiff !== 0) return insertDiff;
      // If insertAfter is the same, preserve original order within the same column
      if (a.source === b.source) return a.originalIndex - b.originalIndex;
      // Left column items come before right column items
      return a.source === 'left' ? -1 : 1;
    });
    
    // Build content sections
    let currentLeftColumn = document.createElement('div');
    currentLeftColumn.className = 'project-column left';
    let leftTopSpacer = document.createElement('div');
    leftTopSpacer.className = 'column-top-spacer';
    currentLeftColumn.appendChild(leftTopSpacer);
    
    let currentRightColumn = document.createElement('div');
    currentRightColumn.className = 'project-column right';
    let rightTopSpacer = document.createElement('div');
    rightTopSpacer.className = 'column-top-spacer';
    currentRightColumn.appendChild(rightTopSpacer);
    
    let leftIdx = 0, rightIdx = 0;
    let totalItemsPlaced = 0; // Count ALL items placed (including full-width)
    
    // Process all items in order by checking what should come next
    while (leftIdx < leftImages.length || rightIdx < rightImages.length || fullWidthImages.length > 0) {
      // Check if there's a full-width image that should be inserted at this position
      let fullWidthsToInsertNow = fullWidthImages.filter(fw => fw.insertAfter === totalItemsPlaced);
      
      if (fullWidthsToInsertNow.length > 0) {
        // Close current columns if they have any content (more than just the top spacer)
        if (currentLeftColumn.children.length > 1 || currentRightColumn.children.length > 1) {
          columnsDiv.appendChild(currentLeftColumn);
          columnsDiv.appendChild(currentRightColumn);
        }
        
        // Always start new columns for after full-width (whether we closed previous ones or not)
        currentLeftColumn = document.createElement('div');
        currentLeftColumn.className = 'project-column left after-break';
        let leftTopSpacer = document.createElement('div');
        leftTopSpacer.className = 'column-top-spacer';
        leftTopSpacer.style.height = '0px'; // After-break columns have no top margin
        currentLeftColumn.appendChild(leftTopSpacer);
        
        currentRightColumn = document.createElement('div');
        currentRightColumn.className = 'project-column right after-break';
        let rightTopSpacer = document.createElement('div');
        rightTopSpacer.className = 'column-top-spacer';
        rightTopSpacer.style.height = '0px'; // After-break columns have no top margin
        currentRightColumn.appendChild(rightTopSpacer);
        
        // Add all full-width images for this position
        fullWidthsToInsertNow.forEach((fullWidthToInsert, index) => {
          const fullWidthWrapper = document.createElement('div');
          // Only the very first image gets the first-image class
          fullWidthWrapper.className = totalItemsPlaced === 0 && index === 0 
            ? 'full-width-image-wrapper first-image' 
            : 'full-width-image-wrapper';
          const media = createMediaElement(fullWidthToInsert.src, fullWidthToInsert.alt, fullWidthToInsert.size, true, fullWidthToInsert.noSound);
          media.classList.add('full-width-image');
          fullWidthWrapper.appendChild(media);
          columnsDiv.appendChild(fullWidthWrapper);
          
          totalItemsPlaced++; // Count this full-width image
          
          // Remove from fullWidthImages array
          fullWidthImages = fullWidthImages.filter(fw => fw !== fullWidthToInsert);
        });
      } else {
        // Add regular column images
        let addedThisRound = false;
        
        if (leftImages[leftIdx]) {
          const media = createMediaElement(leftImages[leftIdx].src, leftImages[leftIdx].alt, leftImages[leftIdx].size, false, leftImages[leftIdx].noSound);
          currentLeftColumn.appendChild(media);
          leftIdx++;
          addedThisRound = true;
        }
        
        if (rightImages[rightIdx]) {
          const media = createMediaElement(rightImages[rightIdx].src, rightImages[rightIdx].alt, rightImages[rightIdx].size, false, rightImages[rightIdx].noSound);
          console.log('=== APPENDING TO RIGHT COLUMN ===');
          console.log('Media element:', media);
          console.log('Media tagName:', media.tagName);
          console.log('Media className:', media.className);
          console.log('Media classList:', media.classList.toString());
          currentRightColumn.appendChild(media);
          console.log('After append - className:', media.className);
          console.log('After append - classList:', media.classList.toString());
          rightIdx++;
          addedThisRound = true;
        }
        
        if (addedThisRound) {
          totalItemsPlaced++; // Count this row of column images as 1
        } else {
          // No more images to add
          break;
        }
      }
    }
    
    // Add final columns if they have any content
    if (currentLeftColumn.children.length > 1 || currentRightColumn.children.length > 1) {
      let leftBottomSpacer = document.createElement('div');
      leftBottomSpacer.className = 'column-bottom-spacer';
      currentLeftColumn.appendChild(leftBottomSpacer);
      
      let rightBottomSpacer = document.createElement('div');
      rightBottomSpacer.className = 'column-bottom-spacer';
      currentRightColumn.appendChild(rightBottomSpacer);
      
      columnsDiv.appendChild(currentLeftColumn);
      columnsDiv.appendChild(currentRightColumn);
    }
    
    // Add bottom padding to the last full-width wrapper if it exists
    const lastFullWidth = columnsDiv.querySelector('.full-width-image-wrapper:last-child');
    if (lastFullWidth) {
      lastFullWidth.classList.add('last-full-width');
    }
    
    detailSection.appendChild(columnsDiv);
    main.appendChild(detailSection);
    
    return detailSection;
  }

  // Function to close project detail page
  function closeProjectDetail() {
    document.querySelectorAll('.project-detail').forEach(el => {
      el.classList.remove('active');
    });
    
    // Mute all videos when closing detail view
    document.querySelectorAll('.project-detail video').forEach(video => {
      video.muted = true;
    });
    
    // Reset all sound buttons to "SOUND OFF"
    document.querySelectorAll('.sound-toggle-button').forEach(button => {
      button.textContent = 'SOUND OFF';
    });
    
    // Restore center text to original description
    const centerText = document.querySelector('.mono.center');
    const arrow = document.getElementById('projectArrow');
    if (centerText && currentProjectName && projectDescriptions[currentProjectName]) {
      centerText.textContent = projectDescriptions[currentProjectName];
      // Reposition arrow after text change
      if (arrow) {
        setTimeout(() => {
          const textRect = centerText.getBoundingClientRect();
          const gap = window.innerHeight * ARROW_TEXT_GAP;
          const arrowTop = textRect.bottom + gap;
          arrow.style.top = arrowTop + 'px';
        }, 50);
      }
    }
    
    const circlesElement = document.getElementById('circlesRoot');
    // Show circles again
    if (circlesElement) {
      circlesElement.classList.remove('hide-circles');
    }
    // Change arrow back to forward direction
    updateArrowDirection(false);
    isDetailViewActive = false;
    // Don't clear currentProjectName - keep the state
    // Don't modify history here - let the click handler manage it
  }

  // Handle arrow click - detect clicks in arrow area
  let isNavigating = false;
  document.addEventListener('click', (e) => {
    // Get arrow position
    const arrow = document.getElementById('projectArrow');
    if (!arrow || arrow.style.display === 'none') return;
    
    // Check if click is on the arrow element itself or near it
    const isArrowElement = e.target.closest('#projectArrow, #arrowSvg, #arrowPath');
    
    // Check if click is near arrow position (center bottom of screen)
    const rect = arrow.getBoundingClientRect();
    const clickX = e.clientX;
    const clickY = e.clientY;
    const arrowX = rect.left + rect.width / 2;
    const arrowY = rect.top + rect.height / 2;
    
    // If click is within 40px of arrow center or on arrow element
    const distance = Math.sqrt(Math.pow(clickX - arrowX, 2) + Math.pow(clickY - arrowY, 2));
    if (distance < 40 || isArrowElement) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      if (isNavigating) return false;
      isNavigating = true;
      
      if (isDetailViewActive) {
        // Currently in detail view, go back to circles
        closeProjectDetail();
        // Don't touch history at all
      } else {
        // Currently in circle view, open detail
        if (activeProjectName && activeProjectName !== "WORK") {
          openProjectDetail(activeProjectName);
        }
      }
      
      setTimeout(() => { isNavigating = false; }, 300);
      return false;
    }
  }, true); // Use capture phase

  // Function to set exact spacer height based on last image
  function setSpacerHeights() {
    document.querySelectorAll('.project-column').forEach(column => {
      const topSpacer = column.querySelector('.column-top-spacer');
      const bottomSpacer = column.querySelector('.column-bottom-spacer');
      // Select ALL media elements: images, videos, PNG sequence images, and video wrappers
      const mediaElements = column.querySelectorAll('img:not(.png-sequence-frame), video, .png-sequence-frame, .video-wrapper');
      const isAfterBreak = column.classList.contains('after-break');
      
      console.log('=== PROCESSING COLUMN ===');
      console.log('Column classes:', column.className);
      console.log('Media elements found:', mediaElements.length);
      console.log('All media elements:', Array.from(mediaElements).map(el => ({
        tag: el.tagName,
        classes: el.className,
        offsetHeight: el.offsetHeight
      })));
      
      if (mediaElements.length > 0) {
        const firstMedia = mediaElements[0];
        const lastMedia = mediaElements[mediaElements.length - 1];
        
        const updateSpacers = () => {
          // Top spacer: Only apply responsive centering to first columns (not after-break)
          if (topSpacer) {
            if (isAfterBreak) {
              topSpacer.style.height = '0px';
            } else {
              let firstMediaHeight = firstMedia.offsetHeight;
              
              console.log('=== UPDATE TOP SPACER ===');
              console.log('First media element:', firstMedia);
              console.log('offsetHeight:', firstMediaHeight);
              
              // For videos, wait if height is 0
              if (firstMedia.tagName === 'VIDEO' && firstMediaHeight === 0 && firstMedia.readyState >= 1) {
                console.log('Video has metadata but no height yet, retrying...');
                setTimeout(updateSpacers, 50);
                return;
              }
              
              // For PNG sequences, wait if height is 0
              if (firstMedia.classList.contains('png-sequence-frame') && firstMediaHeight === 0) {
                console.log('PNG sequence frame has no height yet, retrying...');
                setTimeout(updateSpacers, 50);
                return;
              }
              
              // For video wrappers, use the actual video height
              if (firstMedia.classList.contains('video-wrapper')) {
                const actualVideo = firstMedia.querySelector('video');
                if (actualVideo) {
                  firstMediaHeight = actualVideo.offsetHeight;
                }
              }
              
              const topSpacerHeight = (window.innerHeight / 2) - (firstMediaHeight / 2);
              topSpacer.style.height = Math.max(0, topSpacerHeight) + 'px';
              console.log('TOP SPACER SET:', {
                element: firstMedia.tagName,
                mediaHeight: firstMediaHeight,
                windowHeight: window.innerHeight,
                spacerHeight: Math.max(0, topSpacerHeight)
              });
            }
          }
          
          // Bottom spacer
          if (bottomSpacer) {
            let lastMediaHeight = lastMedia.offsetHeight;
            
            if (lastMedia.tagName === 'VIDEO' && lastMediaHeight === 0 && lastMedia.readyState >= 1) {
              setTimeout(updateSpacers, 50);
              return;
            }
            
            const bottomSpacerHeight = (window.innerHeight / 2) - (lastMediaHeight / 2);
            bottomSpacer.style.height = Math.max(0, bottomSpacerHeight) + 'px';
          }
        };
        
        // Check if all media is loaded
        const checkLoaded = () => {
          return Array.from(mediaElements).every(element => {
            if (element.tagName === 'IMG') {
              return element.complete;
            } else if (element.tagName === 'VIDEO') {
              return element.readyState >= 1; // HAVE_METADATA
            } else {
              return element.offsetHeight > 0;
            }
          });
        };
        
        if (checkLoaded()) {
          updateSpacers();
        } else {
          // Wait for all media to load
          const promises = Array.from(mediaElements).map(element => {
            if (element.tagName === 'IMG') {
              if (element.complete) return Promise.resolve();
              return new Promise(resolve => {
                element.addEventListener('load', resolve, { once: true });
              });
            } else if (element.tagName === 'VIDEO') {
              if (element.readyState >= 1) return Promise.resolve();
              return new Promise(resolve => {
                element.addEventListener('loadedmetadata', resolve, { once: true });
              });
            } else {
              return Promise.resolve();
            }
          });
          
          Promise.all(promises).then(() => {
            // Add a small delay to ensure layout has settled
            setTimeout(updateSpacers, 100);
            // Also add another check after a bit more time for video containers
            setTimeout(updateSpacers, 300);
            setTimeout(updateSpacers, 500);
          });
        }
      }
    });
    
    // Handle first full-width image wrappers
    document.querySelectorAll('.full-width-image-wrapper.first-image').forEach(wrapper => {
      const media = wrapper.querySelector('.full-width-image, .video-container, .video-wrapper, video, .png-sequence-container, img');
      
      console.log('=== FIRST IMAGE WRAPPER ===');
      console.log('Wrapper:', wrapper);
      console.log('Media found:', media);
      console.log('Media tagName:', media?.tagName);
      
      if (media) {
        const updatePadding = () => {
          let mediaHeight = media.offsetHeight;
          
          // For videos, skip if no height yet
          if (media.tagName === 'VIDEO' && mediaHeight === 0 && media.readyState >= 1) {
            console.log('Video has metadata but no height yet, retrying...');
            setTimeout(updatePadding, 50);
            return;
          }
          
          if (mediaHeight === 0) {
            console.log('Media height is 0, skipping');
            return;
          }
          
          const paddingTop = (window.innerHeight / 2) - (mediaHeight / 2);
          console.log('Updating first-image padding:', {
            mediaHeight,
            windowHeight: window.innerHeight,
            paddingTop
          });
          wrapper.style.paddingTop = Math.max(0, paddingTop) + 'px';
        };
        
        // Check if media is loaded
        if (media.tagName === 'VIDEO') {
          console.log('Detected VIDEO, readyState:', media.readyState);
          if (media.readyState >= 1) {
            setTimeout(updatePadding, 50);
            setTimeout(updatePadding, 200);
            setTimeout(updatePadding, 400);
          } else {
            media.addEventListener('loadedmetadata', () => {
              console.log('VIDEO loadedmetadata event fired');
              setTimeout(updatePadding, 50);
              setTimeout(updatePadding, 200);
              setTimeout(updatePadding, 400);
            }, { once: true });
          }
        } else if (media.tagName === 'IMG') {
          console.log('Detected IMG, complete:', media.complete);
          if (media.complete) {
            updatePadding();
          } else {
            media.addEventListener('load', updatePadding, { once: true });
          }
        } else {
          console.log('Other element type');
          updatePadding();
        }
      }
    });
    
    // Handle last full-width image wrappers (add bottom padding)
    document.querySelectorAll('.full-width-image-wrapper.last-full-width').forEach(wrapper => {
      const media = wrapper.querySelector('.full-width-image, .video-container, .video-wrapper, video, .png-sequence-container, img');
      
      if (media) {
        const updatePadding = () => {
          let mediaHeight = media.offsetHeight;
          
          if (media.tagName === 'VIDEO' && mediaHeight === 0 && media.readyState >= 1) {
            setTimeout(updatePadding, 50);
            return;
          }
          
          if (mediaHeight === 0) return;
          
          const paddingBottom = (window.innerHeight / 2) - (mediaHeight / 2);
          wrapper.style.paddingBottom = Math.max(0, paddingBottom) + 'px';
        };
        
        if (media.tagName === 'VIDEO') {
          if (media.readyState >= 1) {
            setTimeout(updatePadding, 50);
            setTimeout(updatePadding, 200);
            setTimeout(updatePadding, 400);
          } else {
            media.addEventListener('loadedmetadata', () => {
              setTimeout(updatePadding, 50);
              setTimeout(updatePadding, 200);
              setTimeout(updatePadding, 400);
            }, { once: true });
          }
        } else if (media.tagName === 'IMG') {
          if (media.complete) {
            updatePadding();
          } else {
            media.addEventListener('load', updatePadding, { once: true });
          }
        } else {
          updatePadding();
        }
      }
    });
    
    // Fix margins for video-wrapper elements without sound buttons
    document.querySelectorAll('.project-column').forEach(column => {
      const wrappers = Array.from(column.querySelectorAll('.video-wrapper'));
      wrappers.forEach((wrapper, idx) => {
        // Check if this wrapper has a sound button
        const hasSoundButton = wrapper.querySelector('.sound-button-wrapper');
        
        // Only modify wrappers without sound buttons
        if (!hasSoundButton) {
          if (idx === wrappers.length - 1) {
            // Last wrapper in column gets no margin
            wrapper.style.marginBottom = '0';
          } else {
            // Not the last wrapper, add margin
            wrapper.style.marginBottom = '10vh';
          }
        }
      });
    });


  }

  // Pre-create all project detail sections on page load for smooth transitions
  Object.keys(projectDetailImages).forEach(projectName => {
    const projectId = projectNameToId(projectName);
    const existingSection = document.getElementById(projectId);
    // Remove existing section if it exists (to allow for config changes during development)
    if (existingSection) {
      existingSection.remove();
    }
    // Create new section from current config
    createProjectDetailSection(projectName, projectId);
  });

  // Function to reposition arrow based on text height
  function repositionArrow() {
    const centerText = document.querySelector('.mono.center');
    const arrow = document.getElementById('projectArrow');
    if (centerText && arrow && arrow.style.display !== 'none') {
      const textRect = centerText.getBoundingClientRect();
      const gap = window.innerHeight * ARROW_TEXT_GAP;
      const arrowTop = textRect.bottom + gap;
      arrow.style.top = arrowTop + 'px';
    }
  }

  // Set spacer heights initially and on resize
  setTimeout(setSpacerHeights, 100);
  window.addEventListener('resize', () => {
    setSpacerHeights();
    repositionArrow();
  });
  
  // Manual fix for Flodo.mp4 margin in FUN STUFF project
  setTimeout(() => {
    const funStuffDetail = document.getElementById('project-fun-stuff');
    if (funStuffDetail) {
      const flodoWrapper = Array.from(funStuffDetail.querySelectorAll('.video-wrapper')).find(wrapper => {
        const video = wrapper.querySelector('video');
        return video && video.src.includes('Flodo.mp4');
      });
      if (flodoWrapper) {
        flodoWrapper.style.marginBottom = '10vh';
      }
    }
  }, 500);
  
  // Update spacers when opening detail view
  const originalOpenDetail = openProjectDetail;
  openProjectDetail = function(projectName) {
    originalOpenDetail(projectName);
    setTimeout(setSpacerHeights, 100);
    
    // Re-apply Flodo.mp4 fix when opening FUN STUFF
    if (projectName === 'FUN STUFF') {
      setTimeout(() => {
        const funStuffDetail = document.getElementById('project-fun-stuff');
        if (funStuffDetail) {
          const flodoWrapper = Array.from(funStuffDetail.querySelectorAll('.video-wrapper')).find(wrapper => {
            const video = wrapper.querySelector('video');
            return video && video.src.includes('Flodo.mp4');
          });
          if (flodoWrapper) {
            flodoWrapper.style.marginBottom = '10vh';
          }
        }
      }, 200);
    }
  };
});
