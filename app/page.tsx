import Image from "next/image";
import { NewsletterForm } from "./components/newsletter-form";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ubpet-c41-review.vercel.app";

const reviewScores = [
  ["An toàn cảm biến", "9.0", "Nhiều lớp phát hiện: cân, hồng ngoại, chống kẹt, chống nhiễu ánh nắng."],
  ["Không gian cabin", "9.2", "106L, cửa 20cm, hợp mèo lớn và mèo chân ngắn hơn nhiều mẫu cửa cao."],
  ["Khử mùi & vệ sinh", "8.4", "Hộp rác kín, lót silicone chống bám, nhưng hiệu quả vẫn phụ thuộc cát và lịch thay túi."],
  ["App & dữ liệu", "8.1", "Theo dõi cân nặng, lịch sử đi vệ sinh, dọn từ xa qua UBPET-ASIA."]
];

const verdicts = [
  {
    label: "Nên mua nếu",
    title: "Bạn nuôi 1-3 mèo trưởng thành và muốn giảm việc xúc cát mỗi ngày.",
    items: ["Cần cabin rộng", "Ưu tiên cảm biến an toàn", "Muốn theo dõi thói quen đi vệ sinh qua app"]
  },
  {
    label: "Cân nhắc nếu",
    title: "Không gian đặt máy hẹp, mèo quá nhạy tiếng động hoặc đang dùng cát gỗ/cát thủy tinh.",
    items: ["Máy nặng 10kg", "Wi-Fi 2.4GHz", "Cần tập làm quen theo từng bước"]
  }
];

const reviewSignals = [
  {
    title: "Điểm cộng lớn nhất: cửa vào thấp",
    copy:
      "Trong nhóm máy dạng lồng xoay, chiều cao cửa là thứ ảnh hưởng trực tiếp đến việc mèo có chịu bước vào hay không. UBPet C41 đặt cửa khoảng 20cm, dễ tiếp cận hơn nhiều mẫu có cửa cao."
  },
  {
    title: "Cảm biến là tiêu chí bắt buộc",
    copy:
      "Các bài test máy dọn vệ sinh tự động đều nhấn mạnh cảm biến an toàn phải được ưu tiên trước tiện ích. C41 có nhiều lớp cảm biến và cơ chế dừng khi phát hiện mèo."
  },
  {
    title: "Khử mùi tốt hay không phụ thuộc cả vận hành",
    copy:
      "Hộp rác kín giúp giảm mùi, nhưng mùi thực tế còn phụ thuộc loại cát, độ kín túi rác, tần suất thay túi và việc lau lớp lót sau một thời gian dùng."
  },
  {
    title: "App hữu ích cho người hay vắng nhà",
    copy:
      "Theo dõi cân nặng, tần suất đi vệ sinh và kích hoạt dọn từ xa là giá trị đáng tiền, nhất là khi bạn cần phát hiện thay đổi bất thường ở mèo sớm hơn."
  }
];

const specs = [
  ["Giá tham khảo", "9.450.000đ", "Bản bảo hành 12 tháng tại Helipet"],
  ["Dung tích cabin", "106L", "Rộng cho mèo lớn, Helipet mô tả dùng được tới 3 bé"],
  ["Hộp chất thải", "6.7L", "Khoảng 14 ngày cho 1 mèo"],
  ["Mèo phù hợp", ">= 6 tháng, >= 1.5kg", "Cân nặng hỗ trợ đến 15kg"],
  ["Kích thước", "63 x 51 x 57cm", "Nên đo sẵn góc đặt máy"],
  ["Cửa vào", "20cm", "Thân thiện hơn với mèo chân ngắn hoặc mèo lớn tuổi"],
  ["Kết nối", "Wi-Fi 2.4GHz + Bluetooth", "App UBPET-ASIA"],
  ["Loại cát", "Đất sét, khoáng, hỗn hợp", "Không khuyến nghị cát gỗ/cát thủy tinh"]
];

const gallery = [
  {
    src: "/images/ubpet-c41/ubpet-c41-side.png",
    alt: "Góc nghiêng máy dọn vệ sinh mèo UBPet C41",
    label: "Cabin lồng xoay"
  },
  {
    src: "/images/ubpet-c41/ubpet-c41-detail.png",
    alt: "Chi tiết thiết kế máy UBPet C41",
    label: "Cấu trúc tháo rời"
  },
  {
    src: "/images/ubpet-c41/ubpet-c41-cabin.webp",
    alt: "Không gian cabin UBPet C41",
    label: "Khoang 106L"
  }
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Máy dọn vệ sinh mèo UBPet C41",
  brand: {
    "@type": "Brand",
    name: "UBPet"
  },
  image: `${siteUrl}/images/ubpet-c41/ubpet-c41-hero.png`,
  description:
    "Review máy dọn vệ sinh mèo UBPet C41 với cabin 106L, app UBPET-ASIA, nhiều lớp cảm biến an toàn và hộp chất thải 6.7L.",
  offers: {
    "@type": "Offer",
    priceCurrency: "VND",
    price: "9450000",
    availability: "https://schema.org/InStock",
    url: "https://helipet.vn/may-don-ve-sinh-meo-ubpet-c41"
  },
  review: {
    "@type": "Review",
    author: {
      "@type": "Organization",
      name: "Website Review"
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "8.6",
      bestRating: "10",
      worstRating: "1"
    },
    reviewBody:
      "UBPet C41 đáng cân nhắc nhờ cabin lớn, cửa vào thấp, app theo dõi và nhiều lớp cảm biến. Người mua nên kiểm tra không gian đặt máy, loại cát đang dùng và thói quen của mèo trước khi quyết định."
  }
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="site-header" aria-label="Điều hướng chính">
        <a className="brand" href="#top" aria-label="UBPet C41 Review">
          <span className="brand-mark" aria-hidden="true" />
          UBPet C41
        </a>
        <nav className="nav-links" aria-label="Các mục trang">
          <a href="#verdict">Kết luận</a>
          <a href="#video">Video</a>
          <a href="#specs">Thông số</a>
          <a href="#register">Tư vấn</a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy reveal">
          <p className="kicker">Review máy dọn vệ sinh mèo tự động</p>
          <h1>
            UBPet C41
            <span>có đáng mua?</span>
          </h1>
          <p>
            Một bản review biên tập dựa trên thông số Helipet, video liên quan và
            những tiêu chí được nhắc lại nhiều trong các bài test máy dọn vệ sinh
            tự động: an toàn, mùi, loại cát, app và khả năng mèo chịu dùng.
          </p>
          <div className="hero-actions" aria-label="Hành động chính">
            <a className="button button-primary" href="#verdict">
              Xem kết luận
              <span aria-hidden="true">-&gt;</span>
            </a>
            <a className="button button-secondary" href="#video">
              Xem video review
            </a>
          </div>
          <dl className="hero-stats" aria-label="Thông tin nhanh">
            <div>
              <dt>8.6/10</dt>
              <dd>điểm biên tập</dd>
            </div>
            <div>
              <dt>106L</dt>
              <dd>cabin rộng</dd>
            </div>
            <div>
              <dt>20cm</dt>
              <dd>cửa vào</dd>
            </div>
          </dl>
        </div>

        <div className="hero-stage reveal" aria-label="Hình sản phẩm UBPet C41">
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <div className="price-pill">9.450.000đ</div>
          <Image
            src="/images/ubpet-c41/ubpet-c41-hero.png"
            alt="Máy dọn vệ sinh mèo UBPet C41 màu trắng"
            width={840}
            height={840}
            priority
            quality={82}
            sizes="(max-width: 900px) 92vw, 44vw"
            className="hero-product"
          />
          <div className="stage-card stage-card-left">
            <span>6.7L</span>
            <small>hộp rác</small>
          </div>
          <div className="stage-card stage-card-right">
            <span>5W</span>
            <small>công suất</small>
          </div>
        </div>
      </section>

      <section className="review-marquee" aria-label="Điểm nhấn review">
        <span>Cảm biến nhiều lớp</span>
        <span>Cabin 106L</span>
        <span>App UBPET-ASIA</span>
        <span>Hộp rác kín</span>
      </section>

      <section id="verdict" className="section verdict-section">
        <div className="section-heading reveal">
          <p className="kicker">Kết luận nhanh</p>
          <h2>Đáng mua nếu bạn muốn một máy rộng, an toàn và có app theo dõi.</h2>
          <p>
            Điểm mạnh của UBPet C41 nằm ở kích thước cabin, cửa vào thấp và bộ
            cảm biến. Điểm cần cân nhắc là máy vẫn cần đúng loại cát, đúng vị trí
            đặt, và mèo cần thời gian làm quen như mọi máy dọn tự động khác.
          </p>
        </div>
        <div className="verdict-grid">
          {verdicts.map((verdict) => (
            <article className="verdict-card reveal" key={verdict.label}>
              <span>{verdict.label}</span>
              <h3>{verdict.title}</h3>
              <ul>
                {verdict.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section score-section">
        <div className="score-header reveal">
          <p className="kicker">Chấm điểm biên tập</p>
          <h2>Nhìn theo tiêu chí mua thật, không chỉ nhìn thông số.</h2>
        </div>
        <div className="score-grid">
          {reviewScores.map(([title, score, copy]) => (
            <article className="score-card reveal" key={title}>
              <div className="score-ring" aria-label={`${title}: ${score}/10`}>
                {score}
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="video" className="section video-section">
        <div className="video-card reveal">
          <Image
            src="/images/ubpet-c41/ubpet-c41-video.jpg"
            alt="Thumbnail video review máy dọn vệ sinh mèo UBPet C41"
            fill
            quality={80}
            sizes="(max-width: 900px) 100vw, 58vw"
            className="video-thumb"
          />
          <a
            className="play-button"
            href="https://www.youtube.com/watch?v=jzJkz0DbwTs"
            target="_blank"
            rel="noreferrer"
            aria-label="Mở video review UBPet C41 trên YouTube"
          >
            <span aria-hidden="true">▶</span>
          </a>
        </div>
        <div className="video-copy reveal">
          <p className="kicker">Video review liên quan</p>
          <h2>Xem máy vận hành trước khi quyết định đặt trong nhà.</h2>
          <p>
            Video là cách nhanh nhất để kiểm tra tiếng động, nhịp quay, cách đổ
            cát và thao tác thay túi. Mình để video dạng thumbnail mở YouTube để
            giữ trang nhẹ hơn so với nhúng iframe ngay từ đầu.
          </p>
          <a className="inline-link" href="https://helipet.vn/may-don-ve-sinh-meo-ubpet-c41">
            Xem trang sản phẩm gốc tại Helipet
          </a>
        </div>
      </section>

      <section className="section signals-section">
        <div className="section-heading reveal">
          <p className="kicker">Tổng hợp đánh giá trên web</p>
          <h2>Những điểm cần soi khi mua máy dọn vệ sinh tự động.</h2>
          <p>
            Các review độc lập cho đúng mã C41 hiện không nhiều. Vì vậy phần này
            đối chiếu C41 với các tiêu chí lặp lại trong những bài test máy dọn
            vệ sinh tự động phổ biến: an toàn, mùi, kích thước, loại cát và app.
          </p>
        </div>
        <div className="signal-grid">
          {reviewSignals.map((signal) => (
            <article className="signal-card reveal" key={signal.title}>
              <h3>{signal.title}</h3>
              <p>{signal.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section gallery-section" aria-label="Ảnh sản phẩm">
        {gallery.map((item) => (
          <figure className="gallery-item reveal" key={item.src}>
            <Image
              src={item.src}
              alt={item.alt}
              width={720}
              height={540}
              sizes="(max-width: 900px) 100vw, 31vw"
            />
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </section>

      <section id="specs" className="section specs-section">
        <div className="section-heading compact reveal">
          <p className="kicker">Thông số kỹ thuật</p>
          <h2>Những con số ảnh hưởng trực tiếp tới trải nghiệm dùng hằng ngày.</h2>
        </div>
        <div className="spec-table">
          {specs.map(([label, value, note]) => (
            <div className="spec-row reveal" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="register" className="section register-section">
        <div className="register-copy reveal">
          <p className="kicker">Checklist trước khi mua</p>
          <h2>Gửi thông tin, nhận checklist chọn máy phù hợp với mèo nhà bạn.</h2>
          <p>
            Form này vẫn sẵn sàng kết nối webhook ngoài qua API route của Next.js.
            Bạn có thể đẩy lead sang CRM, Google Sheets, Make hoặc Zapier bằng
            biến môi trường.
          </p>
        </div>
        <NewsletterForm />
      </section>
    </main>
  );
}
