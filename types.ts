
export enum AppView {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  TOOL_VIEW = 'TOOL_VIEW',
  PAYMENT = 'PAYMENT'
}

export enum ToolType {
  WATERMARK = 'WATERMARK',
  BACKGROUND = 'BACKGROUND',
  ENHANCE = 'ENHANCE',
  UPSCALE = 'UPSCALE'
}

export interface User {
  name: string;
  email: string;
  plan: 'FREE' | 'PRO';
  credits: number;
}

export interface ToolConfig {
  id: ToolType;
  title: string;
  description: string;
  icon: React.ReactNode;
  creditsRequired: number;
}
