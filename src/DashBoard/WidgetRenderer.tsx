import { registry } from "./Registry";
import { WidgetInstance } from "./type";

export function WidgetRenderer({ instance }: { instance: WidgetInstance }) {
  // 1. Find definition
  const def = registry.get(instance.widgetId);
  console.log(def);
  if (!def) return <div>Unknown widget</div>;

  // 2. Get component
  const Component = def.component;

  // 3. Render it
  return <Component settings={instance.settings} />;
}
