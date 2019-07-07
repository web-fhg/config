(function($,root){
    function renderImg(src){
        // $('.img-box').append('<img src="../../'+ data[0].image+'"/>');
        var img = new Image();
        img.src = src;
        img.onload = function(){
            $('.img-box img').attr('src',src);
            root.blurImg(img, $('body'));
        }
    }

    function renderInfo(info){
        var str = '<div class="song-name">'+info.song+'</div>\
        <div class="singer-name">'+info.singer+'</div>\
        <div class="album-name">'+info.album+'</div>'
        $('.song-info').html(str);
    }

    function renderIslike(like){
        if(like){
            $('.like').addClass('solid');
        }else{
            $('.like').removeClass('solid');
        }
    }

    root.render = function(data){
        renderImg(data.image);
        renderInfo(data);
        renderIslike(data.isLike);
    };

}(window.Zepto,window.player || (window.player = {})))