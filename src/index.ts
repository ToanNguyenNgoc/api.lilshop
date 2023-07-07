import app from './app'
import dotenv from 'dotenv'

const PORT = process.env.POST || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
