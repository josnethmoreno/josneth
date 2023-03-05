import './style.css'
import './reset.css'

const toggleTheme = document.getElementById('toggleTheme')

let theme = localStorage.theme || ''

if (!localStorage.theme) {
	theme = window.matchMedia('(prefers-color-scheme: light)').matches
		? 'light'
		: 'dark'
}

document.documentElement.classList.add(theme)

const changeTheme = () => {
	if (theme === 'light') {
		theme = 'dark'
		document.documentElement.classList.remove('light')
		document.documentElement.classList.add(theme)
		localStorage.theme = theme
		return
	}

	if (theme === 'dark') {
		theme = 'light'
		document.documentElement.classList.remove('dark')
		document.documentElement.classList.add(theme)
		localStorage.theme = theme
		return
	}
}

toggleTheme.addEventListener('click', changeTheme)

function isTouchDevice() {
	return (
		'ontouchstart' in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0
	)
}

const isTouch = isTouchDevice()

if (!isTouch) {
	const cursor = document.getElementById('cursor')

	const onMouseMove = (e) => {
		cursor.style.setProperty('--x', e.clientX + 'px')
		cursor.style.setProperty('--y', e.clientY + 'px')
	}

	const cursorEvents = () => {
		document.addEventListener('mousemove', onMouseMove)
		handleHoverEvents()
	}

	const handleHoverEvents = () => {
		document.querySelectorAll('[data-cursor="hover"]').forEach((el) => {
			el.addEventListener('mouseover', () =>
				cursor.setAttribute('data-action', 'true')
			)
			el.addEventListener('mouseout', () =>
				cursor.setAttribute('data-action', 'false')
			)
		})
	}
	cursorEvents()
}

const hour = document.getElementById('hour')

const date = new Date()
hour.innerText = `${date.getHours()}:${date.getMinutes()}`

setInterval(() => {
	const date = new Date()
	hour.innerText = `${date.getHours()}:${date.getMinutes()}`
}, 1000)
