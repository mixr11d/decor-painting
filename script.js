/**
 * Centralized Script, UI Injector & Google Ads Tracking Engine
 * Activity: Modern Paints & Gypsum Board - Riyadh
 * Client Phone: 0557482300
 */

// =========================================================================
// 1. الإعدادات المركزية (Google Ads Config)
// =========================================================================
const CLIENT_PHONE = '0557482300';
const CLIENT_INT_PHONE = '966557482300';
const DEV_PHONE_EXCLUDED = '966578539687';

const GOOGLE_ADS_ID = 'AW-18398762505'; 
const CONVERSION_LABEL_CALL = 'hlUXCObsp-QcEImsm8VE'; 
const CONVERSION_LABEL_WHATSAPP = 'eShNCOnsp-QcEImsm8VE'; 
const CONVERSION_LABEL_FORM = 'EdZZCOnQquQcEImsm8VE'; 

// =========================================================================
// 2. التهيئة القياسية لـ Google Tag في النطاق العام (Global Scope)
// =========================================================================
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
window.gtag = gtag;

gtag('js', new Date());
gtag('config', GOOGLE_ADS_ID);

// حقن مكتبة Google Tag في الـ Head فوراً
(function injectGoogleTag() {
  if (GOOGLE_ADS_ID && !document.getElementById('google-ads-tag')) {
    const scriptTag = document.createElement('script');
    scriptTag.id = 'google-ads-tag';
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    document.head.appendChild(scriptTag);
  }
})();

// دالة إرسال الإحالة الرسمية والمعتمدة من Google Ads
function triggerGoogleConversion(label, callbackUrl) {
  if (typeof window.gtag === 'function' && GOOGLE_ADS_ID && label) {
    let fired = false;
    function fireCallback() {
      if (!fired && callbackUrl) {
        fired = true;
        window.location.href = callbackUrl;
      }
    }

    // إرسال حدث التحويل الرسمي لجوجل
    window.gtag('event', 'conversion', {
      'send_to': `${GOOGLE_ADS_ID}/${label}`,
      'event_callback': fireCallback
    });

    // مهلة أمان احتياطية
    setTimeout(fireCallback, 500);
  } else if (callbackUrl) {
    window.location.href = callbackUrl;
  }
}

// =========================================================================
// 3. الحقن التلقائي للأزرار العائمة وإدارة التفاعل
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  
  // حقن أزرار الاتصال والواتساب باليمين
  if (!document.querySelector('.fab-container-right')) {
    const fabRight = document.createElement('div');
    fabRight.className = 'fab-container-right';
    fabRight.innerHTML = `
      <a href="https://wa.me/${CLIENT_INT_PHONE}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن خدمات الدهانات والديكورات بالرياض')}" 
         class="fab-btn fab-whatsapp fab-shake" 
         id="fabWhatsappBtn"
         target="_blank" 
         rel="noopener noreferrer" 
         aria-label="WhatsApp">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84s-3.64 2.4-5.82 2.4c-1.4 0-2.77-.35-4-1.01l-.29-.17-3.12.82.83-3.04-.19-.3A8.163 8.163 0 013.8 11.91c0-4.54 3.7-8.24 8.25-8.24zm4.8 11.75c-.26-.13-1.56-.77-1.81-.86-.24-.09-.42-.13-.6.13-.18.27-.69.86-.84 1.04-.16.18-.31.2-.57.07-.26-.13-1.1-.41-2.1-1.3-.78-.7-1.31-1.56-1.46-1.82-.16-.27-.02-.41.11-.54.12-.12.26-.31.39-.46.13-.16.18-.27.26-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.44-.82-1.98-.22-.52-.44-.45-.6-.46-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27s.97 2.64 1.11 2.82c.13.18 1.91 2.92 4.63 4.09.65.28 1.15.45 1.55.57.65.21 1.25.18 1.72.11.53-.08 1.56-.64 1.78-1.25.22-.62.22-1.15.15-1.26-.07-.12-.24-.19-.5-.32z"/>
        </svg>
      </a>
      <a href="tel:${CLIENT_PHONE}" class="fab-btn fab-call fab-shake" id="fabCallBtn" aria-label="Call">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
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
  // 4. الرصد المركزي لنقرات الاتصال والواتساب مع استبعاد المطور
  // =========================================================================
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (!target) return;

    const href = target.getAttribute('href') || '';

    // استبعاد رقم المطور تماماً
    if (href.includes(DEV_PHONE_EXCLUDED) || href.includes('0578539687')) {
      return;
    }

    // تتبع نقرات الاتصال
    if (href.startsWith(`tel:${CLIENT_PHONE}`) || href.startsWith(`tel:+966${CLIENT_PHONE.substring(1)}`)) {
      triggerGoogleConversion(CONVERSION_LABEL_CALL);
    }

    // تتبع نقرات الواتساب
    if (href.includes(CLIENT_INT_PHONE) || href.includes(CLIENT_PHONE) || href.includes('wa.me')) {
      triggerGoogleConversion(CONVERSION_LABEL_WHATSAPP);
    }
  });

  // =========================================================================
  // 5. إرسال النموذج وتتبع تحويل الفورم
  // =========================================================================
  const leadForm = document.getElementById('inspectionForm') || document.getElementById('leadQuoteForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = (document.getElementById('formName') || {}).value || 'عميل';
      const phone = (document.getElementById('formPhone') || {}).value || '';
      const neighborhood = (document.getElementById('formDistrict') || {}).value || 'الرياض';
      const service = (document.getElementById('formService') || {}).value || 'طلب دهانات وديكورات';
      const notes = (document.getElementById('formNotes') || document.getElementById('formDetails') || {}).value || 'بدون ملاحظات إضافية';

      if (!phone.trim()) {
        alert('يرجى كتابة رقم الجوال للتواصل معكم');
        return;
      }

      // إرسال إحالة النموذج لجوجل
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

  // =========================================================================
  // 6. القائمة الجانبية للجوال
  // =========================================================================
  const mobileToggle = document.querySelector('.mobile-toggle') || document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu') || document.querySelector('.mobile-sidebar');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.preventDefault();
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  const closeBtn = document.querySelector('.drawer-close-btn') || document.querySelector('.close-sidebar-btn');
  if (closeBtn && navMenu) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // =========================================================================
  // 7. زر الصعود للأعلى
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
