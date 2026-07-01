/* ============================================================
   PREMIUM INTERACTIONS - SAKENW
   ============================================================ */

(function() {
  'use strict';

  // ---- Throttle helper ----
  function throttle(fn, limit) {
    let inThrottle = false;
    return function(...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => { inThrottle = false; }, limit);
      }
    };
  }

  // ---- Detect touch device ----
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // ---- DOM Ready ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initRevealAnimations();
    initScrollHeader();
    initCustomCursor();
    initMobileMenuPills();
    initChatAssistant();
    initFAQAccordion();
    initFindYourFit();
    initStickyAddToCart();
    initProgressBar();
    initSmartSearch();
    initQuickAdd();
    initCartRemoveFeatures();
    initInventoryBadges();
    initStyleQuiz();
    initCardAnimations();
    initSmoothScroll();
    initButtonEffects();
    initPageTransitions();
    initAnimatedCounters();
    initParallaxSections();
    initImageReveal();
    initBackToTop();
    initProductCarousels();
  }

  /* ============================================================
     1. SCROLL REVEAL ANIMATIONS
     ============================================================ */
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .section-entrance, .stagger-reveal');

    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /* ============================================================
     2. FLOATING NAVBAR SCROLL EFFECT
     ============================================================ */
  function initScrollHeader() {
    const header = document.querySelector('header-component');

    if (!header) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================================
      3. CUSTOM CURSOR (rAF-based, highest z-index)
       ============================================================ */
  function initCustomCursor() {
    if (isTouchDevice) return;

    // Fallback for browsers that don't support calc(infinity)
    var style = document.createElement('style');
    style.textContent = '.premium-cursor,.premium-cursor-dot{z-index:2147483647!important}';
    document.head.appendChild(style);

    var cursor = document.createElement('div');
    cursor.className = 'premium-cursor';
    document.body.appendChild(cursor);

    var dot = document.createElement('div');
    dot.className = 'premium-cursor-dot';
    document.body.appendChild(dot);

    var mx = -100, my = -100;
    var rafId = null;

    function move(e) {
      mx = e.clientX;
      my = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(function() {
          cursor.style.left = mx + 'px';
          cursor.style.top = my + 'px';
          dot.style.left = mx + 'px';
          dot.style.top = my + 'px';
          rafId = null;
        });
      }
    }

    document.addEventListener('mousemove', move, { passive: true });

    document.addEventListener('mouseover', function(e) {
      var tag = e.target.closest('a, button, .button, .product-card, input, textarea, select');
      cursor.classList.toggle('hover', !!tag);
      cursor.classList.toggle('premium-cursor--text', !!e.target.closest('input, textarea, select'));
    });
  }



  /* ============================================================
     4. MOBILE MENU PILL STYLES (injects into Shadow DOM + inline)
      ============================================================ */
  function initMobileMenuPills() {
    const pillCSS = '.menu-list__link-title{background:rgba(0,0,0,0.04)!important;border:0.5px solid rgba(0,0,0,0.06)!important;border-radius:100px!important;padding:6px 18px!important;font-size:0.875rem!important;backdrop-filter:blur(8px)!important;transition:all 0.25s cubic-bezier(0.22,0.61,0.36,1)!important}.menu-list__link:hover .menu-list__link-title{background:rgba(0,0,0,0.08)!important;border-color:rgba(0,0,0,0.12)!important;transform:scale(1.02)!important}.menu-list__link--active .menu-list__link-title{background:#000!important;border-color:#000!important;color:#fff!important}';

    function inject() {
      // Inject into <header-menu> shadow roots (desktop)
      document.querySelectorAll('header-menu').forEach(el => {
        const root = el.shadowRoot;
        if (root && !root.querySelector('[data-menu-pills]')) {
          const s = document.createElement('style');
          s.textContent = pillCSS;
          s.setAttribute('data-menu-pills', '');
          root.appendChild(s);
        }
      });

      // Inject into <header-drawer> shadow roots (mobile drawer)
      document.querySelectorAll('header-drawer').forEach(el => {
        const root = el.shadowRoot;
        if (root && !root.querySelector('[data-menu-pills]')) {
          const s = document.createElement('style');
          s.textContent = pillCSS;
          s.setAttribute('data-menu-pills', '');
          root.appendChild(s);
        }
      });

      // Directly style any menu link items in Light DOM (fallback)
      document.querySelectorAll('.menu-list__link-title:not([style*="border-radius"])').forEach(el => {
        el.style.background = 'rgba(0,0,0,0.04)';
        el.style.border = '0.5px solid rgba(0,0,0,0.06)';
        el.style.borderRadius = '100px';
        el.style.padding = '6px 18px';
        el.style.fontSize = '0.875rem';
        el.style.transition = 'all 0.25s cubic-bezier(0.22,0.61,0.36,1)';
      });
    }

    inject();
    setTimeout(inject, 500);
    setTimeout(inject, 1500);

    // Watch for triggers that open the mobile drawer
    document.addEventListener('click', function mobileDrawerWatch(e) {
      const trigger = e.target.closest('[on\\:click*="menu"], [aria-controls*="menu"], .header__icon--menu, header-drawer');
      if (trigger) {
        setTimeout(inject, 300);
        setTimeout(inject, 700);
      }
    });
  }

  /* ============================================================
     4. CHAT ASSISTANT
     ============================================================ */
  function initChatAssistant() {
    // Wait for elements and retry
    function setup(retries) {
      retries = retries || 0;
      const fab = document.querySelector('.chat-assistant-fab');
      const panel = document.querySelector('.chat-panel');
      const msgs = document.querySelector('.chat-panel__messages');
      const input = document.querySelector('.chat-panel__input input');
      const sendBtn = document.querySelector('.chat-panel__input button');
      const closeBtn = document.querySelector('.chat-panel__header-close');

      if (!fab || !panel || !msgs) {
        if (retries < 10) setTimeout(() => setup(retries + 1), 300);
        return;
      }

      // ---- External AI API ----
      // Set these in your browser console or uncomment below:
      // localStorage.setItem('chat_api_key', 'sk-...');
      // localStorage.setItem('chat_api_url', 'https://api.openai.com/v1/chat/completions');
      // localStorage.setItem('chat_model', 'gpt-4o-mini');

      function isAr(t) { return /[\u0600-\u06FF]/.test(t); }

      function addMsg(text, type) {
        const d = document.createElement('div');
        d.className = 'chat-panel__message chat-panel__message--' + type;
        d.textContent = text;
        msgs.appendChild(d);
        msgs.scrollTop = msgs.scrollHeight;
      }

      function showTyping() {
        const t = document.createElement('div');
        t.className = 'chat-panel__message chat-panel__message--bot chat-panel__message--typing';
        t.textContent = '...';
        msgs.appendChild(t);
        msgs.scrollTop = msgs.scrollHeight;
        return t;
      }

      // Chat memory
      const history = [];

      // Smart responses
      function smartReply(msg) {
        const l = msg.toLowerCase().trim();
        const ar = isAr(msg);

        // Store in history
        history.push({ role: 'user', text: msg });

        // Try external API first
        const apiKey = localStorage.getItem('chat_api_key');
        const apiUrl = localStorage.getItem('chat_api_url');
        if (apiKey && apiUrl) {
          // Pass last 10 messages for conversation context
          const recentHistory = history.slice(-10).map(h => ({ role: h.role, content: h.text }));
          return fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
            body: JSON.stringify({
              model: localStorage.getItem('chat_model') || 'gpt-4o-mini',
              messages: [
                { role: 'system', content: 'You are a cool, chill fashion stylist for SAKENW. You talk like a real person — casual, friendly, and natural. No corporate speak, no robotic phrases. Use slang sometimes. Be funny if it fits. Answer in the same language the user writes in (English or Algerian Arabic / Darija). Keep it short and natural like a text convo. You know about: sizing, shipping (free over $100, 5-8 days), returns (30 days free), payments (Visa, MC, PayPal, Apple Pay, Afterpay), streetwear style, and SAKENW products. If you do not know something specific, just say so honestly.' },
                ...recentHistory
              ],
              max_tokens: 300,
              temperature: 0.8
            })
          }).then(r => r.json()).then(d => d.choices?.[0]?.message?.content || localReply(msg, l, ar))
          .catch(() => localReply(msg, l, ar));
        }

        return localReply(msg, l, ar);
      }

      function localReply(msg, l, ar) {
        const pairs = [
          // English
          { w: ['size','sizing','fit','measurement','how do i find','what size'], r: 'For sizing, check the size guide on each product page. If you are between sizes, go up for an oversized look or down for a fitted look. Need help with a specific product?' },
          { w: ['shipping','delivery','ship','track','when will','how long','arrive'], r: 'Free shipping on orders over $100! Standard delivery is 5-8 business days. Express is available at checkout. You will get a tracking link once your order ships.' },
          { w: ['return','refund','exchange','send back','not happy','wrong size'], r: 'We offer free returns within 30 days. Items must be unworn with all tags still attached. Start your return from your account page or contact support.' },
          { w: ['hello','hi','hey','good morning','good evening','sup','whats up'], r: 'Hey! Welcome to SAKENW. I am your style assistant. Ask me anything about products, sizing, or styling. How can I help? 🔥' },
          { w: ['sale','discount','promo','coupon','code','offer','deal'], r: 'Check our homepage for current promotions! Subscribe to our newsletter and get 10% off your first order. We also have seasonal sales - follow us on social media for updates.' },
          { w: ['help','support','contact','email','phone','talk','customer'], r: 'You can reach us at support@sakenw.com or use the Shopify Inbox chat feature. We usually reply within 24 hours.' },
          { w: ['price','cost','how much','cheap','expensive','affordable','budget'], r: 'Our prices range from $34 for essentials to $199 for premium pieces. Great quality for the price! Check individual product pages for exact pricing.' },
          { w: ['material','fabric','cotton','quality','care','wash','dry'], r: 'We use high-quality materials. Each product page lists the fabric composition and care instructions. Most items are machine washable cold.' },
          { w: ['stock','available','restock','sold out','back','when back'], r: 'Product pages show real-time stock levels. If something is sold out, click "Notify me" on the product page to get an email when it is back.' },
          { w: ['style','recommend','suggest','what should i','outfit','wear','match'], r: 'Love to help you style! Are you going for a casual look, going out, sporty, or something else? Also try our "Find Your Fit" section for personalized picks.' },
          { w: ['new','latest','collection','drop','arrival','just dropped'], r: 'New arrivals drop regularly! Check our homepage and follow us on social media for the latest releases and exclusive previews.' },
          { w: ['international','worldwide','global','outside usa','europe','canada'], r: 'We ship worldwide! Shipping costs and delivery times vary by destination. Duties and taxes may apply depending on your country.' },
          { w: ['payment','pay','checkout','card','afterpay','klarna','paypal','visa'], r: 'We accept Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay, and Afterpay. All payments are secure.' },
          { w: ['men','women','unisex','gender','male','female'], r: 'Most SAKENW pieces are unisex. Check the size guide on each product for specific measurements.' },
          { w: ['thanks','thank you','appreciate','perfect','great'], r: 'You are welcome! 🖤 Anything else I can help you with?' },
          { w: ['jacket','hoodie','shirt','pants','jeans','shoes','sneakers','hat','cap','bag'], r: 'We have a wide range! Check our collections to browse hoodies, tees, pants, jackets, and accessories.' },
          { w: ['how are you','how r u','whats up'], r: 'I am doing great! Ready to help you find the perfect fit. What about you?' },
          { w: ['bye','goodbye','see you','later'], r: 'Later! Stay stylish 🖤 Come back anytime.' },
          // Arabic / DZ
          { w: ['واش راك','السلام','صباح الخير','مساء الخير','بخير','لاباس','كيف'], r: 'واش راك! مرحبا بك في SAKENW. كيف نقدر نعاونوك؟ 🔥 أنا هنا باش نجاوبك على أي سؤال عندك.' },
          { w: ['المقاس','الحجم','كيف نعرف','شنو','كيفاش'], r: 'على حسب القطعة. كل منتج عندو guide ديال المقاسات. إذا حاير بين مقاسين، خذ الكبير باش يكون مريح.' },
          { w: ['الشحن','التوصيل','واش','قداش','الوقت','كم يوم'], r: 'الشحن مجاني فوق 100 دولار. التوصيل العادي 5 لـ 8 أيام. عندنا aussi express عند الدفع. ترسلك لينك tracking.' },
          { w: ['الرجوع','الاسترجاع','تبديل','رد','مرتاحش'], r: 'تقدر ترجع المنتج مجانا في خلال 30 يوم. الشرط الوحيد القطعة ما تكونش مستعملة وتكون tags باقي فيها.' },
          { w: ['الدفع','كيف ندفع','بطاقة','شكون','كارت'], r: 'نقبلو كل البطاقات: Visa, Mastercard, PayPal, Apple Pay, و Google Pay. آمنين.' },
          { w: ['مساعدة','الدعم','contacts','كلمنا','رقم','الهاتف'], r: 'إرسلنا على support@sakenw.com أو استعمل Shopify Inbox. نردو عليك في خلال 24 ساعة إن شاء الله.' },
          { w: ['التخفيض','الجمعة','عرض','برومو','كود','خصم','فرصة'], r: 'عندنا عروض مستمرة! اشترك في newsletter باش تجيك 10% على أول طلب. تابعنا على social media.' },
          { w: ['موديل','أناقة','لباس','شنو يليق','فاشون'], r: 'شنو تحب بالضبط؟ كاجوال، sporty، ولا نزلة؟ جرب "Find Your Fit" باش تشوف توصيات على مزاجك.' },
          { w: ['شكرا','بارك الله فيك','يعطيك الصحة','merci'], r: 'العفو! 🖤 واش بغيت حاجة أخرى؟' },
          { w: ['المنتج','القطعة','تيشيرت','بنطلون','هودي','كاپ'], r: 'عندنا تشكيلة ولا! تصفح المجموعات باش تشوف كل القطع الجديدة.' },
        ];

        for (const p of pairs) {
          if (p.w.some(k => l.includes(k))) return p.r;
        }

        if (ar) return 'واش راك! فهمتك. ممكن توضح أكثر باش نعاونك؟ أنا هنا باش نجاوبك على كل ما يخص SAKENW من مقاسات وشحن وتوصيل. 🔥';
        const fallbacks = [
          "I'd be happy to help! Could you tell me what style you are looking for?",
          "Great question! Can you give me more details so I can help better?",
          "Welcome to SAKENW! What can I assist you with today?",
          "I am here to help with sizing, shipping, returns, or style recommendations. What do you need?"
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }

      async function handleSend() {
        const text = input.value.trim();
        if (!text) return;
        addMsg(text, 'user');
        input.value = '';
        const typing = showTyping();
        const reply = await smartReply(text);
        await new Promise(r => setTimeout(r, 300 + Math.random() * 300));
        typing.remove();
        addMsg(reply, 'bot');
        history.push({ role: 'assistant', text: reply });
      }

      // Close button in input row
      let closeInputBtn = panel.querySelector('.chat-panel__input-close');
      if (!closeInputBtn) {
        closeInputBtn = document.createElement('button');
        closeInputBtn.className = 'chat-panel__input-close';
        closeInputBtn.textContent = '✕';
        closeInputBtn.setAttribute('aria-label', 'Close');
        closeInputBtn.type = 'button';
        sendBtn.parentNode.insertBefore(closeInputBtn, sendBtn);
      }

      function closeChat() { panel.classList.remove('open'); fab.style.display = 'flex'; }
      if (closeBtn) closeBtn.addEventListener('click', closeChat);
      closeInputBtn.addEventListener('click', closeChat);

      fab.addEventListener('click', () => {
        const isOpen = panel.classList.contains('open');
        panel.classList.toggle('open');
        fab.style.display = isOpen ? 'flex' : 'none';
        if (!isOpen && !msgs.querySelector('.chat-panel__message')) {
          setTimeout(() => addMsg("Hey! I am your SAKENW style assistant. Ask me about sizing, shipping, or style tips! 🔥", 'bot'), 500);
        }
      });

      if (sendBtn) sendBtn.addEventListener('click', handleSend);
      if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });
    }

    setup();
  }

  /* ============================================================
     7. FAQ ACCORDION
     ============================================================ */
  function initFAQAccordion() {
    document.querySelectorAll('.faq-item__question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Close all others
        document.querySelectorAll('.faq-item.open').forEach(other => {
          if (other !== item) other.classList.remove('open');
        });

        item.classList.toggle('open');
      });
    });
  }

  /* ============================================================
     8. FIND YOUR FIT (AI STYLIST)
     ============================================================ */
  function initFindYourFit() {
    const options = document.querySelectorAll('.find-your-fit__option');
    const resultsContainer = document.querySelector('.find-your-fit__results');

    if (!options.length || !resultsContainer) return;

    // Sample product data - will be replaced by Liquid rendering
    const sampleProducts = [
      { title: 'Oversized Hoodie', price: '$89.00', img: '' },
      { title: 'Relaxed Fit Tee', price: '$49.00', img: '' },
      { title: 'Wide Leg Pants', price: '$79.00', img: '' },
      { title: 'Oversized Denim Jacket', price: '$129.00', img: '' },
    ];

    const styleProducts = {
      'oversized': [
        { title: 'Oversized Hoodie', price: '$89.00', img: '' },
        { title: 'XXL Graphic Tee', price: '$54.00', img: '' },
        { title: 'Wide Cargo Pants', price: '$94.00', img: '' },
        { title: 'Oversized Denim Jacket', price: '$139.00', img: '' },
      ],
      'regular': [
        { title: 'Classic Fit Tee', price: '$39.00', img: '' },
        { title: 'Slim Denim Jeans', price: '$89.00', img: '' },
        { title: 'Tailored Blazer', price: '$149.00', img: '' },
        { title: 'Clean Fit Hoodie', price: '$79.00', img: '' },
      ],
      'streetwear': [
        { title: 'Graphic Hoodie', price: '$94.00', img: '' },
        { title: 'Cargo Joggers', price: '$74.00', img: '' },
        { title: 'Layered Tee Pack', price: '$69.00', img: '' },
        { title: 'Puffer Vest', price: '$119.00', img: '' },
      ],
      'minimal': [
        { title: 'Essential Tee', price: '$34.00', img: '' },
        { title: 'Slim Fit Trousers', price: '$84.00', img: '' },
        { title: 'Wool Blend Coat', price: '$199.00', img: '' },
        { title: 'Minimalist Sneakers', price: '$109.00', img: '' },
      ],
    };

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');

        const style = opt.dataset.style;
        const products = styleProducts[style] || sampleProducts;

        resultsContainer.innerHTML = '';
        products.forEach((product, i) => {
          const div = document.createElement('div');
          div.className = 'find-your-fit__result';
          div.style.animationDelay = (i * 0.1) + 's';
          div.innerHTML = `
            <div class="glass-card" style="padding:0;overflow:hidden;">
              <div style="aspect-ratio:3/4;background:var(--premium-card-bg);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.2);font-size:48px;">
                ${product.title.charAt(0)}
              </div>
              <div style="padding:16px 20px;">
                <div style="font-size:13px;font-weight:500;margin-bottom:4px;">${product.title}</div>
                <div style="font-size:14px;font-weight:600;">${product.price}</div>
              </div>
            </div>
          `;
          resultsContainer.appendChild(div);
        });

        // Scroll to results
        setTimeout(() => {
          resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      });
    });
  }

  /* ============================================================
     9. STICKY ADD TO CART
     ============================================================ */
  function initStickyAddToCart() {
    const sticky = document.querySelector('.sticky-add-to-cart');
    const addToCartForm = document.querySelector('.product-form');

    if (!sticky || !addToCartForm) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          sticky.classList.add('visible');
        } else {
          sticky.classList.remove('visible');
        }
      });
    }, {
      threshold: 0,
      rootMargin: '0px 0px -100px 0px'
    });

    observer.observe(addToCartForm);
  }

  /* ============================================================
     10. SCROLL PROGRESS BAR
     ============================================================ */
  function initProgressBar() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, { passive: true });
  }

  /* ============================================================
     11. RECENTLY VIEWED
     ============================================================ */
  function initRecentlyViewed() {
    const container = document.querySelector('.recently-viewed');
    if (!container) return;
    const items = JSON.parse(localStorage.getItem('sakenw_recently_viewed') || '[]');
    if (!items.length) { container.style.display = 'none'; return; }
    container.innerHTML = '';
    items.slice(0, 6).forEach(item => {
      const div = document.createElement('div');
      div.className = 'recently-viewed__item';
      div.innerHTML = `<a href="${item.url}" style="text-decoration:none;color:inherit;"><div class="glass-card" style="padding:8px;text-align:center;"><div style="font-size:12px;font-weight:500;margin-top:4px;">${item.title}</div></div></a>`;
      container.appendChild(div);
    });
  }

  // Track product views
  (function() {
    const productData = document.querySelector('[data-product-title]');
    if (productData) {
      const url = productData.dataset.productUrl || window.location.pathname;
      let viewed = JSON.parse(localStorage.getItem('sakenw_recently_viewed') || '[]');
      viewed = viewed.filter(v => v.url !== url);
      viewed.unshift({ title: productData.dataset.productTitle, url, time: Date.now() });
      localStorage.setItem('sakenw_recently_viewed', JSON.stringify(viewed.slice(0, 12)));
    }
  })();

  /* ============================================================
     12. SMART SEARCH OVERLAY
     ============================================================ */
  function initSmartSearch() {
    const overlay = document.createElement('div');
    overlay.className = 'smart-search-overlay';
    overlay.innerHTML = `
      <button class="search-close" aria-label="Close search">✕</button>
      <input type="text" placeholder="Search products..." autofocus>
      <div class="search-hints">
        <span>Hoodies</span><span>T-Shirts</span><span>New Arrivals</span><span>Sale</span><span>Jackets</span>
      </div>
      <div class="search-trending">Trending searches</div>
      <div><a href="/collections/all">All Products</a><a href="/collections/new">New Arrivals</a><a href="/collections/sale">Sale</a></div>
    `;
    document.body.appendChild(overlay);

    const input = overlay.querySelector('input');
    const close = overlay.querySelector('.search-close');
    const hints = overlay.querySelectorAll('.search-hints span');
    const searchTrigger = document.querySelector('.header__icon--search, [aria-label="Search"], .search-icon');

    function openSearch() { overlay.classList.add('open'); setTimeout(() => input.focus(), 100); }
    function closeSearch() { overlay.classList.remove('open'); }

    if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
    close.addEventListener('click', closeSearch);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); } });
    input.addEventListener('input', function() {
      const q = this.value.trim().toLowerCase();
      if (q.length < 2) return;
      window.location.href = '/search?q=' + encodeURIComponent(q);
    });
    hints.forEach(h => h.addEventListener('click', () => { window.location.href = '/search?q=' + encodeURIComponent(h.textContent); }));
  }

  /* ============================================================
     13. QUICK ADD (AJAX)
     ============================================================ */
  function initQuickAdd() {
    document.querySelectorAll('.product-card').forEach(card => {
      const btn = document.createElement('button');
      btn.className = 'quick-add-btn';
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
      btn.setAttribute('aria-label', 'Quick add');
      card.style.position = 'relative';
      card.appendChild(btn);

      // Try to get variant ID from the card
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const link = card.querySelector('a[href*="/products/"]');
        const form = card.querySelector('[data-product-form], form[action*="/cart/add"]');
        let variantId = form?.querySelector('[name="id"]')?.value || card.dataset.variantId;

        // Fetch product JSON to get first variant
        if (!variantId && link) {
          try {
            const res = await fetch(link.getAttribute('href') + '.js');
            const data = await res.json();
            variantId = data.variants[0]?.id;
          } catch {}
        }

        if (!variantId) return;
        btn.classList.add('added');
        btn.innerHTML = '✓';

        // AJAX add to cart
        try {
          await fetch('/cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: variantId, quantity: 1 })
          });
          // Show toast
          let toast = document.querySelector('.quick-add-toast');
          if (!toast) { toast = document.createElement('div'); toast.className = 'quick-add-toast'; document.body.appendChild(toast); }
          toast.textContent = '✓ Added to cart';
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 2000);
          // Update cart count
          const cartCount = document.querySelector('.cart-bubble__text-count, [data-cart-count]');
          if (cartCount) cartCount.textContent = parseInt(cartCount.textContent || '0') + 1;
        } catch {
          btn.classList.remove('added');
          btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
        }
        setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'; }, 1500);
      });
    });
  }

  /* ============================================================
      14. CART ITEM REMOVE (Undo Toast)
       ============================================================ */
  function initCartRemoveFeatures() {
    var toast = document.createElement('div');
    toast.className = 'cart-undo-toast';
    document.body.appendChild(toast);
    var textEl = document.createElement('span');
    textEl.className = 'cart-undo-toast__text';
    toast.appendChild(textEl);
    var undoBtn = document.createElement('button');
    undoBtn.className = 'cart-undo-toast__btn';
    undoBtn.textContent = 'Undo';
    toast.appendChild(undoBtn);
    var timeout = null;
    var lastItem = null;

    function showUndo(item) {
      textEl.textContent = item ? '\u201C' + item.title + '\u201D removed' : 'Item removed';
      lastItem = item;
      toast.classList.add('show');
      clearTimeout(timeout);
      timeout = setTimeout(function() { toast.classList.remove('show'); lastItem = null; }, 4000);
    }

    undoBtn.addEventListener('click', function() {
      if (!lastItem) return;
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lastItem.variant_id, quantity: lastItem.quantity })
      }).then(function() {
        toast.classList.remove('show');
        lastItem = null;
        location.reload();
      });
    });

    // Show toast when any .cart-items__remove button is clicked
    document.addEventListener('click', function(e) {
      var removeBtn = e.target.closest('.cart-items__remove');
      if (!removeBtn) return;
      var row = removeBtn.closest('.cart-items__table-row');
      var titleEl = row && row.querySelector('.cart-items__title');
      var item = titleEl ? { title: titleEl.textContent.trim(), variant_id: null } : null;
      showUndo(item);
    });

    // ── Add "Remove" on product cards for items already in cart ──
    function matchProductUrl(cardUrl, cartItemUrl) {
      if (!cardUrl || !cartItemUrl) return false;
      var cardParts = cardUrl.split('/');
      var itemParts = cartItemUrl.split('/');
      return cardParts[cardParts.length - 1] === itemParts[itemParts.length - 1];
    }

    fetch('/cart.js').then(function(r) { return r.json(); }).then(function(cart) {
      if (!cart.items || !cart.items.length) return;
      cart.items.forEach(function(ci) {
        document.querySelectorAll('.product-card').forEach(function(card) {
          var link = card.querySelector('a[href*="/products/"]');
          if (!link) return;
          if (!matchProductUrl(link.getAttribute('href'), ci.url)) return;
          var existingBtn = card.querySelector('.quick-add-btn');
          if (!existingBtn) return;
          // Replace button with a remove button to avoid duplicate listeners
          var removeBtn = document.createElement('button');
          removeBtn.className = 'quick-add-btn added in-cart';
          removeBtn.textContent = '\u2713';
          removeBtn.setAttribute('aria-label', 'Remove from cart');
          removeBtn.title = 'In cart \u2014 click to remove';
          existingBtn.parentNode.replaceChild(removeBtn, existingBtn);

          removeBtn.addEventListener('click', function removeClick(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            fetch('/cart/change.js', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: ci.key, quantity: 0 })
            }).then(function() {
              var addBtn = document.createElement('button');
              addBtn.className = 'quick-add-btn';
              addBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
              addBtn.setAttribute('aria-label', 'Quick add');
              removeBtn.parentNode.replaceChild(addBtn, removeBtn);
              // Rebind add click from initQuickAdd logic
              addBtn.addEventListener('click', function addClick(aev) {
                aev.preventDefault();
                aev.stopPropagation();
                var vLink = addBtn.closest('.product-card').querySelector('a[href*="/products/"]');
                if (!vLink) return;
                fetch(vLink.getAttribute('href') + '.js').then(function(vr) { return vr.json(); }).then(function(vd) {
                  var vid = vd.variants && vd.variants[0] && vd.variants[0].id;
                  if (!vid) return;
                  addBtn.classList.add('added');
                  addBtn.innerHTML = '\u2713';
                  fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: vid, quantity: 1 }) }).then(function() {
                    setTimeout(function() {
                      addBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
                      addBtn.classList.remove('added');
                    }, 1500);
                  }).catch(function() {});
                }).catch(function() {});
              });
              showUndo(ci);
            });
          });
        });
      });
    }).catch(function() {});
  }

  /* ============================================================
      15. SMART INVENTORY BADGE
       ============================================================ */
  function initInventoryBadges() {
    document.querySelectorAll('[data-inventory]').forEach(el => {
      const qty = parseInt(el.dataset.inventory);
      const badge = document.createElement('span');
      badge.className = 'inventory-badge';
      if (qty <= 0) { badge.className += ' inventory-badge--low'; badge.textContent = 'Sold out'; }
      else if (qty <= 3) { badge.className += ' inventory-badge--low'; badge.textContent = 'Only ' + qty + ' left'; }
      else if (qty <= 10) { badge.className += ' inventory-badge--medium'; badge.textContent = 'Low stock'; }
      else { badge.className += ' inventory-badge--high'; badge.textContent = 'In stock'; }
      el.appendChild(badge);
    });
  }

  /* ============================================================
     15. STYLE QUIZ
     ============================================================ */
  function initStyleQuiz() {
    const quiz = document.querySelector('.style-quiz');
    if (!quiz) return;

    const questions = [
      { q: 'What\'s your fit preference?', options: ['Oversized', 'Regular', 'Slim', 'Relaxed'] },
      { q: 'Which vibe fits you?', options: ['Streetwear', 'Minimal', 'Sporty', 'Casual'] },
      { q: 'What\'s your budget?', options: ['Under $50', '$50–$100', '$100–$200', 'Any'] },
      { q: 'Where are you wearing it?', options: ['Everyday', 'Night out', 'Workout', 'Chill at home'] },
      { q: 'Favorite color palette?', options: ['Black & White', 'Earth tones', 'Bold colors', 'Pastels'] },
    ];

    const results = {
      'Oversized,Streetwear,Under $50,Everyday,Black & White': { title: 'Streetwear Icon', desc: 'You\'re all about that oversized streetwear look on a budget. Check our hoodies and graphic tees!', url: '/collections/hoodies' },
      'Regular,Minimal,$50–$100,Night out,Black & White': { title: 'Minimalist', desc: 'Clean, minimal, timeless. You\'d love our essential collection.', url: '/collections/all' },
      'Slim,Sporty,$100–$200,Workout,Bold colors': { title: 'Athleisure Pro', desc: 'Performance meets style. Check our latest sport collection.', url: '/collections/all' },
    };

    let current = 0;
    const answers = [];

    function render() {
      if (current >= questions.length) return showResult();
      const q = questions[current];
      quiz.innerHTML = `
        <div class="style-quiz__question">${q.q}</div>
        <div class="style-quiz__options">${q.options.map((o, i) => `<button class="style-quiz__option" data-idx="${i}">${o}</button>`).join('')}</div>
        <div class="style-quiz__progress">${questions.map((_, i) => `<span class="style-quiz__progress-dot ${i < current ? 'done' : i === current ? 'active' : ''}"></span>`).join('')}</div>
      `;
      quiz.querySelectorAll('.style-quiz__option').forEach(btn => {
        btn.addEventListener('click', () => {
          answers.push(btn.textContent);
          current++;
          render();
        });
      });
    }

    function showResult() {
      const key = answers.join(',');
      const match = results[key] || { title: 'You\'re Unique!', desc: 'Check out our full collection to find your perfect style.', url: '/collections/all' };
      quiz.innerHTML = `
        <div class="style-quiz__question">Your Style: ${match.title}</div>
        <div class="style-quiz__result show"><p>${match.desc}</p><a href="${match.url}">Shop Collection →</a></div>
        <div style="margin-top:20px"><button class="style-quiz__option" id="quiz-restart">Take again</button></div>
      `;
      document.getElementById('quiz-restart')?.addEventListener('click', () => { current = 0; answers.length = 0; render(); });
    }

    render();
  }

  /* ============================================================
     16. PRODUCT CARD INTERSECTION OBSERVER
      ============================================================ */
  function initCardAnimations() {
    const cards = document.querySelectorAll('.product-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 100px 0px' });

    cards.forEach(card => {
      card.style.animationPlayState = 'paused';
      observer.observe(card);
    });
  }

  /* ============================================================
     17. LENIS SMOOTH SCROLL
     ============================================================ */
  function initSmoothScroll() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      autoRaf: true,
    });

    lenis.on('scroll', (e) => {
      const progressBar = document.querySelector('.scroll-progress-bar');
      if (progressBar) {
        progressBar.style.transform = `scaleX(${e.progress})`;
      }
    });

    document.documentElement.classList.add('lenis');
    window.__lenis = lenis;
  }

  /* ============================================================
     18. MAGNETIC BUTTON HOVER
     ============================================================ */
  function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .button, .magnetic-btn-wrap');
    if (!buttons.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const strength = btn.classList.contains('magnetic-btn-wrap') ? 0.4 : 0.15;
        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ============================================================
     19. PAGE TRANSITIONS
     ============================================================ */
  function initPageTransitions() {
    const transitionEl = document.querySelector('.page-transition');
    if (!transitionEl) return;

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http') || href.startsWith('/products/') || href.startsWith('/collections/') || href.startsWith('/pages/') || href.startsWith('/blogs/') || href === '/' || href === '') return;
      if (link.hasAttribute('data-no-transition')) return;
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;

      e.preventDefault();
      transitionEl.classList.add('active');

      setTimeout(() => {
        window.location.href = href;
      }, 800);
    });
  }

  /* ============================================================
     20. ANIMATED COUNTERS
     ============================================================ */
  function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter-value');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));

    function animateCounter(el) {
      const target = parseInt(el.dataset.target) || parseInt(el.textContent.replace(/,/g, '')) || 0;
      if (!target) return;
      const duration = 2000;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
      }

      requestAnimationFrame(tick);
    }
  }

  /* ============================================================
     21. PARALLAX SECTIONS
     ============================================================ */
  function initParallaxSections() {
    const images = document.querySelectorAll('.parallax-image');
    if (!images.length) return;

    const lenis = window.__lenis;

    function updateParallax() {
      images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const windowH = window.innerHeight;
        if (rect.top > windowH || rect.bottom < 0) return;
        const speed = parseFloat(img.dataset.speed) || 0.15;
        const offset = (rect.top - windowH) * speed;
        img.style.transform = `translateY(${offset}px)`;
      });
    }

    if (lenis) {
      lenis.on('scroll', updateParallax);
    } else {
      window.addEventListener('scroll', updateParallax, { passive: true });
    }
    updateParallax();

    window.addEventListener('resize', updateParallax, { passive: true });
  }

  /* ============================================================
     22. IMAGE LOAD REVEAL
     ============================================================ */
  function initImageReveal() {
    const wrappers = document.querySelectorAll('.image-reveal');
    if (!wrappers.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    wrappers.forEach(w => observer.observe(w));
  }

  /* ============================================================
     23. BACK TO TOP
     ============================================================ */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    const lenis = window.__lenis;

    if (lenis) {
      lenis.on('scroll', (e) => {
        btn.classList.toggle('visible', e.animatedScroll > 300);
      });
    } else {
      window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 300);
      }, { passive: true });
    }

    btn.addEventListener('click', () => {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  /* ============================================================
     24. PRODUCT CAROUSEL
     ============================================================ */
  function initProductCarousels() {
    document.querySelectorAll('.premium-carousel').forEach((carousel) => {
      const track = carousel.querySelector('.premium-carousel__track');
      const prev = carousel.querySelector('.premium-carousel__arrow--prev');
      const next = carousel.querySelector('.premium-carousel__arrow--next');
      if (!track || !prev || !next) return;

      const scrollAmount = 300;

      prev.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      next.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    });
  }

})();
