window.onload = function () {
	let number = document.querySelector('input[type=number]'),
		range = document.querySelector('input[type=range]');
	let main = document.querySelector('.main'),
		progress = document.querySelector('.proc');



	function Form() {

		let max = 100, min = 0;
		let steps = {
			step1: 20,
			step2: 50,
			step3: 75
		};
		number.min = min;
		range.max = max;
		range.min = min;

		let tax = {
			veryLow: 0.02,
			low: 0.04,
			medium: 0.06,
			high: 0.08
		};

		this.setVeryLow = function (veryLow) {
			veryLow >= 0 ? tax.veryLow = veryLow / max : '';
		};
		this.setLow = function (low) {
			low >= 0 ? tax.low = low / max : low;
		};
		this.setMedium = function (medium) {
			medium >= 0 ? tax.medium = medium / max : '';
		};
		this.setHigh = function (high) {
			high >= 0 ? tax.high = high / max : '';
		};

		// Основной шаг. Вызивает 2-е фунции, присвоение и заполнение графика
		function mainStep(value, tax) {
			assignment(value);
			whichStep(value, tax);
		}
		// Делает основные присвоения
		function assignment(value) {
			main.style.height = value + 'px';
			number.value = value;
			range.value = value;
			console.dir(number);
		}
		// Заполняет график
		function whichStep(value, step) {
			progress.style.height = value * step + 'px';
		}

		this.point = function (value) {

			if (value < steps.step1 && value >= min) {

				mainStep(value, tax.veryLow);

			} else if (value >= steps.step1 && value < steps.step2) {

				mainStep(value, tax.Low);

			} else if (value >= steps.step2 && value < steps.step3) {

				mainStep(value, tax.medium);

			} else if (value >= steps.step3 && value <= max) {

				mainStep(value, tax.high);

			} else if (value > max) {

				mainStep(max, tax.high);
			};
		}
	};

	number.addEventListener('input', function () {

		let value = number.value;
		start.point(value);
	});

	range.addEventListener('input', function () {

		let value = range.value;
		start.point(value);
	});

	let start = new Form();

	console.dir(start);

	/*
	Можно переопределить % комиссии
	start.setVeryLow(число)
	start.setLow(число)
	start.setMedium(число)
	start.setHigh(число)
	*/
};