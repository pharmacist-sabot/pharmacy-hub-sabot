import type { ResourceItem } from '@/types/resource';

type BaseResource = Omit<ResourceItem, 'type'>;

function tool(item: BaseResource): ResourceItem {
  return {
    ...item,
    type: 'tool',
  };
}

function report(item: BaseResource): ResourceItem {
  return {
    ...item,
    type: 'report',
  };
}

function external(item: BaseResource): ResourceItem {
  return {
    ...item,
    type: 'external',
  };
}

const tools: ResourceItem[] = [
  tool({
    id: 'med-safety',
    title: 'MedSafety Net',
    description: 'ระบบบันทึกความคลาดเคลื่อนทางยา',
    iconName: 'AlertTriangle',
    url: 'https://script.google.com/macros/s/AKfycbyrXXZahRLu762PTxm72CtvF9UB9m6L5NNjdH7I06ARkSyJhBpc9O3fmse9SnHXR8Wi/exec',
    isActive: true,
  }),

  tool({
    id: 'med-support',
    title: 'ระบบบันทึกมูลค่ายาสนับสนุน',
    description: 'บันทึกมูลค่ายาสนับสนุนเช่น ยา TB วัคซีน',
    iconName: 'FileSignature',
    url: 'https://med-support-record.web.app/',
    isActive: true,
  }),

  tool({
    id: 'warfarin-calc',
    title: 'โปรแกรมคำนวณยา Warfarin',
    description: 'เครื่องมือช่วยคำนวณขนาดยา Warfarin',
    iconName: 'Calculator',
    url: 'https://sabot-warfarin-calculator.web.app/',
    isActive: true,
  }),

  tool({
    id: 'pedi-dose',
    title: 'โปรแกรมคำนวณยาน้ำเด็ก',
    description: 'คำนวณขนาดยาน้ำสำหรับผู้ป่วยเด็กอย่างแม่นยำ',
    iconName: 'Baby',
    url: 'https://pedi-dose-c9cec.web.app/',
    isActive: true,
  }),

  tool({
    id: 'doc-download',
    title: 'ระบบดาวน์โหลดเอกสาร',
    description: 'ดาวน์โหลดเอกสาร กลุ่มงานเภสัชกรรมฯ รพ.สระโบสถ์',
    iconName: 'FileDown',
    url: 'https://script.google.com/macros/s/AKfycbwA7S3gK4cNiwUdgi5FmD8Sh2A46kK-fHaZSjOHJVnTe-TvUAsSmygPjxUINPgMI3KI/exec',
    isActive: true,
  }),

  tool({
    id: 'hospital-drugs',
    title: 'บัญชียาโรงพยาบาล',
    description: 'ตรวจสอบรายการยาที่มีใช้ในโรงพยาบาลสระโบสถ์',
    iconName: 'Pill',
    url: 'https://sabot-drug-lists.rxdevman.com',
    isActive: true,
  }),

  tool({
    id: 'had-list',
    title: 'บัญชียา High-Alert Drugs',
    description: 'รายการยาที่ต้องใช้ความระมัดระวังเป็นพิเศษ (HAD)',
    iconName: 'Siren',
    url: 'https://high-alert-drugs-sabot.web.app/',
    isActive: true,
  }),

  tool({
    id: 'drug-tracker',
    title: 'ระบบ DrugTracker',
    description: 'ระบบบันทึกและติดตามการสั่งซื้อยา',
    iconName: 'ClipboardList',
    url: 'https://drug-tracker-system.web.app/',
    isActive: true,
  }),

  tool({
    id: 'e-lactancia',
    title: 'e-Lactancia',
    description: 'ฐานข้อมูลการใช้ยาในหญิงให้นมบุตร (ตรวจสอบความปลอดภัยของยา)',
    iconName: 'Link',
    url: 'https://www.e-lactancia.org/',
    isActive: true,
  }),
];

const externals: ResourceItem[] = [
  external({
    id: 'thai-acc-warfarin',
    title: 'Warfarin and NOACs Registry Network',
    description: 'ระบบลงทะเบียนผู้ป่วย Warfarin และ NOACs แห่งประเทศไทย',
    iconName: 'Link',
    url: 'http://thaiacc.org/warfarin/',
    isActive: true,
  }),
];

const reports: ResourceItem[] = [
  report({
    id: 'dashboard-safety',
    title: 'MedSafety Net Dashboard',
    description: 'รายงานและจัดการคลาดเคลื่อนทางยา',
    iconName: 'BarChart3',
    url: 'https://script.google.com/macros/s/AKfycbytUM2FwmVTiTqTBjS_p5LEszr-X92tobG9LDLNsqjZug70wnwBazvKQBuu0PET4MUl/exec',
    isActive: true,
  }),

  report({
    id: 'dashboard-support',
    title: 'รายงานมูลค่ายาสนับสนุน',
    description: 'รายงานมูลค่ายาสนับสนุนในรูปแบบ Dashboard',
    iconName: 'PieChart',
    url: 'https://medsup-dash.netlify.app/',
    isActive: true,
  }),

  report({
    id: 'report-monthly',
    title: 'รายงานสรุปประจำเดือน',
    description: 'รายงานสรุปข้อมูลสำคัญประจำเดือน',
    iconName: 'CalendarRange',
    url: '#',
    isActive: false,
  }),

  report({
    id: 'report-stock',
    title: 'รายงานมูลค่ายาคงคลัง',
    description: 'ตรวจสอบและติดตามมูลค่ายาในคลังยา',
    iconName: 'Banknote',
    url: '#',
    isActive: false,
  }),

  report({
    id: 'report-opd',
    title: 'รายงานการใช้ยาผู้ป่วยนอก',
    description: 'สถิติและแนวโน้มการใช้ยาสำหรับผู้ป่วยนอก (OPD)',
    iconName: 'Users',
    url: '#',
    isActive: false,
  }),
];

export const pharmacyResources: ResourceItem[] = [
  ...tools,
  ...externals,
  ...reports,
];
