(async () => {
	let radius=320;
	let canvas = document.getElementById('canvas')
	let context = canvas.getContext('2d')
	let originalImage = await loadImage('img/cats.jpeg')
	let mouse = getMouse(canvas)
	let image = originalImage
	let imageParams = {
		offsetX: 0,
		offsetY: 0,
		scale: 1
	}
	canvasUpdate()
	function canvasUpdate (time) {
		canvas.width = 2*radius
	canvas.height = 2*radius
		requestAnimationFrame(canvasUpdate)
		if (mouse.left) {
			imageParams.offsetX = mouse.dx + imageParams.offsetX
			imageParams.offsetY = mouse.dy + imageParams.offsetY
		}
		if (mouse.wheel) {
			radius+=mouse.wheel*1
		}
		imageParams.offsetX = Math.max(Math.min(0, imageParams.offsetX), canvas.width - image.width * Math.abs(imageParams.scale))
		imageParams.offsetY = Math.max(Math.min(0, imageParams.offsetY), canvas.height - image.height * Math.abs(imageParams.scale))
		clearCanvas()
		context.beginPath()
		context.arc(canvas.width/2,canvas.height/2,radius,0,2*Math.PI)
		context.clip()
		context.drawImage(
			image,
			0, 0, image.width, image.height,
			imageParams.offsetX, imageParams.offsetY, image.width * imageParams.scale, image.height * imageParams.scale
		)
		mouse.update()
	}
	function clearCanvas () {
		canvas.width = canvas.width
	}
	
	document.getElementById('dowload').addEventListener('click', () => {
		const aElement = document.createElement('a')
		aElement.setAttribute('download', "myImage.jpg")
		aElement.href = canvas.toDataURL("image/jpg")
		aElement.click()
	})
	const loadImageInput = document.getElementById('loadImage')
	loadImageInput.addEventListener('change',event=>{
		const file = loadImageInput.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload=()=>{
			const newImage=new Image()
			newImage.onload=()=>{
				originalImage = image = newImage
			}
			newImage.src= reader.result;
		}
	})
})()
