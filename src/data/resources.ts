import type { ResourceItem } from '@/types/resource';

import { externals } from './externals';
import { reports } from './reports';
import { tools } from './tools';

export const pharmacyResources: ResourceItem[] = [
  // tools
  ...tools,
  // external systems
  ...externals,
  // reports
  ...reports,
];
