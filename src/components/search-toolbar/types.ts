export type FormType = 'input' | 'select' | 'readio' | 'timePicker';
export interface SearchItem {
  lable?: string;
  type?: FormType;
  key?: string;
  value?: any;
  value2?: string | number;
}
