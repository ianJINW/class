document.addEventListener('DOMContentLoaded', () => {
  const loginModal = document.querySelector('.login')
  const signupModal = document.querySelector('.signup')
  const showLogin = document.querySelector('.modalL')
  const showSignup = document.querySelector('.modalC')
  const closeButtons = document.querySelectorAll('.close')
  const passFields = document.querySelectorAll('.pass')
  const modals = document.querySelectorAll('.modal')
  const dpPreview = document.querySelector('#dp')

  document.querySelector('#dpImg').style.display = 'none'

  // Toggle modals between login and signup
  showLogin.addEventListener('click', () => {
    loginModal.classList.add('active')
    signupModal.classList.remove('active')
  })

  showSignup.addEventListener('click', () => {
    signupModal.classList.add('active')
    const firstInput = signupModal.querySelector('input')
    firstInput.focus()

    loginModal.classList.remove('active')
  })

  // Close modals
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      loginModal.classList.remove('active')

      const firstInput = loginModal.querySelector('input')
      firstInput.focus()

      signupModal.classList.remove('active')
    })
  })

  // Toggle password visibility
  passFields.forEach(passField => {
    const passwordInput = passField.querySelector('input')
    const showButton = passField.querySelector('.show')
    showButton.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password'
      passwordInput.type = isPassword ? 'text' : 'password'
      showButton.textContent = isPassword ? 'Hide' : 'Show'
    })
  })

  // On page load, hide login/signup modals and show create modal
  modals.forEach(modal => (modal.style.display = 'none'))
  document.querySelector('.modalCreate').style.display = 'flex'

  // Show sign-up form
  document.querySelector('.modalC').addEventListener('click', () => {
    document.querySelector('.signup').style.display = 'flex'
    document.querySelector('.login').style.display = 'none'
    document.querySelector('.modalCreate').style.display = 'none'
  })

  // Show login form
  document.querySelector('.modalL').addEventListener('click', () => {
    document.querySelector('.login').style.display = 'flex'
    document.querySelector('.signup').style.display = 'none'
    document.querySelector('.modalCreate').style.display = 'none'
  })

  // Toggle between login and signup forms
  document.querySelector('.login a').addEventListener('click', e => {
    e.preventDefault()
    document.querySelector('.signup').style.display = 'flex'
    document.querySelector('.login').style.display = 'none'
    document.querySelector('.modalCreate').style.display = 'none'
  })

  document.querySelector('.signup a').addEventListener('click', e => {
    e.preventDefault()
    document.querySelector('.login').style.display = 'flex'
    document.querySelector('.signup').style.display = 'none'
    document.querySelector('.modalCreate').style.display = 'none'
  })

  dpPreview.addEventListener('change', event => {
    document.querySelector('#dpImg')

    const file = event.terget.files[0]

    if (file) {
    }
    /*   const reader = new FileReader()

      reader.onload = e => {
        document.querySelector('#dpImg').src = e.target.result

        document.querySelector('#dpImg').style.display = 'block'
      }
      reader.readAsDataURL(file)
    } else {
      document.querySelector('#dpImg').style.display = 'none'
    } */
  })

  /*  document
    .querySelector('.signupForm')
    .addEventListener('submit', function (e) {
      e.preventDefault()

      const formData = new FormData(this)

      fetch('/register', {
        method: 'POSt',
        body: formData,
        headers: {
          'CSRF-Token': document.querySelector('.csrf').getAttribute('content')
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            document.getElementById('messages').innerHTML =
              'Registration successful!'
          } else {
            document.getElementById('messages').innerHTML =
              'Error: ' + data.error
          }
        })
        .catch(error => {
          document.getElementById('messages').innerHTML =
            'Error: ' + error.message
        })
    }) */
})
