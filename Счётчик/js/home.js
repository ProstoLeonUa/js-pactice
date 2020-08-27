window.onload = function () {
	let button = document.querySelectorAll('.button');
	let counter = document.querySelectorAll('.counter');
	let clear = document.querySelector('.clearcounters');
	let set = document.querySelector('.setcounter');
	let block = document.querySelectorAll('.block');


	let store = {
		setInStore: function (key, value) {
			localStorage.setItem(key, value);
		},
		getFromStore: function (key) {
			return localStorage.getItem(key);
		}
	};

	let getStore = function (counter, block) {
		for (let i = 0; i < counter.length; i++) {
			counter[i].innerHTML = store.getFromStore(`counter-${i}`) || 0;
			block[i].style.backgroundColor = store.getFromStore(`color-${i}`);

		};
	};

	getStore(counter, block);

	button.forEach((item, i) => {
		item.addEventListener('click', () => {
			click(i);
		});
	});

	clear.addEventListener('click', () => {

		for (let i = 0; i < counter.length; i++) {
			store.setInStore(`counter-${i}`, 0);
			counter[i].innerHTML = 0;
			colorDefult(i);
		}
	});

	set.addEventListener('click', () => {
		setData(counter.length);
	});
	// Запись для клика
	function click(i) {

		let counterValue = ++counter[i].innerHTML;
		store.setInStore(`counter-${i}`, counterValue);
		color(i, counterValue);
	};
	// ЦВЕТ
	function color(i, counterValue) {
		let x = Math.round(Math.random() * 256);
		let y = Math.round(Math.random() * 256);
		let z = Math.round(Math.random() * 256);

		if (counterValue < 50) {

			block[i].style.backgroundColor = `rgb(${x}, ${y}, ${z})`
			store.setInStore(`color-${i}`, `rgb(${x}, ${y}, ${z})`);
		}
		else {
			colorDefult(i);
		}
	}
	// ЦВЕТ cтандарнтый
	function colorDefult(i) {
		block[i].style.backgroundColor = `rgb(256, 256, 256)`;
		store.setInStore(`color-${i}`, 'rgb(256, 256, 256)');
	}

	// Номер блока для счётчика
	function setData(counter) {

		let setID = prompt("Вветиде номер блока");

		(setID >= 0 && setID < counter && setID != null && setID != '') ? setcounter(+setID, setNumber()) : setData(counter);
	};

	// Число для сет счётчика
	function setNumber() {

		do {
			var number = prompt("Вветиде цифру");
		} while (number == null || isNaN(+number));

		return +number;
	}
	// Запись для сет счётчика
	function setcounter(id, number) {


		counter[id].innerHTML = number;
		store.setInStore(`counter-${id}`, counter[id].innerHTML);
		color(id, number);
	};

	// ДЛЯ ПОПАПА

	let objPop = {
		setpopup: document.querySelector('.setpopup'),
		popup: document.querySelector('.popup'),
		popupConent: document.querySelector('.popup__content'),
		changeClick: document.querySelector('.change-click'),
		inputPop: document.querySelector('.change-input')
	}

	class Popup {

		constructor(obj) {

			this.addElement(obj);
		}

		show(obj) {
			obj.popup.style.display = 'block';
		}
		creatElement() {

			let $select = document.createElement('select');

			for (var i = 0; i < counter.length; i++) {

				$select[i] = document.createElement('option');
				$select[i].innerHTML = i;
				$select.append($select[i]);
			}

			return $select;

		}
		addElement(obj) {
			obj.popupConent.prepend(this.creatElement());
		}
		changeInput(inputPop) {
			if (inputPop.value !== '') return inputPop.value;
		}

		selected(obj) {

			for (let i = 0; i < obj.length; i++) {
				if (obj[i].selected) return i;
			}
		}
		switchSelect(obj) {

			obj.addEventListener('change', (e) => {
				e.target.select = true;
			});
			return obj;
		}
	}

	const newPop = new Popup(objPop);

	objPop.changeClick.addEventListener('click', () => {

		let select = document.querySelector('select');

		setcounter(newPop.selected(newPop.switchSelect(select)), newPop.changeInput(objPop.inputPop));
		objPop.popup.style.display = "none";
	})

	objPop.setpopup.addEventListener('click', () => {
		newPop.show(objPop);

	})
}

