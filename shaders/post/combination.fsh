#version 460 core

// This is the combination shader.
// It is the final pass that runs, and should generally be a simple shader that combines data.
// For more complex effects, you'll want a command list.

uniform sampler2D finalTexture;

// This is always provided to the combination shader.
in vec2 uv;

// The combination shader only has one output; the final image.
layout(location = 0) out vec4 fragColor;

void main() {
    fragColor = texture(finalTexture, uv);
}