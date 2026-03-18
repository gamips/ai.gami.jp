import { useEffect, useRef } from "react";
import * as THREE from "three";

export function WebGLBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create main morphing shape
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    // Initialize particle positions - fluid blob
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.5 + Math.random() * 0.5;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      targetPositions[i3] = positions[i3];
      targetPositions[i3 + 1] = positions[i3 + 1];
      targetPositions[i3 + 2] = positions[i3 + 2];

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Create connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * 2 * 3);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });

    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    // Shape generation functions
    const generateFaceShape = (positions: Float32Array) => {
      // 3D Human face structure with depth
      let index = 0;
      
      // Face base - 3D ellipsoid shape
      const faceParticles = Math.floor(particleCount * 0.35);
      for (let i = 0; i < faceParticles; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        // Ellipsoid parameters for head shape
        const radiusX = 1.2;
        const radiusY = 1.5;
        const radiusZ = 1.0;
        
        const x = radiusX * Math.sin(phi) * Math.cos(theta);
        const y = radiusY * Math.sin(phi) * Math.sin(theta);
        const z = radiusZ * Math.cos(phi);
        
        // Only use front half of the head
        if (z > -0.3) {
          positions[index * 3] = x;
          positions[index * 3 + 1] = y;
          positions[index * 3 + 2] = z;
          index++;
        }
      }
      
      // Left eye - 3D spherical shape with depth
      const eyeParticles = Math.floor(particleCount * 0.1);
      for (let i = 0; i < eyeParticles; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 0.2;
        
        const x = -0.45 + radius * Math.sin(phi) * Math.cos(theta);
        const y = 0.35 + radius * Math.sin(phi) * Math.sin(theta);
        const z = 0.8 + radius * Math.cos(phi) * 0.5;
        
        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;
        index++;
      }
      
      // Right eye - 3D spherical shape with depth
      for (let i = 0; i < eyeParticles; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 0.2;
        
        const x = 0.45 + radius * Math.sin(phi) * Math.cos(theta);
        const y = 0.35 + radius * Math.sin(phi) * Math.sin(theta);
        const z = 0.8 + radius * Math.cos(phi) * 0.5;
        
        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;
        index++;
      }
      
      // Nose - 3D pyramidal structure
      const noseParticles = Math.floor(particleCount * 0.08);
      for (let i = 0; i < noseParticles; i++) {
        const t = i / noseParticles;
        const width = 0.15 * (1 - t);
        const height = 0.6;
        
        const x = (Math.random() - 0.5) * width;
        const y = 0.2 - t * height;
        const z = 0.7 + t * 0.6;
        
        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;
        index++;
      }
      
      // Mouth - 3D curved surface
      const mouthParticles = Math.floor(particleCount * 0.12);
      for (let i = 0; i < mouthParticles; i++) {
        const angle = ((i / mouthParticles) - 0.5) * Math.PI * 0.7;
        const radius = 0.6;
        
        const x = Math.sin(angle) * radius;
        const y = -0.5 - Math.cos(angle) * 0.2;
        const z = 0.6 + Math.cos(angle) * 0.3;
        
        // Add some particles for thickness
        const depthVariation = (Math.random() - 0.5) * 0.15;
        
        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z + depthVariation;
        index++;
      }
      
      // Eyebrows - 3D curved lines
      const browParticles = Math.floor(particleCount * 0.06);
      for (let i = 0; i < browParticles; i++) {
        const side = i < browParticles / 2 ? -1 : 1;
        const t = (i % (browParticles / 2)) / (browParticles / 2);
        const curve = Math.sin(t * Math.PI) * 0.1;
        
        const x = side * (0.3 + t * 0.4);
        const y = 0.65 + curve;
        const z = 0.8 - t * 0.2;
        
        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;
        index++;
      }
      
      // Cheekbones - add depth to face
      const cheekParticles = Math.floor(particleCount * 0.08);
      for (let i = 0; i < cheekParticles; i++) {
        const side = i < cheekParticles / 2 ? -1 : 1;
        const t = (i % (cheekParticles / 2)) / (cheekParticles / 2);
        
        const x = side * (0.7 + (Math.random() - 0.5) * 0.2);
        const y = 0.1 - t * 0.3;
        const z = 0.5 + Math.random() * 0.3;
        
        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;
        index++;
      }
      
      // Fill remaining particles - facial features
      while (index < particleCount) {
        const x = (Math.random() - 0.5) * 2.2;
        const y = (Math.random() - 0.5) * 2.6;
        
        // Calculate z based on ellipsoid surface
        const normalizedX = x / 1.2;
        const normalizedY = y / 1.5;
        const distSq = normalizedX * normalizedX + normalizedY * normalizedY;
        
        if (distSq < 1) {
          const z = Math.sqrt(1 - distSq) * 0.8 + (Math.random() - 0.5) * 0.3;
          
          if (z > -0.2) {
            positions[index * 3] = x;
            positions[index * 3 + 1] = y;
            positions[index * 3 + 2] = z;
            index++;
          }
        }
      }
    };

    const generateWorkflowNetwork = (positions: Float32Array) => {
      // Create nodes in a workflow pattern
      const layers = 5;
      const nodesPerLayer = particleCount / layers;
      
      for (let i = 0; i < particleCount; i++) {
        const layer = Math.floor(i / nodesPerLayer);
        const nodeInLayer = i % nodesPerLayer;
        const layerProgress = layer / (layers - 1);
        
        positions[i * 3] = (Math.random() - 0.5) * 4;
        positions[i * 3 + 1] = (layerProgress - 0.5) * 3;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      }
    };

    const generateCodeStructure = (positions: Float32Array) => {
      // Grid-like code structure
      const gridSize = Math.cbrt(particleCount);
      
      for (let i = 0; i < particleCount; i++) {
        const x = (i % gridSize) / gridSize;
        const y = (Math.floor(i / gridSize) % gridSize) / gridSize;
        const z = Math.floor(i / (gridSize * gridSize)) / gridSize;
        
        positions[i * 3] = (x - 0.5) * 4;
        positions[i * 3 + 1] = (y - 0.5) * 4;
        positions[i * 3 + 2] = (z - 0.5) * 2 + Math.sin(x * 10) * 0.3;
      }
    };

    const generateDataFlow = (positions: Float32Array, t: number) => {
      // Upward flowing data streams
      for (let i = 0; i < particleCount; i++) {
        const streamIndex = i % 10;
        const positionInStream = i / particleCount;
        
        const angle = (streamIndex / 10) * Math.PI * 2;
        const radius = 1 + Math.sin(positionInStream * Math.PI * 4 + t) * 0.5;
        
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = (positionInStream - 0.5) * 5;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
      }
    };

    const generateWebGlobe = (positions: Float32Array) => {
      // Sphere with latitude/longitude lines
      for (let i = 0; i < particleCount; i++) {
        const theta = (i / particleCount) * Math.PI * 2 * 10;
        const phi = Math.acos(2 * (i / particleCount) - 1);
        const radius = 2;

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
      }
    };

    // Update target positions based on scroll
    const updateTargetPositions = (scrollProgress: number) => {
      const section = Math.floor(scrollProgress * 5);
      
      switch (section) {
        case 0: // MV - Face shape
          generateFaceShape(targetPositions);
          break;
        case 1: // CONCEPT - Workflow network
          generateWorkflowNetwork(targetPositions);
          break;
        case 2: // SERVICE 01 - Code structure
          generateCodeStructure(targetPositions);
          break;
        case 3: // SERVICE 02 - Data flow
          generateDataFlow(targetPositions, Date.now() * 0.001);
          break;
        case 4: // SERVICE 03 - Web globe
          generateWebGlobe(targetPositions);
          break;
        default:
          generateFaceShape(targetPositions);
      }
    };

    // Scroll handler
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current = Math.min(scrollTop / docHeight, 1);
    };

    window.addEventListener("scroll", handleScroll);

    // Update connecting lines
    const updateLines = () => {
      const positions = particles.attributes.position.array as Float32Array;
      const linePos = lineGeometry.attributes.position.array as Float32Array;
      let lineIndex = 0;

      // Connect nearby particles
      for (let i = 0; i < particleCount && lineIndex < linePositions.length; i++) {
        const x1 = positions[i * 3];
        const y1 = positions[i * 3 + 1];
        const z1 = positions[i * 3 + 2];

        // Find closest particles
        for (let j = i + 1; j < particleCount && lineIndex < linePositions.length - 6; j++) {
          const x2 = positions[j * 3];
          const y2 = positions[j * 3 + 1];
          const z2 = positions[j * 3 + 2];

          const distance = Math.sqrt(
            Math.pow(x2 - x1, 2) +
            Math.pow(y2 - y1, 2) +
            Math.pow(z2 - z1, 2)
          );

          if (distance < 0.3 && Math.random() > 0.95) {
            linePos[lineIndex++] = x1;
            linePos[lineIndex++] = y1;
            linePos[lineIndex++] = z1;
            linePos[lineIndex++] = x2;
            linePos[lineIndex++] = y2;
            linePos[lineIndex++] = z2;
          }
        }
      }

      lineGeometry.attributes.position.needsUpdate = true;
    };

    // Animation
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update target positions based on scroll
      updateTargetPositions(scrollProgressRef.current);

      // Smoothly move particles toward target
      const positions = particles.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Spring physics for smooth transition
        const dx = targetPositions[i3] - positions[i3];
        const dy = targetPositions[i3 + 1] - positions[i3 + 1];
        const dz = targetPositions[i3 + 2] - positions[i3 + 2];

        velocities[i3] += dx * 0.02;
        velocities[i3 + 1] += dy * 0.02;
        velocities[i3 + 2] += dz * 0.02;

        velocities[i3] *= 0.9;
        velocities[i3 + 1] *= 0.9;
        velocities[i3 + 2] *= 0.9;

        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];
      }

      particles.attributes.position.needsUpdate = true;

      // Update lines occasionally
      if (Math.floor(elapsedTime * 10) % 5 === 0) {
        updateLines();
      }

      // Rotate the entire system
      particleSystem.rotation.y = elapsedTime * 0.1;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;
      lineSystem.rotation.y = elapsedTime * 0.1;
      lineSystem.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;

      // Camera subtle movement
      camera.position.x = Math.sin(elapsedTime * 0.3) * 0.5;
      camera.position.y = Math.cos(elapsedTime * 0.4) * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      particles.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}