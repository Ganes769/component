import { WidgetRenderer } from "./WidgetRenderer";

export default function DashBoard() {
  const dashboard = {
    widgets: [
      { instanceId: "1", widgetId: "revenue", settings: { range: "7d" } },
      { instanceId: "1", widgetId: "revenue", settings: { range: "71d" } },
    ],
  };
  return dashboard.widgets.map((instance) => (
    <WidgetRenderer key={instance.instanceId} instance={instance} />
  ));
}
