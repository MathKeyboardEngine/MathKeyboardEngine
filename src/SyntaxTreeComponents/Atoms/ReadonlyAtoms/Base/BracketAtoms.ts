import { ReadonlyAtom } from "../../Base/ReadonlyAtom";

export abstract class AbstractBracketLeftAtom extends ReadonlyAtom {}
export abstract class AbstractBracketRightAtom extends ReadonlyAtom {}
export abstract class AbstractRoundBracketLeftAtom extends AbstractBracketLeftAtom {}
export abstract class AbstractRoundBracketRightAtom extends AbstractBracketRightAtom {}