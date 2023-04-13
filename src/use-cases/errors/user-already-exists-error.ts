export default class UserAlredyExitsError extends Error {
  constructor() {
    super('E=mail already exists.')
  }
}
