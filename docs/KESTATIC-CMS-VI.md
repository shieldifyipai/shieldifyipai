# Hướng dẫn sử dụng Keystatic CMS — Shieldify IP

Keystatic quản lý các bài blog trong `src/content/blog`. Nội dung vẫn là file Markdown trong GitHub; website công khai vẫn được Astro tạo thành HTML tĩnh.

## Truy cập CMS

Trên website chính thức:

```text
https://shieldifyip.ai/keystatic
```

Trên máy tính phát triển:

1. Mở terminal tại thư mục dự án.
2. Chạy `npm run dev`.
3. Truy cập `http://127.0.0.1:4321/keystatic`.

Keystatic Cloud quản lý đăng nhập và ghi thay đổi vào GitHub repository `shieldifyipai/shieldifyipai`.

## Hoàn tất Keystatic Cloud

Project Cloud của website là `shieldifyip/shieldifyipai`.

Trong trang **Project settings** của Keystatic Cloud:

1. Đặt **Primary URL** là `https://shieldifyip.ai`.
2. Không thêm `/keystatic` và không thêm dấu `/` cuối URL.
3. Chọn GitHub organisation `shieldifyipai`.
4. Chọn repository `shieldifyipai`.
5. Giữ **Allow local development** nếu muốn dùng CMS tại `127.0.0.1`.
6. Nhấn **Save settings**.

Sau đó push mã nguồn và redeploy trên Vercel. Không cần khai báo các biến GitHub OAuth vì Keystatic Cloud quản lý việc xác thực.

Người được thêm vào team Keystatic Cloud mới có quyền đăng nhập và quản lý bài viết.

## Đăng một bài mới

1. Mở `/keystatic` và đăng nhập.
2. Chọn **Blog Posts → Create**.
3. Điền **Title**; kiểm tra **URL slug** được tạo tự động.
4. Điền SEO title tối đa 60 ký tự và meta description.
5. Chọn ngày đăng, ảnh bìa, alt text, tác giả, danh mục và tags.
6. Soạn nội dung trong **Article content**.
7. Chọn **Featured article** nếu muốn bài được ưu tiên hiển thị.
8. Nhấn **Save**.

Keystatic tạo commit trong GitHub. Vercel phát hiện commit và tự build lại website. Bài mới thường xuất hiện sau khi deployment hoàn tất.

## Chỉnh sửa hoặc xóa bài

- Chỉnh sửa: chọn bài, cập nhật nội dung rồi nhấn **Save**.
- Xóa: mở bài và sử dụng thao tác xóa trong menu của bài.
- Không nên đổi URL slug của bài đã xuất bản vì liên kết cũ sẽ thành 404 nếu chưa tạo redirect.

## Quy chuẩn ảnh và SEO

- Ảnh bìa đề xuất: `1200 × 630 px`, JPG hoặc WebP đã nén.
- Alt text phải mô tả nội dung ảnh, không nhồi từ khóa.
- SEO title không quá 60 ký tự.
- Meta description nên khoảng 140–160 ký tự.
- Mỗi bài nên có một danh mục và 2–5 tags liên quan.
- Kiểm tra bài trên điện thoại sau khi Vercel deploy.

## Xử lý sự cố nhanh

- Không đăng nhập được: kiểm tra Primary URL, quyền thành viên trong team Keystatic Cloud và kết nối GitHub repository.
- Lưu bài nhưng web chưa đổi: mở tab **Deployments** của Vercel và kiểm tra build mới nhất.
- Ảnh không hiển thị: kiểm tra deployment đã chứa file ảnh và đường dẫn bắt đầu bằng `/images/`.
- Keystatic báo URL không hợp lệ: Primary URL chỉ được chứa tên miền, ví dụ `https://shieldifyip.ai`.
