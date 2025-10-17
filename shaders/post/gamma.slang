import aperture;

Sampler2D mainTexture;

// This is a simple way to write to one texture. To write to more, return a struct with multiple SV_TargetN members, like the one below.
/*
struct Output {
    float4 color : SV_Target0;
    float4 normals : SV_Target1;
}
*/

[[shader("fragment")]]
float4 applyGamma(float2 pos : SV_Position) : SV_Target0 { 
    float4 color = mainTexture[int2(pos)]; // acts as texelFetch would in GLSL. mainTexture.Sample is equivalent to `texture`.
    color.rgb = pow(color.rgb, 1.0 / 2.2);
    return color;
}