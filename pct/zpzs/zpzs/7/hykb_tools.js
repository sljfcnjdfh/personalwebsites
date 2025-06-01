var hykb_tools = {
    ua: window.navigator.userAgent,
    is_yuanshen_tool: false, /* 原神地图工具悬浮窗 */
    is_strategy_tool: false, /* 攻略站悬浮窗 */
    is_android_kb: false, /* 安卓好游快爆快爆 */
    is_ios_kb: false, /* IOS好游快爆快爆 */
    is_kb: false, /* 好游快爆 */
    is_android: false, /* 安卓浏览器 */
    is_ios: false, /* IOS浏览器 */
    is_wechat: false, /* 微信浏览器 */
    is_qq: false, /* QQ浏览器 */
    init: function () { /* 初始化 */
        this.is_yuanshen_tool = /@4399_sykb_android_activity@;yuanshen_tool/i.test(this.ua);
        this.is_strategy_tool = /@yuanshen_tool/i.test(this.ua);
        this.is_android_kb = /@4399_sykb_android_activity@/i.test(this.ua) && !this.is_yuanshen_tool;
        this.is_ios_kb = /Ioskb/i.test(this.ua);
        this.is_kb = this.is_android_kb || this.is_ios_kb;
        this.is_android = /Android/i.test(this.ua);
        this.is_ios = /iphone|ipad|ipod/i.test(this.ua);
        this.is_wechat = /MicroMessenger/i.test(this.ua);
        this.is_qq = /qq/i.test(this.ua);
    },
    is_login: function () { /* 是否登录好游快爆 */
        return typeof window.userInterface == 'object' && typeof window.userInterface.isLogin == 'function' && window.userInterface.isLogin();
    },
    get_user_info: function () { /* 获取快爆用户信息 */
        var userInfo = {};
        if (this.is_login()) {
            var userInfo = window.userInterface.getUserInfo();
            userInfo = JSON.parse(userInfo);
        }
        return userInfo;
    },
    get_scookie: function () { /* 获取快爆scookie信息 */
        var scookie = '';
        var userInfo = this.get_user_info();
        if (userInfo) {
            scookie = userInfo.scookie;
        }
        return scookie;
    },
    wap_share: function (opt) { /* 快爆外部浏览器分享 */
        var conf = {
            'share_btn_id': '#share_btn',
            'share_title': '分享标题',
            'share_desc': '分享描述',
            'share_img': 'https://img.71acg.net/kbyx~sykb/20201026/19493669887',
            'share_type': 'all',
            'share_url': window.location.href,
            'callback': null
        }

        conf = $.extend({}, conf, opt);
        conf.share_url = this.get_share_url(conf.share_url);

        var $share_btn = $(conf.share_btn_id);
        if ($share_btn.length) {
            if (typeof window.activityInterface == 'object' && typeof window.activityInterface.wapShare == 'function') { //快爆内部
                $share_btn.click(function () {
                    if (conf.share_url.indexOf('?') == -1) { //解决快爆内部QQ分享url无法访问的问题
                        conf.share_url += '?from=hykb';
                    }
                    window.activityInterface.wapShare(conf.share_img, conf.share_url, conf.share_title, conf.share_desc, conf.share_type, conf.callback);
                    return false;
                });
            } else { //快爆外部
                $share_btn.attr('data-role', 'share');
                $share_btn.attr('data-share-url', conf.share_url);
                $share_btn.attr('data-share-img', conf.share_img);
                $share_btn.attr('data-share-title', conf.share_title);
                $share_btn.attr('data-share-description', conf.share_desc);
                document.write('<script type="text/javascript" src="https://newsimg.5054399.com/etweixin/v2/js/jshare_e1.js"><\/script>');
            }
        }
    },
    new_wap_share: function (opt) { /* 新版分享 */
        var conf = {
            'share_btn_id': '#share_btn',
            'share_guide_txt': '', //引导文案
            'share_title': '分享标题',
            'share_desc': '分享描述',
            'share_img': 'https://img.71acg.net/kbyx~sykb/20201026/19493669887',
            'share_url': window.location.href
        }

        conf = $.extend({}, conf, opt);
        conf.share_url = this.get_share_url(conf.share_url);

        var $share_btn = $(conf.share_btn_id);
        if ($share_btn.length) {
            if (typeof window.activityInterface == 'object' && typeof window.activityInterface.wapShare == 'function') { //快爆内部
                $share_btn.click(function () {
                    if ($('.mod-pop-share').length == 0) {
                        var str = '' +
                            '<div class="tool-comm-share">' +
                            '    <div class="mod-pop-share">' +
                            '        <a class="mod-pop-hide" href="#">关闭</a>' +
                            '        <div class="pcon">' +
                            '            <div class="txt1"><span>如果觉得好用，记得分享给好友，一起来使用吧！</span></div>' +
                            (conf.share_guide_txt ? '<div class="mt20 tac">' + conf.share_guide_txt + '</div>' : '') +
                            '            <ul class="shareitem">' +
                            '                <li><span class="qq" data-type="qq"></span>QQ好友</li>' +
                            '                <li><span class="wx" data-type="weixin"></span>微信好友</li>' +
                            '                <li><span class="kj" data-type="qzone"></span>QQ空间</li>' +
                            '                <li><span class="quan" data-type="pengyouquan"></span>朋友圈</li>' +
                            '                <li><span class="wb" data-type="weibo"></span>新浪微博</li>' +
                            '                <li><span class="fz" data-type="copyurl"></span>复制</li>' +
                            '            </ul>' +
                            '        </div>' +
                            '    </div>' +
                            '    <div class="mask"></div>' +
                            '</div>';

                        $('head').append('<link href="//newsimg.5054399.com/static/hykbTool/share/css/style.css?v1" type="text/css" rel="stylesheet">');
                        $('body').append(str);
                    } else {
                        $('.mod-pop-share').show();
                        $('.tool-comm-share .mask').show();
                    }
                    return false;
                });

                if (conf.share_url.indexOf('?') == -1) { //解决快爆内部QQ分享url无法访问的问题
                    conf.share_url += '?from=hykb';
                }

                //关闭分享
                $(document).on('click', '.mod-pop-hide, .tool-comm-share .mask', function () {
                    $(".mod-pop-share").hide();
                    $('.tool-comm-share .mask').hide();
                    return false;
                });

                //点击分享
                $(document).on('click', '.mod-pop-share .shareitem li', function () {
                    var share_type = $(this).find('span').data('type');
                    if (share_type == 'copyurl') { //由于IOS快爆分享复制有bug，故用此方法
                        window.activityInterface.copyContentToClipboard(conf.share_url);
                    } else {
                        window.activityInterface.wapShare(conf.share_img, conf.share_url, conf.share_title, conf.share_desc, share_type, null);
                    }
                    return false;
                });
            } else { //快爆外部
                $share_btn.attr('data-role', 'share');
                $share_btn.attr('data-share-url', conf.share_url);
                $share_btn.attr('data-share-img', conf.share_img);
                $share_btn.attr('data-share-title', conf.share_title);
                $share_btn.attr('data-share-description', conf.share_desc);
                document.write('<script type="text/javascript" src="https://newsimg.5054399.com/etweixin/v2/js/jshare_e1.js"><\/script>');
            }
        }
    },
    big_data_report: function (tool_id) { /* 大数据上报 */
        if (typeof window.activityInterface == 'object' && typeof window.activityInterface.bigDataReport == 'function') {
            window.activityInterface.bigDataReport('enter_tooldetail', '', '', '', '', '', '', '工具详情页', '', '工具详情页-浏览-' + tool_id, 1);
        }
    },
    open_floating_btn: function (title) { /* 打开悬浮窗 */
        if (typeof window.activityInterface == 'object' && typeof window.activityInterface.openFloatingBtn == 'function') {
            var url = 'strategytool://open?url=' + encodeURIComponent(window.location.href) + '&gj_title=' + title;
            window.activityInterface.openFloatingBtn(url);
        }
    },
    get_share_url: function (url) { /* 获取快爆外部分享地址 */
        return url.replace(/www\.onebiji\.com/, 'www.guoping123.com');
    },
    get_strategy_float_url: function (url) { /* 获取攻略站悬浮窗地址 */
        return url.replace('m.3839.com/baoliao', 'm.3839.com/kuaibao') + '?1';
    },
    check_url: function (url) { /* 检查快爆外部地址 */
        return /\/\/[a-z0-9\.]*(3839|onebiji|yxhhdl|guoping123)\.com/i.test(url);
    },
    check_mobile: function (mobile) { /* 检查手机号 */
        return /^1([3-9])\d{9}$/.test(mobile);
    }
};

hykb_tools.init();

//适配不同类型的链接跳转到快爆原生页
(function () {
    if (hykb_tools.is_kb) {
        $(document).on('click', 'a[data-type]', function () {
            if (typeof window.activityInterface == 'object') {
                var _this = $(this),
                    type = _this.data('type'),
                    id = _this.data('id') || '',
                    href = _this.attr('href') || '';

                if (id) { //解决安卓低版本将数字转成科学计数法
                    id = id.toString();
                }

                if (type == 'arc') { //文章页
                    window.activityInterface.toArticleDetail(id, "");
                    return false;
                } else if (type == 'list') { //文章列表页
                    if (_this.data('ext')) { //图鉴类或者关卡
                        window.activityInterface.toArticleSortList(id, "", 0 | _this.data('ext'));
                    } else { //普通列表
                        window.activityInterface.toArticleList(id, "");
                    }
                    return false;
                } else if (type == 'video') { //视频播放页
                    window.activityInterface.toVideoDetail(id, "");
                    return false;
                } else if (type == 'video_list') { //视频列表页
                    var tid = _this.data('tid') || '';
                    window.activityInterface.toVideoSortList(id, "", tid.toString());
                    return false;
                } else if (type == 'game') { //游戏详情页
                    window.activityInterface.toGameDetail(id, "");
                    return false;
                } else if (type == 'yunwan_game') { //云玩游戏详情页
                    window.activityInterface.toYunWanGameDetail(id);
                    return false;
                } else if (type == 'kuaiwan_game') { //快玩游戏详情页
                    window.activityInterface.toKuaiWanGameDetail(id);
                    return false;
                } else if (type == 'person') { //个人主页
                    window.activityInterface.toPersonCenter(id);
                    return false;
                } else if (type == 'tool' || type == 'hd') {
                    var share_data = {};
                    share_data['title'] = _this.data('title');
                    share_data['icon'] = _this.data('icon');
                    share_data['link'] = _this.data('link');
                    share_data['desc'] = _this.data('desc');
                    var json_str = JSON.stringify(share_data);
                    if (type == 'tool') { //工具详情页
                        window.activityInterface.toToolDetailWaps(href, "", json_str);
                    } else { //活动页
                        window.activityInterface.toActivityWaps(href, "", json_str);
                    }
                    return false;
                } else if (type == 'search') { //打开搜索页
                    var forum_id = $(this).data('forum_id');
                    if (forum_id && typeof window.activityInterface.toSearchPostWithForumId == 'function') { //纯搜索帖子
                        window.activityInterface.toSearchPostWithForumId('', forum_id.toString());
                    } else if (typeof window.activityInterface.toSearchNewsAndVideo == 'function') { //只能搜索文章和视频
                        window.activityInterface.toSearchNewsAndVideo('', 0);
                    } else { //只能搜索游戏和用户
                        window.activityInterface.toMainSearch();
                    }
                    return false;
                } else if (type == 'tool_list') { //工具箱列表页
                    window.activityInterface.toToolsList();
                    return false;
                } else if (type == 'forum_list') { //论坛列表页
                    var theme_id = _this.data('theme_id');
                    if (theme_id && typeof window.activityInterface.toForumPostListByTheme == 'function') { //主题id到具体的帖子列表的页面(v1.5.6.6及以上使用)
                        window.activityInterface.toForumPostListByTheme(id, theme_id.toString());
                    } else if (typeof window.activityInterface.toForumDetail == 'function') {
                        var pname = _this.data('pname') || '',
                            cname = _this.data('cname') || '';
                        if ((hykb_tools.is_android_kb && window.activityInterface.getVersionCode() > 214) || hykb_tools.is_ios_kb) { //安卓快爆从v1.5.4.9版本开始，ios快爆任意版本
                            window.activityInterface.toForumDetail(id, pname, cname);
                        } else {
                            window.activityInterface.toForumDetail(id);
                        }
                    }
                    return false;
                } else if (type == 'forum_detail') { //帖子详情页
                    if (typeof window.activityInterface.toForumPostDetail == 'function') {
                        window.activityInterface.toForumPostDetail(id);
                    }
                    return false;
                } else if (type == 'video_full') { //播放视频（全屏播放）
                    var url = _this.data('url') || '';
                    window.activityInterface.openVideoFullScreen();
                    return false;
                } else if (type == 'wap') { //任意wap页面
                    var title = _this.data('title') || '';
                    window.activityInterface.toActivityWaps(href, title, '');
                    return false;
                } else if (type == 'reply_detail') { //评价
                    if (typeof window.activityInterface.toReplyDetailActity == 'function') {
                        var pid = _this.data('pid'),
                            fid = _this.data('fid'),
                            cid = _this.data('cid');
                        window.activityInterface.toReplyDetailActity(pid, fid, cid);
                    }
                    return false;
                }
            }
        });
    }
})();