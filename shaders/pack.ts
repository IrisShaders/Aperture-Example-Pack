// This configures basic settings for the world.
export function configureRenderer(renderer: RendererConfig): void {
    // These settings mimic Vanilla Minecraft's rendering settings.
    // mergedHandDepth is used to avoid needing to merge the hand depth; however, you will likely want this off for more complex shaders.
    renderer.mergedHandDepth = true;
    renderer.ambientOcclusionLevel = 1.0;
    renderer.disableShade = false;
    renderer.render.entityShadow = true;
}

// This is where the shaders, buffers, and textures are configured.
export function configurePipeline(pipeline: PipelineConfig): void {
    // This creates the main texture; one of the two textures used in this template. It can be accessed via "uniform sampler2D mainTexture;" in shaders.
    // However, you are not limited by how many textures can be created.
    // The most important limitation is you should never read and write to the same texture in the same shader. (Using images avoids this limitation, but this is not covered here.)

    let mainTexture = pipeline.createTexture("mainTexture")
            .width(screenWidth).height(screenHeight)
            .format(Format.RGBA8).build();

    let finalTexture = pipeline.createTexture("finalTexture")
            .width(screenWidth).height(screenHeight)
            .format(Format.RGBA8).build();

    // A basic object shader. This shader is marked as BASIC, which means all objects will fall back to it.
    pipeline.createObjectShader("basic", Usage.BASIC)
            .vertex("objects/basic.vsh")
            .fragment("objects/basic.fsh")
            .target(0, mainTexture)
            .compile();

    // The following is a copy of the basic shader, but with DISABLE_FOG defined to avoid fog being run on the sky.
    pipeline.createObjectShader("basic", Usage.SKY_TEXTURES)
            .vertex("objects/basic.vsh")
            .fragment("objects/basic.fsh")
            .target(0, mainTexture)
            .define("DISABLE_FOG", "1")
            .compile();

    // The following is a command list; the main way to do post processing and compute.
    // For this, we will be creating a POST_RENDER command list, which will run after everything.
    let postRender = pipeline.forStage(Stage.POST_RENDER);

    // For composites, you can choose to have a vertex shader or not. If you choose not to, one will be provided with vec2 uv as a default input.
    postRender.createComposite("gamma")
            .fragment("post/gamma.fsh")
            .target(0, finalTexture)
            .compile();

    // If you have multiple passes relying on each other, you will require memory barriers.

    // An example of a memory barrier that will make any SSBO's and images written to in the previous pass available to the next pass.
    // postRender.barrier(SSBO_BIT | IMAGE_BIT);

    // You must end your command list after you are done adding commands to it.
    postRender.end();

    // The combination pass. For more information, see the file.
    pipeline.createCombinationPass("post/combination.fsh").compile();
}

export function beginFrame(state : WorldState) : void {
    // This runs every frame. However, it won't be used in this template.
}