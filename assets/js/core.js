export async function getLayerName(url) {
  const Layer = await $arcgis.import("@arcgis/core/layers/Layer.js");
  const layer = await Layer.fromArcGISServerUrl({ url });
  const { declaredClass } = layer;
  const layerName = declaredClass.split(".").at(-1);
  return layerName;
}