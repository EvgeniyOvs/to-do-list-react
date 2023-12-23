
export function compose<U>(...fns: Function[]){
    return <E,>(initialValue: any) =>
        fns.reduceRight((previousValue, fn)=> fn(previousValue), initialValue);
}
