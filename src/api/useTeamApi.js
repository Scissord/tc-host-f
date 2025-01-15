import { api } from '@api';

const useTeamApi = () => {
  const getTeams = async () => {
    const response = await api({
      method: 'GET',
      url: `/teams`,
    });

    return response.data;
  };

  const findTeam = async (team_id) => {
    const response = await api({
      method: 'GET',
      url: `/teams/${team_id}`,
    });

    return response.data;
  };

  const getTeamsByDepartment = async (department_id) => {
    const response = await api({
      method: 'GET',
      url: `/teams/department/${department_id}`,
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

  const addOperator = async (user_id, data) => {
    const response = await api({
      method: 'patch',
      url: `/teams/operator/${user_id}`,
      data
    });

    return response.data;
  };

  return {
    getTeams,
    getTeamsByDepartment,
    findTeam,
    createTeam,
    updateTeam,
    deleteTeam,
    addOperator,
  };
};

export default useTeamApi;
