import { Struct, createStructFactory } from "aerial-common2";

export const CACHED_FILE = "CACHED_FILE";

/**
 * Cache for files so that the dependency graph doesn't go back to the 
 * source when the sandbox re-evaluates. The file watcher will make sure that this is up to date. 
 */

export type CachedFile = {

  /**
   * the source file of the cached item
   */

  sourceUri: string;

  /**
   * the file cache mime type
   */
  type: string;

  /**
   */

  content: Buffer;

  /**
   */

  updatedAt: Date;
} & Struct;

export type FileCache = {
  allFiles: {
    [identifier: string]: CachedFile
  }
}

export const createCachedFile = createStructFactory(CACHED_FILE);