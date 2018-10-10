AFRAME.registerComponent('gameover', {
  schema: {
    isGameOver: {default: false}
  },

  init: function () {
    this.beatContainer = document.getElementById('beatContainer');
  },

  update: function (oldData) {
    var data = this.data;
    if (!oldData.isGameOver && this.data.isGameOver){
      console.log('starting slow down...');
      this.el.sceneEl.setAttribute('stage-colors', 'red');
      this.countDown = 1;
      this.lastTime = performance.now();
    }
    if (oldData.isGameOver && !this.data.isGameOver){
      this.resetStage();
    }
  },

  tick: function (time, delta) {
    if (!this.data.isGameOver) { return; }
    if (this.countDown >= 0){
      this.el.sceneEl.emit('slowdown', {progress: this.countDown});
      //this.beatContainer.object3D.position.z = -Math.pow(1 - this.countDown, 2) * 1.5;
      this.countDown -= delta / 1000;
      this.el.sceneEl.systems.beat.speed = this.countDown;
    }
    else {
      this.data.start = false;
      setTimeout(()=>{ this.el.sceneEl.emit('pausegame'); }, 1000);
    }
  },
  resetStage: function () {
    this.data.start = false;
    this.beatContainer.object3D.position.z = 0;
    this.el.sceneEl.systems.beat.speed = 1.0;
    this.el.sceneEl.setAttribute('stage-colors', 'blue');
  }
});
