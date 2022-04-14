document.addEventListener('DOMContentLoaded', function() {

	initElements();

	// открытие попапов
	function initModalLinks(element) {
		var $element = $(typeof(element) != 'undefined' ? element : 'body');
		$element.find('.js-modal-link').click(function(e) {
			e.preventDefault();
			showModal($(this).attr('href') ? $(this).attr('href').substring(1) : $(this).attr('data-target').substring(1));
		});
	}
	initModalLinks();

	// лайтбоксы для фотографий
	var galleries = new Array();
	$('.js-lightbox').each(function(i, a) {
		if (!$(a).is('[data-gallery]')) {
			$(a).magnificPopup({
				type: 'image',
				removalDelay: 300,
  				mainClass: 'mfp-fade',
				midClick: true
			});
		} else {
			if (typeof(galleries[$(a).attr('data-gallery')]) == 'undefined') galleries.push($(a).attr('data-gallery'));
		}
	});
	$.each(galleries, function(i, gallery) {
		$('.js-lightbox[data-gallery="' + gallery + '"]').magnificPopup({
			type: 'image',
			removalDelay: 300,
			callbacks: {
		        beforeOpen: function() {
		             $(this.contentContainer).removeClass('fadeOut').addClass('animated fadeIn');
		        },
		        beforeClose: function() {
		        	$(this.contentContainer).removeClass('fadeIn').addClass('fadeOut');
		        }
		    },
			gallery: {
				enabled: true
			},
			midClick: true
		});
	});

	// якорные плавные ссылки
	$('a.js-anchor').click(function(e) {
		e.preventDefault();

		_scrollTo($(this).attr('href'));
	});

	// бургер меню
	function burgerOpen() {
		var $burger = $('#burger-menu');
		if (!$burger.data('inited')) {
			$('#location').clone().removeAttr('id').addClass('location').prependTo($burger);
			//$('#mn-main').clone().removeAttr('id').addClass('mn-main').removeClass('tabs').appendTo('#burger-menu');
			initModalLinks($burger);
			$burger.data('inited', true);
		}
		$burger.css('display', 'flex');

		$('#modal-fadeout').stop().fadeIn(300);
		$('html').addClass('mobile-opened');
		var aside_h = parseInt($burger.css('padding-top')) + parseInt($burger.css('padding-bottom')) + $burger.children('.location').outerHeight(true) + $burger.children('.mn-main').outerHeight(true);
		//$('html').addClass('html-modal');
		if (aside_h > $(window).height()) $('html').addClass('html-modal-long');
	}
	function burgerClose() {
		//$('html').removeClass('html-modal mobile-opened');
		$('html').removeClass('mobile-opened');
		$('#modal-fadeout').stop().fadeOut(300, function() {
			$('#burger-menu').css('display', 'none');
		});
	}
	$('#ico-burger').click(function() {
		if ($(window).width() < 1350) {
			burgerOpen();
		}
	});
	$('#burger-menu .close').click(function() {
		if ($(window).width() < 1350) {
			burgerClose();
		}
	});
	$('#burger-menu').swipe({
		swipeRight: function(event, direction, distance) {
			if ($(window).width() < 1350) {
				burgerClose();
			}			
		},
		excludedElements: 'button, input, select, textarea, .noswipe',
		threshold: 20
	});

	// Боковое меню
	function sideCheckHeight() {
		var $side = $('#side-menu>.inner');
		var aside_h = parseInt($side.css('padding-top')) + parseInt($side.css('padding-bottom')) + $side.children('.top').outerHeight(true) + $side.children('.mn-side-bottom').outerHeight(true);
		if (aside_h > $(window).height()) $('html').addClass('html-modal-long');
	}
	function sideOpen() {
		var $side = $('#side-menu');
		$side.css('display', 'block');

		$('#modal-fadeout').stop().fadeIn(300);
		$('html').addClass('mobile-opened');
		sideCheckHeight();
	}
	function sideClose() {
		//$('html').removeClass('html-modal mobile-opened');
		$('html').removeClass('mobile-opened');
		$('#modal-fadeout').stop().fadeOut(300, function() {
			$('#side-menu').css('display', 'none');
		});
	}
	$('#logged-in').click(function() {
		sideOpen();
	});
	$('#side-menu .inner>.close').click(function() {
		sideClose();
	});
	$('#side-menu .inner').swipe({
		swipeRight: function(event, direction, distance) {
			sideClose();		
		},
		excludedElements: 'button, input, select, textarea, .noswipe',
		threshold: 20
	});
	// Переход ко второму уровню бокового меню
	$('#side-menu .js-link-level2').click(function(e) {
		e.preventDefault();

		var $level = $('#side-menu .inner-level2');
		var $block = $level.children('.' + $(this).attr('data-block-class'));
		$block.show().siblings('.block').hide();
		$level.addClass('act');
	});
	// Закрытие второго уровня бокового меню
	$('#side-menu .inner-level2>.close, #side-menu .inner-level2>.backlink>span').click(function() {
		var $level = $('#side-menu .inner-level2');
		$level.removeClass('act');
	});
	$('#side-menu .inner-level2').swipe({
		swipeRight: function(event, direction, distance) {
			var $level = $('#side-menu .inner-level2');
			$level.removeClass('act');
		},
		excludedElements: 'button, input, select, textarea, .noswipe',
		threshold: 20
	});
	// Переход к третьему уровню бокового меню
	$('#side-menu .js-link-level3').click(function(e) {
		e.preventDefault();

		var $level = $('#side-menu .inner-level3');
		var $block = $level.children('.' + $(this).attr('data-block-class'));
		$block.show().siblings('.block').hide();
		$level.addClass('act');
	});
	// Закрытие второго уровня бокового меню
	$('#side-menu .inner-level3>.close, #side-menu .inner-level3>.backlink>span').click(function() {
		var $level = $('#side-menu .inner-level3');
		$level.removeClass('act');
	});
	$('#side-menu .inner-level3').swipe({
		swipeRight: function(event, direction, distance) {
			var $level = $('#side-menu .inner-level3');
			$level.removeClass('act');
		},
		excludedElements: 'button, input, select, textarea, .noswipe',
		threshold: 20
	});

	// Селект
	$('.select').each(function(i, select) {
		$(select).data('default-value', $(select).find('.label').text());
		$(select).on('mousedown', function(e) {
			if (!$(this).hasClass('opened')) {
				$(this).addClass('opened');
			} else {
				if (!$(e.target).closest('.dd').length) {
					$(this).removeClass('opened');				
				}
			}
		});
		$(select).find('.dd input:checkbox, .dd input:radio').on('change', function() {
			var $dd = $(this).closest('.dd');
			var $select = $dd.closest('.select');
			var $label = $select.find('.label');
			if ($dd.find('input:checkbox:checked, input:radio:checked').length) {
				$select.addClass('selected');
				$label.css('width', $label.width());
				var values = new Array();
				$dd.find('input:checkbox, input:radio').each(function(i, cb) {
					if ($(cb).prop('checked')) {
						values.push($(this).siblings('label').text());
					}
				});
				$label.text(values.join(', '));
			} else {
				$select.removeClass('selected');
				$label.text($select.data('default-value'));
			}
		});
	});

	// Кнопка закрытия ворнинга
	$('.js-ok-btn').click(function() {
		$(this).closest('.warning').slideUp(__animationSpeed);
	});

	// Строка поиска
	if ($('.search').length) {
		// При вводе значения появляется иконка очистки строки, в противном случае, пропадает
		$('.search input:text').on('input', function() {
			if ($(this).val()) $(this).siblings('.clear').stop().fadeIn(__animationSpeed);
			else $(this).siblings('.clear').stop().fadeOut(__animationSpeed);
		});
		$('.search input:text').trigger('input');
		// По клику на иконку очистки очищается поисковая строка
		$('.search .clear').click(function() {
			$(this).stop().fadeOut(__animationSpeed).siblings('input:text').val('');
		});
	}

	// Тэги
	if ($('.tags').length) {
		// При клике на тег он подсвечивается
		$('.tags li').not('.select, .more').click(function(e) {
			e.preventDefault();
			$(this).toggleClass('act');
		});
		// При клике на пункт Еще показываются все скрытые теги
		$('.tags .more').click(function() {
			$('.tags .hidden').removeClass('hidden');
			$(this).remove();
		});
	}

	// Избранное
	if ($('.activities').length) {
		// При клике на сердечко отправляется запрос, сердце становится заполненным и наоборот
		$('.activities ul>li .favourite').click(function(e) {
			e.preventDefault();
			e.stopPropagation();

			if (!$(this).hasClass('act')) {
				$(this).addClass('act');
			} else {
				$(this).removeClass('act');
			}
		});
	}
	if ($('#event').length) {
		// При клике на сердечко отправляется запрос, сердце становится заполненным и наоборот
		$('#event .favourite').click(function(e) {
			e.preventDefault();
			e.stopPropagation();

			if (!$(this).hasClass('act')) {
				$(this).addClass('act');
			} else {
				$(this).removeClass('act');
			}
		});
	}
	if ($('.orglist').length) {
		// При клике на сердечко отправляется запрос, сердце становится заполненным и наоборот
		$('.orglist ul>li .favourite').click(function(e) {
			e.preventDefault();
			e.stopPropagation();

			if (!$(this).hasClass('act')) {
				$(this).addClass('act');
			} else {
				$(this).removeClass('act');
			}
		});
	}
	if ($('#organisation').length) {
		// При клике на сердечко отправляется запрос, сердце становится заполненным и наоборот
		$('#organisation .favourite').click(function(e) {
			e.preventDefault();
			e.stopPropagation();

			if (!$(this).hasClass('act')) {
				$(this).addClass('act');
			} else {
				$(this).removeClass('act');
			}
		});
	}

	// Модал выбора города
	if ($('.modal-location').length) {
		// открытие-закрытие вариантов на мобайле
		$('.modal-location .list>.mobile-more').click(function(e) {
			e.preventDefault();

			if (!$(this).hasClass('opened')) {
				$(this).closest('.list').find('.mobile-hidden').show();
				$(this).addClass('opened').children().text($(this).attr('data-opened-text'));
			} else {
				$(this).closest('.list').find('.mobile-hidden').hide();
				$(this).removeClass('opened').children().text($(this).attr('data-text'));
			}
		});

		// демо фильтрации городов по ключевику
		$('.modal-location .search input:text').on('input', function() {
			var keyword = $(this).val();
			var founded = 0;
			$('.modal-location .list>li').not('.more, .mobile-more').each(function(i, li) {
				if (!$(li).children('a').text().toLowerCase().includes(keyword.toLowerCase())) {
					$(li).hide();
				} else {
					$(li).show();
					founded++;
				}
			});
			if (!founded) {
				$('.modal-location .list>li').hide();
				$('.modal-location .not-found').show();
			} else {
				$('.modal-location .not-found').hide();
			}
		});
	}

	// Форма жалобы
	function checkComplainOther() {
		var $input = $('#form-complain .input-other textarea');
		return $input.val();
	}
	if ($('#form-complain').length) {
		$('#form-complain input[name=complain]').change(function() {
			// если нажата кнопка Другое открываем текстовый инпут
			if ($(this).val() == 'other') {
				$('#form-complain .input-other').stop().slideDown(__animationSpeed);
				$('#form-complain .input-other textarea').focus();
				if (checkComplainOther()) $('#form-complain .btn').removeAttr('disabled');
				else $('#form-complain .btn').prop('disabled', true);
			} else {
				$('#form-complain .input-other').stop().slideUp(__animationSpeed);
				$('#form-complain .btn').removeAttr('disabled');				
			}
		});

		$('#form-complain .input-other textarea').on('input', function() {
			if (checkComplainOther()) $('#form-complain .btn').removeAttr('disabled');
			else $('#form-complain .btn').prop('disabled', true);
		});
	}

	// Добавление еще даты в форме создания
	if ($('#add-form').length) {
		$('#add-date-time').click(function() {
			$('#date-time').clone().removeAttr('id').insertBefore($(this)).find('input.date').datepicker();
		});
	}

	// Подтверждение добавления мероприятия без тарифов
	if ($('#modal-publishing-confirm').length) {
		$('#modal-publishing-confirm .js-btn-add-tariffs').click(function(e) {
			e.preventDefault();

			hideModal();
			$('#link-tariffs').click();
		});
	}

	// Добавление в форме создания
	if ($('#add-tariff').length) {
		$('#add-tariff').click(function() {
			$('#tariff').clone().removeAttr('id').insertBefore($(this)).find('input.date').datepicker();
		});
	}
	if ($('#add-service').length) {
		$('#add-service').click(function() {
			$('#service').clone().removeAttr('id').insertBefore($(this)).find('input.date').datepicker();
		});
	}

	// Очистка формы
	$('.js-reset-form').click(function() {
		$(this).closest('form').trigger('reset');
	});

	// Стать организатором демонстрация
	$('#js-btn-become-org').click(function(e) {
		e.preventDefault();

		$('#side-menu .btn[data-target="#modal-become-org"]').hide();
		$('#side-menu').find('.badge').show();
		$('#side-menu').find('.mn-side').show();

		// Пересчет высоты боковой секции
		sideCheckHeight();
	});

	// Сохранение полей в профайле
	$('#js-edit-profile-change-email').click(function(e) {
		e.preventDefault();

		$(this).closest('.step1').stop().slideUp(__animationSpeed);
		$(this).closest('.step1').next('.step2').stop().slideDown(__animationSpeed);
	});

	// Подгрузка файла
	function uploadFile() {
		var file = document.getElementById("upload-file-input").files[0];
		var formdata = new FormData();
		formdata.append("photo", file);
		var ajax = new XMLHttpRequest();
		ajax.upload.addEventListener("progress", progressHandler, false);
		ajax.addEventListener("load", completeHandler, false);
		ajax.addEventListener("error", errorHandler, false);
		ajax.addEventListener("abort", abortHandler, false);
		ajax.open("POST", "file_upload_parser.php");
		ajax.send(formdata);
	}

	function progressHandler(event) {
		$progress = $('#upload-file-progress');
		percent = parseInt((event.loaded / event.total) * 100);
		$progress.find('.percent').text(percent);
	}

	function completeHandler(event) {
		$uploadHolder = $('#upload-file-uploaded').closest('.upload');
		$uploadHolder.find('.progress').hide()
			.siblings('.uploaded').show();
	}

	function errorHandler(event) {
		$uploadHolder = $('#upload-file-uploaded').closest('.upload');
		$uploadHolder.find('.progress').hide()
			.siblings('.error').show().children('.message').text('Upload failed');
	}

	function abortHandler(event) {
		$uploadHolder = $('#upload-file-uploaded').closest('.upload');
		$uploadHolder.find('.progress').hide()
			.siblings('.error').show().children('.message').text('Upload aborted');
	}

	$('#upload-file-input').on('change', function() {
		uploadFile();

		$uploadHolder = $(this).closest('.upload');
		$uploadHolder.find('.init').hide()
			.siblings('.progress').show();
	});

});