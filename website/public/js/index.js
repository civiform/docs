(() => {
  // node_modules/@cagov/ds-site-navigation/dist/index.js
  function mobileView() {
    const mobileElement = document.querySelector(
      ".site-header .grid-mobile-icons"
    );
    if (mobileElement) {
      return getComputedStyle(mobileElement).display !== "none";
    }
    return false;
  }
  var CAGovSiteNavigation = class extends window.HTMLElement {
    connectedCallback() {
      document.querySelector(".cagov-nav.open-menu").addEventListener("click", this.toggleMainMenu.bind(this));
      const mobileSearchBtn = document.querySelector(
        ".cagov-nav.mobile-search .search-btn"
      );
      if (mobileSearchBtn) {
        mobileSearchBtn.setAttribute("aria-expanded", "false");
        document.querySelector(".search-container--small .site-search input").setAttribute("tabindex", "-1");
        document.querySelector(
          ".search-container--small .site-search button.search-submit"
        ).setAttribute("tabindex", "-1");
        document.querySelector(".search-container--small").setAttribute("aria-hidden", "true");
        if (mobileView()) {
          mobileSearchBtn.addEventListener("click", () => {
            document.querySelector(".search-container--small").classList.toggle("hidden-search");
            const searchactive = document.querySelector(".search-container--small").classList.contains("hidden-search");
            if (searchactive) {
              mobileSearchBtn.setAttribute("aria-expanded", "false");
              document.querySelector(".search-container--small .site-search input").setAttribute("tabindex", "-1");
              document.querySelector(
                ".search-container--small .site-search button.search-submit"
              ).setAttribute("tabindex", "-1");
              document.querySelector(".search-container--small").setAttribute("aria-hidden", "true");
            } else {
              mobileSearchBtn.setAttribute("aria-expanded", "true");
              document.querySelector(".search-container--small .site-search input").focus();
              document.querySelector(".search-container--small .site-search input").removeAttribute("tabindex");
              document.querySelector(
                ".search-container--small .site-search button.search-submit"
              ).removeAttribute("tabindex");
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
        document.querySelector(
          ".search-container--small .site-search button.search-submit"
        ).setAttribute("tabindex", "-1");
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
          const nearestMenuDropDown = nearestMenu.querySelector(
            ".expanded-menu-dropdown"
          );
          if (nearestMenuDropDown) {
            nearestMenuDropDown.setAttribute("aria-hidden", "true");
            if (nearestMenuDropDown && nearestMenuDropDown.id && menu.querySelector(
              `button[aria-controls=${nearestMenuDropDown.id}]`
            )) {
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
              const closestDropDown = this.querySelector(
                ".expanded-menu-dropdown"
              );
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

  // node_modules/@cagov/ds-accordion/dist/index.js
  var styles = '/* initial styles */\ncagov-accordion details {\n  border-radius: var(--radius-2, 5px) !important;\n  margin-bottom: 0;\n  min-height: var(--s-5, 3rem);\n  margin-top: 0.5rem;\n  border: solid var(--border-1, 1px) var(--gray-200, #d4d4d7) !important;\n}\ncagov-accordion details summary {\n  cursor: pointer;\n  padding: var(--s-1, 0.5rem) var(--s-5, 3rem) var(--s-1, 0.5rem) var(--s-2, 1rem);\n  background-color: var(--gray-50, #fafafa);\n  position: relative;\n  line-height: var(--s-4, 2rem);\n  margin: 0;\n  color: var(--primary-700, #165ac2);\n  font-size: var(--font-size-2, 1.125rem);\n  font-weight: bold;\n}\ncagov-accordion details summary:hover {\n  background-color: var(--gray-100, #fafafa);\n  color: var(--primary-900, #003688);\n}\ncagov-accordion details .accordion-body {\n  padding: var(--s-2, 1rem);\n}\n\n/* styles applied after custom element javascript runs */\ncagov-accordion:defined {\n  /* let it be open initially if details has open attribute */\n}\ncagov-accordion:defined details {\n  transition: height var(--animation-duration-2, 0.2s);\n  height: var(--s-5, 3rem);\n  overflow: hidden;\n}\ncagov-accordion:defined details[open] {\n  height: auto;\n}\ncagov-accordion:defined summary::-webkit-details-marker {\n  display: none;\n}\ncagov-accordion:defined details summary {\n  list-style: none; /* hide default expansion triangle after js executes */\n  border-radius: var(--border-5, 5px) var(--border-5, 5px) 0 0;\n}\ncagov-accordion:defined details summary:focus {\n  outline-offset: -2px;\n  outline: solid 2px var(--accent2-500, #ac8227) !important;\n  background-color: var(--gray-100, #fafafa);\n}\ncagov-accordion:defined details .cagov-open-indicator {\n  background-color: var(--primary-700, #165ac2);\n  height: 3px;\n  width: 15px;\n  border-radius: var(--border-3, 3px);\n  position: absolute;\n  right: var(--s-2, 1rem);\n  top: 1.4rem;\n}\ncagov-accordion:defined details .cagov-open-indicator:before {\n  display: block;\n  content: "";\n  position: absolute;\n  top: -6px;\n  left: 3px;\n  width: 3px;\n  height: 15px;\n  border-radius: var(--border-3, 3px);\n  border: none;\n  box-shadow: 3px 0 0 0 var(--primary-700, #165ac2);\n  background: none;\n}\ncagov-accordion:defined details[open] .cagov-open-indicator:before {\n  display: none;\n}\n\n/*# sourceMappingURL=index.css.map */\n';
  var CaGovAccordion = class extends window.HTMLElement {
    constructor() {
      super();
      if (!document.querySelector("#cagov-accordion-styles")) {
        const style = document.createElement("style");
        style.id = "cagov-accordion-styles";
        style.textContent = styles;
        document.querySelector("head").appendChild(style);
      }
    }
    connectedCallback() {
      this.summaryEl = this.querySelector("summary");
      this.setHeight();
      this.summaryEl.addEventListener("click", this.listen.bind(this));
      this.summaryEl.insertAdjacentHTML(
        "beforeend",
        `<div class="cagov-open-indicator" aria-hidden="true" />`
      );
      this.detailsEl = this.querySelector("details");
      this.bodyEl = this.querySelector(".accordion-body");
      window.addEventListener(
        "resize",
        this.debounce(() => this.setHeight()).bind(this)
      );
    }
    setHeight() {
      requestAnimationFrame(() => {
        this.closedHeightInt = parseInt(this.summaryEl.scrollHeight + 2, 10);
        this.closedHeight = `${this.closedHeightInt}px`;
        if (this.detailsEl.hasAttribute("open")) {
          this.detailsEl.style.height = `${parseInt(
            this.bodyEl.scrollHeight + this.closedHeightInt,
            10
          )}px`;
        } else {
          this.detailsEl.style.height = this.closedHeight;
        }
      });
    }
    listen() {
      if (this.detailsEl.hasAttribute("open")) {
        this.detailsEl.style.height = this.closedHeight;
      } else {
        requestAnimationFrame(() => {
          this.detailsEl.style.height = `${parseInt(
            this.bodyEl.scrollHeight + this.closedHeightInt,
            10
          )}px`;
        });
      }
    }
    debounce(func, timeout = 300) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    }
  };
  window.customElements.define("cagov-accordion", CaGovAccordion);
})();
