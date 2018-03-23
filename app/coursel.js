console.log('init')

function Carousel($ct){
    this.$ct = $ct
    this.init()
    this.bind()
}
Carousel.prototype.init = function(){
     this.$container =this.$ct.find('.poseter-container')
     this.$contImg =this.$ct.find('.cont-img')
     this.$postImg =this.$ct.find('.cont-img li')
     this.imgWidth = this.$postImg.width()

     this.$preBtn =this.$ct.find('.preBtn')
     this.$nextBtn =this.$ct.find('.nextBtn')
     this.$sliders =this.$ct.find('.slider_indicators li')
     this.index =this.$postImg.length
     this.pageIndex = 0
     this.timer 


    this.$contImg.append(this.$postImg.first().clone())
    this.$contImg.prepend(this.$postImg.last().clone())
}
Carousel.prototype.bind = function(){
    var _this = this
    this.$preBtn.click(function(){
        _this.playPre(1)
    })
    this.$nextBtn.click(function(){
        _this.playNext(1)
    })
    this.$sliders.click(function(){
        var sliderIndex = $(this).index()
        if(sliderIndex > _this.pageIndex){
            _this.playNext(sliderIndex-_this.pageIndex)
        }
        if(sliderIndex < _this.pageIndex){
            _this.playPre(_this.pageIndex-sliderIndex)
        }
    })
    
}
Carousel.prototype.playNext = function(len){
    var _this = this
    this.$contImg.animate({left:'-='+len*this.imgWidth},function(){
        
        _this.pageIndex += len                
        if(_this.pageIndex === _this.index){
            _this.pageIndex = 0
            _this.$contImg.css({left:-_this.imgWidth})
        }
        _this.setSlider()
    })
}
Carousel.prototype.playPre = function(len){
    var _this = this
    this.$contImg.animate({left:'+='+len*this.imgWidth},function(){
        _this.pageIndex -= len
        if(_this.pageIndex < 0){
            _this.pageIndex = 4
            _this.$contImg.css({left:-index*_this.imgWidth})
        }          
        _this.setSlider()
    })
}
Carousel.prototype.setSlider = function(){
    this.$sliders.removeClass('active').eq(this.pageIndex).addClass('active')

}

CarouselOn = (function(){
     return {
        init:function($ct){
            $ct.each(function(index,node){
                new Carousel($(node))
            })
        }
    }
}
)()