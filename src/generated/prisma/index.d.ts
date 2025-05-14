
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Colis
 * 
 */
export type Colis = $Result.DefaultSelection<Prisma.$ColisPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Colis
 * const colis = await prisma.colis.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Colis
   * const colis = await prisma.colis.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.colis`: Exposes CRUD operations for the **Colis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Colis
    * const colis = await prisma.colis.findMany()
    * ```
    */
  get colis(): Prisma.ColisDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
      (Without<T, U> & U) | (Without<U, T> & T)
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
    Colis: 'Colis'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "colis"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Colis: {
        payload: Prisma.$ColisPayload<ExtArgs>
        fields: Prisma.ColisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ColisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ColisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>
          }
          findFirst: {
            args: Prisma.ColisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ColisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>
          }
          findMany: {
            args: Prisma.ColisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>[]
          }
          create: {
            args: Prisma.ColisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>
          }
          createMany: {
            args: Prisma.ColisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ColisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>
          }
          update: {
            args: Prisma.ColisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>
          }
          deleteMany: {
            args: Prisma.ColisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ColisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ColisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColisPayload>
          }
          aggregate: {
            args: Prisma.ColisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateColis>
          }
          groupBy: {
            args: Prisma.ColisGroupByArgs<ExtArgs>
            result: $Utils.Optional<ColisGroupByOutputType>[]
          }
          count: {
            args: Prisma.ColisCountArgs<ExtArgs>
            result: $Utils.Optional<ColisCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }
  export type GlobalOmitConfig = {
    colis?: ColisOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Models
   */

  /**
   * Model Colis
   */

  export type AggregateColis = {
    _count: ColisCountAggregateOutputType | null
    _avg: ColisAvgAggregateOutputType | null
    _sum: ColisSumAggregateOutputType | null
    _min: ColisMinAggregateOutputType | null
    _max: ColisMaxAggregateOutputType | null
  }

  export type ColisAvgAggregateOutputType = {
    id: number | null
  }

  export type ColisSumAggregateOutputType = {
    id: number | null
  }

  export type ColisMinAggregateOutputType = {
    id: number | null
    colis_nom: string | null
    description: string | null
    date_commande: Date | null
    date_reception: Date | null
    numero_commande: string | null
    statut_ordered: boolean | null
    statut_in_transit: boolean | null
    statut_out_of_delivery: boolean | null
    statut_delivered: boolean | null
    estimation_livraison: Date | null
    proprietaire_nom: string | null
    proprietaire_email: string | null
    proprietaire_telephone: string | null
    statut_validated: boolean | null
    statut_preparing: boolean | null
    statut_departure: boolean | null
    statut_attente_douane: boolean | null
    description_validated: string | null
    description_preparing: string | null
    description_departure: string | null
    description_attente_douane: string | null
    description_delivered: string | null
    date_ajout: Date | null
    statut_en_cours_de_reparation: boolean | null
    statut_reparation_terminee: boolean | null
    prise_rendez_vous_active: boolean | null
    description_en_cours_de_reparation: string | null
    description_reparation_terminee: string | null
    rendez_vous_date: Date | null
    rendez_vous_statut: string | null
    details_supplementaires_visible: boolean | null
    details_supplementaires: string | null
    etapes_suivi: string | null
  }

  export type ColisMaxAggregateOutputType = {
    id: number | null
    colis_nom: string | null
    description: string | null
    date_commande: Date | null
    date_reception: Date | null
    numero_commande: string | null
    statut_ordered: boolean | null
    statut_in_transit: boolean | null
    statut_out_of_delivery: boolean | null
    statut_delivered: boolean | null
    estimation_livraison: Date | null
    proprietaire_nom: string | null
    proprietaire_email: string | null
    proprietaire_telephone: string | null
    statut_validated: boolean | null
    statut_preparing: boolean | null
    statut_departure: boolean | null
    statut_attente_douane: boolean | null
    description_validated: string | null
    description_preparing: string | null
    description_departure: string | null
    description_attente_douane: string | null
    description_delivered: string | null
    date_ajout: Date | null
    statut_en_cours_de_reparation: boolean | null
    statut_reparation_terminee: boolean | null
    prise_rendez_vous_active: boolean | null
    description_en_cours_de_reparation: string | null
    description_reparation_terminee: string | null
    rendez_vous_date: Date | null
    rendez_vous_statut: string | null
    details_supplementaires_visible: boolean | null
    details_supplementaires: string | null
    etapes_suivi: string | null
  }

  export type ColisCountAggregateOutputType = {
    id: number
    colis_nom: number
    description: number
    date_commande: number
    date_reception: number
    numero_commande: number
    statut_ordered: number
    statut_in_transit: number
    statut_out_of_delivery: number
    statut_delivered: number
    estimation_livraison: number
    proprietaire_nom: number
    proprietaire_email: number
    proprietaire_telephone: number
    statut_validated: number
    statut_preparing: number
    statut_departure: number
    statut_attente_douane: number
    description_validated: number
    description_preparing: number
    description_departure: number
    description_attente_douane: number
    description_delivered: number
    date_ajout: number
    statut_en_cours_de_reparation: number
    statut_reparation_terminee: number
    prise_rendez_vous_active: number
    description_en_cours_de_reparation: number
    description_reparation_terminee: number
    rendez_vous_date: number
    rendez_vous_statut: number
    details_supplementaires_visible: number
    details_supplementaires: number
    etapes_suivi: number
    _all: number
  }


  export type ColisAvgAggregateInputType = {
    id?: true
  }

  export type ColisSumAggregateInputType = {
    id?: true
  }

  export type ColisMinAggregateInputType = {
    id?: true
    colis_nom?: true
    description?: true
    date_commande?: true
    date_reception?: true
    numero_commande?: true
    statut_ordered?: true
    statut_in_transit?: true
    statut_out_of_delivery?: true
    statut_delivered?: true
    estimation_livraison?: true
    proprietaire_nom?: true
    proprietaire_email?: true
    proprietaire_telephone?: true
    statut_validated?: true
    statut_preparing?: true
    statut_departure?: true
    statut_attente_douane?: true
    description_validated?: true
    description_preparing?: true
    description_departure?: true
    description_attente_douane?: true
    description_delivered?: true
    date_ajout?: true
    statut_en_cours_de_reparation?: true
    statut_reparation_terminee?: true
    prise_rendez_vous_active?: true
    description_en_cours_de_reparation?: true
    description_reparation_terminee?: true
    rendez_vous_date?: true
    rendez_vous_statut?: true
    details_supplementaires_visible?: true
    details_supplementaires?: true
    etapes_suivi?: true
  }

  export type ColisMaxAggregateInputType = {
    id?: true
    colis_nom?: true
    description?: true
    date_commande?: true
    date_reception?: true
    numero_commande?: true
    statut_ordered?: true
    statut_in_transit?: true
    statut_out_of_delivery?: true
    statut_delivered?: true
    estimation_livraison?: true
    proprietaire_nom?: true
    proprietaire_email?: true
    proprietaire_telephone?: true
    statut_validated?: true
    statut_preparing?: true
    statut_departure?: true
    statut_attente_douane?: true
    description_validated?: true
    description_preparing?: true
    description_departure?: true
    description_attente_douane?: true
    description_delivered?: true
    date_ajout?: true
    statut_en_cours_de_reparation?: true
    statut_reparation_terminee?: true
    prise_rendez_vous_active?: true
    description_en_cours_de_reparation?: true
    description_reparation_terminee?: true
    rendez_vous_date?: true
    rendez_vous_statut?: true
    details_supplementaires_visible?: true
    details_supplementaires?: true
    etapes_suivi?: true
  }

  export type ColisCountAggregateInputType = {
    id?: true
    colis_nom?: true
    description?: true
    date_commande?: true
    date_reception?: true
    numero_commande?: true
    statut_ordered?: true
    statut_in_transit?: true
    statut_out_of_delivery?: true
    statut_delivered?: true
    estimation_livraison?: true
    proprietaire_nom?: true
    proprietaire_email?: true
    proprietaire_telephone?: true
    statut_validated?: true
    statut_preparing?: true
    statut_departure?: true
    statut_attente_douane?: true
    description_validated?: true
    description_preparing?: true
    description_departure?: true
    description_attente_douane?: true
    description_delivered?: true
    date_ajout?: true
    statut_en_cours_de_reparation?: true
    statut_reparation_terminee?: true
    prise_rendez_vous_active?: true
    description_en_cours_de_reparation?: true
    description_reparation_terminee?: true
    rendez_vous_date?: true
    rendez_vous_statut?: true
    details_supplementaires_visible?: true
    details_supplementaires?: true
    etapes_suivi?: true
    _all?: true
  }

  export type ColisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Colis to aggregate.
     */
    where?: ColisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colis to fetch.
     */
    orderBy?: ColisOrderByWithRelationInput | ColisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ColisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Colis
    **/
    _count?: true | ColisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ColisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ColisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ColisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ColisMaxAggregateInputType
  }

  export type GetColisAggregateType<T extends ColisAggregateArgs> = {
        [P in keyof T & keyof AggregateColis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateColis[P]>
      : GetScalarType<T[P], AggregateColis[P]>
  }




  export type ColisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColisWhereInput
    orderBy?: ColisOrderByWithAggregationInput | ColisOrderByWithAggregationInput[]
    by: ColisScalarFieldEnum[] | ColisScalarFieldEnum
    having?: ColisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ColisCountAggregateInputType | true
    _avg?: ColisAvgAggregateInputType
    _sum?: ColisSumAggregateInputType
    _min?: ColisMinAggregateInputType
    _max?: ColisMaxAggregateInputType
  }

  export type ColisGroupByOutputType = {
    id: number
    colis_nom: string
    description: string
    date_commande: Date
    date_reception: Date
    numero_commande: string
    statut_ordered: boolean
    statut_in_transit: boolean
    statut_out_of_delivery: boolean
    statut_delivered: boolean
    estimation_livraison: Date
    proprietaire_nom: string
    proprietaire_email: string
    proprietaire_telephone: string
    statut_validated: boolean
    statut_preparing: boolean
    statut_departure: boolean
    statut_attente_douane: boolean
    description_validated: string
    description_preparing: string
    description_departure: string
    description_attente_douane: string
    description_delivered: string
    date_ajout: Date
    statut_en_cours_de_reparation: boolean
    statut_reparation_terminee: boolean
    prise_rendez_vous_active: boolean
    description_en_cours_de_reparation: string
    description_reparation_terminee: string
    rendez_vous_date: Date | null
    rendez_vous_statut: string | null
    details_supplementaires_visible: boolean
    details_supplementaires: string | null
    etapes_suivi: string | null
    _count: ColisCountAggregateOutputType | null
    _avg: ColisAvgAggregateOutputType | null
    _sum: ColisSumAggregateOutputType | null
    _min: ColisMinAggregateOutputType | null
    _max: ColisMaxAggregateOutputType | null
  }

  type GetColisGroupByPayload<T extends ColisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ColisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ColisGroupByOutputType[P]>
            : GetScalarType<T[P], ColisGroupByOutputType[P]>
        }
      >
    >


  export type ColisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    colis_nom?: boolean
    description?: boolean
    date_commande?: boolean
    date_reception?: boolean
    numero_commande?: boolean
    statut_ordered?: boolean
    statut_in_transit?: boolean
    statut_out_of_delivery?: boolean
    statut_delivered?: boolean
    estimation_livraison?: boolean
    proprietaire_nom?: boolean
    proprietaire_email?: boolean
    proprietaire_telephone?: boolean
    statut_validated?: boolean
    statut_preparing?: boolean
    statut_departure?: boolean
    statut_attente_douane?: boolean
    description_validated?: boolean
    description_preparing?: boolean
    description_departure?: boolean
    description_attente_douane?: boolean
    description_delivered?: boolean
    date_ajout?: boolean
    statut_en_cours_de_reparation?: boolean
    statut_reparation_terminee?: boolean
    prise_rendez_vous_active?: boolean
    description_en_cours_de_reparation?: boolean
    description_reparation_terminee?: boolean
    rendez_vous_date?: boolean
    rendez_vous_statut?: boolean
    details_supplementaires_visible?: boolean
    details_supplementaires?: boolean
    etapes_suivi?: boolean
  }, ExtArgs["result"]["colis"]>



  export type ColisSelectScalar = {
    id?: boolean
    colis_nom?: boolean
    description?: boolean
    date_commande?: boolean
    date_reception?: boolean
    numero_commande?: boolean
    statut_ordered?: boolean
    statut_in_transit?: boolean
    statut_out_of_delivery?: boolean
    statut_delivered?: boolean
    estimation_livraison?: boolean
    proprietaire_nom?: boolean
    proprietaire_email?: boolean
    proprietaire_telephone?: boolean
    statut_validated?: boolean
    statut_preparing?: boolean
    statut_departure?: boolean
    statut_attente_douane?: boolean
    description_validated?: boolean
    description_preparing?: boolean
    description_departure?: boolean
    description_attente_douane?: boolean
    description_delivered?: boolean
    date_ajout?: boolean
    statut_en_cours_de_reparation?: boolean
    statut_reparation_terminee?: boolean
    prise_rendez_vous_active?: boolean
    description_en_cours_de_reparation?: boolean
    description_reparation_terminee?: boolean
    rendez_vous_date?: boolean
    rendez_vous_statut?: boolean
    details_supplementaires_visible?: boolean
    details_supplementaires?: boolean
    etapes_suivi?: boolean
  }

  export type ColisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "colis_nom" | "description" | "date_commande" | "date_reception" | "numero_commande" | "statut_ordered" | "statut_in_transit" | "statut_out_of_delivery" | "statut_delivered" | "estimation_livraison" | "proprietaire_nom" | "proprietaire_email" | "proprietaire_telephone" | "statut_validated" | "statut_preparing" | "statut_departure" | "statut_attente_douane" | "description_validated" | "description_preparing" | "description_departure" | "description_attente_douane" | "description_delivered" | "date_ajout" | "statut_en_cours_de_reparation" | "statut_reparation_terminee" | "prise_rendez_vous_active" | "description_en_cours_de_reparation" | "description_reparation_terminee" | "rendez_vous_date" | "rendez_vous_statut" | "details_supplementaires_visible" | "details_supplementaires" | "etapes_suivi", ExtArgs["result"]["colis"]>

  export type $ColisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Colis"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      colis_nom: string
      description: string
      date_commande: Date
      date_reception: Date
      numero_commande: string
      statut_ordered: boolean
      statut_in_transit: boolean
      statut_out_of_delivery: boolean
      statut_delivered: boolean
      estimation_livraison: Date
      proprietaire_nom: string
      proprietaire_email: string
      proprietaire_telephone: string
      statut_validated: boolean
      statut_preparing: boolean
      statut_departure: boolean
      statut_attente_douane: boolean
      description_validated: string
      description_preparing: string
      description_departure: string
      description_attente_douane: string
      description_delivered: string
      date_ajout: Date
      statut_en_cours_de_reparation: boolean
      statut_reparation_terminee: boolean
      prise_rendez_vous_active: boolean
      description_en_cours_de_reparation: string
      description_reparation_terminee: string
      rendez_vous_date: Date | null
      rendez_vous_statut: string | null
      details_supplementaires_visible: boolean
      details_supplementaires: string | null
      etapes_suivi: string | null
    }, ExtArgs["result"]["colis"]>
    composites: {}
  }

  type ColisGetPayload<S extends boolean | null | undefined | ColisDefaultArgs> = $Result.GetResult<Prisma.$ColisPayload, S>

  type ColisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ColisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ColisCountAggregateInputType | true
    }

  export interface ColisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Colis'], meta: { name: 'Colis' } }
    /**
     * Find zero or one Colis that matches the filter.
     * @param {ColisFindUniqueArgs} args - Arguments to find a Colis
     * @example
     * // Get one Colis
     * const colis = await prisma.colis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColisFindUniqueArgs>(args: SelectSubset<T, ColisFindUniqueArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Colis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ColisFindUniqueOrThrowArgs} args - Arguments to find a Colis
     * @example
     * // Get one Colis
     * const colis = await prisma.colis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColisFindUniqueOrThrowArgs>(args: SelectSubset<T, ColisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Colis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColisFindFirstArgs} args - Arguments to find a Colis
     * @example
     * // Get one Colis
     * const colis = await prisma.colis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColisFindFirstArgs>(args?: SelectSubset<T, ColisFindFirstArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Colis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColisFindFirstOrThrowArgs} args - Arguments to find a Colis
     * @example
     * // Get one Colis
     * const colis = await prisma.colis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColisFindFirstOrThrowArgs>(args?: SelectSubset<T, ColisFindFirstOrThrowArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Colis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Colis
     * const colis = await prisma.colis.findMany()
     * 
     * // Get first 10 Colis
     * const colis = await prisma.colis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const colisWithIdOnly = await prisma.colis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ColisFindManyArgs>(args?: SelectSubset<T, ColisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Colis.
     * @param {ColisCreateArgs} args - Arguments to create a Colis.
     * @example
     * // Create one Colis
     * const Colis = await prisma.colis.create({
     *   data: {
     *     // ... data to create a Colis
     *   }
     * })
     * 
     */
    create<T extends ColisCreateArgs>(args: SelectSubset<T, ColisCreateArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Colis.
     * @param {ColisCreateManyArgs} args - Arguments to create many Colis.
     * @example
     * // Create many Colis
     * const colis = await prisma.colis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ColisCreateManyArgs>(args?: SelectSubset<T, ColisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Colis.
     * @param {ColisDeleteArgs} args - Arguments to delete one Colis.
     * @example
     * // Delete one Colis
     * const Colis = await prisma.colis.delete({
     *   where: {
     *     // ... filter to delete one Colis
     *   }
     * })
     * 
     */
    delete<T extends ColisDeleteArgs>(args: SelectSubset<T, ColisDeleteArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Colis.
     * @param {ColisUpdateArgs} args - Arguments to update one Colis.
     * @example
     * // Update one Colis
     * const colis = await prisma.colis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ColisUpdateArgs>(args: SelectSubset<T, ColisUpdateArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Colis.
     * @param {ColisDeleteManyArgs} args - Arguments to filter Colis to delete.
     * @example
     * // Delete a few Colis
     * const { count } = await prisma.colis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ColisDeleteManyArgs>(args?: SelectSubset<T, ColisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Colis
     * const colis = await prisma.colis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ColisUpdateManyArgs>(args: SelectSubset<T, ColisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Colis.
     * @param {ColisUpsertArgs} args - Arguments to update or create a Colis.
     * @example
     * // Update or create a Colis
     * const colis = await prisma.colis.upsert({
     *   create: {
     *     // ... data to create a Colis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Colis we want to update
     *   }
     * })
     */
    upsert<T extends ColisUpsertArgs>(args: SelectSubset<T, ColisUpsertArgs<ExtArgs>>): Prisma__ColisClient<$Result.GetResult<Prisma.$ColisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Colis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColisCountArgs} args - Arguments to filter Colis to count.
     * @example
     * // Count the number of Colis
     * const count = await prisma.colis.count({
     *   where: {
     *     // ... the filter for the Colis we want to count
     *   }
     * })
    **/
    count<T extends ColisCountArgs>(
      args?: Subset<T, ColisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Colis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ColisAggregateArgs>(args: Subset<T, ColisAggregateArgs>): Prisma.PrismaPromise<GetColisAggregateType<T>>

    /**
     * Group by Colis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColisGroupByArgs} args - Group by arguments.
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
      T extends ColisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ColisGroupByArgs['orderBy'] }
        : { orderBy?: ColisGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ColisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetColisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Colis model
   */
  readonly fields: ColisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Colis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Colis model
   */
  interface ColisFieldRefs {
    readonly id: FieldRef<"Colis", 'Int'>
    readonly colis_nom: FieldRef<"Colis", 'String'>
    readonly description: FieldRef<"Colis", 'String'>
    readonly date_commande: FieldRef<"Colis", 'DateTime'>
    readonly date_reception: FieldRef<"Colis", 'DateTime'>
    readonly numero_commande: FieldRef<"Colis", 'String'>
    readonly statut_ordered: FieldRef<"Colis", 'Boolean'>
    readonly statut_in_transit: FieldRef<"Colis", 'Boolean'>
    readonly statut_out_of_delivery: FieldRef<"Colis", 'Boolean'>
    readonly statut_delivered: FieldRef<"Colis", 'Boolean'>
    readonly estimation_livraison: FieldRef<"Colis", 'DateTime'>
    readonly proprietaire_nom: FieldRef<"Colis", 'String'>
    readonly proprietaire_email: FieldRef<"Colis", 'String'>
    readonly proprietaire_telephone: FieldRef<"Colis", 'String'>
    readonly statut_validated: FieldRef<"Colis", 'Boolean'>
    readonly statut_preparing: FieldRef<"Colis", 'Boolean'>
    readonly statut_departure: FieldRef<"Colis", 'Boolean'>
    readonly statut_attente_douane: FieldRef<"Colis", 'Boolean'>
    readonly description_validated: FieldRef<"Colis", 'String'>
    readonly description_preparing: FieldRef<"Colis", 'String'>
    readonly description_departure: FieldRef<"Colis", 'String'>
    readonly description_attente_douane: FieldRef<"Colis", 'String'>
    readonly description_delivered: FieldRef<"Colis", 'String'>
    readonly date_ajout: FieldRef<"Colis", 'DateTime'>
    readonly statut_en_cours_de_reparation: FieldRef<"Colis", 'Boolean'>
    readonly statut_reparation_terminee: FieldRef<"Colis", 'Boolean'>
    readonly prise_rendez_vous_active: FieldRef<"Colis", 'Boolean'>
    readonly description_en_cours_de_reparation: FieldRef<"Colis", 'String'>
    readonly description_reparation_terminee: FieldRef<"Colis", 'String'>
    readonly rendez_vous_date: FieldRef<"Colis", 'DateTime'>
    readonly rendez_vous_statut: FieldRef<"Colis", 'String'>
    readonly details_supplementaires_visible: FieldRef<"Colis", 'Boolean'>
    readonly details_supplementaires: FieldRef<"Colis", 'String'>
    readonly etapes_suivi: FieldRef<"Colis", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Colis findUnique
   */
  export type ColisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Filter, which Colis to fetch.
     */
    where: ColisWhereUniqueInput
  }

  /**
   * Colis findUniqueOrThrow
   */
  export type ColisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Filter, which Colis to fetch.
     */
    where: ColisWhereUniqueInput
  }

  /**
   * Colis findFirst
   */
  export type ColisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Filter, which Colis to fetch.
     */
    where?: ColisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colis to fetch.
     */
    orderBy?: ColisOrderByWithRelationInput | ColisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colis.
     */
    cursor?: ColisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colis.
     */
    distinct?: ColisScalarFieldEnum | ColisScalarFieldEnum[]
  }

  /**
   * Colis findFirstOrThrow
   */
  export type ColisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Filter, which Colis to fetch.
     */
    where?: ColisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colis to fetch.
     */
    orderBy?: ColisOrderByWithRelationInput | ColisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colis.
     */
    cursor?: ColisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colis.
     */
    distinct?: ColisScalarFieldEnum | ColisScalarFieldEnum[]
  }

  /**
   * Colis findMany
   */
  export type ColisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Filter, which Colis to fetch.
     */
    where?: ColisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colis to fetch.
     */
    orderBy?: ColisOrderByWithRelationInput | ColisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Colis.
     */
    cursor?: ColisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colis.
     */
    skip?: number
    distinct?: ColisScalarFieldEnum | ColisScalarFieldEnum[]
  }

  /**
   * Colis create
   */
  export type ColisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * The data needed to create a Colis.
     */
    data: XOR<ColisCreateInput, ColisUncheckedCreateInput>
  }

  /**
   * Colis createMany
   */
  export type ColisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Colis.
     */
    data: ColisCreateManyInput | ColisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Colis update
   */
  export type ColisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * The data needed to update a Colis.
     */
    data: XOR<ColisUpdateInput, ColisUncheckedUpdateInput>
    /**
     * Choose, which Colis to update.
     */
    where: ColisWhereUniqueInput
  }

  /**
   * Colis updateMany
   */
  export type ColisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Colis.
     */
    data: XOR<ColisUpdateManyMutationInput, ColisUncheckedUpdateManyInput>
    /**
     * Filter which Colis to update
     */
    where?: ColisWhereInput
    /**
     * Limit how many Colis to update.
     */
    limit?: number
  }

  /**
   * Colis upsert
   */
  export type ColisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * The filter to search for the Colis to update in case it exists.
     */
    where: ColisWhereUniqueInput
    /**
     * In case the Colis found by the `where` argument doesn't exist, create a new Colis with this data.
     */
    create: XOR<ColisCreateInput, ColisUncheckedCreateInput>
    /**
     * In case the Colis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ColisUpdateInput, ColisUncheckedUpdateInput>
  }

  /**
   * Colis delete
   */
  export type ColisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
    /**
     * Filter which Colis to delete.
     */
    where: ColisWhereUniqueInput
  }

  /**
   * Colis deleteMany
   */
  export type ColisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Colis to delete
     */
    where?: ColisWhereInput
    /**
     * Limit how many Colis to delete.
     */
    limit?: number
  }

  /**
   * Colis without action
   */
  export type ColisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colis
     */
    select?: ColisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Colis
     */
    omit?: ColisOmit<ExtArgs> | null
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


  export const ColisScalarFieldEnum: {
    id: 'id',
    colis_nom: 'colis_nom',
    description: 'description',
    date_commande: 'date_commande',
    date_reception: 'date_reception',
    numero_commande: 'numero_commande',
    statut_ordered: 'statut_ordered',
    statut_in_transit: 'statut_in_transit',
    statut_out_of_delivery: 'statut_out_of_delivery',
    statut_delivered: 'statut_delivered',
    estimation_livraison: 'estimation_livraison',
    proprietaire_nom: 'proprietaire_nom',
    proprietaire_email: 'proprietaire_email',
    proprietaire_telephone: 'proprietaire_telephone',
    statut_validated: 'statut_validated',
    statut_preparing: 'statut_preparing',
    statut_departure: 'statut_departure',
    statut_attente_douane: 'statut_attente_douane',
    description_validated: 'description_validated',
    description_preparing: 'description_preparing',
    description_departure: 'description_departure',
    description_attente_douane: 'description_attente_douane',
    description_delivered: 'description_delivered',
    date_ajout: 'date_ajout',
    statut_en_cours_de_reparation: 'statut_en_cours_de_reparation',
    statut_reparation_terminee: 'statut_reparation_terminee',
    prise_rendez_vous_active: 'prise_rendez_vous_active',
    description_en_cours_de_reparation: 'description_en_cours_de_reparation',
    description_reparation_terminee: 'description_reparation_terminee',
    rendez_vous_date: 'rendez_vous_date',
    rendez_vous_statut: 'rendez_vous_statut',
    details_supplementaires_visible: 'details_supplementaires_visible',
    details_supplementaires: 'details_supplementaires',
    etapes_suivi: 'etapes_suivi'
  };

  export type ColisScalarFieldEnum = (typeof ColisScalarFieldEnum)[keyof typeof ColisScalarFieldEnum]


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


  export const ColisOrderByRelevanceFieldEnum: {
    colis_nom: 'colis_nom',
    description: 'description',
    numero_commande: 'numero_commande',
    proprietaire_nom: 'proprietaire_nom',
    proprietaire_email: 'proprietaire_email',
    proprietaire_telephone: 'proprietaire_telephone',
    description_validated: 'description_validated',
    description_preparing: 'description_preparing',
    description_departure: 'description_departure',
    description_attente_douane: 'description_attente_douane',
    description_delivered: 'description_delivered',
    description_en_cours_de_reparation: 'description_en_cours_de_reparation',
    description_reparation_terminee: 'description_reparation_terminee',
    rendez_vous_statut: 'rendez_vous_statut',
    details_supplementaires: 'details_supplementaires',
    etapes_suivi: 'etapes_suivi'
  };

  export type ColisOrderByRelevanceFieldEnum = (typeof ColisOrderByRelevanceFieldEnum)[keyof typeof ColisOrderByRelevanceFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ColisWhereInput = {
    AND?: ColisWhereInput | ColisWhereInput[]
    OR?: ColisWhereInput[]
    NOT?: ColisWhereInput | ColisWhereInput[]
    id?: IntFilter<"Colis"> | number
    colis_nom?: StringFilter<"Colis"> | string
    description?: StringFilter<"Colis"> | string
    date_commande?: DateTimeFilter<"Colis"> | Date | string
    date_reception?: DateTimeFilter<"Colis"> | Date | string
    numero_commande?: StringFilter<"Colis"> | string
    statut_ordered?: BoolFilter<"Colis"> | boolean
    statut_in_transit?: BoolFilter<"Colis"> | boolean
    statut_out_of_delivery?: BoolFilter<"Colis"> | boolean
    statut_delivered?: BoolFilter<"Colis"> | boolean
    estimation_livraison?: DateTimeFilter<"Colis"> | Date | string
    proprietaire_nom?: StringFilter<"Colis"> | string
    proprietaire_email?: StringFilter<"Colis"> | string
    proprietaire_telephone?: StringFilter<"Colis"> | string
    statut_validated?: BoolFilter<"Colis"> | boolean
    statut_preparing?: BoolFilter<"Colis"> | boolean
    statut_departure?: BoolFilter<"Colis"> | boolean
    statut_attente_douane?: BoolFilter<"Colis"> | boolean
    description_validated?: StringFilter<"Colis"> | string
    description_preparing?: StringFilter<"Colis"> | string
    description_departure?: StringFilter<"Colis"> | string
    description_attente_douane?: StringFilter<"Colis"> | string
    description_delivered?: StringFilter<"Colis"> | string
    date_ajout?: DateTimeFilter<"Colis"> | Date | string
    statut_en_cours_de_reparation?: BoolFilter<"Colis"> | boolean
    statut_reparation_terminee?: BoolFilter<"Colis"> | boolean
    prise_rendez_vous_active?: BoolFilter<"Colis"> | boolean
    description_en_cours_de_reparation?: StringFilter<"Colis"> | string
    description_reparation_terminee?: StringFilter<"Colis"> | string
    rendez_vous_date?: DateTimeNullableFilter<"Colis"> | Date | string | null
    rendez_vous_statut?: StringNullableFilter<"Colis"> | string | null
    details_supplementaires_visible?: BoolFilter<"Colis"> | boolean
    details_supplementaires?: StringNullableFilter<"Colis"> | string | null
    etapes_suivi?: StringNullableFilter<"Colis"> | string | null
  }

  export type ColisOrderByWithRelationInput = {
    id?: SortOrder
    colis_nom?: SortOrder
    description?: SortOrder
    date_commande?: SortOrder
    date_reception?: SortOrder
    numero_commande?: SortOrder
    statut_ordered?: SortOrder
    statut_in_transit?: SortOrder
    statut_out_of_delivery?: SortOrder
    statut_delivered?: SortOrder
    estimation_livraison?: SortOrder
    proprietaire_nom?: SortOrder
    proprietaire_email?: SortOrder
    proprietaire_telephone?: SortOrder
    statut_validated?: SortOrder
    statut_preparing?: SortOrder
    statut_departure?: SortOrder
    statut_attente_douane?: SortOrder
    description_validated?: SortOrder
    description_preparing?: SortOrder
    description_departure?: SortOrder
    description_attente_douane?: SortOrder
    description_delivered?: SortOrder
    date_ajout?: SortOrder
    statut_en_cours_de_reparation?: SortOrder
    statut_reparation_terminee?: SortOrder
    prise_rendez_vous_active?: SortOrder
    description_en_cours_de_reparation?: SortOrder
    description_reparation_terminee?: SortOrder
    rendez_vous_date?: SortOrderInput | SortOrder
    rendez_vous_statut?: SortOrderInput | SortOrder
    details_supplementaires_visible?: SortOrder
    details_supplementaires?: SortOrderInput | SortOrder
    etapes_suivi?: SortOrderInput | SortOrder
    _relevance?: ColisOrderByRelevanceInput
  }

  export type ColisWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ColisWhereInput | ColisWhereInput[]
    OR?: ColisWhereInput[]
    NOT?: ColisWhereInput | ColisWhereInput[]
    colis_nom?: StringFilter<"Colis"> | string
    description?: StringFilter<"Colis"> | string
    date_commande?: DateTimeFilter<"Colis"> | Date | string
    date_reception?: DateTimeFilter<"Colis"> | Date | string
    numero_commande?: StringFilter<"Colis"> | string
    statut_ordered?: BoolFilter<"Colis"> | boolean
    statut_in_transit?: BoolFilter<"Colis"> | boolean
    statut_out_of_delivery?: BoolFilter<"Colis"> | boolean
    statut_delivered?: BoolFilter<"Colis"> | boolean
    estimation_livraison?: DateTimeFilter<"Colis"> | Date | string
    proprietaire_nom?: StringFilter<"Colis"> | string
    proprietaire_email?: StringFilter<"Colis"> | string
    proprietaire_telephone?: StringFilter<"Colis"> | string
    statut_validated?: BoolFilter<"Colis"> | boolean
    statut_preparing?: BoolFilter<"Colis"> | boolean
    statut_departure?: BoolFilter<"Colis"> | boolean
    statut_attente_douane?: BoolFilter<"Colis"> | boolean
    description_validated?: StringFilter<"Colis"> | string
    description_preparing?: StringFilter<"Colis"> | string
    description_departure?: StringFilter<"Colis"> | string
    description_attente_douane?: StringFilter<"Colis"> | string
    description_delivered?: StringFilter<"Colis"> | string
    date_ajout?: DateTimeFilter<"Colis"> | Date | string
    statut_en_cours_de_reparation?: BoolFilter<"Colis"> | boolean
    statut_reparation_terminee?: BoolFilter<"Colis"> | boolean
    prise_rendez_vous_active?: BoolFilter<"Colis"> | boolean
    description_en_cours_de_reparation?: StringFilter<"Colis"> | string
    description_reparation_terminee?: StringFilter<"Colis"> | string
    rendez_vous_date?: DateTimeNullableFilter<"Colis"> | Date | string | null
    rendez_vous_statut?: StringNullableFilter<"Colis"> | string | null
    details_supplementaires_visible?: BoolFilter<"Colis"> | boolean
    details_supplementaires?: StringNullableFilter<"Colis"> | string | null
    etapes_suivi?: StringNullableFilter<"Colis"> | string | null
  }, "id">

  export type ColisOrderByWithAggregationInput = {
    id?: SortOrder
    colis_nom?: SortOrder
    description?: SortOrder
    date_commande?: SortOrder
    date_reception?: SortOrder
    numero_commande?: SortOrder
    statut_ordered?: SortOrder
    statut_in_transit?: SortOrder
    statut_out_of_delivery?: SortOrder
    statut_delivered?: SortOrder
    estimation_livraison?: SortOrder
    proprietaire_nom?: SortOrder
    proprietaire_email?: SortOrder
    proprietaire_telephone?: SortOrder
    statut_validated?: SortOrder
    statut_preparing?: SortOrder
    statut_departure?: SortOrder
    statut_attente_douane?: SortOrder
    description_validated?: SortOrder
    description_preparing?: SortOrder
    description_departure?: SortOrder
    description_attente_douane?: SortOrder
    description_delivered?: SortOrder
    date_ajout?: SortOrder
    statut_en_cours_de_reparation?: SortOrder
    statut_reparation_terminee?: SortOrder
    prise_rendez_vous_active?: SortOrder
    description_en_cours_de_reparation?: SortOrder
    description_reparation_terminee?: SortOrder
    rendez_vous_date?: SortOrderInput | SortOrder
    rendez_vous_statut?: SortOrderInput | SortOrder
    details_supplementaires_visible?: SortOrder
    details_supplementaires?: SortOrderInput | SortOrder
    etapes_suivi?: SortOrderInput | SortOrder
    _count?: ColisCountOrderByAggregateInput
    _avg?: ColisAvgOrderByAggregateInput
    _max?: ColisMaxOrderByAggregateInput
    _min?: ColisMinOrderByAggregateInput
    _sum?: ColisSumOrderByAggregateInput
  }

  export type ColisScalarWhereWithAggregatesInput = {
    AND?: ColisScalarWhereWithAggregatesInput | ColisScalarWhereWithAggregatesInput[]
    OR?: ColisScalarWhereWithAggregatesInput[]
    NOT?: ColisScalarWhereWithAggregatesInput | ColisScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Colis"> | number
    colis_nom?: StringWithAggregatesFilter<"Colis"> | string
    description?: StringWithAggregatesFilter<"Colis"> | string
    date_commande?: DateTimeWithAggregatesFilter<"Colis"> | Date | string
    date_reception?: DateTimeWithAggregatesFilter<"Colis"> | Date | string
    numero_commande?: StringWithAggregatesFilter<"Colis"> | string
    statut_ordered?: BoolWithAggregatesFilter<"Colis"> | boolean
    statut_in_transit?: BoolWithAggregatesFilter<"Colis"> | boolean
    statut_out_of_delivery?: BoolWithAggregatesFilter<"Colis"> | boolean
    statut_delivered?: BoolWithAggregatesFilter<"Colis"> | boolean
    estimation_livraison?: DateTimeWithAggregatesFilter<"Colis"> | Date | string
    proprietaire_nom?: StringWithAggregatesFilter<"Colis"> | string
    proprietaire_email?: StringWithAggregatesFilter<"Colis"> | string
    proprietaire_telephone?: StringWithAggregatesFilter<"Colis"> | string
    statut_validated?: BoolWithAggregatesFilter<"Colis"> | boolean
    statut_preparing?: BoolWithAggregatesFilter<"Colis"> | boolean
    statut_departure?: BoolWithAggregatesFilter<"Colis"> | boolean
    statut_attente_douane?: BoolWithAggregatesFilter<"Colis"> | boolean
    description_validated?: StringWithAggregatesFilter<"Colis"> | string
    description_preparing?: StringWithAggregatesFilter<"Colis"> | string
    description_departure?: StringWithAggregatesFilter<"Colis"> | string
    description_attente_douane?: StringWithAggregatesFilter<"Colis"> | string
    description_delivered?: StringWithAggregatesFilter<"Colis"> | string
    date_ajout?: DateTimeWithAggregatesFilter<"Colis"> | Date | string
    statut_en_cours_de_reparation?: BoolWithAggregatesFilter<"Colis"> | boolean
    statut_reparation_terminee?: BoolWithAggregatesFilter<"Colis"> | boolean
    prise_rendez_vous_active?: BoolWithAggregatesFilter<"Colis"> | boolean
    description_en_cours_de_reparation?: StringWithAggregatesFilter<"Colis"> | string
    description_reparation_terminee?: StringWithAggregatesFilter<"Colis"> | string
    rendez_vous_date?: DateTimeNullableWithAggregatesFilter<"Colis"> | Date | string | null
    rendez_vous_statut?: StringNullableWithAggregatesFilter<"Colis"> | string | null
    details_supplementaires_visible?: BoolWithAggregatesFilter<"Colis"> | boolean
    details_supplementaires?: StringNullableWithAggregatesFilter<"Colis"> | string | null
    etapes_suivi?: StringNullableWithAggregatesFilter<"Colis"> | string | null
  }

  export type ColisCreateInput = {
    colis_nom: string
    description: string
    date_commande: Date | string
    date_reception: Date | string
    numero_commande: string
    statut_ordered?: boolean
    statut_in_transit?: boolean
    statut_out_of_delivery?: boolean
    statut_delivered?: boolean
    estimation_livraison: Date | string
    proprietaire_nom: string
    proprietaire_email: string
    proprietaire_telephone: string
    statut_validated?: boolean
    statut_preparing?: boolean
    statut_departure?: boolean
    statut_attente_douane?: boolean
    description_validated: string
    description_preparing: string
    description_departure: string
    description_attente_douane: string
    description_delivered: string
    date_ajout: Date | string
    statut_en_cours_de_reparation?: boolean
    statut_reparation_terminee?: boolean
    prise_rendez_vous_active?: boolean
    description_en_cours_de_reparation: string
    description_reparation_terminee: string
    rendez_vous_date?: Date | string | null
    rendez_vous_statut?: string | null
    details_supplementaires_visible?: boolean
    details_supplementaires?: string | null
    etapes_suivi?: string | null
  }

  export type ColisUncheckedCreateInput = {
    id?: number
    colis_nom: string
    description: string
    date_commande: Date | string
    date_reception: Date | string
    numero_commande: string
    statut_ordered?: boolean
    statut_in_transit?: boolean
    statut_out_of_delivery?: boolean
    statut_delivered?: boolean
    estimation_livraison: Date | string
    proprietaire_nom: string
    proprietaire_email: string
    proprietaire_telephone: string
    statut_validated?: boolean
    statut_preparing?: boolean
    statut_departure?: boolean
    statut_attente_douane?: boolean
    description_validated: string
    description_preparing: string
    description_departure: string
    description_attente_douane: string
    description_delivered: string
    date_ajout: Date | string
    statut_en_cours_de_reparation?: boolean
    statut_reparation_terminee?: boolean
    prise_rendez_vous_active?: boolean
    description_en_cours_de_reparation: string
    description_reparation_terminee: string
    rendez_vous_date?: Date | string | null
    rendez_vous_statut?: string | null
    details_supplementaires_visible?: boolean
    details_supplementaires?: string | null
    etapes_suivi?: string | null
  }

  export type ColisUpdateInput = {
    colis_nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date_commande?: DateTimeFieldUpdateOperationsInput | Date | string
    date_reception?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_commande?: StringFieldUpdateOperationsInput | string
    statut_ordered?: BoolFieldUpdateOperationsInput | boolean
    statut_in_transit?: BoolFieldUpdateOperationsInput | boolean
    statut_out_of_delivery?: BoolFieldUpdateOperationsInput | boolean
    statut_delivered?: BoolFieldUpdateOperationsInput | boolean
    estimation_livraison?: DateTimeFieldUpdateOperationsInput | Date | string
    proprietaire_nom?: StringFieldUpdateOperationsInput | string
    proprietaire_email?: StringFieldUpdateOperationsInput | string
    proprietaire_telephone?: StringFieldUpdateOperationsInput | string
    statut_validated?: BoolFieldUpdateOperationsInput | boolean
    statut_preparing?: BoolFieldUpdateOperationsInput | boolean
    statut_departure?: BoolFieldUpdateOperationsInput | boolean
    statut_attente_douane?: BoolFieldUpdateOperationsInput | boolean
    description_validated?: StringFieldUpdateOperationsInput | string
    description_preparing?: StringFieldUpdateOperationsInput | string
    description_departure?: StringFieldUpdateOperationsInput | string
    description_attente_douane?: StringFieldUpdateOperationsInput | string
    description_delivered?: StringFieldUpdateOperationsInput | string
    date_ajout?: DateTimeFieldUpdateOperationsInput | Date | string
    statut_en_cours_de_reparation?: BoolFieldUpdateOperationsInput | boolean
    statut_reparation_terminee?: BoolFieldUpdateOperationsInput | boolean
    prise_rendez_vous_active?: BoolFieldUpdateOperationsInput | boolean
    description_en_cours_de_reparation?: StringFieldUpdateOperationsInput | string
    description_reparation_terminee?: StringFieldUpdateOperationsInput | string
    rendez_vous_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rendez_vous_statut?: NullableStringFieldUpdateOperationsInput | string | null
    details_supplementaires_visible?: BoolFieldUpdateOperationsInput | boolean
    details_supplementaires?: NullableStringFieldUpdateOperationsInput | string | null
    etapes_suivi?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ColisUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    colis_nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date_commande?: DateTimeFieldUpdateOperationsInput | Date | string
    date_reception?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_commande?: StringFieldUpdateOperationsInput | string
    statut_ordered?: BoolFieldUpdateOperationsInput | boolean
    statut_in_transit?: BoolFieldUpdateOperationsInput | boolean
    statut_out_of_delivery?: BoolFieldUpdateOperationsInput | boolean
    statut_delivered?: BoolFieldUpdateOperationsInput | boolean
    estimation_livraison?: DateTimeFieldUpdateOperationsInput | Date | string
    proprietaire_nom?: StringFieldUpdateOperationsInput | string
    proprietaire_email?: StringFieldUpdateOperationsInput | string
    proprietaire_telephone?: StringFieldUpdateOperationsInput | string
    statut_validated?: BoolFieldUpdateOperationsInput | boolean
    statut_preparing?: BoolFieldUpdateOperationsInput | boolean
    statut_departure?: BoolFieldUpdateOperationsInput | boolean
    statut_attente_douane?: BoolFieldUpdateOperationsInput | boolean
    description_validated?: StringFieldUpdateOperationsInput | string
    description_preparing?: StringFieldUpdateOperationsInput | string
    description_departure?: StringFieldUpdateOperationsInput | string
    description_attente_douane?: StringFieldUpdateOperationsInput | string
    description_delivered?: StringFieldUpdateOperationsInput | string
    date_ajout?: DateTimeFieldUpdateOperationsInput | Date | string
    statut_en_cours_de_reparation?: BoolFieldUpdateOperationsInput | boolean
    statut_reparation_terminee?: BoolFieldUpdateOperationsInput | boolean
    prise_rendez_vous_active?: BoolFieldUpdateOperationsInput | boolean
    description_en_cours_de_reparation?: StringFieldUpdateOperationsInput | string
    description_reparation_terminee?: StringFieldUpdateOperationsInput | string
    rendez_vous_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rendez_vous_statut?: NullableStringFieldUpdateOperationsInput | string | null
    details_supplementaires_visible?: BoolFieldUpdateOperationsInput | boolean
    details_supplementaires?: NullableStringFieldUpdateOperationsInput | string | null
    etapes_suivi?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ColisCreateManyInput = {
    id?: number
    colis_nom: string
    description: string
    date_commande: Date | string
    date_reception: Date | string
    numero_commande: string
    statut_ordered?: boolean
    statut_in_transit?: boolean
    statut_out_of_delivery?: boolean
    statut_delivered?: boolean
    estimation_livraison: Date | string
    proprietaire_nom: string
    proprietaire_email: string
    proprietaire_telephone: string
    statut_validated?: boolean
    statut_preparing?: boolean
    statut_departure?: boolean
    statut_attente_douane?: boolean
    description_validated: string
    description_preparing: string
    description_departure: string
    description_attente_douane: string
    description_delivered: string
    date_ajout: Date | string
    statut_en_cours_de_reparation?: boolean
    statut_reparation_terminee?: boolean
    prise_rendez_vous_active?: boolean
    description_en_cours_de_reparation: string
    description_reparation_terminee: string
    rendez_vous_date?: Date | string | null
    rendez_vous_statut?: string | null
    details_supplementaires_visible?: boolean
    details_supplementaires?: string | null
    etapes_suivi?: string | null
  }

  export type ColisUpdateManyMutationInput = {
    colis_nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date_commande?: DateTimeFieldUpdateOperationsInput | Date | string
    date_reception?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_commande?: StringFieldUpdateOperationsInput | string
    statut_ordered?: BoolFieldUpdateOperationsInput | boolean
    statut_in_transit?: BoolFieldUpdateOperationsInput | boolean
    statut_out_of_delivery?: BoolFieldUpdateOperationsInput | boolean
    statut_delivered?: BoolFieldUpdateOperationsInput | boolean
    estimation_livraison?: DateTimeFieldUpdateOperationsInput | Date | string
    proprietaire_nom?: StringFieldUpdateOperationsInput | string
    proprietaire_email?: StringFieldUpdateOperationsInput | string
    proprietaire_telephone?: StringFieldUpdateOperationsInput | string
    statut_validated?: BoolFieldUpdateOperationsInput | boolean
    statut_preparing?: BoolFieldUpdateOperationsInput | boolean
    statut_departure?: BoolFieldUpdateOperationsInput | boolean
    statut_attente_douane?: BoolFieldUpdateOperationsInput | boolean
    description_validated?: StringFieldUpdateOperationsInput | string
    description_preparing?: StringFieldUpdateOperationsInput | string
    description_departure?: StringFieldUpdateOperationsInput | string
    description_attente_douane?: StringFieldUpdateOperationsInput | string
    description_delivered?: StringFieldUpdateOperationsInput | string
    date_ajout?: DateTimeFieldUpdateOperationsInput | Date | string
    statut_en_cours_de_reparation?: BoolFieldUpdateOperationsInput | boolean
    statut_reparation_terminee?: BoolFieldUpdateOperationsInput | boolean
    prise_rendez_vous_active?: BoolFieldUpdateOperationsInput | boolean
    description_en_cours_de_reparation?: StringFieldUpdateOperationsInput | string
    description_reparation_terminee?: StringFieldUpdateOperationsInput | string
    rendez_vous_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rendez_vous_statut?: NullableStringFieldUpdateOperationsInput | string | null
    details_supplementaires_visible?: BoolFieldUpdateOperationsInput | boolean
    details_supplementaires?: NullableStringFieldUpdateOperationsInput | string | null
    etapes_suivi?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ColisUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    colis_nom?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date_commande?: DateTimeFieldUpdateOperationsInput | Date | string
    date_reception?: DateTimeFieldUpdateOperationsInput | Date | string
    numero_commande?: StringFieldUpdateOperationsInput | string
    statut_ordered?: BoolFieldUpdateOperationsInput | boolean
    statut_in_transit?: BoolFieldUpdateOperationsInput | boolean
    statut_out_of_delivery?: BoolFieldUpdateOperationsInput | boolean
    statut_delivered?: BoolFieldUpdateOperationsInput | boolean
    estimation_livraison?: DateTimeFieldUpdateOperationsInput | Date | string
    proprietaire_nom?: StringFieldUpdateOperationsInput | string
    proprietaire_email?: StringFieldUpdateOperationsInput | string
    proprietaire_telephone?: StringFieldUpdateOperationsInput | string
    statut_validated?: BoolFieldUpdateOperationsInput | boolean
    statut_preparing?: BoolFieldUpdateOperationsInput | boolean
    statut_departure?: BoolFieldUpdateOperationsInput | boolean
    statut_attente_douane?: BoolFieldUpdateOperationsInput | boolean
    description_validated?: StringFieldUpdateOperationsInput | string
    description_preparing?: StringFieldUpdateOperationsInput | string
    description_departure?: StringFieldUpdateOperationsInput | string
    description_attente_douane?: StringFieldUpdateOperationsInput | string
    description_delivered?: StringFieldUpdateOperationsInput | string
    date_ajout?: DateTimeFieldUpdateOperationsInput | Date | string
    statut_en_cours_de_reparation?: BoolFieldUpdateOperationsInput | boolean
    statut_reparation_terminee?: BoolFieldUpdateOperationsInput | boolean
    prise_rendez_vous_active?: BoolFieldUpdateOperationsInput | boolean
    description_en_cours_de_reparation?: StringFieldUpdateOperationsInput | string
    description_reparation_terminee?: StringFieldUpdateOperationsInput | string
    rendez_vous_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rendez_vous_statut?: NullableStringFieldUpdateOperationsInput | string | null
    details_supplementaires_visible?: BoolFieldUpdateOperationsInput | boolean
    details_supplementaires?: NullableStringFieldUpdateOperationsInput | string | null
    etapes_suivi?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ColisOrderByRelevanceInput = {
    fields: ColisOrderByRelevanceFieldEnum | ColisOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ColisCountOrderByAggregateInput = {
    id?: SortOrder
    colis_nom?: SortOrder
    description?: SortOrder
    date_commande?: SortOrder
    date_reception?: SortOrder
    numero_commande?: SortOrder
    statut_ordered?: SortOrder
    statut_in_transit?: SortOrder
    statut_out_of_delivery?: SortOrder
    statut_delivered?: SortOrder
    estimation_livraison?: SortOrder
    proprietaire_nom?: SortOrder
    proprietaire_email?: SortOrder
    proprietaire_telephone?: SortOrder
    statut_validated?: SortOrder
    statut_preparing?: SortOrder
    statut_departure?: SortOrder
    statut_attente_douane?: SortOrder
    description_validated?: SortOrder
    description_preparing?: SortOrder
    description_departure?: SortOrder
    description_attente_douane?: SortOrder
    description_delivered?: SortOrder
    date_ajout?: SortOrder
    statut_en_cours_de_reparation?: SortOrder
    statut_reparation_terminee?: SortOrder
    prise_rendez_vous_active?: SortOrder
    description_en_cours_de_reparation?: SortOrder
    description_reparation_terminee?: SortOrder
    rendez_vous_date?: SortOrder
    rendez_vous_statut?: SortOrder
    details_supplementaires_visible?: SortOrder
    details_supplementaires?: SortOrder
    etapes_suivi?: SortOrder
  }

  export type ColisAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ColisMaxOrderByAggregateInput = {
    id?: SortOrder
    colis_nom?: SortOrder
    description?: SortOrder
    date_commande?: SortOrder
    date_reception?: SortOrder
    numero_commande?: SortOrder
    statut_ordered?: SortOrder
    statut_in_transit?: SortOrder
    statut_out_of_delivery?: SortOrder
    statut_delivered?: SortOrder
    estimation_livraison?: SortOrder
    proprietaire_nom?: SortOrder
    proprietaire_email?: SortOrder
    proprietaire_telephone?: SortOrder
    statut_validated?: SortOrder
    statut_preparing?: SortOrder
    statut_departure?: SortOrder
    statut_attente_douane?: SortOrder
    description_validated?: SortOrder
    description_preparing?: SortOrder
    description_departure?: SortOrder
    description_attente_douane?: SortOrder
    description_delivered?: SortOrder
    date_ajout?: SortOrder
    statut_en_cours_de_reparation?: SortOrder
    statut_reparation_terminee?: SortOrder
    prise_rendez_vous_active?: SortOrder
    description_en_cours_de_reparation?: SortOrder
    description_reparation_terminee?: SortOrder
    rendez_vous_date?: SortOrder
    rendez_vous_statut?: SortOrder
    details_supplementaires_visible?: SortOrder
    details_supplementaires?: SortOrder
    etapes_suivi?: SortOrder
  }

  export type ColisMinOrderByAggregateInput = {
    id?: SortOrder
    colis_nom?: SortOrder
    description?: SortOrder
    date_commande?: SortOrder
    date_reception?: SortOrder
    numero_commande?: SortOrder
    statut_ordered?: SortOrder
    statut_in_transit?: SortOrder
    statut_out_of_delivery?: SortOrder
    statut_delivered?: SortOrder
    estimation_livraison?: SortOrder
    proprietaire_nom?: SortOrder
    proprietaire_email?: SortOrder
    proprietaire_telephone?: SortOrder
    statut_validated?: SortOrder
    statut_preparing?: SortOrder
    statut_departure?: SortOrder
    statut_attente_douane?: SortOrder
    description_validated?: SortOrder
    description_preparing?: SortOrder
    description_departure?: SortOrder
    description_attente_douane?: SortOrder
    description_delivered?: SortOrder
    date_ajout?: SortOrder
    statut_en_cours_de_reparation?: SortOrder
    statut_reparation_terminee?: SortOrder
    prise_rendez_vous_active?: SortOrder
    description_en_cours_de_reparation?: SortOrder
    description_reparation_terminee?: SortOrder
    rendez_vous_date?: SortOrder
    rendez_vous_statut?: SortOrder
    details_supplementaires_visible?: SortOrder
    details_supplementaires?: SortOrder
    etapes_suivi?: SortOrder
  }

  export type ColisSumOrderByAggregateInput = {
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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