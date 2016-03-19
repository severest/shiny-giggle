import THREE from 'three';

export default class Camera {

  constructor() {
    // let ratio = 0.01;
    // this.obj = new THREE.OrthographicCamera( ratio *  window.innerWidth , -ratio *  window.innerWidth, ratio * window.innerHeight, -ratio * window.innerHeight , 1, 1000 );

    this.obj = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );
    this.obj.position.z = 0;
    this.obj.position.y = 4;
    this.obj.position.x = 10;
    this.obj.lookAt(new THREE.Vector3(0,0,1));
  }
}
