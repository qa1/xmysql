import type {
  ArrayExpressionNode,
  BinaryExpressionNode,
  CallExpressionNode,
  CompoundNode,
  IdentifierNode,
  LiteralNode,
  MemberExpressionNode,
  ParsedFormulaNode,
  UnaryExpressionNode,
} from 'nocodb-sdk';
import type { BaseModelSqlv2 } from '~/db/BaseModelSqlv2';
import type { BaseUser, Column, Model, User } from '~/models';

export interface FormulaBaseParams {
  baseModelSqlv2: BaseModelSqlv2;
  alias?: string;
  tableAlias?: string;
  baseUsers?: (Partial<User> & BaseUser)[];
}

export type TAliasToClumn = Record<
  string,
  (parentColumns?: Set<string>) => Promise<{ builder: any }>
>;

export interface FormulaQueryBuilderBaseParams extends FormulaBaseParams {
  _tree;
  model: Model;
  aliasToColumn?: TAliasToClumn;
  parsedTree?: ParsedFormulaNode;
  column?: Column;
  parentColumns: Set<string>;
}
export type FnParsedTreeBase = {
  fnName?: string;
  argsCount?: number;
};
export type FnParsedTreeNode =
  | (BinaryExpressionNode & FnParsedTreeBase)
  | (CallExpressionNode & FnParsedTreeBase)
  | (IdentifierNode & FnParsedTreeBase)
  | (LiteralNode & FnParsedTreeBase)
  | (MemberExpressionNode & FnParsedTreeBase)
  | (ArrayExpressionNode & FnParsedTreeBase)
  | (UnaryExpressionNode & FnParsedTreeBase)
  | (CompoundNode & FnParsedTreeBase);
