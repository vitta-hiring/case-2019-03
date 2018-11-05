import httpService from './http.service'

export default {
  getInteractions () {
    return httpService().get('interactions')
  },

  getInteractionsByActives (active) {
    return httpService().get(`interactions/active/${active}`)
  },

  postInteractions (interaction) {
    return httpService().post('interactions', interaction)
  },

  putInteractions (interaction, id) {
    return httpService().put(`interactions/${id}`, {
      name: interaction.name
    })
  },

  deleteInteractions (interaction) {
    return httpService().delete('interactions', {
      data: interaction
    })
  }
}
