type QueryFilters = Record<string, unknown>;

export const courseKeys = {
  all: ["courses"] as const,
  list: (filters?: QueryFilters) => ["courses", "list", filters],
  manage: (filters?: QueryFilters) => ["courses", "manage", filters],
  publicDetail: (id: string) => ["courses", "public", id],
  edit: (id: string) => ["courses", "edit", id],
  preview: (id: string) => ["courses", "preview", id],
  content: (id: string) => ["courses", "content", id],
};

export const adminKeys = {
  all: ["admin"] as const,
  dashboard: () => ["admin", "dashboard"],
  transactions: (filters?: QueryFilters) => ["admin", "transactions", filters],
  users: (filters?: QueryFilters) => ["admin", "users", filters],
};

export const instructorKeys = {
  all: ["instructor"] as const,
  courses: (filters?: QueryFilters) => ["instructor", "courses", filters],
  students: (filters?: QueryFilters) => ["instructor", "students", filters],
};

export const categoryKeys = {
  all: ["categories"] as const,
  list: () => ["categories", "list"],
};

export const profileKeys = {
  all: ["profile"] as const,
  detail: () => ["profile", "detail"],
  enrolledCourses: () => ["profile", "enrolled-courses"],
};

export const assignmentKeys = {
  all: ["assignments"] as const,
};
