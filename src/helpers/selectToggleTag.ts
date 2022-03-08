import { Ref } from 'vue';

export function selectTag<Tag>(
  event: Event,
  tag: Tag,
  selectedTags: Ref<Array<Tag>>,
  classStyleToToggle = 'bg-opacity-60'
) {
  if (selectedTags.value.includes(tag)) {
    // console.log('includes');
    const index = selectedTags.value.indexOf(tag);
    if (index !== -1) {
      selectedTags.value.splice(index, 1);
      (event?.target as any)?.classList?.add(classStyleToToggle);
    }
  } else {
    // console.log('NOT includes');
    selectedTags.value.push(tag);
    (event?.target as any)?.classList?.remove(classStyleToToggle);
  }
}
