# Prompt để tạo trang Admin thêm sản phẩm

## Prompt đầy đủ:

"Trong dự án React TypeScript `chuleaf-co`, hãy tạo một trang Admin để thêm sản phẩm mới vào Firestore. Yêu cầu cụ thể:

**Trang Admin:**
- Tạo component `AdminAddProductPage` trong thư mục `components/`
- Trang có form với các trường:
  - **Tên sản phẩm** (text, required): Ví dụ "Lục Trà Thái Nguyên - Hộp 50g"
  - **Giá** (number, required): Nhập số tiền VND (ví dụ: 125000), hệ thống tự format thành "125.000 ₫"
  - **Mô tả sản phẩm** (textarea, optional): Mô tả chi tiết về sản phẩm
  - **Link ảnh sản phẩm** (URL, required): Link ảnh từ Unsplash hoặc nguồn khác
  - **Danh mục** (select, optional): Dropdown chọn từ các category có sẵn (Trà Mộc, Trà Ướp Hương, Trà Cụ & Phụ Kiện, Hộp Quà ChuLeaf, Tiệc Trà & Khóa Học)
  - **Tag** (select, optional): Dropdown chọn tag (Mới, Bán chạy, Cao cấp, Tiện lợi, Thượng hạng, Đặc sản, VIP, Lâu năm)
  - **Format** (select, optional): Dropdown chọn format (Lá rời, Túi lọc, Bánh, Hộp quà, Tử Sa, Sứ, Gốm, Thủy tinh, Gỗ)

**Chức năng:**
- Khi bấm nút "Lưu sản phẩm", lấy dữ liệu từ form
- Lưu vào Firestore collection tên là `products` với cấu trúc:
  - `name`: string (tên sản phẩm)
  - `price`: string (đã format với đơn vị VND, ví dụ "125.000 ₫")
  - `image`: string (URL ảnh)
  - `description`: string (optional, nếu có)
  - `categoryId`: string (optional, nếu có - ví dụ "luc-tra", "tra-uop-huong", "tra-cu", "qua-tang")
  - `tag`: string (optional, nếu có)
  - `format`: string (optional, nếu có)
  - `createdAt`: Timestamp (thời gian tạo)
  - `updatedAt`: Timestamp (thời gian cập nhật)
- Sau khi lưu thành công, hiển thị thông báo thành công (có thể dùng alert hoặc banner)
- Reset form sau khi lưu thành công

**UI/UX:**
- Form có style nhất quán với design system hiện tại (stone colors, rounded corners)
- Có preview ảnh khi nhập URL
- Có validation cho các trường required
- Hiển thị loading state khi đang lưu
- Có nút "Back to Account" để quay lại trang account

**Routing:**
- Thêm route `#admin-add-product` vào App.tsx để truy cập trang này

**Lưu ý:**
- Sử dụng Firebase Firestore (`db` từ `firebase.ts`)
- Import `addDoc`, `collection`, `Timestamp` từ `firebase/firestore`
- Format giá tự động: nếu giá không có "₫" thì thêm format VND
- Các trường optional chỉ lưu vào Firestore nếu có giá trị"

---

## Cấu trúc dữ liệu Product trong Firestore:

```typescript
{
  name: string;              // Required: "Lục Trà Thái Nguyên - Hộp 50g"
  price: string;             // Required: "125.000 ₫" (đã format)
  image: string;            // Required: URL ảnh
  description?: string;      // Optional: Mô tả chi tiết
  categoryId?: string;      // Optional: "luc-tra" | "tra-uop-huong" | "tra-cu" | "qua-tang" | ...
  tag?: string;             // Optional: "Mới" | "Bán chạy" | "Cao cấp" | ...
  format?: string;          // Optional: "Lá rời" | "Túi lọc" | "Bánh" | ...
  createdAt: Timestamp;     // Auto: Thời gian tạo
  updatedAt: Timestamp;     // Auto: Thời gian cập nhật
}
```

## Các categoryId có sẵn:

- `tra-nguyen-ban` - Trà Mộc
- `tra-uop-huong` - Trà Ướp Hương
- `tra-cu` - Trà Cụ & Phụ Kiện
- `qua-tang` - Hộp Quà ChuLeaf
- `tiec-tra-khoa-hoc` - Tiệc Trà & Khóa Học

## Các tag phổ biến:

- Mới
- Bán chạy
- Cao cấp
- Tiện lợi
- Thượng hạng
- Đặc sản
- VIP
- Lâu năm

## Các format phổ biến:

- Lá rời
- Túi lọc
- Bánh
- Hộp quà
- Tử Sa
- Sứ
- Gốm
- Thủy tinh
- Gỗ


