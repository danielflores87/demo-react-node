class EmployeeRepositoryFake {
  constructor() {
    this.employees = [];
  }

  async createEmployee(data) {
    const newEmployee = { id: this.employees.length + 1, ...data };
    this.employees.push(newEmployee);
    return newEmployee;
  }

  async getAllEmployees() {
    return this.employees;
  }

  async deleteEmployee(id) {
    const index = this.employees.findIndex((employee) => employee.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
      return true;
    }
    return false;
  }

  async getPaginatedEmployees(filters) {
    const filteredEmployees = this.employees.filter((employee) =>
      filters.name ? employee.name.includes(filters.name) : true
    );

    const start = (filters.page - 1) * filters.perPage;
    const end = start + filters.perPage;
    const paginatedEmployees = filteredEmployees.slice(start, end);

    return {
      rows: paginatedEmployees,
      total: filteredEmployees.length,
    };
  }
}

module.exports = EmployeeRepositoryFake;
