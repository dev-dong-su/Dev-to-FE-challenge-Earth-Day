const init = () => {
  createEarth();
  createHuman();
  humanAnimation();

  const articles = document.querySelectorAll("article");

  articles.forEach((article) => {
    observerAnimation("bounceScaleUp").observe(article);
  });

  const testimonial = document.querySelector(".testimonial");
  const events = document.querySelector(".events");

  observerAnimation("fadeInUp").observe(testimonial);
  observerAnimation("fadeInUp").observe(events);
};

const humanAnimation = () => {
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
    let newTop = -50 + window.scrollY / 14;
    let newLeft = -50 + window.scrollY / 14;

    human.style.top = `${newTop}%`;
    human.style.left = `${newLeft}%`;

    if (newTop >= 50 && newLeft >= 50) {
      human.style.top = "50%";
      human.style.left = "50%";
      human.style.display = "none";
      earth.style.backgroundImage =
        "url(https://github.com/dev-dong-su/Dev-to-FE-challenge-Earth-Day/assets/16986867/22153170-6b68-4c15-a946-d2ea5ee174b4)";

      window.removeEventListener("scroll", handleScroll);
    }
  }
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
  const newDiv = document.createElement("div");
  newDiv.className = "earth";
  document.body.querySelector("section").appendChild(newDiv);
  const earth = document.querySelector(".earth");
  const actionCallH2 = document.querySelector(".action-call p");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const earthRect = earth.getBoundingClientRect();
          const currentTop = earthRect.top + window.scrollY;

          earth.style.position = "absolute";
          earth.style.top = `${currentTop}px`;
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
  const newDiv = document.createElement("div");
  newDiv.className = "human";
  document.body.appendChild(newDiv);
};

const bounce = (query) => {
  const title = document.querySelector(query);
  const text = title.innerText;
  let chars = text
    .split(" ")
    .map((char, index) => {
      let delay = index * 0.1 + "s";
      return `<span class="char" style="animation-delay: ${delay};">${char}</span>`;
    })
    .join(" ");
  title.innerHTML = chars;
};

document.addEventListener("DOMContentLoaded", () => {
  bounce("header h1");
  bounce("footer p");
  init();
});
