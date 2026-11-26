import { useEffect, useRef } from "react";

const BODY_HTML = `
<!-- ENTRY GATE -->
<div class="entry-video-container" id="entry-gate">
  <div class="gate-toran"></div>
  <div class="gate-mandala"></div>
  <div class="gate-mandala inner"></div>
  <span class="gate-corner tl"></span>
  <span class="gate-corner tr"></span>
  <span class="gate-corner bl"></span>
  <span class="gate-corner br"></span>

  <div class="gate-side left">
    <span class="gate-side-orn">✦ ❀ ✦</span>
    <p class="gate-side-sub">पावन परिणय</p>
    <h2 class="gate-side-title">रोहिनी <span>संग</span> रबि</h2>
    <p class="gate-side-line">स्नेहिल आमंत्रण</p>
  </div>

  <div class="entry-stage" id="entry-stage">
    <div class="entry-video-frame" id="entry-card">
      <video id="entry-video" src="media/reveal1.mp4" poster="images/envelope_poster.jpg" playsinline webkit-playsinline muted preload="auto"></video>
      <div class="card-sheen" id="card-sheen"></div>
      <div class="card-inner-border"></div>

      <div class="gate-top-pill">॥ श्री गणेशाय नमः ॥</div>

      <button type="button" class="seal-hotspot" id="seal-hotspot" aria-label="शाही मुहर खोलें">
        <span class="seal-glow"></span>
        <span class="seal-ring r1"></span>
        <span class="seal-ring r2"></span>
        <span class="seal-ring r3"></span>
        <span class="seal-orbit">
          <i class="gem g1">✦</i>
          <i class="gem g2">✦</i>
          <i class="gem g3">✦</i>
          <i class="gem g4">✦</i>
        </span>
        <span class="seal-shine"></span>
      </button>

      <div class="gate-cta-wrap" id="tap-hint">
        <div class="gate-cta-btn" id="gate-cta-btn">
          <span class="cta-sparkle">✨</span>
          <span class="cta-text" id="cta-text">मुहर पर टैप करें — आमंत्रण खोलें</span>
          <span class="cta-music" aria-hidden="true"><i></i><i></i><i></i></span>
        </div>
        <p class="gate-cta-sub">संगीत एवं शाही आमंत्रण के लिए क्लिक करें</p>
      </div>
    </div>
  </div>

  <div class="gate-side right">
    <span class="gate-side-orn">✦ ❀ ✦</span>
    <p class="gate-side-sub">शुभ विवाह</p>
    <h2 class="gate-side-title">09 दिसम्बर 2026</h2>
    <p class="gate-side-line">कदमा, जमशेदपुर</p>
  </div>

  <canvas class="gate-fx-canvas" id="gate-fx-canvas"></canvas>
  <div class="gate-flash" id="gate-flash"></div>
</div>

<audio id="bg-audio" src="media/bg_music.mp3" loop preload="auto"></audio>
<button id="audio-btn" aria-label="संगीत चालू/बंद करें">
  <svg id="icon-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
  <svg id="icon-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
</button>

<canvas id="petals-canvas"></canvas>
<canvas id="confetti-canvas"></canvas>

<main id="main-content">

  <!-- HERO -->
  <section id="hero">
    <img class="hero-img" src="images/couple.webp" alt="नवदंपत्ति">
    <button type="button" class="scroll-cue" id="scroll-cue" aria-label="नीचे स्क्रॉल करें">
      <span class="scroll-cue-ring"></span>
      <span class="scroll-cue-text">नीचे स्क्रॉल करें</span>
      <span class="scroll-cue-arrows" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 6 12 12 18 6"/><polyline points="6 13 12 19 18 13"/></svg>
      </span>
    </button>
  </section>

  <!-- BLESSINGS & FAMILY -->
  <section id="family-section" class="sec">
    <div class="deco-clip"><div class="mandala top"></div></div>
    <div class="toran"></div>
    <div class="hero-card reveal">
      <span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>
      <div class="ganesh-wrap"><img class="ganesh-icon" src="images/ganpati2.webp" alt="" onerror="this.style.display='none'"></div>
      <p class="shloka">वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः<br>निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा</p>

      <div class="ornament"><div class="ornament-line"></div><span class="ornament-mark">✦</span><div class="ornament-line rev"></div></div>

      <p class="family-line" style="margin-top:1.25rem">मान्यवर, परमपिता परमेश्वर की असीम कृपा से</p>

      <div class="couple-name shimmer-gold" style="font-size:clamp(1.8rem,7vw,2.6rem);margin-top:.8rem">आयु० रोहिनी सोनी</div>
      <p class="family-line small">(सुपुत्री : श्रीमती मीनू देवी एवं श्री विनोद प्रसाद)<br>शास्त्री नगर, ब्लॉक - 4, कदमा, जमशेदपुर</p>

      <div class="ampersand-wrap"><div class="ampersand-line"></div><span class="ampersand-text">संग</span><div class="ampersand-line"></div></div>

      <div class="couple-name shimmer-gold" style="font-size:clamp(1.8rem,7vw,2.6rem)">चि० रबि साव</div>
      <p class="family-line small">(सुपुत्र : श्रीमती शीला देवी साव एवं श्री नन्द किशोर साव)<br>शीवपुर हजरारा हावराह, वेस्ट बंगाल</p>

      <p class="family-line" style="margin-top:1.5rem">के पावन परिणय की मांगलिक बेला में पधार कर वर-वधू को अपना स्नेहाशीष प्रदान कर हमें अनुगृहीत करने की कृपा करें।</p>
      <p class="family-line small" style="margin-top:1rem;font-style:italic">मेरी बुआ की शादी में जलुल से जलुल आना : रूशु</p>
    </div>
  </section>

  <!-- SAVE THE DATE -->
  <section id="scratch-reveal-section" class="sec">
    <div class="deco-clip"><div class="mandala"></div></div>
    <div class="reveal">
      <div class="ornament"><div class="ornament-line"></div><span class="ornament-mark">❀</span><div class="ornament-line rev"></div></div>
      <h2 class="section-title shimmer-gold">सेव द डेट</h2>
      <p class="section-sub">स्क्रैच द हार्ट्स टू रिवील</p>
    </div>
    <div class="hearts-row reveal reveal-delay-1">
      <div class="heart-wrap"><div class="heart-container"><div class="hidden-content"><span class="value">09</span></div><canvas class="scratch-canvas"></canvas></div></div>
      <div class="heart-wrap"><div class="heart-container"><div class="hidden-content"><span class="value">दिसम्बर</span></div><canvas class="scratch-canvas"></canvas></div></div>
      <div class="heart-wrap"><div class="heart-container"><div class="hidden-content"><span class="value">2026</span></div><canvas class="scratch-canvas"></canvas></div></div>
    </div>
    <p class="surprise-message" id="surprise-message">एक खूबसूरत सफ़र की शुरुआत…</p>
    <div class="countdown-container" id="countdown">
      <div class="cd-item"><span id="cd-days">00</span><small>दिन</small></div>
      <div class="cd-item"><span id="cd-hours">00</span><small>घंटे</small></div>
      <div class="cd-item"><span id="cd-mins">00</span><small>मिनट</small></div>
      <div class="cd-item"><span id="cd-secs">00</span><small>सेकंड</small></div>
    </div>
  </section>

  <!-- EVENTS -->
  <section id="events-section" class="sec">
    <div class="toran"></div>
    <div class="events-head reveal">
      <div class="ornament"><div class="ornament-line"></div><span class="ornament-mark">❀</span><div class="ornament-line rev"></div></div>
      <h2 class="section-title shimmer-gold">वैवाहिक कार्यक्रम</h2>
    </div>
    <div class="event-block reveal">
      <div class="event-body">
        <p class="event-subtitle">02 दिसम्बर 2026 (बुधवार)</p>
        <h3 class="event-title shimmer-gold">तिलकोत्सव एवं धनवटी</h3>
        <div class="event-info-box">
          <div class="info-row loc"><span class="ico">📍</span><span><b>स्थान:</b> शीवपुर हजरारा हावराह, वेस्ट बंगाल</span></div>
        </div>
      </div>
      <div class="event-media"><div class="event-img-wrap"><img src="images/ghudchadi.webp" alt="तिलकोत्सव एवं धनवटी" loading="lazy"></div></div>
    </div>

    <div class="event-sep"><div class="event-sep-line"></div><div class="event-sep-dot"></div><div class="event-sep-line"></div></div>

    <div class="event-block reveal alt">
      <div class="event-body">
        <p class="event-subtitle">07 दिसम्बर 2026 (सोमवार)</p>
        <h3 class="event-title shimmer-gold">मटकोड़, हल्दीकलश एवं मण्डपाच्छादन</h3>
        <div class="event-info-box">
          <div class="info-row loc"><span class="ico">📍</span><span><b>स्थान:</b> हाउस नं. 22, रोड नं. - 1, शास्त्री नगर, ब्लॉक - 4, कदमा, जमशेदपुर</span></div>
        </div>
      </div>
      <div class="event-media"><div class="event-img-wrap"><img src="images/haldi.webp" alt="मटकोड़, हल्दीकलश एवं मण्डपाच्छादन" loading="lazy"></div></div>
    </div>

    <div class="event-sep"><div class="event-sep-line"></div><div class="event-sep-dot"></div><div class="event-sep-line"></div></div>

    <div class="event-block reveal">
      <div class="event-body">
        <p class="event-subtitle">08 दिसम्बर 2026 (मंगलवार)</p>
        <h3 class="event-title shimmer-gold">देवपूजन, धृतढ़ारी, मेहंदी एवं संगीत</h3>
        <div class="event-info-box">
          <div class="info-row loc"><span class="ico">📍</span><span><b>स्थान:</b> हाउस नं. 22, रोड नं. - 1, शास्त्री नगर, ब्लॉक - 4, कदमा, जमशेदपुर</span></div>
        </div>
      </div>
      <div class="event-media"><div class="event-img-wrap"><img src="images/mehndi_sangeet.webp" alt="देवपूजन, धृतढ़ारी, मेहंदी एवं संगीत" loading="lazy"></div></div>
    </div>

    <div class="event-sep"><div class="event-sep-line"></div><div class="event-sep-dot"></div><div class="event-sep-line"></div></div>

    <div class="event-block reveal alt" style="margin-bottom:0">
      <div class="event-body">
        <p class="event-subtitle">09 दिसम्बर 2026 (बुधवार)</p>
        <h3 class="event-title shimmer-gold">शुभविवाह एवं प्रीतिभोज</h3>
        <div class="event-info-box">
          <div class="info-row time"><span class="ico">🍽️</span><span><b>प्रीतिभोज:</b> संध्या 7:00 बजे से</span></div>
          <div class="info-row loc"><span class="ico">📍</span><span><b>विवाह एवं प्रीतिभोज स्थल:</b> शहीद निर्मल महतो मैदान, नियर सोनारी एयरपोर्ट, कदमा, जमशेदपुर</span></div>
        </div>
      </div>
      <div class="event-media"><div class="event-img-wrap"><img src="images/wedding_noface.webp" alt="शुभविवाह एवं प्रीतिभोज" loading="lazy"></div></div>
    </div>

  </section>

  <!-- VENUE -->
  <section id="venue-section" class="sec">
    <div class="deco-clip"><div class="mandala"></div></div>
    <div class="venue-head reveal">
      <div class="ornament"><div class="ornament-line"></div><span class="ornament-mark">❀</span><div class="ornament-line rev"></div></div>
      <h2 class="section-title shimmer-gold">विवाह एवं प्रीतिभोज स्थल</h2>
    </div>
    <div class="venue-card reveal reveal-delay-1">
      <img class="venue-img" src="images/venue_image_2.webp" alt="शहीद निर्मल महतो मैदान, कदमा, जमशेदपुर" loading="lazy">
      <div class="venue-info">
        <h3 class="venue-name shimmer-gold">शहीद निर्मल महतो मैदान</h3>
        <p class="family-line small" style="margin-bottom:.75rem">नियर सोनारी एयरपोर्ट, कदमा, जमशेदपुर</p>
        <a class="directions-btn" href="https://www.google.com/maps/search/?api=1&query=Shaheed+Nirmal+Mahato+Maidan+Sonari+Airport+Kadma+Jamshedpur" target="_blank" rel="noopener">स्थान देखें</a>
      </div>
    </div>
  </section>

  <!-- RSVP -->
  <section id="rsvp-section" class="sec">
    <div class="toran"></div>
    <div class="rsvp-wrap">
      <div class="rsvp-head reveal">
        <div class="ornament"><div class="ornament-line"></div><span class="ornament-mark">❀</span><div class="ornament-line rev"></div></div>
        <p class="l1" style="margin-top:.8rem">इस शुभ अवसर पर सादर आमंत्रण</p>
        <h2 class="l2 shimmer-gold">हमारे साथ खुशियाँ मनाएँ</h2>
        <p class="l3">शुभ विवाह से पहले कुछ मज़ेदार सवाल!</p>
      </div>
      <form id="rsvp-form" autocomplete="off">
        <div class="form-card reveal">
          <div class="form-card-title">पूरा नाम</div>
          <input class="field-input" type="text" name="name" required>
        </div>
        <div class="form-card reveal">
          <div class="form-card-title">फ़ोन नंबर</div>
          <input class="field-input" type="tel" name="phone" inputmode="tel" required>
        </div>
        <div class="form-card reveal">
          <div class="form-card-title">शादी में आपका मूड</div>
          <div class="mood-grid">
            <label class="mood-opt"><input type="radio" name="wedding_mood" value="खाने के लिए 🍛" required>खाने के लिए 🍛</label>
            <label class="mood-opt"><input type="radio" name="wedding_mood" value="डांस के लिए 💃">डांस के लिए 💃</label>
            <label class="mood-opt"><input type="radio" name="wedding_mood" value="प्यार के लिए ❤️">प्यार के लिए ❤️</label>
            <label class="mood-opt"><input type="radio" name="wedding_mood" value="सबके लिए ✨">सबके लिए ✨</label>
          </div>
        </div>
        <div class="form-card reveal">
          <div class="form-card-title">दिल से एक संदेश 💍</div>
          <textarea class="field-input" name="couple_advice" rows="3"></textarea>
        </div>
        <button class="submit-btn" type="submit" id="submit-btn">प्यार भेजें ❤️</button>
      </form>
    </div>
  </section>

  <!-- FOOTER -->
  <footer id="footer-section" class="sec">
    <div class="deco-clip"><div class="mandala"></div></div>
    <div class="ornament"><div class="ornament-line"></div><span class="ornament-mark">❀</span><div class="ornament-line rev"></div></div>
    <h3>दर्शनाभिलाषी</h3>
    <p>श्री अरुन प्रसाद, श्री मनोज सोनी, श्री लख्खी सोनी, विशाल सोनी, अमित सोनी, मोहिनी सोनी, सुमित सोनी, आयुष सोनी, सिमरन सोनी, अन्शु सोनी</p>
    <div class="footer-divider">♥</div>
    <div class="footer-sign"><span>विनीत</span><span class="shimmer-gold">श्री विनोद प्रसाद</span><span style="font-size:.85rem;margin-top:.25rem">मो. 9204241308, 8340642400</span></div>
  </footer>
</main>

<div id="rsvp-modal" role="dialog" aria-modal="true">
  <div class="modal-card">
    <h4>धन्यवाद! ❤️</h4>
    <p>आपका संदेश हम तक पहुँच गया है। हम आपका इंतज़ार करेंगे।</p>
    <button type="button" id="modal-close">ठीक है</button>
  </div>
</div>
`;

export default function App() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const WEDDING_DATE = new Date("2026-12-09T19:00:00+05:30").getTime();
    const GOOGLE_SHEET_URL =
      "https://script.google.com/macros/s/AKfycbxyPKLRYZ4nVZX_EBjN1Q0J3rt4LodzREEY7lRa2WEH08od3_7iiuzUwVBJoCAx1DuX/exec";

    const confCanvas = document.getElementById("confetti-canvas");
    const cf =
      window.confetti && window.confetti.create
        ? window.confetti.create(confCanvas, { resize: true, useWorker: false })
        : function () {};

    const gate = document.getElementById("entry-gate");
    const entryCard = document.getElementById("entry-card");
    const cardSheen = document.getElementById("card-sheen");
    const sealHotspot = document.getElementById("seal-hotspot");
    const ctaText = document.getElementById("cta-text");
    const gateFlash = document.getElementById("gate-flash");
    const gateFxCanvas = document.getElementById("gate-fx-canvas");
    const entryVideo = document.getElementById("entry-video");
    const audio = document.getElementById("bg-audio");
    const audioBtn = document.getElementById("audio-btn");
    const iconOn = document.getElementById("icon-on");
    const iconOff = document.getElementById("icon-off");
    const main = document.getElementById("main-content");
    const petalsCanvas = document.getElementById("petals-canvas");
    const scrollCue = document.getElementById("scroll-cue");

    let opened = false;
    let started = false;
    let startedAt = 0;

    /* ---------- PRIME VIDEO FRAME 0 ---------- */
    if (entryVideo) {
      entryVideo.muted = true;
      const prime = function () {
        if (!started && entryVideo.currentTime === 0) {
          try {
            entryVideo.currentTime = 0.001;
          } catch (_) {}
        }
      };
      if (entryVideo.readyState >= 1) prime();
      else entryVideo.addEventListener("loadedmetadata", prime, { once: true });
    }

    /* ---------- GATE INTERACTIVE SPARKLES + 3D TILT ---------- */
    const GateFX = (function () {
      if (!gateFxCanvas) return { burst: function () {}, stop: function () {} };
      const ctx = gateFxCanvas.getContext("2d");
      const reduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let w = 0,
        h = 0,
        dpr = 1,
        active = !reduced;
      const ambient = [];
      const sparks = [];
      const palette = ["#FFE8A3", "#F5B942", "#FFFDF5", "#F0CF8E", "#F7A8B8"];

      let targetRX = 0,
        targetRY = 0,
        curRX = 0,
        curRY = 0;

      function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = window.innerWidth;
        h = window.innerHeight;
        gateFxCanvas.width = Math.round(w * dpr);
        gateFxCanvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      resize();
      window.addEventListener("resize", resize);

      for (let i = 0; i < 32; i++) {
        ambient.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1.2 + Math.random() * 2.4,
          vy: -(10 + Math.random() * 22),
          vx: (Math.random() - 0.5) * 12,
          phase: Math.random() * Math.PI * 2,
          color: palette[(Math.random() * palette.length) | 0],
          star: Math.random() > 0.55,
        });
      }

      function addSpark(x, y, speedMul) {
        if (sparks.length > 130) return;
        const ang = Math.random() * Math.PI * 2;
        const spd = (25 + Math.random() * 95) * (speedMul || 1);
        sparks.push({
          x: x,
          y: y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 18,
          life: 0,
          max: 0.55 + Math.random() * 0.55,
          size: 2 + Math.random() * 3.8,
          color: palette[(Math.random() * palette.length) | 0],
        });
      }

      function burst(x, y) {
        for (let i = 0; i < 46; i++) addSpark(x, y, 1.85);
      }

      function drawStar(cx, cy, r, color, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.translate(cx, cy);
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(0, -r * 2.1);
          ctx.lineTo(r * 0.48, -r * 0.48);
          ctx.rotate(Math.PI / 2);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      let lastMove = 0;
      gate.addEventListener("pointermove", function (e) {
        if (opened) return;
        const now = performance.now();
        if (now - lastMove > 22) {
          lastMove = now;
          addSpark(e.clientX, e.clientY, 0.55);
        }

        if (!started && entryCard) {
          const rect = entryCard.getBoundingClientRect();
          const nx = Math.max(
            -1,
            Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2)
          );
          const ny = Math.max(
            -1,
            Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2)
          );
          if (window.innerWidth >= 700) {
            targetRY = nx * 7.5;
            targetRX = -ny * 6.5;
          }
          if (cardSheen) {
            cardSheen.style.setProperty(
              "--sx",
              Math.round(((nx + 1) / 2) * 100) + "%"
            );
            cardSheen.style.setProperty(
              "--sy",
              Math.round(((ny + 1) / 2) * 100) + "%"
            );
          }

          if (sealHotspot) {
            const sr = sealHotspot.getBoundingClientRect();
            const sx = sr.left + sr.width / 2;
            const sy = sr.top + sr.height / 2;
            const dist = Math.hypot(e.clientX - sx, e.clientY - sy);
            const isNear = dist < sr.width * 0.85;
            sealHotspot.classList.toggle("near", isNear);
            if (ctaText) {
              ctaText.textContent = isNear
                ? "🔓 अभी क्लिक करें — आमंत्रण खोलें!"
                : "मुहर पर टैप करें — आमंत्रण खोलें";
            }
            if (isNear && Math.random() > 0.45) {
              const a = Math.random() * Math.PI * 2;
              addSpark(
                sx + (Math.cos(a) * sr.width) / 2,
                sy + (Math.sin(a) * sr.height) / 2,
                0.7
              );
            }
          }
        }
      });

      gate.addEventListener("pointerleave", function () {
        targetRX = 0;
        targetRY = 0;
        if (sealHotspot) sealHotspot.classList.remove("near");
        if (ctaText) ctaText.textContent = "मुहर पर टैप करें — आमंत्रण खोलें";
      });

      let last = performance.now();
      function loop(t) {
        if (!active) return;
        const dt = Math.min((t - last) / 1000, 0.05);
        last = t;
        ctx.clearRect(0, 0, w, h);

        if (started) {
          targetRX = 0;
          targetRY = 0;
        }
        curRX += (targetRX - curRX) * 0.12;
        curRY += (targetRY - curRY) * 0.12;
        if (entryCard && (Math.abs(curRX) > 0.02 || Math.abs(curRY) > 0.02)) {
          entryCard.style.transform =
            "rotateX(" +
            curRX.toFixed(2) +
            "deg) rotateY(" +
            curRY.toFixed(2) +
            "deg)";
        } else if (entryCard && started) {
          entryCard.style.transform = "none";
        }

        for (let i = 0; i < ambient.length; i++) {
          const p = ambient[i];
          p.y += p.vy * dt;
          p.x += p.vx * dt + Math.sin(p.phase + t * 0.0015) * 0.25;
          if (p.y < -12) {
            p.y = h + 12;
            p.x = Math.random() * w;
          }
          const tw = 0.35 + 0.55 * Math.abs(Math.sin(p.phase + t * 0.0024));
          if (p.star) {
            drawStar(p.x, p.y, p.r, p.color, tw);
          } else {
            ctx.save();
            ctx.globalAlpha = tw;
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }

        for (let j = sparks.length - 1; j >= 0; j--) {
          const s = sparks[j];
          s.life += dt;
          if (s.life >= s.max) {
            sparks.splice(j, 1);
            continue;
          }
          s.vy += 90 * dt;
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          const al = 1 - s.life / s.max;
          drawStar(s.x, s.y, s.size * al, s.color, al);
        }

        requestAnimationFrame(loop);
      }
      if (active) requestAnimationFrame(loop);

      return {
        burst: burst,
        stop: function () {
          active = false;
          window.removeEventListener("resize", resize);
        },
      };
    })();

    /* ---------- ENTRY GATE OPEN & VIDEO REVEAL ---------- */
    function setAudioIcon(playing) {
      iconOn.style.display = playing ? "" : "none";
      iconOff.style.display = playing ? "none" : "";
    }

    function openInvite() {
      if (opened) return;
      opened = true;
      GateFX.stop();
      if (gateFlash) gateFlash.classList.add("bloom");
      if (audio.paused) {
        audio.volume = 0.6;
        const p = audio.play();
        if (p && p.then)
          p.then(function () {
            setAudioIcon(true);
          }).catch(function () {
            setAudioIcon(false);
          });
      } else {
        setAudioIcon(true);
      }
      audioBtn.classList.add("show");
      main.classList.add("show");
      document.body.classList.remove("locked");
      window.scrollTo(0, 0);
      if (scrollCue) {
        setTimeout(function () {
          if (window.scrollY < 90) scrollCue.classList.add("visible");
        }, 350);
      }
      gate.classList.add("hide");
      setTimeout(function () {
        gate.style.display = "none";
      }, 900);
      petalsCanvas.classList.add("active");
      Petals.start();
      ConfettiRain.start();
      observeReveals();
    }

    function startEnvelope(e) {
      if (opened) return;
      if (started) {
        if (Date.now() - startedAt > 1200) openInvite();
        return;
      }
      started = true;
      startedAt = Date.now();
      gate.classList.add("playing");

      let bx = window.innerWidth / 2;
      let by = window.innerHeight * 0.45;
      if (sealHotspot) {
        const sr = sealHotspot.getBoundingClientRect();
        bx = sr.left + sr.width / 2;
        by = sr.top + sr.height / 2;
      } else if (e && e.clientX) {
        bx = e.clientX;
        by = e.clientY;
      }
      GateFX.burst(bx, by);

      audio.volume = 0.6;
      const ap = audio.play();
      if (ap && ap.then)
        ap.then(function () {
          setAudioIcon(true);
        }).catch(function () {
          setAudioIcon(false);
        });

      if (entryVideo) {
        try {
          entryVideo.currentTime = 0;
        } catch (_) {}
        const onTime = function () {
          if (
            entryVideo.duration &&
            entryVideo.currentTime >= entryVideo.duration - 0.35
          ) {
            entryVideo.removeEventListener("timeupdate", onTime);
            openInvite();
          }
        };
        entryVideo.addEventListener("timeupdate", onTime);
        entryVideo.addEventListener("ended", openInvite, { once: true });
        const vp = entryVideo.play();
        if (vp && vp.catch) {
          vp.catch(function () {
            setTimeout(openInvite, 650);
          });
        }
        setTimeout(openInvite, 6500);
      } else {
        setTimeout(openInvite, 700);
      }
    }
    gate.addEventListener("click", startEnvelope);

    audioBtn.addEventListener("click", function () {
      if (audio.paused) {
        audio.play();
        setAudioIcon(true);
      } else {
        audio.pause();
        setAudioIcon(false);
      }
    });

    if (scrollCue) {
      scrollCue.addEventListener("click", function () {
        const fam = document.getElementById("family-section");
        if (fam) fam.scrollIntoView({ behavior: "smooth" });
      });
      window.addEventListener(
        "scroll",
        function () {
          if (!opened) return;
          scrollCue.classList.toggle("visible", window.scrollY < 90);
        },
        { passive: true }
      );
    }

    /* ---------- SCROLL REVEAL ---------- */
    function observeReveals() {
      const els = document.querySelectorAll(".reveal");
      if (!("IntersectionObserver" in window)) {
        els.forEach(function (e) {
          e.classList.add("revealed");
        });
        return;
      }
      const io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add("revealed");
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      els.forEach(function (e) {
        io.observe(e);
      });
    }

    /* ---------- PETALS (lightweight, max 18) ---------- */
    const Petals = (function () {
      const canvas = petalsCanvas,
        ctx = canvas.getContext("2d");
      const MAX = 18;
      let petals = [],
        sprites = [],
        running = false,
        last = 0,
        w = 0,
        h = 0,
        dpr = 1;
      const colors = [
        "#F5C2C7",
        "#F9D6DA",
        "#F0CF8E",
        "#F7B733",
        "#E58C9B",
        "#FCEFCF",
      ];

      function makeSprite(color) {
        const s = 40,
          c = document.createElement("canvas");
        c.width = s;
        c.height = s;
        const g = c.getContext("2d");
        g.translate(s / 2, s / 2);
        const grad = g.createLinearGradient(0, -16, 0, 16);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "rgba(255,255,255,0.75)");
        g.fillStyle = grad;
        g.globalAlpha = 0.9;
        g.beginPath();
        g.moveTo(0, -16);
        g.bezierCurveTo(12, -10, 12, 8, 0, 16);
        g.bezierCurveTo(-12, 8, -12, -10, 0, -16);
        g.fill();
        return c;
      }
      colors.forEach(function (c) {
        sprites.push(makeSprite(c));
      });

      function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      function spawn(initial) {
        return {
          x: Math.random() * w,
          y: initial ? Math.random() * h : -30,
          size: 10 + Math.random() * 10,
          vy: 12 + Math.random() * 16,
          sway: 14 + Math.random() * 22,
          swaySpeed: 0.4 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.9,
          sprite: sprites[(Math.random() * sprites.length) | 0],
          alpha: 0.55 + Math.random() * 0.35,
        };
      }
      function frame(t) {
        if (!running) return;
        const dt = Math.min((t - last) / 1000, 0.05);
        last = t;
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < petals.length; i++) {
          let p = petals[i];
          p.y += p.vy * dt;
          p.phase += p.swaySpeed * dt;
          p.rot += p.rotSpeed * dt;
          const x = p.x + Math.sin(p.phase) * p.sway;
          if (p.y > h + 30) {
            petals[i] = p = spawn(false);
            p.y = -30;
          }
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(x, p.y);
          ctx.rotate(p.rot);
          ctx.scale(1, 0.55 + 0.45 * Math.abs(Math.sin(p.phase * 0.8)));
          ctx.drawImage(p.sprite, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
        requestAnimationFrame(frame);
      }
      function start() {
        if (running) return;
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        resize();
        petals = [];
        for (let i = 0; i < MAX; i++) petals.push(spawn(true));
        running = true;
        last = performance.now();
        requestAnimationFrame(frame);
      }
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
          running = false;
        } else if (opened && !running) {
          running = true;
          last = performance.now();
          requestAnimationFrame(frame);
        }
      });
      let rt;
      window.addEventListener("resize", function () {
        clearTimeout(rt);
        rt = setTimeout(function () {
          if (opened) resize();
        }, 200);
      });
      return { start: start };
    })();

    /* ---------- CONFETTI RAIN ---------- */
    const ConfettiRain = (function () {
      let timer = null,
        t0 = 0;
      const cols = [
        "#C9963E",
        "#F0CF8E",
        "#F5A623",
        "#E58C9B",
        "#F9C6CC",
        "#FFFFFF",
      ];
      function drop() {
        const wide = window.innerWidth > 900;
        const heavy = Date.now() - t0 < 5000;
        const n = (heavy ? 3 : 1) * (wide ? 2 : 1);
        for (let i = 0; i < n; i++) {
          cf({
            particleCount: 1,
            angle: 270,
            spread: 30,
            startVelocity: 4 + Math.random() * 5,
            gravity: 0.45 + Math.random() * 0.25,
            decay: 0.96,
            drift: (Math.random() - 0.5) * 1.4,
            ticks: 520,
            scalar: 0.7 + Math.random() * 0.5,
            origin: { x: Math.random(), y: -0.05 },
            colors: cols,
            disableForReducedMotion: true,
          });
        }
      }
      function start() {
        if (timer) return;
        t0 = Date.now();
        timer = setInterval(drop, 130);
      }
      function stop() {
        clearInterval(timer);
        timer = null;
      }
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stop();
        else if (opened) start();
      });
      return { start: start, stop: stop };
    })();

    /* ---------- SCRATCH HEARTS ---------- */
    let revealedCount = 0;
    const containers = document.querySelectorAll(".heart-container");

    function initScratch(container) {
      const canvas = container.querySelector(".scratch-canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      let done = false,
        drawing = false,
        lastPt = null,
        moves = 0;
      let W, H;

      function paint() {
        const rect = container.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = Math.max(1, Math.round(rect.width * dpr));
        H = Math.max(1, Math.round(rect.height * dpr));
        canvas.width = W;
        canvas.height = H;
        const g = ctx.createLinearGradient(0, 0, W, H);
        g.addColorStop(0, "#F0CF8E");
        g.addColorStop(0.5, "#C9963E");
        g.addColorStop(1, "#F0CF8E");
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.font = "bold " + Math.round(W * 0.16) + "px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("✦ ✦ ✦", W / 2, H * 0.45);
      }
      paint();

      function pos(e) {
        const r = canvas.getBoundingClientRect();
        return {
          x: (e.clientX - r.left) * (W / r.width),
          y: (e.clientY - r.top) * (H / r.height),
        };
      }
      function scratchTo(pt) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = W * 0.2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        if (lastPt) {
          ctx.moveTo(lastPt.x, lastPt.y);
          ctx.lineTo(pt.x, pt.y);
        } else {
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(pt.x + 0.1, pt.y + 0.1);
        }
        ctx.stroke();
        lastPt = pt;
      }
      function checkCleared() {
        if (done) return;
        const data = ctx.getImageData(0, 0, W, H).data;
        let total = 0,
          clear = 0;
        for (let i = 3; i < data.length; i += 64) {
          total++;
          if (data[i] < 20) clear++;
        }
        if (clear / total > 0.42) finish();
      }
      function finish() {
        if (done) return;
        done = true;
        canvas.classList.add("done");
        container.classList.add("done");
        if (container.parentNode) container.parentNode.classList.add("done");
        revealedCount++;
        if (revealedCount === containers.length) onAllRevealed();
      }
      canvas.addEventListener("pointerdown", function (e) {
        if (done) return;
        drawing = true;
        lastPt = null;
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch (_) {}
        scratchTo(pos(e));
        e.preventDefault();
      });
      canvas.addEventListener("pointermove", function (e) {
        if (!drawing || done) return;
        scratchTo(pos(e));
        if (++moves % 6 === 0) checkCleared();
        e.preventDefault();
      });
      function end() {
        if (!drawing) return;
        drawing = false;
        lastPt = null;
        checkCleared();
      }
      canvas.addEventListener("pointerup", end);
      canvas.addEventListener("pointercancel", end);
      canvas.addEventListener("pointerleave", end);
    }
    containers.forEach(initScratch);

    /* ---------- ALL REVEALED ---------- */
    function onAllRevealed() {
      document.getElementById("surprise-message").classList.add("revealed");
      document.getElementById("countdown").classList.add("revealed");
      const gold = ["#C9963E", "#F0CF8E", "#FCEFCF", "#F5A623", "#E58C9B"];
      cf({ particleCount: 110, spread: 80, origin: { y: 0.6 }, colors: gold });
      setTimeout(function () {
        cf({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.7 },
          colors: gold,
        });
      }, 250);
      setTimeout(function () {
        cf({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.7 },
          colors: gold,
        });
      }, 400);
    }

    const cd = {
      d: document.getElementById("cd-days"),
      h: document.getElementById("cd-hours"),
      m: document.getElementById("cd-mins"),
      s: document.getElementById("cd-secs"),
    };
    function pad(n) {
      return String(n).padStart(2, "0");
    }
    function tick() {
      const diff = Math.max(0, WEDDING_DATE - Date.now());
      const s = Math.floor(diff / 1000);
      cd.d.textContent = pad(Math.floor(s / 86400));
      cd.h.textContent = pad(Math.floor((s % 86400) / 3600));
      cd.m.textContent = pad(Math.floor((s % 3600) / 60));
      const sec = pad(s % 60);
      if (cd.s.textContent !== sec) {
        cd.s.textContent = sec;
        cd.s.classList.remove("bump");
        void cd.s.offsetWidth;
        cd.s.classList.add("bump");
      }
    }
    tick();
    setInterval(tick, 1000);

    /* ---------- RSVP ---------- */
    const form = document.getElementById("rsvp-form");
    const modal = document.getElementById("rsvp-modal");
    const submitBtn = document.getElementById("submit-btn");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const defaultBtnText = "प्यार भेजें ❤️";
      submitBtn.disabled = true;
      submitBtn.textContent = "भेजा जा रहा है...";

      fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body: new FormData(form),
        mode: "no-cors",
      })
        .then(function () {
          modal.classList.add("open");
          form.reset();
          cf({
            particleCount: 70,
            spread: 70,
            origin: { y: 0.7 },
            colors: ["#C9963E", "#F0CF8E", "#E58C9B"],
          });
        })
        .catch(function (err) {
          console.error("RSVP submit error:", err);
          alert("कुछ गड़बड़ हो गई। कृपया दोबारा प्रयास करें।");
        })
        .then(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = defaultBtnText;
        });
    });
    document
      .getElementById("modal-close")
      .addEventListener("click", function () {
        modal.classList.remove("open");
      });
    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.classList.remove("open");
    });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />;
}
