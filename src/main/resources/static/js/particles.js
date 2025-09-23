// particles.js — fundo com partículas animadas (Three.js) + movimento sincronizado com a fala do Alex
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.155/build/three.module.js";

let scene, camera, renderer, particles;

// posições-alvo do container (Alex mudando de canto)
const positions = [
  { bottom: "20px", right: "20px", top: "", left: "" },
  { bottom: "20px", left: "20px", top: "", right: "" },
  { top: "20px", right: "20px", bottom: "", left: "" },
  { top: "20px", left: "20px", bottom: "", right: "" },
];

function moveAlexContainer() {
  const alex = document.getElementById("iris-container") || document.getElementById("alex-container");
  if (!alex) return;

  const next = positions[Math.floor(Math.random() * positions.length)];
  alex.style.top = next.top;
  alex.style.bottom = next.bottom;
  alex.style.left = next.left;
  alex.style.right = next.right;
}

function initParticles() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const container = document.getElementById("iris-container") || document.getElementById("alex-container");
  if (container) container.appendChild(renderer.domElement);

  const geometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  const posArray = [];

  for (let i = 0; i < particlesCount; i++) {
    posArray.push((Math.random() - 0.5) * 10);
    posArray.push((Math.random() - 0.5) * 10);
    posArray.push((Math.random() - 0.5) * 10);
  }

  geometry.setAttribute("position", new THREE.Float32BufferAttribute(posArray, 3));

  const material = new THREE.PointsMaterial({
    color: 0x48c9b0,
    size: 0.05,
    transparent: true,
    opacity: 0.8,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // movimento fluido
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

// 🔗 Integração com Alex (narração)
window.addEventListener("alex-speaking-start", () => {
  moveAlexContainer(); // muda no início da fala
});

window.addEventListener("alex-speaking-end", () => {
  moveAlexContainer(); // muda no fim da fala
});
