interface Block {
    id:number,
    row:number,
    start:number,
    length:number,
    color:string,
    tag: string
}

interface Tile {
    block:Block,
    first:boolean,
    color:string,
    striped:boolean,
    tag: string
}