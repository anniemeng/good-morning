function getNews() {
  $.ajax({
    url: "http://api.feedzilla.com/v1/categories/590/subcategories/22541/articles.json",
    type: 'GET',
    dataType:'json',
    success: function(x) {
      var htmlContent = "";
      $.each(x.articles, function(index, ele){
        htmlContent += ("<p>" + this.title + "<br>" + this.summary + "<p>");
      });

      $("#news").html(htmlContent);
    }
  });

}
getNews();