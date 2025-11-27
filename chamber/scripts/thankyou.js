// Thank you page script — moved from inline in thankyou.html
document.addEventListener('DOMContentLoaded', () => {
  // footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function safeText(s){
    if(!s) return '';
    return String(s).replace(/[<>]/g,'');
  }

  const params = new URLSearchParams(window.location.search);
  const outFirst = document.getElementById('out-firstName');
  const outLast = document.getElementById('out-lastName');
  const outEmail = document.getElementById('out-email');
  const outPhone = document.getElementById('out-phone');
  const outBusiness = document.getElementById('out-businessName');
  const outTs = document.getElementById('out-timestamp');

  if (outFirst) outFirst.textContent = safeText(params.get('firstName'));
  if (outLast) outLast.textContent = safeText(params.get('lastName'));
  if (outEmail) outEmail.textContent = safeText(params.get('email'));
  if (outPhone) outPhone.textContent = safeText(params.get('phone'));
  if (outBusiness) outBusiness.textContent = safeText(params.get('businessName'));
  const ts = params.get('timestamp');
  if (outTs) outTs.textContent = ts ? new Date(ts).toString() : '';
});
