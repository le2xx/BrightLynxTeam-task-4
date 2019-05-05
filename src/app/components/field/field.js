const field = () => {
	const field = document.querySelector('.field');
	const fieldItems = field.getElementsByTagName('div');

	const hSteps = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // множество горизонтальных координат
	const vSteps = ['1', '2', '3', '4', '5', '6', '7', '8']; // множество вертикальных координат

	const horseSteps = [ // множество смещений лошади
		{h: 1, v: 2},
		{h: 2, v: 1},
		{h: 2, v: -1},
		{h: 1, v: -2},
		{h: -1, v: -2},
		{h: -2, v: -1},
		{h: -2, v: 1},
		{h: -1, v: 2}
	];

	// конвертирует индекс ноды на поле в шахматную координату
	const indexFieldToChess = indexItems => {
		const fieldChess = Array.prototype.map.call(vSteps, vPoint =>
			Array.prototype.map.call(hSteps, hPoint => hPoint + vPoint))
			.flat()
			.reverse();

		return fieldChess[indexItems];
	};

	// конвертирует шахматную координату в индекс на ноды на поле
	const chessToIndexField = chessPoint => {
		const fieldChess = Array.prototype.map.call(vSteps, vPoint =>
			Array.prototype.map.call(hSteps, hPoint => hPoint + vPoint))
			.flat()
			.reverse();

		return fieldChess.indexOf(chessPoint);
	};

	// конвертирует индексы массива в шахматные координаты
	const arrayToChess = chessPoint => {
		const hPoint = hSteps[chessPoint.h];
		const vPoint = vSteps[chessPoint.v];
		return hPoint + vPoint;
	};

	// конвертирует шахматные координаты в индексы массива
	const chessToArray = str => {
		const point = str.split('');
		return {
			h: hSteps.indexOf(point[0]),
			v: vSteps.indexOf(point[1])
		};
	};

	// индекс ноды в массиве нод
	const indexNode = (node, fieldItems) => {
		return Array.prototype.slice.call(fieldItems) // получаем индекс ноды которую нажали
			.indexOf(node);
	};

	// отсекаем все элементы за игровым полем
	const cutWrongVal = steps => {
		const minIndex = 0;
		const maxIndex = 7;
		return steps.filter(el => el.h >= minIndex && el.v >= minIndex)
			.filter(el => el.h <= maxIndex && el.v <= maxIndex);
	};

	// вычисляем шаги для фигуры (массив объектов)
	const calcOfSteps = (stepsList, startPoint) => {
		const startIndex = chessToArray(startPoint);
		const steps = Array.prototype.map.call(horseSteps, el =>
			new Object({
				h: el.h + startIndex.h,
				v: el.v + startIndex.v
			})
		);
		const filteredSteps = cutWrongVal(steps); // отсекаем координаты за полем
		return filteredSteps.map(arrayToChess) // конвертируем индексы в шахматные координаты
			.join(' '); // конвертируем массив шахматных координат в строку разделенную пробелом
	};

	// окрашивает клетку путем добавления модификатора в атрибут class
	const coloredNode = (indexNode, modClassName) => {
		const classNames = fieldItems[indexNode]
			.getAttribute('class'); // получаем исходное значение атрибута
		fieldItems[indexNode] // добавляем класс-модификатор цвета к текущему атрибуту
			.setAttribute('class', classNames + ' ' + modClassName);
	};

	// очистка поля от окрашивания
	const clearColorNode = (fieldItems, modClassName) => {
		Array.prototype.forEach.call(fieldItems,node => {
			const classNode = node.getAttribute('class') // получаем список классов в атрибуте
				.split(' ');

			if (classNode.includes(modClassName)) { // если атрибут встречается то  удаляем его
				node.setAttribute('class', classNode
					.filter(el => el !== modClassName).join(' '));
			}
		});
	};

	// обработчик события click
	const onClickItem = node => {
		clearColorNode(fieldItems, 'field__item_clicked'); // очищаем поле от предыдущего окрашивания
		clearColorNode(fieldItems, 'field__item_possible-steps');

		const indexFieldItems = indexNode(node, fieldItems); // индекс ноды на которую нажали
		coloredNode(indexFieldItems, 'field__item_clicked'); // окрашиваем нажатое поле в синий

		const steps = calcOfSteps(horseSteps, indexFieldToChess(indexFieldItems)) // получаем список ходов лошади в виде индексов нод
			.split(' ')
			.map(chessToIndexField);

		steps.forEach(index => // окрашиваем возможные ходы лошади в синий
			 coloredNode(index, 'field__item_possible-steps')
		);
	};

	Array.prototype.forEach.call(fieldItems, node => // вешаем событие click на каждый элемент поля
		node.addEventListener('click', onClickItem.bind(null, node))
	);
};
export { field };
