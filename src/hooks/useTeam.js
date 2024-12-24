import { reactive, h } from 'vue';
import { useModalStore } from '@store';
import { useTeamApi, useOperatorApi } from '@api';
import AddOperatorModal from '@/pages/teams/blocks/AddOperatorModal.vue';

const useTeam = (team_id) => {
  const state = reactive({
    isDataLoaded: false,
    operators: [],
    free_operators: []
  });

  const modal = useModalStore();

  const { getTeam } = useTeamApi(); 
  const { getFreeOperators, updateOperator } = useOperatorApi();
  
  const handleAddOperator = () => {
    modal.show({
      title: 'Добавление оператора',
      children: h(AddOperatorModal, { 
        updateOperator, 
        operators: state.operators,
        free_operators: state.free_operators,
        team_id
      }),
    })
  }; 
  
  const handleDeleteOperator = async (id) => {
    const confirm = window.confirm('Вы уверены?'); 
    if(confirm) {
      await updateOperator(id, { team_id: null });
      state.operators = state.operators.filter((o) => +o.id !== +id);
    };
  };
  
  const handleGetData = async () => {
    state.isDataLoaded = false;
    const operatorData = await getFreeOperators()
    state.free_operators = operatorData.free_operators;
    const teamData = await getTeam(team_id);
    state.operators = teamData.operators.map(operator => ({
      ...operator,
      is_editable: false
    }));
    state.isDataLoaded = true; 
  };
  
  return {
    state,
    handleAddOperator,
    handleDeleteOperator,
    handleGetData 
  };
};

export default useTeam;
