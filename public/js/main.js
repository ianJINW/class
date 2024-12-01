document.addEventListener("DOMContentLoaded", () => {
	// Login and Signup Modals
	const loginModal = document.querySelector(".login");
	const signupModal = document.querySelector(".signup");
	const showLogin = document.querySelector(".modalL");
	const showSignup = document.querySelector(".modalC");
	const closeButtons = document.querySelectorAll(".close");

	// Show Login Modal
	if (showLogin) {
		showLogin.addEventListener("click", () => {
			if (loginModal && signupModal) {
				loginModal.classList.add("active");
				signupModal.classList.remove("active");
			}
		});
	}

	// Show Signup Modal
	if (showSignup) {
		showSignup.addEventListener("click", () => {
			if (signupModal && loginModal) {
				signupModal.classList.add("active");
				const firstInput = signupModal.querySelector("input");
				if (firstInput) firstInput.focus();
				loginModal.classList.remove("active");
			}
		});
	}

	// Close Modals
	if (closeButtons.length > 0) {
		closeButtons.forEach((button) => {
			button.addEventListener("click", () => {
				if (loginModal) loginModal.classList.remove("active");
				if (signupModal) signupModal.classList.remove("active");
			});
		});
	}

	// Password Field Toggle Visibility
	const passFields = document.querySelectorAll(".pass");
	if (passFields.length > 0) {
		passFields.forEach((passField) => {
			const passwordInput = passField.querySelector("input");
			const showButton = passField.querySelector(".show");
			if (passwordInput && showButton) {
				showButton.addEventListener("click", () => {
					const isPassword = passwordInput.type === "password";
					passwordInput.type = isPassword ? "text" : "password";
					showButton.textContent = isPassword ? "Hide" : "Show";
				});
			}
		});
	}

	// Creator Section Toggle
	const createA = document.querySelector(".creater");
	const createrSection = document.querySelector(".create");
	if (createA && createrSection) {
		createrSection.style.display = "none"; // Initially hide the creator section

		createA.addEventListener("click", (e) => {
			e.preventDefault();
			const main = document.querySelector("main main");
			if (createrSection.style.display === "none") {
				if (main) main.style.display = "none";
				createA.innerHTML = "Create new";
				createrSection.style.display = "flex";
			} else {
				createrSection.style.display = "none";
				createA.innerHTML = "Add New Unit";
				if (main) main.style.display = "flex";
			}
		});
	}

	// Sidebar Toggle
	const sideBar = document.querySelector(".side-bar");
	const toggleBtn = document.querySelector(".toggle");
	const closeBtn = document.querySelector(".close");
	const nav = document.querySelector("nav");

	if (toggleBtn && sideBar) {
		toggleBtn.addEventListener("click", (e) => {
			e.preventDefault();
			sideBar.style.display = "block";
			toggleBtn.style.display = "none";
			if (nav) nav.style.display = "none";
		});
	}

	if (closeBtn && sideBar) {
		closeBtn.addEventListener("click", (e) => {
			e.preventDefault();
			sideBar.style.display = "none";
			toggleBtn.style.cssText = "float: right; display: block;";
			if (nav) nav.style.display = "flex";
		});
	}

	// Profile Image Preview
	const dpPreview = document.querySelector("#dp");
	const dpImg = document.querySelector("#dpImg");
	const fileInfo = document.querySelector("#fileInfo");

	if (dpPreview) {
		dpPreview.addEventListener("change", (event) => {
			const file = event.target.files[0];
			if (file) {
				if (file.type.startsWith("image/")) {
					const imageUrl = URL.createObjectURL(file);
					dpImg.src = imageUrl;
					dpImg.style.display = "block";
					fileInfo.textContent = `File: ${file.name}, Type: ${file.type}, Size: ${file.size} bytes`;
				} else {
					dpImg.style.display = "none";
					fileInfo.textContent = "Please select a valid image file.";
				}
			} else {
				dpImg.style.display = "none";
				fileInfo.textContent = "No file selected.";
			}
		});
	}

	// Form Submit Handling (Textarea)
	const forms = document.querySelectorAll("form");
	if (forms.length > 0) {
		forms.forEach((form) => {
			form.addEventListener("submit", () => {
				const descriptionField = form.querySelector("textarea");
				if (descriptionField) {
					descriptionField.value = descriptionField.value.replace(
						/\r?\n|\r/g,
						" "
					);
				}
			});
		});
	}
});
