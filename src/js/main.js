import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader} from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import {gsap, Power4} from 'gsap';
import scrollTrigger from "gsap/ScrollTrigger";

let scene;
let camera;
let renderer;
// let controls;
let textContainer;
let pointLight;
let angle = 3;
let elapsedTime = 0;
let hue = 0;
const sizes = {
  width: innerWidth,
  height: innerHeight,
};

init();
fontLoaderFunc(`hsl(0, 100%, 70%)`);

function init() {
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 5);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  //OrbitControls
  // controls = new OrbitControls(camera, document.querySelector("canvas"));
  // controls.enableDamping = true;
  
  // textContainer
  textContainer = new THREE.Object3D();
  scene.add(textContainer);
  
  // renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true, 
    canvas: document.querySelector("canvas"),
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  scene.background = new THREE.Color( 0xe9eef0 );
  
  //axisHelper
  // const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper);

  //light
  const ambLight = new THREE.AmbientLight(0xffffff, .6);
  pointLight = new THREE.PointLight(0xffffff, 2, 0, 1.0);
  // const pointLightHelper = new THREE.PointLightHelper(pointLight);
  scene.add(ambLight, pointLight);
}

//font loader
function fontLoaderFunc(color) {
  const fontLoader = new FontLoader();
  fontLoader.load("../fonts/Croissant_One_Regular.json", (font) => {
    const textGeometry = new TextGeometry("HYKW", {
      font: font,
      size: .6,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    textGeometry.center();
    
    //material
    const textMaterial = new THREE.MeshToonMaterial({ color: color,});

    //mesh
    const text = new THREE.Mesh(textGeometry, textMaterial);
    textContainer.add(text); 
  });
}

//move light
const moveLight = () => {
  const r = 3;
  const speed = 0.02;
  pointLight.position.set( Math.sin(angle) * r,  0, Math.cos(angle) * r);
  angle += speed;
  renderer.render(pointLight.parent, camera);
}

//generate color
function generateColor() {
  hue = elapsedTime;
  elapsedTime += 20;
  fontLoaderFunc(`hsl(${hue}, 100%, 70%)`);
  if(hue > 360) {
    elapsedTime = 0;
  }
}
setInterval(generateColor, 3000);

// tick
function tick() {
  renderer.render(scene, camera);
  // controls.update();
  requestAnimationFrame(tick);
  moveLight();
  textContainer.rotation.y += 0.005;
}
tick();

// resize
addEventListener("resize", () => {
  sizes.width = innerWidth;
  sizes.height = innerHeight;

  // camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//gsap scroll animation
gsap.registerPlugin(scrollTrigger);
gsap.to(textContainer.position, {
  z:3,
  scrollTrigger: {
    trigger: '.main',
    start: 'top center',
    scrub:true,
    toggleActions:'play none none reverse',
  }
})
gsap.set('.section', {
  y: 30,
})
gsap.to('.section', {
  duration: 1,
  ease: "power4.out",
  y: 0,
})
