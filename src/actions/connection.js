export function opening() {
  return {
    type: 'CONNECTION_OPENING',
  }
}

export function subscribing() {
  return {
    type: 'CONNECTION_SUBSCRIBING',
  }
}

export function ready() {
  return {
    type: 'CONNECTION_READY',
  }
}
