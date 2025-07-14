import { getLayerName } from "./core.js";

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

$(".copy").on("click", function () {
  const text = this.getAttribute("data-text");
  $("#url").val(text);
});

$(".goto").on("click", function () {
  const text = this.getAttribute("data-text");
  window.open(text, "_blank");
});
