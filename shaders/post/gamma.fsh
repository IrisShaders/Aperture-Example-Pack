#version 460 core

// If you did not provide a vertex shader, this is provided for you.
in vec2 uv;

uniform sampler2D mainTexture;

// This will write to what you designated as target 0 for your composite shader.
layout(location = 0) out vec4 fragColor;

void main() {
    vec4 color = texture(mainTexture, uv);
    color.rgb = pow(color.rgb, vec3(1.0 / 2.2)); // Apply gamma adjustment; just an example of compositing.

    fragColor = color;
}