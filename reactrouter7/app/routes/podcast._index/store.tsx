import {create} from "zustand";

interface Store {
  mlg: boolean,
  setMlg: () => void,
  mla: boolean,
  setMla: () => void,
  newFirst: boolean,
  toggleNewFirst: () => void,
  showAbout: boolean,
  toggleAbout: () => void,
  showUpdates: boolean,
  toggleUpdates: () => void,
}
export default create<Store>()((set) => ({
  mlg: true,
  setMlg: () => set(state => ({ mlg: !state.mlg })),
  mla: true,
  setMla: () => set(state => ({ mla: !state.mla })),
  newFirst: false,
  toggleNewFirst: () => set(state => ({ newFirst: !state.newFirst})),
  showAbout: true,
  toggleAbout: () => set(state => ({showAbout: !state.showAbout})),
  showUpdates: true,
  toggleUpdates: () => set(state => ({showUpdates: !state.showUpdates}))
}))