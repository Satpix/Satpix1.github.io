function loadImage (src) {
	return new Promise((resolve, reject) => {
		try {
			const image = new Image
			image.onload = () => resolve(image)
			image.src = src
		} catch (err) {
			return reject(err)
		}
	})
}
function getMouse (element) {
	const mouse = {
		x: null, dx: null,
		y: null, dy: null,
		left: false, leftPrev: false,
		right: false, rightPrev: false,
		wheel: 0, wheelPrev: 0,
		wheelPx: 0, wheelPxPrev: 0
	}

	element.addEventListener('mousemove', event => {
		const rect = canvas.getBoundingClientRect()

		const x = event.clientX - rect.left
		const y = event.clientY - rect.top

		mouse.dx = x - mouse.x
		mouse.dy = y - mouse.y

		mouse.x = x
		mouse.y = y
	})

	element.addEventListener('mousedown', event => {
		if (event.button === 0) {
			mouse.leftPrev = mouse.left
			mouse.left = true
		}

		else if (event.button === 2) {
			mouse.rightPrev = mouse.right
			mouse.right = true
		}
	})

	element.addEventListener('mouseup', event => {
		if (event.button === 0) {
			mouse.leftPrev = mouse.left
			mouse.left = false
		}

		else if (event.button === 2) {
			mouse.rightPrev = mouse.right
			mouse.right = false
		}
	})

	element.addEventListener('mouseleave', event => {
		mouse.rightPrev = mouse.right
		mouse.leftPrev = mouse.left
		mouse.right = false
		mouse.left = false
	})

	element.addEventListener('mousewheel', event => {
		mouse.wheelPxPrev = mouse.wheelPx
		mouse.wheelPrev = mouse.wheel
		mouse.wheelPx = event.deltaY
		mouse.wheel = mouse.wheelPx > 0 ? 1 : -1
		event.preventDefault()
	})
	mouse.update = () => {
		mouse.dx = 0
		mouse.dy = 0
		mouse.leftPrev = mouse.left
		mouse.rightPrev = mouse.right
		mouse.wheelPxPrev = mouse.wheelPx
		mouse.wheelPrev = mouse.wheel
		mouse.wheelPx = 0
		mouse.wheel = 0
	}
	return mouse
}
