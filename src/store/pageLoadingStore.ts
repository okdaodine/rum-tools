export function createPageLoadingStore() {
  return {
    open: false,

    show() {
      this.open = true;
    },

    hide() {
      this.open = false;
    }
  };
}
