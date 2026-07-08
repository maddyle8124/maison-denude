# SOP — Tiêu chuẩn tạo Báo cáo / Deliverable (v2)

_Đúc kết từ 10+ vòng phản hồi của Maddy (báo cáo thị trường Maison, 6/2026) + bổ sung từ video script "Reading is moving from linear to navigational" (0626). Mọi báo cáo / phân tích / deliverable cho dự án này phải theo bộ tiêu chí dưới đây. Last updated: 2026-06-26 (v2)._

> **Triết lý một dòng:** Mục tiêu của báo cáo là làm người đọc **"nổ não" vì những phát hiện bất ngờ, có bằng chứng** — không phải liệt kê đề xuất. Mọi câu chữ phải **kiểm chứng được** (dữ liệu + nguồn bấm vào được), và được giao ở định dạng **đọc theo nhu cầu, bấm-vào-được** chứ không phải đọc tuần tự từ trên xuống.

> **Nguyên lý nền (v2):** Tài liệu đang dịch chuyển từ **"trang giấy" → "giao diện"** (documents as pages → documents as interface). Người đọc không còn đọc tuyến tính từ trên xuống; họ **nhảy thẳng vào phần liên quan tới mình** rồi đọc từ đó. Báo cáo phải được thiết kế cho cách đọc **navigational** này.

---

## 0. INPUTS — xác định rõ trước khi bắt đầu

Trước khi viết một chữ, chốt rõ 4 lớp đầu vào (ghi lại trong brief):

1. **Web data trực tiếp:** website đối thủ (giá, sản phẩm, từ khoá đang đua, banner/visual), landing pages, bảng giá công khai.
2. **Web intelligence / dữ liệu đo được:** lưu lượng truy cập, đà tăng/giảm, phân bố quốc gia khách — qua nền tảng đo lường (SimilarWeb).
3. **Tiếng nói người dùng thật:** Reddit/forum/review — trích nguyên văn, có link gốc.
4. **Internal data:** dữ liệu nội bộ của subject (nếu có) — doanh thu, tệp khách, định vị mục tiêu.

> Ghi rõ **mỗi insight rút ra từ (những) input nào** — để người đọc truy ngược được.

---

## 1. TOOLS — bộ công cụ tạo deliverable

| Vai trò | Công cụ | Dùng để |
|---|---|---|
| Tổng hợp & viết | **Claude** | Phân tích, viết, dựng HTML/markdown, vẽ chart inline |
| Crawl web | **Claude agent** (sub-agent crawl) | Cào website đối thủ: giá, sản phẩm, từ khoá, visual |
| Tiếng nói người dùng | **Reddit API / read** | Lấy bài & bình luận thật (kèm permalink) làm bằng chứng |
| Dữ liệu đo lường | **SimilarWeb MCP** | Lưu lượng, đà tăng/giảm, phân bố quốc gia của đối thủ |

- **Aggregate về một chỗ:** gom web data + internal + web-intelligence + user-voice → tổ chức gọn → trình bày trực quan nhất có thể.
- **Bảo mật:** TUYỆT ĐỐI không để lộ secret (API key, token) vào repo/commit/HTML.
- Trước AI (2024) một deck nghiên cứu thị trường mất ~1 tuần; quy trình này rút xuống còn giờ — nhưng **chất lượng/kiểm chứng không được hạ chuẩn** để đổi lấy tốc độ.

---

## 2. OUTPUTS — định dạng giao hàng

- **Bản chính (đọc & gây ấn tượng):** **HTML self-contained** — chart vẽ inline, không phụ thuộc CDN ngoài; **navigatable** (mục lục bấm-được, nhảy section), **interactive** (element bấm về nguồn, hover, gom/mở cụm).
- **Bản canonical (lưu trữ & diff):** **markdown**.
- **Khi NÀO không dùng HTML:** quy trình hình thức (lọc CV, hồ sơ pháp lý, hệ thống chưa tương thích) → **PDF/DOCX/PPT** vẫn dễ duyệt, lưu trữ, chuẩn hoá hơn. Chọn định dạng theo người/hệ thống nhận.
- **Rủi ro HTML:** HTML có thể chứa mã độc → người mở dễ bị tấn công. Chỉ giao HTML **self-contained, không script lạ, không tài nguyên ngoài không tin cậy**.

---

## 3. Cấu trúc — đi từ TỔNG QUÁT đến CỤ THỂ

1. **Executive summary** ở đầu — ngôn ngữ rõ ràng, mạch lạc; 1 đoạn mở + vài điểm chính + 1 ô khuyến nghị/điều cần chốt. _(Dùng tiêu đề nghe chỉn chu nhất với người đọc — vd "Executive summary".)_
2. **Bối cảnh ngành & thị trường** (chung) — đặt nền trước khi vào chi tiết.
3. **Bối cảnh cạnh tranh** — bằng sơ đồ/ma trận, cho thấy thị trường đông & phân mảnh ra sao, và subject đứng đâu.
4. **Phân tích từng đối thủ** (chi tiết, có chart).
5. **Insight chính** (mỗi insight: dữ liệu → phân tích → ý nghĩa + visual).
6. **Đối thủ trực diện** (đào sâu + bảng so sánh).
7. **Câu hỏi mở / hướng pivot** (để người ra quyết định chốt).
8. **Nguồn & độ tin cậy**.

> **Navigational layer:** mỗi phần trên là một **mục bấm-được** trong mục lục/sidebar; người đọc nhảy thẳng vào phần cần. Đừng buộc đọc tuyến tính.

---

## 4. Mỗi INSIGHT phải đủ 3 lớp (không "nói suông")

- **Dữ liệu:** số cụ thể, có thật.
- **Phân tích:** lý do dẫn tới kết luận — và vì sao cách đọc ngây thơ/hiển nhiên là SAI.
- **Ý nghĩa / hành động:** ngắn gọn, cho subject.
- Kèm **nguồn bấm-được** + **1 visual hỗ trợ** cho mỗi insight.
- Insight phải **bất ngờ, phản trực giác**. Cái hiển nhiên thì không phải insight.
- **Đề xuất chỉ là một mục NHỎ** ("cách tận dụng insight"), không phải trọng tâm.
- Ít mà chắc: vài insight giá trị > nhiều insight rời rạc.

---

## 5. Dữ liệu & nguồn

- **Ưu tiên dữ liệu kiểm chứng được:** lưu lượng đo được (SimilarWeb), website đối thủ (giá/sản phẩm/từ khoá), **tiếng nói người dùng thật** (Reddit/forum — có link).
- **Tránh dùng làm gốc:** số báo cáo ngành/CAGR, báo chí đã "standardized" → khó kiểm chứng, không ra insight trực quan.
- **Mọi nhận định về giá/hành vi phải có URL gốc** (kèm trích nguyên văn nếu là forum/báo). Không có nguồn → **bỏ**, hoặc dán nhãn rõ "giả thuyết — chưa có nguồn".
- **Phân loại độ tin cậy:** ✅ Đã chứng minh · 🟡 Nên thử (cần test) · 🔴 Đừng cam kết.
- **Tự kiểm & đính chính lỗi của chính mình** một cách minh bạch (vd: nhầm tên brand, nhầm tệp khách). Luôn _be critical_ với chính output.
- **Audit thiên lệch:** đừng để kết luận bị "nhiễm" theo cách đặt câu hỏi/prompt; không thổi phồng cầu (cầu mỏng thì nói thẳng là khoảng trống, không tô vẽ).

---

## 6. Ngôn ngữ & wording

- **Tiếng Việt rõ ràng, cụ thể.** Hạn chế chêm tiếng Anh; thuật ngữ bắt buộc → mở ngoặc giải thích ở lần đầu.
- **KHÔNG ẩn dụ khó dịch** (vd "con voi Hội An"). **KHÔNG jargon stakeholder không hiểu** (vd "outlier" → "trường hợp đặc biệt").
- **Câu đầy đủ, tròn ý** — không fragment kiểu "Mỹ66/Úc13" → viết "có 66% khách từ Mỹ và 13% từ Úc".
- **Tiêu đề chọn từ nghe chỉn chu nhất** với người đọc (tiếng Anh gọn nếu pro hơn, vd "Executive summary"; tránh từ nghe "quê").
- **Bỏ câu quá internal** khỏi bản gửi stakeholder (vd "để Playbook không lệch ý founder").
- **Hỏi đúng đối tượng:** "Maison đã có…" thay vì "chị có…" khi không phải câu hỏi cá nhân.
- **Tôn trọng brand-language của founder (chị Chi):** dùng "premium/cao cấp" (KHÔNG "high end"); "nhà thiết kế/atelier" (KHÔNG "thợ may/tiệm may"); KHÔNG khung "mass/giá rẻ/mua sắm du lịch". _(xem [founder-signals.md](../client-context/founder-signals.md))_

---

## 7. Trình bày & VISUAL

- **Xuống dòng thoáng:** mỗi mục đánh số một dòng riêng; không dồn cục; chú ý spacing/độ dễ đọc.
- **Nhiều visual, data-driven:** chart, sơ đồ, ma trận, "evidence card" (tái dựng banner/ảnh sản phẩm + trích dẫn). **Mỗi insight nên có 1 visual hỗ trợ.**
- **Bảng khó đọc → chuyển thành chart/sơ đồ.**
- **Chart phải:**
  - Định nghĩa rõ **trục & đơn vị** (vd "tăng trưởng = % thay đổi lượt truy cập T6/2025→T5/2026").
  - Truyền **một thông điệp rõ ràng** — đừng để người đọc tự đoán.
  - **Diễn giải đúng:** không kết luận sai (vd "giá cao + ít traffic" ≠ "hết thời"; đó là tệp vốn nhỏ).
  - Đặt subject (Maison) ở **vị trí hợp lý** (định vị mục tiêu giả định) — KHÔNG tự dìm về 0 khiến founder thấy bị hạ thấp.
  - **Element bấm được** dẫn về nguồn/website khi phù hợp.
- **Gom cụm** thông tin để tránh ngợp.

---

## 8. Phân tích cạnh tranh (chi tiết bắt buộc)

- Mỗi đối thủ nêu rõ: **lưu lượng + đà tăng/giảm**; **phân bố quốc gia khách ĐẦY ĐỦ** (gồm thị trường ngầm như Trung Đông, không chỉ top 1-2); **nước của brand**; **phân khúc sản phẩm**; **từ khoá họ đua**; **ý định khách**.
- **Bấm được** về website đối thủ.
- **Tổng kết cạnh tranh:** điểm chung + trường hợp đặc biệt + **insight rút ra từ bối cảnh**.
- **"Đối thủ trực diện"** = trùng **MÔ HÌNH kinh doanh + phân khúc sản phẩm + tệp khách/đấu trường tìm kiếm** — KHÔNG chỉ giống bề ngoài. (Khác mô hình thì không phải đối thủ trực diện, dù cùng ngành.)

---

## 9. Cơ chế giao hàng (deliverable mechanics)

- **Định dạng:** HTML self-contained (chart vẽ inline, không phụ thuộc CDN ngoài) + bản **markdown canonical**.
- **Git:** commit; **host** (GitHub Pages); giữ **một link ổn định** để gửi đi; **republish mỗi khi cập nhật**.
- **Bảo mật:** TUYỆT ĐỐI không để lộ secret (API key, token) vào repo/commit.
- **Kèm câu hỏi mở / điều cần xác nhận** để người ra quyết định chốt trước khi cam kết nguồn lực.

---

## ✅ Checklist nhanh TRƯỚC KHI GỬI

- [ ] **Inputs** đã chốt đủ 4 lớp (web / intelligence / user-voice / internal) và mỗi insight truy ngược được input?
- [ ] Có **Executive summary** rõ ràng ở đầu?
- [ ] Báo cáo **navigatable** — mục lục bấm-được, nhảy thẳng vào phần cần, không buộc đọc tuyến tính?
- [ ] Mỗi insight **bất ngờ** + có **dữ liệu + phân tích + nguồn + visual**?
- [ ] **Mọi claim có nguồn bấm-được**? Không còn claim trôi nổi? (Nếu không nguồn → đã bỏ/dán nhãn giả thuyết?)
- [ ] **Đề xuất chỉ là phần nhỏ**, không lấn át insight?
- [ ] Ngôn ngữ **tròn câu**, không jargon khó hiểu, không ẩn dụ, đúng brand-language founder?
- [ ] **Xuống dòng thoáng**, dễ đọc?
- [ ] Chart **định nghĩa trục rõ + diễn giải đúng + bấm được + đặt subject hợp lý**?
- [ ] Đối thủ: **geo đầy đủ + clickable + pattern/đặc biệt/insight + nước của brand**?
- [ ] Đã **tự đính chính lỗi** + phân loại **proven / nên thử / đừng cam kết**?
- [ ] Đi từ **tổng quát → cụ thể**?
- [ ] Đúng **định dạng cho người nhận** (HTML khi cần trực quan/navigational; PDF/DOCX cho quy trình hình thức)?
- [ ] HTML **self-contained, không mã/tài nguyên ngoài không tin cậy**; không lộ secret; đã **commit + host + link ổn định**?

---

_Đây là tài liệu sống — bổ sung khi có phản hồi mới. Tinh thần xuyên suốt: **insight bất ngờ + có nguồn + trực quan + ngôn ngữ rõ ràng + giao ở định dạng navigational**, và luôn tự phản biện trước khi gửi._
