/** shows an error if the name is not a member of the type (force to keep test descriptions up to date) */
export function nameof<T>(name: keyof T): string {
  return name.toString();
}
