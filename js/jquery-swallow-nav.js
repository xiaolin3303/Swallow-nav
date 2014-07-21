/*!
 * Swallow-nav v1.0
 *
 * Contact: https://github.com/xiaolin3303
 * 2014-07-20
 *
 * Designed and built with all the love of Web
 */
(function($){
	$.fn.swallow_nav = function(option, callback){
		var context = $(this);
		
		var _option = $.extend({
					'list': [],
				}, option);

		var _args = {};

		var calculateWrapHeight = function() {
			var _height = $('.list > li', context).size() * 40 + 40;
			return _height;
		};

		var createHTML = function() {
			var _html = [];
			_html.push('<ul class="list slide-in-anmiation" style="display:none">');
			for(var i = 0, len = _option.list.length; i < len; i++) {
				_html.push('<li>');
				_html.push('<a href="'+(_option.list[i].href || 'javascript:;')+'" data-index="'+i+'">' + _option.list[i].cnt + '</a>');
				_html.push('</li>');
			}
			_html.push('</ul>');
			_html.push('<span class="control-btn expand"><i></i></span>');

			return _html.join('');
		}

		var init = function() {
			context.addClass('swallow-nav');
			context.html(createHTML());

			_args.warpHeight = calculateWrapHeight();
		}

		init();

		$('.control-btn', context).on('click', function() {
			if($(this).hasClass('close')) {
				$('.list', context).hide();
				context.css({'height': 40, 'width': 40});
				$(this).removeClass('close').addClass('expand');
			}else{
				$('.list', context).show();
				context.css({'height': _args.warpHeight, 'width': 250});
				$(this).removeClass('expand').addClass('close');
			}
		});

		context.on('click', '.list > li > a', function(e) {
			var _href = $(this).attr('data-href'),
				_index = $(this).attr('data-index');

			if(typeof _option.onItemClick === 'function') {
				if(_option.onItemClick(_option.list[_index]) === false) {
					e.preventDefault();
				}
			}
		});
	};
})(jQuery);