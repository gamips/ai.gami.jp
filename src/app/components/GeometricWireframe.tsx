import { useEffect, useRef } from "react";
import * as THREE from "three";

export function GeometricWireframe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const linesRef = useRef<THREE.LineSegments[]>([]);
  const targetShapeRef = useRef<number>(0);
  const currentShapeRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create geometric wireframe shapes
    const createCrystalShape = () => {
      // MV: 複雑な結晶・多面体構造
      const geometry = new THREE.BufferGeometry();
      const vertices: number[] = [];
      const indices: number[] = [];

      // Create icosahedron-like crystal structure
      const t = (1 + Math.sqrt(5)) / 2;
      const scale = 1.5;

      const baseVertices = [
        [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
        [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
        [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
      ];

      baseVertices.forEach(v => {
        vertices.push(v[0] * scale, v[1] * scale, v[2] * scale);
      });

      // Connect to form crystal faces
      const faces = [
        [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
        [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
        [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
        [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
      ];

      faces.forEach(face => {
        indices.push(face[0], face[1]);
        indices.push(face[1], face[2]);
        indices.push(face[2], face[0]);
      });

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setIndex(indices);

      return geometry;
    };

    const createNetworkShape = () => {
      // CONCEPT: 3D接続ネットワーク構造
      const geometry = new THREE.BufferGeometry();
      const vertices: number[] = [];
      const indices: number[] = [];

      // Create 3D network nodes with depth
      const nodes = [
        [0, 0, 0],
        [-2, 1, 1], [-2, -1, 1], [2, 1, 1], [2, -1, 1],
        [-2, 1, -1], [-2, -1, -1], [2, 1, -1], [2, -1, -1],
        [-1, 2, 0.5], [-1, -2, 0.5], [1, 2, 0.5], [1, -2, 0.5],
      ];

      nodes.forEach(node => vertices.push(...node));

      // Create 3D connections
      const connections = [
        [0, 1], [0, 2], [0, 3], [0, 4],
        [0, 5], [0, 6], [0, 7], [0, 8],
        [1, 9], [2, 10], [3, 11], [4, 12],
        [1, 2], [3, 4], [5, 6], [7, 8],
        [1, 5], [2, 6], [3, 7], [4, 8],
      ];

      connections.forEach(conn => indices.push(...conn));

      // Add octahedron at each node
      nodes.forEach((node, nodeIdx) => {
        const size = 0.2;
        const startIdx = vertices.length / 3;

        // Octahedron vertices
        const octVerts = [
          [node[0], node[1] + size, node[2]],
          [node[0], node[1] - size, node[2]],
          [node[0] + size, node[1], node[2]],
          [node[0] - size, node[1], node[2]],
          [node[0], node[1], node[2] + size],
          [node[0], node[1], node[2] - size],
        ];

        octVerts.forEach(v => vertices.push(...v));

        // Octahedron edges
        const octEdges = [
          [0, 2], [0, 3], [0, 4], [0, 5],
          [1, 2], [1, 3], [1, 4], [1, 5],
          [2, 4], [4, 3], [3, 5], [5, 2],
        ];

        octEdges.forEach(edge => {
          indices.push(startIdx + edge[0], startIdx + edge[1]);
        });
      });

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setIndex(indices);

      return geometry;
    };

    const createGridShape = () => {
      const geometry = new THREE.BufferGeometry();
      const vertices: number[] = [];
      const indices: number[] = [];

      // Create 3D grid structure
      const gridSize = 3;
      const spacing = 1.2;

      for (let x = -gridSize; x <= gridSize; x++) {
        for (let y = -gridSize; y <= gridSize; y++) {
          for (let z = -1; z <= 1; z++) {
            vertices.push(x * spacing, y * spacing, z * spacing);
          }
        }
      }

      // Connect grid points
      const getIndex = (x: number, y: number, z: number) => {
        return ((x + gridSize) * (gridSize * 2 + 1) * 3) + 
               ((y + gridSize) * 3) + 
               (z + 1);
      };

      for (let x = -gridSize; x <= gridSize; x++) {
        for (let y = -gridSize; y <= gridSize; y++) {
          for (let z = -1; z <= 1; z++) {
            if (x < gridSize) indices.push(getIndex(x, y, z), getIndex(x + 1, y, z));
            if (y < gridSize) indices.push(getIndex(x, y, z), getIndex(x, y + 1, z));
            if (z < 1) indices.push(getIndex(x, y, z), getIndex(x, y, z + 1));
          }
        }
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setIndex(indices);

      return geometry;
    };

    const createSphereShape = () => {
      const geometry = new THREE.BufferGeometry();
      const vertices: number[] = [];
      const indices: number[] = [];

      const segments = 16;
      const rings = 12;
      const radius = 2;

      // Create sphere wireframe
      for (let ring = 0; ring <= rings; ring++) {
        const phi = (ring / rings) * Math.PI;
        for (let seg = 0; seg <= segments; seg++) {
          const theta = (seg / segments) * Math.PI * 2;
          
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);
          
          vertices.push(x, y, z);
        }
      }

      // Connect vertices
      for (let ring = 0; ring < rings; ring++) {
        for (let seg = 0; seg < segments; seg++) {
          const current = ring * (segments + 1) + seg;
          const next = current + segments + 1;
          
          indices.push(current, current + 1);
          indices.push(current, next);
        }
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setIndex(indices);

      return geometry;
    };

    // Materials for different states
    const material = new THREE.LineBasicMaterial({ 
      color: 0x06b6d4,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.8
    });

    // Create line meshes for morphing
    const shapes = [
      createCrystalShape(),
      createNetworkShape(),
      createGridShape(),
      createSphereShape(),
    ];

    const lineMesh = new THREE.LineSegments(shapes[0], material);
    scene.add(lineMesh);
    linesRef.current = [lineMesh];

    // Scroll handling
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollProgress = scrollY / (windowHeight * 4);
      
      targetShapeRef.current = Math.min(Math.floor(scrollProgress * 4), 3);
    };

    window.addEventListener('scroll', handleScroll);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth transition between shapes
      if (currentShapeRef.current !== targetShapeRef.current) {
        const diff = targetShapeRef.current - currentShapeRef.current;
        currentShapeRef.current += diff * 0.05;

        const shapeIndex = Math.floor(currentShapeRef.current);
        const nextIndex = Math.min(shapeIndex + 1, shapes.length - 1);
        const alpha = currentShapeRef.current - shapeIndex;

        // Morph between shapes
        if (lineMesh.geometry) {
          lineMesh.geometry.dispose();
        }
        lineMesh.geometry = shapes[shapeIndex].clone();
      }

      // Rotate
      lineMesh.rotation.y += 0.003;
      lineMesh.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
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
      
      shapes.forEach(shape => shape.dispose());
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ minHeight: '600px' }}
    />
  );
}