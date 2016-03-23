import THREE from 'three';

var config = {
  JUMP_HEIGHT: 5,
  CUBE_SIZE: 6,
  CUBE_PADDING: 0.2,
  GRID_SIZE: 5,
  SPEED: 0.06,
  camera: {
    look: new THREE.Vector3(1.6, 14, -2),
    position: new THREE.Vector3(2, 6.5, -12)
  },
  light: new THREE.Vector3(-1, 1, 0.6),
  material: {
    shinyness: 19.6,
    colour: 0x2a6940
  }
};

export default config;
