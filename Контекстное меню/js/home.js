function start() {
	let data = [
		{ title: 'Сохранить как', handler: 'ActionSaveAs' },
		{ title: 'Скопировать', handler: 'ActionСopy' },
		{ title: 'Вставить', handler: 'ActionPaste' }
	]

	let action = {
		ActionSaveAs() { console.log('ActionSaveAs') },
		ActionСopy() { console.log('ActionСopy') },
		ActionPaste() { console.log('ActionPaste') }
	}


	window.addEventListener('contextmenu', (e) => {
		e.preventDefault();

		menu.show(e);
	})

	window.addEventListener('click', (e) => {
		menu.hide();
	})

	class Menu {

		constructor(data, action) {
			this.$ul = document.createElement('ul');
			this.$ul.classList.add('menu');
			this.$ul.append(createElement(data));

			this.$ul.addEventListener('click', (e) => e.stopPropagation());

			function createElement(data) {

				let fragment = document.createDocumentFragment();

				for (let i = 0; i < data.length; i++) {

					let $li = document.createElement('li');
					$li.innerHTML = data[i].title;
					fragment.append($li);

					actionMenu($li, i);
				}
				return fragment
			}

			function actionMenu($li, i) {

				let doIt = data[i].handler;
				$li.addEventListener('click', action[doIt]);
			}

			function render($ul) {
				document.body.append($ul);
			}

			render(this.$ul);
		}

		hide() {
			this.$ul.style.visibility = 'hidden';
		}

		show(e) {
			this.$ul.style.visibility = 'visible';
			this.width(e);
			this.height(e);
		}

		width(e) {
			let ulWidth = this.$ul.offsetWidth;
			let mainWidth = document.documentElement.clientWidth;
			let sizeX = mainWidth - e.clientX;

			sizeX < ulWidth ? this.$ul.style.left = mainWidth - ulWidth + 'px' : this.$ul.style.left = e.clientX + 'px';

		}

		height(e) {
			let ulHeight = this.$ul.offsetHeight;
			let mainHeight = document.documentElement.clientHeight + document.documentElement.scrollTop;
			let sizeY = mainHeight - e.pageY;

			sizeY < ulHeight ? this.$ul.style.top = mainHeight - ulHeight + 'px' : this.$ul.style.top = e.pageY + 'px';
		}
	}

	const menu = new Menu(data, action);

}
window.onload = start;

