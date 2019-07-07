(function($,root){
    var allTime = 0;
    function volumeInit(data){
            allTime = data;
            $('.all-time').html(changetime(data));
    }
    
    function volumePlay(){
        audio.audio.addEventListener('timeupdate',change,false);
        function change(){
            var ow = $('.pro-bottom').width();
            var nowtime = audio.audio.currentTime;
            var dw = nowtime*ow/allTime;
            $('.pro-top').css({
                'width':dw
            })
            $('.cur-time').html(changetime(nowtime));
            if(nowtime >= audio.audio.duration){
                audio.pause();
                clearInterval(timer);
                $('.play').removeClass('playing');
            }
        }
    }

    function volumeClick(){
            var ow = $('.pro-bottom').width();
            $('.pro-bottom').on('click',function(e){
                console.log(allTime);
                var _y = e.pageX;
                var _left = $('.pro-wrap')[0].offsetLeft;
                var dw = _y - _left;
                audio.audio.currentTime = (_y - _left)*allTime/ow;
                $('.pro-top').css({
                    'width':dw
                })
            })
            $('.pro-top').on('click',function(e){
                console.log(allTime);
                var _y = e.pageX;
                var _left = $('.pro-wrap')[0].offsetLeft;
                var dw = _y - _left;
                audio.audio.currentTime = (_y - _left)*allTime/ow;
                $('.pro-top').css({
                    'width':dw
                })

            })
    }
    
    function changetime(t){
            var min = parseInt(t / 60);
            var sec = parseInt(t % 60);
            if(min < 10){
                min = '0' + min;
            } 
            if(sec < 10){
                sec = '0' + sec;
            }
            return min + ':' + sec;
    }

        // volumeDrag:function(){
        //     $('.slider').on('dragstart',function(){
        //         console.log(111);
        //     })
        //     $('.slider').on('drag',function(){
        //         console.log(222);
        //     })
        //     $('.slider').on('dragend',function(){
        //         console.log(333);
        //     })
        // }
        
    

    

    root.volume = {
        volumeInit: volumeInit,
        volumePlay: volumePlay,
        volumeClick: volumeClick
    };
    
    

}(window.Zepto,window.player || (window.player = {})))


//dw/ow = duration/this.allTime;