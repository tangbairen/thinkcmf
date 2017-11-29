/**
 * UI 공통 스크립트
 */
function UI() {
	var _this = this;
	
	/**
     * UI.checkUserAgent
     */
	_this.checkUserAgent = function(){
		function isIE () {
		      var myNav = navigator.userAgent.toLowerCase();
		      return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
		}
		
		var_isIE = isIE();

	    if (var_isIE) {
	    	var version;
	    	
	    	if (var_isIE == 11) {
                $("body").addClass("IE11");
            } else if (var_isIE == 10) {
                $("body").addClass("IE10");
            } else if (var_isIE == 9) {
                $("body").addClass("IE9");
            } else if (var_isIE == 8) {
                $("body").addClass("IE8");
            } else {

            }
	    	
	    	return var_isIE;
        } else {
        	return false;
        }
	};
	
	/**
     * UI.layout
     */
	_this.layout = function() {
		var self = this;

	    self.getMode = function() {
	    	var winW = $(window).width();
			var winH = $(window).height();
			var mode = '';
			
			if (winW <= 767) {
				mode = 'MOBILE';
			} else if (winW <= 1199) {
				mode = 'TABLET';
			} else if (winW > 1199) {
				mode = 'PC';
			}

			_this.mode = mode;
			
			return mode;
	    };
	    
	    self.eventBind = function() {
	    	var preMode = _this.getMode();
	    	
	    	$(window).on('resize', function() {
	    		var mode = _this.getMode();
	    		
	    		if (mode != preMode) {
	    			preMode = mode;
				
		    		// breakpoint 변경이 되는 시점에 컨텐츠 & 이벤트 다시 세팅
	    			if (self._gnb.reset != undefined) {
	    				self._gnb.reset(mode);
	    			}
		    		
	    			if (self._utilMenu.reset != undefined) {
	    				self._utilMenu.reset(mode);
	    			}
		    		
	    			if (self._goTopBtn.reset != undefined) {
	    				self._goTopBtn.reset(mode);
	    			}
	    		}
	    	});
	    };
	    
	    self.init = function() {
	    	self.eventBind();
	    	
	    	if (self._goTopBtn.reset != undefined) {
	    		self._goTopBtn.reset(self.getMode());
	    	}
	    }
	    
	    self.init();
	};
	
	/**
     * UI.gnb
     */
	_this.gnb = function($_scope) {
		var self = this;
        var $_scope = $_scope;
        
        if (!$_scope.length) return false;
        
        self.eventBind = function() {
        	// 모바일 GNB 열기
        	$('.btn_slide_menu').on('click', function(e) {
        		e.preventDefault();
        		
        		$('body').addClass('slide-menu-active');

        		$('.slide-menu').css({'left': -255}).stop(true, true).animate({'left': 0}, 500);
        		$('.wrap').css({'left': 0}).stop(true, true).animate({'left': 255}, 500);

                $('#skip-nav > a').attr('tabindex', -1);
                $('.btn-login-open').attr('tabindex', 1).focus();
        	});

        	// 모바일 GNB 닫기
        	$('.btn-close-slide').on('click', function(e) {
        		e.preventDefault();
        		$('.login-panel').removeClass('active');
        		$('.slide-menu').stop(true, true).animate({'left': -255}, 500, function(){
        			$('body').removeClass('slide-menu-active');
        		});

        		$('.wrap').stop(true, true).animate({'left': 0}, 500);
                $('#skip-nav > a').removeAttr('tabindex');
                $('.btn-login-open').removeAttr('tabindex');
                $('.btn_slide_menu').focus();
        	});

        	// PC GNB
        	$('#gnb').on('mouseenter', function() {
        		self.openSubMenuPC();
        	}).on('mouseleave', function() {
        		self.closeSubMenuPC();
        	});

        	// 접근성
        	$('#gnb a').on('focusin', function() {
        		self.openSubMenuPC();
        	});

        	$('#gnb a').first().on('keydown', function(e) {
        		if (e.keyCode == 9 && e.shiftKey) {
        			self.closeSubMenuPC();
        		}
        	});
        	
        	$('#gnb a').last().on('keydown', function(e) {
        		if (e.keyCode == 9 && !e.shiftKey) {
        			self.closeSubMenuPC();
                    $('.util a:first').focus();
                    return false;
        		}
        	});
        };

        // PC 서브메뉴 열기
        self.openSubMenuPC = function() {
        	$('#header').addClass('hover');
        	$('#header .drop-menu').stop(true, true).slideDown(300);
        	// ie8에서 header 높이 조정해야함
    		$('.dep2-bg').stop(true, true).show().animate({'height': 146}, 300);
        };
        
        // PC 서브메뉴 닫기
        self.closeSubMenuPC = function() {
        	$('#header .drop-menu').stop(true, true).slideUp(300, function(){
        		$('#header').removeClass('hover');
        	});
        	$('#header .drop-menu').stop(true, true).slideUp(300);
    		$('.dep2-bg').stop(true, true).animate({'height': 0}, 300, function(){
    			$(this).hide();
    		});
        };
        
        self.reset = function(mode) {
        	if (mode == 'PC') {
        		$('.slide-menu').css({'left': 0});
        		$('.wrap').css({'left': 0});
        		$('body').removeClass('slide-menu-active');
        	}
        };
        
        self.init = function() {
            self.eventBind();
        };
        
        self.init();
	};
	
	_this.utilMenu = function($_scope) {
		var self = this;
        var $_scope = $_scope;
        
        if (!$_scope.length) return false;

        self.eventBind = function() {
        	// PC 로그인 열기 버튼
        	$('.util-btn-login').on('click', function(e){
        		e.preventDefault();

        		// PC 검색 영역 닫기
        		$('.util-bar.search .btn-utilbar-close').click().stop(true, true);

        		$('.util-bar.login').addClass('active').css('top', 0).stop(true, true).animate({'top': 90});
        		$('body').addClass('util-open');
                $('#util-login-id').focus();
                //location.href = $("#loginPage").val(); ///apps/odysseymen/kr/ko/components/pages/template/base/header.jsp
        	});

        	// PC 로그인 닫기 버튼
        	$('.util-bar.login .btn-utilbar-close').on('click', function(e){
        		e.preventDefault();
        		
        		$('.util-bar.login').removeClass('active').css('top', 90).stop(true, true).animate({'top': 0}, function(){
        			$('body').removeClass('util-open');
        			$('#header .drop-menu').hide();
                    $('.util-btn-login').focus();
        		});
        	});
        	
        	// PC 검색 열기 버튼
        	$('.btn-searchbar-toggle').on('click', function(e){
        		e.preventDefault();

        		// PC 로그인 영역 닫기
        		$('.util-bar.login .btn-utilbar-close').click().stop(true, true);
        		
        		$('.util-bar.search').addClass('active').stop(true, true).animate({'top': 90});
        		$('body').addClass('util-open');
        	});
        	
        	// PC 검색 닫기 버튼
        	$('.util-bar.search .btn-utilbar-close').on('click', function(e){
        		e.preventDefault();
        		
        		$('.util-bar.search').removeClass('active').css('top', 90).stop(true, true).animate({'top': 0}, function(){
        			$('body').removeClass('util-open');
        			$('#header .drop-menu').hide();
        		});
        	});
        	
        	// 모바일 검색 열기 버튼
        	$('.btn-top-search-toggle').on('click', function(e){
        		e.preventDefault();
        		$('.m-head-search').addClass('active');
				$('#m-search-input').focus();
        	});

			$('#m-search-input').on('focusout', function() {
                if ($('#m-search-input').val()) {
                } else {
                    $('.m-head-search').removeClass('active');
                }
        	});

        	// 모바일 로그인 열기 버튼
        	$('.btn-login-open').on('click', function(e){
        		e.preventDefault();

        		$('.login-panel').addClass('active');
                $('#slide-login-id').focus();
                //location.href = $("#loginPage").val(); ///apps/odysseymen/kr/ko/components/pages/template/base/header.jsp
        	});
        };
        
        self.reset = function(mode) {
        	if (mode == 'PC') {
        		$('.m-head-search').removeClass('active');
        		$('.login-panel').removeClass('active');
        	} else if (mode == 'TABLET' || mode == 'MOBILE') {
        		$('.util-bar.login').removeClass('active').css('top', 0);
        		$('.util-bar.search').removeClass('active').css('top', 0);
        		$('.util-open').removeClass('active');
        		$('body').removeClass('util-open');
        	}
        };
        
        self.init = function() {
            self.eventBind();
        };
        
        self.init();
	};
	
	/**
     * UI.placeHolder
     */
	_this.placeHolder = function($_scope) {
        var self = this;
        var $_scope = $_scope;
        
        if (!$_scope.length) return false;
        
        self.createPlaceHolder = function() {
            $_scope.each(function(){
                $_scope.placeholderEnhanced();
            });
        };
        
        self.init = function() {
            self.createPlaceHolder();
        };
        
        self.init();
    };
    
    /**
	 * UI.goTopBtn
	 */
    _this.goTopBtn = function($_scope) {
    	var self = this;
        var $_scope = $_scope;
        
        if (!$_scope.length) return false;
        
        self.eventBind = function() {
        	$_scope.on('click', function(e) {
        		e.preventDefault();
        		var target = $($(this).attr('href'));
        		if (target.length == 0) return false;
        		
        		var posTop = target.offset().top;
				posTop = 0;
        		$('html, body').stop(true, true).animate({scrollTop: posTop}, 1000);
        	});

        	$(window).scroll(function(){
        		self.checkVisibility();
            });
        };
        
        self.checkVisibility = function() {
        	var scrollTop = $(window).scrollTop();
        	var winH = $(window).height();
        	var docH = $(document).height();
        	
        	if (scrollTop > winH / 3) {
        		$_scope.show();
        	} else {
        		$_scope.hide();
        	}
        };
        
        self.calcPos = function(mode) {
    		var pos = 0;
    		var variable1 = 0;
    		var variable2 = 0;
    		
    		if (mode == 'PC' || mode === 'TABLET') {
    			variable1 = -135;
    			variable2 = 50;
    		} else if (mode == 'MOBILE') {
    			variable1 = -191;
    			variable2 = 121;
    		}

    		if ($(document).height() - $(window).height() > $(document).scrollTop() + variable2) {
    			pos = $(window).height() + variable1 + variable2;
        	} else {
        		pos = $(window).height() + variable1;
        	}
    		
    		return pos;
    	}
        
        self.reset = function(mode) {
        	var quick_menu = $_scope;
        	var pos = 0;
        	var scrollTop = parseInt($(document).scrollTop(), 10);
        	var winH = $(window).height();
        	
        	pos = self.calcPos(mode);
        	
    		quick_menu.animate( { "top": $(document).scrollTop() + pos +"px" }, 300 );
    		
    		if (!self.initFlag) {
    			self.initFlag = true;
    			
    			$(window).resize(function(){
    				self.reset(_this.mode);
    			});
    			
	    		$(window).scroll(function(){
	    			pos = self.calcPos(_this.mode);

	    			quick_menu.stop(true, true);
	    			quick_menu.animate( { "top": $(document).scrollTop() + pos + "px" }, 300 );
	    		});
    		}
        	
        	

        };
        
        self.init = function() {
        	self.initFlag = false;
        	
            self.eventBind();
            
            self.checkVisibility();
        };
        
        self.init();
    };
    
    /**
	 * UI.common
	 */
    _this.common = function() {
		var self = this;
		
		// Check UserAgent
        self._checkUserAgent = self.checkUserAgent();

		// GNB
		self._gnb = new self.gnb($('#gnb'));

		// Util Menu Login
		self._utilMenu = new self.utilMenu($('.util'));

		// Placeholder for IE8,9 fix
		if (self._checkUserAgent == 8 || self._checkUserAgent == 9) {
			self._placeHolder = new self.placeHolder($('input[placeholder], textarea[placeholder]'));
		}
		
		// Go Top Button
		self._goTopBtn = new self.goTopBtn($('.btn-go-top'));

        // Layout
        self._layout = self.layout();
	};
	
	_this.common();
};

var ui = new UI();