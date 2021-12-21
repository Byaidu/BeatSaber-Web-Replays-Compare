AFRAME.registerComponent('settings', {
    schema: {
    },
  
    init: function () {
      this.settings = {
        showHeadset: false,
        reducedDebris: false,
        noEffects: false,
        showHitboxes: false,
        pixelRatio: 1.6
      }

      try {
        let storedSettings = JSON.parse(localStorage.getItem('settings'));
        Object.keys(storedSettings).forEach(key => {
          this.settings[key] = storedSettings[key];
        })
      } catch (e) {}

      this.el.sceneEl.emit('settingsChanged', {settings: this.settings}, false);

      Object.keys(this.settings).forEach(key => {
        let toggle = document.getElementById(key);
        if (toggle.type == 'checkbox') {
          toggle.addEventListener('input', (event) => {
            this.settings[key] = event.srcElement.checked;
            localStorage.setItem('settings', JSON.stringify(this.settings))
            this.el.sceneEl.emit('settingsChanged', {settings: this.settings}, false);
          });
          toggle.checked = this.settings[key];
        } else if (toggle.type == 'range') {
          let label = document.getElementById(key + "Label");
          toggle.addEventListener('input', (event) => {
            this.settings[key] = event.srcElement.value;
            label.innerHTML = this.settings[key];
            localStorage.setItem('settings', JSON.stringify(this.settings))
            this.el.sceneEl.emit('settingsChanged', {settings: this.settings}, false);
          });
          toggle.value = this.settings[key];
          label.innerHTML = this.settings[key];
        }
        
      });
    },
  });