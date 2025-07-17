# ArcGIS 图层决策树

[English](./README.en-US.md) | 简体中文

一个交互式工具，帮助开发者快速确定在 ArcGIS JS API 中使用哪种 Layer 类型来加载 GIS 服务。

![screenshot](assets/images/screenshot.png)

## ✨ 功能特点

- 🧭 智能服务类型检测
- 🌳 可视化决策树引导
- 📖 官方文档跳转
- 💻 支持内网环境

## 🚀如何使用

**在线**

直接访问 GitHub Pages 部署的版本:  
[https://geodaoyu.github.io/arcgis-layer-decision-tree/](https://geodaoyu.github.io/arcgis-layer-decision-tree/)

输入您的 ArcGIS 服务 URL (如: `https://services.arcgis.com/.../MapServer`)

**离线**

自行部署后支持离线环境。

## 🔬技术方案

魔改了ArcGIS中Layer.[fromArcGISServerUrl](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-Layer.html#fromArcGISServerUrl)方法，使其只返回图层类型。

## 🤝贡献指南

欢迎提交 Issue 或 Pull Request！  
如有任何问题或建议，请通过 Issues 反馈。

---

## 📚 参考

- [Learn Ramda](https://davesnx.github.io/learn-ramda/)
- [RxJS Operator Decision Tree](https://rxjs.dev/operator-decision-tree)
