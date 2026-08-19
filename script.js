/**
 * Centralized Script, UI Injector & Google Ads Tracking Engine
 * All Floating Buttons, SVGs & Conversion Tracking Controlled From Here!
 * Activity: Modern Paints & Gypsum Board - Riyadh
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. الإعدادات المركزية (عدّل هنا فقط وسيطبق على كافة صفحات الموقع)
  // =========================================================================
  const CLIENT_PHONE = '0557482300';
  const CLIENT_INT_PHONE = '966557482300';
  
  // Google Ads IDs (ضع معرفات حملتك هنا متى شئت)
  const GOOGLE_ADS_ID = 'AW-18398762505'; // مثال: 'AW-123456789'
  const CONVERSION_LABEL_CALL = 'hlUXCObsp-QcEImsm8VE'; 
  const CONVERSION_LABEL_WHATSAPP = 'eShNCOnsp-QcEImsm8VE'; 
  const CONVERSION_LABEL_FORM = 'EdZZCOnQquQcEImsm8VE'; 

  // حقن مكتبة Google Tag تلقائياً
  if (GOOGLE_ADS_ID && GOOGLE_ADS_ID.trim() !== '') {
    const scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    document.head.appendChild(scriptTag);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GOOGLE_ADS_ID);
  }

  function trackAdConversion(actionType, sendToLabel) {
    if (typeof window.gtag === 'function' && GOOGLE_ADS_ID) {
      const payload = { event_category: 'Engagement', event_label: actionType };
      if (sendToLabel) { payload.send_to = `${GOOGLE_ADS_ID}/${sendToLabel}`; }
      window.gtag('event', 'conversion', payload);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================================
    // 2. الحقن التلقائي للأزرار العائمة الرسمية (WhatsApp + Call + Scroll)
    // =========================================================================
    // حقن أزرار الاتصال والواتساب باليمين
    if (!document.querySelector('.fab-container-right')) {
      const fabRight = document.createElement('div');
      fabRight.className = 'fab-container-right';
      fabRight.innerHTML = `
        <a href="https://wa.me/${CLIENT_INT_PHONE}" class="fab-btn fab-whatsapp fab-shake" title="محادثة واتساب" aria-label="WhatsApp">
          <svg width="34" height="34" viewBox="0 0 32 32" fill="#ffffff">
            <path d="M16 2a13.9 13.9 0 0 0-12 21l-1.9 7 7.2-1.9A13.9 13.9 0 1 0 16 2zm0 25.5a11.5 11.5 0 0 1-5.9-1.6l-.4-.3-4.3 1.1 1.2-4.2-.3-.4A11.6 11.6 0 1 1 16 27.5zm6.4-8.6c-.3-.2-2-.1-2.3-1.1s-.6-.9-.8-.9h-.7a1.4 1.4 0 0 0-1 .5c-.4.4-1.3 1.3-1.3 3.1s1.4 3.6 1.6 3.8 2.7 4.1 6.5 5.7c.9.4 1.6.6 2.2.8.9.3 1.8.2 2.4.1.8-.1 2.3-.9 2.6-1.8.4-.9.4-1.7.3-1.8s-.4-.3-.8-.5z"/>
          </svg>
        </a>
        <a href="tel:${CLIENT_PHONE}" class="fab-btn fab-call fab-shake" title="اتصال مباشر" aria-label="Call">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.5a1 1 0 01-1 1A17.93 17.93 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.02l-2.23 2.09z"/>
          </svg>
        </a>
      `;
      document.body.appendChild(fabRight);
    }

    // حقن زر الصعود للأعلى باليسار
    if (!document.querySelector('.fab-container-left')) {
      const fabLeft = document.createElement('div');
      fabLeft.className = 'fab-container-left';
      fabLeft.innerHTML = `
        <button id="scrollTopBtn" class="fab-scroll-top" aria-label="الصعود للأعلى">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      `;
      document.body.appendChild(fabLeft);
    }

    // =========================================================================
    // 3. برمجة القائمة الجانبية السريعة (Native Touch Sidebar)
    // =========================================================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navMenu && !navMenu.querySelector('.drawer-close-btn')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'drawer-close-btn';
      closeBtn.innerHTML = '✖ إغلاق القائمة';
      closeBtn.setAttribute('aria-label', 'إغلاق');
      navMenu.insertBefore(closeBtn, navMenu.firstChild);

      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
      });
    }

    // القائمة المنسدلة لـ "خدماتنا"
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    dropdownBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = btn.closest('.dropdown');
        const menu = parent ? parent.querySelector('.dropdown-menu') : null;
        if (menu) {
          menu.classList.toggle('show');
          btn.classList.toggle('open');
        }
      });
    });

    // =========================================================================
    // 4. الرصد المركزي لنقرات الاتصال والواتساب
    // =========================================================================
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (!target) return;

      const href = target.getAttribute('href') || '';

      // استبعاد رقم المطور
      if (href.includes('0578539687') || href.includes('966578539687')) {
        return;
      }

      if (href.startsWith(`tel:${CLIENT_PHONE}`) || href.startsWith(`tel:+966${CLIENT_PHONE.substring(1)}`)) {
        trackAdConversion('Phone Call Click', CONVERSION_LABEL_CALL);
      }

      if (href.includes(CLIENT_INT_PHONE) || href.includes(CLIENT_PHONE)) {
        trackAdConversion('WhatsApp Click', CONVERSION_LABEL_WHATSAPP);
      }
    });

    // =========================================================================
    // 5. إرسال النموذج الموحد للواتساب وتتبع التحويل
    // =========================================================================
    const leadForm = document.getElementById('inspectionForm');
    if (leadForm) {
      leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = (document.getElementById('formName') || {}).value || 'عميل جديد';
        const phone = (document.getElementById('formPhone') || {}).value || '';
        const neighborhood = (document.getElementById('formDistrict') || {}).value || 'الرياض';
        const service = (document.getElementById('formService') || {}).value || 'طلب دهانات وديكورات';
        const notes = (document.getElementById('formNotes') || {}).value || 'بدون ملاحظات إضافية';

        if (!phone.trim()) {
          alert('يرجى كتابة رقم الجوال للتواصل معكم');
          return;
        }

        trackAdConversion('Lead Form Submit', CONVERSION_LABEL_FORM);

        const message = `*طلب معاينة مجانية جديد عبر الموقع:*%0A` +
                        `👤 *الاسم:* ${encodeURIComponent(name)}%0A` +
                        `📱 *الجوال:* ${encodeURIComponent(phone)}%0A` +
                        `📍 *الحي:* ${encodeURIComponent(neighborhood)}%0A` +
                        `🎨 *الخدمة المطلوبة:* ${encodeURIComponent(service)}%0A` +
                        `📝 *تفاصيل إضافية:* ${encodeURIComponent(notes)}`;

        const whatsappUrl = `https://wa.me/${CLIENT_INT_PHONE}?text=${message}`;
        window.open(whatsappUrl, '_blank');
      });
    }

    // =========================================================================
    // 6. زر الصعود للأعلى
    // =========================================================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      });

      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

  });
})();
