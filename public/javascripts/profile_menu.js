const profileToggle = document.querySelector('#profileToggle');
const profileDropdown = document.querySelector('#profileDropdown');

function toggleMenu() {
	profileDropdown.classList.toggle('absolute');
	profileDropdown.classList.toggle('hidden');
}

function closeMenu() {
	profileDropdown.classList.remove('absolute');
	profileDropdown.classList.add('hidden');
}

// Only add listeners if the dom element exists. (User is logged in)

profileToggle &&
	profileToggle.addEventListener('click', (e) => {
		e.stopPropagation();
		toggleMenu();
	});

profileToggle &&
	document.addEventListener('click', (e) => {
		if (e.target.id !== 'profileToggle' || e.target.id !== 'profileDropdown') {
			closeMenu();
		}
	});
