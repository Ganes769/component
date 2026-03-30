import RevenueComponent from "./component/Revenue";
import { WidgetDefination } from "./type";

export const registry = new Map<string, WidgetDefination>();
registry.set("revenue", {
  id: "revenue",
  component: RevenueComponent,
  defaultSetting: { range: "30d" },
});

registry.set("revenue", {
  id: "revenue",
  component: RevenueComponent,
  defaultSetting: { range: "30d" },
});
