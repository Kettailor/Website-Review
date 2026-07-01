"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "./providers";

interface StoryStep {
  id: number;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
}

const STEPS: StoryStep[] = [
  {
    id: 1,
    titleVi: "1. Cảm biến bước chân & Cân nặng",
    titleEn: "1. Entry & Weight Detection",
    descVi: "Cabin 106L siêu rộng mở đón bé mèo. Ngay khi mèo bước chân vào, hệ thống cảm biến cân nặng bốn điểm dưới chân máy lập tức ghi nhận (Ví dụ: Mèo vàng 4.5kg) và dừng toàn bộ tiến trình xoay để đảm bảo an toàn.",
    descEn: "The ultra-wide 106L cabin welcomes your cat. As soon as they step inside, the 4-point weight sensors immediately record their weight (e.g. 4.5kg) and pause all rotations to ensure absolute safety."
  },
  {
    id: 2,
    titleVi: "2. Mèo rời đi & Đếm ngược an toàn",
    titleEn: "2. Exit & Safe Countdown",
    descVi: "Sau khi mèo đi vệ sinh xong và rời đi, cảm biến hồng ngoại ở cửa kết hợp cảm biến trọng lượng xác nhận cabin đã trống. Bộ đếm ngược thời gian chờ dọn dẹp (khoảng 3 phút) được kích hoạt.",
    descEn: "After your cat finishes and leaves, the entry infrared sensor and weight sensors confirm the cabin is empty. A cleaning delay countdown (default 3 minutes) is then activated."
  },
  {
    id: 3,
    titleVi: "3. Cơ chế xoay lồng lọc cát",
    titleEn: "3. Rotating Drum Filtration",
    descVi: "Lồng cabin bắt đầu xoay tròn 360 độ êm ái. Phần cát sạch lọt qua màng lọc thông minh và được giữ lại, trong khi các khối chất thải vón cục bị giữ lại ở phần lưới chặn riêng biệt.",
    descEn: "The cabin drum begins a quiet 360-degree rotation. Clean litter passes through the sifting mesh and is retained, while clumped waste blocks are captured by the separator grid."
  },
  {
    id: 4,
    titleVi: "4. Thải phân vào hộp rác kín",
    titleEn: "4. Drop Waste into Drawer",
    descVi: "Khi quay đến góc nghiêng xả thải, phần rác vón cục tự động rơi xuống hộp đựng rác kín 6.7L ở đáy máy. Cửa sập tự động mở ra để nhận rác và khép lại ngay sau đó.",
    descEn: "Upon reaching the dumping angle, clumped waste automatically drops into the sealed 6.7L drawer at the bottom. The trapdoor opens to receive the waste and shuts tight immediately after."
  },
  {
    id: 5,
    titleVi: "5. Khử mùi & Kháng khuẩn",
    titleEn: "5. Deodorization & Fresh Air",
    descVi: "Cửa hộp rác kín kết hợp màng lọc khử mùi hoạt động tối đa nhằm khóa chặt phân mèo và khí ammoniac, ngăn mùi hôi phát tán ra môi trường phòng khách nhà bạn.",
    descEn: "The sealed drawer and odor-filtering membrane lock in waste and ammonia gas, preventing unpleasant smells from spreading into your living space."
  },
  {
    id: 6,
    titleVi: "6. Đồng bộ dữ liệu lên ứng dụng",
    titleEn: "6. App Sync & Notifications",
    descVi: "Thiết bị gửi dữ liệu báo cáo qua Wi-Fi 2.4GHz lên máy chủ. Điện thoại của bạn ngay lập tức nhận thông báo từ ứng dụng UBPET-ASIA: thời gian dọn, cân nặng của bé, và tình trạng rác đầy.",
    descEn: "The device syncs cleaning logs over 2.4GHz Wi-Fi. Your smartphone immediately receives notifications via the UBPET-ASIA app: pet weight, duration, and waste drawer capacity."
  }
];

export function Scrollytelling() {
  const { lang } = useApp();
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    stepsRefs.current = stepsRefs.current.slice(0, STEPS.length);
    
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Intersect when step card is in the middle of screen
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-step-index"));
          setActiveStep(index);
        }
      });
    }, observerOptions);

    stepsRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="scrollytelling-container" ref={containerRef}>
      {/* Sticky Left Column: Interactive Graphics */}
      <div className="scrollytelling-visual-sticky">
        <div className="scrolly-machine-wrapper">
          <div className={`scrolly-machine-inner step-active-${activeStep + 1}`}>
            {/* Outline of UBPet C41 Machine */}
            <div className="machine-chassis">
              {/* LED Ring Display */}
              <div className="machine-display">
                <span className="display-text">
                  {activeStep === 0 && "4.5 kg"}
                  {activeStep === 1 && "03:00"}
                  {activeStep === 2 && "ROTATING"}
                  {activeStep === 3 && "DISPOSING"}
                  {activeStep === 4 && "DEODOR"}
                  {activeStep === 5 && "ONLINE"}
                </span>
                <div className={`display-led-indicator active-step-${activeStep}`} />
              </div>

              {/* Main Rotating Cabin Drum */}
              <div className={`machine-drum ${activeStep === 2 ? "spinning" : ""}`}>
                <div className="drum-litter-level" />
                {/* Simulated Cat */}
                {activeStep === 0 && (
                  <div className="simulated-cat-inside animate-cat-breath">
                    🐱
                  </div>
                )}
                {/* Sifting grid */}
                <div className="drum-filter-grid" />
              </div>

              {/* Waste Drawer Compartment */}
              <div className={`machine-drawer ${activeStep === 3 ? "drawer-receiving" : ""} ${activeStep === 4 ? "drawer-purifying" : ""}`}>
                <div className="drawer-handle" />
                {activeStep === 3 && <div className="falling-clump" />}
                {activeStep >= 3 && <div className="waste-pile" />}
              </div>

              {/* Fresh air/Odor waves */}
              {activeStep === 4 && (
                <div className="odor-purify-sparks">
                  <span className="spark s1">🍃</span>
                  <span className="spark s2">✨</span>
                  <span className="spark s3">🍃</span>
                </div>
              )}
            </div>

            {/* Smart Phone screen projection */}
            {activeStep === 5 && (
              <div className="projected-phone-screen reveal-phone">
                <div className="phone-header">UBPET-ASIA</div>
                <div className="phone-body">
                  <div className="phone-card">
                    <h5>C41 Status</h5>
                    <p className="green-text">Vừa dọn dẹp xong</p>
                  </div>
                  <div className="phone-card">
                    <h5>Mèo đi vệ sinh</h5>
                    <p>Cân nặng: <b>4.52kg</b></p>
                    <p>Thời gian: <b>2 phút 15 giây</b></p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Right Column: Story steps */}
      <div className="scrollytelling-content-scroll">
        <div className="scrolly-intro">
          <p className="kicker">{lang === "vi" ? "Cách thức hoạt động" : "How it works"}</p>
          <h2>{lang === "vi" ? "Lăn chuột để khám phá quy trình vệ sinh khép kín" : "Scroll to see the cleaning process"}</h2>
          <p>{lang === "vi" ? "Hãy cuộn màn hình để xem cơ chế vận hành tự động thông minh của UBPet C41 từ khi mèo vào đến khi báo ứng dụng." : "Lurk through the automated smart loop of UBPet C41 as you scroll down step-by-step."}</p>
        </div>

        {STEPS.map((step, idx) => (
          <div
            key={step.id}
            className={`scrolly-step-card ${activeStep === idx ? "active" : ""}`}
            data-step-index={idx}
            ref={(el) => {
              stepsRefs.current[idx] = el;
            }}
          >
            <div className="step-num">{step.id}</div>
            <h3>{lang === "vi" ? step.titleVi : step.titleEn}</h3>
            <p>{lang === "vi" ? step.descVi : step.descEn}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
