// particles.js — fundo com partículas animadas (Three.js)
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.155/build/three.module.js";

let scene, camera, renderer, particles;

function initParticles() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("iris-container").appendChild(renderer.domElement);

  const geometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  const positions = [];

  for (let i = 0; i < particlesCount; i++) {
    positions.push((Math.random() - 0.5) * 10);
    positions.push((Math.random() - 0.5) * 10);
    positions.push((Math.random() - 0.5) * 10);
  }

  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({ color: 0x48c9b0, size: 0.05 });
  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // movimento sutil nas partículas
  particles.rotation.y += 0.001;
  particles.rotation.x += 0.0005;

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// inicializa quando carregar
initParticles();
