$(window).on('load', function(){
    $('body').fadeIn(1000);

    /*---------------------------------    slider    -------------------------------*/
    var mySwiper = new Swiper(".swiper-container", {
        effect: 'fade',
        grabCursor: false,
        centeredSlides: true,
        slidesPerView: 1,
        loop: false,
        spaceBetween: 109,
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    mySwiper.on('slideChange', function() {
        var numb = this.activeIndex + 1;
        $('.count').text("0" + numb);
    });

});
$(document).ready(function() {

    /*---------------------------------    animation    -------------------------------*/
    $('.tab__item').each(function() {
        var image = $('.tab__img_i');
        var block = $(this).data('img');

        function animInt() {
            TweenLite.from(image, 2, { ease: Power1.easeOut, opacity: 0});
            TweenLite.to(image, 2, { ease: Power1.easeOut, opacity: 1});
            TweenLite.set(image, { attr: { src: block }}, { ease: Power1.easeOut, opacity: 1});
        }
        $(this).on('mouseenter', function() {
            setTimeout(animInt, 200);
        });
    });

    TweenLite.to('.circle_2', 2, { ease: Power1.easeOut, scale: 1});
    TweenLite.to('.circle_5', 2, { ease: Power1.easeOut, delay: 2, scale: 1});

    $('.header__i').on('click', function(){
        $(this).toggleClass('active');
        $(this).next().toggleClass('opened');
    });

    /*---------------------------------    rose leaf    -------------------------------*/
    function rose(){
        var falling = true;

        TweenLite.set("#wrap",{perspective:600})
        TweenLite.set("#wrap img",{xPercent:"-50%",yPercent:"-50%"})

        var total = 6;
        var container = document.getElementById("wrap"),   w = window.innerWidth , h = window.innerHeight;
         
        for (i=0; i<total; i++){ 
           var Div = document.createElement('div');
           TweenLite.set(Div,{attr:{class:'leaf'},x:R(0,w),y:R(-200,-150),z:R(-200,200)});
           container.appendChild(Div);
           animm(Div);
        }
         
        function animm(elm){   
           TweenMax.to(elm,R(6,15),{y:h+100,ease:Linear.easeNone,repeat:-1,delay:-15});
           TweenMax.to(elm,R(4,8),{x:'+=100',rotationZ:R(0,180),repeat:-1,yoyo:true,ease:Sine.easeInOut});
           TweenMax.to(elm,R(2,8),{rotationX:R(0,360),rotationY:R(0,360),repeat:-1,yoyo:true,ease:Sine.easeInOut,delay:-5});
        };

        function R(min,max) {return min+Math.random()*(max-min)};
    }

    /*---------------------------------    header menu show/hide    -------------------------------*/

    function headerScroll(){
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos >= currentScrollPos) {
                document.getElementById("headerScroll").classList.remove("scrolled");
                document.getElementById("adress").style.display = "block";
                document.getElementById("info").style.display = "block";
            } else {
                document.getElementById("headerScroll").classList.add("scrolled");
                document.getElementById("adress").style.display = "none";
                document.getElementById("info").style.display = "none";
            }
            prevScrollpos = currentScrollPos;
        };
    }
    if (window.matchMedia("(min-width: 600px)").matches) {
        headerScroll();
        rose();
    } 

    /*---------------------------------   tabs    -------------------------------*/
    $('ul.tabs li').click(function() {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab__content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });

    /*---------------------------------    popup    -------------------------------*/

    $('.popup-btn').click(function(e) {
        var target = $(this).data('target'),
            form = $('.popup');
        $('.overlay').fadeIn();
        $(target).toggleClass('active');
        $('html,\n' + 'body').css('overflow-y', 'hidden');
        form.not(target).removeClass('active');
        var firstClick = true;
        $(document).bind('click.myEvent', function(e) {
            var data_t = e.target;
            if (!firstClick && $(e.target).closest(form).length === 0) {
                if (!$(data_t).hasClass('popup_btn')) {
                    $(form).removeClass('active');
                    $('.overlay').fadeOut();
                    $(document).unbind('click.myEvent');
                    $('html,\n' + 'body').css('overflow-y', 'visible');
                }
            }
            firstClick = false;
        });
        $('.close').click(function(e) {
            $(form).removeClass('active');
            $('.overlay').hide();
            $(document).unbind('click.myEvent');
            $('html,\n' + 'body').css('overflow-y', 'visible');
        });
    });

    $('.form button').on('click', function() {
        $('.popup__content').hide();
        $('.popup__gratitude').fadeIn('slow');
    });

    /*---------------------------------          mask tel         -------------------------------*/

    function setCursorPosition(pos, element) {
        element.focus();
        if (element.setSelectionRange) {
            element.setSelectionRange(pos, pos);
        } else if (element.createTextRange) {
            var range = element.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
        }
    }

    function mask(event) {
        var item = event.target;
        var number = "+__(___)-___-__-__",
            i = 0,
            def = number.replace(/\D/g, ""),
            val = item.value.replace(/\D/g, "");
        if (def.length >= val.length) {
            val = def;
        }
        item.value = number.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        });

        if (event.type === "blur") {
            if (item.value.length === 2) {
                item.value = "";
            }
        } else {
            setCursorPosition(item.value.length, item);
        }
    }
    var tel = $("input[type='tel']");
    tel.bind("input blur focus click", mask);

    /*---------------------------------    animation on scroll    -------------------------------*/

    function animatioTrigger() {
        var $animation_elements = $('.js_st');
        var $window = $(window);
        $window.on('scroll resize', check_if_in_view);
        $window.trigger('scroll');

        function check_if_in_view() {
            var window_height = $window.height();
            var window_top_position = $window.scrollTop();
            var window_bottom_position = (window_top_position + window_height);

            $.each($animation_elements, function() {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);

                //check to see if this current container is within viewport
                if ((element_bottom_position >= window_top_position) &&
                    (element_top_position <= window_bottom_position)) {
                    $element.addClass('in-view');
                } else {
                    $element.removeClass('in-view');
                }
            });
        }
    };
    animatioTrigger();


});

