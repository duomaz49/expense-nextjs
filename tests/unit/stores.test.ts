import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { useBudgetFormModalStore as budget } from '../../src/store/budget-form-modal-store';
import { useCategoryFormModalStore as category } from '../../src/store/category-form-modal-store';
import { useImportPreviewStore as preview } from '../../src/store/import-preview-store';
import { useNewTransactionModalStore as transaction } from '../../src/store/new-transaction-modal-store';
import { useConfirmationModalStore as confirmation } from '../../src/store/confirmation-modal-store';

afterEach(() => {
  budget.setState(budget.getInitialState(), true);
  category.setState(category.getInitialState(), true);
  preview.setState(preview.getInitialState(), true);
  transaction.setState(transaction.getInitialState(), true);
  confirmation.setState(confirmation.getInitialState(), true);
});
test('category add clears a previous edit and close clears the selected category', () => {
  category.getState().openEdit({id: 'food', name: 'Food'});
  assert.equal(category.getState().editing?.id, 'food');
  category.getState().openAdd();
  assert.equal(category.getState().isOpen, true);
  assert.equal(category.getState().editing, null);
  category.getState().closeModal();
  assert.equal(category.getState().isOpen, false);
});
test('budget modal preserves its period and amount while open and resets on close', () => {
  const editing = {categoryId: 'food', categoryName: 'Food', month: '2026-01-01', amount: '100'};
  budget.getState().open(editing);
  assert.deepEqual(budget.getState().editing, editing);
  budget.getState().closeModal();
  assert.equal(budget.getState().editing, null);
  assert.equal(budget.getState().isOpen, false);
});
test('closing CSV preview clears imported financial data', () => {
  const rows = [{date: '2026-01-01', amount: '-20', description: 'Food', categoryId: null}];
  preview.getState().openImportPreview(rows);
  assert.deepEqual(preview.getState().rows, rows);
  preview.getState().closeModal();
  assert.deepEqual(preview.getState().rows, []);
  assert.equal(preview.getState().isOpen, false);
});
test('transaction modal opens and closes', () => {
  transaction.getState().openNewTransactionModal();
  assert.equal(transaction.getState().isOpen, true);
  transaction.getState().closeModal();
  assert.equal(transaction.getState().isOpen, false);
});
test('confirmation executes only when confirmed and replaces stale callbacks', () => {
  let oldCalls = 0; let newCalls = 0;
  confirmation.getState().openConfirmModal({title: 'Old', onConfirm: () => oldCalls++});
  confirmation.getState().closeModal();
  assert.equal(oldCalls, 0);
  confirmation.getState().openConfirmModal({onConfirm: () => newCalls++});
  assert.equal(confirmation.getState().title, '');
  confirmation.getState().onConfirm();
  assert.equal(oldCalls, 0); assert.equal(newCalls, 1);
});
