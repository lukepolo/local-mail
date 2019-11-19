import Plugin from "varie-bundler/lib/plugins/Plugin";

export default class VarieElectronPlugin extends Plugin<undefined> {
  public register(): void {
    this.bundler.webpackChain.devServer.open(false);
    this.bundler.webpackChain.target("electron-renderer");
    this.bundler.webpackChain.output.globalObject(
      "(typeof self !== 'undefined' ? self : this)",
    );
  }
}
