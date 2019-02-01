/*
 * @Author: omtech.cn
 * @Date: 2018-09-04 14:14:05
 * @LastEditors: Doris
 * @LastEditTime: 2018-09-04 14:14:05
 * @Description: 
 */


function playerShow(url) {
    var flashvars = {
    f        : url,
    c        : 0,
    p        : 0,
    e        : 1,
    v        : 100,
    my_url   : encodeURIComponent(window.location.href),
    my_title : encodeURIComponent(document.title)
    };
    var params = {bgcolor:'#000', allowFullScreen:true, allowScriptAccess:'always', wmode:'transparent'};
    var video = [url + '->video/mp4'];
    CKobject.embed('http://10.100.44.134/statics/ckplayer/ckplayer.swf', 'player', 'video_player', 600, 450, false, flashvars, video, params);
}

var box = new LightBox();
//关灯
function closelights() {
    box.Show();
    CKobject._K_('player').style.width = '600px';
    CKobject._K_('player').style.height = '450px';
    CKobject.getObjectById('video_player').width = 600;
    CKobject.getObjectById('video_player').height = 450;

    document.getElementById('player').style.zIndex = 102;
}
//开灯
function openlights() {
    box.Close();
    CKobject._K_('player').style.width = '600px';
    CKobject._K_('player').style.height = '450px';
    CKobject.getObjectById('video_player').width = 600;
    CKobject.getObjectById('video_player').height = 450;

    document.getElementById('player').style.zIndex = 1;
}