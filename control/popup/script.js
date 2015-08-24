function Popup(content){
  var popup = this.element = $(content);
  var that = this;
  
  this.close = function(event){
    $(popup).remove();
    $('.popup-manager').removeClass('__open');
    
    if (this.handler && this.handler.hide)
      this.handler.hide();
  }
  
  this.open = function(){
    $('.popup-manager').append(popup);
    $('.popup-manager').addClass('__open');
    
    this.realign();
  }
  
  this.realign = function(){
    var height = this.element.outerHeight();
    var width = this.element.outerWidth();
    var marginTop = (height / 2) * -1;
    var marginLeft = (width / 2) * -1;
    
    this.element.css({
      marginTop: marginTop + 'px',
      marginLeft: marginLeft + 'px'
    });
  }
  
  this.element.click(function(event){
    that.realign();
    event.stopPropagation();
  });
  
  this.element.find('.popup-close').click(this.close);
  
  return this;
}

$('.popup-manager').click(function(){
  window.popup.close();
});