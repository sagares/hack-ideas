export type Employee = {
  empId: string;
};

export type Idea = {
  id?: string;
  name: string;
  description: string;
  tags: Array<string>;
  submittedBy: string;
  upvotes?: Array<Employee>;
  submittedOn: number;
};

export type IdeasArray = {
  [key: string]: Idea | null;
};

export type CardProps = {
  id: string;
};

export type RegisterDialogProps = {
  isOpen: boolean;
  onCancel: (isOpen: boolean) => void;
};

export type FilterProps = {
  searchText: string;
  onFilter: (searchText: string) => void;
  orderAsc: boolean;
  sortBy: string;
  onSort: (sortBy: string) => void;
};
