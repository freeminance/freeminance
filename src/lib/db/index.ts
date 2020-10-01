import localforage from "localforage";

export async function initDB() {
    localforage.config({
        driver: localforage.INDEXEDDB,
        name: "freeminance",
        version: 1.0,
        storeName: "database",
        description: "Freeminance persistance database",
    });

    // Wait for the instance to be ready
    await localforage.ready();

    // Confirm that preferences are present
    if (!(await localforage.getItem("prefs"))) {
        await localforage.setItem("prefs", {});
    }

    // Confirm that saves are present
    if (!(await localforage.getItem("saves"))) {
        await localforage.setItem("saves", []);
    }
}