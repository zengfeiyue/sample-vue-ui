export type FormType = 'input' | 'select' | 'readio' | 'timePicker';
export interface SearchItem {
  lable?: string;
  type?: FormType;
  key?: string;
  value?: string | number;
  value2?: string | number;
}
