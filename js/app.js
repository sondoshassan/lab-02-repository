`use strict`;

let keywordArr = [];
let productArr = [];


$(function(){

  $.ajax({
    url: './data/page-1.json',
    dataType: 'json',
    success: (data =>{
      let product;

      data.forEach( value =>{
        product = new Product(value.image_url,value.title,value.keyword,value.description,value.horns);
        product.render();
      });
      keywordArr.forEach ( value => {product.renderOption(value);})
      product.event1();
    }),

  });
});

function Product (filePath,title,keyWords,description,horns){
  this.filePath = filePath;
  this.title = title;
  this.keyWords=keyWords ;
  this.description =description ;
  this.horns =horns ;
  productArr.push(this);
  if (keywordArr.includes(this.keyWords) === false){
    keywordArr.push(this.keyWords);
  }
}

Product.prototype.render = function(){
  let subDiv = $('<div class="append1"></div>');
  let head1 =$('<h2></h2>').text(this.title);
  let elem =$('<li></li>').html(`<img src="${this.filePath}">`);
  let paragraph=$('<p></p>').text(this.description);
  $('#showImage').append(subDiv);
  $('.append1').append(head1);
  $('.append1').append(elem);
  $('.append1').append(paragraph);
  subDiv.removeClass('append1');
  $('img').height(300);
  $('img').width(300);

}

Product.prototype.renderOption = function(i){
  let option = $('<option></option>').text(i);
  $('#filter').append(option);

}


Product.prototype.event1=function(){
  $('select').change(function(){
    let choose= $('select').val();
    let select2 =productArr.filter((n) => n.keyWords === choose);
    $('#showImage div').hide();
    select2.forEach(value => value.render() );
    console.log(select2);
    if(choose === 'Filter By Keyword'){
      $('#showImage div').show();
    }
  });
}

