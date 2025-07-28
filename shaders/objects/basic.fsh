#version 460 core

// This will write to what you designated as target 0 for your object shader.
layout(location = 0) out vec4 fragColor;

in vec2 uv;
in vec2 light;
in vec4 color;

in float vertexDistance;

void iris_emitFragment() {
    // This is the basic sampling function. It samples the base texture and lightmap, and applies color.
    fragColor = iris_sampleBaseTex(uv) * iris_sampleLightmap(light) * color;

    // This is an alpha test. It is responsible for discarding fragments based on their alpha value.
    if (iris_discardFragment(fragColor)) discard;

    #ifndef DISABLE_FOG
    // Apply fog
    float mixValue = (vertexDistance - ap.world.fogStart) / (ap.world.fogEnd - ap.world.fogStart);

    float renderDistanceFogStart = ap.camera.renderDistance * 0.95;
    mixValue = max(mixValue, (vertexDistance - renderDistanceFogStart) / (ap.camera.renderDistance - renderDistanceFogStart));

    fragColor = mix(fragColor, ap.world.fogColor, clamp(mixValue, 0.0, 1.0));
    #endif
}