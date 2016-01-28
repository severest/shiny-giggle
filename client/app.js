import Scene from './scene';
import Camera from './camera';
import Cube from './cube';
import Material from './material';

var dat = require('dat-gui');
var CANNON = require('cannon');
var THREE = require('three');

var gui = new dat.GUI();
// var animation = new Scene(gui);
//
// var folder = gui.addFolder('General');
// var vars = {rotation:0.05};
// folder.add( vars, 'rotation', 0.00, 0.30);
//
// var render = function () {
//   requestAnimationFrame( render );
//
//   animation.cube.rotation.x += vars.rotation;
//   animation.cube.rotation.y += vars.rotation;
//
//   animation.renderer.render(animation.scene, animation.camera);
// };
// render();

var world,scene,mesh,renderer,timeStep=1/60;//, mass, body, shape, timeStep=1/60, scene, renderer, geometry, material, mesh;

let camera = new Camera();
let boxes = [];

function initCannon() {
  world = new CANNON.World();
  world.gravity.set(0,-2,0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;

  scene = new Scene(gui);
  scene.scene.add( camera.obj );

  var folder = gui.addFolder('CubeMaterial');
  var material = new Material(folder);
  mesh = new Cube(material);
  boxes.push(mesh);
  mesh.cannon_body.position.set(0,5,0);
  world.addBody(mesh.cannon_body);
  scene.scene.add( mesh.obj );

  mesh = new Cube(material);
  boxes.push(mesh);
  mesh.cannon_body.position.set(2.2,5,0);
  world.addBody(mesh.cannon_body);
  scene.scene.add( mesh.obj );

  mesh = new Cube(material);
  boxes.push(mesh);
  mesh.cannon_body.position.set(4.4,5,0);
  world.addBody(mesh.cannon_body);
  scene.scene.add( mesh.obj );

  mesh = new Cube(material);
  boxes.push(mesh);
  mesh.cannon_body.position.set(0,5,-2.2);
  world.addBody(mesh.cannon_body);
  scene.scene.add( mesh.obj );

  mesh = new Cube(material);
  boxes.push(mesh);
  mesh.cannon_body.position.set(2.2,5,-2.2);
  world.addBody(mesh.cannon_body);
  scene.scene.add( mesh.obj );

  mesh = new Cube(material);
  boxes.push(mesh);
  mesh.cannon_body.position.set(4.4,5,-2.2);
  world.addBody(mesh.cannon_body);
  scene.scene.add( mesh.obj );



  var groundShape = new CANNON.Plane();
  var groundBody = new CANNON.Body({ mass: 0 });
  groundBody.addShape(groundShape);
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
  world.addBody(groundBody);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
}
function updatePhysics() {
  // Step the physics world
  world.step(timeStep);
  // Copy coordinates from Cannon.js to Three.js
  for (let i=0; i < boxes.length; i++) {
    boxes[i].obj.position.copy(boxes[i].cannon_body.position);
    boxes[i].obj.quaternion.copy(boxes[i].cannon_body.quaternion);
  }
}
function render() {
  renderer.render( scene.scene, camera.obj );
}
function animate() {
  requestAnimationFrame( animate );
  updatePhysics();
  render();
}



initCannon();
animate();
