import { all, select, takeLatest } from "redux-saga/effects";
import { savePreferences } from "../../db/utils";

function* prefSave() {
    yield select(async (state) => {
        await savePreferences(state.preferences);
    });
}

function* watchPrefSave() {
    yield takeLatest("@@pref/set", prefSave);
}

export default function* rootSaga() {
    yield all([
        watchPrefSave(),
    ]);
}
