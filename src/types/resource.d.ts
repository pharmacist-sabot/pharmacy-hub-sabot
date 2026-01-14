export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  iconName:
    | 'AlertTriangle'
    | 'FileSignature'
    | 'Calculator'
    | 'Baby'
    | 'FileDown'
    | 'Pill'
    | 'Siren'
    | 'ClipboardList'
    | 'BarChart3'
    | 'PieChart'
    | 'CalendarRange'
    | 'Banknote'
    | 'Users'
    | 'Link';
  url: string;
  isActive: boolean;
  type: 'tool' | 'report' | 'external';
};
