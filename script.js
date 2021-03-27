const quote_url = 'http://api.quotable.io/random'
const quote_display = document.getElementById('quote')
let written = []
let start = true

function get_quote() {
	return fetch(quote_url).then(response => response.json()).then(data => data.content)
}

function get_wpm_and_acc() {
	elapsed = (new Date() - window.start_time) / 1000 / 60
	let arr_quote = quote_display.querySelectorAll('span')
	let count = 0
	arr_quote.forEach((span) => {
		if (span.classList.contains('correct')) {
			count++
		}
	})
	console.log(written.length, arr_quote.length)
	if (written.length >= arr_quote.length) {
		clearInterval(window.running)
		window.running = false
	}
	document.getElementById('acc').innerText = Math.floor((100*count)/(written.length)) + ' %'
	document.getElementById('wpm').innerText = Math.floor((count/4.7)/(elapsed)) + ' WPM'
}

async function get_next_quote() {
	let quote = await get_quote()
	quote_display.innerText = ''
	quote.split('').forEach(character => {
		let character_span = document.createElement('span')
		character_span.innerText = character
		quote_display.appendChild(character_span)
	})
	
}

document.body.addEventListener("keypress", function(event) {
	let letter = String.fromCharCode(event.keyCode)
	written.push(letter)
    let arr_quote = quote_display.querySelectorAll('span')
	written.forEach((character, index) => {
		if (character === arr_quote[index].innerText) {
			arr_quote[index].classList.add('correct')
		} else {
			arr_quote[index].classList.add('incorrect')
		}
	})
	if (start === true) {
		window.start_time = new Date()
		window.running = setInterval(() => {
			get_wpm_and_acc()
		}, 200)
	}
	start = false
})

document.body.addEventListener("keydown", function(event) {
	if (event.keyCode === 8 && window.running) {
		let index = written.length - 1
		written.pop()
		let arr_quote = quote_display.querySelectorAll('span')
		arr_quote[index].classList.remove('incorrect')
		arr_quote[index].classList.remove('correct')
	}
})

get_next_quote()

