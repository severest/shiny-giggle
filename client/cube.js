import THREE from 'three';
import CANNON from 'cannon';

export default class Cube {
  constructor(material) {
    this.geometry = new THREE.BoxGeometry( 2, 2, 2 );

    this.obj = new THREE.Mesh( this.geometry, material.material );

    //cannon
    this.shape = new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5));
    this.cannon_body = new CANNON.Body({
     mass: 1
    });
    this.cannon_body.addShape(this.shape);
    // setInterval(this.jumpBox.bind(this), (Math.random() * 2000) + 1000);
  }

  jumpBox() {
    // this.cannon_body.applyLocalImpulse(new CANNON.Vec3(0,2,0),new CANNON.Vec3(0,0,0));
    this.cannon_body.velocity.set(0,3,0);
  }
}
