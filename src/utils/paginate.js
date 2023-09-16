const getPaginateAttr = (filter, options) => {
  const order = [];
  if (options.sortBy) {
    options.sortBy.split(',').forEach((sortOption) => {
      const [key, sortOrder] = sortOption.split(':');
      order.push([key, sortOrder === 'desc' ? 'DESC' : 'ASC']);
    });
  } else {
    order.push(['createdAt', 'DESC']);
  }

  const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
  const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
  const offset = (page - 1) * limit;
  return {
    limit,
    page,
    offset,
    order,
    condition: filter,
  };
};

const getPaginateData = (data, page, limit) => {
  const { count: totalResults, rows: results } = data;
  const totalPages = Math.ceil(totalResults / limit);
  return {
    results,
    page: page || 0,
    limit,
    totalPages,
    totalResults,
  };
};

module.exports = {
  getPaginateAttr,
  getPaginateData,
};
