import {relations} from "drizzle-orm/relations";
import {
  organizationInNeonAuth,
  invitationInNeonAuth,
  userInNeonAuth,
  sessionInNeonAuth,
  accountInNeonAuth,
  memberInNeonAuth,
  transaction,
  category,
  budget
} from "./schema";

export const invitationInNeonAuthRelations = relations(invitationInNeonAuth, ({one}) => ({
  organizationInNeonAuth: one(organizationInNeonAuth, {
    fields: [invitationInNeonAuth.organizationId],
    references: [organizationInNeonAuth.id]
  }),
  userInNeonAuth: one(userInNeonAuth, {
    fields: [invitationInNeonAuth.inviterId],
    references: [userInNeonAuth.id]
  }),
}));

export const organizationInNeonAuthRelations = relations(organizationInNeonAuth, ({many}) => ({
  invitationInNeonAuths: many(invitationInNeonAuth),
  memberInNeonAuths: many(memberInNeonAuth),
}));

export const userInNeonAuthRelations = relations(userInNeonAuth, ({many}) => ({
  invitationInNeonAuths: many(invitationInNeonAuth),
  sessionInNeonAuths: many(sessionInNeonAuth),
  accountInNeonAuths: many(accountInNeonAuth),
  memberInNeonAuths: many(memberInNeonAuth),
  transaction: many(transaction),
  category: many(category),
  budget: many(budget),
}));

export const sessionInNeonAuthRelations = relations(sessionInNeonAuth, ({one}) => ({
  userInNeonAuth: one(userInNeonAuth, {
    fields: [sessionInNeonAuth.userId],
    references: [userInNeonAuth.id]
  }),
}));

export const accountInNeonAuthRelations = relations(accountInNeonAuth, ({one}) => ({
  userInNeonAuth: one(userInNeonAuth, {
    fields: [accountInNeonAuth.userId],
    references: [userInNeonAuth.id]
  }),
}));

export const memberInNeonAuthRelations = relations(memberInNeonAuth, ({one}) => ({
  organizationInNeonAuth: one(organizationInNeonAuth, {
    fields: [memberInNeonAuth.organizationId],
    references: [organizationInNeonAuth.id]
  }),
  userInNeonAuth: one(userInNeonAuth, {
    fields: [memberInNeonAuth.userId],
    references: [userInNeonAuth.id]
  }),
}));

export const transactionRelations = relations(transaction, ({one}) => ({
  user: one(userInNeonAuth, {
    fields: [transaction.userId],
    references: [userInNeonAuth.id]
  }),
  category: one(category, {
    fields: [transaction.categoryId],
    references: [category.id]
  })
}));

export const categoryRelations = relations(category, ({one, many}) => ({
  user: one(userInNeonAuth, {
    fields: [category.userId],
    references: [userInNeonAuth.id]
  }),
  transaction: many(transaction),
  budget: many(budget),
}));

export const budgetRelations = relations(budget, ({one}) => ({
  user: one(userInNeonAuth, {
    fields: [budget.userId],
    references: [userInNeonAuth.id]
  }),
  category: one(category, {
    fields: [budget.categoryId],
    references: [category.id]
  })
}));
