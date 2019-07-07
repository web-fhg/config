import './index.less';
var lis = document.getElementsByTagName('li');

for(let i = 0;i<10;i++){
    lis[i].onclick = function (e){
        console.log(e.target.innerHTML)
    }
}