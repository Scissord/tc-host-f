import { reactive, h } from 'vue';
import { useModalStore } from '@store';
import { useTeamApi, useSubStatusApi } from '@api';
import AddTeamModal from '@/pages/teams/blocks/AddTeamModal.vue';

const useTeams = (department_id) => {
  const state = reactive({
    isDataLoaded: false,
    teams: [],
    subStatuses: [],
  });

  const modal = useModalStore();

  const { getSubStatuses } = useSubStatusApi();

  const { 
    findTeams,
    createTeam,
    updateTeam,
    deleteTeam
  } = useTeamApi(); 
  
  const handleAddTeam = () => {
    modal.show({
      title: 'Добавление команды',
      children: h(AddTeamModal, { 
        createTeam, 
        teams: state.teams,
        subStatuses: state.subStatuses,
      }),
    })
  }; 
  
  const handleEditTeam = (id) => {
    const team = state.teams.find((p) => +p.id === +id)
    if(team) {
      team.is_editable = !team.is_editable;
    };
  };
  
  const handleSaveTeam = async (id) => {
    const team = state.teams.find((t) => +t.id === +id)
    if(team) {
      await updateTeam(id, {
        name: team.name,
        sub_status_ids: team.sub_status_ids,
      }); 
    };
    team.is_editable = false;
  };
  
  const handleDeleteTeam = async (id) => {
    const confirm = window.confirm('Вы уверены?'); 
    if(confirm) {
      await deleteTeam(id);
      state.teams = state.teams.filter((t) => +t.id !== +id);
    };
  };
  
  const handleGetData = async () => {
    state.isDataLoaded = false;
    const subStatusesData = await getSubStatuses();
    state.subStatuses = subStatusesData.subStatuses;
    const data = await findTeams(department_id);
    state.teams = data.teams.map(team => ({
      ...team,
      is_editable: false
    }));
    state.isDataLoaded = true; 
  };
  
  return {
    state,
    handleAddTeam,
    handleEditTeam,
    handleSaveTeam,
    handleDeleteTeam,
    handleGetData 
  };
};

export default useTeams;
