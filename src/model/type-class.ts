export class TypeClass {
  id: number;
  type: string;
  avatar: string;

  constructor(id?: number, type?: string, avatar?: string) {
    this.id = id;
    this.type = type;
    this.avatar = avatar;
  }
}
