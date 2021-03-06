const screen = document.getElementById('root')

export const shake = () => {
  screen.classList.add('shake')
  screen.classList.add('shake-constant')
  setTimeout(() => {
    screen.classList.remove('shake')
    screen.classList.remove('shake-constant')
  }, 1000)
}

export const shakeHard = () => {
  screen.classList.add('shake-hard')
  screen.classList.add('shake-constant')
  setTimeout(() => {
    screen.classList.remove('shake-hard')
    screen.classList.remove('shake-constant')
  }, 1000)
}
