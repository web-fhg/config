var gulp = require("gulp");
//插件引入
var htmlClenan = require("gulp-htmlclean");// 压缩html
var cleanCss = require("gulp-clean-css");  // 压缩css
var less = require("gulp-less");           // 将less转换成css
var uglify = require("gulp-uglify");       // 压缩js
var imageMin = require("gulp-imagemin");   // 压缩图片
var debug = require("gulp-strip-debug");   // 去掉js中的调试语句
var postCss = require("gulp-postcss");     // css3属性添加前缀，需要传入参数(autoprefixer)
var autoprefixer = require("autoprefixer");// css3属性添加前缀
var connect = require("gulp-connect");     // 开启服务器


var devMod = process.env.NODE_ENV == 'development';//production   development
//  export NODE_ENV=development    设置环境变量
console.log(devMod);

//地址统一引用
var folder = {
    src:"src/",
    dist:"dist/"
}
//html
gulp.task("html",function() {
    var page = gulp.src(folder.src + "html/*") //引入地址
        .pipe(connect.reload())     //添加监听文件改变自动刷新功能
        if(!devMod){
          page.pipe(htmlClenan())
        }
        
        page.pipe(gulp.dest(folder.dist + "html/")) //输出地址
});
//less
gulp.task("css",function() {
    var page =  gulp.src(folder.src + "css/*") //引入地址
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]))
        if(!devMod){
          page.pipe(cleanCss())
        }
        page.pipe(gulp.dest(folder.dist + "css/")) //输出地址
});
//css
// gulp.task("css",function() {
//   gulp.src(folder.src + "css/*") 
//       .pipe(gulp.dest(folder.dist + "css/")) 
// });
//js
gulp.task("js",function() {
  var page =  gulp.src(folder.src + "js/*")
      .pipe(connect.reload())
      if(!devMod){
        page.pipe(debug())
        .pipe(uglify())
      }
      page.pipe(gulp.dest(folder.dist + "js/")) 
});
//img
gulp.task("img",function() {
  gulp.src(folder.src + "img/*") 
      .pipe(imageMin())
      .pipe(gulp.dest(folder.dist + "img/")) 
});
//服务器
gulp.task("server",function() {
  connect.server({
      port: "8888",
      livereload: true //开启监听文件改变
  })
});
//监听文件改变
gulp.task("watch",function() {
  gulp.watch(folder.src + "html/*",["html"]); 
  gulp.watch(folder.src + "js/*",["js"]);
  gulp.watch(folder.src + "css/*",["css"]); 
});


gulp.task("default", ["html","css","js","img","server","watch"]);