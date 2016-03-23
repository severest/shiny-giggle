import THREE from 'three';
import GUI from './gui';
import config from './config';

export default class Camera {

  constructor() {
    // let ratio = 0.01;
    // this.obj = new THREE.OrthographicCamera( ratio *  window.innerWidth , -ratio *  window.innerWidth, ratio * window.innerHeight, -ratio * window.innerHeight , 1, 1000 );

    this.obj = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );

    let gui = new GUI();
    var folder = gui.gui.addFolder('Camera Position');
    folder.add(config.camera.position, 'x', -20, 20).onChange(this.handleX(config.camera.position));
    folder.add(config.camera.position, 'y', -20, 20).onChange(this.handleY(config.camera.position));
    folder.add(config.camera.position, 'z', -20, 20).onChange(this.handleZ(config.camera.position));

    folder = gui.gui.addFolder('Camera Target');
    folder.add(config.camera.look, 'x', -20, 20).onChange(this.handleX(config.camera.look));
    folder.add(config.camera.look, 'y', -20, 20).onChange(this.handleY(config.camera.look));
    folder.add(config.camera.look, 'z', -20, 20).onChange(this.handleZ(config.camera.look));
  }

  updateCamera() {
    this.obj.position.addVectors(config.camera.position, config.camera.look);
    this.obj.lookAt(config.camera.position);
  }

  handleX(vector) {
    return function (value) {
      vector.setX( value );
    };
  }

  handleY(vector) {
    return function (value) {
      vector.setY( value );
    };
  }

  handleZ(vector) {
    return function (value) {
      vector.setZ( value );
    };
  }
}
