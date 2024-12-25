import { reactive } from 'vue';
import { useOperatorApi, useTeamApi } from '@api';

const useOperators = () => {
  const state = reactive({
    isDataLoaded: false,
    operators: [],
    free_operators: [],
    teams: [],
  });

  const { 
    getOperators,
    getFreeOperators,
    updateOperator,
    createOperator,
    deleteOperator,
  } = useOperatorApi(); 

  const { getTeams } = useTeamApi();
  
  const handleEditOperator = (id) => {
    const operator = state.operators.find((o) => +o.id === +id)
    if(operator) {
      operator.is_editable = !operator.is_editable;
    };
  };
  
  const handleSaveOperator = async (id) => {
    const operator = state.operators.find((o) => +o.id === +id)
    if(operator) {
      await updateOperator(id, {
        user_id: operator.user_id,
        team_id: operator.team_id,
      }); 
    };
    operator.is_editable = false;
  };
  
  const handleDeleteOperator = async (id) => {
    const confirm = window.confirm('Вы уверены?'); 
    if(confirm) {
      await deleteOperator(id);
      state.operators = state.operators.filter((o) => +o.id !== +id);
    };
  };
  
  const handleOperatorsGetData = async () => {
    state.isDataLoaded = false;
    const teamData = await getTeams();
    const operatorData = await getOperators();
    const freeOperatorData = await getFreeOperators();
    state.teams = teamData.teams;
    state.operators = operatorData.operators.map(operator => ({
      ...operator,
      is_editable: false
    }));
    state.free_operators = freeOperatorData.free_operators;
    state.isDataLoaded = true; 
  };
  
  return {
    operatorState: state,
    handleEditOperator,
    handleSaveOperator,
    handleDeleteOperator,
    handleOperatorsGetData 
  };
};

export default useOperators;
