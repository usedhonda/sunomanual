// ==UserScript==
// @name         Suno AutoFill (sunomanual)
// @namespace    https://github.com/usedhonda/sunomanual
// @version      1.0.0
// @description  URL hash 経由で Suno の Style / Lyrics / Exclude / Sliders を自動入力する
// @match        https://suno.com/*
// @match        https://suno.ai/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

// -----------------------------------------------------------------
// 使い方:
//   1. Tampermonkey にこのスクリプトをインストール
//   2. 以下の形式の URL をブラウザで開く:
//      https://suno.com/create#suno={encodeURIComponent(JSON データ)}
//   3. Suno のフォームに自動入力される
//
// JSON 構造:
//   {
//     "styleAndFeel": "Style テキスト（英語）",
//     "songName":     "曲タイトル",
//     "lyrics":       "歌詞テキスト（セクションタグ含む）",
//     "excludeStyles":"Exclude テキスト",
//     "vocalGender":  "Male" | "Female" | null,
//     "weirdness":     50,   // 0-100
//     "styleInfluence":70,   // 0-100
//     "audioInfluence":25    // 0-100
//   }
//
// Claude Code の /suno-style スキルが自動で URL を構築して
// `open` コマンドでブラウザを開きます。
// -----------------------------------------------------------------

(function () {
    'use strict';

    let executed = false;

    // React の内部ステート更新を通すためのネイティブ値セッター
    function setNativeValue(element, value) {
        const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')?.set;
        const prototype = Object.getPrototypeOf(element);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;
        if (valueSetter && valueSetter !== prototypeValueSetter) {
            prototypeValueSetter?.call(element, value);
        } else {
            valueSetter?.call(element, value);
        }
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function findButtonByText(text, exact = false) {
        return [...document.querySelectorAll('button, [role="button"]')].find(b => {
            const btnText = b.textContent?.trim().toLowerCase() || '';
            return exact ? btnText === text.toLowerCase() : btnText.includes(text.toLowerCase());
        });
    }

    function findTextareaInSection(sectionText) {
        let ta = document.querySelector('textarea[aria-label*="' + sectionText + '" i]');
        if (ta) return ta;
        const labels = [...document.querySelectorAll('label, span, div')].filter(el =>
            el.textContent?.toLowerCase().includes(sectionText.toLowerCase()) &&
            !el.querySelector('textarea') && el.textContent.length < 50
        );
        for (const label of labels) {
            const parent = label.parentElement;
            if (parent) {
                ta = parent.querySelector('textarea');
                if (ta) return ta;
                const grandparent = parent.parentElement;
                if (grandparent) {
                    ta = grandparent.querySelector('textarea');
                    if (ta) return ta;
                }
            }
        }
        return null;
    }

    function fillFields() {
        if (executed) return false;
        const hash = window.location.hash;
        if (!hash.startsWith('#suno=')) return false;

        try {
            const data = JSON.parse(decodeURIComponent(hash.substring(6)));

            // "Custom" モードに切り替え
            const customBtn = findButtonByText('custom');
            if (customBtn) customBtn.click();

            setTimeout(() => {
                // Lyrics
                if (data.lyrics) {
                    const allTextareas = document.querySelectorAll('textarea');
                    let lyricsTA = [...allTextareas].find(ta =>
                        ta.placeholder?.toLowerCase().includes('lyrics') ||
                        ta.placeholder?.toLowerCase().includes('write your')
                    );
                    if (!lyricsTA) lyricsTA = [...allTextareas].sort((a, b) => b.offsetHeight - a.offsetHeight)[0];
                    if (lyricsTA) setNativeValue(lyricsTA, data.lyrics);
                }

                // Style
                if (data.styleAndFeel) {
                    let styleTA = findTextareaInSection('style');
                    if (!styleTA) {
                        const allTextareas = [...document.querySelectorAll('textarea')];
                        styleTA = allTextareas.sort((a, b) => b.offsetHeight - a.offsetHeight)[1];
                    }
                    if (styleTA && !styleTA.value?.includes(data.styleAndFeel.substring(0, 20))) {
                        setNativeValue(styleTA, data.styleAndFeel);
                    }
                }

                // Song Title
                if (data.songName) {
                    const titleInput = document.querySelector(
                        'input[placeholder*="Title" i], input[placeholder*="Song" i], input[aria-label*="title" i]'
                    );
                    if (titleInput) setNativeValue(titleInput, data.songName);
                }

                // Advanced セクションを開く
                const advancedBtn = findButtonByText('advanced');
                if (advancedBtn && advancedBtn.getAttribute('aria-expanded') !== 'true') {
                    advancedBtn.click();
                }

                setTimeout(() => {
                    // Exclude Styles
                    if (data.excludeStyles) {
                        const excludeInput = document.querySelector('input[placeholder*="Exclude" i]');
                        if (excludeInput) setNativeValue(excludeInput, data.excludeStyles);
                    }

                    // Vocal Gender
                    if (data.vocalGender) {
                        const genderBtn = findButtonByText(data.vocalGender, true);
                        if (genderBtn) genderBtn.click();
                    }

                    // Sliders
                    if (typeof data.weirdness === 'number') {
                        const slider = document.querySelector('input[type="range"][aria-label*="Weird" i]');
                        if (slider) setNativeValue(slider, data.weirdness);
                    }
                    if (typeof data.styleInfluence === 'number') {
                        const slider = document.querySelector('input[type="range"][aria-label*="Style" i]');
                        if (slider) setNativeValue(slider, data.styleInfluence);
                    }
                    if (typeof data.audioInfluence === 'number') {
                        const slider = document.querySelector('input[type="range"][aria-label*="Audio" i]');
                        if (slider) setNativeValue(slider, data.audioInfluence);
                    }

                    // URL hash をクリア（再実行防止）
                    history.replaceState(null, '', window.location.pathname + window.location.search);
                    console.log('[Suno AutoFill] Done');
                    executed = true;
                }, 800);
            }, 1000);

            return true;
        } catch (e) {
            console.error('[Suno AutoFill] Error:', e);
            return false;
        }
    }

    function tryFill(retryCount = 0) {
        if (executed) return;
        if (retryCount >= 15) {
            console.warn('[Suno AutoFill] Gave up after 15 retries');
            return;
        }
        if (!fillFields()) setTimeout(() => tryFill(retryCount + 1), 500);
    }

    // ページ読み込み完了後に実行
    if (document.readyState === 'complete') {
        setTimeout(tryFill, 2000);
    } else {
        window.addEventListener('load', () => setTimeout(tryFill, 2000));
    }

    // URL hash が変わったら再実行
    window.addEventListener('hashchange', () => {
        executed = false;
        setTimeout(tryFill, 1500);
    });
})();
