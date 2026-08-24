/**
 * Live In-Browser Code Execution & Mock Data Engine for CorpSim AI
 */

const MOCK_TRANSACTIONS = [
  { transaction_id: 'TXN-9001', customer_id: 'CUST-104', amount: 250.00, status: 'COMPLETED', created_at: '2026-08-22 09:12:00' },
  { transaction_id: 'TXN-9002', customer_id: 'CUST-108', amount: -45.00, status: 'FAILED', created_at: '2026-08-22 09:14:22' },
  { transaction_id: 'TXN-9003', customer_id: null, amount: 1200.50, status: 'FAILED', created_at: '2026-08-22 09:18:10' },
  { transaction_id: 'TXN-9004', customer_id: 'CUST-202', amount: 89.99, status: 'COMPLETED', created_at: '2026-08-22 09:25:44' },
  { transaction_id: 'TXN-9005', customer_id: 'CUST-104', amount: 450.00, status: 'COMPLETED', created_at: '2026-08-22 09:30:15' },
  { transaction_id: 'TXN-9006', customer_id: 'CUST-305', amount: 15.00, status: 'COMPLETED', created_at: '2026-08-22 09:33:01' }
];

export function executeCodeSandbox(codeText, category = 'SQL') {
  const code = codeText.trim();
  const startTime = performance.now();

  if (!code) {
    return {
      success: false,
      error: 'Empty code submission. Please write code before executing.',
      executionTimeMs: 0
    };
  }

  // SQL Execution Engine
  if (category.toLowerCase().includes('sql') || code.toLowerCase().includes('select') || code.toLowerCase().includes('create table')) {
    if (code.toLowerCase().includes('create table')) {
      const endTime = performance.now();
      return {
        success: true,
        outputType: 'table_schema',
        message: 'Query OK, 1 table created (staging_transactions). Primary key & status constraint validated.',
        columns: ['Column Name', 'Data Type', 'Constraint'],
        rows: [
          ['transaction_id', 'VARCHAR(64)', 'PRIMARY KEY'],
          ['customer_id', 'VARCHAR(32)', 'NOT NULL'],
          ['amount', 'DECIMAL(10,2)', 'CHECK (amount > 0)'],
          ['status', 'VARCHAR(20)', 'CHECK (COMPLETED, FAILED)'],
          ['created_at', 'TIMESTAMP', 'DEFAULT CURRENT_TIMESTAMP']
        ],
        executionTimeMs: Math.round(endTime - startTime + 8)
      };
    }

    if (code.toLowerCase().includes('select')) {
      const isFilter = code.toLowerCase().includes('where') || code.toLowerCase().includes('case');
      const filtered = isFilter 
        ? MOCK_TRANSACTIONS.filter(t => t.customer_id && t.amount > 0)
        : MOCK_TRANSACTIONS;

      const endTime = performance.now();
      return {
        success: true,
        outputType: 'query_result',
        message: `Fetch complete: ${filtered.length} rows returned.`,
        columns: ['transaction_id', 'customer_id', 'amount', 'status', 'created_at'],
        rows: filtered.map(t => [t.transaction_id, t.customer_id || 'NULL', `$${t.amount.toFixed(2)}`, t.status, t.created_at]),
        executionTimeMs: Math.round(endTime - startTime + 14)
      };
    }
  }

  // PySpark / JavaScript Execution Engine
  if (code.includes('def ') || code.includes('function') || code.includes('filter')) {
    try {
      const cleaned = MOCK_TRANSACTIONS.filter(t => t.customer_id !== null && t.amount > 0);
      const endTime = performance.now();
      return {
        success: true,
        outputType: 'pipeline_clean',
        message: `Pipeline execution successful! Raw input: ${MOCK_TRANSACTIONS.length} records. Cleaned output: ${cleaned.length} records (2 corrupt records dropped).`,
        columns: ['transaction_id', 'customer_id', 'amount', 'status', 'cleaned_at'],
        rows: cleaned.map(t => [t.transaction_id, t.customer_id, `$${t.amount.toFixed(2)}`, t.status, new Date().toISOString()]),
        executionTimeMs: Math.round(endTime - startTime + 22)
      };
    } catch (err) {
      return {
        success: false,
        error: `Pipeline Exception: ${err.message}`,
        executionTimeMs: 5
      };
    }
  }

  // Generic Execution Fallback
  const endTime = performance.now();
  return {
    success: true,
    outputType: 'generic',
    message: 'Script compiled and verified successfully. 0 syntax errors detected.',
    columns: ['Status', 'Validation'],
    rows: [['Passed', 'Code syntax and logic contracts met']],
    executionTimeMs: Math.round(endTime - startTime + 10)
  };
}
