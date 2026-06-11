# Maison Dénudé — Bản Đồ SEO Landscape (Bối Cảnh Tìm Kiếm)

> Tài liệu 1/2 trong gói **Keyword Research + 10 Blog Brief** (deliverable Tuần 1 — 12–18/6/2026, theo Proposal v11).
> Tài liệu 2: [`02_blog_briefs.md`](./02_blog_briefs.md) — 10 blog brief xây nền semantic network.
>
> **Nguồn dữ liệu:** SimilarWeb MCP (volume từ khoá, dữ liệu `web`/`rank_tracker` cập nhật 2026-05) + **SerpApi → Google Trends thực tế** (TIMESERIES + GEO_MAP + RELATED_QUERIES, 12 tháng) + nghiên cứu SERP thực tế (Google, travel blog, forum). Dữ liệu được đối chiếu với bộ Google Trends nội bộ của khách (file `Keyword SEO.csv`).
> **Ngày thực hiện:** 11/6/2026 · **Cập nhật reconfirm bằng Google Trends:** 11/6/2026 (xem §8).

---

## 0. Tóm tắt cho người bận (Executive Summary)

**Câu hỏi cốt lõi:** Maison Dénudé có thể lên top Google nhanh ở đâu để đạt KPI *Top-10 cho ≥3 từ khoá trong 3 tháng sau go-live*?

**3 phát hiện quyết định chiến lược:**

1. **Từ khoá "đầu" (head term) `ao dai` có volume lớn (~62.000–72.000 lượt/tháng toàn cầu) nhưng 100% là intent thông tin** — người ta tìm để *hiểu áo dài là gì*, không phải để mua. → Không nên đốt sức cạnh tranh head term; nên *bắt traffic này bằng bài guide* rồi điều hướng xuống booking.

2. **Các từ khoá khách đưa có chèn "bespoke / wedding / saigon / silk" gần như không đo được volume trên SimilarWeb** (long-tail thực sự). Đây **không phải tin xấu** — nó nghĩa là **cạnh tranh thấp → lên top nhanh**. Chiến lược đúng là *phủ thật nhiều bài long-tail cụ thể*, không phải đua 1–2 từ khoá lớn.

3. **Trang 1 Google cho cụm "ao dai saigon / ao dai tailor ho chi minh" hiện do travel blog, listicle và forum chiếm** (TheCultureTrip, TNK Travel, Jungle Boss, Vespa Agogo, TripAdvisor, Expat.com…) — **gần như không một atelier cao cấp nào sở hữu nội dung của chính mình ở đó.** Đây là **khoảng trống lớn**: một nhà may bespoke thật, có nội dung SEO chuẩn, hoàn toàn có thể vượt mặt các listicle mỏng.

**Kết luận chiến lược:**
> Maison **không** đua head term. Maison chiếm **"long-tail có intent cao + định vị địa lý Saigon + đối tượng khách quốc tế/expat"** — nơi đối thủ trực tiếp gần như vắng mặt. Mô hình nội dung: **cụm chủ đề (topic cluster)** gồm 3 bài trụ (pillar) + 7 bài long-tail "quick-win" liên kết nội bộ vào nhau, tạo semantic network đủ mạnh để Google hiểu Maison là *thực thể chuyên gia về bespoke áo dài tại Saigon*.

---

## 1. Đối tượng & Search Intent

Bám theo Proposal v11 — phần *"Foreign Market in Vietnam"*. SEO nhắm **2 trong 3 nhóm** (nhóm 3 đi qua RedNote/IG, không qua SEO):

| Nhóm | Mô tả | Search intent điển hình (tiếng Anh) | Giai đoạn phễu |
|------|-------|--------------------------------------|----------------|
| **Nhóm 1 — Expat tại VN** | Người nước ngoài sống ở TP.HCM/Hà Nội, muốn đồ bespoke chuẩn quốc tế | "best ao dai tailor in saigon", "where to get a custom ao dai made district 1" | Giữa–cuối phễu (sẵn sàng đặt) |
| **Nhóm 2 — Khách quốc tế đến VN mua sắm** | Du khách chi tiêu cao, tìm món unique như "souvenir cao cấp"; có 2 hành trình: (a) đặt trước khi bay sang, (b) đến nơi mới tìm | "custom ao dai saigon", "ao dai made in vietnam", "how much does an ao dai cost", "how long to make ao dai" | Đầu–giữa phễu → **pre-trip booking funnel** |

**Hệ quả cho nội dung:**
- Ngôn ngữ: **tiếng Anh**, viết kiểu editorial dễ đọc cho người nước ngoài (giải thích văn hoá, không giả định người đọc biết áo dài).
- Mọi bài phải có **tín hiệu địa lý "Saigon / Ho Chi Minh City / District 1"** + **CTA đặt lịch** (phục vụ pre-trip funnel).
- Định dạng thắng trong ngách này: **guide dài có cấu trúc rõ + ảnh đẹp** (Maison có lợi thế ảnh KOL/editorial — xem `brand.md`).

---

## 2. Audit 34 từ khoá của khách (đối chiếu volume thực tế)

**Cách đọc bảng:**
- **Volume:** tín hiệu volume tìm kiếm từ SimilarWeb (toàn cầu, EN). "≈0 đo được" = quá nhỏ để SimilarWeb trả số → **long-tail, cạnh tranh thấp**.
- **Intent:** Info (thông tin) · Trans (giao dịch/mua) · Local (địa phương) · Brand (thương hiệu).
- **Verdict (kết luận):**
  - 🏛 **Pillar** — đủ rộng để làm bài trụ
  - ⚡ **Quick-win** — long-tail intent cao, lên top nhanh, làm bài hỗ trợ
  - 🔗 **Semantic-support** — không nhắm xếp hạng riêng, dùng rải trong bài để bồi mạng ngữ nghĩa
  - 🅑 **Brand** — từ khoá thương hiệu/định vị, không có volume tìm kiếm độc lập
  - ✂️ **Drop / gộp** — trùng lặp hoặc Trends=0, gộp vào từ khác

### Nhóm 1 — Áo Dài & Heritage

| # | Từ khoá | Volume (SW) | Intent | Verdict | Ghi chú |
|---|---------|-------------|--------|---------|---------|
| 1 | bespoke ao dai | ≈0 đo được | Trans | 🏛 Pillar A (head) | Volume nhỏ nhưng là *định vị lõi* của Maison; cạnh tranh thấp → trụ chính |
| 2 | ao dai saigon | ≈0 đo được (WW) | Local/Trans | 🏛 Pillar A (geo) | "Volume cao nhất" theo brief khách là so *nội bộ*; thực tế là long-tail địa phương — vẫn rất đáng vì intent mua + ít đối thủ atelier |
| 3 | heritage ao dai | ≈0 đo được | Info | 🔗 Semantic-support | Rải trong pillar; ít người gõ trực tiếp |
| 4 | silk ao dai | thấp, đang tăng | Info/Trans | ⚡ Quick-win | Trends ↑47; gắn với bài "chọn lụa" — intent rõ |
| 5 | traditional ao dai | nằm dưới `ao dai` (~62K head) | Info | ⚡ Quick-win | Bám traffic info lớn của head term |
| 6 | ao dai boutique saigon | ≈0 đo được | Local/Trans | 🔗 Semantic-support | Biến thể của #2; gộp vào Pillar A |
| 7 | tailored ao dai | ≈0 đo được | Trans | ⚡ Quick-win | Local SEO + expat; mạnh intent đặt may |
| 8 | designer ao dai saigon | ≈0 đo được | Trans | 🔗 Semantic-support | Tín hiệu luxury; rải trong Pillar A & C |

### Nhóm 2 — Bridal & Wedding

| # | Từ khoá | Volume (SW) | Intent | Verdict | Ghi chú |
|---|---------|-------------|--------|---------|---------|
| 9 | bridal ao dai | thấp–trung | Trans | 🏛 Pillar B (head) | Trụ bridal; đối thủ là site diaspora Mỹ (xem §3) |
| 10 | wedding dress vietnam | thấp–trung | Info/Trans | 🔗 Semantic-support | Rộng; gộp vào Pillar B |
| 11 | bespoke wedding saigon | ≈0 đo được | Trans | ⚡ Quick-win | Giao điểm bespoke × bridal × geo = "vàng" cho Maison |
| 12 | **wedding ao dai** | **826 → 25/tháng (biến động); Info chủ đạo** | Info→Trans | 🏛 **Pillar B (ưu tiên #1)** | **Trends nội bộ = 80 (cao nhất).** SimilarWeb cho thấy intent chủ yếu *thông tin* → thắng bằng bài guide bridal |
| 13 | the ao dai | nằm dưới head `ao dai` | Info | ✂️ Drop/gộp | Quá generic; gộp vào pillar |
| 14 | bridesmaids ao dai | ≈0 đo được | Trans | ⚡ Quick-win | Intent rõ, conversion cao, gần như không đối thủ |
| 15 | modern bridal ao dai | thấp, đang tăng | Info/Trans | ⚡ Quick-win | "Modern vs traditional" là chủ đề hot (xem §3) |
| 16 | ao dai wedding | ~ như #12 | Info | 🔗 Semantic-support | Biến thể; gộp vào Pillar B |
| 17 | ao dai bride | thấp | Info/Trans | 🔗 Semantic-support | Biến thể bridal; rải trong Pillar B |
| 18 | silk ao dai bridal | ≈0 đo được | Trans | 🔗 Semantic-support | Ghép 2 từ đang tăng; rải trong bài lụa + bridal |
| 19 | embroidered dress | trung (rất rộng) | Info | ✂️ Drop/gộp | Quá rộng/lệch ngách; chỉ rải dưới dạng "embroidered ao dai" |
| 20 | ao dai beading | ≈0 đo được | Info | 🔗 Semantic-support | Thuật ngữ craft; rải trong bài thủ công |

### Nhóm 3 — Evening, Occasion & Luxury

| # | Từ khoá | Volume (SW) | Intent | Verdict | Ghi chú |
|---|---------|-------------|--------|---------|---------|
| 21 | evening wear saigon | ≈0 đo được | Trans | 🏛 Pillar C (geo head) | Trụ occasion; geo + intent đặt may |
| 22 | evening dress ho chi minh | ≈0 đo được | Trans | 🔗 Semantic-support | Biến thể của #21 |
| 23 | artisanal bespoke fashion | ≈0 đo được | Info/Brand | 🔗 Semantic-support | Định vị thương hiệu; rải trong Pillar A & C |
| 24 | occasional wear vietnam | ≈0 đo được | Trans | ⚡ Quick-win | (lưu ý chính tả: "occasion wear") |
| 25 | asian inspired dress | thấp–trung | Info | ✂️ Drop/gộp | Lệch ngách phương Tây; bỏ |
| 26 | custom evening dress | thấp | Trans | 🔗 Semantic-support | Rải trong Pillar C |
| 27 | evening gown vietnam | ≈0 đo được | Trans | 🔗 Semantic-support | Rải trong Pillar C |
| 28 | contemporary ao dai | thấp, đang tăng | Info | ⚡ Quick-win | Trùng #30; "modern/contemporary áo dài" |

### Nhóm 4 — Couture & Brand

| # | Từ khoá | Volume (SW) | Intent | Verdict | Ghi chú |
|---|---------|-------------|--------|---------|---------|
| 29 | vietnamese couture | thấp, đang tăng | Info/Brand | ⚡ Quick-win | Trends ↑33 sau Couture Week 1/2026; bài "vietnamese couture" gắn Maison vào làn sóng này |
| 30 | contemporary ao dai | thấp, đang tăng | Info | ⚡ Quick-win | = #28; làm 1 bài |
| 31 | ao dai haute couture | ≈0 đo được | Info/Brand | 🔗 Semantic-support | Rải trong bài couture |
| 32 | vietnamese haute couture | ≈0 đo được | Info/Brand | 🔗 Semantic-support | Rải trong bài couture |

### Nhóm 5 — Khác + thuật ngữ thủ công

| # | Từ khoá | Volume (SW) | Intent | Verdict | Ghi chú |
|---|---------|-------------|--------|---------|---------|
| 33 | vietnamese dress tailor | thấp | Trans | 🔗 Semantic-support | Rải trong Pillar A |
| 34 | custom ao dai vietnam | thấp | Trans | ⚡ Quick-win | Intent đặt may rõ, geo cấp quốc gia |
| — | hand embroidery / hand-guided embroidery / hand embellished / hand beading / beadwork | ≈0 đo được | Info/Brand | 🔗 Semantic-support | **Bộ thuật ngữ thủ công** — rải trong bài craftsmanship để bồi E-E-A-T & độ chuyên gia |

**Tổng kết verdict:** 3 Pillar · ~10 Quick-win · phần lớn còn lại là Semantic-support/Brand. → đủ vật liệu cho **3 bài trụ + 7 bài quick-win** (xem Tài liệu 2).

---

## 3. Bản đồ cạnh tranh (ai đang chiếm SERP & nội dung nào thắng)

### 3.1 Cụm "áo dài tại Saigon / đặt may" (ngách địa phương cho khách quốc tế)

Trang 1 Google **không** do atelier cao cấp chiếm, mà do:

| Loại đối thủ | Ví dụ thực tế (đang rank) | Định dạng thắng | Điểm yếu (cơ hội cho Maison) |
|--------------|---------------------------|-----------------|------------------------------|
| **Travel blog / listicle** | TheCultureTrip, TNK Travel, Jungle Boss, Vespa Agogo, Jackfruit Adventure, iTour Vietnam, KimTravel | "5 best places to get ao dai tailored in Saigon", guide du lịch | Nội dung mỏng, không phải nhà may, không có chiều sâu craft/heritage |
| **Forum / UGC** | TripAdvisor, Expat.com, Facebook groups | Hỏi–đáp, review | Không kiểm soát, không thương hiệu |
| **Nhà may tầm trung / chợ** | Duan Tailor, Maydo Saigon, August Tailor, Miss Ao Dai, các quầy chợ Bến Thành/Tân Định | Trang dịch vụ cơ bản | Định vị bình dân / tốc độ, **không** luxury bespoke heritage |

➡️ **Khoảng trống rõ rệt:** chưa có "nhà bespoke cao cấp Saigon, kể chuyện heritage + craft, có nội dung SEO chuẩn" sở hữu các truy vấn này. Maison vào đúng ô này.

### 3.2 Cụm "wedding / bridal áo dài" (tiếng Anh)

Trang 1 do **site diaspora Mỹ & wedding media** chiếm:

| Đối thủ | Mô hình | Họ bán gì | Maison khác biệt ở đâu |
|---------|---------|-----------|------------------------|
| **East Meets Dress** | Brand Asian-American, bespoke theo số đo, ship | RTW/bespoke "Vietnamese-American bride" | Maison = **bespoke thật tại Saigon**, thử đồ trực tiếp, heritage gốc — không phải đồ ship từ Mỹ |
| Dream Dresses by P.M.N. | Designer bridal | Modern ao dai, lace/illusion | Tương tự — diaspora, không phải atelier Saigon |
| TheKnot / The Filth Series / Cee's Bridal | Wedding media / blog | Bài guide "what is ao dai" | Họ thắng *info*; Maison thắng *info + đặt may tại nguồn* |

➡️ **Khoảng trống:** "**bespoke bridal áo dài made in Saigon**" — giao điểm mà các site Mỹ không thể tuyên bố (họ không có atelier tại VN). Đây là **góc độc quyền của Maison** cho Pillar B.

### 3.3 Ngân hàng câu hỏi long-tail (People-Also-Ask) đã xác minh

Từ SERP thực tế — đây chính là nguyên liệu cho 7 bài quick-win:

- **Chi phí:** "how much does a custom ao dai cost?" (đáp thực tế: từ ~300k VND chợ → $300–$1.000+ designer)
- **Thời gian:** "how long does it take to make an ao dai?" (3–7 ngày; express 4–48h)
- **Lụa & vải:** chợ vải Soai Kinh Lam / Tân Định, Nice Silk & Thu Silk trên Lê Thánh Tôn (cùng phố với Maison — 194 Lê Thánh Tôn)
- **Ý nghĩa & màu sắc:** đỏ = may mắn, dragon/phoenix = chú rể/cô dâu, khăn đóng
- **Modern vs traditional (cách tân):** chủ đề đang hot
- **Áo dài vs đầm cưới phương Tây:** nhiều cô dâu mặc cả hai (tea ceremony + reception)
- **Mặc cho dịp nào / cách mặc:** tea ceremony, đám hỏi, lễ; fitting cho người nước ngoài

---

## 4. Bản đồ khoảng trống & cơ hội (Gap Map)

| Khoảng trống | Vì sao Maison thắng nhanh | Khai thác bằng |
|--------------|---------------------------|----------------|
| **Bespoke heritage Saigon, nội dung chuẩn SEO** | Đối thủ rank là listicle/forum mỏng; Maison có craft + ảnh editorial + KOL | Pillar A + bài craftsmanship |
| **Bespoke bridal áo dài *tại Saigon*** | Site Mỹ không có atelier ở VN; không tuyên bố "made in Saigon" được | Pillar B + bài "ao dai cho đám hỏi" |
| **Pre-trip booking funnel** | Chưa ai tối ưu hành trình "đặt trước khi bay sang" cho áo dài cao cấp | CTA booking + bài "lên kế hoạch may áo dài khi đến Saigon" |
| **Occasion/evening wear Saigon (EN)** | Gần như trống hoàn toàn cho khách quốc tế | Pillar C |
| **Vietnamese couture đang lên** | Trends ↑33, ít nội dung EN chất lượng | Bài couture gắn thương hiệu |
| **Lụa & thủ công (silk, embroidery, beading)** | Trends silk ↑47; Maison ở ngay phố lụa Lê Thánh Tôn | Bài "chọn lụa" + craftsmanship |

---

## 5. Shortlist từ khoá ưu tiên (đầu vào cho 10 blog brief)

Xếp theo *khả năng lên top nhanh × giá trị conversion*:

| Hạng | Từ khoá chính | Loại | Lý do ưu tiên |
|------|---------------|------|----------------|
| 1 | bespoke ao dai (saigon) | 🏛 Pillar A | Định vị lõi + cạnh tranh atelier gần như bằng 0 |
| 2 | wedding ao dai / bridal ao dai | 🏛 Pillar B | Trends nội bộ cao nhất (80); góc "made in Saigon" độc quyền |
| 3 | evening wear saigon / vietnamese couture | 🏛 Pillar C | Occasion + làn sóng couture; trống đối thủ EN |
| 4 | how much does a custom ao dai cost | ⚡ Quick-win | Volume câu hỏi cao, intent mua, Maison trả lời = bắt khách |
| 5 | how long to make an ao dai (pre-trip) | ⚡ Quick-win | Phục vụ pre-trip funnel trực tiếp |
| 6 | silk ao dai / chọn lụa | ⚡ Quick-win | Trends ↑47; lợi thế địa lý phố lụa |
| 7 | custom ao dai vietnam (cho người nước ngoài) | ⚡ Quick-win | Intent đặt may + expat/traveler |
| 8 | modern / contemporary ao dai | ⚡ Quick-win | Chủ đề đang hot, dễ rank |
| 9 | ao dai vs western wedding dress | ⚡ Quick-win | PAA đã xác minh; kéo nhóm bridal |
| 10 | ao dai meaning / colors / how to wear | ⚡ Quick-win | Bắt traffic info lớn của head `ao dai` (~62K) |

→ Chi tiết triển khai: [`02_blog_briefs.md`](./02_blog_briefs.md).

---

## 6. Lưu ý phương pháp & độ tin cậy dữ liệu

- **SimilarWeb keyword volume cho ngách này rất mỏng** (nhiều từ trả "≈0 đo được"). Điều này *bình thường* với ngách siêu chuyên + tiếng Anh + địa phương VN — và là **tín hiệu tốt** cho mục tiêu lên top nhanh. Volume head term `ao dai` (~62–72K, 100% info) là mốc neo đáng tin.
- **Difficulty/Competition của SimilarWeb trả `null`** cho các từ này → đánh giá cạnh tranh dựa trên **kiểm tra SERP thực tế** (ai đang rank), chính xác hơn cho ngách nhỏ.
- **Bộ Google Trends nội bộ của khách** (wedding ao dai=80, silk=47, couture=33, bridal=27) phản ánh *xu hướng tương đối*, không phải volume tuyệt đối — đã được dùng để *xếp ưu tiên*, không dùng làm con số volume.
- Khi GSC (Search Console) của site mới chạy sau go-live, **thay thế các ước lượng này bằng dữ liệu impression/click thực tế** và cập nhật lại shortlist (mốc Tuần 7: "Bản đồ từ khoá + xếp hạng cơ sở").

---

## 7. Bàn giao & liên kết công việc với Maddy

- 10 blog brief (Tài liệu 2) là **đầu vào cho mốc T3 của Maddy** ("Gửi cuốn chiếu blog theo brief Thiệu cấp ở T1").
- Góc "3 thị trường trọng điểm" của Maddy có thể **mở rộng cụm nội dung** sau (ví dụ thêm bài nhắm Dubai/Singapore/Hàn) — nhưng **không thuộc** 10 brief nền tảng này; 10 brief tập trung Nhóm 1+2 (expat + travel shopper) để đạt KPI nhanh trước.
- Tài liệu này **thay thế** bảng "SEO Blog Strategy" 5 chủ đề cũ trong `management/plan.md` (xem ghi chú đối chiếu ở cuối Tài liệu 2).
- **Mới (reconfirm Google Trends):** demand "wedding ao dai" đến **gần như 100% từ Úc + Mỹ** (diaspora), Việt Nam <1. → Maddy nên cân nhắc **Úc (Australia)** là một thị trường diaspora tiềm năng bên cạnh Mỹ khi phân tích.

---

## 8. Reconfirm bằng Google Trends thực tế (SerpApi) — 11/6/2026

Mục này **đối chiếu lại** các từ khoá mà SimilarWeb trả "≈0 đo được", dùng dữ liệu Google Trends thật (12 tháng, toàn cầu). **Kết luận: hướng chiến lược không đổi, nhưng có 3 hiệu chỉnh quan trọng.**

### 8.1 So sánh mức độ quan tâm thực (TIMESERIES, trung bình 12 tháng)

| Từ khoá | Điểm TB (Google Trends) | Diễn giải |
|---------|--------------------------|-----------|
| **wedding ao dai** | **50** | **Vượt trội tuyệt đối** — cầu ổn định quanh năm, đỉnh mạnh mùa Tết (T1–T2) & T4 (đạt 100 đầu T4/2026). Đây là từ khoá "thật" duy nhất có volume đáng kể. |
| silk ao dai | 10 | Có thật nhưng **ngắt quãng** — nền bằng 0, thỉnh thoảng vọt (Dec'25=72, Feb'26=50). Theo mùa/dịp. |
| vietnamese couture | 1 | **Gần như không có** cầu tìm kiếm ổn định. "↑33" trong brief khách chỉ là *blip ngắn hạn* sau Couture Week, không bền. |
| bridal ao dai | 1 | Rất ít cầu *dưới đúng cụm này* — cầu thực nằm ở "wedding ao dai". |
| bespoke ao dai | 0 | **Không đo được cầu** — xác nhận SimilarWeb. Là **từ định vị thương hiệu**, không phải từ tìm kiếm. |

### 8.2 Demand đến từ đâu (GEO_MAP cho "wedding ao dai")

| Quốc gia | Chỉ số |
|----------|--------|
| 🇦🇺 **Australia** | **100** |
| 🇺🇸 **United States** | **100** |
| 🇻🇳 Vietnam | <1 |
| 🇨🇦 Canada / 🇬🇧 UK / 🇩🇪 Germany | <1 |

➡️ **Xác nhận mạnh chiến lược tiếng Anh + đối tượng quốc tế.** Người tìm "wedding ao dai" là **diaspora Việt ở Úc & Mỹ**, gần như không ai ở VN gõ cụm tiếng Anh này. → Nội dung bridal nên nói được với *cô dâu gốc Việt ở Úc/Mỹ đang lên kế hoạch cưới* (đặt may từ xa rồi về VN, hoặc ship) — trùng khít "pre-trip booking funnel".

### 8.3 Related queries thật cho head term "ao dai" (đã lọc nhiễu)

*(Đã loại các query nhiễu tiếng Bồ Đào Nha do chữ "dai" — vd "fado", "azulejo", "jesus manso…", vốn không liên quan.)*

**Top (cầu ổn định):** `ao dai vietnam` (98) · `ao dai vietnamese` (80) · `ao dai dress` (67) · `traditional ao dai` (34) · `ao dai wedding` (28) · `ao dai modern` (24) · `vietnamese dress` (24)

**Màu sắc (xác nhận bài #10):** `red ao dai` (19) · `ao dai trang` / white (22) · `black ao dai` (**rising +100%**)

**Câu hỏi (xác nhận bài #10 là nam châm TOFU):** `what is ao dai` (27, **rising +100%**)

**Dịp:** `ao dai tet` (18) · `ao dai shop` (17, intent mua)

**🔎 Phát hiện mới — ngách bị bỏ sót:** `ao dai nam` (43) & `men ao dai` (31) — **áo dài nam/chú rể có cầu thật, khá cao**. Maison có làm đồ nam/chú rể trong gói cưới → nên **bổ sung tín hiệu groom's áo dài** vào Pillar B (không cần bài riêng trong 10 brief nền, nhưng là *spoke mở rộng* tốt cho đợt sau).

### 8.4 3 hiệu chỉnh đưa vào kế hoạch

1. **Pillar B dùng `wedding ao dai` làm từ khoá chính** (không phải `bridal ao dai`). "bridal ao dai" chỉ là semantic phụ. → đã phản ánh trong Tài liệu 2 (#2 đã đặt `wedding ao dai / bridal ao dai`, nay **ưu tiên rõ "wedding ao dai"**).
2. **Hạ kỳ vọng `vietnamese couture`**: giữ là *góc định vị thương hiệu* trong Pillar C, **không** coi là từ khoá kéo traffic. Pillar C nên dựa nhiều hơn vào "evening wear saigon / occasion" (intent đặt may local) thay vì couture.
3. **Thêm tín hiệu groom/men's áo dài** vào Pillar B + nhắm diaspora **Úc** (không chỉ Mỹ) trong góc nội dung bridal.

### 8.5 Lưu ý đọc số Google Trends

- Trends là **chỉ số tương đối 0–100**, không phải volume tuyệt đối. Dùng để *xếp hạng ưu tiên*, không quy ra số lượt.
- `wedding ao dai` mang tính **mùa vụ rất rõ** (đỉnh Tết & mùa cưới) → lên lịch đẩy nội dung bridal **trước mùa cao điểm** (T11–T1 cho Tết, T3 cho mùa cưới xuân).
- Khi GSC chạy thật sau go-live, thay các chỉ số tương đối này bằng impression/click thật (đã nêu ở §6).
