export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  iconName: string;
  url: string;
  isActive: boolean;
  type: 'tool' | 'report' | 'external';
};
