async function getLayerName(url) {
  const Layer = await $arcgis.import("@arcgis/core/layers/Layer.js");
  const layer = await Layer.fromArcGISServerUrl({ url });
  const layerName = layer.declaredClass.split(".").at(-1);
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

$("#form").on("submit", async function (e) {
  e.preventDefault();
  $("button").toggleClass("d-none");
  const url = $("#url").val();
  const layerName = await getLayerName(url);
  setResult(layerName);
  $("#result-card").removeClass("d-none");
  $("#result").fadeIn("slow");
  $("button").toggleClass("d-none");
});

$(".copy").on("click", function () {
  const text = this.getAttribute("data-text");
  $("#url").val(text);
});

$(".goto").on("click", function () {
  const text = this.getAttribute("data-text");
  window.open(text, "_blank");
});
