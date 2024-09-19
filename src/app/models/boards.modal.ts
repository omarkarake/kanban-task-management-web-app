// subtask.model.ts
export interface Subtask {
  title: string;
  isCompleted: boolean;
}

// task.model.ts
export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

// column.model.ts
export interface Column {
  name: string;
  tasks: Task[];
}

// board.model.ts
export interface Board {
  name: string;
  columns: Column[];
}

// boards-data.model.ts
export interface BoardsData {
  boards: Board[];
}
