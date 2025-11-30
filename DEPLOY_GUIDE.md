# Hướng dẫn Deploy lên GitHub Pages với domain chuleaf.com

## Bước 1: Chuẩn bị Repository

1. **Kiểm tra repository GitHub:**
   - Repository: `https://github.com/Chupiichup/tea-shop-web`
   - Đảm bảo code đã được push lên GitHub

2. **Kiểm tra branch:**
   - Code chính nên ở branch `main` hoặc `master`

## Bước 2: Cấu hình GitHub Pages

1. **Vào Settings của repository:**
   - Vào: `https://github.com/Chupiichup/tea-shop-web/settings`
   - Scroll xuống phần **Pages**

2. **Cấu hình Source:**
   - **Source**: Chọn `Deploy from a branch`
   - **Branch**: Chọn `gh-pages` (sẽ được tạo tự động khi deploy)
   - **Folder**: `/ (root)`
   - Click **Save**

## Bước 3: Deploy Code

### Cách 1: Sử dụng npm script (Khuyến nghị)

```bash
# 1. Đảm bảo đã cài đặt dependencies
npm install

# 2. Build và deploy
npm run deploy
```

Lệnh này sẽ:
- Build project (tạo folder `dist`)
- Tự động tạo branch `gh-pages`
- Push code lên branch `gh-pages` trên GitHub

### Cách 2: Deploy thủ công

```bash
# 1. Build project
npm run build

# 2. Cài đặt gh-pages nếu chưa có
npm install --save-dev gh-pages

# 3. Deploy
npx gh-pages -d dist
```

## Bước 4: Cấu hình Custom Domain

1. **File CNAME đã được tạo:**
   - File `public/CNAME` đã có nội dung `chuleaf.com`
   - File này sẽ tự động được copy vào `dist` khi build

2. **Cấu hình DNS trên domain provider:**
   
   Vào nhà cung cấp domain (nơi bạn mua domain chuleaf.com) và thêm các DNS records:

   **Option 1: Sử dụng A records (Khuyến nghị)**
   ```
   Type: A
   Name: @ (hoặc để trống)
   Value: 185.199.108.153
   
   Type: A
   Name: @ (hoặc để trống)
   Value: 185.199.109.153
   
   Type: A
   Name: @ (hoặc để trống)
   Value: 185.199.110.153
   
   Type: A
   Name: @ (hoặc để trống)
   Value: 185.199.111.153
   ```

   **Option 2: Sử dụng CNAME (Nếu domain provider hỗ trợ)**
   ```
   Type: CNAME
   Name: @ (hoặc www)
   Value: Chupiichup.github.io
   ```

3. **Xác nhận domain trên GitHub:**
   - Vào: `https://github.com/Chupiichup/tea-shop-web/settings/pages`
   - Trong phần **Custom domain**, nhập: `chuleaf.com`
   - Click **Save**
   - GitHub sẽ tự động tạo file CNAME và verify domain

4. **Chờ DNS propagate:**
   - DNS có thể mất 24-48 giờ để propagate
   - Kiểm tra bằng cách: `ping chuleaf.com` hoặc dùng tool như `https://dnschecker.org`

## Bước 5: Kiểm tra HTTPS

- Sau khi DNS đã propagate, GitHub sẽ tự động cấp SSL certificate
- Website sẽ tự động redirect từ HTTP sang HTTPS
- Có thể mất vài phút đến vài giờ

## Bước 6: Cập nhật code mới

Mỗi khi có thay đổi code:

```bash
# 1. Commit và push code lên main branch
git add .
git commit -m "Your commit message"
git push origin main

# 2. Deploy lên GitHub Pages
npm run deploy
```

## Troubleshooting

### Lỗi: "gh-pages command not found"
```bash
npm install --save-dev gh-pages
```

### Lỗi: Domain không hoạt động
1. Kiểm tra DNS records đã được cấu hình đúng chưa
2. Đợi 24-48 giờ để DNS propagate
3. Kiểm tra file CNAME trong repository: `https://github.com/Chupiichup/tea-shop-web/blob/gh-pages/CNAME`

### Lỗi: 404 khi truy cập routes
- Đảm bảo `vite.config.ts` có `base: '/'` (đã được cấu hình)
- Với SPA (Single Page Application), GitHub Pages cần cấu hình 404 redirect

### Tạo file 404.html để redirect về index.html

Tạo file `public/404.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ChuLeaf Co</title>
    <script>
      // Single Page Apps for GitHub Pages
      // https://github.com/rafgraph/spa-github-pages
      var pathSegmentsToKeep = 0;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

## Kiểm tra sau khi deploy

1. **Kiểm tra GitHub Pages:**
   - Vào: `https://Chupiichup.github.io/tea-shop-web` (nếu chưa cấu hình domain)
   - Hoặc: `https://chuleaf.com` (sau khi cấu hình domain)

2. **Kiểm tra các tính năng:**
   - Navigation hoạt động
   - Firebase Authentication hoạt động
   - Firestore hoạt động
   - Images load đúng

## Lưu ý quan trọng

- **Firebase Config**: Đảm bảo Firebase đã cấu hình đúng domain `chuleaf.com` trong Authorized domains
- **Environment Variables**: Nếu có biến môi trường, cần cấu hình trong GitHub Secrets hoặc hardcode (không khuyến nghị cho sensitive data)
- **Build Output**: Folder `dist` sẽ được deploy, không phải source code

