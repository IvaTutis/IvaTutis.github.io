const scene = {
  interval: null,
  container: null,
  intervalDuration: 50,
  columns: [],
  columnCount: 50,
  p0: 0.3,
  p1: 0.3
}

document.querySelector('#text-color-input').addEventListener('change', event => {
  const { value } = event.target
  scene.container.style.color = value
})

document.querySelector('#background-color-input').addEventListener('change', event => {
  const { value } = event.target
  scene.container.style.backgroundColor = value
})

document.querySelector('#speed-input').addEventListener('change', event => {
  const { value } = event.target
  clearInterval(scene.interval)
  scene.intervalDuration = value
  runScene(scene)
})

document.querySelector('#column-count-input').addEventListener('change', event => {
  const value = Math.abs(event.target.value) > 100 ? 100 : event.target.value
  event.target.value = Math.abs(value)
  clearInterval(scene.interval)
  setTimeout(() => {
    scene.columns = patchColumnCount(scene.columns, scene.container, parseInt(value, 10))
    runScene(scene)
  }, 0)
})

const p0Input = document.querySelector('#p0-input')
const p1Input = document.querySelector('#p1-input')
const makeUpdateP = (targetName, siblingName, targetInput, siblingInput) => event => {
  const value = Math.abs(event.target.value) > 1 ? 1 : event.target.value
  const pTarget = Math.abs(value)
  targetInput.value = pTarget
  scene[targetName] = pTarget
  const pTargetDelta = 1 - pTarget 
  if (pTarget + scene[siblingName] > 1) {
    scene[siblingName] = pTargetDelta
    siblingInput.value = pTargetDelta
  }
  clearInterval(scene.interval)
  runScene(scene)
}

p0Input.addEventListener('change', makeUpdateP('p0', 'p1', p0Input, p1Input))
p1Input.addEventListener('change', makeUpdateP('p1', 'p0', p1Input, p0Input))

scene.container = document.querySelector('#scene')
scene.columns = disposeColumns(scene.container, scene.columnCount)
runScene(scene)
