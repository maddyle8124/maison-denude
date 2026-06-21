# SEO — Nhật Ký Dữ Liệu Thô (Raw Data Log)

> Mọi số liệu fetch từ tool đều được lưu raw tại đây để **audit** và **không phải fetch lại** (tiết kiệm credit + token).
> Quy ước đặt tên file: `YYYY-MM-DD_<nguồn>_<tool>_<query>_<scope>.json`.
> **Quy trình từ nay:** payload lớn được ghi thẳng ra disk; phân tích chỉ kéo các trường cần thiết vào ngữ cảnh.

## Bảng tra cứu

| File | Nguồn | Tool | Query / phạm vi | Ngày | Credits | Kết quả chính |
|------|-------|------|------------------|------|---------|----------------|
| [`2026-06-11_sw_keywords-overview_ao-dai_ww.json`](./2026-06-11_sw_keywords-overview_ao-dai_ww.json) | SimilarWeb | get-keywords-overview | `ao dai` · WW · monthly 03–05/2026 | 11/6 | 1 | Head term ~62K–72K/mo, **100% info intent** |
| [`2026-06-11_sw_keywords-overview_wedding-ao-dai_ww.json`](./2026-06-11_sw_keywords-overview_wedding-ao-dai_ww.json) | SimilarWeb | get-keywords-overview | `wedding ao dai` · WW · monthly | 11/6 | 1 | Volume biến động 826→25; difficulty/competition = null |
| [`2026-06-11_sw_keywords-overview_empty-results.json`](./2026-06-11_sw_keywords-overview_empty-results.json) | SimilarWeb | get-keywords-overview | `ao dai saigon`, `bespoke ao dai` · WW | 11/6 | 0 | **Empty data[]** — không đo được volume |
| [`2026-06-11_trends_timeseries_5terms_12m_ww.json`](./2026-06-11_trends_timeseries_5terms_12m_ww.json) | SerpApi/Google Trends | search · TIMESERIES | 5 từ khoá ưu tiên · 12m · WW | 11/6 | — | TB: wedding=50, silk=10, couture=1, bridal=1, bespoke=0 |
| [`2026-06-11_trends_geomap_wedding-ao-dai_12m.json`](./2026-06-11_trends_geomap_wedding-ao-dai_12m.json) | SerpApi/Google Trends | search · GEO_MAP_0 | `wedding ao dai` · 12m | 11/6 | — | **AU=100, US=100, VN<1** (diaspora) |
| [`2026-06-11_trends_related-queries_ao-dai_12m.json`](./2026-06-11_trends_related-queries_ao-dai_12m.json) | SerpApi/Google Trends | search · RELATED_QUERIES | `ao dai` · 12m | 11/6 | — | Long-tail thật + phát hiện `ao dai nam`(43)/`men ao dai`(31); đã lọc nhiễu tiếng Bồ |
| [`2026-06-11_trends_full34_batch-averages.json`](./2026-06-11_trends_full34_batch-averages.json) | SerpApi/Google Trends | search · TIMESERIES ×4 batch | 34 từ khoá · 12m · neo `wedding ao dai` | 11/6 | — | **Chấm điểm chuẩn hoá cả 34 từ.** Phát hiện: `traditional ao dai`=57 (mạnh nhất), `vietnamese couture`=1 (blip) |
| [`2026-06-11_serp_positions_2queries_us.json`](./2026-06-11_serp_positions_2queries_us.json) | SerpApi/Google | search · google engine | `bespoke ao dai saigon` + `wedding ao dai` · US | 11/6 | — | Vị trí trang 1 (US). Bổ sung thêm bởi file ma trận bên dưới |
| [`2026-06-11_serp_multilocation_matrix.json`](./2026-06-11_serp_multilocation_matrix.json) | SerpApi/Google | search · google engine | 2 truy vấn × **VN·US·AU** | 11/6 | — | Ma trận đa địa điểm: từ VN có atelier Việt + Local Pack; US/AU là diaspora. Khoảng trống theo thị trường |

## Nguồn định tính (WebSearch — không phải số liệu, lưu để truy vết)

| Truy vấn WebSearch | Ngày | Dùng cho |
|--------------------|------|----------|
| "bespoke ao dai saigon custom ao dai tailor ho chi minh city for foreigners" | 11/6 | Bản đồ đối thủ §3.1 (TheCultureTrip, TNK, Duan, Maydo, Miss Ao Dai…) |
| "ao dai wedding dress guide bridal ao dai how to wear meaning" | 11/6 | §3.2 đối thủ bridal (TheKnot, East Meets Dress, Cee's Bridal…) + ý nghĩa/màu |
| "how much does a custom ao dai cost how long does it take to make ao dai saigon" | 11/6 | §3.3 ngân hàng câu hỏi (chi phí, timeline, vải) |
| "East Meets Dress modern ao dai brand silk ao dai vietnamese couture designer" | 11/6 | §3.2 phân tích East Meets Dress / Dream Dresses |
| "what to wear ao dai tea ceremony ao dai vs western wedding dress vietnamese engagement" | 11/6 | Brief #9 (áo dài vs đầm Tây) + tea ceremony |

## Ghi chú phương pháp
- **Credits:** chỉ SimilarWeb tính sw-coins (tổng đã dùng phiên này ≈ **2** coins; các call empty/429 = 0). Google Trends qua SerpApi tính theo quota SerpApi riêng.
- **429 rate-limit:** SimilarWeb keywords-overview bị giới hạn khi gọi song song → từ nay gọi **tuần tự**, cách nhau ~8–12s.
- **Trends là chỉ số tương đối 0–100**, không phải volume tuyệt đối — chỉ dùng xếp ưu tiên.
