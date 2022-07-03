import { defineConfig } from "vite"
import vue, { Options } from "@vitejs/plugin-vue"
import path from "path"

const projectRootDir = path.resolve(__dirname)
const appSrcPath = path.resolve(projectRootDir, "src")
const appNodePath = path.resolve(projectRootDir, "node_modules")
const commonSrcPath = path.resolve(projectRootDir, "..", "common")
const commonNodePath = path.resolve(projectRootDir, "..", "node_modules")
const publicPath = path.resolve(projectRootDir, "public")
const buildOutput = path.resolve(projectRootDir, "dist")

const vueOptions: Options = {
    template: {
        compilerOptions: {
            isCustomElement: (tag) => tag.includes("-"),
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    root: "src",
    envDir: projectRootDir,
    resolve: {
        alias: {
            "@app": appSrcPath,
            "@common": commonSrcPath
        }
    },
    build: {
        outDir: buildOutput,
        sourcemap: true,
        emptyOutDir: true
    },
    publicDir: publicPath,
    plugins: [
        vue(vueOptions)
    ],
    
    server: {
        fs: {
            allow: [appSrcPath, appNodePath, commonSrcPath, commonNodePath]
        },
        port: 3000
    }
})

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })
