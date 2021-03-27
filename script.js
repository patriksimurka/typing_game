const quote_url = 'http://api.quotable.io/random'
const quote_display = document.getElementById('quote')

function get_quote() {
	return fetch(quote_url).then(response => response.json()).then(data => data.content)
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
    console.log(event.keyCode)
})


get_next_quote()