import { defineConfig } from "umi";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
  },
  locale: {
    default: "zh-CN",
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: "-",
  },
  routes: [
    { path: "/", component: "@/pages/index" },
    { path: "/kinetic", component: "kinetic" },
    { path: "/GibbsAB", component: "GibbsAB" },
    { path: "/GibbsABC", component: "GibbsABC" },
  ],
  fastRefresh: {},
});
