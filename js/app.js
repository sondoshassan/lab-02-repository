`use strict`;

let keywordArr = [];
let productArr = [];


$(function () {

  $.ajax({
    url: './data/page-1.json',
    dataType: 'json',
    success: (data => {
      let product;

      data.forEach(value => {
        product = new Product(value.image_url, value.title, value.keyword, value.description, value.horns);
        let renderedObj = product.render()
        $('#showImage').append(renderedObj);
      });
      keywordArr.forEach(value => { product.renderOption(value); })
      product.event1();
      product.event2();

    }),

  });
});

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
  // let subDiv = $('<div class="append1"></div>');
  // let head1 = $('<h2></h2>').text(this.title);
  // let paragraph = $('<p></p>').text(this.description);
  // $('#showImage').append(subDiv);
  // $('.append1').append(head1);
  // $('.append1').append(`<img src="${this.filePath}"/>`);
  // $('.append1').append(paragraph);
  // subDiv.removeClass('append1');
  $('img').height(300);
  $('img').width(300);
  // console.log(this.filePath);
  // $('img').removeAttr('src');

  // let img =$('img').attr('src',this.filePath);

  // console.log(img);
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
    $('#showImage div').hide();
    select2.forEach(value => value.render());
    console.log(select2);
    if (choose === 'Filter By Keyword') {
      $('#showImage div').show();
    }
  });
}
Product.prototype.event2 = function () {
  $('#sort').change(function () {
    let choose = $('#sort').val();
    console.log(choose);
    if (choose === 'text') {
      console.log('before ', productArr);
      productArr.sort((a, b) => {
        if (a.title < b.title){
          return -1;
        }
        else {
          return 1;
        }
      });
      console.log('after ', productArr);

      $('#showImage div').hide();
      productArr.forEach(val => val.render());
    }
    else if (choose === 'num') {
      productArr.sort((a, b) => {
        return a.horns - b.horns;
      });
      $('#showImage div').hide();
      console.log(productArr);
      productArr.forEach(val => val.render());
    }
  });
}


