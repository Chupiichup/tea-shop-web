# Hướng dẫn cấu hình Email Firebase Authentication

## 1. Thay đổi tên người gửi thành "ChuLeaf Co."

### Bước 1: Truy cập Firebase Console
1. Vào: https://console.firebase.google.com
2. Đăng nhập và chọn project **chuleaf-17611**

### Bước 2: Vào phần Authentication Templates
1. Click vào **Authentication** ở menu bên trái
2. Click vào tab **Settings** (Cài đặt)
3. Scroll xuống và click vào tab **Templates** (Mẫu)

### Bước 3: Chỉnh sửa template "Password reset"
1. Tìm và click vào template **"Password reset"** (hoặc "Đặt lại mật khẩu")
2. Bạn sẽ thấy các trường có thể chỉnh sửa:

#### **Display name** (Tên hiển thị):
- Thay đổi từ `chuleaf-17611` thành: **`ChuLeaf Co.`**

#### **Subject** (Tiêu đề email):
- Ví dụ: `Đặt lại mật khẩu ChuLeaf Co.` hoặc `Reset mật khẩu - ChuLeaf Co.`

#### **Email body** (Nội dung email):
Bạn có thể tùy chỉnh nội dung, ví dụ:

```
Xin chào,

Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản ChuLeaf Co.

Nhấp vào liên kết sau để đặt lại mật khẩu của bạn:
%LINK%

Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.

Trân trọng,
Đội ngũ ChuLeaf Co.
```

**Lưu ý:** 
- `%LINK%` là biến tự động của Firebase, sẽ được thay thế bằng link reset thực tế
- Bạn có thể thêm logo, màu sắc, và thông tin liên hệ

3. Click **Save** (Lưu) sau khi chỉnh sửa xong

---

## 2. Giảm khả năng email bị vào spam

### A. Tùy chỉnh email template tốt hơn:
- ✅ Thêm thông tin liên hệ rõ ràng
- ✅ Tránh các từ khóa spam (FREE, CLICK HERE, URGENT, v.v.)
- ✅ Sử dụng ngôn ngữ chuyên nghiệp
- ✅ Thêm địa chỉ liên hệ và website

### B. Khuyến khích người dùng:
Trong modal "Quên mật khẩu" của bạn, có thể thêm dòng nhắc nhở:
> "Nếu không thấy email, vui lòng kiểm tra thư mục Spam/Junk Mail"

### C. Xác minh domain (Nâng cao - tùy chọn):
Nếu bạn có domain riêng (ví dụ: chuleaf.com), bạn có thể:
1. Vào Firebase Console → Authentication → Settings → Authorized domains
2. Thêm domain của bạn
3. Cấu hình SPF/DKIM records trong DNS của domain

**Lưu ý:** Việc này phức tạp hơn và cần quyền truy cập DNS của domain.

---

## 3. Kiểm tra sau khi cấu hình

1. Gửi lại email reset mật khẩu từ website
2. Kiểm tra email nhận được:
   - ✅ Tên người gửi hiển thị là "ChuLeaf Co."
   - ✅ Tiêu đề email đã được tùy chỉnh
   - ✅ Nội dung email có thông tin ChuLeaf Co.

---

## 4. Các template khác cần chỉnh sửa (nếu cần)

Ngoài "Password reset", bạn cũng có thể tùy chỉnh:
- **Email address verification** (Xác minh email)
- **Email change** (Thay đổi email)
- **Email link (sign-in)** (Đăng nhập bằng link)

Tất cả đều có thể đổi tên người gửi thành "ChuLeaf Co." theo cách tương tự.


