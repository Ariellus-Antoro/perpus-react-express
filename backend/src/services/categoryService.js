const prisma = require("../config/db");

async function getAllCategories() {
  return await prisma.categories.findMany({
    where: {
      deleted_at: null,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

async function getCategoryById(id) {
  return await prisma.categories.findFirst({
    where: {
      id: Number(id),
      deleted_at: null,
    },
  });
}

async function createCategory(data) {
  return await prisma.categories.create({
    data: {
      category_name: data.category_name,
      is_active: data.is_active ?? true,
    },
  });
}

async function updateCategory(id, data) {
  return await prisma.categories.update({
    where: {
      id: Number(id),
    },
    data: {
      category_name: data.category_name,
      is_active: data.is_active,
    },
  });
}

async function deleteCategory(id) {
  return await prisma.categories.update({
    where: {
      id: Number(id),
    },
    data: {
      deleted_at: new Date(),
      is_active: false,
    },
  });
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
