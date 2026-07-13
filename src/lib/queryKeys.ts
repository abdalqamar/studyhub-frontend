type QueryFilters = Record<string, unknown>;

export const courseKeys = {
  all: ["courses"],
  list: (filters?: QueryFilters) => ["courses", "list", filters],
  manage: (filters?: QueryFilters) => ["courses", "manage", filters],
  detail: (id: string) => ["courses", "detail", id],
  preview: (id: string) => ["courses", "preview", id],
  content: (id: string) => ["courses", "content", id],
};

export const adminKeys = {
  all: ["admin"],
  dashboard: () => ["admin", "dashboard"],
  transactions: (filters?: QueryFilters) => ["admin", "transactions", filters],
  users: (filters?: QueryFilters) => ["admin", "users", filters],
};

export const instructorKeys = {
  all: ["instructor"],
  courses: (filters?: QueryFilters) => ["instructor", "courses", filters],
  students: (filters?: QueryFilters) => ["instructor", "students", filters],
};

export const categoryKeys = {
  all: ["categories"],
  list: () => ["categories", "list"],
};

export const authKeys = {
  all: ["auth"],
  profile: () => ["auth", "profile"],
};
