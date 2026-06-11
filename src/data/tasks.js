export let tasks = []

let currentId = 1
export function nextId() {
  return currentId++
}