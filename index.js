const initAnimation = () => {
  bounce("header h1");
  bounce("footer p");
  createEarth();
  createHuman();

  const articles = document.querySelectorAll("article");

  articles.forEach((article) => {
    observerAnimation("bounceScaleUp").observe(article);
  });

  const testimonial = document.querySelector(".testimonial");
  const events = document.querySelector(".events");

  observerAnimation("fadeInUp").observe(testimonial);
  observerAnimation("fadeInUp").observe(events);
};

const observerAnimation = (token) => {
  return new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(token);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.5,
    }
  );
};

const createEarth = () => {
  const earthDiv = document.createElement("div");
  earthDiv.className = "earth";
  document.body.querySelector("section").appendChild(earthDiv);
  const earth = document.querySelector(".earth");
  const actionCallH2 = document.querySelector(".action-call p");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const earthRect = earth.getBoundingClientRect();
          const currentTop = earthRect.top + window.scrollY;

          earth.style.position = "absolute";
          earth.style.top = `${currentTop + 100}px`;
        } else {
          earth.style.position = "fixed";
          earth.style.top = "50%";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  observer.observe(actionCallH2);
};

const createHuman = () => {
  const humanDiv = document.createElement("div");
  humanDiv.className = "human";
  document.body.appendChild(humanDiv);

  const target = document.querySelector(".action-call");
  const human = document.querySelector(".human");
  const earth = document.querySelector(".earth");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", handleScroll);
        } else {
          window.removeEventListener("scroll", handleScroll);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  observer.observe(target);

  function handleScroll() {
    let newTop = -50 + window.scrollY / 12;
    let newLeft = -50 + window.scrollY / 12;

    human.style.top = `${newTop}%`;
    human.style.left = `${newLeft}%`;

    if (newTop >= 50 && newLeft >= 50) {
      human.style.top = "50%";
      human.style.left = "50%";
      human.style.display = "none";
      earth.style.backgroundImage = "url(./image/hug.png)";

      window.removeEventListener("scroll", handleScroll);
    }
  }
};

const bounce = (query) => {
  const title = document.querySelector(query);
  const text = title.innerText;

  // 원래 텍스트를 숨겨서 접근성을 유지
  const accessibleSpan = document.createElement("span");
  accessibleSpan.innerText = text;
  accessibleSpan.style.position = "absolute";
  accessibleSpan.style.left = "-9999px";
  accessibleSpan.style.width = "1px";
  accessibleSpan.style.height = "1px";

  title.innerHTML = ""; // 기존 내용을 삭제
  title.appendChild(accessibleSpan); // 접근성을 위한 span 추가

  // 애니메이션을 위한 span들 추가
  text.split(" ").forEach((word, index) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "char"; // 애니메이션용 클래스
    wordSpan.style.animationDelay = `${index * 0.1}s`;
    wordSpan.textContent =
      word + (index < text.split(" ").length - 1 ? " " : ""); // 공백 추가
    wordSpan.setAttribute("aria-hidden", "true"); // 스크린 리더에서 이 span들을 무시하도록 설정
    title.appendChild(wordSpan);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initAnimation();

  const sections = document.querySelectorAll("section > article");
  sections.forEach((section, idx) => {
    const h2 = section.querySelector("h2");
    if (h2) {
      const id = `header-${idx}`;
      h2.id = id;
      section.setAttribute("aria-labelledby", id);
    }
  });
});
