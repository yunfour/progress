define(function(require, exports, module) {var createClass=require("createClass/0.0.1/createClass"),PubSub=require("pubSub/0.0.1/pubSub"),Progress=createClass({superClass:PubSub,init:function(){this.setAttr("percent",0)},methods:{start:function(){var t=this,e=t.getAttr("interval"),r=10,s=0,i=100;return clearInterval(e),e=setInterval(function(){var n=t.getAttr("percent"),a=t.getAttr("finished",!0);a?n+=60>n?8:70>n?7:80>n?4:90>n?3:.5:17>n?n+=.6:n>=17&&27>n?n+=.4:n>=27&&37>n?n+=.2:n>=37&&47>n?n+=.1:n>=47&&57>n?n+=.08:n>=57&&67>n?n+=.05:n>=67&&77>n?n+=.04:n>=77&&87>n?n+=.1:n>=87&&93>n?n+=.01:n>=93&&95>n&&(n+=.005),n>=i&&(n=i,clearInterval(e),t.trigger(100===n?"finish":"toProgressFinish")),s+=r,t.setAttr({percent:n,cumulateTime:s}),t.trigger("progress",n)},r),t.setAttr("interval",e),this},finish:function(){var t=this;return t.setAttr("finished",!0),t.start(),t},pause:function(){var t=this,e=t.getAttr("interval");return clearInterval(e),t.trigger("pause"),t},stop:function(){var t=this;return t.setAttr({percent:0,finished:!1,cumulateTime:0}).pause(),t.trigger("stop"),t},restart:function(){return this.setAttr({percent:0,finished:!1,cumulateTime:0}).start(),this.trigger("restart"),this},getProgress:function(){return this.getAttr("percent")}}});module.exports=Progress;});