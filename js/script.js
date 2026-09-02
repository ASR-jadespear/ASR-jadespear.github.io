// =========================================================
// PORTFOLIO JAVASCRIPT
// =========================================================

console.log("ASR Portfolio loaded successfully.");


// =========================================================
// CURRENT YEAR
// =========================================================

const currentYear = new Date().getFullYear();

const footerYear = document.querySelector("footer p");

if (footerYear) {
    footerYear.textContent = `© ${currentYear} Abu Sayeem Rafi`;
}