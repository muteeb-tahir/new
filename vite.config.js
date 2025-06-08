import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // if you're using React

export default defineConfig({
  base: '/new/',  
  plugins: [react()],
})
