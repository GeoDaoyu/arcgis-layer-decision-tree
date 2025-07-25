// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.32/esri/copyright.txt for details.
//>>built
define(
  "require exports ../../core/Error ../../core/urlUtils ./arcgisLayerUrl ./associatedFeatureServiceUtils ./fetchService ./layerUtils ./lazyLayerLoader ../../support/requestPresets".split(
    " "
  ),
  function (B, u, r, v, w, C, n, x, D, l) {
    function y(a, b) {
      return a ? a.find(({ id: c }) => c === b) : null;
    }
    function z(a, b, c, f, e) {
      b = { ...e, layerId: b };
      null != a && (b.url = a);
      null != c && (b.sourceJSON = c);
      "sublayerTitleMode" in f.prototype &&
        (b.sublayerTitleMode = "service-name");
      return new f(b);
    }
    async function E(a, b, c) {
      const f = b.sublayerConstructorProvider;
      for (const { id: d, serverUrl: g } of b.layers) {
        var e = y(b.sublayerInfos, d);
        const k = (e && f?.(e)) ?? b.Constructor;
        e = z(g, d, e, k, c);
        a.add(e);
      }
      if (b.tables.length) {
        const d = await t("FeatureLayer");
        b.tables.forEach(({ id: g, serverUrl: k }) => {
          g = z(k, g, y(b.tableInfos, g), d, c);
          a.tables.add(g);
        });
      }
    }
    async function F(a, b) {
      var c = w.parse(a);
      null == c && (c = await G(a, b));
      if (null == c)
        throw new r(
          "arcgis-layers:url-mismatch",
          "The url '${url}' is not a valid arcgis resource",
          { url: a }
        );
      const { serverType: f, sublayer: e } = c;
      var d = {
        FeatureServer: "FeatureLayer",
        KnowledgeGraphServer: "KnowledgeGraphLayer",
        StreamServer: "StreamLayer",
        VectorTileServer: "VectorTileLayer",
        VideoServer: "VideoLayer",
      };
      const g = "FeatureServer" === f;
      var k = "SceneServer" === f;
      const h = {
        parsedUrl: c,
        Constructor: null,
        layerId: g || k ? e ?? void 0 : void 0,
        layers: [],
        tables: [],
      };
      switch (f) {
        case "MapServer":
          if (null != e)
            switch (
              (({ type: d } = await l.fetchArcGISServiceJSON(a, {
                customParameters: b,
              })),
              (c = "FeatureLayer"),
              d)
            ) {
              case "Catalog Layer":
                c = "CatalogLayer";
                break;
              case "Catalog Dynamic Group Layer":
                throw new r(
                  "arcgis-layers:unsupported",
                  `fromUrl() not supported for "${d}" layers`
                );
            }
          else c = (await H(a, b)) ? "TileLayer" : "MapImageLayer";
          break;
        case "ImageServer":
          c = await l.fetchArcGISServiceJSON(a, { customParameters: b });
          const { tileInfo: p, cacheType: m } = c;
          c = p
            ? "LERC" !== p?.format?.toUpperCase() ||
              (m && "elevation" !== m.toLowerCase())
              ? "ImageryTileLayer"
              : "ElevationLayer"
            : "ImageryLayer";
          break;
        case "SceneServer":
          d = await l.fetchArcGISServiceJSON(c.url.path, {
            customParameters: b,
          });
          c = "SceneLayer";
          if (d) {
            const q = d?.layers;
            "Voxel" === d?.layerType
              ? (c = "VoxelLayer")
              : q?.length &&
                ((d = q[0]?.layerType),
                null != d &&
                  null != x.sceneServiceLayerTypeToClassName[d] &&
                  (c = x.sceneServiceLayerTypeToClassName[d]));
          }
          break;
        case "3DTilesServer":
          c = "IntegratedMesh3DTilesLayer";
          break;
        case "FeatureServer":
          c = "FeatureLayer";
          null != e &&
            ((c = await l.fetchArcGISServiceJSON(a, { customParameters: b })),
            (h.sourceJSON = c),
            (c = n.getLayerModuleType(c.type)));
          break;
        default:
          c = d[f];
      }
      if (I[c] && null == e)
        if (
          ((a = await J(a, f, b)),
          g &&
            ((h.sublayerInfos = a.layerInfos), (h.tableInfos = a.tableInfos)),
          1 !== a.layers.length + a.tables.length)
        )
          (h.layers = a.layers),
            (h.tables = a.tables),
            g &&
              a.layerInfos?.length &&
              (h.sublayerConstructorProvider = await K(a.layerInfos));
        else if (g || k)
          (k = a.layerInfos?.[0] ?? a.tableInfos?.[0]),
            (h.layerId = a.layers[0]?.id ?? a.tables[0]?.id),
            (h.sourceJSON = k),
            g && (c = n.getLayerModuleType(k?.type));
      return c;
    }
    async function G(a, b) {
      b = await l.fetchArcGISServiceJSON(a, { customParameters: b });
      let c = null,
        f = null;
      var e = b.type;
      "Feature Layer" === e || "Table" === e
        ? ((c = "FeatureServer"), (f = b.id ?? null))
        : "indexedVector" === e
        ? (c = "VectorTileServer")
        : b.hasOwnProperty("mapName")
        ? (c = "MapServer")
        : b.hasOwnProperty("bandCount") && b.hasOwnProperty("pixelSizeX")
        ? (c = "ImageServer")
        : b.hasOwnProperty("maxRecordCount") &&
          b.hasOwnProperty("allowGeometryUpdates")
        ? (c = "FeatureServer")
        : b.hasOwnProperty("streamUrls")
        ? (c = "StreamServer")
        : A(b)
        ? ((c = "SceneServer"), (f = b.id))
        : b.hasOwnProperty("layers") && A(b.layers?.[0]) && (c = "SceneServer");
      if (!c) return null;
      e = null != f ? w.parseNonStandardSublayerUrl(a) : null;
      return {
        title: (null != e && b.name) || v.getFilename(a),
        serverType: c,
        sublayer: f,
        url: { path: null != e ? e.serviceUrl : v.urlToObject(a).path },
      };
    }
    function A(a) {
      return (
        null != a &&
        a.hasOwnProperty("store") &&
        a.hasOwnProperty("id") &&
        "number" === typeof a.id
      );
    }
    async function J(a, b, c) {
      let f = !1,
        e;
      switch (b) {
        case "FeatureServer":
          a = await n.fetchFeatureService(a, { customParameters: c });
          f = !!a.layersJSON;
          a = a.layersJSON || a.serviceJSON;
          break;
        case "SceneServer":
          b = await L(a, c);
          a = b.serviceInfo;
          e = b.tableServerUrl;
          break;
        default:
          a = await l.fetchArcGISServiceJSON(a, { customParameters: c });
      }
      b = a?.layers;
      a = a?.tables;
      return {
        layers: b?.map((d) => ({ id: d.id })).reverse() || [],
        tables: a?.map((d) => ({ serverUrl: e, id: d.id })).reverse() || [],
        layerInfos: f ? b : [],
        tableInfos: f ? a : [],
      };
    }
    async function L(a, b) {
      const c = await l.fetchArcGISServiceJSON(a, { customParameters: b });
      if (!c.layers?.[0]) return { serviceInfo: c };
      try {
        const { serverUrl: f } = await C.findAssociatedFeatureService(a),
          e = await l
            .fetchArcGISServiceJSON(f, { customParameters: b })
            .catch(() => null);
        e && (c.tables = e.tables);
        return { serviceInfo: c, tableServerUrl: f };
      } catch {
        return { serviceInfo: c };
      }
    }
    async function t(a) {
      return (0, D.layerLookupMap[a])();
    }
    async function H(a, b) {
      return (await l.fetchArcGISServiceJSON(a, { customParameters: b }))
        .tileInfo;
    }
    async function K(a) {
      if (a.length) {
        var b = new Set(),
          c = [];
        for (const { type: d } of a)
          b.has(d) || (b.add(d), c.push(t(n.getLayerModuleType(d))));
        var f = await Promise.all(c),
          e = new Map();
        Array.from(b).forEach((d, g) => {
          e.set(d, f[g]);
        });
        return (d) => e.get(d.type);
      }
    }
    const I = { FeatureLayer: !0, SceneLayer: !0 };
    u.fromUrl = async function (a) {
      const { properties: b, url: c } = a;
      a = { ...b, url: c };
      const f = await F(c, b?.customParameters);
      return f;
    };
    Object.defineProperty(u, Symbol.toStringTag, { value: "Module" });
  }
);
