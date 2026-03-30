/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export type WidgetDefination = {
  id: string;
  component: any;
  defaultSetting: any;
};
export type WidgetInstance = {
  instanceId: string;
  widgetId: string;
  settings: any;
};
export type DashboardConfig = {
  widgets: WidgetInstance[];
};
