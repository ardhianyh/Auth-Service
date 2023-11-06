import { initializeApp } from "./app"
import { initializeRepositories } from "./repositories";
import { getRequiredEnvironmentVariables } from "./utils/get-required-environment-variables";

(async () => {
   try {
      const app = await initializeApp();
      await initializeRepositories();

      const requiredVariables = getRequiredEnvironmentVariables();

      app.listen(requiredVariables.port, async () => {
         console.info(`🚀 Server listening at: ${requiredVariables.host}:${requiredVariables.port}`)
      })
   } catch (error) {
      console.error(
         error instanceof Error ? error.message : `Server faild to start. Error ${error}`
      );
      process.exit(1);
   }
})();