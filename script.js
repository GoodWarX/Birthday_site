const photos = [
  "photo_2026-06-20_13-38-56 (2).jpg",
  "1544873329174.jpg",
  "1544873330204.jpg",
  "1544873337979.jpg",
  "1544873428100.jpg",
  "20240217_192718.jpg",
  "20240217_192740.jpg",
  "20240217_192752.jpg",
  "agWlMebPgSU.jpg",
  "FB_IMG_1571572308934.jpg",
  "IMG_20160316_071719355.jpg",
  "IMG_20160316_071737046.jpg",
  "IMG_20160316_071751341.jpg",
  "IMG_20180210_101524.jpg",
  "IMG_20181225_231750.jpg",
  "IMG_20181229_120354.jpg",
  "IMG_20190114_235951.jpg",
  "IMG_20190202_144404.jpg",
  "IMG_20190208_214020_HHT.jpg",
  "IMG_20190215_002911.jpg",
  "IMG_20190312_115303.jpg",
  "IMG_20190319_183956.jpg",
  "IMG_20190319_190728.jpg",
  "IMG_20190319_190731.jpg",
  "IMG_20191019_163244.jpg",
  "Screenshot_2019-03-14-10-26-24-188_com.instagram.android.png",
  "Screenshot_2019-03-14-10-26-26-377_com.instagram.android.png",
  "Screenshot_2019-03-14-10-26-30-188_com.instagram.android.png",
  "Screenshot_2019-03-14-10-26-33-383_com.instagram.android.png",
  "Screenshot_2020-02-16-16-46-32-833_com.viber.voip.jpg",
  "Screenshot_20260105_214414_Signal.jpg",
  "TtL6pQywqpI.jpg",
  "photo_2026-06-20_13-38-56.jpg"
];

const pages = [
  {
    type: "cover",
    html: `
      <h1>Вітаю з 25-річям</h1>
      <div class="subtitle">для найкрутішої поцяти</div>
    `
  },
  {
    type: "text",
    title: "Ну що, поцято",
    paragraphs: [
      "Вітаю тебе з Днем народження! 🎂🎉🎊",
      "Сьогодні тобі вже 25 років! 🥳",
      "Так, це вже ціла чверть століття. Але якщо чесно, зараз у тебе починається один із найцікавіших періодів у житті."
    ]
  },
  {
    type: "wishes",
    title: "Бажаю тобі",
    items: [
      "✨ Безмежного щастя — щоб його вистачало і на тебе, і на всю вашу майбутню сім'ю.",
      "💪 Міцного здоров'я — зараз воно потрібне як ніколи.",
      "💰 Мані — щоб вистачало не тільки на себе, а й на всі ті дитячі штуки, ціни на які придумували явно не батьки 😂"
    ]
  },
  {
    type: "wishes",
    title: "Тепла і затишку",
    items: [
      "❤️ Любові та сімейного затишку — щоб у вашому домі завжди панували тепло, взаєморозуміння та щасливий сміх.",
      "👶 Легкого очікування малюка, спокійних ночей (наскільки це взагалі можливо 😆) та безлічі щасливих моментів, які запам'ятаються на все життя.",
      "🌟 Нехай усі мрії збуваються, а проблеми гублять твою адресу і йдуть кудись дуже далеко."
    ]
  },
  {
    type: "text",
    title: "І пам'ятай",
    paragraphs: [
      "👊 А всі негаразди нехай обходять тебе стороною.",
      "25 років — це чудовий вік. Уже достатньо доросла, щоб приймати серйозні рішення, але ще достатньо молода для пригод і нових звершень."
    ]
  },
  {
    type: "text",
    title: "Коротше кажучи, поцято",
    paragraphs: [
      "Бажаю тобі завжди залишатися такою ж доброю, красивою, веселою та щирою.",
      "Нехай поруч будуть люблячий чоловік, здорова дитинка, вірні друзі та багато приводів для щасливої усмішки. ❤️",
      "З Днюхою тебе! 🎂🎉🥂✨"
    ]
  },
  {
    type: "text",
    title: "І ще одне",
    paragraphs: [
      "А наступного року святкуватимеш уже в статусі мами.",
      "Так що насолоджуйся останніми днями, коли можна спокійно поспати до обіду 😂"
    ]
  },
  ...photos.map((photo, index) => ({
    type: "photo",
    photo,
    title: index === 0 ? "Фотоальбом" : "Спогад",
    caption: `Сторінка ${index + 1} з ${photos.length}`
  })),
  {
    type: "finale",
    html: `
      <h2>З Днюхою!</h2>
      <p>Нехай цей рік буде яскравим, теплим і щасливим. А тепер — салют тільки для тебе ✨</p>
    `
  }
];

const pageSpread = document.querySelector("#pageSpread");
const stage = document.querySelector(".stage");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const pageNumber = document.querySelector("#pageNumber");
const pageTotal = document.querySelector("#pageTotal");
const birthdayAudio = document.querySelector("#birthdayAudio");
const soundBtn = document.querySelector("#soundBtn");
const startLayer = document.querySelector("#startLayer");
const startBtn = document.querySelector("#startBtn");
const fireworksCanvas = document.querySelector("#fireworks");
const fireworksContext = fireworksCanvas.getContext("2d");

let currentPage = 0;
let audioEnabled = false;
let fireworksRunning = false;
let particles = [];
let lastBurst = 0;
let animationFrame = 0;
let celebrationTimer = 0;
let closingTimer = 0;

function isSinglePageView() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function getSpreadCount() {
  return Math.ceil(pages.length / 2);
}

function ensureCelebrationScreen() {
  let celebrationScreen = document.querySelector("#celebrationScreen");

  if (!celebrationScreen) {
    celebrationScreen = document.createElement("section");
    celebrationScreen.className = "celebration-screen";
    celebrationScreen.id = "celebrationScreen";
    celebrationScreen.setAttribute("aria-live", "polite");
    celebrationScreen.innerHTML = `
      <div class="celebration-message">
        <h2>Вітаю з 25-річям!</h2>
        <p>Нехай життя буде яскравим, теплим і щасливим.</p>
      </div>
    `;
    document.body.append(celebrationScreen);
  }

  return celebrationScreen;
}

function resetFinalCelebration() {
  clearTimeout(celebrationTimer);
  clearTimeout(closingTimer);
  document.body.classList.remove("final-celebration");
  stage.classList.remove("book-closing", "is-gone");
  document.querySelector("#celebrationScreen")?.classList.remove("is-visible");
}

function beginFinalCelebration() {
  if (document.body.classList.contains("final-celebration")) {
    return;
  }

  const celebrationScreen = ensureCelebrationScreen();
  startFireworks();

  celebrationTimer = window.setTimeout(() => {
    stage.classList.add("book-closing");
    document.body.classList.add("final-celebration");
    celebrationScreen.classList.add("is-visible");
  }, 1800);

  closingTimer = window.setTimeout(() => {
    stage.classList.add("is-gone");
  }, 3600);
}

function createPage(page, side) {
  const element = document.createElement("article");
  element.className = `page ${side}`;

  if (!page) {
    element.innerHTML = "";
    return element;
  }

  if (page.type === "cover") {
    element.classList.add("cover");
  }

  if (page.type === "finale") {
    element.classList.add("finale");
  }

  if (page.type === "cover" || page.type === "finale") {
    element.innerHTML = page.html;
  }

  if (page.type === "text") {
    element.classList.add("text-page");
    element.innerHTML = `
      <h2>${page.title}</h2>
      ${page.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    `;
  }

  if (page.type === "wishes") {
    element.classList.add("text-page");
    element.innerHTML = `
      <h2>${page.title}</h2>
      <ul class="wish-list">
        ${page.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
  }

  if (page.type === "photo") {
    element.classList.add("photo-page");
    element.innerHTML = `
      <h2>${page.title}</h2>
      <figure class="photo-frame">
        <img src="assets/photos/${encodeURIComponent(page.photo)}" alt="Фото з альбому">
        <figcaption class="photo-caption">${page.caption}</figcaption>
      </figure>
    `;
  }

  return element;
}

function renderSpread(direction = "right") {
  const singlePageView = isSinglePageView();
  const spreadCount = getSpreadCount();
  const isFinalSinglePage = singlePageView && currentPage === pages.length - 1;
  const spreadStart = Math.floor(currentPage / 2) * 2;
  const isFinalSpread = !singlePageView && spreadStart >= (spreadCount - 1) * 2;

  if (!isFinalSinglePage && !isFinalSpread) {
    resetFinalCelebration();
  }

  if (singlePageView) {
    const page = createPage(pages[currentPage], "right");
    page.classList.add(direction === "left" ? "turning-left" : "turning-right");
    pageSpread.replaceChildren(page);
    pageNumber.textContent = currentPage + 1;
    pageTotal.textContent = pages.length;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === pages.length - 1;

    if (isFinalSinglePage) {
      beginFinalCelebration();
    } else {
      stopFireworks();
    }

    return;
  }

  const leftPage = pages[spreadStart] || null;
  const rightPage = pages[spreadStart + 1] || null;
  const left = createPage(leftPage, "left");
  const right = createPage(rightPage, "right");

  left.classList.add(direction === "left" ? "turning-left" : "turning-right");
  right.classList.add(direction === "left" ? "turning-left" : "turning-right");

  pageSpread.replaceChildren(left, right);
  pageNumber.textContent = Math.floor(spreadStart / 2) + 1;
  pageTotal.textContent = spreadCount;
  prevBtn.disabled = spreadStart === 0;
  nextBtn.disabled = spreadStart >= (spreadCount - 1) * 2;

  if (isFinalSpread) {
    beginFinalCelebration();
  } else {
    stopFireworks();
  }
}

function nextPage() {
  if (isSinglePageView()) {
    if (currentPage < pages.length - 1) {
      currentPage += 1;
      renderSpread("right");
    }

    return;
  }

  const spreadCount = getSpreadCount();
  const spreadStart = Math.floor(currentPage / 2) * 2;

  if (spreadStart < (spreadCount - 1) * 2) {
    currentPage = Math.min(spreadStart + 2, pages.length - 1);
    renderSpread("right");
  }
}

function prevPage() {
  if (isSinglePageView()) {
    if (currentPage > 0) {
      currentPage -= 1;
      renderSpread("left");
    }

    return;
  }

  const spreadStart = Math.floor(currentPage / 2) * 2;

  if (spreadStart > 0) {
    currentPage = Math.max(spreadStart - 2, 0);
    renderSpread("left");
  }
}

async function playMusic() {
  try {
    birthdayAudio.volume = 0.78;
    await birthdayAudio.play();
    audioEnabled = true;
    soundBtn.textContent = "Пауза";
  } catch {
    audioEnabled = false;
    soundBtn.textContent = "Увімкнути музику";
  }
}

function toggleMusic() {
  if (birthdayAudio.paused) {
    playMusic();
  } else {
    birthdayAudio.pause();
    audioEnabled = false;
    soundBtn.textContent = "Увімкнути музику";
  }
}

function resizeFireworks() {
  const pixelRatio = window.devicePixelRatio || 1;
  fireworksCanvas.width = Math.floor(window.innerWidth * pixelRatio);
  fireworksCanvas.height = Math.floor(window.innerHeight * pixelRatio);
  fireworksContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function burst(x, y) {
  const colors = ["#ffd166", "#ef476f", "#06d6a0", "#7bdff2", "#f7f7ff", "#f77f00"];
  const count = 70;

  for (let index = 0; index < count; index += 1) {
    const angle = (Math.PI * 2 * index) / count;
    const speed = 2 + Math.random() * 5.4;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 70 + Math.random() * 30,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 1.8 + Math.random() * 2.8
    });
  }
}

function animateFireworks(time = 0) {
  fireworksContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

  if (time - lastBurst > 620) {
    lastBurst = time;
    burst(
      window.innerWidth * (0.18 + Math.random() * 0.64),
      window.innerHeight * (0.16 + Math.random() * 0.38)
    );
  }

  particles = particles.filter((particle) => particle.life > 0);

  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.045;
    particle.life -= 1;

    fireworksContext.globalAlpha = Math.max(particle.life / 90, 0);
    fireworksContext.fillStyle = particle.color;
    fireworksContext.beginPath();
    fireworksContext.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    fireworksContext.fill();
  }

  fireworksContext.globalAlpha = 1;

  if (fireworksRunning) {
    animationFrame = requestAnimationFrame(animateFireworks);
  }
}

function startFireworks() {
  if (fireworksRunning) {
    return;
  }

  fireworksRunning = true;
  fireworksCanvas.classList.add("is-active");
  resizeFireworks();
  burst(window.innerWidth / 2, window.innerHeight * 0.28);
  animationFrame = requestAnimationFrame(animateFireworks);
}

function stopFireworks() {
  fireworksRunning = false;
  fireworksCanvas.classList.remove("is-active");
  cancelAnimationFrame(animationFrame);
  particles = [];
  fireworksContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

startBtn.addEventListener("click", () => {
  startLayer.classList.add("is-hidden");
  playMusic();
});

nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", prevPage);
soundBtn.addEventListener("click", toggleMusic);
window.addEventListener("resize", () => {
  resizeFireworks();
  renderSpread();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextPage();
  }

  if (event.key === "ArrowLeft") {
    prevPage();
  }
});

pageSpread.addEventListener("click", (event) => {
  const bounds = pageSpread.getBoundingClientRect();
  const isRightSide = event.clientX > bounds.left + bounds.width / 2;
  isRightSide ? nextPage() : prevPage();
});

renderSpread();

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    birthdayAudio.pause();
  } else if (audioEnabled) {
    playMusic();
  }
});
