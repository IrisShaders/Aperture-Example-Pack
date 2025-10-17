import aperture;

Sampler2D finalTexture;

[[shader("fragment")]]
float4 main(float2 pos : SV_Position) : SV_Target0 {
    return finalTexture[int2(pos)];
}