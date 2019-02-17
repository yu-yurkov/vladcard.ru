
// A $( document ).ready() block.
$( document ).ready(function() {

        $('[type="tel"]').mask("+7 (999) 999-99-99");  


    // валидация формы обратной связи
    $('body').on('click','.form .submit', function(e){

        var form;
        var required;
        var counter = 0;

        form = $(this).parents(".form");
        required = $(form).find('[required="required"]');

        required.each(function(indx, element){

            var field = $(element);
            var fieldParent = field.parent();
            var fieldLabel = field.siblings('label');

            //проверяем заполнение полей
            if(field.val() == 0){
                if(fieldParent.find(".error-notify").length == 0){
                    //$(element).parent().append('<p class="error-notify">необходимо заполнить поле "'+ fieldLabel.text() +'"</p>');
                    $(element).parent().append('<p class="error-notify">необходимо заполнить поле</p>');
                }
                counter++;
            }else{
                fieldParent.find('.error-notify').remove();
            }

        });

        if(counter>0){
            return false;
        }

    });

   // убираем подсказку при клике на поле ввода
    $('body').on('click','.form.feedback', function(e){
        $(e.target).siblings('.error-notify').remove();
    });




$('body').on('click','#phone_number>div>span', function(e){
        $('#phone_number .contacts').toggle();
        $(this).toggleClass('drop');
    });


function setRange(range){
		var rangePos = (range*100)/10000
		document.getElementById('range').style.background = '-webkit-linear-gradient(left ,#ffd625 0%,#ffd625 '+rangePos+'%,#fff '+rangePos+'%, #fff 100%)';
		document.getElementById('range').style.height = '10px';
	}

	function rangeFunc() {
		range = document.getElementById('range').value;
		document.getElementById("quantity").value = range;
		setRange(range);
		calc();
	}

	function calc(){
		var quantity = $('#quantity').val();
		var price_of_one = recalc();
		var total = quantity*price_of_one;

		// доставка
		var delivery = 0;
		if($("#c_delivery").prop("checked") == true){
            if(total < 500) delivery = 100;
			$(".delivery").show();
			var arr = String(delivery.toFixed(2)).split('.');
			$('#delivery b').html(formatStr(arr[0]) + ',<span>'+arr[1]+'</span>');
        } else{
			$(".delivery").hide();
        }
		// работа с макетом
		var maket = 0;
         if($("#c_maket").prop("checked") == true) maket = 500;

        /*
        if($("#c_maket").prop("checked") == true){
            maket = 500;
			// показываем на калькуляторе
		   ".maket-work").show();
			var arr = String(maket.toFixed(2)).split('.');
			$('#maket-work b').html(formatStr(arr[0]) + ',<span>'+arr[1]+'</span>');
        }else{
			$(".maket-work").hide();
        }
        */

		// стоимость за 1 шт
   		var arr = String(price_of_one.toFixed(2)).split('.');
		$('#price-of-one b').html(formatStr(arr[0]) + ',<span>'+arr[1]+'</span>');

        // сумма всех услуг
		var sum = total+delivery+maket;

		// стоимость тиража
		var arr = String(sum.toFixed(2)).split('.');



		$('#total b').html(formatStr(arr[0]) + ',<span>'+arr[1]+'</span>');



		/*
        // скидка
		var discount = 0;
		if($('#discount-field').val()>0){
			discount = $('#discount-field').val();
			discount_sum = (sum/100)*discount;
		}

		var arr = String(discount_sum.toFixed(2)).split('.');
		$('#discount b').html(formatStr(arr[0]) + ',<span>'+arr[1]+'</span>');

		// итоговая сумма
	 	var total_payment = sum - discount_sum;
		var arr = String(total_payment.toFixed(2)).split('.');
		$('#total-payment b').html(formatStr(arr[0]) + ',<span>'+arr[1]+'</span>');
        */

	}

	function formatStr(str) {
		str = str.replace(/(\.(.*))/g, '');
		var arr = str.split('');
		var str_temp = '';
		if (str.length > 3) {
		    for (var i = arr.length - 1, j = 1; i >= 0; i--, j++) {
		        str_temp = arr[i] + str_temp;
		        if (j % 3 == 0) {
		            str_temp = ' ' + str_temp;
		        }
		    }
		    return str_temp;
		} else {
		    return str;
		}
	}

    function recalc(){

		var calc_count = [0, 100, 200, 300, 400, 500, 1000, 2000, 3000, 5000, 10000, ];

		price = 0;

        var quantity = $('#quantity').val();

        index = 0;

        for(i = 0; i < calc_count.length; i++){
            if(quantity<calc_count[i]){
                break;
            }
        }

        index = i - 1;

        // 4+0, 4+1, 4+4 ...
        var color = $('.c_colors:checked').val();
        color_price = [[17.5,16.5,16.0,15.5,15,13,8,7.5,7,6,5.5], [18.5,17.5,17.0,16.5,16,14,8.5,8,7.5,6.25,6], [20.0,19.0,18.5,18.0,17.5,15,9,8.5,8,6.5,6.2]];
        color_price = color_price[color][index];
        price += color_price;

        // Цветной пластик
        colored = $('.c_colored:checked').val();
        if(colored == 0){
            colored_price = 0;
        } else {
            colored_price = [2.5,2.5,2.5,2.5,2.5,2.5,2.5,2,2,2,2];
            colored_price = colored_price[index];
        }

        price += colored_price;

        // Глянец, текстура, матовая

        textured = ($('.c_textured:checked').val());

        if(textured == 0){
            colored_price = 0;
        } else {
            colored_price = [2,2,2,2,2,2,1.5,1,1,1,0,5];
            colored_price = colored_price[index];
        }

        price += colored_price;

        // Магнитка
        if($("#c_magnet").prop('checked') == true){
            tmp = [5,4.5,4.5,4.5,4.5,4.5,4.5,4,4,2.5,2];
            price += tmp[index];

        }

        // нумерация
        if($("#c_variable").prop("checked") == true){
            tmp = [3,2.5,2.5,2.5,2.5,2.5,2.5,2.25,2,1,0.75];
            price += tmp[index];
        }

        // штрих-код
        if($("#c_barcode").prop("checked") == true){
            tmp = [3.0,2.5,2.5,2.5,2.5,2.5,2.5,2.25,2,1,0.75];
            price += tmp[index];
        }

        // Эмбоссирование
        if($("#c_emboss").prop("checked") == true){
            tmp = [3,2.5,2.5,2.5,2.5,2.5,2,2,2,2,2];
            price += tmp[index];
        }

        // Типирование
        if($("#c_typing").prop("checked") == true){
            tmp = [3,2.5,2.5,2.5,2.5,2.5,2,1.5,1.25,1,0.75];
            price += tmp[index];
        }

        // Тиснение фольгой
        if($("#c_foil").prop("checked") == true){
            tmp = [8,7,7,7,7,7,5.5,5,5,4,3.5];
            price += tmp[index];
        }

        // Чип
        if($("#c_chip").prop("checked") == true){
            tmp = [15,15,15,15,15,15,15,14,14,12,12];
            price += tmp[index];
        }

		// Чип mifare
        if($("#c_chip_mifare_1k").prop("checked") == true){
            tmp = [15,15,15,15,15,15,15,14,14,12,12];
            price += tmp[index];
        }

		// Чип mifare s70
        if($("#c_chip_mifare_4k").prop("checked") == true){
            tmp = [45,45,45,45,45,45,45,45,44,44,44];
            price += tmp[index];
        }

		// Чип mifare ultralight
        if($("#c_chip_mifare_ultralight").prop("checked") == true){
            tmp = [20,20,20,20,20,20,20,20,19,18,18];
            price += tmp[index];
        }

		// Чип I Code
        if($("#c_chip_icode").prop("checked") == true){
            tmp = [25,25,25,25,25,25,25,25,24,23,23];
            price += tmp[index];
        }

        // Пакетики
        if($("#c_pack").prop("checked") == true){
            tmp = [1,1,1,1,1,1,1,0.85,0.85,0.85,0.85];
            price += tmp[index];
        }


		return price;

       /* $('#price_one').html(price);
        p_all = Math.round(price*count/10)*10;
        if(p_all < 500) {p_all = 500;}
        $('#price_all').html(p_all);*/

    }

	// события
	$('body').on('change','.form input[type="checkbox"], .form input[type="radio"]', function(e){
	  calc();
	});

	//$('bode').on('oninput', '#range', function(e){
	$('body').on('input', '#range', function(e){

		 rangeFunc();
	});


	$('body').on('keyup','#quantity', function(e){

	   if($(this).val()>0 && $(this).val()<=10000){
	   		$('#range').val($(this).val());
			rangeFunc();
	   }

	   if($(this).val()>10000){
	   		setRange(10000);
			$('#range').val($(this).val());
	   }

	    if($(this).val()<=0){
	   		setRange(1);
			$('#range').val(1);
	   }

	   calc();
	});

	// выбор чипа
	$('body').on('change','.chip-group',function(e){
		if($(this).prop("checked") == false){
			$(this).prop('checked', false);
			calc();
			return;
		}

		$('.chip-group').prop('checked', false);
		$(this).prop('checked', true);
		calc();
	});


	rangeFunc();




// A $( document ).ready() block.
});