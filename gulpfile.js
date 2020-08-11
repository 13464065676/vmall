var{src,dest,series,parallel,watch} = require('gulp');
var clean = require('gulp-clean');
var fileInclude = require('gulp-file-include');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

function cleanTask(){
    return src('dist',{allowEmpty : true})  
        .pipe(clean());
}
function htmlTask(){
    return src('./src/view/*.html')
        .pipe(fileInclude({
            prefix : '@',     
            basepath : './src/view/templates'   
        }))
        .pipe(dest('dist/view'));
}
function cssTask(){
    return src('./src/css/*.scss')
            .pipe(sass())
            .pipe(dest('dist/css'));
}
function staticTask(){
    return src('./src/static/**')
        .pipe(dest('dist/static'));
}
function libTask(){
    return src('./src/lib/**')
        .pipe(dest('dist/lib'));
}
function jsTask(){
    return src('./src/js/**')
        .pipe(dest('dist/js'));
}
function apiTask(){
    return src('./src/api/**')
        .pipe(dest('dist/api'));
}
function webTask(){
    return src('dist')
        .pipe(webserver({
            host:'localhost',
            port:4000,
            open:'./view/index.html',
            livereload:true
        }))
}
function watchTask(){
    watch('./src/view/**',htmlTask);
    watch('./src/css/**',cssTask);
    watch('./src/static/**',staticTask);
    watch('./src/lib/**',libTask);
    watch('./src/js/**',jsTask);
    watch('./src/api/**',apiTask);
}
 

module.exports = {
    dev : series(cleanTask,parallel(htmlTask,cssTask,staticTask,libTask,jsTask,apiTask),parallel(webTask,watchTask)),
    build : series(cleanTask)
}