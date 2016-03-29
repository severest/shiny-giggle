import THREE from 'three';
import GUI from './gui';
import config from './config';

export default class Material {
  constructor(colour) {
    if (colour === undefined) {
      colour = config.material.colour;
    }
    console.log(colour);
    this.material = new THREE.MeshPhongMaterial({ color: colour });
    var data = {
      color : this.material.color.getHex(),
      emissive : this.material.emissive.getHex(),
      specular : this.material.specular.getHex()
    };
    this.material.shininess = config.material.shinyness;

    let gui = new GUI();
    var folder = gui.gui.addFolder('CubeMaterial');
    folder.addColor( data, 'color' ).onChange( this.handleColorChange( this.material.color ) );
    folder.addColor( data, 'emissive' ).onChange( this.handleColorChange( this.material.emissive ) );
    folder.addColor( data, 'specular' ).onChange( this.handleColorChange( this.material.specular ) );

    folder.add( this.material, 'shininess', 0, 100);
  }

  handleColorChange(color) {
    return function (value) {
      if (typeof value === 'string') {
        value = value.replace('#', '0x');
      }
      color.setHex( value );
    };
  }
}
