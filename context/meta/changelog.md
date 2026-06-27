# Master Context — Changelog

_Change log for the `/context` master repo. Newest first._

## 2026-06-27 — Gộp đối thủ về MỘT §C + trực quan hoá đầy đủ (Maddy)

- **Gộp §C + §C+ + §C++ thành một block "C · Phân tích từng đối thủ"** (theo yêu cầu — trước bị tách 3 chỗ). Render data-driven (`COMP2` + `compCard()`), mỗi đối thủ một thẻ đầy đủ.
- **Mỗi thẻ có 4 phần trực quan:** (1) % lưu lượng theo nước — line chart 6 tháng (hoặc bar trung-bình cho brand ít dữ liệu); (2) **từ khoá = % bar (TẤT CẢ từ khoá)**, tô màu branded (xám) vs ngành/sản phẩm (đỏ); (3) **trang top = bar clickable** (bấm mở trang thật); (4) **nguồn traffic** = thanh kênh.
- **Pull MCP cho 5 đối thủ còn thiếu** (LAHAVA, Meera, East Meets Dress, Serene Hill, Metiseko) + keyword-aggregate cho 7 brand đã có. Tổng **12 đối thủ** trong §C.
- **Phát hiện sửa framing:** không chỉ MEAN BLVD — **LAHAVA cũng sở hữu SEO ngành** ("vietnamese wedding dress" ~30%), East Meets Dress ("qipao/cheongsam"), TVC ("wedding guest dresses vietnam"). Thuần-branded: HUONG (~80%), Kisserine (~90%), Metiseko (58%), Serene Hill, Tung Vu. East Meets Dress organic 71%; Serene Hill có tín hiệu modest (Jordan 2%, "evening dresses muslim").
- Renderer mới `lineSVG`/`barSVG` (trả chuỗi SVG); bỏ `lineChart` cũ + các card §C++ hand-written. Bỏ 2 nav link cũ (C+/C++). JS validate OK (render 33 SVG, 40 link trang, không NaN), key không vào repo. Không commit/host.

## 2026-06-27 — §C++ thêm nguồn traffic (kênh) + 2 brand (The Viet Concept, Tung Vu) (Maddy)

- **Nguồn traffic (kênh, 5/2026, MCP):** thêm block stacked-bar so kênh — Organic Search dẫn dắt (HUONG 50%, Kisserine 55%, Nicole 45%); **MEAN BLVD Social 27%** (Pinterest/IG); **HUONG là brand duy nhất chạy Paid Search (15%)**. Linh Nga / TVC / Tung Vu: endpoint kênh trả 404 (lưu lượng dưới ngưỡng).
- **The Viet Concept — thẻ §C++ đầy đủ (line chart):** xác nhận MẠNH NHẤT kênh Việt→Vịnh — **Ả Rập Xê Út 0→54% (#1 tháng 5/2026)**, Úc 19%, Mỹ rớt 48→9%; Bỉ thống trị Dec–Jan (artifact affiliate/proxy). Keyword có **category ngành thật** ("wedding guest dresses vietnam", "vietnamese brand dresses") → TVC tạo cầu ngành. Top trang: /collections/wedding-guest áp đảo.
- **Tung Vu — thẻ trình bày trung thực (không vẽ chart):** web dưới ngưỡng nhiễu (0 lượt 12/25–2/26; ~821→527→497 sau đó), 100% Úc, từ khoá 100% branded/tên-BST, 1 trang sản phẩm = 100%, kênh 404. Kết luận: web không phải nơi brand sống; lõi là B2B sỉ vùng Vịnh (vô hình với SimilarWeb).
- Heading §C++ → "7 brand". JS validate OK (12 chart, id khớp), div 160/160, key không vào repo. Không commit/host.

## 2026-06-27 — §C++ trực quan hoá: line chart từ SimilarWeb MCP (số thật) (Maddy)

- **Cài SimilarWeb MCP** (`mcp.similarweb.com`, scope local — key ở `~/.claude.json`, KHÔNG vào repo). Endpoint keyword + popular-pages mà REST API khoá (404) thì **MCP mở được** → giờ có số thật.
- **Phát hiện đảo chiều (web-total gồm mobile):** MEAN BLVD KHÔNG phải sàn khách Mỹ — Mỹ sụp **26%→7,5%**, Ấn Độ vọt **14%→34%**, Ả Rập Xê Út đỉnh **38% (2/2026)**, Canada 27%. Dữ liệu desktop-REST trước (US-led) đã đánh lừa. Trung Đông + Ấn Độ chỉ ở SÀN này; 4 brand lẻ ≈ 0.
- **Rebuild §C++** thành **biểu đồ line-chart** (renderer SVG vanilla `lineChart()`): mỗi brand 2 chart — (1) % lưu lượng theo nước 6 tháng (12/25–5/26), (2) % share từ khoá 3 tháng (3–5/26, API chỉ mở 3 tháng). Bỏ ô cảnh báo "gated"; thay keyword/subpage "suy luận" bằng **số thật**.
- **Keyword thật:** chỉ MEAN BLVD có từ khoá NGÀNH ("ao dai" 4-5%, "vietnamese clothing brands"); HUONG "huong boutique" 62→74% (thuần branded), Kisserine "kisserine" 90→53%, Linh Nga "linh nga bridal" #1 — sống bằng tên. Úc là tệp diaspora bị xem nhẹ (Nicole từng #1 Úc 38%).
- Dữ liệu pull qua workflow 5 agent gọi MCP. JS validate OK (10 chart, không NaN), div 130/130, key sạch. Không commit/host.

## 2026-06-27 — Đào sâu 5 brand: xu hướng 6 tháng + từ khoá/subpage (Maddy)

- **Pull SimilarWeb geo theo từng tháng** (12/2025→5/2026) cho Linh Nga, Nicole, HUONG, Kisserine, MEAN BLVD = 30 file `data_logs/*__geo_YYYY-MM.json` → dựng xu hướng **Mỹ% + vùng Vịnh% + số tuyệt đối theo thời gian** (số thật).
- **Xác nhận lại: endpoint từ-khoá + popular-pages bị KHOÁ (404)** ở gói này → từ khoá/subpage chỉ **suy luận** (SERP + cấu trúc site, qua workflow 5 agent), **không có volume/từ-khoá** — ghi rõ ô cảnh báo trong report. Muốn số thật cần Ahrefs/SEMrush.
- Thêm section **`C++ · Đào sâu 5 brand`** vào `bao-cao-tong-hop.html`: mỗi brand có bảng lưu lượng/Mỹ%/Vịnh% 6 tháng + đọc-nhanh + từ khoá top (suy luận) + subpage top (suy luận) + nguồn. Nav link mới.
- **Phát hiện chính:** (1) chỉ **MEAN BLVD tạo cầu bằng SEO ngành** (#1 Google "Vietnamese designer dresses platform"); 4 brand kia sống bằng tên thương hiệu + social. (2) **Trung Đông tập trung ở SÀN** (MEAN BLVD 7–13% Saudi-dẫn ~15K/th; + The Viet Concept 19%), NTK lẻ ≈ 0%. (3) Mỹ phân kỳ: Nicole giảm 40%→16% (Úc bù), HUONG ổn ~50%, Kisserine ~41%, MEAN BLVD số tuyệt đối Mỹ tăng vọt 37K→93K.
- **Đính chính Kisserine:** không phải "may sẵn giá rẻ" mà **may-đo lụa ~$193–323, giao quốc tế** (cập nhật thẻ COMP). JS validate OK, div/table cân, key sạch. Không commit/host.

## 2026-06-27 — China deck + đào sâu The Viet Concept / Tung Vu / Metiseko (Maddy)

- **Báo cáo HTML thị trường Trung Quốc** mới: `markets/trung-quoc.html` (cùng format deck gốc — nav, executive summary, insight 3-lớp, evidence card, biểu đồ SVG, nhãn proven/test/đừng-cam-kết). Nội dung từ `china-segment.md` + workflow 5 góc: phán quyết 3 mô hình (inbound 🟡 / xuyên-biên-giới 🔴 / Chi Pu 🟡), 新中式 không mở cửa áo dài, bẫy "Trung Hoa hoá", rủi ro "奥黛店", phép thử RedNote rẻ.
- **Pull SimilarWeb mới** (visits/geo/channels/referrals) cho `thevietconcept.com` (chưa có trước đó); xác nhận endpoint `popular-pages` + `organic-keywords` **bị KHOÁ (404)** ở gói hiện tại → subpage/keyword chỉ suy luận, ghi rõ. Không lộ key.
- **The Viet Concept** đưa vào báo cáo (client hỏi "sao không có"): sàn designer Việt tại Dubai, **~19% khách vùng Vịnh (Saudi 17,2%) — cao nhất nhóm**, lưu lượng 2,6K→**33K/tháng (5/2026)**, Tamara/Tabby, giao GCC 2–3 ngày. Xếp **tham chiếu + KÊNH** (sàn, không phải atelier). Cập nhật evidence card Trung Đông + INS #2.
- **Tung Vu** đào sâu: web **không phải động cơ** (~500 lượt/th, 100% Mỹ, 90% search branded); engine thật = **B2B sỉ vào boutique vùng Vịnh** (Alboushiya). INS #3 cập nhật (182→~500) + thẻ chi tiết.
- **Metiseko** thẻ tham chiếu: RTW lụa size cố định (không may đo, không áo dài), Pháp–Việt, ~11–18K giảm dần; bài học = kể chuyện chất liệu/bền vững.
- Thêm mục `C+ · Đối thủ / kênh bổ sung` + nav link. JS validate OK (cả 2 deck), div cân, key sạch. Không commit/host.

## 2026-06-26 — Chốt mô hình Maison (OQ-011) + tái khung đối thủ (Maddy)

- **Sự thật mới từ client:** Maison = làm **theo số đo, HAI lối** — (1) chọn mẫu độc bản của nhà mốt rồi chỉnh theo số đo, (2) khách thiết kế riêng từ đầu. Không phải thuần bespoke-từ-đầu (khác Meera), không phải RTW. Ghi `open-questions.md` **OQ-011 ✅ Resolved**; **OQ-009 → 🟡 Reframed** (lối mẫu-có-sẵn là *ứng viên* dòng ship-được, chỉ thành thật nếu catalog cố định/lặp-lại + có bộ công cụ mua-từ-xa kiểu LAHAVA).
- **Workflow tái khung** (9 agent: 4 lăng kính → adversarial verify từng cái → tổng hợp). **3/4 lăng kính bị verify bác phần overclaim** — chỉ áp bản đã hiệu chỉnh: KHÔNG nâng LAHAVA thành "đối thủ #1", KHÔNG re-rate China 🔴→🟡, KHÔNG coi catalog là "mở khoá cấu trúc". Lăng kính ngôn ngữ founder không bị bác.
- **Tái khung đối thủ (HTML + MD §76/§78):** **HAI đối thủ trực diện trên HAI trục** — LAHAVA trực diện ở lối-1 (mẫu-có-sẵn → số đo; nâng từ "tham chiếu phân phối", nhưng **khác tầng**: LAHAVA hàng loạt $365–560 vs Maison thủ công/độc bản → thắng bằng uy tín, không đua giá); Meera trực diện ở lối-2 (thiết kế từ đầu) + chia sẻ DNA thủ công-bespoke (KHÔNG hạ Meera xuống dưới LAHAVA). Thứ hạng **segment-contingent** vì phân khúc sản phẩm chưa chốt.
- **Ngôn ngữ founder (lỗi đã sửa):** exec summary HTML + MD §34 dùng "nhà thiết kế **may đo**" làm nhãn tự-mô-tả → đổi "nhà thiết kế / atelier làm theo số đo từng khách". "May đo" chỉ giữ làm thuật ngữ phân tích thị trường/đối thủ. "Bespoke" nay cũng là thuật ngữ **có phạm vi** — chỉ lối-2 (`positioning.md` cập nhật Core offer + scope note).
- Cập nhật Câu hỏi #1, bảng so sánh, readbox (mô hình đã chốt / phân khúc còn mở); `_pointer.md` (LAHAVA), `china-segment.md §2` (lối mẫu-có-sẵn là ứng viên ship, China/Gulf không đổi), MD §93 (LAHAVA = sàn lối-1, giả thuyết định giá). JS validate OK, key sạch, không commit/host.

## 2026-06-26 — Brief Trung Quốc + sửa báo cáo theo phân khúc (Maddy)

- Thêm `markets/china-segment.md`: kết luận tệp khách Trung Quốc qua workflow 5 góc + kiểm nguồn. **Có tiềm năng nhưng qua kênh INBOUND (khách đến VN trải nghiệm), không qua bán xuyên biên giới.** (a) inbound 🟡 nên thử (cửa hẹp); (b) RedNote/Tmall 🔴 đừng cam kết (cần SKU giao được — OQ-009); (c) đòn bẩy Chi Pu 🟡 có điều kiện ("Chi Pu mặc Maison" CHƯA xác minh). Không tiền lệ premium VN→TQ; rủi ro "奥黛店 nightlife" + 新中式 hướng nội + bẫy "Trung Hoa hoá áo dài". Kèm phép thử rẻ (3–5 bài RedNote 高定/设计师).
- Đào thêm (gộp workflow): Tung Vu = prêt-à-couture theo size (KHÔNG bespoke thuần), bán sỉ Alboushiya Abu Dhabi cạnh Zuhair Murad/Hobeika, modest-glamour cho Gulf, không áo dài; The Viet Concept = sàn curated đưa NTK Việt vào GCC (made-to-measure không đổi trả); Metiseko = métissage **Pháp–Việt KHÔNG phải Nhật**, RTW lụa/khăn, không áo dài/bespoke; danh sách đầm dạ tiệc VN chia 3 phân khúc để pull SimilarWeb.
- Sửa `bao-cao-tong-hop.html` (local, chưa commit/host): khung Meera = trùng **MÔ HÌNH + chỉ phân khúc cưới châu Âu, KHÔNG đa dòng** (executive summary + mục E + bảng + readbox); thêm caption đọc-đúng-phân-khúc; **bỏ box "Đính chính & độ tin cậy"** (giữ caveat ở method footer); link Nhật/Hàn + giải thích vì sao chỉ Forest For The Trees có web (KiTO qua bài bên thứ ba, Usagi không có web); bỏ Truvelle khỏi ma trận; thêm **ma trận 2×2 mới** (độ thuần áo dài × bespoke), Maison ở góc "thuần áo dài + bespoke" trống; thêm **câu hỏi mở #1: product/service Maison chưa định nghĩa**.
- Sửa `vietnam-fashion-landscape.html` (deck industry-general, Maison-free): Meera = wedding-bespoke châu Âu (không áo dài) ở các insight + bảng + COMP; bổ sung bằng chứng Tung Vu × Alboushiya Gulf.
- Ràng buộc giữ nguyên: KHÔNG commit/host trừ khi được yêu cầu; không lộ API key (đã grep sạch); JS validate `node --check` OK.

## 2026-06-22 — SOP tạo báo cáo/deliverable (Maddy)

- Thêm `meta/report-sop.md`: đóng khung 10+ vòng phản hồi thành tiêu chuẩn cho mọi báo cáo — insight-first (3 lớp dữ liệu/phân tích/ý nghĩa), mọi claim có nguồn bấm-được (tránh báo chí/CAGR), ngôn ngữ tiếng Việt rõ ràng câu tròn ý (không jargon/ẩn dụ), nhiều visual + chart diễn giải đúng, cấu trúc tổng→cụ thể, brand-language founder, cơ chế giao hàng (HTML + git + GitHub Pages, không lộ secret). Có checklist trước khi gửi.
- Đã lưu memory tương ứng để tự áp dụng cross-session.

## 2026-06-22 — Báo cáo v5: cầu thật từ Reddit, biểu đồ tương tác, breakdown từng đối thủ (Maddy)

- Theo phản hồi chi tiết: xuống dòng nhiều hơn; **bỏ số liệu báo cáo ngành/báo chí** (CAGR, VnExpress) → thay bằng (a) **chart nguồn khách** đến VN, (b) **tín hiệu cầu thật từ Reddit/forum** (quote + link, đặc biệt nỗi đau Việt kiều: giá Mỹ $170–400, nhờ người nhà mua hộ).
- Bỏ Công Trí / Phan Huy / chữ "couture" khỏi phần bối cảnh; tập trung **đối thủ áo dài có khách Mỹ/Úc** với **breakdown geo đầy đủ từng brand (gồm % Trung Đông)** + nước của brand (East Meets Dress = Mỹ, không phải VN).
- **Ma trận + brand clickable** (mở website); **chart tổng kết thị trường nào đông/bỏ trống** (outlier: Trung Đông ngầm; Nhật/Hàn vắng mặt online); **highlight ngách sườn xám**.
- Insight rút gọn còn 4 (dựa lưu lượng/site, không báo chí); **evidence card Trung Đông** (banner HUONG + Modest Edit). **Đối thủ trực diện = Meera Meera** + **bảng so sánh** Maison/Meera/Tung Vu (bỏ LAHAVA, bỏ Phan Huy). Thêm **mục câu hỏi mở + hướng pivot** để gửi nhóm.

## 2026-06-22 — Báo cáo stakeholder: tái cấu trúc + ma trận định vị (Maddy)

- Theo phản hồi (gửi stakeholder): bỏ từ casual ("không nói suông") → nêu nguồn chuyên nghiệp; mỗi insight có Dữ liệu → Phân tích → box "ý nghĩa"; thêm bối cảnh ngành/du lịch/fashion mở đầu; bản đồ định vị đổi sang **ma trận 2×2** (giá × may sẵn↔bespoke), Maison đặt ở ô mục tiêu (không để đáy=0); thêm bảng **từ khoá đối thủ** + giải thích cheongsam.
- **Đính chính factual:** brand ra mắt Paris Haute Couture là **Phan Huy** (không phải Tung Vu); khách thuê áo dài chụp ảnh chủ yếu Nhật/Sing/Phil/Hàn/Tây (không phải TQ); traffic brand may sẵn = Việt kiều.
- **Đối thủ trực diện** xác định lại = **Meera Meera** (bespoke couture, từ chối thuê/may sẵn) — LAHAVA hạ xuống "tham chiếu chiến thuật phân phối" (mass made-to-measure, khác mô hình).
- Dữ liệu từ 14 brand mới + workflow 5 agent (Tung Vu/Meera, service offering Trung Đông + The Viet Concept, bản đồ từ khoá, bối cảnh ngành, cầu thuê/may sẵn).

## 2026-06-21 — Báo cáo dựng lại theo hướng INSIGHT-FIRST (Maddy)

- Theo phản hồi: báo cáo cũ nặng đề xuất, nhiều claim không nguồn, ẩn dụ khó hiểu ("con voi Hội An"). Dựng lại `bao-cao-tong-hop.md` + `.html` thành **9 phát hiện bất ngờ, mỗi cái có nguồn dẫn link**; đề xuất gói gọn thành mục phụ; tiếng Việt phẳng.
- Thêm 2 cụm brand mới (14 brand: HUONG/kisserine/meanblvd/metiseko... và Tungvu/meerameera/truvelle/lililala/serenehill/lafee...) — đã pull SimilarWeb thật.
- Phát hiện đắt: tầng đồ may sẵn dễ tiếp cận lớn gấp 10–50 lần couture (meanblvd 106K vs Tungvu 182 dù lên Paris); vùng Vịnh là cầu thật (meanblvd ship Saudi/UAE + Modest Edit); thuế nhập >50% là vũ khí của nhà may đo tại VN; "khe trống giá" chỉ là giả thuyết (giá couture không công khai).
- Quy trình: 5 agent khai thác → 1 agent kiểm nguồn (loại "Nicole 72% AI" + claim không nguồn) → 1 agent xếp hạng. Thêm **bản đồ định vị** (giá × tăng trưởng × lưu lượng × cụm) làm hình chủ đạo.

## 2026-06-21 — Full aggregated report + action plan (Maddy)

- Added `markets/bao-cao-tong-hop.md` (+ `.html` showcase) — the canonical full report aggregating all research (context, demand, competitors) plus an action plan: target customer groups, markets, positioning, Phase-1 roadmap, KPIs, what-not-to-do, founder questions. Clean Vietnamese, minimal English code-switching (per Maddy feedback).
- Action plan built via a strategy panel (4 proposals × distinct lenses → 3 judges → 1 adversarial critic). Key corrections folded in: "wedding áo dài abroad" downgraded from "proven" to "strongest hypothesis"; added the overlooked **Việt-kiều-returning-home** segment; surfaced operations/trust/lead-time/platform gaps + 5 foundational founder questions.
- Removed standalone `competitor-deepdive.html` (folded into the full report).

## 2026-06-21 — Competitor deep-dive + HTML showcase (Maddy)

- Added `markets/competitor-deepdive.html` — interactive showcase (traffic 12-mo trajectory, geo/channel mix, keywords, notable subpages, product segments, growth drivers) for 8 search competitors.
- Topped up SimilarWeb `social` + `referrals` for the relevant set. Found: AI engines (ChatGPT/Perplexity/Gemini) now major referrers (Nicole ~72%); rising LAHAVA +246% / bebetailor +204% / Nicole +161% vs declining Linh Nga −42%.
- **Swimwear descoped** from `broad-market-research.md` (not relevant in this segment); shippable-line candidate reframed to designer RTW (fit-giữa, La Lune/Fancì). OQ-010 updated.

## 2026-06-21 — Broad market research delivered (Maddy)

- Added `markets/broad-market-research.md` — multi-line (de-biased from áo dài) competitor + demand + inbound-tourism research, Vietnamese.
- Data: SimilarWeb API pulls (visits/geo/channels for 10 competitors) cached to `markets/data_logs/` (no API key in repo) + 5-agent web research + adversarial verify pass.
- Key findings: two separate demand systems (inbound-tailor vs cross-border-ship); bespoke↔shippable trade-off; only proven foreign money = US/AU diaspora bridal; China/India = high arrivals but premium purchase unproven; LAHAVA = watch-competitor; "đồ tiệc"/evening = white-space upsell not a search channel; swimwear = the shippable candidate.
- Updated `markets/_pointer.md` (headline read + link). Added **OQ-010** (second shippable RTW/resort capsule decision).

## 2026-06-21 — Founder signals synthesis (Maddy)

- Added `client-context/founder-signals.md`: reads the founders' intent from the WhatsApp chat (5/16–6/12) across **brand positioning, brand personality/voice, and how to work with the founders** — captures the boundaries (no "high end", "we are not tailor", not "shopping haul") and a quick do/don't table. Companion to `stakeholders.md` / `positioning.md` / `brand.md`.

## 2026-06-21 — Research direction reframe (Maddy)

- `timeline.md`: research delivery slipped to T5 (Thursday) due to pending finance/legal; market-entry thesis reframed.
- `markets/_pointer.md`: added **Working thesis** — inbound tourism + accessible/shippable "fit giữa" line; flagged positioning-vs-commercial tension; listed the two in-progress outputs.
- `open-questions.md`: added **OQ-008** (founder brand references + long-term direction) and **OQ-009** (accessible/shippable non-bespoke line); founder-input blocker note.
- `decisions.md`: session-log entry; no MD-xxx (working hypothesis, not a binding decision).

## 2026-06-21 — Client context from WhatsApp chat

- Analyzed full project WhatsApp chat (5/16–6/18) and rewrote `client-context/stakeholders.md` from observed behavior.
- Correction: Chi is digitally engaged and opinionated (drives keyword/brand decisions); Michelle is coordinator/approver; added Phan Hà (MD in-house writer).
- Added Chi's brand-language rules to `client-context/positioning.md`; fixed "tailoring" wording.
- Logged MD-025–030; resolved OQ-002 (domain maisondenude.com) + OQ-003 (blog language); added OQ-007.

## 2026-06-21 — Initialized

- Created `/context` master (shared truth) using `/context-init` adapted to a single-project, flat structure (no `products/` nesting).
- **Seeded:** `_index`, `_routing`, `vision`, `scope`, `decisions` (ported MD-001–021, added MD-022–024), `open-questions` (ported OQ-001–005, added OQ-006), `team`, `timeline`, `client-context/brand`, `client-context/positioning`, `client-context/stakeholders`.
- **Skeletons:** `client-context/personas`, `client-context/competitors`.
- **Pointer:** `markets/_pointer` (Playbook deferred until 3 markets confirmed).
- **Decisions:** master/personal split (MD-022), English-first internal + Vietnamese client deliverables (MD-023), team = Thiệu + Maddy (MD-024).
- **Pending:** enrich stakeholder profiles (Chi, Michelle) from chat history Thiệu will provide.
