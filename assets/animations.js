const initRevealObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  document.querySelectorAll(".reveal, .section-entrance, .stagger-reveal").forEach(el => {
    observer.observe(el);
  });

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          if (node.matches?.(".reveal, .section-entrance, .stagger-reveal")) {
            observer.observe(node);
          }
          node.querySelectorAll?.(".reveal, .section-entrance, .stagger-reveal").forEach(el => {
            observer.observe(el);
          });
        }
      });
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });
};

document.addEventListener("DOMContentLoaded", initRevealObserver);
