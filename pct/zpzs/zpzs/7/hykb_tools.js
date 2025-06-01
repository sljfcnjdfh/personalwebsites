var hykb_tools = {
    ua: window.navigator.userAgent,
    is_yuanshen_tool: false, /* ԭ���ͼ���������� */
    is_strategy_tool: false, /* ����վ������ */
    is_android_kb: false, /* ��׿���ο챬�챬 */
    is_ios_kb: false, /* IOS���ο챬�챬 */
    is_kb: false, /* ���ο챬 */
    is_android: false, /* ��׿����� */
    is_ios: false, /* IOS����� */
    is_wechat: false, /* ΢������� */
    is_qq: false, /* QQ����� */
    init: function () { /* ��ʼ�� */
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
    is_login: function () { /* �Ƿ��¼���ο챬 */
        return typeof window.userInterface == 'object' && typeof window.userInterface.isLogin == 'function' && window.userInterface.isLogin();
    },
    get_user_info: function () { /* ��ȡ�챬�û���Ϣ */
        var userInfo = {};
        if (this.is_login()) {
            var userInfo = window.userInterface.getUserInfo();
            userInfo = JSON.parse(userInfo);
        }
        return userInfo;
    },
    get_scookie: function () { /* ��ȡ�챬scookie��Ϣ */
        var scookie = '';
        var userInfo = this.get_user_info();
        if (userInfo) {
            scookie = userInfo.scookie;
        }
        return scookie;
    },
    wap_share: function (opt) { /* �챬�ⲿ��������� */
        var conf = {
            'share_btn_id': '#share_btn',
            'share_title': '�������',
            'share_desc': '��������',
            'share_img': 'https://img.71acg.net/kbyx~sykb/20201026/19493669887',
            'share_type': 'all',
            'share_url': window.location.href,
            'callback': null
        }

        conf = $.extend({}, conf, opt);
        conf.share_url = this.get_share_url(conf.share_url);

        var $share_btn = $(conf.share_btn_id);
        if ($share_btn.length) {
            if (typeof window.activityInterface == 'object' && typeof window.activityInterface.wapShare == 'function') { //�챬�ڲ�
                $share_btn.click(function () {
                    if (conf.share_url.indexOf('?') == -1) { //����챬�ڲ�QQ����url�޷����ʵ�����
                        conf.share_url += '?from=hykb';
                    }
                    window.activityInterface.wapShare(conf.share_img, conf.share_url, conf.share_title, conf.share_desc, conf.share_type, conf.callback);
                    return false;
                });
            } else { //�챬�ⲿ
                $share_btn.attr('data-role', 'share');
                $share_btn.attr('data-share-url', conf.share_url);
                $share_btn.attr('data-share-img', conf.share_img);
                $share_btn.attr('data-share-title', conf.share_title);
                $share_btn.attr('data-share-description', conf.share_desc);
                document.write('<script type="text/javascript" src="https://newsimg.5054399.com/etweixin/v2/js/jshare_e1.js"><\/script>');
            }
        }
    },
    new_wap_share: function (opt) { /* �°���� */
        var conf = {
            'share_btn_id': '#share_btn',
            'share_guide_txt': '', //�����İ�
            'share_title': '�������',
            'share_desc': '��������',
            'share_img': 'https://img.71acg.net/kbyx~sykb/20201026/19493669887',
            'share_url': window.location.href
        }

        conf = $.extend({}, conf, opt);
        conf.share_url = this.get_share_url(conf.share_url);

        var $share_btn = $(conf.share_btn_id);
        if ($share_btn.length) {
            if (typeof window.activityInterface == 'object' && typeof window.activityInterface.wapShare == 'function') { //�챬�ڲ�
                $share_btn.click(function () {
                    if ($('.mod-pop-share').length == 0) {
                        var str = '' +
                            '<div class="tool-comm-share">' +
                            '    <div class="mod-pop-share">' +
                            '        <a class="mod-pop-hide" href="#">�ر�</a>' +
                            '        <div class="pcon">' +
                            '            <div class="txt1"><span>������ú��ã��ǵ÷�������ѣ�һ����ʹ�ðɣ�</span></div>' +
                            (conf.share_guide_txt ? '<div class="mt20 tac">' + conf.share_guide_txt + '</div>' : '') +
                            '            <ul class="shareitem">' +
                            '                <li><span class="qq" data-type="qq"></span>QQ����</li>' +
                            '                <li><span class="wx" data-type="weixin"></span>΢�ź���</li>' +
                            '                <li><span class="kj" data-type="qzone"></span>QQ�ռ�</li>' +
                            '                <li><span class="quan" data-type="pengyouquan"></span>����Ȧ</li>' +
                            '                <li><span class="wb" data-type="weibo"></span>����΢��</li>' +
                            '                <li><span class="fz" data-type="copyurl"></span>����</li>' +
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

                if (conf.share_url.indexOf('?') == -1) { //����챬�ڲ�QQ����url�޷����ʵ�����
                    conf.share_url += '?from=hykb';
                }

                //�رշ���
                $(document).on('click', '.mod-pop-hide, .tool-comm-share .mask', function () {
                    $(".mod-pop-share").hide();
                    $('.tool-comm-share .mask').hide();
                    return false;
                });

                //�������
                $(document).on('click', '.mod-pop-share .shareitem li', function () {
                    var share_type = $(this).find('span').data('type');
                    if (share_type == 'copyurl') { //����IOS�챬��������bug�����ô˷���
                        window.activityInterface.copyContentToClipboard(conf.share_url);
                    } else {
                        window.activityInterface.wapShare(conf.share_img, conf.share_url, conf.share_title, conf.share_desc, share_type, null);
                    }
                    return false;
                });
            } else { //�챬�ⲿ
                $share_btn.attr('data-role', 'share');
                $share_btn.attr('data-share-url', conf.share_url);
                $share_btn.attr('data-share-img', conf.share_img);
                $share_btn.attr('data-share-title', conf.share_title);
                $share_btn.attr('data-share-description', conf.share_desc);
                document.write('<script type="text/javascript" src="https://newsimg.5054399.com/etweixin/v2/js/jshare_e1.js"><\/script>');
            }
        }
    },
    big_data_report: function (tool_id) { /* �������ϱ� */
        if (typeof window.activityInterface == 'object' && typeof window.activityInterface.bigDataReport == 'function') {
            window.activityInterface.bigDataReport('enter_tooldetail', '', '', '', '', '', '', '��������ҳ', '', '��������ҳ-���-' + tool_id, 1);
        }
    },
    open_floating_btn: function (title) { /* �������� */
        if (typeof window.activityInterface == 'object' && typeof window.activityInterface.openFloatingBtn == 'function') {
            var url = 'strategytool://open?url=' + encodeURIComponent(window.location.href) + '&gj_title=' + title;
            window.activityInterface.openFloatingBtn(url);
        }
    },
    get_share_url: function (url) { /* ��ȡ�챬�ⲿ�����ַ */
        return url.replace(/www\.onebiji\.com/, 'www.guoping123.com');
    },
    get_strategy_float_url: function (url) { /* ��ȡ����վ��������ַ */
        return url.replace('m.3839.com/baoliao', 'm.3839.com/kuaibao') + '?1';
    },
    check_url: function (url) { /* ���챬�ⲿ��ַ */
        return /\/\/[a-z0-9\.]*(3839|onebiji|yxhhdl|guoping123)\.com/i.test(url);
    },
    check_mobile: function (mobile) { /* ����ֻ��� */
        return /^1([3-9])\d{9}$/.test(mobile);
    }
};

hykb_tools.init();

//���䲻ͬ���͵�������ת���챬ԭ��ҳ
(function () {
    if (hykb_tools.is_kb) {
        $(document).on('click', 'a[data-type]', function () {
            if (typeof window.activityInterface == 'object') {
                var _this = $(this),
                    type = _this.data('type'),
                    id = _this.data('id') || '',
                    href = _this.attr('href') || '';

                if (id) { //�����׿�Ͱ汾������ת�ɿ�ѧ������
                    id = id.toString();
                }

                if (type == 'arc') { //����ҳ
                    window.activityInterface.toArticleDetail(id, "");
                    return false;
                } else if (type == 'list') { //�����б�ҳ
                    if (_this.data('ext')) { //ͼ������߹ؿ�
                        window.activityInterface.toArticleSortList(id, "", 0 | _this.data('ext'));
                    } else { //��ͨ�б�
                        window.activityInterface.toArticleList(id, "");
                    }
                    return false;
                } else if (type == 'video') { //��Ƶ����ҳ
                    window.activityInterface.toVideoDetail(id, "");
                    return false;
                } else if (type == 'video_list') { //��Ƶ�б�ҳ
                    var tid = _this.data('tid') || '';
                    window.activityInterface.toVideoSortList(id, "", tid.toString());
                    return false;
                } else if (type == 'game') { //��Ϸ����ҳ
                    window.activityInterface.toGameDetail(id, "");
                    return false;
                } else if (type == 'yunwan_game') { //������Ϸ����ҳ
                    window.activityInterface.toYunWanGameDetail(id);
                    return false;
                } else if (type == 'kuaiwan_game') { //������Ϸ����ҳ
                    window.activityInterface.toKuaiWanGameDetail(id);
                    return false;
                } else if (type == 'person') { //������ҳ
                    window.activityInterface.toPersonCenter(id);
                    return false;
                } else if (type == 'tool' || type == 'hd') {
                    var share_data = {};
                    share_data['title'] = _this.data('title');
                    share_data['icon'] = _this.data('icon');
                    share_data['link'] = _this.data('link');
                    share_data['desc'] = _this.data('desc');
                    var json_str = JSON.stringify(share_data);
                    if (type == 'tool') { //��������ҳ
                        window.activityInterface.toToolDetailWaps(href, "", json_str);
                    } else { //�ҳ
                        window.activityInterface.toActivityWaps(href, "", json_str);
                    }
                    return false;
                } else if (type == 'search') { //������ҳ
                    var forum_id = $(this).data('forum_id');
                    if (forum_id && typeof window.activityInterface.toSearchPostWithForumId == 'function') { //����������
                        window.activityInterface.toSearchPostWithForumId('', forum_id.toString());
                    } else if (typeof window.activityInterface.toSearchNewsAndVideo == 'function') { //ֻ���������º���Ƶ
                        window.activityInterface.toSearchNewsAndVideo('', 0);
                    } else { //ֻ��������Ϸ���û�
                        window.activityInterface.toMainSearch();
                    }
                    return false;
                } else if (type == 'tool_list') { //�������б�ҳ
                    window.activityInterface.toToolsList();
                    return false;
                } else if (type == 'forum_list') { //��̳�б�ҳ
                    var theme_id = _this.data('theme_id');
                    if (theme_id && typeof window.activityInterface.toForumPostListByTheme == 'function') { //����id������������б��ҳ��(v1.5.6.6������ʹ��)
                        window.activityInterface.toForumPostListByTheme(id, theme_id.toString());
                    } else if (typeof window.activityInterface.toForumDetail == 'function') {
                        var pname = _this.data('pname') || '',
                            cname = _this.data('cname') || '';
                        if ((hykb_tools.is_android_kb && window.activityInterface.getVersionCode() > 214) || hykb_tools.is_ios_kb) { //��׿�챬��v1.5.4.9�汾��ʼ��ios�챬����汾
                            window.activityInterface.toForumDetail(id, pname, cname);
                        } else {
                            window.activityInterface.toForumDetail(id);
                        }
                    }
                    return false;
                } else if (type == 'forum_detail') { //��������ҳ
                    if (typeof window.activityInterface.toForumPostDetail == 'function') {
                        window.activityInterface.toForumPostDetail(id);
                    }
                    return false;
                } else if (type == 'video_full') { //������Ƶ��ȫ�����ţ�
                    var url = _this.data('url') || '';
                    window.activityInterface.openVideoFullScreen();
                    return false;
                } else if (type == 'wap') { //����wapҳ��
                    var title = _this.data('title') || '';
                    window.activityInterface.toActivityWaps(href, title, '');
                    return false;
                } else if (type == 'reply_detail') { //����
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