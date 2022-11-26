/**
 * A basic representation of a dictionary.
 */
export type Dictionary<T> = {
  /**
   * An indexer property, indexed by string, returning type of T.
   */
  [key: string]: T;
};

/**
 * A key-value pair.
 */
export type KeyValuePair = {
  /**
   * The key.
   */
  key: string;

  /**
   * The value.
   */
  value: string;
};
