/**
 * @author: yunfour
 * @email: yunfour@163.com
 * @version: 0.0.1
 * @description: 一个模拟控制进度的组件——在前端开发中，很多异步的东西是没有实时状态的，因此针对于这些操作我们是无法获取其实时的进度的，比如：ajax请求，但是为了满足视觉上的需求，在进行这些操作是需要给用户展示进度，基于前述中的矛盾，我们只能去模拟，当然这种模拟并非其真正的进度，只是模拟展示给用户。
 */

var createClass = require('createClass/0.0.1/createClass'),
    PubSub      = require('pubSub/0.0.1/pubSub');

var Progress = createClass({
    
    superClass: PubSub,
    
    init: function() {
        this.setAttr('percent', 0);
    },
    
    methods: {
        
        start: function() {
            
            var that         = this,
                interval     = that.getAttr('interval'),
                timeout      = 10,
                cumulateTime = 0;
            
            var finishPercent = 100;
            
            
            clearInterval(interval);
            
            interval = setInterval(function() {
                
                var percent  = that.getAttr('percent'),
                    finished = that.getAttr('finished', true);
                
                if(finished) {
                    
                    if(percent < 60) {
                        percent += 8;
                    } else if(percent < 70) {
                        percent += 7;
                    } else if(percent < 80) {
                        percent += 4;
                    } else if(percent < 90) {
                        percent += 3;
                    } else {
                        percent += 0.5;
                    }
                } else if(percent < 17) {
                    percent += 0.6;
                } else if(percent >= 17 && percent < 27) {
                    percent += 0.4;
                } else if(percent >= 27 && percent < 37) {
                    percent += 0.2;
                } else if(percent >= 37 && percent < 47) {
                    percent += 0.1;
                } else if(percent >= 47 && percent < 57) {
                    percent += 0.08;
                } else if(percent >= 57 && percent < 67) {
                    percent += 0.05;
                } else if(percent >= 67 && percent < 77) {
                    percent += 0.04;
                } else if(percent >= 77 && percent < 87) {
                    percent += 0.1;
                } else if(percent >= 87 && percent < 93) {
                    percent += 0.01;
                } else if(percent >= 93 && percent < 95) {
                    percent += 0.005;
                }
                
                if(percent >= finishPercent) {
                    
                    percent = finishPercent;
                    
                    clearInterval(interval);
                    
                    if(percent === 100) {
                        
                        that.trigger('finish');
                    } else {
                        
                        that.trigger('toProgressFinish');
                    }
                }
                
                cumulateTime += timeout;
                
                that.setAttr({
                    'percent': percent,
                    'cumulateTime': cumulateTime
                });
                
                that.trigger('progress', percent);
            }, timeout);
            
            that.setAttr('interval', interval);
            
            return this;
        },
        
        finish: function() {
            
            var that = this;
        
            that.setAttr('finished', true);
            that.start();
            
            return that;
        },
        
        pause: function() {
            
            var that     = this,
                interval = that.getAttr('interval');
            
            clearInterval(interval);
            
            that.trigger('pause');
            
            return that;
        },
        
        stop: function() {
            
            var that = this;
            
            that.setAttr({
                percent     : 0,
                finished    : false,
                cumulateTime: 0
            }).pause();
            
            that.trigger('stop');
            
            return that;
        },
        
        restart: function() {
            
            this.setAttr({
                'percent'      : 0,
                'finished'     : false,
                'cumulateTime' : 0
            }).start();
            
            this.trigger('restart');
            
            return this;
        },
        
        getProgress: function() {
            
            return this.getAttr('percent');
        }
    }
});

module.exports = Progress;
