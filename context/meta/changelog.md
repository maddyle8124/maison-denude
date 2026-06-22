# Master Context — Changelog

_Change log for the `/context` master repo. Newest first._

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
