/**
 * Centralized Script & Tracking Engine
 * Activity: Painting, Modern Decor & Gypsum Board - Riyadh
 * Client Ad Phone: 0557482300
 */

(function () {
  'use strict';

  // ==========================================
  // CONFIGURATION: Google Ads & Contact Target
  // ==========================================
  const CLIENT_PHONE = '0557482300';
  const CLIENT_INT_PHONE = '966557482300';
  
  const GOOGLE_ADS_ID = ''; // Example: 'AW-1234567890'
  const CONVERSION_LABEL_CALL = ''; 
  const CONVERSION_LABEL_WHATSAPP = ''; 
  const CONVERSION_LABEL_FORM = ''; 

  // Inject Google Tag
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
    
    // 1. Mobile Menu Drawer Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let navOverlay = document.querySelector('.nav-overlay');

    if (!navOverlay) {
      navOverlay = document.createElement('div');
      navOverlay.className = 'nav-overlay';
      document.body.appendChild(navOverlay);
    }

    if (mobileToggle && navMenu) {
      const toggleMenu = () => {
        navMenu.classList.toggle('open');
        navOverlay.classList.toggle('show');
      };
      mobileToggle.addEventListener('click', toggleMenu);
      navOverlay.addEventListener('click', toggleMenu);
    }

    // 2. Touch Dropdown for "خدماتنا"
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    dropdownBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const menu = btn.nextElementSibling;
        if (menu) {
          menu.classList.toggle('show');
          btn.classList.toggle('open');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item.dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach((menu) => menu.classList.remove('show'));
        document.querySelectorAll('.dropdown-btn').forEach((btn) => btn.classList.remove('open'));
      }
    });

    // 3. Centralized Click Tracker
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (!target) return;

      const href = target.getAttribute('href') || '';

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

    // 4. Interactive Lead Form to WhatsApp
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

    // 5. Scroll to Top
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
