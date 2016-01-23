import Scene from './scene';
import Camera from './camera';
import Cube from './cube';

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

var world, mass, body, shape, timeStep=1/60, scene, renderer, geometry, material, mesh;

let camera = new Camera();

function initCannon() {
  world = new CANNON.World();
  world.gravity.set(0,-1,0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;

  scene = new Scene(gui);
  scene.scene.add( camera.obj );


  //  body.angularVelocity.set(0,10,10);
  //  body.angularDamping = 0.5;

  mesh = new Cube(gui);
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
  mesh.obj.position.copy(mesh.cannon_body.position);
  mesh.obj.quaternion.copy(mesh.cannon_body.quaternion);
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
