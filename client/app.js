import './scss/main.scss';

import 'fittext.js';
import moment from 'moment';
import CANNON from 'cannon';
import THREE from 'three';
import Stats from 'stats.js';
import uri from 'urijs';

import Trackball from './trackball';
import Scene from './scene';
import Camera from './camera';
import Cube from './cube';
import Material from './material';

import config from './config';


var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
// document.body.appendChild( stats.domElement );

var world,scene,mesh,renderer,timeStep=1/60,controls;//, mass, body, shape, timeStep=1/60, scene, renderer, geometry, material, mesh;

let camera = new Camera();
let boxes = [];

let params = uri().search(true);

function initCannon() {
  world = new CANNON.World();
  world.gravity.set(0,-10,0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 3;
  world.defaultContactMaterial.contactEquationStiffness = 1e6;
  world.defaultContactMaterial.contactEquationRelaxation = 10;

  scene = new Scene();
  scene.scene.add( camera.obj );


  var material;
  if (params.colour !== undefined) {
    material = new Material('#'+params.colour);
  } else if (params.color !== undefined) {
    material = new Material('#'+params.color);
  } else {
    material = new Material();
  }
  var grid = config.GRID_SIZE;
  for (let x=-grid; x < grid; x++) {
    for (let y=-grid; y < grid; y++) {
      mesh = new Cube({
        size: config.CUBE_SIZE,
        material: material
      });
      boxes.push(mesh);
      mesh.cannon_body.position.set(( x * (config.CUBE_SIZE + config.CUBE_PADDING)),1,( y * (config.CUBE_SIZE + config.CUBE_PADDING)));
      world.addBody(mesh.cannon_body);
      scene.scene.add( mesh.obj );
    }
  }


  var groundShape = new CANNON.Plane();
  var groundBody = new CANNON.Body({ mass: 0 });
  groundBody.addShape(groundShape);
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
  world.addBody(groundBody);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // Trackball controls
  // controls = new Trackball( camera.obj, renderer.domElement );
  // controls.rotateSpeed = 1.0;
  // controls.zoomSpeed = 1.2;
  // controls.panSpeed = 0.2;
  // controls.noZoom = false;
  // controls.noPan = false;
  // controls.staticMoving = false;
  // controls.dynamicDampingFactor = 0.3;
  // var radius = 100;
  // controls.minDistance = 0.0;
  // controls.maxDistance = radius * 1000;
  // //controls.keys = [ 65, 83, 68 ]; // [ rotateKey, zoomKey, panKey ]
  // controls.screen.width = window.innerWidth;
  // controls.screen.height = window.innerHeight;
}
function updatePhysics() {
  // Step the physics world
  world.step(timeStep);
  // Copy coordinates from Cannon.js to Three.js
  for (let i=0; i < boxes.length; i++) {
    if ((Math.random() * 2000) > 1990) {
      boxes[i].jumpBox(config.JUMP_HEIGHT);
    }
    boxes[i].moveBox();
    boxes[i].obj.position.copy(boxes[i].cannon_body.position);
    boxes[i].obj.quaternion.copy(boxes[i].cannon_body.quaternion);
  }
}
function render() {
  // controls.update();
  camera.updateCamera();
  renderer.render( scene.scene, camera.obj );
}
function animate() {
  stats.begin();
  updatePhysics();
  render();
  stats.end();
  requestAnimationFrame( animate );
}

initCannon();
animate();

// the clock
setInterval(function () {
  $('#clock').html(moment().format('h:mm:ss a'));
  $('#clock').fitText(0.8);
}, 1000);
