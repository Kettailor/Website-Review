# NovaSync One Landing Page

Landing page Next.js cho sản phẩm công nghệ NovaSync One, gồm hero, tính năng nổi bật, thông số kỹ thuật, form đăng ký nhận tin và API route có khả năng đồng bộ dữ liệu ra webhook bên ngoài.

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

Form đăng ký gửi POST đến `/api/newsletter`. Nếu `NEWSLETTER_WEBHOOK_URL` được cấu hình, API route sẽ forward lead sang webhook với bearer token tùy chọn.

## SEO và hiệu năng

- Metadata có Title, Description, Open Graph và Twitter Card trong `app/layout.tsx`.
- Hero image dùng `next/image`, `priority`, responsive `sizes` và định dạng AVIF/WebP qua Next Image Optimization.
- Không dùng SDK UI, icon pack hay webfont bên thứ ba trên client.
- Chỉ component form là client component; các section còn lại render phía server.

## Deploy lên Vercel

1. Push branch `codex/smart-product-landing` lên GitHub.
2. Import repository trong Vercel.
3. Chọn framework preset `Next.js`.
4. Thêm env vars nếu cần webhook.
5. Deploy.

Build command: `npm run build`

Output: Next.js default
