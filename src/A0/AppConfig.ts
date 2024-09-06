

export const enum TransformationType{
    Linear="Linear",
    Affine="Affine"
}

export const AppConfig = {
    TransformType: TransformationType.Linear,
    // TransformType: TransformationType.Affine
    ScreenScale: 12,
    GraphicsContextResolution: 500,
    ArrowheadSize: 0.12,
    VectorWeight: 0.008,
    // ScreenScale: 10
}
