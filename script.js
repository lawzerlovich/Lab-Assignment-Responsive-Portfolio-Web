// ==========================================
// 1. DARK ESPRESSO / WARM CREAM THEME TOGGLE
// ==========================================
const navList = document.querySelector("header nav ul");
const themeLi = document.createElement("li");
const themeBtn = document.createElement("button");
themeBtn.className = "theme-toggle-btn";
themeBtn.setAttribute("aria-label", "Toggle color theme");

// Check if user previously picked dark mode
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeBtn.innerText = "☀️ Cream";
} else {
    themeBtn.innerText = "🌙 Dark";
}

themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    themeBtn.innerText = isDark ? "☀️ Cream" : "🌙 Dark";
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    updateTopButtonTheme();
});

themeLi.appendChild(themeBtn);
if (navList) {
    navList.appendChild(themeLi);
}

// ==========================================
// 2. TOP SCROLL PROGRESS BAR
// ==========================================
const progressBar = document.createElement("div");
Object.assign(progressBar.style, {
    position: "fixed",
    top: "0",
    left: "0",
    height: "3px",
    width: "0%",
    backgroundColor: "var(--accent-bar)",
    zIndex: "1001",
    transition: "width 0.1s ease-out, background-color 0.4s ease"
});
document.body.appendChild(progressBar);

// ==========================================
// 3. SATISFYING SCROLL-REVEAL ANIMATIONS
// ==========================================
const cardsToAnimate = document.querySelectorAll(
    ".bio-card, .profile-card, .roots-card, .trait-card"
);

cardsToAnimate.forEach((card, index) => {
    card.classList.add("reveal-card");
    // Add subtle stagger delay for cards sitting side-by-side
    card.style.transitionDelay = `${(index % 2) * 0.12}s`;
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                // Clear stagger delay after entrance so hover lifts feel instant
                setTimeout(() => {
                    entry.target.style.transitionDelay = "0s";
                }, 850);
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);

cardsToAnimate.forEach((card) => revealObserver.observe(card));

// ==========================================
// 4. FLOATING "BACK TO TOP" BUTTON
// ==========================================
const topBtn = document.createElement("button");
topBtn.innerText = "↑";
topBtn.title = "Scroll to top";

Object.assign(topBtn.style, {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: "none",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)",
    opacity: "0",
    visibility: "hidden",
    transform: "translateY(16px) scale(0.9)",
    zIndex: "1000",
    transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.3s ease, background-color 0.3s ease"
});

function updateTopButtonTheme() {
    const isDark = document.body.classList.contains("dark-theme");
    topBtn.style.backgroundColor = isDark ? "#f2ede4" : "#38332d";
    topBtn.style.color = isDark ? "#1c1917" : "#f7f4ed";
}
updateTopButtonTheme();

topBtn.addEventListener("mouseenter", () => {
    topBtn.style.transform = "translateY(-3px) scale(1.06)";
});

topBtn.addEventListener("mouseleave", () => {
    if (window.scrollY > 200) {
        topBtn.style.transform = "translateY(0) scale(1)";
    }
});

document.body.appendChild(topBtn);

// Handle scroll progress bar & Back-to-Top button visibility
window.addEventListener("scroll", () => {
    // Update top progress bar width
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;

    // Smoothly reveal or hide Back-to-Top button
    if (scrollTop > 200) {
        topBtn.style.opacity = "1";
        topBtn.style.visibility = "visible";
        topBtn.style.transform = "translateY(0) scale(1)";
    } else {
        topBtn.style.opacity = "0";
        topBtn.style.visibility = "hidden";
        topBtn.style.transform = "translateY(16px) scale(0.9)";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});