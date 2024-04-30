// ==UserScript==
// @name         二次元图片网站增强
// @namespace    https://github.com/LU-JIEJIE/UserScript/tree/main/packages/anime-site-evolved
// @version      1.0.0
// @author       lu-jiejie
// @description  增强二次元图片网站的体验
// @license      MIT
// @icon         https://yande.re/favicon.ico
// @homepage     https://github.com/LU-JIEJIE/UserScript/tree/main/packages/anime-site-evolved
// @match        *://yande.re/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  var _GM_addStyle = /* @__PURE__ */ (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
  const generalTagsTableUrl = "https://cdn.jsdelivr.net/gh/LU-JIEJIE/UserScript@main/packages/anime-site-evolved/src/data/yande_tags_general.json";
  const copyrightTagsTableUrl = "https://cdn.jsdelivr.net/gh/LU-JIEJIE/UserScript@main/packages/anime-site-evolved/src/data/yande_tags_copyright.json";
  function showImageSize() {
    _GM_addStyle(`
  #post-list-posts li a.directlink span.directlink-info {
    display:none;
  }
  #post-list-posts li a.directlink span.directlink-res{
    display:inline;
  }
  `);
  }
  function bindClickToLoadRawImage() {
    const img = document.querySelector("#image");
    const loadRawImageButton = document.querySelector("#highres-show");
    const downloadPngButton = document.querySelector("#png");
    if (!img || !loadRawImageButton)
      return;
    if (downloadPngButton)
      loadRawImageButton.setAttribute("href", downloadPngButton.getAttribute("href"));
    img.addEventListener("click", () => {
      loadRawImageButton.click();
    });
  }
  function showImageHidden() {
    const hideImageButton = document.querySelector("#blacklisted-sidebar");
    hideImageButton == null ? void 0 : hideImageButton.remove();
    const hiddenImages = document.querySelectorAll(".javascript-hide");
    hiddenImages.forEach((hiddenImage) => {
      hiddenImage.classList.remove("javascript-hide");
    });
  }
  function addTagTypeHeader() {
    const tagDefault = document.querySelector("div.sidebar > div:nth-child(3) > h5");
    tagDefault == null ? void 0 : tagDefault.remove();
    const tagTypes = {
      general: "一般",
      artist: "画师",
      copyright: "版权",
      character: "角色",
      circle: "社团",
      faults: "缺陷"
    };
    for (const tagType in tagTypes) {
      const firstTagByType = document.querySelector(`#tag-sidebar li.tag-type-${tagType}`);
      if (!firstTagByType)
        continue;
      const tagTypeHeader = document.createElement("h5");
      tagTypeHeader.style.marginTop = "0.5em";
      tagTypeHeader.textContent = tagTypes[tagType];
      firstTagByType.before(tagTypeHeader);
    }
  }
  function translateTag(tagLi, tagsTable) {
    const tagA = tagLi.children[1];
    const tag = tagA.textContent;
    const tagFormatted = tag.replaceAll(" ", "_");
    if (tagsTable[tagFormatted] && tagsTable[tagFormatted] !== "UNTRANSLATED")
      tagA.textContent = `[${tagsTable[tagFormatted]}] ${tag}`;
  }
  async function translateTags() {
    const generalTagsTable = await (await fetch(generalTagsTableUrl)).json();
    const copyrightTagsTable = await (await fetch(copyrightTagsTableUrl)).json();
    const tagLis = document.querySelectorAll("#tag-sidebar li");
    tagLis.forEach((tagLi) => {
      var _a;
      const tagType = (_a = tagLi.className.match(/tag-type-(\w+)/)) == null ? void 0 : _a[1];
      switch (tagType) {
        case "general":
          translateTag(tagLi, generalTagsTable);
          break;
        case "copyright":
          translateTag(tagLi, copyrightTagsTable);
          break;
      }
    });
  }
  const yande = {
    regexp: /yande.re/,
    handler: async () => {
      showImageSize();
      bindClickToLoadRawImage();
      showImageHidden();
      addTagTypeHeader();
      translateTags();
    }
  };
  const websites = [
    yande
  ];
  websites.some((website) => {
    if (website.regexp.test(window.location.href)) {
      website.handler();
      return true;
    }
    return false;
  });

})();