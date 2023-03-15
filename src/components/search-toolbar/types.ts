export type FormType = 'input' | 'select' | 'readio';
export interface SearchItem {
  lable?: string;
  type?: FormType;
  key?: string;
  value?: object;
  value2?: object;
}
