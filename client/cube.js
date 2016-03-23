import THREE from 'three';
import CANNON from 'cannon';

import config from './config';

export default class Cube {
  constructor(opts) {
    this.geometry = new THREE.BoxGeometry( opts.size, opts.size, opts.size );

    this.obj = new THREE.Mesh( this.geometry, opts.material.material );

    //cannon
    this.shape = new CANNON.Box(new CANNON.Vec3(0.5,0.5,0.5));
    this.cannon_body = new CANNON.Body({
     mass: 1,
     fixedRotation: true
    });
    this.cannon_body.addShape(this.shape);
  }

  jumpBox(height) {
    this.cannon_body.velocity.set(0,height,0);
  }

  moveBox() {
    var p = this.cannon_body.position;
    if (p.x < ((config.CUBE_SIZE + config.CUBE_PADDING)*config.GRID_SIZE)) {
      this.cannon_body.position.set(p.x+config.SPEED,p.y,p.z);
    } else {
      this.cannon_body.position.set(((-config.GRID_SIZE)*(config.CUBE_SIZE+config.CUBE_PADDING)),p.y,p.z);
    }
  }
}
