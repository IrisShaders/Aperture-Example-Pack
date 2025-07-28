// pack.ts
function configureRenderer(renderer) {
  renderer.mergedHandDepth = true;
  renderer.ambientOcclusionLevel = 1;
  renderer.disableShade = false;
  renderer.render.entityShadow = true;
}
function configurePipeline(pipeline) {
  let mainTexture = pipeline.createTexture("mainTexture").width(screenWidth).height(screenHeight).format(Format.RGBA8).build();
  let finalTexture = pipeline.createTexture("finalTexture").width(screenWidth).height(screenHeight).format(Format.RGBA8).build();
  pipeline.createObjectShader("basic", Usage.BASIC).vertex("objects/basic.vsh").fragment("objects/basic.fsh").target(0, mainTexture).compile();
  pipeline.createObjectShader("basic", Usage.SKY_TEXTURES).vertex("objects/basic.vsh").fragment("objects/basic.fsh").target(0, mainTexture).define("DISABLE_FOG", "1").compile();
  let postRender = pipeline.forStage(Stage.POST_RENDER);
  postRender.createComposite("gamma").fragment("post/gamma.fsh").target(0, finalTexture).compile();
  postRender.end();
  pipeline.createCombinationPass("post/combination.fsh").compile();
}
function beginFrame(state) {
}
export {
  beginFrame,
  configurePipeline,
  configureRenderer
};
//# sourceMappingURL=pack.js.map
