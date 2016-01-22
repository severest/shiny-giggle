var THREE = require('three');

export default class Scene {

    constructor(gui) {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( this.renderer.domElement );

      this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
      // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      this.material = new THREE.MeshPhongMaterial( { color: 0xcc0000 } );

      var data = {
    		color : this.material.color.getHex(),
    		emissive : this.material.emissive.getHex(),
    		specular : this.material.specular.getHex(),
    		// envMaps : envMapKeys,
    		// map : textureMapKeys,
    		// lightMap : textureMapKeys,
    		// specularMap : textureMapKeys,
    		// alphaMap : textureMapKeys
    	};

    	var folder = gui.addFolder('THREE.MeshPhongMaterial');

    	folder.addColor( data, 'color' ).onChange( this.handleColorChange( this.material.color ) );
    	folder.addColor( data, 'emissive' ).onChange( this.handleColorChange( this.material.emissive ) );
    	folder.addColor( data, 'specular' ).onChange( this.handleColorChange( this.material.specular ) );

    	folder.add( this.material, 'shininess', 0, 100);
    	// folder.add( material, 'shading', constants.shading).onChange( needsUpdate( material, geometry ) );
    	// folder.add( material, 'wireframe' );
    	// folder.add( material, 'wireframeLinewidth', 0, 10 );
    	// folder.add( material, 'vertexColors', constants.colors);
    	// folder.add( material, 'fog' );
    	// folder.add( data, 'envMaps', envMapKeys ).onChange( updateTexture( material, 'envMap', envMaps ) );
    	// folder.add( data, 'map', textureMapKeys ).onChange( updateTexture( material, 'map', textureMaps ) );
    	// folder.add( data, 'lightMap', textureMapKeys ).onChange( updateTexture( material, 'lightMap', textureMaps ) );
    	// folder.add( data, 'specularMap', textureMapKeys ).onChange( updateTexture( material, 'specularMap', textureMaps ) );
    	// folder.add( data, 'alphaMap', textureMapKeys ).onChange( updateTexture( material, 'alphaMap', textureMaps ) );


      this.cube = new THREE.Mesh( this.geometry, this.material );
      this.scene.add( this.cube );

      this.camera.position.z = 5;
      //
      // this.light = new THREE.PointLight( 0xff0000, 1, 100 );
      // this.light.position.set( 50, 50, 50 );
      // this.scene.add( this.light );

      this.dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
				this.dirLight.color.setHSL( 0.1, 1, 0.95 );
				this.dirLight.position.set( -1, 1.75, 1 );
				this.dirLight.position.multiplyScalar( 50 );
				this.scene.add( this.dirLight );
    }

    handleColorChange ( color ) {
    	return function ( value ){
    		if (typeof value === 'string') {
    			value = value.replace('#', '0x');
    		}
    		color.setHex( value );
        };
    }

}
