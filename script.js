/**
 * Centralized Script, UI Injector & Google Ads Tracking Engine
 * Activity: Modern Paints & Gypsum Board - Riyadh
 * Client Phone: 0557482300
 */

// 1. الإعدادات المركزية
const CLIENT_PHONE = '0557482300';
const CLIENT_INT_PHONE = '966557482300';
const DEV_PHONE_EXCLUDED = '966578539687';

const GOOGLE_ADS_ID = 'AW-18398762505'; 
const CONVERSION_LABEL_CALL = 'hlUXCObsp-QcEImsm8VE'; 
const CONVERSION_LABEL_WHATSAPP = 'eShNCOnsp-QcEImsm8VE'; 
const CONVERSION_LABEL_FORM = 'EdZZCOnQquQcEImsm8VE'; 

// 2. تهيئة تتبع إعلانات Google Ads المباشر
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
window.gtag = gtag;

gtag('js', new Date());
gtag('config', GOOGLE_ADS_ID);

(function injectGoogleTag() {
  if (GOOGLE_ADS_ID && !document.getElementById('google-ads-tag')) {
    const scriptTag = document.createElement('script');
    scriptTag.id = 'google-ads-tag';
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    document.head.appendChild(scriptTag);
  }
})();

function triggerGoogleConversion(label, callbackUrl) {
  if (typeof window.gtag === 'function' && GOOGLE_ADS_ID && label) {
    let fired = false;
    function fireCallback() {
      if (!fired && callbackUrl) {
        fired = true;
        window.location.href = callbackUrl;
      }
    }

    window.gtag('event', 'conversion', {
      'send_to': `${GOOGLE_ADS_ID}/${label}`,
      'event_callback': fireCallback
    });

    setTimeout(fireCallback, 500);
  } else if (callbackUrl) {
    window.location.href = callbackUrl;
  }
}

// 3. إدارة التفاعل والقوائم والأزرار
document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // تشغيل القائمة المنسدلة لـ "خدماتنا" (حل المشكلة)
  // ==========================================
  const dropdownBtns = document.querySelectorAll('.dropdown-btn');
  dropdownBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parent = btn.closest('.dropdown');
      const menu = parent ? parent.querySelector('.dropdown-menu') : null;
      if (menu) {
        menu.classList.toggle('show');
        btn.classList.toggle('open');
      }
    });
  });

  // إغلاق القائمة المنسدلة عند النقر خارجها
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('show'));
      document.querySelectorAll('.dropdown-btn').forEach(btn => btn.classList.remove('open'));
    }
  });

  // ==========================================
  // تشغيل القائمة الجانبية للجوال (Mobile Sidebar)
  // ==========================================
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navMenu && !navMenu.querySelector('.drawer-close-btn')) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'drawer-close-btn';
    closeBtn.innerHTML = '✖ إغلاق القائمة';
    closeBtn.setAttribute('aria-label', 'إغلاق القائمة');
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

  // ==========================================
  // زر الصعود للأعلى
  // ==========================================
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

  // ==========================================
  // رصد نقرات الاتصال والواتساب مع استبعاد المطور
  // ==========================================
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (!target) return;

    const href = target.getAttribute('href') || '';

    // استبعاد رقم المطور من التتبع
    if (href.includes(DEV_PHONE_EXCLUDED) || href.includes('0578539687')) {
      return;
    }

    if (href.startsWith(`tel:${CLIENT_PHONE}`) || href.startsWith(`tel:+966${CLIENT_PHONE.substring(1)}`)) {
      triggerGoogleConversion(CONVERSION_LABEL_CALL);
    }

    if (href.includes(CLIENT_INT_PHONE) || href.includes(CLIENT_PHONE) || href.includes('wa.me')) {
      triggerGoogleConversion(CONVERSION_LABEL_WHATSAPP);
    }
  });

  // ==========================================
  // إرسال النموذج وتتبع تحويل الفورم
  // ==========================================
  const leadForm = document.getElementById('inspectionForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = (document.getElementById('formName') || {}).value || 'عميل';
      const phone = (document.getElementById('formPhone') || {}).value || '';
      const neighborhood = (document.getElementById('formDistrict') || {}).value || 'الرياض';
      const service = (document.getElementById('formService') || {}).value || 'طلب دهانات وديكورات';
      const notes = (document.getElementById('formNotes') || {}).value || 'بدون ملاحظات إضافية';

      if (!phone.trim()) {
        alert('يرجى كتابة رقم الجوال للتواصل معكم');
        return;
      }

      triggerGoogleConversion(CONVERSION_LABEL_FORM);

      const message = `*طلب معاينة مجانية جديد عبر الموقع:*%0A` +
                      `👤 *الاسم:* ${encodeURIComponent(name)}%0A` +
                      `📱 *الجوال:* ${encodeURIComponent(phone)}%0A` +
                      `📍 *الحي:* ${encodeURIComponent(neighborhood)}%0A` +
                      `🎨 *الخدمة المطلوبة:* ${encodeURIComponent(service)}%0A` +
                      `📝 *تفاصيل إضافية:* ${encodeURIComponent(notes)}`;

      const whatsappUrl = `https://wa.me/${CLIENT_INT_PHONE}?text=${message}`;
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 300);
    });
  }

});
