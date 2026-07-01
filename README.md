# UBPet C41 Review Landing Page

[![CI/CD](https://github.com/Kettailor/Website-Review/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Kettailor/Website-Review/actions/workflows/ci-cd.yml)

Landing page Next.js review sản phẩm **máy dọn vệ sinh mèo UBPet C41** bằng tiếng Việt. Dự án tập trung vào nội dung SEO, trình bày thông số sản phẩm, hình ảnh minh họa, checklist trước khi mua, form thu lead và chatbot hỗ trợ tư vấn.

## Tính năng

- Trang review sản phẩm UBPet C41 với nội dung tiếng Việt, metadata SEO, Open Graph và Twitter Card.
- Product structured data trong `app/page.tsx`.
- Danh sách sản phẩm/phụ kiện trong `app/data/products.ts`.
- Form checklist gửi lead qua `/api/newsletter`, có thể forward sang webhook ngoài.
- Chatbot tư vấn qua `/api/chat`.
- Tracking hành vi cơ bản qua `/api/track`.
- Vercel Web Analytics qua `@vercel/analytics`.
- Asset ảnh local trong `public/images/ubpet-c41`.

## Công nghệ

- Next.js 16 App Router
- React 19
- TypeScript 6
- Nodemailer cho luồng gửi/forward lead
- Vercel Analytics cho page views trên production
- GitHub Actions cho CI/CD
- Vercel làm đích deploy khuyến nghị

## Chạy local

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

## Biến môi trường

Tạo file `.env.local` từ `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://ubpet-c41-review.vercel.app
NEWSLETTER_WEBHOOK_URL=
NEWSLETTER_WEBHOOK_TOKEN=
```

`NEXT_PUBLIC_SITE_URL` dùng cho metadata/canonical URL. `NEWSLETTER_WEBHOOK_URL` và `NEWSLETTER_WEBHOOK_TOKEN` là tùy chọn; khi cấu hình, API `/api/newsletter` sẽ forward lead sang webhook với bearer token.

## Scripts

```bash
npm run dev        # chạy dev server
npm run build      # build production
npm run start      # chạy production server sau khi build
npm run typecheck  # kiểm tra TypeScript
```

## CI/CD

Workflow nằm tại `.github/workflows/ci-cd.yml`.

- CI chạy khi push hoặc mở pull request.
- CI cài dependency bằng `npm ci`, sau đó chạy `npm run typecheck` và `npm run build`.
- CD lên Vercel được cấu hình cho push vào branch `main`.
- Nếu thiếu secrets Vercel, job deploy sẽ bỏ qua và không làm fail workflow.

Để bật CD Vercel, thêm các GitHub repository secrets:

```bash
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
```

## Deploy thủ công lên Vercel

1. Push code lên GitHub.
2. Import repository trong Vercel.
3. Chọn framework preset `Next.js`.
4. Thêm biến môi trường nếu dùng webhook.
5. Deploy.

Build command: `npm run build`

Output: Next.js default.

## Nguồn tài nguyên

Nguồn tham khảo chính: [Helipet - Máy dọn vệ sinh mèo UBPet C41](https://helipet.vn/may-don-ve-sinh-meo-ubpet-c41).

Các thông tin tham khảo từ trang nguồn gồm:

| Hạng mục | Giá trị tham khảo |
| --- | --- |
| Thương hiệu | UBPet |
| Giá hiển thị | 9.450.000 VND |
| Dung tích cabin | 106L |
| Dung tích hộp chất thải | 6.7L |
| Cân nặng mèo phù hợp | 1-15kg |
| Kết nối | Wi-Fi 2.4GHz + Bluetooth |
| Ứng dụng | UBPET-ASIA |
| Kích thước | 63 x 51 x 57cm |
| Chiều cao cửa vào | 20cm |
| Trọng lượng máy | 10kg |
| Phân phối chính hãng | HeLiCorp / HeLiPet |

Giá, khuyến mãi, chính sách bảo hành và tình trạng hàng có thể thay đổi theo thời điểm. Khi dùng cho nội dung thương mại, hãy kiểm tra lại trang nguồn và quyền sử dụng hình ảnh/nội dung với Helipet hoặc chủ sở hữu tương ứng.

## License

Mã nguồn trong repository này được phát hành theo giấy phép MIT. Xem [LICENSE](./LICENSE).

Lưu ý: MIT license chỉ áp dụng cho phần mã nguồn do repository này cung cấp. Hình ảnh, nhãn hiệu, dữ liệu sản phẩm và nội dung tham khảo từ Helipet/UBPet thuộc quyền sở hữu của các bên tương ứng và không tự động được cấp phép lại theo MIT.
