import { Ref, ComputedRef } from '@vue/runtime-dom';
// util for param word by word
export default function (
  text: ComputedRef<string>,
  wbwplace: Ref<HTMLHeadingElement | HTMLParagraphElement | null>,
): any {
  let idx = 1;
  let overflow = false;
  const addw = () => {
    if (!wbwplace.value) return;
    wbwplace.value.innerText = text.value.slice(0, idx);
    idx = overflow ? idx - 1 : idx + 1;
    idx === text.value.length && (overflow = true);
    idx === 1 && (overflow = false);
    setTimeout(addw, overflow ? 120 : 300);
  };
  addw();
}
