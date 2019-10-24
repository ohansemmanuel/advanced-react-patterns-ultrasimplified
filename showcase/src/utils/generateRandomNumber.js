export const generateRandomNumber = (min, max) => {
  console.log('gen number evaluated!')
  return Math.floor(Math.random() * (max - min + 1) + min)
}
