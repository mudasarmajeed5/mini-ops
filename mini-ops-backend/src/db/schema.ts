import { defineRelations } from "drizzle-orm";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
export const methodEnum = t.pgEnum("method", [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
]);

export const users = table("users", {
  id: t.uuid("id").defaultRandom().primaryKey(),
  email: t.varchar("email", { length: 250 }).notNull(),
  password: t.varchar("password", { length: 250 }).notNull(),
});

export const services = table("services", {
  id: t.uuid("id").defaultRandom().primaryKey(),
  baseUrl: t.varchar("base_url", { length: 250 }).notNull(),
  userId: t
    .uuid("user_id")
    .references(() => users.id)
    .notNull(),
});

export const logs = table("logs", {
  id: t.uuid("id").defaultRandom().primaryKey(),
  path: t.varchar("path", { length: 255 }).notNull(),
  method: methodEnum().notNull(),
  responseTime: t.integer("response_time").notNull(),
  statusCode: t.integer("status_code").notNull(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  serviceId: t
    .uuid("service_id")
    .references(() => services.id)
    .notNull(),
});
export const tableSchema = { users, services, logs };
export const relations = defineRelations({ services, logs, users }, (r) => ({
  logs: {
    service: r.one.services({
      from: r.logs.serviceId,
      to: r.services.id,
    }),
  },
  users: {
    services: r.many.services(),
  },
  services: {
    logs: r.many.logs(),
    user: r.one.users({
      from: r.services.userId,
      to: r.users.id,
    }),
  },
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Log = typeof logs.$inferSelect;
export type NewLog = typeof logs.$inferInsert;

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertServiceSchema = createInsertSchema(services);
export const selectServiceSchema = createSelectSchema(services);

export const insertLogSchema = createInsertSchema(logs);
export const selectLogSchema = createSelectSchema(logs);
