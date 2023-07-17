type Person = {
  name: string
  age: number
}

/**取其中了类型
 * Pick 可以从一个对象类型中 取出某些属性
 */
type PickPerson = Pick<Person, 'age'>
// PickPerson === { age: string }

/**排除
 * Omit 可以从一个对象类型中 排出某些属性
 */
type OmitPerson = Omit<Person, 'age'>
// OmitPerson === { name: string }
