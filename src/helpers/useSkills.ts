import { fetchSkills } from '@/api/fetchSkills';
import { ref } from 'vue';

async function getSkills() {
  const { response, errors } = await fetchSkills();
  if (errors.length) {
    errors.map((err) => alert(err));
    return Promise.resolve([]);
  }
  return response?.data.data ?? [];
}

const allSkills = ref<Array<string>>([]);
const selectedSkills = ref<Array<string>>([]);
getSkills().then((res) => (allSkills.value = res));
// console.log('skills=', skills);

function selectSkill(event: Event, index: number) {
  // console.log('selectSkill', event, index);
  const skillToSelectByUser = allSkills.value[index];
  if (!skillToSelectByUser) {
    return;
  }
  if (selectedSkills.value.includes(skillToSelectByUser)) {
    // console.log('includes');
    const index = selectedSkills.value.indexOf(skillToSelectByUser);
    if (index !== -1) {
      // console.log('add bg-opacity-60');
      selectedSkills.value.splice(index, 1);
      (event?.target as any)?.classList?.add('bg-opacity-60');
    }
  } else {
    // console.log('NOT includes');
    // console.log('remove bg-opacity-60');
    selectedSkills.value.push(skillToSelectByUser);
    (event?.target as any)?.classList?.remove('bg-opacity-60');
  }
}
export { allSkills, selectedSkills, selectSkill };
