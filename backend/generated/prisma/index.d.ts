
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Categories
 * 
 */
export type Categories = $Result.DefaultSelection<Prisma.$CategoriesPayload>
/**
 * Model Users
 * 
 */
export type Users = $Result.DefaultSelection<Prisma.$UsersPayload>
/**
 * Model Books
 * 
 */
export type Books = $Result.DefaultSelection<Prisma.$BooksPayload>
/**
 * Model Borrowings
 * 
 */
export type Borrowings = $Result.DefaultSelection<Prisma.$BorrowingsPayload>
/**
 * Model Fines
 * 
 */
export type Fines = $Result.DefaultSelection<Prisma.$FinesPayload>
/**
 * Model TokenSessions
 * 
 */
export type TokenSessions = $Result.DefaultSelection<Prisma.$TokenSessionsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const AccountStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus]


export const BorrowingStatus: {
  PENDING: 'PENDING',
  BORROWED: 'BORROWED',
  RETURN_REQUESTED: 'RETURN_REQUESTED',
  RETURNED: 'RETURNED',
  REJECTED: 'REJECTED',
  LATE: 'LATE',
  LOST: 'LOST'
};

export type BorrowingStatus = (typeof BorrowingStatus)[keyof typeof BorrowingStatus]


export const PaymentStatus: {
  UNPAID: 'UNPAID',
  PAID: 'PAID'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type AccountStatus = $Enums.AccountStatus

export const AccountStatus: typeof $Enums.AccountStatus

export type BorrowingStatus = $Enums.BorrowingStatus

export const BorrowingStatus: typeof $Enums.BorrowingStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Categories
 * const categories = await prisma.categories.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Categories
   * const categories = await prisma.categories.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.categories`: Exposes CRUD operations for the **Categories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.categories.findMany()
    * ```
    */
  get categories(): Prisma.CategoriesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **Users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.UsersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.books`: Exposes CRUD operations for the **Books** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Books
    * const books = await prisma.books.findMany()
    * ```
    */
  get books(): Prisma.BooksDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.borrowings`: Exposes CRUD operations for the **Borrowings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Borrowings
    * const borrowings = await prisma.borrowings.findMany()
    * ```
    */
  get borrowings(): Prisma.BorrowingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fines`: Exposes CRUD operations for the **Fines** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fines
    * const fines = await prisma.fines.findMany()
    * ```
    */
  get fines(): Prisma.FinesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tokenSessions`: Exposes CRUD operations for the **TokenSessions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TokenSessions
    * const tokenSessions = await prisma.tokenSessions.findMany()
    * ```
    */
  get tokenSessions(): Prisma.TokenSessionsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.0
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Categories: 'Categories',
    Users: 'Users',
    Books: 'Books',
    Borrowings: 'Borrowings',
    Fines: 'Fines',
    TokenSessions: 'TokenSessions'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "categories" | "users" | "books" | "borrowings" | "fines" | "tokenSessions"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Categories: {
        payload: Prisma.$CategoriesPayload<ExtArgs>
        fields: Prisma.CategoriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesPayload>
          }
          findFirst: {
            args: Prisma.CategoriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesPayload>
          }
          findMany: {
            args: Prisma.CategoriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesPayload>[]
          }
          create: {
            args: Prisma.CategoriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesPayload>
          }
          createMany: {
            args: Prisma.CategoriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CategoriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesPayload>
          }
          update: {
            args: Prisma.CategoriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesPayload>
          }
          deleteMany: {
            args: Prisma.CategoriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesPayload>
          }
          aggregate: {
            args: Prisma.CategoriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategories>
          }
          groupBy: {
            args: Prisma.CategoriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoriesCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriesCountAggregateOutputType> | number
          }
        }
      }
      Users: {
        payload: Prisma.$UsersPayload<ExtArgs>
        fields: Prisma.UsersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findFirst: {
            args: Prisma.UsersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          findMany: {
            args: Prisma.UsersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>[]
          }
          create: {
            args: Prisma.UsersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          createMany: {
            args: Prisma.UsersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UsersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          update: {
            args: Prisma.UsersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          deleteMany: {
            args: Prisma.UsersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UsersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.UsersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      Books: {
        payload: Prisma.$BooksPayload<ExtArgs>
        fields: Prisma.BooksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BooksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BooksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BooksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BooksPayload>
          }
          findFirst: {
            args: Prisma.BooksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BooksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BooksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BooksPayload>
          }
          findMany: {
            args: Prisma.BooksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BooksPayload>[]
          }
          create: {
            args: Prisma.BooksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BooksPayload>
          }
          createMany: {
            args: Prisma.BooksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BooksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BooksPayload>
          }
          update: {
            args: Prisma.BooksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BooksPayload>
          }
          deleteMany: {
            args: Prisma.BooksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BooksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BooksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BooksPayload>
          }
          aggregate: {
            args: Prisma.BooksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooks>
          }
          groupBy: {
            args: Prisma.BooksGroupByArgs<ExtArgs>
            result: $Utils.Optional<BooksGroupByOutputType>[]
          }
          count: {
            args: Prisma.BooksCountArgs<ExtArgs>
            result: $Utils.Optional<BooksCountAggregateOutputType> | number
          }
        }
      }
      Borrowings: {
        payload: Prisma.$BorrowingsPayload<ExtArgs>
        fields: Prisma.BorrowingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BorrowingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BorrowingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BorrowingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BorrowingsPayload>
          }
          findFirst: {
            args: Prisma.BorrowingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BorrowingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BorrowingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BorrowingsPayload>
          }
          findMany: {
            args: Prisma.BorrowingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BorrowingsPayload>[]
          }
          create: {
            args: Prisma.BorrowingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BorrowingsPayload>
          }
          createMany: {
            args: Prisma.BorrowingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BorrowingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BorrowingsPayload>
          }
          update: {
            args: Prisma.BorrowingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BorrowingsPayload>
          }
          deleteMany: {
            args: Prisma.BorrowingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BorrowingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BorrowingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BorrowingsPayload>
          }
          aggregate: {
            args: Prisma.BorrowingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBorrowings>
          }
          groupBy: {
            args: Prisma.BorrowingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BorrowingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.BorrowingsCountArgs<ExtArgs>
            result: $Utils.Optional<BorrowingsCountAggregateOutputType> | number
          }
        }
      }
      Fines: {
        payload: Prisma.$FinesPayload<ExtArgs>
        fields: Prisma.FinesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FinesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FinesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinesPayload>
          }
          findFirst: {
            args: Prisma.FinesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FinesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinesPayload>
          }
          findMany: {
            args: Prisma.FinesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinesPayload>[]
          }
          create: {
            args: Prisma.FinesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinesPayload>
          }
          createMany: {
            args: Prisma.FinesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FinesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinesPayload>
          }
          update: {
            args: Prisma.FinesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinesPayload>
          }
          deleteMany: {
            args: Prisma.FinesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FinesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FinesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinesPayload>
          }
          aggregate: {
            args: Prisma.FinesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFines>
          }
          groupBy: {
            args: Prisma.FinesGroupByArgs<ExtArgs>
            result: $Utils.Optional<FinesGroupByOutputType>[]
          }
          count: {
            args: Prisma.FinesCountArgs<ExtArgs>
            result: $Utils.Optional<FinesCountAggregateOutputType> | number
          }
        }
      }
      TokenSessions: {
        payload: Prisma.$TokenSessionsPayload<ExtArgs>
        fields: Prisma.TokenSessionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenSessionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenSessionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenSessionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenSessionsPayload>
          }
          findFirst: {
            args: Prisma.TokenSessionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenSessionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenSessionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenSessionsPayload>
          }
          findMany: {
            args: Prisma.TokenSessionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenSessionsPayload>[]
          }
          create: {
            args: Prisma.TokenSessionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenSessionsPayload>
          }
          createMany: {
            args: Prisma.TokenSessionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TokenSessionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenSessionsPayload>
          }
          update: {
            args: Prisma.TokenSessionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenSessionsPayload>
          }
          deleteMany: {
            args: Prisma.TokenSessionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenSessionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TokenSessionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenSessionsPayload>
          }
          aggregate: {
            args: Prisma.TokenSessionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTokenSessions>
          }
          groupBy: {
            args: Prisma.TokenSessionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenSessionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenSessionsCountArgs<ExtArgs>
            result: $Utils.Optional<TokenSessionsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    categories?: CategoriesOmit
    users?: UsersOmit
    books?: BooksOmit
    borrowings?: BorrowingsOmit
    fines?: FinesOmit
    tokenSessions?: TokenSessionsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CategoriesCountOutputType
   */

  export type CategoriesCountOutputType = {
    books: number
  }

  export type CategoriesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | CategoriesCountOutputTypeCountBooksArgs
  }

  // Custom InputTypes
  /**
   * CategoriesCountOutputType without action
   */
  export type CategoriesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesCountOutputType
     */
    select?: CategoriesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoriesCountOutputType without action
   */
  export type CategoriesCountOutputTypeCountBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BooksWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    borrowings: number
    sessions: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    borrowings?: boolean | UsersCountOutputTypeCountBorrowingsArgs
    sessions?: boolean | UsersCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountBorrowingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BorrowingsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenSessionsWhereInput
  }


  /**
   * Count Type BooksCountOutputType
   */

  export type BooksCountOutputType = {
    borrowings: number
  }

  export type BooksCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    borrowings?: boolean | BooksCountOutputTypeCountBorrowingsArgs
  }

  // Custom InputTypes
  /**
   * BooksCountOutputType without action
   */
  export type BooksCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BooksCountOutputType
     */
    select?: BooksCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BooksCountOutputType without action
   */
  export type BooksCountOutputTypeCountBorrowingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BorrowingsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Categories
   */

  export type AggregateCategories = {
    _count: CategoriesCountAggregateOutputType | null
    _avg: CategoriesAvgAggregateOutputType | null
    _sum: CategoriesSumAggregateOutputType | null
    _min: CategoriesMinAggregateOutputType | null
    _max: CategoriesMaxAggregateOutputType | null
  }

  export type CategoriesAvgAggregateOutputType = {
    id: number | null
  }

  export type CategoriesSumAggregateOutputType = {
    id: number | null
  }

  export type CategoriesMinAggregateOutputType = {
    id: number | null
    category_name: string | null
    is_active: boolean | null
    created_at: Date | null
    deleted_at: Date | null
  }

  export type CategoriesMaxAggregateOutputType = {
    id: number | null
    category_name: string | null
    is_active: boolean | null
    created_at: Date | null
    deleted_at: Date | null
  }

  export type CategoriesCountAggregateOutputType = {
    id: number
    category_name: number
    is_active: number
    created_at: number
    deleted_at: number
    _all: number
  }


  export type CategoriesAvgAggregateInputType = {
    id?: true
  }

  export type CategoriesSumAggregateInputType = {
    id?: true
  }

  export type CategoriesMinAggregateInputType = {
    id?: true
    category_name?: true
    is_active?: true
    created_at?: true
    deleted_at?: true
  }

  export type CategoriesMaxAggregateInputType = {
    id?: true
    category_name?: true
    is_active?: true
    created_at?: true
    deleted_at?: true
  }

  export type CategoriesCountAggregateInputType = {
    id?: true
    category_name?: true
    is_active?: true
    created_at?: true
    deleted_at?: true
    _all?: true
  }

  export type CategoriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to aggregate.
     */
    where?: CategoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoriesOrderByWithRelationInput | CategoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriesMaxAggregateInputType
  }

  export type GetCategoriesAggregateType<T extends CategoriesAggregateArgs> = {
        [P in keyof T & keyof AggregateCategories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategories[P]>
      : GetScalarType<T[P], AggregateCategories[P]>
  }




  export type CategoriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriesWhereInput
    orderBy?: CategoriesOrderByWithAggregationInput | CategoriesOrderByWithAggregationInput[]
    by: CategoriesScalarFieldEnum[] | CategoriesScalarFieldEnum
    having?: CategoriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriesCountAggregateInputType | true
    _avg?: CategoriesAvgAggregateInputType
    _sum?: CategoriesSumAggregateInputType
    _min?: CategoriesMinAggregateInputType
    _max?: CategoriesMaxAggregateInputType
  }

  export type CategoriesGroupByOutputType = {
    id: number
    category_name: string
    is_active: boolean
    created_at: Date
    deleted_at: Date | null
    _count: CategoriesCountAggregateOutputType | null
    _avg: CategoriesAvgAggregateOutputType | null
    _sum: CategoriesSumAggregateOutputType | null
    _min: CategoriesMinAggregateOutputType | null
    _max: CategoriesMaxAggregateOutputType | null
  }

  type GetCategoriesGroupByPayload<T extends CategoriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriesGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriesGroupByOutputType[P]>
        }
      >
    >


  export type CategoriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category_name?: boolean
    is_active?: boolean
    created_at?: boolean
    deleted_at?: boolean
    books?: boolean | Categories$booksArgs<ExtArgs>
    _count?: boolean | CategoriesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categories"]>



  export type CategoriesSelectScalar = {
    id?: boolean
    category_name?: boolean
    is_active?: boolean
    created_at?: boolean
    deleted_at?: boolean
  }

  export type CategoriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "category_name" | "is_active" | "created_at" | "deleted_at", ExtArgs["result"]["categories"]>
  export type CategoriesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | Categories$booksArgs<ExtArgs>
    _count?: boolean | CategoriesCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CategoriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Categories"
    objects: {
      books: Prisma.$BooksPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      category_name: string
      is_active: boolean
      created_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["categories"]>
    composites: {}
  }

  type CategoriesGetPayload<S extends boolean | null | undefined | CategoriesDefaultArgs> = $Result.GetResult<Prisma.$CategoriesPayload, S>

  type CategoriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriesCountAggregateInputType | true
    }

  export interface CategoriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Categories'], meta: { name: 'Categories' } }
    /**
     * Find zero or one Categories that matches the filter.
     * @param {CategoriesFindUniqueArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoriesFindUniqueArgs>(args: SelectSubset<T, CategoriesFindUniqueArgs<ExtArgs>>): Prisma__CategoriesClient<$Result.GetResult<Prisma.$CategoriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categories that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoriesFindUniqueOrThrowArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoriesFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoriesClient<$Result.GetResult<Prisma.$CategoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesFindFirstArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoriesFindFirstArgs>(args?: SelectSubset<T, CategoriesFindFirstArgs<ExtArgs>>): Prisma__CategoriesClient<$Result.GetResult<Prisma.$CategoriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categories that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesFindFirstOrThrowArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoriesFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoriesClient<$Result.GetResult<Prisma.$CategoriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.categories.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.categories.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriesWithIdOnly = await prisma.categories.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoriesFindManyArgs>(args?: SelectSubset<T, CategoriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categories.
     * @param {CategoriesCreateArgs} args - Arguments to create a Categories.
     * @example
     * // Create one Categories
     * const Categories = await prisma.categories.create({
     *   data: {
     *     // ... data to create a Categories
     *   }
     * })
     * 
     */
    create<T extends CategoriesCreateArgs>(args: SelectSubset<T, CategoriesCreateArgs<ExtArgs>>): Prisma__CategoriesClient<$Result.GetResult<Prisma.$CategoriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoriesCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const categories = await prisma.categories.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoriesCreateManyArgs>(args?: SelectSubset<T, CategoriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Categories.
     * @param {CategoriesDeleteArgs} args - Arguments to delete one Categories.
     * @example
     * // Delete one Categories
     * const Categories = await prisma.categories.delete({
     *   where: {
     *     // ... filter to delete one Categories
     *   }
     * })
     * 
     */
    delete<T extends CategoriesDeleteArgs>(args: SelectSubset<T, CategoriesDeleteArgs<ExtArgs>>): Prisma__CategoriesClient<$Result.GetResult<Prisma.$CategoriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categories.
     * @param {CategoriesUpdateArgs} args - Arguments to update one Categories.
     * @example
     * // Update one Categories
     * const categories = await prisma.categories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoriesUpdateArgs>(args: SelectSubset<T, CategoriesUpdateArgs<ExtArgs>>): Prisma__CategoriesClient<$Result.GetResult<Prisma.$CategoriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoriesDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.categories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoriesDeleteManyArgs>(args?: SelectSubset<T, CategoriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const categories = await prisma.categories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoriesUpdateManyArgs>(args: SelectSubset<T, CategoriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Categories.
     * @param {CategoriesUpsertArgs} args - Arguments to update or create a Categories.
     * @example
     * // Update or create a Categories
     * const categories = await prisma.categories.upsert({
     *   create: {
     *     // ... data to create a Categories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categories we want to update
     *   }
     * })
     */
    upsert<T extends CategoriesUpsertArgs>(args: SelectSubset<T, CategoriesUpsertArgs<ExtArgs>>): Prisma__CategoriesClient<$Result.GetResult<Prisma.$CategoriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.categories.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoriesCountArgs>(
      args?: Subset<T, CategoriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriesAggregateArgs>(args: Subset<T, CategoriesAggregateArgs>): Prisma.PrismaPromise<GetCategoriesAggregateType<T>>

    /**
     * Group by Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoriesGroupByArgs['orderBy'] }
        : { orderBy?: CategoriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Categories model
   */
  readonly fields: CategoriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Categories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    books<T extends Categories$booksArgs<ExtArgs> = {}>(args?: Subset<T, Categories$booksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BooksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Categories model
   */
  interface CategoriesFieldRefs {
    readonly id: FieldRef<"Categories", 'Int'>
    readonly category_name: FieldRef<"Categories", 'String'>
    readonly is_active: FieldRef<"Categories", 'Boolean'>
    readonly created_at: FieldRef<"Categories", 'DateTime'>
    readonly deleted_at: FieldRef<"Categories", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Categories findUnique
   */
  export type CategoriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categories
     */
    select?: CategoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categories
     */
    omit?: CategoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where: CategoriesWhereUniqueInput
  }

  /**
   * Categories findUniqueOrThrow
   */
  export type CategoriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categories
     */
    select?: CategoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categories
     */
    omit?: CategoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where: CategoriesWhereUniqueInput
  }

  /**
   * Categories findFirst
   */
  export type CategoriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categories
     */
    select?: CategoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categories
     */
    omit?: CategoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoriesOrderByWithRelationInput | CategoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * Categories findFirstOrThrow
   */
  export type CategoriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categories
     */
    select?: CategoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categories
     */
    omit?: CategoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoriesOrderByWithRelationInput | CategoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * Categories findMany
   */
  export type CategoriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categories
     */
    select?: CategoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categories
     */
    omit?: CategoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoriesOrderByWithRelationInput | CategoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * Categories create
   */
  export type CategoriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categories
     */
    select?: CategoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categories
     */
    omit?: CategoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesInclude<ExtArgs> | null
    /**
     * The data needed to create a Categories.
     */
    data: XOR<CategoriesCreateInput, CategoriesUncheckedCreateInput>
  }

  /**
   * Categories createMany
   */
  export type CategoriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoriesCreateManyInput | CategoriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categories update
   */
  export type CategoriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categories
     */
    select?: CategoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categories
     */
    omit?: CategoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesInclude<ExtArgs> | null
    /**
     * The data needed to update a Categories.
     */
    data: XOR<CategoriesUpdateInput, CategoriesUncheckedUpdateInput>
    /**
     * Choose, which Categories to update.
     */
    where: CategoriesWhereUniqueInput
  }

  /**
   * Categories updateMany
   */
  export type CategoriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoriesUpdateManyMutationInput, CategoriesUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoriesWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Categories upsert
   */
  export type CategoriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categories
     */
    select?: CategoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categories
     */
    omit?: CategoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesInclude<ExtArgs> | null
    /**
     * The filter to search for the Categories to update in case it exists.
     */
    where: CategoriesWhereUniqueInput
    /**
     * In case the Categories found by the `where` argument doesn't exist, create a new Categories with this data.
     */
    create: XOR<CategoriesCreateInput, CategoriesUncheckedCreateInput>
    /**
     * In case the Categories was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoriesUpdateInput, CategoriesUncheckedUpdateInput>
  }

  /**
   * Categories delete
   */
  export type CategoriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categories
     */
    select?: CategoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categories
     */
    omit?: CategoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesInclude<ExtArgs> | null
    /**
     * Filter which Categories to delete.
     */
    where: CategoriesWhereUniqueInput
  }

  /**
   * Categories deleteMany
   */
  export type CategoriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoriesWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Categories.books
   */
  export type Categories$booksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Books
     */
    select?: BooksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Books
     */
    omit?: BooksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BooksInclude<ExtArgs> | null
    where?: BooksWhereInput
    orderBy?: BooksOrderByWithRelationInput | BooksOrderByWithRelationInput[]
    cursor?: BooksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BooksScalarFieldEnum | BooksScalarFieldEnum[]
  }

  /**
   * Categories without action
   */
  export type CategoriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categories
     */
    select?: CategoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categories
     */
    omit?: CategoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesInclude<ExtArgs> | null
  }


  /**
   * Model Users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    nik: string | null
    email: string | null
    password: string | null
    full_name: string | null
    address: string | null
    phone: string | null
    ktp: string | null
    role: $Enums.UserRole | null
    account_status: $Enums.AccountStatus | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    nik: string | null
    email: string | null
    password: string | null
    full_name: string | null
    address: string | null
    phone: string | null
    ktp: string | null
    role: $Enums.UserRole | null
    account_status: $Enums.AccountStatus | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    nik: number
    email: number
    password: number
    full_name: number
    address: number
    phone: number
    ktp: number
    role: number
    account_status: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    nik?: true
    email?: true
    password?: true
    full_name?: true
    address?: true
    phone?: true
    ktp?: true
    role?: true
    account_status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    nik?: true
    email?: true
    password?: true
    full_name?: true
    address?: true
    phone?: true
    ktp?: true
    role?: true
    account_status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    nik?: true
    email?: true
    password?: true
    full_name?: true
    address?: true
    phone?: true
    ktp?: true
    role?: true
    account_status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to aggregate.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type UsersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsersWhereInput
    orderBy?: UsersOrderByWithAggregationInput | UsersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: UsersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    nik: string | null
    email: string
    password: string
    full_name: string
    address: string
    phone: string
    ktp: string | null
    role: $Enums.UserRole
    account_status: $Enums.AccountStatus
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends UsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type UsersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nik?: boolean
    email?: boolean
    password?: boolean
    full_name?: boolean
    address?: boolean
    phone?: boolean
    ktp?: boolean
    role?: boolean
    account_status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    borrowings?: boolean | Users$borrowingsArgs<ExtArgs>
    sessions?: boolean | Users$sessionsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>



  export type UsersSelectScalar = {
    id?: boolean
    nik?: boolean
    email?: boolean
    password?: boolean
    full_name?: boolean
    address?: boolean
    phone?: boolean
    ktp?: boolean
    role?: boolean
    account_status?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
  }

  export type UsersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nik" | "email" | "password" | "full_name" | "address" | "phone" | "ktp" | "role" | "account_status" | "created_at" | "updated_at" | "deleted_at", ExtArgs["result"]["users"]>
  export type UsersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    borrowings?: boolean | Users$borrowingsArgs<ExtArgs>
    sessions?: boolean | Users$sessionsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UsersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Users"
    objects: {
      borrowings: Prisma.$BorrowingsPayload<ExtArgs>[]
      sessions: Prisma.$TokenSessionsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nik: string | null
      email: string
      password: string
      full_name: string
      address: string
      phone: string
      ktp: string | null
      role: $Enums.UserRole
      account_status: $Enums.AccountStatus
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type UsersGetPayload<S extends boolean | null | undefined | UsersDefaultArgs> = $Result.GetResult<Prisma.$UsersPayload, S>

  type UsersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface UsersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Users'], meta: { name: 'Users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {UsersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsersFindUniqueArgs>(args: SelectSubset<T, UsersFindUniqueArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsersFindUniqueOrThrowArgs>(args: SelectSubset<T, UsersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsersFindFirstArgs>(args?: SelectSubset<T, UsersFindFirstArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsersFindFirstOrThrowArgs>(args?: SelectSubset<T, UsersFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsersFindManyArgs>(args?: SelectSubset<T, UsersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {UsersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends UsersCreateArgs>(args: SelectSubset<T, UsersCreateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UsersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsersCreateManyArgs>(args?: SelectSubset<T, UsersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {UsersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends UsersDeleteArgs>(args: SelectSubset<T, UsersDeleteArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {UsersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsersUpdateArgs>(args: SelectSubset<T, UsersUpdateArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UsersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsersDeleteManyArgs>(args?: SelectSubset<T, UsersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsersUpdateManyArgs>(args: SelectSubset<T, UsersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {UsersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends UsersUpsertArgs>(args: SelectSubset<T, UsersUpsertArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UsersCountArgs>(
      args?: Subset<T, UsersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersGroupByArgs['orderBy'] }
        : { orderBy?: UsersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Users model
   */
  readonly fields: UsersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    borrowings<T extends Users$borrowingsArgs<ExtArgs> = {}>(args?: Subset<T, Users$borrowingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BorrowingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends Users$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Users$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenSessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Users model
   */
  interface UsersFieldRefs {
    readonly id: FieldRef<"Users", 'Int'>
    readonly nik: FieldRef<"Users", 'String'>
    readonly email: FieldRef<"Users", 'String'>
    readonly password: FieldRef<"Users", 'String'>
    readonly full_name: FieldRef<"Users", 'String'>
    readonly address: FieldRef<"Users", 'String'>
    readonly phone: FieldRef<"Users", 'String'>
    readonly ktp: FieldRef<"Users", 'String'>
    readonly role: FieldRef<"Users", 'UserRole'>
    readonly account_status: FieldRef<"Users", 'AccountStatus'>
    readonly created_at: FieldRef<"Users", 'DateTime'>
    readonly updated_at: FieldRef<"Users", 'DateTime'>
    readonly deleted_at: FieldRef<"Users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Users findUnique
   */
  export type UsersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findUniqueOrThrow
   */
  export type UsersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users findFirst
   */
  export type UsersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findFirstOrThrow
   */
  export type UsersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users findMany
   */
  export type UsersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UsersOrderByWithRelationInput | UsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * Users create
   */
  export type UsersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The data needed to create a Users.
     */
    data: XOR<UsersCreateInput, UsersUncheckedCreateInput>
  }

  /**
   * Users createMany
   */
  export type UsersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UsersCreateManyInput | UsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Users update
   */
  export type UsersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The data needed to update a Users.
     */
    data: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
    /**
     * Choose, which Users to update.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users updateMany
   */
  export type UsersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UsersUpdateManyMutationInput, UsersUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * Users upsert
   */
  export type UsersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * The filter to search for the Users to update in case it exists.
     */
    where: UsersWhereUniqueInput
    /**
     * In case the Users found by the `where` argument doesn't exist, create a new Users with this data.
     */
    create: XOR<UsersCreateInput, UsersUncheckedCreateInput>
    /**
     * In case the Users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsersUpdateInput, UsersUncheckedUpdateInput>
  }

  /**
   * Users delete
   */
  export type UsersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
    /**
     * Filter which Users to delete.
     */
    where: UsersWhereUniqueInput
  }

  /**
   * Users deleteMany
   */
  export type UsersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UsersWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * Users.borrowings
   */
  export type Users$borrowingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Borrowings
     */
    select?: BorrowingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Borrowings
     */
    omit?: BorrowingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BorrowingsInclude<ExtArgs> | null
    where?: BorrowingsWhereInput
    orderBy?: BorrowingsOrderByWithRelationInput | BorrowingsOrderByWithRelationInput[]
    cursor?: BorrowingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BorrowingsScalarFieldEnum | BorrowingsScalarFieldEnum[]
  }

  /**
   * Users.sessions
   */
  export type Users$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenSessions
     */
    select?: TokenSessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenSessions
     */
    omit?: TokenSessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenSessionsInclude<ExtArgs> | null
    where?: TokenSessionsWhereInput
    orderBy?: TokenSessionsOrderByWithRelationInput | TokenSessionsOrderByWithRelationInput[]
    cursor?: TokenSessionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TokenSessionsScalarFieldEnum | TokenSessionsScalarFieldEnum[]
  }

  /**
   * Users without action
   */
  export type UsersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Users
     */
    select?: UsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Users
     */
    omit?: UsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsersInclude<ExtArgs> | null
  }


  /**
   * Model Books
   */

  export type AggregateBooks = {
    _count: BooksCountAggregateOutputType | null
    _avg: BooksAvgAggregateOutputType | null
    _sum: BooksSumAggregateOutputType | null
    _min: BooksMinAggregateOutputType | null
    _max: BooksMaxAggregateOutputType | null
  }

  export type BooksAvgAggregateOutputType = {
    id: number | null
    category_id: number | null
    year: number | null
    total_stock: number | null
    available: number | null
  }

  export type BooksSumAggregateOutputType = {
    id: number | null
    category_id: number | null
    year: number | null
    total_stock: number | null
    available: number | null
  }

  export type BooksMinAggregateOutputType = {
    id: number | null
    category_id: number | null
    title: string | null
    author: string | null
    publisher: string | null
    description: string | null
    book_cover: string | null
    year: number | null
    total_stock: number | null
    available: number | null
    created_at: Date | null
    deleted_at: Date | null
  }

  export type BooksMaxAggregateOutputType = {
    id: number | null
    category_id: number | null
    title: string | null
    author: string | null
    publisher: string | null
    description: string | null
    book_cover: string | null
    year: number | null
    total_stock: number | null
    available: number | null
    created_at: Date | null
    deleted_at: Date | null
  }

  export type BooksCountAggregateOutputType = {
    id: number
    category_id: number
    title: number
    author: number
    publisher: number
    description: number
    book_cover: number
    year: number
    total_stock: number
    available: number
    created_at: number
    deleted_at: number
    _all: number
  }


  export type BooksAvgAggregateInputType = {
    id?: true
    category_id?: true
    year?: true
    total_stock?: true
    available?: true
  }

  export type BooksSumAggregateInputType = {
    id?: true
    category_id?: true
    year?: true
    total_stock?: true
    available?: true
  }

  export type BooksMinAggregateInputType = {
    id?: true
    category_id?: true
    title?: true
    author?: true
    publisher?: true
    description?: true
    book_cover?: true
    year?: true
    total_stock?: true
    available?: true
    created_at?: true
    deleted_at?: true
  }

  export type BooksMaxAggregateInputType = {
    id?: true
    category_id?: true
    title?: true
    author?: true
    publisher?: true
    description?: true
    book_cover?: true
    year?: true
    total_stock?: true
    available?: true
    created_at?: true
    deleted_at?: true
  }

  export type BooksCountAggregateInputType = {
    id?: true
    category_id?: true
    title?: true
    author?: true
    publisher?: true
    description?: true
    book_cover?: true
    year?: true
    total_stock?: true
    available?: true
    created_at?: true
    deleted_at?: true
    _all?: true
  }

  export type BooksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Books to aggregate.
     */
    where?: BooksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BooksOrderByWithRelationInput | BooksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BooksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Books
    **/
    _count?: true | BooksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BooksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BooksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BooksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BooksMaxAggregateInputType
  }

  export type GetBooksAggregateType<T extends BooksAggregateArgs> = {
        [P in keyof T & keyof AggregateBooks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooks[P]>
      : GetScalarType<T[P], AggregateBooks[P]>
  }




  export type BooksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BooksWhereInput
    orderBy?: BooksOrderByWithAggregationInput | BooksOrderByWithAggregationInput[]
    by: BooksScalarFieldEnum[] | BooksScalarFieldEnum
    having?: BooksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BooksCountAggregateInputType | true
    _avg?: BooksAvgAggregateInputType
    _sum?: BooksSumAggregateInputType
    _min?: BooksMinAggregateInputType
    _max?: BooksMaxAggregateInputType
  }

  export type BooksGroupByOutputType = {
    id: number
    category_id: number
    title: string
    author: string
    publisher: string
    description: string | null
    book_cover: string | null
    year: number
    total_stock: number
    available: number
    created_at: Date
    deleted_at: Date | null
    _count: BooksCountAggregateOutputType | null
    _avg: BooksAvgAggregateOutputType | null
    _sum: BooksSumAggregateOutputType | null
    _min: BooksMinAggregateOutputType | null
    _max: BooksMaxAggregateOutputType | null
  }

  type GetBooksGroupByPayload<T extends BooksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BooksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BooksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BooksGroupByOutputType[P]>
            : GetScalarType<T[P], BooksGroupByOutputType[P]>
        }
      >
    >


  export type BooksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category_id?: boolean
    title?: boolean
    author?: boolean
    publisher?: boolean
    description?: boolean
    book_cover?: boolean
    year?: boolean
    total_stock?: boolean
    available?: boolean
    created_at?: boolean
    deleted_at?: boolean
    category?: boolean | CategoriesDefaultArgs<ExtArgs>
    borrowings?: boolean | Books$borrowingsArgs<ExtArgs>
    _count?: boolean | BooksCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["books"]>



  export type BooksSelectScalar = {
    id?: boolean
    category_id?: boolean
    title?: boolean
    author?: boolean
    publisher?: boolean
    description?: boolean
    book_cover?: boolean
    year?: boolean
    total_stock?: boolean
    available?: boolean
    created_at?: boolean
    deleted_at?: boolean
  }

  export type BooksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "category_id" | "title" | "author" | "publisher" | "description" | "book_cover" | "year" | "total_stock" | "available" | "created_at" | "deleted_at", ExtArgs["result"]["books"]>
  export type BooksInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoriesDefaultArgs<ExtArgs>
    borrowings?: boolean | Books$borrowingsArgs<ExtArgs>
    _count?: boolean | BooksCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BooksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Books"
    objects: {
      category: Prisma.$CategoriesPayload<ExtArgs>
      borrowings: Prisma.$BorrowingsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      category_id: number
      title: string
      author: string
      publisher: string
      description: string | null
      book_cover: string | null
      year: number
      total_stock: number
      available: number
      created_at: Date
      deleted_at: Date | null
    }, ExtArgs["result"]["books"]>
    composites: {}
  }

  type BooksGetPayload<S extends boolean | null | undefined | BooksDefaultArgs> = $Result.GetResult<Prisma.$BooksPayload, S>

  type BooksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BooksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BooksCountAggregateInputType | true
    }

  export interface BooksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Books'], meta: { name: 'Books' } }
    /**
     * Find zero or one Books that matches the filter.
     * @param {BooksFindUniqueArgs} args - Arguments to find a Books
     * @example
     * // Get one Books
     * const books = await prisma.books.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BooksFindUniqueArgs>(args: SelectSubset<T, BooksFindUniqueArgs<ExtArgs>>): Prisma__BooksClient<$Result.GetResult<Prisma.$BooksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Books that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BooksFindUniqueOrThrowArgs} args - Arguments to find a Books
     * @example
     * // Get one Books
     * const books = await prisma.books.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BooksFindUniqueOrThrowArgs>(args: SelectSubset<T, BooksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BooksClient<$Result.GetResult<Prisma.$BooksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Books that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BooksFindFirstArgs} args - Arguments to find a Books
     * @example
     * // Get one Books
     * const books = await prisma.books.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BooksFindFirstArgs>(args?: SelectSubset<T, BooksFindFirstArgs<ExtArgs>>): Prisma__BooksClient<$Result.GetResult<Prisma.$BooksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Books that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BooksFindFirstOrThrowArgs} args - Arguments to find a Books
     * @example
     * // Get one Books
     * const books = await prisma.books.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BooksFindFirstOrThrowArgs>(args?: SelectSubset<T, BooksFindFirstOrThrowArgs<ExtArgs>>): Prisma__BooksClient<$Result.GetResult<Prisma.$BooksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Books that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BooksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Books
     * const books = await prisma.books.findMany()
     * 
     * // Get first 10 Books
     * const books = await prisma.books.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const booksWithIdOnly = await prisma.books.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BooksFindManyArgs>(args?: SelectSubset<T, BooksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BooksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Books.
     * @param {BooksCreateArgs} args - Arguments to create a Books.
     * @example
     * // Create one Books
     * const Books = await prisma.books.create({
     *   data: {
     *     // ... data to create a Books
     *   }
     * })
     * 
     */
    create<T extends BooksCreateArgs>(args: SelectSubset<T, BooksCreateArgs<ExtArgs>>): Prisma__BooksClient<$Result.GetResult<Prisma.$BooksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Books.
     * @param {BooksCreateManyArgs} args - Arguments to create many Books.
     * @example
     * // Create many Books
     * const books = await prisma.books.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BooksCreateManyArgs>(args?: SelectSubset<T, BooksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Books.
     * @param {BooksDeleteArgs} args - Arguments to delete one Books.
     * @example
     * // Delete one Books
     * const Books = await prisma.books.delete({
     *   where: {
     *     // ... filter to delete one Books
     *   }
     * })
     * 
     */
    delete<T extends BooksDeleteArgs>(args: SelectSubset<T, BooksDeleteArgs<ExtArgs>>): Prisma__BooksClient<$Result.GetResult<Prisma.$BooksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Books.
     * @param {BooksUpdateArgs} args - Arguments to update one Books.
     * @example
     * // Update one Books
     * const books = await prisma.books.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BooksUpdateArgs>(args: SelectSubset<T, BooksUpdateArgs<ExtArgs>>): Prisma__BooksClient<$Result.GetResult<Prisma.$BooksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Books.
     * @param {BooksDeleteManyArgs} args - Arguments to filter Books to delete.
     * @example
     * // Delete a few Books
     * const { count } = await prisma.books.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BooksDeleteManyArgs>(args?: SelectSubset<T, BooksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BooksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Books
     * const books = await prisma.books.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BooksUpdateManyArgs>(args: SelectSubset<T, BooksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Books.
     * @param {BooksUpsertArgs} args - Arguments to update or create a Books.
     * @example
     * // Update or create a Books
     * const books = await prisma.books.upsert({
     *   create: {
     *     // ... data to create a Books
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Books we want to update
     *   }
     * })
     */
    upsert<T extends BooksUpsertArgs>(args: SelectSubset<T, BooksUpsertArgs<ExtArgs>>): Prisma__BooksClient<$Result.GetResult<Prisma.$BooksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BooksCountArgs} args - Arguments to filter Books to count.
     * @example
     * // Count the number of Books
     * const count = await prisma.books.count({
     *   where: {
     *     // ... the filter for the Books we want to count
     *   }
     * })
    **/
    count<T extends BooksCountArgs>(
      args?: Subset<T, BooksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BooksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BooksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BooksAggregateArgs>(args: Subset<T, BooksAggregateArgs>): Prisma.PrismaPromise<GetBooksAggregateType<T>>

    /**
     * Group by Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BooksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BooksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BooksGroupByArgs['orderBy'] }
        : { orderBy?: BooksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BooksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBooksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Books model
   */
  readonly fields: BooksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Books.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BooksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoriesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoriesDefaultArgs<ExtArgs>>): Prisma__CategoriesClient<$Result.GetResult<Prisma.$CategoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    borrowings<T extends Books$borrowingsArgs<ExtArgs> = {}>(args?: Subset<T, Books$borrowingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BorrowingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Books model
   */
  interface BooksFieldRefs {
    readonly id: FieldRef<"Books", 'Int'>
    readonly category_id: FieldRef<"Books", 'Int'>
    readonly title: FieldRef<"Books", 'String'>
    readonly author: FieldRef<"Books", 'String'>
    readonly publisher: FieldRef<"Books", 'String'>
    readonly description: FieldRef<"Books", 'String'>
    readonly book_cover: FieldRef<"Books", 'String'>
    readonly year: FieldRef<"Books", 'Int'>
    readonly total_stock: FieldRef<"Books", 'Int'>
    readonly available: FieldRef<"Books", 'Int'>
    readonly created_at: FieldRef<"Books", 'DateTime'>
    readonly deleted_at: FieldRef<"Books", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Books findUnique
   */
  export type BooksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Books
     */
    select?: BooksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Books
     */
    omit?: BooksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BooksInclude<ExtArgs> | null
    /**
     * Filter, which Books to fetch.
     */
    where: BooksWhereUniqueInput
  }

  /**
   * Books findUniqueOrThrow
   */
  export type BooksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Books
     */
    select?: BooksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Books
     */
    omit?: BooksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BooksInclude<ExtArgs> | null
    /**
     * Filter, which Books to fetch.
     */
    where: BooksWhereUniqueInput
  }

  /**
   * Books findFirst
   */
  export type BooksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Books
     */
    select?: BooksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Books
     */
    omit?: BooksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BooksInclude<ExtArgs> | null
    /**
     * Filter, which Books to fetch.
     */
    where?: BooksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BooksOrderByWithRelationInput | BooksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Books.
     */
    cursor?: BooksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BooksScalarFieldEnum | BooksScalarFieldEnum[]
  }

  /**
   * Books findFirstOrThrow
   */
  export type BooksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Books
     */
    select?: BooksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Books
     */
    omit?: BooksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BooksInclude<ExtArgs> | null
    /**
     * Filter, which Books to fetch.
     */
    where?: BooksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BooksOrderByWithRelationInput | BooksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Books.
     */
    cursor?: BooksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BooksScalarFieldEnum | BooksScalarFieldEnum[]
  }

  /**
   * Books findMany
   */
  export type BooksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Books
     */
    select?: BooksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Books
     */
    omit?: BooksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BooksInclude<ExtArgs> | null
    /**
     * Filter, which Books to fetch.
     */
    where?: BooksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BooksOrderByWithRelationInput | BooksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Books.
     */
    cursor?: BooksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BooksScalarFieldEnum | BooksScalarFieldEnum[]
  }

  /**
   * Books create
   */
  export type BooksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Books
     */
    select?: BooksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Books
     */
    omit?: BooksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BooksInclude<ExtArgs> | null
    /**
     * The data needed to create a Books.
     */
    data: XOR<BooksCreateInput, BooksUncheckedCreateInput>
  }

  /**
   * Books createMany
   */
  export type BooksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Books.
     */
    data: BooksCreateManyInput | BooksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Books update
   */
  export type BooksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Books
     */
    select?: BooksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Books
     */
    omit?: BooksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BooksInclude<ExtArgs> | null
    /**
     * The data needed to update a Books.
     */
    data: XOR<BooksUpdateInput, BooksUncheckedUpdateInput>
    /**
     * Choose, which Books to update.
     */
    where: BooksWhereUniqueInput
  }

  /**
   * Books updateMany
   */
  export type BooksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Books.
     */
    data: XOR<BooksUpdateManyMutationInput, BooksUncheckedUpdateManyInput>
    /**
     * Filter which Books to update
     */
    where?: BooksWhereInput
    /**
     * Limit how many Books to update.
     */
    limit?: number
  }

  /**
   * Books upsert
   */
  export type BooksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Books
     */
    select?: BooksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Books
     */
    omit?: BooksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BooksInclude<ExtArgs> | null
    /**
     * The filter to search for the Books to update in case it exists.
     */
    where: BooksWhereUniqueInput
    /**
     * In case the Books found by the `where` argument doesn't exist, create a new Books with this data.
     */
    create: XOR<BooksCreateInput, BooksUncheckedCreateInput>
    /**
     * In case the Books was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BooksUpdateInput, BooksUncheckedUpdateInput>
  }

  /**
   * Books delete
   */
  export type BooksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Books
     */
    select?: BooksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Books
     */
    omit?: BooksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BooksInclude<ExtArgs> | null
    /**
     * Filter which Books to delete.
     */
    where: BooksWhereUniqueInput
  }

  /**
   * Books deleteMany
   */
  export type BooksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Books to delete
     */
    where?: BooksWhereInput
    /**
     * Limit how many Books to delete.
     */
    limit?: number
  }

  /**
   * Books.borrowings
   */
  export type Books$borrowingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Borrowings
     */
    select?: BorrowingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Borrowings
     */
    omit?: BorrowingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BorrowingsInclude<ExtArgs> | null
    where?: BorrowingsWhereInput
    orderBy?: BorrowingsOrderByWithRelationInput | BorrowingsOrderByWithRelationInput[]
    cursor?: BorrowingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BorrowingsScalarFieldEnum | BorrowingsScalarFieldEnum[]
  }

  /**
   * Books without action
   */
  export type BooksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Books
     */
    select?: BooksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Books
     */
    omit?: BooksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BooksInclude<ExtArgs> | null
  }


  /**
   * Model Borrowings
   */

  export type AggregateBorrowings = {
    _count: BorrowingsCountAggregateOutputType | null
    _avg: BorrowingsAvgAggregateOutputType | null
    _sum: BorrowingsSumAggregateOutputType | null
    _min: BorrowingsMinAggregateOutputType | null
    _max: BorrowingsMaxAggregateOutputType | null
  }

  export type BorrowingsAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    book_id: number | null
  }

  export type BorrowingsSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    book_id: number | null
  }

  export type BorrowingsMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    book_id: number | null
    borrow_date: Date | null
    due_date: Date | null
    return_date: Date | null
    status: $Enums.BorrowingStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BorrowingsMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    book_id: number | null
    borrow_date: Date | null
    due_date: Date | null
    return_date: Date | null
    status: $Enums.BorrowingStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BorrowingsCountAggregateOutputType = {
    id: number
    user_id: number
    book_id: number
    borrow_date: number
    due_date: number
    return_date: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type BorrowingsAvgAggregateInputType = {
    id?: true
    user_id?: true
    book_id?: true
  }

  export type BorrowingsSumAggregateInputType = {
    id?: true
    user_id?: true
    book_id?: true
  }

  export type BorrowingsMinAggregateInputType = {
    id?: true
    user_id?: true
    book_id?: true
    borrow_date?: true
    due_date?: true
    return_date?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type BorrowingsMaxAggregateInputType = {
    id?: true
    user_id?: true
    book_id?: true
    borrow_date?: true
    due_date?: true
    return_date?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type BorrowingsCountAggregateInputType = {
    id?: true
    user_id?: true
    book_id?: true
    borrow_date?: true
    due_date?: true
    return_date?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type BorrowingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Borrowings to aggregate.
     */
    where?: BorrowingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Borrowings to fetch.
     */
    orderBy?: BorrowingsOrderByWithRelationInput | BorrowingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BorrowingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Borrowings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Borrowings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Borrowings
    **/
    _count?: true | BorrowingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BorrowingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BorrowingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BorrowingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BorrowingsMaxAggregateInputType
  }

  export type GetBorrowingsAggregateType<T extends BorrowingsAggregateArgs> = {
        [P in keyof T & keyof AggregateBorrowings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBorrowings[P]>
      : GetScalarType<T[P], AggregateBorrowings[P]>
  }




  export type BorrowingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BorrowingsWhereInput
    orderBy?: BorrowingsOrderByWithAggregationInput | BorrowingsOrderByWithAggregationInput[]
    by: BorrowingsScalarFieldEnum[] | BorrowingsScalarFieldEnum
    having?: BorrowingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BorrowingsCountAggregateInputType | true
    _avg?: BorrowingsAvgAggregateInputType
    _sum?: BorrowingsSumAggregateInputType
    _min?: BorrowingsMinAggregateInputType
    _max?: BorrowingsMaxAggregateInputType
  }

  export type BorrowingsGroupByOutputType = {
    id: number
    user_id: number
    book_id: number
    borrow_date: Date
    due_date: Date
    return_date: Date | null
    status: $Enums.BorrowingStatus
    created_at: Date
    updated_at: Date
    _count: BorrowingsCountAggregateOutputType | null
    _avg: BorrowingsAvgAggregateOutputType | null
    _sum: BorrowingsSumAggregateOutputType | null
    _min: BorrowingsMinAggregateOutputType | null
    _max: BorrowingsMaxAggregateOutputType | null
  }

  type GetBorrowingsGroupByPayload<T extends BorrowingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BorrowingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BorrowingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BorrowingsGroupByOutputType[P]>
            : GetScalarType<T[P], BorrowingsGroupByOutputType[P]>
        }
      >
    >


  export type BorrowingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    book_id?: boolean
    borrow_date?: boolean
    due_date?: boolean
    return_date?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
    book?: boolean | BooksDefaultArgs<ExtArgs>
    fine?: boolean | Borrowings$fineArgs<ExtArgs>
  }, ExtArgs["result"]["borrowings"]>



  export type BorrowingsSelectScalar = {
    id?: boolean
    user_id?: boolean
    book_id?: boolean
    borrow_date?: boolean
    due_date?: boolean
    return_date?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type BorrowingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "book_id" | "borrow_date" | "due_date" | "return_date" | "status" | "created_at" | "updated_at", ExtArgs["result"]["borrowings"]>
  export type BorrowingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
    book?: boolean | BooksDefaultArgs<ExtArgs>
    fine?: boolean | Borrowings$fineArgs<ExtArgs>
  }

  export type $BorrowingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Borrowings"
    objects: {
      user: Prisma.$UsersPayload<ExtArgs>
      book: Prisma.$BooksPayload<ExtArgs>
      fine: Prisma.$FinesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      book_id: number
      borrow_date: Date
      due_date: Date
      return_date: Date | null
      status: $Enums.BorrowingStatus
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["borrowings"]>
    composites: {}
  }

  type BorrowingsGetPayload<S extends boolean | null | undefined | BorrowingsDefaultArgs> = $Result.GetResult<Prisma.$BorrowingsPayload, S>

  type BorrowingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BorrowingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BorrowingsCountAggregateInputType | true
    }

  export interface BorrowingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Borrowings'], meta: { name: 'Borrowings' } }
    /**
     * Find zero or one Borrowings that matches the filter.
     * @param {BorrowingsFindUniqueArgs} args - Arguments to find a Borrowings
     * @example
     * // Get one Borrowings
     * const borrowings = await prisma.borrowings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BorrowingsFindUniqueArgs>(args: SelectSubset<T, BorrowingsFindUniqueArgs<ExtArgs>>): Prisma__BorrowingsClient<$Result.GetResult<Prisma.$BorrowingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Borrowings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BorrowingsFindUniqueOrThrowArgs} args - Arguments to find a Borrowings
     * @example
     * // Get one Borrowings
     * const borrowings = await prisma.borrowings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BorrowingsFindUniqueOrThrowArgs>(args: SelectSubset<T, BorrowingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BorrowingsClient<$Result.GetResult<Prisma.$BorrowingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Borrowings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BorrowingsFindFirstArgs} args - Arguments to find a Borrowings
     * @example
     * // Get one Borrowings
     * const borrowings = await prisma.borrowings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BorrowingsFindFirstArgs>(args?: SelectSubset<T, BorrowingsFindFirstArgs<ExtArgs>>): Prisma__BorrowingsClient<$Result.GetResult<Prisma.$BorrowingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Borrowings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BorrowingsFindFirstOrThrowArgs} args - Arguments to find a Borrowings
     * @example
     * // Get one Borrowings
     * const borrowings = await prisma.borrowings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BorrowingsFindFirstOrThrowArgs>(args?: SelectSubset<T, BorrowingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__BorrowingsClient<$Result.GetResult<Prisma.$BorrowingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Borrowings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BorrowingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Borrowings
     * const borrowings = await prisma.borrowings.findMany()
     * 
     * // Get first 10 Borrowings
     * const borrowings = await prisma.borrowings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const borrowingsWithIdOnly = await prisma.borrowings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BorrowingsFindManyArgs>(args?: SelectSubset<T, BorrowingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BorrowingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Borrowings.
     * @param {BorrowingsCreateArgs} args - Arguments to create a Borrowings.
     * @example
     * // Create one Borrowings
     * const Borrowings = await prisma.borrowings.create({
     *   data: {
     *     // ... data to create a Borrowings
     *   }
     * })
     * 
     */
    create<T extends BorrowingsCreateArgs>(args: SelectSubset<T, BorrowingsCreateArgs<ExtArgs>>): Prisma__BorrowingsClient<$Result.GetResult<Prisma.$BorrowingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Borrowings.
     * @param {BorrowingsCreateManyArgs} args - Arguments to create many Borrowings.
     * @example
     * // Create many Borrowings
     * const borrowings = await prisma.borrowings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BorrowingsCreateManyArgs>(args?: SelectSubset<T, BorrowingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Borrowings.
     * @param {BorrowingsDeleteArgs} args - Arguments to delete one Borrowings.
     * @example
     * // Delete one Borrowings
     * const Borrowings = await prisma.borrowings.delete({
     *   where: {
     *     // ... filter to delete one Borrowings
     *   }
     * })
     * 
     */
    delete<T extends BorrowingsDeleteArgs>(args: SelectSubset<T, BorrowingsDeleteArgs<ExtArgs>>): Prisma__BorrowingsClient<$Result.GetResult<Prisma.$BorrowingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Borrowings.
     * @param {BorrowingsUpdateArgs} args - Arguments to update one Borrowings.
     * @example
     * // Update one Borrowings
     * const borrowings = await prisma.borrowings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BorrowingsUpdateArgs>(args: SelectSubset<T, BorrowingsUpdateArgs<ExtArgs>>): Prisma__BorrowingsClient<$Result.GetResult<Prisma.$BorrowingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Borrowings.
     * @param {BorrowingsDeleteManyArgs} args - Arguments to filter Borrowings to delete.
     * @example
     * // Delete a few Borrowings
     * const { count } = await prisma.borrowings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BorrowingsDeleteManyArgs>(args?: SelectSubset<T, BorrowingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Borrowings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BorrowingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Borrowings
     * const borrowings = await prisma.borrowings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BorrowingsUpdateManyArgs>(args: SelectSubset<T, BorrowingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Borrowings.
     * @param {BorrowingsUpsertArgs} args - Arguments to update or create a Borrowings.
     * @example
     * // Update or create a Borrowings
     * const borrowings = await prisma.borrowings.upsert({
     *   create: {
     *     // ... data to create a Borrowings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Borrowings we want to update
     *   }
     * })
     */
    upsert<T extends BorrowingsUpsertArgs>(args: SelectSubset<T, BorrowingsUpsertArgs<ExtArgs>>): Prisma__BorrowingsClient<$Result.GetResult<Prisma.$BorrowingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Borrowings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BorrowingsCountArgs} args - Arguments to filter Borrowings to count.
     * @example
     * // Count the number of Borrowings
     * const count = await prisma.borrowings.count({
     *   where: {
     *     // ... the filter for the Borrowings we want to count
     *   }
     * })
    **/
    count<T extends BorrowingsCountArgs>(
      args?: Subset<T, BorrowingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BorrowingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Borrowings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BorrowingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BorrowingsAggregateArgs>(args: Subset<T, BorrowingsAggregateArgs>): Prisma.PrismaPromise<GetBorrowingsAggregateType<T>>

    /**
     * Group by Borrowings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BorrowingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BorrowingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BorrowingsGroupByArgs['orderBy'] }
        : { orderBy?: BorrowingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BorrowingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBorrowingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Borrowings model
   */
  readonly fields: BorrowingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Borrowings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BorrowingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UsersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsersDefaultArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    book<T extends BooksDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BooksDefaultArgs<ExtArgs>>): Prisma__BooksClient<$Result.GetResult<Prisma.$BooksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fine<T extends Borrowings$fineArgs<ExtArgs> = {}>(args?: Subset<T, Borrowings$fineArgs<ExtArgs>>): Prisma__FinesClient<$Result.GetResult<Prisma.$FinesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Borrowings model
   */
  interface BorrowingsFieldRefs {
    readonly id: FieldRef<"Borrowings", 'Int'>
    readonly user_id: FieldRef<"Borrowings", 'Int'>
    readonly book_id: FieldRef<"Borrowings", 'Int'>
    readonly borrow_date: FieldRef<"Borrowings", 'DateTime'>
    readonly due_date: FieldRef<"Borrowings", 'DateTime'>
    readonly return_date: FieldRef<"Borrowings", 'DateTime'>
    readonly status: FieldRef<"Borrowings", 'BorrowingStatus'>
    readonly created_at: FieldRef<"Borrowings", 'DateTime'>
    readonly updated_at: FieldRef<"Borrowings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Borrowings findUnique
   */
  export type BorrowingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Borrowings
     */
    select?: BorrowingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Borrowings
     */
    omit?: BorrowingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BorrowingsInclude<ExtArgs> | null
    /**
     * Filter, which Borrowings to fetch.
     */
    where: BorrowingsWhereUniqueInput
  }

  /**
   * Borrowings findUniqueOrThrow
   */
  export type BorrowingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Borrowings
     */
    select?: BorrowingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Borrowings
     */
    omit?: BorrowingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BorrowingsInclude<ExtArgs> | null
    /**
     * Filter, which Borrowings to fetch.
     */
    where: BorrowingsWhereUniqueInput
  }

  /**
   * Borrowings findFirst
   */
  export type BorrowingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Borrowings
     */
    select?: BorrowingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Borrowings
     */
    omit?: BorrowingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BorrowingsInclude<ExtArgs> | null
    /**
     * Filter, which Borrowings to fetch.
     */
    where?: BorrowingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Borrowings to fetch.
     */
    orderBy?: BorrowingsOrderByWithRelationInput | BorrowingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Borrowings.
     */
    cursor?: BorrowingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Borrowings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Borrowings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Borrowings.
     */
    distinct?: BorrowingsScalarFieldEnum | BorrowingsScalarFieldEnum[]
  }

  /**
   * Borrowings findFirstOrThrow
   */
  export type BorrowingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Borrowings
     */
    select?: BorrowingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Borrowings
     */
    omit?: BorrowingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BorrowingsInclude<ExtArgs> | null
    /**
     * Filter, which Borrowings to fetch.
     */
    where?: BorrowingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Borrowings to fetch.
     */
    orderBy?: BorrowingsOrderByWithRelationInput | BorrowingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Borrowings.
     */
    cursor?: BorrowingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Borrowings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Borrowings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Borrowings.
     */
    distinct?: BorrowingsScalarFieldEnum | BorrowingsScalarFieldEnum[]
  }

  /**
   * Borrowings findMany
   */
  export type BorrowingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Borrowings
     */
    select?: BorrowingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Borrowings
     */
    omit?: BorrowingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BorrowingsInclude<ExtArgs> | null
    /**
     * Filter, which Borrowings to fetch.
     */
    where?: BorrowingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Borrowings to fetch.
     */
    orderBy?: BorrowingsOrderByWithRelationInput | BorrowingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Borrowings.
     */
    cursor?: BorrowingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Borrowings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Borrowings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Borrowings.
     */
    distinct?: BorrowingsScalarFieldEnum | BorrowingsScalarFieldEnum[]
  }

  /**
   * Borrowings create
   */
  export type BorrowingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Borrowings
     */
    select?: BorrowingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Borrowings
     */
    omit?: BorrowingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BorrowingsInclude<ExtArgs> | null
    /**
     * The data needed to create a Borrowings.
     */
    data: XOR<BorrowingsCreateInput, BorrowingsUncheckedCreateInput>
  }

  /**
   * Borrowings createMany
   */
  export type BorrowingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Borrowings.
     */
    data: BorrowingsCreateManyInput | BorrowingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Borrowings update
   */
  export type BorrowingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Borrowings
     */
    select?: BorrowingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Borrowings
     */
    omit?: BorrowingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BorrowingsInclude<ExtArgs> | null
    /**
     * The data needed to update a Borrowings.
     */
    data: XOR<BorrowingsUpdateInput, BorrowingsUncheckedUpdateInput>
    /**
     * Choose, which Borrowings to update.
     */
    where: BorrowingsWhereUniqueInput
  }

  /**
   * Borrowings updateMany
   */
  export type BorrowingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Borrowings.
     */
    data: XOR<BorrowingsUpdateManyMutationInput, BorrowingsUncheckedUpdateManyInput>
    /**
     * Filter which Borrowings to update
     */
    where?: BorrowingsWhereInput
    /**
     * Limit how many Borrowings to update.
     */
    limit?: number
  }

  /**
   * Borrowings upsert
   */
  export type BorrowingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Borrowings
     */
    select?: BorrowingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Borrowings
     */
    omit?: BorrowingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BorrowingsInclude<ExtArgs> | null
    /**
     * The filter to search for the Borrowings to update in case it exists.
     */
    where: BorrowingsWhereUniqueInput
    /**
     * In case the Borrowings found by the `where` argument doesn't exist, create a new Borrowings with this data.
     */
    create: XOR<BorrowingsCreateInput, BorrowingsUncheckedCreateInput>
    /**
     * In case the Borrowings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BorrowingsUpdateInput, BorrowingsUncheckedUpdateInput>
  }

  /**
   * Borrowings delete
   */
  export type BorrowingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Borrowings
     */
    select?: BorrowingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Borrowings
     */
    omit?: BorrowingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BorrowingsInclude<ExtArgs> | null
    /**
     * Filter which Borrowings to delete.
     */
    where: BorrowingsWhereUniqueInput
  }

  /**
   * Borrowings deleteMany
   */
  export type BorrowingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Borrowings to delete
     */
    where?: BorrowingsWhereInput
    /**
     * Limit how many Borrowings to delete.
     */
    limit?: number
  }

  /**
   * Borrowings.fine
   */
  export type Borrowings$fineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fines
     */
    select?: FinesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fines
     */
    omit?: FinesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinesInclude<ExtArgs> | null
    where?: FinesWhereInput
  }

  /**
   * Borrowings without action
   */
  export type BorrowingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Borrowings
     */
    select?: BorrowingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Borrowings
     */
    omit?: BorrowingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BorrowingsInclude<ExtArgs> | null
  }


  /**
   * Model Fines
   */

  export type AggregateFines = {
    _count: FinesCountAggregateOutputType | null
    _avg: FinesAvgAggregateOutputType | null
    _sum: FinesSumAggregateOutputType | null
    _min: FinesMinAggregateOutputType | null
    _max: FinesMaxAggregateOutputType | null
  }

  export type FinesAvgAggregateOutputType = {
    id: number | null
    borrowing_id: number | null
    total_fines: Decimal | null
  }

  export type FinesSumAggregateOutputType = {
    id: number | null
    borrowing_id: number | null
    total_fines: Decimal | null
  }

  export type FinesMinAggregateOutputType = {
    id: number | null
    borrowing_id: number | null
    total_fines: Decimal | null
    payment_status: $Enums.PaymentStatus | null
    payment_date: Date | null
  }

  export type FinesMaxAggregateOutputType = {
    id: number | null
    borrowing_id: number | null
    total_fines: Decimal | null
    payment_status: $Enums.PaymentStatus | null
    payment_date: Date | null
  }

  export type FinesCountAggregateOutputType = {
    id: number
    borrowing_id: number
    total_fines: number
    payment_status: number
    payment_date: number
    _all: number
  }


  export type FinesAvgAggregateInputType = {
    id?: true
    borrowing_id?: true
    total_fines?: true
  }

  export type FinesSumAggregateInputType = {
    id?: true
    borrowing_id?: true
    total_fines?: true
  }

  export type FinesMinAggregateInputType = {
    id?: true
    borrowing_id?: true
    total_fines?: true
    payment_status?: true
    payment_date?: true
  }

  export type FinesMaxAggregateInputType = {
    id?: true
    borrowing_id?: true
    total_fines?: true
    payment_status?: true
    payment_date?: true
  }

  export type FinesCountAggregateInputType = {
    id?: true
    borrowing_id?: true
    total_fines?: true
    payment_status?: true
    payment_date?: true
    _all?: true
  }

  export type FinesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fines to aggregate.
     */
    where?: FinesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fines to fetch.
     */
    orderBy?: FinesOrderByWithRelationInput | FinesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FinesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fines
    **/
    _count?: true | FinesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FinesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FinesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FinesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FinesMaxAggregateInputType
  }

  export type GetFinesAggregateType<T extends FinesAggregateArgs> = {
        [P in keyof T & keyof AggregateFines]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFines[P]>
      : GetScalarType<T[P], AggregateFines[P]>
  }




  export type FinesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinesWhereInput
    orderBy?: FinesOrderByWithAggregationInput | FinesOrderByWithAggregationInput[]
    by: FinesScalarFieldEnum[] | FinesScalarFieldEnum
    having?: FinesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FinesCountAggregateInputType | true
    _avg?: FinesAvgAggregateInputType
    _sum?: FinesSumAggregateInputType
    _min?: FinesMinAggregateInputType
    _max?: FinesMaxAggregateInputType
  }

  export type FinesGroupByOutputType = {
    id: number
    borrowing_id: number
    total_fines: Decimal
    payment_status: $Enums.PaymentStatus
    payment_date: Date | null
    _count: FinesCountAggregateOutputType | null
    _avg: FinesAvgAggregateOutputType | null
    _sum: FinesSumAggregateOutputType | null
    _min: FinesMinAggregateOutputType | null
    _max: FinesMaxAggregateOutputType | null
  }

  type GetFinesGroupByPayload<T extends FinesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FinesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FinesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FinesGroupByOutputType[P]>
            : GetScalarType<T[P], FinesGroupByOutputType[P]>
        }
      >
    >


  export type FinesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    borrowing_id?: boolean
    total_fines?: boolean
    payment_status?: boolean
    payment_date?: boolean
    borrowing?: boolean | BorrowingsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fines"]>



  export type FinesSelectScalar = {
    id?: boolean
    borrowing_id?: boolean
    total_fines?: boolean
    payment_status?: boolean
    payment_date?: boolean
  }

  export type FinesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "borrowing_id" | "total_fines" | "payment_status" | "payment_date", ExtArgs["result"]["fines"]>
  export type FinesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    borrowing?: boolean | BorrowingsDefaultArgs<ExtArgs>
  }

  export type $FinesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Fines"
    objects: {
      borrowing: Prisma.$BorrowingsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      borrowing_id: number
      total_fines: Prisma.Decimal
      payment_status: $Enums.PaymentStatus
      payment_date: Date | null
    }, ExtArgs["result"]["fines"]>
    composites: {}
  }

  type FinesGetPayload<S extends boolean | null | undefined | FinesDefaultArgs> = $Result.GetResult<Prisma.$FinesPayload, S>

  type FinesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FinesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FinesCountAggregateInputType | true
    }

  export interface FinesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Fines'], meta: { name: 'Fines' } }
    /**
     * Find zero or one Fines that matches the filter.
     * @param {FinesFindUniqueArgs} args - Arguments to find a Fines
     * @example
     * // Get one Fines
     * const fines = await prisma.fines.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FinesFindUniqueArgs>(args: SelectSubset<T, FinesFindUniqueArgs<ExtArgs>>): Prisma__FinesClient<$Result.GetResult<Prisma.$FinesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Fines that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FinesFindUniqueOrThrowArgs} args - Arguments to find a Fines
     * @example
     * // Get one Fines
     * const fines = await prisma.fines.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FinesFindUniqueOrThrowArgs>(args: SelectSubset<T, FinesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FinesClient<$Result.GetResult<Prisma.$FinesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinesFindFirstArgs} args - Arguments to find a Fines
     * @example
     * // Get one Fines
     * const fines = await prisma.fines.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FinesFindFirstArgs>(args?: SelectSubset<T, FinesFindFirstArgs<ExtArgs>>): Prisma__FinesClient<$Result.GetResult<Prisma.$FinesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fines that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinesFindFirstOrThrowArgs} args - Arguments to find a Fines
     * @example
     * // Get one Fines
     * const fines = await prisma.fines.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FinesFindFirstOrThrowArgs>(args?: SelectSubset<T, FinesFindFirstOrThrowArgs<ExtArgs>>): Prisma__FinesClient<$Result.GetResult<Prisma.$FinesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fines
     * const fines = await prisma.fines.findMany()
     * 
     * // Get first 10 Fines
     * const fines = await prisma.fines.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const finesWithIdOnly = await prisma.fines.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FinesFindManyArgs>(args?: SelectSubset<T, FinesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Fines.
     * @param {FinesCreateArgs} args - Arguments to create a Fines.
     * @example
     * // Create one Fines
     * const Fines = await prisma.fines.create({
     *   data: {
     *     // ... data to create a Fines
     *   }
     * })
     * 
     */
    create<T extends FinesCreateArgs>(args: SelectSubset<T, FinesCreateArgs<ExtArgs>>): Prisma__FinesClient<$Result.GetResult<Prisma.$FinesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fines.
     * @param {FinesCreateManyArgs} args - Arguments to create many Fines.
     * @example
     * // Create many Fines
     * const fines = await prisma.fines.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FinesCreateManyArgs>(args?: SelectSubset<T, FinesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Fines.
     * @param {FinesDeleteArgs} args - Arguments to delete one Fines.
     * @example
     * // Delete one Fines
     * const Fines = await prisma.fines.delete({
     *   where: {
     *     // ... filter to delete one Fines
     *   }
     * })
     * 
     */
    delete<T extends FinesDeleteArgs>(args: SelectSubset<T, FinesDeleteArgs<ExtArgs>>): Prisma__FinesClient<$Result.GetResult<Prisma.$FinesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Fines.
     * @param {FinesUpdateArgs} args - Arguments to update one Fines.
     * @example
     * // Update one Fines
     * const fines = await prisma.fines.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FinesUpdateArgs>(args: SelectSubset<T, FinesUpdateArgs<ExtArgs>>): Prisma__FinesClient<$Result.GetResult<Prisma.$FinesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fines.
     * @param {FinesDeleteManyArgs} args - Arguments to filter Fines to delete.
     * @example
     * // Delete a few Fines
     * const { count } = await prisma.fines.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FinesDeleteManyArgs>(args?: SelectSubset<T, FinesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fines
     * const fines = await prisma.fines.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FinesUpdateManyArgs>(args: SelectSubset<T, FinesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Fines.
     * @param {FinesUpsertArgs} args - Arguments to update or create a Fines.
     * @example
     * // Update or create a Fines
     * const fines = await prisma.fines.upsert({
     *   create: {
     *     // ... data to create a Fines
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fines we want to update
     *   }
     * })
     */
    upsert<T extends FinesUpsertArgs>(args: SelectSubset<T, FinesUpsertArgs<ExtArgs>>): Prisma__FinesClient<$Result.GetResult<Prisma.$FinesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinesCountArgs} args - Arguments to filter Fines to count.
     * @example
     * // Count the number of Fines
     * const count = await prisma.fines.count({
     *   where: {
     *     // ... the filter for the Fines we want to count
     *   }
     * })
    **/
    count<T extends FinesCountArgs>(
      args?: Subset<T, FinesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FinesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FinesAggregateArgs>(args: Subset<T, FinesAggregateArgs>): Prisma.PrismaPromise<GetFinesAggregateType<T>>

    /**
     * Group by Fines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FinesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FinesGroupByArgs['orderBy'] }
        : { orderBy?: FinesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FinesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Fines model
   */
  readonly fields: FinesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fines.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FinesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    borrowing<T extends BorrowingsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BorrowingsDefaultArgs<ExtArgs>>): Prisma__BorrowingsClient<$Result.GetResult<Prisma.$BorrowingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Fines model
   */
  interface FinesFieldRefs {
    readonly id: FieldRef<"Fines", 'Int'>
    readonly borrowing_id: FieldRef<"Fines", 'Int'>
    readonly total_fines: FieldRef<"Fines", 'Decimal'>
    readonly payment_status: FieldRef<"Fines", 'PaymentStatus'>
    readonly payment_date: FieldRef<"Fines", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Fines findUnique
   */
  export type FinesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fines
     */
    select?: FinesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fines
     */
    omit?: FinesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinesInclude<ExtArgs> | null
    /**
     * Filter, which Fines to fetch.
     */
    where: FinesWhereUniqueInput
  }

  /**
   * Fines findUniqueOrThrow
   */
  export type FinesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fines
     */
    select?: FinesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fines
     */
    omit?: FinesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinesInclude<ExtArgs> | null
    /**
     * Filter, which Fines to fetch.
     */
    where: FinesWhereUniqueInput
  }

  /**
   * Fines findFirst
   */
  export type FinesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fines
     */
    select?: FinesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fines
     */
    omit?: FinesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinesInclude<ExtArgs> | null
    /**
     * Filter, which Fines to fetch.
     */
    where?: FinesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fines to fetch.
     */
    orderBy?: FinesOrderByWithRelationInput | FinesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fines.
     */
    cursor?: FinesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fines.
     */
    distinct?: FinesScalarFieldEnum | FinesScalarFieldEnum[]
  }

  /**
   * Fines findFirstOrThrow
   */
  export type FinesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fines
     */
    select?: FinesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fines
     */
    omit?: FinesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinesInclude<ExtArgs> | null
    /**
     * Filter, which Fines to fetch.
     */
    where?: FinesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fines to fetch.
     */
    orderBy?: FinesOrderByWithRelationInput | FinesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fines.
     */
    cursor?: FinesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fines.
     */
    distinct?: FinesScalarFieldEnum | FinesScalarFieldEnum[]
  }

  /**
   * Fines findMany
   */
  export type FinesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fines
     */
    select?: FinesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fines
     */
    omit?: FinesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinesInclude<ExtArgs> | null
    /**
     * Filter, which Fines to fetch.
     */
    where?: FinesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fines to fetch.
     */
    orderBy?: FinesOrderByWithRelationInput | FinesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fines.
     */
    cursor?: FinesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fines.
     */
    distinct?: FinesScalarFieldEnum | FinesScalarFieldEnum[]
  }

  /**
   * Fines create
   */
  export type FinesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fines
     */
    select?: FinesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fines
     */
    omit?: FinesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinesInclude<ExtArgs> | null
    /**
     * The data needed to create a Fines.
     */
    data: XOR<FinesCreateInput, FinesUncheckedCreateInput>
  }

  /**
   * Fines createMany
   */
  export type FinesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fines.
     */
    data: FinesCreateManyInput | FinesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Fines update
   */
  export type FinesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fines
     */
    select?: FinesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fines
     */
    omit?: FinesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinesInclude<ExtArgs> | null
    /**
     * The data needed to update a Fines.
     */
    data: XOR<FinesUpdateInput, FinesUncheckedUpdateInput>
    /**
     * Choose, which Fines to update.
     */
    where: FinesWhereUniqueInput
  }

  /**
   * Fines updateMany
   */
  export type FinesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fines.
     */
    data: XOR<FinesUpdateManyMutationInput, FinesUncheckedUpdateManyInput>
    /**
     * Filter which Fines to update
     */
    where?: FinesWhereInput
    /**
     * Limit how many Fines to update.
     */
    limit?: number
  }

  /**
   * Fines upsert
   */
  export type FinesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fines
     */
    select?: FinesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fines
     */
    omit?: FinesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinesInclude<ExtArgs> | null
    /**
     * The filter to search for the Fines to update in case it exists.
     */
    where: FinesWhereUniqueInput
    /**
     * In case the Fines found by the `where` argument doesn't exist, create a new Fines with this data.
     */
    create: XOR<FinesCreateInput, FinesUncheckedCreateInput>
    /**
     * In case the Fines was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FinesUpdateInput, FinesUncheckedUpdateInput>
  }

  /**
   * Fines delete
   */
  export type FinesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fines
     */
    select?: FinesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fines
     */
    omit?: FinesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinesInclude<ExtArgs> | null
    /**
     * Filter which Fines to delete.
     */
    where: FinesWhereUniqueInput
  }

  /**
   * Fines deleteMany
   */
  export type FinesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fines to delete
     */
    where?: FinesWhereInput
    /**
     * Limit how many Fines to delete.
     */
    limit?: number
  }

  /**
   * Fines without action
   */
  export type FinesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fines
     */
    select?: FinesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fines
     */
    omit?: FinesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinesInclude<ExtArgs> | null
  }


  /**
   * Model TokenSessions
   */

  export type AggregateTokenSessions = {
    _count: TokenSessionsCountAggregateOutputType | null
    _avg: TokenSessionsAvgAggregateOutputType | null
    _sum: TokenSessionsSumAggregateOutputType | null
    _min: TokenSessionsMinAggregateOutputType | null
    _max: TokenSessionsMaxAggregateOutputType | null
  }

  export type TokenSessionsAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type TokenSessionsSumAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type TokenSessionsMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    token: string | null
    expires_at: Date | null
    created_at: Date | null
  }

  export type TokenSessionsMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    token: string | null
    expires_at: Date | null
    created_at: Date | null
  }

  export type TokenSessionsCountAggregateOutputType = {
    id: number
    user_id: number
    token: number
    expires_at: number
    created_at: number
    _all: number
  }


  export type TokenSessionsAvgAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type TokenSessionsSumAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type TokenSessionsMinAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    expires_at?: true
    created_at?: true
  }

  export type TokenSessionsMaxAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    expires_at?: true
    created_at?: true
  }

  export type TokenSessionsCountAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    expires_at?: true
    created_at?: true
    _all?: true
  }

  export type TokenSessionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenSessions to aggregate.
     */
    where?: TokenSessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenSessions to fetch.
     */
    orderBy?: TokenSessionsOrderByWithRelationInput | TokenSessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenSessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TokenSessions
    **/
    _count?: true | TokenSessionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenSessionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenSessionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenSessionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenSessionsMaxAggregateInputType
  }

  export type GetTokenSessionsAggregateType<T extends TokenSessionsAggregateArgs> = {
        [P in keyof T & keyof AggregateTokenSessions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTokenSessions[P]>
      : GetScalarType<T[P], AggregateTokenSessions[P]>
  }




  export type TokenSessionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenSessionsWhereInput
    orderBy?: TokenSessionsOrderByWithAggregationInput | TokenSessionsOrderByWithAggregationInput[]
    by: TokenSessionsScalarFieldEnum[] | TokenSessionsScalarFieldEnum
    having?: TokenSessionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenSessionsCountAggregateInputType | true
    _avg?: TokenSessionsAvgAggregateInputType
    _sum?: TokenSessionsSumAggregateInputType
    _min?: TokenSessionsMinAggregateInputType
    _max?: TokenSessionsMaxAggregateInputType
  }

  export type TokenSessionsGroupByOutputType = {
    id: number
    user_id: number
    token: string
    expires_at: Date
    created_at: Date
    _count: TokenSessionsCountAggregateOutputType | null
    _avg: TokenSessionsAvgAggregateOutputType | null
    _sum: TokenSessionsSumAggregateOutputType | null
    _min: TokenSessionsMinAggregateOutputType | null
    _max: TokenSessionsMaxAggregateOutputType | null
  }

  type GetTokenSessionsGroupByPayload<T extends TokenSessionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenSessionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenSessionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenSessionsGroupByOutputType[P]>
            : GetScalarType<T[P], TokenSessionsGroupByOutputType[P]>
        }
      >
    >


  export type TokenSessionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token?: boolean
    expires_at?: boolean
    created_at?: boolean
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tokenSessions"]>



  export type TokenSessionsSelectScalar = {
    id?: boolean
    user_id?: boolean
    token?: boolean
    expires_at?: boolean
    created_at?: boolean
  }

  export type TokenSessionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "token" | "expires_at" | "created_at", ExtArgs["result"]["tokenSessions"]>
  export type TokenSessionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsersDefaultArgs<ExtArgs>
  }

  export type $TokenSessionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TokenSessions"
    objects: {
      user: Prisma.$UsersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      token: string
      expires_at: Date
      created_at: Date
    }, ExtArgs["result"]["tokenSessions"]>
    composites: {}
  }

  type TokenSessionsGetPayload<S extends boolean | null | undefined | TokenSessionsDefaultArgs> = $Result.GetResult<Prisma.$TokenSessionsPayload, S>

  type TokenSessionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenSessionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenSessionsCountAggregateInputType | true
    }

  export interface TokenSessionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TokenSessions'], meta: { name: 'TokenSessions' } }
    /**
     * Find zero or one TokenSessions that matches the filter.
     * @param {TokenSessionsFindUniqueArgs} args - Arguments to find a TokenSessions
     * @example
     * // Get one TokenSessions
     * const tokenSessions = await prisma.tokenSessions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenSessionsFindUniqueArgs>(args: SelectSubset<T, TokenSessionsFindUniqueArgs<ExtArgs>>): Prisma__TokenSessionsClient<$Result.GetResult<Prisma.$TokenSessionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TokenSessions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenSessionsFindUniqueOrThrowArgs} args - Arguments to find a TokenSessions
     * @example
     * // Get one TokenSessions
     * const tokenSessions = await prisma.tokenSessions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenSessionsFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenSessionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenSessionsClient<$Result.GetResult<Prisma.$TokenSessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TokenSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenSessionsFindFirstArgs} args - Arguments to find a TokenSessions
     * @example
     * // Get one TokenSessions
     * const tokenSessions = await prisma.tokenSessions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenSessionsFindFirstArgs>(args?: SelectSubset<T, TokenSessionsFindFirstArgs<ExtArgs>>): Prisma__TokenSessionsClient<$Result.GetResult<Prisma.$TokenSessionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TokenSessions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenSessionsFindFirstOrThrowArgs} args - Arguments to find a TokenSessions
     * @example
     * // Get one TokenSessions
     * const tokenSessions = await prisma.tokenSessions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenSessionsFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenSessionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenSessionsClient<$Result.GetResult<Prisma.$TokenSessionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TokenSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenSessionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TokenSessions
     * const tokenSessions = await prisma.tokenSessions.findMany()
     * 
     * // Get first 10 TokenSessions
     * const tokenSessions = await prisma.tokenSessions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenSessionsWithIdOnly = await prisma.tokenSessions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenSessionsFindManyArgs>(args?: SelectSubset<T, TokenSessionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenSessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TokenSessions.
     * @param {TokenSessionsCreateArgs} args - Arguments to create a TokenSessions.
     * @example
     * // Create one TokenSessions
     * const TokenSessions = await prisma.tokenSessions.create({
     *   data: {
     *     // ... data to create a TokenSessions
     *   }
     * })
     * 
     */
    create<T extends TokenSessionsCreateArgs>(args: SelectSubset<T, TokenSessionsCreateArgs<ExtArgs>>): Prisma__TokenSessionsClient<$Result.GetResult<Prisma.$TokenSessionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TokenSessions.
     * @param {TokenSessionsCreateManyArgs} args - Arguments to create many TokenSessions.
     * @example
     * // Create many TokenSessions
     * const tokenSessions = await prisma.tokenSessions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenSessionsCreateManyArgs>(args?: SelectSubset<T, TokenSessionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TokenSessions.
     * @param {TokenSessionsDeleteArgs} args - Arguments to delete one TokenSessions.
     * @example
     * // Delete one TokenSessions
     * const TokenSessions = await prisma.tokenSessions.delete({
     *   where: {
     *     // ... filter to delete one TokenSessions
     *   }
     * })
     * 
     */
    delete<T extends TokenSessionsDeleteArgs>(args: SelectSubset<T, TokenSessionsDeleteArgs<ExtArgs>>): Prisma__TokenSessionsClient<$Result.GetResult<Prisma.$TokenSessionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TokenSessions.
     * @param {TokenSessionsUpdateArgs} args - Arguments to update one TokenSessions.
     * @example
     * // Update one TokenSessions
     * const tokenSessions = await prisma.tokenSessions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenSessionsUpdateArgs>(args: SelectSubset<T, TokenSessionsUpdateArgs<ExtArgs>>): Prisma__TokenSessionsClient<$Result.GetResult<Prisma.$TokenSessionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TokenSessions.
     * @param {TokenSessionsDeleteManyArgs} args - Arguments to filter TokenSessions to delete.
     * @example
     * // Delete a few TokenSessions
     * const { count } = await prisma.tokenSessions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenSessionsDeleteManyArgs>(args?: SelectSubset<T, TokenSessionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TokenSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenSessionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TokenSessions
     * const tokenSessions = await prisma.tokenSessions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenSessionsUpdateManyArgs>(args: SelectSubset<T, TokenSessionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TokenSessions.
     * @param {TokenSessionsUpsertArgs} args - Arguments to update or create a TokenSessions.
     * @example
     * // Update or create a TokenSessions
     * const tokenSessions = await prisma.tokenSessions.upsert({
     *   create: {
     *     // ... data to create a TokenSessions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TokenSessions we want to update
     *   }
     * })
     */
    upsert<T extends TokenSessionsUpsertArgs>(args: SelectSubset<T, TokenSessionsUpsertArgs<ExtArgs>>): Prisma__TokenSessionsClient<$Result.GetResult<Prisma.$TokenSessionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TokenSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenSessionsCountArgs} args - Arguments to filter TokenSessions to count.
     * @example
     * // Count the number of TokenSessions
     * const count = await prisma.tokenSessions.count({
     *   where: {
     *     // ... the filter for the TokenSessions we want to count
     *   }
     * })
    **/
    count<T extends TokenSessionsCountArgs>(
      args?: Subset<T, TokenSessionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenSessionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TokenSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenSessionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenSessionsAggregateArgs>(args: Subset<T, TokenSessionsAggregateArgs>): Prisma.PrismaPromise<GetTokenSessionsAggregateType<T>>

    /**
     * Group by TokenSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenSessionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenSessionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenSessionsGroupByArgs['orderBy'] }
        : { orderBy?: TokenSessionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenSessionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenSessionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TokenSessions model
   */
  readonly fields: TokenSessionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TokenSessions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenSessionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UsersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsersDefaultArgs<ExtArgs>>): Prisma__UsersClient<$Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TokenSessions model
   */
  interface TokenSessionsFieldRefs {
    readonly id: FieldRef<"TokenSessions", 'Int'>
    readonly user_id: FieldRef<"TokenSessions", 'Int'>
    readonly token: FieldRef<"TokenSessions", 'String'>
    readonly expires_at: FieldRef<"TokenSessions", 'DateTime'>
    readonly created_at: FieldRef<"TokenSessions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TokenSessions findUnique
   */
  export type TokenSessionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenSessions
     */
    select?: TokenSessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenSessions
     */
    omit?: TokenSessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenSessionsInclude<ExtArgs> | null
    /**
     * Filter, which TokenSessions to fetch.
     */
    where: TokenSessionsWhereUniqueInput
  }

  /**
   * TokenSessions findUniqueOrThrow
   */
  export type TokenSessionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenSessions
     */
    select?: TokenSessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenSessions
     */
    omit?: TokenSessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenSessionsInclude<ExtArgs> | null
    /**
     * Filter, which TokenSessions to fetch.
     */
    where: TokenSessionsWhereUniqueInput
  }

  /**
   * TokenSessions findFirst
   */
  export type TokenSessionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenSessions
     */
    select?: TokenSessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenSessions
     */
    omit?: TokenSessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenSessionsInclude<ExtArgs> | null
    /**
     * Filter, which TokenSessions to fetch.
     */
    where?: TokenSessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenSessions to fetch.
     */
    orderBy?: TokenSessionsOrderByWithRelationInput | TokenSessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenSessions.
     */
    cursor?: TokenSessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenSessions.
     */
    distinct?: TokenSessionsScalarFieldEnum | TokenSessionsScalarFieldEnum[]
  }

  /**
   * TokenSessions findFirstOrThrow
   */
  export type TokenSessionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenSessions
     */
    select?: TokenSessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenSessions
     */
    omit?: TokenSessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenSessionsInclude<ExtArgs> | null
    /**
     * Filter, which TokenSessions to fetch.
     */
    where?: TokenSessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenSessions to fetch.
     */
    orderBy?: TokenSessionsOrderByWithRelationInput | TokenSessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TokenSessions.
     */
    cursor?: TokenSessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenSessions.
     */
    distinct?: TokenSessionsScalarFieldEnum | TokenSessionsScalarFieldEnum[]
  }

  /**
   * TokenSessions findMany
   */
  export type TokenSessionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenSessions
     */
    select?: TokenSessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenSessions
     */
    omit?: TokenSessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenSessionsInclude<ExtArgs> | null
    /**
     * Filter, which TokenSessions to fetch.
     */
    where?: TokenSessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TokenSessions to fetch.
     */
    orderBy?: TokenSessionsOrderByWithRelationInput | TokenSessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TokenSessions.
     */
    cursor?: TokenSessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TokenSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TokenSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TokenSessions.
     */
    distinct?: TokenSessionsScalarFieldEnum | TokenSessionsScalarFieldEnum[]
  }

  /**
   * TokenSessions create
   */
  export type TokenSessionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenSessions
     */
    select?: TokenSessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenSessions
     */
    omit?: TokenSessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenSessionsInclude<ExtArgs> | null
    /**
     * The data needed to create a TokenSessions.
     */
    data: XOR<TokenSessionsCreateInput, TokenSessionsUncheckedCreateInput>
  }

  /**
   * TokenSessions createMany
   */
  export type TokenSessionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TokenSessions.
     */
    data: TokenSessionsCreateManyInput | TokenSessionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TokenSessions update
   */
  export type TokenSessionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenSessions
     */
    select?: TokenSessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenSessions
     */
    omit?: TokenSessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenSessionsInclude<ExtArgs> | null
    /**
     * The data needed to update a TokenSessions.
     */
    data: XOR<TokenSessionsUpdateInput, TokenSessionsUncheckedUpdateInput>
    /**
     * Choose, which TokenSessions to update.
     */
    where: TokenSessionsWhereUniqueInput
  }

  /**
   * TokenSessions updateMany
   */
  export type TokenSessionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TokenSessions.
     */
    data: XOR<TokenSessionsUpdateManyMutationInput, TokenSessionsUncheckedUpdateManyInput>
    /**
     * Filter which TokenSessions to update
     */
    where?: TokenSessionsWhereInput
    /**
     * Limit how many TokenSessions to update.
     */
    limit?: number
  }

  /**
   * TokenSessions upsert
   */
  export type TokenSessionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenSessions
     */
    select?: TokenSessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenSessions
     */
    omit?: TokenSessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenSessionsInclude<ExtArgs> | null
    /**
     * The filter to search for the TokenSessions to update in case it exists.
     */
    where: TokenSessionsWhereUniqueInput
    /**
     * In case the TokenSessions found by the `where` argument doesn't exist, create a new TokenSessions with this data.
     */
    create: XOR<TokenSessionsCreateInput, TokenSessionsUncheckedCreateInput>
    /**
     * In case the TokenSessions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenSessionsUpdateInput, TokenSessionsUncheckedUpdateInput>
  }

  /**
   * TokenSessions delete
   */
  export type TokenSessionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenSessions
     */
    select?: TokenSessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenSessions
     */
    omit?: TokenSessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenSessionsInclude<ExtArgs> | null
    /**
     * Filter which TokenSessions to delete.
     */
    where: TokenSessionsWhereUniqueInput
  }

  /**
   * TokenSessions deleteMany
   */
  export type TokenSessionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TokenSessions to delete
     */
    where?: TokenSessionsWhereInput
    /**
     * Limit how many TokenSessions to delete.
     */
    limit?: number
  }

  /**
   * TokenSessions without action
   */
  export type TokenSessionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TokenSessions
     */
    select?: TokenSessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TokenSessions
     */
    omit?: TokenSessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenSessionsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CategoriesScalarFieldEnum: {
    id: 'id',
    category_name: 'category_name',
    is_active: 'is_active',
    created_at: 'created_at',
    deleted_at: 'deleted_at'
  };

  export type CategoriesScalarFieldEnum = (typeof CategoriesScalarFieldEnum)[keyof typeof CategoriesScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    nik: 'nik',
    email: 'email',
    password: 'password',
    full_name: 'full_name',
    address: 'address',
    phone: 'phone',
    ktp: 'ktp',
    role: 'role',
    account_status: 'account_status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const BooksScalarFieldEnum: {
    id: 'id',
    category_id: 'category_id',
    title: 'title',
    author: 'author',
    publisher: 'publisher',
    description: 'description',
    book_cover: 'book_cover',
    year: 'year',
    total_stock: 'total_stock',
    available: 'available',
    created_at: 'created_at',
    deleted_at: 'deleted_at'
  };

  export type BooksScalarFieldEnum = (typeof BooksScalarFieldEnum)[keyof typeof BooksScalarFieldEnum]


  export const BorrowingsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    book_id: 'book_id',
    borrow_date: 'borrow_date',
    due_date: 'due_date',
    return_date: 'return_date',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type BorrowingsScalarFieldEnum = (typeof BorrowingsScalarFieldEnum)[keyof typeof BorrowingsScalarFieldEnum]


  export const FinesScalarFieldEnum: {
    id: 'id',
    borrowing_id: 'borrowing_id',
    total_fines: 'total_fines',
    payment_status: 'payment_status',
    payment_date: 'payment_date'
  };

  export type FinesScalarFieldEnum = (typeof FinesScalarFieldEnum)[keyof typeof FinesScalarFieldEnum]


  export const TokenSessionsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    token: 'token',
    expires_at: 'expires_at',
    created_at: 'created_at'
  };

  export type TokenSessionsScalarFieldEnum = (typeof TokenSessionsScalarFieldEnum)[keyof typeof TokenSessionsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const CategoriesOrderByRelevanceFieldEnum: {
    category_name: 'category_name'
  };

  export type CategoriesOrderByRelevanceFieldEnum = (typeof CategoriesOrderByRelevanceFieldEnum)[keyof typeof CategoriesOrderByRelevanceFieldEnum]


  export const UsersOrderByRelevanceFieldEnum: {
    nik: 'nik',
    email: 'email',
    password: 'password',
    full_name: 'full_name',
    address: 'address',
    phone: 'phone',
    ktp: 'ktp'
  };

  export type UsersOrderByRelevanceFieldEnum = (typeof UsersOrderByRelevanceFieldEnum)[keyof typeof UsersOrderByRelevanceFieldEnum]


  export const BooksOrderByRelevanceFieldEnum: {
    title: 'title',
    author: 'author',
    publisher: 'publisher',
    description: 'description',
    book_cover: 'book_cover'
  };

  export type BooksOrderByRelevanceFieldEnum = (typeof BooksOrderByRelevanceFieldEnum)[keyof typeof BooksOrderByRelevanceFieldEnum]


  export const TokenSessionsOrderByRelevanceFieldEnum: {
    token: 'token'
  };

  export type TokenSessionsOrderByRelevanceFieldEnum = (typeof TokenSessionsOrderByRelevanceFieldEnum)[keyof typeof TokenSessionsOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'AccountStatus'
   */
  export type EnumAccountStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountStatus'>
    


  /**
   * Reference to a field of type 'BorrowingStatus'
   */
  export type EnumBorrowingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BorrowingStatus'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type CategoriesWhereInput = {
    AND?: CategoriesWhereInput | CategoriesWhereInput[]
    OR?: CategoriesWhereInput[]
    NOT?: CategoriesWhereInput | CategoriesWhereInput[]
    id?: IntFilter<"Categories"> | number
    category_name?: StringFilter<"Categories"> | string
    is_active?: BoolFilter<"Categories"> | boolean
    created_at?: DateTimeFilter<"Categories"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Categories"> | Date | string | null
    books?: BooksListRelationFilter
  }

  export type CategoriesOrderByWithRelationInput = {
    id?: SortOrder
    category_name?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    books?: BooksOrderByRelationAggregateInput
    _relevance?: CategoriesOrderByRelevanceInput
  }

  export type CategoriesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CategoriesWhereInput | CategoriesWhereInput[]
    OR?: CategoriesWhereInput[]
    NOT?: CategoriesWhereInput | CategoriesWhereInput[]
    category_name?: StringFilter<"Categories"> | string
    is_active?: BoolFilter<"Categories"> | boolean
    created_at?: DateTimeFilter<"Categories"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Categories"> | Date | string | null
    books?: BooksListRelationFilter
  }, "id">

  export type CategoriesOrderByWithAggregationInput = {
    id?: SortOrder
    category_name?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: CategoriesCountOrderByAggregateInput
    _avg?: CategoriesAvgOrderByAggregateInput
    _max?: CategoriesMaxOrderByAggregateInput
    _min?: CategoriesMinOrderByAggregateInput
    _sum?: CategoriesSumOrderByAggregateInput
  }

  export type CategoriesScalarWhereWithAggregatesInput = {
    AND?: CategoriesScalarWhereWithAggregatesInput | CategoriesScalarWhereWithAggregatesInput[]
    OR?: CategoriesScalarWhereWithAggregatesInput[]
    NOT?: CategoriesScalarWhereWithAggregatesInput | CategoriesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Categories"> | number
    category_name?: StringWithAggregatesFilter<"Categories"> | string
    is_active?: BoolWithAggregatesFilter<"Categories"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Categories"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Categories"> | Date | string | null
  }

  export type UsersWhereInput = {
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    id?: IntFilter<"Users"> | number
    nik?: StringNullableFilter<"Users"> | string | null
    email?: StringFilter<"Users"> | string
    password?: StringFilter<"Users"> | string
    full_name?: StringFilter<"Users"> | string
    address?: StringFilter<"Users"> | string
    phone?: StringFilter<"Users"> | string
    ktp?: StringNullableFilter<"Users"> | string | null
    role?: EnumUserRoleFilter<"Users"> | $Enums.UserRole
    account_status?: EnumAccountStatusFilter<"Users"> | $Enums.AccountStatus
    created_at?: DateTimeFilter<"Users"> | Date | string
    updated_at?: DateTimeFilter<"Users"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Users"> | Date | string | null
    borrowings?: BorrowingsListRelationFilter
    sessions?: TokenSessionsListRelationFilter
  }

  export type UsersOrderByWithRelationInput = {
    id?: SortOrder
    nik?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    full_name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    ktp?: SortOrderInput | SortOrder
    role?: SortOrder
    account_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    borrowings?: BorrowingsOrderByRelationAggregateInput
    sessions?: TokenSessionsOrderByRelationAggregateInput
    _relevance?: UsersOrderByRelevanceInput
  }

  export type UsersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UsersWhereInput | UsersWhereInput[]
    OR?: UsersWhereInput[]
    NOT?: UsersWhereInput | UsersWhereInput[]
    nik?: StringNullableFilter<"Users"> | string | null
    password?: StringFilter<"Users"> | string
    full_name?: StringFilter<"Users"> | string
    address?: StringFilter<"Users"> | string
    phone?: StringFilter<"Users"> | string
    ktp?: StringNullableFilter<"Users"> | string | null
    role?: EnumUserRoleFilter<"Users"> | $Enums.UserRole
    account_status?: EnumAccountStatusFilter<"Users"> | $Enums.AccountStatus
    created_at?: DateTimeFilter<"Users"> | Date | string
    updated_at?: DateTimeFilter<"Users"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Users"> | Date | string | null
    borrowings?: BorrowingsListRelationFilter
    sessions?: TokenSessionsListRelationFilter
  }, "id" | "email">

  export type UsersOrderByWithAggregationInput = {
    id?: SortOrder
    nik?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    full_name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    ktp?: SortOrderInput | SortOrder
    role?: SortOrder
    account_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: UsersCountOrderByAggregateInput
    _avg?: UsersAvgOrderByAggregateInput
    _max?: UsersMaxOrderByAggregateInput
    _min?: UsersMinOrderByAggregateInput
    _sum?: UsersSumOrderByAggregateInput
  }

  export type UsersScalarWhereWithAggregatesInput = {
    AND?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    OR?: UsersScalarWhereWithAggregatesInput[]
    NOT?: UsersScalarWhereWithAggregatesInput | UsersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Users"> | number
    nik?: StringNullableWithAggregatesFilter<"Users"> | string | null
    email?: StringWithAggregatesFilter<"Users"> | string
    password?: StringWithAggregatesFilter<"Users"> | string
    full_name?: StringWithAggregatesFilter<"Users"> | string
    address?: StringWithAggregatesFilter<"Users"> | string
    phone?: StringWithAggregatesFilter<"Users"> | string
    ktp?: StringNullableWithAggregatesFilter<"Users"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"Users"> | $Enums.UserRole
    account_status?: EnumAccountStatusWithAggregatesFilter<"Users"> | $Enums.AccountStatus
    created_at?: DateTimeWithAggregatesFilter<"Users"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Users"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Users"> | Date | string | null
  }

  export type BooksWhereInput = {
    AND?: BooksWhereInput | BooksWhereInput[]
    OR?: BooksWhereInput[]
    NOT?: BooksWhereInput | BooksWhereInput[]
    id?: IntFilter<"Books"> | number
    category_id?: IntFilter<"Books"> | number
    title?: StringFilter<"Books"> | string
    author?: StringFilter<"Books"> | string
    publisher?: StringFilter<"Books"> | string
    description?: StringNullableFilter<"Books"> | string | null
    book_cover?: StringNullableFilter<"Books"> | string | null
    year?: IntFilter<"Books"> | number
    total_stock?: IntFilter<"Books"> | number
    available?: IntFilter<"Books"> | number
    created_at?: DateTimeFilter<"Books"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Books"> | Date | string | null
    category?: XOR<CategoriesScalarRelationFilter, CategoriesWhereInput>
    borrowings?: BorrowingsListRelationFilter
  }

  export type BooksOrderByWithRelationInput = {
    id?: SortOrder
    category_id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    publisher?: SortOrder
    description?: SortOrderInput | SortOrder
    book_cover?: SortOrderInput | SortOrder
    year?: SortOrder
    total_stock?: SortOrder
    available?: SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    category?: CategoriesOrderByWithRelationInput
    borrowings?: BorrowingsOrderByRelationAggregateInput
    _relevance?: BooksOrderByRelevanceInput
  }

  export type BooksWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BooksWhereInput | BooksWhereInput[]
    OR?: BooksWhereInput[]
    NOT?: BooksWhereInput | BooksWhereInput[]
    category_id?: IntFilter<"Books"> | number
    title?: StringFilter<"Books"> | string
    author?: StringFilter<"Books"> | string
    publisher?: StringFilter<"Books"> | string
    description?: StringNullableFilter<"Books"> | string | null
    book_cover?: StringNullableFilter<"Books"> | string | null
    year?: IntFilter<"Books"> | number
    total_stock?: IntFilter<"Books"> | number
    available?: IntFilter<"Books"> | number
    created_at?: DateTimeFilter<"Books"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Books"> | Date | string | null
    category?: XOR<CategoriesScalarRelationFilter, CategoriesWhereInput>
    borrowings?: BorrowingsListRelationFilter
  }, "id">

  export type BooksOrderByWithAggregationInput = {
    id?: SortOrder
    category_id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    publisher?: SortOrder
    description?: SortOrderInput | SortOrder
    book_cover?: SortOrderInput | SortOrder
    year?: SortOrder
    total_stock?: SortOrder
    available?: SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: BooksCountOrderByAggregateInput
    _avg?: BooksAvgOrderByAggregateInput
    _max?: BooksMaxOrderByAggregateInput
    _min?: BooksMinOrderByAggregateInput
    _sum?: BooksSumOrderByAggregateInput
  }

  export type BooksScalarWhereWithAggregatesInput = {
    AND?: BooksScalarWhereWithAggregatesInput | BooksScalarWhereWithAggregatesInput[]
    OR?: BooksScalarWhereWithAggregatesInput[]
    NOT?: BooksScalarWhereWithAggregatesInput | BooksScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Books"> | number
    category_id?: IntWithAggregatesFilter<"Books"> | number
    title?: StringWithAggregatesFilter<"Books"> | string
    author?: StringWithAggregatesFilter<"Books"> | string
    publisher?: StringWithAggregatesFilter<"Books"> | string
    description?: StringNullableWithAggregatesFilter<"Books"> | string | null
    book_cover?: StringNullableWithAggregatesFilter<"Books"> | string | null
    year?: IntWithAggregatesFilter<"Books"> | number
    total_stock?: IntWithAggregatesFilter<"Books"> | number
    available?: IntWithAggregatesFilter<"Books"> | number
    created_at?: DateTimeWithAggregatesFilter<"Books"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Books"> | Date | string | null
  }

  export type BorrowingsWhereInput = {
    AND?: BorrowingsWhereInput | BorrowingsWhereInput[]
    OR?: BorrowingsWhereInput[]
    NOT?: BorrowingsWhereInput | BorrowingsWhereInput[]
    id?: IntFilter<"Borrowings"> | number
    user_id?: IntFilter<"Borrowings"> | number
    book_id?: IntFilter<"Borrowings"> | number
    borrow_date?: DateTimeFilter<"Borrowings"> | Date | string
    due_date?: DateTimeFilter<"Borrowings"> | Date | string
    return_date?: DateTimeNullableFilter<"Borrowings"> | Date | string | null
    status?: EnumBorrowingStatusFilter<"Borrowings"> | $Enums.BorrowingStatus
    created_at?: DateTimeFilter<"Borrowings"> | Date | string
    updated_at?: DateTimeFilter<"Borrowings"> | Date | string
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    book?: XOR<BooksScalarRelationFilter, BooksWhereInput>
    fine?: XOR<FinesNullableScalarRelationFilter, FinesWhereInput> | null
  }

  export type BorrowingsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    borrow_date?: SortOrder
    due_date?: SortOrder
    return_date?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UsersOrderByWithRelationInput
    book?: BooksOrderByWithRelationInput
    fine?: FinesOrderByWithRelationInput
  }

  export type BorrowingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BorrowingsWhereInput | BorrowingsWhereInput[]
    OR?: BorrowingsWhereInput[]
    NOT?: BorrowingsWhereInput | BorrowingsWhereInput[]
    user_id?: IntFilter<"Borrowings"> | number
    book_id?: IntFilter<"Borrowings"> | number
    borrow_date?: DateTimeFilter<"Borrowings"> | Date | string
    due_date?: DateTimeFilter<"Borrowings"> | Date | string
    return_date?: DateTimeNullableFilter<"Borrowings"> | Date | string | null
    status?: EnumBorrowingStatusFilter<"Borrowings"> | $Enums.BorrowingStatus
    created_at?: DateTimeFilter<"Borrowings"> | Date | string
    updated_at?: DateTimeFilter<"Borrowings"> | Date | string
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
    book?: XOR<BooksScalarRelationFilter, BooksWhereInput>
    fine?: XOR<FinesNullableScalarRelationFilter, FinesWhereInput> | null
  }, "id">

  export type BorrowingsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    borrow_date?: SortOrder
    due_date?: SortOrder
    return_date?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: BorrowingsCountOrderByAggregateInput
    _avg?: BorrowingsAvgOrderByAggregateInput
    _max?: BorrowingsMaxOrderByAggregateInput
    _min?: BorrowingsMinOrderByAggregateInput
    _sum?: BorrowingsSumOrderByAggregateInput
  }

  export type BorrowingsScalarWhereWithAggregatesInput = {
    AND?: BorrowingsScalarWhereWithAggregatesInput | BorrowingsScalarWhereWithAggregatesInput[]
    OR?: BorrowingsScalarWhereWithAggregatesInput[]
    NOT?: BorrowingsScalarWhereWithAggregatesInput | BorrowingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Borrowings"> | number
    user_id?: IntWithAggregatesFilter<"Borrowings"> | number
    book_id?: IntWithAggregatesFilter<"Borrowings"> | number
    borrow_date?: DateTimeWithAggregatesFilter<"Borrowings"> | Date | string
    due_date?: DateTimeWithAggregatesFilter<"Borrowings"> | Date | string
    return_date?: DateTimeNullableWithAggregatesFilter<"Borrowings"> | Date | string | null
    status?: EnumBorrowingStatusWithAggregatesFilter<"Borrowings"> | $Enums.BorrowingStatus
    created_at?: DateTimeWithAggregatesFilter<"Borrowings"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Borrowings"> | Date | string
  }

  export type FinesWhereInput = {
    AND?: FinesWhereInput | FinesWhereInput[]
    OR?: FinesWhereInput[]
    NOT?: FinesWhereInput | FinesWhereInput[]
    id?: IntFilter<"Fines"> | number
    borrowing_id?: IntFilter<"Fines"> | number
    total_fines?: DecimalFilter<"Fines"> | Decimal | DecimalJsLike | number | string
    payment_status?: EnumPaymentStatusFilter<"Fines"> | $Enums.PaymentStatus
    payment_date?: DateTimeNullableFilter<"Fines"> | Date | string | null
    borrowing?: XOR<BorrowingsScalarRelationFilter, BorrowingsWhereInput>
  }

  export type FinesOrderByWithRelationInput = {
    id?: SortOrder
    borrowing_id?: SortOrder
    total_fines?: SortOrder
    payment_status?: SortOrder
    payment_date?: SortOrderInput | SortOrder
    borrowing?: BorrowingsOrderByWithRelationInput
  }

  export type FinesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    borrowing_id?: number
    AND?: FinesWhereInput | FinesWhereInput[]
    OR?: FinesWhereInput[]
    NOT?: FinesWhereInput | FinesWhereInput[]
    total_fines?: DecimalFilter<"Fines"> | Decimal | DecimalJsLike | number | string
    payment_status?: EnumPaymentStatusFilter<"Fines"> | $Enums.PaymentStatus
    payment_date?: DateTimeNullableFilter<"Fines"> | Date | string | null
    borrowing?: XOR<BorrowingsScalarRelationFilter, BorrowingsWhereInput>
  }, "id" | "borrowing_id">

  export type FinesOrderByWithAggregationInput = {
    id?: SortOrder
    borrowing_id?: SortOrder
    total_fines?: SortOrder
    payment_status?: SortOrder
    payment_date?: SortOrderInput | SortOrder
    _count?: FinesCountOrderByAggregateInput
    _avg?: FinesAvgOrderByAggregateInput
    _max?: FinesMaxOrderByAggregateInput
    _min?: FinesMinOrderByAggregateInput
    _sum?: FinesSumOrderByAggregateInput
  }

  export type FinesScalarWhereWithAggregatesInput = {
    AND?: FinesScalarWhereWithAggregatesInput | FinesScalarWhereWithAggregatesInput[]
    OR?: FinesScalarWhereWithAggregatesInput[]
    NOT?: FinesScalarWhereWithAggregatesInput | FinesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Fines"> | number
    borrowing_id?: IntWithAggregatesFilter<"Fines"> | number
    total_fines?: DecimalWithAggregatesFilter<"Fines"> | Decimal | DecimalJsLike | number | string
    payment_status?: EnumPaymentStatusWithAggregatesFilter<"Fines"> | $Enums.PaymentStatus
    payment_date?: DateTimeNullableWithAggregatesFilter<"Fines"> | Date | string | null
  }

  export type TokenSessionsWhereInput = {
    AND?: TokenSessionsWhereInput | TokenSessionsWhereInput[]
    OR?: TokenSessionsWhereInput[]
    NOT?: TokenSessionsWhereInput | TokenSessionsWhereInput[]
    id?: IntFilter<"TokenSessions"> | number
    user_id?: IntFilter<"TokenSessions"> | number
    token?: StringFilter<"TokenSessions"> | string
    expires_at?: DateTimeFilter<"TokenSessions"> | Date | string
    created_at?: DateTimeFilter<"TokenSessions"> | Date | string
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
  }

  export type TokenSessionsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    user?: UsersOrderByWithRelationInput
    _relevance?: TokenSessionsOrderByRelevanceInput
  }

  export type TokenSessionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    token?: string
    AND?: TokenSessionsWhereInput | TokenSessionsWhereInput[]
    OR?: TokenSessionsWhereInput[]
    NOT?: TokenSessionsWhereInput | TokenSessionsWhereInput[]
    user_id?: IntFilter<"TokenSessions"> | number
    expires_at?: DateTimeFilter<"TokenSessions"> | Date | string
    created_at?: DateTimeFilter<"TokenSessions"> | Date | string
    user?: XOR<UsersScalarRelationFilter, UsersWhereInput>
  }, "id" | "token">

  export type TokenSessionsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    _count?: TokenSessionsCountOrderByAggregateInput
    _avg?: TokenSessionsAvgOrderByAggregateInput
    _max?: TokenSessionsMaxOrderByAggregateInput
    _min?: TokenSessionsMinOrderByAggregateInput
    _sum?: TokenSessionsSumOrderByAggregateInput
  }

  export type TokenSessionsScalarWhereWithAggregatesInput = {
    AND?: TokenSessionsScalarWhereWithAggregatesInput | TokenSessionsScalarWhereWithAggregatesInput[]
    OR?: TokenSessionsScalarWhereWithAggregatesInput[]
    NOT?: TokenSessionsScalarWhereWithAggregatesInput | TokenSessionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TokenSessions"> | number
    user_id?: IntWithAggregatesFilter<"TokenSessions"> | number
    token?: StringWithAggregatesFilter<"TokenSessions"> | string
    expires_at?: DateTimeWithAggregatesFilter<"TokenSessions"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"TokenSessions"> | Date | string
  }

  export type CategoriesCreateInput = {
    category_name: string
    is_active?: boolean
    created_at?: Date | string
    deleted_at?: Date | string | null
    books?: BooksCreateNestedManyWithoutCategoryInput
  }

  export type CategoriesUncheckedCreateInput = {
    id?: number
    category_name: string
    is_active?: boolean
    created_at?: Date | string
    deleted_at?: Date | string | null
    books?: BooksUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoriesUpdateInput = {
    category_name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    books?: BooksUpdateManyWithoutCategoryNestedInput
  }

  export type CategoriesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    category_name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    books?: BooksUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoriesCreateManyInput = {
    id?: number
    category_name: string
    is_active?: boolean
    created_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type CategoriesUpdateManyMutationInput = {
    category_name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CategoriesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    category_name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UsersCreateInput = {
    nik?: string | null
    email: string
    password: string
    full_name: string
    address: string
    phone: string
    ktp?: string | null
    role?: $Enums.UserRole
    account_status?: $Enums.AccountStatus
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    borrowings?: BorrowingsCreateNestedManyWithoutUserInput
    sessions?: TokenSessionsCreateNestedManyWithoutUserInput
  }

  export type UsersUncheckedCreateInput = {
    id?: number
    nik?: string | null
    email: string
    password: string
    full_name: string
    address: string
    phone: string
    ktp?: string | null
    role?: $Enums.UserRole
    account_status?: $Enums.AccountStatus
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    borrowings?: BorrowingsUncheckedCreateNestedManyWithoutUserInput
    sessions?: TokenSessionsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsersUpdateInput = {
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    ktp?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    account_status?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    borrowings?: BorrowingsUpdateManyWithoutUserNestedInput
    sessions?: TokenSessionsUpdateManyWithoutUserNestedInput
  }

  export type UsersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    ktp?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    account_status?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    borrowings?: BorrowingsUncheckedUpdateManyWithoutUserNestedInput
    sessions?: TokenSessionsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UsersCreateManyInput = {
    id?: number
    nik?: string | null
    email: string
    password: string
    full_name: string
    address: string
    phone: string
    ktp?: string | null
    role?: $Enums.UserRole
    account_status?: $Enums.AccountStatus
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type UsersUpdateManyMutationInput = {
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    ktp?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    account_status?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UsersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    ktp?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    account_status?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BooksCreateInput = {
    title: string
    author: string
    publisher: string
    description?: string | null
    book_cover?: string | null
    year: number
    total_stock: number
    available: number
    created_at?: Date | string
    deleted_at?: Date | string | null
    category: CategoriesCreateNestedOneWithoutBooksInput
    borrowings?: BorrowingsCreateNestedManyWithoutBookInput
  }

  export type BooksUncheckedCreateInput = {
    id?: number
    category_id: number
    title: string
    author: string
    publisher: string
    description?: string | null
    book_cover?: string | null
    year: number
    total_stock: number
    available: number
    created_at?: Date | string
    deleted_at?: Date | string | null
    borrowings?: BorrowingsUncheckedCreateNestedManyWithoutBookInput
  }

  export type BooksUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    book_cover?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    total_stock?: IntFieldUpdateOperationsInput | number
    available?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: CategoriesUpdateOneRequiredWithoutBooksNestedInput
    borrowings?: BorrowingsUpdateManyWithoutBookNestedInput
  }

  export type BooksUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    category_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    book_cover?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    total_stock?: IntFieldUpdateOperationsInput | number
    available?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    borrowings?: BorrowingsUncheckedUpdateManyWithoutBookNestedInput
  }

  export type BooksCreateManyInput = {
    id?: number
    category_id: number
    title: string
    author: string
    publisher: string
    description?: string | null
    book_cover?: string | null
    year: number
    total_stock: number
    available: number
    created_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type BooksUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    book_cover?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    total_stock?: IntFieldUpdateOperationsInput | number
    available?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BooksUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    category_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    book_cover?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    total_stock?: IntFieldUpdateOperationsInput | number
    available?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BorrowingsCreateInput = {
    borrow_date: Date | string
    due_date: Date | string
    return_date?: Date | string | null
    status?: $Enums.BorrowingStatus
    created_at?: Date | string
    updated_at?: Date | string
    user: UsersCreateNestedOneWithoutBorrowingsInput
    book: BooksCreateNestedOneWithoutBorrowingsInput
    fine?: FinesCreateNestedOneWithoutBorrowingInput
  }

  export type BorrowingsUncheckedCreateInput = {
    id?: number
    user_id: number
    book_id: number
    borrow_date: Date | string
    due_date: Date | string
    return_date?: Date | string | null
    status?: $Enums.BorrowingStatus
    created_at?: Date | string
    updated_at?: Date | string
    fine?: FinesUncheckedCreateNestedOneWithoutBorrowingInput
  }

  export type BorrowingsUpdateInput = {
    borrow_date?: DateTimeFieldUpdateOperationsInput | Date | string
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBorrowingStatusFieldUpdateOperationsInput | $Enums.BorrowingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsersUpdateOneRequiredWithoutBorrowingsNestedInput
    book?: BooksUpdateOneRequiredWithoutBorrowingsNestedInput
    fine?: FinesUpdateOneWithoutBorrowingNestedInput
  }

  export type BorrowingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    borrow_date?: DateTimeFieldUpdateOperationsInput | Date | string
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBorrowingStatusFieldUpdateOperationsInput | $Enums.BorrowingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    fine?: FinesUncheckedUpdateOneWithoutBorrowingNestedInput
  }

  export type BorrowingsCreateManyInput = {
    id?: number
    user_id: number
    book_id: number
    borrow_date: Date | string
    due_date: Date | string
    return_date?: Date | string | null
    status?: $Enums.BorrowingStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BorrowingsUpdateManyMutationInput = {
    borrow_date?: DateTimeFieldUpdateOperationsInput | Date | string
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBorrowingStatusFieldUpdateOperationsInput | $Enums.BorrowingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BorrowingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    borrow_date?: DateTimeFieldUpdateOperationsInput | Date | string
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBorrowingStatusFieldUpdateOperationsInput | $Enums.BorrowingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinesCreateInput = {
    total_fines?: Decimal | DecimalJsLike | number | string
    payment_status?: $Enums.PaymentStatus
    payment_date?: Date | string | null
    borrowing: BorrowingsCreateNestedOneWithoutFineInput
  }

  export type FinesUncheckedCreateInput = {
    id?: number
    borrowing_id: number
    total_fines?: Decimal | DecimalJsLike | number | string
    payment_status?: $Enums.PaymentStatus
    payment_date?: Date | string | null
  }

  export type FinesUpdateInput = {
    total_fines?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    borrowing?: BorrowingsUpdateOneRequiredWithoutFineNestedInput
  }

  export type FinesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    borrowing_id?: IntFieldUpdateOperationsInput | number
    total_fines?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FinesCreateManyInput = {
    id?: number
    borrowing_id: number
    total_fines?: Decimal | DecimalJsLike | number | string
    payment_status?: $Enums.PaymentStatus
    payment_date?: Date | string | null
  }

  export type FinesUpdateManyMutationInput = {
    total_fines?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FinesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    borrowing_id?: IntFieldUpdateOperationsInput | number
    total_fines?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TokenSessionsCreateInput = {
    token: string
    expires_at: Date | string
    created_at?: Date | string
    user: UsersCreateNestedOneWithoutSessionsInput
  }

  export type TokenSessionsUncheckedCreateInput = {
    id?: number
    user_id: number
    token: string
    expires_at: Date | string
    created_at?: Date | string
  }

  export type TokenSessionsUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsersUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type TokenSessionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenSessionsCreateManyInput = {
    id?: number
    user_id: number
    token: string
    expires_at: Date | string
    created_at?: Date | string
  }

  export type TokenSessionsUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenSessionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BooksListRelationFilter = {
    every?: BooksWhereInput
    some?: BooksWhereInput
    none?: BooksWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BooksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoriesOrderByRelevanceInput = {
    fields: CategoriesOrderByRelevanceFieldEnum | CategoriesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CategoriesCountOrderByAggregateInput = {
    id?: SortOrder
    category_name?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type CategoriesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoriesMaxOrderByAggregateInput = {
    id?: SortOrder
    category_name?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type CategoriesMinOrderByAggregateInput = {
    id?: SortOrder
    category_name?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type CategoriesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type EnumAccountStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountStatus | EnumAccountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AccountStatus[]
    notIn?: $Enums.AccountStatus[]
    not?: NestedEnumAccountStatusFilter<$PrismaModel> | $Enums.AccountStatus
  }

  export type BorrowingsListRelationFilter = {
    every?: BorrowingsWhereInput
    some?: BorrowingsWhereInput
    none?: BorrowingsWhereInput
  }

  export type TokenSessionsListRelationFilter = {
    every?: TokenSessionsWhereInput
    some?: TokenSessionsWhereInput
    none?: TokenSessionsWhereInput
  }

  export type BorrowingsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TokenSessionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsersOrderByRelevanceInput = {
    fields: UsersOrderByRelevanceFieldEnum | UsersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UsersCountOrderByAggregateInput = {
    id?: SortOrder
    nik?: SortOrder
    email?: SortOrder
    password?: SortOrder
    full_name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    ktp?: SortOrder
    role?: SortOrder
    account_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type UsersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsersMaxOrderByAggregateInput = {
    id?: SortOrder
    nik?: SortOrder
    email?: SortOrder
    password?: SortOrder
    full_name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    ktp?: SortOrder
    role?: SortOrder
    account_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type UsersMinOrderByAggregateInput = {
    id?: SortOrder
    nik?: SortOrder
    email?: SortOrder
    password?: SortOrder
    full_name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    ktp?: SortOrder
    role?: SortOrder
    account_status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type UsersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type EnumAccountStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountStatus | EnumAccountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AccountStatus[]
    notIn?: $Enums.AccountStatus[]
    not?: NestedEnumAccountStatusWithAggregatesFilter<$PrismaModel> | $Enums.AccountStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountStatusFilter<$PrismaModel>
    _max?: NestedEnumAccountStatusFilter<$PrismaModel>
  }

  export type CategoriesScalarRelationFilter = {
    is?: CategoriesWhereInput
    isNot?: CategoriesWhereInput
  }

  export type BooksOrderByRelevanceInput = {
    fields: BooksOrderByRelevanceFieldEnum | BooksOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BooksCountOrderByAggregateInput = {
    id?: SortOrder
    category_id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    publisher?: SortOrder
    description?: SortOrder
    book_cover?: SortOrder
    year?: SortOrder
    total_stock?: SortOrder
    available?: SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type BooksAvgOrderByAggregateInput = {
    id?: SortOrder
    category_id?: SortOrder
    year?: SortOrder
    total_stock?: SortOrder
    available?: SortOrder
  }

  export type BooksMaxOrderByAggregateInput = {
    id?: SortOrder
    category_id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    publisher?: SortOrder
    description?: SortOrder
    book_cover?: SortOrder
    year?: SortOrder
    total_stock?: SortOrder
    available?: SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type BooksMinOrderByAggregateInput = {
    id?: SortOrder
    category_id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    publisher?: SortOrder
    description?: SortOrder
    book_cover?: SortOrder
    year?: SortOrder
    total_stock?: SortOrder
    available?: SortOrder
    created_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type BooksSumOrderByAggregateInput = {
    id?: SortOrder
    category_id?: SortOrder
    year?: SortOrder
    total_stock?: SortOrder
    available?: SortOrder
  }

  export type EnumBorrowingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BorrowingStatus | EnumBorrowingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BorrowingStatus[]
    notIn?: $Enums.BorrowingStatus[]
    not?: NestedEnumBorrowingStatusFilter<$PrismaModel> | $Enums.BorrowingStatus
  }

  export type UsersScalarRelationFilter = {
    is?: UsersWhereInput
    isNot?: UsersWhereInput
  }

  export type BooksScalarRelationFilter = {
    is?: BooksWhereInput
    isNot?: BooksWhereInput
  }

  export type FinesNullableScalarRelationFilter = {
    is?: FinesWhereInput | null
    isNot?: FinesWhereInput | null
  }

  export type BorrowingsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    borrow_date?: SortOrder
    due_date?: SortOrder
    return_date?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BorrowingsAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
  }

  export type BorrowingsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    borrow_date?: SortOrder
    due_date?: SortOrder
    return_date?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BorrowingsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
    borrow_date?: SortOrder
    due_date?: SortOrder
    return_date?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BorrowingsSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    book_id?: SortOrder
  }

  export type EnumBorrowingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BorrowingStatus | EnumBorrowingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BorrowingStatus[]
    notIn?: $Enums.BorrowingStatus[]
    not?: NestedEnumBorrowingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BorrowingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBorrowingStatusFilter<$PrismaModel>
    _max?: NestedEnumBorrowingStatusFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[]
    notIn?: $Enums.PaymentStatus[]
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type BorrowingsScalarRelationFilter = {
    is?: BorrowingsWhereInput
    isNot?: BorrowingsWhereInput
  }

  export type FinesCountOrderByAggregateInput = {
    id?: SortOrder
    borrowing_id?: SortOrder
    total_fines?: SortOrder
    payment_status?: SortOrder
    payment_date?: SortOrder
  }

  export type FinesAvgOrderByAggregateInput = {
    id?: SortOrder
    borrowing_id?: SortOrder
    total_fines?: SortOrder
  }

  export type FinesMaxOrderByAggregateInput = {
    id?: SortOrder
    borrowing_id?: SortOrder
    total_fines?: SortOrder
    payment_status?: SortOrder
    payment_date?: SortOrder
  }

  export type FinesMinOrderByAggregateInput = {
    id?: SortOrder
    borrowing_id?: SortOrder
    total_fines?: SortOrder
    payment_status?: SortOrder
    payment_date?: SortOrder
  }

  export type FinesSumOrderByAggregateInput = {
    id?: SortOrder
    borrowing_id?: SortOrder
    total_fines?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[]
    notIn?: $Enums.PaymentStatus[]
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type TokenSessionsOrderByRelevanceInput = {
    fields: TokenSessionsOrderByRelevanceFieldEnum | TokenSessionsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TokenSessionsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type TokenSessionsAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type TokenSessionsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type TokenSessionsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type TokenSessionsSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type BooksCreateNestedManyWithoutCategoryInput = {
    create?: XOR<BooksCreateWithoutCategoryInput, BooksUncheckedCreateWithoutCategoryInput> | BooksCreateWithoutCategoryInput[] | BooksUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BooksCreateOrConnectWithoutCategoryInput | BooksCreateOrConnectWithoutCategoryInput[]
    createMany?: BooksCreateManyCategoryInputEnvelope
    connect?: BooksWhereUniqueInput | BooksWhereUniqueInput[]
  }

  export type BooksUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<BooksCreateWithoutCategoryInput, BooksUncheckedCreateWithoutCategoryInput> | BooksCreateWithoutCategoryInput[] | BooksUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BooksCreateOrConnectWithoutCategoryInput | BooksCreateOrConnectWithoutCategoryInput[]
    createMany?: BooksCreateManyCategoryInputEnvelope
    connect?: BooksWhereUniqueInput | BooksWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BooksUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<BooksCreateWithoutCategoryInput, BooksUncheckedCreateWithoutCategoryInput> | BooksCreateWithoutCategoryInput[] | BooksUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BooksCreateOrConnectWithoutCategoryInput | BooksCreateOrConnectWithoutCategoryInput[]
    upsert?: BooksUpsertWithWhereUniqueWithoutCategoryInput | BooksUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: BooksCreateManyCategoryInputEnvelope
    set?: BooksWhereUniqueInput | BooksWhereUniqueInput[]
    disconnect?: BooksWhereUniqueInput | BooksWhereUniqueInput[]
    delete?: BooksWhereUniqueInput | BooksWhereUniqueInput[]
    connect?: BooksWhereUniqueInput | BooksWhereUniqueInput[]
    update?: BooksUpdateWithWhereUniqueWithoutCategoryInput | BooksUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: BooksUpdateManyWithWhereWithoutCategoryInput | BooksUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: BooksScalarWhereInput | BooksScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BooksUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<BooksCreateWithoutCategoryInput, BooksUncheckedCreateWithoutCategoryInput> | BooksCreateWithoutCategoryInput[] | BooksUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BooksCreateOrConnectWithoutCategoryInput | BooksCreateOrConnectWithoutCategoryInput[]
    upsert?: BooksUpsertWithWhereUniqueWithoutCategoryInput | BooksUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: BooksCreateManyCategoryInputEnvelope
    set?: BooksWhereUniqueInput | BooksWhereUniqueInput[]
    disconnect?: BooksWhereUniqueInput | BooksWhereUniqueInput[]
    delete?: BooksWhereUniqueInput | BooksWhereUniqueInput[]
    connect?: BooksWhereUniqueInput | BooksWhereUniqueInput[]
    update?: BooksUpdateWithWhereUniqueWithoutCategoryInput | BooksUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: BooksUpdateManyWithWhereWithoutCategoryInput | BooksUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: BooksScalarWhereInput | BooksScalarWhereInput[]
  }

  export type BorrowingsCreateNestedManyWithoutUserInput = {
    create?: XOR<BorrowingsCreateWithoutUserInput, BorrowingsUncheckedCreateWithoutUserInput> | BorrowingsCreateWithoutUserInput[] | BorrowingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BorrowingsCreateOrConnectWithoutUserInput | BorrowingsCreateOrConnectWithoutUserInput[]
    createMany?: BorrowingsCreateManyUserInputEnvelope
    connect?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
  }

  export type TokenSessionsCreateNestedManyWithoutUserInput = {
    create?: XOR<TokenSessionsCreateWithoutUserInput, TokenSessionsUncheckedCreateWithoutUserInput> | TokenSessionsCreateWithoutUserInput[] | TokenSessionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenSessionsCreateOrConnectWithoutUserInput | TokenSessionsCreateOrConnectWithoutUserInput[]
    createMany?: TokenSessionsCreateManyUserInputEnvelope
    connect?: TokenSessionsWhereUniqueInput | TokenSessionsWhereUniqueInput[]
  }

  export type BorrowingsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BorrowingsCreateWithoutUserInput, BorrowingsUncheckedCreateWithoutUserInput> | BorrowingsCreateWithoutUserInput[] | BorrowingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BorrowingsCreateOrConnectWithoutUserInput | BorrowingsCreateOrConnectWithoutUserInput[]
    createMany?: BorrowingsCreateManyUserInputEnvelope
    connect?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
  }

  export type TokenSessionsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TokenSessionsCreateWithoutUserInput, TokenSessionsUncheckedCreateWithoutUserInput> | TokenSessionsCreateWithoutUserInput[] | TokenSessionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenSessionsCreateOrConnectWithoutUserInput | TokenSessionsCreateOrConnectWithoutUserInput[]
    createMany?: TokenSessionsCreateManyUserInputEnvelope
    connect?: TokenSessionsWhereUniqueInput | TokenSessionsWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type EnumAccountStatusFieldUpdateOperationsInput = {
    set?: $Enums.AccountStatus
  }

  export type BorrowingsUpdateManyWithoutUserNestedInput = {
    create?: XOR<BorrowingsCreateWithoutUserInput, BorrowingsUncheckedCreateWithoutUserInput> | BorrowingsCreateWithoutUserInput[] | BorrowingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BorrowingsCreateOrConnectWithoutUserInput | BorrowingsCreateOrConnectWithoutUserInput[]
    upsert?: BorrowingsUpsertWithWhereUniqueWithoutUserInput | BorrowingsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BorrowingsCreateManyUserInputEnvelope
    set?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    disconnect?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    delete?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    connect?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    update?: BorrowingsUpdateWithWhereUniqueWithoutUserInput | BorrowingsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BorrowingsUpdateManyWithWhereWithoutUserInput | BorrowingsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BorrowingsScalarWhereInput | BorrowingsScalarWhereInput[]
  }

  export type TokenSessionsUpdateManyWithoutUserNestedInput = {
    create?: XOR<TokenSessionsCreateWithoutUserInput, TokenSessionsUncheckedCreateWithoutUserInput> | TokenSessionsCreateWithoutUserInput[] | TokenSessionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenSessionsCreateOrConnectWithoutUserInput | TokenSessionsCreateOrConnectWithoutUserInput[]
    upsert?: TokenSessionsUpsertWithWhereUniqueWithoutUserInput | TokenSessionsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TokenSessionsCreateManyUserInputEnvelope
    set?: TokenSessionsWhereUniqueInput | TokenSessionsWhereUniqueInput[]
    disconnect?: TokenSessionsWhereUniqueInput | TokenSessionsWhereUniqueInput[]
    delete?: TokenSessionsWhereUniqueInput | TokenSessionsWhereUniqueInput[]
    connect?: TokenSessionsWhereUniqueInput | TokenSessionsWhereUniqueInput[]
    update?: TokenSessionsUpdateWithWhereUniqueWithoutUserInput | TokenSessionsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TokenSessionsUpdateManyWithWhereWithoutUserInput | TokenSessionsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TokenSessionsScalarWhereInput | TokenSessionsScalarWhereInput[]
  }

  export type BorrowingsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BorrowingsCreateWithoutUserInput, BorrowingsUncheckedCreateWithoutUserInput> | BorrowingsCreateWithoutUserInput[] | BorrowingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BorrowingsCreateOrConnectWithoutUserInput | BorrowingsCreateOrConnectWithoutUserInput[]
    upsert?: BorrowingsUpsertWithWhereUniqueWithoutUserInput | BorrowingsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BorrowingsCreateManyUserInputEnvelope
    set?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    disconnect?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    delete?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    connect?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    update?: BorrowingsUpdateWithWhereUniqueWithoutUserInput | BorrowingsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BorrowingsUpdateManyWithWhereWithoutUserInput | BorrowingsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BorrowingsScalarWhereInput | BorrowingsScalarWhereInput[]
  }

  export type TokenSessionsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TokenSessionsCreateWithoutUserInput, TokenSessionsUncheckedCreateWithoutUserInput> | TokenSessionsCreateWithoutUserInput[] | TokenSessionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenSessionsCreateOrConnectWithoutUserInput | TokenSessionsCreateOrConnectWithoutUserInput[]
    upsert?: TokenSessionsUpsertWithWhereUniqueWithoutUserInput | TokenSessionsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TokenSessionsCreateManyUserInputEnvelope
    set?: TokenSessionsWhereUniqueInput | TokenSessionsWhereUniqueInput[]
    disconnect?: TokenSessionsWhereUniqueInput | TokenSessionsWhereUniqueInput[]
    delete?: TokenSessionsWhereUniqueInput | TokenSessionsWhereUniqueInput[]
    connect?: TokenSessionsWhereUniqueInput | TokenSessionsWhereUniqueInput[]
    update?: TokenSessionsUpdateWithWhereUniqueWithoutUserInput | TokenSessionsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TokenSessionsUpdateManyWithWhereWithoutUserInput | TokenSessionsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TokenSessionsScalarWhereInput | TokenSessionsScalarWhereInput[]
  }

  export type CategoriesCreateNestedOneWithoutBooksInput = {
    create?: XOR<CategoriesCreateWithoutBooksInput, CategoriesUncheckedCreateWithoutBooksInput>
    connectOrCreate?: CategoriesCreateOrConnectWithoutBooksInput
    connect?: CategoriesWhereUniqueInput
  }

  export type BorrowingsCreateNestedManyWithoutBookInput = {
    create?: XOR<BorrowingsCreateWithoutBookInput, BorrowingsUncheckedCreateWithoutBookInput> | BorrowingsCreateWithoutBookInput[] | BorrowingsUncheckedCreateWithoutBookInput[]
    connectOrCreate?: BorrowingsCreateOrConnectWithoutBookInput | BorrowingsCreateOrConnectWithoutBookInput[]
    createMany?: BorrowingsCreateManyBookInputEnvelope
    connect?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
  }

  export type BorrowingsUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<BorrowingsCreateWithoutBookInput, BorrowingsUncheckedCreateWithoutBookInput> | BorrowingsCreateWithoutBookInput[] | BorrowingsUncheckedCreateWithoutBookInput[]
    connectOrCreate?: BorrowingsCreateOrConnectWithoutBookInput | BorrowingsCreateOrConnectWithoutBookInput[]
    createMany?: BorrowingsCreateManyBookInputEnvelope
    connect?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
  }

  export type CategoriesUpdateOneRequiredWithoutBooksNestedInput = {
    create?: XOR<CategoriesCreateWithoutBooksInput, CategoriesUncheckedCreateWithoutBooksInput>
    connectOrCreate?: CategoriesCreateOrConnectWithoutBooksInput
    upsert?: CategoriesUpsertWithoutBooksInput
    connect?: CategoriesWhereUniqueInput
    update?: XOR<XOR<CategoriesUpdateToOneWithWhereWithoutBooksInput, CategoriesUpdateWithoutBooksInput>, CategoriesUncheckedUpdateWithoutBooksInput>
  }

  export type BorrowingsUpdateManyWithoutBookNestedInput = {
    create?: XOR<BorrowingsCreateWithoutBookInput, BorrowingsUncheckedCreateWithoutBookInput> | BorrowingsCreateWithoutBookInput[] | BorrowingsUncheckedCreateWithoutBookInput[]
    connectOrCreate?: BorrowingsCreateOrConnectWithoutBookInput | BorrowingsCreateOrConnectWithoutBookInput[]
    upsert?: BorrowingsUpsertWithWhereUniqueWithoutBookInput | BorrowingsUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: BorrowingsCreateManyBookInputEnvelope
    set?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    disconnect?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    delete?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    connect?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    update?: BorrowingsUpdateWithWhereUniqueWithoutBookInput | BorrowingsUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: BorrowingsUpdateManyWithWhereWithoutBookInput | BorrowingsUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: BorrowingsScalarWhereInput | BorrowingsScalarWhereInput[]
  }

  export type BorrowingsUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<BorrowingsCreateWithoutBookInput, BorrowingsUncheckedCreateWithoutBookInput> | BorrowingsCreateWithoutBookInput[] | BorrowingsUncheckedCreateWithoutBookInput[]
    connectOrCreate?: BorrowingsCreateOrConnectWithoutBookInput | BorrowingsCreateOrConnectWithoutBookInput[]
    upsert?: BorrowingsUpsertWithWhereUniqueWithoutBookInput | BorrowingsUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: BorrowingsCreateManyBookInputEnvelope
    set?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    disconnect?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    delete?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    connect?: BorrowingsWhereUniqueInput | BorrowingsWhereUniqueInput[]
    update?: BorrowingsUpdateWithWhereUniqueWithoutBookInput | BorrowingsUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: BorrowingsUpdateManyWithWhereWithoutBookInput | BorrowingsUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: BorrowingsScalarWhereInput | BorrowingsScalarWhereInput[]
  }

  export type UsersCreateNestedOneWithoutBorrowingsInput = {
    create?: XOR<UsersCreateWithoutBorrowingsInput, UsersUncheckedCreateWithoutBorrowingsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutBorrowingsInput
    connect?: UsersWhereUniqueInput
  }

  export type BooksCreateNestedOneWithoutBorrowingsInput = {
    create?: XOR<BooksCreateWithoutBorrowingsInput, BooksUncheckedCreateWithoutBorrowingsInput>
    connectOrCreate?: BooksCreateOrConnectWithoutBorrowingsInput
    connect?: BooksWhereUniqueInput
  }

  export type FinesCreateNestedOneWithoutBorrowingInput = {
    create?: XOR<FinesCreateWithoutBorrowingInput, FinesUncheckedCreateWithoutBorrowingInput>
    connectOrCreate?: FinesCreateOrConnectWithoutBorrowingInput
    connect?: FinesWhereUniqueInput
  }

  export type FinesUncheckedCreateNestedOneWithoutBorrowingInput = {
    create?: XOR<FinesCreateWithoutBorrowingInput, FinesUncheckedCreateWithoutBorrowingInput>
    connectOrCreate?: FinesCreateOrConnectWithoutBorrowingInput
    connect?: FinesWhereUniqueInput
  }

  export type EnumBorrowingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BorrowingStatus
  }

  export type UsersUpdateOneRequiredWithoutBorrowingsNestedInput = {
    create?: XOR<UsersCreateWithoutBorrowingsInput, UsersUncheckedCreateWithoutBorrowingsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutBorrowingsInput
    upsert?: UsersUpsertWithoutBorrowingsInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutBorrowingsInput, UsersUpdateWithoutBorrowingsInput>, UsersUncheckedUpdateWithoutBorrowingsInput>
  }

  export type BooksUpdateOneRequiredWithoutBorrowingsNestedInput = {
    create?: XOR<BooksCreateWithoutBorrowingsInput, BooksUncheckedCreateWithoutBorrowingsInput>
    connectOrCreate?: BooksCreateOrConnectWithoutBorrowingsInput
    upsert?: BooksUpsertWithoutBorrowingsInput
    connect?: BooksWhereUniqueInput
    update?: XOR<XOR<BooksUpdateToOneWithWhereWithoutBorrowingsInput, BooksUpdateWithoutBorrowingsInput>, BooksUncheckedUpdateWithoutBorrowingsInput>
  }

  export type FinesUpdateOneWithoutBorrowingNestedInput = {
    create?: XOR<FinesCreateWithoutBorrowingInput, FinesUncheckedCreateWithoutBorrowingInput>
    connectOrCreate?: FinesCreateOrConnectWithoutBorrowingInput
    upsert?: FinesUpsertWithoutBorrowingInput
    disconnect?: FinesWhereInput | boolean
    delete?: FinesWhereInput | boolean
    connect?: FinesWhereUniqueInput
    update?: XOR<XOR<FinesUpdateToOneWithWhereWithoutBorrowingInput, FinesUpdateWithoutBorrowingInput>, FinesUncheckedUpdateWithoutBorrowingInput>
  }

  export type FinesUncheckedUpdateOneWithoutBorrowingNestedInput = {
    create?: XOR<FinesCreateWithoutBorrowingInput, FinesUncheckedCreateWithoutBorrowingInput>
    connectOrCreate?: FinesCreateOrConnectWithoutBorrowingInput
    upsert?: FinesUpsertWithoutBorrowingInput
    disconnect?: FinesWhereInput | boolean
    delete?: FinesWhereInput | boolean
    connect?: FinesWhereUniqueInput
    update?: XOR<XOR<FinesUpdateToOneWithWhereWithoutBorrowingInput, FinesUpdateWithoutBorrowingInput>, FinesUncheckedUpdateWithoutBorrowingInput>
  }

  export type BorrowingsCreateNestedOneWithoutFineInput = {
    create?: XOR<BorrowingsCreateWithoutFineInput, BorrowingsUncheckedCreateWithoutFineInput>
    connectOrCreate?: BorrowingsCreateOrConnectWithoutFineInput
    connect?: BorrowingsWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type BorrowingsUpdateOneRequiredWithoutFineNestedInput = {
    create?: XOR<BorrowingsCreateWithoutFineInput, BorrowingsUncheckedCreateWithoutFineInput>
    connectOrCreate?: BorrowingsCreateOrConnectWithoutFineInput
    upsert?: BorrowingsUpsertWithoutFineInput
    connect?: BorrowingsWhereUniqueInput
    update?: XOR<XOR<BorrowingsUpdateToOneWithWhereWithoutFineInput, BorrowingsUpdateWithoutFineInput>, BorrowingsUncheckedUpdateWithoutFineInput>
  }

  export type UsersCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UsersCreateWithoutSessionsInput, UsersUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutSessionsInput
    connect?: UsersWhereUniqueInput
  }

  export type UsersUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UsersCreateWithoutSessionsInput, UsersUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UsersCreateOrConnectWithoutSessionsInput
    upsert?: UsersUpsertWithoutSessionsInput
    connect?: UsersWhereUniqueInput
    update?: XOR<XOR<UsersUpdateToOneWithWhereWithoutSessionsInput, UsersUpdateWithoutSessionsInput>, UsersUncheckedUpdateWithoutSessionsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumAccountStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountStatus | EnumAccountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AccountStatus[]
    notIn?: $Enums.AccountStatus[]
    not?: NestedEnumAccountStatusFilter<$PrismaModel> | $Enums.AccountStatus
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedEnumAccountStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountStatus | EnumAccountStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AccountStatus[]
    notIn?: $Enums.AccountStatus[]
    not?: NestedEnumAccountStatusWithAggregatesFilter<$PrismaModel> | $Enums.AccountStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountStatusFilter<$PrismaModel>
    _max?: NestedEnumAccountStatusFilter<$PrismaModel>
  }

  export type NestedEnumBorrowingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BorrowingStatus | EnumBorrowingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BorrowingStatus[]
    notIn?: $Enums.BorrowingStatus[]
    not?: NestedEnumBorrowingStatusFilter<$PrismaModel> | $Enums.BorrowingStatus
  }

  export type NestedEnumBorrowingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BorrowingStatus | EnumBorrowingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BorrowingStatus[]
    notIn?: $Enums.BorrowingStatus[]
    not?: NestedEnumBorrowingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BorrowingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBorrowingStatusFilter<$PrismaModel>
    _max?: NestedEnumBorrowingStatusFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[]
    notIn?: $Enums.PaymentStatus[]
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[]
    notIn?: $Enums.PaymentStatus[]
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type BooksCreateWithoutCategoryInput = {
    title: string
    author: string
    publisher: string
    description?: string | null
    book_cover?: string | null
    year: number
    total_stock: number
    available: number
    created_at?: Date | string
    deleted_at?: Date | string | null
    borrowings?: BorrowingsCreateNestedManyWithoutBookInput
  }

  export type BooksUncheckedCreateWithoutCategoryInput = {
    id?: number
    title: string
    author: string
    publisher: string
    description?: string | null
    book_cover?: string | null
    year: number
    total_stock: number
    available: number
    created_at?: Date | string
    deleted_at?: Date | string | null
    borrowings?: BorrowingsUncheckedCreateNestedManyWithoutBookInput
  }

  export type BooksCreateOrConnectWithoutCategoryInput = {
    where: BooksWhereUniqueInput
    create: XOR<BooksCreateWithoutCategoryInput, BooksUncheckedCreateWithoutCategoryInput>
  }

  export type BooksCreateManyCategoryInputEnvelope = {
    data: BooksCreateManyCategoryInput | BooksCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type BooksUpsertWithWhereUniqueWithoutCategoryInput = {
    where: BooksWhereUniqueInput
    update: XOR<BooksUpdateWithoutCategoryInput, BooksUncheckedUpdateWithoutCategoryInput>
    create: XOR<BooksCreateWithoutCategoryInput, BooksUncheckedCreateWithoutCategoryInput>
  }

  export type BooksUpdateWithWhereUniqueWithoutCategoryInput = {
    where: BooksWhereUniqueInput
    data: XOR<BooksUpdateWithoutCategoryInput, BooksUncheckedUpdateWithoutCategoryInput>
  }

  export type BooksUpdateManyWithWhereWithoutCategoryInput = {
    where: BooksScalarWhereInput
    data: XOR<BooksUpdateManyMutationInput, BooksUncheckedUpdateManyWithoutCategoryInput>
  }

  export type BooksScalarWhereInput = {
    AND?: BooksScalarWhereInput | BooksScalarWhereInput[]
    OR?: BooksScalarWhereInput[]
    NOT?: BooksScalarWhereInput | BooksScalarWhereInput[]
    id?: IntFilter<"Books"> | number
    category_id?: IntFilter<"Books"> | number
    title?: StringFilter<"Books"> | string
    author?: StringFilter<"Books"> | string
    publisher?: StringFilter<"Books"> | string
    description?: StringNullableFilter<"Books"> | string | null
    book_cover?: StringNullableFilter<"Books"> | string | null
    year?: IntFilter<"Books"> | number
    total_stock?: IntFilter<"Books"> | number
    available?: IntFilter<"Books"> | number
    created_at?: DateTimeFilter<"Books"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Books"> | Date | string | null
  }

  export type BorrowingsCreateWithoutUserInput = {
    borrow_date: Date | string
    due_date: Date | string
    return_date?: Date | string | null
    status?: $Enums.BorrowingStatus
    created_at?: Date | string
    updated_at?: Date | string
    book: BooksCreateNestedOneWithoutBorrowingsInput
    fine?: FinesCreateNestedOneWithoutBorrowingInput
  }

  export type BorrowingsUncheckedCreateWithoutUserInput = {
    id?: number
    book_id: number
    borrow_date: Date | string
    due_date: Date | string
    return_date?: Date | string | null
    status?: $Enums.BorrowingStatus
    created_at?: Date | string
    updated_at?: Date | string
    fine?: FinesUncheckedCreateNestedOneWithoutBorrowingInput
  }

  export type BorrowingsCreateOrConnectWithoutUserInput = {
    where: BorrowingsWhereUniqueInput
    create: XOR<BorrowingsCreateWithoutUserInput, BorrowingsUncheckedCreateWithoutUserInput>
  }

  export type BorrowingsCreateManyUserInputEnvelope = {
    data: BorrowingsCreateManyUserInput | BorrowingsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TokenSessionsCreateWithoutUserInput = {
    token: string
    expires_at: Date | string
    created_at?: Date | string
  }

  export type TokenSessionsUncheckedCreateWithoutUserInput = {
    id?: number
    token: string
    expires_at: Date | string
    created_at?: Date | string
  }

  export type TokenSessionsCreateOrConnectWithoutUserInput = {
    where: TokenSessionsWhereUniqueInput
    create: XOR<TokenSessionsCreateWithoutUserInput, TokenSessionsUncheckedCreateWithoutUserInput>
  }

  export type TokenSessionsCreateManyUserInputEnvelope = {
    data: TokenSessionsCreateManyUserInput | TokenSessionsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BorrowingsUpsertWithWhereUniqueWithoutUserInput = {
    where: BorrowingsWhereUniqueInput
    update: XOR<BorrowingsUpdateWithoutUserInput, BorrowingsUncheckedUpdateWithoutUserInput>
    create: XOR<BorrowingsCreateWithoutUserInput, BorrowingsUncheckedCreateWithoutUserInput>
  }

  export type BorrowingsUpdateWithWhereUniqueWithoutUserInput = {
    where: BorrowingsWhereUniqueInput
    data: XOR<BorrowingsUpdateWithoutUserInput, BorrowingsUncheckedUpdateWithoutUserInput>
  }

  export type BorrowingsUpdateManyWithWhereWithoutUserInput = {
    where: BorrowingsScalarWhereInput
    data: XOR<BorrowingsUpdateManyMutationInput, BorrowingsUncheckedUpdateManyWithoutUserInput>
  }

  export type BorrowingsScalarWhereInput = {
    AND?: BorrowingsScalarWhereInput | BorrowingsScalarWhereInput[]
    OR?: BorrowingsScalarWhereInput[]
    NOT?: BorrowingsScalarWhereInput | BorrowingsScalarWhereInput[]
    id?: IntFilter<"Borrowings"> | number
    user_id?: IntFilter<"Borrowings"> | number
    book_id?: IntFilter<"Borrowings"> | number
    borrow_date?: DateTimeFilter<"Borrowings"> | Date | string
    due_date?: DateTimeFilter<"Borrowings"> | Date | string
    return_date?: DateTimeNullableFilter<"Borrowings"> | Date | string | null
    status?: EnumBorrowingStatusFilter<"Borrowings"> | $Enums.BorrowingStatus
    created_at?: DateTimeFilter<"Borrowings"> | Date | string
    updated_at?: DateTimeFilter<"Borrowings"> | Date | string
  }

  export type TokenSessionsUpsertWithWhereUniqueWithoutUserInput = {
    where: TokenSessionsWhereUniqueInput
    update: XOR<TokenSessionsUpdateWithoutUserInput, TokenSessionsUncheckedUpdateWithoutUserInput>
    create: XOR<TokenSessionsCreateWithoutUserInput, TokenSessionsUncheckedCreateWithoutUserInput>
  }

  export type TokenSessionsUpdateWithWhereUniqueWithoutUserInput = {
    where: TokenSessionsWhereUniqueInput
    data: XOR<TokenSessionsUpdateWithoutUserInput, TokenSessionsUncheckedUpdateWithoutUserInput>
  }

  export type TokenSessionsUpdateManyWithWhereWithoutUserInput = {
    where: TokenSessionsScalarWhereInput
    data: XOR<TokenSessionsUpdateManyMutationInput, TokenSessionsUncheckedUpdateManyWithoutUserInput>
  }

  export type TokenSessionsScalarWhereInput = {
    AND?: TokenSessionsScalarWhereInput | TokenSessionsScalarWhereInput[]
    OR?: TokenSessionsScalarWhereInput[]
    NOT?: TokenSessionsScalarWhereInput | TokenSessionsScalarWhereInput[]
    id?: IntFilter<"TokenSessions"> | number
    user_id?: IntFilter<"TokenSessions"> | number
    token?: StringFilter<"TokenSessions"> | string
    expires_at?: DateTimeFilter<"TokenSessions"> | Date | string
    created_at?: DateTimeFilter<"TokenSessions"> | Date | string
  }

  export type CategoriesCreateWithoutBooksInput = {
    category_name: string
    is_active?: boolean
    created_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type CategoriesUncheckedCreateWithoutBooksInput = {
    id?: number
    category_name: string
    is_active?: boolean
    created_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type CategoriesCreateOrConnectWithoutBooksInput = {
    where: CategoriesWhereUniqueInput
    create: XOR<CategoriesCreateWithoutBooksInput, CategoriesUncheckedCreateWithoutBooksInput>
  }

  export type BorrowingsCreateWithoutBookInput = {
    borrow_date: Date | string
    due_date: Date | string
    return_date?: Date | string | null
    status?: $Enums.BorrowingStatus
    created_at?: Date | string
    updated_at?: Date | string
    user: UsersCreateNestedOneWithoutBorrowingsInput
    fine?: FinesCreateNestedOneWithoutBorrowingInput
  }

  export type BorrowingsUncheckedCreateWithoutBookInput = {
    id?: number
    user_id: number
    borrow_date: Date | string
    due_date: Date | string
    return_date?: Date | string | null
    status?: $Enums.BorrowingStatus
    created_at?: Date | string
    updated_at?: Date | string
    fine?: FinesUncheckedCreateNestedOneWithoutBorrowingInput
  }

  export type BorrowingsCreateOrConnectWithoutBookInput = {
    where: BorrowingsWhereUniqueInput
    create: XOR<BorrowingsCreateWithoutBookInput, BorrowingsUncheckedCreateWithoutBookInput>
  }

  export type BorrowingsCreateManyBookInputEnvelope = {
    data: BorrowingsCreateManyBookInput | BorrowingsCreateManyBookInput[]
    skipDuplicates?: boolean
  }

  export type CategoriesUpsertWithoutBooksInput = {
    update: XOR<CategoriesUpdateWithoutBooksInput, CategoriesUncheckedUpdateWithoutBooksInput>
    create: XOR<CategoriesCreateWithoutBooksInput, CategoriesUncheckedCreateWithoutBooksInput>
    where?: CategoriesWhereInput
  }

  export type CategoriesUpdateToOneWithWhereWithoutBooksInput = {
    where?: CategoriesWhereInput
    data: XOR<CategoriesUpdateWithoutBooksInput, CategoriesUncheckedUpdateWithoutBooksInput>
  }

  export type CategoriesUpdateWithoutBooksInput = {
    category_name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CategoriesUncheckedUpdateWithoutBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    category_name?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BorrowingsUpsertWithWhereUniqueWithoutBookInput = {
    where: BorrowingsWhereUniqueInput
    update: XOR<BorrowingsUpdateWithoutBookInput, BorrowingsUncheckedUpdateWithoutBookInput>
    create: XOR<BorrowingsCreateWithoutBookInput, BorrowingsUncheckedCreateWithoutBookInput>
  }

  export type BorrowingsUpdateWithWhereUniqueWithoutBookInput = {
    where: BorrowingsWhereUniqueInput
    data: XOR<BorrowingsUpdateWithoutBookInput, BorrowingsUncheckedUpdateWithoutBookInput>
  }

  export type BorrowingsUpdateManyWithWhereWithoutBookInput = {
    where: BorrowingsScalarWhereInput
    data: XOR<BorrowingsUpdateManyMutationInput, BorrowingsUncheckedUpdateManyWithoutBookInput>
  }

  export type UsersCreateWithoutBorrowingsInput = {
    nik?: string | null
    email: string
    password: string
    full_name: string
    address: string
    phone: string
    ktp?: string | null
    role?: $Enums.UserRole
    account_status?: $Enums.AccountStatus
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    sessions?: TokenSessionsCreateNestedManyWithoutUserInput
  }

  export type UsersUncheckedCreateWithoutBorrowingsInput = {
    id?: number
    nik?: string | null
    email: string
    password: string
    full_name: string
    address: string
    phone: string
    ktp?: string | null
    role?: $Enums.UserRole
    account_status?: $Enums.AccountStatus
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    sessions?: TokenSessionsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsersCreateOrConnectWithoutBorrowingsInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutBorrowingsInput, UsersUncheckedCreateWithoutBorrowingsInput>
  }

  export type BooksCreateWithoutBorrowingsInput = {
    title: string
    author: string
    publisher: string
    description?: string | null
    book_cover?: string | null
    year: number
    total_stock: number
    available: number
    created_at?: Date | string
    deleted_at?: Date | string | null
    category: CategoriesCreateNestedOneWithoutBooksInput
  }

  export type BooksUncheckedCreateWithoutBorrowingsInput = {
    id?: number
    category_id: number
    title: string
    author: string
    publisher: string
    description?: string | null
    book_cover?: string | null
    year: number
    total_stock: number
    available: number
    created_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type BooksCreateOrConnectWithoutBorrowingsInput = {
    where: BooksWhereUniqueInput
    create: XOR<BooksCreateWithoutBorrowingsInput, BooksUncheckedCreateWithoutBorrowingsInput>
  }

  export type FinesCreateWithoutBorrowingInput = {
    total_fines?: Decimal | DecimalJsLike | number | string
    payment_status?: $Enums.PaymentStatus
    payment_date?: Date | string | null
  }

  export type FinesUncheckedCreateWithoutBorrowingInput = {
    id?: number
    total_fines?: Decimal | DecimalJsLike | number | string
    payment_status?: $Enums.PaymentStatus
    payment_date?: Date | string | null
  }

  export type FinesCreateOrConnectWithoutBorrowingInput = {
    where: FinesWhereUniqueInput
    create: XOR<FinesCreateWithoutBorrowingInput, FinesUncheckedCreateWithoutBorrowingInput>
  }

  export type UsersUpsertWithoutBorrowingsInput = {
    update: XOR<UsersUpdateWithoutBorrowingsInput, UsersUncheckedUpdateWithoutBorrowingsInput>
    create: XOR<UsersCreateWithoutBorrowingsInput, UsersUncheckedCreateWithoutBorrowingsInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutBorrowingsInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutBorrowingsInput, UsersUncheckedUpdateWithoutBorrowingsInput>
  }

  export type UsersUpdateWithoutBorrowingsInput = {
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    ktp?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    account_status?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: TokenSessionsUpdateManyWithoutUserNestedInput
  }

  export type UsersUncheckedUpdateWithoutBorrowingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    ktp?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    account_status?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: TokenSessionsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BooksUpsertWithoutBorrowingsInput = {
    update: XOR<BooksUpdateWithoutBorrowingsInput, BooksUncheckedUpdateWithoutBorrowingsInput>
    create: XOR<BooksCreateWithoutBorrowingsInput, BooksUncheckedCreateWithoutBorrowingsInput>
    where?: BooksWhereInput
  }

  export type BooksUpdateToOneWithWhereWithoutBorrowingsInput = {
    where?: BooksWhereInput
    data: XOR<BooksUpdateWithoutBorrowingsInput, BooksUncheckedUpdateWithoutBorrowingsInput>
  }

  export type BooksUpdateWithoutBorrowingsInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    book_cover?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    total_stock?: IntFieldUpdateOperationsInput | number
    available?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: CategoriesUpdateOneRequiredWithoutBooksNestedInput
  }

  export type BooksUncheckedUpdateWithoutBorrowingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    category_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    book_cover?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    total_stock?: IntFieldUpdateOperationsInput | number
    available?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FinesUpsertWithoutBorrowingInput = {
    update: XOR<FinesUpdateWithoutBorrowingInput, FinesUncheckedUpdateWithoutBorrowingInput>
    create: XOR<FinesCreateWithoutBorrowingInput, FinesUncheckedCreateWithoutBorrowingInput>
    where?: FinesWhereInput
  }

  export type FinesUpdateToOneWithWhereWithoutBorrowingInput = {
    where?: FinesWhereInput
    data: XOR<FinesUpdateWithoutBorrowingInput, FinesUncheckedUpdateWithoutBorrowingInput>
  }

  export type FinesUpdateWithoutBorrowingInput = {
    total_fines?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FinesUncheckedUpdateWithoutBorrowingInput = {
    id?: IntFieldUpdateOperationsInput | number
    total_fines?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    payment_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BorrowingsCreateWithoutFineInput = {
    borrow_date: Date | string
    due_date: Date | string
    return_date?: Date | string | null
    status?: $Enums.BorrowingStatus
    created_at?: Date | string
    updated_at?: Date | string
    user: UsersCreateNestedOneWithoutBorrowingsInput
    book: BooksCreateNestedOneWithoutBorrowingsInput
  }

  export type BorrowingsUncheckedCreateWithoutFineInput = {
    id?: number
    user_id: number
    book_id: number
    borrow_date: Date | string
    due_date: Date | string
    return_date?: Date | string | null
    status?: $Enums.BorrowingStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BorrowingsCreateOrConnectWithoutFineInput = {
    where: BorrowingsWhereUniqueInput
    create: XOR<BorrowingsCreateWithoutFineInput, BorrowingsUncheckedCreateWithoutFineInput>
  }

  export type BorrowingsUpsertWithoutFineInput = {
    update: XOR<BorrowingsUpdateWithoutFineInput, BorrowingsUncheckedUpdateWithoutFineInput>
    create: XOR<BorrowingsCreateWithoutFineInput, BorrowingsUncheckedCreateWithoutFineInput>
    where?: BorrowingsWhereInput
  }

  export type BorrowingsUpdateToOneWithWhereWithoutFineInput = {
    where?: BorrowingsWhereInput
    data: XOR<BorrowingsUpdateWithoutFineInput, BorrowingsUncheckedUpdateWithoutFineInput>
  }

  export type BorrowingsUpdateWithoutFineInput = {
    borrow_date?: DateTimeFieldUpdateOperationsInput | Date | string
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBorrowingStatusFieldUpdateOperationsInput | $Enums.BorrowingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsersUpdateOneRequiredWithoutBorrowingsNestedInput
    book?: BooksUpdateOneRequiredWithoutBorrowingsNestedInput
  }

  export type BorrowingsUncheckedUpdateWithoutFineInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    borrow_date?: DateTimeFieldUpdateOperationsInput | Date | string
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBorrowingStatusFieldUpdateOperationsInput | $Enums.BorrowingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersCreateWithoutSessionsInput = {
    nik?: string | null
    email: string
    password: string
    full_name: string
    address: string
    phone: string
    ktp?: string | null
    role?: $Enums.UserRole
    account_status?: $Enums.AccountStatus
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    borrowings?: BorrowingsCreateNestedManyWithoutUserInput
  }

  export type UsersUncheckedCreateWithoutSessionsInput = {
    id?: number
    nik?: string | null
    email: string
    password: string
    full_name: string
    address: string
    phone: string
    ktp?: string | null
    role?: $Enums.UserRole
    account_status?: $Enums.AccountStatus
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    borrowings?: BorrowingsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UsersCreateOrConnectWithoutSessionsInput = {
    where: UsersWhereUniqueInput
    create: XOR<UsersCreateWithoutSessionsInput, UsersUncheckedCreateWithoutSessionsInput>
  }

  export type UsersUpsertWithoutSessionsInput = {
    update: XOR<UsersUpdateWithoutSessionsInput, UsersUncheckedUpdateWithoutSessionsInput>
    create: XOR<UsersCreateWithoutSessionsInput, UsersUncheckedCreateWithoutSessionsInput>
    where?: UsersWhereInput
  }

  export type UsersUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UsersWhereInput
    data: XOR<UsersUpdateWithoutSessionsInput, UsersUncheckedUpdateWithoutSessionsInput>
  }

  export type UsersUpdateWithoutSessionsInput = {
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    ktp?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    account_status?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    borrowings?: BorrowingsUpdateManyWithoutUserNestedInput
  }

  export type UsersUncheckedUpdateWithoutSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    nik?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    ktp?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    account_status?: EnumAccountStatusFieldUpdateOperationsInput | $Enums.AccountStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    borrowings?: BorrowingsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BooksCreateManyCategoryInput = {
    id?: number
    title: string
    author: string
    publisher: string
    description?: string | null
    book_cover?: string | null
    year: number
    total_stock: number
    available: number
    created_at?: Date | string
    deleted_at?: Date | string | null
  }

  export type BooksUpdateWithoutCategoryInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    book_cover?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    total_stock?: IntFieldUpdateOperationsInput | number
    available?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    borrowings?: BorrowingsUpdateManyWithoutBookNestedInput
  }

  export type BooksUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    book_cover?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    total_stock?: IntFieldUpdateOperationsInput | number
    available?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    borrowings?: BorrowingsUncheckedUpdateManyWithoutBookNestedInput
  }

  export type BooksUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    book_cover?: NullableStringFieldUpdateOperationsInput | string | null
    year?: IntFieldUpdateOperationsInput | number
    total_stock?: IntFieldUpdateOperationsInput | number
    available?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BorrowingsCreateManyUserInput = {
    id?: number
    book_id: number
    borrow_date: Date | string
    due_date: Date | string
    return_date?: Date | string | null
    status?: $Enums.BorrowingStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TokenSessionsCreateManyUserInput = {
    id?: number
    token: string
    expires_at: Date | string
    created_at?: Date | string
  }

  export type BorrowingsUpdateWithoutUserInput = {
    borrow_date?: DateTimeFieldUpdateOperationsInput | Date | string
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBorrowingStatusFieldUpdateOperationsInput | $Enums.BorrowingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book?: BooksUpdateOneRequiredWithoutBorrowingsNestedInput
    fine?: FinesUpdateOneWithoutBorrowingNestedInput
  }

  export type BorrowingsUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    borrow_date?: DateTimeFieldUpdateOperationsInput | Date | string
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBorrowingStatusFieldUpdateOperationsInput | $Enums.BorrowingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    fine?: FinesUncheckedUpdateOneWithoutBorrowingNestedInput
  }

  export type BorrowingsUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    borrow_date?: DateTimeFieldUpdateOperationsInput | Date | string
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBorrowingStatusFieldUpdateOperationsInput | $Enums.BorrowingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenSessionsUpdateWithoutUserInput = {
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenSessionsUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenSessionsUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BorrowingsCreateManyBookInput = {
    id?: number
    user_id: number
    borrow_date: Date | string
    due_date: Date | string
    return_date?: Date | string | null
    status?: $Enums.BorrowingStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BorrowingsUpdateWithoutBookInput = {
    borrow_date?: DateTimeFieldUpdateOperationsInput | Date | string
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBorrowingStatusFieldUpdateOperationsInput | $Enums.BorrowingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UsersUpdateOneRequiredWithoutBorrowingsNestedInput
    fine?: FinesUpdateOneWithoutBorrowingNestedInput
  }

  export type BorrowingsUncheckedUpdateWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    borrow_date?: DateTimeFieldUpdateOperationsInput | Date | string
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBorrowingStatusFieldUpdateOperationsInput | $Enums.BorrowingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    fine?: FinesUncheckedUpdateOneWithoutBorrowingNestedInput
  }

  export type BorrowingsUncheckedUpdateManyWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    borrow_date?: DateTimeFieldUpdateOperationsInput | Date | string
    due_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBorrowingStatusFieldUpdateOperationsInput | $Enums.BorrowingStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}