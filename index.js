const init = () => {
  const articles = document.querySelectorAll("article");

  articles.forEach((article) => {
    const observerArticle = observerAnimation("bounceScaleUp");
    observerArticle.observe(article);
  });
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

const titleBounce = () => {
  const title = document.querySelector("header h1");
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
  titleBounce();
  init();
});
