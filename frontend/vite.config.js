import fs from "fs";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const httpsEnabled = env.VITE_HTTPS_ENABLED === "true";
  const keyPath = env.VITE_HTTPS_KEY_PATH;
  const certPath = env.VITE_HTTPS_CERT_PATH;

  return {
    plugins: [
      react(),
      viteCompression({ algorithm: "gzip", ext: ".gz" }),
    ],
    server: httpsEnabled && keyPath && certPath
      ? {
          https: {
            key: fs.readFileSync(path.resolve(keyPath)),
            cert: fs.readFileSync(path.resolve(certPath)),
          },
        }
      : undefined,
  };
});
