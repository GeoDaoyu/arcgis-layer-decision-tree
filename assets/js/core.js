export async function getLayerName(url) {
  const Layer = await $arcgis.import("@arcgis/core/layers/Layer.js");
  // hack Layer method, only returns layerName not Layer
  const layerName = await Layer.fromArcGISServerUrl({ url });
  return layerName;
}