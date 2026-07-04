# Báo cáo Master — Hiện diện số Maison Dénudé

_Master research report. Tổng hợp toàn bộ nghiên cứu đối thủ + đào sâu Công Trí/Phan Huy + đo keyword đa quốc gia. Nguồn: SimilarWeb (MCP) + đọc web trực tiếp, workflow 35 agent đã kiểm chứng đối kháng. Kỳ dữ liệu 12/2025–05/2026 (keyword 03–05/2026). Ngày: 03/07/2026._
_Bản trình bày (deck): [`dao-sau-congtri-phanhuy.html`](./dao-sau-congtri-phanhuy.html) + [`playbook-hien-dien-so.html`](./playbook-hien-dien-so.html). Raw: [`data_logs/deep-dive-designers_2026-07.json`](./data_logs/deep-dive-designers_2026-07.json)._

**Quy ước độ tin:** ✅ Đã chứng minh (có số) · 🟡 Giả thuyết / nên thử · 🔴 Không đủ bằng chứng / đừng cam kết.

---

## 1 · Executive Summary

| Phát hiện | Bằng chứng (nguồn) | Ý nghĩa cho Maison | Độ tin |
|---|---|---|---|
| Cầu tìm kiếm cho "áo dài cao cấp/bespoke" tiếng Anh **≈ 0 ở mọi nước** | keyword-overview: custom/bespoke/luxury/evening/beaded ao dai + hand-embroidered silk gown = 0 (US/AU/CA/VN/WW) | ĐỪNG đổ SEO/ads vào cụm này | ✅ |
| Cầu thật nằm ở **occasionwear chung** | "wedding guest dress" US **83.255**/WW 147.576; "gala dress"; "silk gown" (đều giao dịch) | Đây là cửa lớn nhất — cần trang đầm dạ tiệc/khách mời | ✅ |
| **"modern ao dai"** là từ áo dài EN duy nhất có cầu giao dịch + dễ | US 868 / WW 1.154 / AU 350, độ khó 6 | Từ SEO chủ lực cho dòng áo dài hiện đại | ✅ |
| Nội địa: **"áo dài cưới"** cầu giao dịch rõ nhất | VN 1.863, độ khó 2 | Trang áo dài cưới tiếng Việt = nền tảng SEO nội địa | ✅ |
| Công Trí & Phan Huy **đều có bespoke thật + dòng RTW** | Đọc web: Công Trí couture+RTW+MTO; Phan Huy couture+bespoke+RTW | Bespoke/RTW là hai luồng — nên tách trên web | ✅ |
| Cả hai xây niềm tin bằng **celebrity + press + bộ sưu tập** | Công Trí: NEWS sao, Awards; Phan Huy: Celebrities, About | Maison cần trang "Sao mặc / Báo chí / BST" | ✅ |
| **Trang bộ sưu tập là động cơ traffic**, không phải trang chủ | folder /collection: Công Trí 28,6%, Sau Lee 46%, Qipology **61%** | Đầu tư trang BST như tài sản SEO chính | ✅ |
| Giả thuyết "designer hút khách Á (TQ/Hàn/Nhật/Sing/HK) hơn mass" | geo 12 brand: SG/HK chỉ cao ở nhà gốc HK/Đài; Hàn/Nhật vắng mặt | **Bác bỏ** — đó là hiệu ứng sân nhà, không phải tầng designer | 🔴 |
| "vietnamese dress designers/designer dress" = intent **thông tin** | keyword-overview top_intent = informational | Dùng cho blog/editorial, KHÔNG phải trang bán | ✅ |
| Pinterest nghiêng nhẹ về NTK Việt "liên hệ giá" nhưng không sạch | 3/4 NTK Việt có link; nhưng Phan Huy + Guo Pei (couture) không có; Sau Lee Pinterest = 36% social | Nên **thử** Pinterest, chưa thể coi là quy luật | 🟡 |
| Phụ kiện dự tiệc (clutch/bag) có cầu nhưng cạnh tranh tối đa + Maison không bán | "evening bag" US ~1.000, "bridal clutch" ~795, competition 100 | Adjacency chỉ là **thử awareness**, không phải kênh convert | 🟡 |

**Thị trường ưu tiên:** Tier 1 = **Việt Kiều Mỹ/Úc/Canada + nội địa VN**. Tier "thử" = Hoa kiều (RedNote). Chưa đủ bằng chứng = Sing/HK/Hàn/Nhật.
**Kênh ưu tiên:** SEO (trang BST + sản phẩm) + press/backlink (chậm) song song social/Pinterest (nhanh thấy hơn).
**Web cần build trước:** tách Bespoke/RTW · trang Sao-mặc/Báo-chí · trang BST · trang áo dài cưới + đầm dạ tiệc.
**Bài học Công Trí/Phan Huy/Qipology:** celebrity→trust; tách luồng bespoke vs RTW; press page + gallery khách.
**Điểm còn thiếu data:** traffic/geo/kênh của NTK Việt phần lớn bị gated; SG/KR/HK/CN keyword = 0/không hỗ trợ; % trang custom-made của Qipology không đo được.

---

## 2 · Phạm vi nghiên cứu & giới hạn dữ liệu

| Dataset / Report | Metric | Scope | Nước | Giới hạn |
|---|---|---|---|---|
| Keyword (deck này) | Search volume/tháng | **Đa quốc gia** | US/AU/CA/VN/WW (+SG/CN/KR/JP/HK thử) | SG/KR/HK trả 0 (có thể thiếu-data); CN endpoint không hỗ trợ |
| Full brand scan | Website visits | **Toàn cầu (all countries)** | `world` | Là tổng toàn cầu; geo % là split bên trong |
| Đối thủ pilot | visits/geo/kênh | Toàn cầu | world | Kênh cần cửa sổ 12 tháng; site nhỏ bị gated |
| Deep-dive (này) | subpage %/demographics/social | Toàn cầu | world | NTK Việt phần lớn gated (dưới ngưỡng SimilarWeb) |

**Làm rõ (trả lời câu hỏi):** (a) **Traffic/visits = toàn cầu tất-cả-nước**, không phải 1 nước. (b) **Keyword volume trước đây là US-only; nay đã đo đa quốc gia.** (c) Không trộn "website visits" với "keyword search volume" — hai metric khác nhau.
**Giới hạn lớn (không suy diễn như chắc chắn):** Công Trí/Thuỷ/Phương My — mọi metric traffic bị gated. **Huy Võ dưới ngưỡng SimilarWeb** → không đo được traffic/keyword (chỉ đọc web được). Geo NTK Việt đều thiếu → **không so được geo VN-designer vs VN-mass**. Split social chỉ có ở Sau Lee. Demographics chỉ có Sau Lee.

### 2.1 Phương pháp — mỗi phát hiện đến từ tool nào + độ phủ (minh bạch)

Mỗi con số trong báo cáo này truy được về đúng 1 endpoint. Cột "Độ phủ" cho biết brand nào **có data** vs **gated (dưới ngưỡng → trả 404, KHÔNG bịa)**.

| Phát hiện | Tool / endpoint | Tool trả về gì | Độ phủ (ai có data / ai gated) |
|---|---|---|---|
| Lưu lượng website | `get-websites-traffic-and-engagement` | Tổng lượt truy cập toàn cầu/tháng | Hầu hết brand ✅; maisondenude (site mới) + huy-vo (nhỏ) = no data |
| % theo quốc gia | `get-websites-geography-agg` | Share + visits theo nước | Brand foreign lớn ✅; **NTK Việt phần lớn gated** |
| Kênh (organic/direct/social/paid %) | `get-websites-traffic-channels` (**cửa sổ 12 tháng**) | Visits theo kênh | Phan Huy, Xéo Xọ + foreign lớn ✅; **Công Trí 404** |
| Từ khoá + % branded/non-branded | `get-website-analysis-keywords-agg` | Từ khoá organic + clicks/share | Brand có organic search ✅ |
| Volume + độ khó + intent từ khoá | `get-keywords-overview` | Volume/difficulty/competition/intent **theo nước** | Đo theo TỪ KHOÁ (không theo brand); CN không hỗ trợ, SG/KR/HK trả 0 |
| **% traffic từng subpage** | `get-pages-popular-pages-agg` | Share traffic theo URL/folder | Brand trên ngưỡng ✅ (Công Trí CÓ subpage %); Thuỷ/Phương My gated |
| **Audience-interests (adjacency — "khách còn ghé web nào")** | `get-websites-audience-interests-agg` | Các website tệp khách hay ghé (affinity) | **CHỈ brand quốc tế lớn** (Sau Lee, Sabyasachi, Elie Saab, Galia Lahav, Monique). **TẤT CẢ brand VN đã test 03/07 = 404** (Công Trí, Phan Huy, Huy Võ, Thuỷ, Phương My, Xéo Xọ, Hà Cúc) |
| Tuổi/giới | `get-websites-demographics` | Age/gender | **Chỉ Sau Lee** |
| Cấu trúc web / offering / giá / social link | **WebFetch (đọc web trực tiếp)** | Sitemap, hero, giá, RTW-vs-bespoke, link social | **Tất cả brand** (không phụ thuộc ngưỡng SimilarWeb) |

**Hệ quả minh bạch quan trọng:** phần **adjacency / "khách còn quan tâm gì"** (mục 18.5) **KHÔNG đo được cho bất kỳ brand Việt nào** — nó được rút từ **brand quốc tế lớn** (Sau Lee, Sabyasachi…) rồi *suy luận* cho Maison. Vì vậy kết luận adjacency là **tham chiếu quốc tế + giả thuyết cho Maison**, không phải đo trực tiếp trên tệp khách NTK Việt.

---

## 3 · Deep-dive: Công Trí

### 3.1 Funnel awareness → trust → inquiry
- **Biết đến từ đâu:** không đo được kênh (gated). Keyword cho thấy phần lớn **branded** (tìm thẳng "cong tri") → danh tiếng runway/celebrity đẩy tìm-kiếm-tên.
- **Trust signal trên web:** trang NEWS "sao mặc Công Trí" (Michelle Obama, Beyoncé, Rihanna, BLACKPINK, Zhang Ziyi), Awards, ATELIER/tiểu sử NTK, thành viên Asian Couture Federation.
- **Dẫn tới inquiry:** cả RTW lẫn MTO đều route qua **"REQUEST AN APPOINTMENT"** (không giỏ hàng công khai giá).

### 3.2 Sitemap / cấu trúc (subpage %)
| Trang | % traffic | Vai trò | Maison học? |
|---|---|---|---|
| /collection/spring-summer-2026 | **17,1%** | Bộ sưu tập (trang #1 sau home) | ✅ trang BST = "cửa hàng" |
| homepage | 11,4% | — | — |
| /vi/shop | 8,6% | Shop | ✅ |
| Cụm **/collection** | **28,6%** | Động cơ traffic | ✅ đầu tư SEO trang BST |
| ATELIER · NEWS(celeb) · Awards · Store Locator | (gated) | Trust | ✅ trang sao-mặc + tiểu sử |

### 3.3 Keyword breakdown
~75% **branded** (tên nhà mốt) · non-branded gồm **tên sản phẩm tiếng Anh** (poplin shirt dress, taffeta shorts, blazer with train) + "hot fashion designers saigon" (AU 338). → được khám phá qua **tên riêng + tên sản phẩm mô tả**, gần như không có từ ngành generic.

### 3.4 Offering
Couture + RTW theo mùa + **Made-to-Order ("create your own Công Trí piece" — chỉnh mẫu nhà mốt)**. **Toàn bộ "liên hệ để biết giá"**, đặt lịch hẹn. → CÓ luồng đặt-may thật (không chỉ RTW), nhưng đóng khung là "personalization" chứ không phải "thiết kế độc bản từ đầu".

---

## 4 · Deep-dive: Phan Huy

### 4.1 Funnel
- **Kênh (ĐO ĐƯỢC):** Organic Search **57,9%** · Direct 32,3% · Social 6,5% (Organic 4,4 + Paid 2,1) · Referrals 3,3% · **Paid Search 0** → thắng bằng SEO organic, không mua ads.
- **Trust:** trang Celebrities (Miss Universe Theilvig/Tunzi, Zhao Lusi, Yang Mi, Hồ Ngọc Hà, Jhené Aiko, Lele Pons), About (Steven Doan + Phan Huy), ra mắt **Paris Haute Couture Week**.

### 4.2 Sitemap (subpage %)
| Trang | % traffic |
|---|---|
| homepage | 41,6% |
| /product-category/all | **15,7%** |
| /about-us | 4,7% |
| /fall-winter-2026-show | 4,0% |
| Cụm /product-category | 22,6% |

### 4.3 Keyword breakdown
~90% **branded** ("phan huy"). Non-branded quý giá: **"vietnamese dress designers"** (227 clicks) + "vietnamese designer dress" — nhưng intent **thông tin**. → sống bằng tên + cụm nhận-diện-NTK.

### 4.4 Offering — ĐÍNH CHÍNH
"Maison de Couture": **haute couture + bespoke ("made exclusively for you")** + **dòng RTW (Collections + Shop)**. **ĐÍNH CHÍNH:** dòng Shop/RTW **CÓ niêm yết giá công khai** (~$2.277–2.648, theo ảnh trang Shop) — báo cáo trước ghi "không hiện giá" là **sai**. Đúng là **hỗn hợp giống Qipology**: RTW công khai giá + Couture/Made-to-Order → "Contact"/hẹn.

---

## 5 · So sánh Công Trí vs Phan Huy

| Tiêu chí | Công Trí | Phan Huy | Ý nghĩa Maison |
|---|---|---|---|
| Traffic | gated (site nhỏ) | ~home 41,6% (partial) | Cả hai chưa phải sàn lớn |
| Nguồn keyword | ~75% branded | ~90% branded | Danh tiếng đẩy tìm-tên; ít cầu ngành |
| Product/category search | tên sản phẩm EN | product-category | Maison đặt tên sản phẩm EN mô tả |
| Trust assets | Sao quốc tế top + Awards + Atelier | Miss Universe + Paris HC + About | Cần trang sao-mặc + tiểu sử NTK |
| Cấu trúc RTW vs bespoke | có cả hai, khung "personalization" | tách rõ hơn (Couture/Collections/Shop) | Học Phan Huy: tách luồng |
| Giá | Liên hệ toàn bộ | **RTW công khai + couture hẹn** | Học Phan Huy: RTW công khai giá |
| Kênh | gated | Organic 58% (SEO-led) | SEO organic khả thi |
| Maison học gì | celebrity làm bậc thang niềm tin | tách Couture vs RTW + SEO organic | — |
| KHÔNG nên copy | giá "liên hệ toàn bộ" (cản chuyển đổi RTW) | — | RTW nên công khai giá |

**Gap cả hai còn để mở:** không ai làm rõ **luồng "thiết kế độc bản từ đầu"** bằng một trang riêng có process/CTA → Maison có thể thắng bằng trang bespoke minh bạch (Qipology làm tốt hơn cả hai).

---

## 6 · Ready-to-wear vs Bespoke / Custom-made

### 6.1 Offering đối thủ
| Brand | RTW | Bespoke/MTO | Tách trang riêng? | Giá | Nguồn |
|---|---|---|---|---|---|
| Công Trí | ✅ | ✅ (personalization) | Không rõ (chung "appointment") | Liên hệ | web |
| Phan Huy | ✅ (giá công khai) | ✅ (couture) | **Có** (Couture/Collections) | Hỗn hợp | web+ảnh |
| **Qipology** | ✅ ($890–13.800) | ✅ Bespoke Bridal Qipao | **Rất rõ** (trang /custom-made riêng) | RTW công khai; bespoke hẹn | web |
| Shanghai Tang | ✅ (giá công khai) | ✅ "Imperial Tailoring Atelier" | **Có** (atelier riêng) | RTW công khai; bespoke hẹn | web |
| Huy Võ | ✅ (size chart, giá công khai) | ❌ (nút "Customize" chưa rõ) | Không | Công khai (10,8–36,8tr) | web |
| Sau Lee / Yi-ming / Shiatzy | ✅ | ❌ | — | Công khai | web |
| Guo Pei | ❌ | ✅ couture-only | — | Hẹn | web |

### 6.2 Qipology — hình mẫu cấu trúc
Tách **RTW (giá công khai) vs Bespoke Bridal Qipao (hẹn)**, có trang Press (Vogue HK, SCMP), gallery "Our Brides & Grooms", blog "qipao vs cheongsam" (3% traffic). Folder /collections = **61%** traffic, /pages 12,2%. **🔴 % riêng trang `/custom-made` KHÔNG đo được** (endpoint kênh/trang chi tiết bị gated) — không có proxy đáng tin; chỉ biết cụm /pages (chứa custom-made) = 12,2%.

### 6.3 Áp vào persona Maison
| Persona | Intent | Luồng | Landing | CTA |
|---|---|---|---|---|
| P1 Cô dâu | Cưới, high-touch | Bespoke | Áo dài cưới / Đặt lịch tư vấn | Book consultation |
| P2 Event Connoisseur | Gala/sự kiện | Bespoke/eventwear | Đầm dạ tiệc / Private appointment | Request consultation |
| P3 Artistic | Bản sắc/craft | Bespoke | Craftsmanship / Atelier | Talk to atelier |
| P4 Conscious Muse | Duyệt sản phẩm | **RTW** | Sản phẩm / Bộ sưu tập (giá công khai) | Xem / mua |

---

## 7 · Keyword gap — validate lại

### 7.1 Scope (đa quốc gia)
| Từ khoá | US | WW | VN | Intent | Ghi chú |
|---|---|---|---|---|---|
| wedding guest dress | **83.255** | 147.576 | 0 | giao dịch | độ khó 5 (dễ đáng ngạc nhiên nhưng cạnh tranh 100) |
| gala dress | 953 | 5.853 | 0 | giao dịch | — |
| silk gown | 207 | 4.398 | 0 | giao dịch | — |
| modern ao dai | 868 | 1.154 | 0 | giao dịch | độ khó 6 — **tốt nhất cho áo dài EN** |
| vietnamese wedding dress | 1.075 | 1.958 | 0 | thông tin | CA 396, AU 96 |
| vietnamese designer dress | 527 | 527 | 0 | thông tin | độ khó 13 |
| vietnamese dress designers | 0 | 803 | 0 | thông tin | độ khó 14 |
| ao dai wedding dress | 268 | 268 | 0 | thông tin | — |
| áo dài cưới (VN) | — | — | **1.863** | giao dịch | độ khó 2 |
| custom/bespoke/luxury/evening/beaded ao dai · hand-embroidered silk gown · VN long-tail | **0** | **0** | **0** | — | 🔴 không cầu ở đâu cả |

### 7.2 "ao dai wedding dress" — gap thật không?
- **Kết luận:** KHÔNG phải white space thuần. Cầu EN chỉ 268 & intent **thông tin**. Ở tầng mass/diaspora **LAHAVA đã giữ "vietnamese wedding dress" (~30%)** (báo cáo cũ). → gap không nằm ở SEO tiếng-Anh-áo-dài; nằm ở **positioning** (thuần áo dài designer) chứ không phải volume tìm kiếm. Maison rank được bằng **product/collection page + editorial**, không phải kỳ vọng volume lớn.

### 7.3 "vietnamese dress designers" — intent gì?
Intent = **thông tin/research** (tìm hiểu, không mua). Người tìm muốn *biết về NTK Việt* → hợp **blog/editorial + trang tiểu sử NTK + BST**, KHÔNG phải trang bán trực tiếp.

### 7.4 Product-page long-tail — validate
Nhóm "hand-embroidered silk gown / beaded evening áo dài / custom silk áo dài…" **= 0 volume** → **không nên** làm mục tiêu SEO chính. Tactic "mỗi mẫu 1 trang tên EN" (học Công Trí) vẫn đúng về **cấu trúc** (bắt long-tail lặt vặt + landing cho ads), nhưng đừng kỳ vọng các cụm bespoke này có người tìm. Ưu tiên tên gắn occasion có cầu ("silk evening gown", "áo dài wedding").

### 7.5 Map keyword → trang/kênh
| Từ khoá | Intent | Trang | Kênh |
|---|---|---|---|
| wedding guest dress · gala dress · silk gown | giao dịch | Đầm dạ tiệc / occasion | SEO + Ads (có landing) |
| modern ao dai | giao dịch | Áo dài hiện đại | SEO chính |
| áo dài cưới | giao dịch | Áo dài cưới (VN) | SEO nội địa |
| vietnamese wedding dress / designer dress / dress designers | thông tin | Blog/editorial + tiểu sử NTK | SEO/nội dung (nuôi awareness) |
| custom/bespoke ao dai… | (0 cầu) | — | Bỏ |

---

## 8 · Mass brand vs Designer brand

### 8.1 Bảng segment
| Brand | Segment | Nước top | Kênh chính | Pinterest | Offering |
|---|---|---|---|---|---|
| Xéo Xọ | VN mass | (gated) | Organic 59,5% / Direct 31% | Không | web skeleton (chưa cấu hình) |
| Hà Cúc | VN mass | (empty) | (gated) | Không | áo dài truyền thống + may-đo/thuê, liên hệ |
| Công Trí | VN designer | (gated) | (gated) | Có | couture+RTW+MTO, liên hệ |
| Phan Huy | VN designer | (gated) | Organic 58% | Không | couture+bespoke+RTW (giá công khai) |
| Huy Võ | VN designer | (dưới ngưỡng) | (dưới ngưỡng) | (unknown) | RTW size-chart, giá công khai, +bags/shoes |
| Sau Lee | HK RTW | US 45/UK 11/CA 9 | Organic 38,6 / PaidSearch 25,3 | (link no; social 36%) | RTW cheongsam, $475–895 |
| Shanghai Tang | HK | SG 21,5/US 16 | Organic 51 / PaidSearch 16,5 | Không | RTW + bespoke atelier |
| Qipology | HK | US 30/CA 16/SG 11/HK 9 | (gated) | Có + Xiaohongshu | RTW $890–13.800 + bespoke bridal |
| Shiatzy Chen | TW | US 53/TW 20 | Organic 56,6 / Mail 25 | Không | RTW cao cấp |
| Guo Pei | CN couture | US 59/UK 20 | OrganicSocial 49,7* | Không | couture-only |
| Yi-ming | HK mass | HK 47/US 42/SG 10 | (gated) | Không (có Xiaohongshu) | RTW qipao, giá công khai |

_*Guo Pei kênh chỉ 1 tháng (2026-05), mẫu nhỏ._

### 8.2 Giả thuyết "khách Á thích designer hơn mass" → 🔴 BÁC BỎ
- geo NTK Việt (designer) + mass VN đều **gated** → không so được trong nước.
- Ở nhóm foreign: **SG/HK cao chỉ ở nhà gốc HK/Đài** (Shanghai Tang SG 21,5%; Yi-ming HK 47%; Qipology SG 11/HK 9) = **hiệu ứng sân nhà**. **Hàn/Nhật vắng mặt** top-6 mọi brand. **Mỹ là top phổ quát.** → không có bằng chứng "designer hút Á hơn mass".

### 8.3 Ưu tiên thị trường
| Hạng | Thị trường | Bằng chứng | Hành động | Độ tin |
|---|---|---|---|---|
| Tier 1 | 🇻🇳 Việt Nam | "áo dài cưới" 1.863 giao dịch; ICP-first | SEO + web + social nội địa | ✅ |
| Tier 1 | 🇺🇸🇦🇺🇨🇦 Việt Kiều | Mỹ top mọi brand; "wedding guest dress" 83K; "modern ao dai" 868 | EN SEO + press + Pinterest | ✅ |
| Thử | Hoa kiều (RedNote) | cầu chưa đo (SG/HK/CN keyword=0) | test nội dung nhỏ | 🟡 |
| Chưa đủ | Sing/HK/Hàn/Nhật | sân nhà HK/Đài; keyword=0 | chưa pivot | 🔴 |

**Nhóm audience:** VN thu nhập cao · **Việt kiều (chính)** · Hoa kiều (thử) · cô dâu/khách sự kiện · phụ nữ mê thời trang · stylist/celeb (đòn bẩy trust).

---

## 9 · Channel analysis

### 9.1 Channel mix
- **Mass (Xéo Xọ):** Organic 59,5% / Direct 31% / Social 9,3% (Paid Social 5,8).
- **Designer đo được (Phan Huy):** Organic 58% / Direct 32% / Social 6,5% / Paid 0.
- **→ Ở cặp VN đo được, MASS có social cao hơn designer** (9,3% > 6,5%) — ngược giả thuyết "designer social nhiều hơn". Foreign: Sau Lee PaidSearch 25% (mua ads mạnh), Shanghai Tang PaidSearch 16,5%, Guo Pei OrganicSocial 49,7% (couture, mẫu nhỏ). **Không có quy luật designer>mass về social.** 🔴

### 9.2 Pinterest — validate
- **Có link:** Công Trí, Thuỷ, Phương My, Qipology · **Không:** Phan Huy, Xéo Xọ, Hà Cúc, Sau Lee, Shanghai Tang, Shiatzy, Guo Pei, Yi-ming.
- **Đo được traffic Pinterest chỉ ở Sau Lee: Pinterest = 36% social (IG 40%, Reddit 14%)** → chứng minh Pinterest CÓ THỂ là kênh social số 2 cho cheongsam bán online.
- **Đọc đúng:** Pinterest nghiêng nhẹ về NTK Việt "liên hệ giá" (3/4) so với mass (0/2), NHƯNG hai nhà couture (Phan Huy, Guo Pei) không có. Phân biệt: *có account* ≠ *có traffic từ Pinterest* ≠ *được user pin*. Không đo được traffic/giá theo Pinterest cho NTK Việt (gated). **Correlation ≠ causation.** 🟡
- **Ý nghĩa:** đáng **thử** Pinterest board (nội dung cảm hứng thời trang) — độ tin **Medium** (chỉ 1 brand có số traffic).

### 9.3 Xiaohongshu
Qipology + Yi-ming có Xiaohongshu (nhà HK). Không có data traffic. → chỉ đưa vào **experimental** cho tệp Hoa kiều/HK, test nội dung nhỏ trước. 🟡

---

## 10 · Website structure recommendation cho Maison

### 10.1 Sitemap đề xuất
Home · **Ready-to-wear** (giá công khai) · **Bespoke / May đo theo số đo** (process + đặt lịch) · Áo dài cưới · Đầm dạ tiệc/sự kiện (tách áo dài — MD-038) · Trang sản phẩm · Bộ sưu tập/Lookbook · **Sao & khách mặc Maison** · **Báo chí** · Craftsmanship/chất liệu · Câu chuyện NTK/atelier · Đặt lịch tư vấn · Journal/editorial (SEO).

### 10.2 Trang làm với Matthew
| Trang | Mục đích | SEO | Convert | Ưu tiên |
|---|---|---|---|---|
| Bespoke / May đo (process + CTA đặt lịch) | Bắt khách high-intent | TB | Cao | **P0** |
| Sao mặc / khách nổi bật | Trust | TB | Cao | **P0** |
| Trang sản phẩm (tên EN) | Long-tail + landing ads | Cao | TB | **P0** |
| Áo dài cưới + Đầm dạ tiệc | Bắt occasion intent | Cao | Cao | **P0** |
| Báo chí | Authority/backlink | TB | TB | P1 |
| Craftsmanship | Biện minh cao cấp | TB | TB | P1 |

### 10.3 Product-page SEO (naming logic)
Tên EN mô tả **chất liệu + kỹ thuật + dịp**, mỗi mẫu 1 trang, slug chứa keyword, meta title = danh mục + Maison, alt text tả vải/dáng/thêu/dịp. **Nhưng** nhắm cụm CÓ cầu:
| Concept | Title đề xuất | Slug | Keyword mục tiêu |
|---|---|---|---|
| Đầm lụa dự tiệc | Silk Evening Gown | /eveningwear/silk-evening-gown | silk gown (US 207/WW 4.398 ✅) |
| Áo dài hiện đại | Modern Áo Dài | /ao-dai/modern-ao-dai | modern ao dai (868 ✅) |
| Đầm khách mời cưới | Wedding Guest Dress | /eveningwear/wedding-guest-dress | wedding guest dress (83K ✅) |
| ~~hand-embroidered silk gown~~ | (bỏ — 0 cầu) | — | 🔴 |

---

## 11 · Ads / paid search — gồm KẾT QUẢ test adjacency

### 11.1 Nhóm keyword
- **High-intent (giao dịch, có cầu):** wedding guest dress, gala dress, silk gown, modern ao dai, áo dài cưới (VN).
- **Consideration (thông tin):** vietnamese designer dress, vietnamese dress designers → nội dung/SEO, không ads bán.
- **Zero (bỏ):** custom/bespoke/luxury/evening/beaded ao dai.

### 11.2 Test overlap sang phụ kiện (clutch/túi/giày) — ĐÃ ĐO
| Từ khoá | US volume | Intent | Cạnh tranh | Đọc |
|---|---|---|---|---|
| evening bag | ~1.000–1.196 | giao dịch | **100 (tối đa)** | có cầu, nhưng đấu với retailer lớn |
| bridal clutch | ~795 (đỉnh 4/2026) | giao dịch | **100** | có cầu, mùa vụ |

**Kết luận adjacency (thẳng thắn):**
- **LÀM ĐƯỢC (đo được):** xác nhận có cầu tìm phụ kiện dự tiệc (evening bag ~1K, bridal clutch ~795, giao dịch). Về mặt kỹ thuật, Google Ads **có thể** nhắm *audience* mua phụ kiện tiệc (Display/custom-intent) như một đòn **awareness**.
- **KHÔNG LÀM ĐƯỢC / KHÔNG NÊN:** (1) SimilarWeb **không đo được** liệu quảng cáo trên các từ này có "gợi ý được Maison trong hành trình" hay chuyển đổi — đó là câu hỏi ad-config/quality-score, không phải data đo được. (2) Cạnh tranh = **100 (tối đa)** → đắt. (3) **Maison không bán clutch/túi/giày** → bid từ "evening bag" đổ về trang không có sản phẩm khớp = relevance/quality-score kém, lãng phí. Huy Võ *có* bán bags/shoes nên với họ mới hợp; Maison chỉ nên cân nhắc **nếu thêm dòng phụ kiện**. → **🟡 chỉ nên thử ở dạng audience/awareness, KHÔNG phải kênh convert; không cam kết.**

### 11.3 Ad config đề xuất (khuyến nghị, không phải số đo)
Nhắm Mỹ/Úc/Canada, tiếng Anh; match phrase cho occasionwear; negative "cheap/rental/costume"; landing = trang đầm may đo (không đổ về home); objective awareness→inquiry.

### 11.4 Cảnh báo cho Maison
Kênh đối thủ mạnh ở organic/direct **không có nghĩa Maison bỏ ads/SEO**. SEO/press/backlink **cần thời gian** (kết quả chậm). Paid search chỉ hiệu quả nếu landing đúng intent. Social/Pinterest/XHS hợp discovery nhưng cần nội dung đều. **Website structure là nền để mọi kênh convert tốt hơn.**

---

## 12 · Trust-building & conversion

| Trust asset | Đặt ở đâu | Mục đích | Ưu tiên |
|---|---|---|---|
| Sao / khách nổi bật mặc Maison | Home + trang riêng | Social proof | **P0** |
| Quy trình bespoke (process + CTA) | Trang Bespoke | Giảm ma sát đặt may | **P0** |
| Báo chí | Trang Press | Authority | P1 |
| Craftsmanship/chất liệu | Trang sản phẩm + About | Biện minh giá cao cấp | P1 |
| Testimonial khách | Trang sản phẩm/bespoke | Chuyển đổi | P1 |
| Câu chuyện NTK/atelier | About | Nhân cách thương hiệu | P1 |

Trả lời câu hỏi lõi *"convert awareness → tin tưởng/đặt may như thế nào?"*: **dựng bậc thang celebrity → press → BST → trang bespoke minh bạch có CTA đặt lịch** — đúng cách Công Trí/Phan Huy/Qipology làm, nhưng minh bạch hơn về luồng đặt-may.

---

## 13 · Recommendation (đầy đủ format)

**R1 — Tách trang Bespoke/May-đo khỏi Ready-to-wear**
- What: 2 luồng web riêng; RTW giá công khai (P4) vs Bespoke process+đặt lịch (P1–P3).
- Why/Evidence: Qipology + Shanghai Tang tách rõ; Công Trí/Phan Huy chưa minh bạch luồng đặt-may. Persona Maison 4-tầng.
- How: trang Bespoke có process, chất liệu, past work, form inquiry, CTA "Đặt lịch tư vấn".
- Owner: Matthew + content Maison · Priority: **P0** · Confidence: **High** · Timeline: ngay–1 tháng · Caveat: validate năng lực nhận đơn bespoke trước khi hứa.

**R2 — Nhắm SEO vào occasionwear + modern ao dai + áo dài cưới (KHÔNG phải bespoke long-tail)**
- Why/Evidence: "wedding guest dress" US 83K, "modern ao dai" 868, "áo dài cưới" VN 1.863; nhóm bespoke EN = 0 cầu.
- Owner: Maddy + Matthew · Priority: **P0** · Confidence: **High** · Timeline: ngay–3 tháng · Caveat: occasionwear cạnh tranh cao → cần nội dung/landing tốt.

**R3 — Dựng trang Sao-mặc + Báo chí (trust)**
- Evidence: Công Trí/Phan Huy dùng celebrity/press làm bậc thang niềm tin; trang about/celeb hút traffic thật.
- Owner: Matthew + Hà · Priority: **P0** · Confidence: **High** · Timeline: ngay–1 tháng.

**R4 — Tập trung Việt Kiều Mỹ/Úc/Canada + nội địa VN; hoãn pivot Á-đông**
- Evidence: Mỹ top mọi brand; SG/HK = sân nhà HK/Đài; Hàn/Nhật vắng; keyword Á = 0.
- Owner: cả team · Priority: **P0** · Confidence: **High** (bác pivot Á) · Timeline: ngay.

**R5 — Thử Pinterest board + 1 KOL (không cam kết)**
- Evidence: Sau Lee Pinterest 36% social; nhưng chỉ 1 brand đo được.
- Owner: Hà + Maddy · Priority: **P1** · Confidence: **Medium** · Timeline: 1–3 tháng · Caveat: correlation yếu.

**R6 — RTW niêm yết giá công khai (như Phan Huy/Qipology/Sau Lee)**
- Evidence: các nhà bán online đều công khai giá RTW; "liên hệ toàn bộ" (Công Trí) cản chuyển đổi RTW.
- Owner: Maison + Matthew · Priority: **P1** · Confidence: **Medium** · Timeline: 1–3 tháng · Caveat: chỉ áp cho dòng RTW, giữ bespoke theo hẹn.

**R7 — Test ad adjacency phụ kiện = CHỈ khi có dòng phụ kiện**
- Evidence: evening bag ~1K/bridal clutch ~795 (giao dịch) nhưng cạnh tranh 100 + Maison không bán phụ kiện.
- Owner: Maddy · Priority: **P2** · Confidence: **Low** · Timeline: 3–6 tháng · Caveat: không phải kênh convert; chỉ awareness nếu thêm SKU phụ kiện.

---

## 14 · Deck outline (kể chuyện — không nhồi raw data)

1. **Vì sao research này** — Maison cần clarity: nước/kênh/keyword/web/trust.
2. **Đã phân tích gì** — mass vs designer vs high-end, Công Trí/Phan Huy/Qipology, keyword đa quốc gia, cấu trúc web.
3. **Insight 1** — cầu thật ở occasionwear + "modern ao dai" + "áo dài cưới"; nhóm áo-dài-bespoke-EN = 0 cầu.
4. **Insight 2** — Công Trí/Phan Huy build trust bằng celebrity/press/BST (có số subpage %).
5. **Insight 3** — RTW vs bespoke cần 2 luồng web (Qipology là hình mẫu).
6. **Insight 4 (đính chính)** — "designer hút Á hơn mass" bị bác; Mỹ + Việt Kiều + nội địa là cửa thật.
7. **Kênh** — SEO/press (chậm) + Pinterest/KOL (nhanh thấy hơn), chạy song song.
8. **Keyword** — nhóm theo intent; map vào trang.
9. **Web implementation** — Bespoke/RTW/Sao-mặc/Press/Sản-phẩm/Áo-dài-cưới/Đầm-dạ-tiệc.
10. **Ads** — chỉ chạy khi có landing đúng intent; adjacency phụ kiện chỉ thử awareness.
11. **Roadmap** — Ngay / 1–3 tháng / 3–6 tháng.
12. **Caveat** — giới hạn data, SEO chậm, correlation ≠ causation.

_(Deck HTML action-first đã dựng: `playbook-hien-dien-so.html`; deck insight: `dao-sau-congtri-phanhuy.html`.)_

---

## 15 · QA checklist (audit)

| Mục | Trạng thái | Còn thiếu gì |
|---|---|---|
| 15.1 Đọc + merge nguồn (bao-cao-tong-hop + brand scan + pilot + keyword gap + mass/designer) | **DONE** | — |
| Phân biệt data-backed / hypothesis / limitation | **DONE** | flags ✅🟡🔴 xuyên suốt |
| 15.2 Công Trí sitemap + top pages + trust + keyword + offering + implication | **DONE** | traffic/kênh gated (đã flag) |
| 15.3 Phan Huy cùng framework + compare | **DONE** | giá đã đính chính (RTW công khai) |
| 15.4 Qipology custom-made page + % traffic | **PARTIAL / NOT ENOUGH DATA** | % riêng /custom-made không đo được (gated); chỉ có /pages folder 12,2% |
| 15.5 Keyword scope + pivot markets + "ao dai wedding dress" + "vietnamese dress designers" intent + group + map | **DONE** | SG/KR/HK=0, CN không hỗ trợ (đã flag) |
| 15.6 Traffic scope (all vs country) | **DONE** | làm rõ: visits=toàn cầu; keyword=đa nước |
| 15.7 Mass vs designer + hypothesis Á + market priority + audience | **DONE** (hypothesis Á = 🔴 bác) | geo VN gated → không so nội địa |
| 15.8 Channel + Pinterest + Xiaohongshu | **PARTIAL** | social split chỉ có Sau Lee; Pinterest 🟡 medium |
| 15.9 Website structure + pages for Matthew + product SEO | **DONE** | — |
| 15.10 Ads + adjacency test + config | **DONE** | adjacency đo được volume; "surface Maison?" = NOT ENOUGH DATA (ad-config) |
| 15.11 Recommendation format (What/Why/Evidence/How/Owner/Priority/Confidence/Timeline/Caveat) | **DONE** | R1–R7 |
| 15.12 Deck readiness | **DONE** | 2 deck HTML + outline |
| Huy Võ | **PARTIAL / NOT ENOUGH DATA** | dưới ngưỡng SimilarWeb → không traffic/keyword; chỉ WebFetch offering (RTW size-chart) |

---

## 16 · 14 câu hỏi lõi — trả lời

1. **Keyword volume là gì?** Trước US-only; **nay đa quốc gia** (US/AU/CA/VN/WW; SG/CN/KR/JP/HK thử → phần lớn 0/không hỗ trợ).
2. **Traffic từng report là gì?** **Toàn cầu, tất-cả-nước** (`world`); geo % là split bên trong.
3. **Công Trí/Phan Huy có bespoke thật?** **Có** — cả hai có bespoke/made-to-order + dòng RTW; đều có luồng hẹn. Không phải RTW-only.
4. **"ao dai wedding dress" gap thật?** Không phải white space (EN 268, thông tin; mass/LAHAVA đã giữ "vietnamese wedding dress"). Gap là **positioning**, không phải volume.
5. **"vietnamese dress designers" intent?** **Thông tin/research** — không phải mua/đặt.
6. **Qipology custom-made % traffic?** **Không đo được** (gated); cụm /pages = 12,2%. NOT ENOUGH DATA.
7. **Designer dùng Pinterest nhiều hơn mass?** Nghiêng nhẹ (3/4 NTK Việt vs 0/2 mass) nhưng **không sạch** (2 couture không có). 🟡
8. **Brand có Pinterest thì traffic tốt hơn?** **Không kiểm được** (traffic Pinterest chỉ đo được ở Sau Lee = 36% social). Correlation yếu.
9. **CN/KR/JP/SG/HK đủ signal pivot?** **Không** — sân nhà HK/Đài; Hàn/Nhật vắng; keyword=0. 🔴
10. **Ưu tiên thị trường nào?** VN + Việt Kiều Mỹ/Úc/Canada trước.
11. **Ưu tiên kênh nào?** SEO (trang BST + sản phẩm) + press + Pinterest/KOL; chạy song song.
12. **Build trang nào trước với Matthew?** Bespoke/RTW tách · Sao-mặc/Press · Sản phẩm · Áo dài cưới + Đầm dạ tiệc (P0).
13. **Keyword cho SEO/ads/Pinterest/landing?** SEO+ads: occasionwear + modern ao dai + áo dài cưới; nội dung: vietnamese designer(s); bỏ bespoke long-tail.
14. **Rec chắc chắn vs experiment?** Chắc chắn (High): R1–R4. Experiment: R5 (Pinterest), R6 (giá công khai), R7 (adjacency phụ kiện).

---

## 17 · Remaining Gaps Before Presentation (xếp theo mức khẩn)

1. **[Cao] Traffic/geo/kênh của NTK Việt (Công Trí/Thuỷ/Phương My/Huy Võ) bị gated** → không có bảng traffic-ranking VN designer + không so geo VN mass-vs-designer. *Cần:* Ahrefs/SEMrush hoặc chờ GA thật của site Maison; hoặc nói rõ đây là giới hạn khi present.
2. **[Cao] % trang custom-made (Qipology) + subpage của Thuỷ/Phương My** không đo được. *Cần:* công cụ page-level khác hoặc bỏ khỏi claim định lượng.
3. **[TB] Keyword tệp Á (CN/KR/JP/SG/HK)** = 0/không hỗ trợ → chưa xác nhận được cầu Á. *Cần:* công cụ hỗ trợ CN (Baidu index) hoặc đánh dấu experimental.
4. **[TB] Pinterest/social split** chỉ có Sau Lee → tương quan Pinterest yếu. *Cần:* gói SimilarWeb cao hơn cho social per-brand, hoặc coi là giả thuyết.
5. **[TB] Adjacency phụ kiện** — chỉ đo được volume, không đo được khả năng convert; phụ thuộc Maison có thêm dòng phụ kiện không. *Cần:* quyết định sản phẩm từ Maison.
6. **[Thấp] Giá RTW Maison + năng lực nhận bespoke** — chưa có (nội bộ). *Cần:* Chi/Michelle xác nhận để chốt R1/R6.

**Câu hỏi chốt với Chi/Michelle trước khi present:** (1) dựng dòng RTW giá-công-khai online song song bespoke? (2) ngân sách ad/KOL/Pinterest test? (3) 3 tháng đầu ưu tiên nội địa hay Việt Kiều?

---

## 18 · Pattern fashion $2000+ + adjacency trace (bổ sung 03/07)

_Cào 6 nhà couture/bridal $2000+ **đo được** (khác NTK Việt bị gated): Sabyasachi (~230K/th, di sản Ấn — analog gần Maison nhất), Elie Saab (~130K), Galia Lahav (~110K), Monique Lhuillier (~84K), Zuhair Murad (~50K), Reem Acra (~7.5K). Raw: [`data_logs/pattern-2000plus_2026-07.json`](./data_logs/pattern-2000plus_2026-07.json)._

### 18.1 Pattern kênh — organic + direct thống trị
$2000+ couture = **Organic Search + Direct = 82–95%**, **paid search ~0** ở nhà di sản (Zuhair Murad 89%/paid 0; Sabyasachi 94,9%/paid 0; Monique 82%/paid 1%). Ngoại lệ mua ads: Elie Saab (paid search 8,4% — PMax cho RTW), Galia Lahav (paid search 10,8% + display, chạy đợt rồi tắt). **Quy luật: càng couture/di sản → càng ít paid; càng RTW/dễ tiếp cận → càng nhiều paid** (Sau Lee $475–895 = paid search 25%). ✅

> **⚠️ CAVEAT then chốt (quan trọng nhất):** "0% paid" là **trạng thái ĐÍCH của nhà đã nổi tiếng** — họ *thu hoạch* recall đã có. **Maison còn phải TẠO cầu** → giai đoạn đầu **có thể cần NHIỀU paid/social seeding hơn**, không phải ít. Đừng đọc "0% paid" thành "đừng chạy ads".

### 18.2 Pattern keyword — 85–98% branded, tìm bằng TÊN
Discovered **by name** (Reem Acra ~97%, Sabyasachi ~88%, Zuhair ~85% branded). Từ khoá ngành generic ("luxury dress") mỗi cái <5% → **ngõ cụt**. Non-branded *thật sự* kéo khách: (1) **celebrity/thảm đỏ** (mạnh nhất: "zendaya wedding dress", "alia bhatt met gala saree"); (2) **occasion/bridal**; (3) **accessory/entry** ("sabyasachi clutch bag", "earrings") + **"cheaper line"** = cầu entry-tier các nhà này bỏ ngỏ. ✅

### 18.3 Pattern geo — US + diaspora
US #1/top-2 gần như mọi brand; CA/UK/AU lặp lại top-6; **India có mặt top-6 ở TẤT CẢ**. Nhà di sản = **home-market + diaspora** (Sabyasachi India 59% + Pakistan/US/AU/CA/UAE). → **analog Maison (giả thuyết, không có data VN): Việt Nam + Việt kiều US/AU/CA** — khớp kết luận §8. 🟡

### 18.4 Pattern subpage — động cơ traffic
**Bridal/weddings hub** + **trang bộ sưu tập theo mùa có tên** (Zuhair /couture-spring-summer-2026 = **16,1%**, trang lớn nhất cả bộ) + **PDP deep-link** (homepage chỉ ~3%) + **trang APPOINTMENT** = điểm chốt couture (Reem Acra /appointments = trang #2, 8,1%) + **cụm accessories/jewellery** (entry-tier). → couture chuyển đổi bằng **đặt lịch hẹn, không phải add-to-cart**. ✅

### 18.5 Adjacency trace — TRẢ LỜI "trace sang hàng high-end (đồng hồ/BĐS/khách sạn)?"
**Kết luận: KHÔNG có tín hiệu** trace couture-buyer sang đồng hồ / trang sức-house / bất động sản / khách sạn 5 sao / du lịch xa xỉ — **0 site các ngành đó** xuất hiện trong audience-interests của mọi brand. 🔴
> **Minh bạch (đã test 03/07):** endpoint audience-interests **áp cho 7 brand Việt** (Công Trí, Phan Huy, Huy Võ, Thuỷ, Phương My, Xéo Xọ, Hà Cúc) → **tất cả trả 404 (gated)**. Nghĩa là adjacency dưới đây rút từ **brand quốc tế lớn** (Sau Lee/Sabyasachi/Elie Saab/Galia/Monique), KHÔNG đo được trên tệp khách NTK Việt → là tham chiếu + suy luận, không phải đo trực tiếp cho Maison.
- **Cái CÓ thấy (adjacency dùng được):** Instagram (Sabyasachi affinity 76 — mạnh nhất) · Pinterest (Galia 69) · YouTube/TikTok = **lớp discovery**; **department store** Saks/Nordstrom; **resale** TheRealReal/Poshmark; **contemporary e-com** Revolve/Reformation/BHLDN; **đối thủ couture** (so sánh). Và **AI tools (ChatGPT/Claude/Gemini) dùng nhiều** → tối ưu AI-search là kênh mới nổi.
- **Ý nghĩa:** targeting audience "khách couture cũng lướt đồng hồ/khách sạn" **không có cơ sở dữ liệu**. Adjacency **có cơ sở** để nhắm = **IG/Pinterest + khách Saks/Nordstrom + resale TheRealReal + Revolve/Reformation** (qua lookalike/interest). (Vắng data ≠ chứng minh không có hành vi — site hard-luxury có thể quá thưa để nổi lên.)
- **Đưa Maison VÀO hành trình:** là bước tạo audience trong **Google Ads** (In-market/Custom/Lookalike) — cần **tài khoản Ads đầy đủ**; **google-ads-mcp read-only không làm được** (chỉ đọc account của chính mình, không có keyword planner/audience/data đối thủ).

### 18.6 Playbook rút từ pattern (bổ sung)
| # | Điều rút ra | Confidence | Cơ sở |
|---|---|---|---|
| P1 | Ưu tiên **Organic + brand-name (Direct)** làm lõi; paid = campaign/seeding (nhưng giai đoạn đầu Maison cần seeding NHIỀU hơn nhà đã nổi) | High | data + caveat scale |
| P2 | **Tạo cầu tên thương hiệu off-site** (IG/Pinterest + press/celebrity) rồi thu branded search; bỏ category SEO | High | 85–98% branded |
| P3 | **Celebrity/thảm đỏ + occasion SEO** là kênh non-branded đáng tin duy nhất (KOL địa phương + trang occasion/bridal) | High | Galia/Sabyasachi |
| P4 | Site = **bridal hub + trang BST theo mùa + PDP deep-link + trang Đặt lịch + accessories entry-tier** | High | subpage pattern |
| P5 | **Đặt lịch/consultation** là điểm chốt couture (không phải checkout); e-com để cho RTW/entry | Med | Reem Acra + Phan Huy |
| P6 | Adjacency nhắm **IG/Pinterest + Saks/Nordstrom + TheRealReal + Revolve/Reformation** — KHÔNG phải đồng hồ/BĐS/khách sạn | Med | audience-interests |
| P7 | Cân nhắc **dòng accessory/entry-tier** để mở phễu (Sabyasachi accessories 3–6%, "cheaper line" searches) | Med | pattern; cần Maison quyết |

**Giới hạn §18:** đây là nhà quốc tế 100K+/tháng, brand equity nhiều năm → scale không chuyển 1:1; % branded là ước lượng từ click-share; không có data VN (India là analog Á gần nhất); Reem Acra + Zuhair Murad audience-interests gated → adjacency dựa trên 4/6 brand; vắng hard-luxury là vắng-data không phải bằng chứng tuyệt đối.

### 18.7 Cross-check trên analog nhỏ/VN (04/07, workflow wq5w039dv) + DECK 1-FILE
_Bổ sung mảnh §18 còn thiếu — pattern đo trên **nhà Việt + brand &lt;$2000** (thay vì chỉ nhà quốc tế 100K+): kết luận **trùng khớp**, tăng độ tin. Raw: [`data_logs/highend-pattern-adjacency_2026-07.json`](./data_logs/highend-pattern-adjacency_2026-07.json)._
- **Gradient branded theo giá (đo được):** Elie Saab ~90% · Phan Huy ~90–92% · Công Trí ~75% · Galia Lahav 61% → **Shanghai Tang 44% · Qipology 13%** (accessible-luxury). Xác nhận: **giá càng cao càng đi bằng tên**; category-SEO là sân của brand giá thấp. ✅
- **Non-branded của nhà Việt:** "vietnamese dress designers" = **52,8%** non-branded của Phan Huy (khớp P3 — editorial/nhận diện là beachhead). ✅
- **Adjacency:** workflow độc lập cũng ra **NO** (khớp §18.5); lớp phản biện đã loại số overlap bịa → §18.5 giữ nguyên là kết luận đúng.
- **Deck trình bày 1-FILE (thay 2 deck cũ, chart-first):** [`deck-hien-dien-so-maison.html`](./deck-hien-dien-so-maison.html) — 9 slide chart, trả lời trực tiếp Câu-1 (pattern→playbook) + Câu-2 (adjacency = NO).
