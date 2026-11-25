import { useEffect, useRef } from "react";

const BODY_HTML = `
<!-- ENTRY GATE -->
<div class="entry-video-container" id="entry-gate">
  <video id="entry-video" src="media/reveal1.mp4" playsinline muted preload="auto" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .4s ease;pointer-events:none;z-index:5"></video>
  <div class="gate-mandala"></div>
  <div class="env-card">
    <span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>
    <div class="env-flap"></div>
    <div class="wax-seal"><span class="wax-seal-monogram">R &amp; R</span></div>
    <div class="env-body-text">
      <div class="env-ornament">— ✦ —</div>
      <h1 class="env-shubh">शुभ विवाह</h1>
      <div class="env-ornament">— ❀ —</div>
      <p class="env-names">रोहिनी एवं रबि</p>
    </div>
    <div class="tap-hint" id="tap-hint">▶ आमंत्रण खोलने के लिए टैप करें</div>
  </div>
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
    <div class="scroll-cue">
      <p>Scroll</p>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
    </div>
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
    const fn = new Function("(function(){\n  'use strict';\n\n  /* ---------- CONFIG ---------- */\n  var WEDDING_DATE = new Date('2026-12-09T19:00:00+05:30').getTime();\n  const GOOGLE_SHEET_URL = \"https://script.google.com/macros/s/AKfycbwVx7LZdmT_uR6wMEiU2MUlZAFM0EcGDTPlT1J2QkMdGKNS2dOAxUeIBhSRTqR2wyYU/exec\";\n\n  var confCanvas = document.getElementById('confetti-canvas');\n  var cf = (window.confetti && window.confetti.create)\n    ? window.confetti.create(confCanvas, {resize:true, useWorker:false})\n    : function(){};\n\n  var gate = document.getElementById('entry-gate');\n    var audio = document.getElementById('bg-audio');\n  var audioBtn = document.getElementById('audio-btn');\n  var iconOn = document.getElementById('icon-on');\n  var iconOff = document.getElementById('icon-off');\n  var main = document.getElementById('main-content');\n  var petalsCanvas = document.getElementById('petals-canvas');\n  var opened = false;\n\n  /* ---------- ENTRY GATE ---------- */\n  function setAudioIcon(playing){\n    iconOn.style.display = playing ? '' : 'none';\n    iconOff.style.display = playing ? 'none' : '';\n  }\n  function openInvite(){\n    if (opened) return;\n    opened = true;\n    if (audio.paused){\n      audio.volume = 0.6;\n      var p = audio.play();\n      if (p && p.then) p.then(function(){ setAudioIcon(true); }).catch(function(){ setAudioIcon(false); });\n    } else {\n      setAudioIcon(true);\n    }\n    audioBtn.classList.add('show');\n    main.classList.add('show');\n    document.body.classList.remove('locked');\n    window.scrollTo(0,0);\n    gate.classList.add('hide');\n    setTimeout(function(){ gate.style.display = 'none';  }, 900);\n    petalsCanvas.classList.add('active');\n    Petals.start();\n    ConfettiRain.start();\n    observeReveals();\n  }\n\n  var started = false;\n  var entryVideo = document.getElementById('entry-video');\n  function startEnvelope(){\n    if (started) return;\n    started = true;\n    gate.classList.add('opening');\n    audio.volume = 0.6;\n    var ap = audio.play();\n    if (ap && ap.then) ap.then(function(){ setAudioIcon(true); }).catch(function(){ setAudioIcon(false); });\n    if (entryVideo){\n      entryVideo.style.opacity = '1';\n      var vp = entryVideo.play();\n      if (vp && vp.catch) vp.catch(function(){});\n      entryVideo.addEventListener('ended', openInvite, {once:true});\n      setTimeout(openInvite, 4000);\n    } else {\n      setTimeout(openInvite, 950);\n    }\n  }\n  gate.addEventListener('click', startEnvelope);\n\n  audioBtn.addEventListener('click', function(){\n    if (audio.paused){ audio.play(); setAudioIcon(true); }\n    else { audio.pause(); setAudioIcon(false); }\n  });\n\n  /* ---------- SCROLL REVEAL ---------- */\n  function observeReveals(){\n    var els = document.querySelectorAll('.reveal');\n    if (!('IntersectionObserver' in window)){ els.forEach(function(e){ e.classList.add('revealed'); }); return; }\n    var io = new IntersectionObserver(function(entries){\n      entries.forEach(function(en){\n        if (en.isIntersecting){ en.target.classList.add('revealed'); io.unobserve(en.target); }\n      });\n    }, {threshold:0.12});\n    els.forEach(function(e){ io.observe(e); });\n  }\n\n  /* ---------- PETALS (lightweight, max 18) ---------- */\n  var Petals = (function(){\n    var canvas = petalsCanvas, ctx = canvas.getContext('2d');\n    var MAX = 18, petals = [], sprites = [], running = false, last = 0, w = 0, h = 0, dpr = 1;\n    var colors = ['#F5C2C7','#F9D6DA','#F0CF8E','#F7B733','#E58C9B','#FCEFCF'];\n\n    function makeSprite(color){\n      var s = 40, c = document.createElement('canvas');\n      c.width = s; c.height = s;\n      var g = c.getContext('2d');\n      g.translate(s/2, s/2);\n      var grad = g.createLinearGradient(0,-16,0,16);\n      grad.addColorStop(0, color);\n      grad.addColorStop(1, 'rgba(255,255,255,0.75)');\n      g.fillStyle = grad;\n      g.globalAlpha = 0.9;\n      g.beginPath();\n      g.moveTo(0,-16);\n      g.bezierCurveTo(12,-10,12,8,0,16);\n      g.bezierCurveTo(-12,8,-12,-10,0,-16);\n      g.fill();\n      return c;\n    }\n    colors.forEach(function(c){ sprites.push(makeSprite(c)); });\n\n    function resize(){\n      dpr = Math.min(window.devicePixelRatio || 1, 2);\n      w = canvas.clientWidth; h = canvas.clientHeight;\n      canvas.width = Math.round(w*dpr); canvas.height = Math.round(h*dpr);\n      ctx.setTransform(dpr,0,0,dpr,0,0);\n    }\n    function spawn(initial){\n      return {\n        x: Math.random()*w,\n        y: initial ? Math.random()*h : -30,\n        size: 10 + Math.random()*10,\n        vy: 12 + Math.random()*16,\n        sway: 14 + Math.random()*22,\n        swaySpeed: 0.4 + Math.random()*0.5,\n        phase: Math.random()*Math.PI*2,\n        rot: Math.random()*Math.PI*2,\n        rotSpeed: (Math.random()-0.5)*0.9,\n        sprite: sprites[(Math.random()*sprites.length)|0],\n        alpha: 0.55 + Math.random()*0.35\n      };\n    }\n    function frame(t){\n      if (!running) return;\n      var dt = Math.min((t-last)/1000, 0.05); last = t;\n      ctx.clearRect(0,0,w,h);\n      for (var i=0;i<petals.length;i++){\n        var p = petals[i];\n        p.y += p.vy*dt;\n        p.phase += p.swaySpeed*dt;\n        p.rot += p.rotSpeed*dt;\n        var x = p.x + Math.sin(p.phase)*p.sway;\n        if (p.y > h+30){ petals[i] = p = spawn(false); p.y = -30; }\n        ctx.save();\n        ctx.globalAlpha = p.alpha;\n        ctx.translate(x, p.y);\n        ctx.rotate(p.rot);\n        ctx.scale(1, 0.55 + 0.45*Math.abs(Math.sin(p.phase*0.8)));\n        ctx.drawImage(p.sprite, -p.size/2, -p.size/2, p.size, p.size);\n        ctx.restore();\n      }\n      requestAnimationFrame(frame);\n    }\n    function start(){\n      if (running) return;\n      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;\n      resize();\n      petals = [];\n      for (var i=0;i<MAX;i++) petals.push(spawn(true));\n      running = true; last = performance.now();\n      requestAnimationFrame(frame);\n    }\n    document.addEventListener('visibilitychange', function(){\n      if (document.hidden){ running = false; }\n      else if (opened && !running){ running = true; last = performance.now(); requestAnimationFrame(frame); }\n    });\n    var rt; window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(function(){ if(opened) resize(); }, 200); });\n    return {start:start};\n  })();\n\n  /* ---------- CONFETTI RAIN (from the very start, from the top) ---------- */\n  var ConfettiRain = (function(){\n    var timer = null, t0 = 0;\n    var cols = ['#C9963E','#F0CF8E','#F5A623','#E58C9B','#F9C6CC','#FFFFFF'];\n    function drop(){\n      var wide = window.innerWidth > 900;\n      var heavy = Date.now() - t0 < 5000;\n      var n = (heavy ? 3 : 1) * (wide ? 2 : 1);\n      for (var i=0;i<n;i++){\n        cf({\n          particleCount:1, angle:270, spread:30,\n          startVelocity:4+Math.random()*5, gravity:0.45+Math.random()*0.25,\n          decay:0.96, drift:(Math.random()-0.5)*1.4, ticks:520,\n          scalar:0.7+Math.random()*0.5,\n          origin:{x:Math.random(), y:-0.05},\n          colors:cols, disableForReducedMotion:true\n        });\n      }\n    }\n    function start(){ if (timer) return; t0 = Date.now(); timer = setInterval(drop, 130); }\n    function stop(){ clearInterval(timer); timer = null; }\n    document.addEventListener('visibilitychange', function(){\n      if (document.hidden) stop(); else if (opened) start();\n    });\n    return {start:start, stop:stop};\n  })();\n\n  /* ---------- SCRATCH HEARTS ---------- */\n  var revealedCount = 0;\n  var containers = document.querySelectorAll('.heart-container');\n\n  function initScratch(container){\n    var canvas = container.querySelector('.scratch-canvas');\n    var ctx = canvas.getContext('2d', {willReadFrequently:true});\n    var done = false, drawing = false, lastPt = null, moves = 0;\n    var W, H;\n\n    function paint(){\n      var rect = container.getBoundingClientRect();\n      var dpr = Math.min(window.devicePixelRatio || 1, 2);\n      W = Math.max(1, Math.round(rect.width*dpr)); H = Math.max(1, Math.round(rect.height*dpr));\n      canvas.width = W; canvas.height = H;\n      var g = ctx.createLinearGradient(0,0,W,H);\n      g.addColorStop(0,'#F0CF8E'); g.addColorStop(0.5,'#C9963E'); g.addColorStop(1,'#F0CF8E');\n      ctx.globalCompositeOperation = 'source-over';\n      ctx.fillStyle = g; ctx.fillRect(0,0,W,H);\n      ctx.fillStyle = 'rgba(255,255,255,0.4)';\n      ctx.font = 'bold ' + Math.round(W*0.16) + 'px serif';\n      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';\n      ctx.fillText('✦ ✦ ✦', W/2, H*0.45);\n    }\n    paint();\n\n    function pos(e){\n      var r = canvas.getBoundingClientRect();\n      return { x:(e.clientX-r.left)*(W/r.width), y:(e.clientY-r.top)*(H/r.height) };\n    }\n    function scratchTo(pt){\n      ctx.globalCompositeOperation = 'destination-out';\n      ctx.lineWidth = W*0.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';\n      ctx.beginPath();\n      if (lastPt){ ctx.moveTo(lastPt.x,lastPt.y); ctx.lineTo(pt.x,pt.y); }\n      else { ctx.moveTo(pt.x,pt.y); ctx.lineTo(pt.x+0.1,pt.y+0.1); }\n      ctx.stroke();\n      lastPt = pt;\n    }\n    function checkCleared(){\n      if (done) return;\n      var data = ctx.getImageData(0,0,W,H).data, total = 0, clear = 0;\n      for (var i=3;i<data.length;i+=64){ total++; if (data[i] < 20) clear++; }\n      if (clear/total > 0.42) finish();\n    }\n    function finish(){\n      if (done) return;\n      done = true;\n      canvas.classList.add('done');\n      container.classList.add('done');\n      if (container.parentNode) container.parentNode.classList.add('done');\n      revealedCount++;\n      if (revealedCount === containers.length) onAllRevealed();\n    }\n    canvas.addEventListener('pointerdown', function(e){\n      if (done) return;\n      drawing = true; lastPt = null;\n      try{ canvas.setPointerCapture(e.pointerId); }catch(_){}\n      scratchTo(pos(e)); e.preventDefault();\n    });\n    canvas.addEventListener('pointermove', function(e){\n      if (!drawing || done) return;\n      scratchTo(pos(e));\n      if ((++moves % 6) === 0) checkCleared();\n      e.preventDefault();\n    });\n    function end(){ if (!drawing) return; drawing = false; lastPt = null; checkCleared(); }\n    canvas.addEventListener('pointerup', end);\n    canvas.addEventListener('pointercancel', end);\n    canvas.addEventListener('pointerleave', end);\n  }\n  containers.forEach(initScratch);\n\n  /* ---------- ALL REVEALED ---------- */\n  function onAllRevealed(){\n    document.getElementById('surprise-message').classList.add('revealed');\n    document.getElementById('countdown').classList.add('revealed');\n    var gold = ['#C9963E','#F0CF8E','#FCEFCF','#F5A623','#E58C9B'];\n    cf({particleCount:110, spread:80, origin:{y:0.6}, colors:gold});\n    setTimeout(function(){ cf({particleCount:60, angle:60, spread:60, origin:{x:0,y:0.7}, colors:gold}); }, 250);\n    setTimeout(function(){ cf({particleCount:60, angle:120, spread:60, origin:{x:1,y:0.7}, colors:gold}); }, 400);\n  }\n\n  var cd = {\n    d:document.getElementById('cd-days'), h:document.getElementById('cd-hours'),\n    m:document.getElementById('cd-mins'), s:document.getElementById('cd-secs')\n  };\n  function pad(n){ return String(n).padStart(2,'0'); }\n  function tick(){\n    var diff = Math.max(0, WEDDING_DATE - Date.now());\n    var s = Math.floor(diff/1000);\n    cd.d.textContent = pad(Math.floor(s/86400));\n    cd.h.textContent = pad(Math.floor((s%86400)/3600));\n    cd.m.textContent = pad(Math.floor((s%3600)/60));\n    var sec = pad(s%60);\n    if (cd.s.textContent !== sec){\n      cd.s.textContent = sec;\n      cd.s.classList.remove('bump'); void cd.s.offsetWidth; cd.s.classList.add('bump');\n    }\n  }\n  tick(); setInterval(tick, 1000);\n\n  /* ---------- RSVP ---------- */\n  var form = document.getElementById('rsvp-form');\n  var modal = document.getElementById('rsvp-modal');\n  var submitBtn = document.getElementById('submit-btn');\n  form.addEventListener('submit', function(e){\n    e.preventDefault();\n    if (!form.reportValidity()) return;\n\n    var defaultBtnText = 'प्यार भेजें ❤️';\n    submitBtn.disabled = true;\n    submitBtn.textContent = 'भेजा जा रहा है...';\n\n    fetch(GOOGLE_SHEET_URL, { method: \"POST\", body: new FormData(form), mode: \"no-cors\" })\n      .then(function(){\n        modal.classList.add('open');\n        form.reset();\n        cf({particleCount:70, spread:70, origin:{y:0.7}, colors:['#C9963E','#F0CF8E','#E58C9B']});\n      })\n      .catch(function(err){\n        console.error('RSVP submit error:', err);\n        alert('कुछ गड़बड़ हो गई। कृपया दोबारा प्रयास करें।');\n      })\n      .then(function(){\n        submitBtn.disabled = false;\n        submitBtn.textContent = defaultBtnText;\n      });\n  });\n  document.getElementById('modal-close').addEventListener('click', function(){ modal.classList.remove('open'); });\n  modal.addEventListener('click', function(e){ if (e.target === modal) modal.classList.remove('open'); });\n})();");
    fn();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />;
}
