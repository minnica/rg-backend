export function addTotalsRow(
  rows,
  { labelKey, totalLabel = 'TOTAL_GENERAL', includeKeys, excludeKeys = [] } = {},
) {
  if (!Array.isArray(rows) || rows.length === 0) return rows ?? [];

  const totals = {};
  const isIncluded = key =>
    (includeKeys ? includeKeys.includes(key) : true) && !excludeKeys.includes(key);

  const toNumber = v => {
    if (v == null || v === '') return 0;
    const n = Number(String(v).replace(/\s/g, '').replace(/,/g, ''));
    return Number.isFinite(n) ? n : 0;
  };

  for (const row of rows) {
    for (const [key, val] of Object.entries(row)) {
      if (!isIncluded(key)) continue;
      const num = toNumber(val);
      if (Number.isFinite(num)) totals[key] = (totals[key] ?? 0) + num;
    }
  }

  const totalRow = {};
  const keysInOrder = Object.keys(rows[0]);
  for (const k of keysInOrder) {
    if (k === labelKey) totalRow[k] = totalLabel;
    else if (k in totals) totalRow[k] = totals[k];
    else totalRow[k] = null;
  }

  return [...rows, totalRow];
}
