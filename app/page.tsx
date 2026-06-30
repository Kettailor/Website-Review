"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { NewsletterForm } from "./components/newsletter-form";
import { SiteControls } from "./components/site-controls";
import { Scrollytelling } from "./components/scrollytelling";
import { ProductCard } from "./components/product-card";
import { ProductDetailModal } from "./components/product-detail-modal";
import { PRODUCTS, Product } from "./data/products";
import { useApp } from "./components/providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ubpet-c41-review.vercel.app";

type Localized = {
  vi: string;
  en: string;
};

function Text({ vi, en }: Localized) {
  return (
    <>
      <span className="i18n i18n-vi">{vi}</span>
      <span className="i18n i18n-en">{en}</span>
    </>
  );
}

const reviewScores = [
  {
    title: { vi: "An toàn cảm biến", en: "Sensor safety" },
    score: "9.0",
    copy: {
      vi: "Nhiều lớp phát hiện: cân, hồng ngoại, chống kẹt và chống nhiễu ánh nắng.",
      en: "Multiple detection layers: weight, infrared, anti-pinch and sunlight interference protection."
    }
  },
  {
    title: { vi: "Không gian cabin", en: "Cabin space" },
    score: "9.2",
    copy: {
      vi: "Cabin 106L và cửa vào 20cm, hợp mèo lớn hoặc mèo cần lối vào thấp.",
      en: "A 106L cabin and 20cm entry suit larger cats or cats that need a lower step-in height."
    }
  },
  {
    title: { vi: "Khử mùi & vệ sinh", en: "Odor & cleaning" },
    score: "8.4",
    copy: {
      vi: "Hộp rác kín và lớp lót chống bám giúp giảm mùi, nhưng vẫn cần đúng loại cát và lịch thay túi.",
      en: "The sealed drawer and liner help with odor, but litter type and bag replacement still matter."
    }
  },
  {
    title: { vi: "App & dữ liệu", en: "App & data" },
    score: "8.1",
    copy: {
      vi: "Theo dõi cân nặng, lịch sử đi vệ sinh và dọn từ xa qua UBPET-ASIA.",
      en: "Track weight, toilet history and trigger cleaning remotely through UBPET-ASIA."
    }
  }
];

const verdicts = [
  {
    label: { vi: "Nên mua nếu", en: "Buy it if" },
    title: {
      vi: "Bạn nuôi 1-3 mèo trưởng thành và muốn giảm việc xúc cát mỗi ngày.",
      en: "You have 1-3 adult cats and want to reduce daily litter scooping."
    },
    items: [
      { vi: "Cần cabin rộng", en: "You need a roomy cabin" },
      { vi: "Ưu tiên cảm biến an toàn", en: "Safety sensors are a priority" },
      { vi: "Muốn theo dõi thói quen đi vệ sinh qua app", en: "You want app-based health habit tracking" }
    ]
  },
  {
    label: { vi: "Cân nhắc nếu", en: "Think twice if" },
    title: {
      vi: "Không gian đặt máy hẹp, mèo quá nhạy tiếng động hoặc đang dùng cát gỗ/cát thủy tinh.",
      en: "Your space is tight, your cat is noise-sensitive, or you use wood/crystal litter."
    },
    items: [
      { vi: "Máy nặng 10kg", en: "The unit weighs 10kg" },
      { vi: "Chỉ hỗ trợ Wi-Fi 2.4GHz", en: "It needs 2.4GHz Wi-Fi" },
      { vi: "Cần tập làm quen theo từng bước", en: "Cats may need a gradual introduction" }
    ]
  }
];

const reviewSignals = [
  {
    title: { vi: "Cửa vào thấp là điểm cộng lớn", en: "Low entry is a real advantage" },
    copy: {
      vi: "Trong nhóm máy dạng lồng xoay, chiều cao cửa ảnh hưởng trực tiếp đến việc mèo có chịu bước vào hay không. C41 đặt cửa khoảng 20cm, dễ tiếp cận hơn nhiều mẫu cửa cao.",
      en: "For rotating automatic boxes, entry height directly affects cat adoption. C41 keeps the entry around 20cm, making access easier than many taller-door models."
    }
  },
  {
    title: { vi: "Cảm biến là tiêu chí bắt buộc", en: "Sensors are non-negotiable" },
    copy: {
      vi: "Các bài test máy dọn vệ sinh tự động đều nhấn mạnh an toàn phải đứng trước tiện ích. C41 có nhiều lớp cảm biến và cơ chế dừng khi phát hiện mèo.",
      en: "Automatic litter box reviews consistently put safety before convenience. C41 uses layered sensing and stops when a cat is detected."
    }
  },
  {
    title: { vi: "Khử mùi phụ thuộc cách vận hành", en: "Odor depends on operation" },
    copy: {
      vi: "Hộp rác kín giúp giảm mùi, nhưng trải nghiệm thực tế còn phụ thuộc loại cát, độ kín túi rác, tần suất thay túi và việc lau lớp lót.",
      en: "A sealed drawer helps, but real-world odor control still depends on litter, bag sealing, replacement frequency and liner cleaning."
    }
  },
  {
    title: { vi: "App hữu ích khi bạn hay vắng nhà", en: "The app helps when you are away" },
    copy: {
      vi: "Theo dõi cân nặng, tần suất đi vệ sinh và dọn từ xa là giá trị đáng tiền, nhất là khi cần phát hiện thay đổi bất thường sớm hơn.",
      en: "Weight, visit history and remote cleaning are useful when you want earlier signals of unusual behavior."
    }
  }
];

const specs = [
  {
    label: { vi: "Giá tham khảo", en: "Reference price" },
    value: "9.450.000đ",
    note: { vi: "Bản bảo hành 12 tháng tại Helipet", en: "12-month warranty version at Helipet" }
  },
  {
    label: { vi: "Dung tích cabin", en: "Cabin capacity" },
    value: "106L",
    note: { vi: "Helipet mô tả dùng được tới 3 bé mèo", en: "Helipet describes it as suitable for up to 3 cats" }
  },
  {
    label: { vi: "Hộp chất thải", en: "Waste drawer" },
    value: "6.7L",
    note: { vi: "Khoảng 14 ngày cho 1 mèo", en: "Around 14 days for one cat" }
  },
  {
    label: { vi: "Mèo phù hợp", en: "Suitable cats" },
    value: ">= 6 months, >= 1.5kg",
    note: { vi: "Cân nặng hỗ trợ đến 15kg", en: "Supports cats up to 15kg" }
  },
  {
    label: { vi: "Kích thước", en: "Dimensions" },
    value: "63 x 51 x 57cm",
    note: { vi: "Nên đo sẵn góc đặt máy", en: "Measure your placement area first" }
  },
  {
    label: { vi: "Cửa vào", en: "Entry height" },
    value: "20cm",
    note: { vi: "Thân thiện hơn với mèo chân ngắn hoặc mèo lớn tuổi", en: "Friendlier for short-legged or older cats" }
  },
  {
    label: { vi: "Kết nối", en: "Connectivity" },
    value: "Wi-Fi 2.4GHz + Bluetooth",
    note: { vi: "App UBPET-ASIA", en: "UBPET-ASIA app" }
  },
  {
    label: { vi: "Loại cát", en: "Litter type" },
    value: "Clay / mineral / mixed",
    note: { vi: "Không khuyến nghị cát gỗ/cát thủy tinh", en: "Wood or crystal litter is not recommended" }
  }
];

const gallery = [
  {
    src: "/images/ubpet-c41/ubpet-c41-side.png",
    alt: "Góc nghiêng máy dọn vệ sinh mèo UBPet C41",
    label: { vi: "Cabin lồng xoay", en: "Rotating cabin" }
  },
  {
    src: "/images/ubpet-c41/ubpet-c41-detail.png",
    alt: "Chi tiết thiết kế máy UBPet C41",
    label: { vi: "Cấu trúc tháo rời", en: "Modular body" }
  },
  {
    src: "/images/ubpet-c41/ubpet-c41-cabin.webp",
    alt: "Không gian cabin UBPet C41",
    label: { vi: "Khoang 106L", en: "106L chamber" }
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
  image: `${siteUrl}/images/ubpet-c41/ubpet-c41-hero-cutout.png`,
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
  const { lang, recentlyViewed } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync scroll progress indicator bar width
  useEffect(() => {
    const handleScrollProgress = () => {
      const progressBar = document.querySelector(".scroll-progress-bar") as HTMLDivElement;
      if (!progressBar) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) return;

      const scrollPercentage = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrollPercentage}%`;
    };

    window.addEventListener("scroll", handleScrollProgress);
    return () => window.removeEventListener("scroll", handleScrollProgress);
  }, []);

  return (
    <main>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="site-header" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="UBPet C41 Review">
          <span className="brand-mark" aria-hidden="true" />
          UBPet C41
        </a>
        <nav className="nav-links" aria-label="Page sections">
          <a href="#verdict"><Text vi="Kết luận" en="Verdict" /></a>
          <a href="#operation-story"><Text vi="Vận hành" en="Operation" /></a>
          <a href="#products-section"><Text vi="Cửa hàng" en="Shop" /></a>
          <a href="#video">Video</a>
          <a href="#specs"><Text vi="Thông số" en="Specs" /></a>
          <a href="#register"><Text vi="Tư vấn" en="Advice" /></a>
        </nav>
        <SiteControls />
      </header>

      {/* Hero Section with custom Typography animations */}
      <section id="top" className="hero eco-hero">
        <div className="hero-copy reveal">
          <p className="kicker">
            <Text vi="Review máy dọn vệ sinh mèo tự động" en="Automatic cat litter box review" />
          </p>
          <h1 className="motion-typography-title">
            UBPet C41
            <span className="motion-text-gradient">
              <Text vi="có đáng mua?" en="worth buying?" />
            </span>
          </h1>
          <p className="lead-paragraph">
            <Text
              vi="Một bản review sáng, thực tế và dễ so sánh dựa trên thông số Helipet, video vận hành ngay trong trang và các tiêu chí thường gặp khi đánh giá máy dọn vệ sinh tự động: an toàn, mùi, loại cát, app và khả năng mèo chịu dùng."
              en="A bright, practical review based on Helipet specs, an inline operating video, and the criteria that matter for automatic litter boxes: safety, odor, litter type, app tracking and cat adoption."
            />
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href="#verdict">
              <Text vi="Xem kết luận" en="Read verdict" />
              <span aria-hidden="true">-&gt;</span>
            </a>
            <a className="button button-secondary" href="#products-section">
              <Text vi="Mua phụ kiện" en="Shop accessories" />
            </a>
          </div>
          <dl className="hero-stats" aria-label="Quick facts">
            <div>
              <dt>8.6/10</dt>
              <dd><Text vi="điểm biên tập" en="editor score" /></dd>
            </div>
            <div>
              <dt>106L</dt>
              <dd><Text vi="cabin rộng" en="large cabin" /></dd>
            </div>
            <div>
              <dt>20cm</dt>
              <dd><Text vi="cửa vào" en="entry" /></dd>
            </div>
          </dl>
        </div>

        <div className="hero-stage reveal" aria-label="UBPet C41 product image">
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <div className="price-pill">9.450.000đ</div>
          <Image
            src="/images/ubpet-c41/ubpet-c41-hero-cutout.png"
            alt="Máy dọn vệ sinh mèo UBPet C41 với ba mèo bên trong"
            width={1600}
            height={1600}
            priority
            quality={82}
            sizes="(max-width: 900px) 92vw, 44vw"
            className="hero-product"
          />
          <div className="stage-card stage-card-left">
            <span>6.7L</span>
            <small><Text vi="hộp rác" en="drawer" /></small>
          </div>
          <div className="stage-card stage-card-right">
            <span>5W</span>
            <small><Text vi="công suất" en="power" /></small>
          </div>
        </div>
      </section>

      {/* Infinite scrolling marquee track */}
      <section className="review-marquee" aria-label="Review highlights">
        <span><Text vi="Cảm biến nhiều lớp" en="Layered sensors" /></span>
        <span><Text vi="Không gian mát xanh" en="Cool eco space" /></span>
        <span><Text vi="Video xem ngay" en="Inline video" /></span>
        <span><Text vi="Sáng/tối + VI/EN" en="Light/dark + VI/EN" /></span>
      </section>

      {/* Verdict grid */}
      <section id="verdict" className="section verdict-section">
        <div className="section-heading reveal">
          <p className="kicker"><Text vi="Kết luận nhanh" en="Quick verdict" /></p>
          <h2>
            <Text
              vi="Đáng mua nếu bạn muốn một máy rộng, an toàn và có app theo dõi."
              en="Worth it if you want a roomy, sensor-focused box with app tracking."
            />
          </h2>
          <p>
            <Text
              vi="Điểm mạnh của UBPet C41 nằm ở cabin rộng, cửa vào thấp và bộ cảm biến. Điểm cần cân nhắc là máy vẫn cần đúng loại cát, đúng vị trí đặt, và mèo cần thời gian làm quen như mọi máy dọn tự động khác."
              en="UBPet C41 stands out with a large cabin, low entry and layered safety sensors. The trade-offs are the usual ones: proper litter, proper placement and a gradual introduction for your cat."
            />
          </p>
        </div>
        <div className="verdict-grid">
          {verdicts.map((verdict) => (
            <article className="verdict-card reveal" key={verdict.label.vi}>
              <span><Text {...verdict.label} /></span>
              <h3><Text {...verdict.title} /></h3>
              <ul>
                {verdict.items.map((item) => (
                  <li key={item.vi}><Text {...item} /></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Editorial score cards */}
      <section className="section score-section">
        <div className="score-header reveal">
          <p className="kicker"><Text vi="Chấm điểm biên tập" en="Editorial scorecard" /></p>
          <h2><Text vi="Nhìn theo tiêu chí mua thật, không chỉ nhìn thông số." en="Judged by real buying criteria, not specs alone." /></h2>
        </div>
        <div className="score-grid">
          {reviewScores.map((item) => (
            <article className="score-card reveal" key={item.title.vi}>
              <div className="score-ring" aria-label={`${item.title.vi}: ${item.score}/10`}>
                {item.score}
              </div>
              <h3><Text {...item.title} /></h3>
              <p><Text {...item.copy} /></p>
            </article>
          ))}
        </div>
      </section>

      {/* Scrollytelling Narrative Loop */}
      <section id="operation-story" className="section-scrollytelling-outer">
        <Scrollytelling />
      </section>

      {/* Video review */}
      <section id="video" className="section video-section">
        <div className="video-card reveal">
          <iframe
            src="https://www.youtube-nocookie.com/embed/jzJkz0DbwTs?rel=0&modestbranding=1"
            title="UBPet C41 review video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            allowFullScreen
          />
        </div>
        <div className="video-copy reveal">
          <p className="kicker"><Text vi="Video review phát ngay" en="Inline review video" /></p>
          <h2>
            <Text
              vi="Xem máy vận hành ngay trong giao diện trước khi quyết định đặt trong nhà."
              en="Watch it operate directly on the page before deciding where it belongs at home."
            />
          </h2>
          <p>
            <Text
              vi="Video được nhúng trực tiếp để bạn kiểm tra tiếng động, nhịp quay, cách đổ cát và thao tác thay túi mà không phải rời khỏi landing page."
              en="The video is embedded directly so you can check noise, rotation, litter flow and bag handling without leaving the landing page."
            />
          </p>
          <a className="inline-link" href="https://helipet.vn/may-don-ve-sinh-meo-ubpet-c41">
            <Text vi="Xem trang sản phẩm gốc tại Helipet" en="Open the original Helipet product page" />
          </a>
        </div>
      </section>

      {/* E-Commerce Catalog Section */}
      <section id="products-section" className="section products-section">
        <div className="section-heading compact reveal">
          <p className="kicker"><Text vi="Sản phẩm & Phụ kiện" en="Products & Accessories" /></p>
          <h2>
            <Text
              vi="Sản phẩm chính và phụ kiện khuyên dùng cho UBPet C41"
              en="Featured product and recommended accessories for UBPet C41"
            />
          </h2>
          <p>
            <Text
              vi="Đặt mua máy dọn vệ sinh mèo hoặc trang bị thêm các phụ kiện tương thích hoàn toàn để tối ưu hóa việc vận hành và khử mùi."
              en="Buy the smart litter box or pick up custom-fit accessories to optimize odor control and overall operation."
            />
          </p>
        </div>

        <div className="products-grid">
          {PRODUCTS.map((prod) => (
            <ProductCard 
              key={prod.id} 
              product={prod} 
              onViewDetails={(p) => setSelectedProduct(p)} 
            />
          ))}
        </div>

        {/* Recently Viewed Panel */}
        {recentlyViewed.length > 0 && (
          <div className="recently-viewed-wrap reveal" style={{ marginTop: "4rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 850, marginBottom: "1.25rem" }}>
              <Text vi="Sản phẩm bạn vừa xem" en="Recently viewed items" />
            </h3>
            <div className="products-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
              {recentlyViewed
                .map((id) => PRODUCTS.find((p) => p.id === id))
                .filter((p): p is Product => !!p)
                .map((prod) => (
                  <article key={`recent-${prod.id}`} className="product-card" style={{ padding: "0.5rem" }}>
                    <div className="product-card-image-wrap" style={{ aspectRatio: 1.3, margin: "4px" }}>
                      <img src={prod.image} alt={lang === "vi" ? prod.nameVi : prod.nameEn} style={{ maxHeight: "75%", maxWidth: "75%" }} />
                    </div>
                    <div style={{ padding: "0.5rem" }}>
                      <h4 style={{ fontSize: "0.88rem", margin: "0 0 0.25rem", fontWeight: 800 }}>
                        {lang === "vi" ? prod.nameVi : prod.nameEn}
                      </h4>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.85rem", color: "var(--clay)", fontWeight: 900 }}>
                          {lang === "vi" ? `${prod.price.toLocaleString("vi-VN")}đ` : `$${(prod.price / 25000).toFixed(2)}`}
                        </span>
                        <button 
                          type="button" 
                          className="button button-secondary" 
                          style={{ minHeight: "28px", padding: "0.2rem 0.6rem", fontSize: "0.72rem" }}
                          onClick={() => setSelectedProduct(prod)}
                        >
                          <Text vi="Xem" en="View" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        )}
      </section>

      {/* Review signals */}
      <section className="section signals-section">
        <div className="section-heading reveal">
          <p className="kicker"><Text vi="Tổng hợp đánh giá trên web" en="Review signals across the web" /></p>
          <h2>
            <Text
              vi="Những điểm cần soi khi mua máy dọn vệ sinh tự động."
              en="What to inspect before buying an automatic litter box."
            />
          </h2>
          <p>
            <Text
              vi="Review độc lập cho đúng mã C41 hiện không nhiều. Vì vậy phần này đối chiếu C41 với các tiêu chí lặp lại trong những bài test máy dọn vệ sinh tự động phổ biến: an toàn, mùi, kích thước, loại cát và app."
              en="Independent reviews for this exact C41 model are still limited. This section compares C41 against recurring criteria from popular automatic litter box tests: safety, odor, size, litter compatibility and app value."
            />
          </p>
        </div>
        <div className="signal-grid">
          {reviewSignals.map((signal) => (
            <article className="signal-card reveal" key={signal.title.vi}>
              <h3><Text {...signal.title} /></h3>
              <p><Text {...signal.copy} /></p>
            </article>
          ))}
        </div>
      </section>

      {/* Figure gallery */}
      <section className="section gallery-section" aria-label="Product gallery">
        {gallery.map((item) => (
          <figure className="gallery-item reveal" key={item.src}>
            <Image
              src={item.src}
              alt={item.alt}
              width={720}
              height={540}
              sizes="(max-width: 900px) 100vw, 31vw"
            />
            <figcaption><Text {...item.label} /></figcaption>
          </figure>
        ))}
      </section>

      {/* Specs section */}
      <section id="specs" className="section specs-section">
        <div className="section-heading compact reveal">
          <p className="kicker"><Text vi="Thông số kỹ thuật" en="Technical specs" /></p>
          <h2>
            <Text
              vi="Những con số ảnh hưởng trực tiếp tới trải nghiệm dùng hằng ngày."
              en="The numbers that directly affect everyday use."
            />
          </h2>
        </div>
        <div className="spec-table">
          {specs.map((spec) => (
            <div className="spec-row reveal" key={spec.label.vi}>
              <span><Text {...spec.label} /></span>
              <strong>{spec.value}</strong>
              <p><Text {...spec.note} /></p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter signup & checklist request */}
      <section id="register" className="section register-section">
        <div className="register-copy reveal">
          <p className="kicker"><Text vi="Checklist trước khi mua" en="Pre-buy checklist" /></p>
          <h2>
            <Text
              vi="Gửi thông tin, nhận checklist chọn máy phù hợp với mèo nhà bạn."
              en="Leave your details and get a checklist for choosing the right box for your cat."
            />
          </h2>
          <p>
            <Text
              vi="Form này vẫn sẵn sàng kết nối webhook ngoài qua API route của Next.js. Bạn có thể đẩy lead sang CRM, Google Sheets, Make hoặc Zapier bằng biến môi trường."
              en="This form is still ready for external webhook sync through a Next.js API route, so leads can flow to CRM, Google Sheets, Make or Zapier via environment variables."
            />
          </p>
        </div>
        <NewsletterForm />
      </section>

      {/* Product Detail Modal Renderer */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </main>
  );
}
