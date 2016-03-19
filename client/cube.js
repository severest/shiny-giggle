import THREE from 'three';
import CANNON from 'cannon';

export default class Cube {
  constructor(material) {
    this.geometry = new THREE.BoxGeometry( 2, 2, 2 );

    this.obj = new THREE.Mesh( this.geometry, material.material );

    //cannon
    this.shape = new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5));
    this.cannon_body = new CANNON.Body({
     mass: 1,
     fixedRotation: true
    });
    this.cannon_body.addShape(this.shape);
  }

  jumpBox() {
    this.cannon_body.velocity.set(0,3,0);
  }

  moveBox() {
    var p = this.cannon_body.position;
    if (p.x < 12.6) {
      this.cannon_body.position.set(p.x+0.06,p.y,p.z);
    } else {
      this.cannon_body.position.set((-8*2.1),p.y,p.z);
    }
  }
}
