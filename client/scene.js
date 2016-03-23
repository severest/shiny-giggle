import THREE from 'three';
import config from './config';
import GUI from './gui';

export default class Scene {

    constructor() {
      this.scene = new THREE.Scene();
      this.dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
			this.dirLight.color.setHSL( 0.1, 1, 0.95 );
			this.dirLight.position.set(-5, 5, 5);

			this.scene.add( this.dirLight );

      let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
			hemiLight.color.setHSL( 0.6, 1, 0.6 );
			hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
			hemiLight.position.set( 0, 500, 0 );
			this.scene.add( hemiLight );

      let gui = new GUI();
      var folder = gui.gui.addFolder('DirectionalLight');
      folder.add( this.dirLight.position, 'x', -5, 5).onChange(this.handleX(this.dirLight.position));
      folder.add( this.dirLight.position, 'y', -5, 5).onChange(this.handleY(this.dirLight.position));
      folder.add( this.dirLight.position, 'z', -5, 5).onChange(this.handleZ(this.dirLight.position));
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
