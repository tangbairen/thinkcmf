/**
 * 오디세이 화면별 스크립트
 */

/**
 * 페이지 하단 롤링
 */
var pageList = {
    list : function() {
        var mode = "";
        var item_w;
        var settings;
        var listSwipe;
        var showItemQty;

        $(window).resize(function() {
        	setTimeout(function(){
	            var winW = $(window).width();

	            if (winW <= 767) {
	                mode = "MOBILE";
	                showItemQty = 2;
	                item_w = $('.list-swipe').width() / showItemQty;
	                settings = {
                		speed:250,
	                    moveSlides:1,
	                    maxSlides:2,
	                    slideWidth:item_w,
	                    infiniteLoop:false,
	                    pager:false,
	                    controls:false
	                }

	                listSwipe.destroySlider();
	                listSwipe.reloadSlider( settings );

	                //listSwipe.reloadSlider();
	            } else if (winW <= 1199) {
	                mode = "TABLET";
	                showItemQty = 3;
	                item_w = $('.list-swipe').width() / showItemQty;
	                settings = {
                		speed:250,
	                    moveSlides:1,
	                    maxSlides:3,
	                    slideWidth:item_w,
	                    infiniteLoop:false,
	                    pager:false,
	                    controls:false
	                }

	                listSwipe.destroySlider();
	                listSwipe.reloadSlider( settings );

	                //listSwipe.reloadSlider();
	            } else if (winW > 1199) {
	                mode = "PC";
	                showItemQty = 4;
	                item_w = $('.list-swipe').width() / showItemQty;
	                settings = {
                		speed:250,
	                    moveSlides:1,
	                    maxSlides:4,
	                    slideWidth:item_w,
	                    infiniteLoop:false,
	                    pager:false,
	                    controls:false
	                }
	                
	                listSwipe.destroySlider();
	                listSwipe.reloadSlider( settings );
	                //listSwipe.reloadSlider();
	            }
        	},0);
        }).resize();

        switch (mode) {
            case "MOBILE" : {
            	showItemQty = 2;
                item_w = $('.list-swipe').width() / showItemQty;
                break;
            }
            case "TABLET" : {
            	showItemQty = 3;
                item_w = $('.list-swipe').width() / showItemQty;
                break;
            }
            case "PC" : {
            	showItemQty = 4;
                item_w = $('.list-swipe').width() / showItemQty;
                break;
        	}
        }

        var listSwipe = $('.list-swipe ul').bxSlider({
            speed:250,
            moveSlides:1,
            maxSlides:showItemQty,
            slideWidth:item_w,
            infiniteLoop:false,
            pager:false,
            controls:false
        });

        $(".btn-card-prev").on("click", function(e) {
        	e.preventDefault();

        	if (listSwipe.getCurrentSlide() == 0) {
        		alert("이전 글이 없습니다.");
        	} else {
	        	listSwipe.goToPrevSlide();
        	}
        });

        $(".btn-card-next").on("click", function(e) {
        	e.preventDefault();
        	
        	var itemCount;
        	
        	switch (mode) {
	            case "MOBILE" :
	                itemCount = 2;
	                break;
	            case "TABLET" :
	            	itemCount = 3;
	                break;
	            case "PC" :
	            	itemCount = 4;
	                break;
	        }

        	if (listSwipe.getCurrentSlide() == listSwipe.getSlideCount() - itemCount) {
        		alert("다음 글이 없습니다.");
        	} else {
        		listSwipe.goToNextSlide();
        	}
        });
        return listSwipe;
    },
    goToSlideTemplate : function (obj, currentIdx) {
        var currentIdx = $('.gallery_bottom_nav').find('.active').index();
        var itemList = $('.gallery_bottom_nav > li');
        var itemListLength = itemList.length;
        var winW = $(window).width();
        
        if (winW <= 767) {
            mode = "MOBILE";
        } else if (winW <= 1199) {
            mode = "TABLET";
        } else if (winW > 1199) {
            mode = "PC";
        }
        var itemCount;
        
        switch (mode) {
            case "MOBILE" :
                itemCount = 2;
                break;
            case "TABLET" :
                itemCount = 3;
                break;
            case "PC" :
                itemCount = 4;
                break;
        }
        if ((currentIdx+1)  > itemCount) {
            var idx = (currentIdx+1) - itemCount;
            obj.goToSlide(idx);
        }
    }

};

/**
 * 제품 모듈
 */
var productList = {
    list : function() {
        var mode = "";

        $(window).resize(function() {
            var winW = $(window).width();

            if (winW <= 767) {
                mode = "MOBILE";
            } else if (winW <= 1199) {
                mode = "TABLET";
            } else if (winW > 1199) {
                mode = "PC"
            }
        });
        
        if (mode == "PC") $(".list-swipe").parent().css({"padding":"0 140px"});

        var listSwipe = $(".list-swipe").bxSlider({
            speed:500,
            pager:false,
            controls:false,
            auto:true,
            pause:5000,
            touchEnabled: true,

            onSlideAfter:function($slideElement, oldIndex, newIndex) {
                $(".carousel-wrap ul li").each(function() {
                    if ($(this).index() == newIndex) {
                        var curruntIdx = newIndex +1;
                        $('.bottom-option > a').attr('tabindex','-1');
                        $('.bottom-option > a').eq(curruntIdx).attr('tabindex','0');
                    	$(this).addClass("active")
                    } else {
                        $(this).removeClass("active");
                    }
                });
            }
        });

        $(".btn-slide-prev").on("click", function(e) {
        	e.preventDefault();
            listSwipe.goToPrevSlide();
        });

        $(".btn-slide-next").on("click", function(e) {
        	e.preventDefault();
            listSwipe.goToNextSlide();
        });

        var autoFlag = true;
        $(".carousel-wrap .btn-stop").on("click", function(e) {
        	e.preventDefault();
            autoFlag = !autoFlag;
            if (autoFlag) {
                listSwipe.startAuto();
                $(".product-feature-wrap .carousel-wrap button").removeClass("btn-play").addClass("btn-stop");
            } else {
                listSwipe.stopAuto();
                $(".product-feature-wrap .carousel-wrap button").removeClass("btn-stop").addClass("btn-play");
            }
        });

        $(".carousel-wrap ul li a").on("click", function(e) {
            var idx = $(this).parent().index();

            listSwipe.stopAuto();
            listSwipe.goToSlide(idx);
            listSwipe.startAuto();
            
            e.preventDefault();
        });
        
        //$(window).resize();
    },
    detail : function() {
        var listSwipe = $(".list-swipe .large-img").bxSlider({
            speed:250,
            pager:false,
            controls:false
        });

        $(".list-swipe .small-img a").on("click", function(e) {
            var thisIndex = $(this).index();
            listSwipe.goToSlide(thisIndex);
            e.preventDefault();
        })
    },
    sticky : function() {
        $(window).scroll(function() {
            if ($(".product-detail .tab-title").offset().top < $(this).scrollTop()) {
                $(".product-detail .tab-title ul").css({"position" : "fixed", "top" : "0", "z-index" : "100", "width" : "100%", "max-width" : "1200px"});
            } else {
                $(".product-detail .tab-title ul").css({"position" : "static"});
            }
        });
    },
    productDetail : function() {
	
		var mode = "";

		$(window).resize(function() {
			var winW = $(window).width();

			if (winW <= 767) {
				mode = "MOBILE";
			} else if (winW <= 1199) {
				mode = "TABLET";
			} else if (winW > 1199) {
				mode = "PC"
			}
		});
        $(".product-detail .tab-cont").each(function() {
            $(this).hide();
        });

        if ($("body").hasClass("IE8")) {
            $(".pagenation a").eq(-3).hide();
            $(".pagenation a").eq(-4).hide();
        };

        $(".product-detail .tab-cont").eq(0).show();

        $(".product-detail .tab-title ul li a").on("click", function(e) {
            var thisIndex = $(this).parent().index();
            $(".product-detail .tab-cont").hide();
            $(".product-detail .tab-cont").eq(thisIndex).show();

            $(".product-detail .tab-title ul li").each(function() {
                $(this).removeClass("active");
            });

            $(this).parent().addClass("active");


            if ( $(".product-detail .tab-title ul").css("position") == "fixed" ) {
                $("html, body").stop().animate({"scrollTop" : $(".product-detail").offset().top }, '500');
            }

            e.preventDefault();

        });
        
        $(".product-detail .list li").not(".comment").on("click", function(e){
        	e.preventDefault();
        	//$(this).next(".comment").toggleClass("active");

            //console.log($(this).next('.comment').hasClass('active'));
            if(!$(this).next('.comment').hasClass('active')) {
                $(this).next(".comment").removeClass("active");
            } else {
                $(this).next(".comment").addClass("active");
            }


        });
        
        // 구매 열기 클릭
//커머스일원화관련 수정 170609		
/*        $(".btn-buy").on("click", function(e){
        	e.preventDefault();
            trackClicksEx("구매", true);
        	$(".layer-popup").show();
        });*/

        // 구매 닫기 클릭
        $(".layer-popup .close").on("click", function(e){
        	e.preventDefault();
            $(".btn-line").focus();
        	$(".layer-popup").hide();
        });

        // 문의
        $(".btn-line").on("click", function(e){
        	e.preventDefault();
        });
        
        // 매장찾기 열기 클릭
//커머스일원화관련 수정 170609	
/*        $(".btn-findstore").on("click", function(e){
        	e.preventDefault();
            trackClicksEx("매장찾기", true);
        	$(".find-store-content").stop(true, true).slideDown(500);
        	
			var topMinus = 80;
			if (mode == "MOBILE") {
                topMinus = 40;
            }
			
        	$('html , body').animate({
				scrollTop: $('.find-store-content').offset().top - topMinus
			}, 500);
        });*/
        
        // 매장찾기 닫기 클릭
        $(".find-store-content .close").on("click", function(e){
        	e.preventDefault();
        	$(".find-store-content").stop(true, true).slideUp(500);
            $(".product-detail a:first").focus();
        });
        
        // 별점 레이어 열기
        $(".write .rating .selected-value").on("click", function(e){
        	e.preventDefault();
        	e.stopPropagation();
        	
        	var btnImg = $(this).find(".btn-open img");
        	var btnImgSrc = btnImg.attr("src");
        	btnImgSrc = btnImgSrc.replace("_open.png", "_close.png");
        	btnImg.attr("src", btnImgSrc);
        	
        	$(".write .rating").addClass("active");
        });
        
        $(".write .rating > a .btn-open").on("click", function(e){
        	e.preventDefault();
        	e.stopPropagation();
        	
        	if ($(".write .rating").hasClass("active")) {
	    		$(".write .rating").removeClass("active");
	    		
	    		var btnImg = $(this).find("img");
	        	var btnImgSrc = btnImg.attr("src");
	        	btnImgSrc = btnImgSrc.replace("_close.png", "_open.png");
	        	btnImg.attr("src", btnImgSrc);
        	} else {
        		$(".write .rating").addClass("active");
	    		
        		var btnImg = $(this).find("img");
	        	var btnImgSrc = btnImg.attr("src");
	        	btnImgSrc = btnImgSrc.replace("_open.png", "_close.png");
	        	btnImg.attr("src", btnImgSrc);
        	}
    	});
        
        // 별점 선택
        $(".write .rating").css("z-index", 20);
        $(".write .rating .select-list a").on("click", function(e){
        	e.preventDefault();
        	e.stopPropagation();
        	
        	var value = $(this).data("value");
        	var text = $(this).find("em").text();
        	var img = $(this).find("img").clone();
        	
        	$(".selected-value").find("span").empty().append(img);
        	$(".selected-value").find("em").text(text);
        	
        	$("#rating-value").val(value);
        	
        	var btnImg = $(this).closest(".select-list").siblings(".selected-value").find(".btn-open img");
        	var btnImgSrc = btnImg.attr("src");
        	btnImgSrc = btnImgSrc.replace("_close.png", "_open.png");
        	btnImg.attr("src", btnImgSrc);
        	
        	$(".write .rating").removeClass("active");
        	
        	// 아이폰 잔상 버그 해결
        	$("#review").css('visibility', 'hidden');
        	
        	setTimeout(function(){
        		$("#review").css('visibility', 'visible');
        	},0);
        });
    },
    findStore: function() {
    	var listSwipe;
    	var settings = {
            speed:500,
            pager:false,
            controls:false,
            auto:false,
            responsive: true
        };
    	
    	$(".tab-store-map a").on("click", function(e){
        	e.preventDefault();
        	
        	var isMap = $(this).parent().hasClass("tab-btn-store-map");
        	var isList = $(this).parent().hasClass("tab-btn-store-list");
        	
        	$(".tab-con-mobile").removeClass("active");
        	
        	$(this).parent().addClass("active").siblings().removeClass("active");
        	
        	if (isMap) {
        		$(".map-container").addClass("active");
        		
        		$(".find-store-content").show();
            	
            	listSwipe.reloadSlider( settings );
            	
            	$(".slide-container .btn-slide-prev").on("click", function(e) {
                	e.preventDefault();
                    listSwipe.goToPrevSlide();
                 });

                $(".slide-container .btn-slide-next").on("click", function(e) {
                	e.preventDefault();
                    listSwipe.goToNextSlide();
                });
            	
            	$(".find-store-content").hide();
        	} else if (isList) {
        		$(".store-info-area").addClass("active");
        	}
        	
        	$(".list-loader").hide();
        });
    	
    	$(".tab-btn-store-list").on("click", function(e){
    		e.preventDefault();
    		
    		$(".list-loader").show();
    	});
    	
    	listSwipe = $(".slide-container .store-list").bxSlider(settings);
    	
    	$(".tab-btn-store-map a").click();
    },
    contentOpen: function() {
    	$('.product-list-head .sub-tab a').on('click',function(e){
    		e.preventDefault();
    		
    		var idx = $(this).closest('li').index();
    		var posTop = $('.product-list-content').eq(idx).offset().top;

    		$('html, body').stop(true, true).animate({'scrollTop': posTop}, 1500);

    		//$(this).closest('.product-list-content').hide();
    		//$(this).closest('.product-list-content:eq(' + idx + ')').show();
    	});
    }
};

/**
 * 블루아지트
 */
var blueAzit = {
	profile : function() {
        var mode = "";
        
        var itemWidth = 0;
        var itemCount = 3;
        var itemLength = $('.introduce-rolling > div').length;
        var itemLengthContainClone = 0;
        var currItem;
        var slideMargin = 10;
        
        calcSize();

        function getSettings() {
        	return {
	            speed: 300,
	            pager: false,
	            controls: false,
	            auto: false,
	            pause: 500,
	            infinite: false,
	            moveSlides: 1,
	            touchEnabled: true,
	            maxSlides: itemCount,
	            slideWidth: itemWidth,
	            slideMargin: slideMargin,
	            
	            onSliderLoad : function(currentIndex){
	            	var itemLengthContainClone = $('.introduce-rolling > div').length;
	            	
	            	var max_width = itemLengthContainClone * ($('.introduce-rolling > div:first-child').outerWidth() + slideMargin);
	            	$('.introduce-rolling').css('width', max_width);
	            	
	            	currItem = $('.introduce-profile').not('.bx-clone').eq(1);

	            	currItem.addClass('current');
	            	
	            	if (mode == 'PC' || mode == 'TABLET') {
	            		$('.introduce-profile .flip').flip({
	            			trigger: 'manual'
	            		});
	            		currItem.find('.flip').flip(true);
	            	}
	            },
	            
	            onSlideBefore:function($slideElement, oldIndex, newIndex) {
	            	
	            },
	            
	            onSlideAfter:function($slideElement, oldIndex, newIndex) {
	            	var pageIdx = newIndex;
	            	
	            	currItem.find('.flip').flip(false);
	            	
	            	currItem.removeClass('current');
	            	
	            	// 마지막
	            	if (itemLength == newIndex + 1) {
	            		currItem = $('.introduce-profile').not('.bx-clone').last().next();
	            	} else {
	            		currItem = $('.introduce-profile').not('.bx-clone').eq((newIndex + 1));
	            	}
	            	
	            	currItem.addClass('current');
	            	
	            	currItem.find('.flip').flip(true);
	            	
	                $(".introduce-rolling-page a").each(function() {
	                	if ($(this).index() == pageIdx) {
	                		$(this).addClass('active');
	                	} else {
	                		$(this).removeClass('active');
	                	}
	                });
	            }
        	}
		};
        
        function calcSize() {
        	var winW = $(window).width();

            if (winW <= 767) {
                mode = "MOBILE";
                itemWidth = 280;
            } else if (winW <= 1199) {
                mode = "TABLET";
                itemWidth = 564;
            } else if (winW > 1199) {
                mode = "PC";
                itemWidth = 564;
            }
        }

        function calcPosition() {
        	var margin;
        	var containerWidth = 0;

        	if (ui.mode == 'PC' || ui.mode == 'TABLET') {
        		containerWidth = 1692;
        		
        		if ($(window).width() > containerWidth) {
                	margin = '0 auto';
                } else {
                	margin = '0 0 0 ' + ( (containerWidth - $(window).width()) / 2 * -1 ) + 'px'; 
                }
        	} else if (ui.mode == 'MOBILE'){
        		containerWidth = 860;
        		margin = '0 0 0 ' + ( (containerWidth - $(window).width()) / 2 * -1 ) + 'px';
        	}
            
            $('.introduce-rolling-wrap .bx-wrapper').css('margin', margin);
        }
        
        function resetAzitCarousel() {
        	calcSize();
        	listSwipe.reloadSlider( getSettings() );
        	calcPosition();
        }
        
        var preMode = '';

        var winW = $(window).width();

        if (winW <= 767) {
            preMode = 'MOBILE';
        } else if (winW <= 1199) {
        	preMode = 'TABLET';
        } else if (winW > 1199) {
        	preMode = 'PC';
        }
        
        $(window).resize(function() {
        	calcSize();

        	// PC, TABLET <---> MOBILE 간 이동시만 재로딩
        	if ( ((preMode == 'PC' || preMode == 'TABLET') && mode == 'MOBILE') ||
        		 (preMode == 'MOBILE' && (mode == 'TABLET' || mode == 'PC')) ) {
        		preMode = mode;
        		resetAzitCarousel()
        	} else {
        		calcPosition();
        	}
        });

        var listSwipe = $(".introduce-rolling").bxSlider(getSettings());

        calcPosition();

        $(".introduce-rolling-btn .btn_left").on("click", function() {
            listSwipe.goToPrevSlide();
        });

        $(".introduce-rolling-btn .btn_right").on("click", function() {
            listSwipe.goToNextSlide();
        });
        
        $(".introduce-rolling-page a").on("click", function() {
            var idx = $(this).index();

            listSwipe.goToSlide(idx);
        });

		// 페이지 스크롤
		$('.introduce-content01 .introduce-btn-set a').on('click', function(e){
			e.preventDefault();
			var idx = $(this).index() + 1;
			$('body, html').animate({
				scrollTop: $('.blueazit-introduce > div:eq(' + idx + ')').offset().top
			}, 1500);

		});

		$('.introduce-next-btn').on('click', function(e){
        	e.preventDefault();

        	$('body, html').animate({
				scrollTop: $('.blueazit-introduce > div:eq(1)').offset().top
			}, 1500);
        });
    }
}