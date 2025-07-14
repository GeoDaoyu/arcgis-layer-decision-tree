async function getLayerName(url) {
  const Layer = await $arcgis.import("@arcgis/core/layers/Layer.js");
  const layer = await Layer.fromArcGISServerUrl({ url });
  const { declaredClass } = layer;
  const layerName = declaredClass.split(".").at(-1);
  return layerName;
}

function setResult(layerName) {
  const $link = $("<a>", {
    href: `https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-${layerName}.html`,
    class: "link-primary",
    target: "_blank",
    text: layerName,
  });

  $("#result")
    .empty()
    .append($("<p>").html("You want the ").append($link).append("."));
}

$("#result").hide();
$("#form").on("submit", async function (e) {
  e.preventDefault();
  $("#result").fadeOut("slow");
  const url = $("#url").val();
  const layerName = await getLayerName(url);
  setResult(layerName);
  $("#result").fadeIn("slow");
});
