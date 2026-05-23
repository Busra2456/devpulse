import config from "./config/index";
import { initDB } from "./db/index";
const main = async () => {
    await initDB();
    if (process.env.NODE_ENV !== 'production') {
        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`);
        });
    }
};
main();
//# sourceMappingURL=server.js.map