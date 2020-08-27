window.onload = function () {
	let top = document.getElementById('top'),
		right = document.getElementById('right'),
		bottom = document.getElementById('bottom'),
		left = document.getElementById('left');
	let ul = document.querySelector('ul');
	let message = document.querySelector('.message');
	let set = document.getElementById('set');
	let loc = document.querySelectorAll('input');
	let _setCheck = 0;

	function messageH1() {
		message.innerHTML = '<h1>Измененный массив</h1>';
	};

	function SuperArray(n, m, obj) {


		let _oldX, _oldY;

		let arr = new Array(n);

		for (let i = 0; i < n; i++) {
			arr[i] = new Array(m);
			for (let j = 0; j < m; j++) {
				arr[i][j] = Math.round(Math.random() * (obj.max - obj.min) + obj.min);
			};
		};

		this.arr = arr;
		this.showArr(arr);

		let value = function (x, y) {
			arr[x][y] = +arr[x][y].slice(14);
		};

		let changeX = function (value) {
			if (!arguments.length) return _oldX;
			_oldX += value;
		};
		let changeY = function (value) {
			if (!arguments.length) return _oldY;
			_oldY += value;
		};

		let saveXy = function (x, y) {
			_oldX = +x;
			_oldY = +y;
		};


		this.setMarker = function (x, y) {

			_setCheck > 0 ? value(_oldX, _oldY) : _setCheck;

			saveXy(x, y);

			if (x >= 0 && x < n && y >= 0 && y < m) {
				arr[x][y] = '<span>&</span>' + arr[x][y];
				this.showArr(arr);
				_setCheck++;
			} else {
				message.innerHTML = 'Введите правильные параметры x,y. Например:{ x: 2, y: 3 }';
			};
			messageH1();

		};

		this.shift = function (direction) {


			if (_setCheck > 0) {
				switch (direction) {
					case 'top':
						value(_oldX, _oldY);
						this.moveTop(arr, changeY(), changeX(), n, m, changeX);
						break;

					case 'right':
						value(_oldX, _oldY);
						this.moveRight(arr, changeY(), changeX(), n, m, changeY);
						break;

					case 'bottom':
						value(_oldX, _oldY);
						this.moveBottom(arr, changeY(), changeX(), n, m, changeX);
						break;
					case 'left':
						value(_oldX, _oldY);
						this.moveLeft(arr, changeY(), changeX(), n, m, changeY);
						break;

					default:
						message.innerHTML = "Введите одно из следующийх значений: top, right, bottom, left";
						break;
				};
			} else {
				message.innerHTML = 'Сначала устанновите маркер от 0 до 4. Напримаер: 0,3';
			};

		};
	};



	SuperArray.prototype.showArr = function (arr) {
		ul.innerHTML = '<li>' + arr.join('</li><li>') + '</li></ul>';
	};

	SuperArray.prototype.moveTop = function (arr, y, x, n, m, changeX) {

		if (x > 0) {
			messageH1();
			arr[x - 1][y] = '<span>&</span>' + arr[x - 1][y];
			changeX(-1);
			this.showArr(arr);

		} else {
			message.innerHTML = "Вы не можете поднять маркер выше. Маркер стоит у верхней грани";
			arr[x][y] = '<span>&</span>' + arr[x][y];
		};

	};

	SuperArray.prototype.moveRight = function (arr, y, x, n, m, changeY) {

		if (y < m - 1) {
			messageH1();
			arr[x][y + 1] = '<span>&</span>' + arr[x][y + 1];
			changeY(+1);

			this.showArr(arr);

		} else {
			message.innerHTML = "Вы не можете подвинуть маркер вправо. Маркер стоит у правой грани";
			arr[x][y] = '<span>&</span>' + arr[x][y];
		};

	};

	SuperArray.prototype.moveBottom = function (arr, y, x, n, m, changeX) {

		if (x < n - 1) {
			messageH1();
			arr[x + 1][y] = '<span>&</span>' + arr[x + 1][y];
			changeX(+1);
			this.showArr(arr);
		} else {
			message.innerHTML = "Вы не можете опустить маркер ниже. Маркер стоит у нижней грани";
			arr[x][y] = '<span>&</span>' + arr[x][y];
		};

	};

	SuperArray.prototype.moveLeft = function (arr, y, x, n, m, changeY) {

		if (y > 0) {
			messageH1();
			arr[x][y - 1] = '<span>&</span>' + arr[x][y - 1];
			changeY(-1);
			this.showArr(arr);
		} else {
			message.innerHTML = "Вы не можете подвинуть маркер влево. Маркер стоит у левой грани";
			arr[x][y] = '<span>&</span>' + arr[x][y];
		};

	};

	top.addEventListener('click', function (event) {
		myClass.shift('top');
	});

	right.addEventListener('click', function (event) {
		myClass.shift('right');
	});

	bottom.addEventListener('click', function (event) {
		myClass.shift('bottom');
	});

	left.addEventListener('click', function (event) {
		myClass.shift('left');
	});

	set.addEventListener('click', function (event) {
		myClass.setMarker(loc[0].value, loc[1].value);
	});

	let myClass = new SuperArray(5, 5, { min: 10, max: 55 });

};
