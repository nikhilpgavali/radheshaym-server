import { EntityManager, FindOneOptions, ObjectType, OneToMany } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class BaseRepository<T> {
  constructor(
    protected readonly entityClass: ObjectType<T>,
    protected readonly readEntityManager: EntityManager,
    protected readonly writeEntityManager: EntityManager,
  ) {}

  async findOne(id: string, options: FindOneOptions | any = {}): Promise<T> {
    const findWhere: any = {
      id: id,
      ...(options && options.where ? options.where : {}),
    };

    const entity = await this.readEntityManager.findOne(this.entityClass, {
      ...options,
      where: findWhere,
    });
    if (!entity) {
      throw new HttpException(`Entity not found ${id}`, HttpStatus.NOT_FOUND);
    }
    return entity;
  }

  /**
   * Update the entity in the database
   * @param {string}            id              - Unique id for the entity update
   * @param {Partial<object>}   entity          - Partial entity, it is an `<object>` to support advanced TypeORM features
   * @returns {Promise<T>}
   */
  async update(id: string, entity: Partial<object>, options: any): Promise<T> {
    await this.writeEntityManager
      .createQueryBuilder()
      .update(this.entityClass)
      .set(entity)
      .where('id = :id', { id })
      .execute();

    const findWhere: any = { id: id };

    return await this.writeEntityManager.findOne(this.entityClass, {
      ...options,
      where: findWhere,
    });
  }

  /**
   * Create a new record
   * @param   {T}               data            - Data to be saved
   * @returns {Promise<T>}    retruns true when data is saved
   */
  async create(data: T): Promise<T> {
    return await this.writeEntityManager.save(this.entityClass, data);
  }

  protected resolveEntityManager(
    useReadEntityManager: boolean = true,
  ): EntityManager {
    return useReadEntityManager
      ? this.readEntityManager
      : this.writeEntityManager;
  }
}
