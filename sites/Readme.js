$(document).ready(function() {
  
  $("img").css("border", "solid 1px");
    
  $("p.animation").each(function() {
     var html = $(this).html();
     console.log(html);
     $(this).html(html + "<br /><button class=\"reload\">Restart animation</button>");
  });
  
  $(".reload").click(function () {
      var image = $("img", $(this).parent());
      var old_src = $(image).attr("src");
      $(image).attr("src", "");
      $(image).attr("src", old_src);
  });
});

