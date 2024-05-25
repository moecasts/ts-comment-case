/**
 * This is an interface called Test.
 */
/**
 * JSDoc comment 1
 * @description this is a JSDoc comment description
 */
// This is an interface called Test.
// @description this is a description.
// "double quote"
export interface Test {
  /**
   * this is an interface prop called name.
   */
  name: string;

  // this is an interface prop called age.
  // @description this is a description.
  age: number;
}

/**
 * JSDoc comment 1
 * @description this is a JSDoc comment description
 */
/**
 * JSDoc comment 2
 * @description this is a JSDoc comment description
 */
export const jsdoc = () => {
  // Single line comment
  const singleLineComment = 'singleLineComment'; // inline comment

  /*
   * Block line comment
   */
  const blockLineComment = 'blockLineComment'; // inline comment

  /**
   * inner JSDoc comment
   *
   * @description this is a JSDoc comment description
   */
  const innerJSDocComment = 'innerJSDocComment'; // inline comment

  // Multi line comment
  // Multi line comment
  console.log({
    singleLineComment,
    blockLineComment,
    innerJSDocComment,
  });
};
