
import { Product, Category, NavItem, CategoryDetail, Article } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Trang Chủ', href: '#' },
  { label: 'Về Chúng Tôi', href: '#ve-chung-toi' },
  { 
    label: 'Sản Phẩm', 
    href: '#',
    children: [
      // --- HÀNG TRÊN (Index 0, 1, 2) ---
      {
        label: 'Trà Nguyên Bản',
        href: '#tra-nguyen-ban',
        children: [
          { label: 'Lục Trà', href: '#luc-tra' },
          { label: 'Bạch Trà', href: '#bach-tra' },
          { label: 'Hoàng Trà', href: '#hoang-tra' },
          { label: 'Ô Long', href: '#o-long' },
          { label: 'Phổ Nhĩ', href: '#pho-nhi' },
          { label: 'Hồng Trà', href: '#hong-tra' },
        ]
      },
      {
        label: 'Trà Ướp Hương',
        href: '#tra-uop-huong',
        children: [
            { label: 'Trà Sen', href: '#tra-sen' },
            { label: 'Trà Lài', href: '#tra-lai' },
            { label: 'Trà Quế', href: '#tra-que' },
        ]
      },
      {
        label: 'Combo & Quà Tặng', // Renamed from 'Quà Tặng'
        href: '#qua-tang',
        children: [
            { label: 'Hộp Quà Tết', href: '#qua-tet' },
            { label: 'Combo Thưởng Trà', href: '#combo-tra' },
            { label: 'Quà Doanh Nghiệp', href: '#qua-doanh-nghiep' },
        ]
      },

      // --- HÀNG DƯỚI (Index 3, 4, 5) ---
      {
        label: 'Trà Cụ',
        href: '#tra-cu',
        children: [
          { label: 'Bộ Trà', href: '#bo-tra' },
          { label: 'Ấm Trà', href: '#am-tra' },
          { label: 'Chén Trà', href: '#chen-tra' },
          { label: 'Chén Tống', href: '#chen-tong' },
          { label: 'Trà Cụ Khác', href: '#tra-cu-khac' },
        ]
      },
      {
        label: 'Tiệc Trà',
        href: '#tiec-tra',
        children: [
          { label: 'Workshop', href: '#workshop' },
          { label: 'Tiệc Trà', href: '#tiec-tra-service' },
          { label: 'Khóa Học Trà Online', href: '#khoa-hoc-online' },
        ]
      },
    ]
  },
  { 
    label: 'Khám Phá', 
    href: '#',
    children: [
        { label: 'Cách Pha Trà', href: '#cach-pha-tra' },
        { label: 'Chuyện Trà', href: '#chuyen-tra' },
    ] 
  },
  { label: 'Liên Hệ', href: '#lien-he' },
];

export const CATEGORIES: Category[] = [
  {
    id: 'tra-nguyen-ban', 
    title: 'Trà Mộc', 
    description: 'Hương vị trà mộc mạc từ những đồi cao nguyên.',
    image: '/images/tra-moc-bg.png',
    link: '#tra-nguyen-ban',
  },
  {
    id: 'tra-uop-huong', 
    title: 'Trà Ướp Hương',
    description: 'Sự hòa quyện tinh tế giữa trà và những mùa hoa quả.',
    image: '/images/tra-uop-huong.png',
    link: '#tra-uop-huong',
  },
  {
    id: 'tra-cu', 
    title: 'Trà Cụ & Phụ Kiện',
    description: 'Dụng cụ thưởng trà tinh xảo, nâng tầm nghệ thuật.',
    image: 'images/tra-cu.jpg',
    link: '#tra-cu',
  },
  {
    id: 'qua-tang', 
    title: 'Hộp Quà ChuLeaf',
    description: 'Gói trọn tâm tình trong từng hộp quà biếu tặng.',
    image: 'images/qua-tang.jpg',
    link: '#qua-tang',
  },
];

// --- SUB CATEGORY VISUALS (For Trà Nguyên Bản Page) ---
export const TEA_TYPES_VISUALS = [
    {
        id: 'luc-tra',
        title: 'Lục Trà',
        description: 'Vị chát dịu, hậu ngọt, hương cốm non đặc trưng Thái Nguyên.',
        image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: 'bach-tra',
        title: 'Bạch Trà',
        description: 'Búp non phủ lông tuyết trắng, hương vị thanh tao tinh khiết.',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: 'o-long',
        title: 'Ô Long',
        description: 'Viên tròn, hương hoa lan thơm ngát, vị đượm đà khó quên.',
        image: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: 'hong-tra',
        title: 'Hồng Trà',
        description: 'Mạnh mẽ, sắc nước đỏ thắm, vị ngọt mật ong tự nhiên.',
        image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=400&auto=format&fit=crop'
    },
    {
        id: 'pho-nhi',
        title: 'Phổ Nhĩ',
        description: 'Lên men theo thời gian, vị trầm mặc, màu nước nâu đỏ.',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&auto=format&fit=crop'
    },
     {
        id: 'hoang-tra',
        title: 'Hoàng Trà',
        description: 'Phẩm trà tiến vua, quy trình chế biến cầu kỳ, hương vị vương giả.',
        image: 'https://images.unsplash.com/photo-1571934811356-5cc554bc7d0f?q=80&w=400&auto=format&fit=crop'
    }
];

export const TRENDING_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Oolong Tea',
    price: '250.000 ₫',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=600&auto=format&fit=crop',
    tag: 'Bán chạy',
  },
  {
    id: '2',
    name: 'Jasmine Green Tea',
    price: '180.000 ₫',
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=600&auto=format&fit=crop',
    tag: 'Mới',
  },
  {
    id: '3',
    name: 'Rose Lychee Tea',
    price: '220.000 ₫',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Matcha Starter Kit',
    price: '850.000 ₫',
    image: 'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?q=80&w=600&auto=format&fit=crop',
    tag: 'Combo',
  },
  {
    id: '5',
    name: 'ChuLeaf Gift Box',
    price: '1.200.000 ₫',
    image: 'https://images.unsplash.com/photo-1606446546044-88f89150d67f?q=80&w=600&auto=format&fit=crop',
    tag: 'Đặc biệt',
  },
];

// --- EXTENDED DATA FOR ALL CATEGORY PAGES ---

export const CATEGORY_DETAILS: Record<string, CategoryDetail> = {
  // Trà Nguyên Bản
  'tra-nguyen-ban': {
    id: 'tra-nguyen-ban',
    title: 'Trà Nguyên Bản',
    description: 'Bộ sưu tập những phẩm trà mộc giữ trọn hương vị tinh túy của đất trời.',
    breadcrumb: 'Trà Nguyên Bản',
    parent: { label: 'Sản phẩm', href: '#' }
  },
  'luc-tra': {
    id: 'luc-tra',
    title: 'Lục Trà',
    description: 'Lục trà trong xanh, mộc mạc, lưu giữ trọn vẹn hương vị tươi mới của núi đồi Thái Nguyên.',
    breadcrumb: 'Lục Trà',
    parent: { label: 'Trà Nguyên Bản', href: '#tra-nguyen-ban' }
  },
  'bach-tra': {
    id: 'bach-tra',
    title: 'Bạch Trà',
    description: 'Tinh khiết, thanh tao, như sương sớm ban mai trên đỉnh Tây Côn Lĩnh.',
    breadcrumb: 'Bạch Trà',
    parent: { label: 'Trà Nguyên Bản', href: '#tra-nguyen-ban' }
  },
  'hoang-tra': {
    id: 'hoang-tra',
    title: 'Hoàng Trà',
    description: 'Vị ngọt dịu, hương thơm quyến rũ, phẩm trà tiến vua mang sắc vàng vương giả.',
    breadcrumb: 'Hoàng Trà',
    parent: { label: 'Trà Nguyên Bản', href: '#tra-nguyen-ban' }
  },
  'o-long': {
    id: 'o-long',
    title: 'Ô Long',
    description: 'Hương hoa lan thơm ngát, vị đậm đà, hậu ngọt sâu lắng đầy thi vị.',
    breadcrumb: 'Ô Long',
    parent: { label: 'Trà Nguyên Bản', href: '#tra-nguyen-ban' }
  },
  'pho-nhi': {
    id: 'pho-nhi',
    title: 'Phổ Nhĩ',
    description: 'Trầm mặc, cổ kính, thời gian đọng lại trong từng chén trà lên men theo năm tháng.',
    breadcrumb: 'Phổ Nhĩ',
    parent: { label: 'Trà Nguyên Bản', href: '#tra-nguyen-ban' }
  },
  'hong-tra': {
    id: 'hong-tra',
    title: 'Hồng Trà',
    description: 'Mạnh mẽ, nồng nàn, sắc nước đỏ thắm kiêu sa và vị ngọt mật ong tự nhiên.',
    breadcrumb: 'Hồng Trà',
    parent: { label: 'Trà Nguyên Bản', href: '#tra-nguyen-ban' }
  },

  // Trà Ướp Hương
  'tra-uop-huong': {
    id: 'tra-uop-huong',
    title: 'Trà Ướp Hương',
    description: 'Sự giao thoa tinh tế giữa trà và hương hoa tự nhiên, đánh thức mọi giác quan.',
    breadcrumb: 'Trà Ướp Hương',
    parent: { label: 'Sản phẩm', href: '#' }
  },

  // Quà Tặng
  'qua-tang': {
    id: 'qua-tang',
    title: 'Combo & Quà Tặng',
    description: 'Những hộp quà trà tinh tế, gói ghém tấm chân tình gửi trao người trân quý.',
    breadcrumb: 'Combo & Quà Tặng',
    parent: { label: 'Sản phẩm', href: '#' }
  },

  // Trà Cụ (Main & Sub)
  'tra-cu': {
    id: 'tra-cu',
    title: 'Trà Cụ',
    description: 'Dụng cụ thưởng trà tinh xảo, nâng tầm nghệ thuật trà đạo.',
    breadcrumb: 'Trà Cụ',
    parent: { label: 'Sản phẩm', href: '#' }
  },
  'bo-tra': {
    id: 'bo-tra',
    title: 'Bộ Trà',
    description: 'Những bộ ấm chén đồng bộ, hoàn hảo cho bàn trà của bạn.',
    breadcrumb: 'Bộ Trà',
    parent: { label: 'Trà Cụ', href: '#tra-cu' }
  },
  'am-tra': {
    id: 'am-tra',
    title: 'Ấm Trà',
    description: 'Các loại ấm tử sa, ấm gốm, ấm sứ được chế tác thủ công.',
    breadcrumb: 'Ấm Trà',
    parent: { label: 'Trà Cụ', href: '#tra-cu' }
  },
  'chen-tra': {
    id: 'chen-tra',
    title: 'Chén Trà',
    description: 'Chén quân, chén tống đa dạng kiểu dáng và chất liệu.',
    breadcrumb: 'Chén Trà',
    parent: { label: 'Trà Cụ', href: '#tra-cu' }
  },
  'chen-tong': {
    id: 'chen-tong',
    title: 'Chén Tống',
    description: 'Dụng cụ làm đều trà, giúp nước trà trong và đều vị.',
    breadcrumb: 'Chén Tống',
    parent: { label: 'Trà Cụ', href: '#tra-cu' }
  },
  'tra-cu-khac': {
    id: 'tra-cu-khac',
    title: 'Trà Cụ Khác',
    description: 'Lọc trà, hũ đựng trà, khay trà và các phụ kiện khác.',
    breadcrumb: 'Phụ Kiện',
    parent: { label: 'Trà Cụ', href: '#tra-cu' }
  },

  // Tiệc Trà
  'tiec-tra': {
    id: 'tiec-tra',
    title: 'Tiệc Trà',
    description: 'Dịch vụ tiệc trà trọn gói cho sự kiện của bạn.',
    breadcrumb: 'Tiệc Trà',
    parent: { label: 'Sản phẩm', href: '#' }
  },
  'workshop': {
    id: 'workshop',
    title: 'Workshop',
    description: 'Các lớp học và buổi chia sẻ về văn hóa trà.',
    breadcrumb: 'Workshop',
    parent: { label: 'Tiệc Trà', href: '#tiec-tra' }
  },
  'tiec-tra-service': {
    id: 'tiec-tra-service',
    title: 'Dịch Vụ Tiệc Trà',
    description: 'Tận hưởng không gian trà đạo đẳng cấp ngay tại sự kiện của bạn.',
    breadcrumb: 'Tiệc Trà',
    parent: { label: 'Tiệc Trà', href: '#tiec-tra' }
  },
  'khoa-hoc-online': {
    id: 'khoa-hoc-online',
    title: 'Khóa Học Trà Online',
    description: 'Học cách pha trà và thưởng trà đúng điệu mọi lúc mọi nơi.',
    breadcrumb: 'Khóa Học Online',
    parent: { label: 'Tiệc Trà', href: '#tiec-tra' }
  },

  // Removed Trà Thất and Trà Y related entries
};

export const ALL_PRODUCTS: Product[] = [
  // --- Lục Trà ---
  { id: 'lt-1', categoryId: 'luc-tra', name: 'Lục Trà Thái Nguyên - Hộp 50g', price: '125.000 ₫', image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=800&auto=format&fit=crop', tag: 'Mới', format: 'Lá rời' },
  { id: 'lt-2', categoryId: 'luc-tra', name: 'Lục Trà Thái Nguyên - Túi lọc 20pcs', price: '85.000 ₫', image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=800&auto=format&fit=crop', tag: 'Tiện lợi', format: 'Túi lọc' },
  { id: 'lt-3', categoryId: 'luc-tra', name: 'Lục Trà Shan Tuyết Tà Xùa - 50g', price: '250.000 ₫', image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=800&auto=format&fit=crop', tag: 'Thượng hạng', format: 'Lá rời' },
  
  // --- Bạch Trà ---
  { id: 'bt-1', categoryId: 'bach-tra', name: 'Bạch Trà Tiên - 50g', price: '350.000 ₫', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop', tag: 'Cao cấp', format: 'Lá rời' },
  { id: 'bt-2', categoryId: 'bach-tra', name: 'Bạch Trà Móng Rồng - 100g', price: '500.000 ₫', image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=800&auto=format&fit=crop', format: 'Lá rời' },
  
  // --- Hoàng Trà ---
  { id: 'ht-1', categoryId: 'hoang-tra', name: 'Hoàng Trà Cổ Thụ', price: '400.000 ₫', image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=800&auto=format&fit=crop', format: 'Lá rời' },
  
  // --- Ô Long ---
  { id: 'ol-1', categoryId: 'o-long', name: 'Ô Long Cao Sơn', price: '250.000 ₫', image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=800&auto=format&fit=crop', tag: 'Bán chạy', format: 'Lá rời' },
  { id: 'ol-3', categoryId: 'o-long', name: 'Ô Long Sữa - Túi lọc', price: '95.000 ₫', image: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=800&auto=format&fit=crop', tag: 'Tiện lợi', format: 'Túi lọc' },
  
  // --- Phổ Nhĩ ---
  { id: 'pn-1', categoryId: 'pho-nhi', name: 'Phổ Nhĩ Sống 2018', price: '850.000 ₫', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop', tag: 'Lâu năm', format: 'Bánh' },
  
  // --- Hồng Trà ---
  { id: 'hot-1', categoryId: 'hong-tra', name: 'Hồng Trà Cổ Thụ', price: '220.000 ₫', image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=800&auto=format&fit=crop', format: 'Lá rời' },

  // --- Trà Ướp Hương ---
  { id: 'uh-1', categoryId: 'tra-uop-huong', name: 'Trà Sen Tây Hồ', price: '150.000 ₫', image: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=800&auto=format&fit=crop', format: 'Lá rời', tag: 'Đặc sản' },
  { id: 'uh-2', categoryId: 'tra-uop-huong', name: 'Trà Lài Tự Nhiên', price: '120.000 ₫', image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=800&auto=format&fit=crop', format: 'Túi lọc' },
  { id: 'uh-3', categoryId: 'tra-uop-huong', name: 'Trà Quế Cam Thảo', price: '95.000 ₫', image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?q=80&w=800&auto=format&fit=crop', format: 'Lá rời' },

  // --- Quà Tặng ---
  { id: 'qt-1', categoryId: 'qua-tang', name: 'Set Quà Tặng "An"', price: '550.000 ₫', image: 'https://images.unsplash.com/photo-1549488352-843258fb82fd?q=80&w=800&auto=format&fit=crop', format: 'Hộp quà', tag: 'Bán chạy' },
  { id: 'qt-2', categoryId: 'qua-tang', name: 'Hộp Gỗ Sơn Mài Cao Cấp', price: '1.250.000 ₫', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop', format: 'Hộp quà', tag: 'VIP' },

  // --- Trà Cụ: Bộ Trà ---
  { id: 'bot-1', categoryId: 'bo-tra', name: 'Bộ Trà Tử Sa Nghi Hưng', price: '2.500.000 ₫', image: 'https://images.unsplash.com/photo-1633519128522-835698b67160?q=80&w=800&auto=format&fit=crop', format: 'Tử Sa' },
  { id: 'bot-2', categoryId: 'bo-tra', name: 'Bộ Trà Sứ Trắng Vẽ Tay', price: '850.000 ₫', image: 'https://images.unsplash.com/photo-1578357078586-4917d485053d?q=80&w=800&auto=format&fit=crop', format: 'Sứ' },

  // --- Trà Cụ: Ấm Trà ---
  { id: 'at-1', categoryId: 'am-tra', name: 'Ấm Tử Sa Dáng Tây Thi', price: '1.200.000 ₫', image: 'https://images.unsplash.com/photo-1563205764-69a419515569?q=80&w=800&auto=format&fit=crop', format: 'Tử Sa' },
  { id: 'at-2', categoryId: 'am-tra', name: 'Ấm Thủy Tinh Chịu Nhiệt', price: '250.000 ₫', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop', format: 'Thủy tinh' },

  // --- Trà Cụ: Chén Trà ---
  { id: 'ct-1', categoryId: 'chen-tra', name: 'Chén Thiên Mục', price: '150.000 ₫', image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop', format: 'Gốm' },
];

export const BLOG_ARTICLES: Article[] = [
    // Cách Pha Trà
    {
        id: 'cach-pha-tra-ngon',
        categoryId: 'cach-pha-tra',
        title: 'Cách Pha Trà Xanh Chuẩn Vị Thái Nguyên',
        excerpt: 'Hướng dẫn chi tiết nhiệt độ nước, thời gian hãm và lượng trà để có một ấm trà xanh thơm ngát, không bị chát đắng.',
        image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=800&auto=format&fit=crop',
        date: '20 T10, 2024',
        author: 'Nghệ nhân Trà Việt',
        content: `
            <p>Pha trà xanh không khó, nhưng để có một ấm trà xanh chuẩn vị Thái Nguyên, thơm hương cốm non, nước xanh trong và hậu ngọt sâu thì cần một chút tinh tế.</p>
            <h3>1. Chọn nước pha trà</h3>
            <p>Nước là yếu tố quan trọng nhất. "Nhất nước, nhì trà". Nên dùng nước suối hoặc nước lọc tinh khiết. Tránh dùng nước máy trực tiếp vì mùi clo sẽ làm hỏng hương trà.</p>
            <h3>2. Nhiệt độ nước</h3>
            <p>Đừng bao giờ dùng nước sôi 100 độ C ngay lập tức cho trà xanh. Nhiệt độ lý tưởng là từ 80-85 độ C. Nước quá nóng sẽ làm trà bị "cháy", dẫn đến vị đắng gắt và mất đi hương thơm tinh tế.</p>
            <h3>3. Các bước thực hiện</h3>
            <ul>
                <li><strong>Tráng ấm chén:</strong> Dùng nước sôi tráng qua ấm và chén để làm nóng dụng cụ và vệ sinh.</li>
                <li><strong>Đánh thức trà:</strong> Cho trà vào ấm, rót một ít nước xăm xắp mặt trà rồi chắt bỏ ngay. Bước này giúp lá trà nở ra và loại bỏ bụi bẩn.</li>
                <li><strong>Hãm trà:</strong> Rót nước nóng (80-85 độ) vào ấm, đậy nắp và đợi khoảng 1-2 phút tùy khẩu vị.</li>
                <li><strong>Rót trà:</strong> Rót trà ra chuyên (tống) để làm đều vị trà trước khi rót ra các chén quân mời khách.</li>
            </ul>
        `
    },
    {
        id: 'cach-pha-tra-o-long',
        categoryId: 'cach-pha-tra',
        title: 'Nghệ Thuật Thưởng Thức Trà Ô Long',
        excerpt: 'Ô Long là loại trà bán lên men với hương vị biến đổi phong phú. Khám phá cách đánh thức hương hoa trong từng búp trà.',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop',
        date: '18 T10, 2024',
        author: 'ChuLeaf Team',
        content: `
            <p>Trà Ô Long nổi tiếng với hình dáng viên tròn độc đáo và hương thơm đa dạng từ hoa lan, hoa mộc đến hương sữa. Để pha Ô Long ngon, cần nhiệt độ cao hơn trà xanh.</p>
            <h3>Dụng cụ cần thiết</h3>
            <p>Khuyên dùng ấm Tử Sa hoặc ấm gốm để giữ nhiệt tốt. Chén Tống là không thể thiếu để quan sát màu nước vàng óng ả.</p>
            <h3>Nhiệt độ và Thời gian</h3>
            <p>Sử dụng nước sôi già (95-98 độ C). Thời gian hãm trà Ô Long có thể kéo dài từ 40 giây đến 1 phút cho nước đầu, và tăng dần cho các nước sau. Ô Long tốt có thể pha được 5-7 nước mà vẫn giữ hương vị.</p>
        `
    },
    {
        id: 'cach-lam-matcha-latte',
        categoryId: 'cach-pha-tra',
        title: 'Tự Làm Matcha Latte Tại Nhà',
        excerpt: 'Chỉ với 5 phút và những nguyên liệu đơn giản, bạn có thể tự tay làm ly Matcha Latte thơm béo, đẹp mắt như ngoài quán.',
        image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=800&auto=format&fit=crop',
        date: '15 T10, 2024',
        author: 'Barista ChuLeaf',
        content: `
             <p>Matcha Latte là sự kết hợp hoàn hảo giữa vị chát nhẹ của trà xanh và vị béo ngậy của sữa tươi. Đây là thức uống yêu thích của giới trẻ hiện đại.</p>
             <h3>Nguyên liệu</h3>
             <ul>
                <li>3g bột Matcha Nhật Bản (loại dùng để pha chế)</li>
                <li>50ml nước nóng (80 độ C)</li>
                <li>200ml sữa tươi không đường</li>
                <li>15ml nước đường hoặc mật ong</li>
             </ul>
             <h3>Cách làm</h3>
             <ol>
                <li>Rây bột matcha vào bát để tránh vón cục.</li>
                <li>Thêm nước nóng và dùng chổi chasen (hoặc máy đánh bọt) đánh tan bột trà đến khi nổi bọt mịn.</li>
                <li>Đun ấm sữa tươi (hoặc đánh bọt sữa lạnh nếu uống đá).</li>
                <li>Rót sữa vào ly, sau đó nhẹ nhàng rót cốt trà matcha lên trên để tạo tầng màu đẹp mắt.</li>
             </ol>
        `
    },
     {
        id: 'tra-lanh-cold-brew',
        categoryId: 'cach-pha-tra',
        title: 'Cold Brew Tea - Xu Hướng Trà Lạnh Mới',
        excerpt: 'Cách ủ trà lạnh đơn giản, giải nhiệt mùa hè mà vẫn giữ trọn vẹn vitamin và hương vị thanh mát của lá trà.',
        image: 'https://images.unsplash.com/photo-1517093602195-b40af9688b46?q=80&w=800&auto=format&fit=crop',
        date: '10 T10, 2024',
        author: 'ChuLeaf Team',
        content: 'Nội dung đang cập nhật...'
    },

    // Chuyện Trà
    {
        id: 'lich-su-tra-viet',
        categoryId: 'chuyen-tra',
        title: 'Hành Trình Ngàn Năm Của Trà Việt',
        excerpt: 'Từ những cây chè Shan Tuyết cổ thụ hàng trăm năm tuổi đến văn hóa trà đá vỉa hè. Trà đã đi sâu vào tâm hồn người Việt như thế nào?',
        image: 'https://images.unsplash.com/photo-1533658298282-3783a5df6124?q=80&w=800&auto=format&fit=crop',
        date: '12 T10, 2024',
        author: 'Sử Ký Trà',
        content: `
            <p>Việt Nam là một trong những cái nôi của cây chè thế giới. Trên dãy Hoàng Liên Sơn, những rừng chè Shan Tuyết cổ thụ hàng trăm năm tuổi vẫn sừng sững đón gió sương.</p>
            <h3>Văn hóa trà mộc mạc</h3>
            <p>Khác với Trà Đạo cầu kỳ của Nhật Bản hay Trà Nghệ công phu của Trung Hoa, văn hóa trà Việt mang nét mộc mạc, gần gũi. Đó là bát chè xanh om đặc cắm tăm mời hàng xóm, là ly trà đá vỉa hè mát lạnh giữa trưa hè Hà Nội, hay ấm trà móc câu đãi khách quý ngày Tết.</p>
            <p>Người Việt uống trà để tâm tình, để mở đầu câu chuyện. "Miếng trầu là đầu câu chuyện", nhưng chén trà mới là thứ giữ câu chuyện đượm nồng.</p>
        `
    },
    {
        id: 'shan-tuyet-co-thu',
        categoryId: 'chuyen-tra',
        title: 'Shan Tuyết - Báu Vật Của Núi Rừng Tây Bắc',
        excerpt: 'Tìm hiểu về loài trà mọc trên đỉnh núi cao, quanh năm mây phủ, với lớp lông tươ trắng muốt như tuyết phủ trên búp non.',
        image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=800&auto=format&fit=crop', // Reusing placeholder for consistency
        date: '08 T10, 2024',
        author: 'Người Kể Chuyện',
         content: `
            <p>Ở độ cao trên 1200m tại Hà Giang, Yên Bái, có những cây chè cổ thụ to lớn, thân trắng mốc, rêu phong. Đó là chè Shan Tuyết (chè búp tuyết).</p>
            <h3>Đặc điểm độc đáo</h3>
            <p>Búp chè to, mập, phủ một lớp lông tơ mịn trắng như tuyết. Khi pha, nước trà vàng sánh như mật ong, hương thơm cốm mới ngào ngạt, vị chát dịu và hậu ngọt rất sâu.</p>
            <p>Shan Tuyết là loại trà sạch tự nhiên (organic) tuyệt đối vì cây sống nhờ tinh khí của đất trời, không hề có sự can thiệp của hóa chất.</p>
        `
    },
     {
        id: 'yen-binh-trong-chen-tra',
        categoryId: 'chuyen-tra',
        title: 'Tìm Sự Yên Bình Trong Một Chén Trà',
        excerpt: 'Giữa bộn bề cuộc sống, dành 15 phút mỗi sáng để pha một ấm trà là cách thiền định đơn giản nhất để nuôi dưỡng tâm hồn.',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop',
        date: '01 T10, 2024',
        author: 'ChuLeaf Blog',
        content: 'Nội dung đang cập nhật...'
    }
];
