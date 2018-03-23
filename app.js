requirejs.config({
    // 默认从js/lib加载所有的module ID
    baseUrl: './app',
    // 除非，module ID以"app"开头，则   
    // 从js/app目录加载。
    // 注意，paths config是相对于baseUrl的，
    // 而且不要包含".js"的后缀，因为一个path
    // 有可能是个目录
    paths: {
        "jquery": '../lib/node_modules/jquery/dist/jquery.min'
    }
});

// 启动main app
requirejs(['jquery', 'coursel', 'waterfall'],
function   ($,Coursel,waterfall) {
    //自此，jQuery，canvas以及app/sub模块
    //都已加载并可开始使用了。
    CarouselOn.init($('.poster-img'))
    waterfallOn.init($('.portfolio-img'))
    

});