export const courseKeys = {
  all: ["courses"],
  list: (filters) => ["courses", "list", filters],
  manage: (filters) => ["courses", "manage", filters],
  detail: (id) => ["courses", "detail", id],
  preview: (id) => ["courses", "preview", id],
  content: (id) => ["courses", "content", id],
};

export const adminKeys = {
  all: ["admin"],
  dashboard: () => ["admin", "dashboard"],
  transactions: (filters) => ["admin", "transactions", filters],
  users: (filters) => ["admin", "users", filters],
};

export const instructorKeys = {
  all: ["instructor"],
  courses: (filters) => ["instructor", "courses", filters],
  students: (filters) => ["instructor", "students", filters],
};

export const categoryKeys = {
  all: ["categories"],
  list: () => ["categories", "list"],
};

export const authKeys = {
  all: ["auth"],
  profile: () => ["auth", "profile"],
};
