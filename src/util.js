const env = require('amfe-env');

const version = {
  get width() {
    return window.screen.width;
  },
  get height() {
    return window.screen.height;
  },
  get ios() {
    return !!env.os.isIPhone;
  },
  get iphoneX() {
    if (this.ios) {
      const min = Math.min(this.width, this.height);
      const max = Math.max(this.width, this.height);

      // iphone x and iphone xs
      if (min === 375 && max === 812) {
        return true;
      }
      // iphone xs max
      if (min === 414 && max === 896) {
        return true;
      }
    }
    return false;
  }
};
export default version;