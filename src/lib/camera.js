class Camera {
  cx ;
  cy ;
  x  = 0;
  y  = 0;
  // width: number = 0;
  // height: number = 0;

  constructor(width, height) {
    this.cx = parseInt(width / 2, 10);
    this.cy = parseInt(height / 2, 10);
  }
}

export default Camera;
