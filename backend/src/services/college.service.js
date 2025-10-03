import { prisma } from "../config/prisma.js";

function buildWhereFromQuery({ search, type, location, q }) {
  const where = {};
  const term = q ?? search;
  if (term) {
    where.OR = [
      { name: { contains: term, mode: "insensitive" } },
      { city: { contains: term, mode: "insensitive" } },
      { state: { contains: term, mode: "insensitive" } },
      { type: { contains: term, mode: "insensitive" } },
    ];
  }
  if (type) {
    where.type = { contains: String(type), mode: "insensitive" };
  }
  if (location) {
    where.OR = (where.OR || []).concat([
      { city: { contains: location, mode: "insensitive" } },
      { state: { contains: location, mode: "insensitive" } },
      { address: { contains: location, mode: "insensitive" } },
    ]);
  }
  return where;
}

export async function listColleges(params) {
  const { limit = 20, offset = 0, ...rest } = params;
  const where = buildWhereFromQuery(rest);
  const take = parseInt(limit);
  const skip = parseInt(offset);
  const [data, total] = await Promise.all([
    prisma.college.findMany({ where, take, skip, orderBy: { id: "asc" } }),
    prisma.college.count({ where }),
  ]);
  return { data, total };
}

export async function searchColleges(params) {
  const { limit = 20, ...rest } = params;
  if (!rest.q && !rest.type && !rest.location) {
    return { data: [], total: 0, message: "Please provide search parameters" };
  }
  const where = buildWhereFromQuery(rest);
  const take = parseInt(limit);
  const data = await prisma.college.findMany({ where, take, orderBy: { id: "asc" } });
  return { data, total: data.length };
}

export async function getCollegeById(id) {
  const college = await prisma.college.findUnique({ where: { id: parseInt(id) } });
  return college;
}


