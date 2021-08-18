// src/GetLatex/GetEditModeLatex.ts
function GetEditModeLatex(keyboardMemory, latexConfiguration) {
  return keyboardMemory.SyntaxTreeRoot.getLatex(keyboardMemory, latexConfiguration);
}

// src/SyntaxTreeComponents/Placeholder/Placeholder.ts
var Placeholder = class {
  constructor() {
    this.ParentAtom = null;
    this.Atoms = [];
  }
  getLatex(keyboardMemory, latexConfiguration) {
    if (keyboardMemory.InclusiveSelectionLeftBorder === this) {
      return latexConfiguration.selectionHightlightStart + this.Atoms.map((atom) => atom.getLatex(keyboardMemory, latexConfiguration)).join("");
    } else if (this === keyboardMemory.Current) {
      if (this.Atoms.length == 0) {
        return latexConfiguration.activePlaceholderLatex;
      } else {
        return latexConfiguration.activePlaceholderLatex + this.Atoms.map((atom) => atom.getLatex(keyboardMemory, latexConfiguration)).join("");
      }
    } else if (this.Atoms.length == 0) {
      return latexConfiguration.passivePlaceholderLatex;
    } else {
      return this.Atoms.map((atom) => atom.getLatex(keyboardMemory, latexConfiguration)).join("");
    }
  }
};

// src/KeyboardEngine/KeyboardMemory.ts
var KeyboardMemory = class {
  constructor() {
    this.SyntaxTreeRoot = new Placeholder();
    this.Current = this.SyntaxTreeRoot;
    this.SelectionDiff = null;
    this.InclusiveSelectionRightBorder = null;
    this.InclusiveSelectionLeftBorder = null;
  }
};

// src/GetLatex/GetViewModeLatex.ts
var emptyKeyboardMemory = new KeyboardMemory();
function GetViewModeLatex(x, latexConfiguration) {
  let syntaxTreeComponent = x instanceof KeyboardMemory ? x.SyntaxTreeRoot : x;
  return syntaxTreeComponent.getLatex(emptyKeyboardMemory, latexConfiguration);
}

// src/SyntaxTreeComponents/Placeholder/GetFirstNonEmptyOnLeftOf.ts
function GetFirstNonEmptyOnLeftOf(placeholderArray, input) {
  let isOnTheLeft = false;
  for (let i = placeholderArray.length - 1; i >= 0; i--) {
    let placeholder = placeholderArray[i];
    if (!isOnTheLeft) {
      if (placeholder === input) {
        isOnTheLeft = true;
      }
      continue;
    }
    if (placeholder.Atoms.length > 0) {
      return placeholder;
    }
  }
  return null;
}

// src/helpers/arrayhelpers/lastOrNull.ts
function lastOrNull(array) {
  return array.length == 0 ? null : array[array.length - 1];
}

// src/helpers/arrayhelpers/firstBefore.ts
function firstBefore(array, element) {
  let i = array.indexOf(element);
  if (i > 0) {
    return array[i - 1];
  } else {
    return null;
  }
}

// src/helpers/arrayhelpers/remove.ts
function remove(array, element) {
  let i = array.indexOf(element);
  array.splice(i, 1);
}

// src/SyntaxTreeComponents/Atoms/Base/Atom.ts
var Atom = class {
  getLatex(keyboardMemory, latexConfiguration) {
    let latex = this.getLatexPart(keyboardMemory, latexConfiguration);
    if (keyboardMemory.SelectionDiff != null && keyboardMemory.SelectionDiff != 0) {
      if (keyboardMemory.InclusiveSelectionLeftBorder === this) {
        latex = latexConfiguration.selectionHightlightStart + latex;
      }
      if (keyboardMemory.InclusiveSelectionRightBorder === this) {
        latex = latex + latexConfiguration.selectionHightlightEnd;
      }
      return latex;
    } else {
      if (keyboardMemory.Current === this) {
        return latex + latexConfiguration.activePlaceholderLatex;
      } else {
        return latex;
      }
    }
  }
};

// src/SyntaxTreeComponents/Atoms/Base/WritableAtom.ts
var WritableAtom = class extends Atom {
  constructor(leftToRight) {
    super();
    this.Placeholders = leftToRight;
    this.Placeholders.forEach((ph) => {
      ph.ParentAtom = this;
    });
  }
  GetMoveDownSuggestion(from) {
    return null;
  }
  GetMoveUpSuggestion(from) {
    return null;
  }
};

// src/helpers/arrayhelpers/last.ts
function last(array) {
  return array[array.length - 1];
}

// src/SyntaxTreeComponents/Atoms/Base/ReadonlyAtom.ts
var ReadonlyAtom = class extends Atom {
};

// src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/Base/PartOfNumberWithDigits.ts
var AbstractPartOfNumberWithDigits = class extends ReadonlyAtom {
};

// src/helpers/arrayhelpers/firstAfter.ts
function firstAfter(array, element) {
  let i = array.indexOf(element);
  if (i != -1 && i < array.length - 1) {
    return array[i + 1];
  } else {
    return null;
  }
}

// src/SyntaxTreeComponents/Atoms/WritableAtoms/SinglePlaceholderRawAtom.ts
var SinglePlaceholderRawAtom = class extends WritableAtom {
  constructor(prefix, suffix) {
    super([new Placeholder()]);
    this.Prefix = prefix;
    this.Content = this.Placeholders[0];
    this.Suffix = suffix;
  }
  getLatexPart(keyboardMemory, latexConfiguration) {
    return this.Prefix + this.Content.getLatex(keyboardMemory, latexConfiguration) + this.Suffix;
  }
};

// src/SyntaxTreeComponents/Atoms/WritableAtoms/RoundBracketsAtom.ts
var RoundBracketsAtom = class extends SinglePlaceholderRawAtom {
  constructor(leftBracketLatex = String.raw`\left(`, rightBracketLatex = String.raw`\right)`) {
    super(leftBracketLatex, rightBracketLatex);
  }
};

// src/KeyboardEngine/Functions/Navigation/MoveRight.ts
function MoveRight(k) {
  var _a;
  if (k.Current instanceof Placeholder) {
    if (k.Current.Atoms.length > 0) {
      let nextAtom = k.Current.Atoms[0];
      k.Current = nextAtom instanceof WritableAtom ? nextAtom.Placeholders[0] : nextAtom;
    } else if (k.Current.ParentAtom == null) {
      return;
    } else {
      k.Current = (_a = firstAfter(k.Current.ParentAtom.Placeholders, k.Current)) != null ? _a : k.Current.ParentAtom;
    }
  } else {
    let nextAtom = firstAfter(k.Current.ParentPlaceholder.Atoms, k.Current);
    if (nextAtom != null) {
      if (nextAtom instanceof WritableAtom) {
        k.Current = nextAtom.Placeholders[0];
      } else {
        k.Current = nextAtom;
      }
    } else {
      let ancestorAtom = k.Current.ParentPlaceholder.ParentAtom;
      if (ancestorAtom != null) {
        let nextPlaceholder = firstAfter(ancestorAtom.Placeholders, k.Current.ParentPlaceholder);
        k.Current = nextPlaceholder != null ? nextPlaceholder : ancestorAtom;
      }
    }
  }
}

// src/KeyboardEngine/Functions/Insert/TryInsertWithEncapsulateCurrent.ts
function TryInsertWithEncapsulateCurrent(k, newAtom, config) {
  var _a;
  let encapsulatingPlaceholder = newAtom.Placeholders[0];
  if (k.Current instanceof Atom) {
    let siblingAtoms = k.Current.ParentPlaceholder.Atoms;
    let currentIndex = siblingAtoms.indexOf(k.Current);
    siblingAtoms[currentIndex] = newAtom;
    newAtom.ParentPlaceholder = k.Current.ParentPlaceholder;
    if (k.Current instanceof RoundBracketsAtom && (config == null ? void 0 : config.deleteOuterRoundBracketsIfAny)) {
      let betweenBracketsPlaceholder = k.Current.Content;
      for (let atom of betweenBracketsPlaceholder.Atoms) {
        atom.ParentPlaceholder = encapsulatingPlaceholder;
        encapsulatingPlaceholder.Atoms.push(atom);
        k.Current = (_a = firstAfter(newAtom.Placeholders, encapsulatingPlaceholder)) != null ? _a : newAtom;
      }
    } else if (k.Current instanceof AbstractPartOfNumberWithDigits) {
      encapsulatingPlaceholder.Atoms.push(k.Current);
      k.Current.ParentPlaceholder = encapsulatingPlaceholder;
      EncapsulateAll_PartsOfNumberWithDigits_LeftOfIndex(currentIndex, siblingAtoms, encapsulatingPlaceholder);
      MoveRight(k);
    } else {
      encapsulatingPlaceholder.Atoms.push(k.Current);
      k.Current.ParentPlaceholder = encapsulatingPlaceholder;
      MoveRight(k);
    }
    return true;
  } else {
    return false;
  }
}
function EncapsulateAll_PartsOfNumberWithDigits_LeftOfIndex(exclusiveRightIndex, siblingAtoms, toPlaceholder) {
  for (let i = exclusiveRightIndex - 1; i >= 0; i--) {
    let siblingAtom = siblingAtoms[i];
    if (siblingAtom instanceof AbstractPartOfNumberWithDigits) {
      remove(siblingAtoms, siblingAtom);
      toPlaceholder.Atoms.unshift(siblingAtom);
      siblingAtom.ParentPlaceholder = toPlaceholder;
    } else {
      break;
    }
  }
}

// src/KeyboardEngine/Functions/Delete/DeleteCurrent.ts
function DeleteCurrent(k) {
  var _a;
  if (k.Current instanceof Placeholder) {
    if (k.Current.ParentAtom == null || k.Current.Atoms.length > 0) {
      return;
    } else {
      let nonEmptyPlaceholderOnLeft = GetFirstNonEmptyOnLeftOf(k.Current.ParentAtom.Placeholders, k.Current);
      if (nonEmptyPlaceholderOnLeft) {
        if (k.Current.ParentAtom.Placeholders.length == 2 && k.Current === k.Current.ParentAtom.Placeholders[1] && k.Current.Atoms.length == 0) {
          k.Current.ParentAtom.ParentPlaceholder.Atoms.pop();
          for (let atom of nonEmptyPlaceholderOnLeft.Atoms) {
            k.Current.ParentAtom.ParentPlaceholder.Atoms.push(atom);
            atom.ParentPlaceholder = k.Current.ParentAtom.ParentPlaceholder;
          }
          k.Current = last(nonEmptyPlaceholderOnLeft.Atoms);
        } else {
          nonEmptyPlaceholderOnLeft.Atoms.pop();
          k.Current = (_a = lastOrNull(nonEmptyPlaceholderOnLeft.Atoms)) != null ? _a : nonEmptyPlaceholderOnLeft;
        }
      } else if (k.Current.ParentAtom.Placeholders.every((ph) => ph.Atoms.length == 0)) {
        let ancestorPlaceholder = k.Current.ParentAtom.ParentPlaceholder;
        let previousAtom = firstBefore(ancestorPlaceholder.Atoms, k.Current.ParentAtom);
        remove(ancestorPlaceholder.Atoms, k.Current.ParentAtom);
        k.Current = previousAtom != null ? previousAtom : ancestorPlaceholder;
      } else if (k.Current.ParentAtom.Placeholders[0] === k.Current && k.Current.Atoms.length == 0 && k.Current.ParentAtom.Placeholders.some((ph) => ph.Atoms.length != 0)) {
        if (TryEncapsulatePreviousInto(k.Current)) {
          k.Current = last(k.Current.Atoms);
        }
      }
    }
  } else {
    if (k.Current instanceof WritableAtom && k.Current.Placeholders.some((ph) => ph.Atoms.length > 0)) {
      let lastPlaceholderWithContent;
      for (let i = k.Current.Placeholders.length - 1; i >= 0; i--) {
        let ph = k.Current.Placeholders[i];
        if (ph.Atoms.length > 0) {
          lastPlaceholderWithContent = ph;
          break;
        }
      }
      lastPlaceholderWithContent.Atoms.pop();
      k.Current = lastPlaceholderWithContent.Atoms.length == 0 ? lastPlaceholderWithContent : last(lastPlaceholderWithContent.Atoms);
    } else {
      let previousAtom = firstBefore(k.Current.ParentPlaceholder.Atoms, k.Current);
      remove(k.Current.ParentPlaceholder.Atoms, k.Current);
      k.Current = previousAtom != null ? previousAtom : k.Current.ParentPlaceholder;
    }
  }
}
function TryEncapsulatePreviousInto(targetPlaceholder) {
  let previousAtom = firstBefore(targetPlaceholder.ParentAtom.ParentPlaceholder.Atoms, targetPlaceholder.ParentAtom);
  if (previousAtom != null) {
    remove(targetPlaceholder.ParentAtom.ParentPlaceholder.Atoms, previousAtom);
    targetPlaceholder.Atoms.push(previousAtom);
    previousAtom.ParentPlaceholder = targetPlaceholder;
    if (previousAtom instanceof AbstractPartOfNumberWithDigits) {
      EncapsulateAll_PartsOfNumberWithDigits_LeftOfIndex(previousAtom.ParentPlaceholder.Atoms.length, previousAtom.ParentPlaceholder.Atoms, targetPlaceholder);
    }
    return true;
  }
  return false;
}

// src/KeyboardEngine/Functions/Selection/LeaveSelectionMode.ts
function LeaveSelectionMode(k) {
  k.SelectionDiff = null;
  k.InclusiveSelectionRightBorder = null;
  k.InclusiveSelectionLeftBorder = null;
}

// src/KeyboardEngine/Functions/Selection/helpers/popSelection.ts
function popSelection(k, arg) {
  var _a;
  if (k.SelectionDiff == null) {
    throw "Turn on selection mode before calling this method.";
  }
  if (k.SelectionDiff == 0) {
    LeaveSelectionMode(k);
    return [];
  }
  let diff = k.SelectionDiff;
  let insertAtom = arg == void 0 ? [] : [arg.andInsert];
  if (k.Current instanceof Placeholder) {
    LeaveSelectionMode(k);
    return k.Current.Atoms.splice(0, diff, ...insertAtom);
  } else {
    let siblings = k.Current.ParentPlaceholder.Atoms;
    let indexOfLeftBorder = siblings.indexOf(k.InclusiveSelectionLeftBorder);
    k.Current = (_a = firstBefore(siblings, k.InclusiveSelectionLeftBorder)) != null ? _a : k.Current.ParentPlaceholder;
    LeaveSelectionMode(k);
    return siblings.splice(indexOfLeftBorder, abs(diff), ...insertAtom);
  }
}
function abs(n) {
  return n < 0 ? -n : n;
}

// src/KeyboardEngine/Functions/Delete/DeleteSelection.ts
function DeleteSelection(k) {
  popSelection(k);
}

// src/KeyboardEngine/Functions/Insert/Insert.ts
function Insert(k, newAtom) {
  if (k.Current instanceof Placeholder) {
    k.Current.Atoms.unshift(newAtom);
    newAtom.ParentPlaceholder = k.Current;
  } else {
    let parent = k.Current.ParentPlaceholder;
    let indexOfCurrent = parent.Atoms.indexOf(k.Current);
    parent.Atoms.splice(indexOfCurrent + 1, 0, newAtom);
    newAtom.ParentPlaceholder = parent;
  }
  MoveRight(k);
}

// src/KeyboardEngine/Functions/Insert/TryInsertWithEncapsulateSelection.ts
function TryInsertWithEncapsulateSelection(k, newAtom) {
  let atoms = popSelection(k, { andInsert: newAtom });
  if (atoms.length == 0) {
    return false;
  } else {
    let encapsulatingPlaceholder = newAtom.Placeholders[0];
    for (let atom of atoms) {
      atom.ParentPlaceholder = encapsulatingPlaceholder;
      encapsulatingPlaceholder.Atoms.push(atom);
    }
    k.Current = last(atoms);
    MoveRight(k);
    return true;
  }
}

// src/KeyboardEngine/Functions/Navigation/MoveDown.ts
function MoveDown(k) {
  var _a;
  let moveFromPlaceholder = k.Current instanceof Placeholder ? k.Current : k.Current.ParentPlaceholder;
  let suggestingAtom;
  while (true) {
    if (moveFromPlaceholder.ParentAtom == null) {
      return;
    }
    suggestingAtom = moveFromPlaceholder.ParentAtom;
    if (suggestingAtom instanceof WritableAtom) {
      let suggestion = suggestingAtom.GetMoveDownSuggestion(moveFromPlaceholder);
      if (suggestion != null) {
        k.Current = (_a = lastOrNull(suggestion.Atoms)) != null ? _a : suggestion;
        return;
      }
    }
    moveFromPlaceholder = suggestingAtom.ParentPlaceholder;
  }
}

// src/KeyboardEngine/Functions/Navigation/MoveLeft.ts
function MoveLeft(k) {
  var _a, _b;
  if (k.Current instanceof Placeholder) {
    if (k.Current.ParentAtom == null) {
      return;
    }
    let previousPlaceholder = firstBefore(k.Current.ParentAtom.Placeholders, k.Current);
    if (previousPlaceholder !== null) {
      if (previousPlaceholder.Atoms.length == 0) {
        k.Current = previousPlaceholder;
      } else {
        k.Current = last(previousPlaceholder.Atoms);
      }
    } else {
      let ancestorPlaceholder = k.Current.ParentAtom.ParentPlaceholder;
      let atomPreviousToParentOfCurrent = firstBefore(ancestorPlaceholder.Atoms, k.Current.ParentAtom);
      if (atomPreviousToParentOfCurrent != null) {
        k.Current = atomPreviousToParentOfCurrent;
      } else {
        k.Current = ancestorPlaceholder;
      }
    }
  } else {
    if (k.Current instanceof WritableAtom) {
      let placeholder = last(k.Current.Placeholders);
      k.Current = (_a = last(placeholder.Atoms)) != null ? _a : placeholder;
    } else {
      k.Current = (_b = firstBefore(k.Current.ParentPlaceholder.Atoms, k.Current)) != null ? _b : k.Current.ParentPlaceholder;
    }
  }
}

// src/KeyboardEngine/Functions/Navigation/MoveUp.ts
function MoveUp(k) {
  var _a;
  let moveFromPlaceholder = k.Current instanceof Placeholder ? k.Current : k.Current.ParentPlaceholder;
  let suggestingAtom;
  while (true) {
    if (moveFromPlaceholder.ParentAtom == null) {
      return;
    }
    suggestingAtom = moveFromPlaceholder.ParentAtom;
    if (suggestingAtom instanceof WritableAtom) {
      let suggestion = suggestingAtom.GetMoveUpSuggestion(moveFromPlaceholder);
      if (suggestion != null) {
        k.Current = (_a = lastOrNull(suggestion.Atoms)) != null ? _a : suggestion;
        return;
      }
    }
    moveFromPlaceholder = suggestingAtom.ParentPlaceholder;
  }
}

// src/KeyboardEngine/Functions/Selection/helpers/setSelectionDiff.ts
function setSelectionDiff(k, diffWithCurrent) {
  k.SelectionDiff = diffWithCurrent;
  if (diffWithCurrent == 0) {
    k.InclusiveSelectionLeftBorder = null;
    k.InclusiveSelectionRightBorder = null;
    return;
  }
  if (k.Current instanceof Placeholder) {
    k.InclusiveSelectionLeftBorder = k.Current;
    k.InclusiveSelectionRightBorder = k.Current.Atoms[diffWithCurrent - 1];
  } else {
    let atoms = k.Current.ParentPlaceholder.Atoms;
    let indexOfCurrent = atoms.indexOf(k.Current);
    if (diffWithCurrent > 0) {
      k.InclusiveSelectionLeftBorder = atoms[indexOfCurrent + 1];
      k.InclusiveSelectionRightBorder = atoms[indexOfCurrent + diffWithCurrent];
    } else if (diffWithCurrent < 0) {
      let index = indexOfCurrent + diffWithCurrent + 1;
      if (index < 0) {
        k.InclusiveSelectionLeftBorder = k.Current.ParentPlaceholder;
      } else {
        k.InclusiveSelectionLeftBorder = atoms[index];
      }
      k.InclusiveSelectionRightBorder = k.Current;
    }
  }
}

// src/KeyboardEngine/Functions/Selection/SelectLeft.ts
function SelectLeft(k) {
  var _a;
  let diff = (_a = k.SelectionDiff) != null ? _a : 0;
  if (k.Current instanceof Atom) {
    let atoms = k.Current.ParentPlaceholder.Atoms;
    let indexOfCurrent = atoms.indexOf(k.Current);
    if (indexOfCurrent + diff >= 0) {
      setSelectionDiff(k, diff - 1);
    }
  }
}

// src/KeyboardEngine/Functions/Selection/SelectRight.ts
function SelectRight(k) {
  var _a;
  let diff = (_a = k.SelectionDiff) != null ? _a : 0;
  if (k.Current instanceof Placeholder && diff < k.Current.Atoms.length || k.Current instanceof Atom && k.Current.ParentPlaceholder.Atoms.indexOf(k.Current) + diff < k.Current.ParentPlaceholder.Atoms.length) {
    setSelectionDiff(k, diff + 1);
  }
}

// src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DecimalSeparatorAtom.ts
var DecimalSeparatorAtom = class extends AbstractPartOfNumberWithDigits {
  getLatexPart(keyboardMemory, latexConfiguration) {
    return latexConfiguration.decimalSeparator;
  }
};

// src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/DigitAtom.ts
var DigitAtom = class extends AbstractPartOfNumberWithDigits {
  constructor(digit) {
    super();
    this.value = digit;
  }
  getLatexPart(keyboardMemory, latexConfiguration) {
    return this.value.toString();
  }
};

// src/SyntaxTreeComponents/Atoms/ReadonlyAtoms/RawAtom.ts
var RawAtom = class extends ReadonlyAtom {
  constructor(latex) {
    super();
    this.Latex = latex;
  }
  getLatexPart(keyboardMemory, latexConfiguration) {
    return this.Latex;
  }
};

// src/SyntaxTreeComponents/Atoms/WritableAtoms/MatrixAtom.ts
var MatrixAtom = class extends WritableAtom {
  constructor(args) {
    let grid = [];
    let leftToRight = [];
    for (let i = 0; i < args.height; i++) {
      let row = [];
      for (let j = 0; j < args.width; j++) {
        let placeholder = new Placeholder();
        row.push(placeholder);
        leftToRight.push(placeholder);
      }
      grid.push(row);
    }
    super(leftToRight);
    for (let placeholder of leftToRight) {
      placeholder.ParentAtom = this;
    }
    this.Grid = grid;
    this.MatrixType = args.matrixType;
  }
  getLatexPart(keyboardMemory, latexConfiguration) {
    let latex = String.raw`\begin{${this.MatrixType}}`;
    latex += this.Grid.map((row) => row.map((placeholder) => placeholder.getLatex(keyboardMemory, latexConfiguration)).join(" & ")).join(String.raw` \\ `);
    latex += String.raw`\end{${this.MatrixType}}`;
    return latex;
  }
  GetMoveDownSuggestion(current) {
    let { rowNumber, indexInRow } = this.GetPositionOf(current);
    if (rowNumber + 1 < this.Grid.length) {
      return this.Grid[rowNumber + 1][indexInRow];
    } else {
      return null;
    }
  }
  GetMoveUpSuggestion(current) {
    let { rowNumber, indexInRow } = this.GetPositionOf(current);
    if (rowNumber - 1 >= 0) {
      return this.Grid[rowNumber - 1][indexInRow];
    } else {
      return null;
    }
  }
  GetPositionOf(placeholder) {
    for (let rowNumber = 0; rowNumber < this.Grid.length; rowNumber++) {
      let row = this.Grid[rowNumber];
      for (let indexInRow = 0; indexInRow < row.length; indexInRow++) {
        if (row[indexInRow] === placeholder) {
          return { rowNumber, indexInRow };
        }
      }
    }
    throw "The provided placeholder is not part of the Grid.";
  }
};

// src/SyntaxTreeComponents/Atoms/WritableAtoms/MultiplePlaceholdersRawAtom.ts
var MultiplePlaceholdersRawAtom = class extends WritableAtom {
  constructor(before, between, after) {
    let placeholderCount = typeof between === "string" ? 2 : between.length + 1;
    let placeholders = new Array();
    for (let i = 0; i < placeholderCount; i++) {
      placeholders.push(new Placeholder());
    }
    super(placeholders);
    this.before = before;
    this.between = typeof between === "string" ? [between] : between;
    this.after = after;
  }
  getLatexPart(keyboardMemory, latexConfiguration) {
    let latex = this.before;
    for (let i = 0; i < this.between.length; i++) {
      latex += this.Placeholders[0].getLatex(keyboardMemory, latexConfiguration);
      latex += this.between[0];
    }
    latex += this.Placeholders[this.Placeholders.length - 1].getLatex(keyboardMemory, latexConfiguration);
    latex += this.after;
    return latex;
  }
};

// src/SyntaxTreeComponents/Atoms/WritableAtoms/MultiplePlaceholdersAscendingRawAtom.ts
var MultiplePlaceholdersAscendingRawAtom = class extends MultiplePlaceholdersRawAtom {
  GetMoveDownSuggestion(current) {
    let currentPlaceholderIndex = this.Placeholders.indexOf(current);
    if (currentPlaceholderIndex > 0) {
      return this.Placeholders[currentPlaceholderIndex - 1];
    } else {
      return null;
    }
  }
  GetMoveUpSuggestion(current) {
    let currentPlaceholderIndex = this.Placeholders.indexOf(current);
    if (currentPlaceholderIndex < this.Placeholders.length - 1) {
      return this.Placeholders[currentPlaceholderIndex + 1];
    } else {
      return null;
    }
  }
};

// src/SyntaxTreeComponents/Atoms/WritableAtoms/MultiplePlaceholdersDescendingRawAtom.ts
var MultiplePlaceholdersDescendingRawAtom = class extends MultiplePlaceholdersRawAtom {
  GetMoveDownSuggestion(current) {
    let currentPlaceholderIndex = this.Placeholders.indexOf(current);
    if (currentPlaceholderIndex < this.Placeholders.length - 1) {
      return this.Placeholders[currentPlaceholderIndex + 1];
    } else {
      return null;
    }
  }
  GetMoveUpSuggestion(current) {
    let currentPlaceholderIndex = this.Placeholders.indexOf(current);
    if (currentPlaceholderIndex > 0) {
      return this.Placeholders[currentPlaceholderIndex - 1];
    } else {
      return null;
    }
  }
};

// src/LatexConfiguration.ts
var LatexConfiguration = class {
  constructor() {
    this.activePlaceholderNucleus = String.raw`\blacksquare `;
    this.passivePlaceholderNucleus = String.raw`\square `;
    this.decimalSeparator = ".";
    this.selectionHightlightStart = String.raw`\colorbox{#ADD8E6}{`;
    this.selectionHightlightEnd = "}";
  }
  get activePlaceholderLatex() {
    if (this.activePlaceholderColor == null) {
      return this.activePlaceholderNucleus;
    } else {
      return String.raw`\color{${this.activePlaceholderColor}}{${this.activePlaceholderNucleus}}`;
    }
  }
  get passivePlaceholderLatex() {
    if (this.passivePlaceholderColor == null) {
      return this.passivePlaceholderNucleus;
    } else {
      return String.raw`\color{${this.passivePlaceholderColor}}{${this.passivePlaceholderNucleus}}`;
    }
  }
};
export {
  Atom,
  DecimalSeparatorAtom,
  DeleteCurrent,
  DeleteSelection,
  DigitAtom,
  GetEditModeLatex,
  GetViewModeLatex,
  Insert,
  KeyboardMemory,
  LatexConfiguration,
  LeaveSelectionMode,
  MatrixAtom,
  MoveDown,
  MoveLeft,
  MoveRight,
  MoveUp,
  MultiplePlaceholdersAscendingRawAtom,
  MultiplePlaceholdersDescendingRawAtom,
  MultiplePlaceholdersRawAtom,
  Placeholder,
  RawAtom,
  ReadonlyAtom,
  RoundBracketsAtom,
  SelectLeft,
  SelectRight,
  SinglePlaceholderRawAtom,
  TryInsertWithEncapsulateCurrent,
  TryInsertWithEncapsulateSelection,
  WritableAtom
};
