export interface Product {
  id: string;
  nameVi: string;
  nameEn: string;
  price: number;
  image: string;
  descriptionVi: string;
  descriptionEn: string;
  specsVi: Record<string, string>;
  specsEn: Record<string, string>;
}

export const PRODUCTS: Product[] = [
  {
    id: "ubpet-c41",
    nameVi: "Máy dọn vệ sinh thông minh UBPet C41",
    nameEn: "UBPet C41 Smart Cat Litter Box",
    price: 9450000,
    image: "/images/ubpet-c41/ubpet-c41-hero-cutout.png",
    descriptionVi: "Máy dọn vệ sinh tự động cho mèo với cabin siêu rộng 106L, cửa vào thấp thân thiện 20cm, tích hợp app thông minh và nhiều lớp cảm biến an toàn vượt trội.",
    descriptionEn: "Automatic self-cleaning cat litter box featuring an ultra-spacious 106L cabin, low 20cm entry, smart app integration, and multi-layered advanced safety sensors.",
    specsVi: {
      "Thương hiệu": "UBPet",
      "Dung tích cabin": "106L",
      "Ngăn chứa chất thải": "6.7L",
      "Chiều cao lối vào": "20cm",
      "Kết nối": "Wi-Fi 2.4GHz + Bluetooth",
      "Trọng lượng hỗ trợ": "Mèo từ 1.5kg đến 15kg"
    },
    specsEn: {
      "Brand": "UBPet",
      "Cabin Capacity": "106L",
      "Waste Drawer": "6.7L",
      "Entry Height": "20cm",
      "Connectivity": "Wi-Fi 2.4GHz + Bluetooth",
      "Supported Weight": "Cats from 1.5kg up to 15kg"
    }
  },
  {
    id: "helipet-litter",
    nameVi: "Cát đất sét Helipet Premium (Túi 10kg)",
    nameEn: "Helipet Premium Clay Litter (10kg Bag)",
    price: 180000,
    image: "/images/ubpet-c41/ubpet-c41-side.png", // Using existing images or generic fallbacks
    descriptionVi: "Cát sét khoáng tự nhiên, kiểm soát mùi tối ưu, vón cục cực nhanh và không bụi, cực kỳ tương thích với cơ chế xoay lọc của máy UBPet C41.",
    descriptionEn: "Natural mineral clay litter, outstanding odor control, super-fast clumping, and dust-free. Perfect for the rotating filter mechanism of the UBPet C41.",
    specsVi: {
      "Thành phần": "Bentonite tự nhiên + Than hoạt tính",
      "Trọng lượng": "10kg",
      "Khả năng hút nước": "Siêu nhanh trong 3 giây",
      "Khử mùi": "Kháng khuẩn 99%"
    },
    specsEn: {
      "Ingredients": "Natural Bentonite + Activated Carbon",
      "Weight": "10kg",
      "Absorption": "Super fast in 3 seconds",
      "Deodorization": "99% Antibacterial"
    }
  },
  {
    id: "ubpet-bags",
    nameVi: "Túi đựng rác chuyên dụng UBPet C41 (Cuộn 20 túi)",
    nameEn: "UBPet C41 Custom Trash Bags (Roll of 20)",
    price: 90000,
    image: "/images/ubpet-c41/ubpet-c41-detail.png",
    descriptionVi: "Túi rác tự phân hủy sinh học, thiết kế dày dặn chống rách và vừa khít hoàn hảo với khay chứa chất thải 6.7L của máy UBPet C41.",
    descriptionEn: "Biodegradable custom-fit trash bags, thick anti-tear design, fits the UBPet C41's 6.7L waste drawer perfectly.",
    specsVi: {
      "Chất liệu": "HDPE tự phân hủy sinh học",
      "Số lượng": "20 túi / cuộn",
      "Độ dày": "Độ bền kéo giãn cao",
      "Màu sắc": "Đen mờ kín đáo"
    },
    specsEn: {
      "Material": "Biodegradable HDPE",
      "Quantity": "20 bags / roll",
      "Thickness": "High tensile strength",
      "Color": "Discreet matte black"
    }
  },
  {
    id: "odor-cleaner",
    nameVi: "Xịt khử mùi Enzyme sinh học Helipet Spray",
    nameEn: "Helipet Bio-Enzyme Odor Eliminator Spray",
    price: 120000,
    image: "/images/ubpet-c41/ubpet-c41-cabin.webp",
    descriptionVi: "Chai xịt khử mùi ứng dụng enzyme tự nhiên phân hủy chất hữu cơ gây mùi hôi, an toàn tuyệt đối cho thú cưng và gia đình.",
    descriptionEn: "Deodorizer spray using natural enzymes to decompose organic odor-causing compounds. Completely safe for pets and families.",
    specsVi: {
      "Dung tích": "500ml",
      "Công nghệ": "Enzyme sinh học phân hủy mùi",
      "Độ an toàn": "Không cồn, không paraben",
      "Mùi hương": "Hương hoa cúc dịu nhẹ"
    },
    specsEn: {
      "Volume": "500ml",
      "Technology": "Bio-Enzyme odor breakdown",
      "Safety": "Alcohol-free, Paraben-free",
      "Scent": "Mild Chamomile scent"
    }
  }
];
