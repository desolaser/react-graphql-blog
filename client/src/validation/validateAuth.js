const validateAuth = (auth, itemId) => auth.user && auth.user.id === itemId
export default validateAuth