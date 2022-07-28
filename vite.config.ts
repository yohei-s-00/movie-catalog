import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import shimReactPdf from "vite-plugin-shim-react-pdf";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tsconfigPaths(),shimReactPdf()],
})
