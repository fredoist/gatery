import { entity } from 'simpler-state';

export const state = entity(false)

export const toggleSidebar = () => {
  state.set(!state.get())
}
