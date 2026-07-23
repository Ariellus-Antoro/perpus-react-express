const categoryService = require("../services/categoryService");

async function index(req, res) {
  try {
    const categories = await categoryService.getAllCategories();

    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

async function show(req, res) {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Kategori tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

async function store(req, res) {
  try {
    const { category_name } = req.body;

    if (!category_name || category_name.trim() === "") {
      return res.status(400).json({
        status: "error",
        message: "category_name wajib diisi",
      });
    }

    const category = await categoryService.createCategory(req.body);

    res.status(201).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { category_name } = req.body;

    const existing = await categoryService.getCategoryById(id);
    if (!existing) {
      return res.status(404).json({
        status: "error",
        message: "Kategori tidak ditemukan",
      });
    }

    if (!category_name || category_name.trim() === "") {
      return res.status(400).json({
        status: "error",
        message: "category_name wajib diisi",
      });
    }

    const category = await categoryService.updateCategory(id, req.body);

    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

async function destroy(req, res) {
  try {
    const { id } = req.params;

    const existing = await categoryService.getCategoryById(id);
    if (!existing) {
      return res.status(404).json({
        status: "error",
        message: "Kategori tidak ditemukan",
      });
    }

    await categoryService.deleteCategory(id);

    res.status(200).json({
      status: "success",
      message: "Kategori berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
