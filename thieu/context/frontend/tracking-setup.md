# Tracking Setup
_GTM + GA4 + Microsoft Clarity install plan._
_Last updated: 2026-06-24._

---

## GTM

**Container ID:** `GTM-PKQ647S4`
**Status:** Already created — just needs to be embedded in the site.

### Install in `Base.astro`

**In `<head>` (as high as possible):**
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PKQ647S4');</script>
<!-- End Google Tag Manager -->
```

**Immediately after `<body>` tag:**
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PKQ647S4"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

Source files: `C:\maison\thieu\context\reference\gg_tag_manager\head.js` and `body.js`

---

## GA4

**Status:** Property needs to be created inside GTM (or directly in Google Analytics).

### Setup steps
1. Go to analytics.google.com → create new GA4 property for `maisondenude.com`
2. Get Measurement ID (`G-XXXXXXXXXX`)
3. In GTM: New Tag → GA4 Configuration → paste Measurement ID
4. Trigger: All Pages
5. Store Measurement ID as env var: `PUBLIC_GA4_ID`

**In Astro** (alternative if not using GTM for GA4):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id={PUBLIC_GA4_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{PUBLIC_GA4_ID}');
</script>
```

**Recommended:** configure GA4 inside GTM — keeps all tags in one place.

---

## Microsoft Clarity

**Status:** Project not yet created — Thiệu to create at clarity.microsoft.com.
**Steps:**
1. Go to clarity.microsoft.com → New project → `maisondenude.com`
2. Get Clarity Project ID (e.g. `abc123xyz`)
3. Store as env var: `PUBLIC_CLARITY_ID`

**Snippet for `<head>` in `Base.astro`:**
```html
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", import.meta.env.PUBLIC_CLARITY_ID);
</script>
```

---

## Google Search Console

**Steps:**
1. Go to search.google.com/search-console → Add property → `maisondenude.com`
2. Verify via: HTML meta tag in `<head>` OR DNS record (preferred — more robust)
3. Link GSC to GA4 property in GA4 settings → Search Console links

**DNS verification (via Cloudflare):**
- GSC gives you a TXT record → add to maisondenude.com DNS in Cloudflare dashboard

---

## Env vars needed

Add to `.env` and Cloudflare Pages dashboard:

```bash
PUBLIC_GTM_ID=GTM-PKQ647S4
PUBLIC_GA4_ID=G-XXXXXXXXXX        # fill after creating property
PUBLIC_CLARITY_ID=XXXXXXXXXX      # fill after creating Clarity project
```

`PUBLIC_` prefix = safe to expose client-side in Astro.

---

## Verification checklist (after first deploy)

- [ ] GTM Preview mode shows container firing on all pages
- [ ] GA4 Realtime shows at least 1 active user when you load the site
- [ ] Clarity session recordings appear within 24h
- [ ] GSC property verified (DNS or meta tag)
- [ ] GA4 ↔ GSC link confirmed in GA4 settings

---

## Testing email (temporary)

Booking form submissions → `thieu.dachill@gmail.com` until Chi provides the real email (FQ-09 / OQ-001).
Stored as `TEAM_EMAIL` Supabase secret — swap value when real email is received, no code change needed.
