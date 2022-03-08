import { Ref, ref, unref } from 'vue';

export function useToggleSelect(
  allTags: string[] | Ref<string[]>,
  defaultSelected: string[] | Ref<string[]> = [],
  classStyleToToggle = 'bg-opacity-60'
) {
  const selectedTags = ref<Array<string>>(unref(defaultSelected));

  function selectTag(event: Event, index: number) {
    // console.log('selectSkill', event, index);
    const TagToSelectByUser = unref(allTags)[index];
    if (!TagToSelectByUser) {
      return;
    }
    if (selectedTags.value.includes(TagToSelectByUser)) {
      // console.log('includes');
      const index = selectedTags.value.indexOf(TagToSelectByUser);
      if (index !== -1) {
        // console.log('add bg-opacity-60');
        selectedTags.value.splice(index, 1);
        (event?.target as any)?.classList?.add(classStyleToToggle);
      }
    } else {
      // console.log('NOT includes');
      // console.log('remove bg-opacity-60');
      selectedTags.value.push(TagToSelectByUser);
      (event?.target as any)?.classList?.remove(classStyleToToggle);
    }
  }

  return { selectedTags, selectTag };
}
