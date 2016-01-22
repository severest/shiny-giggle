import Scene from './scene';
var dat = require('dat-gui');
var CANNON = require('cannon');
var THREE = require('three');

// var gui = new dat.GUI();
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

var world, mass, body, shape, timeStep=1/60,
    camera, scene, renderer, geometry, material, mesh;

 function initCannon() {
     world = new CANNON.World();
     world.gravity.set(0,-1,0);
     world.broadphase = new CANNON.NaiveBroadphase();
     world.solver.iterations = 10;

     shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
     mass = 1;
     body = new CANNON.Body({
       mass: 1
     });
     body.position.set(0,5,0);
     body.addShape(shape);
    //  body.angularVelocity.set(0,10,10);
    //  body.angularDamping = 0.5;
     world.addBody(body);

     var groundShape = new CANNON.Plane();
            var groundBody = new CANNON.Body({ mass: 0 });
            groundBody.addShape(groundShape);
            groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
            world.addBody(groundBody);
 }
 function initThree() {
     scene = new THREE.Scene();
     camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );
     camera.position.z = 15;
     scene.add( camera );
     geometry = new THREE.BoxGeometry( 2, 2, 2 );
     material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
     mesh = new THREE.Mesh( geometry, material );
     scene.add( mesh );
     renderer = new THREE.WebGLRenderer();
     renderer.setSize( window.innerWidth, window.innerHeight );
     document.body.appendChild( renderer.domElement );
 }
 function updatePhysics() {
     // Step the physics world
     world.step(timeStep);
     // Copy coordinates from Cannon.js to Three.js
     mesh.position.copy(body.position);
     mesh.quaternion.copy(body.quaternion);
 }
 function render() {
     renderer.render( scene, camera );
 }
 function animate() {
     requestAnimationFrame( animate );
     updatePhysics();
     render();
 }



 initThree();
 initCannon();
 animate();
