import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';

export class CustomNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    _referencedTablePath?: string,
    _referencedColumnNames?: string[]
  ): string {
    const clonedColumnNames = [...columnNames];
    clonedColumnNames.sort();
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName;
    let tableReferenceName = '';
    if (_referencedTablePath) {
      tableReferenceName = _referencedTablePath.split('.')[1];
    }
    let referenceColumnNames = '';
    if (_referencedColumnNames && _referencedColumnNames.length > 0) {
      const cloneReferenceColumnName = [..._referencedColumnNames];
      cloneReferenceColumnName.sort();
      referenceColumnNames = cloneReferenceColumnName.join('_');
    }

    const replacedTableName = tableName.split('.')[1];
    const key = `${replacedTableName}_${clonedColumnNames.join(
      '_'
    )}_${tableReferenceName}_${referenceColumnNames}`;
    return 'FK_' + key;
  }

  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    const clonedColumnNames = [...columnNames];
    clonedColumnNames.sort();
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const replacedTableName = tableName.split('.')[1];
    const key = `${replacedTableName}_${clonedColumnNames.join('_')}`;
    return 'PK_' + key;
  }

  uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[]
  ): string {
    const clonedColumnNames = [...columnNames];
    clonedColumnNames.sort();
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const replacedTableName = tableName.split('.')[1];
    const key = `${replacedTableName}_${clonedColumnNames.join('_')}`;
    return 'UQ_' + key;
  }

  indexName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string
  ): string {
    const clonedColumnNames = [...columnNames];
    clonedColumnNames.sort();
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const replacedTableName = tableName.split('.')[1];
    let key = `${replacedTableName}_${clonedColumnNames.join('_')}`;
    if (where) key += `_${where}`;

    return 'IDX_' + key;
  }
}
