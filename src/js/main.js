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

// const cubeRenderTarget = new THREE.WebGLCubeRenderTarget();
// const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);

const sizes = {
  width: innerWidth,
  height: innerHeight,
};

// レンダラーの作成
const renderer = new THREE.WebGLRenderer({
  antialias: true, 
  canvas: document.querySelector("canvas"),
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setClearColor(new THREE.Color(0x666666));
scene.background = new THREE.Color( 0x999999 );

//axisHelper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//画像のローダー
// const loader = new THREE.TextureLoader();
// const gradientMapTexture = loader.load('../img/gradient_map.jpg');
// gradientMapTexture.wrapS = THREE.ClampToEdgeWrapping; // 水平方向のラッピングを設定
// gradientMapTexture.wrapT = THREE.ClampToEdgeWrapping; // 垂直方向のラッピングを設定

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
  text.castShadow = true;
  scene.add(text);
});


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

// ワンフレーム毎に更新する関数をそれぞれ実行する。
function animate() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);

  moveLight();
}
animate();

// リサイズされる度に更新する関数を実行する。
addEventListener("resize", () => {
  // サイズを更新する
  sizes.width = innerWidth;
  sizes.height = innerHeight;

  // カメラを更新する
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // cubeCamera.update( renderer, scene );

  // レンダラーを更新する
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
