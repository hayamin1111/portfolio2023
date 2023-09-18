import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader} from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// シーンの作成
const scene = new THREE.Scene();
// カメラの作成
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// camera
const controls = new OrbitControls(camera, document.querySelector("canvas"));
controls.enableDamping = true;

// container
const container = new THREE.Object3D();
scene.add(container);

// const cubeRenderTarget = new THREE.WebGLCubeRenderTarget();
// const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);

const sizes = {
  width: innerWidth,
  height: innerHeight,
};

// renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true, 
  canvas: document.querySelector("canvas"),
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setClearColor(new THREE.Color(0x666666));
scene.background = new THREE.Color( 0xcccccc );

//axisHelper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//font loader
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
  const textMaterial = new THREE.MeshToonMaterial({ color: 0x00ffff,});
  //mesh
  const text = new THREE.Mesh(textGeometry, textMaterial);
  // text.castShadow = true;
  container.add(text); 
  // scene.add(text);
});

function moveGeomerty() {
    
}
moveGeomerty();



// ジオメトリの作成
// const sphereGeometry = new THREE.SphereGeometry(3, 20, 50);
// マテリアルの作成
// const sphereMaterial = new THREE.MeshToonMaterial({
//   // wireframe: true,
//   // color: 0xEB6137,
//   // gradientMap: gradientMapTexture,
//   // envMap: cubeRenderTarget.texture,
// });

// sphereMaterial.shininess = 100;
// sphereMaterial.color = new THREE.Color(0x00ffff);
// メッシュの作成
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// シーンに追加する。
// scene.add(sphere);

//light
const ambLight = new THREE.AmbientLight(0xffffff, .1);
const pointLight = new THREE.PointLight(0xffffff, 2, 0, 1.0);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(ambLight,pointLight, pointLightHelper);

const r = 3;
let angle = 3;
const speed = 0.02;
const moveLight = () => {
    pointLight.position.set( Math.sin(angle) * r,  0, Math.cos(angle) * r);
    angle += speed;
    renderer.render(pointLight.parent, camera);
}

// animation
function animate() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
  moveLight();
  container.rotation.y += 0.005;
}
animate();

// resize
addEventListener("resize", () => {
  sizes.width = innerWidth;
  sizes.height = innerHeight;

  // camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // cubeCamera.update( renderer, scene );

  // renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});



// const targetElems = document.querySelectorAll('.section');
  
//   const options = {
//     root: null,
//     rootMargin: "-20% 0px -20% 0px",
//     threshold: 0
//   }
  
//   const callback = (entries) => {
//     entries.forEach((entry) => {
//       if(entry.isIntersecting) {
//         changeColor(entry.target);
//         // console.log('見えています。');
//       } else {
//         // console.log('見えていません。');
//       }
//     });
//   }
  
//   const observer = new IntersectionObserver(callback, options);
  
//   targetElems.forEach(targetElem => {
//     observer.observe(targetElem);
//   });
  
//   function changeColor(target){
  
//     const currentActiveSection = document.querySelector('.is-changeColor');
//     if(currentActiveSection !== null) {
//       currentActiveSection.classList.remove('is-changeColor');
//     }
//     target.classList.add('is-changeColor');
//   };
