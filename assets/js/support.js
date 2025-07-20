import { getLayerName } from "./core.js";

const mapping = [
  {
    layerName: "BuildingSceneLayer",
    url: "https://tiles.arcgis.com/tiles/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Esri_Admin_Building/SceneServer",
  },
  {
    layerName: "CatalogLayer",
    url: "https://services3.arcgis.com/TVDq0jswpjtt1Xia/arcgis/rest/services/PNW_Forest_Fuels_Inventory_Status/FeatureServer",
  },
  {
    layerName: "ElevationLayer",
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/OsoLandslide/OsoLandslide_After_3DTerrain/ImageServer",
  },
  {
    layerName: "FeatureLayer",
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3",
  },
  {
    layerName: "ImageryLayer",
    url: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
  },
  {
    layerName: "ImageryTileLayer",
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Toronto/ImageServer",
  },
  {
    layerName: "IntegratedMesh3DTilesLayer",
    url: "https://tiles.arcgis.com/tiles/0z60TleH1Y2qkUzY/arcgis/rest/services/Stuttgart_WGS84/3DTilesServer/tileset.json",
  },
  {
    layerName: "IntegratedMeshLayer",
    url: "https://tiles.arcgis.com/tiles/cFEFS0EWrhfDeVw9/arcgis/rest/services/Buildings_Frankfurt_2021/SceneServer",
  },
  {
    layerName: "MapImageLayer",
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
  },
  {
    layerName: "PointCloudLayer",
    url: "https://tiles.arcgis.com/tiles/V6ZHFr6zdgNZuVG0/arcgis/rest/services/BARNEGAT_BAY_LiDAR_UTM/SceneServer",
  },
  {
    layerName: "SceneLayer",
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Paris_3D_Local_WSL2/SceneServer",
  },
  {
    layerName: "StreamLayer",
    url: "https://geoeventsample1.esri.com:6443/arcgis/rest/services/LABus/StreamServer",
  },
  {
    layerName: "TileLayer",
    url: "https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer",
  },
  {
    layerName: "VectorTileLayer",
    url: "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer",
  },
  {
    layerName: "VoxelLayer",
    url: "https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/EMU_Caribbean_Voxel/SceneServer",
  },
];
async function main() {
  const promises = mapping.map(async ({ layerName, url, disbled }) => {
    if (disbled) {
      $("#list").append(`<li class="list-group-item">${layerName} ✖</li>`);
      return;
    }

    if (layerName === (await getLayerName(url))) {
      $("#list").append(`<li class="list-group-item">${layerName} ✔</li>`);
    } else {
      console.log(`${layerName} failed`);
    }
  });

  await Promise.all(promises);
  $("#loading").remove();
}
main();
