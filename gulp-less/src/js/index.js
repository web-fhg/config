
var root = window.player;
var audio = root.audioManager;
var control;
var dog = 0;
//var nowIndex = 0;
var dataList,len,timer;
//
//new root.indexVolume().volumeInit(); 
function getData(url){
    $.ajax({
        type:"GET",
        url: url,
        success:function(data){
            dataList = data;
            len = data.length;
            control = new root.controlIndex(len);
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            root.volume.volumeInit(data[0].duration);
            root.volume.volumeClick();
            bindEvent();
        },
        error:function(){
            console.log("error");
        }
    })
}

function bindEvent(){
    $('body').on('play:change',function(e,index){
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        root.volume.volumeInit(dataList[index].duration);
        rotates(1);
        if( audio.status == 'play'){
            audio.play();
            rotates();
        }
    })
    $('.prev').on('click',function(){
        var i = control.prev();
        $('body').trigger('play:change',i);
    })
    $('.next').on('click',function(){
        var i = control.next();
        $('body').trigger('play:change',i);
    })
    $('.play').on('click',function(){
        if(audio.status == 'pause'){
            audio.play();
            rotates();
            root.volume.volumePlay();
        }else{
            audio.pause();
            clearInterval(timer);
        }
        $(this).toggleClass('playing');
    })
    $('.like').on('click',function(){
        $(this).toggleClass('solid');
    });


    $('.list').on('click',function(){
        $('.play-list').addClass('show');
    })
    $('.close-btn').on('click',function(){
        $('.play-list').removeClass('show');
    })
    $('.play-list li').on('click',function(e){
        var sum = 0;
        $('.play').addClass('playing');
        $('.play-list li').forEach(function(ele){
            $(ele).removeClass('sign');
        });
        if(e.target.tagName == 'LI'){
            $(e.target).addClass('sign');
            sum = $(e.target).index();
        }else if(e.target.tagName == 'H3'){
            $($(e.target).parent()[0]).addClass('sign');
            sum = $($(e.target).parent()[0]).index();
        }else{
            $($(e.target).parents('li')[0]).addClass('sign');
            sum = $($(e.target).parents('li')[0]).index();
        }
        audio.getAudio(dataList[sum].audio);
        root.render(dataList[sum]);
        root.volume.volumeInit(dataList[sum].duration);
        rotates(1);
        audio.play();
        rotates();
        root.volume.volumePlay();
    })
}


function rotates(val){
    clearInterval(timer);
    if (val == 1){
        rotate('none',0);
        dog = 0;
    }else{
        timer = setInterval(function(){
            var deg = dog;
            rotate('all  0.1s linear',deg);
        },100);
    }
    function rotate(type,deg){
        $('.img-box').css({
            'transform': 'rotateZ('+deg+'deg)',
            'transition':  type  
        })
        dog += 1;
    }
    
}



getData("../mock/data.json");
//getData("https://6668-fhg-1259555039.tcb.qcloud.la/QQ-music/mock/data.json");




    