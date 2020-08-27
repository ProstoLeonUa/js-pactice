
window.onload = function () {


	let form = document.querySelector('form');
	let click = document.querySelector('button');
	let div = document.querySelector('.products')

	function sendAjax({ url, method, data, success }) {

		let xhttp = new XMLHttpRequest();

		if (data == undefined) {
			xhttp.open(method, url);
			xhttp.send();

		} else {
			xhttp.open(method, url);
			xhttp.send(data);
		}


		xhttp.addEventListener('load', function ({ target }) {

			let data = JSON.parse(target.response);

			typeof data !== 'object' ? success(data) : render(data);
		});

	};

	function writeInfo() {

		const info = {};

		[].forEach.call(form, (item) => {
			const isNotButton = item.tagName.toLowerCase() !== 'button';

			isNotButton ? info[item.name] = item.value : '';

		});

		return info;

	};

	click.addEventListener('click', (e) => {
		e.preventDefault();

		let info = JSON.stringify(writeInfo());
		sendAjax({
			url: 'http://localhost:3005/users',
			method: 'POST',
			data: info,
			success(id) {
				if (id == 'NO FOUND') {
					div.innerHTML = "Введите правильный логин или пароль";
				} else {

					sendGET(id);
				}
			}
		});

	});

	function sendGET(id) {

		sendAjax({
			url: `http://localhost:3005/users/${id}`,
			method: 'GET',
		});
	};

	function render(data) {

		form.style.display = "none";
		let fragment = data.map(({ mark, model, year }) => {
			return `
			<ul>
			<li>${mark}</li>
			<li>${model}</li>
			<li>${year}</li>
			</ul>`
		});
		div.innerHTML = fragment.join('');

	};
}