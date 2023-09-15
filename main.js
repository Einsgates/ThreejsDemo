import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Set up
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( ambientLight);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(pointLight, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);


const spaceTexture = new THREE.TextureLoader().load('space2.jpg');
scene.background = spaceTexture;

const earthMoonGroup = new THREE.Group();
scene.add(earthMoonGroup);

// Earth
const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32,32),
  new THREE.MeshStandardMaterial({map:earthTexture})
);
scene.add(earth);

// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture
  })
);
earthMoonGroup.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.02;
  earthMoonGroup.rotation.y += 0.003;
  renderer.render(scene, camera);
  controls.update();
}

animate();