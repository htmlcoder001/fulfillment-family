!function () {
  "use strict";

  function e(e) {
    if ((e = Math.trunc(e) || 0) < 0 && (e += this.length), !(e < 0 || e >= this.length)) return this[e]
  }

  const t = Reflect.getPrototypeOf(Int8Array);
  for (const i of [Array, String, t]) Object.defineProperty(i.prototype, "at", {
    value: e,
    writable: !0,
    enumerable: !1,
    configurable: !0
  });

  function i(e) {
    console.warn("video load error, gif fallback used");
    const t = e.querySelector("img");
    t && e.parentNode.replaceChild(t, e)
  }

  function o(e) {
    const t = document.cookie.match(new RegExp(`(?:^|; )${e.replace(/([$()*+./?[\\\]^{|}])/g,"\\$1")}=([^;]*)`));
    return t ? decodeURIComponent(t[1]) : void 0
  }

  function s(e, t, i = {}) {
    let o = i.expires;
    if ("number" == typeof o && o) {
      const e = new Date;
      e.setTime(e.getTime() + 1e3 * o), o = e, i.expires = e
    }
    o && o.toUTCString && (i.expires = o.toUTCString());
    let s = `${e}=${t = encodeURIComponent(t)}`;
    Object.keys(i).forEach((e => {
      s += `; ${e}`;
      const t = i[e];
      !0 !== t && (s += `=${t}`)
    })), document.cookie = s
  }

  function n(e) {
    window.setCookie(e, "", {expires: -1})
  }

  function r(e) {
    let t;
    if (e) {
      const e = window.location.href.indexOf("?");
      if (-1 === e) return [];
      t = window.location.href.substr(e + 1)
    } else t = window.location.search.substr(1);
    const i = {};
    return t.split("&").forEach((e => {
      if (!e) return;
      const t = (e = e.split("+").join(" ")).indexOf("=");
      let o = t > -1 ? e.substr(0, t) : e;
      const s = t > -1 ? a(e.substr(t + 1)) : "", n = o.indexOf("[");
      if (-1 === n) i[a(o)] = s; else {
        const e = o.indexOf("]", n), t = a(o.substring(n + 1, e));
        o = a(o.substring(0, n)), i[o] || (i[o] = []), t ? i[o][t] = s : i[o].push(s)
      }
    })), i
  }

  function a(e) {
    try {
      return decodeURIComponent(e)
    } catch (t) {
      return e
    }
  }

  function l(e, t = 3, i = " ") {
    return (e += "").split("").reverse().join("").match(new RegExp(`.{0,${t}}`, "g")).join(i).split("").reverse().join("").trim()
  }

  function c(e) {
    e.preventDefault()
  }

  function d(e = !1) {
    document.body[!0 === e ? "addEventListener" : "removeEventListener"]("touchmove", c, !1)
  }

  const h = function () {
    const e = /(auto|scroll)/, t = (e, i) => null === e.parentNode ? i : t(e.parentNode, i.concat([e])),
      i = (e, t) => getComputedStyle(e, null).getPropertyValue(t),
      o = (t, o) => e.test(((e, t) => i(e, t ? `overflow-${t}` : "overflow"))(t, o));
    return (e, i) => {
      if (!(e instanceof HTMLElement || e instanceof SVGElement)) return;
      const s = t(e.parentNode, []);
      for (let e = 0; e < s.length; e += 1) if (o(s[e], i)) return s[e];
      return document.scrollingElement || document.documentElement
    }
  }();
  !function (e) {
    e.videoImgFallback = i, e.getCookie = o, e.setCookie = s, e.deleteCookie = n, e.getJsonFromUrl = r, e.chunkSplit = l, e.freezeVp = c, e.preventBodyScrolling = d, e.scrollParent = h
  }(window);

  class u {
    on(e, t) {
    }

    one(e, t) {
    }

    off(e, t) {
    }

    emit(e, ...t) {
    }

    constructor() {
      !function (e) {
        "object" != typeof e && (e = this);
        const t = {
          _JQInit() {
            this._JQ = $({})
          }, emit(e, t) {
            return this._JQ || this._JQInit(), this._JQ.trigger(e, t), this
          }, one(e, t) {
            return this._JQ || this._JQInit(), this._JQ.one(e, t), this
          }, on(e, t) {
            return this._JQ || this._JQInit(), this._JQ.on(e, t), this
          }, off(e, t) {
            return this._JQ || this._JQInit(), this._JQ.off(e, t), this
          }
        };
        Object.keys(t).forEach((i => {
          e[i] = t[i].bind(e)
        }))
      }(this)
    }
  }

  var p = new u;
  const m = 2560, f = {avif: null, webp: null};

  function _() {
    var e;
    const t = "object" == typeof flexbe_cli && (null == (e = flexbe_cli.vars) ? void 0 : e._group.images) || {};
    return {
      lazy: !0,
      lazy_priority: !1,
      avif: !1,
      webp: !1,
      avif_support: f.avif || t.avif_support,
      webp_support: f.webp || t.webp_support,
      slow_network: !1,
      quality_map: {jpg: 70, webp: 70, avif: 55}
    }
  }

  async function g(e) {
    try {
      const t = new Image;
      return "decode" in t ? (t.src = e, await t.decode(), !0) : await new Promise((i => {
        const o = t;
        o.onload = () => i(!0), o.onerror = () => i(!1), o.src = e
      }))
    } catch (e) {
      return !1
    }
  }

  async function w(e) {
    return new Promise(((t, i) => {
      const o = new Image, s = () => {
        t(o), setTimeout((() => {
          "function" == typeof o.remove && o.remove()
        }), 10)
      };
      "decode" in o && !/\.svg/.test(e) ? (o.src = e, o.decode().then(s).catch(i)) : (o.onerror = i, o.onload = s, o.src = e)
    }))
  }

  function b(e) {
    if ("string" != typeof e) return e;
    e = e.replace(/(\/img\/[\d_q]+)\/[\w-]+(\.\w{3,4})/i, "$1$2");
    let [, t, i, o, s] = e.match(/\/img\/(\d+)_?(\d+)?_?q?(\d+)?\.(\w{3,4})/i) || [];
    return i = i ? +i : 0, o = o ? +o : "none", {id: t, ext: s, name: `${t}.${s}`, size: i, quality: o}
  }

  function v(e, t) {
    const i = t.avif_support, o = t.webp_support, s = t.avif, n = t.webp;
    let r = e.ext;
    return i && s ? r = "avif" : o && n ? r = "webp" : "webp" === e.ext && (r = o ? "webp" : e.transparent ? "png" : "jpg"), r
  }

  function A(e, t = null, i = null) {
    var o;
    i = {..._(), ...i};
    const {id: s, ext: n} = e;
    if (!s) return "";
    t || "webp" !== e.ext || i.webp_support || (t = Math.min(e.width || m, m));
    //const r = null != (o = e.animated) ? o : "gif" === n, a = `/img/${s}.${n}`;
    const r = null != (o = e.animated) ? o : "gif" === n, a = `/img/${s}.png`;
    if (!t || r || "svg" === n) return a;
    const l = v(e, i), c = i.slow_network && I();
    let d = i.quality_map;
    switch (c && (d = {jpg: 50, webp: 50, avif: 45}), l) {
      case"png":
        return `/img/${s}_${t}.png`;
      case"webp":
      case"jpg":
        //return `/img/${s}_${t}_q${d[l]}.${l}`;
      case"avif":
        return `/img/${s}_${t}_q${d[l]}.png`;
      case"gif":
      default:
        return a
    }
  }

  function y(e) {
    const t = String(e).match(/\.(jpg|jpeg|png|gif|svg|bmp|webp)$/i);
    return t && t[1] ? t[1] : ""
  }

  function x(e) {
    return "transparent" !== e ? e : "#000000"
  }

  function k(e) {
    if ("string" == typeof e && (e = b(e)), !e || "object" != typeof e) return {};
    let t = e.img_ext || e.ext;
    const i = e.img_id || e.id, o = e.img_name || e.name;
    t && "false" !== t || (t = o ? y(o) : "jpg");
    const s = e.img_border || e.border;
    return {
      id: i,
      ext: t,
      average: x(e.img_average || e.average),
      preview: e.img_preview || e.preview || "",
      width: e.img_width || e.width || 0,
      height: e.img_height || e.height || 0,
      proportion: +(+e.img_proportion || +e.proportion || 0).toFixed(2),
      border: s,
      animated: e.img_animated || e.animated || "gif" === t,
      transparent: e.img_transparent || e.transparent || 0
    }
  }

  function C(e, t = 0, i) {
    return A(k(e), "number" == typeof t ? Math.round(t) : t, i)
  }

  async function S(e) {
    let t = e, i = +e.proportion;
    if (i && (i < 2 || i < 5 && i % 1 > 0) && (i *= 100), "string" == typeof t || !i) {
      "object" == typeof t && (t = C(e, 50));
      const o = await w(t);
      i = o.naturalHeight / o.naturalWidth * 100
    }
    return i
  }

  function I() {
    var e;
    return "4g" !== ((null == (e = navigator.connection) ? void 0 : e.effectiveType) || "4g")
  }

  var E = Object.freeze({
    __proto__: null,
    checkFormatSupport: g,
    createUrl: A,
    getDefaultLoadingOptions: _,
    getExtensionFromFilename: y,
    getImage: k,
    getImageOptimalSize: async function (e, t, i) {
      i = {..._(), ...i};
      const o = e.width || 0, s = e.img_scale || e.scale || "cover", n = e.img_type || e.type || "background",
        r = t.height / t.width, a = await S(e) / 100,
        l = i.slow_network && I() ? Math.min(1.5, window.devicePixelRatio) : Math.min(2, window.devicePixelRatio),
        c = v(e, i);
      let d, h;
      return "image" === n || r > a && "contain" === s || r < a && "cover" === s ? (d = t.width, h = d * a) : (h = t.height, d = h / a), l > 1 && (d *= l, h *= l), i.sizes && (d = function (e, t) {
        let i = (t = t.sort(((e, t) => t - e)))[0];
        return t.forEach((t => {
          e < i && e <= t && (i = t)
        })), i
      }(d, i.sizes), h = d * a), d <= 150 && /webp|jpg/.test(c) && (d = d / l * 2, h = d * a), o && d > o && (d = o, h = d * a), d > m && (d = m, h = d * a), {
        width: Math.ceil(d),
        height: Math.ceil(h)
      }
    },
    getImageProportion: S,
    getImageUrl: C,
    getOptimalExt: v,
    normalizeAverage: x,
    parseImageUrl: b,
    preloadImage: w,
    resolveImageSupports: async function () {
      var e, t;
      return f.avif = null != (e = f.avif) ? e : await g("data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="), f.webp = null != (t = f.webp) ? t : await g("data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"), f
    }
  });
  var T = {
    init() {
      const e = document.getElementById("flexbe-vars-store");
      try {
        Object.assign(this, JSON.parse(e.getAttribute("data-store")))
      } catch (e) {
        console.error("flexbe_cli.vars init error: ", e)
      }
      e.parentNode.removeChild(e)
    }
  };

  function P(e, t) {
    let i = ["screen"];
    return null != e && i.push(`(min-width: ${e}px)`), null != t && i.push(`(max-width: ${t}px)`), i = i.join(" and "), window.matchMedia(i).matches
  }

  const M = {
    async init() {
      this.deviceInfo(), this.applyClasses(), await this.supportsInfo(), $(window).on("resize.deviceInfo", (() => {
        this.deviceInfo()
      })), $(window).on("resized.deviceInfo", (() => {
        this.applyClasses()
      }))
    }, async supportsInfo() {
      const e = flexbe_cli.vars._group.images || {}, [t, i] = await Promise.all([e.webp_support || g("data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"), e.avif_support || g("data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=")]);
      e.webp_support = t, e.avif_support = i
    }, deviceInfo() {
      var e, t;
      const i = null == (e = window.CSS) ? void 0 : e.supports("zoom", 1), o = navigator.userAgent.toLowerCase();
      this.is_responsive = !!flexbe_cli.vars._page.responsive, this.is_screen_mobile = P(0, 767), this.is_screen_mobile_scaled = i && P(0, 399), this.is_screen_desktop = P(768, 1e4), this.is_screen_desktop_scaled = i && P(768, 1199), this.is_touch = window.matchMedia("(any-pointer: coarse)").matches, this.is_pointer = window.matchMedia("(any-hover: hover)").matches, this.is_tablet = /ipad|xoom|kindle|playbook|tablet/i.test(o), this.is_mobile = !this.is_tablet && -1 !== o.indexOf("mobile"), this.is_desktop = !this.is_mobile && !this.is_tablet, this.is_chrome = /(chromium|chrome)\/(\d+)/.test(o), this.is_safari = -1 !== o.indexOf("safari") && (null == (t = o.match(/version\/(\d+)/)) ? void 0 : t[1]), this.is_firefox = -1 !== o.indexOf("firefox"), this.is_mobile_ie = -1 !== o.indexOf("iemobile"), this.is_ie = -1 !== o.indexOf("trident") || -1 !== o.indexOf("msie"), this.is_EDGE = -1 !== o.indexOf("edge"), this.is_OSX = /ipad|iphone|ipod|macintosh/gi.test(o), this.is_android = -1 !== o.indexOf("android"), this.is_ios = this.is_OSX && this.is_touch && !this.is_desktop, this.is_bot = /bot|aolbuild|bingpreview|msnbot|baidu|duckduckgo|mediapartners-google|teoma|slurp/gi.test(o), this.is_instagram = /instagram/i.test(o), this.is_mobile && this.is_touch ? this.device_type = "mobile" : this.is_tablet && this.is_touch ? this.device_type = "tablet" : this.device_type = "desktop"
    }, applyClasses() {
      const e = $(document.body);
      e.toggleClass("is-mobile", M.is_mobile), e.toggleClass("is-tablet", M.is_tablet), e.toggleClass("is-desktop", M.is_desktop), e.toggleClass("is-pointer", M.is_pointer), e.toggleClass("is-touch", M.is_touch), e.toggleClass("is-ios", !!M.is_ios), e.toggleClass("is-android", M.is_android), e.toggleClass("is-osx", M.is_OSX && M.is_desktop), e.toggleClass("is-safari", !!M.is_safari), M.is_safari && e.addClass(`is-safari-${M.is_safari}`), e.toggleClass("is-edge", M.is_EDGE), e.toggleClass("is-firefox", M.is_firefox), e.toggleClass("is-chrome", M.is_chrome), e.toggleClass("is-instagram", M.is_instagram)
    }
  };
  let z;
  var O = new class {
    constructor() {
      this.containerWidth = null, this.oldWidth = null, this.oldHeight = null, this.lockedMode = !1, this.responsiveMode = null, this.clientWidth = null, this.clientHeight = null, this.lockedViewport = !1, this.viewportWidth = null, this.viewportHeight = null, this.proportion = null
    }

    init() {
      this.simulateWindowResized(), this.simulateDocumentResize(), this.updateSizes({triggerResize: !1}), this.watchContainerSize(), this.applySizeVariablesOnResize()
    }

    trigger(e, t = window) {
      t.dispatchEvent(new CustomEvent(e))
    }

    updateSizes({width: e, height: t, proportion: i = null, triggerResize: o = !0, lockViewport: s}) {
      var n, r, a;
      const l = document.documentElement, c = l.clientWidth, d = l.clientHeight,
        h = null != (n = this.scrollbarWidth) ? n : window.innerWidth - c;
      e = null != (r = e) ? r : this.lockedViewport ? this.viewportWidth : c, t = null != (a = t) ? a : this.lockedViewport ? this.viewportHeight : d, e = Math.min(e, c), t = Math.min(t, d);
      const u = e >= 768 && e <= 1199;
      (u || e >= 0 && e <= 399) && (e = u ? 1200 : 400), this.oldWidth = this.clientWidth, this.oldHeight = this.clientHeight, this.scrollbarWidth = h, this.clientWidth = c, this.clientHeight = d, this.viewportWidth = e, this.viewportHeight = t, null != i && (this.proportion = i), null != s && (this.lockedViewport = s), this.lockedMode || (this.responsiveMode = M.is_responsive && e <= 767 ? "mobile" : "desktop"), o && (this.trigger("resize"), this.trigger("resized"))
    }

    lockMode(e) {
      this.lockedMode = e
    }

    applySizeVariablesOnResize() {
      const e = M.is_desktop || flexbe_cli.is_admin ? 10 : 120, t = $(document.documentElement), i = $(document.body),
        o = () => {
          const o = Math.round(this.proportion ? this.viewportWidth / this.proportion : this.viewportHeight);
          (!this.coverHeight || Math.abs(this.coverHeight - o) > e) && (this.coverHeight = o), t.css("--100vw", `${this.viewportWidth}px`), t.css("--100vh", `${this.viewportHeight}px`), t.css("--cover", `${this.coverHeight}px`), t.css("--heroHeight", `${this.coverHeight}px`), t.css("--scrollbarWidth", `${this.scrollbarWidth}px`), i.toggleClass("adaptive-mobile", "mobile" === this.responsiveMode), i.toggleClass("adaptive-desktop", "desktop" === this.responsiveMode)
        };
      o(), M.is_ios && setTimeout((() => o()), 150), $(window).on("resized.setVars", (() => o()))
    }

    watchContainerSize() {
      const e = () => {
        const e = document.createElement("div");
        e.classList.add("container"), requestAnimationFrame((() => {
          document.body.appendChild(e), this.containerWidth = e.offsetWidth, document.body.removeChild(e)
        }))
      };
      e(), $(window).on("resized.setContainer", (() => e()))
    }

    simulateWindowResized() {
      let e, t = this.oldWidth, i = this.oldHeight;
      $(window).on("resize orientationchange", (o => {
        o.originalEvent && (this.updateSizes({triggerResize: !1}), clearTimeout(e), e = setTimeout((() => {
          this.oldWidth = t, this.oldHeight = i, t = this.clientWidth, i = this.clientHeight, this.trigger("resized")
        }), 80))
      }))
    }

    simulateDocumentResize() {
      requestAnimationFrame((() => {
        this.documentHeight = document.body.offsetHeight
      }));
      const e = flexbe_cli.is_admin ? 200 : 80, t = (e = 0) => {
        const t = document.body.offsetHeight;
        Math.abs(t - this.documentHeight) >= 5 && (this.documentHeight = t, this.trigger("documentresize", document), clearTimeout(z), z = setTimeout((() => {
          this.trigger("documentresized", document)
        }), e))
      };
      if ("function" == typeof ResizeObserver) {
        let i = !0;
        new ResizeObserver((() => {
          i ? i = !1 : t(e)
        })).observe(document.querySelector("body"))
      } else setInterval((() => {
        t(0)
      }), e)
    }
  };
  const D = [];

  function F(e = "", t = (() => {
  }), i = 15e3, o = !1) {
    if (e && 0 !== e.length || t(!1), !o) {
      "string" == typeof e && (e = [e]);
      let o = 0;
      const s = i => {
        const s = e.every((e => "boolean" == typeof D[e]));
        o += 1, s && o === e.length && t(i)
      };
      return Array.isArray(e) && e.forEach((e => {
        F(e, s, i, !0)
      })), !1
    }
    if (!0 === D[e]) t(!0); else if (Array.isArray(D[e])) D[e].push(t); else {
      let o, s = !1;
      const n = (t = !0) => {
        if (s) return;
        s = !0, clearTimeout(o);
        const i = D[e];
        D[e] = t, i.forEach((e => {
          "function" == typeof e && e(t)
        }))
      };
      if (D[e] = [t], /\.css(\?.*)?$/.test(e)) {
        const t = document.createElement("link");
        t.onerror = n.bind(this, !1), t.onload = n.bind(this, !0), o = setTimeout(n.bind(this, "timeout"), i), t.rel = "stylesheet", t.href = e, document.body.appendChild(t)
      } else {
        const t = document.createElement("script");
        t.onload = n.bind(this, !0), t.onerror = n.bind(this, !1), o = setTimeout(n.bind(this, "timeout"), i), t.async = !0, t.src = e, document.body.appendChild(t)
      }
    }
  }

  const L = {
    inScroll: !1, skip: !1, _latest: null, get latest() {
      return this._latest
    }, init() {
      requestAnimationFrame((() => {
        this._latest = window.scrollY
      })), document.addEventListener("wheel", (() => {
        this.$inScrollElement && (this.$inScrollElement.stop(), this.$inScrollElement = null)
      }), {passive: !0}), document.addEventListener("scroll", (() => {
        this.inScroll = !0, this._latest = window.scrollY
      }), {passive: !0}), document.addEventListener("scrollend", (() => {
        this.inScroll = !1
      }), {passive: !0}), this.scrollLock.init(), this.scrollImprovement.init()
    }, scrollImprovement: {
      scrollTimer: 0, pointerState: !1, init() {
        this.createStopScrollEvent(), this.scrollRestore()
      }, createStopScrollEvent() {
        let e = L.latest;
        document.addEventListener("scroll", (() => {
          const t = e > L.latest ? "up" : "down", i = Math.max(L.latest - e, e - L.latest);
          clearTimeout(this.scrollTimer), this.scrollTimer = setTimeout((() => {
            e = L.latest, document.dispatchEvent(new CustomEvent("scrollend", {detail: {direction: t, distance: i}}))
          }), 200)
        }), {passive: !0})
      }, scrollRestore() {
        window.history.scrollRestoration && (window.history.scrollRestoration = "auto")
      }
    }, scrollLock: {
      loaded: !1, locked: !1, init() {
        this.loaded || F(["/_s/lib/scroll-lock/scroll-lock.min.js"], (() => {
          this.loaded = !0, window.scrollLock._state.lockableSelectors = ["html", "[data-scroll-lock-lockable]"], window.scrollLock._state.scrollableSelectors = ["[data-scroll-lock-scrollable]", ".scroller", ".scrollable"], window.scrollLock._state.fillGapSelectors = ["html", "[data-scroll-lock-lockable]", "[data-scroll-lock-fill-gap]"], this.locked && (window.scrollLock.disablePageScroll(), O.trigger("resized"))
        }))
      }, lock() {
        this.locked = !0, void 0 !== window.scrollLock && (window.scrollLock.disablePageScroll(), O.trigger("resized"))
      }, unlock() {
        this.locked = !1, void 0 !== window.scrollLock && (window.scrollLock.clearQueueScrollLocks(), window.scrollLock.enablePageScroll(), O.trigger("resized"))
      }
    }, to(e) {
      document.scrollingElement.scrollTo(0, e)
    }, toElement(e, t = {}) {
      const i = $(e);
      if (!(e = i[0])) return !1;
      null == t.animation && (t.animation = !0), null == t.centered && (t.centered = !0), null == t.force && (t.force = !0);
      let o, s = 0, n = 0, r = window.scrollParent(e, "y");
      r && !$(r).is(".b_block, .container-list") || (r = document.scrollingElement);
      const a = t.padding || 0, l = r === document.body || r === document.documentElement,
        c = l ? flexbe_cli.resize.clientHeight : r.offsetHeight, d = i.offset().top, h = e.offsetHeight,
        u = l ? $("html, body") : $(r);
      M.is_mobile ? o = u.find(".menu-fixed > .nav-header") : 4 === flexbe_cli.theme_id ? n = flexbe_cli.fixed.getAllFixedHeight(d) : o = u.find('.floating[data-floating="true"]'), o && o.length && (n += o[0].offsetHeight - 2);
      const p = Math.max(0, c - n - h);
      if (h >= c && (t.centered = !1), s = t.centered ? d - Math.max(0, p / 2) - n : d - a - n, t.offset && (s += t.offset), !t.force) {
        const e = r.offsetTop, o = i[0].getBoundingClientRect();
        if (o.top >= e && o.bottom <= e + c) return "function" == typeof t.complete && t.complete(), !1
      }
      this.$inScrollElement = u, $(document).off("documentresize.scrollTo").on("documentresize.scrollTo", (() => {
        this.toElement(e, t)
      })), u.stop(), u.animate({scrollTop: s}, {
        delay: t.delay || 0,
        duration: t.duration ? t.duration : t.animation ? 450 : 0,
        easing: t.animation ? "swing" : "linear",
        always: (...e) => {
          this.$inScrollElement = !1, $(document).off("documentresize.scrollTo"), "function" == typeof t.complete && t.complete(...e)
        }
      })
    }
  };

  function B(e, t = !1) {
    const i = window.parent || window;
    if (!e) return console.warn("WRONG ACTION", "empty_link"), void (flexbe_cli.is_admin && p.emit("editor_page_error", {
      type: "action",
      error: "link_is_wrong"
    }));
    flexbe_cli.is_admin ? p.emit("editor_leave_page", {href: e}) : i.location.host === window.location.host ? t ? i.open(e, "_blank").focus() : i.location.href = e : window.location.href = e
  }

  function V(e = "", {blank: t} = {}) {
    if ("string" != typeof e) return !1;
    if (!/#{1,2}.+/.test(e)) return B(e, t), !0;
    {
      4 === flexbe_cli.theme_id && $('nav[data-opened="true"]').length && p.emit("ui_mobilemenu_close", {}), 4 !== flexbe_cli.theme_id && $(".mobile-menu.show").length && $(".mobile-menu").removeClass("show").trigger("close");
      const t = (e = e.replace(/^\.\/#{2}/, "#").trim()).trim().split("#"), i = t[t.length - 1];
      if (!("" === t[0] || "./" === t[0] || t[0] === new URL(document.baseURI).pathname)) return B(e), !0;
      const o = $(`._anchor[name="${i}" i]`), s = o.length ? o.closest("[data-id]") : $(`[data-id="${i}" i]`),
        n = s.closest(".b_block").filter(":visible"), r = s.closest(".m_modal");
      if ((o.length || s.length) && function (e, t = !1) {
        const i = $(e).eq(0);
        if (i.length && (t || i.is(":hidden"))) {
          const e = new Event("bringIntoView", {bubbles: !0, cancelable: !0});
          i[0].dispatchEvent(e)
        }
      }(o.length ? o : s), "cart" === i) p.emit("ui_modal_close", {}), p.emit("ui_cart_open", {}); else if (n.length) p.emit("ui_cart_close", {}), p.emit("ui_modal_close", {}), setTimeout((() => {
        let e = n;
        if (s && !n.is(s)) {
          const t = n.offset().top;
          s.offset().top - t > O.viewportHeight - 100 && (e = s)
        }
        e.is(":visible") && L.toElement(e)
      }), 30), window.history.replaceState(null, null, `#${i}`); else if (r.length) {
        const e = r.data("id");
        p.emit("ui_cart_close", {}), p.emit("ui_modal_open", {id: e})
      } else window.location.hash = `#${i}`
    }
  }

  function j(e = document) {
    $(e).find("[data-product]").each(((e, t) => {
      const i = $(t);
      let o = i.data("product");
      i.removeAttr("data-product"), (null == o || "object" == typeof o && !Object.keys(o).length) && (o = null), null !== o ? i.data("product", o) : i.removeData("product")
    }))
  }

  var H = Object.freeze({__proto__: null, fixProductData: j, gotoLink: V});
  if (window.parent === window && /mode=/.test(window.location.search)) {
    const e = window.location.href.replace(/mode=\w+/, "").replace(/\?&/, "?").replace(/\?$/, "");
    window.history.replaceState(null, null, e)
  }

  function R() {
    if (flexbe_cli.lockPopstate) return;
    const e = window.location.hash || window.parent.location.hash;
    flexbe_cli.lockPopstate = !0, /^#/.test(e) ? V(e) : Object.keys(flexbe_cli.modal.opened).length && p.emit("ui_modal_close"), flexbe_cli.lockPopstate = !1
  }

  const q = new WeakMap, W = new WeakMap;

  function N(e, t = !0) {
    e.updateTween({force: t})
  }

  function G(e, t, i) {
    q.set(e, setTimeout((() => {
      q.delete(e), i && i()
    }), t))
  }

  function U(e, t, i = 80) {
    const o = "object" == typeof e ? e : document.querySelector(`[data-id="${e}"]`), s = null == o ? void 0 : o._core;
    s && (q.get(s) ? W.set(s, !0) : (N(s, t), G(s, i, (() => {
      W.get(s) && (W.set(s, !1), N(s, t), G(s, i))
    }))))
  }

  var J = Object.freeze({__proto__: null, forceUpdateTween: U});

  function Q(e) {
    if (!e || !e.offsetParent) return null;
    let t = 0, i = 0;
    for (; e;) {
      if ("fixed" === $.css(e, "position")) {
        t += window.scrollY, i += window.scrollX;
        break
      }
      t += e.offsetTop - e.scrollTop, i += e.offsetLeft - e.scrollLeft, e = e.offsetParent
    }
    return {top: Math.round(t), left: Math.round(i)}
  }

  function Y(e, t = []) {
    return null == e.parentNode ? t : Y(e.parentNode, [...t, e])
  }

  function X(e) {
    const t = /(auto|scroll)/, i = getComputedStyle(e, null);
    return ["overflow", "overflow-y", "overflow-x"].some((e => t.test(i.getPropertyValue(e))))
  }

  function Z(e = "", t = {}) {
    return new Promise(((i, o) => {
      $.ajax({url: e, type: t.type || t.method || "POST", dataType: "json", ...t}).done((e => {
        i(e)
      })).fail((e => {
        const t = e.responseJSON, i = t ? new Error(t.message) : e;
        i.status = e.status, i.data = t, o(i)
      }))
    }))
  }

  var K = {
    fetch: Z, upload: function (e, t = {}) {
      t = {
        onSuccess: () => {
        }, onComplete: () => {
        }, onError: () => {
        }, onProgress: () => {
        }, ...t
      };
      const i = new FormData;
      i.append("file", e);
      const o = $.ajax({
        url: "",
        type: t.type || t.method || "POST",
        dataType: "json",
        processData: !1,
        contentType: !1,
        data: i,
        success: (e, i) => {
          t.onSuccess(e, i)
        },
        error: (e, i) => {
          t.onError(e, i)
        },
        complete: (e, i) => {
          t.onComplete(e, i)
        },
        xhr: () => {
          const e = new window.XMLHttpRequest;
          return e.upload.addEventListener("progress", (e => t.onProgress(o, e))), e
        }, ...t
      });
      return o
    }, dom: Object.freeze({
      __proto__: null, getElOffset: Q, getParents: Y, isScrollable: X, scrollParent: function (e) {
        if (!e || !e.parentNode) return;
        const t = e.ownerDocument || document, i = Y(e.parentNode, []);
        for (let e = 0; e < i.length; e++) if (X(i[e])) return i[e];
        return t.scrollingElement || t.documentElement
      }
    }), links: H, image: E, entity: J
  };
  const ee = [".layout-type-header", ".layout-type-tabs", ".layout-type-column", ".layout-type-product", ".flexbe-cards-container.mode-slider", ".content-zone--vertical.bg-element", ".content-zone--vertical:not(.bg-element) .element-item--static", ".flexbe-card:not(.swiper-slide)", ".quiz-progress", ".step-title", ".quiz-fields"].join(","),
    te = [".free-area .element-item"].join(",");
  var ie = {
    startTransitions(e) {
      const t = $(e);
      if (flexbe_cli.is_admin) return t.addClass("was-view"), void t.removeClass("wait-animation");
      const i = t.find(te);
      let o = t.find(ee);
      o = o.filter(((e, t) => 0 === $(t).find(o).length));
      const s = Math.min(80, 1e3 / o.length), n = 1e3 + o.length * s;
      o.css("--transitionDelay", (e => e * s + "ms")), o.addClass("transition-target"), i.addClass("transition-target"), setTimeout((() => {
        t.addClass("was-view")
      }), 200), setTimeout((() => {
        t.removeClass("wait-animation"), o.removeClass("transition-target"), o.css("--transitionDelay", "")
      }), 200 + n)
    }
  };
  let oe;
  const se = {
    get u_id() {
      return localStorage.getItem("f_uid") || 0
    },
    set u_id(e) {
      localStorage.setItem("f_uid", e)
    },
    time: 0,
    goals: {
      quiz: "quiz_start",
      modal: "modal_open",
      modal_form: "form_open",
      modal_done: "done_open",
      modal_product: "product_show",
      order_done: "order_done",
      pay_done: "pay_done",
      cart: "add_to_cart",
      link: "link_open",
      file: "file_load",
      close: "modal_close",
      app_link: "app_link_open"
    },
    init() {
      this.reach_goal = this.reachGoal;
      const e = window.getCookie("user_id");
      if (flexbe_cli.is_admin || flexbe_cli.is_service || flexbe_cli.run.is_bot || !flexbe_cli.p_id || e) return !1;
      const {delayed_counters_ms: t} = flexbe_cli.vars._group.optimization;
      setTimeout((() => {
        const e = window.getCookie("f_uid") || se.u_id;
        e ? (se.u_id = e, async function () {
          try {
            const e = await Z("", {
              data: {
                s_id: flexbe_cli.s_id,
                group_id: flexbe_cli.group_id,
                p_id: flexbe_cli.p_id,
                u_id: se.u_id
              }
            });
            e.v_id || console.warn("Visit was not registered", e)
          } catch (e) {
            console.error("Visit was not registered", e)
          }
        }()) : async function () {
          try {
            const e = await Z("", {
              data: {
                s_id: flexbe_cli.s_id,
                group_id: flexbe_cli.group_id,
                p_id: flexbe_cli.p_id,
                utm_data: ne(),
                device: {
                  type: flexbe_cli.run.device_type,
                  width: flexbe_cli.resize.clientWidth,
                  height: flexbe_cli.resize.clientHeight,
                  dpi: window.devicePixelRatio,
                  browser: navigator.userAgent
                }
              }
            });
            window.setCookie("f_uid", e.u_id, {Path: "/"}), se.u_id = e.u_id, p.emit("user_created")
          } catch (e) {
            console.warn("Cookie visit not created", e)
          }
        }()
      }), t), this.AB.init(), this.ecommerce.init(), this.QUIZ.init()
    },
    getGoal(e, t) {
      return "modal" === e && (/form/.test(t) ? e = "modal_form" : /done/.test(t) ? e = "modal_done" : /product/.test(t) ? e = "modal_product" : /quiz/.test(t) && (e = "quiz")), this.goals[e] || !1
    },
    reachGoal(e, t = {}) {
      !flexbe_cli.is_admin && e && (t = {goalAction: "send", goalValue: "", ...t}, p.emit("reach_goal", {
        name: e,
        params: t
      }))
    },
    reachGoals(e = {}, t = {}) {
      const i = `${e.goal || ""}`.trim(), o = `${e.mainGoal || ""}`.trim(), s = `${e.htmlGoal || ""}`.trim();
      if (o && this.reachGoal(o, t), i) try {
        this.reachGoal(i, t)
      } catch (e) {
        console.warn("reachGoals [goal]: ", e.message)
      }
      if (s) try {
        const e = s.replace(/{{\s*goalAction\s*}}/g, t.goalAction || "").replace(/{{\s*goalValue\s*}}/g, t.goalValue || "").replace(/(["']?){{\s*goalParams\s*}}\1/g, JSON.stringify(t.goalParams || {})),
          i = document.write;
        document.write = function (e) {
          $("body").eq(0).append(e)
        };
        const o = $(`<div style="display:none">${e}</div>`);
        $("body").eq(0).append(o), setTimeout((() => {
          o.remove()
        }), 2e3), clearTimeout(oe), oe = setTimeout((() => {
          document.write = i
        }), 1e4)
      } catch (e) {
        console.warn("reachGoals [htmlGoal]: ", e.message)
      }
    },
    ecommerce: {
      inited: !1, init() {
        this.inited = !0, window.dataLayer || (window.dataLayer = [])
      }, add(e) {
        this.inited || this.init(), window.dataLayer.push({
          ecommerce: {
            currencyCode: flexbe_cli.locale.currency.code,
            add: {products: [this._normalizeItem(e)]}
          }
        })
      }, remove(e) {
        this.inited || this.init(), window.dataLayer.push({
          ecommerce: {
            currencyCode: flexbe_cli.locale.currency.code,
            remove: {products: [this._normalizeItem(e)]}
          }
        })
      }, purchase(e, t = !1) {
        if (e || 0 !== e.length) {
          this.inited || this.init(), t || (t = Math.ceil(1e4 * Math.random()));
          try {
            window.dataLayer.push({
              ecommerce: {
                currencyCode: flexbe_cli.locale.currency.code,
                purchase: {actionField: {id: t}, products: e.map((e => this._normalizeItem(e)))}
              }
            })
          } catch (e) {
          }
        }
      }, _normalizeItem(e) {
        var t, i, o;
        return {
          id: e.id,
          name: e.name || e.title,
          price: null != (t = e.price) ? t : e.orderPrice,
          brand: null != (i = e.brand) ? i : e.vendorCode,
          variant: e.optionsInfo ? e.optionsInfo.map((e => e.name)).join(", ") : "",
          quantity: null != (o = e.count) ? o : e.quantity
        }
      }
    },
    AB: {
      proccess: {}, init() {
        p.off("entity_event.abstat").on("entity_event.abstat", ((e, {type: t, core: i, params: o}) => {
          if (!i || "view" !== t || !o.state || !o.first) return;
          const {abtestId: s, abtestVariant: n} = i;
          n && this.fixView(s, n)
        }))
      }, setCookie(e) {
        window.setCookie("f_ab", JSON.stringify(e), {expires: 604800, path: "/", domain: document.location.hostname})
      }, getCookie() {
        let e = window.getCookie("f_ab");
        if (e) try {
          e = JSON.parse(decodeURIComponent(e))
        } catch (e) {
          console.warn("Can`t parse abtest cookie", e)
        }
        return e || (e = {view: {}, lead: []}), e
      }, async fixView(e, t) {
        if (null == e || null == t || "a" !== t && "b" !== t) return !1;
        if (null == this.getCookie().view[e] && !this.proccess[e]) {
          this.proccess[e] = !0;
          try {
            await Z("", {data: {testId: e, variant: t, s_id: flexbe_cli.s_id, p_id: flexbe_cli.p_id}});
            const i = this.getCookie();
            i.view[e] = t, this.setCookie(i)
          } catch (e) {
            console.error("Can't fix abtest", e)
          }
          this.proccess[e] = !1
        }
      }
    },
    QUIZ: {
      inited: !1, init() {
        this.inited || (this.inited = !0, p.on("quiz_event.stat", ((e, t = {}) => {
          const i = t.payload || {};
          if (!["step", "submit"].includes(t.event)) return;
          if ("step" === t.event && !i.toNext) return;
          const o = t.quiz, s = o.$area.attr("data-page-id"), n = t.answerGoals, r = t.resultGoals, a = o.core.id,
            l = i.fromAnswers || [], c = i.toId, d = i.sessionId, h = i.fromId,
            u = l.reduce(((e, t) => e.concat((t.variants || []).map((e => e.id)))), []);
          if (this.fixAnswer({sessionId: d, sectionId: a, answerStep: h, answerVariants: u, viewStep: c, pId: s}), n) {
            const e = "answer";
            l.forEach((t => {
              if (t.variants && t.variants.length) t.variants.forEach((t => {
                const i = t.value;
                se.reachGoals(n, {goalAction: e, goalValue: i})
              })); else {
                let i = t.value || "";
                ["email", "phone", "name"].includes(t.type) && (i = ""), se.reachGoals(n, {goalAction: e, goalValue: i})
              }
            }))
          }
          r && se.reachGoals(r)
        })))
      }, fixAnswer({sectionId: e, sessionId: t, answerStep: i, viewStep: o, answerVariants: s, pId: n}) {
        let r;

        function a() {
          return Z(r, {
            data: {
              s_id: flexbe_cli.s_id,
              group_id: flexbe_cli.group_id,
              f_uid: se.u_id,
              page_id: n || flexbe_cli.p_id,
              session_id: t,
              section_id: e,
              answer_step: i,
              answer_variants: s,
              view_step: o
            }
          })
        }

        o && i ? r = "" : i ? r = "" : o && (r = ""), r && (se.u_id ? a() : p.one("user_created", (() => {
          a()
        })))
      }
    }
  };

  function ne() {
    const e = function (e) {
      if ("" === e) return {};
      const t = {};
      for (let i = 0; i < e.length; ++i) {
        const o = e[i].split("=");
        2 === o.length && (t[o[0]] = decodeURIComponent(o[1].replace(/\+/g, " ")))
      }
      return t
    }(window.location.search.substr(1).split("&")), t = {};
    return $.each(e, ((e, i) => {
      "utm_" === e.substring(0, 4) && (t[e] = i)
    })), document.referrer && (t.url = document.referrer), t
  }

  const re = (e, t = 2, i = ",", o = ".") => {
    let s, n;
    Number.isNaN(t = Math.abs(t)) && (t = 2), s = `${parseInt(e = (+e || 0).toFixed(t), 10)}`, (n = s.length) > 3 ? n %= 3 : n = 0;
    return (n ? s.substr(0, n) + o : "") + s.substr(n).replace(/(\d{3})(?=\d)/g, `$1${o}`) + (t ? i + Math.abs(e - s).toFixed(t).replace(/-/, "0").slice(2) : "")
  }, ae = {
    language: "en",
    country: "US",
    currency: {code: "USD", symbol: "$"},
    date_format: {
      dateLiteral: "/",
      dateMask: "DD/MM/YYYY",
      firstDay: 1,
      dateTimeLiteral: ", ",
      hour12: !1,
      timeLiteral: ":",
      timeMask: "HH:MM"
    },
    translation: {},
    currency_format: {},
    tr(e, t) {
      if (!e) return "";
      const i = /^currency/.test(e) ? this.currency : this.translation,
        o = String(e).replace(/^currency\./, "").split(/\.|:{2}/).reduce(((e, t) => e && e[t]), i) || "";
      return o ? this.interpolate(o, t) : e
    },
    interpolate(e, t = {}) {
      const i = e => {
        const t = e % 100, i = t % 10;
        return 11 !== t && 1 === i ? "one" : i >= 2 && i <= 4 && !(t >= 12 && t <= 14) ? "few" : "many"
      }, o = e => 1 !== e ? "other" : "one", s = e => 1 === e ? "one" : e >= 2 && e <= 4 ? "few" : "many", n = {
        en: o,
        by: i,
        cs: s,
        cz: s,
        cs_CZ: s,
        fr: e => e > 1 ? "other" : "one",
        ge: o,
        de: o,
        it: o,
        kz: o,
        pl: e => {
          if (1 === e) return "one";
          const t = e % 10;
          return t >= 2 && t <= 4 && (e % 100 < 10 || e % 100 >= 20) ? "few" : "many"
        },
        pt: o,
        ro: o,
        ro_RO: o,
        ru: i,
        es: o,
        ua: i,
        lv: e => {
          var t;
          return 0 === e ? "zero" : (null != (t = e % 10 == 1) ? t : e % 100 == 11) ? "one" : "other"
        },
        th: () => "other"
      };
      return Object.keys(t).forEach((i => {
        if ("_" !== i && t.hasOwnProperty(i)) {
          if (e instanceof Object) {
            const o = t[i];
            e = e[n[ae.language](o)]
          }
          e = e.replace(new RegExp(`%${i}%`, "g"), t[i])
        }
      })), e
    },
    parseMoney(e, t = 2) {
      const i = (e = String(e).replace(/,/g, ".").replace(/ /g, "").replace(/(?!^)-/g, "").replace(/^\./g, "0.")).replace(/[^\d.]/g, "");
      let o = ((i.match(new RegExp(`\\.\\d{1,${t}}$`)) || [])[0] || "").replace(/\D/g, ""),
        s = i.replace(new RegExp(`\\.${o}$`), "");
      s = parseInt(s.replace(/[^\d-]/g, ""), 10) || 0, parseInt(o, 10) || (o = "");
      const n = parseFloat(o ? `${s}.${o}` : s);
      return /^-/.test(e) ? -n : n
    },
    formatMoney(e, {
      currencyFormat: t = this.currency_format,
      currencyData: i = this.currency,
      freeLabel: o = !1,
      useNonBreakingSpace: s = !1
    } = {}) {
      if (!(e = parseFloat(e)) && o) return ae.tr("cart::free_price");
      const n = t.str, r = t.d, a = Math.abs(e) >= 1e4 ? t.t : "",
        l = t.d_force || parseInt(e, 10) !== e ? i.decimals : 0, c = re(Math.abs(e), l, r, a);
      let d = c;
      return n && (d = n.replace(":value", c).replace(":symbol", i.symbol), s && (d = d.replace(/\s/g, "&nbsp"))), e < 0 && (d = `-${d}`), d.trim()
    },
    dateToLocaleTimezone(e) {
      if (!e) return null;
      const t = flexbe_cli.vars._group.timezone || "UTC", i = new Date,
        o = new Date(i.toLocaleString("en-US", {timeZone: t}));
      i.setMilliseconds(0), o.setMilliseconds(0);
      const s = i.getTime() - o.getTime(), n = new Date(e.slice(0, 19).replace("T", " "));
      return new Date(n.getTime() - s)
    },
    formatNumber(e, t, i = this.currency_format) {
      const o = i.d, s = Math.abs(e) >= 1e4 ? i.t : "";
      return t = null != t ? t : i.d_force || parseInt(e, 10) !== e ? this.currency.decimals : 0, re(Math.abs(e), t, o, s)
    },
    animateNumber({target: e, from: t, to: i, asMoney: o, freeLabel: s = !0, duration: n, easing: r}) {
      if (!e) return !1;
      const a = $(e);
      null == t && (t = this.parseMoney(a.text()) || "");
      const l = Math.abs(t - i);
      if (t === i) return;
      e._animation && (e._animation.pause(), e._animation.reset());
      if (o && (!i || !t) || l < 3 || "function" != typeof anime) a.text(o ? this.formatMoney(i, {freeLabel: s}) : i); else {
        const c = {value: t};
        null == n && (n = Math.max(150, Math.min(.3 * l, 650))), null == r && (r = "linear"), e._animation = anime({
          targets: c,
          value: i,
          duration: n,
          easing: r,
          update: () => {
            const e = Math.floor(c.value), t = o ? this.formatMoney(e, {freeLabel: s}) : e;
            a.text(t)
          },
          complete: () => {
            const e = o ? this.formatMoney(i, {freeLabel: s}) : i;
            a.text(e)
          }
        })
      }
    }, ...flexbe_cli.locale || {}
  }, le = "hover";
  var ce = {
    init() {
      this.adaptiveHoverInit(), this.initIosHacks()
    }, adaptiveHoverInit() {
      $(document).on("touchstart.adaptive_hover_in mouseenter.adaptive_hover_in", ".js-hover", (function (e) {
        const t = $(e.currentTarget), i = `adaptive_hover_out_${Math.floor(1e6 * Math.random())}`;

        function o() {
          t.off(`.${i}`), $(document).off(`.${i}`), t.removeClass(le)
        }

        t.addClass(le), t.one(`mouseleave.${i}`, o), $(document).one(`touchend.${i}`, o)
      }))
    }, initIosHacks(e = "body") {
      flexbe_cli.run.is_ios && $("a, [data-action-target]", e).off("click.iosHacks").on("click.iosHacks", (() => !0))
    }
  };
  const de = {
    content: "",
    contentAsHTML: !0,
    theme: "dark",
    animation: "fall",
    animationDuration: [250, 180],
    delay: [180, 100],
    position: "top",
    autoClose: !0,
    hideOnClick: !1,
    interactive: !1,
    distance: 3,
    maxWidth: 350,
    IEmin: 12,
    trigger: "custom",
    triggerOpen: {click: !1, touchstart: !1, mouseenter: !0},
    triggerClose: {click: !1, originClick: !1, mouseleave: !0, touchleave: !0}
  };
  var he = {
    async init(e, t = {}) {
      var i, o;
      if (!e) return !1;
      let s;
      await (async () => {
        const e = flexbe_cli.vars, t = e._page.themeId, i = e._globals.versionId;
        return new Promise((e => {
          F(["/_s/lib/jquery/tooltipster/tooltipster.patched.min.js", `/_s/build/theme/${t}/_tooltipster.css?${i}`], e)
        }))
      })();
      const n = $(e),
        r = {...de, ...t, content: null != (i = null != (o = t.content) ? o : n.attr("data-tip")) ? i : e.innerHTML};
      r.theme = `tooltipster-${(n.attr("data-theme") || r.theme || de.theme).replace("tooltipster-", "")}`, r.maxWidth = parseInt(n.attr("data-width"), 10) || r.maxWidth, r.position = n.attr("data-tip-position") || r.position;
      const a = r.content || "";
      if (null == $.fn.tooltipster) return console.warn("Tooltipster is not loaded"), !1;
      try {
        s = n.tooltipster("instance")
      } catch (e) {
      }
      return s || a ? (s ? (clearTimeout(s._contentTmt), a && a !== s.content() ? (s.content(a), s.enable()) : a || this.destroy(e)) : (e.tooltipstered = !0, n.tooltipster(r), s = n.tooltipster("instance"), s.on("created", (() => {
        n.attr("data-tooltipstered", "true"), s._$tooltip.addClass("editor-ui")
      })), s.on("destroy", (() => {
        e.tooltipstered = !1, n.removeAttr("data-tooltipstered")
      })), s.on("ready", (() => {
        s.reposition()
      }))), t.show && s.open(), s) : void 0
    }, destroy(e) {
      if (!e) return !1;
      let t;
      const i = $(e);
      try {
        t = i.tooltipster("instance")
      } catch (e) {
      }
      t && (t.destroy(), e.tooltipstered = !1, i.removeAttr("data-tooltipstered"))
    }
  };
  let ue = !1;
  const pe = "f_cookies_allowed";
  var me = new class {
    constructor() {
      this.cookieApplied = !1, this.params = {
        show: 0,
        dont_set_if_not_agree: 0,
        use_custom_warning_text: 0,
        custom_warning_text: "",
        policy_uri: "",
        style: "right_bottom"
      }
    }

    init() {
      setTimeout((() => requestAnimationFrame((() => {
        this.params = {...this.params, ...flexbe_cli.vars._group.cookies_warning || {}}, flexbe_cli.is_admin || flexbe_cli.is_service || 99 === flexbe_cli.theme_id || !this.params.show || localStorage.getItem(pe) || ue || this.createNotify()
      }))), 1e3)
    }

    createNotify() {
      const e = this.params, t = $("body"), i = O.viewportHeight / 2, o = "/\\r\\n|\\r|\\n/g";
      let s = flexbe_cli.scroll.latest, n = 0;
      if (ue = !0, +e.use_custom_warning_text && e.custom_warning_text) this.content = e.custom_warning_text.replace(o, "<br />"); else {
        const t = "center_compact" === e.style ? "cookies.compact_text" : "cookies.long_text";
        this.content = flexbe_cli.locale.tr(t)
      }
      const r = e.button_text && e.use_custom_warning_text ? e.button_text.replace(o, "<br />") : flexbe_cli.locale.tr("cookies.button"),
        a = e.link_text ? e.link_text.replace(o, "<br />") : flexbe_cli.locale.tr("cookies.button_link"),
        l = e.policy_uri ? e.policy_uri.replace(o, "<br />") : "/legal/cookie-policy/", c = +e.use_policy ? "show" : "",
        d = $(`\n            <div class="cookies-wrap style--${e.style}">\n                <div class="cookies-container">\n                    <div class="cookies-content scrollable">\n                        <span>\n                            ${this.content}\n                            <a href="${l}" target="_blank" class="cookies-button-more ${c}">\n                             ${a}\n                            </a>\n                        </span>\n                    </div>\n\n                    <div class="cookies-button-container">\n                        <a href="${l}" target="_blank" class="cookies-button-more scrollable ${c}">\n                            ${a}\n                        </a>\n                        <div class="cookies-button scrollable">\n                            ${r}\n                        </div>\n                    </div>\n\n                    <div class="cookies-close">\n                        <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">\n                             <path d="M7 6L13 0L14 1L8 7L14 13L13 14L7 8L1 14L0 13L6 7L0 1L1 0L7 6Z"/>\n                        </svg>\n                    </div>\n                </div>\n            </div>\n        `);
      t.find(".cookies-wrap").remove(), t.append(d);
      const h = () => {
        this.cookieApplied || e.dont_set_if_not_agree && (this.cookieApplied = !0, "function" == typeof window.applyCookies && window.applyCookies(), document.removeEventListener("scroll", u), $(document).off("click.cookies"))
      }, u = () => {
        const e = Math.max(flexbe_cli.scroll.latest - s, s - flexbe_cli.scroll.latest);
        clearTimeout(this.scrollTimer), this.scrollTimer = setTimeout((() => {
          s = flexbe_cli.scroll.latest, n += e, n >= i && h()
        }), 200)
      };
      setTimeout((() => {
        document.addEventListener("scroll", u, {passive: !0})
      }), 500), d.outerWidth(), d.addClass("show"), t.addClass("cookies-warning--show"), d.on("click.cookies", ".cookies-button, .cookies-close", (() => {
        (() => {
          const e = $(".cookies-wrap");
          e.removeClass("show"), t.removeClass("cookies-warning--show"), localStorage.setItem(pe, "allowed"), setTimeout((() => {
            e.remove()
          }), 1e3)
        })(), h()
      })), $(document).on("click.cookies", "a, [data-component]", (() => h()))
    }
  };
  const fe = (e, t, i) => !(!Array.isArray(t) || !Array.isArray(i) || t.length !== i.length) && t.every(((t, o) => e ? i.includes(t) : i[o] === t));
  let _e;
  fe.bind(null, !0), fe.bind(null, !1), function (e) {
    e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box"
  }(_e || (_e = {}));
  const ge = function () {
    function e(e, t, i, o) {
      return this.x = e, this.y = t, this.width = i, this.height = o, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Object.freeze(this)
    }

    return e.prototype.toJSON = function () {
      let e = this;
      return {
        x: e.x,
        y: e.y,
        top: e.top,
        right: e.right,
        bottom: e.bottom,
        left: e.left,
        width: e.width,
        height: e.height
      }
    }, e.fromRect = function (t) {
      return new e(t.x, t.y, t.width, t.height)
    }, e
  }(), we = "undefined" != typeof window ? window : {};
  /msie|trident/i.test(we.navigator && we.navigator.userAgent);
  const be = function (e, t, i) {
    return void 0 === e && (e = 0), void 0 === t && (t = 0), void 0 === i && (i = !1), Object.freeze({
      inlineSize: (i ? t : e) || 0,
      blockSize: (i ? e : t) || 0
    })
  };
  Object.freeze({
    devicePixelContentBoxSize: be(),
    borderBoxSize: be(),
    contentBoxSize: be(),
    contentRect: new ge(0, 0, 0, 0)
  });
  let ve, Ae = !1;
  const ye = e => {
    ve.size ? (requestAnimationFrame(ye), Array.from(ve).forEach((([t, i]) => {
      if (i.last >= e) return;
      const o = "function" == typeof i.fps ? i.fps() : i.fps;
      (!o || e - i.last >= 1e3 / o) && (i.last = e, t(e))
    }))) : Ae = !1
  };
  let xe, $e, ke = !0;
  const Ce = "position-fixed";
  var Se = {
    map: [], createMap: () => $('[data-is="block"][data-fixed="true"]').toArray().map(((e, t) => {
      const i = $(e), o = i.attr("data-fixed-wrapper") || "self", s = i.attr("data-fixed-element"),
        n = "true" === i.attr("data-fixed-ignore-adaptive"), r = "self" === o ? i : i.find(o), a = i.find(s);
      if (!a.length || !r.length) return null;
      const l = !!i.data("fixed-animation"), c = !!i.data("sticky"),
        d = a.closest("[data-static-contrast]").attr("data-static-contrast") || a.closest("[data-contrast]").attr("data-contrast"),
        h = a.closest("[data-fixed-contrast]").attr("data-fixed-contrast") || d,
        u = Math.round(r.outerHeight()), {top: p} = Q(r[0]) || {}, m = p + u;
      let f = u;
      if (l) {
        a.hasClass(Ce) ? f = Math.round(a.outerHeight()) : (a.addClass(Ce), f = Math.round(a.outerHeight()), a.removeClass(Ce))
      }
      return {
        index: t,
        $block: i,
        $wrap: r,
        $fixed: a,
        top: p,
        bottom: m,
        height: u,
        heightFixed: f,
        contrastStatic: d,
        contrastFixed: h,
        isSticky: c,
        ignoreAdaptive: n,
        hasFixedAnimation: l,
        isFixed: !1,
        isReplaced: !1
      }
    })).filter((e => {
      const t = "mobile" === flexbe_cli.resize.responsiveMode, i = e.$block.attr("data-hidden");
      return (!t || !e.ignoreAdaptive && "mobile" !== i) && !(!t && "desktop" === i)
    })), modifyMap(e, t) {
      let i = 0, o = 0;
      return e.forEach(((s, n) => {
        const r = i + t;
        s.isFixed = s.hasFixedAnimation ? r > s.bottom + 100 : r > s.top, s.fixOffset = i, s.isSticky && s.isFixed && (i += s.heightFixed), s.isFixed && (o += s.heightFixed);
        const a = n && e[n - 1];
        s.replaceOffset = 0, a && !a.isSticky && t + a.fixOffset + a.heightFixed > s.top && (a.replaceOffset = Math.min(a.fixOffset + a.heightFixed, t + a.fixOffset + a.heightFixed - s.top))
      })), {allFixedHeight: o}
    }, applyMap(e, t) {
      const i = !e.applied && !ke;
      e.forEach((o => {
        const s = o.$fixed[0].isFixed;
        if (s !== o.isFixed || i) if (o.$fixed[0].isFixed = o.isFixed, o.$fixed.toggleClass("position-sticky", o.isFixed && o.isSticky), o.contrastStatic && o.contrastStatic !== o.contrastFixed && o.$fixed.attr("data-contrast", o.isFixed ? o.contrastFixed : o.contrastStatic), o.hasFixedAnimation) if (clearTimeout(o._fixedAnimationBouncer), o.isFixed) o.$wrap.css("height", `${o.height}px`), o.$fixed.removeClass("fade-out"), o.replaceOffset || o.$fixed.hasClass(Ce) || (o.$fixed.addClass("position-fixed fade-in"), o._fixedAnimationBouncer = setTimeout((() => {
          o.$fixed.removeClass("fade-in")
        }), 200)); else {
          const i = t > o.height;
          o.$fixed.removeClass("fade-in"), !o.replaceOffset && e.applied && i && o.$fixed.addClass("fade-out"), o._fixedAnimationBouncer = setTimeout((() => {
            o.$wrap.css("height", ""), o.$fixed.removeClass("position-fixed fade-out")
          }), i ? 150 : 0)
        } else o.$wrap.css("height", o.isFixed ? `${o.height}px` : ""), o.$fixed.toggleClass(Ce, o.isFixed);
        if (o.isFixed ? (o.$fixed[0].style.setProperty("top", `${o.fixOffset}px`, "important"), o.$fixed[0].style.setProperty("transform", o.replaceOffset ? `translateY(-${o.replaceOffset}px)` : "none", "important")) : (o.$fixed[0].style.removeProperty("top"), o.$fixed[0].style.removeProperty("transform")), s !== o.isFixed) {
          const e = o.$block[0]._core;
          e && e.updateTween({fixed: o.isFixed})
        }
      })), ke = !1, e.applied = !0, this.map = e
    }, getAllFixedHeight(e) {
      const {allFixedHeight: t} = this.modifyMap($.extend([], this.map || []), e);
      return t
    }, initFixed() {
      const e = flexbe_cli.is_admin, t = this.createMap();
      $e = null, xe && xe(), t.length && !e && (xe = function (e, t = 0) {
        return ve || (ve = new Map), ve.set(e, {last: 0, fps: t}), Ae || requestAnimationFrame(ye), () => {
          ve.delete(e)
        }
      }((() => {
        const e = window.scrollY;
        $e !== e && ($e = e, this.modifyMap(t, e), this.applyMap(t, e))
      }), t.length > 1 ? 90 : 30))
    }, init() {
      new ResizeObserver((([e]) => {
        this.initFixed()
      })).observe($("body")[0])
    }
  };
  const Ie = (e, t = 0) => (...i) => setTimeout(e, t, ...i), Ee = (e, t = 0, ...i) => Ie(e, t)(...i);

  class Te {
    constructor(e, t = {}) {
      this.require = [], this.components = null, this.inited = !1, this.isVisible = null, this.inScreen = !1, this.inBeside = !1, this.inView = !1, this.inFocus = !1, this.wasVisible = null, this.wasScreen = !1, this.wasBeside = !1, this.wasView = !1, this.wasFocus = !1;
      const i = $(e), o = i.attr("data-is"), s = i.attr("data-id"), n = "zone" === o ? "e" : o[0],
        r = i.attr(`data-${n}-id`), a = i.attr("data-mod-id") || 0;
      this.$area = i, this.area = i[0], this.$content = i, this.content = this.$content[0], this.$root = i, this.root = i[0], this.is = o, this.id = s, this.template_id = r, this.mod_id = a, this.tween = {}, this.type = JSON.parse(i.attr(`${n}-type`) || "[]"), Object.keys(t).forEach((e => {
        const i = Object.getOwnPropertyDescriptor(t, e);
        if ("value" in i) {
          const i = t[e];
          this[e] = "object" == typeof i ? $.extend(!0, Array.isArray(i) ? [] : {}, i) : i
        } else Object.defineProperty(this, e, i)
      })), ["_onVisible", "_onBeside", "_onFocus", "_onScreen", "_onView", "_onResize", "_onOpen", "_onClose", "_sendEvent"].forEach((e => {
        this[e] = this[e].bind(this)
      }));
      let l = this.components;
      l || (l = 4 === flexbe_cli.theme_id ? [] : Array.from(new Set(i.find("[data-component]").map(((e, t) => t.getAttribute("data-component"))).toArray()))), l = l.map((e => "string" == typeof e ? flexbe_cli.components.getComponentClass(e) : e)).filter((e => e)), this.components = l
    }

    onInit() {
    }

    onUpdate() {
    }

    onLoad() {
    }

    onReady() {
    }

    onDestroy() {
    }

    onVisible() {
    }

    onBeside() {
    }

    onFocus() {
    }

    onScreen() {
    }

    onView() {
    }

    onMsg() {
    }

    onResize() {
    }

    onOpen() {
    }

    onClose() {
    }

    init(e, t = (this.inited ? "update" : "init")) {
      "init" === t ? this._onInit(e) : "update" === t && this._onUpdate(e), ("init" === t || e.templateRendered) && flexbe_cli.require(this.require, (() => this._onLoad(e)))
    }

    destroy(e) {
      this._onDestroy(e)
    }

    _sendEvent(e, t) {
      flexbe_cli.events.emit("entity_event", {type: e, core: this, params: t});
      const i = new CustomEvent(e, {detail: t});
      this.area.dispatchEvent(i, {bubbles: !1})
    }

    _onInit(e) {
      this.inited = !0, this._sendEvent("init", e), this.onInit(e), requestAnimationFrame((() => this.updateTween()))
    }

    _onLoad(e) {
      this.loaded = !0, this._sendEvent("load", e), this.onLoad(e), this.onReady(e), this.require.length && requestAnimationFrame((() => this.updateTween({force: !0})))
    }

    _onUpdate(e) {
      this.inited = !0, this.updated = !0, this.modId = this.$area.attr("data-mod-id") || 0, this._sendEvent("update", e), this.onUpdate(e), (e.templateRendered || e.styleRendered) && requestAnimationFrame((() => this.updateTween({force: !0})))
    }

    _onResize(e = {}) {
      this.isVisible && (this._sendEvent("resize", e), this.onResize(e))
    }

    _onDestroy(e) {
      this.$area.off(".inherit"), this._sendEvent("destroy", e), this.onDestroy(e), delete this.area._core
    }

    _onMsg(e, t) {
      this._sendEvent("msg", {msg: e, data: t}), this.onMsg(e, t)
    }

    _onVisible({state: e, force: t}) {
      if (null == this.isVisible) return this.isVisible = e, void (this.wasVisible = e);
      if (this.isVisible === e && !t) return;
      const i = e ? !this.wasVisible : void 0;
      this.isVisible = e, this._sendEvent("visible", {state: e, first: i}), this.onVisible({
        state: e,
        first: i
      }), e && (this.wasVisible = !0)
    }

    _onFocus({state: e, force: t}) {
      if (this.isVisible || (e = !1), this.inFocus === e && !t) return;
      const i = e ? !this.wasFocus : void 0;
      this.inFocus = e, this._sendEvent("focusing", {state: e, first: i}), this.onFocus(e, i), e && (this.wasFocus = !0)
    }

    _onScreen({state: e, force: t}) {
      if (this.isVisible || (e = !1), this.inScreen === e && !t) return;
      const i = e ? !this.wasScreen : void 0;
      this.inScreen = e, this._sendEvent("screen", {
        state: e,
        first: i
      }), this.onScreen(e, i), e && (this.wasScreen = !0)
    }

    _onView({state: e, force: t}) {
      if (this.isVisible || (e = !1), this.inView === e && !t) return;
      const i = e ? !this.wasView : void 0;
      this.inView = e, "block" === this.is && i && ie.startTransitions(this.$area), this._sendEvent("view", {
        state: e,
        first: i
      }), this.onView(e, i), e && (this.wasView = !0)
    }

    _onBeside({state: e, force: t}) {
      if (this.isVisible || (e = !1), this.inBeside === e && !t) return;
      const i = e ? !this.wasBeside : void 0;
      this.inBeside = e, this._sendEvent("beside", {
        state: e,
        first: i
      }), this.onBeside(e, i), e && (this.wasBeside = !0)
    }

    updateTween() {
    }

    _onOpen(e) {
      this.updateTween(), this._sendEvent("open", e), this.onOpen(e)
    }

    _onClose(e) {
      this.updateTween(), this._sendEvent("close", e), this.onClose()
    }
  }

  var Pe = 0;

  function Me(e) {
    return "__private_" + Pe++ + "_" + e
  }

  function ze(e, t) {
    if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
    return e
  }

  const Oe = ["id", "is", "area", "content", "isVisible", "inBeside", "inView", "inFocus", "inScreen", "wasBeside", "wasFocus", "wasScreen", "wasView", "wasVisible"];
  let De = !1;
  const Fe = {};

  function Le(e, t) {
    return Object.keys(t).filter((t => 0 === t.indexOf(e) || 0 === e.indexOf(".") && t === `${t.split(".")[0]}${e}`))
  }

  var Be = Me("listeners");

  class Ve {
    static create(e) {
      return De || (De = !0, flexbe_cli.events.on("entity_event.entityPublicApi", ((e, {
        type: t,
        params: i,
        core: o
      }) => {
        const s = Fe[o.id];
        s && s.emit(t, i)
      }))), Fe[e.id] && Fe[e.id].clear(), Fe[e.id] = new Ve(e), Fe[e.id]
    }

    constructor(e) {
      Object.defineProperty(this, Be, {writable: !0, value: {}});
      const t = Oe.reduce(((t, i) => {
        const o = {...t};
        return o[i] = {enumerable: !0, get: () => e[i]}, o
      }), {});
      Object.defineProperties(this, t), Object.defineProperties(this, {
        size: {
          enumerable: !0,
          get: () => ({width: e.tween.width, height: e.tween.height})
        }
      })
    }

    async emit(e, t) {
      const i = Le(e, ze(this, Be)[Be]).flatMap((e => ze(this, Be)[Be][e]));
      for (const e of i) await e(t)
    }

    on(e, t) {
      return "function" != typeof t || (ze(this, Be)[Be][e] || (ze(this, Be)[Be][e] = []), ze(this, Be)[Be][e].push(t)), this
    }

    off(e, t) {
      return Le(e, ze(this, Be)[Be]).forEach((e => {
        const i = ze(this, Be)[Be][e];
        ze(this, Be)[Be][e] = t ? i.filter((e => e !== t)) : []
      })), this
    }

    clear() {
      ze(this, Be)[Be] = {}
    }
  }

  const je = new Map, He = ".b_block", Re = ".m_modal", qe = ".w_widget", We = '[data-is="zone"]',
    Ne = '[data-is="element"]', Ge = {
      block: class extends Te {
        constructor(e, t) {
          super(e, t), this.is = "block", this.$block = this.$area, this.$content = this.$area.find(".container-fluid"), this.content = this.$content[0], this.abtestVariant = this.$area.attr("data-abtest-variant"), this.abtestId = this.abtestVariant && this.$area.attr("data-abtest-id")
        }

        _onInit(e) {
          super._onInit(e)
        }

        _onUpdate(e) {
          this.$content = this.$area.find(".container-fluid"), this.content = this.$content[0], super._onUpdate(e)
        }

        _onDestroy(e) {
          this.inited = !1, super._onDestroy(e)
        }

        updateTween({force: e = !1, fixed: t = !1} = {}) {
          if (!this.inited) return !1;
          let i = this.area, o = 0;
          const s = i.offsetWidth, n = i.offsetHeight;
          for (; i;) o += i.offsetTop, i = i.offsetParent;
          const r = o + n, a = !(!s && !n), l = null == this.tween.width && null == this.tween.height,
            c = e || s !== this.tween.width || n !== this.tween.height, d = 1 / (n || 1) * (flexbe_cli.scroll.latest - o),
            h = function () {
              const e = o - flexbe_cli.resize.clientHeight;
              return 1 / (r - e) * (flexbe_cli.scroll.latest - e)
            }(), u = function () {
              const e = n || 1, t = flexbe_cli.scroll.latest + flexbe_cli.resize.clientHeight / 2;
              return (t - (o + e / 2) + e / 2) / e
            }();
          this.tween.start = o, this.tween.end = r, this.tween.width = s, this.tween.height = n, this.tween.position = d, this.tween.positionAbs = h, this.tween.positionCenter = u;
          const p = a && u > 0 && u < 1, m = p || function () {
            if (t) return !0;
            const e = Math.min(n / 3, flexbe_cli.resize.clientHeight / 4);
            return flexbe_cli.scroll.latest + flexbe_cli.resize.clientHeight >= o + e && flexbe_cli.scroll.latest <= r - e
          }(), f = m || function () {
            if (t) return !0;
            return h >= 0 && h <= 1
          }(), _ = f || function () {
            if (t) return !0;
            const e = Math.max(n / 2, flexbe_cli.resize.clientHeight / 3);
            return flexbe_cli.scroll.latest + flexbe_cli.resize.clientHeight > o - e && flexbe_cli.scroll.latest < r + e
          }();
          return Ee((() => {
            this._onVisible({state: a}), !l && c && this._onResize({force: e}), this._onBeside({
              force: e,
              state: _
            }), this._onScreen({force: e, state: f}), this._onView({force: e, state: m}), this._onFocus({
              force: e,
              state: p
            })
          })), Ee(this._sendEvent, 0, "tween", {tween: this.tween, force: e}), c
        }
      }, modal: class extends Te {
        constructor(e, t) {
          super(e, t), this.is = "modal", this.isOpen = !1, this.$modal = this.$area
        }

        open({fromId: e, data: t, options: i = {}}) {
          var o, s;
          if (this.isOpen) return;
          this.isOpen = !0, this.lastOptions = i, this.lastScroll = L.latest;
          const n = this.$area.find(".modal-data > ._anchor").attr("name") || this.id;
          (i.hash || null == i.hash) && (this._prevHash = window.location.hash, flexbe_cli.lockPopstate = !0, window.history.pushState(null, null, `#${n}`), flexbe_cli.lockPopstate = !1), this.$area.removeClass("noanimate"), this.$area.addClass("show animation-forwards"), flexbe_cli.modal.$list.addClass("show"), $("body").addClass("is-modal-open"), $(".w_cart.show").length && flexbe_cli.modal.$list.addClass("rise");
          const r = this.$modal.find(".component-button").eq(0),
            a = null != (o = null == (s = r.offset()) ? void 0 : s.top) ? o : 0;
          !flexbe_cli.run.is_screen_mobile && !flexbe_cli.is_admin && flexbe_cli.resize.viewportHeight > a + 100 && r.focus(), setTimeout((() => {
            flexbe_cli.modal.$list.addClass("overlay"), this._onOpen({data: t}), this._onBeside({state: !0}), this._onScreen({state: !0}), this._onView({state: !0}), this._onFocus({state: !0}), "function" == typeof i.onOpen && i.onOpen()
          }), 30), L.scrollLock.lock(), p.emit("modal_opened", {id: this.id, fromId: e, data: t, options: i})
        }

        close({openId: e} = {}) {
          if (!this.isOpen) return;
          const t = this.lastOptions, i = !e && !this.$area.siblings(".show").length;
          if (this.lastOptions = {}, this.isOpen = !1, (t.hash || null == t.hash) && i && /^#{1,2}/.test(window.location.hash)) {
            const e = this._prevHash && this._prevHash !== window.location.hash ? this._prevHash : window.location.pathname;
            flexbe_cli.lockPopstate = !0, window.history.replaceState(null, null, e), flexbe_cli.lockPopstate = !1
          }
          this.$area.removeClass("animation-forwards").addClass("noanimate");
          const o = parseInt(this.$area.css("--animationDuration"), 10) || 450;
          this.$area.removeClass("show noanimate").addClass("hide animation-backwards"), setTimeout((() => {
            this.$area.removeClass("show hide animation-backwards"), i && (flexbe_cli.modal.$list.removeClass("show rise overlay fade-out"), "#cart" !== window.location.hash && L.scrollLock.unlock(), $("body").removeClass("is-modal-open")), flexbe_cli.run.is_screen_mobile && $("body, html").scrollTop(this.lastScroll)
          }), flexbe_cli.is_admin ? 0 : o), this._onClose(), this._onBeside({state: !1}), this._onScreen({state: !1}), this._onView({state: !1}), this._onFocus({state: !1}), "function" == typeof t.onClose && t.onClose(this), p.emit("modal_closed", {
            id: this.id,
            openId: e
          })
        }

        updateTween({force: e} = {}) {
          if (!this.inited) return !1;
          const t = this.area, i = t.offsetWidth, o = t.offsetHeight,
            s = null == this.tween.width && null == this.tween.height,
            n = e || i !== this.tween.width || o !== this.tween.height, r = this.isOpen;
          return this.tween.width = i, this.tween.height = o, Ee((() => {
            this._onVisible({force: e, state: r}), !s && n && this._onResize({force: e}), this._onBeside({
              force: e,
              state: r
            }), this._onScreen({force: e, state: r}), this._onView({force: e, state: r}), this._onFocus({
              force: e,
              state: r
            })
          })), Ee(this._sendEvent, 0, "tween", {tween: this.tween, force: e}), n
        }
      }, widget: class extends Te {
        constructor(e, t) {
          super(e, t), this.is = "widget", this.$widget = this.$area
        }

        updateTween({force: e} = {}) {
          if (!this.inited) return !1;
          const t = this.area, i = t.offsetWidth, o = t.offsetHeight;
          let s;
          s = null != this.isOpen ? !!this.isOpen : !(!i && !o);
          const n = null == this.tween.width && null == this.tween.height,
            r = !!e || i !== this.tween.width || o !== this.tween.height;
          return r && (this.tween.width = i, this.tween.height = o), Ee((() => {
            this._onVisible({force: e, state: s}), !n && r && this._onResize({force: e}), this._onBeside({
              force: e,
              state: s
            }), this._onScreen({force: e, state: s}), this._onView({force: e, state: s}), this._onFocus({
              force: e,
              state: s
            })
          })), Ee(this._sendEvent, 0, "tween", {tween: this.tween, force: e}), r
        }
      }, element: class extends Te {
        constructor(e, t) {
          super(e, t), this.is = "element";
          const i = this.$area.closest("[data-cloned]");
          this.isClone = i.attr("data-cloned") || !1, this.$content = this.$area.find("> .element-content").addBack().last(), this.content = this.$content[0], this.$root = this.$area.closest(".b_block, .m_modal, .w_widget"), this.root = this.$root[0], this.$parent = this.$area.parent().closest("[data-is]"), this.parent = this.$parent[0]
        }

        _onInit(e) {
          super._onInit(e), this._inheritEvents()
        }

        _onUpdate(e) {
          this.$area.off(`.inherit.${this.id}`), this.$content = this.$area.find("> .element-content").addBack().last(), this.content = this.$content[0], super._onUpdate(e), this._inheritEvents()
        }

        _onDestroy(e) {
          super._onDestroy(e), this.$area.off(".inherit"), this.$parent.off(`.inherit.${this.id}`)
        }

        _inheritEvents() {
          const e = `.inherit.${this.id}.${this.isClone ? `clone${Number(this.isClone)}` : "original"}`;
          this.$parent.off(e), this.$parent.on(`tween${e}`, (e => {
            this.updateTween(e.detail || {})
          })), ["visible"].forEach((t => {
            this.$parent.on(`${t}${e}`, (() => {
              this.updateTween({})
            }))
          })), ["_onOpen", "_onClose", "_onDestroy"].forEach((t => {
            const i = `${t.replace("_on", "").toLowerCase()}${e}`;
            this.$parent.on(i, ((e, ...i) => {
              !i.length && e.detail && (i[0] = e.detail), this[t](...i)
            }))
          }))
        }

        updateTween({force: e} = {}) {
          const t = this.content || this.area, i = this.parent && this.parent._core, o = this.root && this.root._core;
          if (!i || !this.inited) return;
          const s = null == this.tween.width && null == this.tween.height;
          let n = i.isVisible, r = i.inBeside, a = r, l = a, c = a, d = !1;
          if (o && "block" === o.is && n && r) {
            const {top: i, bottom: o} = t.getBoundingClientRect(), s = t.offsetWidth, h = t.offsetHeight,
              u = flexbe_cli.resize.clientHeight;
            if (n = !(!s && !h), d = e || s !== this.tween.width || h !== this.tween.height, this.tween.width = s, this.tween.height = h, n) {
              r = o > -u / 3 && i < u + u / 3, a = r && a && o > 0 && i < u, c = a && c && i <= u / 2 && i + h >= u / 2;
              const e = Math.min(h / 3, flexbe_cli.resize.clientHeight / 4);
              l = c || a && l && i + e > 0 && o - e < u
            }
          }
          Ee((() => {
            this.isVisible !== n && this._onVisible({
              force: e,
              state: n
            }), !s && d && this._onResize({force: e}), this._onBeside({force: e, state: r}), this._onScreen({
              force: e,
              state: a
            }), this._onView({force: e, state: l}), this._onFocus({force: e, state: c})
          })), r && Ee(this._sendEvent, 0, "tween", {tween: this.tween, force: e})
        }
      }
    }, Ue = {block: "sectionApi", modal: "modalApi", widget: "widgetApi", element: "elementApi", zone: "elementApi"};
  var Je = {
    init() {
      this.dispatchEvents(), this.initArea(flexbe_cli.block.$list), this.initArea(flexbe_cli.modal.$list), this.initArea(flexbe_cli.widget.$list)
    }, createPublicApi(e) {
      const t = {sectionApi: null, modalApi: null, widgetApi: null, elementApi: null, require: F},
        i = document.querySelector(`[data-id="${e}"]`), o = i.getAttribute("data-is");
      if (!("block" === o || "modal" === o)) {
        const e = i.closest(".b_block, .m_modal"), o = e.getAttribute("data-is"),
          s = this.bind(e, {is: o, skipInit: !0});
        t[Ue[o]] = Ve.create(s)
      }
      const s = this.bind(i, {is: o, skipInit: !0});
      return t[Ue[o]] = Ve.create(s), t
    }, bind(e, t = {}) {
      const i = t.is || e.getAttribute("data-is"), o = e.getAttribute(`data-${i[0]}-id`);
      if (o && !e._core) {
        const t = this.getClientJs(i, o) || {};
        e._core = new Ge[i](e, t)
      }
      return e._core && !t.skipInit && e._core.init(t), e._core
    }, setClientJs(e, t, i) {
      je.set(`${e}:${t}`, i)
    }, getClientJs: (e, t) => je.get(`${e}:${t}`), initArea(e, t = {}) {
      if (!e.length) return !1;
      const i = [["block", He], ["modal", Re], ["widget", qe], ["element", We], ["element", Ne]];
      return j(e), e.toArray().forEach((e => {
        const o = $(e);
        i.forEach((([i, s]) => {
          const n = {...t, is: i};
          o.is(s) && this.bind(e, n), o.find(s).toArray().forEach(Ie((e => this.bind(e, n))))
        }))
      })), e[0]._core
    }, dispatchEvents() {
      flexbe_cli.is_admin && (flexbe_cli.events.on("entity_render.core_entity", ((e, t) => {
        if (!t || !t.id) return;
        if (t.originId && t.originId !== t.id) return;
        const i = t.entity && t.entity.$area || $(document).find(`[data-id="${t.id}"]`);
        i.length && this.initArea(i, t)
      })), flexbe_cli.events.on("layout_change.core_entity", ((e, t) => {
        if ("before_remove" !== t.action) return;
        (t.entity && t.entity.$area || $(document).find(`[data-id="${t.id}"]`)).each(((e, i) => {
          i._core && i._core.destroy(t)
        }))
      })), flexbe_cli.events.on("client_msg.core_entity", ((e, t) => {
        if (!t || !t.id || !t.is) return;
        const i = t.entity && t.entity.$area || $(document).find(`[data-id="${t.id}"]`);
        i.length && i.each(((e, i) => {
          i._core && i._core._onMsg(t.msg, t.data)
        }))
      })))
    }
  }, Qe = {
    $list: $(".container-list").eq(0), $blocks: $(".b_block"), init() {
      this.dispatchEvents()
    }, dispatchEvents() {
      const e = () => {
        this.$blocks.each(((e, t) => U(t, !1)))
      };
      $(window).on("resized.flexbe_block", $.debounce((() => e()), 20)), $(document).on("documentresized.flexbe_block", $.debounce((() => e()), 20)), window.addEventListener("scroll", $.throttle((() => {
        this.$blocks.each(((e, t) => U(t, !1)))
      }), 96), {passive: !0}), flexbe_cli.is_admin && flexbe_cli.events.off("layout_change.flexbe_block").on("layout_change.flexbe_block", ((e, t) => {
        t && "block" === t.is && (this.$blocks = $(".b_block"), this.$blocks.each(((e, t) => U(t, !1))))
      }))
    }
  };
  const Ye = () => {
    if (flexbe_cli.is_admin) {
      if ((window.parent.flexbe.modal.visible || []).length) return !1
    }
    return !0
  };
  var Xe = {
    opened: {}, $list: $(".modal-list"), init() {
      const e = window.getJsonFromUrl();
      if (e.service && e.m_id) return this.$list.addClass("noanimate"), this.open({id: e.m_id}), !1;
      this.dispatchEvents()
    }, dispatchEvents() {
      const e = $("body");
      if (flexbe_cli.events.on("ui_modal_open.core_modal", ((e, t = {}) => {
        this.open(t)
      })), flexbe_cli.events.on("ui_modal_close.core_modal", ((e, t = {}) => {
        this.close(t)
      })), e.on("click.modal-close", ".m_modal .close", (e => {
        e.preventDefault();
        const t = $(e.currentTarget).closest(".m_modal.show").attr("data-id");
        this.close({id: t})
      })), !flexbe_cli.is_admin) {
        let t, i, o = {x: 0, y: 0};
        e.off(".modal-close-overlay").on("pointerdown.modal-close-overlay pointerup.modal-close-overlay", ".modal-data", (e => {
          Object.keys(this.opened).length && Ye() && ("pointerdown" === e.type ? (o = {
            x: e.pageX,
            y: e.pageY
          }, i = $(e.target).is(".modal-data") || $(e.target).is('[data-overlay="true"]') ? e.target : null, t = e.target.clientWidth <= e.pageX) : !t && i === e.target && Math.sqrt((e.pageX - o.x) ** 2 + (e.pageY - o.y) ** 2) < 10 && setTimeout((() => {
            this.close({id: $(i).closest(".m_modal").attr("data-id")})
          }), 50))
        })), $(window).off(".modal-close-esc").on("keyup.modal-close-esc", (e => {
          if (27 === e.which && Ye() && Object.keys(this.opened).length) {
            const e = Object.keys(this.opened), t = e[e.length - 1];
            this.close({id: t})
          }
        }))
      }
    }, find(e) {
      if (null == this.$list || !this.$list.length) return !1;
      const t = this.$list.find(`[data-id="${e}"]`);
      if (null == t || !t.length) return !1;
      const i = t.toArray(), o = i[0] || !1;
      return !!o && {modals: i, modal: o}
    }, open({id: e, data: t = {}, options: i = {}} = {}) {
      let {modal: o} = this.find(e) || {};
      if (!o) return console.warn("WRONG ACTION", "modal_not_found", e), !1;
      const s = Je.bind(o, {is: "modal"});
      if (o && !s) return console.warn("Try to open modal without core object,", `id: ${e},`, "modal: ", o), !1;
      const n = Object.keys(this.opened), r = n[n.length - 1];
      return !i.rise && r && r !== e && this.close({id: r, openId: e}), n.includes(e) || s.open({
        fromId: r,
        data: t,
        options: i
      }), s.$area.css("zIndex", Object.keys(this.opened).length + 1), delete this.opened[e], this.opened[e] = s, !0
    }, close({id: e, openId: t} = {}) {
      if (!e) return Object.keys(this.opened).map((e => !(!this.opened[e] || e === t) && this.close({
        id: e,
        openId: t
      })));
      if (!this.opened[e]) return !1;
      delete this.opened[e];
      const {modal: i} = this.find(e) || {};
      if (!i) return;
      const o = Je.bind(i, {is: "modal"});
      return o ? (o.close({openId: t}), o.$area.css("zIndex", ""), !0) : (console.warn("Try to close modal without core object"), !1)
    }
  }, Ze = {$list: $(".widget-list")};

  function Ke(e, t = !1) {
    const i = $(e);
    let o = t ? {} : i.data("product");
    if (!1 === o) return !1;
    if (!o) {
      o = $(e).closest("[data-product-item]").find("[data-product-action]").data("product")
    }
    if ((null == o || "object" != typeof o || Array.isArray(o)) && (o = {
      img: i.attr("data-product-image"),
      title: i.attr("data-product-name"),
      price: i.attr("data-product-price"),
      count: i.attr("data-product-count")
    }), "object" == typeof o && !o.strict) {
      let e;
      if (4 === flexbe_cli.theme_id ? (e = i.parents(".content-zone, .flexbe-card, .flexbe-column, .modal-content").last(), e.length || (e = i.parents("[data-item-id]").last())) : e = i.closest("[data-item-id], .modal-data").eq(0), o = {...o}, o.count || (o.count = 1), t || !o.img) {
        const t = e => {
          const t = e.find("[data-img-id]").eq(0), i = t.attr("data-img-id"), o = t.attr("data-img-ext"),
            s = o ? null : t.attr("data-img-name");
          return i ? {id: i, ext: o, name: s} : null
        };
        o.img = t(e) || t(e.closest(".flexbe-row"))
      }
      if (t || !o.title) {
        let t = e.find(".name, .title, .item-title, .text_title, .element-text--title, .text-style-title:not(.text-rotator), .text-style-subtitle:not(.text-rotator)").eq(0);
        t.length || (t = e.find(".text-style-content").eq(0)), o.title = t.text().trim() || ""
      }
      if (t || !o.price && 0 !== o.price) {
        const t = e => {
          const t = e.clone();
          flexbe_cli.is_admin && t.find('[class^="editor"]').remove(), t.find(".text-rotator").remove(), t.find(".component-image").remove(), t.find("del, s, strike").remove();
          let i = String(t[0] && t[0].innerText || "").replace(/\n/g, "<br>").replace(/\.$/, "").replace(/\u00a0/g, " ");
          const o = i.match(/(?:\d?\D{0,2} ?)?[1-9](?:[ ,.]?\d{0,3}){2}(?:[,.]\d{1,2})?(?: ?\D)?/g) || [];
          return i = o.find((e => e.includes(ae.currency.symbol))) || o[0] || "", i = (i.match(/([\d\s]+[ ,.]\d+|[\d\s]+)/g) || [])[0], i ? (i = ae.parseMoney(i), i) : null
        };
        o.price = t(i.closest(".element-item").find(".price, .item-price, .main-price, .element-text--price").eq(0)) || t(i) || t(e.find(".price, .item-price, .main-price, .element-text--price").eq(0)) || t(e)
      }
    }
    if (!o.id) if (o.productId) o.id = `product_${o.productId}:${o.variantId || "default"}`; else {
      const e = flexbe_cli.p_id,
        t = i.parents("[data-id], [data-item-id], [data-multivar]").toArray().map((e => (e.getAttribute("data-id") || e.getAttribute("data-item-id") || "") + (e.getAttribute("data-multivar") || ""))).join(":"),
        n = (s = o.title + o.price, String(s).split("").reduce(((e, t) => (e = (e << 5) - e + t.charCodeAt(0)) & e), 0).toString(16));
      o.id = `${e}_${t || 0}:${n}`
    }
    var s;
    return {type: o.productId ? "product" : "custom", ...o}
  }

  const et = ({date: e, timezone: t, format: i = "date"}) => {
    if (!e || !t) return null;
    let o = new Date(e);
    "string" == typeof e && (o = new Date(e.slice(0, 19).replace("T", " ")));
    const s = new Date, n = new Date(s.toLocaleString("en-US", {timeZone: t}));
    s.setMilliseconds(0), n.setMilliseconds(0);
    const r = s.getTime() - n.getTime(), a = o.getTime() - r;
    return "milliseconds" === i ? a : new Date(a)
  }, tt = ({
             dateFrom: e, dateTo: t, timezone: i = (() => {
      var e, t, i;
      return null == (e = flexbe) || null == (t = e.vars) || null == (i = t.group) ? void 0 : i.timezone
    })()
           }) => {
    const o = Date.now(), s = et({date: e, timezone: i, format: "milliseconds"}),
      n = et({date: t, timezone: i, format: "milliseconds"});
    return !(s && s > o || n && n < o)
  };
  let it = [];

  class ot extends u {
    constructor() {
      super(), this.initList()
    }

    dispatch(e, ...t) {
      const i = this[e];
      if ("function" != typeof i) throw new Error(`Cart dispatch: action '${e}' doesnt exist`);
      const o = i.apply(this, t);
      return this.emit("dispatch", {name: e, args: t, result: o}), o
    }

    initList() {
      let e = [];
      if (flexbe_cli.is_admin) {
        const t = "ru" === flexbe_cli.locale.language, i = "RUB" === flexbe_cli.locale.currency.code;
        e = [{
          id: "default1",
          count: 1,
          protect: !0,
          img: {unq_id: "default1", id: 1000000945, ext: "jpg"},
          title: t ? "Пример товара" : "Example Item",
          price: i ? 750 : 10
        }, {
          id: "default2",
          count: 2,
          protect: !0,
          img: {unq_id: "default2", id: 1000000948, ext: "jpg"},
          title: t ? "Другой товар" : "Another Item",
          price: i ? 2550 : 25
        }]
      } else try {
        e = JSON.parse(localStorage.getItem("f_cart")) || [], e = e.filter((e => e && +e.count))
      } catch (e) {
        console.error(e)
      }
      this.dispatch("updateList", e)
    }

    getList() {
      return it
    }

    getItem(e) {
      return it.find((t => t.id === e))
    }

    getCount() {
      return it.reduce(((e, t) => e + t.count), 0)
    }

    getTotal() {
      return it.reduce(((e, t) => (t.count && t.price && (e += parseInt(String(t.count), 10) * parseFloat(String(t.price))), e)), 0)
    }

    updateList(e) {
      if (!Array.isArray(e)) return null;
      if (e = e.map((e => {
        var t;
        const i = this.getItem(e.id);
        if ("string" == typeof e.img) {
          const t = b(e.img);
          e.img = t && {id: t.id, ext: t.ext}
        } else null != (t = e.img) && t.img_id && (e.img = {
          id: e.img.img_id,
          ext: e.img.img_ext,
          unq_id: String(e.img.unq_id || e.img.id)
        });
        var o, s, n;
        (e.img = e.img || null, e.type = e.type || "custom", e.price = null == e.price ? null : parseFloat(e.price), i && null == e.orderPrice) ? e.orderPrice = null != (o = i.orderPrice) ? o : i.price : null == e.orderPrice && (e.orderPrice = e.price);
        return e.quantity = "custom" === (n = s = e).type || n.quantity === 1 / 0 || -1 === n.quantity ? 1 / 0 : s.quantity, e.count = +e.count || 0, e
      })), !flexbe_cli.is_admin) try {
        localStorage.setItem("f_cart", JSON.stringify(e))
      } catch (e) {
      }
      return it = e, it
    }

    purchase() {
      flexbe_cli.stat.ecommerce.purchase(it), this.resetList()
    }

    resetList() {
      const e = [...it].filter((e => e.protect));
      this.updateList(e)
    }

    addItem(e) {
      if (!e.id) throw new Error("Cart add item: product ID is not defined");
      const t = [...it], i = {...e, count: parseFloat(e.count) || 1}, o = this.getItem(i.id);
      if (o) {
        const e = t.indexOf(o);
        i.count += o.count, t.splice(e, 1, i)
      } else t.push(i);
      return this.updateList(t), flexbe_cli.stat.ecommerce.add(i), t
    }

    removeItem(e) {
      const t = this.getItem(e), i = [...it];
      return !t || t.protect ? it : (i.splice(i.indexOf(t), 1), flexbe_cli.stat.ecommerce.remove(t), this.updateList(i))
    }

    updateCount({id: e, count: t}) {
      const i = this.getItem(e);
      if (!i) return null;
      const o = +i.count || 0;
      "+" === t ? i.count += 1 : "-" === t && i.count > 0 ? i.count -= 1 : i.count = "" === t ? 1 : t, Number.isNaN(+i.count) && (i.count = o), this.updateList(it);
      const s = i.count - o;
      return s > 0 ? flexbe_cli.stat.ecommerce.add({...i, count: s}) : s < 0 && flexbe_cli.stat.ecommerce.remove({
        ...i,
        count: -s
      }), i
    }

    normalizeListItems(e = it, t = {price: !0, count: !1, unavailable: !1}) {
      let i = e.map((e => {
        const i = {...e};
        return t.price && (i.orderPrice = e.price), t.count && !at.cartSettings.allowPreorder && (i.count = Math.min(e.count, e.quantity)), i
      }));
      return t.unavailable && (i = i.filter((e => !e.hidden && e.count))), this.updateList(i), i
    }
  }

  class st extends u {
    constructor() {
      super(), this.enabled = void 0, this.activeMethod = void 0, this.methods = void 0, this.cartSettings = void 0, this.methods = (T._group.ecommerce.delivery || []).filter((e => e.enabled)), this.cartSettings = at.cartSettings, this.enabled = this.methods.length > 0, this.activeMethod = this.methods[0]
    }

    dispatch(e, ...t) {
      const i = this[e];
      if ("function" != typeof i) throw new Error(`Delivery dispatch: action '${e}' doesnt exist`);
      const o = i.apply(this, t);
      this.emit("dispatch", {name: e, args: t, result: o})
    }

    getActive() {
      const e = this.activeMethod;
      return e ? {id: e.id, type: e.type, title: e.title, desc: e.desc, price: this.getPrice(e.id)} : null
    }

    getMethod(e) {
      return this.methods.find((t => `${t.id}` === e))
    }

    selectMethod(e) {
      return this.activeMethod = this.getMethod(e) || this.methods[0], this.activeMethod
    }

    getPrice(e) {
      const {appliedPromocode: t} = at.promotionStore || {}, i = e ? this.getMethod(e) : this.activeMethod,
        o = this.cartSettings.useMinTotal ? +this.cartSettings.minTotal : 0;
      let s, n = 0, r = "⏤", a = 0, l = "", c = 0, d = "", h = 0, u = "", p = 0, m = "", f = !1;
      if (i) {
        const e = at.cartStore.getTotal(),
          r = (null == t ? void 0 : t.hasFreeDelivery) && (null == t ? void 0 : t.isActive);
        i.prices.filter((e => "" !== e.from)).forEach(((t, s) => {
          i.useMinTotal && !s && +t.from && (n = +t.price, +t.from > o && (h = +t.from)), (e >= +t.from || !s) && (n = +t.price), r && (n = 0)
        }));
        const _ = i.prices.find((e => 0 === e.price));
        f = !!i.useNotFixTotal, s = f && (!_ || "" === _.from), _ && (a = +_.from || 0, c = Math.max(0, a - e), l = ae.formatMoney(a), d = ae.formatMoney(c)), h && (p = Math.max(0, h - e), u = ae.formatMoney(h), m = ae.formatMoney(p))
      }
      return (!f || a && c <= 0) && (f = !1, r = ae.formatMoney(n, {freeLabel: !0})), {
        current: n,
        currentFormatted: r,
        freeFrom: a,
        freeFromFormatted: l,
        untilFree: c,
        untilFreeFormatted: d,
        minTotal: h,
        minTotalFormatted: u,
        untilMinTotal: p,
        untilMinTotalFormatted: m,
        notFixedPrice: f,
        notHasFree: s
      }
    }
  }

  class nt extends u {
    get hasPromotionChanges() {
      var e, t;
      return !(null == (e = this.promotionsChanges) || !e.discount) || !(null == (t = this.promotionsChanges) || !t.promocode)
    }

    get groupId() {
      return "object" == typeof flexbe_cli ? flexbe_cli.group_id : null
    }

    get timezone() {
      return "object" == typeof flexbe_cli ? flexbe_cli.vars._group.timezone : null
    }

    constructor(e) {
      super(), this.options = void 0, this.discounts = void 0, this.promocode = void 0, this.activeDiscount = void 0, this.nearestDiscount = void 0, this.appliedPromocode = void 0, this.promotionsChanges = void 0, this.getTotal = void 0, this.getTotalIncludingPromotions = void 0, this.options = e, this.appliedPromocode = null, this.activeDiscount = null, this.nearestDiscount = null, this.promotionsChanges = {}, this.getTotal = () => (null == e.getTotal ? void 0 : e.getTotal()) || 0, this.getTotalIncludingPromotions = () => {
        var e, t;
        return this.getTotal() - ((null == (e = this.activeDiscount) ? void 0 : e.discountValue) || 0) - ((null == (t = this.appliedPromocode) ? void 0 : t.discountValue) || 0)
      }, flexbe_cli.is_admin || this.init(e)
    }

    init(e) {
      var t;
      this.updateDiscountList(null != (t = flexbe_cli.vars._group.discounts) ? t : [], {updateChanges: !1}), e.needUpdateWithLS && this.updateFromLocalStorage(), this.updateActiveDiscount(!1), this.updateNearestDiscount(), this.bindEvents()
    }

    async dispatch(e, ...t) {
      const i = this[e];
      if ("function" != typeof i) throw new Error(`Promotion dispatch: action '${e}' doesnt exist`);
      const o = await i.apply(this, t);
      this.emit("dispatch", {name: e, args: t, result: o})
    }

    bindEvents() {
      this.on("dispatch.promotion-store", ((e, {name: t}) => {
        ["applyPromocode", "removePromocode"].includes(t) && (this.updateActiveDiscount(), this.updateNearestDiscount())
      }))
    }

    updateActiveDiscount(e = !1) {
      var t;
      if (!this.discounts.length || this.appliedPromocode && !this.appliedPromocode.usage_with_any_discount) return void (this.activeDiscount = null);
      const i = this.discounts.filter((e => e.isAvailableByTime)), o = this.getTotal(),
        s = i.filter((e => o >= e.active_from && o - e.discountValue >= 0)).sort(((e, t) => t.discountValue - e.discountValue))[0] || null,
        n = this.activeDiscount, r = s ? this.getDiscountData(s.id) : null;
      e && (null == s ? void 0 : s.discountValue) !== (null == (t = this.activeDiscount) ? void 0 : t.discountValue) && (this.promotionsChanges.discount = {
        oldData: n,
        newData: r
      }), this.activeDiscount = r
    }

    updateNearestDiscount() {
      var e;
      const t = this.getTotal(), i = this.getTotalIncludingPromotions();
      if (!this.discounts.length || this.appliedPromocode && !this.appliedPromocode.usage_with_any_discount || i <= 0) return void (this.nearestDiscount = null);
      const o = this.discounts.filter((e => e.isAvailableByTime)),
        s = null == (e = o.filter((e => e.active_from > t)).filter((e => {
          if (this.activeDiscount) {
            if ("percent" === e.discount_type) {
              const t = e.active_from * e.discount_amount;
              return "percent" === this.activeDiscount.discount_type ? t > e.active_from * this.activeDiscount.discount_amount : t > this.activeDiscount.discount_amount
            }
            return +e.discount_amount > this.activeDiscount.discountValue
          }
          return !0
        })).sort(((e, t) => e.discountValue - t.discountValue)).sort(((e, t) => e.active_from - t.active_from))[0]) ? void 0 : e.active_from;
      if (s) {
        const e = o.filter((e => e.active_from === s)).filter((e => {
          var t;
          return !this.activeDiscount || e.discountValue > (null == (t = this.activeDiscount) ? void 0 : t.discountValue)
        })).sort(((e, t) => t.discountValue - e.discountValue))[0] || {};
        this.nearestDiscount = e ? this.getDiscountData(e.id) : null
      } else this.nearestDiscount = null
    }

    updateAppliedPromocode() {
      var e, t;
      if (!this.appliedPromocode) return;
      const i = (null == (e = this.promotionsChanges) || null == (t = e.promocode) ? void 0 : t.oldData) || this.appliedPromocode,
        o = this.getPromocodeData();
      if (i && o) {
        var s, n;
        if (i.discountValue !== (null == o ? void 0 : o.discountValue) || i.delivery_free !== (null == o ? void 0 : o.delivery_free)) this.promotionsChanges.promocode = {
          oldData: (null == (s = this.promotionsChanges) || null == (n = s.promocode) ? void 0 : n.oldData) || this.appliedPromocode,
          newData: o,
          code: this.appliedPromocode.code
        }; else this.acceptPromotionChanges({promocode: !0});
        this.appliedPromocode = this.promocode
      }
    }

    async applyPromocode(e) {
      const t = this.getTotal();
      let i;
      try {
        i = await this.loadDataPromocode(e)
      } catch (e) {
        const t = Error();
        throw t.name = "default_error", t
      }
      if (this.updatePromocode(i, {updatePromotions: !1}), t && this.promocode.active_from && this.promocode.active_from > t) {
        const e = new Error(this.promocode.active_from.toString());
        throw e.name = "total_error", e
      }
      if (!this.promocode.isAvailableByTime) {
        const e = new Error;
        throw e.name = "timeout_error", e
      }
      this.appliedPromocode = i, this.options.needUpdateWithLS && localStorage.setItem("applied_promocode", JSON.stringify({
        code: e,
        id: this.promocode.id
      }))
    }

    removePromocode() {
      this.appliedPromocode = null, this.acceptPromotionChanges({promocode: !0}), localStorage.removeItem("applied_promocode")
    }

    acceptPromotionChanges({promocode: e, discount: t} = {}) {
      e || t ? (e && delete this.promotionsChanges.promocode, t && delete this.promotionsChanges.discount) : this.promotionsChanges = {}
    }

    async updateFromLocalStorage() {
      const e = JSON.parse(localStorage.getItem("applied_promocode"));
      if (e && e.id && e.code) {
        var t;
        let i;
        try {
          i = await this.loadDataPromocode(e.code)
        } catch (e) {
          return void this.removePromocode()
        }
        if (this.updatePromocode(i, {updatePromotions: !1}), null == (t = this.promocode) || !t.isActive) return void this.removePromocode();
        this.appliedPromocode = this.promocode
      }
    }

    getDiscountData(e) {
      return this.discounts.find((t => t.id === e))
    }

    getPromocodeData() {
      return this.promocode
    }

    async loadPromotionList(e) {
      return new Promise(((t, i) => $.ajax({
        url: "/api/promotions/get_list/",
        type: "GET",
        dataType: "json",
        data: {promotionType: e}
      }).done((e => {
        t(e)
      })).fail((e => {
        i(e)
      }))))
    }

    async loadDataPromocode(e) {
      return new Promise(((t, i) => $.ajax({
        url: "/api/promotions/get_promocode/",
        type: "GET",
        dataType: "json",
        data: {promoCode: e}
      }).done((e => {
        t(e)
      })).fail((e => {
        i(e)
      }))))
    }

    updatePromocode(e, {updatePromotions: t = !0} = {}) {
      "object" == typeof e && Object.defineProperties(e, {
        isAvailableByTime: {
          get: () => {
            const {date_from: t, date_to: i} = e;
            return tt({dateFrom: t, dateTo: i, timezone: this.timezone})
          }
        },
        discountValue: {
          get: () => {
            const t = this.getTotal();
            return e && "percent" === e.discount_type ? Math.round(t * e.discount_amount) / 100 : +e.discount_amount
          }
        },
        isAvailable: {get: () => !!this.promocode && e.isAvailableByTime},
        isActive: {
          get: () => {
            if (!e.isAvailable) return !1;
            const t = this.getTotal();
            return (null == e ? void 0 : e.active_from) <= t
          }
        },
        hasFreeDelivery: {get: () => (null == e ? void 0 : e.delivery_free) || "delivery" === (null == e ? void 0 : e.discount_type)}
      }), this.promocode = e, t && this.updateAppliedPromocode()
    }

    updateDiscountList(e, {updateChanges: t = !0, updatePromotions: i = !0} = {}) {
      e.forEach((e => {
        Object.defineProperties(e, {
          isAvailableByTime: {
            get: () => {
              const {date_from: t, date_to: i} = e;
              return tt({dateFrom: t, dateTo: i, timezone: this.timezone})
            }
          }, discountValue: {
            get: () => {
              const t = this.getTotal();
              return e && "percent" === e.discount_type ? Math.round(t * e.discount_amount) / 100 : +e.discount_amount
            }
          }
        })
      })), this.discounts = e, i && (this.updateActiveDiscount(t), this.updateNearestDiscount())
    }

    async loadDiscountList({updateChanges: e = !0, updatePromotions: t = !0} = {}) {
      let i;
      try {
        i = await this.loadPromotionList("discount")
      } catch (e) {
        return void (this.discounts = [])
      }
      this.updateDiscountList(i, {updateChanges: e, updatePromotions: t})
    }
  }

  class rt extends u {
    constructor() {
      super(), this.products = void 0, this.products = new Map, this.init()
    }

    get productRaw() {
      return this.products
    }

    init() {
      const e = document.getElementById("flexbe-products-store");
      if (e) {
        try {
          const t = JSON.parse(e.getAttribute("data-store"));
          this.addToStore(t)
        } catch (e) {
        }
        e.parentNode.removeChild(e)
      }
    }

    addToStore(e) {
      e.forEach((e => this.products.set(String(e.id), e)))
    }

    getProducts(e) {
      return e.map((e => this.products.get(String(e)))).filter((e => e))
    }

    async loadProducts({showType: e, productIds: t, categoryIds: i, limit: o, hideEndedProducts: s}) {
      const n = {showType: e, limit: o, productIds: null, categoryIds: null, hideEndedProducts: null};
      "select_products" === e && (n.productIds = null != t ? t : []), "select_category" === e && (n.categoryIds = null != i ? i : []), void 0 !== s && (n.hideEndedProducts = s);
      const {products: r, categories: a} = await new Promise(((e, t) => $.ajax({
        url: "/api/ecommerce/products/",
        type: "GET",
        dataType: "json",
        data: n
      }).done((t => {
        e(t)
      })).fail((e => {
        t(e)
      }))));
      return this.addToStore(r), {categories: a, products: r}
    }
  }

  var at = new class {
    constructor() {
      this.cartStore = null, this.deliveryStore = null, this.promotionStore = null, this.productsStore = null, this.getProductInfo = Ke
    }

    get cartSettings() {
      var e, t, i, o;
      const s = T._group.ecommerce, n = s.cart, r = null != (e = s.out_of_stock_action) ? e : "forbid_preorder",
        a = "allow_preorder" === r, l = n.use_total && n.total > 0;
      return {
        useMinTotal: l,
        minTotal: l ? n.total : 0,
        autoOpen: null != (t = n.auto_open) && t,
        inStockStatus: null != (i = s.in_stock_status) ? i : "in_stock",
        outOfStockStatus: null != (o = s.out_of_stock_status) ? o : "out_of_stock",
        outOfStockAction: r,
        allowPreorder: a
      }
    }

    init({enableDelivery: e = !1, enablePromotions: t = !1, enableProducts: i = !1}) {
      this.cartStore = new ot, t && (this.promotionStore = new nt({
        getTotal: this.cartStore.getTotal,
        needUpdateWithLS: !flexbe_cli.is_admin
      })), e && (this.deliveryStore = new st), i && (this.productsStore = new rt)
    }
  };
  void 0 === window.flexbe_cli && (window.flexbe_cli = {}), flexbe_cli.helpers = K, flexbe_cli.vars = T, flexbe_cli.run = M, flexbe_cli.stat = se, flexbe_cli.events = p, flexbe_cli.locale = ae, flexbe_cli.adaptive = ce, flexbe_cli.scroll = L, flexbe_cli.resize = O, flexbe_cli.tip = he, flexbe_cli.transitions = ie, flexbe_cli.require = F, flexbe_cli.fixed = Se, flexbe_cli.entity = Je, flexbe_cli.block = Qe, flexbe_cli.modal = Xe, flexbe_cli.widget = Ze, flexbe_cli.ecommerce = at, function (e = (() => {
  })) {
    let t = !1;

    function i() {
      t || ("undefined" != typeof $ && $.debounce ? (t = !0, requestAnimationFrame((async () => {
        $("body").removeClass("noanimate"), await e(), flexbe_cli.is_service || (R(), setTimeout((() => R()), 1e3), window.addEventListener("popstate", R)), flexbe_cli.isInited = !0
      }))) : setTimeout(i, 10))
    }

    ["complete", "loaded"].includes(document.readyState) ? i() : document.addEventListener("DOMContentLoaded", (() => i()))
  }((async () => {
    T.init(), await M.init(), L.init(), O.init(), ce.init(), Ee((() => se.init())), Ee((() => at.init({
      enableDelivery: !0,
      enablePromotions: !0,
      enableProducts: !0
    }))), Ee((() => Qe.init())), Ee((() => Xe.init())), Ee((() => Je.init())), flexbe_cli.components && Ee((() => flexbe_cli.components.init())), Ee((() => me.init())), Ee((() => Se.init()), 200)
  }))
}();
