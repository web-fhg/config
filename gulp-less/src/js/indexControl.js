(function($,root){

    function Control(len){
        this.len = len;
        this.index = 0;
    }
    
    Control.prototype = {
        prev:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(1);
        },
        getIndex:function(val){
            var index = this.index;
            return this.index = (index + val + len)%this.len;
        }
    }

    root.controlIndex = Control;

}(window.Zepto,window.player || (window.player = {})))