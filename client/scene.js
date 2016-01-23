import THREE from 'three';

export default class Scene {

    constructor(gui) {
      this.scene = new THREE.Scene();
      this.dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
			this.dirLight.color.setHSL( 0.1, 1, 0.95 );
			this.dirLight.position.set( 0, -1, 1 );
			this.dirLight.position.multiplyScalar( 50 );
			this.scene.add( this.dirLight );

      let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
				hemiLight.color.setHSL( 0.6, 1, 0.6 );
				hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
				hemiLight.position.set( 0, 500, 0 );
				this.scene.add( hemiLight );
    }



}
