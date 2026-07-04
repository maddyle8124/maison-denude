# 03 — Entity Mentions: Maison Denude across the internet

> Research date: 2026-07-03. Purpose: feed entity-claiming JSON-LD (`sameAs` / `subjectOf` / `mentions`) on maisondenude.com.
> Method: SerpAPI (google + google_light, EN/VI, quoted variants + site-restricted queries) + WebSearch, with live WebFetch verification of every non-seed URL. Facebook KOL permalinks come from the pre-verified seed doc `C:\maison\social proof maison denude.md` (2 spot-checked live, both PASS).

---

## Summary

| Bucket | Count | Notes |
|---|---|---|
| Official profiles (→ `sameAs`) | 6 (5 URLs + Google Business listing) | Website, Facebook, Instagram, TikTok, Threads; unclaimed Google Business listing found |
| Press / editorial — articles ABOUT the brand (→ `subjectOf`) | 7 articles + 2 tag pages | Tuổi Trẻ (NLĐ), Báo Văn Hóa, CafeBiz, VTV, vietnam.vn (EN+VI), ELLE Decoration founder feature |
| Press — wardrobe-credit / roundup mentions (→ `mentions` candidates) | 7 | Đẹp ×3, Kenh14, Harper's Bazaar VN, L'Officiel VN ×2 |
| KOL & social mentions | 27 Facebook permalinks/profiles (seed) + 12 new (YouTube, TikTok, Threads, Instagram, Pinterest, LinkedIn) | |
| Name collisions excluded | 1 entity (Daan Interior project) + French-language literal noise | Must NOT enter JSON-LD |

**Headline findings**

- The Dec 2025 SS26 "Renaissance" launch generated genuine national press: Tuổi Trẻ/NLĐ, Báo Văn Hóa (Ministry of Culture), VTV, CafeBiz, vietnam.vn — all live-verified.
- **nld.com.vn now 301-redirects to tuoitre.vn** — the canonical URL for the NLĐ article is the tuoitre.vn one. Use it in JSON-LD, not the old nld.com.vn link.
- Google already has a **Knowledge Graph entity + Business listing** for MAISON DENUDE (kgmid `/g/11y3d4jc2x`, place_id `ChIJR-cAGAAvdTERBu4E3UwrRlE`, address matches 194 Lê Thánh Tôn) — **listing is UNCLAIMED**. Claiming it is the single highest-leverage entity action available.
- Google's KG already links Facebook + Instagram + TikTok as the brand's profiles — our JSON-LD `sameAs` should mirror and extend that set.
- Two official profiles not in the brand hub docs were discovered: **TikTok @maison.denude** and **Threads @maisondenude.official**.
- No LinkedIn company page exists (404) and no official YouTube channel or official Pinterest account was found.
- Founder press: ELLE Decoration VN "Style Book" feature on Chi Bùi (Jan 2024); an ELLE Magazine print feature and a "Skye Lin" founder feature are referenced on Instagram but no standalone article URL was found on the open web.

---

## Official profiles (→ JSON-LD `sameAs`)

| Platform | URL | Evidence / status |
|---|---|---|
| Website | https://maisondenude.com | Canonical entity home. Ranks #1 for brand query (VN). |
| Facebook | https://www.facebook.com/MaisonDenude | Verified — SERP + Google KG link. ~4.4K followers. |
| Instagram | https://www.instagram.com/maisondenude.official | Verified — SERP + Google KG link. 17.3K followers, 1.3K+ posts. |
| TikTok | https://www.tiktok.com/@maison.denude | Search-verified (fetch blocked by TikTok JS wall). Bio: "Clothing Brand … 194 Le Thanh Ton, District 1, HCM" — address matches; also linked from Google KG. 89 followers. |
| Threads | https://www.threads.com/@maisondenude.official | Fetch-verified live. 1,339 followers, brand-voice posts. |
| Google Business | Knowledge panel: kgmid `/g/11y3d4jc2x`, place_id `ChIJR-cAGAAvdTERBu4E3UwrRlE` — "Cửa hàng quần áo", 194 Lê Thánh Tôn, Bến Thành, HCMC | **UNCLAIMED listing** (`unclaimed_listing: true` in SERP data). Action item: claim via Google Business Profile, then the Maps URL can join `sameAs`. |

Not found / explicitly absent:
- **LinkedIn company page**: linkedin.com/company/maison-denude → 404. Only an employee profile mentions the brand (https://vn.linkedin.com/in/duong-thai-a8428b239).
- **Official YouTube channel**: none found.
- **Official Pinterest**: none. Founder Chi Bùi's personal account https://www.pinterest.com/311chiadriana/ has a "Maison denude store" board (12 pins) — personal, do NOT put in brand `sameAs`.

---

## Press & editorial coverage (→ JSON-LD `subjectOf`)

### Articles about the brand (subjectOf-grade)

| URL | Domain / tier | Title | Date | Lang | Context | Verification |
|---|---|---|---|---|---|---|
| https://tuoitre.vn/nld/nhung-khai-niem-an-tuong-o-maison-denude-196251224110909193.htm | Tuổi Trẻ (hosting NLĐ) — major national press | Những khái niệm ấn tượng ở Maison Denude | 2025-12-24 | vi | Feature on Chi Bùi's SS26 "Renaissance" launch, 40 designs, 35 models | **Fetch-verified.** Note: old nld.com.vn URL 301s here — use this URL. |
| https://baovanhoa.vn/giai-tri/maison-denude-ra-mat-thuong-hieu-va-bo-suu-tap-ss26-tai-tphcm-191099.html | Báo Văn Hóa (Ministry of Culture) — national press | Maison Denude ra mắt thương hiệu và bộ sưu tập SS26 tại TP.HCM | 2025-12-24 | vi | Brand + SS26 launch report; names Chi Bùi as founder/creative director | **Fetch-verified** |
| https://cafebiz.vn/khi-thoi-trang-chon-thi-tham-thay-vi-pho-dien-hanh-trinh-tro-ve-voi-ve-dep-nguyen-ban-176251224105625019.chn | CafeBiz — national business/lifestyle | Khi thời trang chọn thì thầm thay vì phô diễn… | 2025-12-24 | vi | Feature on the Renaissance áo dài collection and brand philosophy | **Fetch-verified** |
| https://vtv.vn/chat-lieu-ren-xuyen-thau-ton-vinh-ve-dep-cua-ao-dai-truyen-thong-100251225151003438.htm | VTV — national broadcaster | Chất liệu ren, xuyên thấu tôn vinh vẻ đẹp của áo dài truyền thống | 2025-12-25 | vi | SS26 áo dài designs as centerpiece; lace/sheer craftsmanship | **Fetch-verified** |
| https://www.vietnam.vn/en/maison-denude-ra-mat-thuong-hieu-va-bo-suu-tap-ss26-tai-tp-hcm | vietnam.vn — state syndication portal (EN) | Maison Denude launches its brand and SS26 collection in Ho Chi Minh City | 2025-12-23 | en | English launch coverage; "strip down, to reveal" naming story; Chi Bui founder | Search-verified; **fetch blocked (HTTP 403 bot wall)** — content confirmed via SERP snippets + WebSearch summary. VI version also live: https://www.vietnam.vn/maison-denude-ra-mat-thuong-hieu-va-bo-suu-tap-ss26-tai-tp-hcm |
| https://www.elledecoration.vn/decorating/inspiration/phong-cach-style-book-giam-doc-sang-tao-chi-bui | ELLE Decoration VN — fashion/design magazine | Style Book — Giám đốc sáng tạo Chi Bùi | 2024-01-16 | vi | Founder feature: Chi Bùi's personal style as creative director of the brand she founded, Maison Denude | Search-verified; **fetch blocked (HTTP 403)**. Snippet explicitly names Maison Denude. |

Tag/topic hub pages (entity signal, not `subjectOf` items):
- https://nld.com.vn/nld/maison-denude.html — NLĐ topic page "maison denude" (search-verified)
- https://vtv.vn/maison-denude.html — VTV topic page "Maison Denude" (search-verified)

### Wardrobe-credit / roundup mentions in press (→ `mentions` candidates, press tier)

| URL | Domain / tier | Title | Date | Lang | Context | Verification |
|---|---|---|---|---|---|---|
| https://kenh14.vn/10-bo-ao-dai-xuat-sac-nhat-wechoice-awards-2024-day-roi-215250113225420564.chn | Kenh14 — major youth media | 11 bộ áo dài xuất sắc nhất WeChoice Awards 2024 | 2025-01-13 | vi | Châu Bùi's MAISON DENUDE áo dài among best of WeChoice 2024 | **Fetch-verified** |
| https://bazaarvietnam.vn/tham-do-ao-dai-wechoice-awards-2024/ | Harper's Bazaar Vietnam — fashion magazine | Những xu hướng áo dài quen mà lạ tại WeChoice Awards 2024 | 2025-01-14 | vi | Châu Bùi in pink Maison Denude áo dài + custom floral/pearl bag | **Fetch-verified** |
| https://dep.com.vn/now-and-then-su-hoa-tron-giua-hoai-co-va-hien-dai/ | Đẹp — fashion magazine | Now and Then: Sự hòa trộn giữa hoài cổ và hiện đại | 2023-07-31 | vi | Editorial; Maison Denude credited for silk garments | **Fetch-verified** |
| https://dep.com.vn/leave-a-tender-moment-alone-tran-quy-khoanh-khac-hanh-phuc-tu-nhung-dieu-nho-be/ | Đẹp — fashion magazine | Leave a tender moment alone | 2024-02-07 | vi | Editorial (CD Hà Đỗ); Maison Denude credited 3× in styling credits | **Fetch-verified** |
| https://dep.com.vn/deptet-spring-reunion-sac-xuan-ruc-ro-qua-lang-kinh-cua-nghe-thuat-to-son-moi-do-diem-phan-ma-hong-thoi-thuong/ | Đẹp — fashion magazine | #DEPTET — Spring Reunion | 2024-02-07 | vi | Beauty editorial; wardrobe Maison Denude alongside Van Cleef & Arpels | **Fetch-verified** |
| https://www.lofficielvietnam.com/local/ao-dai-ngay-tet-cap-nhat-vo-van-ban-cach-tan-tu-cac-thuong-hieu-viet | L'Officiel Vietnam — fashion magazine | LO Tết: Áo dài cách tân và những thương hiệu Việt bạn cần biết (P1) | 2025-01-06 | vi | Dedicated Maison Denude section in Tet áo dài brand roundup (silk/velvet/brocade/lace) | Search-verified (SERP snippet shows the mention); live fetch did not surface it — page appears paginated/lazy-loaded. Do not treat as fetch-dead. |
| https://www.lofficielvietnam.com/local/woot26-tham-djo-women-of-our-time-dau-an-a-djong-tu-nhung-nang-tho-djuong-djai | L'Officiel Vietnam — fashion magazine | #WOOT26: Thảm đỏ Women Of Our Time | 2026-04-15 | vi | Model Tú Anh in Maison Denude sheer-lace áo dài on WOOT26 red carpet | Search-verified only (same lazy-load issue on fetch). |

---

## KOL & social mentions (→ JSON-LD `mentions` candidates, lower priority)

### Facebook — seed list (from `C:\maison\social proof maison denude.md`, pre-verified; 2 spot-checked live 2026-07-03, both PASS)

| Who | Context | Reactions | Date | Permalink | Status |
|---|---|---|---|---|---|
| Võ Điền Gia Huy ✅ | MV fashion credit | 26K | 2026-01-05 | https://www.facebook.com/vodiengiahuyfanpage/posts/pfbid038FnysNNJXLJ4J8MnnZX5gQPtuwqWV4f8ofSPtUn9A9Fc2zcRmeHGm9mnYFiGR8igl | seed-verified |
| L'Officiel Vietnam | Reel "Xin Chữ Năm Ngọ" (Negav, Uyển Ân, Pháp Kiều) | 1.8K | 2026-02-16 | https://www.facebook.com/reel/852362544469091/ | seed-verified |
| Văn Mai Hương ✅ | MV "Vùng Xám" costume | 1K | 2026-01-31 | https://www.facebook.com/vmhuong.singer/posts/pfbid02Nf2u2bUp8E5M3WrG2r6e3mjSU56SQCEZtMe8uMUo3R5C3sMzHg7YUrJcPyqyq6Xpl | **spot-check PASS (live fetch)** |
| Băng Di ✅ | Mai Vàng award áo dài | ~80 | 2026-01-30 | https://www.facebook.com/bangdisg/posts/pfbid02WH7i4EHc17o4kQ7quxUadjqMx6Fb3JF7aK9xjKZYQYRa8sXnXhGix7ch42px4otMl | **spot-check PASS (live fetch)** |
| Băng Di ✅ | WeChoice Awards 2024 | 204 | 2025-01-13 | https://www.facebook.com/bangdisg/posts/pfbid02JD5Yqto9KD3HuZbKSsNU1YogvWYZPNYVBmcvGGwxtTkyxBNyARWJfDzKPReo3vFFl | seed-verified |
| Bích Phương | BST launch mention | 82 | 2025-12-19 | https://www.facebook.com/bich.phuong.diamond/posts/pfbid02UwgmeYBPnk77vvukx2dJ5JWVd34ucMrrqcrwrQppefrZTpsazCEfateymWPZyR8xl | seed-verified |
| Jmi Ko ✅ | Violin opening of first fashion show | 23 | 2025-12-18 | https://www.facebook.com/reel/837967139056262/ | seed-verified |
| Jmi Ko ✅ | Post about opening Chi Bui's first show | — | 2025-12-18 | https://www.facebook.com/jmient/posts/i-had-the-honor-of-opening-and-becoming-part-of-the-story-of-chi-buis-very-first/25448092224829784/ | search-verified (found independently in SERP) |
| Nguyễn Lâm Thảo Tâm ✅ | Mother's áo dài story | 611 | 2025-04-30 | https://www.facebook.com/nguyenlamthaotam2000/posts/pfbid02tzdJmymc1xCLaptnh1YcpTeyHLFyBS2tgQL733PkzmDbfiewpHgzxkf9QAT2wWv5l | seed-verified |
| Nguyễn Lâm Thảo Tâm ✅ | Autumn áo dài shoot | 522 | 2024-10-11 | https://www.facebook.com/nguyenlamthaotam2000/posts/pfbid0a21SLiT5LegoLfZ3Co49dg1okCWLhinRmLEjJGRghHgxnEUHhVcjaPMk28E1ybopl | seed-verified |
| Nicky Khánh Ngọc | Hennessy mid-autumn event | 344 | 2024-09-16 | https://www.facebook.com/nicky.k.ngoc/posts/pfbid0wHRjjeRiLw4BpVN6Mjm3cvsJy5YKzLYs4mwNsNtvqTmFEZP9nHWoxy1tShDYqKcHl | seed-verified |
| Mai Chiếm Hiển | #KIM on-set fashion | 115 | 2024-05-31 | https://www.facebook.com/hien.nixx/posts/pfbid02Dd3ULCG9oikuZQ98RypW8CZSq8PErG1CcDxinii5XB1ri9iFZtcqGMPyPLGfai1fl | seed-verified |
| Lê Tam Triều Dâng | "Tâm Trạng Khi Yêu" (photo Dzung Yoko) | — | 2026-05 | https://www.facebook.com/tamtrieudangofficial/posts/pfbid02vxeDroMR58F9cNqasnbQPoFdrEYUNcaNaAryHqn6jQUpZjsBn23TLaCArohpPfaZl | seed-verified |
| Thu Anh Ho | Marie Claire Fashion Night Out outfit | — | 2026 | https://www.facebook.com/hothuanh22091994/posts/pfbid0Qtze2zWnKEymcW4isx1gPg2JymU3mA88KyPzabReKicangzeBgVGvAfpWDPCMSRsl | seed-verified |
| Miss Universe Vietnam | Á hậu Quỳnh Anh × ELLE VN editorial | 34 | 2026-02-17 | https://www.facebook.com/missuniversevietnam.org/posts/pfbid032D1bjdoJSJbG3wz1BvzwS4EKrjXsPQXGKnY2yrV8y3nwkT9Bdqu6YgX2un3VbrQhl | seed-verified |
| The Planners | Lisa & Kenny Vu Quy — áo dài credit | 119 | 2025-11-19 | https://www.facebook.com/theplannersvn/posts/pfbid0k13HyG49Z3Ji7rD2NBtTP7NRUZR7HHnPKHT6unrYE8MqLSKiZZrSZxymCHeYrJvSl | seed-verified |
| The Planners | Hưng & Trang wedding — bridal áo dài | ~20 | 2026-05-14 | https://www.facebook.com/theplannersvn/posts/pfbid0j4DZEkpPMGdUf1JuWfzzrkt8iRBAtzB8rcNu1VwqtonVe2QWHfHziBkfuCKKeRwrl | seed-verified |
| TIE Men | Lisa & Kenny — áo dài credit | ~30 | 2025-12-01 | https://www.facebook.com/tiemen.vn/posts/pfbid0udegT9AU17mpUsSaA6CYgzxKDE2RQJ2DxgpZrbqv5bHEyo3Upw4S2qAhaEUMC6htl | seed-verified |
| Dzung Yoko | "Tâm Trạng Khi Yêu" project | 176 | 2026-05-01 | https://www.facebook.com/dzungyoko/posts/pfbid025zdgbBq8yvFVg2xKELgCTKt5VSegaivQHermMTS2fnwfLUyunYeurrZy7MGvM1Hnl | seed-verified |
| Dzung Yoko | "Good Old Days" Marie Claire VN shoot — fashion: Maison Denude | — | 2025-12-31 | https://www.facebook.com/dzungyoko/posts/good-old-days-fashion-well-for-marie-claire-vietnamsaigon-nh%E1%BB%AFng-c%C3%A1i-c%C5%A9-%C4%91%E1%BA%B9p-%C4%91%E1%BA%BDcre/10163114296813292/ | search-verified (new find) |
| Dzung Yoko Artbook | Kinh kịch-inspired editorial — fashion: Maison Denude, Marie Claire Korea | — | — | https://www.facebook.com/dzungyokoartbook/posts/1366008001551005/ | search-verified (new find) |
| Bobby Nguyen | BTS of Maison Denude shoot | 53 | 2025-12-18 | https://www.facebook.com/bobby.nguyen.1004/posts/pfbid02nPQeWpQSND8kHyyoy11SLqjtG1QQEkWuzemvK7SJRr4LBCFb1uhTF3uNKGhBGJZjl | seed-verified |
| Group "review áo dài" post | Organic UGC: price/quality review request (16M VND/set) | — | 2025-02-03 | https://www.facebook.com/groups/437233847286619/posts/1341879480155380/ | search-verified (login-walled; found via SERP) |
| Profile-only seeds (no stable permalink): Chi Pu (chipupu93, Vạn Xuân Awards 2024, 6.2K), Cô Em Trendy (coemtrendy, 9K), Chau Bui (chaubui.official, 1.1K), Linh An (babigeevn, 2K swimwear), Trần Thiên Tú (thientu0612), Trần Nguyễn Bảo Nhân (trannguyenbaonhan), Truong-An Nhu Nguyen (truongan.n.nguyen), Mai Chiếm Hiển 2nd post (hien.nixx) | | | | | seed-verified (profile links only) |

Brand-page amplification of KOL moments (owned, useful as internal linking targets, not `mentions`):
- https://www.facebook.com/MaisonDenude/posts/chi-pu-in-maison-denude/906900034891638/ — "Chi Pu in Maison Denude" (search-verified)
- https://www.facebook.com/MaisonDenude/posts/chau-bui-x-maison-denude/919487410299567/ and /919487863632855/ — "CHAU BUI x MAISON DENUDE" (search-verified)

### New non-Facebook social mentions (found this session)

| Platform | URL | Who / context | Status |
|---|---|---|---|
| YouTube | https://www.youtube.com/watch?v=ALnly4iah0w | Jmi Ko Official — "Jmi Ko Performs at Maison Denude Fashion Show \| Vlog (Captioned)" | **Fetch-verified (title confirmed)** |
| YouTube | https://www.youtube.com/shorts/msAy_KSEH5c | GiGi Hương Giang official channel — short crediting Maison Denude | search-verified (SERP snippet shows credit) |
| YouTube | https://www.youtube.com/watch?v=-Auz3Oi2MUM | GiGi Hương Giang — "LK Bức Tranh Từ Nước Mắt…" live, Maison Denude in description | search-verified |
| TikTok | https://www.tiktok.com/@seniraii/video/7594716926786522389 | Creator roundup "Khám Phá Thương Hiệu Việt: Maison Denude, Dada, Thome" (bridal áo dài) | search-verified |
| TikTok | https://www.tiktok.com/@maisonpham/video/7542869024376425745 | Creator video referencing Maison Denude bridal áo dài | search-verified |
| TikTok | https://www.tiktok.com/@chaubui/video/7585589354282683668 | Chau Bui official TikTok — local brand video using "original sound - MAISON DENUDE" | search-verified |
| Threads | https://www.threads.com/@huyenchuoii/post/DR548AUk3a- | UGC: "Mẫu này của MAISON DENUDE - hơn 30 triệu nhé" | search-verified |
| Threads | https://www.threads.com/@buingoc_0708 (post DVQrbb_gWr6) | Tailor covering a Maison Denude design ("Cover từ Maison Denude") | search-verified |
| Instagram | https://www.instagram.com/p/C_M55XKPSAQ/ | Brand post: "Maison Denude Creative Director - Chi Bui on ELLE Magazine Special Feature" — evidence of ELLE print feature | search-verified |
| Instagram | https://www.instagram.com/p/DZAm8APlu1Y/ | tungchautran — "LOVENUDE" Marie Claire VN editorial, fashion: Maison Denude, Dati Tailor | search-verified |
| Pinterest | https://www.pinterest.com/pin/681662093631097912/ | Third-party pin of a Maison Denude turquoise gown (saved by archtranle) | **Fetch-verified** |
| LinkedIn | https://vn.linkedin.com/in/duong-thai-a8428b239 | Employee profile listing Maison Denude as experience | search-verified |

Founder-adjacent (do not put in brand JSON-LD, but useful for a future Person entity for Chi Bui):
- https://www.pinterest.com/311chiadriana/ — Chi Bui's personal Pinterest, incl. board https://www.pinterest.com/311chiadriana/maison-denude-store/
- "Skye Lin" founder-feature language ("Meet the founder who turns crisis into bouquets. Skye Lin is an interdisciplinary artist and designer…") appears only inside Instagram post/reel copy (e.g. https://www.instagram.com/reel/C_sv5rzv5C6/ , https://www.instagram.com/reel/DZOj0VINvTJ/); no standalone article URL found on the open web.

---

## Name collisions / excluded (NOT our entity — never in JSON-LD)

| URL | What it is | Why excluded |
|---|---|---|
| https://daaninterior.com.vn/vi/du-an/225/maison-denude/22/ | "MAISON DENUDE" — a 42 m² interior-design project by Daan Interior at 25 Trần Ngọc Diện, Thảo Điền, Thủ Đức | Different entity; interior-design project that merely shares the name. Different address, different business. |
| French-language literal uses of "maison, dénudé" (Reddit r/wortwitzkasse, Gossip Room FB, leberry.fr, courdecassation.fr, gifer.com) | Ordinary French phrase "dénudé" near "maison" in unrelated news/jokes | Linguistic noise, zero relation to the brand. Confirms accented-quote queries are low-precision; brand searches should use unaccented "maison denude". |

---

## Recommended JSON-LD arrays

### `sameAs` (official profiles only — copy directly)

```
https://www.facebook.com/MaisonDenude
https://www.instagram.com/maisondenude.official
https://www.tiktok.com/@maison.denude
https://www.threads.com/@maisondenude.official
```

Notes:
- Add the Google Maps URL after the Business Profile is claimed (place_id `ChIJR-cAGAAvdTERBu4E3UwrRlE`).
- Do NOT include the founder's personal Pinterest or the Pinterest pin (third-party).

### `subjectOf` (verified press about the brand — copy directly)

```
https://tuoitre.vn/nld/nhung-khai-niem-an-tuong-o-maison-denude-196251224110909193.htm
https://baovanhoa.vn/giai-tri/maison-denude-ra-mat-thuong-hieu-va-bo-suu-tap-ss26-tai-tphcm-191099.html
https://cafebiz.vn/khi-thoi-trang-chon-thi-tham-thay-vi-pho-dien-hanh-trinh-tro-ve-voi-ve-dep-nguyen-ban-176251224105625019.chn
https://vtv.vn/chat-lieu-ren-xuyen-thau-ton-vinh-ve-dep-cua-ao-dai-truyen-thong-100251225151003438.htm
https://www.vietnam.vn/en/maison-denude-ra-mat-thuong-hieu-va-bo-suu-tap-ss26-tai-tp-hcm
https://www.elledecoration.vn/decorating/inspiration/phong-cach-style-book-giam-doc-sang-tao-chi-bui
```

Caveats: vietnam.vn and elledecoration.vn returned HTTP 403 to automated fetch (bot walls) but are confirmed live via search snippets; both render fine in a browser. Use the tuoitre.vn URL for the NLĐ article (nld.com.vn 301s to it).

### `mentions` (optional, lower priority — strongest candidates)

```
https://kenh14.vn/10-bo-ao-dai-xuat-sac-nhat-wechoice-awards-2024-day-roi-215250113225420564.chn
https://bazaarvietnam.vn/tham-do-ao-dai-wechoice-awards-2024/
https://dep.com.vn/now-and-then-su-hoa-tron-giua-hoai-co-va-hien-dai/
https://dep.com.vn/leave-a-tender-moment-alone-tran-quy-khoanh-khac-hanh-phuc-tu-nhung-dieu-nho-be/
https://dep.com.vn/deptet-spring-reunion-sac-xuan-ruc-ro-qua-lang-kinh-cua-nghe-thuat-to-son-moi-do-diem-phan-ma-hong-thoi-thuong/
https://www.lofficielvietnam.com/local/ao-dai-ngay-tet-cap-nhat-vo-van-ban-cach-tan-tu-cac-thuong-hieu-viet
https://www.youtube.com/watch?v=ALnly4iah0w
```

(Facebook KOL permalinks are better used as on-page social proof / a "Featuring" section than as JSON-LD `mentions` — login-walled URLs give crawlers little entity value.)

---

## Open items / gaps

1. **Claim the Google Business Profile** (unclaimed listing, place_id above) — highest-leverage entity action. The Google Knowledge Graph entity (kgmid `/g/11y3d4jc2x`) and the Google Business listing are both **UNCLAIMED** — this is the single top recommended action for the client, ranked above any JSON-LD work, since an unclaimed KG/Business entity means Google itself has not confirmed brand ownership even though it has already assembled the entity graph (name, address, sameAs links) from third-party signals.
2. **SimilarWeb has no traffic data for maisondenude.com** (checked 2026-07-03 — query returns 404 / no data). The domain is too new/low-traffic for SimilarWeb's index yet. Practical implication: until SimilarWeb (or GA4/GSC organic reports) accumulate history, entity presence and "is this a real brand" signal rest **entirely on earned media (press table above) + official socials (`sameAs` list) + the unclaimed Google KG/Business entity** — there is no third-party traffic-analytics corroboration to point to yet. Re-check SimilarWeb in a future SEO review once the domain has more age/traffic.
3. ELLE Vietnam: the Quỳnh Anh "Một đoá Xuân ngời" editorial and the Chi Bui ELLE Magazine print feature are referenced on social, but no elle.vn article URL surfaced in site-restricted searches. Worth asking the brand for the print/scan reference or the exact URL.
4. Marie Claire Vietnam: extensive Fashion Night Out association (multiple IG/FB credits) but no marieclaire.vn article URL found — coverage appears to live on Marie Claire VN's social channels only.
5. L'Officiel VN pages lazy-load content; both mentions verified via SERP snippets only — re-verify in a browser before shipping if desired.
6. No official Zalo/YouTube/LinkedIn/Pinterest presences exist yet — when created, add to `sameAs`.
