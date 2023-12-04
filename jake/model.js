import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

document.getElementById('loadingMessage').style.display = 'block';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.9, 100);
let object;
let objToRender = 'jake';
const loader = new GLTFLoader();

loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    document.getElementById('loadingMessage').style.display = 'none';
    object = gltf.scene;
    scene.add(object);
  },
  function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(error) {
    console.error('Jake didn\'t show up, try to refresh the page (((', error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.z = 50;
camera.position.y = -20;

const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(0, 0, 150);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0xffe5bb, 0x080820, 1);
scene.add(hemiLight);

function animate() {
  requestAnimationFrame(animate);

  if (object && objToRender === "jake") {
    object.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}

let isRotating = false;

function rotateObject() {
  if (object && objToRender === "jake" && isRotating) {
    object.rotation.x += 0.01;
    object.rotation.z += 0.01;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(rotateObject);
}

function toggleRotation() {
  isRotating = !isRotating;
}

const container = document.getElementById("container3D");
container.addEventListener("click", toggleRotation);

rotateObject();

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();



