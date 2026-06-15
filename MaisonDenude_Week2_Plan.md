# Maison Denude — Kế hoạch Tuần 2 (T2: 19–25/6)

*Trọng tâm tuần: **1st Progress Presentation** (họp Thứ 7) — demo website + insight 5 thị trường → chốt 3 thị trường trọng điểm. Song song: confirm UX/UI.*

> **Ghi chú đọc plan**
> - **Matthew = Thiệu** (dev track: front-end / SEO / back-end).
> - **Maddy** (research track).
> - "t2–t3" trong note gốc = **Thứ 2–Thứ 3** (ngày), không phải Tuần 2–3. "week1 / tuần 2" = tuần dự án.
> - Plan bắc cầu cuối **T1 (kickoff, 12–18/6)** → **T2 (19–25/6)**. Hôm nay 15/6 vẫn trong T1.

---

## 0. Mục tiêu cuối tuần (Definition of Done cho T2)

| # | Kết quả | Owner | Trình bày tại |
|---|---------|-------|---------------|
| 1 | **Demo website** (HTML form first) — preview để Maison feedback | Matthew | Họp T7 |
| 2 | **5 thị trường gợi ý** + indicator rõ ràng họ cần *bespoke heritage wear từ VN* | Maddy | Họp T7 |
| 3 | **Bộ keyword** (3 segment) đã được Matthew validate | Maddy → Matthew | Họp T7 |
| 4 | **UX/UI confirmed** với cả team (design đến đâu, chốt hướng) | Matthew + team | Đầu tuần |
| 5 | Team + Maison **chốt 3/5 thị trường** trọng điểm | Cả team | Họp T7 |

**Họp cố định:** Thứ 7, 15:00, 30 phút — đây là buổi **1st Progress Presentation**.

---

## 1. Matthew (Thiệu) — Web / Dev track

### 1.1 Confirm design trước (đầu tuần — gốc rễ "week1")
- [ ] **CF lại design với tất cả mọi người** — phần design của mọi người (Hậu) đang đến đâu rồi
- [ ] Nhận / chốt **design brief từ Hậu** *(deadline Chi hứa ~4/6 — kiểm tra đã có chưa; đây là blocker, không build được nếu thiếu)*
- [ ] Sau khi confirm → mới bắt đầu implement demo

### 1.2 Implement demo → finalise ver 1
- [ ] **Implement demo = demo website** — làm **dạng HTML form trước** (nhanh, để lấy feedback)
- [ ] **Confirm demo** với team/Maison
- [ ] **Refactor** theo feedback
- [ ] → **Finalise website ver 1**

### 1.3 Thứ tự build
```
Front-end finish  →  SEO  →  Back-end
```
- [ ] Front-end hoàn thiện
- [ ] Lớp SEO (structure, meta, schema, on-page)
- [ ] Back-end (booking flow → email)

### 1.4 Competitor & keyword
- [ ] Tổng hợp **list competitor Matthew đang có**
- [ ] Chạy **MCP SimilarWeb** trên list competitor → lấy traffic / channel / keyword cues
- [ ] **Validate bộ keyword** Maddy gửi (3 segment: áo dài / bridal / designer-occasion wear) — cái nào khả thi để rank, cái nào ưu tiên cho blog brief

---

## 2. Maddy — Research track

### 2.1 Thứ 2–Thứ 3: xong market research general
- [ ] Hoàn tất **market research tổng quát**
- [ ] Chốt **bộ keyword** Maddy tìm được → **gửi Matthew validate** (output của T2–T3)

### 2.2 Broad research global (cả tuần)
Tổng hợp tín hiệu từ nhiều góc — mỗi góc mù với góc kia:

| Nguồn tín hiệu | Lấy gì |
|----------------|--------|
| **Competitor cues** | Ai đang phục vụ phân khúc bespoke/heritage/áo dài ở từng thị trường; white space |
| **Keyword cues** | Search demand cho heritage/bespoke/áo dài/evening wear theo vùng |
| **Scraping signals** | Social media / web / forum — ai đang *hỏi mua / tìm* bespoke heritage wear từ VN |

### 2.3 Output: 5 thị trường gợi ý + indicator
- [ ] Đề xuất **5 thị trường** (candidate hiện có: **Dubai · Hàn · Singapore · Trung · Nhật**)
- [ ] Với mỗi thị trường, **show rõ indicator** là họ *cần bespoke heritage wear từ Việt Nam* — không chỉ "thị trường giàu", mà bằng chứng demand thực

**Gợi ý khung indicator** (mỗi market chấm điểm 5 trụ — đã có trong BrandHub §5):

| # | Trụ | Indicator cụ thể cần show |
|---|-----|---------------------------|
| 1 | **Value Fit** | Buyer ở đây đang tìm artisanal/heritage/made-to-measure? |
| 2 | **White Space** | Có khoảng trống cho VN heritage wear (không ai fill)? |
| 3 | **WOM Readiness** | Có diaspora / expat / bridal community làm điểm khởi đầu? |
| 4 | **Demand Signal** | Forum/social có người *chủ động hỏi* về áo dài/bespoke VN? |
| 5 | **Channel Fit** | Kênh nào reach được (IG ads / RedNote / Kakao...)? |

→ Đầu vào trực tiếp cho **chốt 3 thị trường** tại họp T7.

---

## 3. Phụ thuộc & Blocker (chặn tiến độ nếu không gỡ)

| Blocker | Chặn việc gì | Ai gỡ |
|---------|-------------|-------|
| **Design brief từ Hậu** | Matthew không build demo được | Chi / Hậu |
| **Email nhận booking** (OQ-001) | Booking flow / back-end | Chi |
| **Tên miền** (OQ-002) | Setup Cloudflare Pages | Chi |
| **Tiêu chí chọn KOL** | Phần KOL của Playbook (sau khi chốt market) | Chi |

---

## 4. Lịch trong tuần (đề xuất)

| Ngày | Matthew (Thiệu) | Maddy |
|------|-----------------|-------|
| **T2–T3** | CF design với team; nhận brief Hậu | Xong research general → bộ keyword gửi Matthew |
| **T4–T5** | Implement demo (HTML form first) | Broad research: competitor + keyword + scraping → 5 thị trường |
| **T6** | Confirm demo nội bộ → refactor | Hoàn thiện indicator cho 5 thị trường; validate keyword cùng Matthew |
| **T7 (họp 15:00)** | Preview demo cho Maison | Trình 5 thị trường → **chốt 3** |

---

## 5. Checklist trình họp Thứ 7 (1st Progress Presentation)
- [ ] Demo website (HTML) chạy được, click thử booking form
- [ ] Slide/doc 5 thị trường + indicator demand
- [ ] Bộ keyword 3 segment (đã validate) + đề xuất ưu tiên
- [ ] Đề xuất 3 thị trường để Maison chốt
- [ ] Xin: tiêu chí KOL + các OQ còn treo (email booking, domain)

---

*Nguồn: note tuần 2 (Maddy) · debrief 2/6 · proposal v11 (timeline T1–T7) · BrandHub nội bộ §5–6.*
