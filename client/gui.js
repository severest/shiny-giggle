import dat from 'dat-gui';

let instance = null;

export default class Cache{
  constructor() {
    if(!instance){
      instance = this;
      this.gui = new dat.GUI();
      dat.GUI.toggleHide();
    }

    return instance;
  }
}
