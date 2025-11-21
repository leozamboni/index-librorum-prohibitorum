import { defineConfig } from 'vite';
import { copyFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// Plugin para copiar index.json durante o build
const copyJsonPlugin = () => {
  return {
    name: 'copy-json',
    closeBundle() {
      const jsonPath = resolve(__dirname, 'index.json');
      const distPath = resolve(__dirname, 'dist/index.json');
      
      if (existsSync(jsonPath)) {
        try {
          copyFileSync(jsonPath, distPath);
          console.log('✓ index.json copiado para dist/');
        } catch (err) {
          console.error('Erro ao copiar index.json:', err);
        }
      }
    }
  };
};

export default defineConfig({
  base: '',
  plugins: [
    // Plugin para copiar JSON durante o build
    copyJsonPlugin()
  ],
  
  build: {
    // Diretório de saída
    outDir: 'dist',
    
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  
  server: {
    port: 3000,
    open: true
  }
});

