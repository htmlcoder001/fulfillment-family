!function () {
  "use strict";
  const t = (t, e = 0) => (...i) => setTimeout(t, e, ...i), e = (e, i = 0, ...s) => t(e, i)(...s);
  const i = document, s = "a[href], [data-action]", n = "[data-action-target]";
  let o, a;

  class r {
    static create() {
      return o || (o = new r, o)
    }

    constructor() {
      this.bindEvents()
    }

    bindEvents() {
      const t = t => !!t.target.closest('[data-prevent-action], [data-flexbe-events="off"]');
      $(i).off("mousedown.component-links-fake", n).on("mousedown.component-links-fake", n, (t => 2 !== t.which && 1 !== t.button || (t.preventDefault(), !1))), $(i).off("click.component-links-fake auxclick.component-links-fake").on("click.component-links-fake auxclick.component-links-fake", n, (e => {
        const i = e.originalEvent;
        return !(i && i.isTrusted && !e.target.closest(s) && !t(e)) || (e.stopPropagation(), e.stopImmediatePropagation(), function (t, e = {}) {
          if (!t) return;
          const i = new MouseEvent(e.type || "click", {
            bubbles: e.bubbles,
            cancelable: e.cancelable,
            composed: e.composed,
            screenX: e.screenX,
            screenY: e.screenY,
            clientX: e.clientX,
            clientY: e.clientY,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            metaKey: e.metaKey,
            button: e.button,
            buttons: e.buttons,
            relatedTarget: e.relatedTarget
          });
          t.dispatchEvent(i)
        }($(e.currentTarget).children(s).get(0), i), !1)
      })), $(i).off("click.component-links auxclick.component-links", s).on("click.component-links auxclick.component-links", s, (e => {
        const i = e.currentTarget, s = $(i);
        if (t(e)) return !0;
        if (flexbe_cli.is_admin && $("body").hasClass("is-editor") && !i.closest(".editor-focus, .b_block--global, .component-menu-dropdown")) return e.preventDefault(), !0;
        const n = s.closest("[data-action]").data("action") || ("A" === i.tagName ? "link" : "none");
        return this.reachGoals(e), "link" === n ? this.actionLink(e) : "file" === n ? this.actionFile() : "popup" === n ? this.actionPopup(e) : "button" === n ? this.actionButton(e) : "modal" === n ? this.actionModal(e) : "cart" === n ? this.actionCart(e) : "quiz" === n ? this.actionQuiz(e) : "close" === n ? this.actionClose(e) : void 0
      }))
    }

    actionPopup(t) {
      return t.preventDefault(), !1
    }

    actionFile() {
      return !0
    }

    actionLink(t) {
      const e = t.currentTarget, i = e.hasAttribute("href"), s = i ? e.getAttribute("href") : "",
        n = 2 === t.button || 3 === t.which, o = 1 === t.button || 2 === t.which,
        r = t.metaKey || t.ctrlKey || o || "_blank" === e.getAttribute("target") || !1, l = e.hasAttribute("download");
      n || l || r && !o ? flexbe_cli.is_admin && i && "" === s && (e.href = "./") : (t.preventDefault(), clearTimeout(a), a = setTimeout((() => {
        flexbe_cli.helpers.links.gotoLink(s, {event: t, blank: r})
      }), 15))
    }

    actionButton(t) {
      t.stopPropagation();
      const e = $(t.currentTarget).closest(".content-zone, [data-item-id]").first().find(".component-button").not(".form-field-submit").find(s);
      e[0] && e[0].click()
    }

    actionModal(t) {
      const e = $(t.currentTarget), i = this.getProductInfo(e[0]);
      let s = e.attr("data-modal-id");
      if (!flexbe_cli.modal.find(s)) {
        s = flexbe_cli.modal.$list.find(`._anchor[name="${s}"]`).closest(".m_modal").attr("data-id") || s
      }
      if (/^(form|done)$/.test(s) && !flexbe_cli.modal.find(s)) {
        s = `${e.closest("[data-id]").attr("data-id").split("_")[0]}_${s}`
      }
      flexbe_cli.events.emit("ui_mobilemenu_close"), flexbe_cli.events.emit("ui_modal_open", {
        id: s,
        data: {items: i ? [i] : []}
      })
    }

    actionCart(t) {
      const e = $(t.currentTarget), i = $(t.currentTarget).closest(n), s = e.closest(".m_modal").length,
        o = e.closest(".disabled").length, a = this.getProductInfo(e[0]);
      a && !o && (i.addClass("animate-add-to-cart"), setTimeout((() => {
        i.removeClass("animate-add-to-cart"), s && (flexbe_cli.events.emit("ui_modal_close"), flexbe_cli.ecommerce.cartStore.dispatch("addItem", a))
      }), s ? 450 : 1600), s || flexbe_cli.ecommerce.cartStore.dispatch("addItem", a))
    }

    actionQuiz(t) {
      const e = $(t.currentTarget).closest("[data-id]").attr("data-id");
      flexbe_cli.events.emit("quiz_command", {command: "start", id: e})
    }

    actionClose(t) {
      t.preventDefault(), flexbe_cli.events.emit("ui_modal_close")
    }

    reachGoals(t) {
      const e = $(t.currentTarget), i = e.attr("data-action"), s = e.attr("data-modal-id"),
        n = flexbe_cli.stat.getGoal(i, s), o = e.attr("data-goal"), a = e.attr("data-html-goal");
      flexbe_cli.stat.reachGoals({mainGoal: n, goal: o, htmlGoal: a})
    }

    getProductInfo(t) {
      let e = flexbe_cli.ecommerce.getProductInfo(t) || {};
      return e && (e.title && "-" !== e.title || e.price) || (e = null), e
    }
  }

  const l = new ResizeObserver((t => {
    t.forEach((({target: t, contentRect: e}) => function (t, e = t.getBoundingClientRect()) {
      const i = flexbe_cli.resize.responsiveMode, s = t.hasAttribute(`autowidth-${i}`),
        n = +t.getAttribute("proportion") || +t.getAttribute("data-img-proportion");
      if (!n) return;
      if (s) {
        const i = Math.round(e.height), s = Math.round(e.width), o = Math.round(i / (+n / 100));
        i > 5 && o > 5 && o !== s && t.style.setProperty("width", `${o}px`)
      } else t.style.setProperty("width", "")
    }(t, e)))
  }));
  const d = Math.min(2, window.devicePixelRatio), h = new ResizeObserver((t => {
    t.filter((t => t.contentRect.width || t.contentRect.height)).forEach((t => function (t) {
      const e = t.dataset.inlineSrc || t.dataset.lazySrc, i = t.dataset.inlineBg || t.dataset.lazyBg, s = e || i;
      if (!/%optimalWidth%/gi.test(s)) return u(t, s, !!i), h.unobserve(t), !0;
      const n = t.parentElement, o = "fixed" === n.dataset.imgAttachment, a = t.dataset.imgProportion || 100,
        r = o ? window.innerWidth : n.offsetWidth, l = o ? window.innerHeight : n.offsetHeight;
      if (!r && !l) return !1;
      const c = a / 100;
      let p;
      p = (e ? c : l / r) <= c ? r : l / c;
      return p = Math.max(150, Math.min(p * d, 2560)), p = Math.round(p), u(t, s.replace(/%optimalWidth%/gi, `${p}`), !!i), h.unobserve(t), !0
    }(t.target)))
  }));

  function c(t) {
    t.length && t.forEach((t => h.observe(t)))
  }

  function u(t, e, i) {
    if (i) {
      const i = t.parentElement.querySelector("img"), s = getComputedStyle(t).getPropertyValue("background-image");
      t.style.backgroundImage = [`url(${e})`, s].filter((t => t)).join(","), i && i.setAttribute("src", e)
    } else t.setAttribute("src", e);
    t.removeAttribute("data-inline-src"), t.removeAttribute("data-inline-bg"), t.removeAttribute("data-lazy-src"), t.removeAttribute("data-lazy-bg")
  }

  let p, m = {x: 0, y: 0};
  const f = ".lightbox-container, .b_block, .m_modal, .w_widget", g = "[data-lightbox]";

  function v(t) {
    const e = window.history.state;
    flexbe_cli.lockPopstate = !0, e && e.lg ? window.history.replaceState({lg: t}, null, `#image-${t.index + 1}`) : window.history.pushState({lg: t}, null, `#image-${t.index + 1}`), flexbe_cli.lockPopstate = !1
  }

  let b;

  class w {
    static create() {
      return b || (b = new w, b)
    }

    constructor() {
      this.bindEvents()
    }

    bindEvents() {
      const t = t => {
        var e;
        return null == (e = $(t).find(".swiper")[0]) ? void 0 : e.swiper
      };
      $("body").on("click", 'a[href^="#prev"], a[href^="#next"]', (e => {
        let i;
        const s = String(e.currentTarget.href).match(".*#(.*)")[1], [n, o] = s.split(":");
        if (o) i = t(`[data-id="${o}"]`); else {
          $(e.currentTarget).parents("[data-id]").toArray().some((e => (i = t(e), i)))
        }
        i && ("prev" === n ? i.slidePrev() : i.slideNext(), e.preventDefault(), e.stopPropagation())
      }))
    }
  }

  const y = {}, _ = {}, x = {}, A = t => t.isClone ? `${t.id}_clone${t.isClone}` : t.id, C = (t, e) => {
    const i = A(t);
    _[i] || (_[i] = []), _[i].includes(e) || _[i].push(e)
  }, S = {
    registerComponent(t) {
      y[t.is] = t
    }, getComponentClass: t => y[t], getGlobalInstance: t => x[t], setGlobalInstance(t, e) {
      x[t] = e
    }, init() {
      this.setGlobalInstance("autoWidth", class {
        static create() {
          return new this
        }

        constructor() {
          this.initArea(), flexbe_cli.events.off("entity_event.autoWidth").on("entity_event.autoWidth", ((t, {
            type: e,
            core: i,
            params: s
          }) => {
            const n = "screen" === e && i && i.area && "element" !== i.is && s.state && s.first,
              o = flexbe_cli.is_admin && "update" === e;
            (n || o) && this.initArea(i.area)
          }))
        }

        initArea(t = document) {
          Array.from(t.querySelectorAll("[autowidth-desktop], [autowidth-mobile]")).forEach((t => l.observe(t)))
        }
      }.create()), this.setGlobalInstance("lazyLoading", class {
        static create() {
          return new this
        }

        constructor() {
          this.imageOptions = void 0, this.imageOptions = {
            lazy: !0,
            lazy_priority: !1, ...flexbe_cli.vars._group.images || {}
          }, this.loadInArea(), this.initLazyLoading(), this.initLazyPriority()
        }

        initLazyLoading() {
          flexbe_cli.events.off("entity_event.lazyLoading").on("entity_event.lazyLoading", ((t, {
            type: e,
            core: i,
            params: s
          }) => {
            const n = "screen" === e && i && i.area && "element" !== i.is && s.state && s.first,
              o = flexbe_cli.is_admin && "update" === e;
            (n || o) && this.loadInArea(i.area)
          }))
        }

        initLazyPriority() {
          const t = this.imageOptions.lazy, e = this.imageOptions.lazy_priority;
          t && e && $(window).one("load.lazyPriority", (() => {
            const t = [".component-bg", ".bg-element__fill--image", ".component-image", ".component-icon"].join(",");
            this.loadInArea(document), Array.from(document.querySelectorAll(t)).forEach((t => t.dispatchEvent(new CustomEvent("setImage", {detail: {reason: "lazyPriority"}}))))
          }))
        }

        loadInArea(t = document) {
          c(Array.from(t.querySelectorAll("[data-inline-src], [data-inline-bg]"))), c(Array.from(t.querySelectorAll("[data-lazy-src], [data-lazy-bg]")))
        }
      }.create()), this.setGlobalInstance("links", r.create()), this.setGlobalInstance("lightbox", class {
        static create() {
          return new this
        }

        constructor() {
          this.loaded = !1, this.isOpen = !1, this.isOpened = !1, this.$lg = void 0, this.bindEvents(), window.history.state && window.history.state.lg && this.openGallery(window.history.state.lg)
        }

        require(t) {
          this.loaded ? "function" == typeof t && t() : flexbe_cli.require(["/_s/lib/jquery/lightGallery/css/lightgallery.min.css", "/_s/lib/jquery/lightGallery/js/lightgallery.min.js"], (() => {
            this.loaded = !0, $(document).off("click.beforeLoadedLg"), "function" == typeof t && t()
          }))
        }

        bindEvents() {
          $(window).one("load.lightbox", (() => {
            $(g).length && this.require()
          })), $(document).on("click.lightbox", g, (t => {
            t.preventDefault()
          })), $(document).on("touchstart.lightbox pointerdown.lightbox", g, (t => {
            var e, i;
            flexbe_cli.is_admin || (t.preventDefault(), t.stopPropagation(), p = t.target, m = {
              x: null != (e = t.clientX) ? e : t.touches[0].clientX,
              y: null != (i = t.clientY) ? i : t.touches[0].clientY
            })
          })), $(document).on("touchend.lightbox pointerup.lightbox", g, (t => {
            var e, i;
            const s = p === t.target, n = null != (e = t.clientX) ? e : t.changedTouches[0].clientX,
              o = null != (i = t.clientY) ? i : t.changedTouches[0].clientY,
              a = Math.sqrt((m.x - n) ** 2 + (m.y - o) ** 2) < 5;
            if (!s || !a) return;
            const r = $(t.currentTarget), l = r.closest(f), d = r.attr("data-lightbox"),
              h = "1" === r.closest("[data-loop]").attr("data-loop"), c = !l.attr("data-lightbox-single"),
              u = l.find(g).filter(((t, e) => {
                const i = $(e).closest(f), s = i.is(l), n = i.closest(".swiper-slide-duplicate").length;
                return s && !n
              })).toArray().map((t => {
                let e;
                const i = $(t), s = i.attr("data-lightbox") || i.attr("src") || i.attr("href"),
                  n = i.attr("data-sub-html");
                return e = n ? i.find(n).html() : i.attr("alt") || i.find("img").attr("alt") || "", h && i.closest("[data-cloned]").length ? null : {
                  src: s,
                  subHtml: e
                }
              })).filter((t => t && t.src)), v = u.findIndex((t => t.src === d)) || 0;
            this.openGallery({index: v, dynamicEl: u, enableSlide: c, loop: h})
          })), $(window).on("popstate.lightbox", (() => {
            const t = window.history.state || {};
            t.lg ? this.openGallery(t.lg) : this.closeGallery()
          }))
        }

        openGallery(t = {}) {
          if (0 === t.dynamicEl.length || this.isOpened) return;
          this.isOpened = !0, this.$lg = $("<div/>");
          const e = this.$lg, i = {
            index: 0,
            dynamicEl: [],
            dynamic: !0,
            subHtmlSelectorRelative: !0,
            getCaptionFromTitleOrAlt: !0,
            slideEndAnimation: !1,
            swipeThreshold: 30,
            counter: !0,
            closable: !0,
            download: !1,
            easing: "ease-out",
            hideBarsDelay: 1e3,
            zoomIcons: !1,
            actualSize: !1,
            enableSlide: !0,
            loop: !0, ...t
          };
          i.index <= 0 && (i.index = 0), this.require((() => e.lightGallery(i))), e.on("onBeforeOpen.lg", (() => {
            this.isOpen = !0, v(i)
          })), e.on("onBeforeSlide.lg", ((t, e, s) => {
            i.index = s, v(i)
          })), e.on("onBeforeClose.lg", (() => {
            window.history.state && window.history.state.lg && (flexbe_cli.lockPopstate = !0, window.history.back(), setTimeout((() => {
              flexbe_cli.lockPopstate = !1
            }), 20)), this.isOpen = !1
          }))
        }

        closeGallery() {
          this.isOpened = !1;
          const t = this.$lg && this.$lg.data("lightGallery");
          t && t.destroy()
        }
      }.create()), this.setGlobalInstance("sliderControl", w.create()), flexbe_cli.events.on("entity_event.componentsInit", ((t, e) => {
        if (!(e && e.type && e.core && e.core.id)) return;
        const i = e.core;
        "init" === e.type || "update" === e.type && e.params.templateRendered ? this.initComponents({
          core: i,
          reason: e.type
        }) : "onDestroy" === e.type && Array.isArray(_[i.id]) && (_[i.id].forEach((t => t.destroy())), _[i.id] = [])
      })), $(window).off("load.core_components").one("load.core_components", (() => {
        (Object.values(_) || []).forEach((t => {
          t.forEach((t => t._onPageLoad()))
        }))
      })), $(window).off("resized.core_components").on("resized.core_components", (() => {
        (Object.values(_) || []).forEach((t => {
          t.forEach((t => t._onWindowResize()))
        }))
      }))
    }, getInstances: t => _[A(t)] || [], initComponents({core: e, reason: i}) {
      const {$area: s, components: n} = e, o = A(e);
      "update" === i && Array.isArray(_[o]) && _[o].forEach((t => t.destroy())), _[o] = [];
      const a = n.map((t => `[data-component="${t.is}"]`)).join(", ");
      if (a) {
        const n = "update" === i ? t => t : t;
        s.find(a).addBack(a).toArray().forEach(n((t => {
          this.initComponent(t, e, i)
        })))
      }
    }, initComponent(t, e, i = "init") {
      e = e || t.closest("[data-id]")._core;
      let s = t.componentInstance;
      if (s && "update" === i && s.destroy(), s) {
        if ("init" === i) return C(e, s), s;
        "update" === i && s.destroy()
      }
      const n = String(t.getAttribute("data-component")).trim(),
        o = e.components.find((t => t.is === n)) || this.getComponentClass(n);
      return "function" == typeof o && (s = new o({
        component: t,
        core: e,
        reason: i
      }), t.componentInstance = s, s._onInit(), C(e, s)), s
    }
  };
  flexbe_cli.components = S;
  const E = new WeakMap, F = t => {
    const {is: e, component: i} = t;
    E.has(i) || E.set(i, Math.floor(999999999 * Math.random()));
    return `.component-${e}-${E.get(i)}`
  };

  class I {
    get is() {
      return this.constructor.is
    }

    constructor({component: t, core: e, reason: i}) {
      this.require = [], this.core = null, this.owner = null, this.root = null, this.component = null, this.$component = null, this.componentWidth = null, this.componentHeight = null, this.isPageLoaded = !1, this.isInited = !1, this.isLoaded = !1, this.isUpdated = !1, this.isOpen = null, this.isVisible = null, this.inScreen = !1, this.inBeside = !1, this.inView = !1, this.inFocus = !1, this.wasVisible = null, this.wasScreen = !1, this.wasBeside = !1, this.wasView = !1, this.wasFocus = !1, this.core = e, this.owner = e.area, this.root = e.root, this.component = t, this.$component = $(t), this.isPageLoaded = "complete" === document.readyState, this.isUpdated = "update" === i
    }

    onInit() {
    }

    onLoad() {
    }

    onVisible(t) {
    }

    onScreen(t) {
    }

    onBeside(t) {
    }

    onView(t) {
    }

    onFocus(t) {
    }

    onResize(t) {
    }

    onOpen(t) {
    }

    onClose(t) {
    }

    onPageLoad() {
    }

    onWindowResize() {
    }

    onDestroy() {
    }

    _inheritEvents() {
      this._clearEvents();
      const t = F(this);
      this.core.$area.on(`tween${t}`, (t => this._syncStates(t.detail))), this.core.$area.on(`open${t}`, (t => this._onOpen(t.detail))), this.core.$area.on(`close${t}`, (t => this._onClose(t.detail)))
    }

    _clearEvents() {
      const t = F(this);
      this.core.$area.off(t)
    }

    _syncStates({force: t = !1} = {}) {
      const e = this.component.offsetWidth, i = this.component.offsetHeight,
        s = null == this.componentWidth || null == this.componentHeight, n = this.core.isVisible && !(!e && !i),
        o = this.core.inBeside && n, a = this.core.inScreen && n, r = this.core.inView && n, l = this.core.inFocus && n,
        d = this.componentWidth !== e, h = this.componentHeight !== i, c = t || n && !s && (d || h);
      n && (this.componentWidth = e, this.componentHeight = i), n !== this.isVisible && this._onVisible({state: n}), c && this._onResize({force: t}), o !== this.inBeside && this._onBeside({state: o}), a !== this.inScreen && this._onScreen({state: a}), r !== this.inView && this._onView({state: r}), l !== this.inFocus && this._onFocus({state: l})
    }

    _onInit() {
      this.isInited = !0, this._inheritEvents(), this._syncStates(), "function" == typeof this.onInit && this.onInit(), flexbe_cli.require(this.require, (() => this._onLoad()))
    }

    _onLoad() {
      this.isLoaded = !0, "function" == typeof this.onLoad && this.onLoad()
    }

    _onVisible({state: t}) {
      if (null == this.isVisible) return this.isVisible = t, void (this.wasVisible = t);
      const e = t && !this.wasVisible;
      this.isVisible = t, this.onVisible({state: t, first: e}), t && (this.wasVisible = !0)
    }

    _onScreen({state: t}) {
      const e = t && !this.wasScreen;
      this.inScreen = t, this.onScreen({state: t, first: e}), t && (this.wasScreen = !0)
    }

    _onView({state: t}) {
      const e = t && !this.wasView;
      this.inView = t, this.onView({state: t, first: e}), t && (this.wasView = !0)
    }

    _onBeside({state: t}) {
      const e = t && !this.wasBeside;
      this.inBeside = t, this.onBeside({state: t, first: e}), t && (this.wasBeside = !0)
    }

    _onFocus({state: t}) {
      const e = t && !this.wasFocus;
      this.inFocus = t, this.onFocus({state: t, first: e}), t && (this.wasFocus = !0)
    }

    _onResize(t) {
      this.onResize(t)
    }

    _onOpen(t) {
      this.isOpen = !0, this._syncStates(), this.onOpen(t)
    }

    _onClose(t) {
      this.isOpen = !1, this._syncStates(), this.onClose(t)
    }

    _onPageLoad() {
      this.isPageLoaded = !0, this.onPageLoad()
    }

    _onWindowResize() {
      this.onWindowResize()
    }

    destroy() {
      this._clearEvents(), this.onDestroy()
    }
  }

  I.is = null;

  class k {
    constructor(t, e, i = "parallax", s = null) {
      this.id = t, this.pending = !1, this.visible = !1, this.imgSize = {
        w: 0,
        h: 0
      }, this.overlay = $(".overlay", e).get(0), this.canvas = $("canvas", e).get(0), this.offScreen = document.createElement("canvas"), this.offCtx = this.offScreen.getContext("2d", {alpha: !1}), this.ctx = this.canvas.getContext("2d", {alpha: !1}), this.img = document.createElement("img"), this.overlayOpacity = +this.overlay.getAttribute("data-opacity"), this.factor = "parallax" === i || "parallax-fade" === i ? .3 : 0, this.zoomRatio = "zoom" === i || "zoom-return" === i ? .2 : 0, this.zoomType = "zoom" === i || "zoom-return" === i ? 2 : 0, this.zoomD = "zoom" === i ? .5 : "zoom-return" === i ? 1 : 0, this.fadeout = "parallax-fade" === i ? 1 : 0, this.dispatchEvents(), this.position = {
        x: +s.x.replace("%", "") / 100,
        y: +s.y.replace("%", "") / 100
      }, this.img.onload = () => {
        this.loaded = !0, this.imgSize = {
          w: this.img.width,
          h: this.img.height,
          r: this.img.height / this.img.width
        }, this.render(), setTimeout((() => {
          $(this.canvas).addClass("ready")
        }), 30)
      }, this.img.src = s.url
    }

    dispatchEvents() {
      $(window).off(`scroll.bg_${this.id}`).on(`scroll.bg_${this.id}`, (() => {
        this.pending || flexbe_cli.scroll.skip || this.updateView()
      })), $(window).off(`resized.bg_${this.id}`).on(`resized.bg_${this.id}`, (() => {
        this.render()
      })), flexbe_cli.events.off(`entity_render.bg_${this.id}`).on(`entity_render.bg_${this.id}`, ((t, e) => {
        e.styleRendered && e.entity && e.entity.id === this.id && (this.overlayOpacity = e.entity.data.background.opacity / 100, this.pending || this.updateView())
      })), flexbe_cli.events.off(`layout_change.bg_${this.id}`).on(`layout_change.bg_${this.id}`, (() => {
        this.render()
      }))
    }

    toggleRendering(t) {
      if ("boolean" != typeof t) return !1;
      t !== this.visible && (this.visible = t)
    }

    getCosPoint(t, e, i = 1) {
      return 1 - t > i && (t = i), (1 - Math.cos(Math.PI * t * e)) / 2
    }

    getZoomCoords(t) {
      let e = 0;
      1 === this.zoomType ? e = t : -1 === this.zoomType ? e = 100 - t : 2 === this.zoomType && (e = 100 - 100 * this.getCosPoint(.01 * t, 2, this.zoomD));
      const i = {ratio: this.zoomRatio / 100 * e};
      return i.w = this.blSize.w * (1 + i.ratio), i.h = this.blSize.h * (1 + i.ratio), i.x = (i.w - this.canvas.width) / 2, i.y = (i.h - this.blSize.h) / 2, i
    }

    draw(t, e) {
      let i;
      if (this.fadeout && (i = 1 - (1 - this.overlayOpacity) * this.getCosPoint(.01 * e, 2, this.fadeout)), this.zoomRatio) {
        const s = this.getZoomCoords(e);
        requestAnimationFrame((() => {
          this.overlay.style.opacity = i;
          try {
            this.ctx.drawImage(this.offScreen, Math.ceil(-1 * s.x), Math.ceil(t * this.factor - this.winSize.h * this.factor - s.y), s.w, s.h)
          } catch (t) {
          }
          this.pending = !1
        }))
      } else {
        const e = Math.ceil((t - this.winSize.h) * this.factor);
        requestAnimationFrame((() => {
          this.overlay.style.opacity = i;
          try {
            this.ctx.drawImage(this.offScreen, 0, e)
          } catch (t) {
          }
          this.pending = !1
        }))
      }
    }

    updateView() {
      if (this.loaded) if (this.pending = !0, this.winSize.y = flexbe_cli.scroll.latest * this.blSize.r, this.winSize.y + this.winSize.h > this.blSize.y - 200 && this.winSize.y < this.blSize.y + this.blSize.h + 200) {
        this.toggleRendering(!0);
        const t = this.winSize.y + this.winSize.h - this.blSize.y, e = 100 - t / (this.blSize.h + this.winSize.h) * 100;
        this.draw(t, e)
      } else this.toggleRendering(!1), this.pending = !1
    }

    render() {
      this.loaded && (this.fitToOuter(), this.drawOffscreenImage(this.position.x, this.position.y), this.updateView())
    }

    drawOffscreenImage(t, e) {
      (t = "number" == typeof t ? t : .5) < 0 && (t = 0), (e = "number" == typeof e ? e : .5) < 0 && (e = 0), t > 1 && (t = 1), e > 1 && (e = 1);
      const i = this.offCtx.canvas.width, s = this.offCtx.canvas.height;
      let n, o, a, r;
      s / i <= this.imgSize.r ? (a = i, r = i * this.imgSize.r, n = 0, o = (r - s) * e * -1) : (r = s, a = s / this.imgSize.r, o = 0, n = (a - i) * t * -1), this.offCtx.drawImage(this.img, n, o, a, r)
    }

    fitToOuter() {
      const t = flexbe_cli.run.is_mobile ? 1 : window.devicePixelRatio, e = t >= 1.5 ? 1960 * t : 1960,
        i = this.canvas.getBoundingClientRect(), s = i.width, n = s <= e ? e : s, o = n / s, a = o * i.height,
        r = o * (i.top + flexbe_cli.scroll.latest), l = flexbe_cli.resize.viewportWidth * o,
        d = flexbe_cli.resize.viewportHeight * o, h = Math.max(d, a),
        c = h - (h - Math.min(d, a)) * (a > d ? this.factor : 1 - this.factor);
      this.blSize = {w: n, h: a, r: o, y: r}, this.winSize = {
        w: l,
        h: d
      }, this.canvas.width = n, this.canvas.height = a, this.offScreen.width = n, this.offScreen.height = this.zoomRatio ? a : Math.ceil(c)
    }

    destroy() {
      this.destroyed = !0, $(window).off(`resized.${this.id}`), $(window).off(`scroll.bg_${this.id}`), flexbe_cli.events.off(`entity_render.bg_${this.id}`), flexbe_cli.events.off(`layout_change.bg_${this.id}`), $(this.canvas).removeClass("ready"), this.offScreen.remove(), this.img.remove()
    }
  }

  class D {
    constructor(t, e, i) {
      this.background = t, this.$component = t.$component, this.video = e, this.sectionSize = {
        width: t.owner._core.tween.width,
        height: t.owner._core.tween.height
      }, this.sectionSize.res = this.sectionSize.width / this.sectionSize.height, "function" == typeof i && (this.onStructured = i), this.parallax = this.$component[0].getAttribute("data-parallax"), this.fixed = "fixed" === this.parallax || "modal" === this.background.owner._core.id, this.isDesktop = flexbe_cli.run.is_desktop, this.initVideo()
    }

    initVideo() {
      this.$container = $(`<div class="layer0 video-holder ${this.video.type}"/>`), "vimeo" === this.video.type ? this.createVimeo() : "youtube" === this.video.type ? this.createYoutube() : this.createMP4(), document.addEventListener("visibilitychange", (() => {
        this.background.onscreen && !document.hidden && setTimeout((() => {
          this.play()
        }), 50)
      }))
    }

    createVimeo() {
      flexbe_cli.require(["https://player.vimeo.com/api/player.js"], (() => {
        this.$videoElement = $(`<iframe src="https://player.vimeo.com/video/${this.video.id}?muted=1&controls=0&autopause=0&loop=1&autoplay=1&background=1" width="640" height="360" frameborder="0"></iframe>`), this.insertVideo(), this.vPlayer = new window.Vimeo.Player(this.$videoElement[0]), this.getVimeoResolution().then((t => (this.video.size = {res: t.width / t.height, ...t}, this.resize(), !0))).catch((() => {
        })), this.play()
      }))
    }

    createYoutube() {
      const t = {
        videoId: this.video.id,
        playerVars: {
          cc_load_policy: 0,
          iv_load_policy: 3,
          autoplay: 1,
          modestbranding: 1,
          branding: 0,
          wmode: "opaque",
          rel: 0,
          mute: 1,
          disablekb: 1,
          color: "white",
          controls: 0,
          showinfo: 0,
          playsinline: 1
        },
        events: {
          onReady: () => {
            this.$videoElement = this.$container.find("iframe"), this.youtubeGetResolution(), this.resize(), this.play()
          }, onStateChange: t => {
            1 !== t.data || this.videoIsLoaded ? 0 === t.data && this.play() : (this.videoIsLoaded = !0, this.videoIsResized && (this.$component.delay(100).addClass("video-loaded"), this.executed = !0))
          }
        }
      };
      if (window.YT || window.onYouTubeIframeAPIReady) if (window.onYouTubeIframeAPIReady) window.youtubeBGQuae.push((() => {
        const e = $("<div></div>");
        this.insertVideo(e), this.yPlayer = new window.YT.Player(e[0], t)
      })); else {
        const e = $("<div></div>");
        this.insertVideo(e), this.yPlayer = new window.YT.Player(e[0], t)
      } else window.onYouTubeIframeAPIReady = () => {
        window.youtubeBGQuae.forEach((t => {
          t()
        })), window.youtubeBGQuae = null, window.onYouTubeIframeAPIReady = null
      }, window.youtubeBGQuae = [], window.youtubeBGQuae.push((() => {
        const e = $("<div></div>");
        this.insertVideo(e), this.yPlayer = new window.YT.Player(e[0], t)
      })), flexbe_cli.require(["https://www.youtube.com/iframe_api"])
    }

    createMP4() {
      this.$videoElement = $(`\n            <video src="${flexbe_cli.is_screenshoter ? "" : this.video.url}"\n                   controlslist="nodownload"\n                   loop="1"\n                   muted="1"\n                   autoplay="1"\n                   playsinline="1"\n                   disablePictureInPicture\n                   pip="false"\n            ></video>\n        `), this.$videoElement[0].disablePictureInPicture = !0, this.insertVideo(), this.$videoElement[0].oncanplay = () => {
        setInterval((() => {
          this.videoIsLoaded = !0, this.videoIsResized && this.$component.delay(100).addClass("video-loaded")
        }), 50)
      }, this.$videoElement.on("loadeddata", (() => {
        this.video.size = {res: this.$videoElement.width() / this.$videoElement.height()}, this.resize()
      }))
    }

    getVimeoResolution() {
      const t = this.vPlayer;
      let e = 0;
      return function i() {
        return Promise.all([t.getVideoWidth(), t.getVideoHeight()]).then((t => {
          const [s, n] = t;
          return s / n < 2.5 && s / n > .4 || 3 === e ? {width: s, height: n} : (e += 1, i())
        }))
      }()
    }

    youtubeGetResolution() {
      const t = this.$videoElement.attr("width"), e = this.$videoElement.attr("height");
      return this.video.size = {width: t, height: e, res: t / e}, this.video.size
    }

    insertVideo(t) {
      this.$container.append(t || this.$videoElement), this.$component.prepend(this.$container), this.onStructured && this.onStructured(this.$container)
    }

    resize() {
      if (this.video && this.video.size) if (this.$videoElement.width(this.$videoElement.height() * this.video.size.res), this.fixed) {
        const t = {width: flexbe_cli.resize.viewportWidth, height: flexbe_cli.resize.viewportHeight};
        this.isDesktop || (t.height += 60, t.width += 60), t.res = t.width / t.height, this.video.size.res > t.res ? (this.$videoElement.css({height: `${t.height}px`}), this.$videoElement.css({width: t.height * this.video.size.res + "px"})) : (this.$videoElement.css({width: `${t.width}px`}), this.$videoElement.css({height: t.width / this.video.size.res + "px"}))
      } else {
        this.sectionSize = {
          width: this.$component.width(),
          height: this.$component.height()
        }, this.sectionSize.res = this.sectionSize.width / this.sectionSize.height;
        const t = flexbe_cli.resize.viewportWidth / flexbe_cli.resize.viewportHeight;
        if (this.video.size.res > this.sectionSize.res || t < this.video.size.res && this.parallax) {
          const t = this.$container.height();
          this.$videoElement.css({height: `${t}px`}), this.$videoElement.css({width: t * this.video.size.res + "px"})
        } else {
          const t = this.$container.width();
          this.$videoElement.css({width: `${t}px`}), this.$videoElement.css({height: t / this.video.size.res + "px"})
        }
      }
      this.videoIsResized = !0, this.videoIsLoaded && this.$component.delay(100).addClass("video-loaded")
    }

    play() {
      if ("vimeo" === this.video.type) {
        const t = setInterval((() => {
          this.vPlayer && this.vPlayer.play && (setTimeout((() => {
            this.vPlayer.play(), this.videoIsLoaded = !0, this.videoIsResized && this.$component.delay(100).addClass("video-loaded")
          }), 50), clearInterval(t))
        }), 10)
      } else if ("youtube" === this.video.type) {
        const t = setInterval((() => {
          this.yPlayer && this.yPlayer.playVideo && (this.yPlayer.playVideo(), clearInterval(t))
        }), 10)
      } else this.$videoElement && this.$videoElement[0] && this.$videoElement[0].pause && (this.$videoElement[0].play(), $(document).one("touchstart.video-bg", (() => {
        this.$videoElement[0].play()
      })))
    }

    pause() {
      "vimeo" === this.video.type && this.vPlayer ? this.vPlayer.pause() : "youtube" === this.video.type && this.yPlayer && this.yPlayer.pauseVideo ? this.yPlayer.pauseVideo() : this.$videoElement && this.$videoElement[0] && this.$videoElement[0].pause && this.$videoElement[0].pause()
    }
  }

  const R = 2560;

  function T() {
    var t;
    const e = "object" == typeof flexbe_cli && (null == (t = flexbe_cli.vars) ? void 0 : t._group.images) || {};
    return {
      lazy: !0,
      lazy_priority: !1,
      avif: !1,
      webp: !1,
      avif_support: e.avif_support,
      webp_support: e.webp_support,
      slow_network: !1,
      quality_map: {jpg: 70, webp: 70, avif: 55}
    }
  }

  async function z(t) {
    return new Promise(((e, i) => {
      const s = new Image, n = () => {
        e(s), setTimeout((() => {
          "function" == typeof s.remove && s.remove()
        }), 10)
      };
      "decode" in s && !/\.svg/.test(t) ? (s.src = t, s.decode().then(n).catch(i)) : (s.onerror = i, s.onload = n, s.src = t)
    }))
  }

  function P(t, e) {
    const i = e.avif_support, s = e.webp_support, n = e.avif, o = e.webp;
    let a = t.ext;
    return i && n ? a = "avif" : s && o ? a = "webp" : "webp" === t.ext && (a = s ? "webp" : t.transparent ? "png" : "jpg"), a
  }

  function B(t) {
    if ("string" == typeof t && (t = function (t) {
      if ("string" != typeof t) return t;
      t = t.replace(/(\/img\/[\d_q]+)\/[\w-]+(\.\w{3,4})/i, "$1$2");
      let [, e, i, s, n] = t.match(/\/img\/(\d+)_?(\d+)?_?q?(\d+)?\.(\w{3,4})/i) || [];
      return i = i ? +i : 0, s = s ? +s : "none", {id: e, ext: n, name: `${e}.${n}`, size: i, quality: s}
    }(t)), !t || "object" != typeof t) return {};
    let e = t.img_ext || t.ext;
    const i = t.img_id || t.id, s = t.img_name || t.name;
    e && "false" !== e || (e = s ? function (t) {
      const e = String(t).match(/\.(jpg|jpeg|png|gif|svg|bmp|webp)$/i);
      return e && e[1] ? e[1] : ""
    }(s) : "jpg");
    const n = t.img_border || t.border;
    return {
      id: i,
      ext: e,
      average: function (t) {
        return "transparent" !== t ? t : "#000000"
      }(t.img_average || t.average),
      preview: t.img_preview || t.preview || "",
      width: t.img_width || t.width || 0,
      height: t.img_height || t.height || 0,
      proportion: +(+t.img_proportion || +t.proportion || 0).toFixed(2),
      border: n,
      animated: t.img_animated || t.animated || "gif" === e,
      transparent: t.img_transparent || t.transparent || 0
    }
  }

  function V(t, e = 0, i) {
    return function (t, e = null, i = null) {
      var s;
      i = {...T(), ...i};
      const {id: n, ext: o} = t;
      if (!n) return "";
      e || "webp" !== t.ext || i.webp_support || (e = Math.min(t.width || R, R));
      const a = null != (s = t.animated) ? s : "gif" === o, r = `/img/${n}.${o}`;
      if (!e || a || "svg" === o) return r;
      const l = P(t, i), d = i.slow_network && M();
      let h = i.quality_map;
      switch (d && (h = {jpg: 50, webp: 50, avif: 45}), l) {
        case"png":
          return `/img/${n}_${e}.png`;
        case"avif":
        case"webp":
        case"jpg":
          //return `/img/${n}_${e}_q${h[l]}.${l}`;
          return `/img/${n}_${e}_q${h[l]}.png`;
        case"gif":
        default:
          return r
      }
    }(B(t), "number" == typeof e ? Math.round(e) : e, i)
  }

  async function L(t) {
    let e = t, i = +t.proportion;
    if (i && (i < 2 || i < 5 && i % 1 > 0) && (i *= 100), "string" == typeof e || !i) {
      "object" == typeof e && (e = V(t, 50));
      const s = await z(e);
      i = s.naturalHeight / s.naturalWidth * 100
    }
    return i
  }

  function M() {
    var t;
    return "4g" !== ((null == (t = navigator.connection) ? void 0 : t.effectiveType) || "4g")
  }

  async function O(t, e, i) {
    i = {...T(), ...i};
    const s = t.width || 0, n = t.img_scale || t.scale || "cover", o = t.img_type || t.type || "background",
      a = e.height / e.width, r = await L(t) / 100,
      l = i.slow_network && M() ? Math.min(1.5, window.devicePixelRatio) : Math.min(2, window.devicePixelRatio),
      d = P(t, i);
    let h, c;
    return "image" === o || a > r && "contain" === n || a < r && "cover" === n ? (h = e.width, c = h * r) : (c = e.height, h = c / r), l > 1 && (h *= l, c *= l), i.sizes && (h = function (t, e) {
      let i = (e = e.sort(((t, e) => e - t)))[0];
      return e.forEach((e => {
        t < i && t <= e && (i = e)
      })), i
    }(h, i.sizes), c = h * r), h <= 150 && /webp|jpg/.test(d) && (h = h / l * 2, c = h * r), s && h > s && (h = s, c = h * r), h > R && (h = R, c = h * r), {
      width: Math.ceil(h),
      height: Math.ceil(c)
    }
  }

  const W = [800, 1366, 1920, 2560];

  class H extends I {
    constructor(...t) {
      var e;
      super(...t);
      const {$component: i} = this, s = i.data();
      this.data = {
        type: s.type || "color",
        parallax: s.parallax || 0,
        video: s.video || !1,
        videoType: s.videoType || "color",
        infinityVideo: null != (e = s.infinityVideo) && e,
        mobileVideoEnabled: s.mobileVideoEnabled || !1,
        videoParallaxFactor: .6,
        hasImagePlaceholder: !!s.hasPlaceholder,
        imageLoadingOptions: flexbe_cli.vars._group.images,
        isLazyLoading: !!s.lazy,
        isImgLoaded: !!s.loaded
      }, this.image = {
        url: null,
        id: s.imgId,
        ext: s.imgExt,
        x: s.imgX,
        y: s.imgY,
        proportion: s.imgProportion,
        width: s.imgWidth,
        animated: s.imgAnimated,
        transparent: s.imgTransparent,
        scale: "cover",
        type: "background",
        original: !!s.imgOriginal
      }
    }

    async onInit() {
      this.$component.on("setImage", (async () => {
        if (this.isVisible && !this.isImgLoading && !this.data.isImgLoaded) {
          ("image" === this.data.type || "video" === this.data.type && "image" === this.data.videoType) && await this.loadImage()
        }
      }))
    }

    onScreen({state: t}) {
      this.videoInstance && (this.data.infinityVideo || (t ? this.videoInstance.play() : this.videoInstance.pause())), this.onscreen = t, t && !this.played && this.playVideo()
    }

    async onBeside({state: t, first: e}) {
      if (t && e) {
        const t = "image" === this.data.type || "video" === this.data.type && "image" === this.data.videoType;
        this.data.isLazyLoading && !this.data.isImgLoaded && this.image.id && t && await this.loadImage(), this.imageParallaxInit(), this.videoParallaxInit()
      }
      this.played || this.playVideo()
    }

    onResize() {
      this.bgEffect && setTimeout((() => this.bgEffect.render()), 100), "video" === this.data.type && (this.videoInstance ? (this.videoInstance.resize(), setTimeout((() => {
        this.videoInstance.resize()
      }), 150), this.data.parallax && this.fixHolder && this.setParallax && setTimeout((() => {
        this.fixHolder(), this.setParallax()
      }), 100)) : this.fixHolder && this.fixHolder())
    }

    async loadImage() {
      this.isImgLoading = !0;
      const t = {
        width: this.componentWidth,
        height: this.componentHeight
      }, {width: e} = this.image.original ? {width: 0} : await O(this.image, t, {
        ...this.data.imageLoadingOptions,
        sizes: W
      });
      this.image.url = V(this.image, e, this.data.imageLoadingOptions), this.data.hasImagePlaceholder && await z(this.image.url), this.setImage(this.image.url)
    }

    setImage(t) {
      this.$component.find(".image-holder__image").css("background-image", `url(${t})`), this.$component.addClass("image-loaded"), this.isImgLoading = !1, this.data.isImgLoaded = !0
    }

    imageParallaxInit() {
      if ("image" !== this.data.type || !this.data.parallax || flexbe_cli.is_service) return;
      const {owner: t, $component: e, data: i, image: s} = this, n = t._core && t._core.id || t.getAttribute("data-id");
      "object" == typeof t._bgEffects && t._bgEffects.destroy(), "fixed" !== this.data.parallax && (t._bgEffects = new k(n, e, i.parallax, s), this.bgEffect = t._bgEffects)
    }

    videoParallaxInit() {
      if ("video" !== this.data.type || "parallax" !== this.data.parallax || !this.owner._core || flexbe_cli.is_service) return;
      const t = $(".image-holder, .video-holder", this.$component), e = this.owner._core;
      let i = !1;
      const s = () => Math.max(flexbe_cli.resize.viewportHeight, e.tween.height) + 60, n = () => {
        t.css("height", `${s()}px`)
      }, o = () => {
        const i = e.tween.start;
        let n = 1 - (1 - this.data.videoParallaxFactor) * (s() / flexbe_cli.resize.viewportHeight);
        n < .1 && (n = this.data.videoParallaxFactor / 2);
        const o = parseInt((flexbe_cli.scroll.latest - i) * n * -1, 10) || 0;
        t.css("transform", `translate3d(0, ${o}px, 0)`)
      };
      n(), o(), e.$area.off("fixHeaderHeight.component-bg").on("fixHeaderHeight.component-bg", (() => {
        o()
      })), $(window).off(`scroll.component-bg-${e.id}`).on(`scroll.component-bg-${e.id}`, (() => {
        !i && this.onscreen && (i = !0, requestAnimationFrame((() => {
          o(), i = !1
        })))
      })), this.fixHolder = n, this.setParallax = o
    }

    playVideo() {
      if (flexbe_cli.run.is_screen_mobile && !this.data.mobileVideoEnabled) return !1;
      this.played = !0;
      const {data: t} = this, {video: e} = t;
      return !("video" !== t.type || !e) && (!("custom" !== e.type && !e.id) && (this.videoInstance = new D(this, e, (() => {
        this.videoParallaxInit()
      })), !0))
    }

    destroyVideo() {
      const {$component: t} = this;
      t.data("ytPlayer") && t.data("ytPlayer").destroy(), t.removeData("video_bg_played")
    }
  }

  H.is = "background";

  class q extends I {
    constructor(...t) {
      super(...t), this.$bgElement = this.$component.find(".bg-element__fill").eq(0), this.$hoverElement = this.$component.find(".bg-element__fill_hover").eq(0), this.lazy = this.$bgElement.data("lazy"), this.isImgLoaded = this.$bgElement.data("loaded"), this.bgType = this.$bgElement.data("type"), this.hoverType = this.$hoverElement.data("hover-type"), this.hasImagePlaceholder = !!this.$bgElement.data("has-placeholder"), this.imageLoadingOptions = flexbe_cli.vars._group.images
    }

    async onInit() {
      this.$bgElement.on("setImage", (async () => {
        !this.isVisible || this.isImgLoading || this.isImgLoaded || (this.setImageParams(), await this.loadImage())
      }))
    }

    async onBeside({state: t, first: e}) {
      t && e && (this.lazy && "image" === this.bgType && !this.isImgLoaded && (this.setImageParams(), await this.loadImage()), "image" === this.hoverType && (this.setHoverImageParams(), await this.loadHoverImage()), this.dispatchEffects())
    }

    onWindowResize() {
      this.dispatchEffects()
    }

    getComponentSize() {
      return {width: this.componentWidth, height: this.componentHeight}
    }

    dispatchEffects() {
      var t, e;
      const i = t => [!0, 1, "true", "1"].includes(t), s = "mobile" === flexbe_cli.resize.responsiveMode,
        n = i(null == (t = this.$component.data("effects-desktop")) || t),
        o = i(null == (e = this.$component.data("effects-mobile")) || e), a = s ? o : n;
      this.$component.toggleClass("bg-element--hover", a)
    }

    async loadImage() {
      this.isImgLoading = !0;
      const {width: t} = await O(this.image, this.getComponentSize(), this.imageLoadingOptions),
        e = V(this.image, t, this.imageLoadingOptions);
      this.hasImagePlaceholder && await z(e), this.setImage(this.$bgElement, e), this.isImgLoading = !1, this.isImgLoaded = !0
    }

    async loadHoverImage() {
      const {width: t} = await O(this.hoverImage, this.getComponentSize(), this.imageLoadingOptions),
        e = V(this.hoverImage, t, this.imageLoadingOptions);
      this.setImage(this.$hoverElement, e)
    }

    setImage(t, e) {
      t.css("background-image", `url(${e})`), this.$component.addClass("image-loaded")
    }

    setImageParams() {
      const {$bgElement: t} = this;
      this.image = {
        id: t.data("id"),
        ext: t.data("ext"),
        width: t.data("width"),
        animated: t.data("animated"),
        transparent: t.data("transparent"),
        proportion: t.data("proportion"),
        type: "background",
        scale: "cover"
      }
    }

    setHoverImageParams() {
      const {$hoverElement: t} = this;
      this.hoverImage = {
        id: t.data("id"),
        ext: t.data("ext"),
        width: t.data("width"),
        animated: t.data("animated"),
        transparent: t.data("transparent"),
        proportion: t.data("proportion"),
        type: "background",
        scale: "cover"
      }
    }
  }

  q.is = "backgroundElement";

  class N {
    constructor(t, e) {
      e = {
        init: !0,
        targets: "span", ...e
      }, this.options = e, this.pagination = t, this.tag = this.options.tag, this.filled = !1, this.states = ["hidden", "prev-prev", "prev", "main", "next", "next-next", "hidden"], this.init()
    }

    init() {
      this.bindEvents(), this.options.init && this.fillPagination({states: this.states, force: !0})
    }

    bindEvents() {
      const {tag: t, pagination: e, options: i} = this, s = $(e);
      "function" == typeof i.onClick && s.off("click").on("click", t, (t => {
        const e = $(t.currentTarget), s = +e.siblings('[data-state="main"]').attr("data-index"),
          n = +e.attr("data-index") - s;
        i.onClick(n)
      }))
    }

    setActive(t) {
      const e = this.states, i = this.filled && t;
      if (this.fillPagination({states: e, force: !0}), i) {
        const i = e.map(((i, s) => e[s + ("prev" === t ? 1 : -1)] || "hidden"));
        requestAnimationFrame((() => {
          this.fillPagination({states: i})
        }))
      }
    }

    fillPagination({states: t, force: e} = {}) {
      const i = $(this.pagination), s = this.tag;
      if (this.filled = !0, e) {
        const e = t.reduce((t => `${t}<${s}></${s}>`), "");
        i.html(e)
      }
      i.addClass("swiper-pagination-bullets-dynamic"), i.find(s).each(((e, i) => {
        const s = $(i), n = t[e] || "hidden", o = ["swiper-pagination-bullet"];
        "main" === n && o.push("swiper-pagination-bullet-active"), "hidden" === n ? o.push("swiper-pagination-bullet-hidden") : o.push(`swiper-pagination-bullet-active-${n}`), s.attr("class", o.join(" ")), s.attr("data-state", n), s.attr("data-index", e)
      }))
    }
  }

  function j(t, e, i, s = {}) {
    const n = $(t), o = e ? `[data-component="${e}"]` : "[data-component]";
    n.is(o) ? n.trigger(i, s) : $(t).find(o).each(((t, e) => {
      $(e).trigger(i, s)
    }))
  }

  function Y(e = []) {
    e.forEach(t((t => {
      j(t, "image", "setImage")
    })))
  }

  function G(e) {
    e.params.virtualTranslate = !0, e.params.cssMode = !1, e.params.slidesPerGroup = 1, e.params.spaceBetween = 0, e.on("init", t((() => {
      e.$el.addClass("swiper-effect-fade")
    }))), e.on("setTranslate", (t => {
      const {slides: e, translate: i, size: s} = t;
      if ("fade" !== t.params.effect) return;
      t.$wrapperEl.css("transform", "");
      for (let n = 0; n < e.length; n += 1) {
        const e = t.slides.eq(n), o = -(n * s + i) / s, a = Math.min(Math.max(1 - Math.abs(o), 0), 1),
          r = `-${100 * n}%`;
        e.css({left: r, opacity: a})
      }
      let n = !1;
      t.slides.transitionEnd((() => {
        n || !t || t.destroyed || (n = !0, t.animating = !1, t.$wrapperEl.trigger("transitionend"))
      }))
    }))
  }

  class K extends I {
    constructor(...t) {
      super(...t);
      const {component: e, $component: i} = this;
      this.mode = e.getAttribute("data-mode"), "slider" === this.mode && (this.require = ["/_s/lib/swiper8/dist/swiper-bundle.min.js?v843"], this.$cardsRoot = i.closest(".flexbe-cards-root"), this.$slider = this.$cardsRoot.find(".swiper"), this.$pagination = this.$cardsRoot.find(".slider-pagination--cards"), this.$navigation = this.$cardsRoot.find(".slider-button--cards"), this.$swiperHelper = this.$cardsRoot.find(".swiper-mobile-helper"), this.$flexbeCardsSlider = this.$cardsRoot.find(".flexbe-cards-slider"), this.$flexbeCards = this.$cardsRoot.find(".flexbe-cards"), this.$flexbeCard = this.$cardsRoot.find(".flexbe-card"), this.sliderResponsive = this.$slider.attr("data-slider-responsive-mode"))
    }

    onLoad() {
      this.core.isVisible && this.sliderDisposer(), this.core.inView && this.initSwiperAnimation()
    }

    onBeside({state: t}) {
      this.isLoaded && t && this.sliderDisposer()
    }

    onScreen({state: t}) {
      t || this.destroySwipeAnimation()
    }

    onResize() {
      if (this.isLoaded && this.sliderDisposer(), this.swiper) {
        const t = this.getAdaptiveSwiperSettings();
        this.settings = {...this.settings, ...t}, this.swiper.params = {...this.swiper.params, ...t}, setTimeout((() => {
          this.swiper.update(), this.checkSlidesVisibility()
        }), 10)
      }
    }

    onView({state: t}) {
      t && !this.wasView && this.swiper && this.swiper.inited && (this.swiper.update(), this.checkSlidesVisibility(), this.checkNavigationState()), this.toggleAutoplay(t), t && this.isLoaded && this.initSwiperAnimation()
    }

    sliderDisposer() {
      if ("slider" !== this.mode) return;
      const t = "mobile" === flexbe_cli.resize.responsiveMode, e = this.sliderResponsive,
        i = t ? "desktop" !== e : "mobile" !== e;
      i && !this.swiper ? this.initSlider() : i || this.destroySlider()
    }

    initSlider() {
      if ("slider" === this.mode && !this.swiper && "undefined" != typeof Swiper) {
        e((() => {
          this.$cardsRoot.addClass("slider-active slider-inited slider-enabled"), this.$cardsRoot.removeClass("slider-disabled"), this.$flexbeCardsSlider.addClass("swiper-active"), this.$flexbeCards.addClass("swiper-wrapper")
        }));
        try {
          this.savePropsFromAttributes(), this.createSwiperSettings(), this.createSwiperInstance(), this.createSwiperNavigation(), this.createSwiperPagination(), this.createSwiperEditorFixes(), e((() => {
            this.swiper.init(), e((() => this.toggleAutoplay(this.core.inView)))
          }))
        } catch (t) {
          console.warn(t)
        }
      }
    }

    destroySlider() {
      "slider" === this.mode && (this.swiper && this.swiper.destroy(), this.swiper = null, this.$cardsRoot.removeClass("slider-active slider-inited slider-enabled"), this.$cardsRoot.addClass("slider-disabled"), this.$flexbeCardsSlider.removeClass("swiper-active"), this.$flexbeCards.removeClass("swiper-wrapper"), this.$flexbeCard.removeClass("swiper-slide-hidden"))
    }

    initSwiperAnimation() {
      if ("slider" !== this.mode) return;
      "mobile" === flexbe_cli.resize.responsiveMode && "desktop" !== this.sliderResponsive && !this.$swiperHelper.hasClass("show") && setTimeout((() => {
        this.core.inView && (this.$swiperHelper.addClass("show"), this.swiper.once("sliderMove", (() => {
          this.destroySwipeAnimation()
        })))
      }), 500)
    }

    destroySwipeAnimation() {
      "slider" === this.mode && this.$swiperHelper.hasClass("show") && this.$swiperHelper.removeClass("show")
    }

    savePropsFromAttributes() {
      this.props = {
        totalSlides: +this.$slider.attr("data-count"),
        isOverflow: +this.$slider.attr("data-overflow"),
        autoplayDelay: !flexbe_cli.is_admin && Math.floor(1e3 * +this.$slider.attr("data-autoplay")) || 0,
        pagination: this.$pagination.attr("data-type") || !1,
        loop: !flexbe_cli.is_admin && !!+this.$slider.attr("data-loop"),
        effectDesktop: this.$slider.attr("data-effect"),
        effectMobile: this.$slider.attr("data-effect-mobile"),
        inRowDesktop: +this.$slider.attr("data-cards"),
        inRowMobile: +this.$slider.attr("data-cards-mobile") || 1
      }
    }

    createSwiperSettings() {
      const t = this.getAdaptiveSwiperSettings(), {
        totalSlides: e,
        isOverflow: i,
        autoplayDelay: s,
        pagination: n
      } = this.props, o = !(e <= t.slidesPerView) && this.props.loop;
      let a = 0;
      if (flexbe_cli.is_admin && (a = Math.floor($(this.root).data("slide-move")) || 0, a = Math.max(0, Math.min(e - 1, a))), this.freeSlides = 0, o && !i) {
        const e = this.$slider[0].offsetWidth, i = e / t.slidesPerView, s = (flexbe_cli.resize.viewportWidth - e) / 2;
        this.freeSlides = Math.ceil(s / i)
      }
      this.settings = {
        autoHeight: !1,
        preloadImages: !1,
        allowClick: !0,
        preventClicks: !1,
        preventClicksPropagation: !1,
        touchStartPreventDefault: !1,
        touchMoveStopPropagation: !1,
        passiveListeners: !0,
        longSwipes: !0,
        longSwipesMs: 150,
        longSwipesRatio: .2,
        shortSwipes: !0,
        threshold: 10,
        touchReleaseOnEdges: !0,
        preventInteractionOnTransition: !1,
        loopPreventsSlide: !1,
        simulateTouch: !flexbe_cli.run.isTouch && !flexbe_cli.is_admin,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 0,
        resistanceRatio: .65,
        initialSlide: a,
        loop: o,
        freeMode: {enabled: !0, sticky: !0, momentum: !0, momentumRatio: 1, momentumVelocityRatio: .1},
        autoplay: !!s && {delay: s, stopOnLastSlide: !o, disableOnInteraction: !0, waitForTransition: !0},
        navigation: {},
        pagination: {
          clickable: !0,
          type: o ? "custom" : n,
          el: this.$pagination[0],
          dynamicBullets: this.$flexbeCard.length > 7,
          dynamicMainBullets: 5,
          renderCustom: () => "",
          formatFractionCurrent: () => this.getGroupIndex() + 1,
          formatFractionTotal: () => Math.ceil(this.props.totalSlides / this.swiper.params.slidesPerView)
        },
        watchSlidesProgress: !0,
        loopedSlides: t.slidesPerView + this.freeSlides, ...t
      }
    }

    getAdaptiveSwiperSettings() {
      const t = "mobile" === flexbe_cli.resize.responsiveMode, e = t ? this.props.inRowMobile : this.props.inRowDesktop;
      let i = t ? this.props.effectMobile : this.props.effectDesktop;
      return e > 1 && (i = "slide"), {effect: i, speed: "fade" === i ? 450 : 300, slidesPerView: e}
    }

    createSwiperInstance() {
      this.swiper && (this.swiper.destroy(), this.swiper = null);
      let e, i = !1;
      const s = new Swiper(this.$slider[0], {
        init: !1,
        wrapperClass: "flexbe-cards",
        slideClass: "flexbe-card", ...this.settings
      });
      var n;
      "fade" === s.params.effect ? G(s) : ((n = s).params.virtualTranslate = !0, n.params.cssMode = !1, n.on("init", t((() => {
        n.$el.addClass("swiper-effect-slide")
      }))), n.on("setTranslate", ((t, e) => {
        if ("slide" !== t.params.effect) return;
        const i = t.$wrapperEl, s = t.isHorizontal(), n = s ? e : 0, o = s ? 0 : e;
        flexbe_cli.is_admin ? i.css({
          position: "relative",
          top: `${o}px`,
          left: `${n}px`,
          transform: ""
        }) : i.css({transform: `translate3d(${n}px, ${o}px, 0px)`}), t.slides.css({opacity: "", transform: ""})
      })));
      const o = () => {
        const t = this.props.totalSlides > s.params.slidesPerView;
        i || (i = !0, this.$cardsRoot.addClass("slider-inited"), this.$slider.addClass("swiper-inited")), e !== t && (e = t, this.$cardsRoot.toggleClass("slider-active", t), this.$slider.toggleClass("swiper-active", t), s.update())
      }, a = () => {
        if (s.loopedSlides) {
          const t = $(s.slides).filter(`.${s.params.slideDuplicateClass}`), e = {};
          t.each(((t, i) => {
            const n = $(i), o = n.attr("data-swiper-slide-index"), a = $(s.slides).eq(s.loopedSlides + +o);
            e[o] = e[o] ? e[o] + 1 : 1, n.attr("data-cloned", e[o]);
            const r = a.find("[data-action]"), l = n.find("[data-action]");
            r.each(((t, e) => {
              const i = $(e).data();
              l.eq(t).data(i)
            }))
          })), flexbe_cli.entity.initArea(t), flexbe_cli.adaptive.initIosHacks(t), flexbe_cli.components.initComponents({core: this.core})
        }
      };
      s.on("init", t((() => {
        o(), a(), this.checkSlidesVisibility()
      }))), s.on("slideChange", t((() => {
        this.checkSlidesVisibility()
      }))), s.on("resize", $.debounce((() => {
        this.swiper && (o(), this.checkSlidesVisibility())
      }), 50));
      let r = !1;
      const l = () => {
        this.$cardsRoot.addClass("swiper-in-interacting"), this.checkSlidesVisibility()
      }, d = () => {
        this.$cardsRoot.removeClass("swiper-in-interacting"), this.checkSlidesVisibility()
      };
      s.on("sliderFirstMove", (() => {
        r = !0, l()
      })), s.on("touchEnd", (() => {
        r = !1, d()
      })), s.on("transitionStart", (() => {
        r || l()
      })), s.on("transitionEnd", (() => {
        r || d()
      })), this.$slider.on("preventSliderAutoplay", ((t, {state: e = !0}) => {
        this.preventAutoplay = !!e, this.preventAutoplay && this.toggleAutoplay({state: !1})
      })), this.$slider.on("preventSliderMove", ((t, {state: e = !0}) => {
        s.allowTouchMove = !e
      })), this.swiper = s
    }

    createSwiperNavigation() {
      const t = this.swiper;
      t.on("init", (() => {
        this.checkNavigationState()
      })), t.on("resize", $.debounce((() => {
        this.swiper && this.checkNavigationState()
      }), 50)), t.on("slideChange", (() => {
        this._skipSlide || this.checkNavigationState()
      })), this.$navigation.on("click", (t => {
        this["prev" === t.currentTarget.getAttribute("data-direction") ? "prevSlide" : "nextSlide"]()
      })), this.$slider.on("click.swiper-hidden", ".swiper-slide-hidden", (e => {
        e.preventDefault(), e.stopPropagation();
        const i = e.currentTarget, s = Array.from(t.slides || []).findIndex((t => t === i)), n = t.activeIndex,
          o = n - s, a = s - (n + t.params.slidesPerView - 1);
        o > 0 ? this.prevSlide(o) : a > 0 && this.nextSlide(a)
      }))
    }

    createSwiperPagination() {
      const t = this.swiper;
      let e = !1;
      t.on("paginationRender", (() => {
        if (this.$pagination.toggleClass("disabled", this.props.totalSlides <= t.params.slidesPerView), this._skipSlide || "custom" !== t.params.pagination.type) return;
        this.customPagination || (this.customPagination = new N(this.$pagination[0], {
          init: !1,
          tag: "span",
          onClick: t => {
            t < 0 ? this.prevSlide() : t > 0 && this.nextSlide()
          }
        }));
        const i = t.previousIndex, s = t.activeIndex, n = this.props.totalSlides, o = i < s ? "next" : "prev";
        !!(i === s || "next" === o && i === s - n || "prev" === o && i === s + n) && e || this.customPagination.setActive(o), e = !0
      }))
    }

    createSwiperEditorFixes() {
      if (!flexbe_cli.is_admin) return;
      const t = this.swiper;
      t.on("slideChange", (() => {
        $(this.root).data("slide-move", t.realIndex)
      }))
    }

    checkSlidesVisibility() {
      const t = this.swiper;
      t.updateSlides();
      const e = $(t.slides), i = e.slice(t.activeIndex, t.activeIndex + t.params.slidesPerView), s = e.not(i);
      s.removeClass("swiper-slide-visible").addClass("swiper-slide-hidden"), i.removeClass("swiper-slide-hidden").addClass("swiper-slide-visible"), j(s, !1, "sliderDeactivate"), j(i, !1, "sliderActivate")
    }

    checkNavigationState() {
      const t = this.swiper, e = t.params.navigation.disabledClass, i = this.$navigation, s = i.eq(0), n = i.eq(1);
      let {isBeginning: o, isEnd: a} = t;
      t.loopedSlides && (o = !1, a = !1), i.toggleClass("disabled", this.props.totalSlides <= t.params.slidesPerView), s.toggleClass(e, o), n.toggleClass(e, a)
    }

    getGroupIndex(t, e, i = !0) {
      const s = this.swiper;
      null == t && (t = s.realIndex), e || (e = s.params.slidesPerView || 1), i && (s.loopedSlides || e <= 1) && (i = !1);
      const n = Math.ceil(this.props.totalSlides / e);
      let o = Math.floor(t / e);
      if (i) {
        const i = o * e, s = t - i > i + e - 1 - t, n = t % e != 0 && t + e >= this.props.totalSlides;
        (s || n) && (o += 1)
      }
      return Math.max(0, Math.min(n, o))
    }

    getSlideIndex(t, e) {
      return null == e && (e = this.swiper.params.slidesPerView || 1), t * e
    }

    toSlide(t, e) {
      const i = this.swiper, s = this.getSlideIndex(t, e);
      return i.loopedSlides ? i.slideToLoop(s) : i.slideTo(s)
    }

    prevSlide(t) {
      let e;
      const i = this.swiper;
      t = t ? Math.abs(t) : 1;
      const s = i.activeIndex;
      if (i.loopedSlides) {
        const n = s >= (this.props.isOverflow ? t : t + this.freeSlides);
        s + this.props.totalSlides <= i.slides.length && !n && (this.toggleSkip(!0), i.slideTo(s + this.props.totalSlides, 0)), e = i.activeIndex - t
      } else e = i.activeIndex - t;
      setTimeout((() => {
        this.toggleSkip(!1), i.slideTo(e)
      }), 5)
    }

    nextSlide(t) {
      let e;
      const i = this.swiper, s = i.params.slidesPerView;
      t = t ? Math.abs(t) : 1;
      const n = i.activeIndex, o = n + s - 1;
      if (i.loopedSlides) {
        const s = i.slides.length - o - 1 >= (this.props.isOverflow ? t : t + this.freeSlides);
        n - this.props.totalSlides >= 0 && !s && (this.toggleSkip(!0), i.slideTo(n - this.props.totalSlides, 0)), e = i.activeIndex + t
      } else e = i.activeIndex + t;
      setTimeout((() => {
        this.toggleSkip(!1), i.slideTo(e)
      }), 5)
    }

    toggleSkip(t = !this._skipSlide) {
      this._skipSlide = !!t, this.$slider.toggleClass("noanimate", this._skipSlide)
    }

    toggleAutoplay(t) {
      if (!this.swiper) return;
      this.preventAutoplay && (t = !1);
      const e = this.swiper, i = e.autoplay, s = e.params.autoplay || {};
      i && s.enabled && (t && !i.running ? i.start() : t || i.stop())
    }
  }

  K.is = "cards";

  class X {
    constructor(t) {
      if (this.$legend = t.find(".range-legend"), this.$component = t.find(".range-outer"), this.$input = t.find("input"), this.startEdge = this.$component.data("start"), this.isDouble = !!this.$component.data("double"), this.endEdge = this.$component.data("end"), this.range = this.endEdge - this.startEdge, this.barWidth = this.$component.width(), this.step = this.$component.data("step") || 1, this.steps = Math.round(this.range / this.step), this.legendType = this.$legend.data("type"), this.legendText = 1 == +this.$legend.data("text"), this.animated = !0, this.duration = this.steps < 10 && 1 / this.steps * 300, this.fractExponent = Math.max(this.getFract(this.startEdge), this.getFract(this.endEdge), this.getFract(this.step)), this.fractDevider = 10 ** this.fractExponent, this.$value = $(".range-value", this.$component), this.$endRunner = $(".range-runner-right", this.$component), this.$endRunnerTip = $(".runner-tip", this.$endRunner), this.$endRunnerValue = $(".value", this.$endRunner), this.endRunnerWidth = this.$endRunner.width(), this.$startRunner = $(".range-runner-left", this.$component), this.$startRunnerValue = $(".value", this.$startRunner), this.$startRunnerTip = $(".runner-tip", this.$startRunner), this.startRunnerWidth = this.$startRunner.width(), this.maxAllowedLeft = 20, this.maxAllowedRight = flexbe_cli.resize.viewportWidth - 20, this.defaultShift = this.$endRunner.width() / 2, this.activeRunner = !1, this.isDouble) {
        const t = this.$input.data("value").split(" — ");
        this.startValue = +t[0], this.endValue = +t[1]
      } else this.endValue = +this.$input.data("value"), this.startValue = +this.startEdge;
      this.endParams = {}, this.drawLegend(), this.updateTooltip(this.$startRunnerTip), this.updateTooltip(this.$endRunnerTip), this.setEvents(), this.setRunnersValue()
    }

    formatN(t) {
      return `${t < 0 ? "-" : ""}${flexbe_cli.locale.formatNumber(t, this.fractExponent)}`
    }

    getFract(t) {
      const e = `${t}`.split(".");
      return e[1] && e[1].length || 0
    }

    drawLegend() {
      if (this.legendText) return !1;
      const t = this.$legend.find(".from"), e = this.$legend.find(".to");
      if (t.text(this.formatN(this.startEdge)), e.text(this.formatN(this.endEdge)), "complex" !== this.legendType) return !1;
      this.$legend.find(".legend-point:not(.from, .to)").off("click").remove(), this.$legend.removeClass("complex").addClass("limits");
      const i = [`${this.formatN(this.startEdge)}`.length, `${this.formatN(this.endEdge)}`.length, `${this.formatN(this.step)}`.length],
        s = (i[0] + i[1] + i[2]) / 3, n = Math.max(this.startEdge, this.endEdge),
        o = [5 * this.step * this.fractDevider / this.fractDevider];
      for (let t = 1; t <= 12; t++) {
        const e = 10 ** t * this.step;
        e < n && u(o, e, this.fractDevider)
      }
      let a;
      const r = Math.ceil(this.$legend.find(i[0] > i[1] ? ".from" : ".to").width() / Math.max(i[1], i[0])),
        l = Math.round(.83 * this.barWidth / (r * s)), d = this.range > 0 ? 1 : -1;
      for (let t = Math.min(l, 10); t >= 3; t--) {
        const e = c(this.step, Math.abs(this.steps), t, o);
        if (e && Number.isInteger(e / this.step) && Number.isInteger(this.range / e)) {
          a = e;
          break
        }
      }
      if (!a || !Number.isInteger(this.range / (a * d)) || this.range / (a * d) < 3) for (let t = Math.min(Math.round(this.range / this.step), l, 10); t >= 2; t -= 1) {
        const e = this.roundFraction(this.range / t);
        if (e % this.step == 0) {
          a = e * d;
          break
        }
      }
      const h = this.roundFraction(this.range / (a * d));
      if (a && Number.isInteger(h)) {
        const t = [];
        for (let e = 1; e < h; e += 1) {
          const i = Math.round((this.startEdge + a * e * d) * this.fractDevider) / this.fractDevider;
          t.push(`<div class="legend-point" data-value="${i}">${this.formatN(i)}</div>`)
        }
        h > 2 && (this.$legend.attr("data-count", h), this.$legend.removeClass("limits").addClass("complex"));
        const e = $(t.join(""));
        this.$legend.find(".from").after(e)
      } else this.$legend.removeClass("complex").addClass("limits");

      function c(t, e, i, s) {
        return s.includes(e / i * t) ? e / i * t : s.includes((e + 1) / i * t) ? (e + 1) / i * t : s.includes((e + 2) / i * t) ? (e + 2) / i * t : s.includes((e + 3) / i * t) ? (e + 3) / i * t : s.includes((e + 4) / i * t) ? (e + 4) / i * t : s.includes((e + 5) / i * t) ? (e + 5) / i * t : s.includes((e + 6) / i * t) ? (e + 6) / i * t : s.includes((e + 7) / i * t) ? (e + 7) / i * t : s.includes((e + 8) / i * t) ? (e + 8) / i * t : !!s.includes((e + 9) / i * t) && (e + 9) / i * t
      }

      function u(t, e, i) {
        for (let s = 1; s < 10; s += 1) t.push(Math.round(e * s * i) / i), t.push(Math.round(e * s * i + e / 2) / i)
      }

      this.$legend.find(".legend-point:not(.to), .legend-point:not(.from)").each(((t, e) => {
        $(e).on("click", (() => {
          if (this.updateBarWidth(), this.isDouble) {
            const t = (this.startValue + this.endValue) / 2, i = +$(e).data("value"),
              s = this.startEdge < this.endEdge ? 1 : -1;
            i * s >= t * s ? this.endValue = i : this.startValue = i
          } else this.endValue = $(e).data("value");
          this.setRunnersValue()
        }))
      }))
    }

    roundFraction(t) {
      return Math.round(1e10 * t) / 1e10
    }

    setRunnersValue(t = !1) {
      if (!Number.isFinite(this.endValue) || !Number.isFinite(this.range) || this.isDouble && !Number.isFinite(this.startValue)) return !1;
      const e = this.startEdge < this.endEdge ? 1 : -1;
      "start" === this.activeRunner ? this.startValue * e <= this.startEdge * e ? this.startValue = this.startEdge : this.startValue * e >= this.endValue * e && (this.startValue = this.endValue) : this.endValue * e >= this.endEdge * e ? this.endValue = this.endEdge : this.endValue * e <= this.startValue * e && (this.endValue = this.startValue);
      const i = this.isDouble ? this.startValue : this.startEdge,
        s = this.isDouble ? (this.startValue - this.startEdge) / (this.range / 100) : 0,
        n = (this.endValue - i) / (this.range / 100);
      this.endValue = Math.round(this.endValue * this.fractDevider) / this.fractDevider, this.startValue = Math.round(this.startValue * this.fractDevider) / this.fractDevider, requestAnimationFrame((() => {
        this.$endRunnerValue.text(this.formatN(this.endValue)), this.$startRunnerValue.text(this.formatN(this.startValue))
      })), "end" === this.activeRunner ? this.updateTooltip(this.$endRunnerTip) : this.updateTooltip(this.$startRunnerTip), this.$value.css({
        width: `${n}%`,
        marginLeft: `${s}%`
      }), t || (this.isDouble ? this.$input.val(`${this.startValue} — ${this.endValue}`) : this.$input.val(this.endValue))
    }

    updateTooltip(t) {
      const e = t.closest(".range-runner");
      if (e && e.length) {
        const e = t.innerWidth(),
          i = t.closest(".range-runner")[0].getBoundingClientRect().left + this.startRunnerWidth / 2;
        let s;
        s = e / 2 > i + this.maxAllowedLeft ? e / 2 - (i - this.maxAllowedLeft) : e / 2 + i > this.maxAllowedRight ? this.maxAllowedRight - i - e / 2 : 0, t.css({transform: `translateX(${s}px)`})
      }
    }

    getValueFromLength(t) {
      const e = this.range / (this.barWidth / t);
      return (Math.round(e / this.step) + this.startEdge / this.step) * this.step
    }

    applyEndPosition(t) {
      return this["start" === this.activeRunner ? "startValue" : "endValue"] = this.getValueFromLength(t), this.setRunnersValue(), !0
    }

    touchHendler(t) {
      if (!this.endParams.active || 1 !== t.touches.length) return $("body")[0].removeEventListener("touchmove", this.touchHendler), !1;
      this.toggleAnimation(!1), t.preventDefault(), t.stopPropagation();
      const e = t.touches[0].pageX - this.endParams.left - this.endParams.shift;
      this.applyEndPosition(e)
    }

    startWatchingEvents(t = this.defaultShift) {
      this.endParams = {
        active: !0,
        left: this.$component.offset().left,
        shift: t
      }, clearTimeout(this.calmRunnersTimeout), "end" === this.activeRunner ? this.$endRunner.addClass("active") : this.$startRunner.addClass("active")
    }

    toggleAnimation(t) {
      t ? Math.abs(this.barWidth / this.steps) < 15 ? this.$component.addClass("animated") : (this.$component.removeClass("active-animation"), this.duration && this.$component.removeClass("animation-speed-" + (12 - Math.abs(Math.round(this.steps))))) : Math.abs(this.barWidth / this.steps) < 15 ? this.$component.removeClass("animated") : (this.$component.addClass("active-animation"), this.duration && this.$component.addClass("animation-speed-" + (12 - Math.abs(Math.round(this.steps)))))
    }

    afterRunnerReleased() {
      this.endParams.active && ("start" === this.activeRunner ? this.$startRunner.focus() : this.$endRunner.focus()), this.endParams.active = !1, this.debounceActive(), this.barWidth / this.steps < 15 ? this.$component.addClass("animated") : this.$component.removeClass("active-animation"), this.toggleAnimation(!0)
    }

    updateBarWidth() {
      const t = this.$component.width();
      t !== this.barWidth && (this.barWidth = t, "complex" === this.legendType && this.drawLegend())
    }

    setEvents() {
      const t = $(window), e = this;

      function i(i) {
        if (!e.endParams.active) return t.off("mousemove.dragRange"), !1;
        e.toggleAnimation(!1);
        const s = i.pageX - e.endParams.left - e.endParams.shift;
        return e.applyEndPosition(s), !0
      }

      this.$component.on("resize", (() => {
        this.updateBarWidth()
      })), this.$component.on("touchstart", (e => {
        if (1 !== e.touches.length) return !1;
        if (this.isDouble) {
          const t = (this.$endRunner.offset().left + this.$startRunner.offset().left) / 2;
          this.activeRunner = e.touches[0].pageX >= t ? "end" : "start", "start" === this.activeRunner ? (this.$startRunner.addClass("upper-runner"), this.$endRunner.removeClass("upper-runner")) : (this.$endRunner.addClass("upper-runner"), this.$startRunner.removeClass("upper-runner"))
        } else this.activeRunner = "end";
        e.stopPropagation(), this.updateBarWidth();
        const i = e.touches[0].pageX - this.$value.offset().left;
        this.startWatchingEvents(), this.applyEndPosition(i - this.defaultShift), t[0].addEventListener("touchmove", this.touchHendler.bind(this), {passive: !1}), t.on("touchend.range", (() => {
          this.afterRunnerReleased(), t[0].removeEventListener("touchmove", this.touchHendler), t.off("touchend.range")
        }))
      })), this.$component.on("mousedown", (e => {
        const s = e.pageX - this.$component.offset().left;
        if (this.isDouble) {
          const t = (this.$endRunner.offset().left + this.$startRunner.offset().left) / 2;
          this.activeRunner = e.pageX >= t ? "end" : "start", "start" === this.activeRunner ? (this.$startRunner.addClass("upper-runner"), this.$endRunner.removeClass("upper-runner")) : (this.$endRunner.addClass("upper-runner"), this.$startRunner.removeClass("upper-runner"))
        }
        this.updateBarWidth(), this.startWatchingEvents(), this.applyEndPosition(s - this.defaultShift), "start" === this.activeRunner ? this.$startRunner.focus() : this.$endRunner.focus(), t.on("mousemove.dragRange", i), t.on("mouseup.range", (() => {
          this.afterRunnerReleased(), t.off("mousemove.dragRange"), t.off("mouseup.range")
        }))
      })), this.$endRunner.on("touchstart", (e => {
        if (1 !== e.touches.length) return !1;
        e.stopPropagation(), this.updateBarWidth(), this.activeRunner = "end", this.$startRunner.removeClass("upper-runner"), this.$endRunner.addClass("upper-runner"), e.stopPropagation(), this.startWatchingEvents(e.touches[0].pageX - this.$endRunner.offset().left), this.toggleAnimation(!1), t[0].addEventListener("touchmove", this.touchHendler.bind(this), {passive: !1}), t.on("touchend.range", (() => {
          this.afterRunnerReleased(), t[0].removeEventListener("touchmove", this.touchHendler), t.off("touchend.range")
        }))
      })), this.$startRunner.on("touchstart", (e => {
        if (1 !== e.touches.length) return !1;
        e.stopPropagation(), this.updateBarWidth(), this.activeRunner = "start", this.$startRunner.addClass("upper-runner"), this.$endRunner.removeClass("upper-runner"), e.stopPropagation(), this.startWatchingEvents(e.touches[0].pageX - this.$startRunner.offset().left), this.toggleAnimation(!1), t[0].addEventListener("touchmove", this.touchHendler.bind(this), {passive: !1}), t.on("touchend.range", (() => {
          this.afterRunnerReleased(), t[0].removeEventListener("touchmove", this.touchHendler), t.off("touchend.range")
        }))
      })), this.$endRunner.on("mousedown", (e => {
        e.stopPropagation(), this.activeRunner = "end", this.$startRunner.removeClass("upper-runner"), this.$endRunner.addClass("upper-runner"), this.updateBarWidth(), this.$endRunner.focus(), this.startWatchingEvents(e.pageX - this.$endRunner.offset().left), this.toggleAnimation(!1), t.on("mousemove.dragRange", i), t.on("mouseup.range", (() => {
          this.afterRunnerReleased(), t.off("mousemove.dragRange"), t.off("mouseup.range")
        }))
      })), this.$startRunner.on("mousedown", (e => {
        e.stopPropagation(), this.activeRunner = "start", this.$startRunner.addClass("upper-runner"), this.$endRunner.removeClass("upper-runner"), this.updateBarWidth(), this.$startRunner.focus(), this.startWatchingEvents(e.pageX - this.$startRunner.offset().left), this.toggleAnimation(!1), t.on("mousemove.dragRange", i), t.on("mouseup.range", (() => {
          this.afterRunnerReleased(), t.off("mousemove.dragRange"), t.off("mouseup.range")
        }))
      })), this.$legend.find(".legend-point.to, .legend-point.from").each(((t, e) => {
        $(e).on("click", (() => {
          if (this.updateBarWidth(), this.isDouble) {
            const t = this.startEdge < this.endEdge ? 1 : -1, i = (this.startValue + this.endValue) / 2,
              s = +$(e).data("value");
            s * t >= i * t ? this.endValue = s : this.startValue = s
          } else this.endValue = $(e).data("value");
          this.setRunnersValue()
        }))
      })), this.$input.on("change", (() => {
        if (this.isDouble) {
          const t = this.$input.val().split(" — ");
          this.startValue = +t[0], this.endValue = +t[1]
        } else this.endValue = +this.$input.val();
        this.setRunnersValue(!0)
      })), this.$startRunner.on("keyup", (t => {
        t.preventDefault(), this.activeRunner = "start", this.handleKeydown(t, this.$startRunner)
      })), this.$endRunner.on("keyup", (t => {
        t.preventDefault(), this.activeRunner = "end", this.handleKeydown(t, this.$endRunner)
      })), this.$startRunner.on("keydown", (t => {
        this.activeRunner = "start", this.handleKeyup(t, this.$startRunner)
      })), this.$endRunner.on("keydown", (t => {
        this.activeRunner = "end", this.handleKeyup(t, this.$endRunner)
      })), this.$startRunner.on("blur", (() => {
        this.handleBlur()
      }))
    }

    handleBlur() {
      this.movingInterval && (clearInterval(this.movingInterval), this.movingInterval = !1), this.movingDebounceTimeout && (clearTimeout(this.movingDebounceTimeout), this.movingDebounceTimeout = !1)
    }

    handleKeydown(t, e) {
      if (this.movingInterval && (clearInterval(this.movingInterval), this.movingInterval = !1), this.movingDebounceTimeout && (clearTimeout(this.movingDebounceTimeout), this.movingDebounceTimeout = !1), [37, 38, 39, 40].includes(t.keyCode)) {
        const i = t.shiftKey ? 10 : 1, s = "start" === this.activeRunner ? "startValue" : "endValue";
        38 === t.keyCode || 39 === t.keyCode ? this[s] = (this[s] / this.step + i) * this.step : 37 !== t.keyCode && 40 !== t.keyCode || (this[s] = (this[s] / this.step - i) * this.step), e.addClass("active"), this.debounceActive(), this.setRunnersValue()
      }
    }

    handleKeyup(t, e) {
      9 !== t.keyCode && [37, 38, 39, 40].includes(t.keyCode) && (t.preventDefault(), e.addClass("active"), this.debounceActive(), this.startDebouncedMove(t))
    }

    startDebouncedMove(t) {
      this.movingDebounceTimeout && (clearTimeout(this.movingDebounceTimeout), this.movingDebounceTimeout = !1), this.movingDebounceTimeout = setTimeout((() => {
        this.movingInterval = setInterval((() => {
          this.debounceActive();
          const e = t.shiftKey ? 10 : 1, i = "start" === this.activeRunner ? "startValue" : "endValue";
          38 === t.keyCode || 39 === t.keyCode ? this[i] = (Math.round(this[i] / this.step) + e) * this.step : 37 !== t.keyCode && 40 !== t.keyCode || (this[i] = (Math.round(this[i] / this.step) - e) * this.step), this.setRunnersValue()
        }), 50)
      }), 300)
    }

    debounceActive() {
      this.calmRunnersTimeout && clearTimeout(this.calmRunnersTimeout), this.calmRunnersTimeout = setTimeout((() => {
        this.$endRunner.removeClass("active"), this.$startRunner.removeClass("active")
      }), 500)
    }
  }

  const Q = {
    selectClass: "",
    dropdownClass: "",
    selectedClass: "selected",
    optionSelector: "option",
    attrValue: "value",
    position: "over",
    padding: 10,
    title: !1
  };

  class J {
    static create(t) {
      return new this(t)
    }

    constructor(t) {
      this.opts = t, this.config = {...Q, ...t.config}, this.element = t.element, this.$select = $(this.element), this.isNativeSelect = this.$select.is("select"), this.selectAllDevice = "select" === this.$select.data("type"), this.blurTimeOut = !1, this.blurListTimeOut = !1, this.focused = !1, this.active = !1, this.createSelect()
    }

    createSelect() {
      this.$customSelect = $(`\n            <div class="dropdown-container ${this.config.selectClass}">\n                <div tabindex="0" class="dropdown-select">\n                    <span class="dropdown-select__content selected"></span>\n\n                    <span class="arrow">\n                        <svg viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">\n                            <path fill="currentColor" d="M 1.4 6.99441e-15L 0 1.34043L 5 6L 10 1.34043L 8.6 0L 5 3.34998L 1.4 6.99441e-15Z"/>\n                        </svg>\n                    </span>\n                </div>\n            </div>\n        `), this.$customSelect__content = this.$customSelect.find(".dropdown-select__content"), this.$select.after(this.$customSelect), this.syncSelect(), this.selectAllDevice || flexbe_cli.run.is_screen_desktop || !flexbe_cli.responsive ? (this.$customSelect.off("click.selected").on("click.selected", ".dropdown-select", (() => {
        clearTimeout(this.blurListTimeOut), this.active ? this.collapse() : this.activate()
      })), this.$customSelect.off("focus.selectFocus").on("focus.selectFocus", ".dropdown-select", (() => {
        this.focused = !0, this.$listWrapper || this.createList()
      })), this.isNativeSelect && this.$select.off("change.changeSelect").on("change.changeSelect", (t => {
        const e = this.$listWrapper.find(".dropdown-select-ul li"), i = t.currentTarget.value;
        e.removeClass(this.config.selectedClass), e.filter(((t, e) => e.getAttribute(this.config.attrValue) === i)).addClass(this.config.selectedClass), this.$customSelect__content.text(i), "function" == typeof this.opts.onChange && this.opts.onChange(t)
      })), this.$customSelect.off("keydown.selectKeydown").on("keydown.selectKeydown", ".dropdown-select", (t => {
        if (this.focused && [13, 27, 32, 38, 40].includes(t.keyCode)) {
          t.preventDefault();
          const e = this.$list.find(`.option-e.${this.config.selectedClass}`).filter((t => !$(t).attr("disabled")));
          if (40 === t.keyCode) t.preventDefault(), this.select(e.next(), !1), this.scrollToSelected(); else if (38 === t.keyCode) t.preventDefault(), this.select(e.prev(), !1), this.scrollToSelected(); else if (this.active || 32 !== t.keyCode) {
            if (this.active && [13, 27, 32].includes(t.keyCode)) return t.preventDefault(), this.collapse(), !1
          } else t.preventDefault(), this.activate()
        }
      }))) : this.$select.off("change.selected").on("change.selected", (t => {
        const e = t.target.value;
        this.$customSelect__content.text(e)
      }))
    }

    syncSelect() {
      const t = this.$select.children(this.config.optionSelector).filter(((t, e) => {
        var i;
        return (null != (i = e.selected) ? i : $(e).attr("selected")) || $(e).hasClass(this.config.selectedClass)
      })).eq(0), e = t.html() || "—";
      this.$customSelect__content.attr(this.config.attrValue, t.attr(this.config.attrValue)), this.$customSelect__content.html(e)
    }

    createList() {
      const t = this.$select.children(this.config.optionSelector);
      this.$listWrapper = $(`\n            <div class="select-container-in-body">\n                <div class="overlay"></div>\n                <ul class="dropdown-select-ul scrollable ${this.config.dropdownClass}" tabindex="0"></ul>\n            </div>\n        `), this.$list = this.$listWrapper.find(".dropdown-select-ul"), t.each(((t, e) => {
        var i, s, n;
        const o = $(e),
          a = (null != (i = e.selected) ? i : o.attr("selected")) || o.hasClass(this.config.selectedClass),
          r = (null != (s = e.disabled) ? s : o.attr("disabled")) || o.hasClass("disabled"),
          l = (null != (n = e.locked) ? n : o.attr("locked")) || o.hasClass("locked"),
          d = this.isNativeSelect ? o.val() : o.attr(this.config.attrValue), h = o.html().trim() || "—";
        let c = "";
        this.config.title && (c = o.attr("data-title"));
        const u = $(`<li title='${c}' class="option-e"></li>`);
        a && !r && u.addClass(this.config.selectedClass), r && u.attr("disabled", "disabled"), l && u.attr("locked", "locked"), u.attr(this.config.attrValue, d), u.html(h), this.$list.append(u)
      }))
    }

    select(t, e) {
      if (!t[0]) return;
      if (t.attr("disabled")) return clearTimeout(this.blurTimeOut), void this.$list.off("blur.listBlur").on("blur.listBlur", (() => {
        this.focused = !1, this.blurListTimeOut = setTimeout((() => {
          this.$listWrapper && this.collapse()
        }), 200)
      }));
      const i = t.attr(this.config.attrValue);
      if (t.siblings("li").removeClass(this.config.selectedClass), t.addClass(this.config.selectedClass), this.isNativeSelect) this.$select.val(i); else {
        const t = this.$select.children(this.config.optionSelector);
        t.removeAttr("selected").removeClass(this.config.selectedClass), t.filter(`[${this.config.attrValue}=${i}]`).addClass(this.config.selectedClass).attr("selected", "selected")
      }
      this.syncSelect(), e && this.collapse()
    }

    scrollToSelected() {
      const t = this.$list[0].offsetHeight;
      if (this.$list[0].scrollHeight <= t) return !1;
      const e = this.$list.children(".option-e").find(`.${this.config.selectedClass}`)[0];
      e && e.scrollIntoView()
    }

    collapse() {
      clearTimeout(this.blurTimeOut), this.active = !1, this.$listWrapper.removeClass("active rise"), this.$listWrapper.detach(), "function" == typeof this.opts.onCollapse && this.opts.onCollapse()
    }

    activate() {
      if (this.active) return !1;
      this.active = !0, this.createList();
      const t = this.config.padding || 0, e = {
        ...flexbe_cli.helpers.dom.getElOffset(this.$customSelect[0]),
        width: this.$customSelect.width(),
        height: this.$customSelect.height()
      };
      "under" === this.config.position && (e.top = e.top + e.height + t), this.$listWrapper.off("click.closeSelect").on("click.closeSelect", ".overlay", (t => {
        this.collapse();
        const e = document.elementFromPoint(t.clientX, t.clientY);
        e && e.focus()
      })), this.$listWrapper.off("click.selectLi").on("click.selectLi", ".dropdown-select-ul li", (t => {
        const e = $(t.currentTarget);
        this.select(e, !0), "function" == typeof this.opts.onSelect && this.opts.onSelect(t)
      })), this.$listWrapper.off("mousewheel.selectUl").on("mousewheel.selectUl", ".dropdown-select-ul", (t => {
        const e = t.currentTarget.scrollHeight, i = t.currentTarget.clientHeight;
        return !(t.currentTarget.scrollTop === e - i && t.deltaY > 0 || 0 === t.currentTarget.scrollTop && t.deltaY < 0)
      })), $("body").append(this.$listWrapper), clearTimeout(this.blurTimeOut), this.$list.css({
        left: `${e.left}px`,
        top: `${e.top}px`,
        width: `${e.width}px`
      }), this.$listWrapper.outerWidth(), this.$listWrapper.toggleClass("rise", !!this.$select.closest(".m_modal, .w_widget").length), this.$listWrapper.addClass("active"), this.scrollToSelected(), "function" == typeof this.opts.onActivate && this.opts.onActivate()
    }
  }

  class U {
    static getRecaptchaSettings() {
      const t = {env: {}, ...flexbe_cli.vars._group.flood && flexbe_cli.vars._group.flood.captcha || {}};
      return !t.visible && flexbe_cli.is_admin && (t.enabled = 0), t
    }

    constructor(t, e = U.getRecaptchaSettings()) {
      this.id = t.id, this.options = t, this.$form = t.$form, this.enabled = e.enabled, this.isOptional = e.ttl > 0, this.isVisible = e.visible, this.isInvisible = !e.visible, this.inModal = !(!this.isVisible || !this.isOptional && !t.inModal), this._widgetId = null, this._token = null
    }

    get loaded() {
      return "undefined" != typeof grecaptcha
    }

    get recaptchaSiteKey() {
      const {env: t} = U.getRecaptchaSettings();
      return this.isVisible ? t.RECAPTCHA_VISIBLE_SITE_KEY : t.RECAPTCHA_INVISIBLE_SITE_KEY
    }

    init() {
      if (!this.enabled || !this.loaded || this._inited) return;
      this._inited = !0;
      const t = this.$form.find(".g-recaptcha-" + (this.isVisible ? "visible" : "invisible"));
      t[0] && this.render(t[0])
    }

    getToken() {
      return this._token
    }

    render(t) {
      if (!this.enabled || !this.loaded) return;
      let e = flexbe_cli.run.is_screen_mobile_s ? "compact" : "normal";
      this.isInvisible && (e = "invisible");
      const i = {
        size: e, sitekey: this.recaptchaSiteKey, callback: t => {
          this._token = t, this.closeModal(), this._onSuccess(t)
        }, "expired-callback": () => {
          this.reset(), this._onExpired()
        }, "error-callback": () => {
          this.reset(), this._onError()
        }
      };
      grecaptcha.ready((() => {
        try {
          this._widgetId = grecaptcha.render(t, i)
        } catch (t) {
        }
        "function" == typeof this.options.onRecaptchaRendered && this.options.onRecaptchaRendered(this)
      }))
    }

    runModalCaptcha() {
      const t = `captcha-${this.id}`;
      if (!this._modal) {
        const e = $(`\n                <div class="m_modal m_${t}" data-is="modal" data-id="${t}" data-m-id="CAPTCHA">\n                    <div class="modal-data">\n                        <div class="component-bg" data-type="color" data-component="background">\n                            <div class="layer2 overlay"></div>\n                        </div>\n\n                        <div class="modal-content" data-contrast="dark" data-v="1" data-as="1">\n                            <div class="close close-times"></div>\n\n                            <div class="recaptcha-title">\n                                ${flexbe_cli.locale.tr("quiz::captcha_label")}\n                            </div>\n\n                            <div id="recaptcha-${this.id}" class="g-recaptcha g-recaptcha-visible"></div>\n                        </div>\n                    </div>\n                </div>\n            `);
        flexbe_cli.modal.$list.append(e), this._modal = flexbe_cli.entity.initArea(e)
      }
      flexbe_cli.events.emit("ui_modal_open", {
        id: t, options: {
          hash: !1, rise: !0, onClose: () => {
            this._token || this._onError()
          }
        }
      });
      const e = this._modal.$area.find(".g-recaptcha");
      null != this._widgetId ? this.reset() : this.render(e[0])
    }

    closeModal() {
      this._modal && flexbe_cli.events.emit("ui_modal_close", {id: this._modal.id})
    }

    runInvisibleChallenge() {
      this.enabled && this.loaded && !this.isVisible && (grecaptcha.ready((() => grecaptcha.execute(this._widgetId))), $('iframe[title="recaptcha challenge"]').parent().parent().css("z-index", 2e3))
    }

    reset() {
      this.enabled && this.loaded && (this._token = null, null != this._widgetId && grecaptcha.ready((() => grecaptcha.reset(this._widgetId))), "function" == typeof this.options.onReset && this.options.onReset(this))
    }

    _onError(...t) {
      "function" == typeof this.options.onError && this.options.onError(this, ...t)
    }

    _onSuccess(...t) {
      "function" == typeof this.options.onSuccess && this.options.onSuccess(this, ...t)
    }

    _onExpired(...t) {
      "function" == typeof this.options.onExpired && this.options.onExpired(this, ...t)
    }
  }

  const Z = {
    phone: {
      RU: ["+7 (***) ***-**-**", "8 (***) ***-**-**"],
      KZ: ["+7 (***) ***-**-**", "8 (***) ***-**-**"],
      UA: ["+38 (***) ***-****"],
      BY: ["+375 ** *******"],
      US: ["+1 (***) ***-****"]
    }
  };

  function tt(t) {
    if (void 0 === window.IMask) return;
    const e = {
      signed: !0,
      lazy: !0,
      padFractionalZeros: !0,
      definitions: "tel" === t.getAttribute("type") ? {"*": /\d/, "#": /\d/} : {
        "#": /\d/,
        "@": /[A-Za-z\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
        "*": /./
      }
    }, i = t.getAttribute("data-required");
    let s = t.getAttribute("data-mask");
    s = s && !/[ #()*@{}]/.test(s) ? function (t) {
      const e = String(t).toLowerCase(), i = flexbe_cli.locale.country;
      let s = Z[e] && Z[e][i];
      return s && "string" == typeof s && (s = [s]), Object.assign([], s)
    }(s) : [s];
    try {
      if (s = s.filter((t => /[ #()*@_{}]/.test(t))), s = s.map((t => t.replace(/0/g, "\\0"))), 0 === s.length) throw{message: "Mask is empty"};
      s = 1 === s.length ? String(s[0]) : s.map((t => ({...e, mask: t})));
      const n = new window.IMask(t, {
        ...e, mask: s, dispatch: (t, e) => {
          const i = e.compiledMasks;
          if (1 === i.length) return i[0];
          const s = (e.value + t).replace(/\W/g, "");
          return i.find((t => {
            const e = t.mask.replace(/\W/g, "")[0];
            return s[0] === e
          })) || i[0]
        }
      }), o = () => {
        n.masked.isComplete || !i && !n.value ? t.setAttribute("data-mask-complete", !0) : t.removeAttribute("data-mask-complete"), t.setAttribute("value", n.value)
      };
      t.value && o(), n.on("accept", o), $(t).on("focus", (e => {
        requestAnimationFrame((() => {
          $(t).trigger("click")
        }))
      })), t._mask = n
    } catch (e) {
      e instanceof Error && console.error("MASK ERROR:", {
        masks: s,
        errorMessage: e.message
      }), t.removeAttribute("data-mask")
    }
  }

  class et {
    on(t, e) {
    }

    one(t, e) {
    }

    off(t, e) {
    }

    emit(t, ...e) {
    }

    constructor() {
      !function (t) {
        "object" != typeof t && (t = this);
        const e = {
          _JQInit() {
            this._JQ = $({})
          }, emit(t, e) {
            return this._JQ || this._JQInit(), this._JQ.trigger(t, e), this
          }, one(t, e) {
            return this._JQ || this._JQInit(), this._JQ.one(t, e), this
          }, on(t, e) {
            return this._JQ || this._JQInit(), this._JQ.on(t, e), this
          }, off(t, e) {
            return this._JQ || this._JQInit(), this._JQ.off(t, e), this
          }
        };
        Object.keys(e).forEach((i => {
          t[i] = e[i].bind(t)
        }))
      }(this)
    }
  }

  new et;
  const it = 0, st = 1, nt = 2, ot = 3, at = 4;

  class rt extends et {
    static async getFileHash(t) {
      const e = t.name, i = await async function (t) {
        return new Promise((e => {
          const i = new FileReader;
          i.addEventListener("load", (t => {
            e(t.target.result)
          })), i.readAsBinaryString(t)
        }))
      }(t);
      return s = e + i.slice(0, 4194304), String(s).split("").reduce(((t, e) => (t = (t << 5) - t + e.charCodeAt(0)) & t), 0).toString(16).replace("-", "a");
      var s
    }

    constructor(t) {
      super(), this.request = void 0, this.id = void 0, this.file = void 0, this.status = it, this.name = void 0, this.progress = 0, this.uri = void 0, this.file = t, this.name = t.name
    }

    async init() {
      this.id = await rt.getFileHash(this.file)
    }

    upload() {
      this.emit("start");
      const t = flexbe_cli.helpers.upload(this.file, {
        onProgress: (t, e) => {
          e.lengthComputable && (this.progress = e.loaded / e.total), this.emit("progress", {
            jqXhr: t,
            progress: this.progress
          })
        }, onSuccess: (t, e) => {
          this.uri = t.fileUri, this.status = nt, this.emit("success", {jqXHR: t, textStatus: e})
        }, onError: (t, e) => {
          this.progress = 1, this.status = "abort" === e ? at : ot, this.emit("error", {jqXHR: t, textStatus: e})
        }, onComplete: (t, e) => {
          this.emit("complete", {jqXHR: t, textStatus: e})
        }
      });
      return this.request = t, this.status = st, t
    }

    async abort() {
      this.request && this.status === st && (this.status = at, this.request.abort())
    }
  }

  let lt = {};

  function dt(t, e, i) {
    const s = (t, e, i) => {
      const s = t.find(".form-field-hidden"), n = Array.from(e).map((t => t.uri)).filter((t => t));
      $(`input[name="fields[${i}][value][]"]`).remove(), n.forEach((t => s.append($(`<input class="value" type="hidden" name="fields[${i}][value][]" value="${t}">`))))
    };
    t.on(`change${e}`, ".file-input--original", (async t => {
      const e = Object.values(t.currentTarget.files);
      if (!e.length) return;
      const n = $(t.currentTarget), o = n.closest(".form-field"), a = o.find(".file-list"), r = o.attr("data-field-id"),
        l = (t, e) => function (t, e = {}) {
          const i = Object.keys(e), s = Object.values(e);
          return new Function(...i, `return \`${t}\`;`)(...s)
        }(i, {id: e, fileName: t});
      lt[r] || (lt[r] = []);
      let d = e.map((t => new rt(t)));
      await Promise.all(d.map((t => t.init()))), d = d.filter((t => !lt[r].find((e => e.id === t.id)))), d.forEach((t => {
        const e = $(l(t.name, t.id));
        t.on("start", (() => {
          o.addClass("loading"), o.removeClass("is_error"), a.append(e)
        })), t.on("progress", ((t, i) => {
          const s = 124.853 - 124.853 * i.progress;
          e.find(".circular-loader--path").css({"stroke-dashoffset": `${s}`})
        })), t.on("success", (() => {
          s(o, lt[r], r)
        })), t.on("error", ((t, i) => {
          "abort" !== i.textStatus && (e.addClass("is-error"), o.addClass("is_error"), o.find(".error-text").text(flexbe_cli.locale.tr("form::error_file")))
        })), t.on("complete", (() => {
          e.removeClass("loading"), lt[r].every((t => 1 === t.progress)) && o.removeClass("loading")
        })), t.upload()
      })), lt[r].push(...d), n.val("")
    })), t.on(`click${e}`, ".clear-files", (t => {
      const e = $(t.currentTarget).parents(".file-item"), i = $(t.currentTarget).closest(".form-field"),
        n = i.attr("data-field-id"), o = e.attr("data-id"), a = lt[n].find((t => t.id === o));
      i.removeClass("is_error"), lt[n] = lt[n].filter((t => t !== a)), e.remove(), a.abort(), s(i, lt[n], n)
    }))
  }

  class ht extends I {
    constructor(...t) {
      super(...t), this.id = this.core.id, this.eventId = `.${this.id}`, this.$form = this.$component.is("form") ? this.$component : this.$component.find("form"), this.$button = this.$component.find(".form-submit"), this.$fields = this.$component.find(".form-fields"), this.action = this.$component.find('input[name="action"]').val(), this.isInline = this.$component.attr("data-inline") ? 1 : 0, this.inCart = this.$component.closest(".w_widget").length > 0, this.inModal = this.$component.closest(".m_modal").length > 0, this.busy = !1, this.submitDisabled = !1, this.submitDisabledMessage = "", this.products = null, this.pay = null
    }

    onInit() {
      this.formInited = !1, this.$masked = this.$component.find("[data-mask]"), this.$calendars = this.$component.find(".form-field-date__input"), this.$file = this.$component.find(".file-input-outer"), this.$file.length && (this.$itemTemplateFile = this.$itemTemplateFile || this.$file.find("template").clone()), this.$masked.length && (this.hasMaskedField = !0, this.require.push("/_s/lib/imask/imask.min.js?v1")), this.$calendars.length && (this.hasCalendarField = !0, this.require.push("/_s/lib/scroll-lock/scroll-lock.min.js"), this.require.push("/_s/lib/calendar/dist/js/calendar.js?v2.3.4", "/_s/lib/calendar/dist/css/calendar.min.css?v2.3.4"))
    }

    onLoad() {
      (this.core.wasScreen || this.core.wasBeside) && (this.hasMaskedField && this.inputMask(), this.hasCalendarField && this.inputDate())
    }

    onScreen({state: t}) {
      if (!t) return !1;
      this.formInit()
    }

    onBeside({state: t}) {
      if (!t) return !1;
      this.formInit()
    }

    onOpen(t = {}) {
      const {top: e} = this.component.getBoundingClientRect();
      !flexbe_cli.run.is_screen_mobile && !flexbe_cli.is_admin && flexbe_cli.resize.viewportHeight > e + 100 && this.$component.find(".form-field").eq(0).find("input, textarea").eq(0).focus(), t && t.data && this.setData(t.data)
    }

    onResize() {
      this.$component.find(".range-outer").trigger("resize")
    }

    formInit() {
      if (this.formInited) return !1;
      this.formInited = !0, this.$form.attr("action", `/mod/project/${flexbe_cli.group_id}/lead/send/`), this.unbindEvents(), this.bindEvents(), this.initCaptcha(), this.customize()
    }

    customize() {
      this.fileInput(), this.customSelect(), this.textResize(), this.inputRange(), this.deliveryField(), this.hasMaskedField && this.isLoaded && this.inputMask(), this.hasCalendarField && this.isLoaded && this.inputDate(), this.$component.find(".form-field-range").trigger("resize")
    }

    unbindEvents() {
      this.$component.off(this.eventId), this.$form.off(this.eventId)
    }

    bindEvents() {
      const t = this.$component.find('.form-field-text__input, .form-field-text__textarea, input[type="checkbox"]'),
        e = this.$component.closest(".scroller");
      t.on(`keydown${this.eventId}`, (t => {
        const e = t.currentTarget, i = e.getAttribute("data-check"), s = t.key || "", n = t.ctrlKey || t.metaKey;
        return !("phone" === i && !e._mask && !n && 1 === s.length && /[^\d ()+-]/.test(s)) && (("email" !== i || !/[\s,]/.test(s)) && void 0)
      })), t.on(`input${this.eventId} change${this.eventId}`, (t => {
        const e = t.currentTarget, i = $(e);
        i.attr("value", e.value), i.closest(".is_error").removeClass("is_error")
      })), this.hasCalendarField && (this.inModal || this.inCart) && setTimeout((() => {
        const t = this.$calendars.toArray().map((t => $(t).data("calendar"))).filter((t => t));
        e.on(`scroll${this.eventId}`, (() => {
          t.forEach((t => t.main.toPosition()))
        }))
      }), 150), this.$form.off("submit").on(`submit${this.eventId}`, (t => ((async () => {
        if ("function" == typeof this.beforeSend) {
          if (!1 === await this.beforeSend()) return !1
        }
        try {
          await this.sendForm()
        } catch (t) {
          alert(t.message)
        }
      })(), t.preventDefault(), t.stopPropagation(), !1)))
    }

    setData(t) {
      if (!t) return !1;
      t && t.fields && this.addFields(t.fields), t && t.items && this.addItems(t.items)
    }

    defineBeforeSend(t) {
      "function" == typeof t && (this.beforeSend = t)
    }

    defineAfterSent(t) {
      "function" == typeof t && (this.afterSent = t)
    }

    defineOnRequestError(t) {
      "function" == typeof t && (this.onRequestError = t)
    }

    addFields(t, e = !0) {
      const i = this.$component.find(".form-fields-advanced");
      t.length && i[0] && (e && this.resetFields(), t.forEach((t => {
        i.find(`input[name="${t.name}"]`).remove();
        const e = $("<input>").attr("type", t.type).attr("name", t.name).attr("value", t.value);
        i.append(e)
      })))
    }

    resetFields() {
      const t = this.$component.find(".form-fields-advanced");
      t[0] && t.empty()
    }

    addItems(t = []) {
      if (!t || !t.length) return;
      let e = 0;
      t = t.map((t => "object" != typeof t ? {} : (t.price = parseFloat(t.price) || 0, t.title = "string" == typeof t.title && t.title.trim() || t.title || "", e += t.price * t.count || 0, t))), this.products = t || [], e && (this.pays = {
        price: e,
        desc: ""
      })
    }

    async sendForm() {
      if (this.submitDisabled) return void setTimeout((() => {
        this.$button.addClass("shake"), setTimeout((() => {
          this.$button.removeClass("shake")
        }), 500)
      }), 30);
      if (this.busy || !this.validateForm()) return !1;
      const t = this.captcha && this.captcha.getToken();
      if (this.captcha && this.captcha.enabled && !this.captcha.isOptional && !t) {
        if (this.captcha.inModal) return void this.captchaModalRun();
        if (this.captcha.isInvisible) return void this.captchaInvisibleRun()
      }
      this.addSubmitting();
      const e = new FormData(this.$form.get(0));
      e.append("is_ajax", "true"), e.delete("fileOriginal"), this.products && e.append("products", JSON.stringify(this.products)), this.pays && (e.append("pay[price]", this.pays.price), e.append("pay[desc]", this.pays.desc)), e.append("pageId", flexbe_cli.p_id), e.append("jsform", JSON.stringify(parseInt(448312, 10))), flexbe_cli.stat.u_id && e.append("userId", flexbe_cli.stat.u_id);
      const i = flexbe_cli.stat.AB.getCookie();
      e.append("abTest", JSON.stringify(i)), e.delete("g-recaptcha-response"), t && e.append("captcha-token", t), flexbe_cli.run.is_OSX && "function" == typeof e.entries && e.forEach(((t, i) => {
        "object" == typeof t && t instanceof File && 0 === t.size && "function" == typeof e.delete && e.delete(i)
      }));
      const s = this.$form.attr("action"),
        n = {type: "POST", dataType: "json", processData: !1, contentType: !1, data: e};
      try {
        const t = await flexbe_cli.helpers.fetch(s, n);
        t.send_formdata = !0, null != t.pay && (this.pay = t.pay), this.clearSubmitting(!0), this.captchaRemoveError(), this.showDone()
      } catch (e) {
        const i = e.data;
        if (i && i.captcha) {
          if (this.captcha) t ? this.captchaAddError() : this.captcha.inModal ? this.captchaModalRun() : this.captcha.isInvisible && (this.captcha.isOptional = !1, this.captchaInvisibleRun()); else {
            const t = "visible" === i.captcha;
            await this.initCaptcha({
              ...U.getRecaptchaSettings(),
              enabled: !0,
              visible: t,
              ttl: 1
            }), t ? this.captchaModalRun() : (this.captcha.isOptional = !1, this.captchaInvisibleRun())
          }
          return
        }
        await this.sendFormError(e)
      }
    }

    async sendFormError(t) {
      this.clearSubmitting(), console.error("sendForm error: ", t), "function" == typeof this.onRequestError ? await this.onRequestError(t, this) : t.status && 500 === t.status && alert("Network error")
    }

    addSubmitting() {
      this.busy = +Date.now(), this.$component.addClass("submitting")
    }

    clearSubmitting(t = !1) {
      this.busy && (this.$component.removeClass("submitting"), t ? (this.$component.addClass("success submit-ok"), this.$component.find(".file-list").empty(), this.$component.find("input.value").remove(), setTimeout((() => {
        this.busy = !1, this.$component.removeClass("success submit-ok")
      }), 1e3)) : this.busy = !1)
    }

    showDone() {
      if ("function" == typeof this.afterSent && this.afterSent(), flexbe_cli.stat.reachGoals({
        mainGoal: flexbe_cli.stat.goals.order_done,
        goal: this.$component.find('input[name="goal"]').val(),
        htmlGoal: this.$component.find('textarea[name="goal_html"]').val()
      }), "pay" === this.action) if (void 0 !== this.pay && null !== this.pay) {
        if (this.pay.pay_link.length > 0) {
          const t = `${window.location.origin + window.location.pathname + (window.location.search ? `${window.location.search}&` : "?")}pay_id=${this.pay.pay_id}&h=${this.pay.pay_hash}`;
          try {
            window.history.pushState(null, null, t), setTimeout((() => {
              flexbe_cli.events.emit("pay", {action: "init"})
            }), 200)
          } catch (e) {
            setTimeout((() => {
              document.location = t
            }), 500)
          }
        }
      } else window.location.hash = "pay", flexbe_cli.events.emit("pay", {
        action: "success",
        withoutPay: !0
      }); else if ("redirect" === this.action) {
        const t = this.$component.find('input[name="action_redirect"]');
        let e;
        t && t.length && (e = t.val()), e && setTimeout((() => {
          flexbe_cli.helpers.links.gotoLink(e)
        }), 500)
      } else {
        let t = this.$component.find("[data-modal-id]").attr("data-modal-id");
        if (/^(form|done)$/.test(t) && !flexbe_cli.modal.find(t)) {
          t = `${String(this.id).split("_")[0]}_${t}`
        }
        flexbe_cli.events.emit("ui_modal_open", {id: t})
      }
      this.resetForm()
    }

    resetForm() {
      this.$component.find(".file-input-outer").removeClass("active");
      const t = this.$fields.find("input, textarea, select"),
        e = t.not("select").not('[type="hidden"]').not(".form-field-range__input").not(".g-recaptcha-response"),
        i = t.filter("select"), s = t.filter(".form-field-range__input");
      i.each(((t, e) => {
        const i = e.querySelector("option"), s = i && i.value || "";
        e.value !== s && (e.value = s, e.dispatchEvent(new Event("change", {bubbles: !0, cancelable: !0})))
      })), s.each(((t, e) => {
        e.value = e.getAttribute("data-value"), e.dispatchEvent(new Event("change", {bubbles: !0, cancelable: !0}))
      })), e.each(((t, e) => {
        const i = e.defaultChecked;
        if (["radio", "checkbox"].includes(e.type)) i ? e.setAttribute("checked", !0) : e.removeAttribute("checked"), e.checked = i; else {
          e.removeAttribute("value"), e.value = "", e.removeAttribute("data-mask-complete");
          const t = e._mask;
          t && t.updateValue()
        }
        e.dispatchEvent(new Event("change", {bubbles: !0, cancelable: !0}))
      })), this.captcha && this.captcha.enabled && (this.captcha.reset(), this.captchaRemoveError()), this.pay = null, lt = {}, this.$form.get(0).reset(), this.resetFields()
    }

    validateForm() {
      let t = !0, e = !0, i = !0;
      this.removeFieldsErrors();
      const s = this.$component.find(".policy-data-warning--checkbox"), n = s.find("input")[0];
      n && !n.checked && (t = !1, s.addClass("is_error")), this.$component.find(".form-field[data-type]").each(((t, s) => {
        let n;
        const o = $(s), a = o.find("input, textarea, select").not('[type="hidden"]')[0], r = o.attr("data-type");
        if (!a && "captcha" !== r) return;
        const l = a.type, d = "checkbox" === l ? a.checked : "file" === l ? o.find("input.value") : a.value;
        if ("captcha" === r) {
          if (!this.captcha) return;
          n = !this.captcha.getToken() && flexbe_cli.locale.tr("form::captcha_not_checked")
        } else n = this.checkField(o, a);
        if (n) {
          const t = o.attr("data-type"), i = o.find(".error");
          o.outerWidth(), o.addClass("is_error"), i.length && (i.attr("title", n), i.find(".error-text").text(n)), "checkbox" === t && o.find(".form-field-checkbox__box").attr("title", n), e = !1
        }
        i && d && "captcha" !== r && (i = !1)
      })), this.$fields.removeClass("all-fields-empty"), this.$fields.outerWidth(), e || this.$fields.addClass("has-error");
      const o = this.$component.find(".is_error");
      return o.addClass("animate"), setTimeout((() => {
        o.removeClass("animate")
      }), 500), i && (this.$fields.toggleClass("all-fields-empty", i), e = !1), e && t
    }

    checkField(t, e) {
      if (e.disabled || e.hidden) return !1;
      const i = e.type, s = "checkbox" === i ? e.checked : "file" === i ? t.find("input.value") : e.value,
        n = e.getAttribute("data-required") || !1, o = e.getAttribute("data-check") || !1;
      let a = !(!n || s) && "form.required";
      if (e._mask && e.getAttribute("data-mask") || !1) {
        !n && !s || e.getAttribute("data-mask-complete") || (a = "tel" === i && s ? "form.phone" : "text" === i && s ? "form.text" : "form.required")
      } else if (o) if ("date" === o || "datetime" === o) {
        const t = $(e).data("calendar"), i = t && t.input.checkError();
        i && (a = i)
      } else if (s.length && "email" === i) {
        /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\wЁА-яё-]+\.)+[A-Za-zЁА-яё]{2,}))$/.test(s) || (a = "form.email")
      } else if (s.length && "tel" === i) if (/[^\d\s()+-]/.test(s)) a = "form.digits"; else {
        s.replace(/\D/g, "").length < 5 && (a = "form.minlength")
      } else "file" === i && (a = n && !s.length ? "form.required" : !!t.hasClass("loading") && "form.loading");
      return a = a && flexbe_cli.locale.tr(a) || !1, a
    }

    removeFieldsErrors() {
      this.$fields.removeClass("has-error"), this.$component.find(".is_error").removeClass("is_error animate"), this.$fields.outerWidth()
    }

    disableSubmit(t) {
      this.submitDisabled = !0, this.submitDisableMessage = t, this.$button.attr("data-tip", t || ""), this.$button.find(".component-button").attr("disabled", "disabled"), flexbe_cli.tip.init(this.$button)
    }

    enableSubmit() {
      this.submitDisabled = !1, this.submitDisableMessage = "", this.$button.removeAttr("data-tip"), this.$button.find(".component-button").removeAttr("disabled"), flexbe_cli.tip.destroy(this.$button)
    }

    async initCaptcha(t) {
      return null == t && (t = U.getRecaptchaSettings()), new Promise(((e, i) => {
        !this.captcha && t.enabled && (this.captcha = new U({
          id: this.id,
          $form: this.$component,
          inModal: this.isInline,
          onSuccess: t => {
            this.captchaRemoveError(), this.clearSubmitting(), (t.inModal || t.isInvisible) && this.sendForm()
          },
          onError: () => {
            this.captchaAddError()
          }
        }, t), flexbe_cli.require(`https://www.google.com/recaptcha/api.js?render=explicit&hl=${flexbe_cli.vars._group.language}`, (() => {
          let t = 150;
          const s = setInterval((() => {
            t -= 1, this.captcha.loaded ? (this.captcha.init(), clearInterval(s), e()) : 0 === t && i(new Error("Can not load grecaptcha"))
          }), 10)
        })))
      }))
    }

    captchaAddError(t) {
      if (!this.captcha || !this.captcha.enabled) return;
      null == t && (t = flexbe_cli.locale.tr("form::captcha_error"));
      const e = this.$component.find(".captcha-global-error");
      e.find(".error-text").text(t), e.addClass("show"), this.busy && this.clearSubmitting()
    }

    captchaRemoveError() {
      if (!this.captcha || !this.captcha.enabled) return;
      const t = this.$component.find('.form-field[data-type="captcha"]'),
        e = this.$component.find(".captcha-global-error");
      t.removeClass("is_error"), e.removeClass("show")
    }

    captchaModalRun() {
      this.captcha && this.captcha.enabled && this.captcha.loaded && this.captcha.runModalCaptcha()
    }

    captchaInvisibleRun() {
      if (!this.captcha || !this.captcha.enabled || !this.captcha.loaded || this.captcha.isVisible) return;
      this.addSubmitting(), this.captcha.runInvisibleChallenge();
      const t = this.busy;
      setTimeout((() => {
        t === this.busy && this.clearSubmitting()
      }), 2500)
    }

    fileInput() {
      var t;
      dt(this.$component, this.eventId, null == (t = this.$itemTemplateFile) ? void 0 : t.html())
    }

    textResize() {
      this.$component.find(".autosize").each(((t, e) => {
        const i = e.offsetHeight - e.clientHeight, s = $(e), n = getComputedStyle(e), o = +s.attr("rows") || 0,
          a = parseInt(n.borderTop, 10) + parseInt(n.borderBottom, 10),
          r = parseInt(n.paddingTop, 10) + parseInt(n.paddingBottom, 10);
        let l = Math.round(+n.lineHeight.split("px")[0]);
        if (flexbe_cli.run.is_ios) {
          l /= parseInt(n.textSizeAdjust || n.webkitTextSizeAdjust || "120%", 10) / 100
        }
        s.removeAttr("data-autoresize"), s.off("keyup input").on("keyup input", (function (t) {
          const e = t.currentTarget;
          e.style.height = `${e.scrollHeight + i}px`
        })), s.css("minHeight", `${a + r + l * o}px`)
      }))
    }

    customSelect() {
      this.$component.find(".dropdown-container").remove();
      const t = this.$component.find("select.atom-custom-select"),
        e = {dropdownClass: this.$component.hasClass("style-underlined") ? "sharp size--medium " : "size--medium "};
      t.each(((t, i) => {
        const s = $(i).closest('[data-type="select"]');
        J.create({
          element: i, config: e, onCollapse: () => {
            s.removeClass("active")
          }, onActivate: () => {
            s.addClass("active"), s.siblings('[data-type="select"]').removeClass("active")
          }
        })
      }))
    }

    deliveryField() {
      if (this.$delivery = this.$component.find('[data-type="delivery"]'), !this.$delivery.length) return;
      const {promotionStore: t, cartStore: e, deliveryStore: i} = flexbe_cli.ecommerce, s = () => {
        const t = i.activeMethod;
        if (!t) return;
        const e = this.$delivery, s = e.find(".form-field-delivery-item"), n = e.find(".form-field-delivery-fields"),
          o = s.filter(`[data-delivery="${t.id}"]`), a = n.filter(`[data-delivery="${t.id}"]`);
        s.removeClass("form-field-delivery-item--active"), o.addClass("form-field-delivery-item--active"), n.removeClass("form-field-delivery-fields--active"), a.addClass("form-field-delivery-fields--active"), n.find("input, textarea, select").prop("disabled", !0), a.find("input, textarea, select").prop("disabled", !1), s.find("input[type=radio]").prop("checked", !1), o.find("input[type=radio]").prop("checked", !0)
      }, n = () => {
        this.$delivery.find(".form-field-delivery-item").each(((t, e) => {
          const s = e.getAttribute("data-delivery"), n = $(e).find(".item-price"), o = $(e).find(".delimiter"),
            a = $(e).find(".min-total"), r = i.getPrice(s),
            l = `${flexbe_cli.locale.tr("form.min_total_tip")} ${r.minTotalFormatted}`;
          r.notHasFree || r.untilFree && r.notFixedPrice ? (n.text(""), o.text("")) : (n.text(r.currentFormatted), o.text("–")), a.text(flexbe_cli.locale.tr(l))
        }))
      };
      s(), n(), setTimeout((() => {
        i && i.on(`dispatch.form-component-${this.id}`, ((t, {name: e}) => {
          "selectMethod" === e && s()
        })), e && e.on(`dispatch.form-component-${this.id}`, (() => {
          n()
        })), t && t.on(`dispatch.form-component-${this.id}`, (() => {
          n()
        }))
      }), 10), this.$delivery.on("change", ".form-field-delivery-item input", (t => {
        if (t.currentTarget.checked) {
          const e = t.currentTarget.closest("[data-delivery]").getAttribute("data-delivery");
          i.dispatch("selectMethod", e)
        }
      }))
    }

    inputRange() {
      this.$component.find(".form-field-range").each(((t, e) => new X($(e))))
    }

    inputMask() {
      return "undefined" != typeof IMask && (this.hasMaskedField = !1, this.$masked.each(((t, e) => {
        tt(e);
        const i = !!e.getAttribute("data-placeholder"), s = e._mask;
        i && s && ($(e).on(`focus${this.eventId}`, (() => {
          s.updateOptions({lazy: !1})
        })), $(e).on(`blur${this.eventId}`, (() => {
          if (!s.unmaskedValue) {
            const t = s.mask.replace(/\*/g, "_"), e = s.value;
            s.updateOptions({lazy: !0}), s.masked.rawInputValue && t !== e || (s.unmaskedValue = "", s.value = "", s.updateValue())
          }
        })))
      })), !0)
    }

    inputDate() {
      this.hasCalendarField = !1;
      const t = this.$component.closest(".scroller")[0];
      return this.$calendars.each(((e, i) => {
        !function (t, e) {
          const i = $(t), s = i.closest("[data-type]").attr("data-type"), n = i.attr("data-date-range") || "any",
            o = i.attr("data-date-work-days") || "0,1,2,3,4,5,6";
          let a = (new Date).getFullYear() + 3;
          "datetime" === s && (a = (new Date).getMonth() >= 8 ? (new Date).getFullYear() + 1 : (new Date).getFullYear());
          let r = new Date((new Date).getFullYear() - 100, 0, 1), l = new Date(a, 11, 31);
          "datetime" !== s && "future" !== n || (r = new Date), "date" === s && "past" === n && (l = new Date);
          const d = {
            type: s,
            lowerLimit: r,
            upperLimit: l,
            dateRange: n,
            locale: flexbe_cli.locale.translation.calendar,
            dateFormat: flexbe_cli.locale.date_format,
            showDateSelector: "date" === s && "future" !== n,
            insertTo: e,
            workDays: o.split(","),
            workTime: null
          };
          if ("datetime" === s) {
            const t = i.attr("data-date-time-interval") || 30, e = i.attr("data-date-time-start") || "00:00",
              s = i.attr("data-date-time-finish") || "00:00";
            d.workTime = {
              interval: t,
              start: {hour: +e.substring(0, 2), minute: +e.substring(3, 5)},
              finish: {hour: +s.substring(0, 2), minute: +s.substring(3, 5)}
            }
          }
          i.calendar(d)
        }(i, t)
      })), !0
    }
  }

  ht.is = "form";

  function ct(t, e = []) {
    return null == t.parentNode ? e : ct(t.parentNode, [...e, t])
  }

  function ut(t) {
    const e = /(auto|scroll)/, i = getComputedStyle(t, null);
    return ["overflow", "overflow-y", "overflow-x"].some((t => e.test(i.getPropertyValue(t))))
  }

  function pt(t) {
    if (!t || !t.parentNode) return;
    const e = t.ownerDocument || document, i = ct(t.parentNode, []);
    for (let t = 0; t < i.length; t++) if (ut(i[t])) return i[t];
    return e.scrollingElement || e.documentElement
  }

  class mt extends I {
    get showOnClick() {
      return "click" === this.showType || "mobile" === flexbe_cli.resize.responsiveMode || flexbe_cli.run.is_touch
    }

    get showOnHover() {
      return "hover" === this.showType && "desktop" === flexbe_cli.resize.responsiveMode && flexbe_cli.run.is_pointer
    }

    get isRowDirection() {
      return "row" === ("desktop" === flexbe_cli.resize.responsiveMode ? this.direction : this.directionAdaptive)
    }

    get showAsPopup() {
      return "desktop" === flexbe_cli.resize.responsiveMode || this.isRowDirection
    }

    constructor(...t) {
      super(...t), this.eventId = this.owner._core.id, this.rootModal = "modal" === this.core.is && this.core, this.$menuList = this.$component.find(".component-menu-list--root"), this.showType = this.$component.attr("data-type"), this.direction = this.$component.attr("data-direction"), this.directionAdaptive = this.$component.attr("data-direction-adaptive"), this.allowShowMore = "true" === this.$component.attr("data-show_more"), this.isNested = !!this.$menuList.find(".folder-item").length, this.openFolders = [], this.$component.css("max-width", this.$component.width() + 1)
    }

    onBeside({state: t, first: e}) {
      t && e && (this.bindEvents(), this.dispatchShowMore(), this.$button = this.$component.find(".folder-item"), this.$header = this.$button.closest(".floating-header"), this.$header.length && this.$header.off("sticky_header").on("sticky_header", (() => {
        this._closeFolder()
      })))
    }

    onResize(t = {}) {
      ["bottom", "top"].includes(t.type) || (this.dispatchShowMore(), this.openFolders.forEach((t => {
        t.$dropdown ? this.setDropdownPosition(t) : this.showAsPopup && this._closeFolder(t)
      })))
    }

    onWindowResize() {
      this.onResize()
    }

    onClose() {
      this.toggleFolder(null, !1)
    }

    bindEvents() {
      $(window).off(`.${this.eventId}`), this.$component.off(".core"), flexbe_cli.is_admin && this.$component.on("mouseup.core.prevent click.core.prevent", ".folder-item", (t => {
        t.stopPropagation()
      })), $(window).on(`blur.${this.eventId}`, (() => {
        this.showAsPopup && this._closeFolder()
      })), this.$component.on("pointerenter.core.item pointerleave.core.item", ".menu-item", (t => {
        if ("desktop" === flexbe_cli.resize.responsiveMode) {
          const e = "pointerenter" === t.type;
          this.$component.toggleClass("in-hover", e), $(t.currentTarget).toggleClass("hover", e)
        }
      })), this.$component.on("pointerenter.core.folder", ".folder-item", (t => {
        this.showOnHover && (clearTimeout(this._dropdownTimer), $(t.currentTarget).hasClass("show") || (this._dropdownTimer = setTimeout((() => {
          flexbe_cli.events.emit("component_menu:closeAll"), this.toggleFolder(t.currentTarget, !0)
        }), 50)))
      })), this.$component.on("pointerleave.core.folder", ".folder-item", (() => {
        this.showOnHover && (clearTimeout(this._dropdownTimer), this._dropdownTimer = setTimeout((() => {
          flexbe_cli.events.emit("component_menu:closeAll")
        }), 100))
      })), this.$component.on("click.core", ".folder-item", (t => {
        if (!this.showOnClick) return;
        const e = t.currentTarget;
        return ("mobile" !== flexbe_cli.resize.responsiveMode || t.target.closest(".folder-item-text")) && e ? (this.toggleFolder(e), !1) : void 0
      })), flexbe_cli.events.off(`component_menu:closeAll.${this.eventId}`).on(`component_menu:closeAll.${this.eventId}`, (() => {
        this.openFolders.forEach((t => this.toggleFolder(t, !1)))
      }))
    }

    observeItems() {
      let t, e = !0;
      const i = this.$component.find("li.root-item")[0];
      this.unobserveItems(), this._resizeObserver = new ResizeObserver((() => {
        e ? e = !1 : (clearTimeout(t), t = setTimeout((() => {
          this.onResize({})
        }), 30))
      })), this._resizeObserver.observe(i)
    }

    unobserveItems() {
      this._resizeObserver && (this._resizeObserver.disconnect(), this._resizeObserver = null)
    }

    dispatchShowMore() {
      if (!this.allowShowMore || "mobile" === flexbe_cli.resize.responsiveMode || !this.isRowDirection) return void this.restoreMenuItems();
      this.$componentCopy ? this.restoreMenuItems() : this.$componentCopy = this.$component.clone();
      const t = getComputedStyle(this.$component[0]), e = this.$component.innerWidth(), i = this.$menuList.innerWidth(),
        s = parseInt(t.getPropertyValue("--gapX"), 10) || 0, n = e + 2 * s;
      if (i <= n) return this.observeItems(), !1;
      const o = this.$menuList.find("li.root-item");
      this.$menuList.append('\n            <li class="menu-item root-item folder-item show-more">\n                <svg viewBox="0 0 18 4">\n                    <path transform="rotate(-90 2 2)" d="M4 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-2 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>\n                </svg>\n\n                <ul class="component-menu-list component-menu-list--nested"></ul>\n            </li>\n        ');
      const a = this.$menuList.find(".show-more .component-menu-list--nested");
      let r = 18 + 2 * s;
      o.toArray().forEach((t => {
        const e = t.offsetWidth;
        r + e > n && (a.append(t), $(t).removeClass("root-item")), r += e
      })), this.observeItems()
    }

    restoreMenuItems() {
      const t = this.$menuList.find(".show-more");
      if (t.length) {
        if (this.$componentCopy) {
          const t = this.$componentCopy.find(".component-menu-list--root").clone();
          this.$menuList.html(t.html())
        } else {
          const e = t.find(".component-menu-list").eq(0).children();
          e.addClass("root-item"), t.replaceWith(e)
        }
        this.$menuList.css({position: "", top: "", left: ""}), this.unobserveItems()
      }
    }

    toggleFolder(t, e) {
      null == e && (e = !$(t).hasClass("show")), this[e ? "_openFolder" : "_closeFolder"](t)
    }

    toggleNestedFolder(t, e) {
      null == e && (e = !$(t).hasClass("show")), this[e ? "_openNestedDropdown" : "_closeNestedDropdown"](t)
    }

    _openFolder(t) {
      const e = $(t);
      if (!e.length || e.hasClass("show")) return;
      const i = flexbe_cli.is_admin && !!this.$component.closest("[data-editor*=menu]:not(.editor-focus)").length,
        s = flexbe_cli.is_admin && !!this.$component.closest(".editor-focus").length;
      if (!i) {
        if (this.showAsPopup) {
          flexbe_cli.events.emit("component_menu:closeAll");
          const i = $("body"), n = e.find(".component-menu-list--nested").eq(0).clone(),
            o = $(`<div class="component-menu-dropdown ${s ? "editor-focus" : ""}"></div>`);
          t.$dropdown = o;
          const a = getComputedStyle(t),
            r = ["--gapY", "--fontSize", "--lineHeight", "--fontWeight", "--letterSpacing", "--itemFontStyle", "--itemTextDecoration"].reduce(((t, e) => ({
              ...t,
              [e]: a.getPropertyValue(e)
            })), {});
          if (o.css(r), this.$component.addClass("in-show"), e.addClass("show"), o.append(n).appendTo(i), this.setDropdownPosition(t), this.component.closest(".m_modal, .floating-header")) {
            let e = pt(this.component);
            e === document.documentElement && (e = document), $(e).one(`scroll.${this.eventId}`, (() => {
              this.setDropdownPosition(t)
            }))
          }
          o.off("pointerenter").on("pointerenter", (() => {
            clearTimeout(this._dropdownTimer)
          })), i.on(`keydown.dropdown-${this.eventId}`, (t => {
            "Escape" === t.code && this._closeFolder()
          })), i.on(`click.dropdown-${this.eventId}`, (t => {
            t.target.closest(".folder-item") || this._closeFolder()
          })), o.off("pointerleave").on("pointerleave", (() => {
            clearTimeout(this._dropdownTimer), this.toggleNestedFolder(null, !1), this.showOnHover && (this._dropdownTimer = setTimeout((() => {
              this.toggleFolder(t, !1)
            }), 100))
          })), o.on("pointerenter.core.folder pointerleave.core.folder", ".menu-item", (t => {
            $(t.currentTarget).toggleClass("hover", "pointerenter" === t.type)
          })), flexbe_cli.run.is_touch ? o.on("click.core.folder", ".folder-item", (t => {
            this.toggleNestedFolder(t.currentTarget)
          })) : (o.on("pointerenter.core.folder", ".folder-item", (t => {
            this.toggleNestedFolder(t.currentTarget, !0)
          })), o.on("pointerleave.core.folder", ".folder-item", (t => {
            this.toggleNestedFolder(t.currentTarget, !1)
          })))
        } else e.addClass("show"), e.find(".component-menu-list--nested").eq(0).slideDown(350);
        this.openFolders.push(t)
      }
    }

    _closeFolder(t) {
      const e = t ? $(t) : this.$menuList.find(".folder-item.show");
      let i = pt(this.component);
      i === document.documentElement && (i = document), $("body").off(`.dropdown-${this.eventId}`), this.$component.removeClass("in-show"), $(i).off(`.${this.eventId}`), e.removeClass("show"), e.find(".show").removeClass("show"), this.showAsPopup ? (e.find(".component-menu-list--nested").css("display", ""), e.each(((t, e) => {
        e.$dropdown && e.$dropdown.remove()
      }))) : e.find(".component-menu-list--nested").slideUp(350), this.openFolders = this.openFolders.filter((t => !e.is(t)))
    }

    _openNestedDropdown(t) {
      const {viewportWidth: e, documentHeight: i} = flexbe_cli.resize, s = $(t), n = s.siblings(".nested-item.show"),
        o = s.find(".component-menu-list--nested").eq(0), a = s.offset(), r = s.innerWidth(), l = s.innerHeight(),
        d = a.left, h = d + r, c = a.top, u = c + l, p = o.innerWidth(), m = o.innerHeight(), f = d > p, g = e - h > p,
        v = c > m, b = i - u > m;
      n.each(((t, e) => this._closeNestedDropdown(e))), s.addClass("show"), o.addClass("show-dropdown"), g ? o.addClass("in-right") : f ? o.addClass("in-left") : (o.addClass("in-right"), o.css({
        marginTop: "15px",
        marginLeft: `-${Math.floor(p - (e - h) + 10)}px`
      })), b ? o.addClass("in-bottom") : v ? o.addClass("in-top") : o.addClass("in-bottom")
    }

    _closeNestedDropdown(t) {
      const e = $(t), i = e.find(".component-menu-list--nested").eq(0);
      e.removeClass("show"), i.removeClass("show-dropdown in-left in-right in-bottom in-top")
    }

    setDropdownPosition(t) {
      if (!t || !t.$dropdown) return;
      const {documentHeight: e, viewportHeight: i, viewportWidth: s} = flexbe_cli.resize, n = $(t), o = t.$dropdown,
        a = o.find(".component-menu-list--nested").eq(0), r = n.hasClass("show-more"),
        l = r ? n.find("svg") : n.children().first().find("span"), d = this.$header.closest(".position-fixed").length,
        h = l[0].getBoundingClientRect(), c = l.offset(), u = c.top, p = u + h.height, m = c.left,
        f = parseInt(a.find(".menu-item-text").css("paddingLeft"), 10) || 10,
        g = {position: "absolute", width: a.innerWidth(), height: a.innerHeight(), top: p, left: m - f};
      g.width < h.width && (g.width = h.width + 2 * f, a.css("width", "100%")), r && (g.left = m + h.width / 2 - g.width / 2);
      const v = Math.max(0, -1 * g.left + 7), b = Math.max(0, g.left + g.width + 7 - s);
      v ? g.left += v : b && (g.left -= b);
      const w = p + g.height > e && u > g.height, y = p + g.height > flexbe_cli.scroll.latest + i;
      d && g.height + h.bottom < i ? (g.position = "fixed", g.top = h.bottom) : (w || this.rootModal && y) && (g.top = u - g.height), o.toggleClass("rise", d), o.css(g)
    }
  }

  mt.is = "menu";

  class ft extends I {
    constructor(...t) {
      super(...t), this.type = this.$component.data("type"), this.autoplay = !!+this.$component.data("autoplay"), this.$preview = this.$component.find(".video-preview"), this.$iframe = this.$component.find("iframe"), this.$video = this.$component.find(".custom-video"), this.hasPreview = this.$preview.length, this.frameLoaded = !1, this.autoSet = !this.hasPreview, this.$preview.on("click", (() => {
        this.set(), this.play(!0)
      })), this.$component.off("sliderActivate").on("sliderActivate", (() => {
        this.preventAutoplay = !1, this.inScreen && this.autoSet && (this.set(), this.autoplay && this.play())
      })), this.$component.off("sliderDeactivate").on("sliderDeactivate", (() => {
        this.preventAutoplay = !0, this.pause()
      }))
    }

    onScreen({state: t}) {
      t ? ((this.autoplay || this.autoSet) && this.set(), this.autoplay && !this.preventAutoplay && this.play()) : this.pause()
    }

    set() {
      this.isSet || (this.isSet = !0, "youtube" === this.type ? this.initYoutube() : "vimeo" === this.type ? this.initVimeo() : this.initCustom())
    }

    initCustom() {
      this.$component.addClass("loading");
      const t = this.$video[0], e = t.getAttribute("data-src"), i = t.getAttribute("src");
      if (e && !i) {
        const i = document.createElement("source");
        t.addEventListener("error", console.error), t.addEventListener("playing", (() => this.onPlay())), t.addEventListener("pause", (() => this.onPause())), i.addEventListener("error", console.error), i.setAttribute("type", "video/mp4"), i.setAttribute("src", e), t.appendChild(i), t.load()
      }
    }

    initVimeo() {
      this.$component.addClass("loading");
      const t = this.$iframe[0], e = t.getAttribute("data-src"), i = t.getAttribute("src");
      e && !i && (t.src = e), flexbe_cli.require(["https://player.vimeo.com/api/player.js"], (() => {
        this.vPlayer = new window.Vimeo.Player(t), this.onFrameLoaded((() => {
          this.$component.addClass("loaded")
        })), this.vPlayer.on("bufferstart", (() => {
          this.vPlayer.off("bufferstart"), this.$component.addClass("started")
        })), this.vPlayer.on("play", (() => {
          this.onPlay()
        })), this.vPlayer.on("pause", (() => {
          this.onPause()
        }))
      }))
    }

    initYoutube() {
      this.$component.addClass("loading");
      const t = this.$iframe[0], e = t.getAttribute("data-src"), i = t.getAttribute("src");
      this.onFrameLoaded((() => {
        this.$component.addClass("loaded");
        const e = t => {
          t !== window.YT.PlayerState.BUFFERING && t !== window.YT.PlayerState.PLAYING || this.$component.addClass("started"), t === window.YT.PlayerState.PLAYING ? this.onPlay() : t !== window.YT.PlayerState.PAUSED && t !== window.YT.PlayerState.ENDED || this.onPause()
        };
        flexbe_cli.require([`https://www.youtube.com/iframe_api?origin=${window.location.host}`], (() => {
          ((t, e) => {
            if ("function" != typeof e || "function" != typeof t) return !1;
            if (t()) e(); else {
              const i = setInterval((() => {
                t() && (clearInterval(i), e())
              }), 10)
            }
          })((() => window.YT && window.YT.Player), (() => {
            this.ytVideo = new window.YT.Player(t, {
              events: {
                onStateChange: t => {
                  e(t.data)
                }, onReady: () => {
                  e(this.ytVideo.getPlayerState())
                }
              }
            })
          }))
        }))
      })), e && !i && (t.src = e)
    }

    play(t = !1) {
      this.isAutoplayed = !t, this.isPaused = !1, this.onFrameLoaded((async () => {
        if ("custom" === this.type) try {
          await this.$video[0].play()
        } catch (t) {
          const e = this.$video.attr("data-image");
          this.$video.attr("poster", e)
        } else if ("vimeo" === this.type && this.vPlayer) this.vPlayer.play(); else if ("youtube" === this.type) {
          const t = this.$iframe[0];
          (t && t.contentWindow).postMessage('{"event":"command","func":"playVideo","args":""}', "*")
        }
        this.hasPreview && this.$preview.fadeOut(150, (() => {
          this.$preview.remove()
        }))
      })), this.hasPreview && this.$preview.off("click").addClass("preloading")
    }

    pause() {
      this.isAutoplayed = !1, this.isPaused = !0, this.onFrameLoaded((() => {
        try {
          if ("custom" === this.type) this.$video[0].pause(); else if ("vimeo" === this.type && this.vPlayer) this.vPlayer.pause(); else if ("youtube" === this.type) {
            const t = this.$iframe[0];
            (t && t.contentWindow).postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
          }
        } catch (t) {
        }
      }))
    }

    onFrameLoaded(t = (() => {
    })) {
      if (this.frameLoaded) t(); else if ("custom" === this.type) this.frameLoaded = !0, t(); else {
        let e = !1;
        setTimeout((() => {
          this.frameLoaded = !0, e || (e = !0, t())
        }), 1e3), this.$iframe.one("load", (() => {
          this.frameLoaded = !0, e || (e = !0, t())
        }))
      }
    }

    onPlay() {
      !flexbe_cli.is_admin && "mobile" === flexbe_cli.resize.responsiveMode && this.component.closest('[data-hidden="desktop"]') && flexbe_cli.resize.lockMode(!0), this.autoplay && this.isAutoplayed || (this._sliderAutoplayPrevented = !0, this.$component.trigger("preventSliderAutoplay", {state: !0}))
    }

    onPause() {
      this._sliderAutoplayPrevented && (this._sliderAutoplayPrevented = !1, this.$component.trigger("preventSliderAutoplay", {state: !1}))
    }
  }

  ft.is = "video";
  const gt = {};

  class vt extends I {
    async onInit() {
      this.$component.off(".componentImage"), this.$component.on("setImage.componentImage", $.debounce((async t => {
        var e;
        ("lazyPriority" !== (null == (e = t.detail) ? void 0 : e.reason) || this.autoLoad) && (this.autoLoad = !0, this.lazyLoad = !0, !this.isVisible || this.isImgLoading || this.isImgLoaded || await this.loadImage())
      }), 10))
    }

    async onBeside({state: t}) {
      if (!t) return !1;
      this.isCreated || await this.create(), !this.isImgLoaded && this.autoLoad && this.lazyLoad && await this.loadImage()
    }

    async onResize() {
      (this.isImgLoaded || this.isCreated && this.autoLoad && this.lazyLoad) && await this.loadImage(!0)
    }

    async create() {
      this.isCreated = !0, this.imageLoadingOptions = flexbe_cli.vars._group.images, this.lazyLoad = this.component.hasAttribute("data-img-lazy"), this.autoLoad = this.component.hasAttribute("data-img-autoload"), this.hasImagePlaceholder = this.component.hasAttribute("data-has-placeholder"), this.isImgLoaded = !this.$component.hasClass("loading"), this.imageLayer = this.$component.find(".component-image__image").get(0) || this.component, this.overlay = this.$component.find(".overlay-container").get(0), this.setParams(), this.isImgLoaded || !this.autoLoad || this.lazyLoad || await this.loadImage()
    }

    async loadImage(t = !1) {
      if (this.isCreated || await this.create(), !t && (this.isImgLoaded || this.isImgLoading)) return;
      this.isImgLoading = !0, this.setOverlay();
      const e = this.params;
      let i;
      e.original_resolution || (i = await this.getOptimalSize(), i && gt[this.params.id].sizes && !gt[this.params.id].sizes.includes(i) && gt[this.params.id].sizes.push(i));
      const s = V(e, i, this.imageLoadingOptions);
      this.hasImagePlaceholder && await z(s), this.setImage(s), this.isImgLoading = !1
    }

    async getOptimalSize() {
      const t = this.params, e = await L(t);
      t.proportion = e, gt[this.params.id] && (gt[this.params.id].params.proportion = e);
      const i = this.componentWidth, s = this.componentHeight;
      let {width: n} = await O(this.params, {width: i, height: s}, this.imageLoadingOptions);
      const o = n - 2, a = Math.max(50, 1.2 * n);
      return n = this.getClosestSize(n, o, a), n
    }

    setImage(t) {
      const {$component: e, params: i} = this;
      "image" === i.type ? this.imageLayer.src = t : "background" === i.type && (this.imageLayer.style.backgroundImage = `url(${t})`), this.isImgLoaded || (e.removeClass("loading"), this.isImgLoaded = !0), e.trigger("load")
    }

    setOverlay() {
      const {overlay: t, componentWidth: e, componentHeight: i} = this;
      if (!t) return;
      let s = "medium";
      e <= 200 || i <= 150 ? s = "xsmall" : e <= 400 || i <= 250 ? s = "small" : e >= 650 && i >= 400 && (s = "large"), t.setAttribute("data-size", s), "hover" === t.getAttribute("data-type") && $(t).on("mouseenter mouseleave touchstart touchend", (e => {
        const i = /enter|start/.test(e.type);
        $(t).toggleClass("hover", i)
      }))
    }

    setParams() {
      var t;
      const e = this.component, i = $(e);
      let s = {};
      const n = i.attr("data-img-id");
      if (null != (t = gt[n]) && t.params) s = {...gt[n].params}; else {
        s.id = n, s.ext = i.attr("data-img-ext"), s.proportion = +i.attr("data-img-proportion");
        const t = i.attr("data-img-name");
        if (!s.ext && t) {
          const e = t.match(/\.(\D{2,4})$/i) || [];
          e[1] && s.ext !== e[1] && (s.ext = e[1] || !1)
        }
      }
      s.type = i.attr("data-img-type"), s.action = i.attr("data-action"), s.proportion || (s.proportion = 100), s.scale = i.attr("data-img-scale") || "cover", s.original_resolution = e.hasAttribute("data-img-original"), s.uploding_url = i.attr("data-uploding-url"), gt[s.id] || (gt[s.id] = {
        params: {...s},
        sizes: []
      }), s.animated = e.hasAttribute("data-img-animated"), s.transparent = e.hasAttribute("data-img-transparent"), this.params = s
    }

    getClosestSize(t, e = t, i = t + 10) {
      var s;
      const n = gt[this.params.id].sizes || [];
      let o, a = 1 / 0;
      return n.forEach((s => {
        const n = Math.abs(s - t);
        s >= e && s <= i && n < a && (o = s, a = n)
      })), null != (s = o) ? s : t
    }
  }

  vt.is = "image";
  const bt = new Array(70).fill(1).map(((t, e) => 50 + 50 * e));

  class wt extends I {
    constructor(...t) {
      super(...t), this.isCreated = void 0, this.isImgLoaded = void 0, this.isLazyLoading = void 0, this.svgUrl = void 0, this.image = void 0, this.imageLoadingOptions = void 0
    }

    async onInit() {
      this.$component.on("setImage", (async () => {
        this.isVisible && !this.isImgLoaded && (this.isCreated || this.create(), await this.loadImage())
      }))
    }

    async onBeside({state: t}) {
      t && (this.isCreated || this.create(), this.isLazyLoading && !this.isImgLoaded && await this.loadImage())
    }

    async onResize() {
      this.isCreated && await this.loadImage()
    }

    create() {
      const t = this.$component.data();
      this.imageLoadingOptions = flexbe_cli.vars._group.images, this.svgUrl = t.svgUrl, this.isLazyLoading = !!t.imgLazy, this.image = {
        id: t.imgId,
        ext: t.imgExt,
        proportion: t.imgProportion,
        width: t.imgWidth,
        animated: t.imgAnimated,
        transparent: t.imgTransparent,
        scale: t.imgScale,
        type: "background"
      }, this.isCreated = !0
    }

    async loadImage() {
      const t = this.$component.find(".vector-icon use"), e = this.$component.find(".raster-icon");
      if (t.length && t.attr("href", this.svgUrl), e.length) {
        const t = {
            width: this.componentWidth,
            height: this.componentHeight
          }, {width: i} = await O(this.image, t, {...this.imageLoadingOptions, sizes: bt}),
          s = V(this.image, i, this.imageLoadingOptions);
        e.css("background-image", `url(${s})`)
      }
      this.isImgLoaded = !0
    }
  }

  wt.is = "icon";

  class $t extends I {
    constructor(...t) {
      super(...t), this.require = ["/_s/lib/swiper8/dist/swiper-bundle.min.js?v843"];
      const {component: e} = this;
      this.swiper = null, this.initialSlide = 0, this.index = $(e).closest("[data-item-id]").attr("data-item-id"), this.sliderEl = e.classList.contains("swiper") ? e : e.querySelector(".swiper"), this.paginationEl = e.querySelector(".slider-pagination"), this.prevEl = e.querySelector('.slider-prev, [data-direction="prev"]'), this.nextEl = e.querySelector('.slider-next, [data-direction="next"]');
      const i = this.paginationEl && this.paginationEl.getAttribute("data-type") || "bullets";
      this.options = {
        paginationType: i,
        count: e.getAttribute("data-count"),
        loop: Boolean(!flexbe_cli.is_admin && Math.floor(e.getAttribute("data-loop"))),
        autoplay: !flexbe_cli.is_admin && Math.floor(e.getAttribute("data-autoplay")) || !1,
        effect: e.getAttribute("data-effect") || "slide"
      }
    }

    onLoad() {
      this.inScreen && !this.swiper && this.initSwiper()
    }

    onScreen({state: t}) {
      t && this.isLoaded && !this.swiper && this.initSwiper()
    }

    onView({state: t}) {
      this.isLoaded && (t && !this.swiper && this.initSwiper(), this.swiper && this.toggleAutoplay({state: t}))
    }

    onResize() {
      this.swiper && (this.setSliderSize(), this.setThumbnailsSize(), this.swiper && this.swiper.initialized && this.swiper.update())
    }

    onDestroy() {
      if (this.swiper) try {
        Object.keys(this.swiper.eventsListeners).forEach((t => {
          this.swiper.off(t)
        })), this.swiper.detachEvents()
      } catch (t) {
      } finally {
        this.swiper = null
      }
    }

    initSwiper() {
      if (this.swiper || "undefined" == typeof Swiper) return !1;
      const {
          options: i,
          component: s,
          core: n,
          root: o,
          index: a,
          sliderEl: r,
          paginationEl: l,
          prevEl: d,
          nextEl: h
        } = this, c = `${n && n.id || "-"}:${a}`, {count: u, loop: p, paginationType: m, effect: f} = i,
        g = 4 === flexbe_cli.theme_id, v = this.owner.closest(".swiper-inited"), b = !!i.autoplay && {
          delay: 1e3 * i.autoplay,
          stopOnLastSlide: !p,
          disableOnInteraction: !1,
          waitForTransition: !1
        };
      let w = this.initialSlide;
      flexbe_cli.is_admin && (o._sliderState ? o._sliderState[c] && (w = Math.max(0, Math.min(u - 1, o._sliderState[c]) || 0)) : o._sliderState = {}, o._sliderState[c] = w);
      const y = {el: l, type: m, clickable: !0, dynamicBullets: g, dynamicMainBullets: 3};
      "thumbs" === m && (y.type = !1, y.el = null, this.thumbsSwiper = new Swiper(l, {
        cssMode: !0,
        loop: !1,
        slidesPerView: "auto",
        normalizeSlideIndex: !1
      }));
      const _ = new Swiper(r, {
        init: !1,
        speed: 350,
        nested: v,
        initialSlide: w,
        autoplay: b,
        pagination: y,
        thumbs: {swiper: this.thumbsSwiper},
        navigation: {prevEl: d, nextEl: h},
        effect: f,
        rewind: p,
        roundLengths: !0,
        preventInteractionOnTransition: !0,
        longSwipesMs: 150,
        longSwipesRatio: .2,
        threshold: 1,
        preloadImages: !1,
        touchReleaseOnEdges: !1,
        runCallbacksOnInit: !1
      });
      if (this.swiper = _, "fade" === f ? G(_) : g && function (t) {
        if (t.params.virtualTranslate = !0, t.params.cssMode = !0, flexbe_cli.run.is_chrome && !flexbe_cli.run.is_ios) {
          let i, s = !1;
          t.on("touchStart", (() => {
            s = !0
          })), t.on("touchEnd", (() => {
            s = !1, i || e()
          })), t.on("setTranslate", (() => {
            clearTimeout(i), i = setTimeout((() => {
              i = null, s || e()
            }), 40)
          }))
        }

        function e() {
          t.wrapperEl.scrollLeft = t.wrapperEl.scrollLeft
        }
      }(_), _.on("init", t((() => {
        this.setSliderSize(), this.setThumbnailsSize(), null != this.swiper && this.swiper.$el.addClass("swiper-inited"), $(d).add(h).add(l).removeClass("disabled");
        const t = _.slides[_.activeIndex], e = _.visibleSlides || [_.slides[_.activeIndex]];
        this.thumbsSwiper && e.push(...this.thumbsSwiper.visibleSlides), Y(e), t && j(t, !1, "sliderActivate"), this.toggleAutoplay({state: this.inView})
      }))), this.thumbsSwiper && this.thumbsSwiper.on("slideChange", $.debounce((t => {
        Y(t.visibleSlides)
      }), 50)), _.on("slideChange", $.debounce((() => {
        flexbe_cli.is_admin && (o._sliderState[c] = _.realIndex);
        const t = _.slides[_.previousIndex], e = _.slides[_.activeIndex], i = e && e.getAttribute("data-type"),
          n = _.previousIndex < _.activeIndex ? Array.from(_.slides).slice(_.activeIndex, _.activeIndex + 2) : Array.from(_.slides).slice(_.activeIndex - 2, _.activeIndex);
        s.setAttribute("data-current-content", i), j(t, null, "sliderDeactivate"), j(e, null, "sliderActivate"), Y(n)
      }), 50)), _.on("touchStart", (() => {
        $(r).addClass("swiper-in-interacting")
      })), _.on("touchEnd", (() => {
        $(r).removeClass("swiper-in-interacting")
      })), _.params.cssMode) {
        let t;
        _.on("slideChange", (() => {
          clearTimeout(t), _.animating = !0, _.allowSlidePrev = !1, _.allowSlideNext = !1, t = setTimeout((() => {
            _.animating = !1, _.allowSlidePrev = !0, _.allowSlideNext = !0
          }), 150)
        }))
      }
      this.$component.on("preventSliderAutoplay", ((t, {state: e = !0}) => {
        this.preventAutoplay = !!e, this.preventAutoplay && this.toggleAutoplay({state: !1})
      })), this.$component.one("pointerenter", (() => {
        const t = Array.from(_.slides);
        Y([_.activeIndex - 1, _.activeIndex + 1].map((e => t.at(e))))
      })), this.$component.on("pointerdown wheel", (() => {
        this.toggleAutoplay({state: !1})
      })), e((() => _.init()))
    }

    toggleAutoplay({state: t}) {
      const {swiper: e, options: i} = this;
      if (!e || !i.autoplay || !e.autoplay) return !1;
      this.preventAutoplay && (t = !1);
      const s = e.autoplay.running;
      t && !s && e.autoplay.start(), !t && s && e.autoplay.stop()
    }

    slideTo(t, e = !0) {
      if (!this.swiper) return void (this.initialSlide = t);
      const i = this.swiper.params.loop;
      void 0 !== this.swiper.realIndex && this.swiper.realIndex !== t && (i ? this.swiper.slideToLoop(t, e ? null : 0) : this.swiper.slideTo(t, e ? this.swiper.params.speed : 0))
    }

    setSliderSize() {
      const t = this.$component.find(".swiper");
      if (!t.length) return;
      const e = t[0];
      e.style.width = "";
      const i = e.getBoundingClientRect().width, s = e.offsetWidth;
      if (i % 1 > 0 && Math.abs(s - i) < 2) {
        e.style.width = `${Math.round(i)}px`;
        try {
          this.swiper.update()
        } catch (t) {
        }
      }
    }

    setThumbnailsSize() {
      if (!this.thumbsSwiper || "thumbs" !== this.options.paginationType) return;
      const t = $(this.paginationEl), e = t.find(".thumb-item"), i = e.length,
        s = this.thumbsSwiper.params.slidesPerView;
      t.css("width", ""), e.css("width", "");
      const n = parseInt(e.css("--thumbPad"), 10), o = t[0].offsetWidth, a = e[0].offsetWidth;
      let r = Math.max(4, Math.round(o / (a + n)));
      i >= 4 && (i === r + 1 || i === r - 1) ? r = i : !s || s !== r + 1 && s !== r - 1 || (r = s), t.toggleClass("is-filled", i >= r), this.thumbsSwiper.params.slidesPerView = r, this.thumbsSwiper.params.spaceBetween = n, this.thumbsSwiper.update()
    }
  }

  $t.is = "slider";
  [H, q, ft, vt, $t, K, wt, mt, class extends ht {
  }].forEach((t => {
    S.registerComponent(t)
  }))
}();
