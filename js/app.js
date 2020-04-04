`use strict`;

let keywordArr = [];
let productArr = [];


$(function () {
  renderFirstTime('./data/page-1.json');
  $('#page').on('click',function(event){
    let userClick = event.target.id;
    if(userClick === 'pageOne'){
      renderFirstTime('./data/page-1.json');
    }
    else if(userClick === 'pageTwo'){
      renderFirstTime('./data/page-2.json');
    }
  })
});



function renderFirstTime(urlPath) {
  productArr = [];
  keywordArr = [];
  $('#filter').empty('');
  $('#showImage').empty('');
  $('#filter').append('<option>Filter By Keywords</option>');
  $.ajax({
    url: urlPath,
    dataType: 'json',
    success: (data => {
      let product;
      data.forEach(value => {
        product = new Product(value);
        product.render();
      });
      keywordArr.forEach(value => { product.renderOption(value); });
      product.event1();
      product.event2();
    }),
  });
}


function Product(val) {
  this.filePath = val.image_url;
  this.title = val.title;
  this.description = val.description;
  this.keyWords = val.keyword;
  this.horns = val.horns;
  productArr.push(this);
  if (keywordArr.includes(this.keyWords) === false) {
    keywordArr.push(this.keyWords);
  }
}

Product.prototype.render = function () {
  let template = $('#helpRender').html();
  let myHtml = Mustache.render(template,this);
  $('#showImage').append(myHtml);
}

Product.prototype.renderOption = function (i) {
  let option = $('<option></option>').text(i);
  $('#filter').append(option);
}

let filterArray = [];
Product.prototype.event1 = function () {
  $('#filter').change(function () {
    let choose = $('#filter').val();
    let select2 = productArr.filter((n) => n.keyWords === choose);
    $('#showImage').empty('');
    filterArray = select2;
    select2.forEach(value => {
      value.render();
    }
    );
    if (choose === 'Filter By Keywords') {
      filterArray = [];
      productArr.forEach(val =>{
        val.render()
      } )
    }
  });
}
Product.prototype.event2 = function () {
  $('#sort').change(function () {
    if (filterArray.length !== 0){
      forFilter(filterArray);

    }
    else {
      forFilter(productArr);

    }});
}
let count = 0;


$('#showImage').on('click',(event) =>{
  let clickEle = event.target.src;
  let newClick = productArr.filter(n => n.filePath === clickEle);
  $('#showImage').empty('');
  newClick[0].render();
  $('#showImage').addClass('bigger');
  $('#showImage').removeAttr('id');
  count ++;
  if (count === 2){
    count = 0;
    $('.bigger').attr('id','showImage');
    $('#showImage').empty('');
    productArr.forEach(value => {
      value.render();
    });
    $('#showImage').removeClass('bigger');

  }

})
function forFilter(array) {
  let choose = $('#sort').val();
  if (choose === 'text') {
    array.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      else {
        return 1;
      }
    });
    $('#showImage div').hide();

    array.forEach(val => {
      val.render();
    });
  }
  else if (choose === 'num') {
    array.sort((a, b) => {
      return a.horns - b.horns;
    });
    $('#showImage div').hide();
    array.forEach(val => {
      val.render();
    });
  }
}

