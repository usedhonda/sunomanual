// ==UserScript==
// @name         Suno AutoFill (sunomanual)
// @namespace    https://github.com/usedhonda/sunomanual
// @version      2.0.0
// @description  URL hash + clipboard 経由で Suno の Style / Lyrics / Exclude / Sliders を自動入力する
// @match        https://suno.com/*
// @match        https://suno.ai/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

// -----------------------------------------------------------------
// 使い方:
//
// 【クリップボードモード（推奨）】
//   1. JSON データをクリップボードにコピー（pbcopy 等）
//   2. https://suno.com/create#suno=clip をブラウザで開く
//   3. クリップボードから読み取って自動入力
//   ※ 日本語歌詞はURLエンコードで膨張するため、こちらが標準
//
// 【直接ハッシュモード（短いデータ用）】
//   https://suno.com/create#suno={encodeURIComponent(JSON データ)}
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
// Claude Code の /suno スキルが自動で URL を構築して
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

    // textarea / input を柔軟に探す
    function findField(selectors) {
        for (const sel of selectors) {
            const el = document.querySelector(sel);
            if (el) return el;
        }
        return null;
    }

    function findTextareaByLabel(labelText) {
        // aria-label で探す
        let el = document.querySelector('textarea[aria-label*="' + labelText + '" i]');
        if (el) return el;
        // ラベルテキストから親をたどる
        const labels = [...document.querySelectorAll('label, span, div')].filter(l =>
            l.textContent?.toLowerCase().includes(labelText.toLowerCase()) &&
            !l.querySelector('textarea') && l.textContent.length < 50
        );
        for (const label of labels) {
            el = label.closest('div')?.querySelector('textarea');
            if (el) return el;
        }
        return null;
    }

    async function getData() {
        const hash = window.location.hash;
        if (!hash.startsWith('#suno=')) return null;

        const payload = hash.substring(6);

        // クリップボードモード
        if (payload === 'clip') {
            try {
                const text = await navigator.clipboard.readText();
                return JSON.parse(text);
            } catch (e) {
                console.error('[Suno AutoFill] Clipboard read failed:', e);
                return null;
            }
        }

        // 直接ハッシュモード
        try {
            return JSON.parse(decodeURIComponent(payload));
        } catch (e) {
            console.error('[Suno AutoFill] Hash parse failed:', e);
            return null;
        }
    }

    async function fillFields() {
        if (executed) return false;

        const data = await getData();
        if (!data) return false;

        try {
            // Lyrics
            if (data.lyrics) {
                const lyricsTA = findField([
                    'textarea[aria-label*="lyrics" i]',
                    'textarea[placeholder*="lyrics" i]',
                    'textarea[placeholder*="write your" i]',
                ]) || (() => {
                    // フォールバック: 最も大きい textarea
                    const all = [...document.querySelectorAll('textarea')];
                    return all.sort((a, b) => b.offsetHeight - a.offsetHeight)[0];
                })();
                if (lyricsTA) setNativeValue(lyricsTA, data.lyrics);
            }

            // Style
            if (data.styleAndFeel) {
                const styleTA = findTextareaByLabel('style') || findField([
                    'textarea[aria-label*="style" i]',
                    'textarea[placeholder*="style" i]',
                ]);
                if (styleTA) setNativeValue(styleTA, data.styleAndFeel);
            }

            // Song Title
            if (data.songName) {
                const titleInput = findField([
                    'input[aria-label*="title" i]',
                    'input[placeholder*="Title" i]',
                    'input[placeholder*="Song" i]',
                ]);
                if (titleInput) setNativeValue(titleInput, data.songName);
            }

            // Exclude Styles (input[type="text"] in current UI)
            if (data.excludeStyles) {
                const excludeInput = findField([
                    'input[placeholder*="Exclude" i]',
                    'input[aria-label*="exclude" i]',
                    'input[aria-label*="Exclude" i]',
                ]);
                if (excludeInput) setNativeValue(excludeInput, data.excludeStyles);
            }

            // Vocal Gender
            if (data.vocalGender) {
                const genderBtn = findButtonByText(data.vocalGender, true);
                if (genderBtn) genderBtn.click();
            }

            // Sliders
            if (typeof data.weirdness === 'number') {
                const slider = findField([
                    'input[type="range"][aria-label*="Weird" i]',
                    'input[type="range"][aria-label*="weird" i]',
                ]);
                if (slider) setNativeValue(slider, data.weirdness);
            }
            if (typeof data.styleInfluence === 'number') {
                const slider = findField([
                    'input[type="range"][aria-label*="Style" i]',
                ]);
                if (slider) setNativeValue(slider, data.styleInfluence);
            }
            if (typeof data.audioInfluence === 'number') {
                const slider = findField([
                    'input[type="range"][aria-label*="Audio" i]',
                ]);
                if (slider) setNativeValue(slider, data.audioInfluence);
            }

            // URL hash をクリア（再実行防止）
            history.replaceState(null, '', window.location.pathname + window.location.search);
            console.log('[Suno AutoFill] Done');
            executed = true;
            return true;
        } catch (e) {
            console.error('[Suno AutoFill] Error:', e);
            return false;
        }
    }

    async function tryFill(retryCount = 0) {
        if (executed) return;
        if (retryCount >= 15) {
            console.warn('[Suno AutoFill] Gave up after 15 retries');
            return;
        }
        const ok = await fillFields();
        if (!ok) setTimeout(() => tryFill(retryCount + 1), 500);
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
