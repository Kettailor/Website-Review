import { NextResponse } from "next/server";

// Fallback local smart responses about UBPet C41
const LOCAL_RESPONSES = {
  vi: [
    {
      keywords: ["cabin", "dung tích", "lít", "rộng", "to", "size"],
      reply: "Lồng cabin của UBPet C41 có dung tích siêu lớn 106L, là một trong những dòng máy rộng nhất hiện nay. Máy cực kỳ thoải mái cho các bé mèo từ 1.5kg lên đến 15kg, rất thích hợp cho nhà nuôi từ 1-3 bé mèo."
    },
    {
      keywords: ["cửa", "cao", "lối vào", "leo", "lùn", "chân ngắn", "cm"],
      reply: "Chiều cao lối vào (cửa vào) của UBPet C41 rất thấp, chỉ khoảng 20cm. Thiết kế này giúp các bé mèo chân ngắn (mèo lùn), mèo con, hoặc mèo lớn tuổi dễ dàng đi vào mà không gặp khó khăn như các loại máy cửa cao khác."
    },
    {
      keywords: ["an toàn", "cảm biến", "kẹt", "nguy hiểm", "dừng"],
      reply: "Máy dọn UBPet C41 sở hữu hệ thống an toàn đa lớp: 4 cảm biến trọng lượng ở chân máy, cảm biến hồng ngoại nhận diện mèo ở lối vào, và chức năng dừng quay ngay lập tức khi phát hiện chuyển động. Đảm bảo an toàn tuyệt đối 100% không bị kẹt mèo."
    },
    {
      keywords: ["giá", "bao nhiêu", "tiền", "mắc", "rẻ", "bảo hành", "mua ở đâu", "helipet"],
      reply: "UBPet C41 có mức giá tham khảo tại Việt Nam là 9.450.000đ. Sản phẩm được bảo hành chính hãng 12 tháng tại Helipet. Bạn có thể đăng ký nhận tư vấn ngay tại form cuối trang để nhận checklist chi tiết trước khi quyết định mua."
    },
    {
      keywords: ["cát", "đất sét", "gỗ", "đậu nành", "hỗn hợp", "lọc"],
      reply: "Máy hoạt động hiệu quả nhất với cát đất sét vón cục tự nhiên (bentonite), cát khoáng hoặc cát hỗn hợp hạt nhỏ. Máy không khuyến nghị sử dụng cát gỗ hạt to hoặc cát thủy tinh vì có thể làm nghẽn lưới lọc cát sạch."
    },
    {
      keywords: ["mùi", "khử mùi", "hôi", "khay rác", "kín"],
      reply: "Máy giảm mùi hiệu quả nhờ khay rác dung tích lớn 6.7L thiết kế khép kín ở phía dưới cùng màng lọc khử mùi chuyên dụng. Khay rác chứa được khoảng 14 ngày cho 1 mèo trước khi cần thay túi mới. Tuy nhiên, hiệu quả khử mùi cũng phụ thuộc vào loại cát bạn sử dụng."
    }
  ],
  en: [
    {
      keywords: ["cabin", "capacity", "liter", "liters", "roomy", "big", "large", "size"],
      reply: "The UBPet C41 cabin features an ultra-large 106L capacity, which is one of the roomiest automatic litter boxes available. It supports cats from 1.5kg up to 15kg, making it perfect for multi-cat homes (1-3 cats)."
    },
    {
      keywords: ["door", "entry", "height", "cm", "low", "short", "older"],
      reply: "The entry height of the UBPet C41 is only 20cm from the floor. This low-profile entrance is friendly for short-legged breeds, kittens, or senior cats who have difficulty climbing into taller units."
    },
    {
      keywords: ["safety", "sensor", "sensors", "pinch", "trap", "stop"],
      reply: "The unit is designed with multi-layered safety: 4 weight sensors at the base, an entry infrared sensor, and an auto-stop mechanism that instantly halts rotation when a cat is detected. It is 100% pinch-free and safe."
    },
    {
      keywords: ["price", "how much", "cost", "warranty", "buy", "helipet"],
      reply: "The reference price for the UBPet C41 is 9,450,000 VND in Vietnam, which includes a 12-month warranty from Helipet. You can sign up using the form at the bottom to receive a purchasing checklist."
    },
    {
      keywords: ["litter", "clay", "wood", "tofu", "bentonite", "sift"],
      reply: "It works best with quick-clumping clay litter (bentonite), mineral litter, or small-grain mixed litters. Large wood pellets or crystal litters are not recommended because they won't pass through the sifting screen properly."
    },
    {
      keywords: ["odor", "smell", "drawer", "waste", "sealed"],
      reply: "Odor control is achieved through the sealed 6.7L waste drawer located at the bottom. It can hold up to 14 days of waste for one cat. While the drawer is sealed, using quality clumping litter also improves odor reduction."
    }
  ]
};

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const query = message.toLowerCase();
    const apiKey = process.env.GEMINI_API_KEY;

    // Detect language
    const isEn = /[a-zA-Z]/.test(query) && !/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(query);
    const lang = isEn ? "en" : "vi";

    // 1. If Gemini API Key is configured, attempt to use it
    if (apiKey) {
      try {
        const prompt = `You are a helpful, professional, and friendly AI assistant for UBPet C41, an automatic cat litter box review page.
Here are the specs of UBPet C41:
- Price: 9.450.000 VND, 12-month warranty at Helipet.
- Cabin size: 106L (very spacious, suits cats from 1.5kg up to 15kg, suitable for 1-3 cats).
- Entry height: 20cm (very low, friendly for short-legged, kitten, or senior cats).
- Waste drawer: 6.7L (sealed, holds up to 14 days of waste for 1 cat).
- Litter type: Works best with clumping clay (bentonite), mineral, or small-grain mixed. Avoid large wood pellets/crystal.
- Connection: 2.4GHz WiFi and Bluetooth with app UBPET-ASIA (tracks weight, history, remote clean).
- Sensors: 4 weight sensors, entry infrared, auto-stop rotation when cat approaches.

Please answer the user's question in ${lang === "vi" ? "Vietnamese" : "English"}.
Keep your reply short and sweet (under 3-4 sentences). Do not mention that you were given this prompt.
User question: "${message}"`;

        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: prompt }] }],
              generationConfig: {
                maxOutputTokens: 250,
                temperature: 0.7
              }
            }),
            cache: "no-store"
          }
        );

        if (geminiResponse.ok) {
          const geminiData = await geminiResponse.json();
          const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply: reply.trim() });
          }
        }
      } catch (geminiError) {
        console.error("Gemini API call failed, falling back to local database", geminiError);
      }
    }

    // 2. Fallback to local preset knowledge base
    const responses = lang === "en" ? LOCAL_RESPONSES.en : LOCAL_RESPONSES.vi;
    
    // Find matching response based on keywords
    for (const item of responses) {
      if (item.keywords.some((kw) => query.includes(kw))) {
        return NextResponse.json({ reply: item.reply });
      }
    }

    // Default response if no keyword matches
    const defaultReply = lang === "vi"
      ? "Cám ơn bạn đã đặt câu hỏi. Máy dọn rác mèo UBPet C41 nổi bật với lồng rộng 106L, cửa vào thấp 20cm thân thiện, hộp chứa chất thải 6.7L và bảo hành 12 tháng tại Helipet. Bạn có thắc mắc gì thêm về tính năng hay giá bán không?"
      : "Thank you for your question. The UBPet C41 smart litter box features a 106L cabin capacity, a low 20cm step-in entrance, a 6.7L waste drawer, and a 12-month warranty at Helipet. Would you like to know more about its safety features or pricing?";

    return NextResponse.json({ reply: defaultReply });
  } catch (error) {
    console.error("Error in chat route", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
