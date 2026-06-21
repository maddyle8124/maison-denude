# Data logs — Keyword thị trường (Maison Dénudé)

Toàn bộ dữ liệu thô cho deliverable `../MaisonDenude_Keyword_ThiTruong_2026-06.xlsx`.
Thực hiện 2026-06-11. Hai nguồn: **SerpApi Google Trends** (xu hướng 12 tháng, 0–100) và **SimilarWeb keywords-overview** (volume + click tuyệt đối, T3–T5/2026).

## Google Trends (SerpApi, TIMESERIES, "today 12-m")
| File | Vùng | Nội dung |
|---|---|---|
| `2026-06-11_trends_EN_worldwide.json` | Toàn cầu | 21 từ khoá tiếng Anh, neo "evening dress" (avg 12m + đỉnh mùa) |
| `2026-06-11_trends_EN_vietnam.json` | Việt Nam | 9 từ khoá tiếng Anh trong VN, neo "evening dress" |
| `2026-06-11_trends_VN_vietnam.json` | Việt Nam | 17 từ khoá tiếng Việt, neo "áo dài" (=43) |

Lưu ý: Google Trends là chỉ số tương đối 0–100, không phải lượt tuyệt đối. Mỗi vùng/đợt được neo bằng một từ khoá chung để so sánh cùng thang; full chuỗi tuần được tóm tắt thành avg 12 tháng + đỉnh.

## SimilarWeb keywords-overview (monthly 2026-03 → 2026-05)
| File | Nội dung |
|---|---|
| `2026-06-11_sw_keywords-overview_EN.json` | 15 từ khoá tiếng Anh × {ww, vn}: volume, clicks, difficulty, intent, CPC |
| `2026-06-11_sw_keywords-overview_VN.json` | 14 từ khoá tiếng Việt × {vn, ww}: volume, clicks, difficulty, intent, CPC |

CPC trong log ở đơn vị USD-micro (chia 1e6 ra USD). `data[]=[]` = API trả rỗng (volume quá nhỏ để đo). Tổng ~61 lệnh SimilarWeb (mỗi lệnh ~1 credit; lệnh rỗng không tính credit).

## Đối chiếu nhanh (kiểm tra tính đúng)
- `evening dress` (Trends WW): đỉnh 100 tuần 15–21/02/2026 (mùa Valentine/tiệc) — khớp file EN_worldwide.
- `áo dài` (Trends VN): đỉnh 100 tuần 01–07/02/2026 (Tết) — khớp file VN_vietnam và `../../google_trend/totalVN.csv` (Áo dài = 100 tại 2026-02-01).
