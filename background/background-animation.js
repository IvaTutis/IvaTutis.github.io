const isElementOutside = (parent, child) => {
    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    return parentRect.top >= childRect.bottom || parentRect.bottom <= childRect.top;
  }

  const getBit = (p0, p1) => {
    const seed = Math.random()
    if (seed <= p0) return '0'
    if (seed <= p1 + p0) return '1'
    return ' '
  }

  const insertColumn = container => {
    const column = document.createElement('div')
    column.classList.add('column')
    container.appendChild(column)
    return column
  }

  const removeColumn = (container, column) => {
    container.removeChild(column)
  }

  const disposeColumns = (container, count) =>
    Array.from(Array(count)).map(() => insertColumn(container))

  const patchColumnCount = (columns, container, nextCount) => {
    const lastCount = columns.length
    if (lastCount === nextCount) return columns
    const countDelta = nextCount - lastCount
    if (countDelta < 0) {
      return columns.filter((column, index) => {
        if (index < lastCount + countDelta) return true
        removeColumn(container, columns[index])
        return false
      })
    }
    const newColumns = disposeColumns(container, countDelta)
    return [
      ...columns,
      ...newColumns
    ]
  }

  const runScene = (scene) => {
    const { container, columns, intervalDuration } = scene
    scene.interval = setInterval(() => {
      columns.forEach((column) => {
        const firstBit = column.firstChild
        const lastBit = column.lastChild
        const bit = document.createElement('div')
        bit.innerText = getBit(scene.p0, scene.p1)
        if (!firstBit) {
          return column.appendChild(bit)
        }
        column.insertBefore(bit, firstBit)
        if (isElementOutside(container, lastBit)) {
          column.removeChild(lastBit)
        }
      })
    }, intervalDuration)
  }

