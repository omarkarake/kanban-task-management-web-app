## Kanban Task Management Web App
# hosted link: https://kanban-task-management-web-app-navy.vercel.app/

This project is a Kanban-style task management application built with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6, leveraging NgRx for state management and Entity management, Testing using jest, RxJS for reactive programming, and Tailwind CSS for styling.

The app allows users to manage tasks across multiple boards and columns, with functionalities like adding tasks, updating tasks, managing subtasks, editing board details, and switching between light and dark themes.

## Features

- NgRx Store for state management of boards, tasks, and columns.
- RxJS for handling reactive data streams and side effects.
- Tailwind CSS for responsive and modern UI design.
- Dark Mode with theme toggling between light and dark themes.
- Board and Task Management for creating, updating, and deleting boards, tasks, and columns.
- Modal Services for handling popups like adding and editing tasks/boards.
- Angular Unit Testing with Jest to ensure robust and reliable code.
- Entity State Management for managing boards and tasks with NgRx Entity.
- Drag and drop: the drag and drop feature by moving tasks accros the columns by changing their status

## Development server

Run `ng serve` to start the development server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io/). The application includes comprehensive unit tests for NgRx reducers, selectors, actions, and Angular components.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests.

## State Management

- NgRx Store: Handles the state for tasks, columns, and boards. The store updates include actions like adding tasks, updating task status, managing boards, and columns.
- Selectors: Retrieve state slices for boards, tasks, and columns, ensuring efficient data management.
- Reducers: Manage state transitions in response to dispatched actions.
- Effects: Handle side effects, like loading board data asynchronously.

## File Structure

- src/app/store: Contains NgRx actions, reducers, selectors, and effects for managing the application state.
- src/app/services: Contains services for managing modals, themes, and data fetching.
- src/app/models: Defines the types and interfaces for boards, tasks, and columns.
- src/app/components: Angular components for tasks, boards, modals, and navigation.
- src/app/testing: Unit tests for components, services, and reducers.

## Adding New Features

1. New Board: Use the provided form to add a new board with multiple columns. The form validates inputs and dispatches an `addBoard` action to the store.
2. New Task: Create a task by selecting the column and board. Subtasks can also be added. Task status can be updated later.
3. Editing Boards/Tasks: Pop up modals allow users to edit boards or tasks, updating the state via dispatched NgRx actions.
4. Dark/Light Theme Toggle: The app includes a theme toggle feature, allowing users to switch between light and dark modes. The state of the theme is preserved in localStorage.

## Technologies Used

- Angular: The main framework for building the application.
- NgRx: For managing the state of tasks, boards, and columns.
- RxJS: For handling asynchronous and event-based programming.
- Tailwind CSS: For styling the application with a responsive design.
- Jest: For unit testing Angular components, services, and store.

## How to Contribute

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature/my-new-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/my-new-feature`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
