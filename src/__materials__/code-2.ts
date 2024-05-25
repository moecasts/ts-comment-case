// @ts-nocheck
export const var1 = 1; // This is a comment of var1

// This is a comment of var2
export const var2 = 2;

export type Type = string; // this is a comment of Type

// This is a comment before Interface
export interface Interface {
  // This is a comment after Interface

  type: Type; // this is a comment of type
}

// This is a comment of function test
export function test() {
  // This is a comment before Interface
  interface InnerInterface {
    // This is a comment after Interface

    type: Type; // this is a comment of type
  }

  type InnerType = string; // this is a comment of InnerType

  true && false; // this is a comment of InnerType

  // eslint-disable-next-line
  const a,
    b = 1 && false; // this is a comment of InnerType

  type InnerTypeA = string;
  type InnerTypeB = string; // this is a comment of InnerType

  // This is a comment of console
  console.log('test');
}
