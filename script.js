document.addEventListener("DOMContentLoaded", () => {
  const ROOT = document.querySelector(".circles");
  if (!ROOT) return;

  const circleEls = Array.from(ROOT.querySelectorAll(".circle"));

  // default start angle for the circle (radians)
  const DEFAULT_START_ANGLE = 0;
  // rotation speed in seconds (change this to adjust animation speed)
  const ROTATION_SPEED_SECONDS = 6;

  // Project descriptions - customize these texts for each project
  const projectDescriptions = {
    "FASHION SHOW 2025": "A COMPREHENSIVE VISUAL IDENTITY FOR THE 2025 FASHION SHOWCASE, FEATURING BOLD TYPOGRAPHY AND DYNAMIC LAYOUTS.",
    "VINYLS FOR BEXXX": "CUSTOM VINYL COVER DESIGNS MERGING EXPERIMENTAL AESTHETICS WITH CONTEMPORARY MUSIC CULTURE.",
    "AXIS MUSIC FESTIVAL": "BRAND IDENTITY AND PROMOTIONAL MATERIALS FOR AN IMMERSIVE ELECTRONIC MUSIC FESTIVAL EXPERIENCE.",
    "SYSTEMATIC POISON": "AN EXPERIMENTAL EDITORIAL PROJECT EXPLORING THEMES OF TOXICITY IN MODERN SYSTEMS THROUGH VISUAL STORYTELLING.",
    "FOLIO MAGAZIN": "EDITORIAL DESIGN FOR A CONTEMPORARY ARTS AND CULTURE MAGAZINE FEATURING INNOVATIVE LAYOUT SOLUTIONS.",
    "DADDY ISSUES": "A PROVOCATIVE ZINE SERIES EXAMINING CONTEMPORARY RELATIONSHIPS THROUGH GRAPHIC DESIGN AND TYPOGRAPHY.",
    "FUN STUFF": "A COLLECTION OF EXPERIMENTAL DESIGN PROJECTS, PERSONAL EXPLORATIONS, AND PLAYFUL VISUAL EXPERIMENTS.",
    "TRUTH": "A RESEARCH-DRIVEN DESIGN PROJECT INVESTIGATING THE VISUAL LANGUAGE OF TRUTH AND AUTHENTICITY.",
    "PROCESS JOURNAL": "DOCUMENTATION OF CREATIVE PROCESSES, SKETCHES, AND BEHIND-THE-SCENES INSIGHTS INTO DESIGN METHODOLOGY."
  };

  // Project background images - add your image paths here
  const projectImages = {
    "FASHION SHOW 2025": "images/fashion-show-2025.jpg",
    "VINYLS FOR BEXXX": "images/vinyls-bexxx.jpg",
    "AXIS MUSIC FESTIVAL": "images/axis-festival.png",
    "SYSTEMATIC POISON": "images/systematic-poison.jpg",
    "FOLIO MAGAZIN": "images/folio-magazin.jpg",
    "DADDY ISSUES": "images/daddy-issues.jpg",
    "FUN STUFF": "images/fun-stuff.jpg",
    "TRUTH": "images/truth.jpg",
    "PROCESS JOURNAL": "images/process-journal.jpg"
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
        { text: "Concept, Design", position: "20%", circleIndex: 0 },
        { text: "Animation", position: "22%", circleIndex: 1 },
        { text: "2025 with", position: "81%", circleIndex: 3 },
        { text: "Nora Eros and Margarethe Wirnsberger", position: "82%", circleIndex: 2 }
      ]
    },
    "VINYLS FOR BEXXX": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
hangingCircles: [2, 3],
      textParts: [
        { text: "2025 with", position: "25%", circleIndex: 0 },
        { text: "Nora Ertl and Margarethe Wirnsberger", position: "25%", circleIndex: 1 },
        { text: "2024", position: "75%", circleIndex: 2 },
        { text: "Music", position: "75%", circleIndex: 3 }
      ]
    },
    "AXIS MUSIC FESTIVAL": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Brand Identity", position: "25%", circleIndex: 0 },
        { text: "Digital Design", position: "25%", circleIndex: 1 },
        { text: "2024", position: "75%", circleIndex: 2 },
        { text: "Festival", position: "75%", circleIndex: 3 }
      ]
    },
    "SYSTEMATIC POISON": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Editorial", position: "25%", circleIndex: 0 },
        { text: "Typography", position: "25%", circleIndex: 1 },
        { text: "2023", position: "75%", circleIndex: 2 },
        { text: "Editorial", position: "75%", circleIndex: 3 }
      ]
    },
    "FOLIO MAGAZIN": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Layout Design", position: "25%", circleIndex: 0 },
        { text: "Art Direction", position: "25%", circleIndex: 1 },
        { text: "2024", position: "75%", circleIndex: 2 },
        { text: "Magazine", position: "75%", circleIndex: 3 }
      ]
    },
    "DADDY ISSUES": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Zine Design", position: "25%", circleIndex: 0 },
        { text: "Concept", position: "25%", circleIndex: 1 },
        { text: "2023", position: "75%", circleIndex: 2 },
        { text: "Zine", position: "75%", circleIndex: 3 }
      ]
    },
    "FUN STUFF": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Experiments", position: "25%", circleIndex: 0 },
        { text: "Personal Work", position: "25%", circleIndex: 1 },
        { text: "Various", position: "75%", circleIndex: 2 },
        { text: "Projects", position: "75%", circleIndex: 3 }
      ]
    },
    "TRUTH": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Research", position: "25%", circleIndex: 0 },
        { text: "Visual Design", position: "25%", circleIndex: 1 },
        { text: "2024", position: "75%", circleIndex: 2 },
        { text: "Research", position: "75%", circleIndex: 3 }
      ]
    },
    "PROCESS JOURNAL": {
      circleRadii: [0.935, 0.885, 0.95, 0.9],
      hangingCircles: [2, 3],
      textParts: [
        { text: "Documentation", position: "25%", circleIndex: 0 },
        { text: "Sketches", position: "25%", circleIndex: 1 },
        { text: "2023-2024", position: "75%", circleIndex: 2 },
        { text: "Documentation", position: "75%", circleIndex: 3 }
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

  // Function to update the center text
  function updateCenterText(projectName) {
    const centerText = document.querySelector(".mono.center");
    const arrow = document.getElementById("projectArrow");
    if (!centerText) return;
    
    const description = projectDescriptions[projectName] || "WORK";
    
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
          arrow.href = `project.html?name=${encodeURIComponent(projectName)}`;
          setTimeout(() => {
            arrow.style.opacity = "1";
          }, 100);
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
    
    const config = innerCirclesConfig[projectName];
    
    // If no project selected or no config, fade out
    if (!projectName || !config) {
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
        
        // Fade in opacity faster - reaches full opacity at 50% of rotation time
        const opacityProgress = Math.min(progress * 2.5, 1);
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
    
  // debug: circle setup info removed for production

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

    // Debug overlay: draw start/center/end markers and log metrics when ?debug is in the URL
    try {
  // debug overlay disabled in production; set to true for diagnostics
  const debug = false;
  if (debug) {
        const pathLen = path.getTotalLength();
        console.group('circle-debug');
        console.log('outerRadius', outerRadius, 'pathLen', pathLen, 'totalLabelLength', totalLabelLength, 'gap', gap);

  const dbg = document.createElementNS(svgNS, 'g');
        dbg.setAttribute('class', 'debug-overlay');
  // Append to rotating group so markers rotate with text
  group.appendChild(dbg);

        // compute starts/centers/ends again (same logic used above)
  let pos = gap / 2; // start at half-gap
        labels.forEach((l, i) => {
          const start = pos;
          const center = start + labelLengths[i] / 2;
          const end = start + labelLengths[i];
          pos += labelLengths[i] + gap;

          console.log(i, { text: l.text, start: Math.round(start), center: Math.round(center), end: Math.round(end), len: Math.round(labelLengths[i]) });

          const s = path.getPointAtLength(start + seamOffset);
          const c = path.getPointAtLength(center + seamOffset);
          const e = path.getPointAtLength(end + seamOffset);
          // Also sample the text-only path (if present) to show seam buffer
          let ts = null, tc = null, te = null;
          try {
            const textPathNode = defs.querySelector(`#${textPathRef}`);
            if (textPathNode) {
              ts = textPathNode.getPointAtLength(start + textSeam);
              tc = textPathNode.getPointAtLength(center + textSeam);
              te = textPathNode.getPointAtLength(end + textSeam);
            }
          } catch (err) { /* ignore */ }

          // start marker (red)
          const ms = document.createElementNS(svgNS, 'circle');
          ms.setAttribute('cx', s.x);
          ms.setAttribute('cy', s.y);
          ms.setAttribute('r', 4);
          ms.setAttribute('fill', 'rgba(220,50,50,0.9)');
          dbg.appendChild(ms);

          // center marker (green)
          const mc = document.createElementNS(svgNS, 'circle');
          mc.setAttribute('cx', c.x);
          mc.setAttribute('cy', c.y);
          mc.setAttribute('r', 3);
          mc.setAttribute('fill', 'rgba(50,180,50,0.9)');
          dbg.appendChild(mc);

          // text-path markers (small blue) so we can verify seam buffer
          if (tc) {
            const tmc = document.createElementNS(svgNS, 'circle');
            tmc.setAttribute('cx', tc.x);
            tmc.setAttribute('cy', tc.y);
            tmc.setAttribute('r', 2);
            tmc.setAttribute('fill', 'rgba(30,120,200,0.9)');
            dbg.appendChild(tmc);
          }

          // end marker (blue)
          const me = document.createElementNS(svgNS, 'circle');
          me.setAttribute('cx', e.x);
          me.setAttribute('cy', e.y);
          me.setAttribute('r', 4);
          me.setAttribute('fill', 'rgba(50,100,220,0.9)');
          dbg.appendChild(me);

          // draw thin tick at section boundary after each label (for visualizing sections)
          const boundaryAngle = startAngle + ((end + gap) / circumference) * 2 * Math.PI; // end of label + gap boundary
          const bx0 = cx + (outerRadius - 6) * Math.cos(boundaryAngle);
          const by0 = cy + (outerRadius - 6) * Math.sin(boundaryAngle);
          const bx1 = cx + (outerRadius + 6) * Math.cos(boundaryAngle);
          const by1 = cy + (outerRadius + 6) * Math.sin(boundaryAngle);
          const tick = document.createElementNS(svgNS, 'line');
          tick.setAttribute('x1', bx0);
          tick.setAttribute('y1', by0);
          tick.setAttribute('x2', bx1);
          tick.setAttribute('y2', by1);
          tick.setAttribute('stroke', 'rgba(0,0,0,0.25)');
          tick.setAttribute('stroke-width', '1');
          dbg.appendChild(tick);
        });
        console.groupEnd('circle-debug');
      }
    } catch (err) {
      console.warn('debug overlay error', err);
    }

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
    resizeTimer = setTimeout(() => circles.forEach(c => c.recompute()), 100);
  });

  // Click outside circle to reset to "WORK"
  document.addEventListener("click", (e) => {
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
});
