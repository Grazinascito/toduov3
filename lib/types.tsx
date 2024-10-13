export type TaskProps = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: Date | null;
  tag: string;
};
