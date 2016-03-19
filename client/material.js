import THREE from 'three';

export default class Material {
  constructor(folder) {
    this.material = new THREE.MeshPhongMaterial( { color: 0xcc0000 } );
    var data = {
      color : this.material.color.getHex(),
      emissive : this.material.emissive.getHex(),
      specular : this.material.specular.getHex()
    };
    this.material.shininess = 7;

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
