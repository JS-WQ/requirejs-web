function waterfall($ct){
    this.$ct = $ct
    this.init()
    this.bind()
}
waterfall.prototype.init = function(){
    this.curPage = 1
    this.perPageCount = 4
    this.$nodeWidth = this.$ct.find('.item').outerWidth(true)
    this.$itemsLength = parseInt(this.$ct.width()/this.$ct.find('.item').width())
    this.itemArr =[]
    for(var i=0;i<this.$itemsLength;i++){
        this.itemArr[i]=0
    }
     
    this.winHeight = $(window).height()
     
}
waterfall.prototype.bind = function(){
    var _this = this
    this.start()
    this.$ct.find('#btn').click(function(){
        _this.start()

    })
}
waterfall.prototype.start = function(){
    var _this = this
    this.getData(function(newlist){
        $.each(newlist,function(idx,news){
            var $node = _this.getNode(news)
            $node.find('img').on('load',function(){
               _this.$ct.find('#pic-ct').append($node)
                _this.waterPlay($node)
            })
        })
    })
}
waterfall.prototype.waterPlay = function($node){
    var _this = this
    $node.each(function(){
        var $minValue = Math.min.apply(null,_this.itemArr)  //获取数组中最小值 itemArr[0:'300',1:600,2:900]
        var $minIndex = _this.itemArr.indexOf($minValue)    //获取最小值相应的index

        $node.css({
            top:_this.itemArr[$minIndex], 
            left:$node.outerWidth(true)*$minIndex  
        })

        _this.itemArr[$minIndex]+=$node.outerHeight(true) //itemArr[0]=320
        _this.$ct.find('#pic-ct').height(Math.max.apply(null,_this.itemArr))
    })
}
waterfall.prototype.getNode = function(news){
    var htmls = ''
        htmls += '<li class="item">'
        htmls += '<a href="' + news.url + '" class="link"><img src="' + news.img_url + '"></a>'
        htmls += '</li>'
    return $(htmls)
}
waterfall.prototype.getData = function(callback){
    var _this = this
    $.ajax({
        url:'https://platform.sina.com.cn/slide/album_tech',
        dataType:'jsonp',
        jsonp:'jsoncallback',
        data:{
            app_key:'1271687855',
            num:_this.perPageCount,
            page:_this.curPage
        }
    }).done(function(ret){
        if(ret && ret.status && ret.status.code === '0'){
            callback(ret.data)
            _this.curPage++
        }else{
            console.log('get error data')
        }
    })
}
waterfallOn = (function(){
     return {
        init:function($ct){
            $ct.each(function(index,node){
                new waterfall($(node))
            })
        }
    }
}
)()