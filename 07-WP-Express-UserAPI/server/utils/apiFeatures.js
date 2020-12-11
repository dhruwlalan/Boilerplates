class APIFeatures {
   constructor(query, queryObj) {
      this.query = query;
      this.queryObj = queryObj;
   }

   filter() {
      const queryObjCopy = { ...this.queryObj };
      ['sort', 'fields', 'page', 'limit'].forEach((el) => {
         delete queryObjCopy[el];
      });
      let queryStr = JSON.stringify(queryObjCopy);
      queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
   }

   sort() {
      if (this.queryObj.sort) {
         const sortBy = this.queryObj.sort.split(',').join(' ');
         this.query = this.query.sort(sortBy);
      }
      return this;
   }

   limitFields() {
      if (this.queryObj.fields) {
         const fields = this.queryObj.fields.split(',').join(' ').concat(' -__v');
         this.query = this.query.select(fields);
      } else {
         this.query = this.query.select('-__v');
      }
      return this;
   }

   paginate() {
      const page = Number(this.queryObj.page) || 1;
      const limit = Number(this.queryObj.limit) || 5;
      const skip = limit * (page - 1);
      this.query = this.query.skip(skip).limit(limit);
      return this;
   }
}

module.exports = APIFeatures;
