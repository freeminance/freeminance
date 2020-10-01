import "../styles/index.less";
import { init } from "./app";

(async () => {
    await init(document.getElementById("main"));
})();
