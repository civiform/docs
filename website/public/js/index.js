(() => {
  // node_modules/@cagov/ds-site-navigation/dist/index.js
  function mobileView() {
    const mobileElement = document.querySelector(".site-header .grid-mobile-icons");
    if (mobileElement) {
      return getComputedStyle(mobileElement).display !== "none";
    }
    return false;
  }
  var CAGovSiteNavigation = class extends window.HTMLElement {
    connectedCallback() {
      document.querySelector(".cagov-nav.open-menu").addEventListener("click", this.toggleMainMenu.bind(this));
      const mobileSearchBtn = document.querySelector(".cagov-nav.mobile-search .search-btn");
      if (mobileSearchBtn) {
        mobileSearchBtn.setAttribute("aria-expanded", "false");
        document.querySelector(".search-container--small .site-search input").setAttribute("tabindex", "-1");
        document.querySelector(".search-container--small .site-search button.search-submit").setAttribute("tabindex", "-1");
        document.querySelector(".search-container--small").setAttribute("aria-hidden", "true");
        if (mobileView()) {
          mobileSearchBtn.addEventListener("click", () => {
            document.querySelector(".search-container--small").classList.toggle("hidden-search");
            const searchactive = document.querySelector(".search-container--small").classList.contains("hidden-search");
            if (searchactive) {
              mobileSearchBtn.setAttribute("aria-expanded", "false");
              document.querySelector(".search-container--small .site-search input").setAttribute("tabindex", "-1");
              document.querySelector(".search-container--small .site-search button.search-submit").setAttribute("tabindex", "-1");
              document.querySelector(".search-container--small").setAttribute("aria-hidden", "true");
            } else {
              mobileSearchBtn.setAttribute("aria-expanded", "true");
              document.querySelector(".search-container--small .site-search input").focus();
              document.querySelector(".search-container--small .site-search input").removeAttribute("tabindex");
              document.querySelector(".search-container--small .site-search button.search-submit").removeAttribute("tabindex");
              document.querySelector(".search-container--small").setAttribute("aria-hidden", "false");
            }
          });
        }
      }
      window.addEventListener("resize", () => {
        document.querySelector(".search-container--small").classList.add("hidden-search");
        if (mobileSearchBtn) {
          document.querySelector(".cagov-nav.mobile-search .search-btn").setAttribute("aria-expanded", "false");
        }
        document.querySelector(".search-container--small .site-search input").setAttribute("tabindex", "-1");
        document.querySelector(".search-container--small .site-search button.search-submit").setAttribute("tabindex", "-1");
        document.querySelector(".search-container--small").setAttribute("aria-hidden", "true");
        this.closeAllMenus();
        this.closeMainMenu();
      });
      this.expansionListeners();
      document.addEventListener("keydown", this.escapeMainMenu.bind(this));
      document.body.addEventListener("click", this.bodyClick.bind(this));
      this.highlightCurrentPage();
    }
    toggleMainMenu() {
      if (document.querySelector(".cagov-nav.hamburger").classList.contains("is-active")) {
        this.closeMainMenu();
      } else {
        this.openMainMenu();
      }
    }
    highlightCurrentPage() {
      this.querySelectorAll("a.expanded-menu-dropdown-link").forEach((link) => {
        if (link.href === window.location.href) {
          link.classList.add("current-page-highlight");
        }
      });
    }
    openMainMenu() {
      document.querySelector(".mobile-icons").classList.add("display-menu");
      this.classList.add("display-menu");
      document.querySelector(".cagov-nav.hamburger").classList.add("is-active");
      document.querySelector(".cagov-nav.menu-trigger").classList.add("is-fixed");
      document.querySelector(".cagov-nav.menu-trigger").setAttribute("aria-expanded", "true");
      const menLabel = document.querySelector(".cagov-nav.menu-trigger-label");
      menLabel.innerHTML = menLabel.getAttribute("data-closelabel");
    }
    closeMainMenu() {
      document.querySelector(".mobile-icons").classList.remove("display-menu");
      this.classList.remove("display-menu");
      document.querySelector(".cagov-nav.hamburger").classList.remove("is-active");
      document.querySelector(".cagov-nav.menu-trigger").classList.remove("is-fixed");
      document.querySelector(".cagov-nav.menu-trigger").setAttribute("aria-expanded", "false");
      const menLabel = document.querySelector(".cagov-nav.menu-trigger-label");
      menLabel.innerHTML = menLabel.getAttribute("data-openlabel");
    }
    escapeMainMenu(event) {
      if (event.keyCode === 27) {
        this.closeAllMenus();
      }
    }
    bodyClick(event) {
      if (!event.target.closest("cagov-site-navigation")) {
        this.closeAllMenus();
      }
    }
    closeAllMenus() {
      const allMenus = this.querySelectorAll(".js-cagov-navoverlay-expandable");
      allMenus.forEach((menu) => {
        const expandedEl = menu.querySelector(".expanded-menu-section");
        expandedEl.classList.remove("expanded");
        const closestDropDown = menu.querySelector(".expanded-menu-dropdown");
        if (closestDropDown && closestDropDown.id && menu.querySelector(`button[aria-controls=${closestDropDown.id}]`)) {
          menu.querySelector(`button[aria-controls=${closestDropDown.id}]`).setAttribute("aria-expanded", "false");
        }
        if (closestDropDown) {
          closestDropDown.setAttribute("aria-hidden", "true");
          const allLinks = closestDropDown.querySelectorAll("a");
          allLinks.forEach((link) => {
            link.setAttribute("tabindex", "-1");
          });
        }
      });
    }
    expansionListeners() {
      const allMenus = this.querySelectorAll(".js-cagov-navoverlay-expandable");
      allMenus.forEach((menu) => {
        const nearestMenu = menu.querySelector(".expanded-menu-section");
        if (nearestMenu) {
          const nearestMenuDropDown = nearestMenu.querySelector(".expanded-menu-dropdown");
          if (nearestMenuDropDown) {
            nearestMenuDropDown.setAttribute("aria-hidden", "true");
            if (nearestMenuDropDown && nearestMenuDropDown.id && menu.querySelector(`button[aria-controls=${nearestMenuDropDown.id}]`)) {
              menu.querySelector(`button[aria-controls=${nearestMenuDropDown.id}]`).setAttribute("aria-expanded", "false");
            }
          }
        }
        const menuComponent = this;
        menu.addEventListener("click", function addingClickListener(event) {
          if (event.target.nodeName !== "A") {
            event.preventDefault();
          }
          const expandedEl = this.querySelector(".expanded-menu-section");
          if (expandedEl) {
            if (expandedEl.classList.contains("expanded")) {
              menuComponent.closeAllMenus();
            } else {
              menuComponent.closeAllMenus();
              expandedEl.classList.add("expanded");
              const closestDropDown = this.querySelector(".expanded-menu-dropdown");
              if (closestDropDown && closestDropDown.id && menu.querySelector(`button[aria-controls=${closestDropDown.id}]`)) {
                menu.querySelector(`button[aria-controls=${closestDropDown.id}]`).setAttribute("aria-expanded", "true");
              }
              if (closestDropDown) {
                closestDropDown.setAttribute("aria-hidden", "false");
                const allLinks = closestDropDown.querySelectorAll("a");
                allLinks.forEach((link) => {
                  link.removeAttribute("tabindex");
                });
              }
            }
          }
        });
      });
    }
  };
  window.customElements.define("cagov-site-navigation", CAGovSiteNavigation);

  // src/js/index.js
  console.log("index.js loaded");
})();
