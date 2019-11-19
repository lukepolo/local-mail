import Plugin from "varie-bundler/lib/plugins/Plugin";

export default class RawLoaderPlugin extends Plugin<undefined> {
  public register(): void {
    this.bundler.webpackChain.module
      .rule("txt")
      .test(/\.txt$/)
      .use("raw-loader")
      .loader("raw-loader");
  }
}
