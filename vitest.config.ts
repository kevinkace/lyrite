import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
    Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

    return {
        test: {
            include: ["tests/rls/**/*.test.ts"],
            pool: "forks",
            fileParallelism: false,
        },
    };
});
