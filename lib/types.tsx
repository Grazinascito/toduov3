export type TaskProps = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: Date | null;
  tag: string;
};

export interface UserProps {
  id: string;
  username: string; // Ensure this field is defined here
}
