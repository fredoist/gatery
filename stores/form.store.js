import { debounce } from 'debounce';
import { entity } from 'simpler-state';

export const form = entity({
  link: '',
  condition: 'any',
  tokens: '',
});

export const handleChange = debounce((e) => {
  const { name, value } = e.target;
  form.set({ ...form.get(), [name]: value });
}, 500);
