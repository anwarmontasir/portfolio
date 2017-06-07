var pageView = {};

pageView.handleMainNav = function () {
  $('nav ul li a').on('click',function() {
    event.preventDefault();
    $('nav ul li a').removeAttr('id', 'current');
    $(this).attr('id', 'current');
    var $whereToGo = $(this.hash);
    console.log($whereToGo);
    $('.page-section').fadeOut('fast');
    $($whereToGo).fadeIn('slow');
  }); // Let's now trigger a click on the first .tab element, to set up the page.
};

pageView.setTeasers = function () {
  $('.article-body *:nth-of-type(n+2)').hide();

  $('.read-more').on('click', function () {
    event.preventDefault();
    $(this).css('display', 'none');
    $(this).parent().find($('.show-less')).css('display', 'block');
    $(this).parent().find($('.article-body *:nth-of-type(n+2)')).fadeIn(500);

  });
  $('.show-less').on('click', function () {
    event.preventDefault();
    $(this).css('display', 'none');
    $(this).parent().find($('.read-more')).css('display', 'block');
    $(this).parent().find($('.article-body *:nth-of-type(n+2)')).hide();

  });

};

$(document).ready(function () {
  pageView.handleMainNav();
  pageView.setTeasers();
});