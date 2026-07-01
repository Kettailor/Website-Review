# UBPet C41 Review Landing Page

Landing page Next.js review sản phẩm **máy dọn vệ sinh mèo UBPet C41**, dùng asset từ Helipet, thumbnail video review liên quan và phần tổng hợp đánh giá theo các tiêu chí phổ biến trên web cho nhóm máy dọn vệ sinh tự động.

## Chạy local

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

## Kết nối dữ liệu bên ngoài

Tạo file `.env.local` từ `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEWSLETTER_WEBHOOK_URL=https://example.com/webhook
NEWSLETTER_WEBHOOK_TOKEN=optional-token
```

Form checklist gửi POST đến `/api/newsletter`. Nếu `NEWSLETTER_WEBHOOK_URL` được cấu hình, API route sẽ forward lead sang webhook với bearer token tùy chọn.

## SEO và hiệu năng

- Metadata có Title, Description, Open Graph và Twitter Card trong `app/layout.tsx`.
- Product structured data nằm trong `app/page.tsx`.
- Ảnh dùng `next/image`, asset local trong `public/images/ubpet-c41`.
- Video review dùng thumbnail mở YouTube thay vì nhúng iframe mặc định để giữ trang nhẹ.
- Chỉ form là client component; các section review còn lại render phía server.

## Deploy lên Vercel

1. Push branch hiện tại lên GitHub.
2. Import repository trong Vercel.
3. Chọn framework preset `Next.js`.
4. Thêm env vars nếu cần webhook.
5. Deploy.

Build command: `npm run build`

Output: Next.js default
