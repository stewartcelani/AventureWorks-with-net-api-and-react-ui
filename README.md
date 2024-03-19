This repo will be a demonstration of a .NET 8 Web API and a React UI.

## .NET 8 Web API
- [x] Clean architecture scaffolding with default weather route protected by Azure AD/Entra
- [x] Add MediatR and set up validation pipelines
- [x] Hook up to AdventureWorks database and implement first employees endpoints
  - Added /api/v1/employees (paginated), /api/v1/employees/{id}, /api/v1/employees/by-national-id/{nationalId}
- [ ] Extend employee filtering to drive a data grid on the React UI
- [ ] Editing employee details (PUT /api/v1/employees/{id}) + MediatR command logging behaviour (dbo.AuditLog)

## React UI
- [ ] React (TypeScript) scaffolding with app-wide login via MSAL (Microsoft Authentication Library) and role support
- [ ] Set up a server-side paginated data grid with filtering and sorting on the employees end-point