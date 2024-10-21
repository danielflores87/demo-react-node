class ApplicationRepositoryFake {
  constructor() {
    this.applications = [];
    this.counter = 1;
  }

  async createApplication(data) {
    const newApplication = {
      ...data,
      id: this.counter++,
    };
    this.applications.push(newApplication);
    return newApplication;
  }

  async deleteApplication(id) {
    const index = this.applications.findIndex((app) => app.id === parseInt(id));
    if (index === -1) return 0;

    this.applications.splice(index, 1);
    return 1; // Simula que un registro fue eliminado
  }

  async getPaginatedApplications() {
    return {
      rows: [],
      total: 1,
    };
  }
}

module.exports = ApplicationRepositoryFake;
