import create from "zustand";

export default create(set => ({
  mlg: true,
  setMlg: () => set(state => ({ mlg: !state.mlg })),

  mla: true,
  setMla: () => set(state => ({ mla: !state.mla })),

  newFirst: false,
  toggleNewFirst: () => set(state => ({ newFirst: !state.newFirst}))
}))