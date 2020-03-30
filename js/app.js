`use strict`;

let keywordArr = [];
let productArr = []; 
let userChoose = [];

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
        // console.log(keywordArr);
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
// console.log(keywordArr);
}

Product.prototype.render = function(){
        let subDiv = $('<div class="append1"></div>');
        let head1 =$("<h2></h2>").text(this.title);
        let elem =$("<li></li>").html(`<img src="${this.filePath}">`);
         let paragraph=$("<p></p>").text(this.description);
        $('#showImage').append(subDiv);
         $('.append1').append(head1);
        $('.append1').append(elem);
        $('.append1').append(paragraph);
        subDiv.removeClass('append1');
        $('img').height(300);
        $('img').width(300);

}
// console.log(keywordArr);

Product.prototype.renderOption = function(i){
    let option = $("<option></option>").text(i);
    $('#filter').append(option);

}
// Product.prototype.selectRender = function(){
//     $('#showImage div').hide();
//     productArr.keyWords.forEach( value => {

//     })
//     if (vari === )
// }

Product.prototype.event1=function(){
    $("select").change(function(){
let vari= $("select").val();
// console.log(vari);
// var selet1 =productArr.map((n)=> n.keyWords);
var select2 =productArr.filter((n) => n.keyWords === vari);
$('#showImage div').hide();
select2.forEach(value => value.render() );
console.log(select2);
// console.log(selet1);
if(vari === 'Filter By Keyword'){
$('#showImage div').show();

}
    });
}

