`use strict`;

let keywordArr = [];
let productArr = [];


$(function () {
  renderFirstTime();
  $('#page').on('click',function(event){
    let userClick = event.target.id;
    if(userClick === 'pageOne'){
      renderFirstTime();
    }
    else if(userClick === 'pageTwo'){
      renderPageTwo();
    }
  })
});



function renderPageTwo() {
  productArr = [];
  keywordArr = [];
  $('#filter').empty('');
  $('#showImage').empty('');
  $('#filter').append('<option>Filter By Keywords</option>');
  $.ajax({
    url: './data/page-2.json',
    dataType: 'json',
    success: (data => {
      let product;
      data.forEach(value => {
        product = new Product(value.image_url, value.title, value.keyword, value.description, value.horns);
        let renderedObj = product.render();
        $('#showImage').append(renderedObj);
      });
      keywordArr.forEach(value => { product.renderOption(value); });
      product.event1();
      product.event2();
    }),
  });
}

function renderFirstTime() {
  productArr = [];
  keywordArr = [];
  $('#filter').empty('');
  $('#showImage').empty('');
  $('#filter').append('<option>Filter By Keywords</option>');
  $.ajax({
    url: './data/page-1.json',
    dataType: 'json',
    success: (data => {
      let product;
      data.forEach(value => {
        product = new Product(value.image_url, value.title, value.keyword, value.description, value.horns);
        let renderedObj = product.render();
        $('#showImage').append(renderedObj);
      });
      keywordArr.forEach(value => { product.renderOption(value); });
      product.event1();
      product.event2();
    }),
  });
}

function Product(filePath, title, keyWords, description, horns) {
  this.filePath = filePath;
  this.title = title;
  this.keyWords = keyWords;
  this.description = description;
  this.horns = horns;
  productArr.push(this);
  if (keywordArr.includes(this.keyWords) === false) {
    keywordArr.push(this.keyWords);
  }
}

Product.prototype.render = function () {
  let template = $('#helpRender').html();
  let myHtml = Mustache.render(template,this);
  return myHtml;
}

Product.prototype.renderOption = function (i) {
  let option = $('<option></option>').text(i);
  $('#filter').append(option);
}


Product.prototype.event1 = function () {
  $('#filter').change(function () {
    let choose = $('#filter').val();
    let select2 = productArr.filter((n) => n.keyWords === choose);
    $('#showImage').empty('');
    select2.forEach(value => {
      let renderedObj = value.render()
      $('#showImage').append(renderedObj);

    }
    );
    if (choose === 'Filter By Keywords') {
      productArr.forEach(val =>{
        let renderedObj = val.render()
        $('#showImage').append(renderedObj);
      } )
    }
  });
}
Product.prototype.event2 = function () {
  $('#sort').change(function () {
    let choose = $('#sort').val();
    if (choose === 'text') {
      productArr.sort((a, b) => {
        if (a.title < b.title){
          return -1;
        }
        else {
          return 1;
        }
      });

      $('#showImage div').hide();
      productArr.forEach(val => {
        let renderedObj = val.render()
        $('#showImage').append(renderedObj);
      });
    }
    else if (choose === 'num') {
      productArr.sort((a, b) => {
        return a.horns - b.horns;
      });
      $('#showImage div').hide();
      productArr.forEach(val => {
        let renderedObj = val.render()
        $('#showImage').append(renderedObj);
      });
    }
  });
}

