import { api } from '@api';

const useTeamApi = () => {
  const findTeams = async (department_id) => {
    const response = await api({
      method: 'GET',
      url: `/teams/${department_id}`,
    });

    return response.data;
  };

  const getTeam = async (team_id) => {
    const response = await api({
      method: 'GET',
      url: `/teams/data/${team_id}`,
    });

    return response.data;
  };

  const createTeam = async (data) => {
    const response = await api({
      method: 'POST',
      url: '/teams',
      data
    });

    return response.data;
  };
  
  const updateTeam = async (id, data) => {
    const response = await api({
      method: 'PATCH',
      url: `/teams/${id}`,
      data
    });

    return response.data;
  };

  const deleteTeam = async (id) => {
    const response = await api({
      method: 'DELETE',
      url: `/teams/${id}`,
    });

    return response.data;
  };

  return {
    findTeams,
    getTeam,
    createTeam,
    updateTeam,
    deleteTeam
  };
};

export default useTeamApi;
