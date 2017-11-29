$(document).ready(function () {
    Secheight();
    setupNav();
    UIActivation();
    scollAnimation();
    prologueRoll();
});

$(window).on('resize', function(){
    Secheight();
});

//PC Scroll Animation
function scollAnimation() {
    (function($){
        $.aniPage = function(e,type) {
            var section = $('section');
            var totCnt = section.size();
            var currIdx = $('section').index($('#' + currFrame));
            $.aniOk = 1;

            //console.log('currIdx=' + currIdx + ', totCnt=' + totCnt);

            if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                if (currIdx > 0) {
                    $("body, html").stop(true, true).animate({
                        scrollTop: section.eq(currIdx-1).offset().top
                    },400,function(){
                        $.aniOk = 0;
                    });
                } else {
                    $.aniOk = 0;
                }
            } else {
                if (currIdx < totCnt-1) {
                    $("body, html").stop(true, true).animate({
                        scrollTop: section.eq(currIdx+1).offset().top
                    },400,function(){
                        $.aniOk = 0;
                    });
                } else {
                    $.aniOk = 0;
                }
            }
        };
    })(jQuery);

    $(function(){
        $.aniOk = 0;
        $(window).scrollTop(0);
    });

    $(document).on("mousewheel DOMMouseScroll",function(e){
        if (!isMobile.phone && !isMobile.tablet) {
            e.preventDefault();

            if($.aniOk == 0){
                $.aniPage(e,e.type);
                //$.aniOk = 1;
            }
        }
    });
}

//Section auto heght
function Secheight(){

    var winH = $(window).height();

    $('section').css('height', winH);

};

//page active
function UIActivation(){

    var that = this;

    that.__construct =  function()
    {
        $(document).ready(that._setupEvents);

        $(window).load(function(){

            that._resize();
            that._scroll();
        });
    };

    that.context = {
        hold:false,
        deactivate:true,
        $window :false,
        window_height :0,
        elements :[]
    };

    that.init = function(){

        that.add( $('.scroll').not('.initialized') );
        if( Modernizr && Modernizr.csstransitions ){

            that._resize();
            that._scroll();
        }
        else{

            $('.scroll').addClass('scroll-active');
        }
    };

    that._setupEvents = function() {

        that.context.$window = $(window);
        that.add( $('.scroll').not('.initialized') );
        that._resize();
        that.context.$window.scroll( that._scroll ).resize( that._resize );
    };

    that.setScrollUpDeactivation = function( status ){
        that.context.deactivate = status;
    };

    that.add = function( $elements ){
        $elements.each( function()
        {
            var $element   = $(this);
            var coefficient = typeof($element.data('active'))!="undefined"?parseFloat($element.data('active')):0.2;

            that.context.elements.push({$:$element, offset: $element.offset().top, coefficient:coefficient, active:false});
        });

        $elements.addClass('initialized scroll-inactive').removeClass('scroll-active');
    };

    that._resize = function(){
        $.each(that.context.elements, function(index, element)
        {
            element.offset = element.$.offset().top;
        });

        that.context.window_height = that.context.$window.height();
    };

    that._scroll = function()
    {
        if( that.context.hold || !that.context.$window )return;

        var scrollOffet  = that.context.$window.scrollTop()+that.context.window_height;

        $.each(that.context.elements, function(index, element)
        {
            if( element.offset + that.context.window_height*element.coefficient < scrollOffet ) {

                if( !element.active ){
                    element.$.addClass('scroll-active').removeClass('scroll-inactive');
                    element.active = true;
                }
            }
            else if( element.active && that.context.deactivate ){

                element.$.removeClass('scroll-active').addClass('scroll-inactive');
                element.active = false;
            }
        });
    };

    that.__construct();
};

//nav setup
function setupNav(){

    $('.go-to-section,.go-to-section-mb').click(function(e){

        e.preventDefault();

        var $section = $('.seccontents.'+$(this).attr('href').replace('#',''));
        $('html,body').animate({scrollTop:$section.offset().top}, 800, 'easeInOutCubic');
    });


    var activeCommitment = '';

    $(window).scroll(function(){
        var currentCommitment = 'intro';

        $('.seccontents').each(function(){
            if ( $(this).offset().top < $(window).scrollTop()+100 ) {
                currentCommitment = $(this).attr('id');
            }
        });

        if (activeCommitment != currentCommitment) {
            $('body').addClass('seccontents-'+currentCommitment).removeClass('seccontents-'+activeCommitment);
            activeCommitment = currentCommitment;
        }

        //GNB Scroll Hide
        var scT = $(window).scrollTop();

        if (scT <= 50) {
            $('#header').fadeIn('slow');
        } else {
            $('#header').fadeOut('fast');
        }

        window.currFrame = currentCommitment;
    });

    $(window).scroll();
};

//SECTION HEIGHT
function SectionBg() {
    var	imgH = $('section img.bg').height();

    $('#intro').css('top', '0');
    $('#prologue').css('top', (imgH)*1-10);
    $('#discover').css('top', (imgH)*2-20);
    $('#experience').css('top', (imgH)*3-30);
    $('#conquer').css('top', (imgH)*4-40);
};

// 搿る
function prologueRoll(){
    var btn1 = $('#prologue').find('a.prev'),
        btn2 = $('#prologue').find('a.next'),
        cont = [$('#prologue').find('.left'), $('#prologue').find('.right')],
        currIdx = 0,
        totCnt = 2;

    btn1.click(function(){
        if (currIdx > 0) {
            currIdx -= 1;
        } else {
            currIdx = totCnt - 1;
        }

        $.each(cont, function(i, v){
            v.hide();
        });

        cont[currIdx].css('display', 'block');
    });

    btn2.click(function(){
        if (currIdx < totCnt-1) {
            currIdx += 1;
        } else {
            currIdx = 0;
        }

        $.each(cont, function(i, v){
            v.hide();
        });

        cont[currIdx].css('display', 'block');
    });
}

//page refresh Top Move
$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});