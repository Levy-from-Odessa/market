$(function () {

	$(".cross").hide();
	$(".burger__menu").hide();

	$(".burger").click(function () {
		$(".burger__menu").slideToggle("slow", function () {
			$(".burger").hide();
			$(".cross").show();
		});
	});


	$(".cross").click(function () {
		$(".burger__menu").slideToggle("slow", function () {
			$(".cross").hide();
			$(".burger").show();
		});
	});


	$('.woman__slider').hide();
	$('#btnWoman').click(function () {
		$('.man__slider').hide();
		$('.woman__slider').show();
	})
	$('#btnMan').click(function () {
		$('.woman__slider').hide();
		$('.man__slider').show();
	})
	let translateWidth = 0;
	let slideNow = 1;
	let slideCount = $('#slidewrapper').children().length;

	function nextSlide() {
		if (slideNow >= slideCount || slideNow <= 0) {
			$('#slidewrapper').css('transform', 'translate(0, 0)');
			slideNow = 1;
		} else {
			translateWidth = -$('#viewport').width() * (slideNow);
			$('#slidewrapper').css({
				'transform': 'translate(' + translateWidth + 'px, 0)',
				'-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
				'-ms-transform': 'translate(' + translateWidth + 'px, 0)',
			});
			slideNow++;
		}
	}

	function prevSlide() {
		if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
			translateWidth = -$('#viewport').width() * (slideCount - 1);
			$('#slidewrapper').css({
				'transform': 'translate(' + translateWidth + 'px, 0)',
				'-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
				'-ms-transform': 'translate(' + translateWidth + 'px, 0)',
			});
			slideNow = slideCount;
		} else {
			translateWidth = -$('#viewport').width() * (slideNow - 2);
			$('#slidewrapper').css({
				'transform': 'translate(' + translateWidth + 'px, 0)',
				'-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
				'-ms-transform': 'translate(' + translateWidth + 'px, 0)',
			});
			slideNow--;
		}
	}

	$('#next-btn').click(function () {
		nextSlide();
	});

	$('#prev-btn').click(function () {
		prevSlide();
	});



	let navBtnId = 0;

	$('.slide-nav-btn').click(function () {
		navBtnId = $(this).index();
		$('.slide-nav-btn').not($(this)).css({
			'background':'#333'
		})
		console.log(navBtnId);
		if (navBtnId + 1 != slideNow) {
			$(this).css({
				'background':'#fff'
			})
			translateWidth = -$('#viewport').width() * (navBtnId);
			$('#slidewrapper').css({
				'transform': 'translate(' + translateWidth + 'px, 0)',
				'-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
				'-ms-transform': 'translate(' + translateWidth + 'px, 0)',
			});
			slideNow = navBtnId + 1;
		}
	});

});