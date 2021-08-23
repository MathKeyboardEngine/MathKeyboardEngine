import { KeyboardMemory } from "../../../KeyboardEngine/KeyboardMemory";
import { LatexConfiguration } from "../../../LatexConfiguration";
import { Placeholder } from "../../Placeholder/Placeholder";
import { BranchingNode } from "../Base/BranchingNode";

export class MatrixNode extends BranchingNode {
    readonly MatrixType : string;
    readonly Grid : Placeholder[][];
    
    constructor(args : { matrixType: string, height : number, width : number }) {
        let grid : Placeholder[][] = [];
        let leftToRight : Placeholder[] = [];
        for(let i = 0; i < args.height; i++){
            let row : Placeholder[] = [];
            for (let j = 0; j < args.width; j++){
                let placeholder = new Placeholder();
                row.push(placeholder);
                leftToRight.push(placeholder);
            }
            grid.push(row);
        }
        super(leftToRight);
        for(let placeholder of leftToRight){
            placeholder.ParentNode = this;
        }
        this.Grid = grid;
        this.MatrixType = args.matrixType;
    }

    override getLatexPart(keyboardMemory : KeyboardMemory, latexConfiguration: LatexConfiguration): string {
        let latex = String.raw`\begin{${this.MatrixType}}`;
        latex += this.Grid.map(row => row.map(placeholder => placeholder.getLatex(keyboardMemory, latexConfiguration)).join(' & ')).join(String.raw` \\ `);
        latex += String.raw`\end{${this.MatrixType}}`;
        return latex;
    }
    
    override GetMoveDownSuggestion(current : Placeholder) : Placeholder | null {
        let {rowNumber, indexInRow } = this.GetPositionOf(current);
        if (rowNumber + 1 < this.Grid.length){
            return this.Grid[rowNumber + 1][indexInRow];
        } else {
            return null;
        }
    }
    
    override GetMoveUpSuggestion(current : Placeholder) : Placeholder | null {
        let {rowNumber, indexInRow } = this.GetPositionOf(current);
        if (rowNumber - 1 >= 0){
            return this.Grid[rowNumber - 1][indexInRow];
        } else {
            return null;
        }
    }

    private GetPositionOf(placeholder : Placeholder) : { rowNumber:number, indexInRow:number } {
        for (let rowNumber = 0; rowNumber < this.Grid.length; rowNumber++) {
            let row = this.Grid[rowNumber];
            for (let indexInRow = 0; indexInRow < row.length; indexInRow++) {
                if (row[indexInRow] === placeholder){
                    return { rowNumber, indexInRow};
                }
            }
        }
        throw "The provided placeholder is not part of the Grid.";
    }
}