(function (win, lib, designWidth) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var designWidth = designWidth || 750;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var appVersion = win.navigator.appVersion;
    var dpr = 0;
    var scale = 0;
    var tid = null;
    var flexible = lib.flexible || (lib.flexible = {});
    if (metaEl) {
        console.warn('用已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }
    if (!dpr && !scale) {
        dpr = appVersion.match(/iphone/gi) ? win.devicePixelRatio : 1;
        scale = 1 / dpr;
    }
    docEl.setAttribute('data-dpr', dpr);

    function setRem() {
        var width = docEl.getBoundingClientRect().width;
        if (appVersion.match(/window|ipad|Macintosh/gi)) {
            width = width > designWidth ? designWidth : width;
        }
        return ((width * 100) / designWidth).toFixed(4);
    }
    function refreshRem() {
        var rem = setRem();
        flexible.rem = win.rem = rem;
        docEl.style.fontSize = rem + 'px';
        // var realFz = parseFloat(win.getComputedStyle(docEl, null).fontSize).toFixed(4);
        // if (rem != realFz) {
        //     docEl.style.fontSize = rem * (rem / realFz) + 'px';
        // }
    }
    function setScale(scale) {
        var scale = scale || '1.0';
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute(
            'content',
            'initial-scale=' + scale + ', maximum-scale=' +
            scale + ', minimum-scale=' + scale + ', user-scalable=no'
        );
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }
    function setBodySize(dpr) {
        var dpr = dpr || 1;
        if (doc.readyState === 'complete') {
            doc.body.style.fontSize = 12 * dpr + 'px';
        } else {
            doc.addEventListener(
                'DOMContentLoaded',
                function (e) {
                    doc.body.style.fontSize = 12 * dpr + 'px';
                },
                false
            );
        }
    }
    //除了QQ其他用样式处理
    if (/\sQQ\//i.test(win.navigator.userAgent)) {
        win.addEventListener(
            'resize',
            function () {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            },
            false
        );
        win.addEventListener(
            'pageshow',
            function (e) {
                if (e.persisted) {
                    clearTimeout(tid);
                    tid = setTimeout(refreshRem, 300);
                }
            },
            false
        );
        if (!metaEl) {
            setScale(scale);
        }
        refreshRem();
        setBodySize(dpr);
    } else {
        if (!metaEl) {
            setScale('1.0');
        }
        setBodySize();
    }
    flexible.rem = win.rem = setRem();
    flexible.dpr = win.dpr = dpr;
    flexible.setRem = refreshRem;
    flexible.rem2px = function (d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    };
    flexible.px2rem = function (d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    };
})(window, window['lib'] || (window['lib'] = {}));
