document.addEventListener("DOMContentLoaded", function () {
  //Global variables

  const sections = document.querySelectorAll("section");
  const ulNavList = document.getElementById("navbar__list");
  const btn = document.querySelector('.button');

  btn.onmousemove = function(e) {
    const x = e.pageX - btn.offsetLeft;
    const y = e.pageY - btn.offsetTop;

    btn.style.setProperty('--x', x + 'px');
    btn.style.setProperty('--y', y + 'px');
  }

  //End of global variables

  //Build the nav
  function buildMenuBar() {
    for (const section of sections) {
      //Creating link element and List element
      let li = document.createElement("li");
      let anchor = document.createElement("a");

      // atribute class and id to list element
      li.setAttribute("id", "navigate");
      anchor.classList.add(section.id);
      // add class and names
      const navNames = section.getAttribute("data-nav");
      anchor.innerHTML = navNames;
      anchor.classList.add("menu__link");

      // Append the anchor to the list item
      li.appendChild(anchor);

      //Append the list item to the list
      ulNavList.appendChild(li);

      //scroll to section target
      anchor.addEventListener("click", () => {
        section.scrollIntoView({ behavior: "smooth" });
      });
    }
  }

  window.addEventListener("load", buildMenuBar);

  // scroll to top variables
  let scrollToTopBtn = document.querySelector(".scrollToTopBtn");
  let rootElement = document.documentElement;

  function handleScroll() {
    let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (rootElement.scrollTop / scrollTotal > 0.8) {
      // Show button
      scrollToTopBtn.classList.add("showBtn");
    } else {
      // Hide button
      scrollToTopBtn.classList.remove("showBtn");
    }
  }

  // Scroll to top logic
  function scrollToTop() {
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  scrollToTopBtn.addEventListener("click", scrollToTop);
  document.addEventListener("scroll", handleScroll);

  //hide nav bar
  let lastScrollTop = 0;
  const header = document.getElementById("header");

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      header.style.top = "-100px";
    } else {
      header.style.top = "0";
    }
    lastScrollTop = scrollTop;
  });

  //create function to get position from top of the page
  function viewport(section) {
    const position = section.getBoundingClientRect();
    return (position.top <= 180 && position.bottom >= 180)
  }

  //create scroll event listener function for each section
  window.addEventListener("scroll", () => {
    sections.forEach((section) => {
      if (viewport(section)) {
        //add class to navbar
        let id = section.getAttribute("id");
        document.querySelector(`.${id}`).classList.add("active-nav");
        //add class to section
        section.classList.add("your-active-class");
      } else {
        //remove class from navbar
        let id = section.getAttribute("id");
        document.querySelector(`.${id}`).classList.remove("active-nav");
        //remove class from section
        section.classList.remove("your-active-class");
      }
    });
  });
});
