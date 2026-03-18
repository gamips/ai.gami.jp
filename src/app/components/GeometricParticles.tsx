import { useEffect, useRef } from "react";
import * as THREE from "three";

export function GeometricParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle count
    const particleCount = 3000;
    const dnaParticlesPerStrand = Math.floor(particleCount * 0.18);
    const dnaVisibleParticles = dnaParticlesPerStrand * 2;
    const dnaRadius = 18;
    const dnaDepthRadius = 10;
    const dnaHeight = 96;
    const dnaTurns = 4.5;
    const octahedronShellRadii = [34, 15];
    const service3ShellConfigs = [
      { radius: 38, latitudeBands: 30, longitudeBands: 48 },
      { radius: 19, latitudeBands: 20, longitudeBands: 34 },
    ];
    const service2RingParticles = Math.floor(particleCount * 0.5);
    const service2NumRings = 12;
    const service2ParticlesPerRing = Math.floor(service2RingParticles / service2NumRings);
    const service2OrangeRingIndex = Math.floor(service2NumRings / 2);
    const ctaRingConfigs = [
      { radius: 28, count: 380, depth: 4, phase: 0, yOffset: 6, rotationSpeed: 0.22 },
      { radius: 40, count: 470, depth: 6, phase: Math.PI / 3, yOffset: 6, rotationSpeed: 0.17 },
      { radius: 54, count: 550, depth: 8, phase: Math.PI / 1.7, yOffset: 6, rotationSpeed: 0.13 },
    ];
    const getWeightedCounts = (weights: number[]) => {
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      let assigned = 0;

      return weights.map((weight, index) => {
        if (index === weights.length - 1) {
          return particleCount - assigned;
        }

        const count = Math.round((particleCount * weight) / totalWeight);
        assigned += count;
        return count;
      });
    };
    const octahedronShellCounts = getWeightedCounts(octahedronShellRadii.map((radius) => radius * radius));
    const octahedronInnerShellStart = octahedronShellCounts[0];
    const service3ShellCounts = getWeightedCounts(
      service3ShellConfigs.map(({ latitudeBands, longitudeBands }) => latitudeBands * longitudeBands),
    );
    const service3InnerShellStart = service3ShellCounts[0];
    const ctaRingRanges = ctaRingConfigs.map((config, ringIndex) => {
      const start =
        ringIndex === 0
          ? 0
          : ctaRingConfigs
              .slice(0, ringIndex)
              .reduce((sum, previousConfig) => sum + previousConfig.count, 0);
      return { start, end: start + config.count };
    });
    const positions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    // Shape generators (defined early so we can use them for initialization)
    const createGeometricGrid = () => {
      const positions = new Float32Array(particleCount * 3);
      const gridSize = Math.ceil(Math.cbrt(particleCount));
      const spacing = 80 / gridSize;
      
      // Shuffle indices for randomness
      const indices = Array.from({ length: particleCount }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      
      for (let i = 0; i < particleCount; i++) {
        const idx = indices[i];
        const x = (idx % gridSize) - gridSize / 2;
        const y = Math.floor(idx / gridSize) % gridSize - gridSize / 2;
        const z = Math.floor(idx / (gridSize * gridSize)) - gridSize / 2;
        
        positions[i * 3] = x * spacing;
        positions[i * 3 + 1] = y * spacing;
        positions[i * 3 + 2] = z * spacing;
      }
      return positions;
    };

    // Initialize positions with geometric grid (not random)
    const initialShape = createGeometricGrid();
    // Store the initial shape to reuse when returning to section 0
    const savedInitialShape = new Float32Array(initialShape);
    
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = initialShape[i];
      targetPositions[i] = initialShape[i];
      velocities[i] = (Math.random() - 0.5) * 0.02;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Add custom attributes for depth-based opacity
    const alphas = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      alphas[i] = 1.0;
    }
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    const defaultParticleColor = new THREE.Color(0xd4d4d8);
    const conceptBlueColor = new THREE.Color(0x06b6d4);
    const conceptOrangeColor = new THREE.Color(0xf97316);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      colors[i * 3] = defaultParticleColor.r;
      colors[i * 3 + 1] = defaultParticleColor.g;
      colors[i * 3 + 2] = defaultParticleColor.b;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create circular particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    
    // Solid circle without blur
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.beginPath();
    ctx.arc(16, 16, 8, 0, Math.PI * 2);
    ctx.fill();
    
    const particleTexture = new THREE.CanvasTexture(canvas);

    // Particle material with circular texture
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      map: particleTexture,
      depthWrite: false,
      vertexColors: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const createDNAHelix = () => {
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        if (i < dnaParticlesPerStrand * 2) {
          const strand = i < dnaParticlesPerStrand ? 0 : 1;
          const strandIndex = strand === 0 ? i : i - dnaParticlesPerStrand;
          const progress =
            dnaParticlesPerStrand > 1 ? strandIndex / (dnaParticlesPerStrand - 1) : 0;
          const angle = progress * Math.PI * 2 * dnaTurns + strand * Math.PI;
          const y = (progress - 0.5) * dnaHeight;

          positions[i * 3] = Math.cos(angle) * dnaRadius;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = Math.sin(angle) * dnaDepthRadius;
        } else {
          // Move other particles to random off-screen positions
          const angle = Math.random() * Math.PI * 2;
          const distance = 500 + Math.random() * 500;
          const elevation = (Math.random() - 0.5) * 1000;
          
          positions[i * 3] = Math.cos(angle) * distance;
          positions[i * 3 + 1] = elevation;
          positions[i * 3 + 2] = Math.sin(angle) * distance;
        }
      }
      return positions;
    };

    const createGeometricOctahedron = () => {
      const positions = new Float32Array(particleCount * 3);
      const xOffset = 28;
      const faceVertexSets = octahedronShellRadii.flatMap((radius) => {
        const top = new THREE.Vector3(0, radius, 0);
        const bottom = new THREE.Vector3(0, -radius, 0);
        const right = new THREE.Vector3(radius, 0, 0);
        const left = new THREE.Vector3(-radius, 0, 0);
        const front = new THREE.Vector3(0, 0, radius);
        const back = new THREE.Vector3(0, 0, -radius);

        return [
          [top, right, front],
          [top, front, left],
          [top, left, back],
          [top, back, right],
          [bottom, front, right],
          [bottom, left, front],
          [bottom, back, left],
          [bottom, right, back],
        ] as const;
      });

      let currentParticleIndex = 0;

      octahedronShellRadii.forEach((radius, shellIndex) => {
        const shellParticleCount = octahedronShellCounts[shellIndex];
        const faces = faceVertexSets.slice(shellIndex * 8, shellIndex * 8 + 8);
        const particlesPerFace = Math.floor(shellParticleCount / faces.length);
        const faceRemainder = shellParticleCount % faces.length;

        faces.forEach((face, faceIndex) => {
          const faceParticleCount = particlesPerFace + (faceIndex < faceRemainder ? 1 : 0);
          let resolution = 2;
          while ((resolution * (resolution + 1)) / 2 < faceParticleCount) {
            resolution += 1;
          }

          let faceParticleIndex = 0;

          for (let row = 0; row < resolution && faceParticleIndex < faceParticleCount; row++) {
            const rowRatio = resolution > 1 ? row / (resolution - 1) : 0;
            const pointsInRow = resolution - row;

            for (
              let column = 0;
              column < pointsInRow && faceParticleIndex < faceParticleCount;
              column++
            ) {
              const along = pointsInRow > 1 ? column / (pointsInRow - 1) : 0.5;
              const weightA = rowRatio;
              const remainingWeight = 1 - weightA;
              const weightB = remainingWeight * along;
              const weightC = remainingWeight - weightB;

              const point = face[0]
                .clone()
                .multiplyScalar(weightA)
                .add(face[1].clone().multiplyScalar(weightB))
                .add(face[2].clone().multiplyScalar(weightC));

              positions[currentParticleIndex * 3] = point.x + xOffset;
              positions[currentParticleIndex * 3 + 1] = point.y;
              positions[currentParticleIndex * 3 + 2] = point.z;
              currentParticleIndex += 1;
              faceParticleIndex += 1;
            }
          }
        });
      });

      while (currentParticleIndex < particleCount) {
        positions[currentParticleIndex * 3] = xOffset;
        positions[currentParticleIndex * 3 + 1] = 0;
        positions[currentParticleIndex * 3 + 2] = 0;
        currentParticleIndex += 1;
      }

      return positions;
    };

    const createArrow = () => {
      const positions = new Float32Array(particleCount * 3);
      
      // Shuffle indices for randomness
      const indices = Array.from({ length: particleCount }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      
      // Create elliptical rings stacked vertically
      const ringParticles = service2RingParticles;
      const numRings = service2NumRings;
      const particlesPerRing = service2ParticlesPerRing;
      const radiusX = 35; // Horizontal radius (increased from 25)
      const radiusZ = 18; // Depth radius (increased from 12)
      const xOffset = -20; // Shift to the left
      
      for (let i = 0; i < particleCount; i++) {
        if (i < ringParticles) {
          const ringIndex = Math.floor(i / particlesPerRing);
          const particleInRing = i % particlesPerRing;
          
          // Distribute particles evenly around the ellipse
          const angle = (particleInRing / particlesPerRing) * Math.PI * 2;
          
          const x = Math.cos(angle) * radiusX;
          const z = Math.sin(angle) * radiusZ;
          const y = (ringIndex - numRings / 2) * 6; // Vertical spacing between rings
          
          positions[i * 3] = x + xOffset;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;
        } else {
          // Move other particles to random off-screen positions
          const angle = Math.random() * Math.PI * 2;
          const distance = 500 + Math.random() * 500;
          const elevation = (Math.random() - 0.5) * 1000;
          
          positions[i * 3] = Math.cos(angle) * distance;
          positions[i * 3 + 1] = elevation;
          positions[i * 3 + 2] = Math.sin(angle) * distance;
        }
      }
      return positions;
    };

    const createGeometricSphereShell = () => {
      const positions = new Float32Array(particleCount * 3);
      const xOffset = 24;
      let currentParticleIndex = 0;

      service3ShellConfigs.forEach((config, shellIndex) => {
        const shellParticleCount = service3ShellCounts[shellIndex];
        const gridPointCount = config.latitudeBands * config.longitudeBands;

        for (let i = 0; i < shellParticleCount; i++) {
          const normalizedIndex = shellParticleCount > 1 ? i / (shellParticleCount - 1) : 0;
          const gridIndex = Math.floor(normalizedIndex * (gridPointCount - 1));
          const latitudeIndex = Math.floor(gridIndex / config.longitudeBands);
          const longitudeIndex = gridIndex % config.longitudeBands;
          const polar = ((latitudeIndex + 0.5) / config.latitudeBands) * Math.PI;
          const azimuthOffset = (latitudeIndex % 2) * (Math.PI / config.longitudeBands);
          const azimuth = (longitudeIndex / config.longitudeBands) * Math.PI * 2 + azimuthOffset;

          const x = Math.sin(polar) * Math.cos(azimuth) * config.radius;
          const y = Math.cos(polar) * config.radius;
          const z = Math.sin(polar) * Math.sin(azimuth) * config.radius;

          positions[currentParticleIndex * 3] = x + xOffset;
          positions[currentParticleIndex * 3 + 1] = y;
          positions[currentParticleIndex * 3 + 2] = z;
          currentParticleIndex += 1;
        }
      });

      while (currentParticleIndex < particleCount) {
        positions[currentParticleIndex * 3] = xOffset;
        positions[currentParticleIndex * 3 + 1] = 0;
        positions[currentParticleIndex * 3 + 2] = 0;
        currentParticleIndex += 1;
      }

      return positions;
    };

    const createEncirclingOrbit = () => {
      const positions = new Float32Array(particleCount * 3);
      let currentParticleIndex = 0;

      ctaRingConfigs.forEach((config, ringIndex) => {
        for (let i = 0; i < config.count && currentParticleIndex < particleCount; i++) {
          const progress = i / config.count;
          const angle = progress * Math.PI * 2;
          const pulseOffset = ringIndex % 2 === 0 ? 1 : -1;
          const x = Math.cos(angle) * config.radius;
          const y = Math.sin(angle) * config.radius + config.yOffset;
          const z = Math.sin(angle * 3 + config.phase) * config.depth * pulseOffset;

          positions[currentParticleIndex * 3] = x;
          positions[currentParticleIndex * 3 + 1] = y;
          positions[currentParticleIndex * 3 + 2] = z;
          currentParticleIndex += 1;
        }
      });

      while (currentParticleIndex < particleCount) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 420 + Math.random() * 260;
        positions[currentParticleIndex * 3] = Math.cos(angle) * distance;
        positions[currentParticleIndex * 3 + 1] = (Math.random() - 0.5) * 960;
        positions[currentParticleIndex * 3 + 2] = Math.sin(angle) * distance;
        currentParticleIndex += 1;
      }

      return positions;
    };

    const createRandom = () => {
      const positions = new Float32Array(particleCount * 3);
      const gridSize = Math.ceil(Math.cbrt(particleCount));
      const spacing = 80 / gridSize;
      
      // Shuffle indices for randomness
      const indices = Array.from({ length: particleCount }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      
      for (let i = 0; i < particleCount; i++) {
        const idx = indices[i];
        const x = (idx % gridSize) - gridSize / 2;
        const y = Math.floor(idx / gridSize) % gridSize - gridSize / 2;
        const z = Math.floor(idx / (gridSize * gridSize)) - gridSize / 2;
        
        // Scatter but maintain some grid structure
        positions[i * 3] = x * spacing + (Math.random() - 0.5) * spacing * 0.8;
        positions[i * 3 + 1] = y * spacing + (Math.random() - 0.5) * spacing * 0.8;
        positions[i * 3 + 2] = z * spacing + (Math.random() - 0.5) * spacing * 0.8;
      }
      return positions;
    };

    const shapes = [
      createGeometricGrid,
      createDNAHelix,
      createGeometricOctahedron,
      createArrow,
      createGeometricSphereShell,
      createRandom,
      createEncirclingOrbit,
    ];

    let currentShapeIndex = 0;
    let morphProgress = 0;

    // Scroll handling
    const handleScroll = () => {
      // Section IDs to check
      const sectionIds = ['hero', 'concept', 'service-1', 'service-2', 'service-3', 'news', 'cta'];
      const newsShapeIndex = sectionIds.indexOf('news');
      
      // Keep the current shape unless a section explicitly takes over.
      let currentSection = currentShapeIndex;
      const viewportCenter = window.innerHeight / 2;
      
      for (let i = 0; i < sectionIds.length; i++) {
        const element = document.getElementById(sectionIds[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (sectionIds[i] === 'cta') {
            const ctaContent = document.getElementById('cta-content');
            const ctaContentTop = ctaContent?.getBoundingClientRect().top ?? rect.top;
            if (rect.top < viewportCenter && rect.bottom > viewportCenter) {
              currentSection = ctaContentTop <= viewportCenter ? i : newsShapeIndex;
            }
            continue;
          }

          if (rect.top < viewportCenter && rect.bottom > viewportCenter) {
            currentSection = i;
          }
        }
      }
      
      if (currentSection !== currentShapeIndex && currentSection < shapes.length) {
        currentShapeIndex = currentSection;
        morphProgress = 0;
        
        // Generate new target positions safely
        // For section 0, use the saved initial shape instead of regenerating
        let newTargets: Float32Array;
        if (currentSection === 0) {
          newTargets = savedInitialShape;
        } else {
          const shapeGenerator = shapes[currentSection];
          if (typeof shapeGenerator === 'function') {
            newTargets = shapeGenerator();
          } else {
            return;
          }
        }
        
        for (let i = 0; i < particleCount * 3; i++) {
          targetPositions[i] = newTargets[i];
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const positionAttribute = geometry.getAttribute('position');
      const positions = positionAttribute.array as Float32Array;
      const alphaAttribute = geometry.getAttribute('alpha');
      const alphas = alphaAttribute.array as Float32Array;
      const colorAttribute = geometry.getAttribute('color');
      const colors = colorAttribute.array as Float32Array;

      // Morph towards target and update depth-based opacity
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        
        // Position morphing with a custom rotation for SERVICE01 section
        let baseX = targetPositions[idx];
        let baseY = targetPositions[idx + 1];
        let baseZ = targetPositions[idx + 2];
        
        // Apply octahedron rotation if we're in SERVICE01 (shape index 2)
        if (currentShapeIndex === 2) {
          const xOffset = 28;
          const time = Date.now() * 0.0008;
          const rotationY = time;
          const rotationX = time * 0.55;

          const relX = baseX - xOffset;
          const relY = baseY;
          const relZ = baseZ;

          const cosY = Math.cos(rotationY);
          const sinY = Math.sin(rotationY);
          const rotatedX = relX * cosY - relZ * sinY;
          const rotatedZ = relX * sinY + relZ * cosY;

          const cosX = Math.cos(rotationX);
          const sinX = Math.sin(rotationX);
          const finalY = relY * cosX - rotatedZ * sinX;
          const finalZ = relY * sinX + rotatedZ * cosX;

          baseX = rotatedX + xOffset;
          baseY = finalY;
          baseZ = finalZ;
        }
        
        // Apply upward movement animation for SERVICE02 (shape index 3)
        if (currentShapeIndex === 3) {
          const ringParticles = service2RingParticles;
          const numRings = service2NumRings;
          const particlesPerRing = service2ParticlesPerRing;
          const radiusX = 35; // Updated to match createArrow
          const radiusZ = 18; // Updated to match createArrow
          const xOffset = -20; // Shift to the left (same as in createArrow)
          
          if (i < ringParticles) {
            const ringIndex = Math.floor(i / particlesPerRing);
            const particleInRing = i % particlesPerRing;
            
            const time = Date.now() * 0.001;
            
            // Each ring rotates at different speeds
            const rotationSpeed = 0.5 + ringIndex * 0.05;
            const rotationAngle = time * rotationSpeed;
            
            // Original angle of particle in the ellipse
            const baseAngle = (particleInRing / particlesPerRing) * Math.PI * 2;
            const currentAngle = baseAngle + rotationAngle;
            
            // Rotate particle around the ellipse
            const x = Math.cos(currentAngle) * radiusX + xOffset;
            const z = Math.sin(currentAngle) * radiusZ;
            const y = (ringIndex - numRings / 2) * 6;
            
            baseX = x;
            baseY = y;
            baseZ = z;
          }
        }

        if (currentShapeIndex === 6) {
          const time = Date.now() * 0.001;

          for (let ringIndex = 0; ringIndex < ctaRingRanges.length; ringIndex++) {
            const ringRange = ctaRingRanges[ringIndex];
            if (i < ringRange.start || i >= ringRange.end) {
              continue;
            }

            const config = ctaRingConfigs[ringIndex];
            const localIndex = i - ringRange.start;
            const progress = localIndex / config.count;
            const direction = ringIndex % 2 === 0 ? 1 : -1;
            const angle =
              progress * Math.PI * 2 + time * config.rotationSpeed * direction;

            baseX = Math.cos(angle) * config.radius;
            baseY = Math.sin(angle) * config.radius + config.yOffset;
            baseZ =
              Math.sin(angle * 3 + config.phase + time * 0.35 * direction) * config.depth;
            break;
          }
        }
        
        // Position morphing
        const diffX = baseX - positions[idx];
        const diffY = baseY - positions[idx + 1];
        const diffZ = baseZ - positions[idx + 2];
        
        // Perfect alignment without velocity drift for all sections
        positions[idx] += diffX * 0.05;
        positions[idx + 1] += diffY * 0.05;
        positions[idx + 2] += diffZ * 0.05;

        let targetColorR = defaultParticleColor.r;
        let targetColorG = defaultParticleColor.g;
        let targetColorB = defaultParticleColor.b;

        if (currentShapeIndex === 1) {
          if (i < dnaParticlesPerStrand) {
            targetColorR = conceptBlueColor.r;
            targetColorG = conceptBlueColor.g;
            targetColorB = conceptBlueColor.b;
          } else if (i < dnaParticlesPerStrand * 2) {
            targetColorR = conceptOrangeColor.r;
            targetColorG = conceptOrangeColor.g;
            targetColorB = conceptOrangeColor.b;
          }
        }

        if (currentShapeIndex === 2 && i >= octahedronInnerShellStart) {
          targetColorR = conceptOrangeColor.r;
          targetColorG = conceptOrangeColor.g;
          targetColorB = conceptOrangeColor.b;
        }

        if (currentShapeIndex === 3 && i < service2RingParticles) {
          const ringIndex = Math.floor(i / service2ParticlesPerRing);
          if (ringIndex === service2OrangeRingIndex) {
            targetColorR = conceptOrangeColor.r;
            targetColorG = conceptOrangeColor.g;
            targetColorB = conceptOrangeColor.b;
          }
        }

        if (currentShapeIndex === 4 && i >= service3InnerShellStart) {
          targetColorR = conceptOrangeColor.r;
          targetColorG = conceptOrangeColor.g;
          targetColorB = conceptOrangeColor.b;
        }

        colors[idx] += (targetColorR - colors[idx]) * 0.08;
        colors[idx + 1] += (targetColorG - colors[idx + 1]) * 0.08;
        colors[idx + 2] += (targetColorB - colors[idx + 2]) * 0.08;
        
        // Depth-based opacity (particles closer to camera are MORE transparent)
        const z = positions[idx + 2];
        const distanceFromCamera = Math.abs(z - 50); // Camera is at z=50
        const maxDistance = 50;
        // Closer particles (smaller distance) are more transparent, farther particles are more opaque
        const depthFade = Math.min(distanceFromCamera / maxDistance, 1.0);
        alphas[i] = Math.max(0.1, depthFade);
      }

      positionAttribute.needsUpdate = true;
      alphaAttribute.needsUpdate = true;
      colorAttribute.needsUpdate = true;

      // Rotate particles slowly when the monument benefits from depth.
      if (currentShapeIndex !== 2 && currentShapeIndex !== 3 && currentShapeIndex !== 6) {
        particles.rotation.y += 0.001;
      } else if (currentShapeIndex === 6) {
        particles.rotation.y = 0;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
