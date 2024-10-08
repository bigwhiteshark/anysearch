export type TModelInfo = {
  platform: keyof typeof platform;
  type: string;
  models: string[];
  url?: string;
};
