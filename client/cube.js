import THREE from 'three';
import CANNON from 'cannon';

export default class Cube {
  constructor(gui) {
    this.geometry = new THREE.BoxGeometry( 2, 2, 2 );
    this.material = new THREE.MeshPhongMaterial( { color: 0xcc0000 } );

    var data = {
      color : this.material.color.getHex(),
      emissive : this.material.emissive.getHex(),
      specular : this.material.specular.getHex()
    };

    var folder = gui.addFolder('CubeMaterial');

    folder.addColor( data, 'color' ).onChange( this.handleColorChange( this.material.color ) );
    folder.addColor( data, 'emissive' ).onChange( this.handleColorChange( this.material.emissive ) );
    folder.addColor( data, 'specular' ).onChange( this.handleColorChange( this.material.specular ) );

    folder.add( this.material, 'shininess', 0, 100);

    this.obj = new THREE.Mesh( this.geometry, this.material );

    //cannon
    this.shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
    this.cannon_body = new CANNON.Body({
     mass: 1
    });
    this.cannon_body.position.set(0,5,0);
    this.cannon_body.addShape(this.shape);
  }

  handleColorChange ( color ) {
    return function ( value ) {
      if (typeof value === 'string') {
        value = value.replace('#', '0x');
      }
      color.setHex( value );
    };
  }
}
