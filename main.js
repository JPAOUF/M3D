import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );  

const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

const controls = new OrbitControls( camera, renderer.domElement );
controls.panSpeed = 2;
controls.rotateSpeed = 2;

controls.keys = {
  LEFT: 'KeyA',
  UP: 'KeyW',
  RIGHT: 'KeyD',
  BOTTOM: 'KeyS'
}
controls.listenToKeyEvents(window);
controls.keyPanSpeed = 20;

camera.position.set( 0, 6, 6 );
controls.update();

const loader = new GLTFLoader();

let model; 

loader.load('character1.glb', function ( gltf ) {
  
  model = gltf.scene;
  scene.add(model);

}, undefined, function ( error ) {

  console.error( error );

} 
);

const KP = {};

window.addEventListener('keydown', (event) => {
  KP[event.code] = true;
});

window.addEventListener('keyup', (event) => {
  KP[event.code] = false;
});

const speed = 0.1;

function animate() {
  requestAnimationFrame( animate );

  if (model) {
      if (KP['ArrowLeft']) {
        model.position.z -= speed;
      }
      if (KP['ArrowRight']) {
        model.position.z += speed; 
      }
      if (KP['ArrowUp']) {
        model.position.x += speed;
      }
      if (KP['ArrowDown']) {
        model.position.x -= speed; 
      }
  }

  controls.update();
  renderer.render( scene, camera );
}

animate();