function render(data, tmpl, filters){
    var output = tmpl;
    var reg = /(?:\{)(\w+)/g;
    var reg_res;
    while (reg_res = reg.exec(output))
    {
      var binding = reg_res[1];
      var value = filters && filters[binding] ? filters[binding](data) : data[binding];
      output = output.replace('{' + binding + '}', value);
    }
    
    return output;
};
  
var itemTmpl = '<div class="row item" data-id="{id}">'  +
              '<span class="col-md-3 item_name">{fullname}</span>' +
              '<span class="col-md-3 item_email">{email}</span>' +
              '<span class="col-md-3 item_phone">{phone}</span>' +
              '<span class="col-md-2 item_date">{createDate} </span>' +
              '<span class="col-md-1 close">&times</span>'
            '</div>';
  
var filters = {
    createDate: function(object){
      var date = new Date(object.createDate);
      return date.toLocaleString();
    },
    fullname: function(object){
        return object.family + ' ' + object.name + ' ' + object.surname;
    }
};

function checkListEmpty(){
    $('.list').toggleClass('__empty', !$('.list-items .item').length);
}

function initActions(item){
    item.find('.close').click(function(event){
        var id = $(this.parentNode).data('id');
       
        $.ajax({
            type: 'post',
            url: './api/remove.php',
            data: {
               id: id
            },
            beforeSend: function(){
               $('.list-items').addClass('__processing');
            },
            success: function(response){
                item.remove();
                $('.list-items').removeClass('__processing');
            }
        });
       
       event.stopPropagation();
    });
    
    item.click(function(){
        var id = item.data('id');
        
        $.ajax({
            url: './api/get.php',
            data: {
                id: id
            },
            beforeSend: function(){
               $('.list-items').addClass('__processing');
            },
            success: function(response){
                var data = JSON.parse(response);
                
                $.get('./view/view.html', function(tmpl){
                    window.popup = new Popup(render(data, tmpl));
                    window.popup.open();
                });
                
                $('.list-items').removeClass('__processing');
            }
        });
    });
}

function initList(){
    $.ajax({
        url: './api/list.php',
        beforeSend: function(){
            $('.list-items').addClass('__processing');
        },
        success: function(response){
            response = JSON.parse(response);
            if (response.Items.length)
            {
                $.each(response.Items, function(idx, item){
                    item = $(render(item, itemTmpl, filters));
                    $('.list-items').append(item);
                    initActions(item);
                });
            }
            
            $('.list-items').removeClass('__processing');
            
            checkListEmpty();
        }
    })
}

function updateList(){
    $('.list-items .item').remove();
    
    initList();
}

$('.btn-add').click(function(){
    var el = this;
    $.ajax({
        url: './view/add.html',
        beforeSend: function(){
            $(el).addClass('__processing');
        },
        success: function(response){
            window.popup = new Popup(response);
            window.popup.open();
            
            $(el).removeClass('__processing');
        }
    });
});