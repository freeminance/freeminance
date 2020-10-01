import localforage from "localforage";
import { format } from "date-fns";

import { GameState } from "../store/game/types";
import { PrefState } from "../store/preferences/types";
import { SaveGame } from "./types";

/**
 * Saves *all* preferences into the database.
 */
export async function savePreferences(prefs: PrefState) {
    await localforage.setItem("prefs", prefs);
}

/**
 * Saves a game state into the "saves" store.
 */
export async function saveGame(id: string, game: GameState) {
    // Get the current list of saves
    const saves: SaveGame[] = await localforage.getItem("saves");
    // Check if one exists with the existing ID
    const existingSaveIndex = saves.findIndex(save => save.id === id);

    // If existing then overwrite the value at that index otherwise push new entry
    if (existingSaveIndex >= 0) {
        saves[existingSaveIndex] = { id, game, timestamp: Date.now() };
    } else {
        saves.push({ id, game, timestamp: Date.now() });
    }

    // Save back into the database
    localforage.setItem("saves", saves);
}
