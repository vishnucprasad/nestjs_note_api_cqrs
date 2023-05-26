export interface EntityFactory<TEntity> {
  create(...args: any): Promise<TEntity>;
}
