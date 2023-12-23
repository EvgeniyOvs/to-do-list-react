export function pipe<U>(...fns: Function[]) {
    return <E, >(initialValue: any) =>
        fns.reduce((previousValue, fn) => fn(previousValue), initialValue);
}

