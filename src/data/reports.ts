import type { ResourceItem } from '@/types/resource';

export const reports: ResourceItem[] = [
  {
    id: 'dashboard-safety',
    title: 'MedSafety Net Dashboard',
    description: 'รายงานและจัดการคลาดเคลื่อนทางยา',
    iconName: 'BarChart3',
    url: 'https://script.google.com/macros/s/AKfycbytUM2FwmVTiTqTBjS_p5LEszr-X92tobG9LDLNsqjZug70wnwBazvKQBuu0PET4MUl/exec',
    isActive: true,
    type: 'report',
  },
  {
    id: 'dashboard-support',
    title: 'รายงานมูลค่ายาสนับสนุน',
    description: 'รายงานมูลค่ายาสนับสนุนในรูปแบบ Dashboard',
    iconName: 'PieChart',
    url: 'https://medsup-dash.netlify.app/',
    isActive: true,
    type: 'report',
  },
  {
    id: 'report-monthly',
    title: 'รายงานสรุปประจำเดือน',
    description: 'รายงานสรุปข้อมูลสำคัญประจำเดือน',
    iconName: 'CalendarRange',
    url: '#',
    isActive: false,
    type: 'report',
  },
  {
    id: 'report-stock',
    title: 'รายงานมูลค่ายาคงคลัง',
    description: 'ตรวจสอบและติดตามมูลค่ายาในคลังยา',
    iconName: 'Banknote',
    url: '#',
    isActive: false,
    type: 'report',
  },
  {
    id: 'report-opd',
    title: 'รายงานการใช้ยาผู้ป่วยนอก',
    description: 'สถิติและแนวโน้มการใช้ยาสำหรับผู้ป่วยนอก (OPD)',
    iconName: 'Users',
    url: '#',
    isActive: false,
    type: 'report',
  },
];
