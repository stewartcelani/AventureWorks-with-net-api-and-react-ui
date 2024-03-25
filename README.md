This repo will be a demonstration of a .NET 8 Web API and a React UI.

## .NET 8 Web API
- [x] Clean architecture scaffolding with default weather route protected by Azure AD/Entra
- [x] Add MediatR and set up validation pipelines
- [x] Hook up to AdventureWorks database and implement first employees endpoints
  - Added /api/v1/employees (paginated), /api/v1/employees/{id}, /api/v1/employees/by-national-id/{nationalId}
- [x] Extend employee filtering to drive a data grid on the React UI (searchTerm)
- [x] Add products endpoints
  - Added /api/v1/products (paginated), /api/v1/products/{id}
- [ ] Add ability to order and search products  
- [ ] Editing employee details (PUT /api/v1/employees/{id}) + MediatR command logging behaviour (dbo.AuditLog)

## React UI
- [x] React (TypeScript) scaffolding with app-wide login via MSAL (Microsoft Authentication Library) and role support
- [x] Set up a server-side paginated simple table on the employees end-point
- [ ] Set up a server-side paginated data grid on the products end-point with sorting, filtering etc (using Tanstack Table)