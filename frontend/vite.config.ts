import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Adjust chunk size warning limit
  build: {
    chunkSizeWarningLimit: 2000, // Set the chunk size warning limit to 2MB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Create a separate vendor chunk for node_modules dependencies
            return 'vendor';
          }
        }
      }
    }
  },
  
  optimizeDeps: {
    exclude: ['lucide-react'], // Exclude lucide-react from optimization
  },
});
