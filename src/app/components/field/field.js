const field = () => {
	const field = document.querySelector('.field');
	const fieldItems = field.getElementsByTagName('div');

	const hSteps = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // множество горизонтальных координат
	const vSteps = ['1', '2', '3', '4', '5', '6', '7', '8']; // множество вертикальных координат

	/*const arrayToChess = indexItems => { // конвертирует индексы массива в шахматные координаты
		const fieldChess = Array.prototype.map.call(hSteps, (hPoint) =>
			const h
			hPoint + vSteps[0]);
		console.log(fieldChess);
	};*/

	// индекс ноды в массиве нод
	const indexNode = (node, fieldItems) => {
		return Array.prototype.slice.call(fieldItems) // получаем индекс ноды которую нажали
			.indexOf(node);
	};

	// обработчик события click
	const onClickItem = node => {
		const indexFieldItems = indexNode(node, fieldItems);
		console.log(arrayToChess(indexFieldItems));
	};

	Array.prototype.forEach.call(fieldItems, node => // вешаем событие click на каждый элемент поля
		node.addEventListener('click', onClickItem.bind(null, node))
	);

	//console.log(fieldItems.length);
};
export { field };
