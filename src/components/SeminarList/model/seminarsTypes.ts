export interface Seminar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}

export interface State {
  seminars: Seminar[];
  isLoading: {
    initialFetch: boolean;
    delete: boolean;
    update: boolean;
  };
  isError: {
    initialFetch: boolean;
    delete: boolean;
    update: boolean;
  };
}
