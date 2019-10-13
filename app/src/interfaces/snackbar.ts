export enum SnackbarTypes {
  success,
  error,
  info,
  warning,
}

export interface Snackbar {
  message: string;
  id: string;
  type: SnackbarTypes;
}
