# Maison Dénudé — Bản Đồ SEO Landscape (Bối Cảnh Tìm Kiếm)

Tài liệu 1/2 trong gói **Keyword Research \+ 10 Blog Brief** (deliverable Tuần 1 — 12–18/6/2026, theo Proposal v11). Tài liệu 2: [02\_blog\_briefs.md](http://./02_blog_briefs.md) — 10 blog brief xây nền semantic network.

**Nguồn dữ liệu:** SimilarWeb MCP (volume từ khoá, dữ liệu web/rank\_tracker cập nhật 2026-05) \+ **SerpApi → Google Trends thực tế** (TIMESERIES \+ GEO\_MAP \+ RELATED\_QUERIES, 12 tháng) \+ nghiên cứu SERP thực tế (Google, travel blog, forum). Dữ liệu được đối chiếu với bộ Google Trends nội bộ của khách (file Keyword SEO.csv). **Ngày thực hiện:** 11/6/2026 · **Cập nhật reconfirm bằng Google Trends:** 11/6/2026 (xem §8).

---

## 0\. Tóm tắt cho người bận (Executive Summary)

**Câu hỏi cốt lõi:** Maison Dénudé có thể lên top Google nhanh ở đâu để đạt KPI *Top-10 cho ≥3 từ khoá trong 3 tháng sau go-live*?

**3 phát hiện quyết định chiến lược (kèm số liệu):**

1. **Head term `ao dai` = 62.244–72.296 lượt/tháng toàn cầu (SimilarWeb, T3–T5/2026), trong đó 100% là intent thông tin** (informational_intent_volume = 100% mỗi tháng, transactional = 0). Cụ thể: 72.296 (T3) · 62.244 (T4) · 71.402 (T5). → Người ta tìm để *hiểu áo dài là gì*, không phải mua. Không đua head term; *bắt traffic này bằng bài guide* rồi điều hướng xuống booking.

2. **Các từ khoá có chèn "bespoke / saigon / couture / occasion" có điểm Google Trends 12 tháng ≈ 0–6/100** (thang chuẩn hoá theo `wedding ao dai`=50): `bespoke ao dai`=0, `tailored ao dai`=0, `vietnamese couture`=1, `evening wear saigon`=1, `ao dai saigon`=6. SimilarWeb cũng trả **rỗng (data[] = [])** cho `bespoke ao dai` và `ao dai saigon` ở cấp toàn cầu. → Đây là long-tail thật, **cạnh tranh thấp → lên top nhanh**. Chiến lược: *phủ nhiều bài long-tail cụ thể*, không đua 1–2 từ khoá lớn.

3. **Khoảng trống SERP thay đổi theo thị trường** (đo thật VN·US·AU, 11/6/2026): tại **Việt Nam**, các atelier Việt đã đứng top (`bespoke ao dai saigon` có Local Pack + site Maydo/Duan; `wedding ao dai` có Nicole Bridal rank cả product lẫn blog) → cần cạnh tranh bằng nội dung sâu hơn + Google Business Profile. Tại **US/AU** (diaspora), top do seller diaspora + Amazon chiếm, **không có atelier Saigon** → đây là nơi góc "bespoke made in Saigon, thử trực tiếp" còn trống cho Maison. Chi tiết §3.

   **Kết luận chiến lược:**

Maison **không** đua head term. Maison chiếm **"long-tail có intent cao \+ định vị địa lý Saigon \+ đối tượng khách quốc tế/expat"**. Mô hình nội dung: **cụm chủ đề (topic cluster)** gồm 3 bài trụ (pillar) \+ 7 bài long-tail "quick-win" liên kết nội bộ vào nhau, tạo semantic network đủ mạnh để Google hiểu Maison là *thực thể chuyên gia về bespoke áo dài tại Saigon*, bán ra global.

---

## 1\. Đối tượng & Search Intent

Bám theo Proposal v11 — phần *"Foreign Market in Vietnam"*. SEO nhắm **2 trong 3 nhóm** (nhóm 3 đi qua RedNote/IG, không qua SEO):

| Nhóm | Mô tả | Search intent điển hình (tiếng Anh) | Giai đoạn phễu |
| :---- | :---- | :---- | :---- |
| **Nhóm 1 — Expat tại VN** | Người nước ngoài sống ở TP.HCM/Hà Nội, muốn đồ bespoke chuẩn quốc tế | "best ao dai tailor in saigon", "where to get a custom ao dai made district 1" | Giữa–cuối phễu (sẵn sàng đặt) |
| **Nhóm 2 — Khách quốc tế đến VN mua sắm** | Du khách chi tiêu cao, tìm món unique như "souvenir cao cấp"; có 2 hành trình: (a) đặt trước khi bay sang, (b) đến nơi mới tìm | "custom ao dai saigon", "ao dai made in vietnam", "how much does an ao dai cost", "how long to make ao dai" | Đầu–giữa phễu → **pre-trip booking funnel** |

**Hệ quả cho nội dung:**

- Ngôn ngữ: **tiếng Anh**, viết kiểu editorial dễ đọc cho người nước ngoài (giải thích văn hoá, không giả định người đọc biết áo dài).  
- Mọi bài phải có **tín hiệu địa lý "Saigon / Ho Chi Minh City / District 1"** \+ **CTA đặt lịch** (phục vụ pre-trip funnel).  
- Định dạng có tiềm năng thắng trong ngách này: **guide dài có cấu trúc rõ \+ ảnh đẹp** (Maison có sẵn lợi thế ảnh KOL/editorial).

  ---

  ## 2\. Audit 34 từ khoá từ team (đối chiếu volume thực tế)

  **Chú thích các cột số liệu** *(mọi số đều có nguồn — xem `data_logs/`)*

- **SW vol:** volume tìm kiếm từ SimilarWeb (toàn cầu, EN, T3–T5/2026). `rỗng` = API trả `data[] = []` (quá nhỏ để đo). *(file: `2026-06-11_sw_keywords-overview_*.json`)*
- **Trends 12m:** điểm Google Trends trung bình 12 tháng, **đã chuẩn hoá về thang chung** với `wedding ao dai`=50 làm neo (vì Google Trends chỉ chuẩn hoá nội bộ mỗi batch 5 từ; công thức: `điểm = avg_batch × 50/anchor_batch`). *(file: `2026-06-11_trends_full34_batch-averages.json`)*
- **SERP US:** vị trí/tình trạng trang 1 Google đo thật 11/6/2026 (chỉ 2 truy vấn lõi được đo trực tiếp). *(file: `2026-06-11_serp_positions_2queries_us.json`)*
- **Intent:** Info · Trans · Local · Brand. **Verdict:** 🏛 Pillar · ⚡ Quick-win · 🔗 Semantic-support · 🅑 Brand · ✂️ Drop/gộp.
- ⚠️ *Lưu ý đọc số:* Trends là **chỉ số tương đối 0–100**, không phải lượt tuyệt đối. Điểm 0 nghĩa là "rất nhỏ so với neo", **không** phải "không ai tìm" — với ngách long-tail, điểm thấp = **cạnh tranh thấp = cơ hội rank nhanh**, không phải tin xấu.

  ### Nhóm 1 — Áo Dài & Heritage

| \# | Từ khoá | SW vol | Trends 12m | SERP US | Intent | Verdict | Ghi chú (có số) |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | bespoke ao dai | rỗng (data[]=[]) | **0**/50 | — | Trans/Brand | 🏛 Pillar A (head) | Volume đo được = 0 nhưng là *định vị lõi*. Truy vấn liên quan `bespoke ao dai saigon`: trang 1 US = 8/8 forum/seller, **0 atelier** → trống để chen |
| 2 | ao dai saigon | rỗng (data[]=[]) | **6**/50 | — | Local/Trans | 🏛 Pillar A (geo) | "Volume cao nhất" trong brief khách là so *nội bộ* (Trends nội bộ); Trends thật chỉ 6/50 — vẫn đáng vì intent mua + đối thủ atelier ≈ 0 |
| 3 | heritage ao dai | rỗng | **1**/50 | — | Info | 🔗 Semantic-support | Điểm 1 — gần như không ai gõ trực tiếp; rải trong pillar |
| 4 | silk ao dai | thấp, ngắt quãng | **11**/50 | — | Info/Trans | ⚡ Quick-win | Trends thật 11 (đỉnh tuần: Dec'25=72, Feb'26=50). Có thật nhưng theo mùa → bài "chọn lụa" |
| 5 | traditional ao dai | nằm dưới head `ao dai` | **57**/50 | — | Info | ⚡ Quick-win **(mạnh bất ngờ)** | **Điểm 57 — CAO HƠN cả `wedding ao dai`!** (đỉnh tuần Feb'26=100). Phát hiện mới: đây là quick-win giá trị nhất nhóm info → ưu tiên bài #10 nhắm cụm này |
| 6 | ao dai boutique saigon | rỗng | **0**/50 | — | Local/Trans | 🔗 Semantic-support | Biến thể #2; gộp vào Pillar A |
| 7 | tailored ao dai | rỗng | **0**/50 | — | Trans | ⚡ Quick-win | Điểm 0 nhưng intent đặt may rõ + đối thủ ≈ 0 → vẫn làm bài long-tail |
| 8 | designer ao dai saigon | rỗng | **0**/50 | — | Trans | 🔗 Semantic-support | Tín hiệu luxury; rải trong Pillar A & C |

  ### Nhóm 2 — Bridal & Wedding

| \# | Từ khoá | SW vol | Trends 12m | SERP US | Intent | Verdict | Ghi chú (có số) |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 9 | bridal ao dai | thấp | **1**/50 | — | Trans | 🏛→🔗 Semantic-support | **Hiệu chỉnh:** Trends thật chỉ 1/50 — cầu thực **không** nằm ở cụm "bridal ao dai" mà ở "wedding ao dai" (#12). Hạ từ head xuống phụ; Pillar B đổi head sang `wedding ao dai` |
| 10 | wedding dress vietnam | thấp | ~1 (ước) | — | Info/Trans | 🔗 Semantic-support | Rộng; gộp vào Pillar B |
| 11 | bespoke wedding saigon | rỗng | ~0 (ước) | — | Trans | ⚡ Quick-win | Đo được = 0 nhưng giao điểm bespoke × bridal × geo = "vàng" + đối thủ ≈ 0 |
| 12 | **wedding ao dai** | 826(T4)→25(T5); Info 100% | **50**/50 (NEO) | trang 1 = 7/7 seller diaspora+social+Amazon | Info→Trans | 🏛 **Pillar B (head)** | **Từ khoá mạnh nhất toàn cụm.** Trends 12m=50 (đỉnh tuần 100 đầu T4). SimilarWeb intent chủ yếu info. Trang 1 US KHÔNG có atelier Saigon → góc "made in Saigon" độc quyền |
| 13 | the ao dai | nằm dưới head | n/a | — | Info | ✂️ Drop/gộp | Quá generic |
| 14 | bridesmaids ao dai | rỗng | **0**/50 | — | Trans | ⚡ Quick-win | Trends 0 nhưng intent rõ + đối thủ ≈ 0 → long-tail conversion |
| 15 | modern bridal ao dai | thấp | **0**/50 | — | Info/Trans | ⚡ Quick-win | Cụm gốc 0; nhưng `ao dai modern` (related query head) = 24 → viết theo hướng "modern ao dai" |
| 16 | ao dai wedding | ~ #12 | (gộp #12) | — | Info | 🔗 Semantic-support | Biến thể; related query `ao dai wedding`=28 |
| 17 | ao dai bride | thấp | **0**/50 | — | Info/Trans | 🔗 Semantic-support | Biến thể; rải trong Pillar B |
| 18 | silk ao dai bridal | rỗng | ~0 (ước) | — | Trans | 🔗 Semantic-support | Rải trong bài lụa + bridal |
| 19 | embroidered dress | rộng | n/a (lệch ngách) | — | Info | ✂️ Drop/gộp | Chỉ rải dưới dạng "embroidered ao dai" |
| 20 | ao dai beading | rỗng | ~0 (ước) | — | Info | 🔗 Semantic-support | Thuật ngữ craft; rải trong bài thủ công |

  ### Nhóm 3 — Evening, Occasion & Luxury

| \# | Từ khoá | SW vol | Trends 12m | Intent | Verdict | Ghi chú (có số) |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 21 | evening wear saigon | rỗng | **1**/50 | Trans | 🏛 Pillar C (geo head) | Trends 1 (đỉnh tuần Nov'25=50). Cầu nhỏ nhưng intent đặt may + đối thủ EN ≈ 0 → vẫn làm trụ occasion |
| 22 | evening dress ho chi minh | rỗng | ~0 (ước) | Trans | 🔗 Semantic-support | Biến thể #21 |
| 23 | artisanal bespoke fashion | rỗng | ~0 (ước) | Info/Brand | 🔗 Semantic-support | Định vị thương hiệu; rải Pillar A & C |
| 24 | occasion wear vietnam | rỗng | **1**/50 | Trans | ⚡ Quick-win | (sửa chính tả "occasional"→"occasion") |
| 25 | asian inspired dress | thấp | n/a (lệch ngách) | Info | ✂️ Drop/gộp | Lệch ngách phương Tây; bỏ |
| 26 | custom evening dress | thấp | ~0 (ước) | Trans | 🔗 Semantic-support | Rải Pillar C |
| 27 | evening gown vietnam | rỗng | ~0 (ước) | Trans | 🔗 Semantic-support | Rải Pillar C |
| 28 | contemporary ao dai | thấp | **1**/50 | Info | ⚡ Quick-win | = #30; related query `ao dai modern`=24 cho thấy nên dùng từ "modern" |

  ### Nhóm 4 — Couture & Brand

| \# | Từ khoá | SW vol | Trends 12m | Intent | Verdict | Ghi chú (có số) |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 29 | vietnamese couture | thấp, blip | **1**/50 | Info/Brand | 🅑 Brand (hạ từ Quick-win) | **Hiệu chỉnh quan trọng:** brief khách ghi "↑33" nhưng đó chỉ là *blip 1 tuần* (Sep'25=60, các tuần khác=0). Trends 12m thật = 1/50 → **KHÔNG phải từ kéo traffic**; chỉ dùng làm *góc định vị* trong Pillar C |
| 30 | contemporary ao dai | thấp | **1**/50 | Info | ⚡ Quick-win | = #28; làm 1 bài |
| 31 | ao dai haute couture | rỗng | ~0 (ước) | Info/Brand | 🔗 Semantic-support | Rải trong bài couture |
| 32 | vietnamese haute couture | rỗng | ~0 (ước) | Info/Brand | 🔗 Semantic-support | Rải trong bài couture |

  ### Nhóm 5 — Khác \+ thuật ngữ thủ công

| \# | Từ khoá | SW vol | Trends 12m | Intent | Verdict | Ghi chú (có số) |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 33 | vietnamese dress tailor | thấp | ~0 (ước) | Trans | 🔗 Semantic-support | Rải Pillar A; related query `vietnamese dress`=24 |
| 34 | custom ao dai vietnam | thấp | **0**/50 | Trans | ⚡ Quick-win | Trends 0 nhưng intent đặt may rõ + geo quốc gia → long-tail |
| — | hand embroidery / hand-guided embroidery / hand embellished / hand beading / beadwork | rỗng | ~0 (ước) | Info/Brand | 🔗 Semantic-support | **Bộ thuật ngữ thủ công** — rải trong bài craftsmanship để bồi E-E-A-T |

> **⚠️ Minh bạch dữ liệu:** các ô ghi **"~0 (ước)"** là **chưa đo Trends riêng** — chúng trả rỗng trên SimilarWeb VÀ có cùng pattern near-zero như các từ cùng nhóm đã đo, nên được suy ra là ~0 thay vì tốn thêm call. 16/34 từ được chấm Trends trực tiếp; phần còn lại suy theo pattern (chi tiết: `data_logs/2026-06-11_trends_full34_batch-averages.json`).

  **Tổng kết verdict (sau khi đối chiếu số thật):** 3 Pillar · ~8 Quick-win · còn lại Semantic-support/Brand. **2 hiệu chỉnh lớn từ số liệu:** (a) `traditional ao dai`=57 hoá ra mạnh nhất nhóm info → nâng ưu tiên; (b) `vietnamese couture`=1 và `bridal ao dai`=1 → hạ khỏi vai trò "từ kéo traffic". → vẫn đủ vật liệu cho **3 trụ + 7 quick-win** (Tài liệu 2).

  ---

  ## 3\. Bản đồ cạnh tranh (ai đang chiếm SERP & nội dung nào thắng)

  > *SERP được đo theo ma trận 3 địa điểm (VN · US · AU) vì kết quả khác nhau rõ giữa thị trường nội địa và diaspora — đo một nơi sẽ không phản ánh đúng. Dữ liệu: `data_logs/2026-06-11_serp_multilocation_matrix.json`.*

  ### 3.1 Cụm "áo dài tại Saigon / đặt may" — theo địa điểm

  **`bespoke ao dai saigon` đo từ Việt Nam (google.com.vn, HCMC):** — atelier Việt **đứng top thật sự**:

| Khối | Kết quả | Loại |
| :---- | :---- | :---- |
| 🗺️ **Local Pack (đầu trang)** | **Byfas** (4.1★/104) · **Minh Chau Bespoke "Haute couture house" từ 1975** (5.0★/116) · **Kim Bespoke** (4.9★/606) | Atelier thật, review mạnh |
| Organic #2 | **Maydo Saigon** (maydosaigon.com) | **Atelier — site riêng** |
| Organic #6 | **Duan Tailor** (duantailor.com) — snippet: *"bespoke Traditional Áo Dài… hand-stitching. Crafted in Saigon"* | **Atelier — site riêng, định vị heritage** |
| #1,3,5,7,8 | Tripadvisor · Kim Travel · TNK · Culture Trip · Lemon8 | Forum/travel/social |
| + carousel video | YouTube (đặt áo dài Saigon) | Video |

  **Cùng truy vấn, đo từ US (google.com):** không có Local Pack; 8/8 là forum/UGC/seller, chỉ 1 atelier (Mark&Vy #7).

  ➡️ **Hệ quả:** Tại **thị trường VN** (khách đang ở/đến Saigon — Nhóm 2 "đến nơi mới tìm"), Maison cạnh tranh với atelier Việt thật (Maydo, Duan, Minh Chau, Kim Bespoke), nên thắng bằng **(a) Google Business Profile + review** (để vào Local Pack) **và** (b) chiều sâu nội dung/heritage — không chỉ blog.
  *(PAA: "How much does an Ao Dai cost in Vietnam?" · "Can foreigners wear the Ao Dai?" · "Where to buy Ao Dai in HCMC?")*

  ### 3.2 Cụm "wedding / bridal áo dài" — ma trận 3 địa điểm

| Truy vấn × Địa điểm | Top organic (loại) | Atelier/brand Việt ở top? |
| :---- | :---- | :---- |
| `wedding ao dai` · 🇻🇳 **VN** | **#1 Nicole Bridal (nicolebridal.vn) – product** · #3 LAHAVA · #7 AoDaiChiDau · **#9 Nicole Bridal – BLOG** | ✅ **Có** — nhà cưới Việt đứng top cả trang sản phẩm lẫn blog |
| `wedding ao dai` · 🇺🇸 **US** | #1 Dream Dresses · #3 linh bridal · #5 East Meets Dress · #6 The Knot · #7 Amazon | ❌ Seller diaspora Mỹ + Amazon |
| `wedding ao dai` · 🇦🇺 **AU** | #1 Dream Dresses · **#2 Le Vow Bridal** · **#5 Ao Dai Sydney** · #6 Reddit · #8 LAHAVA | ⚠️ Seller diaspora + **shop bản địa Úc** |

  ➡️ **Hệ quả (theo địa điểm):**
  - **VN:** nhà cưới Việt (Nicole Bridal) đã rank được cả product lẫn blog → Maison làm được điều tương tự, nhưng cần cạnh tranh bằng nội dung tốt hơn.
  - **US/AU (diaspora):** không có atelier Saigon — góc "bespoke made in Saigon, thử trực tiếp khi về VN" còn trống cho Pillar B (East Meets Dress/Dream Dresses bán theo số đo + ship, không có xưởng tại VN).
  - AU đã có shop bản địa (Le Vow, Ao Dai Sydney) → cạnh tranh diaspora AU cao hơn US một chút.

  ### 3.3 Ngân hàng câu hỏi long-tail (People-Also-Ask) đã xác minh

  Từ SERP thực tế — đây chính là nguyên liệu cho 7 bài quick-win:

- **Chi phí:** "how much does a custom ao dai cost?" (đáp thực tế: từ \~300k VND chợ → $300–$1.000+ designer)  
- **Thời gian:** "how long does it take to make an ao dai?" (3–7 ngày; express 4–48h)  
- **Lụa & vải:** chợ vải Soai Kinh Lam / Tân Định, Nice Silk & Thu Silk trên Lê Thánh Tôn (cùng phố với Maison — 194 Lê Thánh Tôn)  
- **Ý nghĩa & màu sắc:** đỏ \= may mắn, dragon/phoenix \= chú rể/cô dâu, khăn đóng  
- **Modern vs traditional (cách tân):** chủ đề đang hot  
- **Áo dài vs đầm cưới phương Tây:** nhiều cô dâu mặc cả hai (tea ceremony \+ reception)  
- **Mặc cho dịp nào / cách mặc:** tea ceremony, đám hỏi, lễ; fitting cho người nước ngoài

  ---

  ## 4\. Bản đồ khoảng trống & cơ hội (Gap Map)

| Khoảng trống | Vì sao Maison thắng nhanh | Khai thác bằng |
| :---- | :---- | :---- |
| **Diaspora US/AU: "bespoke made in Saigon"** | SERP US/AU **0 atelier Saigon** (chỉ seller diaspora + Amazon); họ bán theo số đo + ship, không có xưởng VN → Maison tuyên bố "made in Saigon, thử trực tiếp" mà không ai cạnh được | Pillar B + bài bridal nhắm diaspora |
| **Thị trường VN: chiều sâu nội dung + GBP** | Atelier Việt **đã rank** (Maydo, Duan, Nicole Bridal) nhưng phần lớn là product page mỏng; Maison hơn ở craft + ảnh editorial + KOL. **Nhưng cần Google Business Profile** để vào Local Pack | Pillar A + craftsmanship + GBP |
| **Pre-trip booking funnel** | Chưa ai tối ưu hành trình "đặt trước khi bay sang" cho áo dài cao cấp | CTA booking + bài "lên kế hoạch may áo dài khi đến Saigon" |
| **Occasion/evening wear (EN)** | `evening wear saigon` Trends 1/50 nhưng đối thủ EN ≈ 0 — cầu nhỏ, cạnh tranh nhỏ | Pillar C |
| **Occasion/couture (góc định vị)** | `vietnamese couture` Trends 12m chỉ 1/50 (blip, không bền) → **không** kỳ vọng traffic; dùng làm góc thương hiệu trong Pillar C | Bài occasion gắn thương hiệu |
| **Lụa & thủ công (silk, embroidery)** | `silk ao dai` Trends 11/50 (đỉnh tuần Dec'25=72); Maison ở ngay phố lụa Lê Thánh Tôn (194) | Bài "chọn lụa" \+ craftsmanship |

  ---

  ## 5\. Shortlist từ khoá ưu tiên (đầu vào cho 10 blog brief)

  Xếp theo *khả năng lên top nhanh × giá trị conversion*:

| Hạng | Từ khoá chính | Loại | Số liệu hậu thuẫn | Lý do ưu tiên |
| :---- | :---- | :---- | :---- | :---- |
| 1 | wedding ao dai | 🏛 Pillar B | **Trends 50/50 (mạnh nhất); SERP US/AU = 0 atelier Saigon; VN có Nicole Bridal rank cả blog** | Từ mạnh nhất + góc "made in Saigon" độc quyền ở thị trường diaspora |
| 2 | traditional ao dai / ao dai meaning | 🏛/⚡ | **Trends 57/50 (cao nhất nhóm info); related `what is ao dai` rising +100%** | Phát hiện mới: nhóm info này còn mạnh hơn bridal → nam châm TOFU |
| 3 | bespoke ao dai (saigon) | 🏛 Pillar A | **SW vol=0; SERP VN có atelier thật (Maydo, Duan) + Local Pack; SERP US gần như trống atelier** | Định vị lõi; ở VN cần GBP + nội dung sâu hơn product page |
| 4 | how much does a custom ao dai cost | ⚡ Quick-win | **PAA #1 ở cả 2 truy vấn SERP đo được** | Câu hỏi top, intent mua, Maison trả lời = bắt khách |
| 5 | how long to make an ao dai (pre-trip) | ⚡ Quick-win | Khớp hành trình pre-trip (Proposal Nhóm 2) | Phục vụ pre-trip funnel trực tiếp |
| 6 | silk ao dai / chọn lụa | ⚡ Quick-win | **Trends 11/50, đỉnh tuần Dec'25=72** | Có cầu theo mùa + lợi thế phố lụa Lê Thánh Tôn |
| 7 | custom ao dai vietnam (cho người nước ngoài) | ⚡ Quick-win | **PAA "Can foreigners wear the Ao Dai?" xác minh** | Intent đặt may + expat/traveler |
| 8 | evening wear saigon | 🏛 Pillar C | **Trends 1/50 nhưng đối thủ EN ≈ 0** | Occasion; trống hoàn toàn — rank dễ dù cầu nhỏ |
| 9 | ao dai vs western wedding dress | ⚡ Quick-win | PAA tea-ceremony đã xác minh (WebSearch) | Kéo nhóm bridal về Pillar B |
| 10 | modern ao dai | ⚡ Quick-win | **Related query `ao dai modern`=24** | Chủ đề có cầu, dễ rank |

> **Lưu ý so với bản trước:** `vietnamese couture` đã **rớt khỏi top ưu tiên** (Trends thật 1/50, là blip chứ không phải xu hướng bền) — chỉ còn là *góc định vị* trong Pillar C. `traditional ao dai` (57/50) được **nâng lên hạng 2** sau khi đo số thật.

  → Chi tiết triển khai: [02\_blog\_briefs.md](http://./02_blog_briefs.md).

  ---

  ## 6\. Lưu ý phương pháp & độ tin cậy dữ liệu

- **SimilarWeb keyword volume cho ngách này rất mỏng** (nhiều từ trả "≈0 đo được"). Điều này *bình thường* với ngách siêu chuyên \+ tiếng Anh \+ địa phương VN — và là **tín hiệu tốt** cho mục tiêu lên top nhanh. Volume head term ao dai (\~62–72K, 100% info) là mốc neo đáng tin.  
- **Difficulty/Competition của SimilarWeb trả null** → đánh giá cạnh tranh dựa trên vị trí SERP đo thật theo nhiều địa điểm (SerpApi google engine, ma trận VN·US·AU, 11/6/2026) — SERP khác nhau giữa thị trường nội địa và diaspora nên cần đo nhiều nơi. *(files: `data_logs/2026-06-11_serp_multilocation_matrix.json` + `..._serp_positions_2queries_us.json`)*
- **Phương pháp chuẩn hoá Trends xuyên batch:** Google Trends chỉ chuẩn hoá nội bộ mỗi nhóm ≤5 từ. Để so sánh cả 34 từ trên **một thang chung**, mỗi batch đều chứa `wedding ao dai` làm **neo**, rồi nhân lại theo công thức `điểm = avg_batch × 50/anchor_batch`. 16/34 từ chấm trực tiếp; phần còn lại suy theo pattern (đánh dấu "~0 (ước)"). *(file: `data_logs/2026-06-11_trends_full34_batch-averages.json`)*
- **Bộ Google Trends nội bộ của khách** (wedding ao dai=80, silk=47, couture=33, bridal=27) là *điểm so sánh nội bộ một batch*, **không cùng thang** với điểm chuẩn hoá của tài liệu này. Đối chiếu cho thấy thứ tự **đúng một phần** (wedding ao dai dẫn đầu) nhưng **couture bị thổi phồng** (thật = 1, không phải 33).
- **Toàn bộ số liệu thô** được lưu tại [`data_logs/`](./data_logs/_index.md) để audit & không phải fetch lại.
- Khi GSC (Search Console) của site mới chạy sau go-live, **thay thế các ước lượng này bằng dữ liệu impression/click thực tế** và cập nhật lại shortlist (mốc Tuần 7: "Bản đồ từ khoá \+ xếp hạng cơ sở").

  ---

  ## 7\. Bàn giao & liên kết công việc với Maddy

- 10 blog brief (Tài liệu 2\) là **đầu vào cho mốc T3 của Maddy** ("Gửi cuốn chiếu blog theo brief Thiệu cấp ở T1").  
- Góc "3 thị trường trọng điểm" của Maddy có thể **mở rộng cụm nội dung** sau (ví dụ thêm bài nhắm Dubai/Singapore/Hàn) — nhưng **không thuộc** 10 brief nền tảng này; 10 brief tập trung Nhóm 1+2 (expat \+ travel shopper) để đạt KPI nhanh trước.  
- Tài liệu này **thay thế** bảng "SEO Blog Strategy" 5 chủ đề cũ trong management/plan.md (xem ghi chú đối chiếu ở cuối Tài liệu 2).  
- **Mới (reconfirm Google Trends):** demand "wedding ao dai" đến **gần như 100% từ Úc \+ Mỹ** (diaspora), Việt Nam \<1. → Maddy nên cân nhắc **Úc (Australia)** là một thị trường diaspora tiềm năng bên cạnh Mỹ khi phân tích.

  ---

  ## 8\. Reconfirm bằng Google Trends thực tế (SerpApi) — 11/6/2026

  Mục này **đối chiếu lại** các từ khoá mà SimilarWeb trả "≈0 đo được", dùng dữ liệu Google Trends thật (12 tháng, toàn cầu). **Kết luận: hướng chiến lược không đổi, nhưng có 3 hiệu chỉnh quan trọng.**

  ### 8.1 So sánh mức độ quan tâm thực (TIMESERIES, trung bình 12 tháng)

| Từ khoá | Điểm TB (Google Trends) | Diễn giải |
| :---- | :---- | :---- |
| **wedding ao dai** | **50** | **Vượt trội tuyệt đối** — cầu ổn định quanh năm, đỉnh mạnh mùa Tết (T1–T2) & T4 (đạt 100 đầu T4/2026). Đây là từ khoá "thật" duy nhất có volume đáng kể. |
| silk ao dai | 10 | Có thật nhưng **ngắt quãng** — nền bằng 0, thỉnh thoảng vọt (Dec'25=72, Feb'26=50). Theo mùa/dịp. |
| vietnamese couture | 1 | **Gần như không có** cầu tìm kiếm ổn định. "↑33" trong brief khách chỉ là *blip ngắn hạn* sau Couture Week, không bền. |
| bridal ao dai | 1 | Rất ít cầu *dưới đúng cụm này* — cầu thực nằm ở "wedding ao dai". |
| bespoke ao dai | 0 | **Không đo được cầu** — xác nhận SimilarWeb. Là **từ định vị thương hiệu**, không phải từ tìm kiếm. |

  ### 8.2 Demand đến từ đâu (GEO\_MAP cho "wedding ao dai")

| Quốc gia | Chỉ số |
| :---- | :---- |
| 🇦🇺 **Australia** | **100** |
| 🇺🇸 **United States** | **100** |
| 🇻🇳 Vietnam | \<1 |
| 🇨🇦 Canada / 🇬🇧 UK / 🇩🇪 Germany | \<1 |

  ➡️ **Xác nhận mạnh chiến lược tiếng Anh \+ đối tượng quốc tế.** Người tìm "wedding ao dai" là **diaspora Việt ở Úc & Mỹ**, gần như không ai ở VN gõ cụm tiếng Anh này. → Nội dung bridal nên nói được với *cô dâu gốc Việt ở Úc/Mỹ đang lên kế hoạch cưới* (đặt may từ xa rồi về VN, hoặc ship) — trùng khít "pre-trip booking funnel".

  ### 8.3 Related queries thật cho head term "ao dai" (đã lọc nhiễu)

  *(Đã loại các query nhiễu tiếng Bồ Đào Nha do chữ "dai" — vd "fado", "azulejo", "jesus manso…", vốn không liên quan.)*

  **Top (cầu ổn định):** ao dai vietnam (98) · ao dai vietnamese (80) · ao dai dress (67) · traditional ao dai (34) · ao dai wedding (28) · ao dai modern (24) · vietnamese dress (24)

  **Màu sắc (xác nhận bài \#10):** red ao dai (19) · ao dai trang / white (22) · black ao dai (**rising \+100%**)

  **Câu hỏi (xác nhận bài \#10 là nam châm TOFU):** what is ao dai (27, **rising \+100%**)

  **Dịp:** ao dai tet (18) · ao dai shop (17, intent mua)

  **🔎 Phát hiện mới — ngách bị bỏ sót:** ao dai nam (43) & men ao dai (31) — **áo dài nam/chú rể có cầu thật, khá cao**. Maison có làm đồ nam/chú rể trong gói cưới → nên **bổ sung tín hiệu groom's áo dài** vào Pillar B (không cần bài riêng trong 10 brief nền, nhưng là *spoke mở rộng* tốt cho đợt sau).

  ### 8.4 3 hiệu chỉnh đưa vào kế hoạch

1. **Pillar B dùng wedding ao dai làm từ khoá chính** (không phải bridal ao dai). "bridal ao dai" chỉ là semantic phụ. → đã phản ánh trong Tài liệu 2 (\#2 đã đặt wedding ao dai / bridal ao dai, nay **ưu tiên rõ "wedding ao dai"**).  
2. **Hạ kỳ vọng vietnamese couture**: giữ là *góc định vị thương hiệu* trong Pillar C, **không** coi là từ khoá kéo traffic. Pillar C nên dựa nhiều hơn vào "evening wear saigon / occasion" (intent đặt may local) thay vì couture.  
3. **Thêm tín hiệu groom/men's áo dài** vào Pillar B \+ nhắm diaspora **Úc** (không chỉ Mỹ) trong góc nội dung bridal.

   ### 8.5 Lưu ý đọc số Google Trends

- Trends là **chỉ số tương đối 0–100**, không phải volume tuyệt đối. Dùng để *xếp hạng ưu tiên*, không quy ra số lượt.  
- wedding ao dai mang tính **mùa vụ rất rõ** (đỉnh Tết & mùa cưới) → lên lịch đẩy nội dung bridal **trước mùa cao điểm** (T11–T1 cho Tết, T3 cho mùa cưới xuân).  
- Khi GSC chạy thật sau go-live, thay các chỉ số tương đối này bằng impression/click thật (đã nêu ở §6).  
  