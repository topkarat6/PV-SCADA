var delay = 2000, value = 0, valueStore = 0, tick = 1, tickStore = 1, tickDiff = 0, tickDiffValue = 0;
function valBetween(v, min, max) {
	return (Math.min(max, Math.max(min, v)));
}
(function loop() {
	value = Math.ceil(Math.random() * 100);
	tick = valBetween(Math.ceil((value/100)*28), 1, 28);
	tickDiff = Math.abs(tick-tickStore);
	tickDiffValue = Math.abs(value-valueStore)/tickDiff;
	console.log("tickDiff: "+tickDiffValue+" * "+tickDiff+" = "+(tickDiffValue*tickDiff));
	var counter = 0, valueStoreTemp = valueStore, tickStoreTemp = tickStore;
	if (value > valueStore) {
		for (i=tickStoreTemp; i<=tick; i++) {
			(function(i){
				setTimeout(function() {
					$('body').css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 50%), linear-gradient('+$('#gauge path:nth-child('+i+')')[0].style.fill+', '+$('#gauge path:nth-child('+i+')')[0].style.fill+' 50%, #fff 50%)');
					$('#gauge').css('box-shadow', '0 0 32px rgba(21, 55, 172, 0.25), inset 0 -192px 192px -240px '+$('#gauge path:nth-child('+i+')')[0].style.fill+', inset 0 0 2px -1px '+$('#gauge path:nth-child('+i+')')[0].style.fill);
					$('#gauge path:nth-child('+i+')').show();
					$('#gauge-label')
						.css('color', $('#gauge path:nth-child('+i+')')[0].style.fill)
						.text(Math.ceil(valueStoreTemp+(tickDiffValue*Math.abs(tickStoreTemp-i))));
					if (i==tick) { $('#gauge-label').text(value); }
					// console.log(i);
				}, 50 * counter);
				counter++;
			}(i));
		}
	} else if (value < valueStore) {
		for (i=tickStoreTemp; i>=tick; i--) {
			(function(i){
				setTimeout(function() {
					$('body').css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 50%), linear-gradient('+$('#gauge path:nth-child('+i+')')[0].style.fill+', '+$('#gauge path:nth-child('+i+')')[0].style.fill+' 50%, #fff 50%)');
					$('#gauge').css('box-shadow', '0 0 32px rgba(21, 55, 172, 0.25), inset 0 -192px 192px -240px '+$('#gauge path:nth-child('+i+')')[0].style.fill+', inset 0 0 2px -1px '+$('#gauge path:nth-child('+i+')')[0].style.fill);
					$('#gauge path:nth-child('+i+')').hide();
					$('#gauge-label')
						.css('color', $('#gauge path:nth-child('+i+')')[0].style.fill)
						.text(Math.floor(valueStoreTemp-(tickDiffValue*Math.abs(tickStoreTemp-i))));
					if (i==tick) { $('#gauge-label').text(value); }
					// console.log(i);
				}, 50 * counter);
				counter++;
			}(i));
		}
	}
	valueStore = value;
	tickStore = tick;
	window.setTimeout(loop, delay);
})();