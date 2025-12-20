// Codes by mahdi tasha
// Defining general types
export interface BookMarkType {
  url: string;
  why: string;
  tags?: TagsType[];
  createdAt: string;
  id: number;
}

export interface TagsType {
  createdAt: string;
  color: string;
  label: string;
  id: number;
}
