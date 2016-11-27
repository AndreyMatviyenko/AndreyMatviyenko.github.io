$(document).ready(function() {

		var getMax = function() {
				return $(document).height() - $(window).height();
		}

		var getValue = function() {
				return $(window).scrollTop();
		}

		var progressBar = $('.progress-bar'),
				max = getMax(),
				value, width;

		var getWidth = function() {
				// Calculate width in percentage
				value = getValue();
				width = (value / max) * 100;
				width = width + '%';
				return width;
		}

		var setWidth = function() {
				progressBar.css({ width: getWidth() });
		}

		//Chats scripts

		var qList = {
			1: [{"question": "Как дела?","answer": "Отлично!"},
					{"question": "Андрей?","answer": "Да!"}],
			2: [{"question": "Ты тут?","answer": "Нет?"},
					{"question": "q22?","answer": "!22?"}],
			3: [{"question": "q3?","answer": "!3?"},
					{"question": "q32?","answer": "!32?"}]
		};

		function preloadQuestion(category) {
			var obj = qList;
			var cat = +category;
			for(var i = 0; i < obj[cat].length; i++){
				answer = obj[cat][i].answer;
				question = obj[cat][i].question;
				var qSelect = $('#q_quest');
				var qOption = $('<option>', {
					'text': question,
					'value': answer
				});
				$(qSelect).append(qOption);
			}			
			$(".chat-question").text(obj[cat][0].question);
			document.getElementById('sendToChat').disabled = false;
		}

		$("#q_cat").change(function() {
			var cat = $(this).val();
			if (cat != 0){
				$('#q_quest option').remove();
				preloadQuestion(cat);
			} else {
				$('#q_quest option').remove();
				document.getElementById('sendToChat').disabled = true;
			}
		});

		$("#q_quest").change(function() {
			var quest = $(this).find("option:selected").text();
			$(".chat-question").text(quest);
		});

		$('#sendToChat').click(function(){
			var date = new Date();
      var time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
			var content = $('#q_quest').find("option:selected").text();
			var answer = $('#q_quest').find("option:selected").val();
			var guest = $('<div class="chat-message right"><img class="message-avatar" src="img/quest.jpg" alt="" ><div class="message"><span class="message-content">' + content + '</span></div><span class="message-date">' + time + '</span></div>');
			var myAnswer = $('<div class="chat-message left"><img class="message-avatar" src="img/my_photo.jpg" alt="" ><div class="message"><span class="message-content">' + answer + '</span></div><span class="message-date">' + time + '</span></div>');
			$('.chat-discussion').append(guest, myAnswer);
		})

		$(document).on('scroll', setWidth);
		$(window).on('resize', function() {
				// Need to reset the Max attr
				max = getMax();
				setWidth();
		});

		$(".toggle-mnu").click(function() {
				$(this).toggleClass("on");
				$(".menu").toggleClass("on");
		});

		//Цели для Яндекс.Метрики и Google Analytics
		$(".count_element").on("click", (function() {
				ga("send", "event", "goal", "goal");
				yaCounterXXXXXXXX.reachGoal("goal");
				return true;
		}));

		//SVG Fallback
		if (!Modernizr.svg) {
				$("img[src*='svg']").attr("src", function() {
						return $(this).attr("src").replace(".svg", ".png");
				});
		};

		//Chrome Smooth Scroll
		try {
				$.browserSelector();
				if ($("html").hasClass("chrome")) {
						$.smoothScroll();
				}
		} catch (err) {

		};

		$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});
