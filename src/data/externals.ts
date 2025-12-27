import type { ResourceItem } from '@/types/resource';

export const externals: ResourceItem[] = [
  {
    id: 'thai-acc-warfarin',
    title: 'Warfarin and NOACs Registry Network',
    description: 'ระบบลงทะเบียนผู้ป่วย Warfarin และ NOACs แห่งประเทศไทย',
    iconName: 'Link',
    // External government system (HTTP only)
    // We do not control the protocol of this service
    url: 'http://thaiacc.org/warfarin/',
    isActive: true,
    type: 'external',
  },
];
