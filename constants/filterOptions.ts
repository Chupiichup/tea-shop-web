// Filter options constants

// Main Categories
export const MAIN_CATEGORIES = {
  'tra-nguyen-ban': 'Trà Nguyên Bản',
  'tra-uop-huong': 'Trà Ướp Hương',
  'qua-tang': 'Combo & Quà Tặng',
  'tra-cu': 'Trà Cụ',
  'tiec-tra': 'Tiệc Trà',
} as const;

// Sub-categories mapping
export const SUB_CATEGORIES: Record<string, { id: string; label: string }[]> = {
  'tra-nguyen-ban': [
    { id: 'luc-tra', label: 'Lục Trà' },
    { id: 'bach-tra', label: 'Bạch Trà' },
    { id: 'hoang-tra', label: 'Hoàng Trà' },
    { id: 'o-long', label: 'Ô Long' },
    { id: 'pho-nhi', label: 'Phổ Nhĩ' },
    { id: 'hong-tra', label: 'Hồng Trà' },
  ],
  'tra-uop-huong': [
    { id: 'tra-sen', label: 'Trà Sen' },
    { id: 'tra-lai', label: 'Trà Lài' },
    { id: 'tra-que', label: 'Trà Quế' },
  ],
  'qua-tang': [
    { id: 'qua-tet', label: 'Hộp Quà Tết' },
    { id: 'combo-tra', label: 'Combo Thưởng Trà' },
    { id: 'qua-doanh-nghiep', label: 'Quà Doanh Nghiệp' },
  ],
  'tra-cu': [
    { id: 'bo-tra', label: 'Bộ Trà' },
    { id: 'am-tra', label: 'Ấm Trà' },
    { id: 'chen-tra', label: 'Chén Trà' },
    { id: 'chen-tong', label: 'Chén Tống' },
    { id: 'tra-cu-khac', label: 'Trà Cụ Khác' },
  ],
  'tiec-tra': [
    { id: 'workshop', label: 'Workshop' },
    { id: 'tiec-tra-service', label: 'Tiệc Trà' },
    { id: 'khoa-hoc-online', label: 'Khóa Học Trà Online' },
  ],
};

// Format options (for Trà Nguyên Bản and Trà Ướp Hương)
export const TEA_FORMATS = ['Lá rời', 'Túi lọc', 'Bánh'];

// Origin options (for Trà Nguyên Bản and Trà Ướp Hương)
export const TEA_ORIGINS = ['Thái Nguyên', 'Mộc Châu', 'Tà Xùa', 'Hà Giang'];

// Flavor categories and options
export const FLAVOR_CATEGORIES = {
  'huong-hoa': {
    label: 'Hương Hoa',
    options: [
      'Hoa Sen',
      'Hoa Cúc',
      'Hoa Dành Dành',
      'Hoa Nhài',
      'Hoa Ngọc Lan',
      'Hoa Hoàng Lan',
      'Hoa Lavender',
      'Hoa Bưởi',
      'Hoa Hồng',
    ],
  },
  'huong-qua': {
    label: 'Hương Quả',
    options: ['Quả Thị', 'Cà Phê'],
  },
  'khac': {
    label: 'Khác',
    options: ['Cốm Non', 'Ô Mai', 'Mật Đường', 'Mật Ong', 'Tre Trúc'],
  },
} as const;

// All flavors flattened
export const ALL_FLAVORS = [
  ...FLAVOR_CATEGORIES['huong-hoa'].options,
  ...FLAVOR_CATEGORIES['huong-qua'].options,
  ...FLAVOR_CATEGORIES['khac'].options,
];

// Categories that support format filter
export const FORMAT_SUPPORTED_CATEGORIES = ['tra-nguyen-ban', 'tra-uop-huong'];

// Categories that support origin filter
export const ORIGIN_SUPPORTED_CATEGORIES = ['tra-nguyen-ban', 'tra-uop-huong'];

// Categories that support flavor filter
export const FLAVOR_SUPPORTED_CATEGORIES = ['tra-nguyen-ban', 'tra-uop-huong'];

