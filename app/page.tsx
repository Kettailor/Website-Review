import Image from "next/image";
import { NewsletterForm } from "./components/newsletter-form";

const features = [
  {
    eyebrow: "01",
    title: "AI Edge phản hồi tức thì",
    description:
      "Nhận diện ngữ cảnh trong nhà, gợi ý ánh sáng, nhiệt độ và an ninh mà không cần đẩy dữ liệu thô lên cloud."
  },
  {
    eyebrow: "02",
    title: "Matter, Thread và Wi-Fi 7",
    description:
      "Đồng bộ đèn, cảm biến, khóa cửa và thiết bị gia dụng từ nhiều hãng trong một luồng điều khiển thống nhất."
  },
  {
    eyebrow: "03",
    title: "Bảo mật theo lớp",
    description:
      "Xử lý cục bộ, mã hóa end-to-end và chế độ riêng tư vật lý giúp gia đình chủ động kiểm soát dữ liệu."
  },
  {
    eyebrow: "04",
    title: "Tự động hóa năng lượng",
    description:
      "Theo dõi thói quen sử dụng, dự báo giờ cao điểm và tối ưu kịch bản tiêu thụ để giảm lãng phí hằng ngày."
  }
];

const specs = [
  ["Bộ xử lý", "8-core NPU 24 TOPS + CPU tiết kiệm điện"],
  ["Kết nối", "Wi-Fi 7, Thread, Matter, BLE 5.4, UWB"],
  ["Cảm biến", "Nhiệt độ, độ ẩm, ánh sáng, chuyển động, tiếng ồn"],
  ["Bảo mật", "Secure Enclave, khóa mic vật lý, E2E encryption"],
  ["Tích hợp", "Webhook, CRM, Google Sheets, Home Assistant"],
  ["Nguồn", "USB-C 45W, chế độ standby dưới 2.2W"]
];

const metrics = [
  ["38%", "tiết kiệm năng lượng"],
  ["120ms", "độ trễ phản hồi"],
  ["180+", "thiết bị Matter"]
];

export default function Home() {
  return (
    <main>
      <header className="site-header" aria-label="Điều hướng chính">
        <a className="brand" href="#top" aria-label="NovaSync One">
          <span className="brand-mark" aria-hidden="true" />
          NovaSync
        </a>
        <nav className="nav-links" aria-label="Các mục trang">
          <a href="#features">Tính năng</a>
          <a href="#specs">Thông số</a>
          <a href="#register">Đăng ký</a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-media" aria-hidden="true">
          <Image
            src="/images/nova-sync-one.png"
            alt=""
            fill
            priority
            quality={82}
            sizes="100vw"
            className="hero-image"
          />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content reveal">
          <p className="kicker">Smart Home Hub AI thế hệ mới</p>
          <h1>NovaSync One</h1>
          <p className="hero-copy">
            Một trung tâm điều khiển nhà thông minh biết học thói quen, bảo mật dữ
            liệu tại nhà và kết nối sẵn sàng với các nền tảng bên ngoài.
          </p>
          <div className="hero-actions" aria-label="Hành động chính">
            <a className="button button-primary" href="#register">
              Nhận lịch ra mắt
              <span aria-hidden="true">-&gt;</span>
            </a>
            <a className="button button-secondary" href="#features">
              Xem tính năng
            </a>
          </div>
          <dl className="hero-proof" aria-label="Chỉ số nổi bật">
            {metrics.map(([value, label]) => (
              <div key={value}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="signal-strip" aria-label="Kết nối nổi bật">
        <span>Edge AI</span>
        <span>Matter Ready</span>
        <span>Webhook API</span>
        <span>Privacy Switch</span>
      </section>

      <section id="features" className="section feature-section">
        <div className="section-heading reveal">
          <p className="kicker">Tính năng nổi bật</p>
          <h2>Từ một lệnh chạm đến toàn bộ hệ sinh thái nhà thông minh.</h2>
          <p>
            Giao diện được thiết kế cho việc quan sát nhanh, tự động hóa sâu và
            kết nối với dữ liệu thực tế của gia đình.
          </p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card reveal" key={feature.title}>
              <span>{feature.eyebrow}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section data-section" aria-labelledby="data-title">
        <div className="data-visual reveal" aria-hidden="true">
          <div className="device-core">
            <span>NovaSync</span>
          </div>
          <div className="data-line line-one" />
          <div className="data-line line-two" />
          <div className="data-line line-three" />
          <span className="data-node node-a">CRM</span>
          <span className="data-node node-b">Sheets</span>
          <span className="data-node node-c">Webhook</span>
        </div>
        <div className="data-copy reveal">
          <p className="kicker">Kết nối dữ liệu mở</p>
          <h2 id="data-title">Sẵn sàng đẩy lead, sự kiện và trạng thái ra ngoài.</h2>
          <p>
            Form trên website gửi dữ liệu đến API route của Next.js. Khi cấu hình
            <code> NEWSLETTER_WEBHOOK_URL </code>, dữ liệu có thể được chuyển tiếp
            đến CRM, Google Sheets, Zapier, Make hoặc backend nội bộ.
          </p>
          <ul className="check-list">
            <li>Validate email trước khi gửi.</li>
            <li>Hỗ trợ bearer token qua biến môi trường.</li>
            <li>Không chèn SDK bên thứ ba vào client.</li>
          </ul>
        </div>
      </section>

      <section id="specs" className="section spec-section">
        <div className="section-heading compact reveal">
          <p className="kicker">Thông số kỹ thuật</p>
          <h2>Gọn trên bàn, đủ sức điều phối cả ngôi nhà.</h2>
        </div>
        <div className="spec-grid">
          {specs.map(([label, value]) => (
            <div className="spec-row reveal" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="register" className="section register-section">
        <div className="register-copy reveal">
          <p className="kicker">Đăng ký nhận tin</p>
          <h2>Trải nghiệm NovaSync One trước khi mở bán.</h2>
          <p>
            Để lại email để nhận bản demo, thông số đầy đủ và ưu đãi đặt trước
            trong đợt mở bán đầu tiên.
          </p>
        </div>
        <NewsletterForm />
      </section>
    </main>
  );
}
