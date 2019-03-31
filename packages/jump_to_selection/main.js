'use strict';

module.exports = {
    load() {
        // 当 package 被正确加载的时候执行
        Editor.log('package loaded');
        this.m_lastTime = 0;
    },

    unload() {
        // 当 package 被正确卸载的时候执行
    },

//  selection:selected
    messages: {
        "say-hello"() {

        },
        'selection:changed'() {
            Editor.Ipc.sendToPanel("hierarchy", "change-filter", "");
            setTimeout(function () {
                var node = Editor.Selection.curActivate("node");
                if (!node || node.length == 0) {
                    return;
                }
                var curTime = new Date().getTime();
                if (curTime - this.m_lastTime < 1000) {
                    return;
                }
                this.m_lastTime = curTime;
                Editor.Selection.select("node", node, true, true);
                //Editor.Ipc.sendToPanel("hierarchy","selection:selected",[node]);
            }.bind(this), 300);
        }
    },
};