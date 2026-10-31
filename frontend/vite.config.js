import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      // 프론트엔드에서 '/api'로 시작하는 요청을 백엔드 주소로 안전하게 연결합니다.
      '/api': {
        target: 'http://localhost:8000', 
        changeOrigin: true,
        // 백엔드 라우터(FastAPI)에 '/api' 경로가 포함되어 있으므로
        // 주소 변환(rewrite) 없이 원본 그대로 백엔드에 토스합니다.
      },
    },
  },
})