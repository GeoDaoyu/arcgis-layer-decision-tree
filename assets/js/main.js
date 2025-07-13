async function getLayerName(url) {
  const Layer = await $arcgis.import("@arcgis/core/layers/Layer.js");
  const layer = await Layer.fromArcGISServerUrl({ url });
  const { declaredClass } = layer;
  const layerName = declaredClass.split(".").at(-1);

  return layerName;
}

function setResult(layerName) {
  const resultDiv = document.getElementById("result");
  const content = `<p>You want the <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-${layerName}.html" class="link-primary" target="_blank">${layerName}</a>.</p>`;
  resultDiv.innerHTML = content;
}

const btn = document.getElementById("submit");
btn.addEventListener("click", async () => {
  const url = document.getElementById("url").value;
  const layerName = await getLayerName(url);
  setResult(layerName);
});
